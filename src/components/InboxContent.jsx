import React from "react"; // useState, useEffect, useRefs
import { Flex, Text } from "@chakra-ui/react";

import InboxCard from "./InboxCard";
import { useAuth } from "../contexts/Auth";

function InboxContent({ inboxMessage }) {
	const { currentUser } = useAuth();
	// console.log(inboxMessage);

	let sort = "";
	for (let i in inboxMessage) {
		// if (inboxMessage.participants[i] !== currentUser.uid) {
		// 	// console.log(inboxMessage.participants[i] + " ");`participants[${sort}]`
		// 	sort = inboxMessage.participants[i];
		// 	console.log(sort);
		// }
		for (let j in inboxMessage[i]) {
			console.log(j.inboxID);
		}
	}

	function _groupBy(key) {
		return function group(array) {
			return array.reduce((acc, obj) => {
				const property = obj[key];
				acc[property] = acc[property] || [];
				acc[property].push(obj);
				return acc;
			}, {});
		};
	}

	console.log(sort);

	const groupByReceiverID = _groupBy(`participants.values() === ${sort}`);

	console.log(groupByReceiverID(inboxMessage));

	const showTeam = [];

	// for (var key in groupByReceiverID(inboxMessage)) {
	// 	if (groupByReceiverID(inboxMessage).hasOwnProperty(key)) {
	// 		<Flex key={key} mt={44}>
	// 			{/* {console.log(key)} */}
	// 			<Text>{key}</Text>
	// 		</Flex>;
	// 	}
	// }

	return (
		<Flex>
			{/* <InboxCard /> */}
			{showTeam}
		</Flex>
	);
}

export default InboxContent;
