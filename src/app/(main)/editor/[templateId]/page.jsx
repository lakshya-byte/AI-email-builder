"use client";

import React, { useEffect, useState } from "react";
import EditorHeader from "@/components/custom/EditorHeader";
import ElementsSideBar from "@/components/custom/ElementsSideBar";
import Canvas from "@/components/custom/Canvas";
import Settings from "@/components/custom/Settings";
import { useParams } from "next/navigation";
import { useConvex } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { useUserDetail, useEmailTemplate } from "@/app/provider";
import { Skeleton } from "@/components/ui/skeleton";

const page = () => {
  const [viewHTMLCode, setViewHTMLCode] = useState(false);
  const { templateId } = useParams();
  const { storedUser } = useUserDetail();
  const [loading, setLoading] = useState(false);
  const { emailTemplate, setEmailTemplate } = useEmailTemplate();
  const convex = useConvex();

  useEffect(() => {
    if (storedUser) {
      GetTemplateData();
    }
  }, [storedUser]);

  const GetTemplateData = async () => {
    setLoading(true);
    const result = await convex.query(api.emailTemplate.GetTemplateDesign, {
      email: storedUser.emailAddresses[0]?.emailAddress,
      tid: templateId,
    });
    console.log(result?.design);
    setEmailTemplate(result?.design);
    setLoading(false);
  };

  useEffect(() => {
    console.log(emailTemplate);
  }, [emailTemplate]);

  return (
    <div>
      <EditorHeader viewHTMLCode={(v) => setViewHTMLCode(v)} />

      {!loading && (
        <div className="grid grid-cols-5">
          <ElementsSideBar />
          <div className="col-span-3">
            <Canvas
              viewHTMLCode={viewHTMLCode}
              closeDialog={() => setViewHTMLCode(false)}
            />
          </div>
          <Settings />
        </div>
      )}
      {loading && (
        <div className="flex flex-col space-y-3">
          <Skeleton className="h-[125px] w-[250px] rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      )}
    </div>
  );
};

export default page;
