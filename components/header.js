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

export default function Header({ playlists, activePlaylistId }) {
	// show hide header on scroll
	const header = useRef(null);
	const [scrollTop, setScrollTop] = useState(0);
	const [didMount, setDidMount] = useState(false);

	const num = Math.ceil(playlists.length / 3);
	const firstList = playlists.slice(0, num);
	const secondList = playlists.slice(num, num * 2);
	const thirdList = playlists.slice(num * 2, playlists.length);

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

	return (
		<>
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
											<li className="vitem">
												Sheikh Assim grew up in Al-Khobar like, as he says, “any
												other kid down the block”; going to school, having
												friends, having the
											</li>
											<li className="vitem">
												We feel that time is always a problem for us. When we
												are young, the only thing we think about is playing and
												enjoying ourselves, i.e., killing time
											</li>
											<li className="vitem">
												This is all what the youth think about; just wasting
												time, playing cards, going around the streets, riding
												bikes, watching movies, listening to music, and doing
											</li>
											{/* again 1st item */}
											<li className="vitem">
												Sheikh Assim grew up in Al-Khobar like, as he says, “any
												other kid down the block”; going to school, having
												friends, having the
											</li>
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
								<Link href="/">
									<a className="header-logo">
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
									</a>
								</Link>

								<ul className="main-menu">
									<li>
										<Link href="/">
											<a>
												{/*<span className="main-menu-icon">*/}
												{/*  <BookIcon />*/}
												{/*</span>*/}
												Home
											</a>
										</Link>
									</li>
									<li>
										{/* <Link href={`/lectures/${youtube.uploadPlaylistID}`}> */}
										<a>
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
																<Link href={`/lectures/${playlist.id}`}>
																	<a>{playlist.title}</a>
																</Link>
															</li>
														))}
												</ul>

												<ul>
													{secondList &&
														secondList.map((playlist) => (
															<li key={playlist.id}>
																<Link href={`/lectures/${playlist.id}`}>
																	<a>{playlist.title}</a>
																</Link>
															</li>
														))}
												</ul>

												<ul>
													{thirdList &&
														thirdList.map((playlist) => (
															<li key={playlist.id}>
																<Link href={`/lectures/${playlist.id}`}>
																	<a>{playlist.title}</a>
																</Link>
															</li>
														))}
												</ul>
											</div>
										</div>
									</li>

									<li>
										<Link href="/articles">
											<a>Articles</a>
										</Link>
									</li>
									<li>
										<Link href="/books">
											<a>Books</a>
										</Link>
									</li>
									<li>
										<Link href="/questions/all">
											<a>QnA</a>
										</Link>
									</li>
									<li>
										<Link href="#">
											<a>Counseling Session</a>
										</Link>
									</li>
									<li>
										<Link href="#">
											<a>Ask a Question</a>
										</Link>
									</li>
									<li>
										<Link href="/contact">
											<a>Contact</a>
										</Link>
									</li>
									<li>
										<Link href="/about">
											<a>About</a>
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
				navOpen={mobileNavOpen}
				navControl={toggleMobileNav}
				activeId={activePlaylistId}
			/>
		</>
	);
}
