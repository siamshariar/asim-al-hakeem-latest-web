import Link from "next/link"

export default function Banner() {
  return (
    <section className=" h-sec h-banner h3-banner even:bg-[#f4f4f4] py-2 h-banner-1">
			<div className="page-width">
				<div className="box h-banner-ctn">
					<div className="h-banner-text">
						<div className="h-banner-title">
							{/* <p>অফিসিয়াল ওয়েবসাইট</p> */}
							<h1>
								<span>Sheikh Assim Alhakeem</span>
							</h1>
						</div>
          <p className="text-muted-foreground md:text-xl lg:text-base xl:text-xl">
            Sheikh Assim bin Luqman al-Hakeem was born in 1962 in the city of
            Al-Khobar, which lies in the east of the Kingdom of Saudi Arabia.
            He was raised there until the age of 12 before he and his family
            moved to the Western Province of Saudi Arabia, to the city of
            Jeddah. The city of Jeddah is the gateway to the two Holy Mosques,
            with Makkah being about 85-90 kilometers away and Madinah.
          </p>
          <div className="flex flex-col gap-2 sm:flex-row">
            <button className="w-[150px] group bg-transparent text-lg text-gray-500 rounded-md px-4 py-2 hover:bg-gray-200/90 transition-colors duration-300 ease-in-out border border-gray-400 flex items-center">
                <Link href="/about">
                    See more
                </Link>
              <ArrowRightIcon className="ml-2 transition-transform duration-300 ease-in-out transform group-hover:translate-x-2" />
            </button>
          </div>
        </div>
        <div className="order-1 lg:order-2 relative">
          <img
            src="/img/profile-banner.jpeg"
            alt="Profile Banner"
            className="mx-auto w-full max-w-[280px] rounded-2xl shadow-lg"
            style={{ aspectRatio: "300/300", objectFit: "cover" }}
            loading="eager"
            unoptimized
          />
        </div>
    </div>
      </div>
    </section>
  )
}

function ArrowRightIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  )
}
