import Link from "next/link";
import Image from "next/image";
import { youtube } from "../../lib/config";

export default function HomeBanner() {
	return (
		<section className="h-sec h-banner h3-banner h-banner-1">
			<div className="page-width">
				<div className="box h-banner-ctn">
					<div className="h-banner-text">
						<div className="h-banner-title">
							{/* <p>অফিসিয়াল ওয়েবসাইট</p> */}
							<h1>
								<span>Sheikh Assim Alhakeem</span>
							</h1>
						</div>
						<p style={{ fontSize: "1.15rem;" }}>
							Sheikh Assim bin Luqman al-Hakeem was born in 1962 in the city of
							Al-Khobar, which lies in the east of the Kingdom of Saudi Arabia.
							He was raised there until the age of 12 before he and his family
							moved to the Western Province of Saudi Arabia, to the city of
							Jeddah. The city of Jeddah is the gateway to the two Holy Mosques,
							with Makkah being about 85-90 kilometers away and Madinah.
						</p>

						{/*<div className="h-banner-link">*/}
						{/*  <Link href="/contact/">*/}
						{/*    <a className="btn-r">যোগাযোগ</a>*/}
						{/*  </Link>*/}

						{/*  <Link href="/about/">*/}
						{/*    <a className="btn-r-rev">আমার সম্পর্কে</a>*/}
						{/*  </Link>*/}
						{/*</div>*/}

						<div className="row row-r">
							<div className="col col-r s12 l6">
								<div className="h3-cat-wrap">
									<Link href="#" passHref>
										<button className="button1">See more</button>
									</Link>
								</div>
							</div>
						</div>
					</div>

					{/*<div className="h-banner-image">*/}
					{/*  <div className="banner-image">*/}
					{/*    <Image*/}
					{/*      src="/img/id/profile-02.png"*/}
					{/*      alt=""*/}
					{/*      layout="fill"*/}
					{/*      objectFit="cover"*/}
					{/*      objectPosition="center center"*/}
					{/*      loading="eager" unoptimized*/}
					{/*    />*/}
					{/*  </div>*/}
					{/*</div>*/}

					<div className="opt_home_featured_right">
						<div className="opt_home_featured_image">
							<Image
								src="/img/profile-banner.jpeg"
								alt=""
								layout="fill"
								objectFit="cover"
								objectPosition="center center"
								loading="eager"
								unoptimized
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
