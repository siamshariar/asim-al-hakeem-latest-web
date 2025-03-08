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
  const desktopNavRef = useRef(null);
  const mobileNavRef = useRef(null);
  const [scrollTop, setScrollTop] = useState(0);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [lecturesSubmenuOpen, setLecturesSubmenuOpen] = useState(false);
  const [isScrollingUp, setIsScrollingUp] = useState(false);

  const num = playlists && playlists.length ? Math.ceil(playlists.length / 3) : 0;
  const firstList = playlists ? playlists.slice(0, num) : [];
  const secondList = playlists ? playlists.slice(num, num * 2.1) : [];
  const thirdList = playlists ? playlists.slice(num * 1.8, playlists.length) : [];

  const numQ = qna_categories && qna_categories.length ? Math.ceil(qna_categories.length / 3) : 0;
  const firstListQ = qna_categories ? qna_categories.slice(0, numQ) : [];
  const secondListQ = qna_categories ? qna_categories.slice(numQ, numQ * 2) : [];
  const thirdListQ = qna_categories ? qna_categories.slice(numQ * 2, qna_categories.length) : [];

  const router = useRouter();

  const isActive = (path) => router.pathname === path;

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollTop = window.pageYOffset;
      setScrollTop(currentScrollTop);

      if (currentScrollTop > lastScrollTop) {
        setIsScrollingUp(false);
      } else if (currentScrollTop < lastScrollTop) {
        setIsScrollingUp(true);
      }

      setLastScrollTop(currentScrollTop);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollTop]);

  useEffect(() => {
    if (headerRef.current) {
      if (scrollTop > 20) {
        headerRef.current.classList.add("header-fixed", "header-scroll");
      } else {
        headerRef.current.classList.remove("header-fixed", "header-scroll");
      }

      if (!isScrollingUp && scrollTop > 100) {
        headerRef.current.classList.add("hide-header");
        desktopNavRef.current?.classList.add("hide-desktop-nav");
      } else {
        headerRef.current.classList.remove("hide-header");
        desktopNavRef.current?.classList.remove("hide-desktop-nav");
      }
    }
  }, [scrollTop, isScrollingUp]);

  const toggleMobileNav = () => {
    setMobileNavOpen((prev) => !prev);
  };

  const toggleLecturesSubmenu = () => {
    setLecturesSubmenuOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileNavRef.current && !mobileNavRef.current.contains(event.target)) {
        setMobileNavOpen(false);
      }
    };

    if (mobileNavOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mobileNavOpen]);

  return (
    <>
      <header ref={headerRef} className="py-2 bg-white lg:pt-4 lg:pb-[40px] transition-all duration-500">
        <div className="lg:hidden flex justify-start ml-2">
          <button onClick={toggleMobileNav} className="text-3xl p-4 focus:outline-none">
            <i className={mobileNavOpen ? "ri-menu-line" : "ri-menu-line"}></i>
          </button>
        </div>
        <div className="container mx-auto z-30 lg:relative flex flex-col lg:flex-row justify-between gap-y-1 lg:gap-y-0">
          <div className="flex justify-center mr-[545px] items-center w-full lg:w-auto">
            <Link href="/">
              <Image src="/img/id/logo.png" alt="Logo" width={125} height={50} />
            </Link>
          </div>
          <div className="flex justify-center mr-4 items-center gap-x-2 lg:justify-normal">
            <i className="ri-mail-fill text-2xl text-accent"></i>
            <div className="text-secondary">sheikhassim.bookings@gmail.com</div>
          </div>
          <button
              onClick={() => window.location.href = '/counselling'}
              className="button w-[200px] h-[48px] mb-4 lg:w-auto mx-auto lg:mx-0"
            >
            Counselling
          </button>
          <div className="flex flex-col gap-y-4 lg:flex-row lg:gap-x-10 lg:gap-y-0">
            <nav
              ref={desktopNavRef}
              className="bg-white absolute px-[300px] scroll-down w-full left-0 -bottom-[68px] shadow-custom1 h-16 rounded-[10px] hidden lg:flex lg:items-center lg:justify-center transition-all duration-500"
            >
              <ul className="flex text-[20px]">
                <li>
                  <Link
                href="/"
                className={`border-r-[1px] border-[#DCDCDC] pr-8 text-secondary text-[20px] hover:text-accent transition-all duration-300 ${
                  isActive("/") ? "text-accent font-bold" : ""
                }`}
                >
                Home
              </Link>
                </li>
                <li className="relative group">
                  <Link
                    href="#"
                    className={`border-r-[1px] border-[#DCDCDC] flex items-center text-secondary text-[20px] hover:text-accent transition-all duration-300 ${
                      router.pathname.startsWith("/lectures") ? "text-accent font-bold" : ""
                    }`}
                  >
                    Lectures
                    <span className="ml-2 flex items-center transition-transform duration-300 ease-in-out group-hover:rotate-180">
                      <ExpandMoreIcon />
                    </span>
                  </Link>
                  <div className="sub-menu absolute bg-white mb-4 p-4 shadow-lg hidden group-hover:block w-[1000px] h-[350px]">
                    <div className="sub-menu-wrap scrollbar p-0 px-4 py-4 overflow-y-auto h-full flex gap-x-8">
                      <ul className="flex flex-col w-1/3 p-0 justify-start items-start submenu-links text-[#525252]">
                        {firstList.map((playlist) => (
                          <li className="mb-4 p-0" key={playlist.id}>
                           <Link
                              href={`/lectures/${playlist.id}`}
                              className="text-[#525252] hover:bg-transparent hover:text-black transition-all duration-300 text-[1.1rem] leading-[2rem] p-0 w-full"
                            >
                              {playlist.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                      <ul className="flex flex-col w-1/3 p-0 justify-start items-start submenu-links text-[#525252]">
                        {secondList.map((playlist) => (
                          <li className="mb-4" key={playlist.id}>
                           <Link
                              href={`/lectures/${playlist.id}`}
                              className="text-[#525252] hover:bg-transparent hover:text-black transition-all duration-300 text-[1.1rem] leading-[2rem] p-0 w-full"
                            >
                              {playlist.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                      <ul className="flex flex-col w-1/3 p-0 justify-start submenu-links text-[#525252]">
                        {thirdList.map((playlist) => (
                          <li className="mb-4" key={playlist.id}>
                           <Link
                              href={`/lectures/${playlist.id}`}
                              className="text-[#525252] hover:bg-transparent hover:text-black transition-all duration-300 text-[1.1rem] leading-[2rem] p-0 w-full"
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
                  <Link href="/articles" className={`border-r-[1px] border-[#DCDCDC] px-8 text-secondary text-[20px] hover:text-accent transition-all duration-300 ${
                  isActive("/articles") ? "text-accent font-bold" : ""
                  }`}
                  >
                    Articles
                  </Link>
                </li>
                <li>
                  <Link href="/books" className={`border-r-[1px] border-[#DCDCDC] px-8 text-secondary text-[20px] hover:text-accent transition-all duration-300 ${
                  isActive("/books") ? "text-accent font-bold" : ""
                  }`}
                  >
                    Books
                  </Link>
                </li>
                <li>
                  <Link href="/questions" className={`border-r-[1px] border-[#DCDCDC] px-8 text-secondary text-[20px] hover:text-accent transition-all duration-300 ${
                  isActive("/questions") ? "text-accent font-bold" : ""
                  }`}
                  >
                    Qna
                  </Link>
                </li>
                <li>
                <Link
                  href="/counselling"
                  className={`border-r-[1px] border-[#DCDCDC] px-8 text-secondary text-[20px] hover:text-accent transition-all duration-300 ${
                    isActive("/counselling") ? "text-accent font-bold" : ""
                  }`}
                >
                  Counselling
                </Link>
                </li>
                <li>
                  <Link href="/ask-question" className={`border-r-[1px] border-[#DCDCDC] px-8 text-secondary text-[20px] hover:text-accent transition-all duration-300 ${
                  isActive("/ask-question") ? "text-accent font-bold" : ""
                  }`}
                  >
                    Questions
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className={`border-r-[1px] border-[#DCDCDC] px-8 text-secondary text-[20px] hover:text-accent transition-all duration-300 ${
                  isActive("/contact") ? "text-accent font-bold" : ""
                  }`}
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/about" className={`border-[#DCDCDC] px-8 text-secondary text-[20px] hover:text-accent transition-all duration-300 ${
                  isActive("/about") ? "text-accent font-bold" : ""
                  }`}
                  >
                    About
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <div className="flex flex-col gap-y-4 lg:flex-row lg:gap-x-10 lg:gap-y-0">
            <div className="flex justify-center hide items-center gap-x-2 lg:justify-normal">
              <i className="ri-map-pin-2-fill text-2xl text-accent"></i>
              <div className="text-secondary">123 Arling, Miola</div>
            </div>
            <div className="flex justify-center hide items-center gap-x-2 lg:justify-normal">
              <i className="ri-phone-fill text-2xl text-accent"></i>
              <div className="text-secondary">(+487 384 9452)</div>
            </div>

            {/* Mobile Navigation */}
            <nav
              ref={mobileNavRef}
              className={`bg-white fixed w-[300px] md:w-[680px] pb-[150px] top-0 h-screen shadow-2xl lg:hidden transition-all z-20 ${
                mobileNavOpen ? 'left-0' : '-left-[300px] md:-left-[680px]'
              }`}
            >
              <div className="px-2 md:px-6 flex flex-col gap-y-12 h-full">
                <a href="#">
                  <img src="/img/id/logo.png" className="w-[200px] md:w-[300px] mx-auto " alt="Logo" />
                </a>
                <ul className="flex overflow-x-auto scrollbar-thin scrollbar-thumb-gray-900 flex-col text-[22px]">
                  <div className="flex">
                    <i className="ri-home-4-fill text-[28px] text-[#44929C]"></i>
                    <div>
                      <Link href="/" className="text-secondary text-[20px] hover:text-accent transition-all duration-300">
                        Home
                      </Link>
                    </div>
                  </div>
                  <li className="relative group">
                    <div className="flex">
                      <i className="ri-file-video-fill text-[28px] text-[#44929C]"></i>
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
                    <i className="ri-article-fill text-[28px] text-[#44929C]"></i>
                    <li>
                      <Link href="/articles" className="text-secondary text-[20px] hover:text-accent rounded-lg transition-all duration-300">
                        Articles
                      </Link>
                    </li>
                  </div>
                  <div className="flex">
                    <i class="ri-book-shelf-line text-[28px] text-[#44929C]"></i>
                    <li>
                      <Link href="/books" className="text-secondary text-[20px] hover:text-accent rounded-lg transition-all duration-300">
                        Books
                      </Link>
                    </li>
                  </div>
                  <div className="flex">
                    <i class="ri-question-answer-fill text-[28px] text-[#44929C]"></i>
                    <li>
                      <Link href="/questions" className="text-secondary text-[20px] hover:text-accent rounded-lg transition-all duration-300">
                        Qna
                      </Link>
                    </li>
                  </div>
                  <div className="flex">
                    <i class="ri-group-fill text-[28px] text-[#44929C]"></i>
                    <li>
                      <Link href="/counselling" className="text-secondary text-[20px] hover:text-accent rounded-lg transition-all duration-300">
                        Counselling 
                      </Link>
                    </li>
                  </div>
                  <div className="flex">
                    <i class="ri-questionnaire-fill text-[28px] text-[#44929C]"></i>
                    <li>
                      <Link href="/ask-question" className="text-secondary text-[20px] hover:text-accent rounded-lg transition-all duration-300">
                        Questions 
                      </Link>
                    </li>
                  </div>
                  <div className="flex">
                    <i class="ri-contacts-fill text-[28px] text-[#44929C]"></i>
                    <li>
                      <Link href="/contact" className="text-secondary text-[20px] hover:text-accent rounded-lg transition-all duration-300">
                        Contact 
                      </Link>
                    </li>
                  </div>
                  <div className="flex">
                    <i class="ri-profile-fill text-[28px] text-[#44929C]"></i>
                    <li>
                      <Link href="/about" className="text-secondary text-[20px] hover:text-accent rounded-lg transition-all duration-300">
                        About 
                      </Link>
                    </li>
                  </div>
                </ul>
              </div>
            </nav>

            {/* Desktop Navigation */}
            
      </div>
    </>
  );
}
