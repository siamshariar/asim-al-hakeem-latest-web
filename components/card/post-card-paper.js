import Link from "next/link";

export default function PostCardPaper({
  paper: {
    postSlug = "/",
    postTitle = "",
    link = "",
  },
} = {}) {
  return (
    <div className="card card-r pc-0">
      <div className="card-content">
        {/*<Link href={catURL}>*/}
        {/*	<a className="cat-r">{catText}</a>*/}
        {/*</Link>*/}
        <a className="heading-r" href={`${link}`} target="_blank">{postTitle}</a>
        {/*<span className="date-r">{postDate}</span>*/}
      </div>
    </div>
  );
}
