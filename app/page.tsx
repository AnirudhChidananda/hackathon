import { SignInButton, SignOutButton, SignedIn, SignedOut } from "@clerk/nextjs";

// export default function Home() {
//   return (
//     <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
//       <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
//         <SignedOut>
//           <SignInButton />
//         </SignedOut>
//         <SignedIn>
//           <div className="cursor-pointer">
//             <SignOutButton />
//           </div>
//         </SignedIn>
//       </main>
//     </div>
//   );
// }

import TerminalOverlay from "@/components/TerminalOverlay";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
// import UserPrograms from "@/components/UserPrograms";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import Prism from "@/components/ui/prism";
import { WistiaPlayer } from "@wistia/wistia-player-react";

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <div style={{ width: "100%", height: "600px", position: "relative" }}>
        <div className="z-10 absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center ">
          <div className="text-5xl font-bold tracking-tight mx-auto text-center">
            Embrace your{" "}
            <span className="bg-linear-to-r from-yellow-500 via-orange-500  to-red-500 inline-block text-transparent bg-clip-text">Inner Flame,</span>
            Transform,{" "}
            <span className="bg-linear-to-r from-yellow-500 via-orange-500  to-red-500 inline-block text-transparent bg-clip-text">Rise</span> Again
          </div>
          <div className="text-4xl py-4 text-center">
            <span className="bg-linear-to-r  from-yellow-500 via-orange-500  to-red-500 inline-block text-transparent bg-clip-text font-bold">
              AI powered
            </span>{" "}
            productivity and wellness
          </div>
        </div>
        <Prism animationType="rotate" timeScale={0.5} height={3.5} baseWidth={5.5} scale={3.6} hueShift={0} colorFrequency={1} noise={0.5} glow={1} />
      </div>
      <div className="w-full h-full p-8">
        <WistiaPlayer mediaId="awq0rfvx2j" />;
      </div>
      <div className="flex flex-col min-h-screen text-foreground overflow-hidden">
        <section className="relative z-10 py-24 grow">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative">
              {/* CORNER DECARATION */}
              <div className="absolute -top-10 left-0 w-40 h-40 border-l-2 border-t-2" />

              {/* LEFT SIDE CONTENT */}
              <div className="lg:col-span-7 space-y-8 relative">
                {/* SEPERATOR LINE */}
                <div className="h-px w-full bg-linear-to-r from-primary via-secondary to-primary opacity-50"></div>

                <p className="text-xl text-muted-foreground w-2/3">
                  Talk to our AI assistant and get personalized diet plans and workout routines designed just for you
                </p>

                {/* STATS */}
                <div className="flex items-center gap-10 py-6 font-mono">
                  <div className="flex flex-col">
                    <div className="text-2xl text-primary">500+</div>
                    <div className="text-xs uppercase tracking-wider">ACTIVE USERS</div>
                  </div>
                  <div className="h-12 w-px bg-linear-to-b from-transparent via-border to-transparent"></div>
                  <div className="flex flex-col">
                    <div className="text-2xl text-primary">3min</div>
                    <div className="text-xs uppercase tracking-wider">GENERATION</div>
                  </div>
                  <div className="h-12 w-px bg-linear-to-b from-transparent via-border to-transparent"></div>
                  <div className="flex flex-col">
                    <div className="text-2xl text-primary">100%</div>
                    <div className="text-xs uppercase tracking-wider">PERSONALIZED</div>
                  </div>
                </div>

                {/* BUTTON */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <Button size="lg" asChild className="overflow-hidden bg-primary text-primary-foreground px-8 py-6 text-lg font-medium">
                    <Link href={"/dashboard"} className="flex items-center font-mono">
                      Build Your Program
                      <ArrowRightIcon className="ml-2 size-5" />
                    </Link>
                  </Button>
                </div>
              </div>

              {/* RIGHT SIDE CONTENT */}
              <div className="lg:col-span-5 relative">
                {/* CORNER PIECES */}
                <div className="absolute -inset-4 pointer-events-none">
                  <div className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 border-border" />
                  <div className="absolute top-0 right-0 w-16 h-16 border-r-2 border-t-2 border-border" />
                  <div className="absolute bottom-0 left-0 w-16 h-16 border-l-2 border-b-2 border-border" />
                  <div className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-border" />
                </div>

                {/* IMAGE CONTANINER */}
                <div className="relative aspect-square max-w-lg mx-auto">
                  <div className="relative overflow-hidden rounded-lg bg-cyber-black">
                    <img src="/assistant.png" alt="AI Fitness Coach" className="size-full object-cover object-center" />

                    {/* SCAN LINE */}
                    <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,transparent_calc(50%-1px),var(--cyber-glow-primary)_50%,transparent_calc(50%+1px),transparent_100%)] bg-[length:100%_8px] animate-scanline pointer-events-none" />

                    {/* DECORATIONS ON TOP THE IMAGE */}
                    <div className="absolute inset-0 pointer-events-none">
                      <div className="absolute top-1/3 left-1/3 w-1/3 h-1/3 border border-primary/40 rounded-full" />

                      {/* Targeting lines */}
                      <div className="absolute top-1/2 left-0 w-1/4 h-px bg-primary/50" />
                      <div className="absolute top-1/2 right-0 w-1/4 h-px bg-primary/50" />
                      <div className="absolute top-0 left-1/2 h-1/4 w-px bg-primary/50" />
                      <div className="absolute bottom-0 left-1/2 h-1/4 w-px bg-primary/50" />
                    </div>

                    <div className="absolute inset-0 bg-linear-to-t from-background via-background/40 to-transparent" />
                  </div>

                  {/* TERMINAL OVERLAY */}
                  <TerminalOverlay />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      {/* <UserPrograms /> */}
    </div>
  );
};
export default HomePage;
