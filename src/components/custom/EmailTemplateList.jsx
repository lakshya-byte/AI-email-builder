import Image from "next/image";
import React, { useState, useEffect, useCallback } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { useConvex } from "convex/react";
import { useUserDetail } from "@/app/provider";
import { api } from "../../../convex/_generated/api";
import { Trash2Icon } from "lucide-react";
import { toast } from "sonner";

const EmailTemplateList = () => {
  const [emailList, setEmailList] = useState([]);
  const convex = useConvex();
  const { storedUser } = useUserDetail();

  const GetTemplateList = useCallback(async () => {
    if (!storedUser?.emailAddresses?.[0]?.emailAddress) return;
    try {
      const result = await convex.query(api.emailTemplate.GetAllUserTemplates, {
        email: storedUser.emailAddresses[0].emailAddress,
      });
      setEmailList(result);
    } catch (error) {
      console.error("Failed to fetch templates:", error);
    }
  }, [convex, storedUser]);

  const handleDelete = async (tid) => {
    try {
      await convex.mutation(api.emailTemplate.deleteTemplate, { tid });
      toast.success("Template deleted successfully");
      GetTemplateList();
    } catch (error) {
      console.error("Failed to delete template:", error);
      toast.error("Failed to delete template");
    }
  };

  useEffect(() => {
    GetTemplateList();
  }, [GetTemplateList]);

  return (
    <div>
      <h2 className="bg-white rounded-lg pt-4 font-bold text-amber-500 text-3xl">
        WorkSpace
      </h2>
      <div className="flex flex-col gap-4 items-center justify-center pt-2.5">
        {emailList.length === 0 ? (
          <div className="flex flex-col gap-4 items-center justify-center">
            <p className="text-2xl font-bold">No email templates found</p>
            <Image src={"/email.png"} alt="email" width={250} height={250} />
            <Button className="bg-amber-400 hover:bg-amber-600 cursor-pointer text-white font-bold">
              <Link href="/dashboard/create">Create New Email Template</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {emailList.map((item) => {
              const date = new Date(item._creationTime);
              const formattedDate = date.toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              });
              return (
                <div
                  key={item.tid}
                  className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center transition-transform transform hover:scale-105"
                >
                  <img
                    src="/emailbox.png"
                    alt="email"
                    className="w-32 h-32 mb-4"
                  />
                  <div className="text-center">
                    <h2 className="text-lg font-semibold text-gray-700 mb-2">
                      Created on {formattedDate}
                    </h2>
                    <Link href={`/editor/${item.tid}`}>
                      <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer">
                        View/Edit
                      </Button>
                    </Link>
                    <Button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2 cursor-pointer"
                      onClick={() => handleDelete(item.tid)}
                    >
                      <Trash2Icon className="w-4 h-4 mr-2 cursor-pointer" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailTemplateList;
