import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { SignInButton } from "@clerk/nextjs";

const Hero = () => {
  return (
    <div className="flex flex-col justify-center items-center  py-20 ">
      <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold px-10 md:px-28 lg:px-48 xl:px-64 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
        AI-Powered Email Builder
      </h1>
      <div className="flex flex-col justify-center items-center p-5 mt-5 text-lg md:text-xl lg:text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-500 to-purple-500">
        <span className="pt-2">
          Create professional and effective emails with ease using our
        </span>
        <div>AI-powered email builder.</div>
      </div>
      <div className="flex flex-row justify-center items-center">
        <Button className="bg-black hover:bg-amber-400 cursor-pointer text-white m-4">
          <SignInButton>
            <span>Try Demo</span>
          </SignInButton>
        </Button>
        <Button className="bg-amber-400 hover:bg-amber-500 cursor-pointer text-black">
          <SignInButton>
            <span>Get Started</span>
          </SignInButton>
        </Button>
      </div>
      <Image src={"/landing.png"} alt="hero" width={1000} height={1000} />
    </div>
  );
};

export default Hero;
