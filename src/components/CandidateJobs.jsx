import React from "react";
import { useSelector } from "react-redux";
import ApplicationBox from "./ApplicationBox";

const CandidateJobs = () => {
  const applications = useSelector((store) => store.myJobs);


  if(applications.length === 0) return <h1>You have not appied on any job yet</h1>
  if (!applications) return <h1>Loading</h1>;
  return applications && (
    <div className="flex flex-col gap-4 mt-10">
      {applications.map((cand) => {
        return <ApplicationBox candidate={cand} />
      })}
    </div>
  );
};

export default CandidateJobs;
