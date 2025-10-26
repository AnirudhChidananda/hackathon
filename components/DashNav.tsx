"use client";
import {
  Navbar,
  NavBody,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { useState } from "react";
import { SignedIn, SignedOut, useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Home, User, ScanEye, NotebookPen, Atom } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

interface NavItemsProps {
  className?: string;
  onItemClick?: () => void;
  currentPage: string;
  onPageChange: (page: string) => void;
}

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: Home },
  { id: "manage", label: "Habits & Goals", icon: User },
  { id: "calendar", label: "The Phoenix Cycle", icon: ScanEye },
  // { id: "journal", label: "Flame Journal", icon: NotebookPen },
  { id: "welness", label: "AI Wellness Assistant", icon: Atom },
];

export default function DashNav({ currentPage, onPageChange }: { currentPage: string; onPageChange: (page: string) => void }) {
  const router = useRouter();
  const { signOut } = useClerk();
  // const navItems = [
  //   {
  //     name: "Dashboard",
  //     link: "/dashboard",
  //   },
  //   {
  //     name: "Generate Program",
  //     link: "/generate-program",
  //   },
  //   {
  //     name: "Upload",
  //     link: "/upload",
  //   },
  // ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  return (
    <div className="w-full  top-0 z-50 sticky flex sm:flex md:flex lg:hidden">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          {/* <NavItems onPageChange={onPageChange} currentPage={currentPage} /> */}
          <div className="flex items-center gap-4 z-50">
            <SignedOut>
              <NavbarButton variant="secondary" onClick={() => router.push("/sign-in")}>
                Login
              </NavbarButton>
              <NavbarButton variant="primary" onClick={() => router.push("/sign-up")}>
                Sign Up
              </NavbarButton>
            </SignedOut>
            <SignedIn>
              <div className="cursor-pointer" onClick={() => signOut()}>
                Sign Out
              </div>
            </SignedIn>
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle isOpen={isMobileMenuOpen} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
          </MobileNavHeader>

          <MobileNavMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)}>
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                onClick={() => {
                  console.log("aa", item.id);
                  setIsMobileMenuOpen(false);
                  onPageChange(item.id);
                }}
                className={`relative text-neutral-600 dark:text-neutral-300 cursor-pointer ${currentPage === item.id ? "text-primary dark:text-purple-300" : ""}`}
              >
                <span className="block">{item.label}</span>
              </a>
            ))}
            <div className="flex w-full flex-col gap-4">
              <SignedOut>
                <NavbarButton onClick={() => router.push("/sign-in")} variant="primary" className="w-full">
                  Login
                </NavbarButton>
                <NavbarButton onClick={() => router.push("/sign-up")} variant="primary" className="w-full">
                  Sign Up
                </NavbarButton>
              </SignedOut>
              <SignedIn>
                <div className="cursor-pointer" onClick={() => signOut()}>
                  Sign Out
                </div>
              </SignedIn>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  );
}

export const NavItems = ({ className, onItemClick, currentPage, onPageChange }: NavItemsProps) => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <motion.div
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "absolute inset-0 hidden flex-1 flex-row items-center justify-center space-x-2 text-sm font-medium text-zinc-600 transition duration-200 hover:text-zinc-800 lg:flex lg:space-x-2",
        className
      )}
    >
      {navItems.map((item, idx) => (
        <a
          onMouseEnter={() => setHovered(idx)}
          onClick={() => onPageChange(item.id)}
          className="relative px-4 py-2 text-neutral-600 dark:text-neutral-300 transition-colors cursor-pointer"
          key={`link-${idx}`}
        >
          {hovered === idx && (
            <motion.div layoutId="hovered" className="absolute inset-0 h-full w-full rounded-full bg-gray-100 dark:bg-neutral-800" />
          )}
          <span className="relative z-20 text-purple-200">{item.label}</span>
        </a>
      ))}
    </motion.div>
  );
};
