import { Link as RouterLink } from "react-router-dom";
import {
	Flex,
	Text,
	useColorModeValue,
	LinkBox,
	Drawer,
	DrawerContent,
	DrawerOverlay,
	DrawerHeader,
	DrawerBody,
	useDisclosure,
	IconButton,
} from "@chakra-ui/react";
import { IoLogoJavascript, IoLogoPython, IoIosClose } from "react-icons/io";
import { MdKeyboardArrowRight } from "react-icons/md";
import { FaPhp, FaCss3, FaRegFilePdf, FaRegFileVideo } from "react-icons/fa";
import { SiCsharp, SiJava, SiHtml5, SiMoleculer } from "react-icons/si";
import { BiCloudDownload } from "react-icons/bi";

function MaterialsCard({ name, totalContent, content, loading }) {
	const grayColor = useColorModeValue("gray.600", "gray.400");
	const { isOpen, onOpen, onClose } = useDisclosure();

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

			case "Data Structure and Algorithm":
				return {
					bg: "teal.500",
					title: "Data Structure and Algorithm",
					icon: <SiMoleculer color="white" fontSize="32px" />,
				};

			default:
				return {
					bg: "",
					title: { name },
					icon: "",
				};
		}
	};

	console.log(content);

	return (
		<>
			<LinkBox to="#" as={RouterLink} onClick={onOpen}>
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
						<MdKeyboardArrowRight fontSize="24px" color={grayColor} />
					</Flex>
				</Flex>
			</LinkBox>

			{/* Bottom Drawer */}
			<Drawer placement="left" isOpen={isOpen} size="full">
				<DrawerOverlay />
				<DrawerContent>
					<DrawerHeader borderBottomWidth="1px">
						<Flex flexDir="row" justifyContent="space-between" align="center">
							{changeBackground(name).title}
							<IconButton
								onClick={onClose}
								variant="ghost"
								icon={<IoIosClose fontSize="32px" />}
							/>
						</Flex>
					</DrawerHeader>
					<DrawerBody w="100%">
						<Text fontSize="lg" my="2.5">
							Total Content {totalContent}
						</Text>

						{/* {Object.keys(content).length === 0 && (
							<flex style={{ textAlign: "center" }}>
								<Text variant="subtitle1">No Task Item added yet</Text>
								<Text variant="body2">
									Type in the text box above and hit enter.
								</Text>
							</flex>
						)} */}

						{!loading && (
							<>
								{content.map((item) => (
									<div key={item.itemID}>
										<MaterialsItems item={item} />
									</div>
								))}
							</>
						)}
					</DrawerBody>
				</DrawerContent>
			</Drawer>
		</>
	);
}

export default MaterialsCard;

const MaterialsItems = ({ item }) => {
	const grayColor = useColorModeValue("gray.600", "gray.400");

	// console.log(item.fileType);

	//selecting Icon
	let icon = "";
	switch (item.fileType) {
		case "pdf":
			icon = <FaRegFilePdf fontSize="32px" />;
			break;
		case "mkv":
			icon = <FaRegFileVideo fontSize="32px" />;
			break;
		default:
			icon = <FaRegFileVideo fontSize="32px" />;
	}

	const download = async () => {
		let headers = new Headers();
		headers.append("Access-Control-Allow-Origin", "http://localhost:3000");
		headers.append("Access-Control-Allow-Credentials", "true");

		await fetch(item.fileUrl, {
			mode: 'no-cors',
			credentials: "include",
			method: "GET",
			headers: headers,
		}).then((response) => {
			console.log(response.data);
			const url = window.URL.createObjectURL(new Blob([response.data]));
			const link = document.createElement("a");
			link.href = url;
			link.click();
		});
	};

	return (
		<Flex>
			<Flex
				flexDir="row"
				borderRadius="4"
				// border="1px"
				// p="0.5"
				justifyContent="space-between"
				alignItems="center"
				mb="1.5"
				bg="gray.50"
				w="100%"
			>
				<Flex flexDir="row" alignItems="center">
					<Flex p="2" m="2" borderRadius="4">
						{icon}
					</Flex>
					<Flex flexDir="column" justifyContent="space-between">
						<Text fontSize="lg">{item.title}</Text>
						<Flex flexDir="row" alignItems="center">
							<Text fontSize="xs" color={grayColor}>
								by: <b>{item.uploaderName}</b>
							</Text>
							<Text fontSize="xs" color={grayColor} ml="1">
								size: <b>{(item.fileSize / (1024 * 1024)).toFixed(2)}mb</b>
							</Text>
						</Flex>
					</Flex>
				</Flex>
				<Flex p="2">
					<IconButton
						variant="ghost"
						icon={<BiCloudDownload color="teal" fontSize="24px" />}
						onClick={download}
					/>
				</Flex>
			</Flex>
		</Flex>
	);
};
