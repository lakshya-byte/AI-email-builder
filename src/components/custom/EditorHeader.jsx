"use client";

import Image from "next/image";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { CodeSquare, Monitor, Smartphone } from "lucide-react";
import { useEmailTemplate, useScreenSize } from "@/app/provider";
import Link from "next/link";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useParams } from "next/navigation";
import { toast } from "sonner";

const EditorHeader = ({ viewHTMLCode }) => {
  const { screenSize, setScreenSize } = useScreenSize();
  const updateEmailTemplate = useMutation(
    api.emailTemplate.UpdateTemplateDesign
  );
  const { templateId } = useParams();
  const { emailTemplate, setEmailTemplate } = useEmailTemplate();

  const onSaveTemplate = async () => {
    await updateEmailTemplate({
      tid: templateId,
      design: emailTemplate,
    });
    toast.success("Template saved successfully");
  };

  return (
    <div className="flex justify-between items-center p-4 shadow-md gap-4">
      <Link className="cursor-pointer" href="/dashboard">
        <Image src={"/logo.svg"} alt="logo" width={160} height={150} />
      </Link>
      <div className="flex gap-2">
        <Button
          className={`bg-blue-400 hover:bg-blue-600 cursor-pointer text-white font-bold" ${screenSize === "desktop" ? "bg-blue-600" : "bg-gray-300"}`}
          variant={"outline"}
          onClick={() => setScreenSize("desktop")}
        >
          <Monitor />
          Desktop
        </Button>
        <Button
          className={`bg-green-400 hover:bg-green-600 cursor-pointer text-white font-bold" ${screenSize === "mobile" ? "bg-green-600" : "bg-gray-300"}`}
          variant={"outline"}
          onClick={() => setScreenSize("mobile")}
        >
          <Smartphone />
          Mobile
        </Button>
      </div>
      <div className="flex gap-4">
        <Button
          className="bg-blue-400 hover:bg-blue-600 cursor-pointer text-white font-bold"
          variant={"outline"}
          onClick={() => viewHTMLCode(true)}
        >
          <CodeSquare />
        </Button>

        <Button
          className="bg-amber-400 hover:bg-amber-600 cursor-pointer text-white font-bold"
          variant={"outline"}
        >
          Send Test Email
        </Button>

        <Button
          className="bg-purple-400 hover:bg-purple-600 cursor-pointer text-white font-bold"
          variant={"outline"}
          onClick={onSaveTemplate}
        >
          Save Template
        </Button>
      </div>
    </div>
  );
};

export default EditorHeader;
