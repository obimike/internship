import { Link as RouterLink } from "react-router-dom";
import { Flex, Text, useColorModeValue, LinkBox } from "@chakra-ui/react";
import { IoLogoJavascript, IoLogoPython } from "react-icons/io";
import { MdKeyboardArrowRight } from "react-icons/md";
import { FaPhp, FaCss3 } from "react-icons/fa";
import { SiCsharp, SiJava, SiHtml5 } from "react-icons/si";

function MaterialsCard({ name, totalContent }) {
	const grayColor = useColorModeValue("gray.600", "gray.400");

	const changeBackground = (language) => {
		switch (language) {
			case "Javascript":
				return {
					bg: "yellow.500",
					title: "Javascript",
					icon: <IoLogoJavascript color="#000" fontSize="32px" />,
				};

			case "Php":
				return {
					bg: "blue.900",
					title: "Php",
					icon: <FaPhp color="white" fontSize="32px" />,
				};
			case "Python":
				return {
					bg: "#006064",
					title: "Python",
					icon: <IoLogoPython color="#ffd600" fontSize="32px" />,
				};
			case "CSS":
				return {
					bg: "#039be5",
					title: "CSS",
					icon: <FaCss3 color="#fff" fontSize="32px" />,
				};
			case "HTML":
				return {
					bg: "#ff6e40",
					title: "HTML",
					icon: <SiHtml5 color="#fff" fontSize="32px" />,
				};

			case "CSharp":
				return {
					bg: "purple.500",
					title: "CSharp",
					icon: <SiCsharp color="#fff" fontSize="32px" />,
				};
			case "Java":
				return {
					bg: "red.500",
					title: "Java",
					icon: <SiJava color="white" fontSize="32px" />,
				};

			default:
				return {
					bg: "",
					title: { name },
					icon: "",
				};
		}
	};

	return (
		<LinkBox as={RouterLink} to={`materials/${name}`}>
			<Flex
				flexDir="row"
				borderRadius="4"
				border="1px"
				borderColor={grayColor}
				p="1"
				justifyContent="space-between"
				alignItems="center"
				mb="1.5"
			>
				<Flex flexDir="row" alignItems="center">
					<Flex bg={changeBackground(name).bg} p="2" m="2" borderRadius="4">
						{changeBackground(name).icon}
					</Flex>
					<Flex flexDir="column" justifyContent="space-between">
						<Text fontSize="lg">{changeBackground(name).title}</Text>
						<Text fontSize="sm" color={grayColor}>
							Total Content {totalContent}
						</Text>
					</Flex>
				</Flex>
				<Flex p="2">
					<MdKeyboardArrowRight fontSize="24px" fontColor={grayColor} />
				</Flex>
			</Flex>
		</LinkBox>
	);
}

export default MaterialsCard;
