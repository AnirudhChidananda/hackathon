"use client";
import {
  Navbar,
  NavBody,
  NavItems,
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
import { ThemeToggle } from "./theme-toggle";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
export default function NavbarComponent() {
  const router = useRouter();
  const { signOut } = useClerk();
  const navItems = [
    {
      name: "Dashboard",
      link: "/dashboard",
    },
    {
      name: "Meditation",
      link: "/meditation",
    },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  return (
    <div className="w-full sticky top-0 z-50">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className="flex items-center gap-4 z-50">
            <ThemeToggle />
            <SignedOut>
              <Button variant="ghost" className="cursor-pointer" onClick={() => router.push("/sign-in")}>
                Login
              </Button>
              <Button variant="secondary" className="cursor-pointer" onClick={() => router.push("/sign-up")}>
                Sign Up
              </Button>
            </SignedOut>
            <SignedIn>
              <Button variant="secondary" className="cursor-pointer" onClick={() => signOut()}>
                <LogOut className="size-4" />
                Sign Out
              </Button>
            </SignedIn>
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle isOpen={isMobileMenuOpen} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
          </MobileNavHeader>
          <ThemeToggle />

          <MobileNavMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)}>
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-neutral-600 dark:text-neutral-300"
              >
                <span className="block">{item.name}</span>
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
      {/* Navbar */}
    </div>
  );
}
