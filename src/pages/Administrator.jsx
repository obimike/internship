import React, { useState, useEffect, useRef } from "react";
import Header from "../components/Header";
import { Link as RouterLink } from "react-router-dom";

import {
	Flex,
	Text,
	Center,
	Image,
	Tabs,
	TabList,
	TabPanels,
	Tab,
	TabPanel,
	Button,
	Avatar,
	LinkBox,
	useColorModeValue,
	Skeleton,
	SkeletonCircle,
	SkeletonText,
	Divider,
	Select,
	useToast,
} from "@chakra-ui/react";
import AccessDenial from "../assets/images/noAccess.svg";

import { BiChalkboard } from "react-icons/bi";
import {
	IoTimeOutline,
	IoVideocamOutline,
	IoPersonCircleSharp,
} from "react-icons/io5";

import { useAuth } from "../contexts/Auth";

import { db } from "../firebase/Config";

import { format, formatDistance } from "date-fns";

function Administrator() {
	const { userData } = useAuth();
	// console.log(userData);

	return (
		<Header>
			{userData.level === "Admin" ? (
				<AdminHeader />
			) : (
				<Center flexDir="column" mt={32}>
					<Image src={AccessDenial} width="640" height="320" />
					<Text textAlign="center" color="#a5a5a5">
						Sorry, you have no access to this page.
					</Text>
				</Center>
			)}
		</Header>
	);
}
export default Administrator;

const AdminHeader = () => {
	return (
		<Flex mt={24}>
			<Tabs variant="soft-rounded" colorScheme="teal" isFitted w="100%">
				<TabList>
					<Tab>Users</Tab>
					<Tab>Feeds</Tab>
					<Tab>Class</Tab>
					<Tab>Materials</Tab>
				</TabList>
				<TabPanels>
					<TabPanel>
						<Users />
					</TabPanel>
					<TabPanel>
						<Feeds />
					</TabPanel>
					<TabPanel>
						<Class />
					</TabPanel>
					<TabPanel>
						<Materials />
					</TabPanel>
				</TabPanels>
			</Tabs>
		</Flex>
	);
};

const Users = () => {
	const [loading, setLoading] = useState(false);
	const [userItems, setUserItems] = useState([]);
	const [unApprovedUser, setUnApprovedUser] = useState([]);
	const [lockedUser, setLockedUser] = useState([]);

	const isMounted = useRef(false);

	useEffect(() => {
		isMounted.current = true;

		db.collection("users")
			.orderBy("created", "desc")
			.onSnapshot(function (items) {
				const fetchUserItems = [];
				const fetchUnapprovedItems = [];
				const fetchLockedItems = [];
				items.forEach((item) => {
					const fetchItem = {
						UID: item.id,
						...item.data(),
					};
					if (fetchItem.approved === false) {
						fetchUnapprovedItems.push(fetchItem);
					} else if (fetchItem.locked === true) {
						fetchLockedItems.push(fetchItem);
					} else {
						fetchUserItems.push(fetchItem);
					}
				});
				if (isMounted.current) {
					setUnApprovedUser(fetchUnapprovedItems);
					setLockedUser(fetchLockedItems);
					setUserItems(fetchUserItems);
					//set loading to false
					setLoading(false);
				}
			});

		return () => {
			isMounted.current = false;
			setLoading(false);
		};
	}, []);

	return (
		<>
			{loading && <UserSkeleton />}
			{!loading && (
				<>
					{/* Waiting List */}
					{unApprovedUser.length !== 0 && (
						<Text
							fontSize="lg"
							color="teal"
							fontWeight="bold"
							textAlign="center"
							mb="2.5"
						>
							Waiting List
						</Text>
					)}

					{unApprovedUser.map((users) => (
						<React.Fragment key={users.UID}>
							{users.approved === false && (
								<Flex flexDir="column">
									<UserCard users={users} />
								</Flex>
							)}
						</React.Fragment>
					))}

					<Divider my="3.5" />

					{/* Locked out User */}
					{lockedUser.length !== 0 && (
						<Text
							fontSize="lg"
							color="teal"
							fontWeight="bold"
							textAlign="center"
							mb="2.5"
						>
							Locked Users
						</Text>
					)}

					{lockedUser.map((users) => (
						<React.Fragment key={users.UID}>
							{users.locked === true && (
								<Flex flexDir="column">
									<UserCard users={users} />
								</Flex>
							)}
						</React.Fragment>
					))}

					<Divider my="3.5" />

					{/* Approved Users */}
					<Text
						fontSize="lg"
						color="teal"
						fontWeight="bold"
						textAlign="center"
						mb="2.5"
					>
						Approved Users
					</Text>
					{userItems.map((users) => (
						<React.Fragment key={users.UID}>
							<UserCard users={users} />
						</React.Fragment>
					))}
				</>
			)}
		</>
	);
};

const UserCard = ({ users }) => {
	const toast = useToast();

	const handleDelete = (e) => {
		e.preventDefault();

		db.collection("users")
			.doc(users.UID)
			.delete()
			.then(() => {
				toast({
					title: `${users.displayName} has been deleted.`,
					status: "success",
					duration: 2000,
					isClosable: true,
				});
			})
			.catch((error) => {
				toast({
					title: `Error: Unable to delete ${users.displayName}.`,
					status: "error",
					duration: 2000,
					isClosable: true,
				});
			});
	};

	const handleApprove = (e) => {
		e.preventDefault();

		db.collection("users")
			.doc(users.UID)
			.update({
				approved: true,
			})
			.then(() => {
				toast({
					title: `${users.displayName} has been approved.`,
					status: "success",
					duration: 2000,
					isClosable: true,
				});
			})
			.catch((error) => {
				toast({
					title: `Error: Unable to approve ${users.displayName}.`,
					status: "error",
					duration: 2000,
					isClosable: true,
				});
			});
	};

	const handleLocked = (e) => {
		e.preventDefault();
		console.log(e.target.value);

		if (users.locked === true) {
			db.collection("users")
				.doc(users.UID)
				.update({
					locked: false,
				})
				.then(() => {
					toast({
						title: `${users.displayName} has been unlocked successfully.`,
						status: "success",
						duration: 2000,
						isClosable: true,
					});
				})
				.catch((error) => {
					toast({
						title: `Error: Unable to unlock ${users.displayName}.`,
						status: "error",
						duration: 2000,
						isClosable: true,
					});
				});
		} else {
			db.collection("users")
				.doc(users.UID)
				.update({
					locked: true,
				})
				.then(() => {
					toast({
						title: `${users.displayName} has been locked successfully.`,
						status: "success",
						duration: 2000,
						isClosable: true,
					});
				})
				.catch((error) => {
					toast({
						title: `Error: Unable to lock ${users.displayName}.`,
						status: "error",
						duration: 2000,
						isClosable: true,
					});
				});
		}
	};

	const handleLevelChange = (e) => {
		e.preventDefault();

		db.collection("users")
			.doc(users.UID)
			.update({
				level: e.target.value,
			})
			.then(() => {
				toast({
					title: `User Level Changed to ${e.target.value} .`,
					status: "success",
					duration: 2000,
					isClosable: true,
				});
			})
			.catch((error) => {
				toast({
					title: `Error: Unable to change User Level to ${e.target.value} .`,
					status: "error",
					duration: 2000,
					isClosable: true,
				});
			});
	};

	return (
		<Flex
			flexDir="column"
			borderWidth="1px"
			borderRadius="8px"
			p="2.5"
			mb="1.5"
		>
			<Flex>
				<Avatar size="xl" src={users.photoURL} />
				<Flex ml={2.5} flexDir="column" justifyContent="space-between" py="1.5">
					<Text fontWeight="bold">{users.displayName}</Text>
					<Select
						w="100px"
						my="1.5"
						value={users.level}
						onChange={handleLevelChange}
					>
						<option value="user">user</option>
						<option value="Admin">Admin</option>
					</Select>
					<Text>
						RegDate: {format(new Date(users.created.toDate()), "do, MMMM yyyy")}
					</Text>
				</Flex>
			</Flex>
			<Flex justifyContent="space-between" mt={4}>
				<Button colorScheme="red" onClick={handleDelete}>
					Delete
				</Button>
				<Button colorScheme="blue" onClick={handleLocked}>
					{users.locked === true ? "Unlock" : "Lock"}
				</Button>
				<Button
					colorScheme="green"
					onClick={handleApprove}
					disabled={users.approved === true ? true : false}
				>
					Approve
				</Button>
			</Flex>
		</Flex>
	);
};

const UserSkeleton = () => {
	return (
		<Flex
			flexDir="column"
			borderWidth="1px"
			borderRadius="8px"
			p="2.5"
			mb="1.5"
		>
			<Flex>
				<SkeletonCircle size="24" />
				<Flex ml={2.5} flexDir="column" justifyContent="space-between" py="1.5">
					<SkeletonText noOfLines={1} w="200px" />
					<SkeletonText noOfLines={1} w="100px" />
					<SkeletonText noOfLines={1} w="200px" />
				</Flex>
			</Flex>
			<Flex justifyContent="space-between" mt={4}>
				<Skeleton w="80px" borderRadius="8px" h="40px" />
				<Skeleton w="80px" borderRadius="8px" h="40px" />
				<Skeleton w="80px" borderRadius="8px" h="40px" />
			</Flex>
		</Flex>
	);
};

const Feeds = () => {
	const [loading, setLoading] = useState(false);
	const [feedItems, setFeedItems] = useState([]);
	const [unApprovedFeed, setUnApprovedFeed] = useState([]);

	const isMounted = useRef(false);

	useEffect(() => {
		isMounted.current = true;

		db.collection("posts")
			.orderBy("createdAt", "desc")
			.onSnapshot(function (items) {
				const fetchFeedItems = [];
				const fetchUnapprovedItems = [];
				items.forEach((item) => {
					const fetchItem = {
						feedID: item.id,
						...item.data(),
					};
					if (fetchItem.approved === false) {
						fetchUnapprovedItems.push(fetchItem);
						// console.log(fetchItem);
					} else {
						fetchFeedItems.push(fetchItem);
					}
				});
				if (isMounted.current) {
					setUnApprovedFeed(fetchUnapprovedItems);
					setFeedItems(fetchFeedItems);
					//set loading to false
					setLoading(false);
				}
			});

		return () => {
			isMounted.current = false;
			setLoading(false);
		};
	}, []);

	return (
		<>
			{loading && <FeedSkeleton />}
			{!loading && (
				<>
					{/* Waiting List */}
					{unApprovedFeed.length !== 0 && (
						<Text
							fontSize="lg"
							color="teal"
							fontWeight="bold"
							textAlign="center"
							mb="2.5"
						>
							Waiting List
						</Text>
					)}

					{unApprovedFeed.map((feed) => (
						<React.Fragment key={feed.feedID}>
							{feed.approved === false && (
								<Flex flexDir="column">
									<FeedCard feed={feed} />
								</Flex>
							)}
						</React.Fragment>
					))}

					<Divider my="3.5" />

					{/* Approved Users */}
					<Text
						fontSize="lg"
						color="teal"
						fontWeight="bold"
						textAlign="center"
						mb="2.5"
					>
						Approved Feeds
					</Text>
					{feedItems.map((feed) => (
						<React.Fragment key={feed.feedID}>
							<FeedCard feed={feed} />
						</React.Fragment>
					))}
				</>
			)}
		</>
	);
};

const FeedCard = ({ feed }) => {
	// console.log(feed);
	const toast = useToast();

	const handleDelete = (e) => {
		e.preventDefault();

		db.collection("posts")
			.doc(feed.feedID)
			.delete()
			.then(() => {
				toast({
					title: `feed has been deleted.`,
					status: "success",
					duration: 2000,
					isClosable: true,
				});
			})
			.catch((error) => {
				toast({
					title: `Error: Unable to delete feed.`,
					status: "error",
					duration: 2000,
					isClosable: true,
				});
			});
	};

	const handleApprove = (e) => {
		e.preventDefault();

		console.log(feed.feedID);

		db.collection("posts")
			.doc(feed.feedID)
			.update({
				approved: true,
			})
			.then(() => {
				toast({
					title: `Feed has been approved.`,
					status: "success",
					duration: 2000,
					isClosable: true,
				});
			})
			.catch((error) => {
				toast({
					title: `Error: Unable to approve feed.`,
					status: "error",
					duration: 2000,
					isClosable: true,
				});
			});
	};

	const time = formatDistance(new Date(feed.createdAt.toDate()), new Date(), {
		includeSeconds: true,
		addSuffix: true,
	});

	return (
		<Flex
			borderRadius="8"
			flexDir="column"
			boxShadow="0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
			p="4"
			mb="4"
		>
			<Flex mb="1.5">
				<Avatar size="md" src="item.posterImage" />
				<Flex flexDir="column" ml="2.5">
					<Text>{feed.posterName}</Text>
					<Text fontSize="sm" color="{grayColor}">
						{time}
					</Text>
				</Flex>
			</Flex>
			<Text noOfLines={2}>{feed.title}</Text>
			<Divider my="1.5" />
			{feed.imageUrl && (
				<Image
					src={feed.imageUrl}
					height="180"
					w="100%"
					mb="2.5"
					objectFit="cover"
					borderRadius="8"
				/>
			)}
			<Flex justifyContent="space-between" mt={4}>
				<Button colorScheme="red" onClick={handleDelete}>
					Delete
				</Button>
				<Button colorScheme="green" onClick={handleApprove}>
					Approve
				</Button>
			</Flex>
		</Flex>
	);
};

const FeedSkeleton = () => {
	return (
		<Flex
			borderRadius="8"
			flexDir="column"
			boxShadow="0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
			p="4"
			mb="4"
		>
			{/* <LinkBox to="#" onClick={onOpen}> */}
			<Flex mb="1.5">
				<SkeletonCircle size="12" />
				<Flex flexDir="column" ml="2.5" py="2.5">
					<SkeletonText noOfLines={1} w="100px" />
					<SkeletonText noOfLines={1} w="100px" mt="1.5" />
				</Flex>
			</Flex>
			<SkeletonText noOfLines={2} my="1.5" />

			<Skeleton height="180" w="100%" />

			<Flex justifyContent="space-between" mt={4}>
				<Skeleton w="80px" borderRadius="8px" h="40px" />
				<Skeleton w="80px" borderRadius="8px" h="40px" />
			</Flex>
		</Flex>
	);
};

const Class = () => {
	const [loading, setLoading] = useState(false);
	const [lessonItems, setLessonItems] = useState([]);
	const [unApprovedLesson, setUnApprovedLesson] = useState([]);

	const isMounted = useRef(false);

	useEffect(() => {
		isMounted.current = true;

		db.collection("lessons")
			.orderBy("createdAt", "desc")
			.onSnapshot(function (items) {
				const fetchLessonItems = [];
				const fetchUnapprovedItems = [];
				items.forEach((item) => {
					const fetchItem = {
						lessonID: item.id,
						...item.data(),
					};
					if (fetchItem.approved === false) {
						fetchUnapprovedItems.push(fetchItem);
						// console.log(fetchItem);
					} else {
						fetchLessonItems.push(fetchItem);
					}
				});
				if (isMounted.current) {
					setUnApprovedLesson(fetchUnapprovedItems);
					setLessonItems(fetchLessonItems);
					//set loading to false
					setLoading(false);
				}
			});

		return () => {
			isMounted.current = false;
			setLoading(false);
		};
	}, []);

	return (
		<>
			{loading && <ClassSkeleton />}
			{!loading && (
				<>
					{/* Waiting List */}
					{unApprovedLesson.length !== 0 && (
						<Text
							fontSize="lg"
							color="teal"
							fontWeight="bold"
							textAlign="center"
							mb="2.5"
						>
							Waiting List
						</Text>
					)}

					{unApprovedLesson.map((lesson) => (
						<React.Fragment key={lesson.lessonID}>
							{lesson.approved === false && (
								<Flex flexDir="column">
									<ClassCard lesson={lesson} />
								</Flex>
							)}
						</React.Fragment>
					))}

					<Divider my="3.5" />

					{/* Approved Users */}
					<Text
						fontSize="lg"
						color="teal"
						fontWeight="bold"
						textAlign="center"
						mb="2.5"
					>
						Approved Feeds
					</Text>
					{lessonItems.map((lesson) => (
						<React.Fragment key={lesson.lessonID}>
							<ClassCard lesson={lesson} />
						</React.Fragment>
					))}
				</>
			)}
		</>
	);
};

const ClassCard = ({ lesson }) => {
	const grayColor = useColorModeValue("gray.600", "gray.400");
	const toast = useToast();

	let type = "";
	if (lesson.classType === "Video") {
		type = <IoVideocamOutline fontSize="1.2em" color="black" />;
	} else {
		type = <BiChalkboard fontSize="1.2em" color="black" />;
	}

	//getting the first name from user
	let firstName = lesson.uploaderName.split(" ");
	firstName = firstName[firstName.length - 1];

	//formatting time
	let to = tConvert(lesson.timeTo);
	let from = tConvert(lesson.timeFrom);

	function tConvert(time) {
		// Check correct time format and split into components
		time = time
			.toString()
			.match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

		if (time.length > 1) {
			// If time format correct
			time = time.slice(1); // Remove full string match value
			time[5] = +time[0] < 12 ? "am" : "pm"; // Set AM/PM
			time[0] = +time[0] % 12 || 12; // Adjust hours
		}
		return time.join(""); // return adjusted time or original string
	}

	const handleDelete = (e) => {
		e.preventDefault();

		db.collection("lessons")
			.doc(lesson.lessonID)
			.delete()
			.then(() => {
				toast({
					title: `Lesson has been deleted.`,
					status: "success",
					duration: 2000,
					isClosable: true,
				});
			})
			.catch((error) => {
				toast({
					title: `Error: Unable to Lesson feed.`,
					status: "error",
					duration: 2000,
					isClosable: true,
				});
			});
	};

	const handleApprove = (e) => {
		e.preventDefault();

		console.log(lesson.feedID);

		db.collection("lessons")
			.doc(lesson.lessonID)
			.update({
				approved: true,
			})
			.then(() => {
				toast({
					title: `Feed has been approved.`,
					status: "success",
					duration: 2000,
					isClosable: true,
				});
			})
			.catch((error) => {
				toast({
					title: `Error: Unable to approve feed.`,
					status: "error",
					duration: 2000,
					isClosable: true,
				});
			});
	};

	return (
		<Flex
			flexDir="column"
			borderRadius="4"
			borderColor={grayColor}
			p="2"
			mb="3.5"
			w="100%"
			boxShadow="0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
		>
			<Flex flexDir="column" p="2">
				<Flex as="button">
					<Flex
						className="lessonIcon"
						flexDir="column"
						bg="teal.100"
						borderRadius="4"
						alignItems="center"
						justifyContent="center"
						p="1.5"
						w="30%"
						h="3.0rem"
					>
						{type}
						<Text fontSize="0.5em" fontWeight="black" color="black">
							{lesson.classType} Class
						</Text>
					</Flex>
					<Flex
						ml="1.5"
						flexDir="column"
						justifyContent="space-between"
						w="78%"
						h="3.0rem"
					>
						<Text textAlign="start" isTruncated>
							{lesson.title}
						</Text>
						<Flex flexDir="row" justifyContent="space-between">
							<Flex alignItems="center">
								<IoPersonCircleSharp color={grayColor} />
								<Text color={grayColor} fontSize="xs" ml="0.5">
									{firstName}
								</Text>
							</Flex>
							<Flex alignItems="center">
								<IoTimeOutline color={grayColor} />
								<Text color={grayColor} fontSize="xs" ml="0.5">
									{from} - {to}
								</Text>
							</Flex>
						</Flex>
					</Flex>
				</Flex>
			</Flex>

			<Flex mt={4} justifyContent="flex-end">
				<Button mr="2.5" colorScheme="red" onClick={handleDelete}>
					Delete
				</Button>
				<Button colorScheme="green" onClick={handleApprove}>
					Approve
				</Button>
			</Flex>
		</Flex>
	);
};

const ClassSkeleton = () => {
	const grayColor = useColorModeValue("gray.600", "gray.400");

	return (
		<Flex
			flexDir="column"
			borderRadius="4"
			borderColor={grayColor}
			p="2"
			mb="3.5"
			w="100%"
			boxShadow="0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
		>
			<LinkBox to="#" as={RouterLink}>
				<Flex flexDir="column" p="2">
					<Flex as="button">
						<Flex
							className="lessonIcon"
							flexDir="column"
							borderRadius="4"
							alignItems="center"
							justifyContent="center"
							p="1.5"
							w="20%"
							h="3.0rem"
						>
							<Skeleton w="60px" borderRadius="8px" height="80px" />
						</Flex>
						<Flex
							ml="2.5"
							flexDir="column"
							justifyContent="space-between"
							w="78%"
							h="3.0rem"
						>
							<SkeletonText noOfLines={1} w="200px" />
							<Flex flexDir="row" justifyContent="space-between">
								<Flex alignItems="center">
									<SkeletonCircle size="5" />
									<SkeletonText noOfLines={1} w="100px" />
								</Flex>
								<Flex alignItems="center">
									<SkeletonCircle size="5" />
									<SkeletonText noOfLines={1} w="50px" />
								</Flex>
							</Flex>
						</Flex>
					</Flex>
				</Flex>
			</LinkBox>
			<Flex mt={4} justifyContent="flex-end">
				<Skeleton w="80px" borderRadius="8px" h="40px" mr="2.5" />
				<Skeleton w="80px" borderRadius="8px" h="40px" />
			</Flex>
		</Flex>
	);
};

const Materials = () => {
	const grayColor = useColorModeValue("gray.600", "gray.400");
	return (
		<Flex flexDir="column" borderY="1px" p="2">
			<LinkBox to="#" as={RouterLink}>
				<Flex
					flexDir="row"
					p="1"
					justifyContent="space-between"
					alignItems="center"
					mb="1.5"
				>
					<Flex flexDir="row" alignItems="center">
						<Flex bg="" p="2" m="2" borderRadius="4">
							<Text fontSize="xl" color={grayColor}>
								JS
							</Text>
						</Flex>
						<Flex flexDir="column" justifyContent="space-between">
							<Text fontSize="lg">Fundamentals in Javascript</Text>
						</Flex>
					</Flex>
				</Flex>
			</LinkBox>
			<Flex mt={4} justifyContent="flex-end">
				<Button mr="2.5" colorScheme="red">
					Delete
				</Button>
				<Button colorScheme="green">Approve</Button>
			</Flex>
		</Flex>
	);
};

const MaterialSkeleton = () => {
	return (
		<Flex flexDir="column" borderY="1px" p="2">
			<LinkBox to="#" as={RouterLink}>
				<Flex
					flexDir="row"
					p="1"
					justifyContent="space-between"
					alignItems="center"
					mb="1.5"
				>
					<Flex flexDir="row" alignItems="center">
						<Flex bg="" p="2" m="2" borderRadius="4">
							<Skeleton w="50px" borderRadius="8px" h="40px" />
						</Flex>
						<Flex flexDir="column" justifyContent="space-between">
							<SkeletonText noOfLines={2} w="200px" />
						</Flex>
					</Flex>
				</Flex>
			</LinkBox>
			<Flex mt={4} justifyContent="flex-end">
				<Skeleton w="80px" borderRadius="8px" h="40px" mr="2.5" />
				<Skeleton w="80px" borderRadius="8px" h="40px" />
			</Flex>
		</Flex>
	);
};
