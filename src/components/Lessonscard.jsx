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
					_hover={{ bg: "#ebedf0" }}
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
	const [spinnerLoading, setSpinnerLoading] = useState(false);

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
					classType : item.classType,
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
	console.log(item);

	let uid = "";

	// console.log(item.joined);

	item.joined.map((join) => {
		if (join.uid === currentUser.uid) uid = join.uid;
		// console.log(person);
	});

	return (
		<>
			<Flex flexDir="column">
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
							Join Class +
						</Button>
					) : (
						<>
							{item.uploaderID === currentUser.uid ? (
								<Button colorScheme="teal" variant="outline" disabled={true}>
									Join Class +
								</Button>
							) : (
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

					<Button colorScheme="teal" ml="2">
						Reschedule
					</Button>
				</Flex>
			</Flex>
		</>
	);
};

const Participants = (person) => {
	// console.log(person.photoURL);

	//getting the first name from user
	let firstName = person.personName.split(" ");
	firstName = firstName[firstName.length - 1];

	return (
		<Center flexDir="column" ml="2.5">
			<Avatar src={person.photoURL} />
			<Text>{firstName}</Text>
		</Center>
	);
};
