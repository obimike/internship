import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
	Flex,
	Text,
	useColorModeValue,
	LinkBox,
	Drawer,
	DrawerContent,
	DrawerOverlay,
	DrawerHeader,
	DrawerBody,
	useDisclosure,
	IconButton,
	Tag,
	TagLabel,
	Divider,
	Button,
	VStack,
	Image,
	Avatar,
	Center,
	Textarea,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Input,
	Box,
} from "@chakra-ui/react";
import {
	IoTimeOutline,
	IoVideocamOutline,
	IoPersonCircleSharp,
} from "react-icons/io5";
import { BiChalkboard } from "react-icons/bi";
import { IoIosClose, IoIosCalendar } from "react-icons/io";
import { RiAddLine } from "react-icons/ri";
import { format } from "date-fns";
import VideoPlayer from "react-video-js-player";
import Closed from "../assets/images/closed.svg";

import { db, firestore } from "../firebase/Config";
import { useAuth } from "../contexts/Auth";

function Lessonscard({ item }) {
	const grayColor = useColorModeValue("gray.600", "gray.400");
	const { isOpen, onOpen, onClose } = useDisclosure();

	let type = "";
	if (item.classType === "Video") {
		type = <IoVideocamOutline fontSize="1.2em" color="black" />;
	} else {
		type = <BiChalkboard fontSize="1.2em" color="black" />;
	}

	//getting the first name from user
	let firstName = item.uploaderName.split(" ");
	firstName = firstName[firstName.length - 1];

	//formating time
	let to = tConvert(item.timeTo);
	let from = tConvert(item.timeFrom);

	function tConvert(time) {
		// Check correct time format and split into components
		time = time
			.toString()
			.match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

		if (time.length > 1) {
			// If time format correct
			time = time.slice(1); // Remove full string match value
			time[5] = +time[0] < 12 ? "am" : "pm"; // Set AM/PM
			time[0] = +time[0] % 12 || 12; // Adjust hours
		}
		return time.join(""); // return adjusted time or original string
	}

	// console.log(to);

	return (
		<>
			<LinkBox to="#" as={RouterLink} onClick={onOpen}>
				<Flex
					as="button"
					flexDir="row"
					borderRadius="4"
					// boxShadow="base"
					borderColor={grayColor}
					p="2"
					mb="3.5"
					w="100%"
					boxShadow="0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
					// transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
					// _hover={{ bg: "#bbedf0" }}
				>
					<Flex
						className="lessonIcon"
						flexDir="column"
						bg="teal.100"
						borderRadius="4"
						alignItems="center"
						justifyContent="center"
						p="1.5"
						w="20%"
						h="3.0rem"
					>
						{type}
						<Text fontSize="0.5em" fontWeight="black" color="black">
							{item.classType} Class
						</Text>
					</Flex>
					<Flex
						ml="1.5"
						flexDir="column"
						justifyContent="space-between"
						w="78%"
						h="3.0rem"
					>
						<Text textAlign="start" isTruncated>
							{item.title}
						</Text>
						<Flex flexDir="row" justifyContent="space-between">
							<Flex alignItems="center">
								<IoPersonCircleSharp color={grayColor} />
								<Text color={grayColor} fontSize="xs" ml="0.5">
									{firstName}
								</Text>
							</Flex>
							<Flex alignItems="center">
								<IoTimeOutline color={grayColor} />
								<Text color={grayColor} fontSize="xs" ml="0.5">
									{from} - {to}
								</Text>
							</Flex>
						</Flex>
					</Flex>
				</Flex>
			</LinkBox>

			{/* Left Drawer */}
			<Drawer placement="left" isOpen={isOpen} size="full">
				<DrawerOverlay />
				<DrawerContent>
					<DrawerHeader borderBottomWidth="1px">
						<Flex flexDir="row" justifyContent="space-between" align="center">
							Class details
							<IconButton
								onClick={onClose}
								variant="ghost"
								icon={<IoIosClose fontSize="32px" />}
							/>
						</Flex>
					</DrawerHeader>
					<DrawerBody w="100%">
						<LessonDetail item={item} />
					</DrawerBody>
				</DrawerContent>
			</Drawer>
		</>
	);
}

export default Lessonscard;

const LessonDetail = ({ item }) => {
	const { currentUser } = useAuth();

	//component state
	const [spinnerLoading, setSpinnerLoading] = useState(false);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [error, setError] = useState("");
	const [successMessage, setSuccessMessage] = useState("");
	const [submit, setSubmit] = useState(false);
	const [selectModalDate, setSelectModalDate] = useState(
		format(new Date(item.date), "yyyy-MM-dd"),
	);
	const [selectTimeFrom, setSelectTimeFrom] = useState(item.timeFrom);
	const [selectTimeTo, setSelectTimeTo] = useState(item.timeTo);

	// const history = useHistory();

	const tConvert = (time) => {
		// Check correct time format and split into components
		time = time
			.toString()
			.match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

		if (time.length > 1) {
			// If time format correct
			time = time.slice(1); // Remove full string match value
			time[5] = +time[0] < 12 ? "am" : "pm"; // Set AM/PM
			time[0] = +time[0] % 12 || 12; // Adjust hours
		}
		return time.join(""); // return adjusted time or original string
	};

	//formating time
	let to = tConvert(item.timeTo);
	let from = tConvert(item.timeFrom);

	let accessDate = format(new Date(item.date), "yyyy-MM-dd");
	accessDate = accessDate + " " + item.timeFrom;

	const handleJoinClass = () => {
		db.collection("lessons")
			.doc(item.itemID)
			.update({
				joined: firestore.FieldValue.arrayUnion({
					uid: currentUser.uid,
					displayName: currentUser.displayName,
					photoURL: currentUser.photoURL,
				}),
			})
			.then(() => {
				db.collection("notifications").add({
					lessonID: item.itemID,
					classType: item.classType,
					uid: currentUser.uid,
					type: "message",
					lessonTitle: item.title,
					message: `${currentUser.displayName} has joined your class`,
					name: currentUser.displayName,
					answer: "",
					photoURL: currentUser.photoURL,
					read: false,
					dateSent: firestore.Timestamp.fromDate(new Date()),
				});
				setSpinnerLoading(true);
				console.log("Document successfully written!");
			});

		console.log("handleJoinClass");
	};
	// console.log(item);

	let uid = "";
	let participantUID = [];
	item.joined.map((join) => {
		participantUID.push(join.uid);
		if (join.uid === currentUser.uid) {
			uid = join.uid;
		}
		// console.log(person);
	});

	// console.log(participantUID);

	const handleReschedule = (e) => {
		console.log("handleReschedule");

		e.preventDefault();
		setSubmit(true);
		setError("");
		setSuccessMessage("");
		let date = e.target.date.value;
		let timeFrom = e.target.timeFrom.value;
		let timeTo = e.target.timeTo.value;
		let reason = e.target.description.value;

		db.collection("lessons")
			.doc(item.itemID)
			.update({
				date: date,
				timeFrom: timeFrom,
				timeTo: timeTo,
			})
			.then(() => {
				db.collection("notifications").add({
					itemID: item.itemID,
					notificationType: item.classType,
					participantID: participantUID, //array
					type: "message",
					title: item.title,
					message: `This class has been reschedule by the author
					<p style={fontWeight:"bold"; margin-top:"4px";} >See reasons below: </p>
					<p>${reason}</p>`,
					answer: "",
					uid: currentUser.uid,
					name: currentUser.displayName,
					photoURL: currentUser.photoURL,
					read: false,
					dateSent: firestore.Timestamp.fromDate(new Date()),
				});
				setSuccessMessage("Class rescheduling was successfully.");
				setSubmit(false);
				console.log("Class rescheduling was successfully!");
			})
			.catch((error) => {
				setError("Error rescheduling class: ", error);
				setSubmit(false);
			});
	};

	const closeModal = () => {
		setError("");
		setSuccessMessage("");
		onClose();
	};

	return (
		<>
			<Flex flexDir="column" mx={{ base: 2, md: 12, lg: 48 }}>
				<Flex align="center" my="2.5">
					<LinkBox
						to={{
							pathname: "/user/profile",
							state: { profile: item.uploaderID },
						}}
					>
						<Avatar src={item.uploaderImage} size="md" />
					</LinkBox>
					<Flex flexDir="column" ml="2.5">
						<Text fontSize="md" fontWeight="bold">
							{item.uploaderName}
						</Text>
						<Text fontSize="sm" fontWeight="bold">
							Author
						</Text>
					</Flex>
				</Flex>
				<Text fontSize="large" fontWeight="bold" my="2">
					{item.title}
				</Text>

				{item.classType === "Video" && (
					<Flex justifyContent="center">
						{new Date() >= new Date(accessDate) ? (
							<VideoPlayer
								controls={true}
								src={item.videoUrl}
								// src={Video}
								poster=""
								width="720"
								height="420"
							/>
						) : (
							<VStack width="720" height="420">
								<Image src={Closed} width="640" height="320" />
								<Text textAlign="center">
									Sorry, you don't have access to this content at this Time.
								</Text>
								<Text>Check back at the time and date below.</Text>
							</VStack>
						)}
					</Flex>
				)}

				<Flex flexDir="row" justifyContent="space-between" mt="2.5">
					<Tag size="lg" colorScheme="teal" borderRadius="full">
						<IoTimeOutline />
						<TagLabel ml="1.5">
							{from} - {to}
						</TagLabel>
					</Tag>

					<Tag size="lg" colorScheme="teal" borderRadius="full">
						<IoIosCalendar />
						<TagLabel ml="1.5">
							{format(new Date(item.date), "dd, MMMM yyyy")}
						</TagLabel>
					</Tag>
				</Flex>
				<Divider my="2.5" />
				<Flex flexDir="column">
					<Text fontSize="large" fontWeight="semibold">
						Participants ({item.joined.length})
					</Text>
					<Flex p="1.5">
						{item.joined.map((person) => (
							<React.Fragment key={person.uid}>
								<Participants
									personID={person.uid}
									personName={person.displayName}
									personImage={person.photoURL}
									// history={history}
								/>
							</React.Fragment>
						))}
					</Flex>
				</Flex>
				<Divider my="2.5" />
				<Flex flexDir="column">
					<Text fontSize="large" fontWeight="semibold">
						Class Description{" "}
					</Text>
					<Text>{item.description}</Text>
				</Flex>
				<Divider my="2.5" />
				<Flex flexDir="column">
					<Flex justifyContent="space-between" alignItems="center">
						<Text fontSize="large" fontWeight="semibold">
							Resources (0)
						</Text>
						<IconButton
							icon={<RiAddLine color="teal" fontSize="24px" />}
							variant="ghost"
							// onClick={onOpen}
						/>
					</Flex>
					<Text fontSize="sm" textAlign="center">
						(Note: All resources must be text base file and maximum of 3 items
						per class)
					</Text>
					<Flex></Flex>
				</Flex>
				<Flex flexDir="row" mt="8" justifyContent="flex-end">
					{uid === currentUser.uid ? (
						<Button colorScheme="teal" variant="outline" disabled={true}>
							Joined
						</Button>
					) : (
						<>
							{item.uploaderID !== currentUser.uid && (
								<Button
									colorScheme="teal"
									variant="outline"
									onClick={handleJoinClass}
									isLoading={spinnerLoading ? true : false}
									loadingText="Joining"
								>
									Join Class +
								</Button>
							)}
						</>
					)}

					{item.uploaderID === currentUser.uid && (
						<Button colorScheme="red" ml="2">
							Delete Class
						</Button>
					)}

					{item.uploaderID === currentUser.uid && (
						<Button colorScheme="teal" ml="2" onClick={onOpen}>
							Reschedule
						</Button>
					)}
				</Flex>
			</Flex>

			<Modal isOpen={isOpen} size="sm">
				<ModalOverlay />
				<ModalContent>
					<form onSubmit={handleReschedule}>
						<ModalHeader align="center">Reschedule Class</ModalHeader>
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

							<Box mb="4">
								<Text fontSize="lg">Reasons for rescheduling class</Text>
								<Textarea
									placeholder="State the reasons for rescheduling this class"
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

const Participants = ({ personID, personName, personImage }) => {
	//getting the first name from user
	let firstName = personName.split(" ");
	firstName = firstName[firstName.length - 1];

	// const personID = person.personID;
	console.log(personName);

	return (
		<LinkBox
			to={{ pathname: "/user/profile", state: { profile: personID } }}
			as={RouterLink}
		>
			<Center flexDir="column" ml="2.5">
				<Avatar src={personImage} />
				<Text>{firstName}</Text>
			</Center>
		</LinkBox>
	);
};
