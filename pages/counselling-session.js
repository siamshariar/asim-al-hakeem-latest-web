import { server } from "../lib/config";
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
				title="Counselling Session"
				description="Sheikh Assim bin Luqman al-Hakeem was born in 1962 in the city of Al-Khobar, which lies in the east of the Kingdom of Saudi Arabia. He was raised there until the age of 12 before he and his family moved to the Western Province of Saudi Arabia"
				image={`${server}/img/id/default_share.jpeg`}
				url={`${server}/counselling-session`}
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

			<section className="blog-detail-ctn counselling">
				<div className="page-width">
					<div className="box">
						<div className="blog-area">
							<a className="heading-r heading-b">Counselling Session</a>
							<div className="blog-detail">
								<p>
									Need Marriage Counseling? Or any other one-to-one Live
									Counseling Via Skype, IMO, Facetime or Phone Call with Sheikh
									Assim Al-Hakeem?
								</p>
								<p>
									<b>Email:</b> sheikhassim.bookings@gmail.com
								</p>
								<p>
									<b>DONATE FOR THE NEEDY</b>
								</p>
								<p>
									<b>
										Want to help a brother/sister in need who cannot afford to
										consult the Sheikh regarding their Marital Issues, OCD
										Waswas and the like?
									</b>
								</p>
								<p>
									<b>Donate for a needy Muslim :</b>
								</p>
								<p>
									<b>
										Assim Lugman Alhakeem
										<br />
										A/c: 164128664188
										<br />
										Maybank investment Berhad
										<br />
										Bangsar, KL Malaysia
										<br />
										Swift code: MBBEMYKLXXX
									</b>
								</p>
							</div>

							<div className="blog-detail contact-section">
								{/* <div className="container"> */}
								<div className="row">
									<div className="col s12 m6">
										<h2 className="contact-txt">Contact Us</h2>

										<p>
											For booking of live counselling sessions, send us email at{" "}
											<a href="mailto:sheikhassim.bookings@gmail.com">
												sheikhassim.bookings@gmail.com
											</a>{" "}
											or get in touch by filling in details below:
										</p>
										<div>
											<form
												action=""
												method="POST"
												onSubmit={(e) => handleSubmit(e)}>
												<div>
													<input
														type="text"
														placeholder="Name"
														name="fullname"
														size={40}
													/>
												</div>
												<div>
													<input
														type="email"
														placeholder="Email"
														name="email"
														size={40}
													/>
												</div>
												<div>
													<input type="date" placeholder="Date" name="date" />
												</div>
												<div>
													<select name="Time">
														<option value="Time">Time</option>
														<option value="1pm to 2pm">1pm to 2pm</option>
														<option value="2pm to 3pm">2pm to 3pm</option>
														<option value="3pm to 4pm">3pm to 4pm</option>
														<option value="4pm to 5pm">4pm to 5pm</option>
														<option value="5pm to 6pm">5pm to 6pm</option>
														<option value="6pm to 7pm">6pm to 7pm</option>
														<option value="7pm to 8pm">7pm to 8pm</option>
														<option value="8pm to 9pm">8pm to 9pm</option>
														<option value="9pm to 10pm">9pm to 10pm</option>
														<option value="10pm to 11pm">10pm to 11pm</option>
													</select>
												</div>
												<input type="submit" value="Submit"></input>
											</form>
										</div>
									</div>
								</div>
								{/* </div> */}
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
