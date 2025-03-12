"use client";

import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SparkleIcon } from "lucide-react";
import AiInputBox from "@/components/custom/AiInputBox";

function Create() {
  return (
    <div className="px-10 md:px-28 lg:px-40 xl:px-56 mt-20 ">
      <div className="flex flex-col gap-2 items-center justify-center">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
          Create New Email Template
        </h2>
        <p className=" bg-clip-text font-bold text-lg bg-gradient-to-r from-blue-500 to-purple-500 text-transparent ">
          Create a new email template to send to your clients
        </p>
        <Tabs defaultValue="AI" className="w-[400px] mt-10   ">
          <TabsList>
            <TabsTrigger value="AI" className="cursor-pointer">
              Create With AI <SparkleIcon />
            </TabsTrigger>
            <TabsTrigger value="Scratch" className="cursor-pointer">
              Start From Scratch
            </TabsTrigger>
          </TabsList>
          <TabsContent value="AI">
            <AiInputBox />
          </TabsContent>
          <TabsContent value="Scratch">Build from scratch</TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default Create;
