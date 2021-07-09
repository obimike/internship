import React from "react";
import { withRouter } from "react-router-dom";
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
} from "@chakra-ui/react";

import { FiBell } from "react-icons/fi";
import { RiLogoutCircleLine, RiInformationLine } from "react-icons/ri";

import { APP_NAME } from "../utils/Constants";
import { signOut } from "../contexts/Auth";

const Header = (props) => {
	const bg = useColorModeValue("white", "gray.800");
	const { history } = props;

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
					{APP_NAME}
				</Heading>
				<Flex as="nav" alignItems="center">
					<IconButton
						fontSize="20px"
						variant="ghost"
						aria-label="notification"
						icon={<FiBell />}
					/>

					<Menu>
						<MenuButton
							as={IconButton}
							aria-label="Options"
							icon={<Avatar size="sm" />}
							variant="ghost"
							ml="4"
						/>
						<MenuList>
							<MenuItem
								onClick={() => history.push("/profile")}
								icon={<Avatar size="xs" />}
							>
								Profile
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
								onClick={signOut}
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
			<Flex mx={{ base: 4, md: 8, lg: 16 }} my={{ base: 4, md: 5, lg: 6 }}>
				{props.children}
			</Flex>
		</Flex>
	);
};

export default withRouter(Header);
