"use client";
import React from "react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useState } from "react";
import Prompt from "@/Data/Prompt";
import axios from "axios";
import { useMutation } from "convex/react";
// import { api } from "../../../../convex/_generated/api";
import { v4 as uuidv4 } from "uuid";
import { useUserDetail } from "@/app/provider";
import { api } from "../../../convex/_generated/api";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
function AiInputBox() {
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const SaveTemplate = useMutation(api.emailTemplate.SaveTemplate);
  const { storedUser, setStoredUser } = useUserDetail();
  const { user } = useUser();
  const router = useRouter();

  const handleGenerateEmail = async () => {
    const PROMPT = Prompt.EMAIL_PROMPT + "\n-" + userInput;
    setLoading(true);
    const tid = uuidv4();
    try {
      console.log("Sending request with prompt:", PROMPT);
      const result = await axios.post("/api/ai-email-generate", {
        prompt: PROMPT,
        userEmail: "",
        tId: 0,
      });

      // console.log("Received response:", result.data);
      const resp = await SaveTemplate({
        tid: tid,
        design: result.data,
        email: user?.emailAddresses[0]?.emailAddress,
      });
      // console.log("Template saved:", resp);
      router.push("/editor/" + tid);
      setLoading(false);
    } catch (error) {
      console.error("Error occurred:", error);
      setLoading(false);
    }
  };

  return (
    <div className="mt-4">
      <p className="text-gray-500 font-bold text-md ">
        Provide details about the email template you'd like to create
      </p>
      <Textarea
        type="text"
        placeholder="Enter the purpose of the email"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
      />
      <Button
        className="mt-4 w-full cursor-pointer"
        onClick={handleGenerateEmail}
        disabled={loading || userInput.length === 0}
      >
        {loading ? <Loader2 className="animate-spin" /> : "Generate Email"}
      </Button>
    </div>
  );
}

export default AiInputBox;
