import React, { useState, useEffect, useRef } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
	Flex,
	Text,
	useDisclosure,
	IconButton,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	Input,
	Button,
	Box,
	Textarea,
	Checkbox,
	Skeleton,
	SkeletonCircle,
	SkeletonText,
	Avatar,
	Divider,
	Image,
	useColorModeValue,
	LinkBox,
	Drawer,
	DrawerContent,
	DrawerOverlay,
	DrawerHeader,
	DrawerBody,
	SimpleGrid,
	GridItem,
	Link,
	useToast,
} from "@chakra-ui/react";
import { IoShareOutline } from "react-icons/io5";
import { FaRegComment } from "react-icons/fa";
import { HiOutlineThumbUp, HiThumbUp } from "react-icons/hi";
import { RiQuillPenFill } from "react-icons/ri";
import { IoIosClose } from "react-icons/io";

import { db, fb, firestore } from "../firebase/Config";
import { useAuth } from "../contexts/Auth";
import { formatDistance } from "date-fns";

function DashboardContents() {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { currentUser } = useAuth();
	//component state
	const [error, setError] = useState("");
	const [successMessage, setSuccessMessage] = useState("");
	const [submit, setSubmit] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [isChecked, setIsChecked] = useState(false);
	const [postItems, setPostItems] = useState([]);

	const isMounted = useRef(false);

	useEffect(() => {
		isMounted.current = true;

		db.collection("posts")
			.where("approved", "==", false)
			.orderBy("createdAt", "desc")
			.onSnapshot(function (items) {
				// get lessons content in a n array
				const fetchPostItems = [];

				items.forEach((item) => {
					const fetchItem = {
						itemID: item.id,
						...item.data(),
					};
					fetchPostItems.push(fetchItem);
				});
				if (isMounted.current) {
					// set your state here.
					// setTotalItems(fetchTaskItems.length);
					setPostItems(fetchPostItems);
					// console.log(fetchPostItems);

					//set loading to false
					setIsLoading(false);
				}
			});

		return () => {
			isMounted.current = false;
		};
	}, []);

	const closeModal = () => {
		setError("");
		setSuccessMessage("");
		onClose();
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setSubmit(true);
		setError("");
		setSuccessMessage("");
		let title = e.target.title.value;
		let link = e.target.link.value;
		let writeUp = e.target.writeUp.value;
		let image = "";

		//Checkin the length of the title to more 3 character long
		if (title.length <= 3) {
			setError("Title should be more the 3 character long!");
			setSubmit(false);
			return false;
		}

		if (isChecked === true) {
			image = e.target[4].files[0];
			//matching file type
			if (!image.name.match(/\.(png|jpeg|gif|jpg)$/)) {
				setError("Please select valid  format('.png, .jpeg, .gif or .jpg').");
				setSubmit(false);
				return false;
			}

			//Checking file is less or equal to 0
			if (image.length === 0) {
				setError("Invalid image!");
				setSubmit(false);
				return false;
			}

			// Create a root reference
			let storageRef = fb.storage().ref();

			//getting fileName from title
			const fileName = title.split(" ").join("_");

			//getting file extension
			const extension = image.name.substring(image.name.lastIndexOf(".") + 1);
			// console.log(extension);

			// Upload file and metadata to the object 'images/mountains.jpg'
			const uploadTask = storageRef
				.child("posts/" + fileName + "." + extension)
				.put(image);

			// Listen for state changes, errors, and completion of the upload.
			uploadTask.on(
				"state_changed",
				(snapshot) => {
					var progress =
						(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
					console.log("Upload is " + progress + "% done");
					// eslint-disable-next-line default-case
					switch (snapshot.state) {
						case fb.storage.TaskState.PAUSED: // or 'paused'
							console.log("Upload is paused");
							break;
						case fb.storage.TaskState.RUNNING: // or 'running'
							console.log("Upload is running");
							break;
					}
				},
				(err) => {
					//catches the errors
					console.log(err);
					setError("Error uploading file.");
					setSubmit(false);
				},
				() => {
					// gets the functions from storage refences the image storage in firebase
					uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
						db.collection("posts")
							.add({
								title: title,
								link: link,
								imageUrl: downloadURL,
								writeUp: writeUp,
								like: firestore.FieldValue.arrayUnion(),
								createdAt: firestore.Timestamp.fromDate(new Date()),
								posterName: currentUser.displayName,
								posterID: currentUser.uid,
								posterImage: currentUser.photoURL,
								approved: false,
							})
							.then((docRef) => {
								console.log("Post ID: ", docRef.id);
								setSuccessMessage("Post added successfully.");
								setSubmit(false);
								e.target.title.value = "";
								e.target.link.value = "";
								e.target.writeUp.value = "";
								e.target.image.value = "";
							})
							.catch((error) => {
								setError("Error adding post: ", error);
								setSubmit(false);
							});
					});
				},
			);
		} else {
			db.collection("posts")
				.add({
					title: title,
					link: link,
					writeUp: writeUp,
					like: firestore.FieldValue.arrayUnion(),
					createdAt: firestore.Timestamp.fromDate(new Date()),
					posterName: currentUser.displayName,
					posterID: currentUser.uid,
					posterImage: currentUser.photoURL,
					approved: false,
				})
				.then((docRef) => {
					console.log("Post ID: ", docRef.id);
					setSuccessMessage("Post added successfully.");
					setSubmit(false);
					e.target.title.value = "";
					e.target.link.value = "";
					e.target.writeUp.value = "";
				})
				.catch((error) => {
					setError("Error adding post: ", error);
					setSubmit(false);
				});
		}
	};
	return (
		<>
			{isLoading && <FeedSkeleton />}

			{!isLoading && (
				<>
					<SimpleGrid
						display={{ base: "initial", md: "grid" }}
						columns={{ md: 2 }}
						spacing={{ md: 6 }}
						width="100%"
						mt={24}
					>
						{postItems.map((item) => (
							<GridItem colSpan={{ md: 1 }} key={item.itemID}>
								<FeedCard item={item} />
							</GridItem>
						))}
					</SimpleGrid>
				</>
			)}

			{/* Floating action button to add post */}
			<IconButton
				boxShadow="dark-lg"
				onClick={onOpen}
				colorScheme="teal"
				pos="fixed"
				size="lg"
				bottom={16}
				right={8}
				icon={<RiQuillPenFill color="white" fontSize="24px" />}
				isRound
			/>
			<Modal isOpen={isOpen} size="sm">
				<ModalOverlay />
				<ModalContent>
					<form onSubmit={handleSubmit}>
						<ModalHeader align="center">What topic do you to share</ModalHeader>
						<ModalBody>
							{error && (
								<Text
									p="2"
									bg="red.100"
									textAlign="center"
									color="red"
									fontSize="md"
									my="1.5"
								>
									{error}
								</Text>
							)}

							{successMessage && (
								<Text
									p="2"
									bg="green.100"
									textAlign="center"
									color="green"
									fontSize="md"
									my="1.5"
								>
									{successMessage}
								</Text>
							)}
							<Box mb="4">
								<Text fontSize="lg">Title</Text>
								<Input
									type="text"
									name="title"
									placeholder="Enter Topic Title"
									required
								/>
							</Box>

							<Box mb="4">
								<Text fontSize="lg">Link (Optional)</Text>
								<Input
									type="text"
									name="link"
									placeholder="Add Link for further reading"
								/>
							</Box>

							<Box mb="4">
								<Text fontSize="lg">Write Up</Text>
								<Textarea
									placeholder="Your write Up goes here"
									name="writeUp"
									size="sm"
									resize="none"
									required
								/>
							</Box>

							<Checkbox
								mb="4"
								name="addImage"
								value={isChecked}
								onChange={(e) => {
									setIsChecked(e.target.checked);
								}}
							>
								Add a photo
							</Checkbox>
							{isChecked && (
								<Input
									placeholder=" Add a photo (Optional)"
									name="image"
									size="sm"
									type="file"
									mb="4"
									required
								/>
							)}
						</ModalBody>
						<ModalFooter>
							<Button
								disabled={submit}
								colorScheme="red"
								mr={3}
								onClick={closeModal}
							>
								Cancel
							</Button>
							<Button
								isLoading={submit ? true : false}
								loadingText="Subitting"
								type="submit"
								colorScheme="teal"
							>
								Submit
							</Button>
						</ModalFooter>
					</form>
				</ModalContent>
			</Modal>
		</>
	);
}

export default DashboardContents;

const FeedCard = ({ item }) => {
	const { currentUser } = useAuth();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const grayColor = useColorModeValue("gray.600", "gray.400");
	const [commentItems, setCommentItems] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [isLIked, setIsLiked] = useState(false);

	const isMounted = useRef(false);

	useEffect(() => {
		// console.log("eeeeeeeeeeeee");
		isMounted.current = true;
		db.collection("comments")
			.where("postID", "==", item.itemID)
			.orderBy("createdAt", "desc")
			.onSnapshot(function (items) {
				// get lessons content in a n array
				const fetchCommentItems = [];

				items.forEach((item) => {
					const fetchItem = {
						itemID: item.id,
						...item.data(),
					};
					fetchCommentItems.push(fetchItem);
				});

				if (isMounted.current) {
					// set your state here.
					// setTotalItems(fetchTaskItems.length);
					setCommentItems(fetchCommentItems);

					//set loading to false
					setIsLoading(false);
				}
			});

		return () => {
			isMounted.current = false;
		};
	}, [item.itemID, currentUser.uid]);

	let time = formatDistance(new Date(item.createdAt.toDate()), new Date(), {
		includeSeconds: true,
		addSuffix: true,
	});

	let uid = "";

	for (const uuid in item.like) {
		if (Object.hasOwnProperty.call(item.like, uuid)) {
			if (item.like[uuid] === currentUser.uid) uid = item.like[uuid];
			// console.log(uid);
		}
	}

	const handleLike = () => {
		setIsLiked(!isLIked);
		if (uid === currentUser.uid) {
			db.collection("posts")
				.doc(item.itemID)
				.update({
					like: firestore.FieldValue.arrayRemove(currentUser.uid),
				});
		} else {
			db.collection("posts")
				.doc(item.itemID)
				.update({
					like: firestore.FieldValue.arrayUnion(currentUser.uid),
				});
		}
	};

	return (
		<>
			<Flex
				borderRadius="8"
				flexDir="column"
				boxShadow="0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
				p="4"
				mb="4"
			>
				<LinkBox to="#" as={RouterLink} onClick={onOpen}>
					<Flex mb="1.5">
						<Avatar size="md" src={item.posterImage} />
						<Flex flexDir="column" ml="2.5">
							<Text>{item.posterName}</Text>
							<Text fontSize="sm" color={grayColor}>
								{time}
							</Text>
						</Flex>
					</Flex>
					<Text noOfLines={2}>{item.title}</Text>
					<Divider my="1.5" />
					{item.imageUrl && (
						<Image
							src={item.imageUrl}
							height="180"
							w="100%"
							mb="2.5"
							objectFit="cover"
							borderRadius="8"
						/>
					)}
				</LinkBox>
				<Flex justifyContent="space-between">
					<Flex>
						<Flex alignItems="center">
							<IconButton
								variant="ghost"
								icon={
									uid === currentUser.uid ? (
										<>
											<HiThumbUp fontSize="24px" />
											<Text ml="2">{item.like.length}</Text>
										</>
									) : (
										<>
											<HiOutlineThumbUp fontSize="24px" />
											<Text ml="2">{item.like.length}</Text>
										</>
									)
								}
								onClick={handleLike}
							/>
						</Flex>
						<Flex alignItems="center" ml="1.5rem">
							<FaRegComment fontSize="24px" />
							<Text ml="2" fontWeight="bold">
								{commentItems.length}
							</Text>
						</Flex>
					</Flex>

					<IconButton
						variant="ghost"
						icon={<IoShareOutline fontSize="24px" />}
					/>
				</Flex>
			</Flex>

			{/* Left Drawer */}
			<Drawer placement="left" isOpen={isOpen} size="full">
				<DrawerOverlay />
				<DrawerContent>
					<DrawerHeader borderBottomWidth="1px">
						<Flex flexDir="row" justifyContent="space-between" align="center">
							{item.title}
							<IconButton
								onClick={onClose}
								variant="ghost"
								icon={<IoIosClose fontSize="32px" />}
								ml="3.5"
							/>
						</Flex>
					</DrawerHeader>
					<DrawerBody w="100%">
						<FeedDetail
							like={item.like.length}
							item={item}
							isLoading={isLoading}
							comment={commentItems}
						/>
					</DrawerBody>
				</DrawerContent>
			</Drawer>
		</>
	);
};

const FeedDetail = ({ item, comment, isLoading, like }) => {
	const [isLIked, setIsLiked] = useState(false);

	// console.log(item);

	const { currentUser } = useAuth();
	const [submit, setSubmit] = useState(false);
	const toast = useToast();
	const grayColor = useColorModeValue("gray.600", "gray.400");

	let time = formatDistance(new Date(item.createdAt.toDate()), new Date(), {
		includeSeconds: true,
		addSuffix: true,
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		const comment = e.target.coment.value;

		db.collection("comments")
			.add({
				comment: comment,
				postID: item.itemID,
				createdAt: firestore.Timestamp.fromDate(new Date()),
				commenterName: currentUser.displayName,
				commenterID: currentUser.uid,
				commenterImage: currentUser.photoURL,
			})
			.then((docRef) => {
				if (currentUser.uid !== item.posterID) {
					db.collection("notifications")
						.add({
							itemID: item.itemID,
							notificationType: "comment",
							participantID: firestore.FieldValue.arrayUnion(item.posterID), //array
							type: "message",
							title: item.title,
							message: `<p >${currentUser.displayName} made the following comment:  </p>
					<p>${comment} <p>`,
							answer: "",
							uid: currentUser.uid,
							name: currentUser.displayName,
							photoURL: currentUser.photoURL,
							read: false,
							dateSent: firestore.Timestamp.fromDate(new Date()),
						})
						.catch((error) => {
							console.log(error);
						});
				}
				console.log("Document written with ID: ", docRef.id);
				toast({
					title: "Comment added.",
					status: "success",
					duration: 2000,
					isClosable: true,
				});
				setSubmit(false);
				e.target.coment.value = "";
			})
			.catch((error) => {
				console.log(error);

				toast({
					title: "Error adding error.",
					status: "error",
					duration: 2000,
					isClosable: true,
				});
				setSubmit(false);
			});
	};

	let uid = "";

	for (const uuid in item.like) {
		if (Object.hasOwnProperty.call(item.like, uuid)) {
			if (item.like[uuid] === currentUser.uid) uid = item.like[uuid];
			// console.log(uid);
		}
	}

	const handleLike = () => {
		setIsLiked(!isLIked);
		if (uid === currentUser.uid) {
			db.collection("posts")
				.doc(item.itemID)
				.update({
					like: firestore.FieldValue.arrayRemove(currentUser.uid),
				});
		} else {
			db.collection("posts")
				.doc(item.itemID)
				.update({
					like: firestore.FieldValue.arrayUnion(currentUser.uid),
				});
		}
	};

	return (
		<>
			<Flex flexDir="column">
				<Flex mb="1.5" alignItems="center" justifyContent="space-between">
					<Flex alignItems="center">
						<Avatar size="lg" src={item.posterImage} />
						<Flex flexDir="column" ml="2.5">
							<Text>{item.posterName}</Text>
							<Text fontSize="sm" color={grayColor}>
								{time}
							</Text>
						</Flex>
					</Flex>
					<IconButton
						variant="ghost"
						icon={<IoShareOutline fontSize="24px" />}
					/>
				</Flex>

				{item.imageUrl && (
					<Image src={item.imageUrl} my="2.5" objectFit="cover" />
				)}

				<Text>{item.writeUp}</Text>

				<Flex flexDir="row">
					{item.link && (
						<Flex flexDir="row" my="3.5" w="100%">
							<Text fontWeight="bold" w="25%">
								Read more:{" "}
							</Text>{" "}
							<Link href={item.link} w="74%" isExternal>
								<Text color="blue.600" noOfLines={1}>
									{item.link}
								</Text>
							</Link>
						</Flex>
					)}
				</Flex>
				<Divider my="1.5" />
				<Flex justifyContent="space-around">
					<Flex alignItems="center">
						<IconButton
							variant="ghost"
							icon={
								uid === currentUser.uid ? (
									<>
										<HiThumbUp fontSize="24px" />
										<Text ml="2">{item.like.length}</Text>
									</>
								) : (
									<>
										<HiOutlineThumbUp fontSize="24px" />
										<Text ml="2">{item.like.length}</Text>
									</>
								)
							}
							onClick={handleLike}
						/>
					</Flex>

					<IconButton
						variant="ghost"
						icon={<IoShareOutline fontSize="24px" />}
					/>
				</Flex>
				<Divider my="1.5" />

				<Flex flexDir="column" my="2.5">
					<Flex flexDir="column" mb="4">
						<Text fontSize="lg" fontWeight="bold">
							Comments ({comment.length})
						</Text>
						<form onSubmit={handleSubmit}>
							<Textarea
								placeholder="Share your thoughts"
								name="coment"
								size="sm"
								resize="none"
								required
							/>
							<Button
								colorScheme="teal"
								alignSelf="flex-start"
								my="1.5"
								type="submit"
								isLoading={submit ? true : false}
								loadingText="Subitting"
							>
								Add comment
							</Button>
						</form>
					</Flex>

					{!isLoading && (
						<>
							{comment.map((item) => (
								<div key={item.itemID}>
									<FeedComments item={item} />
								</div>
							))}
						</>
					)}
				</Flex>
			</Flex>
		</>
	);
};

const FeedComments = ({ item }) => {
	let time = formatDistance(new Date(item.createdAt.toDate()), new Date(), {
		includeSeconds: true,
		addSuffix: true,
	});

	return (
		<Flex p="2.5" bg="gray.100" borderRadius="8" mb="4">
			<LinkBox to="user/profile" as={RouterLink}>
				<Avatar size="sm" />
			</LinkBox>
			<Flex flexDir="column" ml="1.5" w="100%">
				<LinkBox to="user/profile" as={RouterLink}>
					<Text mb="1" pt="1" fontWeight="bold" color="black">
						{item.commenterName}
					</Text>
				</LinkBox>

				<Text color="black">{item.comment}</Text>

				<Text fontSize="sm" fontStyle="italic" textAlign="right" color="black">
					{time}
				</Text>
			</Flex>
		</Flex>
	);
};

const FeedSkeleton = () => {
	return (
		<>
			<Flex
				borderRadius="4"
				flexDir="column"
				boxShadow="0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
				p="2"
				mb="4"
			>
				<Flex mb="1.5">
					<SkeletonCircle size="10" />
					<Flex flexDir="column" ml="2.5">
						<SkeletonText w="40" noOfLines={1} mb="1.5" />
						<SkeletonText w="8" noOfLines={1} />
					</Flex>
				</Flex>
				<SkeletonText noOfLines={2} />
				<Skeleton height="180" my="2.5" />

				<Flex justifyContent="space-between">
					<Flex>
						<SkeletonCircle />
						<SkeletonCircle ml="2.5" />
					</Flex>

					<SkeletonCircle />
				</Flex>
			</Flex>
		</>
	);
};
