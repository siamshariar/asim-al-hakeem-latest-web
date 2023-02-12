import { server } from "../lib/config";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="page-width">
        <div className="box">
          <div
            className="footer-ctn"
            // style={{ borderBottom: "1px solid #e2e8f0" }}
          >
            <div className="foot-col">
              <p className="footer-copyright">
                &copy; ২০২২, সর্বস্বত্ব সংরক্ষিত
              </p>
              <p className="footer-powered-by">
                Powered By -{" "}
                <a
                  className="link-r"
                  href="https://www.deeniinfotech.com"
                  target="_blank"
                >
                  Deeni Info Tech
                </a>
              </p>

              {/* <h3 className="title-s">সামাজিক যোগাযোগ</h3> */}
              {/* <div className="foot-link"> */}
              {/* <a
                  className="link-r"
                  href="https://www.facebook.com/drmuhammadsaifullahofficial"
                  target="_blank"
                >
                  <i className="facebook fab fa-facebook-f"></i>ফেইসবুক
                </a>
                <a
                  className="link-r"
                  href="https://www.youtube.com/DrMuhammadSaifullah"
                  target="_blank"
                >
                  <i className="youtube fab fa-youtube"></i>ইউটিউব
                </a>
                <a
                  className="link-r"
                  href="https://www.youtube.com/DrMuhammadSaifullah"
                  target="_blank"
                >
                  <i className="twitter fab fa-twitter"></i>টুইটার
                </a> */}
              {/*<a*/}
              {/*    className="link-r"*/}
              {/*    href="https://www.youtube.com/DrMuhammadSaifullah"*/}
              {/*    target="_blank"*/}
              {/*>*/}
              {/*  <i className="instagram fab fa-instagram"></i>ইউটিউব*/}
              {/*</a>*/}
              {/*<a*/}
              {/*    className="link-r"*/}
              {/*    href="https://www.youtube.com/DrMuhammadSaifullah"*/}
              {/*    target="_blank"*/}
              {/*>*/}
              {/*  <i className="telegram fab fa-telegram"></i>ইউটিউব*/}
              {/*</a>*/}
              {/* </div> */}
            </div>

            <div className="foot-col">
              <Link href="/">
                <a className="footer-logo">
                  <Image
                    // src={`${server}/img/id/logo_english.png`}
                    src="/img/dr-saifullah-logo.png"
                    alt=""
                    width={132}
                    height={117}
                    objectFit="contain"
                    objectPosition="left top"
                    loading="eager" unoptimized
                  />
                </a>
              </Link>
            </div>

            {/*<div className="foot-col">*/}
            {/*  <h3 className="title-s">আরও জানুন</h3>*/}
            {/*  <div className="foot-link">*/}
            {/*    <Link href="/about">*/}
            {/*      <a className="link-r">পরিচিতি</a>*/}
            {/*    </Link>*/}
            {/*    <Link href="/contact">*/}
            {/*      <a className="link-r">যোগাযোগ</a>*/}
            {/*    </Link>*/}
            {/*  </div>*/}
            {/*</div>*/}

            <div className="foot-col">
              <div className="opt_footer_social">
                <h3 className="title-s">সামাজিক যোগাযোগ</h3>
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
                  {/*<li>*/}
                  {/*  <a href="https://t.me/AbuBakrZakaria" target="_blank">*/}
                  {/*    <i className="fab fa-telegram"></i>*/}
                  {/*  </a>*/}
                  {/*</li>*/}
                </ul>
              </div>

              {/* <h3 className="title-s">প্রয়োজনীয় লিংক</h3>
              <div className="foot-link">
                <Link href="/lectures/UUbMys3ID_1S8D1mZuYkoG2A">
                  <a className="link-r">ভিডিও লেকচার</a>
                </Link>
                <Link href="/books">
                  <a className="link-r">বই সমূহ</a>
                </Link>
                <Link href="/articles">
                  <a className="link-r">প্রবন্ধ সমূহ</a>
                </Link>
              </div> */}
            </div>
          </div>

          {/* <div className="footer-ctn" style={{ marginTop: "12px" }}>
            <div className="foot-col">
              <p className="footer-copyright">
                &copy; ২০২২, সর্বস্বত্ব সংরক্ষিত
              </p>
            </div>

            <div className="foot-col">
              <p className="footer-powered-by">
                Powered By -{" "}
                <a
                  className="link-r"
                  href="https://www.deeniinfotech.com"
                  target="_blank"
                >
                  Deeni Info Tech
                </a>
              </p>
            </div>
          </div> */}

          <div className="mobile-footer">
            <div className="row row-r">
              <div className="col col-r s12 l12">
                <div className="center-align">
                  <Link href="/">
                    <a className="footer-logo center-align">
                      <Image
                        // src={`${server}/img/id/logo_english.png`}
                        // width={120}
                        // height={26}
                        src="/img/dr-saifullah-logo.png"
                        alt=""
                        width={82}
                        height={72}
                        objectFit="contain"
                        objectPosition="left top"
                        loading="eager" unoptimized
                      />
                    </a>
                  </Link>
                </div>
                <div>
                  <p className="footer-copyright center-align">
                    <span>&copy; ২০২২, সর্বস্বত্ব সংরক্ষিত</span>
                  </p>
                </div>
                <div>
                  <p className="footer-powered-by center-align">
                    Powered By -{" "}
                    <a
                      className="link-r"
                      href="https://www.deeniinfotech.com"
                      target="_blank"
                    >
                      Deeni Info Tech
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
