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
import Header2 from "../../components/header1";
import PostCardVideo2 from "../../components/card/post-card-video2";
import Loader from "../../components/loader";
import fetcher from "../../lib/lecturesFetcher";
import useOnScreen from "../../hooks/useOnScreen";
import useSWRInfinite from 'swr/infinite';


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
	const numberOfPages = data?.length > 0 && data[0]?.videoLists ? data[0].videoLists.numberOfPages : 0;

	const isReachingEnd = size === numberOfPages;
	const isRefreshing = isValidating && data && data.length === size;

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

			<div className="mt-12">
				<section className="bg-gray-100 ">
					<div className="container mx-auto px-0">
						<div className="bg-white p-4 sm:p-6 rounded-xl shadow-md">
							<div className="flex flex-col">
								<div className="text-xl sm:text-2xl text-black font-bold mb-4">{pageTitle}</div>

								<div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
									{datas &&
										datas.map((data) => (
											data.videoLists.videos &&
											data.videoLists.videos.map((item, index) => (
												<div
													className="bg-white p-3 sm:p-4 rounded-lg shadow-sm"
													key={item.id + index}>
													<PostCardVideo2
														item={item}
														statistics={data.videoLists.videoStats}
													/>
												</div>
											))
										))}
								</div>

								<div className="mt-6" ref={ref}>
									{isLoadingMore && (
										<div className="flex justify-center">
											<Loader />
										</div>
									)}
								</div>

								{!isReachingEnd && (
									<div className="mt-6 text-center">
										<button
											
											onClick={() => setSize(size + 1)}>
											See more
										</button>
									</div>
								)}
							</div>
						</div>
					</div>
				</section>
			</div>
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
