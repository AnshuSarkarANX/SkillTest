import React, { useRef, useState } from "react";
import Button from "../../Components/Button";
import { MdOutlineDriveFolderUpload } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { createProfile } from "../../apis/userApis";

const UploadCv = () => {
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cvData, setCvData] = useState(null);
  const API_URL = import.meta.env.VITE_API_BASE_URL;

  const handleFileClick = () => {
    fileInputRef.current.click();
  };
  const  navigate = useNavigate();

  const handleFileUpload = async () => {
    const file = selectedFile;
    console.log(file);
    console.log("this is the file", selectedFile);
    if (!file) return;

    const formData = new FormData();
    formData.append("cv", file);

    setLoading(true);
    try {
      const response = await axios.post(
        `${API_URL}/api/ai/parse-cv`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setCvData(response.data.data);
      if (
        response.data.data.fullName && response.data.data.qualification &&
        response.data.data.specialization
      ) {
        localStorage.setItem("userDetails", JSON.stringify(response.data.data));
        const userDetails = JSON.parse(localStorage.getItem("userDetails"));
        createProfile(userDetails).then(() => {
          setLoading(false);
          navigate("/");
        }).catch((error) => {
          setLoading(false);
          toast.error(error.message);
        });
      } else {toast.error("Not getting enough information from CV");
        setLoading(false);
      }

      // You can now populate your form with this data
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      toast.error("Failed to parse CV");
      setLoading(false);
    } 


  };

  const handleFileChange = (event) => {
    console.log("this fn called ", event);
    if (event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };
  const handleRemoveFile = () => {
    setSelectedFile(null);
    setCvData(null);
    // Reset the file input value
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-[25px]">
      <div className="flex flex-col items-center">
        <h1 className="font-bold H-28 mb-[5px]">Upload Your CV</h1>
        <p className="text-text2">Please upload your CV to continue.</p>
      </div>
      <div className="flex flex-col items-center smallShadow rounded-[20px] bg-white">
        <img
          src="/assets/uploadCvImage.svg"
          alt="upload illustration"
          className="w-[200px] h-[200px] mb-[10px]"
        />
        <div className="w-full p-[15px]">
          {selectedFile ? (
            <div className="p-[10px] border border-[#0000001A] rounded-[10px] flex justify-between items-center">
              <div>{selectedFile.name}</div>
              <div
                className="text-[14px] text-[#FF4D4F] cursor-pointer"
                onClick={handleRemoveFile}
              >
                <RxCross2 />
              </div>
            </div>
          ) : (
            <div
              onClick={handleFileClick}
              className="w-full h-[140px] rounded-[15px] py-[10px] flex items-center justify-center cursor-pointer bg-[#F7EEFF99] border border-dashed"
              style={{
                boxShadow: "0px 4px 12px 0px #0000001A",
              }}
            >
              <div className="text-center">
                <MdOutlineDriveFolderUpload className=" text-CTA inline-block mb-[5px] text-[20px]" />
                <p>
                  <span className="text-CTA">Click here</span> to upload your CV
                </p>
              </div>
            </div>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          {loading && (
            <p className="animate-pulse text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              Parsing CV using Ai...
            </p>
          )}
          {cvData && (
            <div className="h-[300px] overflow-auto">
              <h3>Extracted Data:</h3>
              <pre>{JSON.stringify(cvData, null, 2)}</pre>
            </div>
          )}
        </div>
      </div>
      <Button text="Continue" onClick={handleFileUpload} />
    </div>
  );
};

export default UploadCv;
