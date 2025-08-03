import { Link } from "react-router"; // <-- Correct
import ScoreCircle from "./ScoreCircle";
import { useEffect, useState } from "react";
import { usePuterStore } from "~/lib/puter";
const ResumeCard = ({ resume:{id,companyName,jobTitle,feedback,imagePath} }: { resume: Resume }) => {
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
      to={`/resumes/${id}`}
      className="resume-card animate-card animate-in fade-in duration-1000"
    >
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

