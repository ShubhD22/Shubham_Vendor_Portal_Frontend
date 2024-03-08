import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';


function UploadDocument(){
    const [Category,SetCategory] = useState([]);
    const [docs,SetDocs] = useState([]);
    const [File,setFile] = useState([]);
    const navigate = useNavigate();


    const getAllCategory = async ()=>{
        try{
            const sid = sessionStorage.getItem("sid");
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/Vendor/${sid}`);

            const docVerify = res.data.documentVerified;
            const documentVerifiedValues = docVerify.split('|');
            const isVerify = documentVerifiedValues.every(value => value === "False");
            if(isVerify) navigate('/vendor/dashboard');

            const data = res.data.vendorCategory;

            if(Array.isArray(data)==false){
                SetCategory([data]);    
                const arr = data.documentList.split('|').map(item => item.trim());
                SetDocs(arr);
                console.log(arr);
            }
            else
                SetCategory(data);
            console.log(data);
                
        }
        catch(error){
            alert("Error to fetch the data");
            console.log(error);
        }
    }

    const handleOnChange = (event)=>{
        let f=event.target.files[0];
        console.log(f);
        File.push(f);
        setFile(File);
        console.log("change ...");    
        console.log(event.target.files); 
        console.log(File);
    }

    const handleOnSubmit= async (event)=>{
        console.log("submit ...");    
        console.log(File);
        console.log(File[0].name);
        console.log(File[1].name);
        if(File.length==0){
            alert("select file to upload");
        }
        else{
            try{
                const formDataToSend = new FormData();
                File.forEach((file)=>{
                    console.log("Each");
                    console.log(file);
                    formDataToSend.append('Documents', file);
                });
                
                console.log(formDataToSend);
                const sid = sessionStorage.getItem("sid");
                const res = await axios.put(`${process.env.REACT_APP_API_URL}/Vendor/Doc/${sid}`,formDataToSend, {
                    headers: {
                      'Content-Type': 'multipart/form-data'
                    }
                  });
                console.log(res.data);
                if(res.status==200){
                    alert("uploaded");
                }
            }
            catch(error){
                console.log(error);
            }
            finally{
                setFile([]);
            }
        }
    }

    useEffect(()=>{
        getAllCategory();
    },[]);

    return(
        <>
        <div className="grid grid-rows-2 place-items-center z-30">

            <div className="flex items-center justify-center mt-[180px]">
                <table class="mt-[5px] ml-[150px] border-collapse  border border-slate-400">
                    <thead className="bg-blue-500">
                        <tr>
                            <th colSpan={2} className="border border-blue-500 p-3 font-serif font-bold text-left">Upload Following Documents</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                            docs && docs.length > 0 ?
                            docs.map((item,index)=>{
                                return(
                                    <tr>
                                        <td className="border border-slate-300  font-serif font-bold text-left pl-1 pr-1 py-1">
                                            {item}
                                        </td>
                                        <td className="border border-slate-300  font-serif font-bold text-left pl-1 pr-1 py-1">
                                            <input type="file" name="file" onChange={handleOnChange}/>
                                        </td>                                                         
                                    </tr>                                
                                );
                            })
                            
                            :
                            <tr>
                                <td colSpan={2} className="border border-slate-300  font-serif font-bold text-left pl-1 pr-1">
                                    No Records Found !!
                                </td>
                            </tr>
                        }   
                        <td align="center" colSpan={2} className="border border-slate-300  font-serif font-bold text-left pl-1 pr-1 py-1">
                            <button  name="btn" className="ml-[100px] disabled mx-3 px-5 bg-blue-400 border border-blue-500"  onClick={handleOnSubmit}>Upload</button>
                        </td>              
                    </tbody>
                </table>
            </div>
        </div>
    </>
    );
}

export default UploadDocument;