import Link from "next/link";
import Image from "next/image";

export default function PostCardArticle({
	article: {
		postSlug = "/", //
		postTitle = "",
		postExcerpt = "",
		postDate = "",
		imageSrc = "",
	},
} = {}) {
	return (
        <div className="card card-r pc-0">
			<div className="card-image">
				<Link href={`/articles/${postSlug}`} className="image-r">

                    <Image
                        src={imageSrc ? imageSrc : "/img/post/placeholder-image.jpg"}
                        alt=""
                        layout="fill"
                        objectFit="cover"
                        objectPosition="center center"
                        loading="eager"
                        unoptimized
                    />

                </Link>
			</div>
			<div className="card-content">
				<Link href={`/articles/${postSlug}`} className="heading-r">
					{postTitle}
				</Link>

				<p className="paragraph-r">{postExcerpt}</p>
				{/*<span className="date-r">{postDate}</span>*/}
			</div>
		</div>
    );
}
