"use client";

import React, { useContext, useEffect, useState } from "react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ClerkProvider } from "@clerk/nextjs";
import { useAuth } from "@clerk/nextjs";
import { ConvexReactClient } from "convex/react";
import { UserDetailContext } from "../context/UserDetailContext";
import { ScreenSizeContext } from "../context/ScreenSizeContext";
import { DragDropElementContext } from "../context/DragDropElement";
import { EmailTemplateContext } from "../context/EmailTemplateContext";
import { SelectedElementContext } from "../context/SelectedElementContext";
import { Toaster } from "@/components/ui/sonner";

function Provider({ children }) {
  const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL);

  const [storedUser, setStoredUser] = useState(null);
  const [screenSize, setScreenSize] = useState("desktop");
  const [dragDropElement, setDragDropElement] = useState(null);
  const [emailTemplate, setEmailTemplate] = useState([]);
  const [selectedElement, setSelectedElement] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        const storedEmailTemplate = JSON.parse(
          localStorage.getItem("emailTemplate")
        );
        setEmailTemplate(storedEmailTemplate ?? []);
        if (storedUser && storedUser.emailAddresses[0]?.emailAddress) {
          setStoredUser(storedUser);
        } else {
          console.warn("Stored user is missing email or is null");
        }
      } catch (error) {
        console.error("Error parsing stored user from localStorage:", error);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("emailTemplate", JSON.stringify(emailTemplate));
    }
  }, [emailTemplate, selectedElement]);

  useEffect(() => {
    let updatedEmailTemplate = [];
    if (selectedElement) {
      emailTemplate.forEach((item) => {
        if (item.id === selectedElement?.layout?.id) {
          updatedEmailTemplate.push(selectedElement.layout);
        } else {
          updatedEmailTemplate.push(item);
        }
      });
      setEmailTemplate(updatedEmailTemplate);
    }
  }, [selectedElement]);

  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        <UserDetailContext.Provider value={{ storedUser, setStoredUser }}>
          <ScreenSizeContext.Provider value={{ screenSize, setScreenSize }}>
            <DragDropElementContext.Provider
              value={{ dragDropElement, setDragDropElement }}
            >
              <EmailTemplateContext.Provider
                value={{ emailTemplate, setEmailTemplate }}
              >
                <SelectedElementContext.Provider
                  value={{ selectedElement, setSelectedElement }}
                >
                  {children}
                  <Toaster />
                </SelectedElementContext.Provider>
              </EmailTemplateContext.Provider>
            </DragDropElementContext.Provider>
          </ScreenSizeContext.Provider>
        </UserDetailContext.Provider>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}

export default Provider;

export const useUserDetail = () => {
  return useContext(UserDetailContext);
};

export const useScreenSize = () => {
  return useContext(ScreenSizeContext);
};

export const useDragDropElement = () => {
  return useContext(DragDropElementContext);
};

export const useEmailTemplate = () => {
  return useContext(EmailTemplateContext);
};

export const useSelectedElement = () => {
  return useContext(SelectedElementContext);
};
