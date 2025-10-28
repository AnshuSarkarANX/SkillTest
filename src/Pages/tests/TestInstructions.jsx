import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import Button from "../../Components/Button";

const TestInstructions = () => {
  const instructions = [
    "Ensure a stable internet connection during the exam.",
    "Do not refresh or close the exam window once started.",
    "Follow the time limit strictly—no extra time will be given.",
    "Maintain academic honesty (no external help allowed).",
  ];
  
  const navigate = useNavigate();
  
  // State management
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState("");
  const [generatedTest, setGeneratedTest] = useState(null);
  const [error, setError] = useState(null);
  const [testInfo, setTestInfo] = useState({
    timeAlloted: 0,
    totalQuestions: 0,
    totalMarks: 0
  });

  // Get data from localStorage
  const skill = sessionStorage.getItem("selectedSkill");
  const level = sessionStorage.getItem("selectedLevel");
  const userDetails = JSON.parse(localStorage.getItem("userDetails")) || {};
  const specialization = userDetails.specialization || "";
  const qualification = userDetails.qualification || "";

  const handleStartTest = async () => {
    if (!skill || !level) {
      setError("Skill and level are required. Please go back and select them.");
      return;
    }

    setIsGenerating(true);
    setProgress(0);
    setError(null);
    setStatusMessage("Initializing test generation...");

    try {
      // Build URL with query parameters
      const url = new URL(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/api/ai/generate-questions`
      );
      url.searchParams.append("skill", skill);
      url.searchParams.append("level", level);
      url.searchParams.append("specialization", specialization);
      url.searchParams.append("qualification", qualification);

      // Use fetch with GET request for SSE
      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
          'Accept': 'text/event-stream',
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Get the readable stream
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      // Read the stream
      while (true) {
        const { done, value } = await reader.read();
        
        if (done) {
          setIsGenerating(false);
          break;
        }

        // Decode the chunk
        buffer += decoder.decode(value, { stream: true });
        
        // Split by double newlines (SSE message separator)
        const messages = buffer.split('\n\n');
        buffer = messages.pop() || ''; // Keep incomplete message in buffer

        // Process each complete message
        for (const message of messages) {
          if (message.startsWith('data: ')) {
            try {
              const data = JSON.parse(message.slice(6)); // Remove "data: " prefix
              
              switch (data.type) {
                case 'started':
                  setStatusMessage(`Starting: ${data.totalQuestions} questions in ${data.totalBatches} batches`);
                 
                  break;
                  
                case 'batch_start':
                  setStatusMessage(data.message);
                  setProgress(data.progress);
                  break;
                  
                case 'batch_complete':
                  setStatusMessage(data.message);
                  setProgress(data.progress);
                  console.log(`Batch ${data.batch}/${data.totalBatches} complete`);
                  break;
                  
                case 'complete':
                  setStatusMessage('Test generation complete!');
                  setProgress(100);
                  setGeneratedTest(data.data);
                  setTestInfo({
                    timeAlloted: (data.data.total_questions - 5) *2,
                    totalQuestions: data.data.total_questions,
                    totalMarks: data.data.statistics.total_marks
                  });
                  
                  // Store test in localStorage for the test page
                  sessionStorage.setItem('generatedTest', JSON.stringify(data.data));
                  sessionStorage.setItem('testId', data.data.test_id);
                  
                  console.log('✅ Test generated successfully:', data.data);
                  
                // Auto-navigate to test page after 1.5 seconds
                  
                  break;
                  
                case 'error':
                  setError(data.message);
                  setIsGenerating(false);
                  console.error('❌ Generation error:', data.message);
                  break;
              }
            } catch (parseError) {
              console.warn('Failed to parse SSE message:', message, parseError);
            }
          }
        }
      }

    } catch (error) {
      console.error('Failed to generate test:', error);
      setError(`Failed to generate test: ${error.message}`);
      setIsGenerating(false);
    }
  };
  useEffect(() => {
    if(!generatedTest){  handleStartTest();}
  
  }, [generatedTest]);
  

  return (
    <div className="space-y-[20px] w-full">
      <h1 className="font-bold H-18">Rules & Instructions</h1>
      
      <ol className="list-decimal list-inside list">
        {instructions.map((instruction, index) => (
          <li key={index} className="H-16 font-bold text-text2">
            <span className="font-normal H-16">{instruction}</span>
          </li>
        ))}
      </ol>

      {/* Test Info Cards */}
      <div className="flex gap-[20px] w-full justify-around">
        <div className="flex flex-col items-center gap-[10px] bg-white rounded-[10px] p-[20px] smallShadow flex-1 max-w-[250px]">
          <img
            src="./assets/clockImage.svg"
            className="p-[10px] px-[20px] object-center bg-no-repeat"
            style={{ backgroundImage: `url('./assets/vectorImage.svg')` }}
            alt="Clock"
          />
          <p className="font-bold H-18 text-primary">{testInfo.timeAlloted > 0 ? `${testInfo.timeAlloted} Minutes` : "Loading..."}</p>
          <p>Time Alloted</p>
        </div>

        <div className="flex items-center gap-[10px] flex-col bg-white rounded-[10px] p-[20px] smallShadow flex-1 max-w-[250px]">
          <img
            src="./assets/bulbImage.svg"
            className="p-[10px] object-center bg-no-repeat px-[20px]"
            style={{ backgroundImage: `url('./assets/vectorImage.svg')` }}
            alt="Questions"
          />
          <p className="font-bold H-18 text-primary">
            {testInfo.totalQuestions > 0 ? `${testInfo.totalQuestions} Questions` : "Loading..."}
          </p>
          <p>Total Questions</p>
        </div>

        {/*testInfo.totalMarks > 0 && (
          <div className="flex items-center gap-[10px] flex-col bg-white rounded-[10px] p-[20px] smallShadow flex-1 max-w-[250px]">
            <img
              src="./assets/bulbImage.svg"
              className="p-[10px] object-center bg-no-repeat px-[20px]"
              style={{ backgroundImage: `url('./assets/vectorImage.svg')` }}
              alt="Marks"
            />
            <p className="font-bold H-18 text-primary">{testInfo.totalMarks} Marks</p>
            <p>Total Marks</p>
          </div>
        )*/}
      </div>

      {/* Progress Bar */}
      {isGenerating && (
        <div className="bg-white border border-gray-200 rounded-lg p-6 animate-pulse">
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">
                {statusMessage}
              </span>
              <span className="text-sm font-bold text-blue-600">
                {progress}%
              </span>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className="bg-blue-500 h-3 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          
          <div className="text-sm text-gray-600 text-center">
            Please wait while we generate your personalized test...
          </div>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-start">
            <svg className="h-5 w-5 text-red-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <div>
              <h3 className="text-sm font-medium text-red-800">Error</h3>
              <p className="mt-1 text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Success Message */}
      {generatedTest && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center">
            <svg className="h-5 w-5 text-green-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <p className="text-sm font-medium text-green-800">
              Test generated successfully!
            </p>
          </div>
        </div>
      )}

      {/* Start Test Button */}
      <Button 
        text={isGenerating ? "Generating Test..." : "Start Test"} 
        onClick={() => navigate("/test")}
        disabled={isGenerating}
      />
    </div>
  );
};

export default TestInstructions;
