import React from "react";
import { Link as RouterLink } from "react-router-dom";
import {
	Flex,
	Text,
	useColorModeValue,
	LinkBox,
	Drawer,
	DrawerContent,
	DrawerOverlay,
	DrawerHeader,
	DrawerBody,
	useDisclosure,
	IconButton,
	Avatar,
} from "@chakra-ui/react";
import {
	IoTimeOutline,
	IoVideocamOutline,
	IoPersonCircleSharp,
} from "react-icons/io5";
import { BiChalkboard } from "react-icons/bi";

function Lessonscard() {
	const grayColor = useColorModeValue("gray.600", "gray.400");

	return (
		<LinkBox>
			<Flex
				flexDir="row"
				borderRadius="4"
				boxShadow="base"
				borderColor={grayColor}
				p="2"
				mb="1.5"
				w="100%"
				as="button"
			>
				<Flex
					className="lessonIcon"
					flexDir="column"
					bg="teal.100"
					borderRadius="4"
					alignItems="center"
					justifyContent="center"
					p="1.5"
					w="20%"
					h="3.0rem"
				>
					<BiChalkboard fontSize="1.2em" color="black" />
					<Text fontSize="0.7em" color="black">
						Live Class
					</Text>
				</Flex>
				<Flex
					ml="1.5"
					flexDir="column"
					justifyContent="space-between"
					w="78%"
					h="3.0rem"
				>
					<Text isTruncated>
						Export Firebase Data to a .json file and import to another project
						Export Firebase Data to a .json file and import to another project
					</Text>
					<Flex flexDir="row" justifyContent="space-between">
						<Flex alignItems="center">
							<IoPersonCircleSharp color={grayColor} />
							<Text color={grayColor} fontSize="xs" ml="0.5">
								Jolie
							</Text>
						</Flex>
						<Flex alignItems="center">
							<IoTimeOutline color={grayColor} />
							<Text color={grayColor} fontSize="xs" ml="0.5">
								3:00pm - 4:30pm
							</Text>
						</Flex>
					</Flex>
				</Flex>
			</Flex>
		</LinkBox>
	);
}

export default Lessonscard;
