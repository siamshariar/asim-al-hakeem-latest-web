import Link from "next/link";

export default function PostCardQna({ qna }) {
	return (
        <div className="card card-r pc-0">
			<div className="card-content">
				<Link href={`/questions/ans/${qna.id}`} className="heading-r">
					{qna.qn}
				</Link>

				<p className="paragraph-r">{qna.ans}</p>
			</div>
		</div>
    );
}
