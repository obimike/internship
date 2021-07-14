import React, { useState } from "react";
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
	const [error, setError] = useState("");
	const [successMessage, setSuccessMessage] = useState("");
	const [submit, setSubmit] = useState(false);
	const { currentUser } = useAuth();

	const handleSubmit = (e) => {
		e.preventDefault();
		setSubmit(true);
		setError("");
		setSuccessMessage("");
		let title = e.target.title.value;
		let category = e.target.category.value;
		let upload = e.target[1].files[0];

		//matching file type
		if (!upload.name.match(/\.(mp4|pdf|mkv)$/)) {
			setError("Please select valid format('.pdf, mkv or .mp4').");
			setSubmit(false);
			return false;
		}

		//if file is greater than 25mb - 1mb = 1024 * 1024
		if (upload.size > 26214400) {
			setError("File size exceeds limit!");
			setSubmit(false);
			return false;
		}

		const uploadTask = fb.storage().ref(`/materials/`).put(upload);
		//initiates the firebase side uploading

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
			<MaterialsCard name="Data Structure and Algorithm" totalContent={5} />
			<MaterialsCard name="Javascript" totalContent={9} />
			<MaterialsCard name="Python" totalContent={14} />
			<MaterialsCard name="Php" totalContent={26} />
			<MaterialsCard name="CSS" totalContent={15} />
			<MaterialsCard name="HTML" totalContent={6} />
			<MaterialsCard name="CSharp" totalContent={10} />
			<MaterialsCard name="Java" totalContent={3} />

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
								<Text textAlign="center" color="red" fontSize="md" my="1.5">
									{error}
								</Text>
							)}

							{successMessage && (
								<Text textAlign="center" color="green" fontSize="md" my="1.5">
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

// function checkForErrors(title, category, upload, setError) {
// 	if (title.length === 0) return setError("Title Cannot be empty!");
// 	if (title.length <= 3)
// 		return setError("Title should be more the 3 character long!");
// 	if (category.length === 0) return setError("Please select a category!");
// 	if (upload.length === 0) return setError("You need to upload a File!");
// }

export default Materials;
