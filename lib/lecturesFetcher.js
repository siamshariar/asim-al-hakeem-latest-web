import {getYoutubeVideoListByUrl} from "../lib/fetch";

export default async function (...args) {
    return await getYoutubeVideoListByUrl(args)
}
