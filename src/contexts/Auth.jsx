import React, { useContext, useState, useEffect, useRef } from "react";
import { auth, auth_, db, firestore } from "../firebase/Config";
import { format } from "date-fns";

const AuthContext = React.createContext();

export default function Auth({ children }) {
	const [currentUser, setCurrentUser] = useState();
	const [loading, setLoading] = useState(true);
	const [isVerifiedEmail, setVerifiedEmail] = useState(false);
	const [newNotifications, setNewNotifications] = useState(0);
	const [loadingCards, setLoadingCards] = useState(true);
	const [selectDate, setSelectdate] = useState(
		format(new Date(), "yyyy-MM-dd"),
	);

	const isMounted = useRef(false); // note mutable flag

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
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
				setLoading(false);
				// setIsLogged(true);
				setVerifiedEmail(user.emailVerified);
				// console.log(user.uid);
			} else {
				setCurrentUser(null);
				setLoading(false);
				console.log("User = " + user);
			}
		});
		return unsubscribe;
	}, []);

	// Will be passed down to Signup, Login and Dashboard components
	const values = {
		currentUser,
		setCurrentUser,
		isVerifiedEmail,
		setVerifiedEmail,
		loadingCards,
		setLoadingCards,
		newNotifications,
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

		// Add user to database
		db.collection("Users")
			.doc(user.uid)
			.set({
				uid: user.uid,
				displayName: user.displayName,
				email: user.email,
				photoURL: user.photoURL,
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

export function useAuth() {
	return useContext(AuthContext);
}

export const signOut = () => {
	auth.signOut();
	// console.log("Log Out");
};
