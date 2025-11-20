import React, { useState } from "react";
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
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "./ui/label";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "@/utils/constants";
import { toast } from "sonner";
import { useFormik } from "formik";
import * as Yup from "yup";

const ApplyJobForm = () => {
  // const [education, setEducation] = useState("");
  // const [experience, setExperience] = useState("");
  // const [skills, setSkills] = useState("react, js, node, tailwind, express, css");
  // const [resume, setResume] = useState("");
  const [open, setOpen] = useState(false);

  const job = useSelector((store) => store.job.job);

  const formSchema = Yup.object().shape({
    experience: Yup.string().required("Experience is required"),
    education: Yup.string().required("Education is required"),
    skills: Yup.string().required("Skills are required"),
    resume: Yup.mixed()
      .required("Resume is required")
      .test("fileType", "Only PDF and DOC files allowed", (file) => {
        if (!file) return false;
        const validTypes = [
          "application/pdf",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ];
        return validTypes.includes(file.type);
      }),
  });

  const formik = useFormik({
    initialValues: {
      experience: "",
      education: "",
      skills: "",
      resume: null,
    },
    validationSchema: formSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("education", values.education);
      formData.append("experience", values.experience);
      formData.append("skills", values.skills);
      formData.append("resume", values.resume);

      try {
        await axios.post(BASE_URL + "/application/new/" + job._id, formData, {
          withCredentials: true,
        });

        setOpen(false);
        toast.success("You successfully applied to the job");
      } catch (error) {
        console.error(error);
      }
    },
  });

  const handleOpenDrawer = () => {
    if (job.isApplied) {
      return;
    }
    setOpen(true);
  };

  return (
    <Drawer open={open} className="">
      <DrawerTrigger className="">
        <Button
          disabled={job.isApplied}
          onClick={handleOpenDrawer}
          className={`px-3 py-1 w-full flex-1 rounded text-lg ${
            job.isApplied ? "bg-blue-800" : "bg-blue-500"
          }`}
        >
          {job.isApplied ? "Applied" : "Easy Apply"}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className={"items-start"}>
          <DrawerTitle>Apply for FullStack developer at Microsoft</DrawerTitle>
          <DrawerDescription>Fill the form below</DrawerDescription>
        </DrawerHeader>

        <form onSubmit={formik.handleSubmit} className="overflow-y-scroll left-content flex flex-col gap-4 p-4">
          <Select onValueChange={(value) => formik.setFieldValue("experience", value)}>
            <SelectTrigger className="flex-1 w-full">
              <SelectValue on placeholder="Select your Experience" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Experience</SelectLabel>
                <SelectItem value="Fresher">Fresher</SelectItem>
                <SelectItem value="6 Months">6 Months</SelectItem>
                <SelectItem value="1 Year">1 Year</SelectItem>
                <SelectItem value="2 Year">2 Year</SelectItem>
                <SelectItem value="3 Year">3 Year</SelectItem>
                <SelectItem value="4 Year">4 Year</SelectItem>
                <SelectItem value="More than 4 years">
                  More than 4 years
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          {formik.errors.experience && (
            <p className="text-red-400 text-xs">{formik.errors.experience}</p>
          )}

          <RadioGroup
            defaultValue="comfortable"
            onValueChange={(value) => formik.setFieldValue("education", value)}
          >
            <div className="flex items-center gap-3">
              <RadioGroupItem value="Higher Secondary" id="r1" />
              <Label htmlFor="r1">Higher Secondary</Label>
            </div>
            <div className="flex items-center gap-3">
              <RadioGroupItem value="Graduation" id="r2" />
              <Label htmlFor="r2">Graduation</Label>
            </div>
            <div className="flex items-center gap-3">
              <RadioGroupItem value="Post-Graduation" id="r3" />
              <Label htmlFor="r3">Post-Graduation</Label>
            </div>
          </RadioGroup>
          {formik.errors.education && (
            <p className="text-red-400 text-xs">{formik.errors.education}</p>
          )}


          <Input
            type="text"
            placeholder="Skills (Comma Separated)"
            className={"flex-1"}
            onChange={formik.handleChange}
            value={formik.values.skills}
            onBlur={formik.handleBlur}
            name="skills"
          />
          {formik.errors.skills && (
            <p className="text-red-400 text-xs">{formik.errors.skills}</p>
          )}
          <Input
            type="file"
            accept=".pdf, .doc, .docs"
            className={"flex-1 file:text-gray-500"}
            onChange={(e) => formik.setFieldValue("resume", e.target.files[0])}
          />
          {formik.errors.resume && (
            <p className="text-red-400 text-xs">{formik.errors.resume}</p>
          )}

          <Button className="px-3 py-1 w-full bg-blue-500 rounded text-lg">
            Easy Apply
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
  );
};

export default ApplyJobForm;
