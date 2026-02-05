import { use } from "react";
import Navbar from "~/components/Navbar";
import { useState } from "react";
import FileUploader from "~/components/FileUploader";
import { usePuterStore } from "~/lib/puter";
import { useNavigate } from "react-router";
import { convertPdfToImage as ConvertPdfToImage } from "~/lib/pdf2img";
import { generateUUID } from "~/lib/utils";
import { prepareInstructions, AIResponseFormat } from "./Constants";


const upload = () => {
  const {auth, isLoading,fs,ai, kv} = usePuterStore()
  const navigate = useNavigate();
  const [isProcessing,setIsProcessing]=useState(false)
  const [statusText,setStatusText]=useState("")
  const [file, setFile] = useState(null);
  const handleFileSelect = (file) => {
    setFile(file);
  }


/** here the analysing handler working */
  const handleAnalyze = async ({ companyName, jobTitle, jobDescription,file, }) => {
    setIsProcessing(true);
    setStatusText('Analyzing your resume...');
    const uploadedFile = await fs.upload([file]);
    if (!uploadedFile) return setStatusText('File upload failed');
    setStatusText('Converting to image..');
    const imageFile = await ConvertPdfToImage(file);
    if (!imageFile.file) return setStatusText('File conversion pdf to image failed');
    setStatusText('Uplaoding image...');

    const uploadedImage = await fs.upload([imageFile.file]);
    if (!uploadedImage) return setStatusText('Image upload failed');
    setStatusText('Analyzing resume...');
    const uuid = generateUUID();
    const data ={
      id: uuid,
      resumePath: uploadedFile.path,
      imagePath: uploadedImage.path,
      companyName,
      jobTitle,
      jobDescription,
      feedback: "",
    }
    await kv.set(`resume:${uuid}`, JSON.stringify(data));

        setStatusText('Analyzing...');

        const feedback = await ai.feedback(
            uploadedImage.path,
            prepareInstructions({jobTitle, jobDescription, AIResponseFormat}),
        )
        if (!feedback) return setStatusText('Error: Failed to analyze resume');

        const feedbackText = typeof feedback.message.content === 'string'
            ? feedback.message.content
            : feedback.message.content[0]?.text || "";

        data.feedback = JSON.parse(feedbackText);
        await kv.set(`resume:${uuid}`, JSON.stringify(data));
        console.log(data);
        navigate(`/resume/${uuid}`);
    }

    /* it handle the form of the analyser* */
  const handleSubmit = (e) => {
    e.preventDefault();
    const from = e.currentTarget.closest('form');
    if(!from) return;
    const formData = new FormData(from);
    const companyName = formData.get('company-name');
    const jobTitle = formData.get('Job-Title');
    const jobDescription = formData.get('Job-description');
    if(!file) return
    handleAnalyze({ companyName, jobTitle, jobDescription, file })

  };


  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover">
      <Navbar/>
      <section className="main-section">
        <div className="page-heading py-16">
          <h1>Smart feedback for your dream job</h1>
          {isProcessing ? (
            <>
              <h2>{statusText}</h2>
              <img src="/images/resume-scan.gif" className="w-full"/>
            </>
          ):(
            <h2>Upload your resume and get AI-powered feedback</h2>
          )}
          {!isProcessing && (
            <form id="upload-form" onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="form-div">
                <label htmlFor="company-name">
                  Company Name
                </label>
                <input type="text" name="company-name" placeholder="Company-Name" id="company-name"/>
              </div>
              <div className="form-div">
                <label htmlFor="job-title">
                 Job-Title
                </label>
                <input type="text" name="Job-Title" placeholder="Job Title" id="job-title"/>
              </div>
              <div className="form-div">
                <label htmlFor="job-description">
                 Job-Description
                </label>
                <textarea rows={5} name="Job-description" placeholder="Job Description" id="job-description"/>
              </div>
              <div className="form-div">
                <label htmlFor="upload">
                 Upload Resume
                </label>
                <FileUploader onFileSelect={handleFileSelect}/>
              </div>
              <button className="primary-button" type="submit" >
                Analyse Resume

              </button>

            </form>
            
          )}

        </div>
      </section>
    </main>
  )
}

export default upload
