import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
	Container,
	Box,
	Button,
	Text,
	VStack,
	Input,
	Flex,
	Checkbox,
	Heading,
	InputGroup,
	InputRightElement,
	Image,
	Center,
	Link,
} from "@chakra-ui/react";

import * as Yup from "yup";
import { useFormik } from "formik";
import GoogleIcon from "../assets/images/search.png";
import { APP_NAME } from "../utils/Constants";

const validationSchema = Yup.object({
	firstName: Yup.string("Enter your First Name!").required(
		"First Name is required!",
	),
	lastName: Yup.string("Enter your Last Name").required(
		"Last Name is required!",
	),
	email: Yup.string("Enter your email")
		.email("Enter a valid email")
		.required("Email is required!"),
	password: Yup.string("Enter your password")
		.min(8, "Password should be of minimum 8 characters length")
		.required("Password is required!"),
	confirm_password: Yup.string()
		.oneOf([Yup.ref("password"), null], "Passwords must match")
		.required("Confirm Password is required"),
	terms: Yup.bool().oneOf([true], "Accept Terms & Conditions is required"),
});

function SignUp() {
	const [showPassword, setShowPassword] = useState(false);
	const [signupError, setsignupError] = useState([""]);

	const handleShowPassword = () => setShowPassword(!showPassword);

	const formik = useFormik({
		initialValues: {
			firstName: "",
			lastName: "",
			email: "",
			password: "",
			confirm_password: "",
			terms: false,
		},
		validationSchema: validationSchema,
		onSubmit: (values) => {
			alert(JSON.stringify(values, null, 2));
		},
	});

	return (
		<Flex>
			<Container p="8" maxW="lg" mt="4">
				<VStack mb="2">
					<Heading as="h3" size="xl" mb="4">
						{APP_NAME}
					</Heading>
					<Button
						leftIcon={<Image src={GoogleIcon} w="4" alt="" />}
						colorScheme="teal"
						variant="outline"
					>
						Sign in with Google
					</Button>
					<Flex mt="2" justifyContent="space-between">
						<Text fontSize="md" mt="2" color="gray.300">
							or
						</Text>
					</Flex>
				</VStack>

				<form onSubmit={formik.handleSubmit}>
					<Flex mb="4" justifyContent="space-between">
						<Box w="47%">
							<Text fontSize="lg">First Name</Text>
							<Input
								type="text"
								name="firstName"
								placeholder="Enter First Name"
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={formik.values.firstName}
							/>
							{formik.touched.firstName && formik.errors.firstName ? (
								<Text fontSize="sm" style={{ color: "red" }}>
									{formik.errors.firstName}
								</Text>
							) : null}
						</Box>
						<Box w="47%">
							<Text fontSize="lg">Last Name</Text>
							<Input
								type="text"
								name="lastName"
								placeholder="Enter Last Name"
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={formik.values.lastName}
							/>
							{formik.touched.lastName && formik.errors.lastName ? (
								<Text fontSize="sm" style={{ color: "red" }}>
									{formik.errors.lastName}
								</Text>
							) : null}
						</Box>
					</Flex>
					<Box mb="4">
						<Text fontSize="lg">Email</Text>
						<Input
							type="email"
							name="email"
							placeholder="Enter Email"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.email}
						/>
						{formik.touched.email && formik.errors.email ? (
							<Text fontSize="sm" style={{ color: "red" }}>
								{formik.errors.email}
							</Text>
						) : null}
					</Box>

					<Box mb="4">
						<Text fontSize="lg">Password</Text>
						<InputGroup size="md">
							<Input
								pr="4.5rem"
								type={showPassword ? "text" : "password"}
								placeholder="Enter password"
								name="password"
								value={formik.values.password}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								autoComplete="true"
							/>
							<InputRightElement width="4.5rem">
								<Button h="1.75rem" size="sm" onClick={handleShowPassword}>
									{showPassword ? "Hide" : "Show"}
								</Button>
							</InputRightElement>
						</InputGroup>
						{formik.touched.password && formik.errors.password ? (
							<Text fontSize="sm" style={{ color: "red" }}>
								{formik.errors.password}
							</Text>
						) : null}
					</Box>
					<Box mb="4">
						<Text fontSize="lg">Confirm Password</Text>
						<Input
							type={showPassword ? "text" : "password"}
							placeholder="Confirm password"
							name="confirm_password"
							value={formik.values.confirm_password}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							autoComplete="true"
						/>
						{formik.touched.confirm_password &&
						formik.errors.confirm_password ? (
							<Text fontSize="sm" style={{ color: "red" }}>
								{formik.errors.confirm_password}
							</Text>
						) : null}
					</Box>
					<Flex my="2" justifyContent="space-between">
						<Checkbox
							name="terms"
							value={formik.values.terms}
							onChange={formik.handleChange}
							fontSize="sm"
						>
							{formik.touched.terms && formik.errors.terms ? (
								<Text fontSize="sm" style={{ color: "red" }}>
									{formik.errors.terms}
								</Text>
							) : (
								"I accept the Term of service and Privacy policy."
							)}
						</Checkbox>
					</Flex>
					<Button type="submit" colorScheme="teal" w="100%" mt="2.5">
						Sign up
					</Button>
				</form>

				<Center mt="8">
					<Text fontSize="sm" mr="1.5">
						Already have an account?
					</Text>
					<Link as={RouterLink} to="/signin" fontSize="sm" color="teal">
						Sign in
					</Link>
				</Center>
			</Container>
		</Flex>
	);
}

export default SignUp;
