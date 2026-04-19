import Footer from "./footer";
import { useRouter } from "next/router";

export default function Layout({ children }) {
  const router = useRouter();
  const shouldShowFooter = router.pathname !== '/500';

  return (
    <>
      <div className="content_without_footer">
        <main className="homepage home-3">{children}</main>
      </div>
      {shouldShowFooter && <Footer />}
    </>
  );
}