import React from "react"; // useState, useEffect, useRefs
import {
	Flex,
	Text,
	useColorModeValue,
	
} from "@chakra-ui/react";

const InboxMessageCard = () => {
	const grayColor = useColorModeValue("gray.600", "gray.700");
	return (
		<Flex flexDir="column">
			<Flex
				bg="gray.300"
				p="2.5"
				w="auto"
				maxW="75%"
				borderTopRightRadius="16"
				borderBottomRightRadius="16"
				borderBottomLeftRadius="16"
				flexWrap="wrap"
				mb="4"
				justifyContent="flex-end"
				alignSelf="flex-start"
				color="black"
			>
				<Text>
					For example, we might want to set up a subscription to some external
					data source.{" "}
				</Text>
				<Text
					fontSize="xs"
					fontStyle="italic"
					color={grayColor}
					ml="1.5"
					pt="2"
					textAlign="right"
				>
					6:37pm
				</Text>
			</Flex>

			<Flex
				bg="teal.200"
				p="2.5"
				maxW="75%"
				borderTopLeftRadius="16"
				borderBottomRightRadius="16"
				borderBottomLeftRadius="16"
				flexWrap="wrap"
				mb="4"
				alignSelf="flex-end"
				justifyContent="flex-end"
			>
				<Text>By using </Text>
				<Text
					fontSize="xs"
					fontStyle="italic"
					color={grayColor}
					ml="1.5"
					pt="2"
					textAlign="right"
				>
					6:37pm
				</Text>
			</Flex>

			<Flex
				bg="teal.200"
				p="2.5"
				maxW="75%"
				borderTopLeftRadius="16"
				borderBottomRightRadius="16"
				borderBottomLeftRadius="16"
				flexWrap="wrap"
				mb="4"
				alignSelf="flex-end"
				justifyContent="flex-end"
			>
				<Text>
					Earlier, we looked at how to express side effects that don’t require
					any cleanup. However, some effects do.
				</Text>
				<Text
					fontSize="xs"
					fontStyle="italic"
					color={grayColor}
					ml="1.5"
					pt="2"
					textAlign="right"
				>
					6:37pm
				</Text>
			</Flex>

			<Flex
				bg="gray.300"
				p="2.5"
				w="auto"
				maxW="75%"
				borderTopRightRadius="16"
				borderBottomRightRadius="16"
				borderBottomLeftRadius="16"
				flexWrap="wrap"
				mb="4"
				justifyContent="flex-end"
				alignSelf="flex-start"
			>
				<Text>For example,</Text>
				<Text
					fontSize="xs"
					fontStyle="italic"
					color={grayColor}
					ml="1.5"
					pt="2"
					textAlign="right"
				>
					6:37pm
				</Text>
			</Flex>

			<Flex
				bg="gray.300"
				p="2.5"
				w="auto"
				maxW="75%"
				borderTopRightRadius="16"
				borderBottomRightRadius="16"
				borderBottomLeftRadius="16"
				flexWrap="wrap"
				mb="4"
				justifyContent="flex-end"
				alignSelf="flex-start"
				color="black"
			>
				<Text>
					For example, we might want to set up a subscription to some external
					data source.{" "}
				</Text>
				<Text
					fontSize="xs"
					fontStyle="italic"
					color={grayColor}
					ml="1.5"
					pt="2"
					textAlign="right"
				>
					6:37pm
				</Text>
			</Flex>

			<Flex
				bg="teal.200"
				p="2.5"
				maxW="75%"
				borderTopLeftRadius="16"
				borderBottomRightRadius="16"
				borderBottomLeftRadius="16"
				flexWrap="wrap"
				mb="4"
				alignSelf="flex-end"
				justifyContent="flex-end"
				color="black"
			>
				<Text>By using </Text>
				<Text
					fontSize="xs"
					fontStyle="italic"
					color={grayColor}
					ml="1.5"
					pt="2"
					textAlign="right"
				>
					6:37pm
				</Text>
			</Flex>

			<Flex
				bg="teal.200"
				p="2.5"
				maxW="75%"
				borderTopLeftRadius="16"
				borderBottomRightRadius="16"
				borderBottomLeftRadius="16"
				flexWrap="wrap"
				mb="4"
				alignSelf="flex-end"
				justifyContent="flex-end"
				color="black"
			>
				<Text>
					Earlier, we looked at how to express side effects that don’t require
					any cleanup. However, some effects do.
				</Text>
				<Text
					fontSize="xs"
					fontStyle="italic"
					color={grayColor}
					ml="1.5"
					pt="2"
					textAlign="right"
				>
					6:37pm
				</Text>
			</Flex>

			<Flex
				bg="gray.300"
				p="2.5"
				w="auto"
				maxW="75%"
				borderTopRightRadius="16"
				borderBottomRightRadius="16"
				borderBottomLeftRadius="16"
				flexWrap="wrap"
				mb="4"
				justifyContent="flex-end"
				alignSelf="flex-start"
				color="black"
			>
				<Text>For example,</Text>
				<Text
					fontSize="xs"
					fontStyle="italic"
					color={grayColor}
					ml="1.5"
					pt="2"
					textAlign="right"
				>
					6:37pm
				</Text>
			</Flex>

			<Flex
				bg="gray.300"
				p="2.5"
				w="auto"
				maxW="75%"
				borderTopRightRadius="16"
				borderBottomRightRadius="16"
				borderBottomLeftRadius="16"
				flexWrap="wrap"
				mb="4"
				justifyContent="flex-end"
				alignSelf="flex-start"
				color="black"
			>
				<Text>For example,</Text>
				<Text
					fontSize="xs"
					fontStyle="italic"
					color={grayColor}
					ml="1.5"
					pt="2"
					textAlign="right"
				>
					6:37pm
				</Text>
			</Flex>

			<Flex
				bg="gray.300"
				p="2.5"
				w="auto"
				maxW="75%"
				borderTopRightRadius="16"
				borderBottomRightRadius="16"
				borderBottomLeftRadius="16"
				flexWrap="wrap"
				mb="4"
				justifyContent="flex-end"
				alignSelf="flex-start"
				color="black"
			>
				<Text>For example,</Text>
				<Text
					fontSize="xs"
					fontStyle="italic"
					color={grayColor}
					ml="1.5"
					pt="2"
					textAlign="right"
				>
					6:37pm
				</Text>
			</Flex>

			<Flex
				bg="gray.300"
				p="2.5"
				w="auto"
				maxW="75%"
				borderTopRightRadius="16"
				borderBottomRightRadius="16"
				borderBottomLeftRadius="16"
				flexWrap="wrap"
				mb="4"
				justifyContent="flex-end"
				alignSelf="flex-start"
				color="black"
			>
				<Text>For example,</Text>
				<Text
					fontSize="xs"
					fontStyle="italic"
					color={grayColor}
					ml="1.5"
					pt="2"
					textAlign="right"
				>
					6:37pm
				</Text>
			</Flex>

			<Flex
				bg="gray.300"
				p="2.5"
				w="auto"
				maxW="75%"
				borderTopRightRadius="16"
				borderBottomRightRadius="16"
				borderBottomLeftRadius="16"
				flexWrap="wrap"
				mb="4"
				justifyContent="flex-end"
				alignSelf="flex-start"
				color="black"
			>
				<Text>
					For example, we might want to set up a subscription to some external
					data source.{" "}
				</Text>
				<Text
					fontSize="xs"
					fontStyle="italic"
					color={grayColor}
					ml="1.5"
					pt="2"
					textAlign="right"
				>
					6:37pm
				</Text>
			</Flex>

			<Flex
				bg="teal.200"
				p="2.5"
				maxW="75%"
				borderTopLeftRadius="16"
				borderBottomRightRadius="16"
				borderBottomLeftRadius="16"
				flexWrap="wrap"
				mb="4"
				alignSelf="flex-end"
				justifyContent="flex-end"
				color="black"
			>
				<Text>By using </Text>
				<Text
					fontSize="xs"
					fontStyle="italic"
					color={grayColor}
					ml="1.5"
					pt="2"
					textAlign="right"
				>
					6:37pm
				</Text>
			</Flex>

			<Flex
				bg="teal.200"
				p="2.5"
				maxW="75%"
				borderTopLeftRadius="16"
				borderBottomRightRadius="16"
				borderBottomLeftRadius="16"
				flexWrap="wrap"
				mb="4"
				alignSelf="flex-end"
				justifyContent="flex-end"
				color="black"
			>
				<Text>
					Earlier, we looked at how to express side effects that don’t require
					any cleanup. However, some effects do.
				</Text>
				<Text
					fontSize="xs"
					fontStyle="italic"
					color={grayColor}
					ml="1.5"
					pt="2"
					textAlign="right"
				>
					6:37pm
				</Text>
			</Flex>

			<Flex
				bg="gray.300"
				p="2.5"
				w="auto"
				maxW="75%"
				borderTopRightRadius="16"
				borderBottomRightRadius="16"
				borderBottomLeftRadius="16"
				flexWrap="wrap"
				mb="4"
				justifyContent="flex-end"
				alignSelf="flex-start"
				color="black"
			>
				<Text>For example,</Text>
				<Text
					fontSize="xs"
					fontStyle="italic"
					color={grayColor}
					ml="1.5"
					pt="2"
					textAlign="right"
				>
					6:37pm
				</Text>
			</Flex>

			<Flex
				bg="gray.300"
				p="2.5"
				w="auto"
				maxW="75%"
				borderTopRightRadius="16"
				borderBottomRightRadius="16"
				borderBottomLeftRadius="16"
				flexWrap="wrap"
				mb="4"
				justifyContent="flex-end"
				alignSelf="flex-start"
				color="black"
			>
				<Text>For example,</Text>
				<Text
					fontSize="xs"
					fontStyle="italic"
					color={grayColor}
					ml="1.5"
					pt="2"
					textAlign="right"
				>
					6:37pm
				</Text>
			</Flex>

			<Flex
				bg="gray.300"
				p="2.5"
				w="auto"
				maxW="75%"
				borderTopRightRadius="16"
				borderBottomRightRadius="16"
				borderBottomLeftRadius="16"
				flexWrap="wrap"
				mb="4"
				justifyContent="flex-end"
				alignSelf="flex-start"
				color="black"
			>
				<Text>For example,</Text>
				<Text
					fontSize="xs"
					fontStyle="italic"
					color={grayColor}
					ml="1.5"
					pt="2"
					textAlign="right"
				>
					6:37pm
				</Text>
			</Flex>

			<Flex
				bg="gray.300"
				p="2.5"
				w="auto"
				maxW="75%"
				borderTopRightRadius="16"
				borderBottomRightRadius="16"
				borderBottomLeftRadius="16"
				flexWrap="wrap"
				mb="4"
				justifyContent="flex-end"
				alignSelf="flex-start"
				color="black"
			>
				<Text>For example,</Text>
				<Text
					fontSize="xs"
					fontStyle="italic"
					color={grayColor}
					ml="1.5"
					pt="2"
					textAlign="right"
				>
					6:37pm
				</Text>
			</Flex>
		</Flex>
	);
};

export default InboxMessageCard;
