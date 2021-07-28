import React, { useEffect } from "react";
import { withRouter, Link as RouterLink } from "react-router-dom";
import {
	Flex,
	Heading,
	IconButton,
	Avatar,
	useColorModeValue,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	Link,
	useDisclosure,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalFooter,
	ModalBody,
	Button,
	Text,
	
} from "@chakra-ui/react";

import { FiBell } from "react-icons/fi";

import { IoIosSchool } from "react-icons/io";
import {
	RiLogoutCircleLine,
	RiInformationLine,
	RiMailLine,
	RiAdminLine,
} from "react-icons/ri";

import { APP_NAME } from "../utils/Constants";
import { signOut, useAuth } from "../contexts/Auth";

import Notifications from "./Notifications";

const Header = (props) => {
	const { history } = props;
	const { setVerifiedEmail, currentUser, isVerifiedEmail, newNotifications } =
		useAuth();
	const bg = useColorModeValue("white", "gray.800");
	const { isOpen, onOpen, onClose } = useDisclosure();
	


	console.log(newNotifications);

	useEffect(() => {
		// console.log("Header effect");
		if (currentUser === null || isVerifiedEmail === false) {
			history.push("/signin");
		}
	}, [currentUser, isVerifiedEmail, history]);

	return (
		<Flex flexDir="column">
			<Flex
				flexDir="row"
				justifyContent="space-between"
				px={{ base: 4, md: 8, lg: 16 }}
				py={{ base: 4, md: 5, lg: 6 }}
				boxShadow="lg"
				zIndex="3"
				position="fixed"
				top={0}
				left={0}
				right={0}
				bg={bg}
			>
				<Link as={RouterLink} textDecorationStyle="none" to="/dashboard">
					<Flex>
						<IoIosSchool fontSize="2.5rem" color="teal" />
						<Heading as="h3" letterSpacing="tight" fontWeight="light" ml="2">
							{APP_NAME}
						</Heading>
					</Flex>
				</Link>
				<Flex as="nav" alignItems="center">
					<Menu>
						<MenuButton
							fontSize="20px"
							as={IconButton}
							aria-label="notification"
							icon={
								<Flex>
									<FiBell />
									{newNotifications}
								</Flex>
							}
							variant="ghost"
							ml="4"
						/>
						<MenuList
							w={{ base: "95vw", md: "auto", lg: "auto" }}
							mr={{ base: "3", md: "auto", lg: "auto" }}
						>
							<Notifications />
						</MenuList>
					</Menu>

					<Menu>
						<MenuButton
							as={IconButton}
							aria-label="Options"
							icon={
								<Avatar
									size="sm"
									src={currentUser.photoURL && currentUser.photoURL}
								/>
							}
							variant="ghost"
							ml="4"
						/>
						<MenuList>
							<MenuItem
								onClick={() => history.push("/profile")}
								icon={
									<Avatar
										size="xs"
										src={currentUser.photoURL && currentUser.photoURL}
									/>
								}
							>
								Profile
							</MenuItem>

							<MenuItem
								onClick={() => history.push("/inbox")}
								icon={
									<RiMailLine
										color={useColorModeValue("#a5a5a5", "#f5f5f5")}
										fontSize="24px"
									/>
								}
							>
								Inbox
							</MenuItem>

							<MenuItem
								onClick={() => ""}
								icon={
									<RiAdminLine
										color={useColorModeValue("#a5a5a5", "#f5f5f5")}
										fontSize="24px"
									/>
								}
							>
								Administrator Page
							</MenuItem>
							<MenuItem
								onClick={onOpen}
								icon={
									<RiInformationLine
										color={useColorModeValue("#a5a5a5", "#f5f5f5")}
										fontSize="24px"
									/>
								}
							>
								About
							</MenuItem>
							<MenuItem
								onClick={() => {
									setVerifiedEmail(false);
									signOut();
									history.push("/signin");
								}}
								icon={
									<RiLogoutCircleLine
										fontSize="24px"
										color={useColorModeValue("#a5a5a5", "#f5f5f5")}
									/>
								}
							>
								Log Out
							</MenuItem>
						</MenuList>
					</Menu>
				</Flex>
			</Flex>
			<Flex
				px={{ base: 4, md: 8, lg: 16 }}
				py={{ base: 4, md: 5, lg: 6 }}
				flexDir="column"
			>
				{props.children}
			</Flex>

			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					{/* <ModalHeader align="center">About</ModalHeader> */}

					<ModalBody align="center">
						<Text fontSize="3em">Internship</Text>
						<Text>version 1.0.0</Text>
						<IoIosSchool fontSize="8em" color="teal" />
						<Text>&copy; 2021 Internship</Text>
					</ModalBody>

					<ModalFooter>
						<Button colorScheme="red" mr={3} onClick={onClose}>
							Close
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>

				</Flex>
	);
};

export default withRouter(Header);
