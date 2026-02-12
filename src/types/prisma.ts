import type { Prisma } from "../../prisma/generated/prisma/client";

export type TeamMember = Prisma.TeamMemberGetPayload<{
  include: {
    user: {
      include: {
        documents: true;
      };
    };
  };
}>;

export type TeamWithMembers = Prisma.TeamGetPayload<{
  include: {
    members: { include: { user: { include: { documents: true } } } };
  };
}>;

export type TeamDataTable = Prisma.TeamGetPayload<{
  include: {
    members: {
      include: {
        user: {
          include: {
            documents: true;
          };
        };
      };
    };
  };
}>;

export type RegisteredCompetition = Prisma.CompRegistrationGetPayload<{
  include: {
    team: true;
  };
}>;

export type RegisteredCompetitionsList = RegisteredCompetition[];

export type UserTeam = Prisma.TeamGetPayload<{}> | null;
