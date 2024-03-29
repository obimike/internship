import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Auth from "./contexts/Auth";

//Import Pages
import SignIn from "./pages/Signin";
import SignUp from "./pages/Signup";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import DashBoard from "./pages/Dashboard";
import Inbox from "./pages/Inbox";
import EmailConfirmation from "./pages/EmailConfirmation";
import UserProfile from "./pages/UserProfile";
import Administrator from "./pages/Administrator";
import Splash from "./pages/Splash";
import ForgetPassword from "./pages/ForgetPassword";
import LandingPage from "./pages/LandingPage";

function App() {
	return (
		<Auth>
			<Router>
				<Switch>
					<Route path="/" exact component={Splash} />
					<Route path="/home" exact component={LandingPage} />
					<Route path="/signin" exact component={SignIn} />
					<Route path="/signup" exact component={SignUp} />
					<Route path="/forget_password" exact component={ForgetPassword} />
					<Route
						path="/email_confirmation"
						exact
						component={EmailConfirmation}
					/>
					<Route path="/profile" exact component={Profile} />
					<Route path="/user/profile/:pid" exact component={UserProfile} />
					<Route path="/edit_profile" exact component={EditProfile} />
					<Route path="/dashboard" exact component={DashBoard} />
					<Route path="/admin" exact component={Administrator} />
					<Route path="/inbox" exact component={Inbox} />

					<Route path="*" component={LandingPage} />
				</Switch>
			</Router>
		</Auth>
	);
}

export default App;
