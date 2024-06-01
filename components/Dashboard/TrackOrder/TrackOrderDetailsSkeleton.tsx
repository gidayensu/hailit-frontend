//ui + icons
import { Skeleton } from "@/components/ui/skeleton";
import Container from "@/components/ui/container";
import { Separator } from "@/components/ui/separator";
export default function TrackOrderSkeleton() {
  return (
    <>
      {/* HEADER */}
      <article className="flex flex-col gap-2">
        <section className="flex gap-2 text-2xl mb-2">
          <Skeleton className="w-32" />
          <Skeleton className="w-32" />
        </section>
        <section className="flex gap-3">
          <Skeleton className="w-32" />

          <Skeleton className="w-32" />
        </section>
      </article>

      {/* DELIVERY STATUS */}
      <article className="flex flex-col lg:flex-row w-full gap-4">
        <Container className="flex flex-col  w-full lg:w-3/6 h-52 rounded-lg p-3 gap-2">
          {/* order status */}
          <Skeleton className="w-32" />
          <Skeleton className="w-32" />

          <div className="flex">
            <Skeleton className="w-32" />
            <Skeleton className="w-32" />
            <Skeleton className="w-32" />
            <Skeleton className="w-32" />
            <Skeleton className="w-32" />{" "}
          </div>
        </Container>

        {/* Payment */}
        <Container className="flex flex-col  w-full lg:w-2/6  h-52 rounded-lg p-3 gap-2">
          <div className="flex justify-between">
            <div className="">
              <Skeleton className="w-32" />
              <Skeleton className="w-32" />
            </div>
            <Skeleton className="w-32" />
          </div>
          <div className="w-full flex flex-col items-start justify-between h-3/5 rounded-md bg-[#f7f7f7] dark:bg-[#1e1e1e] p-3">
            <div className="flex w-full items-start justify-between text-sm">
              <div className="spacey-y-2">
                <Skeleton className="w-14" />
                <Skeleton className="w-14" />
                <Skeleton className="w-14" />
              </div>
              <div className="spacey-y-2 text-right font-semibold">
                <Skeleton className="w-14" />
                <Skeleton className="w-14" />
                <Skeleton className="w-14" />
              </div>
            </div>

            <Separator className="dark:bg-slate-50" />
            <div className="flex w-full items-start justify-between text-sm font-bold mt-1">
              <Skeleton className="w-14" />
              <Skeleton className="w-14" />
            </div>
          </div>
          <Skeleton className="w-32" />
        </Container>
        {/* RIDER */}
        <Container className="flex flex-col  w-full lg:w-2/6  h-52 rounded-lg p-3 gap-2">
          <div className="flex justify-between">
            <div className="">
              <Skeleton className="w-32" />
              <Skeleton className="w-32" />
            </div>
            <Skeleton className="w-32" />
          </div>
        </Container>
      </article>

      <article className="flex flex-col lg:flex-row w-full gap-4">
        {/* PACKAGE DETAILS */}
        <Container className="flex flex-col  w-full lg:w-2/6  h-52 rounded-lg p-3 gap-2">
          <Skeleton className="w-14" />
          <Skeleton className="w-14" />
        </Container>
        <div className="flex flex-col  w-full lg:w-2/6  h-52 rounded-lg p-3 gap-2">
          <Skeleton className="w-32" />
          <Skeleton className="w-32" />

          <div className="grid w-full max-w-sm items-center gap-1.5"></div>
        </div>
        <Container className="flex flex-col  w-full lg:w-2/6 h-52 rounded-lg p-3 gap-2">
          <div className="flex justify-between">
            <div className="">
              <Skeleton className="w-14" />
              <Skeleton className="w-14" />
            </div>
            <Skeleton className="w-32" />
          </div>
          <div className="w-full flex flex-col items-start justify-between h-screen rounded-md bg-[#f7f7f7] dark:bg-[#1e1e1e] p-3">
            <div className="flex w-full items-start justify-between text-sm">
              <div className="space-y-1">
                <Skeleton className="w-14" />
                <Skeleton className="w-14" />
                <Skeleton className="w-14" />
                <Skeleton className="w-14" />
              </div>
              <div className="space-y-1 text-right font-semibold">
                <Skeleton className="w-14" />
                <Skeleton className="w-14" />
                <Skeleton className="w-14" />
                <Skeleton className="w-14" />
              </div>
            </div>
          </div>
        </Container>
      </article>
    </>
  );
}
