import { Pencil } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import * as yup from "yup";
import { Card } from "./ui/card";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Error from "./error";
import useFetch from "@/hooks/useFetch";
import { UpdateUrl } from "@/db/apiUrl";
import { BeatLoader } from "react-spinners";

const Updatelinks = ({ title, original, id }) => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [formValues, setFormValues] = useState({
    title: title,
    longUrl: original,
    customUrl: "",
  });
  const schema = yup.object().shape({
    title: yup.string().required("Title is required"),
    longUrl: yup
      .string()
      .url("Must be a valid URL")
      .required("Long URL is required"),
    customUrl: yup.string(),
  });

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.id]: e.target.value,
    });
  };

  const {
    loading,
    error,
    data,
    fn: fnUpdateUrl,
  } = useFetch(UpdateUrl, { ...formValues, id });

  useEffect(() => {
    if (error === null && data) {
      // navigate(`/link/${data[0].id}`);
    }
  }, [error, data]);

  const UpdateLink = async () => {
    setErrors([]);
    try {
      await schema.validate(formValues, { abortEarly: false });

      await fnUpdateUrl();
    } catch (e) {
      const newErrors = {};

      e?.inner?.forEach((err) => {
        newErrors[err.path] = err.message;
      });

      setErrors(newErrors);
    }
  };
  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="ghost">
          <Pencil />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-bold text-2xl">
            Update Link <Error message="Only ui of update is completed" />
          </DialogTitle>
        </DialogHeader>
        <Input
          id="title"
          placeholder="Short Link's Title"
          value={formValues.title}
          onChange={handleChange}
        />
        {errors.title && <Error message={errors.title} />}
        <Input
          id="longUrl"
          placeholder="Enter your Loooong URL"
          value={formValues.longUrl}
          onChange={handleChange}
        />
        {errors.longUrl && <Error message={errors.longUrl} />}
        <div className="flex items-center gap-2">
          <Card className="p-2">https://urltrimmer.vercel.app</Card> /
          <Input
            id="customUrl"
            placeholder="Custom Link (optional)"
            value={formValues.customUrl}
            onChange={handleChange}
          />
        </div>
        {error && <Error message={errors.message} />}
        <DialogFooter className="sm:justify-start">
          <Button onClick={UpdateLink} disabled={loading} variant="destructive">
            {loading ? <BeatLoader size={10} color="white" /> : "Update"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Updatelinks;
