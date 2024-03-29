import React, { useState, useEffect, useRef } from "react";
import { Link as RouterLink } from "react-router-dom";

import {
	Divider,
	Flex,
	IconButton,
	Avatar,
	useDisclosure,
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
						<Text fontSize="md" noOfLines={1} fontWeight="light">
							<span
								dangerouslySetInnerHTML={{ __html: notification.message }}
							/>
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
						<NotificationDetail
							notification={notification}
							time={time}
							currentUser={currentUser}
						/>
					</DrawerBody>
				</DrawerContent>
			</Drawer>
		</>
	);
};

const NotificationDetail = ({ notification, time, currentUser }) => {
	// console.log(notification);
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

	let profileLink = "";

	if (currentUser.uid === notification.uid) {
		profileLink = "/profile";
	} else {
		profileLink = `/user/profile/${notification.uid}`;
	}

	return (
		<>
			<Flex flexDir="column" mx={{ base: 2, md: 12, lg: 48 }}>
				<Flex flexDir="row">
					<LinkBox to={profileLink} as={RouterLink}>
						<Avatar src={notification.photoURL} />
					</LinkBox>
					<Flex justifyContent="space-between" w="100%" alignItems="center">
						<Flex flexDir="column" ml="2">
							<LinkBox to={profileLink} as={RouterLink}>
								<Text>{notification.name}</Text>
							</LinkBox>
							<Text>{time}</Text>
						</Flex>
						<IconButton variant="outline" onClick={handleDelete}>
							<IoTrashOutline color="red" />
						</IconButton>
					</Flex>
				</Flex>
				<Divider my="3.5" />
				<Text fontWeight="bold" fontSize="lg" mb="4">
					{notification.title}
				</Text>

				<div
					style={{ fontSize: "16px" }}
					dangerouslySetInnerHTML={{ __html: notification.message }}
				/>
			</Flex>
		</>
	);
};
