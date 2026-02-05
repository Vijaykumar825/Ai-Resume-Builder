import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionItem,
} from "./Accordion";
import { cn } from "~/lib/utils";
import ScoreBadge from "./ScoreBadge";

const CategoryHeader = ({
  title,
  categoryScore,
}) => {
  return (
    <div className="flex flex-row gap-4 items-center py-2">
      <p className="text-2xl font-semibold">{title}</p>
      <ScoreBadge score={categoryScore} />
    </div>
  );
};

const TipBox = ({
  type,
  tip,
}) => (
  <div
    className={cn(
      "flex flex-col gap-2 rounded-2xl p-4",
      type === "good"
        ? "bg-green-50 border border-green-200 text-green-700"
        : "bg-yellow-50 border border-yellow-200 text-yellow-700"
    )}
  >
    <div className="flex flex-row gap-2 items-center">
      <img
        src={type === "good" ? "/icons/check.svg" : "/icons/warning.svg"}
        alt="score"
        className="size-5"
      />
      <p className="text-xl font-semibold">{tip}</p>
    </div>
  </div>
);

const Details = ({ feedback }) => {
  const tips = feedback?.improvement_suggestions?.map((tip) => ({
    type: "improve",
    tip,
  })) || [];

  return (
    <div className="bg-gradient-to-b to-white rounded-2xl shadow-md w-full p-6">
      <Accordion>
        <AccordionItem id="final-advice">
          <AccordionHeader itemId="final-advice">
            <CategoryHeader title="Final Advice" categoryScore={100} />
          </AccordionHeader>
          <AccordionContent itemId="final-advice">
            <TipBox type="improve" tip={feedback.final_advice} />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem id="job-alignment">
          <AccordionHeader itemId="job-alignment">
            <CategoryHeader title="Job Alignment Feedback" categoryScore={feedback.job_alignment?.rating ?? 0} />
          </AccordionHeader>
          <AccordionContent itemId="job-alignment">
            <TipBox type="improve" tip={feedback.job_alignment?.feedback ?? "No feedback"} />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem id="skills-feedback">
          <AccordionHeader itemId="skills-feedback">
            <CategoryHeader title="Skills Section Feedback" categoryScore={feedback.sections?.skills?.rating ?? 0} />
          </AccordionHeader>
          <AccordionContent itemId="skills-feedback">
            <TipBox type="improve" tip={feedback.sections?.skills?.feedback ?? "No feedback"} />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem id="keywords">
          <AccordionHeader itemId="keywords">
            <CategoryHeader title="Missing Keywords" categoryScore={feedback.keywords_missing?.length ? 30 : 100} />
          </AccordionHeader>
          <AccordionContent itemId="keywords">
            <div className="grid grid-cols-2 gap-2">
              {feedback.keywords_missing?.map((kw, index) => (
                <TipBox key={index} type="improve" tip={`Add keyword: ${kw}`} />
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        
      </Accordion>
    </div>
  );
};

export default Details;
