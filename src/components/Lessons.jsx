import React, { useState } from "react";
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
} from "@chakra-ui/react";
import { RiAddLine } from "react-icons/ri";
import { format } from "date-fns";

import { useAuth } from "../contexts/Auth";
import { db, fb } from "../firebase/Config";
import Lessonscard from "./Lessonscard";

function Lessons() {
	return (
		<>
			<LessonsHeader />
			<Lessonscard />
		</>
	);
}

export default Lessons;

const LessonsHeader = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { currentUser } = useAuth();
	//component state
	const [error, setError] = useState("");
	const [successMessage, setSuccessMessage] = useState("");
	const [submit, setSubmit] = useState(false);
	const [type, setType] = React.useState("Live");

	const [selectDate, setSelectdate] = useState(
		format(new Date(), "yyyy-MM-dd"),
	);
	const [selectTime, setSelectTime] = useState(format(new Date(), "hh:mm"));

	const handleSubmit = (e) => {
		e.preventDefault();
		// setSubmit(true);
		setError("");
		setSuccessMessage("");
		let title = e.target.title.value;
		let date = e.target.date.value;
		let timeFrom = e.target.timeFrom.value;
		let timeTo = e.target.timeTo.value;
		let type = e.target.type.value;
		let upload = "";
		let description = e.target.description.value;

		//Checkin the length of the title to more 3 character long
		if (title.length <= 3) {
			setError("Title should be more the 3 character long!");
			setSubmit(false);
			return false;
		}

		if (type === "Video") {
			upload = e.target[6].files[0];

			//matching file type
			if (!upload.name.match(/\.(mp4|mkv)$/)) {
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
					createdAt: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
					uploaderName: currentUser.displayName,
					uploaderID: currentUser.uid,
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
		}

		console.log(title);
		console.log(date);
		console.log(timeFrom);
		console.log(timeTo);
		console.log(type);
		console.log(description);
		setSubmit(false);
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
					w="50%"
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
									value={format(new Date(), "yyyy-MM-dd")}
									required
								/>
							</Box>

							<Flex justifyContent="space-between" mb="4">
								<Box>
									<Text fontSize="lg">From</Text>
									<Input
										type="time"
										name="timeFrom"
										required
										// value={selectTime}
									/>
								</Box>
								<Box>
									<Text fontSize="lg">To</Text>
									<Input type="time" name="timeTo" required />
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
									<Radio value="Video">Video Calss</Radio>
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
		</>
	);
};
