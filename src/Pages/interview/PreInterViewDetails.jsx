import { useRef, useState } from "react";
import Button from "../../Components/Button";
import { MdOutlineDriveFolderUpload } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";
import toast from "react-hot-toast";
import { useInterviewDetails } from "../../state/store";
import { useNavigate } from "react-router";

const PreInterViewDetails = () => {
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const API_URL = import.meta.env.VITE_API_BASE_URL; 
  const handleFileClick = () => { fileInputRef.current.click() };
  const selectedFile = useInterviewDetails((state) => state.file);
  const jobDetails = useInterviewDetails((state) => state.jobDetails);
  const { setFile: setSelectedFile, updateJobDetails: setJobDetails } =
    useInterviewDetails.getState();
    const navigate = useNavigate();

    const wordCount = jobDetails.trim().split(/\s+/).filter(Boolean).length;
    const isValid = wordCount >= 100;
    let toastId;

    const handleFileUpload = async () => {
      const file = selectedFile;
      toast.dismiss(toastId);

      // console.log(file);
      // console.log("this is the file", selectedFile);
      if (!file || !jobDetails) {
        toastId = toast.error(
          "Please upload your resume and provide a job description to continue.",
        );
        return;
      }
      if (!isValid) {
        toastId = toast.error(
          "Job description is too short. Please provide more details.",
        );
        return;
      }

      const formData = new FormData();
      formData.append("cv", file);
      formData.append("jobDescription", jobDetails);

      setLoading(true);
      try {
        const response = await axios.post(
          `${API_URL}/api/ai/parse-cv-interview`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );
        if (response.data.data.sessionID) {
          sessionStorage.setItem(
            "interviewId",
            JSON.stringify(response.data.data.sessionID),
          );
          navigate(`/interview-instructions`, { state: { sessionId: response.data.data.sessionID } });
        } else {
          toastId = toast.error("Error while parsing CV");
          setLoading(false);
        }
        // You can now populate your form with this data
      } catch (error) {
        console.error("Error:", error.response?.data || error.message);
        toastId = toast.error("Failed to parse CV");
        setLoading(false);
      }
    };

    const handleFileChange = (event) => {
      if (event.target.files.length > 0) {
        setSelectedFile(event.target.files[0]);
      }
    };

    const handleRemoveFile = () => {
      setSelectedFile(null);
      // Reset the file input value
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    };

    return (
      <div className="space-y-[25px]">
        <div className="flex flex-col items-center">
          <h1 className="font-bold H-28 mb-[5px]">Resume & Job Description</h1>
          <p className="text-text2">
            Please upload your Resume & Job Description to continue.
          </p>
        </div>
        <div className="flex flex-col items-center smallShadow rounded-[20px] bg-white">
          {/*<img
          src="/assets/parseImage.webp"
          alt="upload illustration"
          className="w-[200px] h-[200px] mb-[10px]"
        />*/}
          <div className="w-full p-[15px]">
            <p className="font-semibold ml-[5px] text-text2 mb-[5px]">Resume</p>
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
                className="w-full h-[140px] rounded-[15px] py-[10px] flex items-center justify-center cursor-pointer bg-secondary/30 border border-dashed"
                style={{
                  boxShadow: "0px 4px 12px 0px #0000001A",
                }}
              >
                <div className="text-center">
                  <MdOutlineDriveFolderUpload className="text-CTA inline-block mb-[5px] text-[20px]" />
                  <p>
                    <span className="text-CTA">Click here</span> to upload your
                    resume
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
          </div>
          <div className="w-full p-[15px] flex flex-col ">
            <p className="font-semibold ml-[5px] text-text2 mb-[5px]">
              Job Description{" "}
              <span className="H-14 font-light">(minimum 100 words)</span>
            </p>
            <textarea
              style={{ boxShadow: "0px 4px 12px 0px #0000001A" }}
              value={jobDetails}
              onChange={(e) => setJobDetails(e.target.value)}
              placeholder="Enter the job description"
              className={`w-full min-h-[300px] rounded-[20px] p-[25px] focus:outline-none  focus:ring-2 resize-none  focus:ring-pink-50
                
              `}
            />
            <div className="flex justify-between items-center  mt-[10px] px-[10px] w-[100%]">
              {loading ? (
                <div className="animate-pulse text-transparent bg-clip-text bg-gradient-to-r from-primary via-text2  to-secondary ">
                  Analyzing your Resume & job description…
                </div>
              ) : (
                <div />
              )}
              <div
                className={`text-sm text-muted-foreground justify-self-end  ${
                  isValid ? "text-text2" : "text-red-400"
                }`}
              >
                {wordCount} words
              </div>
            </div>
          </div>
        </div>

        <Button loading={loading} disabled={loading} text="Continue" onClick={handleFileUpload} />
      </div>
    );
}

export default PreInterViewDetails