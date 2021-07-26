import React, {
	// useState, useEffect, useRefs
} from "react";
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

function InboxContent() {
	return (
		<Flex
			mt={24}
			flexDir="column"
			align={{ base: "", md: "center", lg: "center" }}
		>
			<InboxCard />
			<InboxCard />
			<InboxCard />
			<InboxCard />
		</Flex>
	);
}
export default InboxContent;

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

			{/* Left Drawer */}
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
						{/* <Flex
							bg="yellow.300"
							w="100%"
							h="64px"
							pos="fixed"
							size="lg"
							bottom={0}
							right={0}
							zIndex={999}
						>
							
						</Flex> */}
					</DrawerBody>

					<DrawerFooter>
						<Flex w="100%" h={{ base: "6rem", md: "6rem", lg: "auto" }}>
							<IconButton
								// onClick={onClose}
								color={grayColor}
								variant="ghost"
								icon={<HiEmojiHappy fontSize="32px" />}
							/>
							<form>
								<Input type="text" ml="1.5" name='message' />
								<IconButton
									type="submit"
									colorScheme="teal"
									ml="1.5"
									variant="ghost"
									icon={<IoSendSharp fontSize="32px" />}
									disabled={true}
								/>
							</form>
						</Flex>
					</DrawerFooter>
				</DrawerContent>
			</Drawer>
		</>
	);
};

const InboxMessageCard = () => {
	const grayColor = useColorModeValue("gray.600", "gray.700");
	return (
		<Flex flexDir="column">
			<Flex
				bg="gray.300"
				p="2.5"
				w="auto"
				maxW="75%"
				borderTopRightRadius="16"
				borderBottomRightRadius="16"
				borderBottomLeftRadius="16"
				flexWrap="wrap"
				mb="4"
				justifyContent="flex-end"
				alignSelf="flex-start"
				color="black"
			>
				<Text>
					For example, we might want to set up a subscription to some external
					data source.{" "}
				</Text>
				<Text
					fontSize="xs"
					fontStyle="italic"
					color={grayColor}
					ml="1.5"
					pt="2"
					textAlign="right"
				>
					6:37pm
				</Text>
			</Flex>

			<Flex
				bg="teal.200"
				p="2.5"
				maxW="75%"
				borderTopLeftRadius="16"
				borderBottomRightRadius="16"
				borderBottomLeftRadius="16"
				flexWrap="wrap"
				mb="4"
				alignSelf="flex-end"
				justifyContent="flex-end"
			>
				<Text>By using </Text>
				<Text
					fontSize="xs"
					fontStyle="italic"
					color={grayColor}
					ml="1.5"
					pt="2"
					textAlign="right"
				>
					6:37pm
				</Text>
			</Flex>

			<Flex
				bg="teal.200"
				p="2.5"
				maxW="75%"
				borderTopLeftRadius="16"
				borderBottomRightRadius="16"
				borderBottomLeftRadius="16"
				flexWrap="wrap"
				mb="4"
				alignSelf="flex-end"
				justifyContent="flex-end"
			>
				<Text>
					Earlier, we looked at how to express side effects that don’t require
					any cleanup. However, some effects do.
				</Text>
				<Text
					fontSize="xs"
					fontStyle="italic"
					color={grayColor}
					ml="1.5"
					pt="2"
					textAlign="right"
				>
					6:37pm
				</Text>
			</Flex>

			<Flex
				bg="gray.300"
				p="2.5"
				w="auto"
				maxW="75%"
				borderTopRightRadius="16"
				borderBottomRightRadius="16"
				borderBottomLeftRadius="16"
				flexWrap="wrap"
				mb="4"
				justifyContent="flex-end"
				alignSelf="flex-start"
			>
				<Text>For example,</Text>
				<Text
					fontSize="xs"
					fontStyle="italic"
					color={grayColor}
					ml="1.5"
					pt="2"
					textAlign="right"
				>
					6:37pm
				</Text>
			</Flex>

			<Flex
				bg="gray.300"
				p="2.5"
				w="auto"
				maxW="75%"
				borderTopRightRadius="16"
				borderBottomRightRadius="16"
				borderBottomLeftRadius="16"
				flexWrap="wrap"
				mb="4"
				justifyContent="flex-end"
				alignSelf="flex-start"
				color="black"
			>
				<Text>
					For example, we might want to set up a subscription to some external
					data source.{" "}
				</Text>
				<Text
					fontSize="xs"
					fontStyle="italic"
					color={grayColor}
					ml="1.5"
					pt="2"
					textAlign="right"
				>
					6:37pm
				</Text>
			</Flex>

			<Flex
				bg="teal.200"
				p="2.5"
				maxW="75%"
				borderTopLeftRadius="16"
				borderBottomRightRadius="16"
				borderBottomLeftRadius="16"
				flexWrap="wrap"
				mb="4"
				alignSelf="flex-end"
				justifyContent="flex-end"
				color="black"
			>
				<Text>By using </Text>
				<Text
					fontSize="xs"
					fontStyle="italic"
					color={grayColor}
					ml="1.5"
					pt="2"
					textAlign="right"
				>
					6:37pm
				</Text>
			</Flex>

			<Flex
				bg="teal.200"
				p="2.5"
				maxW="75%"
				borderTopLeftRadius="16"
				borderBottomRightRadius="16"
				borderBottomLeftRadius="16"
				flexWrap="wrap"
				mb="4"
				alignSelf="flex-end"
				justifyContent="flex-end"
				color="black"
			>
				<Text>
					Earlier, we looked at how to express side effects that don’t require
					any cleanup. However, some effects do.
				</Text>
				<Text
					fontSize="xs"
					fontStyle="italic"
					color={grayColor}
					ml="1.5"
					pt="2"
					textAlign="right"
				>
					6:37pm
				</Text>
			</Flex>

			<Flex
				bg="gray.300"
				p="2.5"
				w="auto"
				maxW="75%"
				borderTopRightRadius="16"
				borderBottomRightRadius="16"
				borderBottomLeftRadius="16"
				flexWrap="wrap"
				mb="4"
				justifyContent="flex-end"
				alignSelf="flex-start"
				color="black"
			>
				<Text>For example,</Text>
				<Text
					fontSize="xs"
					fontStyle="italic"
					color={grayColor}
					ml="1.5"
					pt="2"
					textAlign="right"
				>
					6:37pm
				</Text>
			</Flex>
		</Flex>
	);
};
