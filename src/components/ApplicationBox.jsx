import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { useSelector } from "react-redux";

const ApplicationBox = ({ candidate }) => {
  const {
    candidateId,
    resume,
    skills,
    education,
    experience,
    status,
    createdAt,
  } = candidate;

  const user = useSelector((store) => store.user);

  // if(user.role === "candidate"){
  const jobId = user.role === "candidate" ? candidate?.jobId : null;
  // }

  const [newStatus, setNewStatus] = useState("");

  return (
    user && (
      <div className="bg-slate-950 rounded-lg px-3 border border-blue-500 md:px-6 py-6 flex flex-col gap-4">
        <div className="flex justify-between">
          <div>
            {user.role === "recruiter" ? (
              <p className="text-2xl font-medium">
                {candidateId?.firstName + " " + candidateId?.lastName}
              </p>
            ) : (
              <p className="text-2xl font-medium">
                {jobId && (
                  <span>
                    {jobId?.jobTitle} at {jobId?.companyId.name}
                  </span>
                )}{" "}
              </p>
            )}
            <p className="text-gray-300 text-sm">{candidateId?.emailId}</p>
          </div>
          <a href={resume} target="_blank" rel="noopener noreferrer">
            <Download size={20} />
          </a>
        </div>
        <div className="flex flex-wrap sm:flex-nowrap justify-between gap-3 border-b pb-3">
          <p className="flex gap-1 text-sm items-center">
            <BriefcaseBusiness size={14} /> Experience: {experience}
          </p>
          <p className="flex gap-1 text-sm items-center">
            <School2Icon size={14} /> {education}
          </p>
          {user?.role === "recruiter"?<Select onValueChange={(value) => setNewStatus(value)}>
            <SelectTrigger className="text-xs">
              <SelectValue on placeholder="Change status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Status</SelectLabel>
                <SelectItem value="Applied">Applied</SelectItem>
                <SelectItem value="Interviewing">Interviewing</SelectItem>
                <SelectItem value="Hired">Hired</SelectItem>
                <SelectItem value="Rejected">Rejected</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select> : <p className="text-xs bg-gray-800 text-white px-4 py-1 rounded">{status}</p>}
        </div>
        <div>
          <p className="flex items-center gap-1 text-sm font-medium">
            <Wrench size={14} />
            Skills: {"  "}
            <span className="text-gray-400">{skills}</span>
          </p>
        </div>
        <p className="text-sm">{createdAt}</p>
      </div>
    )
  );
};

export default ApplicationBox;
