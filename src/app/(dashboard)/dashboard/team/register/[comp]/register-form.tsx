"use client";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, useTransition } from "react";
import { Loader2 } from "lucide-react";
import { competitions } from "@/lib/competition";
import { type RegisterFormProps, type TeamMember } from "@/types/types";
import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTRPC } from "@/utils/trpc";
import { getCompFee } from "@/lib/utils";

function RegisterForm({
  comp,
  userTeams,
  // userRegisteredCompetitions,
  // allTeamsDatas,
  allRegisteredTeamDatas,
  allTeamMembersDatas,
  userAsLeaderTeams,
  teamNames,
}: RegisterFormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();
  const [teamInstitution, setTeamInstitution] = useState<string>("");
  const [teamName, setTeamName] = useState<string>("");
  const router = useRouter();
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const { data: user } = useQuery({
    ...trpc.dashboard.getUser.queryOptions(),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
  const register = useMutation({
    ...trpc.register.registerTeam.mutationOptions(),
    onMutate: () => {
      setIsLoading(true);
      toast.loading("Registering team...", {
        id: "registering-team",
      });
    },
    onSuccess: () => {
      setIsLoading(false);
      toast.dismiss("registering-team");
      toast.dismiss("register-team");
      toast.success("Team registered successfully!");
    },
    onError: (error) => {
      setIsLoading(false);
      toast.dismiss("registering-team");
      toast.dismiss("register-team");
      toast.error("Failed to register team", {
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
      startTransition(() => {
        router.push("/dashboard/documents");
      });
    },
  });

  const registerSchema = z.object({
    competitionName: z.enum(["BCC", "IPPC", "PDC", "STEM"]),
    leaderName: z.string().min(5, "Name must be leader's fullname"),
    leaderEmail: z.email("Invalid email").min(1, "Leader's email is required"),
    leaderPhoneNumber: z
      .string()
      .regex(/^(\+?\d{9,15})$/, "Invalid phone number"),
    teamName: z.enum(teamNames as string[], {
      error: "Team name is required",
    }),
    teamInstitution: z.string().min(1, "Team's institution is required"),
    paymentProofUrl: z
      .string()
      .min(1, "Please upload a payment proof") // Triggers if empty
      .url("Please provide a valid URL link"), // Triggers if format is wrong
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
    setValue,
    getValues,
    setError,
  } = useForm<registerSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      competitionName:
        comp.toUpperCase() === "BCC"
          ? "BCC"
          : comp.toUpperCase() === "IPPC"
            ? "IPPC"
            : comp.toUpperCase() === "PDC"
              ? "PDC"
              : "STEM",
      leaderName: user?.name as string,
      leaderEmail: user?.email as string,
      leaderPhoneNumber: user?.phoneNumber ?? "",
      teamInstitution: teamInstitution ?? "",
      teamName: teamName ?? "",
      paymentProofUrl: "",
    },
  });
  type registerSchema = z.infer<typeof registerSchema>;

  const hasInitialized = useRef(false);
  useEffect(() => {
    if (!user || !comp.toUpperCase() || hasInitialized.current) return;
    reset({
      competitionName:
        comp.toUpperCase() === "BCC"
          ? "BCC"
          : comp.toUpperCase() === "IPPC"
            ? "IPPC"
            : comp.toUpperCase() === "PDC"
              ? "PDC"
              : "STEM",
      leaderName: user?.name as string,
      leaderEmail: user?.email as string,
      leaderPhoneNumber: user?.phoneNumber ?? "",
      teamInstitution: teamInstitution ?? "",
      teamName: teamName ?? "",
      paymentProofUrl: getValues("paymentProofUrl") ?? "",
    });
    hasInitialized.current = true;
  }, [reset, user, comp, teamInstitution, teamName, getValues]);

  // console.log("Available teams: ", userAsLeaderTeams);

  if (!userAsLeaderTeams.length && comp.toUpperCase()) {
    return (
      <div className="bg-transparent backdrop-glass-lg -m-px rounded-[calc(var(--radius)+.125rem)] border p-8">
        <div className="text-center">
          <h1 className="mb-1 mt-2 text-xl font-semibold">
            You have already registered a team or you are not a leader of any
            team.
          </h1>
          <p className="text-sm">
            Please contact us if you want to change your registration or create
            a new team as a leader to register for a competition.
          </p>
        </div>
      </div>
    );
  }

  function generateFeeId(): string {
    const timestamp = Date.now().toString(36); // time in base36
    const randomPart = Math.random().toString(36).substring(2, 10); // random chars
    return `FEE-${timestamp}-${randomPart}`.toUpperCase();
  }

  async function onSubmit(formData: registerSchema) {
    setIsLoading(true);
    toast.loading("Registering team...", { id: "register-team" });

    const selectedTeam = userTeams.find(
      (team) => team.name === formData.teamName,
    );
    const selectedTeamMembers = selectedTeam?.members;
    const compOnlyThreeMembers = ["IPPC", "STEM", "BCC"];
    // console.log("Selected team: ", selectedTeam);
    if (!selectedTeam) {
      toast.dismiss("register-team");
      toast.error("Team not found");
      setIsLoading(false);
      return;
    }

    const registeredTeamsMembersOnAnyComp = allTeamMembersDatas.filter(
      (member) =>
        allRegisteredTeamDatas.some((team) => team?.teamId === member.teamId),
    );
    // console.log(
    //   "Registered teams members on any comp: ",
    //   registeredTeamsMembersOnAnyComp
    // );

    const selectedTeamMembersEmails = selectedTeamMembers?.map(
      (member: TeamMember) => member.email,
    );
    // console.log("Selected team members emails: ", selectedTeamMembersEmails);

    const registeredTeamsMembersEmailsOnAnyComp =
      registeredTeamsMembersOnAnyComp.map((member) => member.email);

    // console.log(
    //   `Registered teams members emails : `,
    //   registeredTeamsMembersEmailsOnAnyComp
    // );

    const isTeamMemberRegisteredOnAnyComp = selectedTeamMembers?.some(
      (member: TeamMember) => {
        return registeredTeamsMembersOnAnyComp.some(
          (registeredMember) => registeredMember.email === member.email,
        );
      },
    );

    if (isTeamMemberRegisteredOnAnyComp) {
      toast.dismiss("register-team");
      setIsLoading(false);
      toast.error(
        `One or more team members have already registered on competition`,
        {
          description: `Member ${selectedTeamMembersEmails
            .filter((email: string) =>
              registeredTeamsMembersEmailsOnAnyComp.includes(email),
            )
            .join(", ")} (${selectedTeamMembers
            .filter((member: TeamMember) =>
              registeredTeamsMembersEmailsOnAnyComp.includes(member.email),
            )
            .map((member: TeamMember) => member.name)
            .join(", ")})`,
        },
      );
      return;
    }

    if (
      compOnlyThreeMembers.includes(comp) &&
      selectedTeam.members.length > 3
    ) {
      toast.error(`Team can only have 3 members for ${comp}`);
      toast.dismiss("register-team");
      toast.dismiss("registering-team");
      return;
    }
    register.mutate({
      competitionName: formData.competitionName,
      teamName: formData.teamName,
      userId: user?.id as string,
      teamId: userTeams.find((team) => team.name === formData.teamName)
        ?.id as string,
      leaderUserId: user?.id as string,
      leaderName: formData.leaderName,
      leaderEmail: formData.leaderEmail,
      leaderPhoneNumber: formData.leaderPhoneNumber,
      teamInstitution: formData.teamInstitution,
      paymentId: generateFeeId(),
      paymentFee: getCompFee(comp),
      paymentProofUrl: formData.paymentProofUrl,
    });
    toast.dismiss("register-team");
    setIsLoading(false);
    return;
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6">
        <div className="grid grid-cols-1 gap-3">
          <div className="space-y-2">
            <Controller
              name="teamName"
              control={control}
              render={({ field, fieldState }) => (
                <Field
                  orientation="responsive"
                  data-invalid={fieldState.invalid}
                >
                  <FieldContent>
                    <FieldLabel htmlFor="form-rhf-select-language">
                      Team Name
                    </FieldLabel>
                  </FieldContent>
                  <Select
                    name={field.name}
                    value={field.value}
                    onValueChange={(value) => {
                      field.onChange(value);
                      setValue("teamName", value);
                      setValue(
                        "teamInstitution",
                        userTeams.find((team) => team.name === value)
                          ?.teamInstitution ?? "",
                      );
                    }}
                  >
                    <SelectTrigger
                      id="form-rhf-select-language"
                      aria-invalid={fieldState.invalid}
                      className="w-full"
                    >
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      {teamNames.map((teamName) => (
                        <SelectItem key={teamName} value={teamName as string}>
                          {teamName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && (
                    <FieldError errors={[errors.teamName]} />
                  )}
                </Field>
              )}
            />
          </div>
        </div>
        <div className="space-y-2">
          <Controller
            name="competitionName"
            control={control}
            render={({ field, fieldState }) => (
              <Field orientation="responsive" data-invalid={fieldState.invalid}>
                <FieldContent>
                  <FieldLabel htmlFor="form-rhf-select-language">
                    Competition Name
                  </FieldLabel>
                </FieldContent>
                <Select
                  name={field.name}
                  value={field.value}
                  onValueChange={field.onChange}
                  defaultValue={comp.toUpperCase()}
                  disabled
                >
                  <SelectTrigger
                    id="form-rhf-select-language"
                    aria-invalid={fieldState.invalid}
                    className="w-full"
                  >
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="item-aligned">
                    <SelectItem value="BCC">BCC</SelectItem>
                    <SelectItem value="IPPC">IPPC</SelectItem>
                    <SelectItem value="PDC">PDC</SelectItem>
                    <SelectItem value="STEM">STEM</SelectItem>
                  </SelectContent>
                </Select>
                {fieldState.invalid && (
                  <FieldError errors={[errors.competitionName]} />
                )}
              </Field>
            )}
          />
        </div>
        <div className="space-y-2">
          <Controller
            name="leaderName"
            control={control}
            render={({ field, fieldState }) => (
              <Field orientation="responsive" data-invalid={fieldState.invalid}>
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
                  <FieldError errors={[errors.leaderName]} />
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
              <Field orientation="responsive" data-invalid={fieldState.invalid}>
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
                  <FieldError errors={[errors.leaderEmail]} />
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
              <Field orientation="responsive" data-invalid={fieldState.invalid}>
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
                  <FieldError errors={[errors.leaderPhoneNumber]} />
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
              <Field orientation="responsive" data-invalid={fieldState.invalid}>
                <FieldContent>
                  <FieldLabel htmlFor="form-rhf">Team Institution</FieldLabel>
                </FieldContent>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  disabled
                  readOnly
                />
                {fieldState.invalid && (
                  <FieldError errors={[errors.teamInstitution]} />
                )}
              </Field>
            )}
          />
        </div>
        <div className="space-y-2">
          <Controller
            name="paymentProofUrl"
            control={control}
            render={({ field, fieldState }) => (
              <Field orientation="responsive" data-invalid={fieldState.invalid}>
                <FieldContent>
                  <FieldLabel htmlFor="form-rhf">Payment Proof Link</FieldLabel>
                </FieldContent>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="Insert payment proof link here"
                  onBlur={(e) => {
                    e.target.value = e.target.value.trim();
                  }}
                  onMouseLeave={(e) => {
                    const value = getValues("paymentProofUrl");
                    if (!value) {
                      return;
                    }
                    setValue("paymentProofUrl", value.trim());
                  }}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>
        <Button
          className={`w-full ${
            isLoading ? "cursor-not-allowed" : "cursor-pointer"
          }`}
          disabled={isSubmitting || isPending}
          type="submit"
        >
          {isSubmitting || isPending ? (
            <div className="flex gap-2">
              <span>Registering...</span>
              <Loader2 className="animate-spin" />
            </div>
          ) : (
            "Register"
          )}
        </Button>
      </form>
    </>
  );
}

export default RegisterForm;
