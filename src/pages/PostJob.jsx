import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useFetchCompanies } from "@/hooks/useFetchCompanies";
import { useDispatch, useSelector } from "react-redux";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import axios from "axios";
import { BASE_URL } from "@/utils/constants";
import { addCompanies, addCompany } from "@/utils/companySlice";
import { useNavigate } from "react-router-dom";
import { State } from "country-state-city";
import * as Yup from "yup";
import { useFormik } from "formik";

const PostJob = () => {
  const [isOn, setIsOn] = useState(true);
  const [companyName, setCompanyName] = useState({});
  const [logo, setLogo] = useState("");
  const [open, setOpen] = useState(false);
  const workTypes = ["Remote", "Onsite", "Hybrid"];
  const [selectedWorkType, setSelectedWorkType] = useState(null);
  const jobTypes = ["Full-time", "Part-time", "Internship"];
  const [selectedJobType, setSelectedJobType] = useState(null);

  const navigate = useNavigate();

  const { loadingCompanies } = useFetchCompanies();
  const companies = useSelector((store) => store.company);

  const dispatch = useDispatch();

  const handleAddCompany = async (e) => {
    e.preventDefault();
    try {
      // setLoadingAddCompany(true);
      const formData = new FormData();
      formData.append("name", companyName);
      formData.append("logo", logo);

      const res = await axios.post(BASE_URL + "/company/new", formData, {
        withCredentials: true,
      });

      dispatch(addCompany(res.data.data));
      setOpen(false);
      // setLoadingAddCompany(false);
    } catch (error) {
      console.error(error);
    }
  };

  const postJobScheme = Yup.object().shape({
    jobTitle: Yup.string()
      .min(3, "Job title must be at least 3 characters")
      .required("Job title is required"),
    location: Yup.string().required("Location is required"),
    workType: Yup.string().required("Work Type is required"),
    jobType: Yup.string().required("Job Type is required"),
    requirements: Yup.string().required("Requirements is required"),
    description: Yup.string().required("description is required"),
    isOpen: Yup.boolean(),
    companyId: Yup.string().required("Company is required"),
  });

  const formik = useFormik({
    initialValues: {
      jobTitle: "",
      location: "",
      workType: "",
      jobType: "",
      requirements: "",
      description: "",
      isOpen: true,
      companyId: "",
    },

    validationSchema: postJobScheme,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const payload = {
          jobTitle: values.jobTitle,
          location: values.location,
          workType: values.workType,
          jobType: values.jobType,
          requirements: values.requirements,
          description: values.description,
          isOpen: values.isOpen,
          companyId: values.companyId,
        };

        const res = await axios.post(BASE_URL + "/job/new", payload, {
          withCredentials: true,
        });

        navigate("/my-jobs");

        // console.log(selectedCompany);
      } catch (error) {
        console.error(error);
        const backendMessage =
          error?.response?.data?.message ||
          error?.response?.data ||
          "Something went wrong while posting job";
        setErrors({ companyId: backendMessage });
      }
    },
  });

  // const handlePostJob = async () => {
  //   try {
  //     const res = await axios.post(
  //       BASE_URL + "/job/new",
  //       {
  //         companyId: selectedCompany,
  //         jobTitle,
  //         requirements,
  //         description,
  //         jobType: selectedJobType,
  //         workType: selectedWorkType,
  //         location,
  //         isOpen: isOn,
  //       },
  //       { withCredentials: true }
  //     );

  //     navigate("/my-jobs");

  //     // console.log(selectedCompany);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
    <div className="px-2 sm:px-3 md:px-4 lg:px-5 pb-6">
      <h1 className="text-center pb-4 font-bold text-xl md:text-3xl lg:text-2xl">
        Post a Job
      </h1>
      <form onSubmit={formik.handleSubmit} className="bg-[#0a1018] px-2 sm:px-2 lg:px-5 py-6 rounded-lg flex flex-col">
        <div className="">
          <div className="flex gap-4 flex-wrap sm:flex-nowrap">
            <div className="w-full flex flex-col gap-3">
              <div className="w-full flex flex-col gap-2">
                <label className="">Job Title</label>
                <Input
                  type={"text"}
                  name="jobTitle"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.jobTitle}
                  className="w-full"
                />
                {formik.touched.jobTitle && formik.errors.jobTitle && (
                  <p className="text-red-400 text-xs mt-1">
                    {formik.errors.jobTitle}
                  </p>
                )}
              </div>
              <div className="w-full flex flex-col gap-2">
                <label className="">Location</label>
                {/* <Input type={"text"} value={location} onChange={(e) => setLocation(e.target.value)} className="w-full" /> */}
                <Select
                  value={formik.values.location}
                  onValueChange={(value) =>
                    formik.setFieldValue("location", value)
                  }
                >
                  <SelectTrigger className="flex-1 w-full">
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  {/* {companies && ( */}
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Location</SelectLabel>
                      {State.getStatesOfCountry("IN").map(({ name }) => {
                        return (
                          <SelectItem key={name} value={name}>
                            {name}
                          </SelectItem>
                        );
                      })}

                      {/* <SelectItem value="Fresher">Fresher</SelectItem>
                      <SelectItem value="Fresher">Fresher</SelectItem> */}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {formik.touched.location && formik.errors.location && (
                  <p className="text-red-400 text-xs mt-1">
                    {formik.errors.location}
                  </p>
                )}
              </div>
              <div className="w-full flex flex-col gap-2">
                <p>Work Type</p>
                <div className="w-full grid grid-cols-3 gap-2">
                  {workTypes.map((type) => {
                    return (
                      <button
                        key={type}
                        onClick={() => {
                          setSelectedWorkType(type);
                          formik.setFieldValue("workType", type);
                        }}
                        className={`text-xs h-8 box-border ${
                          selectedWorkType === type
                            ? "bg-[#070b10] border-blue-600"
                            : "bg-gray-800"
                        } border border-2 rounded py-2 px-2  `}
                        type="button"
                      >
                        {type}
                      </button>
                    );
                  })}
                </div>
                {formik.touched.workType && formik.errors.workType && (
                  <p className="text-red-400 text-xs mt-1">
                    {formik.errors.workType}
                  </p>
                )}
              </div>
            </div>
            <div className="w-full flex flex-col gap-2">
              <div className="flex flex-col gap-2">
                <p>Job Description</p>
                <Textarea
                  className="w-full resize-none h-16"
                  placeholder="Type your message here."
                  name="description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                ></Textarea>
                {formik.touched.description && formik.errors.description && (
                  <p className="text-red-400 text-xs mt-1">
                    {formik.errors.description}
                  </p>
                )}
              </div>
              <div className="flex py-3 gap-2">
                <Select
                  value={formik.values.companyId}
                  onValueChange={(value) =>
                    formik.setFieldValue("companyId", value)
                  }
                >
                  <SelectTrigger className="flex-1 w-full">
                    <SelectValue placeholder="Select Company" />
                  </SelectTrigger>
                  {companies && (
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Companies</SelectLabel>
                        {companies.map((company) => {
                          return (
                            <SelectItem key={company.name} value={company._id}>
                              {company.name}
                            </SelectItem>
                          );
                        })}

                        {/* <SelectItem value="Fresher">Fresher</SelectItem>
                      <SelectItem value="Fresher">Fresher</SelectItem> */}
                      </SelectGroup>
                    </SelectContent>
                  )}
                </Select>
                <Button onClick={() => setOpen(true)}>Add</Button>
              </div>
              {formik.touched.companyId && formik.errors.companyId && (
                  <p className="text-red-400 text-xs -mt-1">
                    {formik.errors.companyId}
                  </p>
                )}
              <div className="flex py-3">
                <label for="isactive" className="flex-1">
                  Make Job Active
                </label>
                <Switch
                  id="isactive"
                  checked={isOn}
                  onCheckedChange={(value) => {
                    setIsOn(value);
                    formik.setFieldValue("isOpen", value);
                  }}
                  className="data-[state=checked]:bg-sky-400"
                />
              </div>
            </div>
          </div>

          <div>
            <div className="flex flex-wrap-reverse sm:flex-nowrap mt-3 gap-4">
              <div className="w-full flex flex-col gap-2">
                <p>Job Type</p>
                <div className="w-full grid grid-cols-3 gap-2">
                  {jobTypes.map((type) => {
                    return (
                      <button
                        key={type}
                        onClick={() => {
                          setSelectedJobType(type);
                          formik.setFieldValue("jobType", type);
                        }}
                        className={`text-xs h-8 box-border ${
                          selectedJobType === type
                            ? "bg-[#070b10] border-blue-600"
                            : "bg-gray-800"
                        } border border-2 rounded py-2 px-2  `}
                        type="button"
                      >
                        {type}
                      </button>
                    );
                  })}
                </div>
                {formik.touched.jobType && formik.errors.jobType && (
                  <p className="text-red-400 text-xs mt-1">
                    {formik.errors.jobType}
                  </p>
                )}
                <div className="flex">
                  <Button
                    // onClick={handlePostJob}
                    type="submit"
                    className="self-center w-full mt-5"
                    variant={"blue"}
                    disabled={formik.isSubmitting}
                  >
                    {formik.isSubmitting ? "Posting..." : "Post"}
                  </Button>
                </div>
              </div>
              <div className="w-full flex flex-col gap-2">
                <p>Key Requirements</p>
                <Textarea
                  className="w-full resize-none h-24"
                  placeholder="Type your message here."
                  name="requirements"
                  value={formik.values.requirements}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                ></Textarea>
                {formik.touched.requirements && formik.errors.requirements && (
                  <p className="text-red-400 text-xs mt-1">
                    {formik.errors.requirements}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* <Button className="self-center w-full mt-10" variant={"blue"}>
          Post
        </Button> */}
      </form>

      <Drawer open={open} className="">
        {/* <DrawerTrigger className="">
          <Button
            disabled={job.isApplied}
            onClick={handleOpenDrawer}
            className={`px-3 py-1 w-full flex-1 rounded text-lg`}
          >
            Add
          </Button>
        </DrawerTrigger> */}
        <DrawerContent>
          <DrawerHeader className={"items-start"}>
            <DrawerTitle>Add New Company</DrawerTitle>
            {/* <DrawerDescription>Fill the form below</DrawerDescription> */}
          </DrawerHeader>

          <form className="flex flex-col gap-4 p-4">
            <div className="w-full flex gap-3">
              <Input
                type="text"
                placeholder="Company name"
                className={"flex-1"}
                onChange={(e) => setCompanyName(e.target.value)}
                value={companyName}
              />
              <Input
                type="file"
                accept=".png, .jpg, .jpeg, .webp"
                className={"flex-1 file:text-gray-500"}
                onChange={(e) => setLogo(e.target.files[0])}
              />
            </div>

            <Button
              onClick={handleAddCompany}
              className="px-3 py-1 w-full bg-blue-500 rounded text-lg"
            >
              Add Company
            </Button>
          </form>

          <DrawerFooter>
            <DrawerClose>
              <Button
                variant="outline"
                onClick={() => setOpen(false)}
                className={"-mt-4 flex-1"}
              >
                Cancel
              </Button>
              {/* <button className='px-3 py-1 w-full rounded text-lg'>Close</button> */}
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default PostJob;
