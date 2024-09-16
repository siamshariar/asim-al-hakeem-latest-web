import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import 'remixicon/fonts/remixicon.css';
import ExpandMoreIcon from "@mui/icons-material/ExpandMoreOutlined";
import { useRouter } from "next/router";

export default function Header2({
  playlists,
  activePlaylistId,
  activeCatSlug,
  lectures,
  qna_categories,
}) {
  const headerRef = useRef(null);
  const [scrollTop, setScrollTop] = useState(0);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [lecturesSubmenuOpen, setLecturesSubmenuOpen] = useState(false); // Added for submenu

  const num = playlists && playlists.length ? Math.ceil(playlists.length / 3) : 0;
  const firstList = playlists ? playlists.slice(0, num) : [];
  const secondList = playlists ? playlists.slice(num, num * 2.1) : [];
  const thirdList = playlists ? playlists.slice(num * 1.7, playlists.length) : [];


  const numQ = qna_categories && qna_categories.length ? Math.ceil(qna_categories.length / 3) : 0;
  const firstListQ = qna_categories ? qna_categories.slice(0, numQ) : [];
  const secondListQ = qna_categories ? qna_categories.slice(numQ, numQ * 2) : [];
  const thirdListQ = qna_categories ? qna_categories.slice(numQ * 2, qna_categories.length) : [];


  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrollTop(window.pageYOffset);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (headerRef.current) {
      headerRef.current.classList.toggle('header-fixed', scrollTop > 20);
      headerRef.current.classList.toggle('header-scroll', scrollTop > 20);
    }
  }, [scrollTop]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        headerRef.current &&
        !headerRef.current.contains(event.target) &&
        mobileNavOpen
      ) {
        setMobileNavOpen(false);
      }
    };

    if (mobileNavOpen) {
      window.addEventListener('click', handleClickOutside);
    } else {
      window.removeEventListener('click', handleClickOutside);
    }

    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, [mobileNavOpen]);

  const toggleMobileNav = () => {
    setMobileNavOpen((prev) => !prev);
  };

  const toggleLecturesSubmenu = () => {
    setLecturesSubmenuOpen((prev) => !prev); // Toggles the lectures submenu
  };

  return (
    <>
      <header ref={headerRef} className="py-4 bg-white lg:pt-6 lg:pb-[55px]">
        <div className="container mx-auto lg:relative flex flex-col lg:flex-row lg:justify-between gap-y-4 lg:gap-y-0">
          <div className="flex justify-center lg:justify-normal">
            <Link href="/">
              <Image src="/img/id/logo.png" alt="Logo" width={125} height={50} />
            </Link>
          </div>

          <div className="flex flex-col gap-y-4 lg:flex-row lg:gap-x-10 lg:gap-y-0">
            <div className="flex justify-center items-center gap-x-2 lg:justify-normal">
              <i className="ri-map-pin-2-fill text-2xl text-accent"></i>
              <div className="text-secondary">123 Arling, Miola</div>
            </div>
            <div className="flex justify-center items-center gap-x-2 lg:justify-normal">
              <i className="ri-phone-fill text-2xl text-accent"></i>
              <div className="text-secondary">(+487 384 9452)</div>
            </div>
            <button className="button w-[200px] mt-2 lg:w-auto mx-auto lg:mx-0">
              Book now
            </button>

            {/* Mobile Navigation */}
            <nav
             className={`bg-white fixed w-[300px] md:w-[680px] pb-[150px] top-0 h-screen shadow-2xl lg:hidden transition-all z-20 ${
              mobileNavOpen
                ? "left-0"
                : `-left-[300px] md:-left-[680px]`
            }`}
            
            
            >
            <div
                className="mnav__close-btn  bg-primary w-8 h-8 relative -right-full top-8 flex justify-center items-center rounded-tr-lg rounded-br-lg cursor-pointer transition-all"
                onClick={toggleMobileNav}
              >
                <i
                  className={`mnav__close-btn-icon mt-6 text-2xl text-white ${
                    mobileNavOpen
                      ? "ri-arrow-left-s-line"
                      : "ri-arrow-right-s-line"
                  }`}
                ></i>
              </div>

              <div className="px-2 md:px-6 flex flex-col gap-y-12 h-full">
                <a href="#">
                  <img src="/img/id/logo.png" className="w-[200px]   md:w-[300px] mx-auto " alt="Logo" />
                </a>
                <ul className="flex  overflow-x-auto scrollbar-thin flex-col text-[22px]">
                  <div className="flex">
                    <i class="ri-home-4-fill text-[28px] text-[#44929C]"></i>
                    <li>
                      <Link href="#" className="text-secondary text-[20px] hover:text-accent transition-all duration-300">
                        Home
                      </Link>
                    </li>
                  </div>
                  <li className="relative group">
                    <div className="flex">
                      <i class="ri-file-video-line text-[28px] text-[#44929C]"></i>
                      <div
                        onClick={toggleLecturesSubmenu}
                        className={`flex items-center ml-[15px] text-[20px] cursor-pointer ${
                          lecturesSubmenuOpen ? "text-accent" : "text-secondary"
                        } hover:text-accent transition-all duration-1000`}
                      >
                        Lectures
                        <span className={`ml-[120px] md:ml-[450px] transition-transform duration-1000 ${lecturesSubmenuOpen ? "rotate-180" : ""}`}>
                          <ExpandMoreIcon />
                        </span>
                      </div>
                    </div>
                    {lecturesSubmenuOpen && (
                      <div className="sub-menu bg-white mt-2 h-32">
                        <ul className="submenu-links  ml-2 text-[#525252]">
                          {firstList.map((playlist) => (
                            <li key={playlist.id} className="w-full ">
                              <Link
                                href={`/lectures/${playlist.id}`}
                                className="text-[#525252] underline text-[17px] hover:text-black transition-all duration-300"
                              >
                                {playlist.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                        <ul className="submenu-links ml-2 text-[#525252]">
                          {secondList.map((playlist) => (
                            <li key={playlist.id} className="w-full">
                              <Link
                                href={`/lectures/${playlist.id}`}
                                className="text-[#525252] underline text-[17px] hover:text-black transition-all duration-300"
                              >
                                {playlist.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                        <ul className="submenu-links ml-2 text-[#525252]">
                          {thirdList.map((playlist) => (
                            <li key={playlist.id} className="w-full">
                              <Link
                                href={`/lectures/${playlist.id}`}
                                className="text-[#525252] underline text-[17px] hover:text-black transition-all duration-300"
                              >
                                {playlist.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </li>
                  <div className="flex">
                    <i class="ri-article-fill text-[28px] text-[#44929C]"></i>
                    <li>
                      <Link href="/articles" className="text-secondary text-[20px] hover:text-accent transition-all duration-300">
                        Articles
                      </Link>
                    </li>
                  </div>
                  <div className="flex">
                    <i class="ri-book-read-line text-[28px] text-[#44929C]"></i>
                    <li>
                      <Link href="#" className="text-secondary text-[20px] hover:text-accent transition-all duration-300">
                        Books
                      </Link>
                    </li>
                  </div>
                  <div className="flex">
                    <i class="ri-question-answer-fill text-[28px] text-[#44929C]"></i>
                    <li>
                        <Link href="#" className="text-secondary text-[20px] hover:text-accent transition-all duration-300">
                        Ask a Questions
                        </Link>
                    </li>
                  </div>
                  <div className="flex">
                    <i class="ri-contacts-book-fill text-[28px] text-[#44929C]"></i>
                    <li>
                      <Link href="#" className="text-secondary text-[20px] hover:text-accent transition-all duration-300">
                      Contact
                      </Link>
                    </li>
                  </div>
                  <div className="flex">
                    <i class="ri-contacts-fill text-[28px] text-[#44929C]"></i>
                    <li>
                    <Link href="#" className="text-secondary text-[20px] hover:text-accent transition-all duration-300">
                      About
                    </Link>
                  </li>
                  </div>
                </ul>
              </div>
              <form className="relative w-[250px] pb-2 ml-2 md:ml-12 mt-5 flex gap-x-[10px]">
                <label for="mnav-search-input">
                  <i className="ri-search-line mt-4 text-2xl text-accent"></i>
                </label>
                <input
                  type="text"
                  id="mnav-search-input"
                  placeholder="Search..."
                  className="outline-none w-[160px] border-b-2 focus:border-b-2 focus:border-accent placeholder:italic"
                />
              </form>
            </nav>

            {/* Desktop Navigation */}
            <nav className="bg-white absolute w-full left-0 -bottom-[86px] shadow-custom1 h-16 rounded-[10px] hidden lg:flex lg:items-center lg:justify-between lg:px-[40px]">
              <ul className="flex text-[20px]">
                <li>
                  <Link href="#" className="border-r-[1px] border-[#DCDCDC] pr-8 text-secondary text-[20px] hover:text-accent transition-all duration-300">
                    Home
                  </Link>
                </li>
                <li className="relative group">
                  <Link
                    href="#"
                    className={`border-r-[1px] border-[#DCDCDC] flex items-center text-secondary text-[20px] hover:text-accent transition-all duration-300 ${
                      router.pathname.startsWith("/lectures") ? "menu-active" : ""
                    }`}
                  >
                    Lectures
                    <span className="ml-2 flex items-center transition-transform duration-300 ease-in-out group-hover:rotate-180">
                      <ExpandMoreIcon />
                    </span>
                  </Link>
                  <div className="sub-menu absolute bg-white shadow-lg hidden group-hover:block mt-2 w-[900px] h-[500px]">
                    <div className="sub-menu-wrap scrollbar px-4 py-2 overflow-y-auto h-full flex gap-x-8">
                      <ul className="flex flex-col w-1/3 p-0 justify-start items-start submenu-links text-[#525252]">
                        {firstList.map((playlist) => (
                          <li key={playlist.id}>
                            <Link
                              href={`/lectures/${playlist.id}`}
                              className="text-[#525252] hover:text-black transition-all duration-300"
                            >
                              {playlist.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                      <ul className="flex flex-col w-1/3 p-0 justify-start items-start submenu-links text-[#525252]">
                        {secondList.map((playlist) => (
                          <li key={playlist.id}>
                            <Link
                              href={`/lectures/${playlist.id}`}
                              className="text-[#525252] hover:text-black transition-all duration-300"
                            >
                              {playlist.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                      <ul className="flex flex-col w-1/3 p-0 justify-start items-start submenu-links text-[#525252]">
                        {thirdList.map((playlist) => (
                          <li key={playlist.id}>
                            <Link
                              href={`/lectures/${playlist.id}`}
                              className="text-[#525252] hover:text-black transition-all duration-300"
                            >
                              {playlist.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </li>
                <li>
                  <Link href="/articles" className="border-r-[1px] border-[#DCDCDC] px-8 text-secondary text-[20px] hover:text-accent transition-all duration-300">
                    Articles
                  </Link>
                </li>
                <li>
                  <Link href="/book" className="border-r-[1px] border-[#DCDCDC] px-8 text-secondary text-[20px] hover:text-accent transition-all duration-300">
                    Books
                  </Link>
                </li>
                <li>
                  <Link href="#" className="border-r-[1px] border-[#DCDCDC] px-8 text-secondary text-[20px] hover:text-accent transition-all duration-300">
                    Qna
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="border-r-[1px] border-[#DCDCDC] px-8 text-secondary text-[20px] hover:text-accent transition-all duration-300">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="border-r-[1px] border-[#DCDCDC] px-8 text-secondary text-[20px] hover:text-accent transition-all duration-300">
                    About
                  </Link>
                </li>
              </ul>

              <form className="relative w-[250px] pb-2 ml-4 mt-2 flex gap-x-[10px]">
                <label for="mnav-search-input">
                  <i className="ri-search-line mt-4 text-2xl text-accent"></i>
                </label>
                <input
                  type="text"
                  id="mnav-search-input"
                  placeholder="Search..."
                  className="outline-none w-[160px] border-b-2 focus:border-b-2 focus:border-accent placeholder:italic"
                />
              </form>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
}
