import { ChartBarSquareIcon } from "@heroicons/react/24/outline";
import { ArrowTrendingUpIcon, ChartPieIcon } from "@heroicons/react/24/outline";
import { ClipboardDocumentListIcon } from "@heroicons/react/24/outline";
import { CpuChipIcon } from "@heroicons/react/24/solid";
import { Link, Head } from "@inertiajs/react";

export default function Welcome({ auth, laravelVersion, phpVersion }) {
  const handleImageError = () => {
    document.getElementById("screenshot-container")?.classList.add("!hidden");
    document.getElementById("docs-card")?.classList.add("!row-span-1");
    document.getElementById("docs-card-content")?.classList.add("!flex-row");
    document.getElementById("background")?.classList.add("!hidden");
  };

  return (
    <>
      <Head title="Welcome" />
      <div className="bg-red-100 text-black/50 dark:bg-black dark:text-white/50">
        {/* <img
          id="background"
          className="absolute -left-20 top-0 max-w-[877px]"
          src="https://laravel.com/assets/img/welcome/background.svg"
        /> */}
        <div className="relative min-h-screen flex flex-col items-center justify-center selection:bg-[#FF2D20] selection:text-white">
          <div className="relative w-full max-w-2xl px-6 lg:max-w-7xl">
            <header className="grid grid-cols-2 items-center gap-2 py-10 lg:grid-cols-3">
              <div className="flex lg:justify-center lg:col-start-2">
                <img className="h-28" src="/img/ISABEL.gif" alt="Logo" />
              </div>
              <nav className="-mx-3 flex flex-1 justify-end">
                {auth.user ? (
                  <Link
                    href={route("dashboard")}
                    className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                  >
                    Dashboard
                  </Link>
                ) : (
                  <>
                    <Link
                      href={route("login")}
                      className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:underline hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                    >
                      Log in
                    </Link>
                  </>
                )}
              </nav>
            </header>

            <main className="mt-6">
              <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
                <div className="shadow-red-300 flex flex-col items-start gap-6 overflow-hidden rounded-lg bg-white p-6 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/[0.05] transition duration-300 md:row-span-3 lg:p-10 lg:pb-10 dark:bg-zinc-900 dark:ring-zinc-800">
                  <div className="relative flex w-full flex-1 items-stretch shadow-lg shadow-red-300 border-2 border-rose-200 rounded-md ">
                    <img
                      src="/img/Banner.gif"
                      alt="Banner"
                      className="aspect-video h-full w-full flex-1 rounded-[10px] object-top object-cover drop-shadow-[0px_4px_34px_rgba(0,0,0,0.06)] dark:hidden"
                    />
                  </div>

                  <div className="relative flex items-center gap-6 lg:items-end">
                    <div
                      id="docs-card-content"
                      className="flex items-start gap-6 lg:flex-col"
                    >
                      <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#FF2D20]/10 sm:size-16">
                        <ChartBarSquareIcon className="w-10 text-red-500" />
                      </div>

                      <div className="pt-3 sm:pt-5 lg:pt-0">
                        <h2 className="text-xl font-semibold text-black dark:text-white">
                          Dashboards
                        </h2>

                        <p className="mt-4 text-sm/relaxed">
                          Dashboards are vital for visualizing and managing data
                          centrally and intuitively. Whether you're new to
                          dashboards or experienced, they enhance monitoring,
                          analysis, and decision-making. They track key
                          performance indicators, reveal trends, and boost data
                          transparency in applications.
                        </p>
                      </div>
                    </div>

                    <ArrowTrendingUpIcon className="w-32 text-red-500" />
                  </div>
                </div>

                <div className="shadow-red-300 flex items-start gap-4 rounded-lg bg-white p-6 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] lg:pb-10 dark:bg-zinc-900 dark:ring-zinc-800 ">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#FF2D20]/10 sm:size-16">
                    <ChartPieIcon className="w-10 text-red-500" />
                  </div>

                  <div className="pt-3 sm:pt-5">
                    <h2 className="text-xl font-semibold text-black dark:text-white">
                      Data Trends
                    </h2>

                    <p className="mt-4 text-sm/relaxed">
                      Understanding data trends is crucial for informed
                      decision-making and competitiveness. Analyzing trends
                      identifies patterns, predicts outcomes, and provides
                      business insights, empowering strategy optimization,
                      efficiency, and growth.
                    </p>
                  </div>

                  <svg
                    className="size-6 shrink-0 self-center stroke-[#FF2D20]"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                    />
                  </svg>
                </div>

                <div className="shadow-red-300 flex items-start gap-4 rounded-lg bg-white p-6 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] lg:pb-10 dark:bg-zinc-900 dark:ring-zinc-800 ">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#FF2D20]/10 sm:size-16">
                    <ClipboardDocumentListIcon className="w-10 text-red-500" />
                  </div>

                  <div className="pt-3 sm:pt-5">
                    <h2 className="text-xl font-semibold text-black dark:text-white">
                      Data Collection
                    </h2>

                    <p className="mt-4 text-sm/relaxed">
                      Data collection involves systematically gathering and
                      storing crucial information for analysis and archival
                      purposes. It forms the foundation for deriving meaningful
                      insights and making informed decisions in various domains.
                    </p>
                  </div>

                  <svg
                    className="size-6 shrink-0 self-center stroke-[#FF2D20]"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                    />
                  </svg>
                </div>

                <div className="shadow-red-300 flex items-start gap-4 rounded-lg bg-white p-6 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] lg:pb-10 dark:bg-zinc-900 dark:ring-zinc-800 ">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#FF2D20]/10 sm:size-16">
                    <CpuChipIcon className="w-10 text-red-500" />
                  </div>

                  <div className="pt-3 sm:pt-5">
                    <h2 className="text-xl font-semibold text-black dark:text-white">
                      Process Automation
                    </h2>

                    <p className="mt-4 text-sm/relaxed">
                      Process automation utilizes technology to automate and
                      streamline manual tasks and workflows. By reducing human
                      intervention and minimizing errors, organizations improve
                      efficiency and accelerate operations, fostering innovation
                      and growth.
                    </p>
                  </div>
                </div>
              </div>
            </main>

            <footer className="py-16 text-center text-sm text-black dark:text-white/70">
              © {new Date().getFullYear()}{" "}
              <a
                target="_blank"
                href="https://danilo-tech.com"
                className="text-gray-500 hover:underline"
              >
                Danilo tech
              </a>
              . All rights reserved.
            </footer>
          </div>
        </div>
      </div>
    </>
  );
}
