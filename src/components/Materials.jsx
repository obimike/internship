import React, { useState, useEffect } from "react";
import { format } from "date-fns";

import MaterialsCard from "./MaterialsCard";

import {
	Flex,
	Text,
	useDisclosure,
	IconButton,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	Input,
	Button,
	Box,
	Select,
} from "@chakra-ui/react";

import { RiAddLine } from "react-icons/ri";

import { db, fb } from "../firebase/Config";
import { useAuth } from "../contexts/Auth";

function Materials() {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { currentUser } = useAuth();
	//component state
	const [error, setError] = useState("");
	const [successMessage, setSuccessMessage] = useState("");
	const [submit, setSubmit] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	const [javascriptCount, setJavascriptCount] = useState(0);
	const [cssCount, setCSSCount] = useState(0);
	const [phpCount, setPhpCount] = useState(0);
	const [htmlCount, setHtmlCount] = useState(0);
	const [pythonCount, setPythonCount] = useState(0);
	const [csharpCount, setCsharpCount] = useState(0);
	const [dsnaCount, setDsnaCount] = useState(0);
	const [javaCount, setJavaCount] = useState(0);

	const [javaItems, setJavaItems] = useState([]);
	const [dsnaItems, setDsnaItems] = useState([]);

	useEffect(() => {
		const unsubscribe = db
			.collection("materials")
			.where("approved", "==", false)
			.onSnapshot(function (items) {
				// get material content in a n array
				const fetchJavaItems = [];
				const fetchDsnaItems = [];
				const fetchMaterialItems = [];

				//initialize count
				let js = 0;
				let css = 0;
				let php = 0;
				let python = 0;
				let html = 0;
				let java = 0;
				let csharp = 0;
				let dsna = 0;

				items.forEach((item) => {
					const fetchItem = {
						itemID: item.id,
						...item.data(),
					};
					if (fetchItem.category === "Javascript") {
						js += 1;
					}
					if (fetchItem.category === "Php") {
						php += 1;
					}
					if (fetchItem.category === "CSS") {
						css += 1;
					}
					if (fetchItem.category === "HTML") {
						html += 1;
					}
					if (fetchItem.category === "Python") {
						python += 1;
					}
					if (fetchItem.category === "Java") {
						java += 1;
						fetchJavaItems.push(fetchItem);
					}
					if (fetchItem.category === "Csharp") {
						csharp += 1;
					}
					if (fetchItem.category === "Data Structure and Algorithm") {
						dsna += 1;
						fetchDsnaItems.push(fetchItem);
					}
					fetchMaterialItems.push(fetchItem);
				});

				// setTotalItems(fetchTaskItems.length);

				//Set count
				setJavascriptCount(js);
				setCSSCount(css);
				setPhpCount(php);
				setHtmlCount(html);
				setPythonCount(python);
				setCsharpCount(csharp);
				setDsnaCount(dsna);
				setJavaCount(java);

				//set items
				setJavaItems(fetchJavaItems);
				setDsnaItems(fetchDsnaItems);

				//set loading to flase
				setIsLoading(false);
			});

		return unsubscribe;
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();
		setSubmit(true);
		setError("");
		setSuccessMessage("");
		let title = e.target.title.value;
		let category = e.target.category.value;
		let upload = e.target[1].files[0];

		//Checkin the length of the title to more 3 character long
		if (title.length <= 3) {
			setError("Title should be more the 3 character long!");
			setSubmit(false);
			return false;
		}

		//matching file type
		if (!upload.name.match(/\.(mp4|pdf|mkv)$/)) {
			setError("Please select valid  format('.pdf, mkv or .mp4').");
			setSubmit(false);
			return false;
		}

		//Checking file is less or equal to 0
		if (upload.length === 0) {
			setError("Invalid file!");
			setSubmit(false);
			return false;
		}

		//if file is greater than 25mb - 1mb = 1024 * 1024
		if (upload.size > 26214400) {
			setError("File size exceeds limit!");
			setSubmit(false);
			return false;
		}

		// Create a root reference
		let storageRef = fb.storage().ref();

		//getting fileName from title
		const fileName = title.split(" ").join("_");

		//getting file extension
		const extension = upload.name.substring(upload.name.lastIndexOf(".") + 1);
		// console.log(extension);

		// Upload file and metadata to the object 'images/mountains.jpg'
		const uploadTask = storageRef
			.child("materials/" + fileName + "." + extension)
			.put(upload);

		// Listen for state changes, errors, and completion of the upload.
		uploadTask.on(
			"state_changed",
			(snapshot) => {
				var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				console.log("Upload is " + progress + "% done");
				// eslint-disable-next-line default-case
				switch (snapshot.state) {
					case fb.storage.TaskState.PAUSED: // or 'paused'
						console.log("Upload is paused");
						break;
					case fb.storage.TaskState.RUNNING: // or 'running'
						console.log("Upload is running");
						break;
				}
			},
			(err) => {
				//catches the errors
				console.log(err);
				setError("Error uploading file.");
				setSubmit(false);
			},
			() => {
				// gets the functions from storage refences the image storage in firebase
				uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
					db.collection("materials")
						.add({
							title: title,
							fileUrl: downloadURL,
							fileType: extension,
							category: category,
							time: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
							uploaderName: currentUser.displayName,
							uploaderID: currentUser.uid,
							fileSize: upload.size,
							approved: false,
						})
						.then((docRef) => {
							console.log("Document written with ID: ", docRef.id);
							setSuccessMessage("Material added successfully.");
							setSubmit(false);
							title = "";
							category = "";
							upload = "";
						})
						.catch((error) => {
							setError("Error adding document: ", error);
							setSubmit(false);
						});
				});
			},
		);
	};

	return (
		<Flex flexDir="column" pos="relative" h="100vh">
			<MaterialsCard
				name="Data Structure and Algorithm"
				totalContent={dsnaCount}
				content={dsnaItems}
				loading={isLoading}
			/>
			{/* <MaterialsCard name="Javascript" totalContent={javascriptCount} />
			<MaterialsCard name="Python" totalContent={pythonCount} />
			<MaterialsCard name="Php" totalContent={phpCount} />
			<MaterialsCard name="CSS" totalContent={cssCount} />
			<MaterialsCard name="HTML" totalContent={htmlCount} />
			<MaterialsCard name="CSharp" totalContent={csharpCount} /> */}
			<MaterialsCard
				name="Java"
				totalContent={javaCount}
				content={javaItems}
				loading={isLoading}
			/>

			<IconButton
				boxShadow="dark-lg"
				onClick={onOpen}
				colorScheme="teal"
				pos="fixed"
				size="lg"
				bottom={16}
				right={8}
				icon={<RiAddLine color="white" fontSize="24px" />}
				isRound
			/>

			<Modal isOpen={isOpen} size="sm">
				<ModalOverlay />
				<ModalContent>
					<form onSubmit={handleSubmit}>
						<ModalHeader align="center">Uplaod Material</ModalHeader>
						<ModalBody>
							{error && (
								<Text
									p="2"
									bg="red.100"
									textAlign="center"
									color="red"
									fontSize="md"
									my="1.5"
								>
									{error}
								</Text>
							)}

							{successMessage && (
								<Text
									p="2"
									bg="green.100"
									textAlign="center"
									color="green"
									fontSize="md"
									my="1.5"
								>
									{successMessage}
								</Text>
							)}
							<Box mb="4">
								<Text fontSize="lg">Title</Text>
								<Input
									type="text"
									name="title"
									placeholder="Enter Title"
									required
								/>
							</Box>
							<Box mb="4">
								<Text fontSize="lg">Upload File</Text>
								<Input
									type="file"
									name="upload"
									placeholder="Upload File"
									required
								/>
							</Box>
							<Box mb="4">
								<Text fontSize="lg">Category</Text>
								<Select placeholder="Select option" name="category" required>
									<option value="Data Structure and Algorithm">
										Data Structure and Algorithm
									</option>
									<option value="CSS">CSS</option>
									<option value="Php">Php</option>
									<option value="Javascript">Javascript</option>
									<option value="Csharp">CSharp</option>
									<option value="Python">Python</option>
									<option value="HTML">HTML</option>
									<option value="Java">Java</option>
								</Select>
							</Box>
						</ModalBody>
						<ModalFooter>
							<Button
								disabled={submit}
								colorScheme="red"
								mr={3}
								onClick={onClose}
							>
								Cancel
							</Button>
							<Button
								isLoading={submit ? true : false}
								loadingText="Uploading"
								type="submit"
								colorScheme="teal"
							>
								Submit
							</Button>
						</ModalFooter>
					</form>
				</ModalContent>
			</Modal>
		</Flex>
	);
}

export default Materials;
