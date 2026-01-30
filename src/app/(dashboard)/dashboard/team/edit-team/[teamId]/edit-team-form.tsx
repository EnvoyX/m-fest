"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, useTransition } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { type Member, type Team, type User } from "@/types/types";
import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { useQuery } from "@tanstack/react-query";
import { useTRPC } from "@/utils/trpc";
import { trim } from "es-toolkit";

function TeamForm({ team }: { team: Team }) {
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const trpc = useTRPC();
  const { data: user } = useQuery({
    ...trpc.dashboard.getUser.queryOptions(),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
  const teamSchema = z.object({
    leaderName: z.string().min(5, "Name must be leader's fullname"),
    leaderEmail: z.email("Invalid email").min(1, "Leader's email is required"),
    leaderPhoneNumber: z
      .string()
      .regex(/^(\+?\d{9,15})$/, "Invalid phone number"),
    teamInstitution: z.string().min(1, "Team's institution is required"),
    teamName: z.string().min(1),
    members: z
      .array(
        z.object({
          name: z.string().min(1, "Name must be member's fullname"),
          email: z.email("Invalid email"),
          institution: z.string().min(1, "Institution is required"),
          role: z.enum(["Leader", "Member"]),
        }),
      )
      .min(3, "Minimum 3 members required")
      .max(5, "Maximum 5 members allowed"),
  });

  type teamSchema = z.infer<typeof teamSchema>;
  const {
    handleSubmit,
    control,
    reset,
    getValues,
    setValue,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<teamSchema>({
    resolver: zodResolver(teamSchema),
    defaultValues: {
      leaderName: (user?.name as string) ?? "",
      leaderEmail: (user?.email as string) ?? "",
      leaderPhoneNumber: (user?.phoneNumber as string) ?? "",
      teamInstitution: (team.teamInstitution as string) ?? "",
      teamName: (team.name as string) ?? "",
      members: [
        ...team.members
          .sort((a: Member, b: Member) => (a.role === "Leader" ? -1 : 1))
          .map((member: Member) => {
            return {
              name:
                member.userId === user?.id
                  ? user?.name
                  : (member.name as string),
              email: (member.email as string) ?? "",
              institution: (member.institution as string) ?? "",
              userId: (member.userId as string) ?? "",
              role: member.role as "Leader" | "Member",
            };
          }),
      ],
    },
  });

  const hasInitialized = useRef(false);
  useEffect(() => {
    if (!user || hasInitialized.current) return;

    reset({
      leaderName: (user?.name as string) ?? "",
      leaderEmail: (user?.email as string) ?? "",
      leaderPhoneNumber: user?.phoneNumber ?? "",
      teamInstitution: team.teamInstitution ?? "",
      teamName: (team.name as string) ?? "",
      members: [
        ...team.members
          .sort((a: Member, b: Member) => (a.role === "Leader" ? -1 : 1))
          .map((member: Member) => {
            return {
              name:
                member.userId === user?.id
                  ? user?.name
                  : (member.name as string),
              email: (member.email as string) ?? "",
              institution: (member.institution as string) ?? "",
              userId: (member.userId as string) ?? "",
              role: member.role as "Leader" | "Member",
            };
          }),
      ],
    });

    hasInitialized.current = true;
  }, [user, reset, team]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "members",
  });

  async function onSubmit(formData: teamSchema) {
    setIsLoading(true);
    toast.loading("Editing team....", {
      id: "edit-team",
    });
    if (formData.members.length < 3) {
      toast.dismiss("edit-team");
      setIsLoading(false);
      toast.error("You must have at least 3 team members!");
      return;
    }
    if (formData.members.length > 5) {
      toast.dismiss("edit-team");
      setIsLoading(false);
      toast.error("You cannot have more than 5 members!");
      return;
    }

    const members = formData.members;
    const differentInstitution = members.filter(
      (member) => member.institution !== formData.teamInstitution,
    );
    if (differentInstitution.length > 0) {
      toast.dismiss("edit-team");
      setIsLoading(false);
      toast.error("All members must be from the same institution!", {
        description: `Members with different institution: ${differentInstitution
          .map((member) => member.name)
          .join(", ")} must match with team's institution`,
        duration: 5000,
      });
      members.forEach((member, index) => {
        if (differentInstitution.includes(member)) {
          setError(`members.${index}.institution`, {
            message: "All members must be from the same institution!",
          });
        }
      });
      return;
    }

    try {
      const res = await fetch("/api/team/edit-team", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user?.id,
          email: user?.email,
          teamId: team.id,
          ...formData,
        }),
      });

      setIsLoading(false);

      if (res.ok) {
        toast.dismiss("edit-team");
        toast.success("Team edited successfully!");
        router.refresh();
        startTransition(() => {
          router.push("/dashboard/team");
        });
      } else {
        const { error, success } = await res.json();
        toast.dismiss("edit-team");
        toast.error("Failed to edit team", {
          description: error,
          duration: 5000,
        });
        // console.log(error);
      }
    } catch (error) {
      setIsLoading(false);
      toast.dismiss("edit-team");
      toast.error("Failed to edit team", {
        description: (error as Error).message,
        duration: 5000,
      });
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="">
      <section>
        <div className="mt-6 space-y-6 grid grid-cols-1 gap-3 lg:gap-5">
          <div className="space-y-2">
            <Controller
              name="teamName"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor={field.name}
                    className="font-bold text-xl"
                  >
                    Team Name
                  </FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    className="mb-12"
                    onBlur={(e) => {
                      e.target.value = trim(e.target.value);
                    }}
                    onMouseLeave={() => {
                      const value = getValues("teamName");
                      if (!value) {
                        return;
                      }
                      setValue("teamName", trim(value));
                    }}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>
          <div className="space-y-2">
            <div className="space-y-2">
              <Controller
                name="leaderName"
                control={control}
                render={({ field, fieldState }) => (
                  <Field
                    orientation="responsive"
                    data-invalid={fieldState.invalid}
                  >
                    <FieldContent>
                      <FieldLabel htmlFor="form-rhf">Leader Name</FieldLabel>
                    </FieldContent>
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      disabled
                      readOnly
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>
            <div className="space-y-2">
              <Controller
                name="leaderEmail"
                control={control}
                render={({ field, fieldState }) => (
                  <Field
                    orientation="responsive"
                    data-invalid={fieldState.invalid}
                  >
                    <FieldContent>
                      <FieldLabel htmlFor="form-rhf">Leader Email</FieldLabel>
                    </FieldContent>
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      disabled
                      readOnly
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>
            <div className="space-y-2">
              <Controller
                name="leaderPhoneNumber"
                control={control}
                render={({ field, fieldState }) => (
                  <Field
                    orientation="responsive"
                    data-invalid={fieldState.invalid}
                  >
                    <FieldContent>
                      <FieldLabel htmlFor="form-rhf">
                        Leader Phone Number
                      </FieldLabel>
                    </FieldContent>
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      disabled
                      readOnly
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>
            <div className="space-y-2">
              <Controller
                name="teamInstitution"
                control={control}
                render={({ field, fieldState }) => (
                  <Field
                    orientation="responsive"
                    data-invalid={fieldState.invalid}
                  >
                    <FieldContent>
                      <FieldLabel htmlFor="form-rhf">
                        Team Institution/School
                      </FieldLabel>
                    </FieldContent>
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      onBlur={(e) => {
                        e.target.value = trim(e.target.value);
                      }}
                      onMouseLeave={() => {
                        const value = getValues("teamInstitution");
                        if (!value) {
                          return;
                        }
                        setValue("teamInstitution", trim(value));
                      }}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Team Members</h3>
            {/* Index starts from 0 */}
            {fields.map((field, index) => (
              <div key={field.id} className="space-y-2 border p-3 rounded-lg">
                <h1 className="mb-5">Member {index + 1}</h1>
                <Controller
                  name={`members.${index}.name`}
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>
                        Member&apos;s Name
                      </FieldLabel>
                      <Input
                        {...field}
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        readOnly={index === 0}
                        disabled={index === 0}
                        onBlur={(e) => {
                          e.target.value = trim(e.target.value);
                        }}
                        onMouseLeave={() => {
                          const value = getValues(`members.${index}.name`);
                          if (!value) {
                            return;
                          }
                          setValue(`members.${index}.name`, trim(value));
                        }}
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name={`members.${index}.email`}
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>
                        Member&apos;s Email
                      </FieldLabel>
                      <Input
                        {...field}
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        readOnly={index === 0}
                        disabled={index === 0}
                        onBlur={async (event) => {
                          event.target.value = trim(
                            event.target.value,
                          ).toLowerCase();
                          const email = trim(event.target.value).toLowerCase();
                          if (email) {
                            try {
                              toast.loading("Checking member...", {
                                id: "checking-user",
                              });
                              const res = await fetch(
                                `/api/user/by-email?email=${email}`,
                              );
                              const user = (await res.json()) as User;

                              if (res.ok && user) {
                                toast.dismiss("checking-user");
                                const userName = user.name;
                                const userInstitution = user.institution;
                                toast.success(
                                  `${userName} is a registered member with email ${email}`,
                                );

                                // Update value of the userName
                                const values = getValues();
                                values.members[index].name = userName as string;
                                values.members[index].institution =
                                  userInstitution as string;
                                reset(values);
                              } else {
                                toast.dismiss("checking-user");
                                throw new Error(user.error);
                              }
                            } catch (error) {
                              toast.dismiss("checking-user");
                              toast.error("Failed to check member", {
                                description: (error as Error).message,
                                duration: 5000,
                              });
                            }
                          }
                        }}
                        onMouseLeave={(e) => {
                          const value = getValues(`members.${index}.email`);
                          if (!value) {
                            return;
                          }
                          setValue(
                            `members.${index}.email`,
                            trim(value).toLowerCase(),
                          );
                        }}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (value.includes("@")) {
                            field.onChange(value.replace(/@.*/, "@gmail.com"));
                          } else {
                            field.onChange(value);
                          }
                        }}
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name={`members.${index}.institution`}
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>
                        Member&apos;s Institution/School
                      </FieldLabel>
                      <Input
                        {...field}
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        onBlur={(e) => {
                          e.target.value = trim(e.target.value);
                        }}
                        onMouseLeave={() => {
                          const value = getValues(
                            `members.${index}.institution`,
                          );
                          if (!value) {
                            return;
                          }
                          setValue(`members.${index}.institution`, trim(value));
                        }}
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name={`members.${index}.role`}
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>
                        Member&apos;s Role
                      </FieldLabel>
                      <Input
                        {...field}
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        readOnly
                        disabled
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                {errors.members?.message && (
                  <p className="text-destructive text-sm">
                    {errors.members.message as string}
                  </p>
                )}

                <div className="flex justify-between items-center w-full mt-5 max-sm:flex-col gap-4">
                  {fields.length < 5 && index === fields.length - 1 && (
                    <Button
                      type="button"
                      variant={"outline"}
                      onClick={() =>
                        append({
                          name: "",
                          email: "",
                          institution: "",
                          role: "Member",
                        })
                      }
                      className="cusor-pointer"
                    >
                      Add Member
                    </Button>
                  )}
                  {index !== 0 && (
                    <Button
                      type="button"
                      variant={"destructive"}
                      onClick={() => remove(index)}
                      className="cursor-pointer"
                    >
                      Remove Member
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full flex justify-center items-center">
          <Button
            className={`w-full max-w-lg mt-12 border text-white bg-white/10 hover:bg-white/25 ${
              isLoading ? "cursor-not-allowed" : "cursor-pointer"
            }`}
            disabled={isSubmitting || fields.length < 3 || isPending}
            type="submit"
          >
            {isSubmitting || isPending ? (
              <div className="flex gap-2">
                <span>Editing Team...</span>
                <Loader2 className="animate-spin" />
              </div>
            ) : (
              "Edit Team"
            )}
          </Button>
        </div>
      </section>
    </form>
  );
}

export default TeamForm;
