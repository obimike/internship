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
} from "@chakra-ui/react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { IoTimeOutline } from "react-icons/io5";

function Lessonscard() {
	const grayColor = useColorModeValue("gray.600", "gray.400");

	return (
		<LinkBox>
			<Flex
				flexDir="row"
				borderRadius="4"
				border="1px"
				borderColor={grayColor}
				p="2"
				alignItems="center"
				mb="1.5"
			>
				<Flex>
					<Flex
						flexDir="column"
						bg="teal.50"
						borderRadius="4"
						alignItems="center"
						p="2.5"
					>
						<Flex>
							<Text fontSize="1.2em" fontWeight="bold">
								18
							</Text>
						</Flex>
						<Flex bg="black" borderRadius="4" align="center" px="2">
							<Text color="white" fontWeight="bold">
								Jun
							</Text>
						</Flex>
					</Flex>
					<Flex flexDir="column" justifyContent="space-between" ml="1.5">
						<Text ml="1" fontWeight="bold">
							Related searches for image
						</Text>
						<Flex alignItems="center">
							<IoTimeOutline color={grayColor} />
							<Text color={grayColor} fontSize="md" ml="0.5">
								3:00pm - 4:30pm
							</Text>
						</Flex>
					</Flex>
				</Flex>
				{/* <Flex>
					<MdKeyboardArrowRight fontSize="24px" color={grayColor} />
				</Flex> */}
			</Flex>
		</LinkBox>
	);
}

export default Lessonscard;
