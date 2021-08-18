import React, { useContext, useState, useEffect, useRef } from "react";
import { auth, auth_, db, firestore } from "../firebase/Config";
import { format } from "date-fns";

const AuthContext = React.createContext();

export default function Auth({ children }) {
	const [currentUser, setCurrentUser] = useState();
	const [userData, setUserData] = useState({});
	const [loading, setLoading] = useState(true);
	const [isVerifiedEmail, setVerifiedEmail] = useState(false);
	const [newNotifications, setNewNotifications] = useState(0);
	const [newMessages, setNewMessages] = useState(0);
	const [loadingCards, setLoadingCards] = useState(true);
	const [selectDate, setSelectdate] = useState(
		format(new Date(), "yyyy-MM-dd"),
	);
	const [quote, setQuote] = useState("");

	const isMounted = useRef(false); // note mutable flag

	const setuser = (user) => {
		setUserData(user);
	};

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			fetch("http://quotes.rest/qod")
				.then((response) => response.json())
				.then((data) => {
					setQuote(data.contents.quotes[0].quote);
				});
			
			if (user) {
				//fetch new notifications
				db.collection("notifications")
					.where("participantID", "array-contains", user.uid)
					.where("read", "==", false)
					.onSnapshot(function (querySnapshot) {
						setNewNotifications(querySnapshot.size);
						if (isMounted.current) {
						}
					});

				setCurrentUser(user);
				setVerifiedEmail(user.emailVerified);
				// console.log(user);

				//Fetch User data
				db.collection("users")
					.doc(user.uid)
					.get()
					.then((doc) => {
						if (doc.exists) {
							setuser(doc.data());
							setLoading(false);
						} else {
							setLoading(false);
							console.log("No such user in firestore!");
						}
					});

				//Fetch Number Messages
				db.collection("messages")
					.where("receiverID", "==", user.uid)
					.where("read", "==", false)
					.onSnapshot(function (querySnapshot) {
						setNewMessages(querySnapshot.size);
					});
			} else {
				setCurrentUser(null);
				setLoading(false);
				console.log("User = " + user);
			}
		});
		return unsubscribe;
	}, []);

	// Will be passed down to Sign up, Login and Dashboard components
	const values = {
		quote,
		currentUser,
		setCurrentUser,
		userData,
		isVerifiedEmail,
		setVerifiedEmail,
		loadingCards,
		setLoadingCards,
		newNotifications,
		newMessages,
		selectDate,
		setSelectdate,
	};

	return (
		<AuthContext.Provider value={values}>
			{!loading && children}
		</AuthContext.Provider>
	);
}

export const googleSign = () => {
	// Using a popup.
	var provider = new auth_.GoogleAuthProvider();
	provider.addScope("profile");
	provider.addScope("email");

	return auth.signInWithPopup(provider).then((result) => {
		// The signed-in user info.
		var user = result.user;

		// //getting the lastName from user
		let lastName = user.displayName.split(" ");
		lastName = lastName[lastName.length - 1];

		// //getting the firstName from user
		let firstName = user.displayName.split(" ");
		firstName = firstName[0];

		// Add user to database
		db.collection("users")
			.doc(user.uid)
			.set({
				uid: user.uid,
				displayName: user.displayName,
				firstName,
				lastName,
				email: user.email,
				photoURL: user.photoURL,
				level: "user",
				approved: false,
				created: firestore.Timestamp.fromDate(new Date()),
			})
			.then(function () {
				console.log("User Created with ID : " + user.uid);
			})
			.catch(function (error) {
				console.log("Error adding user: " + error);
			});
	});
};

export const emailSignUp = (values, setSignUpError, setSubmit, history) => {
	setSubmit(true);
	const _firstName = values.firstName;
	const _lastName = values.lastName;

	return auth
		.createUserWithEmailAndPassword(values.email, values.password)
		.then((response) => {
			const user = response.user;

			AddUser(user, setSubmit, _firstName, _lastName, values.email, history);

			user
				.updateProfile({
					displayName: _lastName + " " + _firstName,
				})
				.then(() => {
					console.log("Updated DisplayName in google");
				});
		})
		.catch((err) => {
			setSubmit(false);
			console.log("err.message");
			console.log(err.message);
			console.log(err.code);
			switch (err.code) {
				case "auth/email-already-in-use":
					setSignUpError("Email address is already in use.");
					break;

				case "auth/network-request-failed":
					setSignUpError("Network error. Check connection and try again.");
					break;

				default:
					setSignUpError("An error has occurred during sign up.");
					break;
			}
		});
};

const AddUser = (user, setSubmit, _firstName, _lastName, email, history) => {
	console.log("User  ===== " + user.uid);
	db.collection("users")
		.doc(user.uid)
		.set({
			uid: user.uid,
			firstName: _firstName,
			lastName: _lastName,
			email: user.email,
			displayName: _lastName + " " + _firstName,
			photoURL: user.photoURL,
			level: "user",
			approved: false,
			created: firestore.Timestamp.fromDate(new Date()),
		})
		.then(() => {
			console.log("User Created with ID : " + user.uid);
			//SendEmailVerification
			user
				.sendEmailVerification()
				.then(function () {
					window.localStorage.setItem("sendEmailVerification", email);
					auth.signOut();
					console.log("Email Sent!");
					history.push({
						pathname: "/email_confirmation",
						state: { email: email },
					});
				})
				.catch(function () {});
		})
		.catch((error) => {
			console.log("Error adding user: " + error);
			setSubmit(false);
		});
};

export function useAuth() {
	return useContext(AuthContext);
}

export const signOut = () => {
	auth.signOut();
};
