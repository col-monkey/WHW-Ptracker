import React from "react";
import ReactDOM from "react-dom/client";
import "./storageShim.js";
import WHWTracker from "./WHWTracker.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <WHWTracker />
  </React.StrictMode>
);
