import { PublicHeader } from "@/features/browse/components/PublicHeader";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <PublicHeader />
      <main className="flex-1 flex flex-col">{children}</main>
    </div>
  );
}
