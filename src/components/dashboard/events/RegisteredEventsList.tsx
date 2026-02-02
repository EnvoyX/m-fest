import { IconConfetti } from "@tabler/icons-react";
import { ArrowUpRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import Link from "next/link";

export default function RegisteredEventsList() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <IconConfetti />
        </EmptyMedia>
        <EmptyTitle>No Events Yet</EmptyTitle>
        <EmptyDescription>
          You haven&apos;t registered any events yet.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button
          variant="link"
          asChild
          className="text-muted-foreground"
          size="sm"
        >
          <Link href="/events" prefetch>
            Learn More <ArrowUpRightIcon />
          </Link>
        </Button>
      </EmptyContent>
    </Empty>
  );
}
