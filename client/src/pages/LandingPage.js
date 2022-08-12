import { IconArrowNarrowRight } from "@tabler/icons";
import { Link } from "react-router-dom";
import GitHub from "../components/icons/GitHub";
import Navbar from "../layouts/LandingPageLayout/Navbar";
import { Helmet } from "react-helmet-async";

const LandingPage = () => {
  return (
    <>
      <Helmet>
        <link
          rel="stylesheet"
          href="https://vgvkuskuhjjxyafyrwyp.supabase.co/storage/v1/object/public/bob-hub/complied-tw.css"
        />
      </Helmet>
      <div className="h-screen overflow-hidden">
        <Navbar />
        <div className="mx-auto max-w-6xl">
          <div>
            <div className="bg-white pb-8 sm:pb-12 lg:pb-12">
              <div className="overflow-hidden pt-8 sm:pt-12 lg:relative lg:py-28">
                <div className="wrapper lg:grid lg:grid-cols-2 lg:gap-24">
                  <div>
                    <div>
                      <div>
                        <a
                          to="https://docusign2022.devpost.com/"
                          rel="nofollow noreferrer"
                          target="_blank"
                          className="inline-flex space-x-4"
                        >
                          <span className="rounded bg-lightgreen px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-darkgreen">
                            Good Code Hack 2022
                          </span>
                        </a>
                        <a
                          to="https://docusign2022.devpost.com/"
                          rel="nofollow noreferrer"
                          target="_blank"
                          className="mx-2 inline-flex space-x-4"
                        >
                          <span className="rounded bg-darkgreen px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-white">
                            JGI
                          </span>
                        </a>
                      </div>
                      <div className="mt-8 sm:max-w-xl">
                        <h1 className="w-max bg-gradient-to-r from-algae to-lightgreen bg-clip-text pb-2 text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl">
                          No More Manual Linking
                        </h1>
                        <p className="mt-2 pr-16 text-xl text-placeholder">
                          Trigger 1-click workflows to integrate + validate
                          camera trap data.
                        </p>
                        <p className="text-md mt-12 pr-16 tracking-wide text-slate">
                          For TACARE Volunteers &amp; admins, lesser work at the
                          desk means more time spent sharing{" "}
                          <span className="text-red">&#9829;</span> with
                          Chimpanzees.{" "}
                          <span className="font-semibold">Zapene.app</span> is
                          an online multi-platform tool, that helps eliminate
                          manual work, lower error rates &amp; increase
                          efficiency
                        </p>
                      </div>

                      <div className="mt-10 flex gap-2">
                        <Link
                          className="border border-transparent shadow-sm transition-all
                            duration-150 group-hover:-translate-y-0.5 group-hover:shadow-lg
                            sm:w-auto"
                          to="https://github.com/hbthck/docusign-goodcode-2022-submission"
                        >
                          <a
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center rounded-md  border border-transparent bg-secondary px-6 py-4 text-lg font-medium text-smoke shadow-sm  focus:outline-none focus:ring-2 focus:ring-offset-2 "
                          >
                            <GitHub
                              fill="currentColor"
                              className="mr-3 transform text-opacity-50"
                            />
                            <div>Source Code</div>
                          </a>
                        </Link>
                        <Link to="/app">
                          <a className="inline-flex items-center justify-center rounded-md border border-transparent bg-red px-6 py-4 text-lg font-medium text-white shadow-sm  focus:outline-none focus:ring-2 focus:ring-offset-2 ">
                            <span>Get Started</span>
                            <IconArrowNarrowRight
                              className="ml-2 h-5 w-5"
                              aria-hidden="true"
                            />
                          </a>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                <div className=" sm:mx-auto sm:max-w-3xl sm:px-6">
                  <div className="py-12 sm:relative sm:mt-12 sm:py-16 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
                    <div className="hidden sm:block">
                      <div className="absolute inset-y-0 left-1/2 w-screen rounded-l-3xl bg-gray-50 lg:left-80 lg:right-0 lg:w-full" />
                      <svg
                        className="absolute top-8 right-1/2 -mr-3 lg:left-0 lg:m-0"
                        width={404}
                        height={392}
                        fill="none"
                        viewBox="0 0 404 392"
                      >
                        <defs>
                          <pattern
                            id="837c3e70-6c3a-44e6-8854-cc48c737b659"
                            x={0}
                            y={0}
                            width={20}
                            height={20}
                            patternUnits="userSpaceOnUse"
                          >
                            <rect
                              x={0}
                              y={0}
                              width={4}
                              height={4}
                              className="text-gray-300"
                              fill="currentColor"
                            />
                          </pattern>
                        </defs>
                        <rect
                          width={404}
                          height={392}
                          fill="url(#837c3e70-6c3a-44e6-8854-cc48c737b659)"
                        />
                      </svg>
                    </div>
                    <div className="relative -mr-40 pl-4 sm:mx-auto sm:max-w-3xl sm:px-0 lg:h-full lg:max-w-none lg:pl-12">
                      <img
                        className="w-full rounded-md shadow-xl ring-1 ring-black ring-opacity-5 lg:h-full lg:w-auto lg:max-w-none"
                        src="/platform-screenshot.jpg"
                        alt="Feature.so Screenshot"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
};


export default LandingPage;