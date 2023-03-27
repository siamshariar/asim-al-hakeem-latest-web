import Link from "next/link";

export default function PostCardAllQns({ qn }) {
	return (
		<div className="card card-r pc-0">
			<div className="card-content">
				<Link href={`/questions/ans/${qn.id}`}>
					<a>
						<p className="paragraph-r">{`${qn.id}. ${qn.qn}`}</p>
					</a>
				</Link>

				{/*<span className="date-r">{postDate}</span>*/}
			</div>
		</div>
	);
}
