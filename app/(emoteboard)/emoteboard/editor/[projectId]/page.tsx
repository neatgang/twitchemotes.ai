"use client";


import { Editor } from "@/app/features/editor/components/editor";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

const EditorProjectIdPage = () => {

  return (
    <>
      <Editor />
    </>
  );
};

export default EditorProjectIdPage;