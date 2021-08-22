import React, { useState, useEffect, useRef } from "react";
import {} from "react-router-dom";
import Header from "../components/Header";
import {
	Text,
	SimpleGrid,
	Flex,
	GridItem,
	Image,
	Heading,
	Button,
	Box,
	VStack,
	useColorModeValue,
	IconButton,
	Divider,
	Link,
	Modal,
	ModalOverlay,
	ModalBody,
	ModalContent,
	ModalFooter,
	useDisclosure,
	Skeleton,
	SkeletonCircle,
	SkeletonText,
	Drawer,
	DrawerContent,
	DrawerOverlay,
	DrawerHeader,
	DrawerBody,
	DrawerFooter,
	Textarea,
	Avatar,
} from "@chakra-ui/react";
import { FiMail, FiPhone, FiUser, FiLink } from "react-icons/fi";
import {
	FaSchool,
	FaFacebookF,
	FaTwitter,
	FaInstagram,
	FaLinkedinIn,
	FaUserCircle,
} from "react-icons/fa";
import { RiCake2Line, RiTimeLine } from "react-icons/ri";
import { format } from "date-fns";
import { HiEmojiHappy } from "react-icons/hi";
import { IoIosClose } from "react-icons/io";
import { IoSendSharp } from "react-icons/io5";

import { db, firestore } from "../firebase/Config";
import { useAuth } from "../contexts/Auth";
import InboxMessageCard from "../components/InboxMessageCard";

function UserProfile(props) {
	const [user, setUser] = useState("");
	const [loading, setLoading] = useState(false);

	const isMounted = useRef(false);

	const { pid } = props.match.params;

	// console.log(props.match);

	useEffect(() => {
		if (pid !== undefined) {
			isMounted.current = true;
			setLoading(true);

			db.collection("users")
				.doc(pid)
				.get()
				.then((doc) => {
					if (doc.exists) {
						if (isMounted.current) {
							setUser(doc.data());
							setLoading(false);
							// console.log(doc.data());
						}
					} else {
						console.log("No such user in firestore!");
						setLoading(false);
					}
				});

			return () => {
				isMounted.current = false;
				setLoading(false);
			};
		}
	}, [pid]);

	return (
		<Header>
			{loading && <ProfileSkeleton />}
			{!loading && (
				<>
					{user === "" ? (
						<Flex mt={24}>No such user in firestore </Flex>
					) : (
						<DisplayProfile user={user} pid={pid} />
					)}
				</>
			)}
		</Header>
	);
}
export default UserProfile;

const DisplayProfile = ({ user, pid }) => {
	const textColor = useColorModeValue("gray.600", "gray.400");
	const grayColor = useColorModeValue("gray.600", "gray.400");
	const { isOpen, onOpen, onClose } = useDisclosure();

	const { currentUser } = useAuth();

	// console.log(user);

	const [openInboxDialog, setOpenInboxDialog] = useState(false);
	const [messageText, setMessageText] = useState("");

	const handleSubmitMessage = (e) => {
		e.preventDefault();

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
				console.log("Message sent with ID: ", docRef.id);
				setMessageText("");
			});

		db.collection("users")
			.doc(currentUser.uid)
			.update({
				contacts: firestore.FieldValue.arrayUnion({
					cid: pid,
					cName: user.lastName + " " + user.firstName,
					cImage: user.photoURL,
				}),
			})
			.then(() => {
				console.log("update");
			});

		console.log(messageText);
	};

	return (
		<SimpleGrid
			display={{ base: "initial", md: "grid" }}
			columns={{ md: 2 }}
			spacing={{ md: 6 }}
			width="100%"
			mt={24}
		>
			<GridItem colSpan={{ md: 1 }}>
				<Box px={[4, 0]}>
					<VStack>
						<Image
							onClick={onOpen}
							boxSize="280px"
							borderRadius="full"
							fallback={
								<FaUserCircle
									fontSize="280px"
									color={useColorModeValue("#a5a5a5", "#d5d5d5")}
								/>
							}
							src={user.photoURL}
						/>
						<Modal isOpen={isOpen} size="md">
							<ModalOverlay />
							<ModalContent>
								<ModalBody mt="2.5">
									<Image src={user.photoURL} width="auto" height="auto" />
								</ModalBody>

								<ModalFooter>
									<Button colorScheme="red" onClick={onClose}>
										Close
									</Button>
								</ModalFooter>
							</ModalContent>
						</Modal>

						<Heading as="h2" fontSize="3xl" fontWeight="md" lineHeight="6">
							{user.displayName}
						</Heading>
						<Text
							fontSize="sm"
							color={useColorModeValue("gray.600", "gray.400")}
						>
							{user.type && user.type}
						</Text>

						{user.phone && (
							<Flex align="center">
								<FiPhone />
								<Text fontSize="sm" color={textColor} ml="1.5">
									{user.phone && user.phone}
								</Text>
							</Flex>
						)}

						<Flex align="center">
							<FiMail />
							<Text fontSize="sm" color={textColor} ml="1.5">
								{user.email}
							</Text>
						</Flex>

						{user.website && (
							<Flex align="center">
								<FiLink />
								<Link
									href={user.website && user.website}
									isExternal
									color="teal.500"
									ml="1.5"
								>
									{user.website && user.website}
								</Link>
							</Flex>
						)}

						<Flex align="center" justifyContent="space-between" w="280px">
							<Text color={useColorModeValue("gray.600", "gray.400")}>
								Socials:
							</Text>

							{user.twitter ? (
								<Link href={user.twitter} isExternal>
									<IconButton
										fontSize="20px"
										variant="ghost"
										aria-label="Twitter"
										_hover={{ color: "#1da1f2" }}
										icon={<FaTwitter />}
									/>
								</Link>
							) : (
								<IconButton
									fontSize="20px"
									variant="ghost"
									aria-label="Twitter"
									_hover={{ color: "#1da1f2" }}
									icon={<FaTwitter />}
									disabled={true}
								/>
							)}

							{user.facebook ? (
								<Link href={user.facebook} isExternal>
									<IconButton
										fontSize="20px"
										variant="ghost"
										aria-label="Facebook"
										_hover={{ color: "#1877f2" }}
										icon={<FaFacebookF />}
									/>
								</Link>
							) : (
								<IconButton
									fontSize="20px"
									variant="ghost"
									aria-label="Facebook"
									_hover={{ color: "#1877f2" }}
									icon={<FaFacebookF />}
									disabled={true}
								/>
							)}

							{user.linkedin ? (
								<Link href={user.linkedin} isExternal>
									<IconButton
										fontSize="20px"
										variant="ghost"
										aria-label="Linkedin"
										_hover={{ color: "#0a66c2" }}
										icon={<FaLinkedinIn />}
									/>
								</Link>
							) : (
								<IconButton
									fontSize="20px"
									variant="ghost"
									aria-label="Linkedin"
									_hover={{ color: "#0a66c2" }}
									icon={<FaLinkedinIn />}
									disabled={true}
								/>
							)}

							{user.instagram ? (
								<Link href={user.instagram} isExternal>
									<IconButton
										fontSize="20px"
										variant="ghost"
										aria-label="Instagram"
										_hover={{ color: "#c32aa3" }}
										icon={<FaInstagram />}
									/>
								</Link>
							) : (
								<IconButton
									fontSize="20px"
									variant="ghost"
									aria-label="Instagram"
									_hover={{ color: "#c32aa3" }}
									icon={<FaInstagram />}
									disabled={true}
								/>
							)}
						</Flex>

						<Button
							width="280px"
							onClick={() => {
								setOpenInboxDialog(true);
							}}
							colorScheme="teal"
							variant="outline"
						>
							Send Message
						</Button>
					</VStack>

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
									<IconButton
										// onClick={onClose}
										color={grayColor}
										variant="ghost"
										icon={<HiEmojiHappy fontSize="32px" />}
									/>
									<Textarea
										type="text"
										placeholder="Type a message"
										name="message"
										size="lg"
										ml="1.5"
										minHeight="1em"
										maxHeight="4em"
										resize="none"
										value={messageText}
										onChange={(e) => {
											setMessageText(e.target.value);
										}}
									/>
									<IconButton
										// isRound={true}
										type="submit"
										colorScheme="teal"
										ml="1.5"
										variant="ghost"
										icon={<IoSendSharp fontSize="30px" />}
										disabled={messageText ? false : true}
										onClick={handleSubmitMessage}
									/>
								</Flex>
							</DrawerFooter>
						</DrawerContent>
					</Drawer>
				</Box>
			</GridItem>

			<GridItem mt={[5, null, 0]} colSpan={{ md: 1 }}>
				<Flex flexDir="column">
					<Flex flexDir="column">
						<Text fontSize="2xl"> Bio </Text>
						<Divider orientation="horizontal" />
						<Flex mt="4" w="100%" justifyContent="space-between" align="center">
							<Flex align="center">
								<RiCake2Line />
								<Text
									fontSize="sm"
									color={useColorModeValue("gray.600", "gray.400")}
									ml="1.5"
									fontWeight="bold"
								>
									Birthday
								</Text>
							</Flex>

							<Text
								fontSize="md"
								color={useColorModeValue("gray.600", "gray.400")}
								ml="1.5"
							>
								{user.dob && format(new Date(user.dob), "do, MMMM")}
							</Text>
						</Flex>
						<Flex mt="4" w="100%" justifyContent="space-between" align="center">
							<Flex align="center">
								<RiTimeLine />
								<Text
									fontSize="sm"
									color={useColorModeValue("gray.600", "gray.400")}
									ml="1.5"
									fontWeight="bold"
								>
									Duration
								</Text>
							</Flex>

							<Text
								fontSize="md"
								color={useColorModeValue("gray.600", "gray.400")}
								ml="1.5"
							>
								{user.startDate && user.startDate} to{" "}
								{user.endDate && user.endDate}
							</Text>
						</Flex>
						<Flex mt="4" w="100%" justifyContent="space-between" align="center">
							<Flex align="center">
								<FaSchool />
								<Text
									fontSize="sm"
									color={useColorModeValue("gray.600", "gray.400")}
									ml="1.5"
									fontWeight="bold"
								>
									School
								</Text>
							</Flex>

							<Text
								fontSize="sm"
								color={useColorModeValue("gray.600", "gray.400")}
								ml="1.5"
							>
								{user.school && user.school}
							</Text>
						</Flex>
						<Flex mt="4" w="100%" justifyContent="space-between" align="center">
							<Flex align="center">
								<FiUser />
								<Text
									fontSize="sm"
									color={useColorModeValue("gray.600", "gray.400")}
									ml="1.5"
									fontWeight="bold"
								>
									Supervisor
								</Text>
							</Flex>

							<Text
								fontSize="md"
								color={useColorModeValue("gray.600", "gray.400")}
								ml="1.5"
							>
								{user.supervisor && user.supervisor}
							</Text>
						</Flex>
						<Flex flexDir="column" mt="4">
							<Text
								fontSize="sm"
								fontWeight="bold"
								color={useColorModeValue("gray.600", "gray.400")}
							>
								About Me
							</Text>
							<Text
								mt={1.5}
								fontSize="sm"
								color={useColorModeValue("gray.600", "gray.400")}
							>
								{user.aboutMe && user.aboutMe}
							</Text>
						</Flex>
					</Flex>
				</Flex>
			</GridItem>
		</SimpleGrid>
	);
};

const ProfileSkeleton = () => {
	return (
		<SimpleGrid
			display={{ base: "initial", md: "grid" }}
			columns={{ md: 2 }}
			spacing={{ md: 6 }}
			width="100%"
			mt={24}
		>
			<GridItem colSpan={{ md: 1 }}>
				<Box px={[4, 0]}>
					<VStack>
						<SkeletonCircle size="280px" borderRadius="full" />

						<SkeletonText w="180px" noOfLines={1} />

						<Flex align="center">
							<SkeletonCircle />
							<SkeletonText w="80px" noOfLines={1} ml="1.5" />
						</Flex>

						<Flex align="center">
							<SkeletonCircle />
							<SkeletonText w="80px" noOfLines={1} ml="1.5" />
						</Flex>
						<Flex align="center">
							<SkeletonCircle />
							<SkeletonText w="80px" noOfLines={1} ml="1.5" />
						</Flex>
						<Flex align="center" justifyContent="space-between" w="280px">
							<SkeletonCircle w="50px" noOfLines={1} />

							<SkeletonCircle w="50px" noOfLines={1} />

							<SkeletonCircle w="50px" noOfLines={1} />

							<SkeletonCircle w="50px" noOfLines={1} />
						</Flex>

						<Skeleton />
					</VStack>
				</Box>
			</GridItem>

			<GridItem mt={[5, null, 0]} colSpan={{ md: 1 }}>
				<Flex flexDir="column">
					<Flex flexDir="column">
						<Skeleton height="20px" />
						<Divider orientation="horizontal" />
						<Flex mt="4" w="100%" justifyContent="space-between" align="center">
							<Flex align="center">
								<SkeletonCircle />
								<SkeletonText w="80px" noOfLines={1} ml="1.5" />
							</Flex>

							<SkeletonText w="80px" noOfLines={1} ml="1.5" />
						</Flex>
						<Flex mt="4" w="100%" justifyContent="space-between" align="center">
							<Flex align="center">
								<SkeletonCircle />

								<SkeletonText w="80px" noOfLines={1} ml="1.5" />
							</Flex>

							<SkeletonText w="80px" noOfLines={1} ml="1.5" />
						</Flex>
						<Flex mt="4" w="100%" justifyContent="space-between" align="center">
							<Flex align="center">
								<SkeletonCircle />
								<SkeletonText w="80px" noOfLines={1} ml="1.5" />
							</Flex>

							<SkeletonText w="80px" noOfLines={1} ml="1.5" />
						</Flex>
						<Flex mt="4" w="100%" justifyContent="space-between" align="center">
							<Flex align="center">
								<SkeletonCircle />
								<SkeletonText w="80px" noOfLines={1} ml="1.5" />
							</Flex>

							<SkeletonText w="80px" noOfLines={1} ml="1.5" />
						</Flex>
						<Flex flexDir="column" mt="4">
							<SkeletonText w="80px" noOfLines={1} />
							<SkeletonText mt="4" noOfLines={4} spacing="4" />
						</Flex>
					</Flex>
				</Flex>
			</GridItem>
		</SimpleGrid>
	);
};
