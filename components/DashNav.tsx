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
export default function DashNav() {
  const router = useRouter();
  const { signOut } = useClerk();
  const navItems = [
    {
      name: "Dashboard",
      link: "/dashboard",
    },
    {
      name: "Generate Program",
      link: "/generate-program",
    },
    {
      name: "Upload",
      link: "/upload",
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
    </div>
  );
}
