import { server } from "../../lib/config";
import {
  getOrganizations, //
  getOrganizationDetails,
  getAllPlaylists2,
} from "../../lib/fetch";
import Link from "next/link";
import Meta from "../../components/meta";
import Header from "../../components/header";
import parse from "html-react-parser";
import Share from "../../components/share";
import BlogDetailImageSlider from "../../components/home/blog-detail-image-slider";

export default function OrganizationDetail({ detail, playlists }) {
  return (
    <>
      <Meta
        title={detail.orgName}
        description="ড. মুহাম্মাদ সাইফুল্লাহ একজন অধ্যাপক, ইসলামিক
        স্কলার, লেখক, গবেষক এবং দ্বীনের একনিষ্ঠ দা'য়ী।
        ইসলামের প্রচার-প্রসারে স্বনামধন্য মিডিয়া ব্যক্তিত্বও।
        ফিকহ শারীআহ, ইসলামি আইন ও আইনশাস্ত্র বিভাগ, মদীনা ইসলামি বিশ্ববিদ্যালয়, কিংডম অফ সৌদি আরব থেকে ব্যাচেলর, মাস্টার্স ও পিএচডি সম্পন্ন করেন।"
        url={`${server}/organizations/${detail.orgSlug}`}
        image={`${server}/${detail.imageSrc}`}
        type="article"
      />

      <Header playlists={playlists} />

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

      <section className="blog-detail-ctn">
        <div className="page-width">
          <div className="box">
            <div className="blog-area">
              <Link href={`/organizations/${detail.orgSlug}`}>
                <a className="heading-r heading-b">{detail.orgName}</a>
              </Link>

              <div className="blog-detail-slider">
                <BlogDetailImageSlider images={detail.images} />
              </div>

              <div className="blog-detail">
                <p>{parse(detail.orgDetail)}</p>
                {detail.orgFacebook !== "" && (
                  <p>
                    ফেইসবুক:{" "}
                    <a href={parse(detail.orgFacebook)} target="_blank">
                      {parse(detail.orgFacebook)}
                    </a>
                  </p>
                )}
              </div>

              <div className="blog-action">
                {/*<div className="blog-tag">*/}
                {/*	<h2>ট্যাগ</h2>*/}

                {/*	<Link href="/articless/">*/}
                {/*		<a>#কুরআন</a>*/}
                {/*	</Link>*/}
                {/*	<Link href="/articless/">*/}
                {/*		<a>#হাদিস</a>*/}
                {/*	</Link>*/}
                {/*</div>*/}

                <div className="blog-share">
                  <Share
                    urlWeb={`organizations/${detail.orgSlug}`}
                    urlMobile={detail.orgSlug}
                    title={detail.orgName}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*<section className="blog-page-related">*/}
      {/*	<div className="page-width">*/}
      {/*		<div className="box">*/}
      {/*			<h1 className="title-r">*/}
      {/*				<span>সম্পর্কিত পোস্ট</span>*/}
      {/*			</h1>*/}

      {/*			<div className="row row-r">*/}
      {/*			{*/}
      {/*				articles && articles.length && articles.map(article =>*/}
      {/*					<div className="col col-r s12 xl4" key={article.id}>*/}
      {/*						<PostCardArticle article={article} />*/}
      {/*					</div>*/}
      {/*				)*/}
      {/*			}*/}
      {/*			</div>*/}
      {/*		</div>*/}
      {/*	</div>*/}
      {/*</section>*/}
    </>
  );
}

export async function getStaticProps({ params }) {
  const slug = params.slug;
  const detail = await getOrganizationDetails(slug);
  const playlists = await getAllPlaylists2();

  return {
    props: {
      detail,
      playlists: playlists.playlists,
    },
  };
}

export async function getStaticPaths() {
  const organizations = await getOrganizations();

  const paths = organizations.map((organization) => ({
    params: { slug: organization.orgSlug },
  }));

  return {
    paths,
    fallback: false,
  };
}
