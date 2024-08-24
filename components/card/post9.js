import Link from "next/link";

export default function PostCard({
  post: {
    postSlug = "/",
    catURL = "/",
    catText = "",
    postTitle = "",
    postExcerpt = "",
    postDate = "",
  },
} = {}) {
  return (
    <div className="card card-r pc-5">
      <div className="card-content">
        <Link href={catURL} className="cat-r">
          {catText}
        </Link>

        <Link href={`/tafseer/${postSlug}`} className="heading-r">
          {postTitle}
        </Link>

        <p>{postExcerpt}</p>

        <span className="date-r">{postDate}</span>
      </div>
    </div>
  );
}
