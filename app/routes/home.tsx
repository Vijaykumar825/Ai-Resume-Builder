import Navbar from "~/components/Navbar";
import type { Route } from "./+types/home";

import ResumeCard from "~/components/ResumeCard";
import { usePuterStore } from '~/lib/puter'
import { useEffect,useState } from "react";
import { Link, useNavigate } from "react-router";


export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resumeind" },
    { name: "description", content: "To land Your Dream job" },
  ];
}

export default function Home() {
  const {auth,kv} = usePuterStore();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loadingResumes, setLoadingResumes] = useState(false);

  const navigate = useNavigate();
  const [resumeUrl, setResumeUrl] = useState('');

  useEffect(() => {
  if (!auth.isAuthenticated) {
    navigate('/auth?next=/');
  }
}, [auth.isAuthenticated]);


  useEffect(() => {
  const loadResumes = async () => {
    setLoadingResumes(true);

    const resumes = await kv.list('resume:*', true) as KVItem[];
    
    const parsedResumes = resumes?.map((resume) =>
      JSON.parse(resume.value) as Resume
    );
    console.log({ parsedResumes });

    setResumes(parsedResumes || []);
    setLoadingResumes(false);
  };

  loadResumes(); // Make sure to call the async function
}, []);


  


  return <main className="bg-[url('/images/bg-main.svg')] bg-cover">
    <Navbar/>
    <section className="main-section">
      <div className="page-heading py-16">
        {!loadingResumes && resumes?.length ===0?(
          <h2>No resume founded. Upload your first resume to get feeeback.</h2>
        ):(
          <h2 className="text-3xl font-bold">Review your submission using AI powered feedback.</h2>
        )}
        <div className="flex flex-col items-center justify-center">
          <img
            src="/images/resume-scan-2.gif"
            className="w-[200px]"  
          />
        </div>
      </div>
    
      {!loadingResumes &&  resumes.length > 0 && (
        <div className="resumes-section ">
          {resumes.map((resume) => (
            <ResumeCard key={resume.id} resume={resume} />
          ))}
        </div>
      )}

      {!loadingResumes && resumes.length === 0 && (
        <div className="flex flex-col items-center justify-center mt-10 gap-4">
          <Link to="/upload" className="primary-button w-fit text-xl font-semibold">
            Upload Resume
          </Link>
        </div>
      )}
    </section>

  </main>
}
