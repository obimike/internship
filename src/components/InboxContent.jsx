import React from "react"; // useState, useEffect, useRefs
import {
	Flex,
	Text,
	// Modal,
	// ModalOverlay,
	// ModalContent,
	// ModalHeader,
	// ModalFooter,
	// ModalBody,
	// Button,
	// Box,
	// Textarea,
	// Skeleton,
	// SkeletonCircle,
	// SkeletonText,
	// Center,
} from "@chakra-ui/react";


import  InboxCard  from "./InboxCard";

function InboxContent() {
	return (
		<Flex
			mt={24}
			flexDir="column"
			align={{ base: "", md: "center", lg: "center" }}
		>
			<Text fontSize="xl" my={1.5} fontWeight="bold">
				Inbox
			</Text>
			<InboxCard />
			<InboxCard />
			<InboxCard />
			<InboxCard />
		</Flex>
	);
}

export default InboxContent;



