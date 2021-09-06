import { useState, useEffect } from "react";
import { useColorModeValue, Text, Center } from "@chakra-ui/react";
import { IoIosSchool } from "react-icons/io";
import "../Style.css";
import LandingPage from "./LandingPage";

function Splash() {
	const grayColor = useColorModeValue("gray.600", "gray.400");
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setTimeout(() => {
			setLoading(false);
		}, 2500);
	}, []);

	if (loading) {
		return (
			<Center height="100vh" w="100vw" m="auto">
				<Center flexDir="column">
					<IoIosSchool fontSize="8em" color="teal" />
					<Text fontSize="2.5em">Internship</Text>
					<Text
						className="loadingDot"
						color={grayColor}
						fontSize="1.5em"
						mt={32}
					>
						Loading<span className="loadingDot">...</span>
					</Text>
				</Center>
			</Center>
		);
	} else {
		return <LandingPage />;
	}
}
export default Splash;
