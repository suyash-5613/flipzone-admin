import React, { useEffect, useState } from "react";
import "./ListProduct.css";
import cross_icon from "../../assets/cross_icon.png";

function ListProduct() {
  const [allProduct, setAllProduct] = useState([]);

  const fetchinfo = async () => {
    const ListData = await fetch("http://localhost:4000/product/all", {
      method: "GET",
    });
    const responseData = await ListData.json();
    setAllProduct(responseData["products"]);
  };
  const remove_product = async (id) => {
    const ListData = await fetch("http://localhost:4000/product/remove", {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    });
    const responseData = await ListData.json();
    setAllProduct(responseData["products"]);
    await fetchinfo;
  };

  useEffect(() => {
    fetchinfo();
  }, []);

  return (
    <div className="list-product">
      <h1>All Product List</h1>
      <div className="listproduct-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price </p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className="listproduct-allproduct">
        <hr />
        {allProduct &&
          allProduct.map((product, index) => {
            return (
              <>
                <div
                  className="listproduct-format-main listproduct-format "
                  key={index}
                >
                  <img
                    src={product.image}
                    alt=""
                    className="listproduct-product-icon"
                  />
                  <p>{product.name}</p>`<p>${product.old_price}</p>
                  <p>${product.new_price}</p>
                  <p>{product.category}</p>
                  <img
                    src={cross_icon}
                    alt=""
                    className="listproduct-remove-icon"
                    onClick={() => remove_product(product.id)}
                  />
                </div>
                <hr />
              </>
            );
          })}
      </div>
    </div>
  );
}

export default ListProduct;
