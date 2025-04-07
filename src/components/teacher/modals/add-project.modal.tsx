"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { AddProjectForm } from "../forms/add-project-form";
import { EditProjectForm } from "../forms/edit-project-form";
import { ProjectCardProps } from "../project-card";

type mode = "add" | "edit";

export function AddEditProjectModal({
  mode = "add",
  data,
  isOpen,
  setIsOpen,
}: {
  mode: mode;
  data?: ProjectCardProps;
  isOpen?: boolean;
  setIsOpen?: (value: boolean) => void;
}) {
  const [open, setOpen] = useState<boolean>(false);
  // Content
  const TRIGGR = mode == "add" ? "Add Project" : "Edit Project";
  const MODAL_TITLE = mode == "add" ? "Add New Project" : "Edit Project";
  const MODAL_DESCRIPTION =
    mode == "add"
      ? "Create a new project for students to work on."
      : "Modify the displayed project informations";
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
          <Button>{TRIGGR}</Button>
        </DialogTrigger>
      )}
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{MODAL_TITLE}</DialogTitle>
          <DialogDescription>{MODAL_DESCRIPTION}</DialogDescription>
        </DialogHeader>
        {mode == "add" && <AddProjectForm />}
        {mode == "edit" && data && <EditProjectForm {...data} />}
      </DialogContent>
    </Dialog>
  );
}
