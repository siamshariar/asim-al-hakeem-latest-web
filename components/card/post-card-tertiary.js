import Link from "next/link";
import Image from "next/image";

export default function PostCard({
	book: {
		bookName = "/",
		imageSrc = "",
		bookText = "/",
		bookSlug = "",
		bookDesc = "",
		bookExcerpt = "",
		writer = "",
	},
} = {}) {
	return (
		<div className="card card-r pc-6">
			<div className="card-image">
				<Link href={`/books/${bookSlug}`}>
					<a className="image-r">
						<Image
							src={imageSrc}
							alt=""
							layout="fill"
							objectFit="cover"
							objectPosition="center center"
							loading="eager"
							unoptimized
						/>
					</a>
				</Link>
			</div>

			<div className="card-content">
				{/* <Link href={`/books/${postSlug}`}>
          <a className="cat-r">{catText}</a>
        </Link> */}

				<Link href={`/books/${bookSlug}`}>
					<a className="heading-r heading-b">{bookName}</a>
				</Link>

				<h2>{writer}</h2>

				<p className="book-card-excerpt">{bookExcerpt}</p>

				{/* <span className="date-r">{postDate}</span> */}
			</div>
		</div>
	);
}
