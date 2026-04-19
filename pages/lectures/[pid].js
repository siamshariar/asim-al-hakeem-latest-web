import { server, youtube, constants } from "../../lib/config";
import { getAllPlaylists2, getYoutubeVideoListByUrl, getAllQnaCategory } from "../../lib/fetch";
import { useState, useEffect, useRef } from "react";
import Meta from "../../components/meta";
import PostCardVideo2 from "../../components/card/post-card-video2";
import Loader from "../../components/loader";
import VideoModal from "../../components/modal/VideoModal";
import Header2 from "../../components/header1";
import fetcher from "../../lib/lecturesFetcher";
import useOnScreen from "../../hooks/useOnScreen";
import useSWRInfinite from "swr/infinite";
import { motion } from "framer-motion";
import { Video, ChevronDown } from "lucide-react";

const getKey = (pageIndex, previousPageData, playlistId) => {
  let pageToken = "";
  if (previousPageData !== null && previousPageData.videoLists?.nextPageToken) {
    pageToken = `&pageToken=${previousPageData.videoLists.nextPageToken}`;
  }
  return `${youtube.url}/playlistItems?key=${youtube.key}&part=snippet&playlistId=${playlistId}&maxResults=${constants.DEFAULT_PAGE_LIMIT}${pageToken}`;
};

export const generateVParam = (videoID, title) => {
  const formattedTitle = encodeURIComponent((title || "").split(" ").join("=$"));
  return `${videoID}=$$=${formattedTitle}`;
};

const parseVParam = (slug) => {
  const [videoID, encodedTitle] = slug.split("=$$=");
  const videoTitle = decodeURIComponent(encodedTitle).split("=$").join(" ");
  return { videoID, videoTitle };
};

export default function LectureList({ initialVideos, initPlaylistId, playlists, qna_categories }) {
  const ref = useRef();
  const catRef = useRef();
  const isVisible = useOnScreen(ref);
  const pageTitle = playlists?.playlistsTitle?.[initPlaylistId] || "Video Lectures";
  const [catOpen, setCatOpen] = useState(false);

  const { data, error, size, setSize, isValidating } = useSWRInfinite(
    (...args) => getKey(...args, initPlaylistId),
    fetcher,
    { initialData: initialVideos, revalidateOnMount: true }
  );

  const datas = data ? [].concat(...data) : [];
  const isLoadingInitialData = !data && !error;
  const isLoadingMore = isLoadingInitialData || (size > 0 && data && typeof data[size - 1] === "undefined");
  const numberOfPages = data?.[0]?.videoLists ? data[0].videoLists.numberOfPages : 0;
  const isReachingEnd = size === numberOfPages;
  const isRefreshing = isValidating && data && data.length === size;
  
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [modalTitle, setModalTitle] = useState("");

  const handleCatOpen = () => setCatOpen(!catOpen);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const v = params.get("v");
    if (v) {
      const { videoID, videoTitle } = parseVParam(v);
      setModalTitle(videoTitle);
      setSelectedVideo({ id: videoID, title: videoTitle });
    }
  }, []);

  const openModal = (item) => {
    const id = item?.snippet?.resourceId?.videoId || item?.id;
    const title = item?.snippet?.title || item?.title || "Untitled";
    const description = item?.snippet?.description || item?.description || "";
    
    if (!id) return;
    
    setSelectedVideo({ id, title, description, playlistId: initPlaylistId });
    setModalTitle(title);
    
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("v", generateVParam(id, title));
    const updatedUrl = `${window.location.pathname}?${urlParams.toString()}`;
    window.history.replaceState(null, "", updatedUrl);
  };

  const closeModal = () => {
    setSelectedVideo(null);
    setModalTitle("");
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.delete("v");
    const updatedUrl = `${window.location.pathname}${urlParams.toString() ? `?${urlParams.toString()}` : ''}`;
    window.history.replaceState(null, "", updatedUrl);
  };

  useEffect(() => {
    const handler = (e) => {
      if (catRef.current != null && !catRef.current.contains(e.target)) {
        setCatOpen(false);
      }
    };
    document.body.addEventListener("mousedown", handler);
    return () => document.body.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    if (isVisible && !isReachingEnd && !isLoadingMore) {
      setSize(size + 1);
    }
  }, [isVisible, isReachingEnd, isLoadingMore, size, setSize]);

  return (
    <>
      <Meta
        title={pageTitle}
        description={`Watch ${pageTitle} by Sheikh Assim Al Hakeem. Authentic Islamic lectures and guidance.`}
        url={`${server}/lectures/${initPlaylistId}`}
        image={`${server}/img/id/default_share.png`}
        type="website"
      />

      <Header2
        playlists={playlists?.playlists || []}
        activePlaylistId={initPlaylistId}
        lectures={[]}
        qna_categories={qna_categories || []}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#1a1f2e] to-[#2a3142] py-10 lg:py-14">
        <div className="container max-w-[1260px] mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-3 mb-2">
              <Video size={32} className="text-[#10b981]" />
              <h1 className="text-2xl lg:text-3xl font-bold text-white">{pageTitle}</h1>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Category Dropdown - Mobile */}
      <div className="lg:hidden bg-white border-b border-gray-100 py-3 px-4" ref={catRef}>
        <button onClick={handleCatOpen}
          className="w-full flex items-center justify-between px-4 py-2 bg-gray-50 rounded-lg text-[#1a1f2e]">
          <span className="font-medium">Select Playlist</span>
          <ChevronDown size={18} className={`transition-transform ${catOpen ? 'rotate-180' : ''}`} />
        </button>
        {catOpen && (
          <div className="mt-2 bg-white rounded-lg shadow-lg border border-gray-100 max-h-60 overflow-y-auto">
            {playlists?.playlists?.map((p) => (
              <a key={p.id} href={`/lectures/${p.id}`}
                className={`block px-4 py-3 text-sm hover:bg-gray-50 ${p.id === initPlaylistId ? 'text-[#10b981] font-medium' : 'text-[#1a1f2e]'}`}>
                {p.title}
              </a>
            ))}
          </div>
        )}
      </div>

      {/* Videos Grid */}
      <section className="py-8 lg:py-12 bg-gray-50 min-h-[60vh]">
        <div className="container max-w-[1260px] mx-auto px-4">
          {datas.length > 0 && datas[0]?.videoLists?.videos?.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-5">
              {datas.map((data) =>
                data.videoLists.videos.map((video) => (
                  <motion.div
                    key={video.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -4 }}
                    className="cursor-pointer"
                    onClick={() => openModal(video)}
                  >
                    <PostCardVideo2 
                      item={video} 
                      statistics={data.videoLists.videoStats} 
                      playlistId={initPlaylistId} 
                    />
                  </motion.div>
                ))
              )}
            </div>
          ) : isLoadingInitialData ? (
            <div className="flex justify-center py-12">
              <Loader />
            </div>
          ) : (
            <div className="text-center py-16">
              <Video size={48} className="text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No videos found in this playlist.</p>
            </div>
          )}

          {/* Load More Trigger */}
          <div ref={ref} className="mt-8">
            {isLoadingMore && !isLoadingInitialData && (
              <div className="flex justify-center py-8">
                <Loader />
              </div>
            )}
          </div>

          {/* Load More Button */}
          {!isReachingEnd && !isLoadingMore && datas.length > 0 && (
            <div className="text-center mt-8">
              <button
                onClick={() => setSize(size + 1)}
                disabled={isRefreshing}
                className="px-6 py-3 bg-[#10b981] text-white rounded-full font-medium hover:bg-[#059669] transition-colors shadow-lg shadow-[#10b981]/25"
              >
                Load More Videos
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Video Modal */}
      {selectedVideo && (
        <VideoModal
          isOpen={!!selectedVideo}
          onClose={closeModal}
          videoId={selectedVideo.id}
          title={modalTitle}
          description={selectedVideo.description}
          playlistId={selectedVideo.playlistId}
        />
      )}
    </>
  );
}

export async function getStaticProps({ params }) {
  const playlistId = params.pid;
  const url = `${youtube.url}/playlistItems?key=${youtube.key}&part=snippet&playlistId=${playlistId}&maxResults=${constants.DEFAULT_PAGE_LIMIT}`;
  
  try {
    const videoLists = await getYoutubeVideoListByUrl(url);
    const playlists = await getAllPlaylists2();
    const qna_categories = await getAllQnaCategory();

    return {
      props: {
        initialVideos: videoLists ? [videoLists] : [{ videoLists: { videos: [], videoStats: {}, numberOfPages: 0 } }],
        initPlaylistId: playlistId,
        playlists: playlists || { playlists: [], playlistsTitle: {} },
        qna_categories: qna_categories || [],
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error('Error fetching lectures:', error);
    return {
      props: {
        initialVideos: [{ videoLists: { videos: [], videoStats: {}, numberOfPages: 0 } }],
        initPlaylistId: playlistId,
        playlists: { playlists: [], playlistsTitle: {} },
        qna_categories: [],
      },
      revalidate: 60,
    };
  }
}

export async function getStaticPaths() {
  try {
    const playlists = await getAllPlaylists2();
    const paths = playlists?.playlists?.map((playlist) => ({
      params: { pid: playlist.id },
    })) || [];

    return {
      paths,
      fallback: "blocking",
    };
  } catch (error) {
    return {
      paths: [],
      fallback: "blocking",
    };
  }
}