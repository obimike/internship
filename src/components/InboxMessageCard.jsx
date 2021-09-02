import React, { useState, useEffect, useRef } from "react"; // useState, useEffect, useRefs
import {
	Flex,
	Text,
	useColorModeValue,
	Center,
	Image,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
} from "@chakra-ui/react";

import { db } from "../firebase/Config";
import { useAuth } from "../contexts/Auth";
import NoMessage from "../assets/images/no_message.svg";
import { formatDistance } from "date-fns";

const InboxMessageCard = ({ pid }) => {
	// console.log(pid);
	const [loading, setLoading] = useState(false);
	const [messageItems, setMessageItems] = useState([]);
	const { currentUser } = useAuth();

	const isMounted = useRef(false);
	const divRef = useRef();

	useEffect(() => {
		isMounted.current = true;

		divRef.current.scrollIntoView({ behavior: "smooth" });

		db.collection("messages")
			.where("combinedID", "in", [currentUser.uid + pid, pid + currentUser.uid])
			.orderBy("sentAt", "desc")
			.onSnapshot(function (items) {
				const fetchMessageItems = [];
				items.forEach((item) => {
					const fetchItem = {
						msgID: item.id,
						...item.data(),
					};
					fetchMessageItems.push(fetchItem);
				});
				if (isMounted.current) {
					setMessageItems(fetchMessageItems);
					// console.log("Messages = " + fetchMessageItems);
					//set loading to false
					setLoading(false);
				}
			});

		return () => {
			isMounted.current = false;
			setLoading(false);
		};
	}, [pid, currentUser.uid]);

	// console.log("Messages = " + messages);

	return (
		<Flex flexDir="column">
			{!loading && (
				<Flex
					flexDir="column-reverse"
					mx={{ base: 0, md: 12, lg: 32 }}
					ref={divRef}
				>
					{messageItems.length > 0 ? (
						<>
							{messageItems.map((message) => (
								<MessageBox
									key={message.msgID}
									message={message}
									currentUser={currentUser}
								/>
							))}
						</>
					) : (
						<Center flexDir="column">
							<Image src={NoMessage} width="640" height="320" />
							<Text textAlign="center">No Messages. Start a conversation.</Text>
						</Center>
					)}
				</Flex>
			)}
		</Flex>
	);
};
export default InboxMessageCard;

const MessageBox = ({ message, currentUser }) => {
	const grayColor = useColorModeValue("gray.600", "gray.700");

	let time = formatDistance(new Date(message.sentAt.toDate()), new Date(), {
		includeSeconds: true,
		addSuffix: true,
	});
	const isMounted = useRef(false);

	useEffect(() => {
		isMounted.current = true;

		if (currentUser.uid !== message.senderID)
			db.collection("messages").doc(message.msgID).update({
				read: true,
			});
		return () => {
			isMounted.current = false;
		};
	}, [message.msgID, currentUser.uid, message.senderID]);

	const handleDelete = (msgID) => {
		db.collection("messages").doc(msgID).delete();
	};

	return (
		<>
			{currentUser.uid === message.senderID ? (
				<Flex
					bg="teal.200"
					p="2.5"
					maxW="75%"
					borderTopLeftRadius="16"
					borderTopRightRadius="16"
					borderBottomLeftRadius="16"
					flexWrap="wrap"
					mb="2.5"
					alignSelf="flex-end"
					justifyContent="flex-end"
					color="black"
				>
					<Menu>
						<MenuButton>
							<Text textAlign="left" style={{ wordBreak: "break-word" }}>
								{message.message}
							</Text>
						</MenuButton>
						<MenuList>
							<MenuItem onClick={() => handleDelete(message.msgID)}>
								Delete
							</MenuItem>
						</MenuList>
					</Menu>
					<Text
						fontSize="xs"
						fontStyle="italic"
						color={grayColor}
						ml="1.5"
						pt="2"
						textAlign="right"
					>
						{time}
					</Text>
				</Flex>
			) : (
				<Flex
					bg="gray.300"
					p="2.5"
					w="auto"
					maxW="75%"
					borderTopRightRadius="16"
					borderBottomRightRadius="16"
					borderBottomLeftRadius="16"
					mb="2.5"
					justifyContent="flex-end"
					alignSelf="flex-start"
					color="black"
					flexWrap="wrap"
				>
					<Menu>
						<MenuButton>
							<Text textAlign="left" style={{ wordBreak: "break-word" }}>
								{message.message}
							</Text>
						</MenuButton>
						<MenuList>
							<MenuItem onClick={() => handleDelete(message.msgID)}>
								Delete
							</MenuItem>
						</MenuList>
					</Menu>
					<Text
						fontSize="xs"
						fontStyle="italic"
						color={grayColor}
						ml="1.5"
						pt="2"
						textAlign="right"
					>
						{time}
					</Text>
				</Flex>
			)}
		</>
	);
};