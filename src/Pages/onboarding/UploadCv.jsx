import React, { useRef, useState } from "react";
import Button from "../../Components/Button";
import { MdOutlineDriveFolderUpload } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";

const UploadCv = () => {
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    if (event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleContinue = () => {
    // your continue logic here (possibly upload or send selectedFile)
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
                onClick={() => setSelectedFile(null)}
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
            accept=".pdf,.doc,.docx"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        </div>
      </div>
      <Button text="Continue" onClick={handleContinue} />
    </div>
  );
};

export default UploadCv;
