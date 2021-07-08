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
	LinkOverlay,
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
} from "react-icons/fa";
import { RiCake2Line, RiTimeLine } from "react-icons/ri";

function Profile() {
	const { colorMode, toggleColorMode } = useColorMode();
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
								w="280px"
								h="280px"
								borderRadius="50%"
								src="https://th.bing.com/th/id/OIP.jlUxbDUaJFdElVjeovue-QHaJA?pid=ImgDet&rs=1"
							/>
							<Heading as="h2" fontSize="3xl" fontWeight="md" lineHeight="6">
								Angelina Jolie
							</Heading>
							<Text
								fontSize="sm"
								color={useColorModeValue("gray.600", "gray.400")}
							>
								Industrial Attachment
							</Text>
							<Flex align="center">
								<FiPhone />
								<Text
									fontSize="sm"
									color={useColorModeValue("gray.600", "gray.400")}
									ml="1.5"
								>
									09019122111
								</Text>
							</Flex>
							<Flex align="center">
								<FiMail />
								<Text
									fontSize="sm"
									color={useColorModeValue("gray.600", "gray.400")}
									ml="1.5"
								>
									ajolie@hollywood.com
								</Text>
							</Flex>
							<Flex align="center">
								<FiLink />
								<Link
									href="https://chakra-ui.com"
									isExternal
									color="teal.500"
									ml="1.5"
								>
									angelinajolie.com
								</Link>
							</Flex>
							<Flex align="center" justifyContent="space-between" w="280px">
								<Text color={useColorModeValue("gray.600", "gray.400")}>
									Socials:
								</Text>
								<IconButton
									fontSize="20px"
									variant="ghost"
									aria-label="Twitter"
									_hover={{ color: "#1da1f2" }}
									icon={<FaTwitter />}
								/>

								<IconButton
									fontSize="20px"
									variant="ghost"
									aria-label="Facebook"
									_hover={{ color: "#1877f2" }}
									icon={<FaFacebookF />}
								/>
								<IconButton
									fontSize="20px"
									variant="ghost"
									aria-label="Facebook"
									_hover={{ color: "#0a66c2" }}
									icon={<FaLinkedinIn />}
								/>
								<IconButton
									fontSize="20px"
									variant="ghost"
									aria-label="Facebook"
									_hover={{ color: "#c32aa3" }}
									icon={<FaInstagram />}
								/>
							</Flex>

							<Link  as={RouterLink} to="/edit_profile" textDecoration='none' >
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
									04, June
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
										Internship Duration
									</Text>
								</Flex>

								<Text
									fontSize="md"
									color={useColorModeValue("gray.600", "gray.400")}
									ml="1.5"
								>
									07/07/2021 - 1/12/2021
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
									New York University (NYU)
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
									Seun Abolarin
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
									Angelina Jolie DCMG is an American actress, filmmaker, and
									humanitarian. The recipient of numerous accolades, including
									an Academy Award and three Golden Globe Awards, she has been
									named Hollywood's highest-paid actress multiple times.
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
