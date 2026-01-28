import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PracticeLayout({
  children,
  marketingSlot,
  salesSlot,
}: {
  children: React.ReactNode;
  marketingSlot: React.ReactNode;
  salesSlot: React.ReactNode;
  developmentSlot: React.ReactNode;
}) {
  return (
    <section>
      <Navbar></Navbar>
      <div className="flex justify-center gap-4 m-8">
        <Button asChild>
          <Link href="/marketing">Marketing</Link>
        </Button>
        <Button asChild>
          <Link href="/development">Development</Link>
        </Button>
        <Button asChild>
          <Link href="/sales">Sales</Link>
        </Button>
      </div>

      <div className="flex">
        {marketingSlot}
        {salesSlot}
      </div>

      <div>{children}</div>
    </section>
  );
}
