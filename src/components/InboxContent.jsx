import React from "react";
import InboxCard from "./InboxCard";
import { db } from "../firebase/Config";
import { useAuth } from "../contexts/Auth";

import { Flex, SkeletonCircle, SkeletonText } from "@chakra-ui/react";

function InboxContent({ contacts }) {
	console.log(contacts);

	// function _groupBy(key) {
	// 	return function group(array) {
	// 		return array.reduce((acc, obj) => {
	// 			const property = obj[key];
	// 			acc[property] = acc[property] || [];
	// 			acc[property].push(obj);
	// 			return acc;
	// 		}, {});
	// 	};
	// }

	return (
		<>
			{contacts.map((contact) => (
				<React.Fragment key={contact.cid}>
					<InboxContacts contact={contact} />
				</React.Fragment>
			))}
		</>
	);
}
export default InboxContent;

const InboxContacts = ({ contact }) => {
	const { currentUser } = useAuth();
	const [loading, setLoading] = React.useState(true);
	const [newMessage, setNewMessage] = React.useState(0);
	const [inboxItems, setInboxItems] = React.useState({});

	const isMounted = React.useRef(false);

	React.useEffect(() => {
		isMounted.current = true;

		db.collection("messages")
			.where("combinedID", "in", [
				currentUser.uid + contact.cid,
				contact.cid + currentUser.uid,
			])
			.orderBy("sentAt", "desc")
			.onSnapshot(function (items) {
				//initialize count
				let unread = 0;
				const fetchMessageItems = [];
				items.forEach((item) => {
					const fetchItem = {
						...item.data(),
					};
					if (fetchItem.read === false) {
						unread += 1;
					}
					fetchMessageItems.push(fetchItem);
					// console.log(fetchItem);
				});
				if (isMounted.current) {
					setInboxItems(fetchMessageItems[0]);
					setNewMessage(unread);
					// console.log(fetchPostItems);

					//set loading to false
					setLoading(false);
				}
			});

		return () => {
			isMounted.current = false;
		};
	}, [currentUser.uid, contact.cid]);

	return (
		<>
			{loading && <InboxCardSkeleton />}
			{!loading && (
				<InboxCard
					contact={contact}
					unread={newMessage}
					lastMessage={inboxItems}
				/>
			)}
		</>
	);
};

const InboxCardSkeleton = () => {
	return (
		<Flex py="1.5" w="100%">
			<SkeletonCircle size="12" />
			<Flex
				flexDir="column"
				ml="1.5"
				justifyContent="space-between"
				py="2.5"
				w="100%"
			>
				<Flex justifyContent="space-between">
					<SkeletonText w="40" noOfLines={1} />
					<SkeletonText w="10" ml="1.5" noOfLines={1} />
				</Flex>
				<Flex align="flex-end" justifyContent="space-between">
					<SkeletonText noOfLines={1} w="80%" />
					<SkeletonText ml="1.5" noOfLines={1} w="5%" />
				</Flex>
			</Flex>
		</Flex>
	);
};
