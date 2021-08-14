import { useState, useRef } from "react";
import {
	Flex,
	Heading,
	useColorModeValue,
	Input,
	Box,
	Button,
	Text,
	Container,
	VStack,
} from "@chakra-ui/react";

import { IoIosSchool } from "react-icons/io";
import { APP_NAME } from "../utils/Constants";
import { fb } from "../firebase/Config";

function ForgetPassword() {
	const [submit, setSubmit] = useState(false);
	const [success, setSuccess] = useState("");
	const [error, setError] = useState("");
	const grayColor = useColorModeValue("gray.600", "gray.400");
	const emailRef = useRef();

	const handleSubmit = (e) => {
		e.preventDefault();
		setError("");
		setSuccess("");
		setSubmit(true);

		fb.auth()
			.sendPasswordResetEmail(emailRef.current.value)
			.then(() => {
				setSuccess("Password reset email sent!");
				setSubmit(false);
			})
			.catch((error) => {
				var errorMessage = error.message;
				setError(errorMessage);
				setSubmit(false);
			});
	};
	return (
		<Flex height="100vh">
			<Container p="8" maxW="lg" mt="2">
				<VStack mb="2">
					<Flex>
						<IoIosSchool fontSize="2.5rem" color="teal" />
						<Heading as="h3" letterSpacing="tight" fontWeight="light" ml="2">
							{APP_NAME}
						</Heading>
					</Flex>
				</VStack>

				<Text mt={9}>Forget Password</Text>
				<Text fontSize="xs" mb={6} color={grayColor}>
					Enter your registered email to receive password reset instructions.{" "}
				</Text>

				{error && (
					<Text align="center" color="red" my="2.5">
						{error}
					</Text>
				)}
				{success && (
					<Text align="center" color="green" my="2.5">
						{success}
					</Text>
				)}

				<form onSubmit={handleSubmit}>
					<Box mb="4">
						<Text fontSize="lg">Email</Text>
						<Input
							placeholder="Enter email"
							ref={emailRef}
							type="email"
							name="email"
							required
						/>
					</Box>
					<Button
						type="submit"
						isLoading={submit ? true : false}
						loadingText="Resetting password..."
						colorScheme="teal"
						w="100%"
						mt="2.5"
					>
						Reset password
					</Button>
				</form>
			</Container>
		</Flex>
	);
}

export default ForgetPassword;
