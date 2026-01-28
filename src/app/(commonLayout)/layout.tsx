import Navbar from "@/components/navbar";

export default function CommonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <Navbar></Navbar>
      {children}
    </section>
  );
}
