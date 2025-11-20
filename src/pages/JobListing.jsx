import JobCard from "@/components/JobCard";
import JobComponent from "@/components/JobComponent";
import { Button } from "@/components/ui/button";
import { useFetchAllJobs } from "@/hooks/jobHook";
import { useFetchCompanies } from "@/hooks/useFetchCompanies";
import { State } from "country-state-city";
import {
  BedSingleIcon,
  DoorOpen,
  HeartIcon,
  LocateIcon,
  Search,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BarLoader } from "react-spinners";

const JobListing = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [company_id, setCompany_id] = useState("");

  const allJobs = useSelector((store) => store.job.allJobs);

  const { loadingCompanies } = useFetchCompanies();
  const companies = useSelector((store) => store.company);

  const { isLoading } = useFetchAllJobs(searchQuery, location, company_id);
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    if (allJobs) {
      setSelectedJob(allJobs[0]);
    }
  }, [allJobs]);


  return (
    <div className="flex md:gap-4 lg:gap-8 px-2 sm:px-4 md:px-5 lg:px-8 pb-14 pt-10">
      <div className="w-full md:w-[55%]">
        <h1 className="text-lg font-medium text-xl md:text-2xl xl:text-4xl border-b-2 py-6">
          Latest Opportunities Await
        </h1>

        {/* search, filters */}
        <form onSubmit={(e) => e.preventDefault()} className="py-6 flex flex-col gap-4">
          <div className="flex gap-3">
            <div className="flex bg-gray-300 gap-3 items-center px-4 py-2 rounded">
              <Search size={20} color="#6a7282" />
              <input
                type="text"
                name="search-query"
                placeholder="Search Job Title"
                className="md:text-lg text-black outline-none w-full sm:w-60 placeholder:text-gray-500"
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 px-4 rounded font-medium"
            >
              Search
            </button>
          </div>
          <div className="flex gap-3">
            <select
              onChange={(e) => setLocation(e.target.value)}
              name=""
              id=""
              className="flex-1 w-full bg-gray-900 md:text-lg px-4 py-2 rounded"
            >
              <option value="">All Location</option>
              {State.getStatesOfCountry("IN").map(({ name }) => {
                return (
                  <option key={name} value={name}>
                    {name}
                  </option>
                );
              })}
            </select>
            <select
              onChange={(e) => setCompany_id(e.target.value)}
              // onValueChange={(value) => setCompany_id(e.target.value)}
              name=""
              id=""
              className="flex-1 w-full bg-gray-900 md:text-lg px-4 py-2 rounded"
            >
              <option value={"All"}>All</option>
              {companies && companies.map(company => {
                return <option key={company.name} value={company._id}>{company.name}</option>
              })}
            </select>
          </div>
          <p className="text-red-400 md:text-lg">Clear Filter</p>
        </form>

        {isLoading && (
          <BarLoader className="mt-4" width={"100%"} color="#36d7b7" />
        )}

        {allJobs && (
          <div className="grid sm:grid-cols-2 gap-3 py-4">
            {/* <div> */}
            {selectedJob && allJobs.map((job) => {
              return (
                <div key={job._id} onClick={() => setSelectedJob(job)} className={`rounded ${job._id === selectedJob._id? "border-4 border-blue-500" : "border-2"}`}>
                  <JobCard job={job} />
                </div>
              );
            })}
            {/* </div> */}
          </div>
        )}
      </div>
      {/* Job Component */}
      <div className="hidden md:block w-[45%]">
        <div className="sticky top-4 h-screen border-2 rounded-lg overflow-y-scroll left-content bg-slate-950">
          {allJobs && selectedJob && <JobComponent id={selectedJob._id} />}
        </div>
      </div>
    </div>
  );
};

export default JobListing;
