export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="flex flex-col justify-center items-center min-h-screen">{children}</div>;
}

