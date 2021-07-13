import React from "react";

import MaterialsCard from "./MaterialsCard";

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

import { db } from "../firebase/Config";
import { useAuth } from "../contexts/Auth";
	

function Materials() {
	const { isOpen, onOpen, onClose } = useDisclosure();
    const { error, setError } = React.useState("");
    const { currentUser } = useAuth();
	// const { upload, setUpload } = React.useState("");
	// const { category, setCategory } = React.useState("");

	// const handleTitle = (e) => setTitle(e.target.value);
	// const handleUpload = (e) => setUpload(e.target.value);
	// const handleCategory = (e) => setCategory(e.target.value);

	const handleSubmit = (e) => {
		e.preventDefault();
		const title = e.target.title.value;
		const category = e.target.category.value;
		const upload = e.target.upload.value;

		db.collection("materials")
			.add({
				title: title,
				file: upload,
				category: category,
				time: "",
				uploaderName: currentUser.displayName,
				uploaderID: currentUser.uid,
				fileSize: "",
			})
			.then((docRef) => {
				console.log("Document written with ID: ", docRef.id);
			})
			.catch((error) => {
				console.error("Error adding document: ", error);
			});

		console.log(category);
	};

	return (
		<Flex flexDir="column" pos="relative" h="100vh">
			<MaterialsCard name="Data Structure and Algorithm" totalContent={5} />
			<MaterialsCard name="Javascript" totalContent={9} />
			<MaterialsCard name="Python" totalContent={14} />
			<MaterialsCard name="Php" totalContent={26} />
			<MaterialsCard name="CSS" totalContent={15} />
			<MaterialsCard name="HTML" totalContent={6} />
			<MaterialsCard name="CSharp" totalContent={10} />
			<MaterialsCard name="Java" totalContent={3} />

			<IconButton
				onClick={onOpen}
				colorScheme="teal"
				pos="fixed"
				size="lg"
				bottom={16}
				right={8}
				icon={<RiAddLine color="white" fontSize="24px" />}
				isRound
			/>

			<Modal isOpen={isOpen} size="sm">
				<ModalOverlay />
				<ModalContent>
					<form onSubmit={handleSubmit}>
						<ModalHeader align="center">Uplaod Material</ModalHeader>
						<ModalBody>
							<Box mb="4">
								<Text fontSize="lg">Title</Text>
								<Input
									type="text"
									name="title"
									placeholder="Enter Title"
									// onChange={handleTitle}
									// value={title}
									required
								/>
							</Box>
							<Box mb="4">
								<Text fontSize="lg">Upload File</Text>
								<Input
									type="file"
									name="upload"
									placeholder="Enter Email"
									// onChange={handleUpload}
									// value={upload}
									required
								/>
							</Box>
							<Box mb="4">
								<Text fontSize="lg">Category</Text>
								<Select
									placeholder="Select option"
									name="category"
									required
									// onChange={handleCategory}
								>
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
							<Button colorScheme="red" mr={3} onClick={onClose}>
								Cancel
							</Button>
							<Button type="submit" colorScheme="teal">
								Submit
							</Button>
						</ModalFooter>
					</form>
				</ModalContent>
			</Modal>
		</Flex>
	);
}

export default Materials;
