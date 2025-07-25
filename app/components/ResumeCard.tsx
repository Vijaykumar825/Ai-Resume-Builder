import { Link } from "react-router"; // <-- Correct
import ScoreCircle from "./ScoreCircle";
const ResumeCard = ({ resume:{id,companyName,jobTitle,feedback,imagePath} }: { resume: Resume }) => {
  return (
    <Link
      to={`/resumes/${id}`}
      className="resume-card animate-card animate-in fade-in duration-1000"
    >
      <div className="resume-card-header">
        <div className="flex flex-col gap-2">
          <h2 className="text-black font-bold break-words">
            {companyName}
          </h2>
          <h3 className="text-lg break-words text-grey-500">
            {jobTitle}
          </h3>

        </div>
        <div className="flex-shrink">
          <ScoreCircle score={feedback.overallScore} />
        </div>
      </div>
      
      
      <div className="gradient-border animate-in fade-in duration-1000">
        <div className="w-full h-full ">
          <img
            src={imagePath}
            alt="resume"
            className="w-full h-[350px] max-sm:h-[200] object-cover object-top"
          />
        </div>
      </div>
      
    </Link>
  );
};

export default ResumeCard;

