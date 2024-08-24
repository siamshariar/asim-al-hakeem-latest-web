import Link from "next/link";
// import Image from "next/image";

export default function Footer() {
	return (
        <footer className="footer">
			<div className="page-width">
				<div className="box">
					<div className="simple-footer">
						<p className="footer-copyright">
							&copy; 2023, All rights reserved.
						</p>
						<div className="link-content">
							<Link href="/about">
								About Us
							</Link>
							<Link href="/counselling-session">
								Counselling Session
							</Link>
							<Link href="/contact">
								Contact
							</Link>
						</div>
						<p className="footer-powered-by">
							Powered By -{" "}
							<a
								className="link-r"
								href="https://deeniinfotech.com"
								target="_blank">
								Deeni Info Tech
							</a>
						</p>
					</div>
					{/* <div className="footer-ctn">
						<div className="foot-col">
							<p className="footer-copyright">
								&copy; 2023, All rights reserved.
							</p>
							<p className="footer-powered-by">
								Powered By -{" "}
								<a
									className="link-r"
									href="https://www.deeniinfotech.com"
									target="_blank">
									Deeni Info Tech
								</a>
							</p>
						</div>

						<div className="foot-col">
							<Link href="/">
								<a className="footer-logo">
									<Image
										// src={`${server}/img/id/logo_english.png`}
										src="/img/logo.png"
										alt=""
										width={132}
										height={117}
										objectFit="contain"
										objectPosition="center center"
										loading="eager"
										unoptimized
									/>
								</a>
							</Link>
						</div>

						<div className="foot-col">
							<div className="opt_footer_social">
								<h3 className="title-s">Social Media</h3>
								<ul>
									<li>
										<a
											href="https://www.facebook.com/SheikhAssimAlhakeemTeam/"
											target="_blank">
											<i className="fab fa-facebook-f"></i>
										</a>
									</li>
									<li>
										<a
											href="https://instagram.com/assimalhakeem?igshid=1v9psnayget6c"
											target="_blank">
											<i className="fab fa-instagram"></i>
										</a>
									</li>
									<li>
										<a href="https://twitter.com/Assimalhakeem" target="_blank">
											<i className="fab fa-twitter"></i>
										</a>
									</li>
									<li>
										<a
											href="https://www.youtube.com/user/assimalhakeem"
											target="_blank">
											<i className="fab fa-youtube"></i>
										</a>
									</li>
								</ul>
							</div>
						</div>
					</div> */}

					{/* <div className="mobile-footer">
						<div className="row row-r">
							<div className="col col-r s12 l12">
								<div className="center-align">
									<Link href="/">
										<a className="footer-logo center-align">
											<Image
												src="/img/logo.png"
												alt=""
												width={92}
												height={82}
												objectFit="contain"
												objectPosition="center center"
												loading="eager"
												unoptimized
											/>
										</a>
									</Link>
								</div>
								<div>
									<p className="footer-copyright center-align">
										<span>&copy; 2023, All rights reserved.</span>
									</p>
								</div>
								<div>
									<p className="footer-powered-by center-align">
										Powered By -{" "}
										<a
											className="link-r"
											href="https://www.deeniinfotech.com"
											target="_blank">
											Deeni Info Tech
										</a>
									</p>
								</div>
							</div>
						</div>
					</div> */}
				</div>
			</div>
		</footer>
    );
}
