import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Share } from 'lucide-react';
import Header2 from '../../../components/header1';
import { getAllPlaylists2, getAllQnaCategory, getHeaderLectures } from '../../../lib/fetch'; 

const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;

export default function LectureVideo({ playlists, headerLectures, qna_categories, videoData }) {
  const router = useRouter();
  const { id } = router.query;
  const [video, setVideo] = useState(videoData);
  const [loading, setLoading] = useState(!videoData);

  useEffect(() => {
    if (!videoData && id) {
      const fetchVideoData = async () => {
        try {
          const videoResponse = await axios.get(`https://www.googleapis.com/youtube/v3/videos`, {
            params: {
              part: 'snippet,statistics',
              id,
              key: API_KEY,
            },
          });

          const video = videoResponse.data.items[0];
          const channelId = video.snippet.channelId;

          const channelResponse = await axios.get(`https://www.googleapis.com/youtube/v3/channels`, {
            params: {
              part: 'snippet',
              id: channelId,
              key: API_KEY,
            },
          });

          const channel = channelResponse.data.items[0];
          setVideo({
            title: video.snippet.title,
            views: video.statistics.viewCount,
            likes: video.statistics.likeCount,
            channelTitle: video.snippet.channelTitle,
            description: video.snippet.description,
            channelImage: channel.snippet.thumbnails.default.url,
          });
        } catch (error) {
          console.error('Error fetching video data:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchVideoData();
    }
  }, [id, videoData]);

  if (!video) {
    return <p>Video data not found.</p>;
  }

  return (
    <>
      <Header2 playlists={playlists} headerLectures={headerLectures} qna_categories={qna_categories} />
      <div className="max-w-5xl mt-12 p-6 bg-white rounded-xl shadow-xl mx-auto">
        <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
          <iframe
            width="100%"
            height="500"
            src={`https://www.youtube.com/embed/${id}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="YouTube video player"
            className="w-full h-full object-cover"
          ></iframe>
        </div>
        <div className="mt-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl mr-8 font-semibold">{video.title}</h1>
            <span className="text-lg text-gray-500 mb-6 whitespace-nowrap">{`${video.views} views`}</span>
          </div>
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center space-x-2 mt-2">
              <img src={video.channelImage} alt="Channel avatar" className="w-12 h-12 rounded-full" />
              <div>
                <p className="font-medium text-xl">{video.channelTitle}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 text-lg text-gray-700">
              <button className="flex items-center space-x-1">
                <Share className="w-5 h-5" />
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-6 border-t-[2px] border-[#DCDCDC] pt-4">
          <h2 className="font-bold mt-6">Description</h2>
          <p className="text-lg text-gray-600 mt-5">
            {video.description}
          </p>
        </div>
      </div>
    </>
  );
}



export const getStaticPaths = async () => {

  const videoIds = []; 
  return {
    paths: videoIds.map(id => ({ params: { id } })),
    fallback: 'blocking', 
  };
};

export const getStaticProps = async ({ params }) => {
  const playlists = await getAllPlaylists2();
  const headerLectures = await getHeaderLectures();
  const qna_categories = await getAllQnaCategory();

  const { id } = params;

  let videoData = null;
  if (id) {
    try {
      const videoResponse = await axios.get(`https://www.googleapis.com/youtube/v3/videos`, {
        params: {
          part: 'snippet,statistics',
          id,
          key: API_KEY,
        },
      });

      const video = videoResponse.data.items[0];
      const channelId = video.snippet.channelId;

      const channelResponse = await axios.get(`https://www.googleapis.com/youtube/v3/channels`, {
        params: {
          part: 'snippet',
          id: channelId,
          key: API_KEY,
        },
      });

      const channel = channelResponse.data.items[0];
      videoData = {
        title: video.snippet.title,
        views: video.statistics.viewCount,
        likes: video.statistics.likeCount,
        channelTitle: video.snippet.channelTitle,
        description: video.snippet.description,
        channelImage: channel.snippet.thumbnails.default.url,
      };
    } catch (error) {
      console.error('Error fetching video data:', error);
    }
  }

  return {
    props: {
      playlists: playlists.playlists,
      headerLectures,
      qna_categories,
      videoData,
    },
  };
};
