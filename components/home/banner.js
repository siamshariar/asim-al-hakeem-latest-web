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
              <p>অফিসিয়াল ওয়েবসাইট</p>
              <h1>
                <span>ড. মুহাম্মদ সাইফুল্লাহ</span>
              </h1>
            </div>
            <p style={{fontSize: "1.15rem;"}}>
              ড. মুহাম্মাদ সাইফুল্লাহ একজন ইসলামীক স্কলার, লেখক, গবেষক এবং দ্বীনের একনিষ্ঠ দা'ঈ।
              ইসলামের প্রচার-প্রসারে স্বনামধন্য মিডিয়া ব্যক্তিত্বও। তিনি ইসলামী গবেষণা, টিভি/ইউটিউব চ্যানেল এবং উন্মুক্ত আলোচনার মাধ্যমে জাতীয় ও আন্তর্জাতিকভাবে পরিচিত। ফিকহ শারী'আহ, ইসলামী আইন ও আইনশাস্ত্র বিভাগ, মদীনা ইসলামী বিশ্ববিদ্যালয়, কিংডম অফ সৌদি আরব থেকে ব্যাচেলর, মাস্টার্স ও পিএচডি সম্পন্ন করেন।
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
                  <div className="h3-cat-card">
                    <Link href="/books/">
                      <a className="card card-r">
                        <i className="fas fa-book"></i>
                        <span>বই সমূহ</span>
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col col-r s12 l6">
                <div className="h3-cat-wrap">
                  <div className="h3-cat-card">
                    <Link href="/lectures/">
                      <a className="card card-r">
                        <i className="fas fa-video"></i>
                        <span>ভিডিও লেকচার</span>
                      </a>
                    </Link>
                  </div>
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
                src="/img/rsz_20210407_211234.jpg"
                alt=""
                layout="fill"
                objectFit="cover"
                objectPosition="center center"
                loading="eager" unoptimized
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
