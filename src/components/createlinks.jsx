import { UrlState } from "@/context";
import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import Error from "./error";
import { Card } from "./ui/card";

const Createlinks = () => {
  const { user } = UrlState();

  const navigate = useNavigate();
  let [searchParams, setSearchParams] = useSearchParams();
  const longLink = searchParams.get("createNew");
  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <Button variant="destructive">Create New Link </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-bold text-2xl">Create New</DialogTitle>
          </DialogHeader>
          <Input id="title" placeholder="Short Link's Title" />
          <Error message="Some error" />
          <Input id="title" placeholder="Short Your Long URL" />
          <Error message="Some error" />
          <div className="flex items-center gap-2">
            <Card className="p-2">vipul.in</Card> /
            <Input id="title" placeholder="Custom Link (Optional)" />
          </div>
          <Error message="Some error" />
          <DialogFooter className="sm:justify-start">
            <Button variant="destructive">Create Link</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Createlinks;
