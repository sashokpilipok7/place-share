import React from "react";
import ReactDOM from "react-dom";
import { config } from "dotenv";

import "./index.css";
import App from "./App";

config();

ReactDOM.render(<App />, document.getElementById("root"));
