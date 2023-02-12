import Link from "next/link";

export default function PostCardArticle({
  article: {
    postSlug = "/", //
    postTitle = "",
    postExcerpt = "",
    postDate = "",
  },
} = {}) {
  return (
    <div className="card card-r pc-0">
      <div className="card-content">
        <Link href={`/articles/${postSlug}`}>
          <a className="heading-r">{postTitle}</a>
        </Link>

        {/*<p className="paragraph-r">{postExcerpt}</p>*/}
        {/*<span className="date-r">{postDate}</span>*/}
      </div>
    </div>
  );
}
