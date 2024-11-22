import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router'; // Import useRouter to handle navigation
import Link from 'next/link'; // Import Link for navigation
import VideoModal from '../modal/VideoModal'; 

const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
const CHANNEL_ID = process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_ID;

export default function RecentLecture() {
  const [lectures, setLectures] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal open state
  const [selectedVideo, setSelectedVideo] = useState(null); // State to store the selected video
  const [modalTitle, setModalTitle] = useState(""); // State to store the modal title
  const [catOpen, setCatOpen] = useState(false); // State for the category dropdown
  const [size, setSize] = useState(1); // State to manage pagination or data size
  
  const router = useRouter(); // Initialize router
  const catRef = useRef(null); // Reference to the category dropdown element
  
  useEffect(() => {
    fetchLatestVideos();
  }, []);

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
          image: item.snippet.thumbnails.high.url,
          date: new Date(item.snippet.publishedAt).toLocaleDateString(),
          views: 0, // Views will be fetched later
          description: item.snippet.description, // Adding description to the video data
        }));
        fetchVideoViews(videoData);
      } else {
        console.error('No videos found');
      }
    } catch (error) {
      console.error('Error fetching the latest videos:', error);
    } finally {
      setLoading(false); // Loading complete
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

      setLectures(updatedVideos);
    } catch (error) {
      console.error('Error fetching video views:', error);
    }
  };

  // Function to handle when a video is clicked, open the modal with selected video data
  const handleVideoClick = (video) => {
    setSelectedVideo(video); // Set selected video data
    setModalTitle(video.title); // Set the modal title
    
    // Fetch the video title if necessary
    fetchIframeTitle(video.id).then((title) => {
      setModalTitle(title); // Update the modal title with fetched title
    });

    setIsModalOpen(true); // Open the modal

    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('v', video.id); // Update the URL with video ID
    const updatedUrl = `/lectures${window.location.pathname}?${urlParams.toString()}`;
    window.history.replaceState(null, '', updatedUrl); // Update URL without reloading the page
  };

  const fetchIframeTitle = async (id) => {
    try {
      const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?key=${API_KEY}&id=${id}&part=snippet`);
      const data = await response.json();
      return data.items[0]?.snippet?.title || 'Video Title Not Found';
    } catch (error) {
      console.error('Failed to fetch video title:', error);
      return 'Video Title Not Found';
    }
  };

  const closeModal = () => {
    setSelectedVideo(null);
    setModalTitle("");

    const urlParams = new URLSearchParams(window.location.search);
    urlParams.delete("v"); // Remove video ID from URL when closing the modal
    const updatedUrl = `${window.location.pathname.replace('/lectures', '')}${
      urlParams.toString() ? `?${urlParams.toString()}` : ''
    }`;
    window.history.replaceState(null, "", updatedUrl); // Update URL without video ID
    setIsModalOpen(false); // Close the modal
  };

  // Category dropdown and page size handling (simplified)
  const getCategorizedVideos = async (id, pageTitle) => {
    setCatOpen(false);
    setSize(1);
  };

  useEffect(() => {
    const handler = (e) => {
      // Close the category dropdown when clicking outside
      if (catRef.current != null && !catRef.current.contains(e.target)) {
        setCatOpen(false);
      }
    };

    document.body.addEventListener('mousedown', handler);

    // Cleanup event listener when the component is unmounted
    return () => document.body.removeEventListener('mousedown', handler);
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Optional loading indicator
  }

  return (
    <section className="services">
      <div className="bg-services bg-cover bg-no-repeat max-w-[1466px] mx-4 xl:mx-auto rounded-[20px] xl:pt-[70px] px-6 xl:px-0 relative h-[368px] flex items-center xl:items-start -z-10">
        <div className="container mx-auto">
          <div className="services__top flex items-center flex-col xl:flex-row xl:mb-[60px]">
            <h2 className="h2 text-white flex-1 mb-4 xl:mb-0 text-center xl:text-left">
              Recent Lectures
            </h2>
            <p className="text-white flex-1 text-center xl:text-left max-w-2xl xl:max-w-none">
              Here are the latest uploaded videos from YouTube to the website...
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto mt-8 xl:-mt-[144px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {lectures.map((lecture) => (
            <div
              key={lecture.id}
              className="bg-white rounded-[20px] shadow-xl transition duration-500 ease-in-out hover:shadow-custom1 min-h-[320px] flex flex-col justify-between items-center"
            >
              <div className="w-full cursor-pointer" onClick={() => handleVideoClick(lecture)}>
                <img
                  src={lecture.image}
                  alt={lecture.title}
                  className="w-full rounded-t-xl h-auto object-cover"
                />
              </div>
              <span className="relative text-[20px] text-black hover:text-[#525252] cursor-pointer font-bold mt-4 mb-6 px-5 line-clamp-2">
                {lecture.title}
              </span>
              <div className="flex justify-between w-full px-4 mb-4 mt-2 text-sm text-gray-500">
                <p className="text-[15px] text-[#808080]">{lecture.date}</p>
                <p className="text-[15px] text-[#808080]">{lecture.views} views</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Modal */}
      <VideoModal
        isOpen={isModalOpen}
        onClose={closeModal}
        videoId={selectedVideo?.id}
        title={modalTitle}
        id={selectedVideo?.id}
        description={selectedVideo?.description}
      />
    </section>
  );
}
