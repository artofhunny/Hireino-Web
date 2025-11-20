import { useFetchJob } from "@/hooks/jobHook";
import {
  BedSingleIcon,
  BriefcaseBusiness,
  Code,
  DoorOpen,
  Download,
  LocateIcon,
  School2Icon,
  Wrench,
} from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";
import { BarLoader } from "react-spinners";
import ApplyJobForm from "./ApplyJobForm";
import ApplicationBox from "./ApplicationBox";
// import { useParams } from 'react-router-dom';

const JobComponent = ({ id }) => {

  const { isLoadingJob } = useFetchJob(id);

  const job = useSelector((store) => store.job.job);
  const user = useSelector((store) => store.user);

  // if(!job) return <h1>Loading...</h1>
  if (isLoadingJob || !job)
    return <BarLoader className="mt-4" width={"100%"} color="#36d7b7" />;

  return (
    <div className="w-full px-2 sm:px-3 md:px-4 lg:px-5 py-6">
      <div className="flex justify-between">
        <h1 className="text-2xl">Job Details</h1>
        <div>
          {/* <button className='px-3 py-2 bg-green-600 rounded text-lg'>Easy Apply</button> */}
          {user && user.role === "candidate" && <ApplyJobForm />}
        </div>
      </div>
      <div className="mt-6">
        <div className="flex justify-between items-end">
          <h1 className="text-lg md:text-2xl font-bold lg:text-3xl">
            {job.jobTitle}
          </h1>
          <span className="flex gap-2 items-center text-gray-400">
            <LocateIcon size={16} />
            <span>{job.location}</span>
          </span>
        </div>
        <div className="text-gray-400 mt-3 border-b-2 pb-4">
          <div className="flex gap-6">
            <span className="flex gap-1">
              <BedSingleIcon size={20} />
              <span>2 Applications</span>
            </span>
            <span className="flex gap-1">
              <DoorOpen size={20} />
              <span>{job.isOpen ? "Opened" : "Closed"}</span>
            </span>
          </div>
          <div className="flex gap-6">
            <p>{job.jobType}</p>
            <p>{job.workType}</p>
          </div>
        </div>
      </div>

      <div className="pt-7">
        <h1 className="text-lg md:text-2xl mb-3 font-medium lg:text-2xl">
          About the job
        </h1>
        <p className="text-gray-400">{job.description}</p>
      </div>

      <div className="pt-7">
        <h1 className="text-lg md:text-2xl mb-3 font-medium lg:text-2xl">
          What we are looking for
        </h1>
        <ul className="list-disc text-gray-400 pl-4 md:pl-6 lg:pl-10">
          <li>{job.requirements}</li>
        </ul>
      </div>

      {/* Applications */}

      {user && user.role === "recruiter" && job.applications && <div className="flex flex-col gap-4 mt-20">
        {job.applications.map(application => {
            return <ApplicationBox candidate={application} />
        })}
      </div>}

      {user && user.role === "candidate" && <div className="flex justify-center mt-10">
        <ApplyJobForm />
      </div>}
    </div>
  );
};

export default JobComponent;
