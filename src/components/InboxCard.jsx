import React from "react"; // useState, useEffect, useRefs
import { Link as RouterLink } from "react-router-dom";
import {
	Flex,
	Text,
	useDisclosure,
	useColorModeValue,
	Avatar,
	LinkBox,
	IconButton,
	Drawer,
	DrawerContent,
	DrawerOverlay,
	DrawerHeader,
	DrawerBody,
	DrawerFooter,
	Input,
	// Modal,
	// ModalOverlay,
	// ModalContent,
	// ModalHeader,
	// ModalFooter,
	// ModalBody,
	// Button,
	// Box,
	// Textarea,
	// Skeleton,
	// SkeletonCircle,
	// SkeletonText,
	// Center,
} from "@chakra-ui/react";
import { HiEmojiHappy } from "react-icons/hi";
import { IoIosClose } from "react-icons/io";
import { IoSendSharp } from "react-icons/io5";

import InboxMessageCard from "../components/InboxMessageCard";

const InboxCard = () => {
	const grayColor = useColorModeValue("gray.600", "gray.400");
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<>
			<LinkBox to="#" as={RouterLink} onClick={onOpen} mb="4">
				<Flex py="1.5">
					<Avatar size="md" />
					<Flex flexDir="column" ml="1.5">
						<Flex justifyContent="space-between">
							<Text>Angelina Jolie</Text>
							<Text fontSize="sm" fontStyle="italic" color={grayColor}>
								3 hrs ago
							</Text>
						</Flex>
						<Flex align="flex-end" justifyContent="space-between">
							<Text noOfLines={1} fontSize="sm">
								By using this Hook, you tell React that your component needs to
								do something after render.
							</Text>
							<Text ml="1.5">2</Text>
						</Flex>
					</Flex>
				</Flex>
			</LinkBox>

			{/* Left Drawer for chat */}
			<Drawer placement="left" isOpen={isOpen} size="full">
				<DrawerOverlay />
				<DrawerContent>
					<DrawerHeader borderBottomWidth="1px">
						<Flex flexDir="row" justifyContent="space-between" align="center">
							<LinkBox to="/profile" as={RouterLink}>
								<Flex align="center">
									<Avatar size="md" />
									<Text ml="1.5">Angelina Jolie</Text>
								</Flex>
							</LinkBox>
							<IconButton
								onClick={onClose}
								variant="ghost"
								icon={<IoIosClose fontSize="32px" />}
							/>
						</Flex>
					</DrawerHeader>
					<DrawerBody w="100%">
						<InboxMessageCard />
					</DrawerBody>

					<DrawerFooter w="100%">
						<Flex
							w="100vw"
							justifyContent="center"
							h={{ base: "6rem", md: "6rem", lg: "auto" }}
							alignItems="center"
						>
							<IconButton
								// onClick={onClose}
								color={grayColor}
								variant="ghost"
								icon={<HiEmojiHappy fontSize="32px" />}
							/>
							<Input
								type="text"
								placeholder="Type a message"
								name="message"
								size="lg"
								ml="1.5"
								isFullWidth
							/>
							<IconButton
								type="submit"
								colorScheme="teal"
								ml="1.5"
								variant="ghost"
								icon={<IoSendSharp fontSize="32px" />}
								disabled={true}
							/>
						</Flex>
					</DrawerFooter>
				</DrawerContent>
			</Drawer>
		</>
	);
};

export default InboxCard;
