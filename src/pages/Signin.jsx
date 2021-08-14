import { useState } from "react";
import { Link as RouterLink, Redirect, useHistory } from "react-router-dom";
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

import { useAuth, googleSign } from "../contexts/Auth";
import { auth } from "../firebase/Config";
import { IoIosSchool } from "react-icons/io";

const validationSchema = Yup.object({
	email: Yup.string("Enter your email")
		.email("Enter a valid email")
		.required("Email is required"),
	password: Yup.string("Enter your password")
		.min(8, "Password should be of minimum 8 characters length")
		.required("Password is required"),
});

let history;

function Signin() {
	const [submit, setSubmit] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [loginError, setLoginError] = useState([""]);
	history = useHistory();

	const handleShowPassword = () => setShowPassword(!showPassword);
	const { isVerifiedEmail } = useAuth();

	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
			remember_me: false,
		},
		validationSchema: validationSchema,
		onSubmit: (values) => {
			// alert(JSON.stringify(values, null, 2));
			LoginComponent(values, setLoginError, setSubmit);
		},
	});

	//Check Auth then redirects
	if (isVerifiedEmail) {
		// case true:
		return (
			<Redirect
				to={{
					pathname: "/dashboard",
				}}
			/>
		);
		// case false:
	} else {
		return (
			<Flex height="100vh">
				<Container p="8" maxW="lg" mt="2">
					<VStack mb="2">
						<Flex mb="4">
							<IoIosSchool fontSize="2.5rem" color="teal" />
							<Heading
								as="h3"
								size="xl"
								letterSpacing="tight"
								fontWeight="light"
								ml="2"
							>
								{APP_NAME}
							</Heading>
						</Flex>

						<Button
							leftIcon={<Image src={GoogleIcon} w="4" alt="" />}
							colorScheme="teal"
							variant="outline"
							onClick={handlGoogleSign}
						>
							Sign in with Google
						</Button>
						<Flex mt="2" justifyContent="space-between">
							<Text fontSize="md" mt="2" color="gray.300">
								or
							</Text>
						</Flex>
					</VStack>
					{loginError && (
						<Text align="center" color="red" my="2.5">
							{loginError}
						</Text>
					)}
					<form onSubmit={formik.handleSubmit}>
						<Box mb="4">
							<Text fontSize="lg">Email</Text>
							<Input
								type="email"
								name="email"
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
						<Flex my="2" justifyContent="space-between">
							<Checkbox
								name="remember_me"
								onChange={formik.handleChange}
								fontSize="sm"
							>
								remember me
							</Checkbox>
							<Text fontSize="sm" color="teal">
								Forget password?
							</Text>
						</Flex>
						<Button
							type="submit"
							isLoading={submit ? true : false}
							loadingText="signing in..."
							colorScheme="teal"
							w="100%"
							mt="2.5"
						>
							Sign in
						</Button>
					</form>

					<Center mt="8">
						<Text fontSize="sm" mr="1.5">
							Don't have an account?{" "}
						</Text>
						<Link as={RouterLink} to="/signup" fontSize="sm" color="teal">
							Sign up
						</Link>
					</Center>
				</Container>
			</Flex>
		);
		// default:
	}
}

export default Signin;

//Authenticate Using Google Sign-In
async function handlGoogleSign() {
	try {
		await googleSign();
		history.push("/dashboard");
	} catch {}
}

//Sigin validation and verified email check
function LoginComponent(values, setLoginError, setSubmit) {
	setSubmit(true);

	auth
		.signInWithEmailAndPassword(values.email, values.password)
		.then((result) => {
			//Check if user has successfully verify their email
			if (!result.user.emailVerified) {
				setLoginError("Please verify your email to continue");
				setSubmit(false);
				auth.signOut();
			} else {
				return (
					<Redirect
						to={{
							pathname: "/projects",
						}}
					/>
				);
			}
		})
		.catch(function (error) {
			// Handle Errors here.
			setSubmit(false);
			var errorCode = error.code;
			loginErrorFunction(errorCode, setLoginError);
			// ...
		});
}

//Returns error if sign in fails
function loginErrorFunction(errorCode, setLoginError) {
	switch (errorCode) {
		case "auth/user-not-found":
			setLoginError("This User does not exist.");
			break;
		case "auth/wrong-password":
			setLoginError("Wrong email or password");
			break;
		case "auth/too-many-requests":
			setLoginError("Too many failed login attempts. Please try again later.");
			break;
		case "auth/network-request-failed":
			setLoginError(
				"Network error. Please check your connection and try again later.",
			);
			break;
		default:
			setLoginError("An error has occur while trying to Sign In");
	}
}
