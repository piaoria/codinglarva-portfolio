export default async function WikiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-8">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex gap-8">
          <div className="flex-1">{children}</div>
        </div>
      </div>
    </div>
  );
}
