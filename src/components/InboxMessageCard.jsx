import React, { useState, useEffect, useRef } from "react"; // useState, useEffect, useRefs
import { Flex, Text, useColorModeValue } from "@chakra-ui/react";

import { db } from "../firebase/Config";

const InboxMessageCard = ({ pid }) => {
	console.log(pid);
	const [loading, setLoading] = useState(false);
	const [messages, setMessages] = useState("");

	const isMounted = useRef(false);
	useEffect(() => {
		db.collection("lessons")
			.where("senderID", "==", pid)
			.orderBy("sentAt", "desc")
			.onSnapshot(function (items) {
				// get lessons content in a n array
				const fetchMessageItems = [];

				items.forEach((item) => {
					const fetchItem = {
						msgID: item.id,
						...item.data(),
					};
					fetchMessageItems.push(fetchItem);
				});
				if (isMounted.current) {
					// setTotalItems(fetchTaskItems.length);
					setMessages(fetchMessageItems);
					// console.log(fetchLessonItems);

					//set loading to false
					setLoading(false);
				}
			});

		return () => {
			isMounted.current = false;
			setLoading(false);
		};
	}, [pid]);

	const grayColor = useColorModeValue("gray.600", "gray.700");
	return <Flex flexDir="column"></Flex>;
};

export default InboxMessageCard;
