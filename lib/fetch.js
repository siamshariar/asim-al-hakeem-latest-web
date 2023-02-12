import { youtube, constants, youtubeKeys } from "./config";
import { articles } from "../data/articles";
import { books } from "../data/books";
import { organizations } from "../data/organizations";
import { papers } from "../data/papers";
import { tafseers } from "../data/tafseers";
import { date } from "./format";

// articles
const filterArticles = (items) => {
  let filtered = [];
  items.forEach((item) => {
    let obj = {
      id: item.id,
      postSlug: item.postSlug,
      postTitle: item.postTitle,
      imageSrc: item.imageSrc,
      postDate: item.postDate,
      postExcerpt: item.postExcerpt,
    };
    filtered.push(obj);
  });
  return filtered;
};

export const getHomeArticles = async () => {
  const items = articles.filter((item) => item.home === "1");
  return filterArticles(items);
};

export const getArticles = () => {
  return filterArticles(articles);
};

export const getRelatedArticles = () => {
  const items = articles.filter((item) => item.related === "1");
  return filterArticles(items);
};

export const getArticleDetails = (slug) => {
  const items = articles.filter((item) => item.postSlug === slug);
  return items[0];
};

// books
const filterBooks = (items) => {
  let filtered = [];
  items.forEach((item) => {
    let obj = {
      id: item.id,
      imageSrc: item.imageSrc,
      bookName: item.bookName,
      bookText: item.bookText,
      bookSlug: item.bookSlug,
    };
    filtered.push(obj);
  });
  return filtered;
};

export const getHomeBooks = async () => {
  const items = books.filter((item) => item.home === "1");
  return filterBooks(items);
};

export const getBooks = () => {
  return filterBooks(books);
};

export const getRelatedBooks = () => {
  const items = books.filter((item) => item.related === "1");
  return filterBooks(items);
};

export const getBookDetails = (slug) => {
  const items = books.filter((item) => item.bookSlug === slug);
  return items[0];
};

export const getHomeRecentLectures = async () => {
  const url = `${youtube.url}/playlistItems?key=${youtube.key}&part=snippet&playlistId=${youtube.uploadPlaylistID}&maxResults=${constants.YOUTUBE_HOME_PAGE_RECENT_VIDEOS}`;
  const videoLists = await getYoutubeVideoListByUrl(url);

  return videoLists;
};

export const getHomeLectures = async () => {
  const url = `${youtube.url}/playlistItems?key=${youtube.key}&part=snippet&playlistId=${youtube.uploadPlaylistID}&maxResults=${constants.DEFAULT_PAGE_LIMIT}`;
  const lectures = await getYoutubeVideoListByUrl(url);

  return {
    videoLists: lectures.videoLists.videos.slice(5, 8),
    videoStats: lectures.videoLists.videoStats,
  };
};

// organizations
const filterOrganizations = (items) => {
  let filtered = [];
  items.forEach((item) => {
    let obj = {
      id: item.id,
      orgName: item.orgName,
      imageSrc: item.imageSrc,
      orgExcerpt: item.orgExcerpt,
      orgSlug: item.orgSlug,
    };
    filtered.push(obj);
  });
  return filtered;
};

export const getHomeOrganizations = async () => {
  const items = organizations.filter((item) => item.home === "1");
  return filterOrganizations(items);
};

export const getOrganizations = async () => {
  return filterOrganizations(organizations);
};

export const getOrganizationDetails = async (slug) => {
  const items = organizations.filter((item) => item.orgSlug === slug);
  return items[0];
};

// papers
const filterPapers = (items) => {
  let filtered = [];
  items.forEach((item) => {
    let obj = {
      id: item.id,
      catURL: item.catURL,
      catText: item.catText,
      postSlug: item.postSlug,
      postTitle: item.postTitle,
      postDate: item.postDate,
      link: item.link,
    };
    filtered.push(obj);
  });
  return filtered;
};

export const getHomePapers = async () => {
  const items = papers.filter((item) => item.home === "1");
  return filterPapers(items);
};

export const getPapers = () => {
  return filterPapers(papers);
};

export const getRelatedPapers = () => {
  const items = papers.filter((item) => item.related === "1");
  return filterPapers(items);
};

export const getPaperDetails = (slug) => {
  const items = papers.filter((item) => item.postSlug === slug);
  return items[0];
};

// tafseers
const filterTafseers = (items) => {
  let filtered = [];
  items.forEach((item) => {
    let obj = {
      id: item.id,
      imageSrc: item.imageSrc,
      catURL: item.catURL,
      catText: item.catText,
      postSlug: item.postSlug,
      postTitle: item.postTitle,
      postDate: item.postDate,
    };
    filtered.push(obj);
  });
  return filtered;
};

export const getTafseers = () => {
  return filterTafseers(tafseers);
};

export const getRelatedTafseers = () => {
  const items = tafseers.filter((item) => item.related === "1");
  return filterTafseers(items);
};

export const getTafseerDetails = (slug) => {
  const items = tafseers.filter((item) => item.postSlug === slug);
  return items[0];
};

export const getAllPlaylists2 = async () => {
  const url = `${youtube.url}/playlists?key=${youtube.key}&part=snippet&channelId=${youtube.channelID}&maxResults=${constants.MAX_YOUTUBE_PAGE_LIMIT}`;
  const res = await getYoutubeResponseByUrl(url);

  let data = await res.json();
  let items = await data.items;
  const total = await data.pageInfo.totalResults;

  if (total > 50) {
    const numberOfRequests = Math.ceil(total / 50);
    for (let i = 1; i < numberOfRequests; i++) {
      let newURL = url + `&pageToken=${data.nextPageToken}`;
      let newRes = await fetch(newURL);
      data = await newRes.json();
      let newItems = await data.items;
      items = items.concat(newItems);
    }
  }

  let playlists = [];
  let playlistsTitle = {};

  let obj = {
    id: youtube.uploadPlaylistID,
    title: "ভিডিও লেকচার",
  };
  playlists.push(obj);
  playlistsTitle[youtube.uploadPlaylistID] = "ভিডিও লেকচার";

  items.forEach((item) => {
    let obj = {
      id: item.id,
      title: item.snippet.title,
    };
    playlists.push(obj);
    playlistsTitle[item.id] = item.snippet.title;
  });

  return {
    playlists,
    playlistsTitle,
  };
};

export const getYoutubeVideoListByUrl = async (url) => {
  const response = await getYoutubeResponseByUrl(url);
  const videosData = await response.json();
  const videoItems = await videosData.items;
  const nextPageToken = (await videosData.nextPageToken) || null;
  const totalVideos = await videosData.pageInfo.totalResults;
  const numberOfPages = Math.ceil(totalVideos / constants.DEFAULT_PAGE_LIMIT);
  let videos = [];
  let videoIds = "";

  videoItems.forEach((item) => {
    const title = item.snippet.title.toString();
    // TODO: Have to fix Private watch in better way
    if (
      title === "Private watch" ||
      title === "Private video" ||
      title === "Deleted video"
    ) {
      // TODO: Have to fix Private watch in better way
    } else {
      // TODO: If there thumbnail then DISPLAY A DEFAULT THUMBNAIL
      let image =
        typeof item.snippet.thumbnails.high !== "undefined"
          ? item.snippet.thumbnails.high.url
          : "";
      let obj = {
        id: item.snippet.resourceId.videoId,
        image: image,
        title: title,
        date: item.snippet.publishedAt,
        playlistId: item.snippet.playlistId,
      };
      videos.push(obj);
      videoIds += "," + item.snippet.resourceId.videoId;
    }
  });

  const statsURL = `${youtube.url}/videos?key=${youtube.key}&part=statistics&id=${videoIds}&maxResults=${constants.DEFAULT_PAGE_LIMIT}`;
  const statsRes = await getYoutubeResponseByUrl(statsURL);

  const videoStats = await statsRes.json();
  let videoStatistics = {};

  videoStats.items.forEach((item) => {
    videoStatistics[item.id] = item.statistics.viewCount;
  });

  let videoLists = {
    nextPageToken: nextPageToken,
    numberOfPages: numberOfPages,
    videos: videos,
    videoStats: videoStatistics,
  };

  return {
    videoLists,
  };
};

export const getRelatedYoutubeVideoListByUrl = async (url) => {
  const response = await getYoutubeResponseByUrl(url);
  const videosData = await response.json();
  const videoItems = await videosData.items;
  const nextPageToken = (await videosData.nextPageToken) || null;
  const totalVideos = await videosData.pageInfo.totalResults;
  const numberOfPages = Math.ceil(totalVideos / constants.DEFAULT_PAGE_LIMIT);
  let videos = [];
  let videoIds = "";

  videoItems.forEach((item) => {
    if (typeof item.snippet != "undefined") {
      const title = item.snippet.title.toString();
      // TODO: Have to fix Private watch in better way
      if (title != "Private watch") {
        // TODO: sometimes thumbnails can be missing. AD A DEFAULT THUMBNAIL
        let image =
          typeof item.snippet.thumbnails.high !== "undefined"
            ? item.snippet.thumbnails.high.url
            : "";
        let obj = {
          id: item.id.videoId,
          image: image,
          title: title,
          date: item.snippet.publishedAt,
          playlistId: item.snippet.playlistId,
        };
        videos.push(obj);
        videoIds += "," + item.id.videoId;
      }
    }
  });

  const statsURL = `${youtube.url}/videos?key=${youtube.key}&part=statistics&id=${videoIds}&maxResults=${constants.DEFAULT_PAGE_LIMIT}`;
  const statsRes = await getYoutubeResponseByUrl(statsURL);

  const videoStats = await statsRes.json();
  let videoStatistics = {};

  videoStats.items.forEach((item) => {
    videoStatistics[item.id] = item.statistics.viewCount;
  });

  let videoLists = {
    nextPageToken: nextPageToken,
    numberOfPages: numberOfPages,
    videos: videos,
    videoStats: videoStatistics,
  };

  return {
    videoLists,
  };
};

export const getUploadPlaylistVideos = async () => {
  const url = `${youtube.url}/playlistItems?key=${youtube.key}&part=snippet&playlistId=${youtube.uploadPlaylistID}&maxResults=${constants.MAX_YOUTUBE_PAGE_LIMIT}`;
  const res = await getYoutubeResponseByUrl(url);

  let data = await res.json();
  let videoItems = await data.items;

  const total = await data.pageInfo.totalResults;
  let videoIdList = [];

  if (total > 50) {
    const numberOfRequests = Math.ceil(total / 50);
    for (let i = 1; i < numberOfRequests; i++) {
      let newURL = url + `&pageToken=${data.nextPageToken}`;
      let newRes = await fetch(newURL);
      data = await newRes.json();
      let newItems = await data.items;
      videoItems = videoItems.concat(newItems);
    }
  }

  videoItems.forEach((item) => {
    if (typeof item != "undefined") {
      const title = item.snippet.title.toString();
      // TODO: Have to fix Private watch
      if (title != "Private watch") {
        let obj = {
          id: item.snippet.resourceId.videoId,
        };
        videoIdList.push(obj);
      }
    }
  });

  return {
    videoIdList,
  };
};

export const getYoutubeVideoDetailsByUrl = async (url) => {
  const res = await getYoutubeResponseByUrl(url);
  const data = await res.json();

  let title;
  let description;
  let publishedDate;
  let image;
  let viewCount;

  if (typeof data.items != "undefined") {
    title = data.items[0].snippet.title;
    description = data.items[0].snippet.description;
    publishedDate = date(data.items[0].snippet.publishedAt);
    image =
      typeof data.items[0].snippet.thumbnails.high !== "undefined"
        ? data.items[0].snippet.thumbnails.high.url
        : "";
    viewCount =
      typeof data.items[0].statistics !== "undefined"
        ? data.items[0].statistics.viewCount
        : "";
  }

  return {
    title,
    description,
    publishedDate,
    image,
    viewCount,
  };
};

const replaceYoutubeKeyFromUrl = (url, key) => {
  const newUrl = url.replace(
    new RegExp("key([^&]*)&", "gm"),
    "key=" + key + "&"
  );
  return newUrl;
};

const fetchUrl = async (url) => {
  return await fetch(url);
};

const getYoutubeResponseByUrl = async (url) => {
  let res = await fetchUrl(url);
  const currentKey = youtube.key;
  // console.log("currentKey", res.status, currentKey);

  // Status code 403 if "key" quota limit exceed
  if (res.status == 403) {
    // If key1 limit exceed then we will change current key by next one and so on
    for (let key in youtubeKeys) {
      if (currentKey !== youtubeKeys[key]) {
        youtube.key = youtubeKeys[key];
        res = await fetchUrl(replaceYoutubeKeyFromUrl(url, youtube.key));
        if (res.status == 200) {
          break;
        }
      }
    }
  }

  return res;
};

// search option
export const getYoutubeSearchVideosByUrl = async (url) => {
  const response = await getYoutubeResponseByUrl(url);
  const videosData = await response.json();
  const videoItems = await videosData.items;
  const nextPageToken = (await videosData.nextPageToken) || null;
  const totalVideos = await videosData.pageInfo.totalResults;
  const numberOfPages = Math.ceil(totalVideos / constants.DEFAULT_PAGE_LIMIT);
  let videos = [];
  let videoIds = "";

  videoItems.forEach((item) => {
    const title = item.snippet.title.toString();
    // TODO: Have to fix Private watch in better way
    if (
      title === "Private watch" ||
      title === "Private video" ||
      title === "Deleted video"
    ) {
      // TODO: Have to fix Private watch in better way
    } else {
      // TODO: If there thumbnail then DISPLAY A DEFAULT THUMBNAIL
      let image =
        typeof item.snippet.thumbnails.high !== "undefined"
          ? item.snippet.thumbnails.high.url
          : "";
      let obj = {
        id: item.id.videoId,
        image: image,
        title: title,
        date: item.snippet.publishedAt,
        //playlistId: item.snippet.playlistId,
      };
      videos.push(obj);
      videoIds += "," + item.id.videoId;
    }
  });

  const statsURL = `${youtube.url}/videos?key=${youtube.key}&part=statistics&id=${videoIds}&maxResults=${constants.DEFAULT_PAGE_LIMIT}`;

  const statsRes = await getYoutubeResponseByUrl(statsURL);

  const videoStats = await statsRes.json();
  let videoStatistics = {};

  videoStats.items.forEach((item) => {
    videoStatistics[item.id] = item.statistics.viewCount;
  });

  let videoLists = {
    nextPageToken: nextPageToken,
    numberOfPages: numberOfPages,
    videos: videos,
    videoStats: videoStatistics,
  };

  return {
    videoLists,
  };
};

/***********************/
/*    opt screens      */
/***********************/
export const getOptHomeImages = async () => {
  const items = tafseers.slice(3, 6);
  return filterTafseers(items);
};

export const getOptHomeBlogs = async () => {
  const items = tafseers.slice(0, 4);
  return filterTafseers(items);
};

const quotes = [
  {
    id: 1,
    image: "/img/slider/02.jpg",
    text: "নিশ্চয় যারা ঈমান আনে ও তাদের রবেরই উপর নির্ভর করে তাদের উপর তার কোন আধিপত্য নেই",
    author: "[আন-নাহাল : ৯৯]",
  },
  {
    id: 2,
    image: "/img/slider/01.jpg",
    text: "আর যে ব্যক্তি আল্লাহর উপর তাওয়াক্কুল করে তার জন্য আল্লাহ্‌ই যথেষ্ট",
    author: "[আত-ত্বলাক্ব : ৩]",
  },
];

export const getOptHomeQuotes = async () => {
  const items = quotes.slice(0, 3);
  return items;
};

export const getOptHomeBooks = async () => {
  const items = books.filter((item) => item.opt_home === "1");
  return filterBooks(items);
};

/***********************/
/*     homepage 3      */
/***********************/
export const getHome3Posts4 = async () => {
  const items = tafseers.slice(0, 4);
  return filterTafseers(items);
};
