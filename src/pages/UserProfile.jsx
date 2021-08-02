import React, { useState, useEffect, useRef } from "react";
import {} from "react-router-dom";
import { Link as RouterLink2 } from "react-router-dom";
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
	LinkBox,
	useDisclosure,
	Skeleton,
	SkeletonCircle,
	SkeletonText,
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

import { db } from "../firebase/Config";

function UserProfile(props) {
	const [user, setUser] = useState("");
	const [loading, setLoading] = useState(false);

	console.log(props.history.location);

	const isMounted = useRef(false);

	useEffect(() => {
		isMounted.current = true;
		setLoading(true);

		if (props.history.location.state.profile) {
			const id = props.history.location.state.profile;
			db.collection("users")
				.doc(id)
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
		}
		return () => {
			isMounted.current = false;
			setLoading(false);
		};
	}, [props.history.location.state.profile]);

	return (
		<Header>
			{loading && <ProfileSkeleton />}
			{!loading && (
				<>
					{user === "" ? (
						<Flex mt={24}>No such user in firestore </Flex>
					) : (
						<DisplayProfile user={user} />
					)}
				</>
			)}
		</Header>
	);
}
export default UserProfile;

const DisplayProfile = ({ user }) => {
	const textColor = useColorModeValue("gray.600", "gray.400");
	const { isOpen, onOpen, onClose } = useDisclosure();

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
						<LinkBox to="#" as={RouterLink2} onClick={onOpen}>
							<Image
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
						</LinkBox>
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
						<Flex align="center" justifyContent="space-between" w="280px">
							<Text color={useColorModeValue("gray.600", "gray.400")}>
								Socials:
							</Text>
							<Link href={user.twitter && user.twitter} isExternal>
								<IconButton
									fontSize="20px"
									variant="ghost"
									aria-label="Twitter"
									_hover={{ color: "#1da1f2" }}
									icon={<FaTwitter />}
								/>
							</Link>
							<Link href={user.facebook ? user.facebook : ""} isExternal>
								<IconButton
									fontSize="20px"
									variant="ghost"
									aria-label="Facebook"
									_hover={{ color: "#1877f2" }}
									icon={<FaFacebookF />}
								/>
							</Link>
							<Link href={user.linkedin && user.linkedin} isExternal>
								<IconButton
									fontSize="20px"
									variant="ghost"
									aria-label="Facebook"
									_hover={{ color: "#0a66c2" }}
									icon={<FaLinkedinIn />}
								/>
							</Link>
							<Link href={user.instagram && user.instagram} isExternal>
								<IconButton
									fontSize="20px"
									variant="ghost"
									aria-label="Facebook"
									_hover={{ color: "#c32aa3" }}
									icon={<FaInstagram />}
								/>
							</Link>
						</Flex>

						<Link as={RouterLink2} to="#" textDecoration="none">
							<Button width="280px" colorScheme="teal" variant="outline">
								Send Message
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
