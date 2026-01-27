"use client";
import { Button } from "@heroui/react";
import { cn } from "@/lib/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useUploadThing } from "@/utils/uploadthing";
import { useDropzone } from "@uploadthing/react";
import { competitions } from "@/lib/competition";
import { FileText, Loader2, Upload } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useTRPC } from "@/utils/trpc";
import { SubmitFormSkeleton } from "./SubmitFormSkeleton";
import type { CompetitionName } from "../../../../prisma/generated/prisma/enums";
import { format } from "date-fns";

function usePreventRefreshUserDuringUpload(isLoading: boolean) {
  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      if (isLoading) {
        e.preventDefault();
        e.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [isLoading]);
}

export default function SubmitForm({
  comp,
  leaderUserId,
}: {
  comp: CompetitionName;
  leaderUserId: string;
}) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [progress, setProgress] = useState<number | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const uploadThingRoute = competitions.find(
    (competition) => competition.abbreviation === comp.toUpperCase(),
  )?.uploadThingRoute;
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const router = useRouter();
  usePreventRefreshUserDuringUpload(isUploading);
  const { data: userRegisteredComp, isLoading: isLoadingUserRegisteredComp } =
    useQuery(trpc.dashboard.getUserRegisteredComp.queryOptions({ comp }));

  const submitFile = useMutation({
    ...trpc.dashboard.submitCompetitionFile.mutationOptions(),
    onMutate: () => {
      setIsLoading(true);
      toast.loading("Submitting file...", {
        id: "submitting-file",
      });
    },
    onSuccess: () => {
      setIsLoading(false);
      toast.dismiss("submitting-file");
      toast.success("File submitted successfully!");
    },
    onError: (error) => {
      setIsLoading(false);
      toast.dismiss("submitting-file");
      toast.error("Failed to submit file", {
        description: error.message,
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: trpc.dashboard.getUser.queryKey(),
      });
      queryClient.invalidateQueries({
        queryKey: trpc.dashboard.getUserRegisteredComp.queryKey({
          comp,
        }),
      });
      router.refresh();
    },
  });
  //   @ts-expect-error uploadThingRoute is exist
  const { startUpload } = useUploadThing(uploadThingRoute, {
    onBeforeUploadBegin(files) {
      toast.loading(`Presigning URL for file...`, {
        id: "presigning-url",
      });
      return files;
    },
    onUploadBegin: (filename: string) => {
      toast.dismiss("presigning-url");
      setIsUploading(true);
      // toast.info(`Upload has begun for the file`, {
      //     description: `Uploading ${filename}`,
      // });
    },
    onUploadProgress(p) {
      if (p === 0) {
        setProgress(p);
        toast.loading(`Uploading file...`, {
          id: "upload-document",
          description: `Starting upload...`,
        });
      }
      if (p < 100) {
        setProgress(p);
        toast.loading(`Uploading file...`, {
          id: "upload-document",
          description: `${p}%`,
        });
      }
      if (p === 100) {
        setProgress(p);
        toast.loading(`Uploading file...`, {
          id: "upload-document",
          description: `Finalizing upload...`,
        });
      }
    },
    onClientUploadComplete: (res) => {
      setIsUploading(false);
      toast.dismiss("upload-document");
      toast.success(`File uploaded successfully!`);
      submitFile.mutate({
        competitionName: comp,
        leaderUserId,
        fileUrl: res[0]?.ufsUrl as string,
        fileName: res[0]?.name as string,
      });
      queryClient.invalidateQueries({
        queryKey: trpc.dashboard.getUserDocuments.queryKey(),
      });
      setFileName(res[0]?.name as string);
      setFiles([]);
    },
    onUploadError: () => {
      setIsUploading(false);
      toast.dismiss("upload-document");
      toast.error(`Failed to upload file`, {
        description: "Please try again.",
      });
    },
    uploadProgressGranularity: "fine",
  });

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFileName(null);
    setProgress(0);
    if (acceptedFiles.length > 1) {
      toast.error("Only one file is allowed");
      return;
    }

    const file = acceptedFiles[0];
    if (!file) return;

    const allowedMimeTypes = [
      "application/pdf",
      "application/zip",
      "application/x-compressed",
      "application/x-zip-compressed",
      "application/octet-stream",
    ];

    const allowedExtensions = ["pdf", "zip"];
    const fileExtension = file.name.split(".").pop()?.toLowerCase();

    const isValidMime = allowedMimeTypes.includes(file.type);
    const isValidExt =
      fileExtension && allowedExtensions.includes(fileExtension);

    if (!isValidMime && !isValidExt) {
      toast.error("Supported types: .pdf, .zip");
      return;
    }

    setFiles(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  if (isLoadingUserRegisteredComp) return <SubmitFormSkeleton />;

  return (
    <section>
      <h3 className="text-xl font-semibold mb-3 text-center">Your Work</h3>
      <div className="flex items-center justify-center">
        <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              Upload Document
            </h2>
            {!userRegisteredComp?.submissionFileSubmitted ? (
              <>
                <p className="text-sm text-slate-500">
                  Please upload one file of PDF or ZIP format.{" "}
                </p>
                {fileName && (
                  <p className="text-sm text-slate-500">
                    {"File uploaded. You can submit your work."}
                  </p>
                )}
              </>
            ) : (
              <p className="text-sm text-slate-500">
                Your file has been submitted.
              </p>
            )}
          </div>

          {!fileName && !userRegisteredComp?.submissionFileSubmitted && (
            <div
              {...getRootProps()}
              className={cn(
                "relative group cursor-pointer transition-all duration-200",
                "flex flex-col items-center justify-center p-8",
                "border-2 border-dashed rounded-xl",
                isDragActive
                  ? "border-blue-500 bg-blue-50/50 dark:bg-blue-500/10"
                  : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50",
              )}
            >
              <input {...getInputProps()} />
              <div
                className={cn(
                  "mb-4 p-3 rounded-full transition-colors",
                  files.length > 0
                    ? "bg-green-100 text-green-600"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600",
                )}
              >
                {files.length > 0 ? (
                  <FileText className="w-6 h-6" />
                ) : (
                  <Upload className="w-6 h-6" />
                )}
              </div>

              <div className="text-center">
                {files.length > 0 ? (
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-slate-900 dark:text-slate-200 uppercase tracking-wide">
                      Selected File
                    </p>
                    <p className="text-blue-600 dark:text-blue-400 font-semibold truncate max-w-[250px]">
                      {files[0]?.name}
                    </p>
                  </div>
                ) : (
                  <>
                    <p className="text-sm font-medium text-slate-900 dark:text-slate-200">
                      Click to upload{" "}
                      <span className="text-slate-500 font-normal">
                        or drag and drop
                      </span>
                    </p>
                    <p className="text-xs text-slate-500 mt-1">PDF or ZIP</p>
                  </>
                )}
              </div>
            </div>
          )}

          {fileName && !userRegisteredComp?.submissionFileSubmitted && (
            <div
              {...getRootProps()}
              className={cn(
                "relative group cursor-pointer transition-all duration-200",
                "flex flex-col items-center justify-center p-8",
                "border-2 border-dashed rounded-xl",
                isDragActive
                  ? "border-blue-500 bg-blue-50/50 dark:bg-blue-500/10"
                  : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50",
              )}
            >
              <input {...getInputProps()} />
              <div
                className={cn(
                  "mb-4 p-3 rounded-full transition-colors bg-green-100 text-green-600",
                )}
              >
                <FileText className="w-6 h-6" />
              </div>

              <div className="text-center">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-slate-900 dark:text-slate-200 uppercase tracking-wide">
                    Uploaded File
                  </p>
                  <p className="text-blue-600 dark:text-blue-400 font-semibold truncate max-w-[250px]">
                    {fileName}
                  </p>
                  <p className="text-sm font-medium text-slate-900 dark:text-slate-200">
                    Click to upload again{" "}
                    <span className="text-slate-500 font-normal">
                      or drag and drop
                    </span>
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    PDF or ZIP (max. 4MB)
                  </p>
                </div>
              </div>
            </div>
          )}
          {userRegisteredComp?.submissionFileSubmitted && (
            <div
              {...getRootProps()}
              className={cn(
                "relative group cursor-pointer transition-all duration-200",
                "flex flex-col items-center justify-center p-8",
                "border-2 border-dashed rounded-xl",
                isDragActive
                  ? "border-blue-500 bg-blue-50/50 dark:bg-blue-500/10"
                  : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50",
              )}
            >
              <input {...getInputProps()} />
              <div
                className={cn(
                  "mb-4 p-3 rounded-full transition-colors bg-green-100 text-green-600",
                )}
              >
                <FileText className="w-6 h-6" />
              </div>

              <div className="text-center">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-slate-900 dark:text-slate-200 uppercase tracking-wide">
                    File Submitted
                  </p>
                  <p className="text-blue-600 dark:text-blue-400 font-semibold line-clamp-1">
                    {userRegisteredComp?.submissionFileName}
                  </p>
                </div>
              </div>
            </div>
          )}
          {userRegisteredComp?.submissionFileSubmitted && (
            <p className="text-sm text-green-500 mt-2 text-center">
              {`Submitted on ${
                userRegisteredComp.submissionFileCreatedAt
                  ? format(
                      new Date(userRegisteredComp.submissionFileCreatedAt),
                      "EEEE, d MMMM yyyy, HH:mm",
                    )
                  : ""
              }`}
            </p>
          )}

          {(isLoading || isUploading) && (
            <div className="mt-6 space-y-3 bg-slate-50 dark:bg-slate-800/40 p-4 rounded-lg border border-slate-100 dark:border-slate-800">
              <div className="flex justify-between items-center text-xs font-medium">
                <span className="text-slate-600 dark:text-slate-400">
                  {progress === 100 ? "Processing..." : "Uploading..."}
                </span>
                <span className="text-blue-600">{progress}%</span>
              </div>
              <Progress value={progress} className="h-1.5" />
            </div>
          )}

          <div className="mt-6 flex flex-col gap-2">
            <Button
              onClick={() => startUpload(files)}
              isDisabled={
                isLoading ||
                isUploading ||
                !files.length ||
                userRegisteredComp?.submissionFileSubmitted
              }
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-5 rounded-lg shadow-sm transition-transform active:scale-[0.98]"
            >
              {!userRegisteredComp?.submissionFileSubmitted ? (
                <span>
                  {isUploading ? "Uploading..." : "Confirm and Submit"}
                </span>
              ) : (
                <span>{"Submitted"}</span>
              )}
            </Button>

            {files.length > 0 && !isUploading && (
              <Button
                variant="ghost"
                onClick={() => {
                  setFileName(null);
                  setFiles([]);
                }}
                className="w-full text-slate-500 hover:text-red-500"
              >
                Clear Selection
              </Button>
            )}
            {files.length > 0 && isUploading && isLoading && (
              <Button
                variant="ghost"
                onClick={() => {
                  setFileName(null);
                  setFiles([]);
                  setIsLoading(false);
                  setIsUploading(false);
                }}
                className="w-full text-slate-500 hover:text-red-500"
              >
                Cancel Upload
              </Button>
            )}
          </div>
        </div>
      </div>
      <p className="text-xs text-gray-500 mt-2 text-center">
        Work cannot be turned in after the due date
      </p>
    </section>
  );
}
