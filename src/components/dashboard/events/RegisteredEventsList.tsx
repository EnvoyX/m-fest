import { IconConfetti } from '@tabler/icons-react';
import { isWithinInterval } from 'date-fns';
import { ArrowUpRightIcon, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';

import { getUser } from '@/action/user.action';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty';
import { eventsList, type Event } from '@/lib/eventDashboard';
import { cn, getCurrentDate, wibToUTC } from '@/lib/utils';
import { db } from '@/server/db';
import { type User } from '@/types/types';

import CompetitionListSkeleton from '../CompetitionListSkeleton';

export default function RegisteredEventsList() {
  return (
    <Suspense fallback={<CompetitionListSkeleton />}>
      <FetchUserRegisteredEvents />
    </Suspense>
  );
}

async function FetchUserRegisteredEvents() {
  const currentDate = getCurrentDate();
  const user = (await getUser()) as User;
  const registeredEvents = await db.eventRegistration.findMany({
    where: {
      userId: user.id,
    },
    select: {
      eventType: true,
    },
  });
  const eventsRegisteredList = eventsList.filter((event) =>
    registeredEvents.some((e) => e.eventType === event.dbId),
  );

  const isMTalksRegistered = registeredEvents.map((event) => event.eventType === 'M_TALKS');
  const isExpoRegistered = registeredEvents.map((event) => event.eventType === 'M_EXPO');

  if (!eventsRegisteredList.length) {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <IconConfetti />
          </EmptyMedia>
          <EmptyTitle>No Events Yet</EmptyTitle>
          <EmptyDescription>You haven&apos;t registered any events yet.</EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button variant="link" asChild className="text-muted-foreground" size="sm">
            <Link href="/events" prefetch>
              Learn More <ArrowUpRightIcon />
            </Link>
          </Button>
        </EmptyContent>
      </Empty>
    );
  }

  return (
    <section className="mt-8">
      <h3 className="text-2xl text-foreground font-bold">Registered Events</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4 items-stretch my-2">
        {eventsRegisteredList.map((event) => {
          function isRegistrationOpen(event: Event, now: Date) {
            if (!event.startRegDate1 || !event.endRegDate1) return false;

            const start = wibToUTC(event.startRegDate1);
            const end = wibToUTC(event.endRegDate1);

            return isWithinInterval(now, { start, end });
          }

          const isOpen = isRegistrationOpen(event, currentDate);
          return (
            <Card
              key={event.id}
              className="w-full max-w-sm bg-white/5 flex flex-col backdrop-glass-sm"
            >
              <CardHeader className="flex flex-col justify-center items-center mb-auto">
                <CardTitle className="flex items-center gap-2">{event.title}</CardTitle>
                <CardDescription className="text-center text-sm line-clamp-1">
                  {event.desc}
                </CardDescription>
                <Badge variant="secondary" className="bg-blue-600 text-white">
                  Registered
                </Badge>
              </CardHeader>
              <CardContent className="flex justify-center items-center grow my-auto">
                <event.logo className="size-24" />
              </CardContent>
              <CardFooter className="flex flex-col justify-center mt-auto">
                {((isExpoRegistered && event.id === 'M-EXPO') ||
                  (isMTalksRegistered && event.id === 'M-TALKS')) && (
                  <Button
                    variant="default"
                    size="sm"
                    className={cn('gap-1 pr-1.5 cursor-pointer', {
                      'bg-muted-foreground pointer-events-none cursor-not-allowed': !isOpen,
                    })}
                    disabled={isOpen ? false : true}
                  >
                    <Link
                      href={isOpen ? `/dashboard/events/register/${event.id}` : ''}
                      prefetch
                      className="flex items-center gap-2"
                    >
                      <span>Update</span>
                      <ChevronRight className="size-4" />
                    </Link>
                  </Button>
                )}
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
