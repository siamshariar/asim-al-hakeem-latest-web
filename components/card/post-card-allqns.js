import Link from "next/link";

export default function PostCardAllQns({ qn }) {
	return (
        <div className="card card-r pc-0">
			<div className="card-content">
				<Link href={`/questions/ans/${qn.id}`}>

                    <p className="paragraph-r">{`${qn.id}. ${qn.qn}`}</p>

                </Link>

				{/*<span className="date-r">{postDate}</span>*/}
			</div>
		</div>
    );
}
