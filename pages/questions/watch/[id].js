"use client"
import { useRef, useState, useEffect } from "react"
import Image from "next/image"
import Layout from "../../../components/layout"
import Meta from "../../../components/meta"
import Share from "../../../components/share"
import Header2 from "../../../components/header1"
import { getAllPlaylists2, getHeaderLectures, getAllQnaCategory } from "../../../lib/fetch"
import { date } from "../../../lib/format"
import { faqs } from "../../../data/questions"
import { server } from "../../../lib/config"

// Helper function to extract YouTube video ID from URL
const extractYouTubeId = (url) => {
  if (!url) return null
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  const match = url.match(regExp)
  return match && match[2].length === 11 ? match[2] : null
}

// Helper function to get video thumbnail
const getVideoThumbnail = (videoUrl) => {
  if (!videoUrl) return null
  // Check if it's a YouTube URL
  if (videoUrl.includes("youtube.com") || videoUrl.includes("youtu.be")) {
    const videoId = extractYouTubeId(videoUrl)
    if (videoId) {
      return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
    }
  }
  return null
}

// Helper function to convert any YouTube URL to embed format
const getEmbedUrl = (videoUrl) => {
  if (!videoUrl) return null
  const videoId = extractYouTubeId(videoUrl)
  if (videoId) {
    return `https://www.youtube.com/embed/${videoId}`
  }
  return videoUrl
}

export default function QuestionDetail({ id, data, playlists, headerLectures, qnaCategories }) {
  const preImage = useRef(null)
  const iframe = useRef(null)
  const audioRef = useRef(null)
  const videoContainerRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [showControls, setShowControls] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)

  const title = data.question
  const description = data.answer
  const category = data.category
  const image = data.image
  const videoUrl = data.videoUrl
  const audioUrl = data.audioUrl
  const publishedDate = data.publishedDate ? date(data.publishedDate) : "Recently"
  const viewCount = data.viewCount || "0"

  // Get video thumbnail if video exists
  const videoThumbnail = getVideoThumbnail(videoUrl)
  const embedUrl = getEmbedUrl(videoUrl)

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === " " || e.key === "Spacebar") {
        e.preventDefault()
        togglePlayPause()
      }
      if (e.key === "f") {
        toggleFullscreen()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isPlaying])

  const handleLoadIframe = () => {
    if (embedUrl && preImage.current && iframe.current) {
      preImage.current.style.display = "none"
      iframe.current.src = `${embedUrl}?autoplay=1&mute=0&rel=0&modestbranding=1&enablejsapi=1`
      iframe.current.style.display = "block"
      setVideoLoaded(true)
      setIsPlaying(true)
    }
  }

  const togglePlayPause = () => {
    if (!videoLoaded) {
      handleLoadIframe()
      return
    }

    if (iframe.current) {
      const iframeWindow = iframe.current.contentWindow
      if (iframeWindow) {
        iframeWindow.postMessage('{"event":"command","func":"' + (isPlaying ? 'pauseVideo' : 'playVideo') + '","args":""}', '*')
        setIsPlaying(!isPlaying)
      }
    }
  }

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      videoContainerRef.current?.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`)
      })
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  const toggleMute = () => {
    if (iframe.current) {
      const iframeWindow = iframe.current.contentWindow
      if (iframeWindow) {
        iframeWindow.postMessage('{"event":"command","func":"mute","args":""}', '*')
      }
    }
  }

  const handleTimeUpdate = () => {
    // This would work better with a custom video player, but for YouTube iframe,
    // we can't directly access these properties due to security restrictions
  }

  const handleProgressClick = (e) => {
    if (iframe.current) {
      const rect = e.currentTarget.getBoundingClientRect()
      const pos = (e.clientX - rect.left) / rect.width
      const iframeWindow = iframe.current.contentWindow
      if (iframeWindow) {
        iframeWindow.postMessage(`{"event":"command","func":"seekTo","args":[${duration * pos}, true]}`, '*')
      }
    }
  }

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  return (
    <>
      <Meta
        title={title}
        description={description}
        url={`${server}/questions/watch/${id}`}
        image={image || videoThumbnail || `${server}/img/question-default.jpg`}
        type="article"
      />
      {/* Header2 Component with passed data */}
      <Header2 playlists={playlists} lectures={headerLectures} qna_categories={qnaCategories} />
      <>
        <section className="blog-detail-ctn video-blog-detail py-0 lg:py-4">
          <div className=" page-width">
            <div className="container max-w-[1200px] mx-auto">
              <div className="blog-area mx-4 lg:mx-0">
                {/* Video Section - Only show when videoUrl exists */}
                {videoUrl && (
                  <div 
                    className="video-wrap-outer" 
                    ref={videoContainerRef}
                    onMouseEnter={() => setShowControls(true)}
                    onMouseLeave={() => setShowControls(false)}
                  >
                    <div className="video-wrap relative">
                      <div
                        className="video-wrap-image"
                        ref={preImage}
                        style={{ display: videoLoaded ? "none" : "block" }}
                      >
                        <button onClick={handleLoadIframe} className="play-button">
                          <PlayIcon />
                        </button>
                        {/* Use regular img tag for YouTube thumbnails to avoid Next.js domain issues */}
                        {videoThumbnail ? (
                          <img
                            src={videoThumbnail || "/placeholder.svg"}
                            alt={title}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              objectPosition: "center center",
                            }}
                            loading="eager"
                            onError={(e) => {
                              e.target.src = `${server}/img/question-default.jpg`
                            }}
                          />
                        ) : (
                          <Image
                            src={`${server}/img/question-default.jpg`}
                            alt={title}
                            layout="fill"
                            objectFit="cover"
                            objectPosition="center center"
                            loading="eager"
                            unoptimized
                          />
                        )}
                      </div>
                      <iframe
                        ref={iframe}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        style={{
                          display: videoLoaded ? "block" : "none",
                          width: "100%",
                          height: "100%",
                          border: "none",
                        }}
                        title={title}
                      />
                      {/* Custom Video Controls */}
                      {videoLoaded && (
                        <div 
                          className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}
                        >
                          <div className="flex items-center gap-4 mb-2">
                            <button 
                              onClick={togglePlayPause} 
                              className="text-white hover:text-gray-300 focus:outline-none"
                            >
                              {isPlaying ? <PauseIconSmall /> : <PlayIconSmall />}
                            </button>
                            <div className="flex-1">
                              <div 
                                className="h-1 bg-gray-500 rounded-full cursor-pointer"
                                onClick={handleProgressClick}
                              >
                                <div 
                                  className="h-full bg-red-600 rounded-full" 
                                  style={{ width: `${progress}%` }}
                                ></div>
                              </div>
                            </div>
                            <span className="text-white text-sm">
                              {formatTime(currentTime)} / {formatTime(duration)}
                            </span>
                            <button 
                              onClick={toggleFullscreen}
                              className="text-white hover:text-gray-300 focus:outline-none"
                            >
                              {isFullscreen ? <MinimizeIcon /> : <MaximizeIcon />}
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
                {/* Image Section - Only show when image exists and NO video */}
                {image && !videoUrl && (
                  <div className="image-wrap-outer video-wrap-outer">
                    <div className="image-wrap">
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={title}
                        width={800}
                        height={400}
                        objectFit="cover"
                        objectPosition="center center"
                        loading="eager"
                        unoptimized
                      />
                    </div>
                  </div>
                )}
                {/* Audio Section */}
                {audioUrl && (
                  <div className="audio-wrap-outer px-4 py-4 sm:px-4 sm:py-4 md:px-16 md:py-4 lg:px-16">
                    <div className="audio-wrap">
                      <div className="audio-controls">
                        <button onClick={toggleAudio} className="audio-play-btn w-[150px] h-[150px] lg:w-[250px] lg:h-[200px]">
                          {isPlaying ? <PauseIcon /> : <PlayIcon />}
                        </button>
                        <span className="audio-title">Listen to Answer</span>
                      </div>
                      <audio
                        ref={audioRef}
                        src={audioUrl}
                        onPlay={() => setIsPlaying(true)}
                        onPause={() => setIsPlaying(false)}
                        onEnded={() => setIsPlaying(false)}
                        controls
                      />
                    </div>
                  </div>
                )}
                <div className="blog-detail">
                  <div className="row row-r video-title-area">
                    <div className="col col-r s12 l9">
                      <div className="">
                        <h2 className="margin-bottom-2 !text-[24px] md:!text-[28px] lg:!text-[28px] !font-semibold !leading-snug">
                          {title}
                        </h2>
                      </div>
                      <div className="data-line-left ">
                        <span className="category-r text-[18px]">{category}</span>
                        <span className="dot"></span>
                        <span className="view-r text-[18px]">{viewCount} views</span>
                        <span className="dot"></span>
                        <span className="date-r text-[18px]">{publishedDate}</span>
                      </div>
                    </div>
                    <div className="col col-r s12 l3">
                      <div className="blog-share">
                        <Share urlWeb={`questions/watch/${id}`} urlMobile={id} title={title} />
                      </div>
                    </div>
                  </div>
                  <div className="video-description-area">
                    <h3 className="text-[20px] mb-2 font-semibold">Answer:</h3>
                    <p>
                      {description &&
                        description.split("\n").map((item, idx) => (
                          <span className="!text-gray-700 text-[18px]" key={idx}>
                            {item}
                            <br />
                          </span>
                        ))}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    </>
  )
}

export async function getStaticProps({ params }) {
  const id = params.id
  const data = faqs.find((faq) => faq.id === id)
  if (!data) {
    return {
      notFound: true,
    }
  }
  // Fetch header data
  const playlists = await getAllPlaylists2()
  const headerLectures = await getHeaderLectures()
  const qnaCategories = await getAllQnaCategory()
  return {
    props: {
      id,
      data,
      playlists: playlists.playlists,
      headerLectures,
      qnaCategories,
    },
  }
}

export async function getStaticPaths() {
  const paths = faqs.map((faq) => ({
    params: { id: faq.id },
  }))
  return {
    paths,
    fallback: "blocking",
  }
}

const PlayIcon = () => {
  return (
    <svg height="100%" version="1.1" viewBox="0 0 68 48" width="100%">
      <path
        d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55
               C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19
               C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z"
      ></path>
      <path d="M 45,24 27,14 27,34" fill="#fff"></path>
    </svg>
  )
}

const PauseIcon = () => {
  return (
    <svg height="100%" version="1.1" viewBox="0 0 68 48" width="100%">
      <path
        d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55
               C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19
               C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z"
      ></path>
      <rect x="26" y="14" width="4" height="20" fill="#fff"></rect>
      <rect x="38" y="14" width="4" height="20" fill="#fff"></rect>
    </svg>
  )
}

const PlayIconSmall = () => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 5V19L19 12L8 5Z" fill="white" />
    </svg>
  )
}

const PauseIconSmall = () => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="6" y="5" width="4" height="14" fill="white" />
      <rect x="14" y="5" width="4" height="14" fill="white" />
    </svg>
  )
}

const MaximizeIcon = () => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" fill="white" />
    </svg>
  )
}

const MinimizeIcon = () => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z" fill="white" />
    </svg>
  )
}

const formatTime = (seconds) => {
  if (isNaN(seconds)) return "0:00"
  const minutes = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${minutes}:${secs < 10 ? '0' : ''}${secs}`
}