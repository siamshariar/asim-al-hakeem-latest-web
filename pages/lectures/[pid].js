import { youtube, constants } from "../../lib/config";
import { getAllPlaylists2, getYoutubeVideoListByUrl } from "../../lib/fetch";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Meta from "../../components/meta";
import Header from "../../components/header";
import Footer from "../../components/footer";

import PostCardVideo2 from "../../components/card/post-card-video2";
import Loader from "../../components/loader";

import fetcher from "../../lib/lecturesFetcher";
import useOnScreen from "../../hooks/useOnScreen";
import { useSWRInfinite } from "swr";

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

  const [catOpen, setCatOpen] = useState(false);

  const handleCatOpen = async () => {
    catOpen ? setCatOpen(false) : setCatOpen(true);
  };

  const getCategorizedVideos = async (id, pageTitle) => {
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
        title={`${pageTitle} | ড. মুহাম্মাদ সাইফুল্লাহ অফিসিয়াল ওয়েবসাইট - Official website of Dr. Muhammad Saifullah`}
        description="ড. মুহাম্মাদ সাইফুল্লাহ একজন অধ্যাপক, ইসলামিক
        স্কলার, লেখক, গবেষক এবং দ্বীনের একনিষ্ঠ দা'য়ী।
        ইসলামের প্রচার-প্রসারে স্বনামধন্য মিডিয়া ব্যক্তিত্বও।
        ফিকহ শারীআহ, ইসলামি আইন ও আইনশাস্ত্র বিভাগ, মদীনা ইসলামি বিশ্ববিদ্যালয়, কিংডম অফ সৌদি আরব থেকে ব্যাচেলর, মাস্টার্স ও পিএচডি সম্পন্ন করেন।"
        url="www.muhammadsaifullah.com"
        image="/img/id/logo.png"
        type="website"
      />

      <Header playlists={playlists.playlists} />

      <div className="opt_lecture_list">
        <section className="cat-page-top cat-page-top-2 opt_lecture_cat_page_top">
          <div className="page-width">
            <div className="box">
              <h1 ref={catRef}>
                <div className="cat-page-top-open-btn" onClick={handleCatOpen}>
                  <i className="material-icons select-tag-icon">list</i>
                  <em>ক্যাটাগরি সমূহ</em>
                </div>
              </h1>
            </div>
          </div>
          <div className={"select-tag-list" + (catOpen ? " open" : "")}>
            <div className="page-width opt_page-width">
              <div className="box opt_box">
                <ul>
                  {playlists.playlists &&
                    playlists.playlists.map((item, index) => (
                      <li
                        className={initPlaylistId == item.id ? "selected" : ""}
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
            </div>
          </div>
        </section>

        <section
          className={
            "cat-page-ctn cat-page-lectures" + (catOpen ? " open" : "")
          }
        >
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
                                key={item.id + index}
                              >
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
                          আরও দেখুন
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

  return {
    props: {
      initialVideos: [videoLists],
      initPlaylistId: playlistId,
      playlists,
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
