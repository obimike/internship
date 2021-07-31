import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import Header from "../components/Header";
import {
	Text,
	SimpleGrid,
	Flex,
	GridItem,
	Image,
	Heading,
	Button,
	Box,
	VStack,
	Textarea,
	Select,
	Link,
	Input,
	Modal,
	ModalOverlay,
	ModalBody,
	ModalContent,
	ModalFooter,
	useColorModeValue,
} from "@chakra-ui/react";
import { FiUpload } from "react-icons/fi";
import { MdKeyboardArrowRight } from "react-icons/md";
import { format } from "date-fns";

import { useAuth } from "../contexts/Auth";
import { db, fb } from "../firebase/Config";

import { FaUserCircle } from "react-icons/fa";


function EditProfile() {
	const { currentUser,  userData } = useAuth();
	// Initialization

	const [error, setError] = useState("");
	const [successMessage, setSuccessMessage] = useState("");
	const [submit, setSubmit] = useState(false);

	const [imageAsUrl, setImageAsUrl] = useState("");
	const [imageAsFile, setImageAsFile] = useState("");
	const [openImageDialog, setOpenImageDialog] = useState(false);

	// Setting form state
	const [firstName, setFirstName] = useState(userData.firstName);
	const [lastName, setLastName] = useState(userData.lastName);
	const [phone, setPhone] = useState(userData.phone);
	const [dob, setDOB] = useState(format(new Date(userData.dob), "yyyy-MM-dd"));
	const [school, setSchool] = useState(userData.school);
	const [type, setType] = useState(userData.type);
	const [startDate, setStartDate] = useState(
		format(new Date(userData.startDate), "yyyy-MM-dd"),
	);
	const [endDate, setEndDate] = useState(
		format(new Date(userData.endDate), "yyyy-MM-dd"),
	);
	const [supervisor, setSupervisor] = useState(userData.supervisor);
	const [aboutMe, setAboutMe] = useState(userData.aboutMe);
	const [website, setWebsite] = useState(userData.website);
	const [twitter, setTwitter] = useState(userData.twitter);
	const [facebook, setFacebook] = useState(userData.facebook);
	const [instagram, setInstagram] = useState(userData.instagram);
	const [linkedin, setLinkedin] = useState(userData.linkedin);

	// console.log(currentUser);

	const handleUpdateProfile = (e) => {
		e.preventDefault();
		// let firstName = e.target.firstName.value;
		// let lastName = e.target.lastName.value;
		// let phone = e.target.phone.value;
		// let dob = e.target.dob.value;
		// let aboutMe = e.target.aboutMe.value;
		// let school = e.target.school.value;
		// let type = e.target.type.value;
		// let startDate = e.target.startDate.value;
		// let endDate = e.target.endDate.value;
		// let supervisor = e.target.supervisor.value;
		// let website = e.target.website.value;
		// let twitter = e.target.twitter.value;
		// let facebook = e.target.facebook.value;
		// let instagram = e.target.instagram.value;
		// let linkedin = e.target.linkedin.value;

		db.collection("users")
			.doc(currentUser.uid)
			.update({
				firstName: firstName,
				lastName: lastName,
				phone: phone,
				dob: dob,
				aboutMe: aboutMe,
				school: school,
				type: type,
				startDate: startDate,
				endDate: endDate,
				supervisor: supervisor,
				website: website,
				twitter: twitter,
				facebook: facebook,
				instagram: instagram,
				linkedin: linkedin,
			})
			.then(() => {
				//updating User name in google
				console.log("Added to data base");
				currentUser
					.updateProfile({
						displayName: lastName + " " + firstName,
						phoneNumber: phone,
					})
					.then(() => {
						setSuccessMessage("Profile updated successfully.");
						setSubmit(false);
					})
					.catch((error) => {
						console.log("Added to data base: " + error);
						setSubmit(false);
					});
			})
			.catch((error) => {
				setError("Error Updating profile: ", error);
				setSubmit(false);
			});

		// console.log(linkedin);
	};

	const handleUpload = (e) => {
		e.preventDefault();
		setError("");
		setImageAsUrl("");
		setImageAsFile("");

		console.log(e.target.files[0].size);
		const image = e.target.files[0];

		if (!image.name.match(/\.(png|jpeg|gif|jpg)$/)) {
			setError("Please select valid  format('.png, .jpeg, .gif or .jpg').");
			return false;
		}

		//Checking file is less or equal to 0
		if (image.length === 0) {
			setError("Invalid image!");
			return false;
		}

		setImageAsFile(image);

		const reader = new FileReader();
		reader.onload = (e) => {
			setImageAsUrl(e.target.result);
			// console.log(e.target.result);
		};
		reader.readAsDataURL(image);

		setOpenImageDialog(true);

		// console.log(fileName);
	};

	const handleFireBaseUpload = async () => {
		if (imageAsFile === "") {
			setError(`not an image, the image file is a ${typeof imageAsFile}`);
		} else {
			setSubmit(true);
			// Create a root reference
			let storageRef = fb.storage().ref();

			//getting fileName from title
			const fileName = currentUser.uid;

			//getting file extension
			const extension = imageAsFile.name.substring(
				imageAsFile.name.lastIndexOf(".") + 1,
			);
			// console.log(extension);

			//Compressing Image and resizing
			// const compressedImage = await resizeImageFn(imageAsFile);

			// console.log(compressedImage);

			// Upload file and metadata to the object 'images/mountains.jpg'
			const uploadTask = storageRef
				.child("profile/" + fileName + "." + extension)
				.put(imageAsFile);

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
					setError("Error uploading profile image.");
					setOpenImageDialog(false);
					setSubmit(false);
				},
				() => {
					// gets the functions from storage refences the image storage in firebase
					uploadTask.snapshot.ref
						.getDownloadURL()
						.then(function (downloadURL) {
							db.collection("users")
								.doc(currentUser.uid)
								.update({ photoURL: downloadURL });

							currentUser.updateProfile({
								photoURL: downloadURL,
							})
							setSuccessMessage("Profile image updated.");
							setSubmit(false);
							setOpenImageDialog(false);
						})
						.catch(() => {
							setError("Error updating image ");
							setSubmit(false);
							setOpenImageDialog(false);
						});
				},
			);
		}
	};

	// async function resizeImageFn(file) {
	// 	const resizedImage = await compress.compress([file], {
	// 		size: 4, // the max size in MB, defaults to 2MB
	// 		quality: 1, // the quality of the image, max is 1,
	// 		maxWidth: 300, // the max width of the output image, defaults to 1920px
	// 		maxHeight: 300, // the max height of the output image, defaults to 1920px
	// 		resize: true, // defaults to true, set false if you do not want to resize the image width and height
	// 	});

	// 	console.log(resizedImage);
	// 	const img = resizedImage[0];
	// 	const base64str = img.data;
	// 	const imgExt = img.ext;
	// 	const resizedFiile = Compress.convertBase64ToFile(base64str, imgExt);
	// 	console.log(resizedFiile.size);
	// 	return resizedFiile;
	// }

	return (
		<Header>
			<>
				<SimpleGrid
					display={{ base: "initial", md: "grid" }}
					columns={{ md: 2 }}
					spacing={{ md: 6 }}
					width="100%"
					mt={20}
				>
					<GridItem colSpan={3} mb={5}>
						<Flex alignItems="center" flexDir="row" align="flex-start">
							<Text fontSize="xl" mr={1.5} fontWeight="bold">
								<Link as={RouterLink} to="/profile" _hover={{ color: "teal" }}>
									Profile
								</Link>
							</Text>
							<MdKeyboardArrowRight fontSize="1.5em" />
							<Text fontSize="xl" ml={1.5} fontWeight="bold">
								Edit Profile
							</Text>
						</Flex>
					</GridItem>
					<GridItem colSpan={{ md: 1 }}>
						<Box px={[4, 0]}>
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
							<form onSubmit={handleUpdateProfile}>
								<Flex flexDir="column">
									<Box mb="4">
										<Text fontSize="lg">First Name</Text>
										<Input
											type="text"
											name="firstName"
											placeholder="Angelina"
											value={firstName}
											onChange={(e) => setFirstName(e.target.value)}
											required
										/>
									</Box>
									<Box mb="4">
										<Text fontSize="lg">Last Name</Text>
										<Input
											type="text"
											name="lastName"
											placeholder="Jolie"
											value={lastName}
											onChange={(e) => setLastName(e.target.value)}
											required
										/>
									</Box>
									<Box mb="4">
										<Text fontSize="lg">Email</Text>
										<Input
											type="email"
											name="email"
											placeholder="ajolie@hollywood.com"
											disabled={true}
										/>
									</Box>
									<Box mb="4">
										<Text fontSize="lg">Phone</Text>
										<Input
											type="phone"
											name="phone"
											placeholder="09000000000"
											value={phone}
											onChange={(e) => setPhone(e.target.value)}
											required
										/>
									</Box>
									<Box mb="4">
										<Text fontSize="lg">Date of Birth</Text>
										<Input
											type="date"
											name="dob"
											value={dob}
											onChange={(e) => setDOB(e.target.value)}
											required
										/>
									</Box>
									<Box mb="4">
										<Text fontSize="lg">School</Text>
										<Input
											type="text"
											name="school"
											placeholder="New York University (NYU)"
											value={school}
											onChange={(e) => setSchool(e.target.value)}
											required
										/>
									</Box>

									<Box mb="4">
										<Text fontSize="lg">Internship Type</Text>
										<Select
											name="type"
											value={type}
											onChange={(e) => setType(e.target.value)}
											required
										>
											<option value="Industrial Attachment">
												Industrial Attachment
											</option>
											<option value="Youth Service Corp">
												Youth Service Corp
											</option>
											<option value="Intern">Intern</option>
										</Select>
									</Box>
									<Box mb="4">
										<Text fontSize="lg">Intership Duration</Text>
										<Flex justifyContent="space-between" mt="2">
											<Box w="47%">
												<Text fontSize="md">Start Date</Text>
												<Input
													type="date"
													name="startDate"
													value={startDate}
													onChange={(e) => setStartDate(e.target.value)}
													required
												/>
											</Box>
											<Box w="47%">
												<Text fontSize="md">End Date</Text>
												<Input
													type="date"
													name="endDate"
													value={endDate}
													onChange={(e) => setEndDate(e.target.value)}
													required
												/>
											</Box>
										</Flex>
									</Box>

									<Box mb="4">
										<Text fontSize="lg">Your Supervisor's Name</Text>
										<Input
											type="text"
											name="supervisor"
											placeholder="Seun Abolarin"
											value={supervisor}
											onChange={(e) => setSupervisor(e.target.value)}
											required
										/>
									</Box>
									<Box mb="4">
										<Text fontSize="lg">Your personnal website</Text>
										<Input
											type="text"
											name="website"
											placeholder="http://angelinajolie.com"
											value={website}
											onChange={(e) => setWebsite(e.target.value)}
										/>
									</Box>
									<Box mb="4">
										<Text fontSize="lg">Twitter</Text>
										<Input
											type="phone"
											name="twitter"
											placeholder="http://twitter.com/ajolie"
											value={twitter}
											onChange={(e) => setTwitter(e.target.value)}
										/>
									</Box>
									<Box mb="4">
										<Text fontSize="lg">Facebook</Text>
										<Input
											type="text"
											name="facebook"
											placeholder="https://web.facebook.com/ajolie"
											value={facebook}
											onChange={(e) => setFacebook(e.target.value)}
										/>
									</Box>
									<Box mb="4">
										<Text fontSize="lg">Instagram</Text>
										<Input
											type="text"
											name="instagram"
											placeholder="https://web.instagram.com/ajolie"
											value={instagram}
											onChange={(e) => setInstagram(e.target.value)}
										/>
									</Box>
									<Box mb="4">
										<Text fontSize="lg">LinkedIn</Text>
										<Input
											type="text"
											name="linkedin"
											placeholder="https://web.linkedlin.com/"
											value={linkedin}
											onChange={(e) => setLinkedin(e.target.value)}
										/>
									</Box>
									<Box mb="4">
										<Text fontSize="lg">About Me</Text>
										<Textarea
											name="aboutMe"
											placeholder="About Me"
											size="sm"
											resize="none"
											value={aboutMe}
											onChange={(e) => setAboutMe(e.target.value)}
											required
										/>
									</Box>
									<Button
										type="submit"
										isLoading={submit ? true : false}
										loadingText="Updatiing profile"
										colorScheme="teal"
									>
										Update Profile
									</Button>
								</Flex>
							</form>
						</Box>
					</GridItem>
					<GridItem mt={[5, null, 0]} colSpan={{ md: 1 }}>
						<VStack>
							<Heading as="h2" fontSize="2xl" mb="1.5">
								Profile Image
							</Heading>
							<Box>
								<Image
									w="280px"
									h="280px"
									borderRadius="50%"
									pos="relative"
									src={currentUser.photoURL}
									fallback={
										<FaUserCircle
											fontSize="280px"
											color={useColorModeValue("#a5a5a5", "#d5d5d5")}
										/>
									}
								/>

								<label
									// for="upload"
									style={{ position: "relative", bottom: 48 }}
								>
									<Flex
										alignItems="center"
										w="6rem"
										bottom="200"
										style={{
											cursor: "pointer",
											paddingLeft: "16px",
											paddingRight: "16px",
											paddingTop: "8px",
											paddingBottom: "8px",
											backgroundColor: "teal",
											borderRadius: "8px",
										}}
									>
										<FiUpload color="#fff" />
										<Text ml="1" color="#fff" fontSize="sm">
											upload
										</Text>
									</Flex>
									<Input
										type="file"
										id="upload"
										style={{
											display: "none",
											overflow: "hidden",
										}}
										onChange={(e) => {
											handleUpload(e);
										}}
									/>
								</label>
							</Box>
							<Modal isOpen={openImageDialog} size="sm">
								<ModalOverlay />
								<ModalContent>
									<ModalBody mt="2.5">
										<Image src={imageAsUrl} width="auto" height="auto" />
									</ModalBody>

									<ModalFooter>
										<Button
											disabled={submit}
											colorScheme="red"
											mr={3}
											onClick={() => setOpenImageDialog(false)}
										>
											Cancel
										</Button>
										<Button
											isLoading={submit ? true : false}
											loadingText="Uploading..."
											onClick={handleFireBaseUpload}
											colorScheme="teal"
										>
											Upload
										</Button>
									</ModalFooter>
								</ModalContent>
							</Modal>
						</VStack>
					</GridItem>
				</SimpleGrid>
			</>
		</Header>
	);
}

export default EditProfile;
