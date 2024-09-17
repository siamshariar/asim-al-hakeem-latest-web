import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'; // Import useRouter to handle navigation
import Link from 'next/link'; // Import Link for navigation

const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
const CHANNEL_ID = process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_ID;

export default function RecentLecture() {
  const [lectures, setLectures] = useState([]);
  const router = useRouter(); // Initialize router
  
  useEffect(() => {
    fetchLatestVideos();
  }, []);

  const fetchLatestVideos = async () => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=4`
      );
      const data = await response.json();
      if (data.items.length > 0) {
        const videoData = data.items.map((item) => ({
          id: item.id.videoId,
          title: item.snippet.title,
          image: item.snippet.thumbnails.high.url,
          date: new Date(item.snippet.publishedAt).toLocaleDateString(),
          views: 0, // Views will be fetched later
        }));
        fetchVideoViews(videoData);
      }
    } catch (error) {
      console.error('Error fetching the latest videos:', error);
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

  // Function to handle when a video is clicked, navigating to a new page
  const handleVideoClick = (videoId) => {
    router.push(`/lectures/${videoId}`); // Navigate to the lecture video page
  };

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 shadow-custom1 gap-4">
          {lectures.map((lecture, index) => (
            <div
              key={index}
              className="services__item bg-white rounded-[10px] shadow-xl transition duration-500 ease-in-out hover:shadow-custom1 min-h-[320px] flex flex-col justify-between items-center"
            >
              {/* Use Link component to ensure proper navigation */}
              <Link href={`/lectures/${lecture.id}`}>
                <div className="w-full cursor-pointer">
                  <img
                    src={lecture.image}
                    alt={lecture.title}
                    className="w-full rounded-t-lg h-auto object-cover"
                  />
                </div>
              </Link>
              <Link href={`/lectures/${lecture.id}`}>
                <span className="relative text-[20px] cursor-pointer font-bold mt-4 mb-6 px-4 line-clamp-2">
                  {lecture.title}
                </span>
              </Link>
              <div className="flex justify-between w-full px-4 mb-4 mt-2 text-sm text-gray-500">
                <p className="text-[15px] text-[#808080]">{lecture.date}</p>
                <p className="text-[15px] text-[#808080]">{lecture.views} views</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
