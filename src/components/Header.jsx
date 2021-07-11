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
} from "@chakra-ui/react";

import { FiBell } from "react-icons/fi";
import {
	RiLogoutCircleLine,
	RiInformationLine,
	RiMailLine,
	RiAdminLine,
} from "react-icons/ri";

import { APP_NAME } from "../utils/Constants";
import { signOut, useAuth } from "../contexts/Auth";

const Header = (props) => {
	const { history } = props;
	const bg = useColorModeValue("white", "gray.800");

	const { setVerifiedEmail, currentUser, isVerifiedEmail } = useAuth();

	useEffect(() => {
		console.log("Header effect");
		if (currentUser === null || isVerifiedEmail === false) {
			history.push("/");
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
				<Heading as="h3" letterSpacing="tight" fontWeight="light">
					<Link as={RouterLink} _hover="none" to="/dashboard">
						{APP_NAME}
					</Link>
				</Heading>
				<Flex as="nav" alignItems="center">
					<Menu>
						<MenuButton
							fontSize="20px"
							as={IconButton}
							aria-label="notification"
							icon={<FiBell />}
							variant="ghost"
							ml="4"
						/>
						<MenuList>
							<Flex p="2" justifyContent="center">
								No Notification
							</Flex>
						</MenuList>
					</Menu>

					<Menu>
						<MenuButton
							as={IconButton}
							aria-label="Options"
							icon={
								<Avatar
									size="sm"
									src={currentUser.photoURL == null ? "" : currentUser.photoURL}
								/>
							}
							variant="ghost"
							ml="4"
						/>
						<MenuList>
							<MenuItem
								onClick={() => ""}
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
								onClick={() => history.push("/profile")}
								icon={
									<Avatar
										size="xs"
										src={
											currentUser.photoURL == null ? "" : currentUser.photoURL
										}
									/>
								}
							>
								Profile
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
									history.push("/");
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
		</Flex>
	);
};

export default withRouter(Header);
