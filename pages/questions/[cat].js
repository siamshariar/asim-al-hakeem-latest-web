import { server, youtube, constants } from "../../lib/config";
import {
	getAllPlaylists2,
	getAllQnaCategory,
	getAllQuestions,
	getHeaderLectures,
	getQnCatTitle,
	getYoutubeVideoListByUrl,
	qaFetcher,
} from "../../lib/fetch";
import { useState, useEffect, useRef } from "react";
import Layout from "../../components/layout";
import Meta from "../../components/meta";
// import PostCardVideo2 from "../../components/card/post-card-video2";
import Loader from "../../components/loader";
// import fetcher from "../../lib/lecturesFetcher";
import useOnScreen from "../../hooks/useOnScreen";
import { useSWRInfinite } from "swr";
import Link from "next/link";
import SortIcon from "@mui/icons-material/Sort";
// import ViewListIcon from "@mui/icons-material/ViewList";
// import { CropSquareRounded } from "@material-ui/icons";
import PostCardAllQns from "../../components/card/post-card-allqns";
import Header from "../../components/header";

const getKey = (pageIndex, prevPageData, cat_slug) => {
	let currentPage = pageIndex + 1;
	return JSON.stringify({ currentPage: currentPage, cat_slug: cat_slug });
};

export default function QnList({
	initialQns,
	cat_slug,
	categories,
	catTitle,
	playlists,
	headerLectures,
}) {
	const ref = useRef();
	const catRef = useRef();
	const isVisible = useOnScreen(ref);
	// const pageTitle = categories[cat_slug].title;
	const pageTitle = catTitle;

	const { data, error, mutate, size, setSize, isValidating } = useSWRInfinite(
		(...args) => getKey(...args, cat_slug),
		qaFetcher,
		{ initialData: initialQns, revalidateOnMount: true }
	);

	const datas = data ? [].concat(...data) : [];
	const isLoadingInitialData = !data && !error;
	const isLoadingMore =
		isLoadingInitialData ||
		(size > 0 && data && typeof data[size - 1] === "undefined");

	// const isEmpty = data?.[0]?.length === 0;
	// const isReachingEnd =
	// 	isEmpty || (data && data[data.length - 1]?.length < 1000);

	const numberOfPages = data?.length !== 0 ? data[0].numberOfPages : 0;
	const isReachingEnd = size === numberOfPages;

	const isRefreshing = isValidating && data && data.length === size;

	const [catOpen, setCatOpen] = useState(false);

	const handleCatOpen = async () => {
		catOpen ? setCatOpen(false) : setCatOpen(true);
	};

	const getCategorizedQns = async (id, pageTitle) => {
		setCatOpen(false);
		setSize(1);
	};

	useEffect(() => {
		let handler = (e) => {
			if (catRef.current != null && !catRef.current.contains(e.target)) {
				setCatOpen(false);
			}
		};
		document.body.addEventListener("mousedown", handler);

		if (isVisible && !isReachingEnd && !isRefreshing) {
			setSize(size + 1);
		}
	}, [isVisible, isRefreshing]);

	return (
		<>
			<Meta
				title={pageTitle}
				description="Questions and Answer of Assim Alhakeem"
				url={`${server}/questions/${cat_slug}`}
				image={`${server}/img/id/default_share.jpeg`}
				type="website"
			/>

			<Header playlists={playlists.playlists} lectures={headerLectures} />

			<section className="cat-page-top cat-page-top-2">
				<div className="page-width">
					<div className="box">
						<h1 ref={catRef}>
							<i className="select-tag-icon" onClick={handleCatOpen}>
								<SortIcon />
							</i>{" "}
							{pageTitle}
							<div className={"select-tag-list" + (catOpen ? " open" : "")}>
								<ul>
									<li
										className={cat_slug == "all" ? "selected" : ""}
										onClick={() => getCategorizedQns("all", "all")}>
										<Link href="/questions/all">
											<a>All Questions</a>
										</Link>
									</li>
									{categories &&
										categories.map((item) => (
											<li
												className={cat_slug == item.slug ? "selected" : ""}
												key={item.id}
												onClick={() => getCategorizedQns(item.id, item.title)}>
												<Link href={"/questions/" + item.slug}>
													<a>{item.title}</a>
												</Link>
											</li>
										))}
								</ul>
							</div>
						</h1>
					</div>
				</div>
			</section>

			<section
				className={"cat-page-ctn cat-page-lectures" + (catOpen ? " open" : "")}>
				<div className="page-width">
					<div className="box">
						<div className="row row-r">
							{/*{isEmpty ? <p>No records found!</p> : null}*/}
							{datas &&
								datas.map((data) => {
									return (
										data.qaItems &&
										data.qaItems.map((item) => {
											return (
												<div className="qns col col-r s12" key={item.id}>
													<PostCardAllQns qn={item} />
												</div>
											);
										})
									);
								})}
						</div>
					</div>
				</div>
			</section>

			<div ref={ref}>
				{isLoadingMore ? (
					<div className={"loader"}>
						<Loader />
					</div>
				) : (
					""
				)}
			</div>

			{isReachingEnd ? (
				""
			) : (
				<div style={{ margin: "20px 0px" }}>
					<center>
						<button onClick={() => setSize(size + 1)}>See more</button>
					</center>
				</div>
			)}
		</>
	);
}

export async function getStaticProps({ params }) {
	const cat_slug = params.cat;
	const currentPage = 1;

	// const videoLists = await getYoutubeVideoListByUrl(url);
	const qns = await getAllQuestions({ currentPage, cat_slug });
	const categories = await getAllQnaCategory();
	const catTitle = await getQnCatTitle(cat_slug);
	const playlists = await getAllPlaylists2();
	const headerLectures = await getHeaderLectures();

	return {
		props: {
			initialQns: [qns],
			cat_slug: cat_slug,
			categories,
			catTitle,
			playlists,
			headerLectures,
		},
		revalidate: 60,
	};
}

export async function getStaticPaths() {
	const categories = await getAllQnaCategory();

	let paths = categories.map((item) => ({
		params: { cat: item.slug },
	}));

	paths = [{ params: { cat: "all" } }, ...paths];

	return {
		paths,
		fallback: "blocking",
	};
}
