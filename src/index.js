import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme/index";

ReactDOM.render(
	<ChakraProvider theme={theme} resetCSS>
		<React.StrictMode>
			<App />
		</React.StrictMode>
	</ChakraProvider>,
	document.getElementById("root")
);
