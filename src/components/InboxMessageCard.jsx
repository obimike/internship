import React, { useState, useEffect, useRef } from "react"; // useState, useEffect, useRefs
import { Flex, Text, useColorModeValue, Center, Image } from "@chakra-ui/react";

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

	useEffect(() => {
		isMounted.current = true;

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
				<Flex flexDir="column-reverse" mx={{ base: 0, md: 12, lg: 32 }}>
					{messageItems.length > 0 ? (
						<>
							{messageItems.map((message) => (
								<React.Fragment key={message.msgID}>
									<MessageBox message={message} currentUser={currentUser} />
								</React.Fragment>
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
					<Text style={{ wordBreak: "break-word" }}>{message.message}</Text>
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
					<Text style={{ wordBreak: "break-word" }}>{message.message}</Text>
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
