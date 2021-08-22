//components
import Header from "../components/Header";
import DashboardContents from "../components/DashboardContents";
import Lessons from "../components/Lessons";
import Materials from "../components/Materials";

import {
	Text,
	Flex,
	Tabs,
	TabList,
	TabPanels,
	Tab,
	TabPanel,
} from "@chakra-ui/react";
import { RiDashboardFill, RiBook2Line } from "react-icons/ri";
import { GiTeacher } from "react-icons/gi";

// import { useAuth } from "../contexts/Auth";

function Dashboard() {
	// const { isVerifiedEmail, currentUser } = useAuth();

	return (
		<Header>
			<Flex mt={20} flexDir="column" >
				<Tabs variant="enclosed-colored" colorScheme="teal" isLazy isFitted>
					<TabList>
						<Tab fontSize={{ base: "0.9rem", md: "1rem", lg: "1.2rem" }}>
							<Flex flexDir="row" align="center">
								<RiDashboardFill
									fontSize={{ base: "0.9rem", md: "1rem", lg: "1.2rem" }}
								/>
								<Text ml="1.5">Feeds</Text>
							</Flex>
						</Tab>
						<Tab fontSize={{ base: "0.9rem", md: "1rem", lg: "1.2rem" }}>
							<Flex flexDir="row" align="center">
								<GiTeacher
									fontSize={{ base: "0.9rem", md: "1rem", lg: "1.2rem" }}
								/>
								<Text ml="1.5">Classes</Text>
							</Flex>
						</Tab>
						<Tab fontSize={{ base: "0.9rem", md: "1rem", lg: "1.2rem" }}>
							<Flex flexDir="row" align="center">
								<RiBook2Line
									fontSize={{ base: "0.9rem", md: "1rem", lg: "1.2rem" }}
								/>
								<Text ml="1.5">Materials</Text>
							</Flex>
						</Tab>
					</TabList>
					<TabPanels>
						<TabPanel>
							<DashboardContents />
						</TabPanel>
						<TabPanel>
							<Lessons />
						</TabPanel>
						<TabPanel>
							<Materials />
						</TabPanel>
					</TabPanels>
				</Tabs>
			</Flex>
		</Header>
	);
}

export default Dashboard;
