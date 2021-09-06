import React from "react";
import { Link as RouterLink, Redirect } from "react-router-dom";
import {
	Flex,
	Text,
	Center,
	Image,
	IconButton,
	Heading,
	useColorModeValue,
	Button,
	useBreakpointValue,
	Link,
} from "@chakra-ui/react";

import { IoIosSchool, IoIosArrowRoundForward } from "react-icons/io";
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

//links
import Signup from "./Signup";

import { useAuth } from "../contexts/Auth";

function LandingPage() {
	const bg = useColorModeValue("white", "gray.800");
	const { isVerifiedEmail } = useAuth();
	
	const appIconSize = useBreakpointValue({
		base: "28px",
		md: "36px",
		lg: "40px",
	});
	const iconSize = useBreakpointValue({
		base: "24px",
		md: "24px",
		lg: "32px",
	});
	const appNameSize = useBreakpointValue({
		base: "24px",
		md: "32px",
		lg: "36px",
	});
	const buttonSize = useBreakpointValue({
		base: "xs",
		md: "sm",
		lg: "md",
	});
	const widthSize = useBreakpointValue({
		base: "100vw",
		md: "35vw",
		lg: "35vw",
	});
	const heroHeaderTextSize = useBreakpointValue({
		base: "20px",
		md: "24px",
		lg: "36px",
	});
	const textAligning = useBreakpointValue({
		base: "center",
		md: "left",
		lg: "left",
	});
	const imageWidth = useBreakpointValue({
		base: "400px",
		md: "250px",
		lg: "320px",
	});

	const contentAligning = useBreakpointValue({
		base: "center",
		md: "space-between",
		lg: "space-between",
	});
	const textSize = useBreakpointValue({ base: "14px", md: "14px", lg: "16px" });
//Check Auth then redirects
	if (isVerifiedEmail) {
		// case true:
		return (
			<Redirect
				to={{
					pathname: "/dashboard",
				}}
			/>
		);
		// case false:
	} else {
		return (
			<Flex flexDir="column">
				<Flex
					flexDir="row"
					justifyContent="space-between"
					px={{ base: 4, md: 12, lg: 24 }}
					py={{ base: 4, md: 5, lg: 6 }}
					boxShadow="lg"
					zIndex="3"
					position="fixed"
					top={0}
					left={0}
					right={0}
					bg={bg}
				>
					<Flex>
						<IoIosSchool fontSize={appIconSize} color="teal" />
						<Heading
							as="h3"
							letterSpacing="tight"
							fontWeight="light"
							ml="2"
							fontSize={appNameSize}
						>
							{APP_NAME}
						</Heading>
					</Flex>
					<Flex as="nav" alignItems="center">
						<Button
							as={RouterLink}
							to="/Signin"
							variant="ghost"
							colorScheme="teal"
							size={buttonSize}
						>
							Sign in
						</Button>
						<Button
							as={RouterLink}
							to="/Signup"
							ml="2.5"
							variant="outline"
							colorScheme="teal"
							size={buttonSize}
						>
							Sign up
						</Button>
					</Flex>
				</Flex>

				<Flex mt={{ base: 24, md: 48, lg: 16 }} flexDir="column">
					{/* hero container */}
					<Flex
						flexDir="row"
						justifyContent={contentAligning}
						wrap="wrap"
						my={{ base: 0, md: 0, lg: 28 }}
						mx={{ base: 4, md: 24, lg: 40 }}
					>
						<Flex flexDir="column" w={widthSize} textAlign={textAligning}>
							<Text fontSize={heroHeaderTextSize} display="inline">
								A learning community for{" "}
								<Text display="inline" color="teal.600">
									Interns{" "}
								</Text>
								aspiring to improve their tech skills.
							</Text>
							<Text
								mb={{ base: 4, md: 4, lg: 10 }}
								mt={{ base: 4, md: 4, lg: 4 }}
								textAlign={{ base: "center", md: "left", lg: "start" }}
								color="gray.600"
							>
								Learning to code can be easy and fun!
							</Text>
							<Flex
								my={{ base: "24px", md: "24px", lg: "36px" }}
								justifyContent={textAligning}
							>
								<Button as={RouterLink} to="/Signup" colorScheme="teal" size="lg">
									Get Started <IoIosArrowRoundForward fontSize="32px" />
								</Button>
							</Flex>
						</Flex>

						<Flex my={{ base: "24px", md: "24px", lg: "36px" }}>
							<Image
								src={Hero_Image}
								w={imageWidth}
								// h={{ base: "258px", md: 300, lg: "345px" }}
								alt="Hero Image"
							/>
						</Flex>
					</Flex>

					{/* Platform to boost your technical skills */}
					<Flex bg="rgba(196, 196, 196, 0.3)">
						<Flex
							mx={{ base: 4, md: 24, lg: 40 }}
							my={{ base: 8, md: 16, lg: 20 }}
							flexDir="column"
							alignItems="center"
							w="100%"
						>
							<Text fontSize={{ base: "18px", md: "24px", lg: "36px" }} mb="16">
								Platform to boost your technical skills
							</Text>
							<Flex
								wrap="wrap"
								w="100%"
								justifyContent={{
									base: "center",
									md: "space-between",
									lg: "space-between",
								}}
							>
								<Flex flexDir="column" alignItems="center" w={imageWidth}>
									<Image
										alt="image"
										src={Student}
										width={imageWidth}
										height="270px"
									/>
									<Text
										fontSize={{ base: "20px", md: "24px", lg: "28px" }}
										my="4"
									>
										Interns
									</Text>

									<Text fontSize={textSize} textAlign="center" w={imageWidth}>
										Use Internship's real-time community collaboration to
										reinforce what you've learned and get you ready for that big
										moment.
									</Text>
								</Flex>
								<Flex flexDir="column" alignItems="center" w={widthSize}>
									<Image
										alt="image"
										src={Teacher}
										width={imageWidth}
										height="270px"
									/>
									<Text
										fontSize={{ base: "20px", md: "24px", lg: "28px" }}
										my="4"
									>
										Staffs
									</Text>
									<Text fontSize={textSize} textAlign="center" w={imageWidth}>
										You can learn something totally new to advance your career. Or
										maybe you just want to knock off the rust.
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
						<Text
							fontSize={{ base: "20px", md: "24px", lg: "28px" }}
							mb="16"
							textAlign={{ base: "center", md: "center", lg: "" }}
						>
							Explore our platform
						</Text>

						{/* Feeds */}
						<Flex justifyContent={contentAligning} wrap="wrap" w="100%">
							<Flex flexDir="column" alignItems="center">
								<Image alt="Feeds" src={Feed} width={imageWidth} height="270px" />
							</Flex>
							<Center flexDir="column" alignItems="center" w={imageWidth}>
								<Text fontSize={{ base: "20px", md: "24px", lg: "28px" }} my="4">
									Feeds
								</Text>
								<Text fontSize={textSize} textAlign="center" w={imageWidth}>
									Keeps up to date with the latest happenings in tech and you can
									also share your ideas and knowledge with others as well.
								</Text>
							</Center>
						</Flex>

						{/* classes */}
						<Flex justifyContent={contentAligning} wrap="wrap" w="100%" my="10">
							<Center flexDir="column" alignItems="center" w={imageWidth}>
								<Text fontSize={{ base: "20px", md: "24px", lg: "28px" }} my="4">
									Classes
								</Text>
								<Text fontSize={textSize} textAlign="center" w={imageWidth}>
									Engage in our interactive classes designed to teach you a
									particular set of skills. Need to learn a new skill set?
									Participate in a one of the classes.
								</Text>
							</Center>
							<Flex flexDir="column" alignItems="center">
								<Image alt="classes" src={Classes} width={imageWidth} />
							</Flex>
						</Flex>

						{/* materials */}
						<Flex justifyContent={contentAligning} wrap="wrap" w="100%">
							<Flex flexDir="column" alignItems="center">
								<Image alt="materials" src={Material} width={imageWidth} />
							</Flex>
							<Center flexDir="column" alignItems="center" w={imageWidth}>
								<Text fontSize={{ base: "20px", md: "24px", lg: "28px" }}>
									Materials
								</Text>
								<Text fontSize={textSize} textAlign="center" w={imageWidth}>
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
							mt={{ base: 4, md: 0, lg: 0 }}
							flexDir="column"
							alignItems="center"
							w="100%"
						>
							<Flex justifyContent={contentAligning} wrap="wrap" w="100%">
								<Center flexDir="column" alignItems="center" w={imageWidth}>
									<Flex alignItems="center" mb="2">
										<MdGroup size={32} color="teal" />
										<Text fontSize="20px" ml="16px">
											Community Support
										</Text>
									</Flex>

									<Text fontSize="16px" textAlign="center" w={imageWidth}>
										Connect with other interns and staff members to get help when
										you’re stuck and stay motivated.
									</Text>
								</Center>

								<Image
									alt="image"
									src={Group}
									width={imageWidth}
									height="264px"
								/>
							</Flex>
						</Flex>
					</Flex>

					{/* Footer */}
					<Flex bg="black">
						<Flex
							px={{ base: 4, md: 12, lg: 24 }}
							py="4"
							flexDir="row"
							alignItems="center"
							w="100%"
							justifyContent="space-between"
						>
							<Flex>
								<IoIosSchool fontSize={appIconSize} color="teal" />
								<Heading
									as="h3"
									letterSpacing="tight"
									fontWeight="light"
									ml="2"
									color="gray.400"
									fontSize={appNameSize}
								>
									{APP_NAME}
								</Heading>
							</Flex>
							<Text fontSize={textSize} color="gray.400">
								&copy; 2021
							</Text>
							<Flex color="gray.400">
								<IconButton
									as={Link}
									href="https://github.com/obimike/internship"
									isExternal
									variant="ghost"
									aria-label="github"
									icon={<FiGithub size={iconSize} />}
									_hover={{
										color: "#fff",
									}}
								/>
								<IconButton
									as={Link}
									href="#"
									isExternal
									mx={{ base: 2, md: 8, lg: 16 }}
									variant="ghost"
									aria-label="twitter"
									icon={<FiTwitter size={iconSize} />}
									_hover={{
										color: "#1DA1F2",
									}}
								/>
								<IconButton
									as={Link}
									href="https://www.linkedin.com/in/okerekesamuelobinna/"
									isExternal
									variant="ghost"
									aria-label="linkedin"
									icon={<FiLinkedin size={iconSize} />}
									_hover={{
										color: "#0e76a8",
									}}
								/>
							</Flex>
						</Flex>
					</Flex>
				</Flex>
			</Flex>
		)
	};
}

export default LandingPage;
