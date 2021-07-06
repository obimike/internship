import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import  Auth  from "./contexts/Auth";

//Import Pages
import SignIn from "./pages/Signin";
import SignUp from "./pages/Signup";
import Profile from "./pages/Profile";

function App() {
	return (
		<Router>
			<Auth>
				<Switch>
					<Route path="/" exact component={SignIn} />
					<Route path="/signin" exact component={SignIn} />
					<Route path="/signup" exact component={SignUp} />
					<Route path="/profile" exact component={Profile} />

					<Route path="*" component={SignIn} />
				</Switch>
			</Auth>
		</Router>
	);
}

export default App;
