import InboxContent from "../components/InboxContent";
import Header from "../components/Header";

import { Flex, Text, Center, Image } from "@chakra-ui/react";

import { useAuth } from "../contexts/Auth";
import NoMessage from "../assets/images/no_message.svg";

export default function Inbox() {
	const { userData } = useAuth();

	console.log(userData);

	return (
		<Header>
			<Flex mt={8} flexDir="column">
				{userData.contacts.length > 0 ? (
					<Flex flexDir="column">
						<Text fontSize="xl" fontWeight="bold" mb={4}>
							Inbox
						</Text>

						<InboxContent contacts={userData.contacts} />
					</Flex>
				) : (
					<Center flexDir="column" mt={16}>
						<Image src={NoMessage} width="640" height="320" />
						<Text textAlign="center">No Message found!</Text>
					</Center>
				)}
			</Flex>
		</Header>
	);
}
