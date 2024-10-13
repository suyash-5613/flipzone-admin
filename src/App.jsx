import React from "react";
import NavBar from "./Components/NavBar/NavBar";
import SideBar from "./Components/SideBar/SideBar.jsx";
import "./App.css"
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <NavBar></NavBar>
      <div className="admin">
        <SideBar></SideBar>
        <Outlet />
      </div>
    </>
  );
}

export default App;
