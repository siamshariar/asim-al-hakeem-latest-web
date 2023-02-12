import {
  getUploadPlaylistVideos,
  getRelatedYoutubeVideoListByUrl,
  getYoutubeVideoDetailsByUrl,
  getAllPlaylists2,
} from "../../../lib/fetch";
import { server, youtube } from "../../../lib/config";
import { useRef } from "react";
import Image from "next/image";
import Layout from "../../../components/layout";
import Meta from "../../../components/meta";
import Header from "../../../components/header";
import Share from "../../../components/share";
import { date } from "../../../lib/format";

export default function VideoDetail({ id, data, playlists }) {
  // const fetcher = (...args) => fetch(...args).then(res => res.json())
  // const url = `${youtube.url}/videos?key=${youtube.key}&part=snippet,statistics&id=${id}&maxResults=${constants.YOUTUBE_RELATED_VIDEOS_PAGE_LIMIT}`
  // const {data} = useSWR(url, fetcher, {initialData: detail, revalidateOnMount: true });
  // if (!data) return <div>Loading...</div>

  const preImage = useRef(null);
  const iframe = useRef(null);

  const title = data.title;
  const description = data.description;
  const publishedDate = date(data.publishedDate);
  const image = data.image;
  const viewCount = data.viewCount;

  const handleLoadIframe = () => {
    preImage.current.style.display = "none";
    iframe.current.src = `https://www.youtube.com/embed/${id}?autoplay=1&mute=0`;
  };

  return (
    <>
      <Meta
        title={title}
        description={description}
        url={`${server}/lectures/watch/${id}`}
        image={image}
        type="article"
      />

      <Header playlists={playlists} />

      <section className="blog-detail-ctn video-blog-detail">
        <div className="page-width">
          <div className="box">
            <div className="blog-area">
              <div className="video-wrap-outer">
                <div className="video-wrap">
                  <div className="video-wrap-image" ref={preImage}>
                    <button onClick={handleLoadIframe}>
                      <PlayIcon />
                    </button>
                    <Image
                      //src={image ? image : '/img/post/youtube-default.jpg'}
                      src={
                        image
                          ? `http://i.ytimg.com/vi/${id}/maxresdefault.jpg`
                          : `${server}/img/post/youtube-default.jpg`
                      }
                      alt=""
                      layout="fill"
                      objectFit="cover"
                      objectPosition="center center"
                      loading="eager" unoptimized
                    />
                  </div>
                  <iframe
                    //src={`https://www.youtube.com/embed/${id}?autoplay=0&mute=0`}
                    ref={iframe}
                    allow="autoplay; fullscreen;"
                  ></iframe>
                </div>
              </div>

              <div className="blog-detail">
                <div className="row row-r video-title-area">
                  <div className="col col-r s12 l9">
                    <div>
                      <h2 className="margin-bottom-0">{title}</h2>
                    </div>
                    <div className="data-line-left">
                      <span className="view-r">{viewCount} views</span>
                      <span className="dot"></span>
                      <span className="date-r">{publishedDate}</span>
                    </div>
                  </div>
                  <div className="col col-r s12 l3">
                    <div className="blog-share">
                      <Share
                        urlWeb={`lectures/watch/${id}`}
                        urlMobile={id}
                        title={title}
                      />
                    </div>
                  </div>
                </div>
                <div className="video-description-area">
                  <p>
                    {description &&
                      description.split("\n").map(function (item, idx) {
                        return (
                          <span key={idx}>
                            {item}
                            <br />
                          </span>
                        );
                      })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*TODO: Getting other's channel videos in related videos*/}
      {/*<section className="blog-page-related">*/}
      {/*    <div className="page-width">*/}
      {/*        <div className="box">*/}
      {/*            <h1 className="title-r">*/}
      {/*                <span>সম্পর্কিত পোস্ট</span>*/}
      {/*            </h1>*/}

      {/*            <div className="row row-r">*/}
      {/*                {*/}
      {/*                    relatedVideos.videoLists.videos && relatedVideos.videoLists.videos.map((item) =>*/}
      {/*                             <div className="col col-r s12 m6 xl3" key={item.id}>*/}
      {/*                            <PostCardVideo2*/}
      {/*                                item={item}*/}
      {/*                                statistics={relatedVideos.videoLists.videoStats}*/}
      {/*                            />*/}
      {/*                        </div>*/}
      {/*                    )*/}
      {/*                }*/}
      {/*            </div>*/}
      {/*        </div>*/}
      {/*    </div>*/}
      {/*</section>*/}
    </>
  );
}

export async function getStaticProps({ params }) {
  const id = params.id;

  const url = `${youtube.url}/videos?key=${youtube.key}&part=snippet,statistics&id=${id}`;
  const detail = await getYoutubeVideoDetailsByUrl(url);
  const playlists = await getAllPlaylists2();

  // const relatedVideosUrl = `${youtube.url}/search?key=${youtube.key}&part=snippet&relatedToVideoId=${id}&type=video&maxResults=${constants.YOUTUBE_RELATED_VIDEOS_PAGE_LIMIT}`
  // const videoLists = await getRelatedYoutubeVideoListByUrl(relatedVideosUrl)

  return {
    props: {
      id,
      data: detail,
      playlists: playlists.playlists,
      // relatedVideos: JSON.parse(JSON.stringify(videoLists))
    },
    revalidate: 60,
  };
}

export async function getStaticPaths() {
  const data = await getUploadPlaylistVideos();

  const paths = data.videoIdList.map((video) => ({
    params: { id: video.id },
  }));

  return {
    paths,
    fallback: "blocking",
  };
}

const PlayIcon = () => {
  return (
    <svg height="100%" version="1.1" viewBox="0 0 68 48" width="100%">
      <path d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z"></path>
      <path d="M 45,24 27,14 27,34" fill="#fff"></path>
    </svg>
  );
};
