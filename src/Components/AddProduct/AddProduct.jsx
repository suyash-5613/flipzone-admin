import React, { useState } from "react";
import "./AddProduct.css";
import upload_area from "../../assets/upload_area.svg";
import all_product from "../../Assets/all_product.js";

function AddProduct() {
  const [image, setImage] = useState(false);

  const [productDetails, setProductDetails] = useState({
    name: "",
    image: "",
    category: "women",
    old_price: "",
    new_price: "",
  });

  const imageHandler = (e) => {
    console.log(e.target.files[0]);
    setImage(e.target.files[0]);
  };

  const changeHandler = (e) => {
    console.log(e.target.name);
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  const add_allProduct = async (product) => {
    try {
      // Fetch the local image file from its URL
      const imageResponse = await fetch(product.image);
      const imageBlob = await imageResponse.blob();

      // Create FormData and append the Blob
      let formData = new FormData();
      formData.append("product", imageBlob, product.name + ".png"); // Add image with product name as the file name

      // Upload the image
      const uploadResponse = await fetch("http://localhost:4000/upload", {
        method: "POST",
        body: formData,
      });

      const responseData = await uploadResponse.json();

      if (responseData.success) {
        product.image = responseData.imageurl; // Update product with the uploaded image URL

        // Now upload the product data
        const productResponse = await fetch(
          "http://localhost:4000/product/add",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(product),
          }
        );
        const productData = await productResponse.json();

        if (productData.success) {
          console.log("Product Added:", product.name);
        } else {
          console.log("Failed to add product:", product.name);
        }
      } else {
        console.log("Image upload failed for product:", product.name);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const Add_Product = async () => {
    try {
      let product = productDetails;
      let formData = new FormData();
      formData.append("product", image);

      const uploadResponse = await fetch("http://localhost:4000/upload", {
        method: "POST",
        body: formData,
      });
      const responseData = await uploadResponse.json();

      if (responseData.success) {
        product.image = responseData.imageurl;
        console.log(product);

        const productResponse = await fetch(
          "http://localhost:4000/product/add",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(product),
          }
        );
        const productData = await productResponse.json();

        if (productData.success) {
          alert("Product Added");
        } else {
          alert("Failed to add product");
        }
      } else {
        alert("Image upload failed");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred");
    }
  };
  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
  const addAllData = async() => {
    for (let i = 0; i < all_product.length; i++) {
      add_allProduct(all_product[i]);
      await sleep(5000);
    }
  };

  return (
    <div className="addproduct">
      <div className="addproduct-itemfield">
        <p>Product Title</p>
        <button onClick={addAllData}>abcd
        </button>
        <input
          name="name"
          type="text"
          placeholder="Type Here"
          value={productDetails.name}
          onChange={changeHandler}
        />
      </div>
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Price</p>
          <input
            name="old_price"
            type="text"
            placeholder="Type Here"
            value={productDetails.old_price}
            onChange={changeHandler}
          />
        </div>
        <div className="addproduct-itemfield">
          <p>Offer Price</p>
          <input
            name="new_price"
            type="text"
            placeholder="Type Here"
            value={productDetails.new_price}
            onChange={changeHandler}
          />
        </div>
      </div>

      <div className="addproduct-itemfield">
        <p>Product Category</p>
        <select
          name="category"
          className="add-product-selector"
          value={productDetails.category}
          onChange={changeHandler}
        >
          <option value="women">Women</option>
          <option value="men">Men</option>
          <option value="kid">Kid</option>
        </select>
      </div>
      <div className="addproduct-itemfield">
        <label htmlFor="file-input">
          <img
            src={image ? URL.createObjectURL(image) : upload_area}
            alt=""
            className="addproduct-thumbnail-img"
          />
        </label>
        <input
          type="file"
          name="image"
          id="file-input"
          hidden
          onChange={imageHandler}
        />
      </div>
      <button
        className="addproduct-btn"
        onClick={() => {
          Add_Product();
        }}
      >
        Add
      </button>
    </div>
  );
}

export default AddProduct;
