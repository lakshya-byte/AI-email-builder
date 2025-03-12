import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import "prismjs/themes/prism-tomorrow.css"; // Choose a theme
import Prism from "prismjs";
import { useEffect } from "react";
import { Copy } from "lucide-react";
import { toast } from "sonner";

const CodeBlock = ({ code, language = "html" }) => {
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <pre className="whitespace-pre-wrap break-after-auto overflow-x-auto overflow-y-auto">
      <code className={`language-${language} text-sm`}>{code}</code>
    </pre>
  );
};

function ViewHtmlDialog({ openDialog, htmlCode, closeDialog }) {
  return (
    <div>
      <Dialog open={openDialog} onOpenChange={closeDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              <div className="flex items-center justify-between">
                HTML Code
                <Copy
                  className=" p-2 m-2 bg-gray-100 rounded-full h-8 w-8 cursor-pointer hover:bg-gray-300"
                  onClick={() => {
                    navigator.clipboard.writeText(htmlCode);
                    toast("HTML code copied to clipboard", {
                      action: {
                        label: "Undo",
                        onClick: () => console.log("Undo"),
                      },
                    });
                  }}
                />
              </div>
            </DialogTitle>
            <DialogDescription asChild>
              <div className="max-h-[400px] max-w-[470px]  overflow-x-auto overflow-y-auto bg-black text-white shadow-md">
                <CodeBlock code={htmlCode} language="html" />
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ViewHtmlDialog;
