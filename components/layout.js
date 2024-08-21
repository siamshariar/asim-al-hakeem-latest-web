// components/Layout.js
import Footer from "./footer";
import { useRouter } from "next/router";

export default function Layout({ children }) {
  const router = useRouter();
  console.log('Current Pathname:', router.pathname);

  const shouldShowFooter = router.pathname !== '/500';

  return (
    <>
      <div className="content_without_footer">
        <main className={`viewport homepage home-3`}>{children}</main>
      </div>
      {shouldShowFooter && <Footer />}
    </>
  );
}
