import { Link } from "react-router"; // <-- Correct
import ScoreCircle from "./ScoreCircle";
import { useEffect, useState } from "react";
import { usePuterStore } from "~/lib/puter";
const ResumeCard = ({ resume:{id,companyName,jobTitle,feedback,imagePath}, onDelete }) => {
  const { fs} = usePuterStore();
  const [resumeUrl, setResumeUrl] = useState('');
  useEffect(() => {
      const loadResumes = async () => {
        const blob = await fs.read(imagePath);
        if (!blob) return;
        let Url= URL.createObjectURL(blob);
        setResumeUrl(Url);
      }
      loadResumes();
    }, [imagePath]);

  
  return (
    <Link
      to={`/resume/${id}`}
      className="resume-card animate-card animate-in fade-in duration-1000 relative group"
    >
       <button
        onClick={onDelete}
        className="absolute top-2 right-2 z-10 p-2 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50"
        title="Delete Resume"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-red-500">
          <path d="M3 6h18"/>
          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
        </svg>
      </button>
      <div className="resume-card-header">
        <div className="flex flex-col gap-2">
          {companyName && <h2 className="text-black font-bold break-words">
            {companyName}
          </h2>}
          {jobTitle && <h3 className="text-lg break-words text-grey-500">
            {jobTitle}
          </h3>}
          {!companyName && !jobTitle && <h2 className="!text-black font-black">Resume</h2>}

        </div>
        <div className="flex-shrink">
          <ScoreCircle score={feedback.overallScore} />
        </div>
      </div>
      
      
      {resumeUrl && 
      (<div className="gradient-border animate-in fade-in duration-1000">
        <div className="w-full h-full ">
          <img
            src={resumeUrl}
            alt="resume"
            className="w-full h-[350px] max-sm:h-[200] object-cover object-top"
          />
        </div>
      </div>)
      }
      
    </Link>
  );
};

export default ResumeCard;
