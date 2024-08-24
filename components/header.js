import { youtube } from "../lib/config";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import TvIcon from "@mui/icons-material/TvOutlined";
import DescriptionIcon from "@mui/icons-material/DescriptionOutlined";
import BookIcon from "@mui/icons-material/BookOutlined";
import ArticleIcon from "@mui/icons-material/ArticleOutlined";
import CorporateFareIcon from "@mui/icons-material/CorporateFareOutlined";
import InfoIcon from "@mui/icons-material/InfoOutlined";
import ContactIcon from "@mui/icons-material/ContactPageOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMoreOutlined";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import MobileNav from "./mobile-nav";
import { useRouter } from "next/router";

export default function Header({
	playlists,
	activePlaylistId,
	activeCatSlug,
	lectures,
	qna_categories,
}) {
	// show hide header on scroll
	const router = useRouter();
	const header = useRef(null);
	const [scrollTop, setScrollTop] = useState(0);
	const [didMount, setDidMount] = useState(false);

	const num = Math.ceil(playlists.length / 3);
	const firstList = playlists.slice(0, num);
	const secondList = playlists.slice(num, num * 2.1);
	const thirdList = playlists.slice(num * 1.7, playlists.length);

	const numQ = Math.ceil(qna_categories.length / 3);
	const firstListQ = qna_categories.slice(0, numQ);
	const secondListQ = qna_categories.slice(numQ, numQ * 2);
	const thirdListQ = qna_categories.slice(numQ * 2, playlists.length);

	useEffect(() => {
		setDidMount(true);

		window.onscroll = () => {
			setScrollTop(window.pageYOffset);
		};
		if (scrollTop > 20) {
			header.current.classList.add("scroll_up");
		} else {
			header.current.classList.remove("scroll_up");
		}
		//setLastScrollTop(scrollTop);

		return () => setDidMount(false);
	}, [scrollTop]);

	const [mobileNavOpen, setMobileNavOpen] = useState(false);
	const toggleMobileNav = (open) => (event) => {
		if (
			event.type === "keydown" &&
			(event.key === "Tab" || event.key === "Shift")
		) {
			return;
		}
		setMobileNavOpen(open);
	};

	return <>
        <header className="header header-3" ref={header}>
            <div className="headline row">
                <div className="page-width">
                    <div className="box">
                        <div className="headline-ctn col s6 m6">
                            <div className="d-flex align-center">
                                <PlayCircleOutlineIcon />
                                <span className="headline-title">Headline:</span>
                                <div className="vwrap">
                                    <ul className="vmove">
                                        {lectures.videoLists &&
                                            lectures.videoLists.map((item, i) => (
                                                // <div
                                                // 	className="col col-r s12 m6 l4 xl3"
                                                // 	key={item.id}>
                                                // 	<PostCard
                                                // 		item={item}
                                                // 		statistics={lectures.videoStats}
                                                // 	/>
                                                // </div>
                                                <li className="vitem" key={i}>
                                                    <Link href={`/lectures/watch/${item.id}`}>
                                                        {item.title}
                                                    </Link>
                                                </li>
                                            ))}

                                        {/* again 1st item */}
                                        {
                                            <li className="vitem">
                                                <Link
                                                    href={`/lectures/watch/${
                                                        lectures.videoLists && lectures.videoLists[0].id
                                                    }`}>

                                                    {lectures.videoLists &&
                                                        lectures.videoLists[0].title}

                                                </Link>
                                            </li>
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="h-socials col s6 m6">
                            <ul>
                                <li>
                                    <a
                                        href="https://www.facebook.com/SheikhAssimAlhakeemTeam/"
                                        target="_blank">
                                        <i className=" fab fa-facebook-f"></i>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://instagram.com/assimalhakeem?igshid=1v9psnayget6c"
                                        target="_blank">
                                        <i className=" fab fa-instagram"></i>
                                    </a>
                                </li>
                                <li>
                                    <a href="https://twitter.com/Assimalhakeem" target="_blank">
                                        <i className=" fab fa-twitter"></i>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://www.youtube.com/user/assimalhakeem"
                                        target="_blank">
                                        <i className=" fab fa-youtube"></i>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="navbar row">
                <div className="page-width">
                    <div className="box">
                        <div className="header-ctn">
                            <Link href="/" className="header-logo">

                                <Image
                                    src="/img/logo.png"
                                    alt=""
                                    width={150}
                                    height={70}
                                    objectFit="contain"
                                    objectPosition="left center"
                                    loading="eager"
                                    unoptimized
                                />

                            </Link>

                            <ul className="main-menu">
                                <li>
                                    <Link href="/" className={router.pathname === "/" ? "active" : ""}>

                                        {/*<span className="main-menu-icon">*/}
                                        {/*  <BookIcon />*/}
                                        {/*</span>*/}Home
                                    </Link>
                                </li>
                                <li>
                                    {/* <Link href={`/lectures/${youtube.uploadPlaylistID}`}> */}
                                    <a
                                        className={
                                            router.pathname.startsWith("/lectures")
                                                ? "menu-active"
                                                : ""
                                        }>
                                        Lectures
                                        <span className="main-menu-icon icon-more">
                                            <ExpandMoreIcon />
                                        </span>
                                    </a>
                                    {/* </Link> */}

                                    <div className="sub-menu">
                                        <div className="sub-menu-wrap scrollbar">
                                            <ul>
                                                {firstList &&
                                                    firstList.map((playlist) => (
                                                        <li key={playlist.id}>
                                                            <Link
                                                                href={`/lectures/${playlist.id}`}
                                                                className={
                                                                    router.asPath ===
                                                                    `/lectures/${playlist.id}`
                                                                        ? "active"
                                                                        : ""
                                                                }>

                                                                {playlist.title}

                                                            </Link>
                                                        </li>
                                                    ))}
                                            </ul>

                                            <ul>
                                                {secondList &&
                                                    secondList.map((playlist) => (
                                                        <li key={playlist.id}>
                                                            <Link
                                                                href={`/lectures/${playlist.id}`}
                                                                className={
                                                                    router.asPath ===
                                                                    `/lectures/${playlist.id}`
                                                                        ? "active"
                                                                        : ""
                                                                }>

                                                                {playlist.title}

                                                            </Link>
                                                        </li>
                                                    ))}
                                            </ul>

                                            <ul>
                                                {thirdList &&
                                                    thirdList.map((playlist) => (
                                                        <li key={playlist.id}>
                                                            <Link
                                                                href={`/lectures/${playlist.id}`}
                                                                className={
                                                                    router.asPath ===
                                                                    `/lectures/${playlist.id}`
                                                                        ? "active"
                                                                        : ""
                                                                }>

                                                                {playlist.title}

                                                            </Link>
                                                        </li>
                                                    ))}
                                            </ul>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <Link
                                        href="/articles"
                                        className={
                                            router.pathname.startsWith("/articles")
                                                ? "active"
                                                : ""
                                        }>
                                        
                                            Articles
                                        
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/books"
                                        className={
                                            router.pathname.startsWith("/books") ? "active" : ""
                                        }>
                                        
                                            Books
                                        
                                    </Link>
                                </li>

                                <li>
                                    <a
                                        className={
                                            router.pathname.startsWith("/questions")
                                                ? "menu-active"
                                                : ""
                                        }>
                                        QnA
                                        <span className="main-menu-icon icon-more">
                                            <ExpandMoreIcon />
                                        </span>
                                    </a>

                                    <div className="sub-menu sub-menu2">
                                        <div className="sub-menu-wrap scrollbar">
                                            <ul>
                                                {firstListQ &&
                                                    firstListQ.map((item, i) => (
                                                        <li key={i}>
                                                            <Link
                                                                href={`/questions/${item.slug}`}
                                                                className={
                                                                    router.asPath ===
                                                                    `/questions/${item.slug}`
                                                                        ? "active"
                                                                        : ""
                                                                }>

                                                                {item.title}

                                                            </Link>
                                                        </li>
                                                    ))}
                                            </ul>

                                            <ul>
                                                {secondListQ &&
                                                    secondListQ.map((item) => (
                                                        <li key={item.id}>
                                                            <Link
                                                                href={`/questions/${item.slug}`}
                                                                className={
                                                                    router.asPath ===
                                                                    `/questions/${item.slug}`
                                                                        ? "active"
                                                                        : ""
                                                                }>

                                                                {item.title}

                                                            </Link>
                                                        </li>
                                                    ))}
                                            </ul>

                                            <ul>
                                                {thirdListQ &&
                                                    thirdListQ.map((item) => (
                                                        <li key={item.id}>
                                                            <Link
                                                                href={`/questions/${item.slug}`}
                                                                className={
                                                                    router.asPath ===
                                                                    `/questions/${item.slug}`
                                                                        ? "active"
                                                                        : ""
                                                                }>

                                                                {item.title}

                                                            </Link>
                                                        </li>
                                                    ))}
                                            </ul>
                                        </div>
                                    </div>
                                </li>

                                {/* <li>
                                    <Link href="/questions/all">
                                        <a
                                            className={
                                                router.pathname.startsWith("/questions")
                                                    ? "active"
                                                    : ""
                                            }>
                                            QnA
                                        </a>
                                    </Link>
                                </li> */}
                                <li>
                                    <Link
                                        href="/counselling-session"
                                        className={
                                            router.pathname === "/counselling-session"
                                                ? "active"
                                                : ""
                                        }>
                                        
                                            Counselling Session
                                        
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/ask-a-question"
                                        className={
                                            router.pathname === "/ask-a-question" ? "active" : ""
                                        }>
                                        
                                            Ask a Question
                                        
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/contact"
                                        className={
                                            router.pathname === "/contact" ? "active" : ""
                                        }>
                                        
                                            Contact
                                        
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/about"
                                        className={
                                            router.pathname === "/about" ? "active" : ""
                                        }>
                                        
                                            About
                                        
                                    </Link>
                                </li>
                            </ul>

                            <ul className="mobile-icons">
                                <li className="menu-burger" onClick={toggleMobileNav(true)}>
                                    <i className="fas fa-bars"></i>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </header>

        <MobileNav
            playlists={playlists}
            qnaCategories={qna_categories}
            navOpen={mobileNavOpen}
            navControl={toggleMobileNav}
            activeId={activePlaylistId}
            activeCatSlug={activeCatSlug}
        />
    </>;
}
