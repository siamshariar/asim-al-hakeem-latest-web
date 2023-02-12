import { youtube } from "../lib/config";
import Link from "next/link";

export default function Sidenav({ navOpen, navControl }) {
  const handleSidenavClose = (e) => {
    navControl(false)(e);
  };

  return (
    <>
      <div className={navOpen ? "opt_sidenav opt_open" : "opt_sidenav"}>
        <div className="opt_close" onClick={(e) => navControl(false)(e)}></div>

        <div className="opt_sidenav_inner">
          <ul className="opt_sidenav_menu">
            <li>
              <Link href="/">
                <a onClick={(e) => navControl(false)(e)}>হোম</a>
              </Link>
            </li>
            <li>
              <Link href={`/lectures/${youtube.uploadPlaylistID}`}>
                <a onClick={(e) => navControl(false)(e)}>ভিডিও লেকচার</a>
              </Link>
            </li>
            <li>
              <Link href="/articles/">
                <a onClick={(e) => navControl(false)(e)}>প্রবন্ধ সমূহ</a>
              </Link>
            </li>
            <li>
              <Link href="/books/">
                <a onClick={(e) => navControl(false)(e)}>বই সমূহ</a>
              </Link>
            </li>
            <li>
              <Link href="/research-papers/">
                <a onClick={(e) => navControl(false)(e)}>রিসার্স পেপারস</a>
              </Link>
            </li>
            <li>
              <Link href="/organizations/">
                <a onClick={(e) => navControl(false)(e)}>অর্গানাইজেশনস</a>
              </Link>
            </li>
          </ul>

          <div className="opt_sidenav_social">
            <h2>সামাজিক যোগাযোগ</h2>
            <ul>
              <li>
                <a
                  href="https://www.facebook.com/drmuhammadsaifullahofficial"
                  target="_blank"
                >
                  <i className="fab fa-facebook-f"></i>
                </a>
              </li>
              <li>
                <a
                  href="https://www.youtube.com/DrMuhammadSaifullah"
                  target="_blank"
                >
                  <i className="fab fa-youtube"></i>
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com/DrSaifullah1971"
                  target="_blank"
                >
                  <i className="fab fa-twitter"></i>
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/drsaifullahofficial"
                  target="_blank"
                >
                  <i className="fab fa-instagram"></i>
                </a>
              </li>
              <li>
                <a
                  href="https://t.me/AbuBakrZakaria"
                  target="_blank"
                >
                  <i className="fab fa-telegram"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div
        className={
          navOpen ? "opt_sidenav_backdrop opt_open" : "opt_sidenav_backdrop"
        }
        onClick={handleSidenavClose}
      ></div>
    </>
  );
}
