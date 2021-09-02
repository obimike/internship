import React from "react";
import { Flex, Text, useColorModeValue, Avatar } from "@chakra-ui/react";
import ChatBox from "../components/ChatBox";

import { formatDistance } from "date-fns";

const InboxCard = ({ unread, lastMessage, user }) => {
	
	const grayColor = useColorModeValue("gray.600", "gray.400");
	const [openInboxDialog, setOpenInboxDialog] = React.useState(false);

	let time = formatDistance(new Date(lastMessage.sentAt.toDate()), new Date(), {
		includeSeconds: true,
		addSuffix: true,
	});

	return (
		<>
			<Flex
				py="1.5"
				onClick={() => {
					setOpenInboxDialog(true);
				}}
				style={{cursor: 'pointer'}}
			>
				<Avatar size="md" src={user.photoURL} />
				<Flex flexDir="column" ml="1.5" w="100%">
					<Flex justifyContent="space-between">
						<Text>{user.displayName}</Text>
						<Text
							fontSize="sm"
							fontStyle="italic"
							color={
								lastMessage.read === false &&
								lastMessage.receiverID !== user.uid
									? "teal"
									: grayColor
							}
						>
							{time}
						</Text>
					</Flex>
					<Flex align="flex-end" justifyContent="space-between">
						<Text
							noOfLines={1}
							fontSize="sm"
							fontWeight={
								lastMessage.read === false &&
								lastMessage.receiverID !== user.uid
									? "bold"
									: ""
							}
						>
							{lastMessage.message}
						</Text>
						<Text ml="3.5" color="teal" fontWeight="bold">
							{unread === 0 ? "" : unread}
						</Text>
					</Flex>
				</Flex>
			</Flex>
			<ChatBox
				user={user}
				pid={user.uid}
				openInboxDialog={openInboxDialog}
				setOpenInboxDialog={setOpenInboxDialog}
			/>
		</>
	);
};

export default InboxCard;
