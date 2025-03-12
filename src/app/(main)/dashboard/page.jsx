"use client";

import { useUserDetail } from "@/app/provider";
import Header from "@/components/custom/Header";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import EmailTemplateList from "@/components/custom/EmailTemplateList";

const page = () => {
  const { storedUser } = useUserDetail();
  // const { user } = localStorage.getItem("user");

  // console.log(storedUser);

  return (
    <div>
      {/* <Header /> */}
      <div className="p-10 md:px-28 lg:px-40 xl:px-56 mt-16 ">
        <div className="rounded-lg flex justify-between items-center">
          <h2 className="text-3xl font-bold">Hello, {storedUser?.firstName}</h2>
          <Button className="bg-amber-400 hover:bg-amber-600 cursor-pointer text-white font-bold">
            <Link href="/dashboard/create">
              + Create New Email Template
            </Link>
          </Button>
        </div>
        <EmailTemplateList />
      </div>
    </div>
  );
};

export default page;
