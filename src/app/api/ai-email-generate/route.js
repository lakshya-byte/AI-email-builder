import { GenerateEmailTemplateAIModel } from "@/config/AiModel";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    console.log("Received request");
    
    const { prompt, userEmail, tId } = await req.json();

    const result = await GenerateEmailTemplateAIModel.sendMessage(prompt);

    let aiResp = result?.response?.text() ; 
    console.log("AI Response:", aiResp);


    return NextResponse.json(JSON.parse(aiResp)); 
  } catch (error) {
    console.error("Error occurred:", error);
    return NextResponse.json(
      { error: "Failed to generate email template", details: error.message },
      { status: 500 }
    );
  }
}
