import React, { useState, useEffect } from "react";
import axios from "axios";

export default function AddVendorCategory() {
  const [vendorCategoryData, setVendorCategoryData] = useState({
    name: "",
    description: "",
    documentList: [],
  });

  const [docs, setDocs] = useState([]);
  const [chkdocs, setChkDocs] = useState([]);

  const fetchDocumentData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/Document/All`
      );

      setDocs(response.data);
    } catch (error) {
      console.error("Error fetching Document data:", error);
    }
  };

  useEffect(() => {
    // Fetch project data when the component mounts
    fetchDocumentData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVendorCategoryData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (docName) => {
    setChkDocs((prevSelected) => {
      if (prevSelected.includes(docName)) {
        // If the category is already selected, remove it
        return prevSelected.filter((name) => name !== docName);
      } else {
        // If the category is not selected, add it
        return [...prevSelected, docName];
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      var DocList = chkdocs.join(",");
      var arr = DocList.split(",");
      console.log(arr);
      vendorCategoryData.documentList = arr;
      console.log(vendorCategoryData);
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/VendorCategory/Add`,
        vendorCategoryData
      );
      if (response.status === 200) alert("Vendor Category Added");
      setVendorCategoryData({
        name: "",
        description: "",
        documentList: "",
      });
    } catch (error) {
      console.error("Error adding VendorCategory:", error.message);
    }
  };
  return (
    <>
      <div class="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard px-8 py-3 pb-8 rounded-bl-lg rounded-br-lg">
        <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-8">
          <div className="flex text-2xl font-bold text-gray-500 mb-4 justify-center items-center">
            <h2>Create Vendor Category</h2>
          </div>
          <div class="mb-6">
            <label
              for="name"
              class="block mb-2 text-sm font-medium text-gray-900"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={vendorCategoryData.name}
              onChange={handleChange}
              className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              required
            />
          </div>

          <div class="mb-6">
            <label
              for="description"
              class="block mb-2 text-sm font-medium text-gray-900"
            >
              Description
            </label>
            <input
              type="text"
              id="description"
              name="description"
              value={vendorCategoryData.description}
              onChange={handleChange}
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>

          <div class="mb-6">
            <label
              for="documentList"
              class="block mb-2 text-sm font-medium text-gray-900"
            >
              Document List
            </label>
          
<ul class="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg flex flex-col">
{docs.map((doc, index) => (
    <li key={index} class="w-full border-b border-gray-200 border-b-0 border-r">
        <div class="flex items-center ps-3">
            <input id={doc.id} type="checkbox" value={doc.name}  onChange={() => handleCheckboxChange(doc.id)} class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"/>
            <label for={doc.id} class="w-full py-3 ms-2 text-sm font-medium text-gray-900">{doc.name}</label>
        </div>
    </li>))}
</ul>

            
        
          </div>


          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Add Vendor Category
          </button>
        </form>
      </div>
    </>
  );
}