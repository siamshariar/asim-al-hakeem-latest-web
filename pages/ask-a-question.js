import { server } from "../lib/config";
import Image from "next/image";
import {
	getArticles,
	getArticleDetails,
	getRelatedArticles,
	getAllPlaylists2,
	getHeaderLectures,
} from "../lib/fetch";
import Link from "next/link";
import Layout from "../components/layout";
import Meta from "../components/meta";
import Header from "../components/header";
import parse from "html-react-parser";
import Share from "../components/share";

export default function BlogDetail({ playlists, headerLectures }) {
	const handleSubmit = (e) => {
		e.preventDefault();
	};
	return (
		<>
			<Meta
				title="Ask a Question"
				description="Sheikh Assim bin Luqman al-Hakeem was born in 1962 in the city of Al-Khobar, which lies in the east of the Kingdom of Saudi Arabia. He was raised there until the age of 12 before he and his family moved to the Western Province of Saudi Arabia"
				image={`${server}/img/id/default_share.jpeg`}
				url={`${server}/ask-a-question`}
				type="website"
			/>

			<Header playlists={playlists} lectures={headerLectures} />

			{/* <section className="blog-detail-top">
				<div className="page-width">
					<div className="box">
						<Link href={`/articles/${detail.postSlug}`}>
							<a className="heading-r">
								{detail.postTitle}
							</a>
						</Link>
					</div>
				</div>
			</section> */}

			<section className="blog-detail-ctn ask-question">
				<div className="page-width">
					<div className="box">
						<div className="blog-area">
							<a className="heading-r heading-b">Ask a Question</a>
							<div className="blog-detail">
								<p>
									Assalamu alaikum wa rahmatullahi wa barakatuhu,
									<br />
									Our NEW TIMING of taking questions for Ramadan is from 6 A.M
									(Makkah Time) until the quota finishes which is usually done
									in the first 5 to10 minutes.
									<br />
									Saturday is our day off
									<br />
									Jazakum Allahu Khairan
									<br />
									(ADMIN)
								</p>
								<p>
									<b>COUNSELING SESSIONS</b>
								</p>
								<p>
									Need marriage counseling? Or any other one to one live
									counseling via Skype, FaceTime etc by Sheikh Assim al hakeem?{" "}
								</p>
								<p>
									For bookings of live counseling sessions contact:
									<br />
									<a href="mailto:sheikhassim.bookings@gmail.com">
										sheikhassim.bookings@gmail.com
									</a>
									<br />
									$100 / Half Hour
								</p>

								<a className="image-r">
									<Image
										className="image"
										src="/img/counselling-sheikh-assim.jpeg"
										alt=""
										layout="fill"
										objectFit="cover"
										objectPosition="center center"
										loading="eager"
										unoptimized
									/>
								</a>

								<p>
									<b>DONATE FOR THE NEEDY</b>
								</p>
								<p>
									Want to help a brother/sister in need who cannot afford to
									consult the Sheikh regarding their Marital Issues, OCD Waswas
									and the like?
								</p>
								<p>Donate for a needy Muslim :</p>
								<p>
									Assim Lugman Alhakeem
									<br />
									A/c: 164128664188
									<br />
									Maybank investment Berhad
									<br />
									Bangsar, KL Malaysia
									<br />
									Swift code: MBBEMYKLXXX
								</p>
							</div>

							<div className="blog-action">
								<div className="blog-share">
									<Share
										urlWeb="/counselling-session"
										urlMobile="/counselling-session"
										title="Counselling Session"
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}

export async function getStaticProps() {
	const playlists = await getAllPlaylists2();
	const headerLectures = await getHeaderLectures();

	return {
		props: {
			playlists: playlists.playlists,
			headerLectures,
		},
	};
}
