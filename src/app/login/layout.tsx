import AuthHeader from "@/components/layout/authHeader";
import Footer from "@/components/layout/footer";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AuthHeader />
      <main>{children}</main>
      <Footer />
    </>
  );
}
