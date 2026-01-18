"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import {
    Field,
    FieldContent,
    FieldError,
    FieldLabel,
} from "@/components/ui/field";
import { UserAvatar } from "@/components/general/UserProfile";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { cn } from "@/lib/utils";
import ProfileFormSkeleton from "@/components/dashboard/profile/ProfileFormSkeleton";
import { useTRPC } from "@/utils/trpc";
import { profileSchema } from "@/lib/schema";
import { authClient } from "@/lib/auth-client";
import { educations } from "@/constants/constants";

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

function ProfileUpdateForm() {
    const { data: session } = authClient.useSession();
    const trpc = useTRPC();
    const { data: user, isLoading: isLoadingUser } = useQuery({
        ...trpc.dashboard.getUser.queryOptions(),
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
    });
    const queryClient = useQueryClient();
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isEditing, setIsEditing] = useState<boolean>(false);

    const updateProfile = useMutation({
        ...trpc.dashboard.updateProfile.mutationOptions(),

        onMutate: () => {
            setIsLoading(true);
            toast.loading("Updating profile...", {
                id: "update-profile",
            });
        },
        onSuccess: () => {
            setIsLoading(false);
            toast.dismiss("update-profile");
            toast.success("Profile updated");
            setIsEditing(false);
        },
        onError: (error) => {
            setIsLoading(false);
            toast.dismiss("update-profile");
            toast.error("Failed to update profile", {
                description: error.message,
            });
            console.log(error.message);
        },
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: trpc.dashboard.getUser.queryKey(),
            });
            router.replace("/dashboard/profile");
            router.refresh();
        },
    });

    usePreventRefreshUserDuringUpload(isLoading);

    useEffect(() => {
        const toastType = searchParams.get("notif");
        if (toastType === "incomplete_profile") {
            toast.warning(
                "Please complete your profile first before uploading documents & register to any competitions.",
                {
                    duration: 5000,
                },
            );
        }
    }, [searchParams]);

    const {
        handleSubmit,
        control,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<profileSchema>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            name: "",
            phoneNumber: "",
            domicile: "",
            institution: "",
            major: "",
            education: undefined,
            semester: 1,
        },
    });

    useEffect(() => {
        if (session?.user && !isEditing) {
            setTimeout(() => {
                reset({
                    name: user?.name as string,
                    phoneNumber: user?.phoneNumber ?? "",
                    domicile: user?.domicile ?? "",
                    institution: user?.institution ?? "",
                    major: user?.major ?? "",
                    education: user?.education ?? undefined,
                    semester: (user?.semester as unknown as number) ?? 1,
                });
            }, 500);
        }
    }, [session?.user, reset, user, isEditing]);

    if (isLoadingUser) return <ProfileFormSkeleton />;

    async function onSubmit(formData: profileSchema) {
        const data = {
            ...formData,
            email: session?.user?.email,
        };
        console.log("Form data: ", data);
        updateProfile.mutate(data);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <section>
                <div className="mt-12 mb-12">
                    <div className="flex flex-col items-center justify-center gap-5">
                        <div>
                            {user?.image && (
                                <div className="relative mb-5">
                                    <UserAvatar
                                        src={user.image as string}
                                        alt={user.name as string}
                                        className="w-32 h-32 border-2 border-primary/50"
                                    />
                                    {/*<div
                                        className={cn(
                                            "",
                                            !isEditing ? "hidden" : "",
                                        )}
                                    >
                                        <UploadDialog
                                            isLoading={isLoading}
                                            setIsLoading={setIsLoading}
                                            setIsEditing={setIsEditing}
                                        />
                                    </div>*/}
                                </div>
                            )}
                        </div>
                        <div>
                            <Button
                                variant="outline"
                                type="button"
                                className="cursor-pointer"
                                onClick={() =>
                                    setIsEditing((prev) => {
                                        if (prev) {
                                            setTimeout(() => {
                                                reset();
                                            }, 500);
                                        }
                                        return !prev;
                                    })
                                }
                            >
                                {isEditing ? "Cancel" : "Edit Profile"}
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="mt-6 space-y-6 grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-5">
                    <div className="grid grid-cols-1 gap-3">
                        <div className="space-y-2">
                            <Controller
                                name="name"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor={field.name}>
                                            Fullname
                                        </FieldLabel>
                                        <Input
                                            {...field}
                                            id={field.name}
                                            aria-invalid={fieldState.invalid}
                                            disabled={!isEditing}
                                        />
                                        {fieldState.invalid && (
                                            <FieldError
                                                errors={[fieldState.error]}
                                            />
                                        )}
                                    </Field>
                                )}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email" className="block text-sm">
                            Email
                        </Label>
                        <Input
                            disabled
                            placeholder={session?.user?.email as string}
                        />
                    </div>
                    <div className="space-y-2">
                        <Controller
                            name="phoneNumber"
                            control={control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor={field.name}>
                                        Phone Number
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id={field.name}
                                        aria-invalid={fieldState.invalid}
                                        disabled={!isEditing}
                                    />
                                    {fieldState.invalid && (
                                        <FieldError
                                            errors={[fieldState.error]}
                                        />
                                    )}
                                </Field>
                            )}
                        />
                    </div>
                    <div className="space-y-2">
                        <Controller
                            name="domicile"
                            control={control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor={field.name}>
                                        Domicile
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id={field.name}
                                        aria-invalid={fieldState.invalid}
                                        disabled={!isEditing}
                                    />
                                    {fieldState.invalid && (
                                        <FieldError
                                            errors={[fieldState.error]}
                                        />
                                    )}
                                </Field>
                            )}
                        />
                    </div>
                    <div className="space-y-2">
                        <Controller
                            name="institution"
                            control={control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor={field.name}>
                                        Institution/School
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id={field.name}
                                        aria-invalid={fieldState.invalid}
                                        disabled={!isEditing}
                                    />
                                    {fieldState.invalid && (
                                        <FieldError
                                            errors={[fieldState.error]}
                                        />
                                    )}
                                </Field>
                            )}
                        />
                    </div>
                    <div className="space-y-2">
                        <Controller
                            name="major"
                            control={control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor={field.name}>
                                        Major
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id={field.name}
                                        aria-invalid={fieldState.invalid}
                                        disabled={!isEditing}
                                    />
                                    {fieldState.invalid && (
                                        <FieldError
                                            errors={[fieldState.error]}
                                        />
                                    )}
                                </Field>
                            )}
                        />
                    </div>
                    <div className="space-y-2">
                        <Controller
                            name="education"
                            control={control}
                            render={({ field, fieldState }) => (
                                <Field
                                    orientation="responsive"
                                    data-invalid={fieldState.invalid}
                                >
                                    <FieldContent>
                                        <FieldLabel htmlFor="form-rhf-select-language">
                                            Current Education
                                        </FieldLabel>
                                    </FieldContent>
                                    <Select
                                        name={field.name}
                                        value={field.value}
                                        onValueChange={field.onChange}
                                        disabled={!isEditing}
                                    >
                                        <SelectTrigger
                                            id="form-rhf-select-language"
                                            aria-invalid={fieldState.invalid}
                                            className="min-w-[120px]"
                                        >
                                            <SelectValue placeholder="Select" />
                                        </SelectTrigger>
                                        <SelectContent
                                            position="item-aligned"
                                            className="bg-transparent backdrop-glass-lg"
                                        >
                                            {educations.map((education) => (
                                                <SelectItem
                                                    key={education.key}
                                                    value={education.key}
                                                    className="hover:bg-white/20! focus:bg-white/20 "
                                                >
                                                    {education.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {fieldState.invalid && (
                                        <FieldError
                                            errors={[fieldState.error]}
                                        />
                                    )}
                                </Field>
                            )}
                        ></Controller>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="semester" className="text-sm">
                                Current Semester
                            </Label>
                        </div>
                        <Controller
                            name="semester"
                            control={control}
                            rules={{ required: true }}
                            render={({
                                field: { value, onChange, onBlur, name, ref },
                            }) => (
                                <Input
                                    className="w-full"
                                    placeholder="1"
                                    value={value}
                                    onChange={(e) => {
                                        const newValue = e.target.value;
                                        const regex = /^(|[1-8])$/;
                                        if (regex.test(newValue)) {
                                            onChange(newValue);
                                        }
                                    }}
                                    onBlur={onBlur}
                                    name={name}
                                    ref={ref}
                                    disabled={!isEditing}
                                />
                            )}
                        />
                        {errors.semester && (
                            <p className="text-destructive text-sm">
                                {errors.semester.message}
                            </p>
                        )}
                    </div>
                </div>
                <div className="w-full flex justify-center items-center">
                    <Button
                        className={`w-full max-w-lg mt-12 border text-white bg-white/10 hover:bg-white/25 ${
                            isLoading ? "cursor-not-allowed" : "cursor-pointer"
                        }`}
                        disabled={isSubmitting || !isEditing}
                        type="submit"
                    >
                        {isSubmitting ? (
                            <div className="flex gap-2">
                                <span>Updating...</span>
                                <Loader2 className="animate-spin" />
                            </div>
                        ) : (
                            "Update"
                        )}
                    </Button>
                </div>
            </section>
        </form>
    );
}

export default ProfileUpdateForm;
