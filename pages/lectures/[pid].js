import { youtube, constants, server } from "../../lib/config";
import {
	getAllPlaylists2,
	getAllQnaCategory,
	getHeaderLectures,
	getYoutubeVideoListByUrl,
} from "../../lib/fetch";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Meta from "../../components/meta";
import Header from "../../components/header";

import PostCardVideo2 from "../../components/card/post-card-video2";
import Loader from "../../components/loader";

import fetcher from "../../lib/lecturesFetcher";
import useOnScreen from "../../hooks/useOnScreen";
import { useSWRInfinite } from "swr";
import Header2 from "../../components/header1";

const getKey = (pageIndex, previousPageData, playlistId) => {
	let pageToken = "";
	if (
		previousPageData !== null &&
		previousPageData.videoLists.nextPageToken !== null
	) {
		pageToken = `&pageToken=${previousPageData.videoLists.nextPageToken}`;
	}

	return `${youtube.url}/playlistItems?key=${youtube.key}&part=snippet&playlistId=${playlistId}&maxResults=${constants.DEFAULT_PAGE_LIMIT}${pageToken}`;
};

export default function LectureList({
	initialVideos,
	initPlaylistId,
	playlists,
	headerLectures,
	qnaCategories,
}) {
	const ref = useRef();
	const catRef = useRef();
	const isVisible = useOnScreen(ref);
	const pageTitle = playlists.playlistsTitle[initPlaylistId];

	const { data, error, mutate, size, setSize, isValidating } = useSWRInfinite(
		(...args) => getKey(...args, initPlaylistId),
		fetcher,
		{ initialData: initialVideos, revalidateOnMount: true }
	);

	const datas = data ? [].concat(...data) : [];
	const isLoadingInitialData = !data && !error;
	const isLoadingMore =
		isLoadingInitialData ||
		(size > 0 && data && typeof data[size - 1] === "undefined");
	// const isEmpty = data?.[0]?.length === 0
	const numberOfPages =
		data?.[0]?.length !== 0 ? data[0].videoLists.numberOfPages : 0;
	const isReachingEnd = size === numberOfPages;
	const isRefreshing = isValidating && data && data.length === size;

	const getCategorizedVideos = async (id, pageTitle) => {
		setCatOpen(false);
		setSize(1);
	};

	useEffect(() => {
		if (isVisible && !isReachingEnd && !isRefreshing) {
			setSize(size + 1);
		}
	}, [isVisible, isRefreshing]);

	return (
		<>
			<Meta
				title={pageTitle}
				description="Sheikh Assim bin Luqman al-Hakeem was born in 1962 in the city of Al-Khobar, which lies in the east of the Kingdom of Saudi Arabia. He was raised there until the age of 12 before he and his family moved to the Western Province of Saudi Arabia"
				image={`${server}/img/id/default_share.jpeg`}
				url={`${server}/lectures/${youtube.uploadPlaylistID}`}
				type="website"
			/>

			<Header2
				playlists={playlists.playlists}
				activePlaylistId={initPlaylistId}
				lectures={headerLectures}
				qna_categories={qnaCategories}
			/>

			<div className="opt_lecture_list mt-12">
				<section className="cat-page-top cat-page-top-2 opt_lecture_cat_page_top">
					<div className="page-width">
						<div className="box">
							<h1>
								<div className="cat-page-top-open-btn">
									<i className="material-icons select-tag-icon">list</i>
									<em>Categories</em>
								</div>
							</h1>
						</div>
					</div>
				</section>

				<section className={"cat-page-ctn cat-page-lectures"}>
					<div className="page-width">
						<div className="box">
							<div className="opt_lecture_page">
								{/* <div className="opt_lecture_left">

                  <div className="opt_lecture_left_cat_list">
                    <div className="opt_lecture_cat_list_title">
                      ক্যাটাগরি সমূহ
                    </div>
                    <ul style={{ paddingTop: "10px" }}>
                      {playlists.playlists &&
                        playlists.playlists.map((item, index) => (
                          <li
                            className={
                              initPlaylistId == item.id ? "selected" : ""
                            }
                            key={item.id + index}
                            onClick={() =>
                              getCategorizedVideos(item.id, item.title)
                            }
                          >
                            <Link href={`/lectures/${item.id}`}>
                              <a>{item.title}</a>
                            </Link>
                          </li>
                        ))}
                    </ul>
                  </div>
                </div> */}

								<div className="opt_lecture_right">
									<div className="opt_lecture_title">{pageTitle}</div>

									<div className="opt_lectures_wrapper">
										<div className="row row-r">
											{/*{isEmpty ? <p>No records found!</p> : null}*/}
											{datas &&
												datas.map((data) => {
													return (
														data.videoLists.videos &&
														data.videoLists.videos.map((item, index) => (
															<div
																className="col col-r s12 m6 l4 xl4"
																key={item.id + index}>
																<PostCardVideo2
																	item={item}
																	statistics={data.videoLists.videoStats}
																/>
															</div>
														))
													);
												})}
										</div>
									</div>

									<div className="opt_lecture_loader" ref={ref}>
										{isLoadingMore ? (
											<div className="loader">
												<Loader />
											</div>
										) : (
											""
										)}
									</div>

									{isReachingEnd ? (
										""
									) : (
										<div className="opt_lecture_more">
											<center>
												<button onClick={() => setSize(size + 1)}>
													See more
												</button>
											</center>
										</div>
									)}
								</div>
							</div>
						</div>
					</div>
				</section>
			</div>

			{/* <Footer /> */}
		</>
	);
}

export async function getStaticProps({ params }) {
	const playlistId = params.pid;
	const url = `${youtube.url}/playlistItems?key=${youtube.key}&part=snippet&playlistId=${playlistId}&maxResults=${constants.DEFAULT_PAGE_LIMIT}`;
	const videoLists = await getYoutubeVideoListByUrl(url);
	const playlists = await getAllPlaylists2();
	const headerLectures = await getHeaderLectures();
	const qnaCategories = await getAllQnaCategory();

	return {
		props: {
			initialVideos: [videoLists],
			initPlaylistId: playlistId,
			playlists,
			headerLectures,
			qnaCategories,
		},
		revalidate: 60,
	};
}

export async function getStaticPaths() {
	const playlists = await getAllPlaylists2();

	const paths = playlists.playlists.map((playlist) => ({
		params: { pid: playlist.id },
	}));

	return {
		paths,
		fallback: "blocking",
	};
}
