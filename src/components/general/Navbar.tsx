"use client";
import Link from "next/link";
import {
  ChevronDownIcon,
  LayoutDashboard,
  Loader2,
  LogOut,
  Menu,
  User,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useRef, useState, useTransition } from "react";
import { toast } from "sonner";
import { usePathname, useRouter } from "next/navigation";
import { UserAvatar } from "./UserProfile";
import { compNavLinks, eventNavLinks, menuItems } from "@/constants/constants";
import { useQuery } from "@tanstack/react-query";
import { useTRPC } from "@/utils/trpc";
import { authClient } from "@/lib/auth-client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { motion, AnimatePresence } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

export const Navbar = () => {
  const [menuState, setMenuState] = useState(false);
  const [isTransition, startTransition] = useTransition();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDropdownMenuOpen, setIsDropdownMenuOpen] = useState(false);
  const router = useRouter();
  const currentPath = usePathname();
  const { data: session, isPending } = authClient.useSession();
  const trpc = useTRPC();
  const navRef = useRef<HTMLDivElement>(null);
  const { data, isFetched } = useQuery({
    ...trpc.dashboard.getUser.queryOptions(),
    enabled: session?.user ? true : false,
  });

  const handleLogout = async () => {
    setIsLoading(true);
    const toastId = toast.loading("Logging out...");
    try {
      await authClient.signOut();
      toast.success("Logged out successfully", { id: toastId });
      router.refresh();
      startTransition(() => {
        router.push("/login");
      });
    } catch (error) {
      toast.error("Failed to log out", {
        id: toastId,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const closeMenu = () => setMenuState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (currentPath.split("/").includes("#")) closeMenu();
    closeMenu();
  }, [currentPath]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuState &&
        navRef.current &&
        !navRef.current.contains(event.target as Node)
      ) {
        closeMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuState]);

  return (
    <header>
      <nav
        ref={navRef}
        data-state={menuState && "active"}
        className="fixed z-20 w-full"
      >
        <div
          className={cn(
            "mx-auto w-full px-6 transition-all duration-300 md:px-12 bg-background/35 backdrop-glass-xl",
            isScrolled && "mt-2 max-w-6xl rounded-2xl border md:px-5",
            menuState && "bg-background/50",
          )}
        >
          <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
            <div
              className={cn(
                "flex w-full justify-between md:w-auto transition-all duration-300",
              )}
            >
              <Link
                href="/"
                aria-label="home"
                className={cn("flex items-center gap-4 space-x-2")}
                prefetch
              >
                <Image
                  src="/logo.svg"
                  alt="Mechanical Festival 2025"
                  width={80}
                  height={80}
                  loading="lazy"
                />
                <Image
                  src="/hmm.png"
                  alt="HMM ITB"
                  width={45}
                  height={45}
                  loading="lazy"
                />
              </Link>

              <button
                onClick={() => setMenuState(!menuState)}
                aria-label={menuState == true ? "Close Menu" : "Open Menu"}
                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 md:hidden"
              >
                <Menu className="in-data-[state=active]:rotate-180 in-data-[state=active]:scale-0 in-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
                <X className="in-data-[state=active]:rotate-0 in-data-[state=active]:scale-100 in-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
              </button>
            </div>

            <div className="absolute inset-0 m-auto hidden size-fit md:block">
              <ul className="flex items-center gap-8 text-sm">
                <li className="flex items-center gap-4">
                  <DropdownMenu
                    open={isDropdownMenuOpen}
                    onOpenChange={setIsDropdownMenuOpen}
                  >
                    <DropdownMenuTrigger className="flex items-center gap-2 outline-none">
                      <span>Register</span>
                      <ChevronDownIcon
                        className={`h-4 w-4 transition-transform duration-300 ${
                          isDropdownMenuOpen ? "rotate-180" : "rotate-0"
                        }`}
                      />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      forceMount
                      asChild
                      className="hidden md:block"
                    >
                      <motion.div
                        initial={{
                          opacity: 0,
                          y: -10,
                          scale: 0.95,
                        }}
                        animate={
                          isDropdownMenuOpen
                            ? {
                                opacity: 1,
                                y: 0,
                                scale: 1,
                              }
                            : {
                                opacity: 0,
                                y: -10,
                                scale: 0.95,
                              }
                        }
                        transition={{
                          duration: 0.2,
                          ease: "easeOut",
                        }}
                        className="bg-slate-800/25 backdrop-glass-xl border-white/25 p-2 rounded-md shadow-xl"
                      >
                        <DropdownMenuLabel>Competitions</DropdownMenuLabel>
                        <DropdownMenuSeparator />

                        {compNavLinks.map((comp) => (
                          <DropdownMenuItem key={comp.name} asChild>
                            <Link
                              href={comp.href}
                              className="cursor-pointer hover:bg-black/15! px-2 py-1.5 block rounded-sm transition-colors"
                            >
                              {comp.name}
                            </Link>
                          </DropdownMenuItem>
                        ))}

                        <DropdownMenuSeparator />
                        <DropdownMenuLabel>Events</DropdownMenuLabel>
                        <DropdownMenuSeparator />

                        {eventNavLinks.map((event, index) => (
                          <DropdownMenuItem key={index} asChild>
                            <Link
                              href={event.href}
                              className="cursor-pointer hover:bg-black/15! px-2 py-1.5 block rounded-sm transition-colors"
                            >
                              {event.name}
                            </Link>
                          </DropdownMenuItem>
                        ))}
                      </motion.div>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </li>
                {menuItems.map((item, index) => (
                  <li
                    key={index}
                    className={cn(
                      "hover:scale-110 transition-all duration-300",
                      {
                        "border p-2 rounded-xl border-white bg-white/20":
                          currentPath === item.href ||
                          currentPath
                            .split("/")
                            .includes(item.name.toLowerCase()),
                      },
                    )}
                  >
                    <Link
                      href={item.href}
                      className={cn("text-accent-foreground")}
                      prefetch
                    >
                      <span>{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-transparent in-data-[state=active]:block md:in-data-[state=active]:flex mb-6 hidden flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap md:m-0 md:flex w-full md:w-fit md:gap-6 md:space-y-0 md:border-transparent md:bg-transparent md:p-0 md:shadow-none dark:shadow-none dark:md:bg-transparent">
              <div className="md:hidden">
                <ul className="space-y-6 text-base">
                  {menuItems.map((item, index) => (
                    <li
                      key={index}
                      className={cn(
                        "hover:bg-white/15 transition-all duration-300 p-2 rounded-lg",
                        {
                          "border p-2 rounded-xl border-white bg-white/20":
                            currentPath === item.href ||
                            currentPath
                              .split("/")
                              .includes(item.name.toLowerCase()),
                        },
                      )}
                    >
                      <Link
                        href={item.href}
                        className={cn("text-accent-foreground")}
                        prefetch
                      >
                        <span>{item.name}</span>
                      </Link>
                    </li>
                  ))}
                  <li className="text-accent-foreground">
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem
                        value="register"
                        className="border-none p-2"
                      >
                        <AccordionTrigger className="hover:no-underline py-0 flex gap-2 text-base font-normal items-center">
                          <span>Register</span>
                        </AccordionTrigger>

                        <AccordionContent className="pt-4 pb-0 flex flex-col gap-4 pl-4 border-l border-white/20 mt-2">
                          <div className="space-y-3">
                            <p className="text-xs font-bold uppercase tracking-wider opacity-50">
                              Competitions
                            </p>
                            {compNavLinks.map((comp) => (
                              <Link
                                key={comp.name}
                                href={comp.href}
                                className="block text-sm hover:translate-x-1 transition-transform"
                              >
                                {comp.name}
                              </Link>
                            ))}
                          </div>

                          <div className="space-y-3 mt-2">
                            <p className="text-xs font-bold uppercase tracking-wider opacity-50">
                              Events
                            </p>
                            {eventNavLinks.map((event, index) => (
                              <Link
                                key={index}
                                href={event.href}
                                className="block text-sm hover:translate-x-1 transition-transform"
                              >
                                {event.name}
                              </Link>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </li>
                  {isFetched && session?.user && (
                    <>
                      <li className="hover:bg-white/15 transition-all duration-300 p-2 rounded-lg">
                        <Link
                          href="/dashboard"
                          className={cn("text-accent-foreground", {
                            "underline underline-offset-2":
                              currentPath === "/dashboard",
                          })}
                          prefetch
                        >
                          <span>Dashboard</span>
                        </Link>
                      </li>
                      <li className="hover:bg-white/15 transition-all duration-300 p-2 rounded-lg">
                        <Link
                          href="/dashboard/profile"
                          className={cn("text-accent-foreground", {
                            "underline underline-offset-2":
                              currentPath === "/dashboard",
                          })}
                          prefetch
                        >
                          <span>Profile</span>
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              </div>
              <div
                className={cn(
                  "w-full md:w-fit md:flex items-center gap-6",
                  menuState ? "block" : "hidden",
                )}
              >
                <div className="flex items-center justify-between gap-4">
                  {isPending ? (
                    <Loader2 className="animate-spin size-5" />
                  ) : session?.user ? (
                    <>
                      <DropdownMenu>
                        <DropdownMenuTrigger className="outline-none">
                          <UserAvatar
                            src={data?.image as string}
                            alt={data?.name as string}
                            className="w-12 h-12 border-2 border-primary/50 hover:ring-2 ring-primary transition-all"
                          />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          className="w-56 bg-background/25 backdrop-glass-xl border-white/25 hidden md:block"
                        >
                          <div className="p-2 px-3">
                            <p className="text-sm font-medium truncate">
                              {data?.name}
                            </p>
                            <p className="text-xs text-accent-foreground truncate">
                              {session.user.email}
                            </p>
                          </div>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem asChild>
                            <Link
                              href="/dashboard"
                              className="cursor-pointer hover:bg-white/15!"
                            >
                              <LayoutDashboard className="text-white mr-2 size-4" />{" "}
                              Dashboard
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link
                              href="/dashboard/profile"
                              className="cursor-pointer hover:bg-white/15!"
                            >
                              <User className="text-white mr-2 size-4" />{" "}
                              Profile
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={handleLogout}
                            disabled={isLoading || isTransition}
                            className="text-destructive focus:bg-destructive/10 cursor-pointer"
                          >
                            <LogOut className="text-white mr-2 size-4" />
                            {isLoading || isTransition
                              ? "Logging out..."
                              : "Logout"}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                      <Button
                        variant="destructive"
                        size="sm"
                        className={`md:hidden ${
                          isLoading ? "cursor-not-allowed" : "cursor-pointer"
                        }`}
                        disabled={isLoading || isTransition}
                        type="button"
                        onClick={handleLogout}
                      >
                        {isLoading || isTransition ? (
                          <div className="flex">
                            <Loader2 className="animate-spin size-5" />
                          </div>
                        ) : (
                          "Log Out"
                        )}
                      </Button>
                    </>
                  ) : (
                    <Button asChild variant="outline" size="sm">
                      <Link href="/login">Login</Link>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};
