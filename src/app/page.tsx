import PreventBubblingClient from "@/components/PreventBubblingClient";
import Nav from "@/components/Home/Nav";
import { buttonVariants } from "@/components/ui/Button";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/app-beta";
import { getInitialDoc } from "@/actions/getInitialDoc";
import { createUntitled } from "@/actions/createUntitled";

export default async function Home() {
  const { userId } = auth();

  if (userId) {
    const document = await getInitialDoc(userId);

    // find first document to redirect if already logged in
    if (document) {
      return redirect(`/${document.id}`);
    } else {
      //   if there is no doc yet make one then redirect
      const { id } = await createUntitled(userId);

      return redirect(`/${id}`);
    }
  }

  return (
    <div>
      <Nav />
      <main className="mt-[62px] h-[calc(100vh_-_62px)] xl:mx-auto px-[32px] sm:px-[70px] md:px-[125px] overflow-hidden">
        <section className="text-center flex flex-col items-center gap-3 mx-auto">
          <header className="xs:w-full w-[300px] flex flex-col items-center gap-4">
            <h1 className="text-center pt-20 items-center text-5xl md:text-6xl lg:text-7xl max-w-[780px] w-auto font-bold">
              Your
              <PreventBubblingClient>
                <a
                  className="inline-flex items-end cursor-not-allowed"
                  href="/product/wikis"
                >
                  <span className="flex items-end px-3">
                    <Image
                      priority
                      className="h-[45px] w-auto md:h-[58px] lg:h-[68px]"
                      src={"/images/wikis-icon.png"}
                      height={70}
                      width={52}
                      alt="wikis-icon"
                    />
                  </span>
                  <span className="underline ">wiki</span>
                </a>
              </PreventBubblingClient>
              ,
              <PreventBubblingClient>
                <a
                  className="inline-flex items-end cursor-not-allowed"
                  href="/product/docs"
                >
                  <span className="flex items-end px-3">
                    <Image
                      priority
                      className="h-[45px] w-auto md:h-[58px] lg:h-[68px] "
                      src={"/images/docs-icon.png"}
                      height={70}
                      width={52}
                      alt="docs-icon"
                    />
                  </span>
                  <span className="underline ">docs</span>,
                </a>
              </PreventBubblingClient>
              &
              <PreventBubblingClient>
                <a
                  className="inline-flex items-end cursor-not-allowed"
                  href="/product/projects"
                >
                  <span className="flex items-end px-3">
                    <Image
                      priority
                      className="h-[45px] w-auto md:h-[58px] lg:h-[68px]"
                      src={"/images/projects-icon.png"}
                      height={70}
                      width={52}
                      alt="projects-icon"
                    />
                  </span>
                  <span className="underline ">projects.</span>
                </a>
              </PreventBubblingClient>
              Together.
            </h1>
            <p className="font-semibold text-2xl max-w-[560px]">
              Notion is the connected workspace where better, faster work
              happens. Now with AI
            </p>
            <Link
              className={buttonVariants({ variant: "default" })}
              href="/sign-up"
            >
              Get Notion free
            </Link>
          </header>

          <picture>
            <source
              srcSet="/images/home-hero-dark.png"
              media="(prefers-color-scheme: dark)"
            />
            <Image
              className="max-w-[850px] w-full"
              src="/images/home-hero.png"
              alt="home-hero"
              height={260}
              width={852}
              priority
              role="presentation"
            />
          </picture>
        </section>
      </main>

      <div className="px-4 w-full">
        <div className="flex flex-col">
          <h1 className="font-semibold text-3xl mb-4 text-center">
            Technology
          </h1>
          <div className="flex flex-col md:flex-row lg:px-24 items-start justify-center gap-x-4">
            <ul className="list-disc list-inside opacity-90 mt-3 w-2/3">
              <p className="opacity-90">
                This project is built with the following technologies:
              </p>
              <li>React</li>
              <li>Next.js</li>
              <li>Typescript</li>
              <li>Clerk</li>
              <li>Prisma</li>
              <li>Mongo DB</li>
            </ul>
            <a
              href="https://github.com/NexU20/notion-clone"
              target="_blank"
              className="bg-black inline-flex py-3 px-4 rounded-md w-fit max-w-36 mt-3"
            >
              View Repository
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
