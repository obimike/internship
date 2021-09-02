import React from "react";
import {
	Flex,
	Text,
	Center,
	Image,
	IconButton,
	Heading,
	useColorModeValue,
	Button,
} from "@chakra-ui/react";

import { IoIosSchool } from "react-icons/io";
import { MdGroup } from "react-icons/md";
import { FiGithub } from "react-icons/fi";
import { FiTwitter } from "react-icons/fi";
import { FiLinkedin } from "react-icons/fi";
import { APP_NAME } from "../utils/Constants";

import Hero_Image from "../assets/images/hero_image.svg";
import Student from "../assets/images/student.svg";
import Feed from "../assets/images/feed.svg";
import Teacher from "../assets/images/teacher.svg";
import Group from "../assets/images/group.svg";
import Classes from "../assets/images/classes.svg";
import Material from "../assets/images/material.svg";

function LandingPage() {
	const bg = useColorModeValue("white", "gray.800");
	return (
		<>
			<Flex flexDir="column">
				<Flex
					flexDir="row"
					justifyContent="space-between"
					px={{ base: 4, md: 12, lg: 24 }}
					py={{ base: 4, md: 5, lg: 6 }}
					boxShadow="lg"
					zIndex="3"
					position="sticky"
					top={0}
					left={0}
					right={0}
					bg={bg}
				>
					<Flex>
						<IoIosSchool fontSize="2.5rem" color="teal" />
						<Heading as="h3" letterSpacing="tight" fontWeight="light" ml="2">
							{APP_NAME}
						</Heading>
					</Flex>
					<Flex as="nav" alignItems="center">
						<Button variant="ghost" colorScheme="teal">
							Sign in
						</Button>
						<Button ml="2.5" colorScheme="teal">
							Sign up
						</Button>
					</Flex>
				</Flex>
				<Flex my={{ base: 0, md: 0, lg: 0 }} flexDir="column">
					{/* hero container */}
					<Flex
						wrap="wrap"
						justifyContent="space-between"
						justifyItems="center"
						my={{ base: 0, md: 0, lg: 28 }}
						mx={{ base: 4, md: 24, lg: 40 }}
						flexDir="row"
					>
						<Flex flexDir="column" w={{ base: 380, md: 300, lg: 400 }}>
							<Text fontSize="36px">
								A learning community for <span color="teal">Interns</span>{" "}
								aspiring to improve their tech skills.
							</Text>
							<Text
								mb={{ base: 0, md: 0, lg: 10 }}
								mt={{ base: 0, md: 0, lg: 4 }}
							>
								Learning to code can be easy and fun!
							</Text>
							<Flex>
								<Button variant="outline" colorScheme="teal">
									Sign in
								</Button>
								<Button ml="3.5" colorScheme="teal">
									Sign up
								</Button>
							</Flex>
						</Flex>
						<Flex>
							<Image
								src={Hero_Image}
								width="366.92px"
								height="345.56px"
								alt="Hero Image"
							/>
						</Flex>
					</Flex>

					{/* Platform to boost your technical skills */}
					<Flex bg="rgba(196, 196, 196, 0.3)">
						<Flex
							mx={{ base: 4, md: 24, lg: 40 }}
							my="20"
							flexDir="column"
							alignItems="center"
							w="100%"
						>
							<Text fontSize="24px" mb="16">
								Platform to boost your technical skills
							</Text>
							<Flex justifyContent="space-between" wrap="wrap" w="100%">
								<Flex flexDir="column" alignItems="center" w="360px">
									<Image src={Student} width="360px" height="270px" />
									<Text fontSize="28px">Interns</Text>

									<Text fontSize="16px" textAlign="center" w="360px">
										Use Internship's real-time community collaboration to
										reinforce what you've learned and get you ready for that big
										moment.
									</Text>
								</Flex>
								<Flex flexDir="column" alignItems="center" w="360px">
									<Image src={Teacher} width="360px" height="270px" />
									<Text fontSize="28px">Staffs</Text>
									<Text fontSize="16px" textAlign="center" w="360px">
										You can learn something totally new to advance your career.
										Or maybe you just want to knock off the rust.
									</Text>
								</Flex>
							</Flex>
						</Flex>
					</Flex>

					{/* Explore our platform */}
					<Flex
						mx={{ base: 4, md: 24, lg: 40 }}
						my="20"
						flexDir="column"
						alignItems="center"
					>
						<Text fontSize="24px" mb="16">
							Explore our platform
						</Text>

						{/* Feeds */}
						<Flex justifyContent="space-between" wrap="wrap" w="100%">
							<Flex flexDir="column" alignItems="center">
								<Image src={Feed} width="360px" height="270px" />
							</Flex>
							<Center flexDir="column" alignItems="center" w="360px" h="270px">
								<Text fontSize="28px">Feeds</Text>
								<Text fontSize="16px" textAlign="center" w="360px">
									Keeps up to date with the latest happenings in tech and you
									can also share your ideas and knowledge with others as well.
								</Text>
							</Center>
						</Flex>

						{/* classes */}
						<Flex justifyContent="space-between" wrap="wrap" w="100%" my="10">
							<Center flexDir="column" alignItems="center" w="360px" h="270px">
								<Text fontSize="28px">Classes</Text>
								<Text fontSize="16px" textAlign="center" w="360px">
									Engage in our interactive classes designed to teach you a
									particular set of skills. Need to learn a new skill set?
									Participate in a one of the classes.
								</Text>
							</Center>
							<Flex flexDir="column" alignItems="center">
								<Image src={Classes} width="360px" height="270px" />
							</Flex>
						</Flex>

						{/* materials */}
						<Flex justifyContent="space-between" wrap="wrap" w="100%">
							<Flex flexDir="column" alignItems="center">
								<Image src={Material} width="360px" height="270px" />
							</Flex>
							<Center flexDir="column" alignItems="center" w="360px" h="270px">
								<Text fontSize="28px">Materials</Text>
								<Text fontSize="16px" textAlign="center" w="360px">
									Feeds keeps you up to date with the latest happenings in tech
									and you can also share your ideas and knowledge with others as
									well.
								</Text>
							</Center>
						</Flex>
					</Flex>

					{/* Platform to boost your technical skills */}
					<Flex bg="rgba(196, 196, 196, 0.3)">
						<Flex
							mx={{ base: 4, md: 24, lg: 40 }}
							flexDir="column"
							alignItems="center"
							w="100%"
						>
							<Flex justifyContent="space-between" wrap="wrap" w="100%">
								<Center flexDir="column" alignItems="center" w="300px">
									<Flex alignItems="center" mb="2">
										<MdGroup size={32} color="teal" />
										<Text fontSize="20px" ml="16px">
											Community Support
										</Text>
									</Flex>

									<Text fontSize="16px" textAlign="center" w="345px">
										Connect with other interns and staff members to get help
										when you’re stuck and stay motivated.
									</Text>
								</Center>

								<Image src={Group} width="360px" height="264px" />
							</Flex>
						</Flex>
					</Flex>

					{/* Footer */}
					<Flex bg="black">
						<Flex
							mx={{ base: 4, md: 24, lg: 24 }}
							py="4"
							flexDir="row"
							alignItems="center"
							w="100%"
							justifyContent="space-between"
						>
							<Flex>
								<IoIosSchool fontSize="2.5rem" color="teal" />
								<Heading
									as="h3"
									letterSpacing="tight"
									fontWeight="light"
									ml="2"
									color="gray.400"
								>
									{APP_NAME}
								</Heading>
							</Flex>
							<Text fontSize="24px" color="gray.400">
								&copy; 2021
							</Text>
							<Flex color="gray.400">
								<IconButton
									variant="ghost"
									aria-label="github"
									icon={<FiGithub size={32} />}
								/>
								<IconButton
									mx="8"
									variant="ghost"
									aria-label="twitter"
									icon={<FiTwitter size={32} />}
								/>
								<IconButton
									variant="ghost"
									aria-label="linkedin"
									icon={<FiLinkedin size={32} />}
								/>
							</Flex>
						</Flex>
					</Flex>
				</Flex>
			</Flex>
		</>
	);
}

export default LandingPage;
