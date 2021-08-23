import React, { useState } from "react";
import {
	Text,
	Flex,
	// useColorModeValue,
	IconButton,
	Drawer,
	DrawerContent,
	DrawerOverlay,
	DrawerHeader,
	DrawerBody,
	DrawerFooter,
	Textarea,
	Avatar,
} from "@chakra-ui/react";

// import { HiEmojiHappy } from "react-icons/hi";
import { IoIosClose } from "react-icons/io";
import { IoSendSharp } from "react-icons/io5";
import InboxMessageCard from "../components/InboxMessageCard";

import { db, firestore } from "../firebase/Config";
import { useAuth } from "../contexts/Auth";

function ChatBox({ pid, user, openInboxDialog, setOpenInboxDialog }) {
	// const grayColor = useColorModeValue("gray.600", "gray.400");
	const [messageText, setMessageText] = useState("");

	const { currentUser } = useAuth();

	const handleSubmitMessage = (e) => {
		e.preventDefault();
		e.target.message.value = "";

		db.collection("messages")
			.add({
				receiverID: pid,
				receiverName: user.lastName + " " + user.firstName,
				receiverImage: user.photoURL,
				senderID: currentUser.uid,
				senderName: currentUser.displayName,
				senderImage: currentUser.photoURL,
				combinedID: currentUser.uid + pid,
				message: messageText,
				read: false,
				sentAt: firestore.Timestamp.fromDate(new Date()),
			})
			.then((docRef) => {
				// console.log("Message sent with ID: ", docRef.id);
				setMessageText("");
			});

		db.collection("users")
			.doc(currentUser.uid)
			.update({
				contacts: firestore.FieldValue.arrayUnion({
					cid: pid,
				}),
			});

		db.collection("users")
			.doc(pid)
			.update({
				contacts: firestore.FieldValue.arrayUnion({
					cid: currentUser.uid,
				}),
			});
	};

	return (
		<>
			{/* Left Drawer for chat */}
			<Drawer placement="left" isOpen={openInboxDialog} size="full">
				<DrawerOverlay />
				<DrawerContent>
					<DrawerHeader borderBottomWidth="1px">
						<Flex
							flexDir="row"
							justifyContent="space-between"
							align="center"
							mx={{ base: 0, md: 12, lg: 24 }}
						>
							<Flex align="center">
								<Avatar size="md" src={user.photoURL} />
								<Text ml="1.5">{user.displayName}</Text>
							</Flex>
							<IconButton
								onClick={() => {
									setOpenInboxDialog(false);
								}}
								variant="ghost"
								icon={<IoIosClose fontSize="32px" />}
							/>
						</Flex>
					</DrawerHeader>

					<DrawerBody>
						<InboxMessageCard pid={pid} />
					</DrawerBody>

					<DrawerFooter mx={{ base: 0, md: 12, lg: 24 }}>
						<Flex
							w="100vw"
							justifyContent="center"
							h={{ base: "3rem", md: "6rem", lg: "auto" }}
							alignItems="center"
						>
							{/* <IconButton
								// onClick={onClose}
								color={grayColor}
								variant="ghost"
								icon={<HiEmojiHappy fontSize="32px" />}
							/> */}
							<form
								onSubmit={handleSubmitMessage}
								style={{
									width: "100%",
									alignItems: "center",
									justifyContent: "center",
								}}
							>
								<Flex w="100%" justifyContent="center" alignItems="center">
									<Textarea
										type="text"
										placeholder="Type a message"
										name="message"
										size="lg"
										ml="1.5"
										minH="1rem"
										resize="none"
										value={messageText}
										onChange={(e) => {
											setMessageText(e.target.value);
										}}
										style={{ maxHight: "6rem" }}
									/>
									<IconButton
										// isRound={true}
										type="submit"
										colorScheme="teal"
										ml="1.5"
										variant="ghost"
										icon={<IoSendSharp fontSize="30px" />}
										disabled={messageText ? false : true}
										// onClick={handleSubmitMessage}
									/>
								</Flex>
							</form>
						</Flex>
					</DrawerFooter>
				</DrawerContent>
			</Drawer>
		</>
	);
}
export default ChatBox;
