import React from "react";
import "./SideBar.css";
import addproduct from "../../assets/Product_cart.svg";
import listproduct from "../../assets/Product_list_icon.svg";
import { Link } from "react-router-dom";

function SideBar() {
  return (
    <div className="sidebar">
      <Link to={"/addproduct"} style={{ textDecoration: "none" }}>
        <div className="sidebar-item">
          <img src={addproduct} alt="" />
          <p>Add Product</p>
        </div>
      </Link>
      <Link to={"/listproduct"} style={{ textDecoration: "none" }}>
        <div className="sidebar-item">
          <img src={listproduct} alt="" />
          <p>List Product</p>
        </div>
      </Link>
    </div>
  );
}

export default SideBar;
