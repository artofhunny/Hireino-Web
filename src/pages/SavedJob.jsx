import JobCard from "@/components/JobCard";
import { BASE_URL } from "@/utils/constants";
import { addSavedJobs } from "@/utils/savedJobsSlice";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const SavedJob = () => {
  const dispatch = useDispatch();

  const savedJobs = useSelector((store) => store.savedJobs);

  const fetchSavedJobs = async () => {
    try {
      const res = await axios.get(BASE_URL + "/savedjobs", {
        withCredentials: true,
      });

      dispatch(addSavedJobs(res.data.data));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchSavedJobs();
  }, []);

  if (savedJobs === 0) return <h1>You didn't saved any job</h1>;
  if (!savedJobs) return <h1>Loading</h1>;

  return (
    savedJobs && (
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-5  lg:gap-10 py-16 lg:px-10">
        {savedJobs.map((job) => {
          return (
            <div
              key={job._id}
              className="border-2 border-blue-600 rounded overflow-hidden"
            >
              <JobCard job={job?.jobId} />
            </div>
          );
        })}
      </div>
    )
  );
};

export default SavedJob;
