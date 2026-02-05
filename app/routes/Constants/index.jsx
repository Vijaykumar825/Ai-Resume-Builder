
export const resumes = [
  {
    id: "1",
    companyName: "Google",
    jobTitle: "Frontend Developer",
    imagePath: "/images/resume_01.png",
    resumePath: "/resumes/resume-1.pdf",
    feedback: {
      overallScore: 85,
      ats_compatibility: {
        rating: 90,
        feedback: "Great ATS compatibility.",
      },
      improvement_suggestions: [
        "Use more action verbs.",
        "Quantify your achievements.",
        "Tailor your resume to the job description.",
      ],
      final_advice: "Strong resume, just needs minor tweaks.",
      job_alignment: {
        rating: 90,
        feedback: "High alignment with the job description.",
      },
      sections: {
        skills: {
          rating: 90,
          feedback: "Good mix of technical and soft skills.",
        },
        format_and_layout: {
          rating: 90,
          feedback: "Clean and easy to read.",
        },
        summary: {
          rating: 90,
          feedback: "Concise and impactful.",
        },
      },
      keywords_missing: ["React", "TypeScript"],
    },
  },
  {
    id: "2",
    companyName: "Microsoft",
    jobTitle: "Cloud Engineer",
    imagePath: "/images/resume_02.png",
    resumePath: "/resumes/resume-1.pdf",
    feedback: {
      overallScore: 55,
      ats_compatibility: {
        rating: 50,
        feedback: "Formatting issues detected.",
      },
      improvement_suggestions: [
        "Fix formatting errors.",
        "Add missing keywords.",
        "Clarify work history.",
      ],
      final_advice: "Needs significant improvement.",
      job_alignment: {
        rating: 50,
        feedback: "Low alignment with job requirements.",
      },
      sections: {
        skills: {
          rating: 60,
          feedback: "Missing key cloud certifications.",
        },
        format_and_layout: {
          rating: 40,
          feedback: "Tables causing parsing issues.",
        },
        summary: {
          rating: 50,
          feedback: "Too generic.",
        },
      },
      keywords_missing: ["Azure", "Kubernetes"],
    },
  },
   {
    id: "3",
    companyName: "Apple",
    jobTitle: "iOS Developer",
    imagePath: "/images/resume_03.png",
    resumePath: "/resumes/resume-3.pdf",
    feedback: {
      overallScore: 75,
      ats_compatibility: {
        rating: 80,
        feedback: "Generally good compatibility.",
      },
      improvement_suggestions: [
        "Include links to app store apps.",
        "Highlight Swift experience.",
      ],
      final_advice: "Solid candidate for iOS roles.",
      job_alignment: {
        rating: 80,
        feedback: "Matches core requirements.",
      },
      sections: {
        skills: {
          rating: 85,
          feedback: "Strong Swift and SwiftUI skills.",
        },
        format_and_layout: {
          rating: 80,
          feedback: "Standard iOS dev resume layout.",
        },
        summary: {
          rating: 70,
          feedback: "Could be more specific to mobile dev.",
        },
      },
      keywords_missing: ["Combine", "UIKit"],
    },
  },
];

export const AIResponseFormat = `
      interface Feedback {
      overallScore: number; // max 100
      
      ats_compatibility: {
        rating: number; // rate based on ATS suitability
        feedback: string;
      };

      improvement_suggestions: string[]; // List of 3-5 specific improvement tips

      final_advice: string; // A concluding summary or advice

      job_alignment: {
        rating: number; // max 100
        feedback: string;
      };

      sections: {
        skills: {
          rating: number; // max 100
          feedback: string; // specific feedback for skills section
        };
        format_and_layout: {
          rating: number; // max 100
          feedback: string;
        };
        summary: {
          rating: number; // max 100
          feedback: string;
        };
      };

      keywords_missing: string[]; // List of important keywords missing from the resume
    }`;

export const prepareInstructions = ({
  jobTitle,
  jobDescription,
  AIResponseFormat,
}) =>
  `You are an expert in ATS (Applicant Tracking System) and resume analysis.
  Please analyze and rate this resume and suggest how to improve it.
  The rating can be low if the resume is bad.
  Be thorough and detailed. Don't be afraid to point out any mistakes or areas for improvement.
  If there is a lot to improve, don't hesitate to give low scores. This is to help the user to improve their resume.
  If available, use the job description for the job user is applying to to give more detailed feedback.
  If provided, take the job description into consideration.
  The job title is: ${jobTitle}
  The job description is: ${jobDescription}
  Provide the feedback using the following format: ${AIResponseFormat}
  Return the analysis as a JSON object, without any other text and without the backticks.
  IMPORTANT: regarding 'keywords_missing': ONLY list keywords that are RELEVANT to the job description AND are COMPLETELY ABSENT from the resume text.
  Do NOT list keywords that are already present in the resume. Double check for case-insensitive matches before adding to the missing list.
  Do not include any other text or comments.`;
