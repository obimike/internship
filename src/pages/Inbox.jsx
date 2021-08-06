import React, { useState, useEffect, useRef } from "react";
import InboxContent from "../components/InboxContent";
import Header from "../components/Header";

import {
	Flex,
	Text,
	Center,
	Image,
	// Textarea,
	// Skeleton,
	// SkeletonCircle,
	// SkeletonText,
	// Center,
} from "@chakra-ui/react";

import { db } from "../firebase/Config";
import { useAuth } from "../contexts/Auth";
import NoMessage from "../assets/images/no_message.svg";

export default function Inbox() {
	const [loading, setLoading] = useState(false);
	const [messageItems, setMessageItems] = useState([]);
	const { currentUser } = useAuth();

	const isMounted = useRef(false);

	useEffect(() => {
		isMounted.current = true;

		db.collection("messages")
			.where("participants", "array-contains", currentUser.uid)
			.orderBy("sentAt", "desc")
			.onSnapshot(function (items) {
				const fetchMessageItems = [];
				items.forEach((item) => {
					const fetchItem = {
						inboxID: item.id,
						...item.data(),
					};
					fetchMessageItems.push(fetchItem);
				});

				if (isMounted.current) {
					setMessageItems(fetchMessageItems);
					// console.log(fetchMessageItems);
					//set loading to false
					setLoading(false);
				}
			});

		return () => {
			isMounted.current = false;
			setLoading(false);
		};
	}, [currentUser.uid]);

	return (
		<Header>
			<Flex mt={24}>
				{!loading && (
					<>
						{messageItems.length > 0 ? (
							<Flex>
								<Text size="lg" fontWeight="bold">
									Inbox
								</Text>

								<InboxContent inboxMessage={messageItems} />
							</Flex>
						) : (
							<Center flexDir="column">
								<Image src={NoMessage} width="640" height="320" />
								<Text textAlign="center">No Message found!</Text>
							</Center>
						)}
					</>
				)}
			</Flex>
		</Header>
	);
}
