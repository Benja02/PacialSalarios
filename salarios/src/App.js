import React from "react";
import Empleados from "./components/Empleados";
import "./App.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="container p-4">
      <div className="row">
        <Empleados />
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
