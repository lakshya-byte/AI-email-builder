"use client";

import Image from "next/image";
import React, { useEffect } from "react";
import { Button } from "../ui/button";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useAuth } from "@clerk/nextjs";
import { Authenticated, Unauthenticated, useQuery } from "convex/react";
import { useUserDetail } from "../../app/provider";
import {  LayoutDashboard } from "lucide-react";

const Header = () => {
  const { user, isSignedIn } = useUser();
  const createUser = useMutation(api.user.createUser);
  const { getToken } = useAuth();
  const { storedUser } = useUserDetail();

  useEffect(() => {
    const addUserToConvex = async () => {
      if (!user) {
        console.warn("Warning: No user found.");
        return;
      }

      try {
        const token = await getToken();

        if (!token) {
          console.error("Error: Clerk auth token is missing.");
          return;
        }

        await createUser({
          email: user.primaryEmailAddress?.emailAddress,
          name: user.fullName,
          picture: user.imageUrl || "",
          token,
        });

        localStorage.setItem("user", JSON.stringify(user));

        // console.log("✅ User successfully added to Convex");
      } catch (error) {
        console.error("❌ Error adding user to Convex:", error);
      }
    };

    addUserToConvex();
  }, [user, createUser, getToken]);

//   console.log("Current user:", storedUser);

  return (
    <div className="flex justify-between items-center shadow-lg bg-amber-400 rounded-md p-4">
      <Link href="/" className="cursor-pointer">
        <Image src="/logo.svg" alt="logo" width={180} height={140} priority />
      </Link>

      <div>
        <Unauthenticated>
          <SignInButton>
            <Button
              className="bg-black hover:bg-amber-100 cursor-pointer text-white"
              variant="outline"
            >
              Get Started
            </Button>
          </SignInButton>
        </Unauthenticated>

        <Authenticated>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <Link href="/dashboard">
                <span className="flex items-center gap-2">
                  <LayoutDashboard />
                  Dashboard
                </span>
              </Link>
            </Button>
            <UserButton
              appearance={{
                elements: {
                  userButtonAvatarBox: { width: "40px", height: "40px" },
                  userButtonMenuButtonIcon: { width: "20px", height: "20px" },
                  userButtonMenuButtonLabel: { fontSize: "12px" },
                },
              }}
            />
          </div>
        </Authenticated>
      </div>
    </div>
  );
};

export default Header;
