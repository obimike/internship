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
import { formatDistance } from "date-fns";

import { useAuth } from "../contexts/Auth";
import { db } from "../firebase/Config";

function Notifications() {
	const [loading, setLoading] = useState(true);
	const [notifications, setNotifications] = useState([]);
	const { currentUser } = useAuth();

	const { isOpen, onOpen, onClose } = useDisclosure();

	const isMounted = useRef(false); // note mutable flag

	useEffect(() => {
		setLoading(true);
		isMounted.current = true;

		db.collection("notifications")
			.where("uid", "==", currentUser.uid)
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
				<Box>
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
							{NotificationCard(
								notification,
								currentUser,
								isOpen,
								onOpen,
								onClose,
							)}
						</Box>
					))}
				</Box>
			)}
		</>
	);
}
export default Notifications;

const NotificationCard = (
	notification,
	currentUser,
	isOpen,
	onOpen,
	onClose,
) => {
    console.log(notification);
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
								fontWeight={notification.read === false ? "bold" : "normal"}
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
						<NotificationDetail notification={notification} />
					</DrawerBody>
				</DrawerContent>
			</Drawer>
		</>
	);
};

const NotificationDetail = (notification) => {
	return <></>;
};
