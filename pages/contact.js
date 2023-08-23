import { server, receiverEmail, emailSenderName } from "../lib/config";

import { useState, useRef } from "react";
import {
	getAllPlaylists2,
	getAllQnaCategory,
	getHeaderLectures,
} from "../lib/fetch";
import Meta from "../components/meta";
import Header from "../components/header";
import Snackbar from "@material-ui/core/Snackbar";
//import Slider from 'react-slick'
//import 'slick-carousel/slick/slick.css'

export default function Contact({ playlists, headerLectures, qna_categories }) {
	//snackbar
	const [snackbarOpen, setSnackbarOpen] = useState(false);

	const handleSnackbarClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}
		setSnackbarOpen(false);
	};

	// contact
	const [name, setName] = useState("");
	const [subject, setSubject] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [message, setMessage] = useState("");

	const nameEl = useRef(null);
	const subjectEl = useRef(null);
	const emailEl = useRef(null);
	const phoneEl = useRef(null);
	const messageEl = useRef(null);

	const handleNameChange = (e) => {
		e.target.classList.remove("error");
		setName(e.target.value.trim());
	};

	const handleSubjectChange = (e) => {
		e.target.classList.remove("error");
		setSubject(e.target.value.trim());
	};

	const handleEmailChange = (e) => {
		e.target.classList.remove("error");
		setEmail(e.target.value.trim());
	};

	const handlePhoneChange = (e) => {
		e.target.classList.remove("error");
		setPhone(e.target.value.trim());
	};

	const handleMessageChange = (e) => {
		e.target.classList.remove("error");
		setMessage(e.target.value.trim());
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		//console.log('Sending')

		let error = false;

		const pattern =
			/^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;

		if (name === "") {
			nameEl.current.classList.add("error");
			error = true;
		}

		// if (subject === '') {
		// 	subjectEl.current.classList.add('error')
		// 	error = true
		// }

		if (email === "") {
			emailEl.current.classList.add("error");
			error = true;
		}

		if (!pattern.test(email)) {
			emailEl.current.classList.add("error");
			error = true;
		}

		// if (phone === '') {
		// 	phoneEl.current.classList.add('error')
		// 	error = true
		// }

		if (message === "") {
			messageEl.current.classList.add("error");
			error = true;
		}

		if (error) return;

		// START SENDING EMAIL
		let body =
			"<b>Name: </b>" +
			name +
			"<br/>" +
			"<b>Email: </b>" +
			email +
			"<br/>" +
			"<b>Subject: </b>" +
			subject +
			"<br/>" +
			"<b>Phone: </b>" +
			phone +
			"<br/>" +
			"<b>Message: </b>" +
			message +
			"<br/>";

		let receiver = receiverEmail;
		let sender = emailSenderName;

		let data = {
			body,
			email,
			name,
			receiver,
			sender,
		};

		try {
			const response = await fetch(
				"https://dit-mail-client.vercel.app/email-client",
				{
					method: "POST",
					headers: {
						Accept: "application/json, text/plain, */*",
						"Content-Type": "application/json",
					},
					body: JSON.stringify(data),
				}
			);
			if (response.ok) {
				//console.log(res)
				setName("");
				setSubject("");
				setEmail("");
				setPhone("");
				setMessage("");

				nameEl.current.value = "";
				subjectEl.current.value = "";
				emailEl.current.value = "";
				phoneEl.current.value = "";
				messageEl.current.value = "";

				setSnackbarOpen(true);
			} else {
				console.error("Error! Please try again later.");
			}
		} catch (error) {
			console.error(error);
		}
		// END SENDING EMAIL
	};

	return (
		<>
			<Meta
				title="Contact"
				description="Sheikh Assim bin Luqman al-Hakeem was born in 1962 in the city of Al-Khobar, which lies in the east of the Kingdom of Saudi Arabia. He was raised there until the age of 12 before he and his family moved to the Western Province of Saudi Arabia"
				url={`${server}/contact`}
				image={`${server}/img/id/default_share.jpeg`}
				type="website"
			/>

			<Header
				playlists={playlists}
				lectures={headerLectures}
				qna_categories={qna_categories}
			/>

			<section className="contact-page-ctn">
				<div className="page-width">
					<div className="box">
						<div className="row row-r">
							<div className="col col-r s12 m12">
								<div className="contact-left">
									{/* <div className="contact-top">
                    <h1>যোগাযোগ করুন</h1>
                    <p>
                      আপনি যদি আপনার প্রশ্ন বা সমস্যার উত্তর না পেয়ে থাকেন, তবে
                      অনুগ্রহ করে নিচের ফর্ম ব্যবহার করে আমাদের সাথে যোগাযোগ
                      করুন এবং যত তাড়াতাড়ি সম্ভব আমরা আপনার সাথে যোগাযোগ করবো।
                    </p>
                  </div> */}

									<form
										className="contact-form"
										action=""
										method="POST"
										onSubmit={(e) => handleSubmit(e)}>
										<div className="contact-top">
											<h1>Contact</h1>
											<p>You can email us to contact</p>
										</div>

										<div className="row">
											<div className="col s12 m12 l6">
												<div className="contact-input">
													<p>Name</p>
													<input
														type="text"
														name="name"
														onChange={(e) => handleNameChange(e)}
														ref={nameEl}
													/>
												</div>
											</div>
											<div className="col s12 m12 l6">
												<div className="contact-input">
													<p>Subject</p>
													<input
														type="text"
														name="subject"
														onChange={(e) => handleSubjectChange(e)}
														ref={subjectEl}
													/>
												</div>
											</div>
											<div className="col s12 m12 l6">
												<div className="contact-input">
													<p>Email</p>
													<input
														type="text"
														name="email"
														placeholder="email@example.com"
														onChange={(e) => handleEmailChange(e)}
														ref={emailEl}
													/>
												</div>
											</div>
											<div className="col s12 m12 l6">
												<div className="contact-input">
													<p>Phone</p>
													<input
														type="text"
														name="phone"
														placeholder="+880 1xxxxxxxxx"
														onChange={(e) => handlePhoneChange(e)}
														ref={phoneEl}
													/>
												</div>
											</div>
											<div className="col s12 m12 l12">
												<div className="contact-input">
													<p>Message</p>
													<textarea
														name="message"
														onChange={(e) => handleMessageChange(e)}
														ref={messageEl}></textarea>
												</div>
											</div>
											<div className="col s12 m12 l12">
												<div className="contact-input">
													<button
														className="btn-r"
														type="submit"
														name="contact">
														Submit
													</button>
												</div>
											</div>
										</div>
									</form>
								</div>
							</div>
							{/* <div className="col col-r s12 m12 l4 xl3">
                <div className="contact-right">
                  <div className="sidebar-profile sc-1">
                    <div className="s-profile-image">
                      <Image
                        src={`${server}/img/id/profile-01B.png`}
                        alt=""
                        layout="fill"
                        objectFit="cover"
                        objectPosition="center center"
                        loading="eager" unoptimized
                      />
                    </div>

                    <h2 className="s-profile-name">
                      ড. আবু বকর মুহাম্মাদ যাকারিয়া
                    </h2>

                    <ul className="s-profile-social">
                      <li>
                        <a
                          href="https://www.facebook.com/drmuhammadsaifullahofficial"
                          target="_blank"
                        >
                          <i className="facebook fab fa-facebook-f"></i>
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://www.facebook.com/drmuhammadsaifullahofficial"
                          target="_blank"
                        >
                          <i className="youtube fab fa-youtube"></i>
                        </a>
                      </li>
                    </ul>
                  </div>

                  <div className="contact-address">
                    <p>আমাদের সাথে যোগাযোগ করুন</p>
                    <ul>
                      <li>
                        <a
                          href="mailto:contact.mme.nu@gmail.com"
                          target="_blank"
                        >
                          <span title="contact.mme.nu@gmail.com">
                            contact.mme.nu@gmail.com
                          </span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div> */}
						</div>
					</div>
				</div>
			</section>

			<Snackbar
				anchorOrigin={{
					vertical: "bottom",
					horizontal: "left",
				}}
				open={snackbarOpen}
				autoHideDuration={3000}
				onClose={handleSnackbarClose}
				message="Email has been sent."
			/>
		</>
	);
}

// const SponsorSlider = () => {
// 	const settings = {
// 		autoplay: true,
// 		autoplaySpeed: 5000,
// 		arrows: false,
// 		//prevArrow: $('.sponsor-prev'),
// 		//nextArrow: $('.sponsor-next'),
// 		dots: false,
// 		draggable: true,
// 		//focusOnSelect: false,
// 		slidesToShow: 1,
// 		slidesToScroll: 1,
// 		speed: 500,
// 		infinite: true,
// 		cssEase: 'ease',
// 		//mobileFirst: false,
// 	}

// 	return (
// 		<Slider
// 			className="sponsor-slider"
// 			{...settings}
// 		>
// 			<div className="sponsor-item">
// 				<a href="#" target="_blank">
// 					<img src="/img/sponsor/sponsor-01.jpg" alt="" />
// 				</a>
// 			</div>
// 			<div className="sponsor-item">
// 				<a href="#" target="_blank">
// 					<img src="/img/sponsor/sponsor-01.jpg" alt="" />
// 				</a>
// 			</div>
// 		</Slider>
// 	)
// }

export async function getStaticProps(context) {
	const playlists = await getAllPlaylists2();
	const headerLectures = await getHeaderLectures();
	const qna_categories = await getAllQnaCategory();

	return {
		props: {
			playlists: playlists.playlists,
			headerLectures,
			qna_categories,
		},
	};
}
