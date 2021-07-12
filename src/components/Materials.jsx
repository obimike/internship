import React from 'react'

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

function Materials() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const {title, setTitle} = React.useState('')
    const { upload, setUpload } = React.useState("");
    

    const handleSubmit = () => {
        alert(title)
    }

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
									// onChange={setTitle(title)}
									value={title}
								/>
							</Box>
							<Box mb="4">
								<Text fontSize="lg">Upload File</Text>
								<Input
									type="file"
									name="upload"
									placeholder="Enter Email"
									// onChange={formik.handleChange}
									// value={formik.values.email}
								/>
							</Box>
							<Box mb="4">
								<Text fontSize="lg">Category</Text>
								<Select placeholder="Select option" name="category">
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
