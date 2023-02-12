import { server } from "../lib/config";
import Image from "next/image";
import { getAllPlaylists2 } from "../lib/fetch";
import Layout from "../components/layout";
import Meta from "../components/meta";
import Header from "../components/header";
import Link from "next/link";
import parse from "html-react-parser";
import BlogDetailImageSlider from "../components/home/blog-detail-image-slider";
import Share from "../components/share";

export default function About({ playlists }) {
  return (
    <>
      <Meta
        title="জীবন চরিত | ড. মুহাম্মাদ সাইফুল্লাহ অফিসিয়াল ওয়েবসাইট - Official website of Dr. Muhammad Saifullah"
        description="ড. মুহাম্মাদ সাইফুল্লাহ একজন অধ্যাপক, ইসলামিক
        স্কলার, লেখক, গবেষক এবং দ্বীনের একনিষ্ঠ দা'য়ী।
        ইসলামের প্রচার-প্রসারে স্বনামধন্য মিডিয়া ব্যক্তিত্বও।
        ফিকহ শারীআহ, ইসলামি আইন ও আইনশাস্ত্র বিভাগ, মদীনা ইসলামি বিশ্ববিদ্যালয়, কিংডম অফ সৌদি আরব থেকে ব্যাচেলর, মাস্টার্স ও পিএচডি সম্পন্ন করেন।"
        url={`${server}/about`}
        image={`${server}/img/id/default_share.png`}
        type="website"
      />

      <Header playlists={playlists} />

      <section className="about-page-ctn">
        <div className="page-width">
          <div className="box">
            <div className="row row-r">
              <div className="col col-r s12 m12 l4 xl3">
                <div className="about-left">
                  <div className="sidebar-profile sc-1">
                    <div className="s-profile-image">
                      <Image
                        src={`${server}/img/profile-01.png`}
                        alt=""
                        layout="fill"
                        objectFit="cover"
                        objectPosition="center center"
                        loading="eager" unoptimized
                      />
                    </div>

                    <h2 className="s-profile-name">ড. মুহাম্মাদ সাইফুল্লাহ</h2>

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
                </div>
              </div>
              <div className="col col-r s12 m12 l8 xl9">
                <div className="about-right">
                  <div className="blog-area">
                    <a style={{marginBottom: "0px"}} className="heading-r heading-b">পরিচিতি</a>

                    {/*<div className="about-banner">*/}
                    {/*  <Image*/}
                    {/*    src={`${server}/img/bg/banner-01.jpg`}*/}
                    {/*    alt=""*/}
                    {/*    layout="fill"*/}
                    {/*    objectFit="cover"*/}
                    {/*    objectPosition="center center"*/}
                    {/*    loading="eager" unoptimized*/}
                    {/*  />*/}
                    {/*</div>*/}

                    <div className="blog-detail">
                      <p>
                        <b>ড. মুহাম্মাদ সাইফুল্লাহ</b>, পিতা: আহমাদ কারীম রহিমাহুল্লাহ।
                        তিনি বাংলাদেশের ফেনী জেলার সোনাগাজী উপজেলার পাইকপাড়া গ্রামের এক ধার্মিক পরিবারে ৩১ ডিসেম্বর ১৯৭১ সালে জন্মগ্রহণ করেন।
                        তিনি তার ইসলামী গবেষণা, চিন্তা-চেতনা অসংখ্য জ্ঞানগর্ভ আলোচনা, সেমিনারের পাশাপাশি তার লেখা বিভিন্ন রিসার্চ পেপার ও বইয়ে তুলে ধরেছেন। তার লেখা বই বাংলা ভাষার পাশাপাশি আরবি ভাষায়ও রয়েছে।
                        দ্বীনের একজন একনিষ্ঠ দা'ঈ হিসেবে আমাদের সমাজে ইসলামী শিক্ষার প্রচার-প্রসারে ড. মুহাম্মদ সাইফুল্লাহ অবিরত কাজ করে চলেছেন।
                      </p>
                    </div>


                    <a style={{marginBottom: "0px"}} className="heading-r heading-b">শিক্ষাজীবন</a>
                    <div className="blog-detail">
                      <p>
                        ড. মুহাম্মাদ সাইফুল্লাহ ১৯৯২ সালে মদীনা ইসলামী বিশ্ববিদ্যালয় শারী'আহ অনুষদে স্কলারশিপে ভর্তি হন এবং সেখান থেকে ব্যাচেলর, মাস্টার্স ও ২০০৮ সালে পিএইচডি ডিগ্রি অর্জন করেন। তার পিএইচডির বিষয় ছিল ইসলামীক ল এন্ড জুরিসপ্রুডেন্স।
                        তিনি বাংলাদেশ মাদরাসা শিক্ষা বোর্ডের অধীনে দাখিল, আলিম, ফাযিল ও কামিল পরীক্ষায় সাফল্যের সাথে বোর্ডস্ট্যান্ড করেছেন।
                        এছাড়াও তিনি কাওমী মাদরাসায় মিশকাত, দাওরা হাদীস ও ইফতা কোর্স সম্পন্ন করেছেন।
                      </p>
                    </div>

                    <a style={{marginBottom: "0px"}} className="heading-r heading-b">কর্মজীবন</a>
                    <div className="blog-detail">
                      <p>
                        ২০০৯ সালে তিনি আন্তর্জাতিক ইসলামী বিশ্ববিদ্যালয় চট্টগ্রাম (IIUC) এ সহকারি অধ্যাপক হিসেবে তার কর্মজীবনের শুরু করেন।
                        ২০১৫ সালে সহকারী অধ্যাপক হিসেবে এশিয়ান ইউনিভার্সিটি অব বাংলাদেশ এ যুক্ত হন, এখন পর্যন্ত তিনি ইসলামীক স্টাডিজ বিভাগের সহযোগী অধ্যাপক হিসেবে সেখানেই কর্মরত আছেন।
                        পাশাপাশি তিনি ড্যাফোডিল ইন্ট্যারন্যাশনাল বিশ্ববিদ্যালয়ের অধীনে ডিআইসিতে ভিজিটিং প্রফেসর হিসেবে নিযুক্ত আছেন।
                      </p>
                      <p>
                        ড. মুহাম্মাদ সাইফুল্লাহ ফিকহ একাডেমী বাংলাদেশের নির্বাহী পরিচালক। তিনি সৌদি বিশ্ববিদ্যালয় প্রাক্তন ছাত্র সমিতির সভাপতি হিসেবেও দায়িত্ব পালন করছেন।
                        এছাড়াও তিনি ২০২৩ সাল থেকে মুহাদ্দিস (ভিজিটিং), শরীফবাগ কামিল মাদরাসায় নিযুক্ত হন।
                      </p>
                      <p>
                        ড. মুহাম্মাদ সাইফুল্লাহ বাংলাদেশের জনপ্রিয় টিভি চ্যানেল এনটিভিতে "আপনার জিজ্ঞাসা" নামে  ইসলামী প্রশ্নোত্তর অনুষ্ঠানে ২০০৯ সাল থেকে প্রশ্নের উত্তর দিয়ে আসছেন।
                        পাশাপাশি তিনি তার ইউটিউব চ্যানেল ও অন্যান্য বিভিন্ন টিভি চ্যানেলে আলোচনা, প্রশ্নোত্তর সেশনে অবদান রেখে আসছেন।
                        সাথে সাথে তিনি দেশের বিভিন্ন জেলায় উন্মুক্ত আলোচনা, ইসলামী হালাকা এবং বিভিন্ন কোর্স এর মাধ্যমে ইসলামের দা'ওয়াতী কাজে অগ্রসর ভূমিকা পালন করে আসছেন।
                      </p>
                    </div>



                    {/*<div className="blog-action">*/}
                    {/*  /!*<div className="blog-tag">*!/*/}
                    {/*  /!*	<h2>ট্যাগ</h2>*!/*/}

                    {/*  /!*	<Link href="/articless/">*!/*/}
                    {/*  /!*		<a>#কুরআন</a>*!/*/}
                    {/*  /!*	</Link>*!/*/}
                    {/*  /!*	<Link href="/articless/">*!/*/}
                    {/*  /!*		<a>#হাদিস</a>*!/*/}
                    {/*  /!*	</Link>*!/*/}
                    {/*  /!*</div>*!/*/}

                    {/*  <div className="row row-r">*/}
                    {/*    <div className="col col-r">*/}
                    {/*      <div className="cv-download">*/}
                    {/*        <a*/}
                    {/*          className="btn-r cv-download-link"*/}
                    {/*          href={`${server}/pdf-viewer/web/viewer.html?file=https://deeniinfotech.sgp1.digitaloceanspaces.com/files/pdf/muhammadsaifullah.com/CV%20of%20Dr%20Abubakar%20Muhammad%20Zakaria%20-%20May%202021.pdf`}*/}
                    {/*          target="_blank"*/}
                    {/*        >*/}
                    {/*          <i className="fas fa-download"></i>*/}
                    {/*          <span>সিভি পিডিএফ</span>*/}
                    {/*        </a>*/}
                    {/*      </div>*/}
                    {/*    </div>*/}
                    {/*  </div>*/}
                    {/*</div>*/}


                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export async function getStaticProps(context) {
  const playlists = await getAllPlaylists2();

  return {
    props: {
      playlists: playlists.playlists,
    },
  };
}
