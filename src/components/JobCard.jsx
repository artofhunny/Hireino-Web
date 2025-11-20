import {
  Delete,
  DeleteIcon,
  HeartIcon,
  LocateIcon,
  Trash2,
} from "lucide-react";
// import googleLogo from '../assets/google.webp'
import { Button } from "./ui/button";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "@/utils/constants";
import { deleteJob } from "@/utils/Myjobs";
import { deleteJobFromJobs, saveJob, unsaveJob } from "@/utils/jobSlice";
import { deleteSavedJob } from "@/utils/savedJobsSlice";

const JobCard = ({ job }) => {
  const {
    _id,
    jobTitle,
    companyId,
    location,
    workType,
    jobType,
    isApplied,
    isSaved,
  } = job;

  const dispatch = useDispatch();
  const locationUrl = useLocation();

  const user = useSelector((store) => store.user);

  const handleDeleteJob = async () => {
    try {
      await axios.delete(BASE_URL + "/job/delete/" + _id, {
        withCredentials: true,
      });

      if(locationUrl.pathname === "/jobs"){
        dispatch(deleteJobFromJobs(_id));
      }
      else{
        dispatch(deleteJob(_id));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSaveJob = async () => {
    try {
      if (isSaved) {
        await axios.delete(BASE_URL + "/save/delete/" + _id, {
          withCredentials: true,
        });
        if (locationUrl.pathname === "/jobs") {
          dispatch(unsaveJob(_id));
        }
        else{
          dispatch(deleteSavedJob(_id));
        } 

      } else {
        await axios.post(
          BASE_URL + "/save/new/" + _id,
          {},
          { withCredentials: true }
        );
        dispatch(saveJob(_id));
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (!job) return <h1>Loading</h1>;

  return (
    <div className="bg-slate-950 flex flex-col justify-between rounded p-4 h-full">
      <h2 className="md:text-lg lg:text-[22px] pb-3 font-medium">{jobTitle}</h2>
      <div className="flex justify-between items-center border-b-2 pb-3">
        <img
          src={companyId?.logo}
          className="w-20 rounded "
          alt=""
        />
        <div className="flex gap-2 items-center">
          <LocateIcon size={16} />
          <span>{location}</span>
        </div>
      </div>
      <div className="flex gap-2 py-2 text-xs">
        <p className="px-2 py-1 rounded bg-[#0f1839]">{jobType}</p>
        <p className="px-2 py-1 rounded bg-[#0f1839]">{workType}</p>
      </div>
      <div className="flex gap-2">
        <Button variant={"secondary"} className="flex-1">
          <Link to={"/job/" + _id} className="w-full">
            View Details
          </Link>
        </Button>

        {user?.role === "recruiter" && job?.recruiterId === user._id && (
          <Button
            onClick={handleDeleteJob}
            variant={"outline"}
            className={"w-12"}
          >
            <Trash2 color="red" size={30} />
          </Button>
        )}
        {user?.role === "candidate" && (
          <Button
            variant={"outline"}
            className={"w-12"}
            onClick={handleSaveJob}
          >
            {" "}
            {isSaved ? (
              <HeartIcon size={30} fill="red" stroke="red" />
            ) : (
              <HeartIcon size={30} />
            )}
          </Button>
        )}
      </div>
    </div>
  );
};

export default JobCard;
