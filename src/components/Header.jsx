import React from "react";
import {
	Flex,
	Heading,
	IconButton,
	Avatar,
	useColorModeValue,
} from "@chakra-ui/react";

import { FiBell } from "react-icons/fi";

import { APP_NAME } from "../utils/Constants";

export default function Header({ children }) {
    const bg = useColorModeValue("white", "gray.800");
	return (
		<Flex flexDir="column">
			<Flex
				flexDir="row"
				justifyContent="space-between"
				px={{ base: 4, md: 8, lg: 16 }}
				py={{ base: 4, md: 5, lg: 6 }}
				boxShadow="dark-lg"
				zIndex="3"
				position="fixed"
				top={0}
				left={0}
                right={0}
                bg={bg}
			>
				<Heading as="h2" letterSpacing="tight" >
					{APP_NAME}
				</Heading>
				<Flex as="nav" alignItems="center">
					<IconButton
						fontSize="20px"
						variant="ghost"
						aria-label="Search database"
						icon={<FiBell />}
					/>
					<IconButton
						variant="ghost"
						aria-label="Search database"
						icon={<Avatar size="sm" />}
						ml="4"
					/>
				</Flex>
			</Flex>
			<Flex mx={{ base: 4, md: 8, lg: 16 }} my={{ base: 4, md: 5, lg: 6 }}>
				{children}
			</Flex>
		</Flex>
	);
}
