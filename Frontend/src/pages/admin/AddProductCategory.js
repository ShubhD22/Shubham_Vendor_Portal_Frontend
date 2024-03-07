import React, { useState, useEffect } from "react";
import axios from "axios";

export default function AddProductCategory() {
  const [productCategoryData, setProductCategoryData] = useState({
    name: "",
    isRoot: false,
    parentCategory: "",
    description: "",
    status: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProductCategoryData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/ProductCategory/Add`,
        productCategoryData
      );
      if (response.status === 200) alert("Product Category Added");
      setProductCategoryData({
        name: "",
        isRoot: false,
        parentCategory:"",
        description: "",
        status: "",
      });
    } catch (error) {
      console.error("Error adding ProductCategory:", error.message);
    }
  };

  return (
    <>
      <div className="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard px-8 py-3 pb-8 rounded-bl-lg rounded-br-lg">
        <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-8">
          <div className="flex text-2xl font-bold text-gray-500 mb-4 justify-center items-center">
            <h2>Create Product Category</h2>
          </div>
          <div className="mb-6">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Product Category Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={productCategoryData.name}
              onChange={handleChange}
              className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="isRoot"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Is Root
            </label>
            <input
              type="checkbox"
              id="isRoot"
              name="isRoot"
              checked={productCategoryData.isRoot}
              onChange={handleChange}
              className="peer"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="parentCategoryId"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Parent Category name
            </label>
            <input
              type="text"
              id="parentCategory"
              name="parentCategory"
              value={productCategoryData.parentCategory.name}
              onChange={handleChange}
              className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="description"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Description
            </label>
            <input
              type="text"
              id="description"
              name="description"
              value={productCategoryData.description}
              onChange={handleChange}
              className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="status"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Status
            </label>
            <input
              type="checkbox"
              id="status"
              name="status"
              checked={productCategoryData.status}
              onChange={handleChange}
              className="peer"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Add Product Category
          </button>
        </form>
      </div>
    </>
  );
}
