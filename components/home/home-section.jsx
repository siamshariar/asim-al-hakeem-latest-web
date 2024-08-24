import Link from "next/link";

export default function HomeSection({ children, title, link }) {
	return (
        <div className="page-width">
			<div className="box">
				<div className="section-top">
					<h2>{title}</h2>
				</div>

				{children}

				<div className="section-bottom">
					<Link href={link} passHref className="button2">

                        <span>See more</span>

                    </Link>
				</div>
			</div>
		</div>
    );
}
