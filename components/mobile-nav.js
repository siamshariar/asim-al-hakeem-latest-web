import Link from "next/link";
import Image from "next/image";
import Drawer from "@material-ui/core/Drawer";
import { server, youtube } from "../lib/config";
import HomeIcon from "@mui/icons-material/Home";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import ClassIcon from "@mui/icons-material/Class";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import PersonIcon from "@mui/icons-material/Person";
import MailIcon from "@mui/icons-material/Mail";

export default function MobileNav(props) {
  return (
    <Drawer
      anchor="left"
      open={props.navOpen}
      onClose={props.navControl(false)}
      className="mobile-menu-root"
    >
      <div className="mobile-menu">
        <div className="m-menu-wrap">
          <div className="m-menu-ctn">
            <div className="m-menu-top">
              <Link href="/">
                <a
                  onClick={(e) => props.navControl(false)(e)}
                  className="m-menu-logo"
                >
                  <Image
                    // src={`${server}/img/id/logo.png`}
                    src={`${server}/img/dr-saifullah-logo.png`}
                    alt=""
                    width={80}
                    height={67}
                    objectFit="contain"
                    objectPosition="left center"
                    loading="eager" unoptimized
                  />
                </a>
              </Link>
            </div>

            <ul className="m-menu">
              <li>
                <Link href="/">
                  <a onClick={(e) => props.navControl(false)(e)}>
                    <HomeIcon />
                    হোম
                  </a>
                </Link>
              </li>
              <li>
                <Link href={`/lectures/${youtube.uploadPlaylistID}`}>
                  <a onClick={(e) => props.navControl(false)(e)}>
                    <VideoLibraryIcon />
                    ভিডিও লেকচার
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/articles">
                  <a onClick={(e) => props.navControl(false)(e)}>
                    <LibraryBooksIcon />
                    প্রবন্ধ সমূহ
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/books">
                  <a onClick={(e) => props.navControl(false)(e)}>
                    <MenuBookIcon />
                    বই সমূহ
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/research-papers">
                  <a onClick={(e) => props.navControl(false)(e)}>
                    <ClassIcon />
                    রিসার্চ পেপারস
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/organizations">
                  <a onClick={(e) => props.navControl(false)(e)}>
                    <CorporateFareIcon />
                    অর্গানাইজেশনস
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/about">
                  <a onClick={(e) => props.navControl(false)(e)}>
                    <PersonIcon />
                    জীবন চরিত
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <a onClick={(e) => props.navControl(false)(e)}>
                    <MailIcon />
                    যোগাযোগ
                  </a>
                </Link>
              </li>
            </ul>
          </div>

          <div className="m-menu-bottom">
            <hr className="m-menu-hr" />

            <div className="m-menu-social">
              <a
                href="https://www.facebook.com/drmuhammadsaifullahofficial"
                target="_blank"
              >
                <i className="facebook fab fa-facebook-f"></i>
              </a>
              <a
                href="https://www.youtube.com/DrMuhammadSaifullah"
                target="_blank"
              >
                <i className="youtube fab fa-youtube"></i>
              </a>
              <a href="https://twitter.com/DrSaifullah1971" target="_blank">
                <i className="twitter fab fa-twitter"></i>
              </a>
              <a
                href="https://www.instagram.com/drsaifullahofficial"
                target="_blank"
              >
                <i className="instagram fab fa-instagram"></i>
              </a>
            </div>
          </div>

          {/*<div className="m-menu-bottom">*/}
          {/*  <p className="footer-powered-by">*/}
          {/*    Powered By -{" "}*/}
          {/*    <a*/}
          {/*      className="link-r"*/}
          {/*      href="https://www.deeniinfotech.com"*/}
          {/*      target="_blank"*/}
          {/*    >*/}
          {/*      Deeni Info Tech*/}
          {/*    </a>*/}
          {/*  </p>*/}
          {/*</div>*/}
        </div>
      </div>
    </Drawer>
  );
}
