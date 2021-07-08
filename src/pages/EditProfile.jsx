import React from "react";
import { Link as RouterLink } from "react-router-dom";
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
	Textarea,
	Select,
	Link,
	Input,
} from "@chakra-ui/react";
import { FiArrowLeft, FiPhone, FiUser, FiLink, FiUpload } from "react-icons/fi";
function EditProfile() {
	return (
		<Header>
			<SimpleGrid
				display={{ base: "initial", md: "grid" }}
				columns={{ md: 2 }}
				spacing={{ md: 6 }}
				width="100%"
				mt={20}
			>
				<GridItem colSpan={3} mb={5}>
					<Link as={RouterLink} to="/profile" _hover={{ color: "teal" }}>
						<Flex alignItems="center" flexDir="row" align="flex-start">
							<FiArrowLeft fontSize="1rem" />
							<Text fontSize="xl" ml={1.5}>
								Profile
							</Text>
						</Flex>
					</Link>
				</GridItem>
				<GridItem colSpan={{ md: 1 }}>
					<Box px={[4, 0]}>
						<form>
							<Flex flexDir="column">
								<Box mb="4">
									<Text fontSize="lg">First Name</Text>
									<Input type="text" name="firstName" placeholder="Angelina" />
								</Box>
								<Box mb="4">
									<Text fontSize="lg">Last Name</Text>
									<Input type="text" name="lastName" placeholder="Jolie" />
								</Box>
								<Box mb="4">
									<Text fontSize="lg">Email</Text>
									<Input
										type="email"
										name="email"
										placeholder="ajolie@hollywood.com"
									/>
								</Box>
								<Box mb="4">
									<Text fontSize="lg">Phone</Text>
									<Input type="phone" name="phone" placeholder="09000000000" />
								</Box>
								<Box mb="4">
									<Text fontSize="lg">Date of Birth</Text>
									<Input type="date" name="dob" />
								</Box>
								<Box mb="4">
									<Text fontSize="lg">School</Text>
									<Input
										type="text"
										name="school"
										placeholder="New York University (NYU)"
									/>
								</Box>

								<Box mb="4">
									<Text fontSize="lg">Internship Type</Text>
									<Select name="type">
										<option value="Industrial Attachment">
											Industrial Attachment
										</option>
										<option value="Youth Service Corp">
											Youth Service Corp
										</option>
										<option value="ntern">Intern</option>
									</Select>
								</Box>
								<Box mb="4">
									<Text fontSize="lg">Intership Duration</Text>
									<Flex justifyContent="space-between" mt="2">
										<Box w="47%">
											<Text fontSize="md">Start Date</Text>
											<Input type="date" name="firstName" />
										</Box>
										<Box w="47%">
											<Text fontSize="md">End Date</Text>
											<Input type="date" name="endDate" />
										</Box>
									</Flex>
								</Box>

								<Box mb="4">
									<Text fontSize="lg">Your Supervisor's Name</Text>
									<Input
										type="text"
										name="supervisor"
										placeholder="Seun Abolarin"
									/>
								</Box>
								<Box mb="4">
									<Text fontSize="lg">Your personnal website</Text>
									<Input
										type="text"
										name="website"
										placeholder="angelinajolie.com"
									/>
								</Box>
								<Box mb="4">
									<Text fontSize="lg">Twitter</Text>
									<Input
										type="phone"
										name="twitter"
										placeholder="http://twitter.com/ajolie"
									/>
								</Box>
								<Box mb="4">
									<Text fontSize="lg">Facebook</Text>
									<Input
										type="text"
										name="facebook"
										placeholder="https://web.facebook.com/ajolie"
									/>
								</Box>
								<Box mb="4">
									<Text fontSize="lg">Instagram</Text>
									<Input
										type="text"
										name="instagram"
										placeholder="https://web.instagram.com/ajolie"
									/>
								</Box>
								<Box mb="4">
									<Text fontSize="lg">LinkedIn</Text>
									<Input
										type="text"
										name="linkedin"
										placeholder="https://web.linkedlin.com/"
									/>
								</Box>
								<Box mb="4">
									<Text fontSize="lg">About Me</Text>
									<Textarea placeholder="About Me" size="sm" resize="none" />
								</Box>
								<Button type="submit" colorScheme="teal">
									Update Profile
								</Button>
							</Flex>
						</form>
					</Box>
				</GridItem>
				<GridItem mt={[5, null, 0]} colSpan={{ md: 1 }}>
					<VStack>
						<Heading as="h2" fontSize="2xl" mb='1.5'>
							Profile Image
						</Heading>
						<Box>
							<Image
								w="280px"
								h="280px"
								borderRadius="50%"
								src="https://th.bing.com/th/id/OIP.jlUxbDUaJFdElVjeovue-QHaJA?pid=ImgDet&rs=1"
								pos="relative"
							/>
							<Button bottom='12' left='2' colorScheme='teal'  >
								<Flex alignItems="center">
									<FiUpload />
									<Text ml="1" fontSize="sm">
										upload
									</Text>
								</Flex>
							</Button>
						</Box>
					</VStack>
				</GridItem>
			</SimpleGrid>
		</Header>
	);
}

export default EditProfile;
