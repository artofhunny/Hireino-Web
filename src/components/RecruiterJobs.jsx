import React from "react";
import { useSelector } from "react-redux";
import JobCard from "./JobCard";

const RecruiterJobs = () => {
  const myJobs = useSelector((store) => store.myJobs);

  if(myJobs.length === 0) return <h1>You have not create any job yet</h1>
  if (!myJobs) return <h1>Loading</h1>;

  return (
    myJobs && (
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-5  lg:gap-10 py-16 lg:px-10">
        {myJobs.map((job) => {
          return (
            <div
              key={job._id}
              className="border-2 border-blue-600 rounded overflow-hidden"
            >
              <JobCard job={job} />
            </div>
          );
        })}
      </div>
    )
  );
};

export default RecruiterJobs;
