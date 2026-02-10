"use client";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { FileCheck, Loader2, Upload } from "lucide-react";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import { useDropzone } from "@uploadthing/react";
import { useUploadThing } from "@/utils/uploadthing";
import { type UploadDocumentProps, type UploadThingRoute } from "@/types/types";
import { Label } from "../ui/label";
import { Progress } from "../ui/progress";
import { useQueryClient } from "@tanstack/react-query";
import { validExtensions } from "@/constants/constants";
import { useTRPC } from "@/utils/trpc";
import { cn } from "@/lib/utils";

export default function UploadDocumentDialog({
    isLoading,
    setIsLoading,
    id,
    title,
    type,
    uploadThingRoute,
    setValue,
    userId,
}: UploadDocumentProps) {
    const [progress, setProgress] = useState<number | null>(null);
    const [isUploading, setIsUploading] = useState<boolean>(false);
    const [activeDialog, setActiveDialog] = useState<number | null>(null);
    const [files, setFiles] = useState<File[]>([]);
    const trpc = useTRPC();
    const queryClient = useQueryClient();
    const [uploadThingRouteUpload, setUploadThingRouteUpload] =
        useState<UploadThingRoute | null>(null);

    const { startUpload } = useUploadThing(uploadThingRoute, {
        onBeforeUploadBegin(files) {
            toast.loading(`Presigning URL for File...`, {
                id: "presigning-url",
            });
            return files;
        },
        onUploadBegin: (filename: string) => {
            toast.dismiss("presigning-url");
            setIsUploading(true);
            setIsLoading(true);
            // toast.info(`Upload has begun for the File`, {
            //   description: `Uploading ${filename}`,
            // });
        },
        onUploadProgress(p) {
            if (p === 0) {
                setProgress(p);
                toast.loading(`Uploading File...`, {
                    id: "upload-document",
                    description: `Starting upload...`,
                });
            }
            if (p < 100) {
                setProgress(p);
                toast.loading(`Uploading File...`, {
                    id: "upload-document",
                    description: `${p}%`,
                });
            }
            if (p === 100) {
                setProgress(p);
                toast.loading(`Uploading File...`, {
                    id: "upload-document",
                    description: `Finalizing upload...`,
                });
            }
        },
        onClientUploadComplete: (res) => {
            setIsUploading(false);
            setIsLoading(false);
            toast.dismiss("upload-document");
            toast.success(`File uploaded successfully!`);
            setValue(
                uploadThingRouteUpload as UploadThingRoute,
                res[0]?.ufsUrl as string,
                {
                    shouldValidate: true,
                },
            );
            queryClient.invalidateQueries({
                queryKey: trpc.dashboard.getDocumentsByUserId.queryKey({
                    userId,
                }),
            });
            setActiveDialog(null);
            setFiles([]);
        },
        onUploadError: (e) => {
            setIsUploading(false);
            setIsLoading(false);
            toast.dismiss("upload-document");
            toast.dismiss("presigning-url");
            toast.error(`Failed to upload File`, {
                description: e.message,
            });
        },
        uploadProgressGranularity: "fine",
    });

    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (!acceptedFiles || acceptedFiles.length === 0) return;

        if (acceptedFiles.length > 1) {
            toast.error("Only one file is allowed");
            return;
        }

        const file = acceptedFiles[0];
        const fileType = file?.type; // e.g., "image/jpeg" or "application/pdf"
        const fileSize = file?.size;
        const extension = file?.name.split(".").pop()?.toLowerCase();

        const isImage = fileType?.startsWith("image/");
        const isPdf = fileType === "application/pdf";
        
    if (!isImage && !isPdf) {
      toast.error("Only Image or PDF file are allowed");
      return;
    }

    if (!extension || !validExtensions.includes(extension)) {
      toast.error("Supported types: jpg, jpeg, png, webp, & pdf");
      return;
    }
    const maxSize = 8 * 1024 * 1024;
    const limitLabel = "8MB";

    if (fileSize && fileSize > maxSize) {
      toast.error(`File size must be less than ${limitLabel}`);
      return;
    }


        setFiles(acceptedFiles);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        maxFiles: 1,
    });
    return (
        <div className="grid w-full max-w-sm items-center gap-3">
            <Label htmlFor={title}>Upload {title}</Label>

            <Dialog
                open={activeDialog === id}
                onOpenChange={(open: boolean) => {
                    if (isUploading || isLoading) return;
                    if (open) setActiveDialog(id);
                    else {
                        setFiles([]);
                        setActiveDialog(null);
                    }
                }}
            >
                <DialogTrigger asChild>
                    <Button
                        className=""
                        variant={"outline"}
                        onClick={() => {
                            setUploadThingRouteUpload(
                                uploadThingRoute as UploadThingRoute,
                            );
                            if (!isLoading) setActiveDialog(id);
                            if (isLoading) return;
                        }}
                    >
                        <Upload className="w-4 h-4"></Upload>
                    </Button>
                </DialogTrigger>
                <DialogContent className="max-w-sm sm:max-w-xl bg-transparent backdrop-glass-lg">
                    <DialogHeader>
                        <DialogTitle>Upload {title}</DialogTitle>
                        <DialogDescription>
                            Click save when you&apos;re done.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                        {!isUploading && (
                            <div
                                {...getRootProps()}
                                className="group outline-none"
                            >
                                <input {...getInputProps()} />
                                <div
                                    className={cn(
                                        "relative flex flex-col items-center justify-center p-10",
                                        "border-2 border-dashed rounded-xl transition-all duration-200",
                                        "cursor-pointer overflow-hidden",
                                        isDragActive
                                            ? "border-blue-500 bg-blue-50/20 dark:bg-blue-500/10"
                                            : "border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-600 bg-slate-50/50 dark:bg-slate-900/50",
                                    )}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-100/20 dark:to-slate-800/20 pointer-events-none" />

                                    <div className="relative flex flex-col items-center text-center">
                                        <div
                                            className={cn(
                                                "mb-4 p-4 rounded-full transition-transform group-hover:scale-110 duration-200",
                                                files.length > 0
                                                    ? "bg-green-100 dark:bg-green-900/30 text-green-600"
                                                    : "bg-slate-100 dark:bg-slate-800 text-slate-500",
                                            )}
                                        >
                                            {files.length > 0 ? (
                                                <FileCheck className="w-8 h-8" />
                                            ) : (
                                                <Upload className="w-8 h-8" />
                                            )}
                                        </div>

                                        <div className="space-y-1">
                                            <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
                                                {files.length > 0
                                                    ? "File ready for upload"
                                                    : "Choose files or drag and drop"}
                                            </h3>

                                            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-[240px]">
                                                {type === "twibbon"
                                                    ? "Max 8MB • Max 1 File • PDF, Image"
                                                    : "Max 4MB • Max 1 File • Image"}{" "}
                                            </p>

                                            {files[0]?.name && (
                                                <div className="mt-4 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 rounded-md">
                                                    <p className="text-xs font-medium text-blue-700 dark:text-blue-300 truncate max-w-[200px]">
                                                        {files[0].name}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        {isLoading && isUploading && activeDialog === id && (
                            <>
                                <div className="flex justify-between">
                                    <p>
                                        {progress === 0
                                            ? "Starting upload..."
                                            : progress === 100
                                              ? "Finalizing upload..."
                                              : "Uploading..."}
                                    </p>
                                    <p>
                                        {progress === 100 ? `` : `${progress}%`}
                                    </p>
                                </div>
                                <Progress
                                    value={progress as number}
                                    className="w-full"
                                />
                            </>
                        )}
                    </div>
                    {!isUploading && (
                        <DialogFooter>
                            {files.length > 0 && (
                                <Button
                                    variant={"default"}
                                    className="cursor-pointer mt-2 sm:mt-0 sm:mr-auto"
                                    disabled={isLoading || isUploading}
                                    onClick={() =>
                                        startUpload(files, {
                                            targetUserId: userId,
                                        })
                                    }
                                >
                                    Upload {files.length} file
                                </Button>
                            )}
                            {files.length === 0 && (
                                <Button
                                    variant={"default"}
                                    className="cursor-pointer mt-2 sm:mt-0 sm:mr-auto"
                                    onClick={() =>
                                        startUpload(files, {
                                            targetUserId: userId,
                                        })
                                    }
                                    disabled={true}
                                >
                                    Upload
                                </Button>
                            )}
                            {files.length > 0 && !isUploading && (
                                <Button
                                    variant="outline"
                                    disabled={isLoading || isUploading}
                                    className="cursor-pointer"
                                    onClick={() => {
                                        setFiles([]);
                                    }}
                                >
                                    Cancel Selection
                                </Button>
                            )}
                        </DialogFooter>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
