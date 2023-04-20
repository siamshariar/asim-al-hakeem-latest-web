import { server } from "../../lib/config";
import {
	getArticles,
	getArticleDetails,
	getRelatedArticles,
	getAllPlaylists2,
	getHeaderLectures,
} from "../../lib/fetch";
import Link from "next/link";
import Layout from "../../components/layout";
import Meta from "../../components/meta";
import Header from "../../components/header";
import parse from "html-react-parser";
import Share from "../../components/share";
import Image from "next/image";

export default function BlogDetail({ detail, playlists, headerLectures }) {
	return (
		<>
			<Meta
				title={detail.postTitle}
				description="Sheikh Assim bin Luqman al-Hakeem was born in 1962 in the city of Al-Khobar, which lies in the east of the Kingdom of Saudi Arabia. He was raised there until the age of 12 before he and his family moved to the Western Province of Saudi Arabia"
				image={`${server}/img/id/default_share.jpeg`}
				url={`${server}/articles/${detail.postSlug}`}
				type="article"
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

			<section className="blog-detail-ctn article-detail">
				<div className="page-width">
					<div className="box">
						<div className="blog-area">
							<a className="heading-r heading-b">{detail.postTitle}</a>
							{detail.imageSrc ? (
								<div className="card-image">
									<Link href={`/articles/${detail.postSlug}`}>
										<a className="image-r">
											<Image
												src={
													detail.imageSrc
														? detail.imageSrc
														: "/img/post/placeholder-image.jpg"
												}
												alt=""
												layout="fill"
												objectFit="cover"
												objectPosition="center center"
												loading="eager"
												unoptimized
											/>
										</a>
									</Link>
								</div>
							) : null}

							<div className="blog-detail">
								<p>{detail.postExcerpt}</p>
								<p>
									<a
										target="_blank"
										href={`${server}/pdf-viewer/web/viewer.html?file=${detail.pdf}`}>
										<span>Read Details</span>
									</a>
								</p>
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
										urlWeb={`articles/${detail.postSlug}`}
										urlMobile={detail.postSlug}
										title={detail.postTitle}
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
	const detail = await getArticleDetails(slug);
	const playlists = await getAllPlaylists2();
	const headerLectures = await getHeaderLectures();

	return {
		props: {
			detail,
			playlists: playlists.playlists,
			headerLectures,
		},
	};
}

export async function getStaticPaths() {
	const articles = await getArticles();

	const paths = articles.map((article) => ({
		params: { slug: article.postSlug },
	}));

	return {
		paths,
		fallback: false,
	};
}
