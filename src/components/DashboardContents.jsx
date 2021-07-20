import React, { useState } from "react";
import {
	Flex,
	Text,
	useDisclosure,
	IconButton,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	Input,
	Button,
	Box,
	Textarea,
	Checkbox,
	Radio,
	Skeleton,
	SkeletonCircle,
	SkeletonText,
	Avatar,
	Tag,
	TagLabel,
	Divider,
	Image,
} from "@chakra-ui/react";
import { AiOutlineComment } from "react-icons/ai";
import { IoShareOutline } from "react-icons/io5";
import { FaRegComment } from "react-icons/fa";
import { HiOutlineThumbUp } from "react-icons/hi";
import { RiQuillPenFill, RiImageAddLine } from "react-icons/ri";

import { db, fb } from "../firebase/Config";
import { useAuth } from "../contexts/Auth";

function DashboardContents() {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { currentUser } = useAuth();
	//component state
	const [error, setError] = useState("");
	const [successMessage, setSuccessMessage] = useState("");
	const [submit, setSubmit] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [isChecked, setIsChecked] = useState(false);

	const closeModal = () => {
		setError("");
		setSuccessMessage("");
		onClose();
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		setSubmit(true);
		setError("");
		setSuccessMessage("");
		let title = e.target.title.value;
		let link = e.target.link.value;
		let writeUp = e.target.writeUp.value;
		let image = "";

		//Checkin the length of the title to more 3 character long
		if (title.length <= 3) {
			setError("Title should be more the 3 character long!");
			setSubmit(false);
			return false;
		}

		setSubmit(false);
	};
	return (
		<>
			<FeedCard />
			<IconButton
				boxShadow="dark-lg"
				onClick={onOpen}
				colorScheme="teal"
				pos="fixed"
				size="lg"
				bottom={16}
				right={8}
				icon={<RiQuillPenFill color="white" fontSize="24px" />}
				isRound
			/>
			<Modal isOpen={isOpen} size="sm">
				<ModalOverlay />
				<ModalContent>
					<form onSubmit={handleSubmit}>
						<ModalHeader align="center">What topic do you to share</ModalHeader>
						<ModalBody>
							{error && (
								<Text
									p="2"
									bg="red.100"
									textAlign="center"
									color="red"
									fontSize="md"
									my="1.5"
								>
									{error}
								</Text>
							)}

							{successMessage && (
								<Text
									p="2"
									bg="green.100"
									textAlign="center"
									color="green"
									fontSize="md"
									my="1.5"
								>
									{successMessage}
								</Text>
							)}
							<Box mb="4">
								<Text fontSize="lg">Title</Text>
								<Input
									type="text"
									name="title"
									placeholder="Enter Topic Title"
									required
								/>
							</Box>

							<Box mb="4">
								<Text fontSize="lg">Link (Optional)</Text>
								<Input
									type="text"
									name="link"
									placeholder="Add Link for further reading"
								/>
							</Box>

							<Box mb="4">
								<Text fontSize="lg">Write Up</Text>
								<Textarea
									placeholder="Your write Up goes here"
									name="writeUp"
									size="sm"
									resize="none"
									required
								/>
							</Box>
							<Flex mb="4" justifyContent="space-between">
								<Text fontSize="lg" alignItems="center">
									Add a photo
								</Text>

                                <Checkbox name="addImage" valie={isChecked} onChange={ (e)=>{setIsChecked(e.target.value)}}/>
							</Flex>
							<Input
								placeholder=" Add a photo (Optional)"
								name="image"
								size="sm"
								type="file"
							/>
						</ModalBody>
						<ModalFooter>
							<Button
								disabled={submit}
								colorScheme="red"
								mr={3}
								onClick={closeModal}
							>
								Cancel
							</Button>
							<Button
								isLoading={submit ? true : false}
								loadingText="Subitting"
								type="submit"
								colorScheme="teal"
							>
								Submit
							</Button>
						</ModalFooter>
					</form>
				</ModalContent>
			</Modal>
		</>
	);
}

export default DashboardContents;

const FeedCard = () => {
	return (
		<>
			<Flex
				borderRadius="4"
				flexDir="column"
				boxShadow="0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
				p="2"
				mb="4"
			>
				<Flex mb="1.5">
					<Avatar size="md" />
					<Flex flexDir="column" ml="2.5">
						<Text>Sharon Stone</Text>
						<Text fontSize="sm">3mins ago</Text>
					</Flex>
				</Flex>
				<Text noOfLines={2}>
					The most common browsers which do not support MP4 are found on Linux,
					where the user might need to install additional codec support, and in
					some cases won't want to. You can supply an array of alternate
					sources.
				</Text>
				<Divider my="1.5" />
				<Image src="" height="180" mb="2.5" />
				<Flex justifyContent="space-between">
					<Flex>
						<Flex alignItems="center">
							<IconButton
								variant="ghost"
								icon={<HiOutlineThumbUp fontSize="24px" />}
							/>
							<Text>13</Text>
						</Flex>
						<Flex alignItems="center" ml="1.5rem">
							<IconButton
								variant="ghost"
								icon={<FaRegComment fontSize="24px" />}
							/>
							<Text>3</Text>
						</Flex>
					</Flex>

					<Flex alignItems="center">
						<IconButton
							variant="ghost"
							icon={<IoShareOutline fontSize="24px" />}
						/>
					</Flex>
				</Flex>
			</Flex>
		</>
	);
};
