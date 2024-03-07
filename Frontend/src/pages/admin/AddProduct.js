import React, { useState, useEffect } from "react";
import axios from "axios";

function Test() {
  const [formData, setFormData] = useState([]);
  const [category, setCategory] = useState([]);
  const [subcategory, setSubcategory] = useState([]);
  const [file, setFile] = useState(null);

  const getAll = async () => {
    try {
      const res_categories = await axios.get("https://localhost:7254/api/ProductCategory/All");
      console.log(res_categories.data);
      setCategory(res_categories.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnChange = async (event) => {
    const { name, value } = event.target;
    if (name === 'FormFile') {
      setFile(event.target.files[0]);
    } else {
      setFormData((preFormData) => ({
        ...preFormData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("submit");
    console.log(formData);

    const formDataToSend = new FormData();
    formDataToSend.append('ImageFile', file);
    formDataToSend.append('Name', formData.Name);
    formDataToSend.append('ShortDescription', formData.ShortDescription);
    formDataToSend.append('LongDescription', formData.LongDescription);
    formDataToSend.append('UnitType', formData.UnitType);
    formDataToSend.append('Size', formData.Size);
    formDataToSend.append('Specification', formData.Specification);
    formDataToSend.append('ProductCategoryId', formData.ProductCategory);
    formDataToSend.append('SubCategoryId', formData.SubCategory);

    console.log(formDataToSend);

    try {
      const res = await axios.post("https://localhost:7254/api/Product/Add", formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(res.data);
      if (res.status === 200) alert("Product Added");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAll();
  }, []);

  return (
    <>
      <div className="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard px-8 py-3 pb-8 rounded-bl-lg rounded-br-lg">
        <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-8">
          <div className="flex text-2xl font-bold text-gray-500 mb-5">
            <h2>Create Product</h2>
          </div>

          <div className="mb-6">
            <label htmlFor="Name" className="block mb-2 text-sm font-medium text-gray-900">
              Product Name
            </label>
            <input
              type="text"
              id="Name"
              name="Name"
              value={formData.Name}
              onChange={handleOnChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="FormFile" className="block mb-2 text-sm font-medium text-gray-900">
              Product Image
            </label>
            <input
              type="file"
              id="ImageFile"
              name="FormFile"
              onChange={handleOnChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="ShortDescription" className="block mb-2 text-sm font-medium text-gray-900">
              ShortDescription
            </label>
            <input
              type="text"
              id="ShortDescription"
              name="ShortDescription"
              value={formData.ShortDescription}
              onChange={handleOnChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="ShortDescription"
            />
          </div>

          <div className="flex">
            <div className="mb-6 mr-4">
              <label htmlFor="UnitType" className="block mb-2 text-sm font-medium text-gray-900">
                Unit Type
              </label>
              <input
                type="text"
                id="unitType"
                name="UnitType"
                value={formData.UnitType}
                onChange={handleOnChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="unit"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="Size" className="block mb-2 text-sm font-medium text-gray-900">
                Size
              </label>
              <input
                type="text"
                id="Size"
                name="Size"
                value={formData.Size}
                onChange={handleOnChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Size"
              />
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="LongDescription" className="block mb-2 text-sm font-medium text-gray-900">
              LongDescription
            </label>
            <textarea
              id="LongDescription"
              name="LongDescription"
              value={formData.LongDescription}
              onChange={handleOnChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="LongDescription"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="ProductCategory" className="block mb-2 text-sm font-medium text-gray-900">
              Product Category
            </label>
            <select
              id="ProductCategory"
              name="ProductCategory"
              onChange={handleOnChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            >
              <option value="">Choose -- </option>
              {category && category.length > 0 ? (
                category.map((item, index) => (
                  <option value={item.id} key={index}>
                    {item.name}
                  </option>
                ))
              ) : (
                <option>Can not load</option>
              )}
            </select>
          </div>

          <div className="mb-6">
            <label htmlFor="SubCategory" className="block mb-2 text-sm font-medium text-gray-900">
              Sub Category
            </label>
            <select
              id="SubCategory"
              name="SubCategory"
              onChange={handleOnChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            >
              <option value="">Choose -- </option>
              {category && category.length > 0 ? (
                category.map((item, index) => (
                  <option value={item.id} key={index}>
                    {item.name}
                  </option>
                ))
              ) : (
                <option>Can not load</option>
              )}
            </select>
          </div>

          <div className="mb-6">
            <label htmlFor="Specification" className="block mb-2 text-sm font-medium text-gray-900">
              Specification
            </label>
            <input
              type="text"
              id="Specification"
              name="Specification"
              value={formData.Specification}
              onChange={handleOnChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="product name"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Add Product
          </button>
        </form>
      </div>
    </>
  );
}

export default Test;
