import React from "react";
import Header from "../components/Header";

import {
	Flex,
	Text,
	Center,
	Image,
	useColorModeValue,
	// Skeleton,
	// SkeletonCircle,
	// SkeletonText,
} from "@chakra-ui/react";
import AccessDenial from "../assets/images/noAccess.svg";

import { useAuth } from "../contexts/Auth";

function Administrator() {
	const { userData } = useAuth();
	// console.log(userData);

	return (
		<Header>
			{userData.level === "Admin" ? (
				<div>Welcome Admin</div>
			) : (
				<Center flexDir="column" mt={32}>
					<Image src={AccessDenial} width="640" height="320" />
					<Text textAlign="center" color="#a5a5a5">
						Sorry, you have no access to this page.
					</Text>
				</Center>
			)}
		</Header>
	);
}

export default Administrator;
