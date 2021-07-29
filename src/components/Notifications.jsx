import React, { useState, useEffect, useRef } from "react";
import { Link as RouterLink } from "react-router-dom";

import {
	Divider,
	Flex,
	Heading,
	IconButton,
	Avatar,
	useColorModeValue,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	Link,
	useDisclosure,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalFooter,
	ModalBody,
	Button,
	Text,
	Box,
	Drawer,
	DrawerContent,
	DrawerOverlay,
	DrawerHeader,
	DrawerBody,
	LinkBox,
} from "@chakra-ui/react";

import { IoIosClose } from "react-icons/io";

import { IoTrashOutline } from "react-icons/io5";
import { formatDistance } from "date-fns";

import { useAuth } from "../contexts/Auth";
import { db } from "../firebase/Config";

function Notifications() {
	const [loading, setLoading] = useState(true);
	const [notifications, setNotifications] = useState([]);
	const { currentUser } = useAuth();

	// const { isOpen, onOpen, onClose } = useDisclosure();

	const isMounted = useRef(false); // note mutable flag

	useEffect(() => {
		setLoading(true);
		isMounted.current = true;


		db.collection("notifications")
			.where("participantID", "array-contains", currentUser.uid)
			.orderBy("dateSent", "desc")
			.onSnapshot(function (querySnapshot) {
				const fetchNotifications = [];
				querySnapshot.forEach((doc) => {
					const fetchNotification = {
						notificationID: doc.id,
						...doc.data(),
					};
					fetchNotifications.push(fetchNotification);
				});
				if (isMounted.current) {
					setNotifications(fetchNotifications);
					// setProjectItem(fetchTasks);
					setLoading(false);
				}
			});
		return () => {
			isMounted.current = false;
		};
	}, [currentUser.uid]);

	return (
		<>
			{loading && (
				<Box style={{ textAlign: "center", margin: 5 }}>
					<Text>Loading...</Text>
				</Box>
			)}
			{!loading && (
				<div>
					{Object.keys(notifications).length === 0 && (
						<Box style={{ textAlign: "center", margin: 5 }}>
							<Text>You don't have any notifications!</Text>
						</Box>
					)}
				</div>
			)}
			{!loading && (
				<Box>
					{notifications.map((notification) => (
						<Box key={notification.notificationID}>
							<NotificationCard
								notification={notification}
								currentUser={currentUser}
							/>
						</Box>
					))}
				</Box>
			)}
		</>
	);
}
export default Notifications;

const NotificationCard = ({ notification, currentUser }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	let time = formatDistance(
		new Date(notification.dateSent.toDate()),
		new Date(),
		{
			includeSeconds: true,
			addSuffix: true,
		},
	);
	return (
		<>
			<LinkBox to="#" as={RouterLink} onClick={onOpen}>
				<Flex m="3">
					<Avatar src={notification.photoURL} />
					<Flex flexDir="column" style={{ marginLeft: "10px" }} w="100%">
						<Flex justifyContent="space-between">
							<Text
								fontSize="lg"
								fontWeight={notification.read === false ? "bold" : "normal"}
								color={
									notification.read === false ? "textPrimary" : "textSecondary"
								}
							>
								{notification.name}
							</Text>
							<Text
								fontSize="sm"
								color={notification.read === false ? "teal" : ""}
							>
								{time}
							</Text>
						</Flex>
						<Text fontSize="md" noOfLines={1}>
							{notification.message}
						</Text>
					</Flex>
				</Flex>
			</LinkBox>
			<Divider />

			{/* Left Drawer */}
			<Drawer placement="left" isOpen={isOpen} size="full">
				<DrawerOverlay />
				<DrawerContent>
					<DrawerHeader borderBottomWidth="1px">
						<Flex flexDir="row" justifyContent="space-between" align="center">
							Notification
							<IconButton
								onClick={onClose}
								variant="ghost"
								icon={<IoIosClose fontSize="32px" />}
							/>
						</Flex>
					</DrawerHeader>
					<DrawerBody w="100%">
						<NotificationDetail notification={notification} time={time} />
					</DrawerBody>
				</DrawerContent>
			</Drawer>
		</>
	);
};

const NotificationDetail = ({ notification, time }) => {
	console.log(notification);
	const isMounted = useRef(false); // note mutable flag

	//changing read from false to true
	useEffect(() => {
		isMounted.current = true;
		if (isMounted.current) {
			if (notification.read === false) {
				db.collection("notifications").doc(notification.notificationID).update({
					read: true,
				});
			}
		}
		return () => {
			isMounted.current = false;
		};
	}, [notification.notificationID, notification.read]);

	const handleDelete = (e) => {
		e.preventDefault();
		db.collection("notifications").doc(notification.notificationID).delete();
	};

	return (
		<>
			<Flex flexDir="column">
				<Flex flexDir="row">
					<Avatar src={notification.photoURL} />
					<Flex justifyContent="space-between" w="100%" alignItems="center">
						<Flex flexDir="column" ml="2">
							<Text>{notification.name}</Text>
							<Text>{time}</Text>
						</Flex>
						<IconButton variant="outline" onClick={handleDelete}>
							<IoTrashOutline color="red" />
						</IconButton>
					</Flex>
				</Flex>
				<Divider my="3.5" />
				<Text fontWeight="bold">{notification.title}</Text>
				<Text mt="4">
					{notification.message}
				</Text>
			</Flex>
		</>
	);
};
