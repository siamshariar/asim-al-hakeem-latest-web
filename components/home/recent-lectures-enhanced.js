import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Play, Eye, Calendar, ArrowRight } from 'lucide-react';
import VideoModal from '../modal/VideoModalRecent';
import { date as formatDate } from '../../lib/format';

const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
const CHANNEL_ID = process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_ID;

export const generateVParam = (videoID, title) => {
  const formattedTitle = encodeURIComponent((title || "").split(" ").join("=$"));
  return `${videoID}=$$=${formattedTitle}`;
};

const parseVParam = (slug) => {
  const [videoID, encodedTitle] = slug.split("=$$=");
  const videoTitle = decodeURIComponent(encodedTitle).split("=$").join(" ");
  return { videoID, videoTitle };
};

export default function RecentLecturesEnhanced({ lectures }) {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [modalTitle, setModalTitle] = useState("");

  useEffect(() => {
    if (lectures?.videoLists) {
      // Use provided lectures or fetch new ones
      const videoData = lectures.videoLists.map(video => ({
        id: video.id,
        title: video.title,
        image: video.image,
        date: formatDate(video.date),
        views: lectures.videoStats?.[video.id] || 0,
        description: video.description,
      }));
      setVideos(videoData.slice(0, 4));
      setLoading(false);
    } else {
      fetchLatestVideos();
    }
  }, [lectures]);

  const fetchLatestVideos = async () => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&type=video&maxResults=4`
      );
      const data = await response.json();
      if (data?.items?.length > 0) {
        const videoData = data.items.map((item) => ({
          id: item.id.videoId,
          title: item.snippet.title,
          image: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.medium?.url,
          date: formatDate(item.snippet.publishedAt),
          views: 0,
          description: item.snippet.description,
        }));
        await fetchVideoViews(videoData);
      }
    } catch (error) {
      console.error('Error fetching videos:', error);
      setLoading(false);
    }
  };

  const fetchVideoViews = async (videos) => {
    const videoIds = videos.map((video) => video.id).join(',');
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?key=${API_KEY}&id=${videoIds}&part=statistics`
      );
      const data = await response.json();
      const updatedVideos = videos.map((video, index) => ({
        ...video,
        views: data.items[index]?.statistics.viewCount || 0,
      }));
      setVideos(updatedVideos);
    } catch (error) {
      console.error('Error fetching video views:', error);
      setVideos(videos);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const v = params.get("v");
    if (v) {
      const { videoID, videoTitle } = parseVParam(v);
      setModalTitle(videoTitle);
      setSelectedVideo({ id: videoID, title: videoTitle });
      setIsModalOpen(true);
    }
  }, []);

  const openModal = (video) => {
    setSelectedVideo(video);
    setModalTitle(video.title);
    setIsModalOpen(true);
    
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("v", generateVParam(video.id, video.title));
    const updatedUrl = `${window.location.pathname}?${urlParams.toString()}`;
    window.history.replaceState(null, "", updatedUrl);
  };

  const closeModal = () => {
    setSelectedVideo(null);
    setModalTitle("");
    setIsModalOpen(false);
    
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.delete("v");
    const updatedUrl = `${window.location.pathname}${urlParams.toString() ? `?${urlParams.toString()}` : ''}`;
    window.history.replaceState(null, "", updatedUrl);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  if (loading) {
    return (
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="container max-w-[1260px] mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div className="h-8 w-48 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-6 w-24 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="h-48 bg-gray-200 animate-pulse"></div>
                <div className="p-4 space-y-3">
                  <div className="h-5 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="container max-w-[1260px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-between items-center mb-8"
        >
          <div>
            <span className="text-accent font-semibold uppercase tracking-wider text-sm">Latest Content</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-primary mt-2">Recent Lectures</h2>
          </div>
          <Link href="/lectures/UUWsdcrre0WbCWML_PnuzoAg">
            <motion.button
              whileHover={{ x: 5 }}
              className="flex items-center gap-2 text-accent font-medium hover:text-accent-secondary transition-colors"
            >
              <span>View All Lectures</span>
              <ArrowRight size={18} />
            </motion.button>
          </Link>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {videos.map((video) => (
            <motion.div
              key={video.id}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer"
              onClick={() => openModal(video)}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={video.image || `/img/post/youtube-default.jpg`}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-14 h-14 bg-accent rounded-full flex items-center justify-center shadow-lg"
                  >
                    <Play size={24} className="text-white ml-0.5" fill="white" />
                  </motion.div>
                </div>
                <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                  <Eye size={12} />
                  <span>{video.views?.toLocaleString() || 0}</span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-primary mb-2 line-clamp-2 group-hover:text-accent transition-colors">
                  {video.title}
                </h3>
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar size={14} className="mr-1" />
                  <span>{video.date}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <VideoModal
        isOpen={isModalOpen}
        onClose={closeModal}
        videoId={selectedVideo?.id}
        title={modalTitle}
        description={selectedVideo?.description}
      />
    </section>
  );
}