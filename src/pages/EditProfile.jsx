import React from "react";
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

function EditProfile() {
	return (
		<Header>
		
			<SimpleGrid
				display={{ base: "initial", md: "grid" }}
				columns={{ md: 2 }}
				spacing={{ md: 6 }}
				width="100%"
				mt={24}
			>
                <GridItem colSpan={3} >
                    <Flex alignItems='center'><Text fontSize='2xl'>Profile</Text></Flex>
					
				</GridItem>
				<GridItem colSpan={{ md: 1 }}>
					<Box px={[4, 0]}>1</Box>
				</GridItem>
				<GridItem mt={[5, null, 0]} colSpan={{ md: 1 }}>
					2
				</GridItem>
			</SimpleGrid>
		</Header>
	);
}

export default EditProfile;
