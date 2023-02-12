// import Header from "./header";
// import Header from "./header3";
import Footer from "./footer";
// import { useRouter } from "next/router";

export default function Layout({ children, page }) {
  // const router = useRouter();
  return (
    <>
      <div className="content_without_footer">
        {/* <Header /> */}
        <main className={`viewport homepage home-3`}>{children}</main>
      </div>
      <Footer />
    </>
  );
}
