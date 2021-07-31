import React from "react";
import { Link as RouterLink } from "react-router-dom";
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
	useColorMode,
	IconButton,
	Divider,
	Link,
} from "@chakra-ui/react";
import { FiMail, FiPhone, FiUser, FiLink } from "react-icons/fi";
import {
	FaSun,
	FaMoon,
	FaSchool,
	FaFacebookF,
	FaTwitter,
	FaInstagram,
	FaLinkedinIn,
	FaUserCircle,
} from "react-icons/fa";
import { RiCake2Line, RiTimeLine } from "react-icons/ri";
import { format } from "date-fns";

import { useAuth } from "../contexts/Auth";

function Profile() {
	const { colorMode, toggleColorMode } = useColorMode();
	const { currentUser, userData } = useAuth();
	const textColor = useColorModeValue("gray.600", "gray.400");

	// console.log(userData);

	return (
		<Header>
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
								boxSize="280px"
								// objectFit="cover"
								// w="280px"
								// h="280px"
								borderRadius="full"
								fallback={
									<FaUserCircle
										fontSize="280px"
										color={useColorModeValue("#a5a5a5", "#d5d5d5")}
									/>
								}
								src={currentUser.photoURL}
							/>
							<Heading as="h2" fontSize="3xl" fontWeight="md" lineHeight="6">
								{currentUser.displayName}
							</Heading>
							<Text
								fontSize="sm"
								color={useColorModeValue("gray.600", "gray.400")}
							>
								{userData.type && userData.type}
							</Text>

							{userData.phone && (
								<Flex align="center">
									<FiPhone />
									<Text fontSize="sm" color={textColor} ml="1.5">
										{userData.phone && userData.phone}
									</Text>
								</Flex>
							)}

							<Flex align="center">
								<FiMail />
								<Text fontSize="sm" color={textColor} ml="1.5">
									{currentUser.email}
								</Text>
							</Flex>
							<Flex align="center">
								<FiLink />
								<Link
									href={userData.website && userData.website}
									isExternal
									color="teal.500"
									ml="1.5"
								>
									{userData.website && userData.website}
								</Link>
							</Flex>
							<Flex align="center" justifyContent="space-between" w="280px">
								<Text color={useColorModeValue("gray.600", "gray.400")}>
									Socials:
								</Text>
								<Link href={userData.twitter && userData.twitter} isExternal>
									<IconButton
										fontSize="20px"
										variant="ghost"
										aria-label="Twitter"
										_hover={{ color: "#1da1f2" }}
										icon={<FaTwitter />}
									/>
								</Link>
								<Link href={userData.facebook && userData.facebook} isExternal>
									<IconButton
										fontSize="20px"
										variant="ghost"
										aria-label="Facebook"
										_hover={{ color: "#1877f2" }}
										icon={<FaFacebookF />}
									/>
								</Link>
								<Link href={userData.linkedin && userData.linkedin} isExternal>
									<IconButton
										fontSize="20px"
										variant="ghost"
										aria-label="Facebook"
										_hover={{ color: "#0a66c2" }}
										icon={<FaLinkedinIn />}
									/>
								</Link>
								<Link
									href={userData.instagram && userData.instagram}
									isExternal
								>
									<IconButton
										fontSize="20px"
										variant="ghost"
										aria-label="Facebook"
										_hover={{ color: "#c32aa3" }}
										icon={<FaInstagram />}
									/>
								</Link>
							</Flex>

							<Link as={RouterLink} to="/edit_profile" textDecoration="none">
								<Button width="280px" colorScheme="teal" variant="outline">
									Edit Profile
								</Button>
							</Link>
						</VStack>
					</Box>
				</GridItem>

				<GridItem mt={[5, null, 0]} colSpan={{ md: 1 }}>
					<Flex flexDir="column">
						<Flex flexDir="column">
							<Text fontSize="2xl"> Bio </Text>
							<Divider orientation="horizontal" />
							<Flex
								mt="4"
								w="100%"
								justifyContent="space-between"
								align="center"
							>
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
									{userData.dob && format(new Date(userData.dob), "do, MMMM")}
								</Text>
							</Flex>
							<Flex
								mt="4"
								w="100%"
								justifyContent="space-between"
								align="center"
							>
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
									{userData.startDate && userData.startDate} to{" "}
									{userData.endDate && userData.endDate}
								</Text>
							</Flex>
							<Flex
								mt="4"
								w="100%"
								justifyContent="space-between"
								align="center"
							>
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
									{userData.school && userData.school}
								</Text>
							</Flex>
							<Flex
								mt="4"
								w="100%"
								justifyContent="space-between"
								align="center"
							>
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
									{userData.supervisor && userData.supervisor}
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
									{userData.aboutMe && userData.aboutMe}
								</Text>
							</Flex>
						</Flex>
						<Flex flexDir="column" mt={6}>
							<Text fontSize="2xl"> Settings </Text>
							<Divider orientation="horizontal" />
							<Flex
								mt="4"
								w="100%"
								justifyContent="space-between"
								align="center"
							>
								<Text
									fontSize="md"
									color={useColorModeValue("gray.600", "gray.400")}
									ml="1.5"
									fontWeight="bold"
								>
									{colorMode === "light" ? "Dark" : "Light"} Theme
								</Text>
								<IconButton
									fontSize="20px"
									variant="ghost"
									aria-label="Search database"
									onClick={toggleColorMode}
									icon={colorMode === "light" ? <FaMoon /> : <FaSun />}
								/>
							</Flex>
							<VStack mt={3}>
								<Text fontSize="xl" color="red">
									Danger Zone
								</Text>
								<Button colorScheme="red">Archive Account</Button>
								<Text fontSize="xs">
									(Once you archive your profile, Only an Administrator can
									revert it.)
								</Text>
							</VStack>
						</Flex>
					</Flex>
				</GridItem>
			</SimpleGrid>
		</Header>
	);
}

export default Profile;
