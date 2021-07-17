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
	Select,
} from "@chakra-ui/react";
import { RiAddLine } from "react-icons/ri";
import { format } from "date-fns";

import { useAuth } from "../contexts/Auth";
import Lessonscard from "./Lessonscard";

function Lessons() {
	return (
		<>
			<LessonsHeader />
			<Lessonscard />
		</>
	);
}

export default Lessons;

const LessonsHeader = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { currentUser } = useAuth();
	//component state
	const [error, setError] = useState("");
	const [successMessage, setSuccessMessage] = useState("");
	const [submit, setSubmit] = useState(false);

	const handleSubmit = (e) => {};

	const [selectDate, setSelectdate] = useState(
		format(new Date(), "yyyy-MM-dd"),
	);

	return (
		<>
			<Flex
				justifyContent="space-between"
				mb="2.5"
				w="100%"
				alignItems="center"
			>
				<Input
					type="date"
					w="50%"
					value={selectDate}
					onChange={(e) => setSelectdate(e.target.value)}
				/>
				<IconButton
					icon={<RiAddLine color="teal" fontSize="24px" />}
					variant="ghost"
					onClick={onOpen}
				/>
			</Flex>

			<Modal isOpen={isOpen} size="sm">
				<ModalOverlay />
				<ModalContent>
					<form onSubmit={handleSubmit}>
						<ModalHeader align="center">Uplaod Material</ModalHeader>
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
									placeholder="Enter Title"
									required
								/>
							</Box>
							<Box mb="4">
								<Text fontSize="lg">Upload File</Text>
								<Input
									type="file"
									name="upload"
									placeholder="Upload File"
									required
								/>
							</Box>
							<Box mb="4">
								<Text fontSize="lg">Category</Text>
								<Select placeholder="Select option" name="category" required>
									<option value="Data Structure and Algorithm">
										Data Structure and Algorithm
									</option>
									<option value="CSS">CSS</option>
									<option value="Php">Php</option>
									<option value="Javascript">Javascript</option>
									<option value="Csharp">CSharp</option>
									<option value="Python">Python</option>
									<option value="HTML">HTML</option>
									<option value="Java">Java</option>
								</Select>
							</Box>
						</ModalBody>
						<ModalFooter>
							<Button
								disabled={submit}
								colorScheme="red"
								mr={3}
								onClick={onClose}
							>
								Cancel
							</Button>
							<Button
								isLoading={submit ? true : false}
								loadingText="Uploading"
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
};
