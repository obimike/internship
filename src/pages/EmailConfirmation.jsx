import React from "react";
import { Link as RouterLink, Redirect } from "react-router-dom";
//External Library Import
import {
	Text,
	Image,
	Container,
	Link,
	Heading,
	VStack,
	Divider,
} from "@chakra-ui/react";
//Import assets
import Envelop from "../assets/images/mail.png";

import { APP_NAME } from "../utils/Constants";

const EmailConfirmation = (props) => {
	const { location } = props;

	let state = location.state;

	if (state === undefined) {
		return (
			<Redirect
				to={{
					pathname: "/signin",
				}}
			/>
		);
	}

	const email = state.email;

	return (
		<Container p="8" maxW="lg" mt="4">
			<VStack mb="2">
				<Heading as="h3" size="xl" mb="4">
					{APP_NAME}
				</Heading>

				<Image height="12rem" width="12rem" src={Envelop} />

				<Text fontWeight="bold" fontSize="1.2em">
					Email Confirmation
				</Text>
				<Text fontSize="1.1em" textAlign="center">
					An email has been sent to "{email}".
				</Text>
				<Text fontSize="1.1em">
					{" "}
					Click on the link to complete registration.
				</Text>
				<Divider style={{ marginTop: 10 }} />
				<Text style={{ marginBottom: 15 }}>
					Click{" "}
					<Link as={RouterLink} to="/signin" color="teal" fontWeight="bold">
						here
					</Link>{" "}
					to login
				</Text>
			</VStack>
		</Container>
	);
};

export default EmailConfirmation;
