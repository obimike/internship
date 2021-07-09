import React, { useState } from "react";
import { Redirect } from "react-router-dom";
//components
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


function Dashboard() {
    return (
			<Header>
            <Flex mt={24} flexDir='column'>
                <Text fontSize='lg' fontWeight='bold'>DashBoard</Text>
                
            </Flex>
			</Header>
		);
}

export default Dashboard;
