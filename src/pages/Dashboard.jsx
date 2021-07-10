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
			<Flex mt={20} flexDir="column" h="100vh">
				<Tabs variant="enclosed-colored" colorScheme="teal" isLazy isFitted>
					<TabList>
						<Tab fontSize="1.2rem">
							<Flex flexDir="row" align="center">
								<RiDashboardFill fontSize="20px" />
								<Text ml="1.5">DashBoard</Text>
							</Flex>
						</Tab>
						<Tab fontSize="1.2rem">
							<Flex flexDir="row" align="center">
								<GiTeacher fontSize="20px" />
								<Text ml="1.5">Lessons</Text>
							</Flex>
						</Tab>
						<Tab fontSize="1.2rem">
							<Flex flexDir="row" align="center">
								<RiBook2Line fontSize="20px" />
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
