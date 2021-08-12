import React, { useState, useEffect, useRef } from "react";
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
	Textarea,
	RadioGroup,
	Radio,
	Skeleton,
	SkeletonCircle,
	SkeletonText,
	Center,
	Image,
} from "@chakra-ui/react";
import { RiAddLine } from "react-icons/ri";
import { format } from "date-fns";

import { useAuth } from "../contexts/Auth";
import { db, fb, firestore } from "../firebase/Config";
import Lessonscard from "./Lessonscard";

import Calendar from "../assets/images/calendar.svg";

function Lessons() {
	const { selectDate } = useAuth();
	const [isLoading, setIsLoading] = useState(true);
	const [lessonItems, setLessonItems] = useState([]);

	// console.log(typeof lessonItems);

	const isMounted = useRef(false); // note mutable flag

	useEffect(() => {
		isMounted.current = true;

		db.collection("lessons")
			.where("approved", "==", true)
			.orderBy("createdAt", "desc")
			.onSnapshot(function (items) {
				// get lessons content in a n array
				const fetchLessonItems = [];

				items.forEach((item) => {
					const fetchItem = {
						itemID: item.id,
						...item.data(),
					};
					fetchLessonItems.push(fetchItem);
				});
				if (isMounted.current) {
					// setTotalItems(fetchTaskItems.length);
					setLessonItems(fetchLessonItems);
					// console.log(fetchLessonItems);
					//set loading to false
					setIsLoading(false);
				}
			});

		return () => {
			isMounted.current = false;
			// console.log("Entering UseEffect return");
		};
	}, []);

	const filteredOptions = lessonItems.filter(
		(lesson) => lesson.date === `${selectDate}`,
	);

	// console.log(lessonItems);

	return (
		<>
			<LessonsHeader />
			{/* <LessonSkeleton /> */}
			{isLoading && <LessonSkeleton />}
			{!isLoading && (
				<>
					{filteredOptions.length > 0 ? (
						filteredOptions.map((item) => {
							return (
								<div key={item.itemID}>
									<Lessonscard item={item} />
								</div>
							);
						})
					) : (
						<Center flexDir="column">
							<Image src={Calendar} width="640" height="320" />
							<Text textAlign="center">No 'Class' found for this date.</Text>
						</Center>
					)}
				</>
			)}
		</>
	);
}

export default Lessons;

const LessonsHeader = () => {
	const { currentUser, selectDate, setSelectdate } = useAuth();

	const { isOpen, onOpen, onClose } = useDisclosure();
	//component state
	const [error, setError] = useState("");
	const [successMessage, setSuccessMessage] = useState("");
	const [submit, setSubmit] = useState(false);
	const [type, setType] = React.useState("Live");

	const [selectModalDate, setSelectModalDate] = useState(
		format(new Date(), "yyyy-MM-dd"),
	);
	const [selectTimeFrom, setSelectTimeFrom] = useState(
		format(new Date(), "HH:mm"),
	);
	const [selectTimeTo, setSelectTimeTo] = useState(
		format(new Date().setHours(new Date().getHours() + 1), "HH:mm"),
	);

	// console.log(format(new Date().setHours(new Date().getMinutes()), "HH:mm"));

	const handleSubmit = (e) => {
		e.preventDefault();
		setSubmit(true);
		setError("");
		setSuccessMessage("");
		let title = e.target.title.value;
		let date = e.target.date.value;
		let timeFrom = e.target.timeFrom.value;
		let timeTo = e.target.timeTo.value;
		let type = e.target.type.value;
		let upload = "";
		let description = e.target.description.value;

		//Checking the length of the title to more 3 character long
		if (title.length <= 3) {
			setError("Title should be more the 3 character long!");
			setSubmit(false);
			return false;
		}

		if (type === "Video") {
			upload = e.target[6].files[0];

			//matching file type
			if (!upload.name.match(/\.(mp4|mkv|webm)$/)) {
				setError("Please select valid  format('mkv or .mp4').");
				setSubmit(false);
				return false;
			}

			//Checking file is less or equal to 0
			if (upload.length === 0) {
				setError("Invalid file!");
				setSubmit(false);
				return false;
			}

			//if file is greater than 35mb - 1mb = 1024 * 1024
			if (upload.size > 36700160) {
				setError("File size exceeds 35mb!");
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
				.child("lessons/" + fileName + "." + extension)
				.put(upload);

			// Listen for state changes, errors, and completion of the upload.
			uploadTask.on(
				"state_changed",
				(snapshot) => {
					var progress =
						(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
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
					// gets the functions from storage references the image storage in firebase
					uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
						db.collection("lessons")
							.add({
								title: title,
								date: date,
								videoUrl: downloadURL,
								timeFrom: timeFrom,
								timeTo: timeTo,
								classType: type,
								description: description,
								joined: firestore.FieldValue.arrayUnion(),
								createdAt: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
								uploaderName: currentUser.displayName,
								uploaderID: currentUser.uid,
								uploaderimage: currentUser.photoURL,
								approved: false,
							})
							.then((docRef) => {
								console.log("Document written with ID: ", docRef.id);
								setSuccessMessage("Class added successfully.");
								setSubmit(false);
								title = "";
								upload = "";
							})
							.catch((error) => {
								setError("Error adding class: ", error);
								setSubmit(false);
							});
					});
				},
			);

			console.log(upload);
		} else {
			db.collection("lessons")
				.add({
					title: title,
					date: date,
					timeFrom: timeFrom,
					timeTo: timeTo,
					classType: type,
					description: description,
					joined: firestore.FieldValue.arrayUnion(),
					createdAt: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
					uploaderName: currentUser.displayName,
					uploaderID: currentUser.uid,
					uploaderimage: currentUser.photoURL,
					approved: false,
				})
				.then((docRef) => {
					console.log("Document written with ID: ", docRef.id);
					setSuccessMessage("Class added successfully.");
					setSubmit(false);
					e.target.title.value = "";
					e.target.description.value = "";
				})
				.catch((error) => {
					setError("Error adding class: ", error);
					setSubmit(false);
				});
		}
	};

	const closeModal = () => {
		setError("");
		setSuccessMessage("");
		onClose();
	};

	return (
		<>
			<Flex
				alignItems="center"
				justifyContent="space-between"
				mb="2.5"
				w="100%"
			>
				<Input
					type="date"
					w="-moz-fit-content"
					value={selectDate}
					onChange={(e) => setSelectdate(e.target.value)}
				/>
				<IconButton
					icon={<RiAddLine color="teal" fontSize="24px" />}
					variant="ghost"
					onClick={onOpen}
				/>
			</Flex>

			<Modal isOpen={isOpen} size="sm">
				<ModalOverlay />
				<ModalContent>
					<form onSubmit={handleSubmit}>
						<ModalHeader align="center">Add Class</ModalHeader>
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
								<Text fontSize="lg">Date</Text>
								<Input
									type="date"
									name="date"
									value={selectModalDate}
									onChange={(e) => setSelectModalDate(e.target.value)}
									required
								/>
							</Box>

							<Flex justifyContent="space-between" mb="4">
								<Box>
									<Text fontSize="lg">From</Text>
									<Input
										type="time"
										name="timeFrom"
										value={selectTimeFrom}
										onChange={(e) => setSelectTimeFrom(e.target.value)}
										required
									/>
								</Box>
								<Box>
									<Text fontSize="lg">To</Text>
									<Input
										type="time"
										name="timeTo"
										value={selectTimeTo}
										onChange={(e) => setSelectTimeTo(e.target.value)}
										required
									/>
								</Box>
							</Flex>

							<RadioGroup
								defaultValue={type}
								onChange={setType}
								mb={4}
								name="type"
							>
								<Text>Choose Class Type</Text>
								<Flex direction="row" justifyContent="space-between">
									<Radio value="Live">Live Class</Radio>
									<Radio value="Video">Video Class</Radio>
								</Flex>
							</RadioGroup>
							{type === "Video" && (
								<Box mb="4">
									<Text fontSize="lg">Upload Video</Text>
									<Input
										type="file"
										name="upload"
										placeholder="Upload Video"
										required
									/>
								</Box>
							)}

							<Box mb="4">
								<Text fontSize="lg">About this Class</Text>
								<Textarea
									placeholder="Description of the class content"
									name="description"
									size="sm"
									resize="none"
									required
								/>
							</Box>
						</ModalBody>
						<ModalFooter>
							<Button
								disabled={submit}
								colorScheme="red"
								mr={3}
								onClick={closeModal}
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
		</>
	);
};

const LessonSkeleton = () => {
	return (
		<Flex
			as="button"
			flexDir="row"
			p="2"
			mb="3.5"
			w="100%"
			boxShadow="0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
		>
			<Skeleton
				className="lessonIcon"
				flexDir="column"
				bg="teal.100"
				borderRadius="4"
				alignItems="center"
				justifyContent="center"
				p="1.5"
				w="20%"
				h="3.0rem"
			/>
			<Flex
				ml="1.5"
				flexDir="column"
				justifyContent="space-between"
				w="78%"
				h="3.0rem"
			>
				<SkeletonText noOfLines={2} />
				<Flex flexDir="row" justifyContent="space-between">
					<Flex alignItems="center">
						<SkeletonCircle size="3" />
						<SkeletonText w="8" noOfLines={1} ml="0.5" />
					</Flex>
					<Flex alignItems="center">
						<SkeletonCircle size="3" />
						<SkeletonText w="8" noOfLines={1} ml="0.5" size="3" />
					</Flex>
				</Flex>
			</Flex>
		</Flex>
	);
};
