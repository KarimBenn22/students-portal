"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { AddProjectForm } from "../forms/add-project-form";
import { EditProjectForm } from "../forms/edit-project-form";
import { TeacherProject } from "@/fetchs/teacher.fetcher";

type mode = "add" | "edit";

export function AddEditProjectModal({
  mode = "add",
  data,
  isOpen,
  setIsOpen,
}: {
  mode: mode;
  data?: TeacherProject;
  isOpen?: boolean;
  setIsOpen?: (value: boolean) => void;
}) {
  const [open, setOpen] = useState<boolean>(false);
  const closeModal = () => {
    setOpen(false);
    setIsOpen?.(false);
  };
  // Content
  const TRIGGER = mode === "add" ? "اضافة مشروع" : "تعديل المشروع";
  const MODAL_TITLE = mode === "add" ? "اضافة مشروع جديد" : "تعديل المشروع";
  const MODAL_DESCRIPTION =
    mode == "add"
      ? "اضف مشروعا جديدا للطلبة"
      : "قم بتعديل البيانات الموضحة";
  useEffect(() => {
    setOpen(isOpen ?? false);
  }, [isOpen]);
  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        setOpen(value);
        setIsOpen?.(value);
      }}
    >
      {mode === "add" && (
        <DialogTrigger asChild>
          <Button size="sm">{TRIGGER}</Button>
        </DialogTrigger>
      )}
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-right">{MODAL_TITLE}</DialogTitle>
          <DialogDescription className="text-right">{MODAL_DESCRIPTION}</DialogDescription>
        </DialogHeader>
        {mode == "add" && <AddProjectForm onSuccess={closeModal} />}
        {mode == "edit" && data && <EditProjectForm data={{ ...data }} onSuccess={closeModal} />}
      </DialogContent>
    </Dialog>
  );
}
