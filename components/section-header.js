import Link from "next/link";

export default function SectionHeader({ title, link }) {
	return (
        <div className="title-r title-2">
			<span>{title}</span>
			<div className="title-link">
				<Link href={link} prefetch={false}>
					আরও দেখুন
				</Link>
			</div>
		</div>
    );
}
