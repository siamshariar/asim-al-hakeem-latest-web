import { useRouter } from 'next/router';
import { Facebook, Youtube, Mail, Share2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Meta from "../../components/meta";
import Header2 from "../../components/header1";
import { server } from "../../lib/config";

// Static articles data
const articles = [
  {
    id: '1',
    slug: 'dawah-in-the-media-problems-and-solutions',
    title: "Da'wah in the media: problems and solutions",
    date: 'Sep 5, 2024',
    description: 'Al-Qur\'anul Kareem is the greatest and eternal miracle revealed by Allah...',
    image: '/img/articles/01.jpg', // Updated path
    content: '<p>The Quran is the greatest and eternal miracle revealed by Allah (subhanahu wa taala) to the Holy Prophet (peace and blessings be upon him). It provides clear guidance and instructions on all aspects of human life, offering light, advice, mercy, and relief from the ailments of the heart.</p>',
  },
  {
    id: '2',
    slug: 'titles-and-honorific-titles-of-the-companions',
    title: 'Titles and honorific titles of the Companions of the Prophet (ﷺ)',
    date: 'May 18, 2024',
    description: 'Only the believer has love for the Messenger of Allah...',
    image: '/img/articles/02.jpg', // Updated path
    content: '<p>Only the believer has love for the Messenger of Allah, peace and blessings be upon him. Because loving the Messenger of Allah (peace and blessings of Allah be upon him) is an essential part of faith. With utmost respect, deep love and</p>', // Example HTML content
  },
  {
    id: '3',
    slug: 'provisions-of-ushar-and-kharaj',
    title: 'Provisions of Ushar and Kharaj',
    date: 'Feb 22, 2024',
    description: 'Without a balanced, welfare oriented and comprehensive system...',
    image: '/img/articles/05.jpg', // Updated path
    content: '<p>Without a balanced, welfare-oriented and comprehensive system, it is not at all possible for people to live a healthy and normal social life. That is why Allah subhanahu wa taala has sent down a great Shariah, i.e. universal laws and regulations, as a mercy to mankind.</p>', // Example HTML content
  },
];

export default function ArticleDetail({ article, playlists, headerLectures, qnaCategories }) {
    const { slug } = useRouter().query;
  
    return (
      <>
        <Meta
          title={article.title}
          description={article.description}
          url={`${server}/articles/${slug}`}
          image={article.image}
          type="article"
        />
  
        <Header2
          playlists={playlists}
          lectures={headerLectures}
          qna_categories={qnaCategories}
        />
  
        <section className='article-detail py-[100px]'>
          <div className='container p-6 bg-white rounded-xl shadow-xl mx-auto'>
            <h1 className='text-3xl font-bold mb-6'>{article.title}</h1>
            <p className='text-lg text-[#0D9488] mb-6'>Published on {article.date}</p>
            <Image
              src={article.image}
              alt={article.title}
              width={800}
              height={400}
              className='w-full h-auto object-cover mb-6'
            />
            <div className='text-xl' dangerouslySetInnerHTML={{ __html: article.content }} />
  
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4">Share this article</h3>
              <div className="flex space-x-4">
                <a
                  href={`https://facebook.com/share?url=${encodeURIComponent(`${server}/articles/${slug}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-2 border border-gray-300 rounded-lg hover:bg-gray-100"
                >
                  <Facebook className="h-6 w-6" />
                  <span className="sr-only">Share on Facebook</span>
                </a>
                <a
                  href={`https://youtube.com/share?url=${encodeURIComponent(`${server}/articles/${slug}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-2 border border-gray-300 rounded-lg hover:bg-gray-100"
                >
                  <Youtube className="h-6 w-6" />
                  <span className="sr-only">Share on YouTube</span>
                </a>
                <a
                  href={`mailto:?subject=Check out this article&body=${encodeURIComponent(`${server}/articles/${slug}`)}`}
                  className="flex items-center p-2 border border-gray-300 rounded-lg hover:bg-gray-100"
                >
                  <Mail className="h-6 w-6" />
                  <span className="sr-only">Share via Gmail</span>
                </a>
                <button
                  onClick={() => navigator.clipboard.writeText(`${server}/articles/${slug}`)}
                  className="flex items-center p-2 border border-gray-300 rounded-lg hover:bg-gray-100"
                >
                  <Share2 className="h-6 w-6" />
                  <span className="sr-only">Copy link</span>
                </button>
              </div>
            </div>
  
            <section className="mt-12">
              <h2 className="text-2xl font-bold mb-4">More Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.filter(a => a.id !== article.id).map((relatedArticle) => (
                  <div key={relatedArticle.id} className="border rounded-lg overflow-hidden">
                    <Image
                      src={relatedArticle.image}
                      alt={relatedArticle.title}
                      width={400}
                      height={200}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="font-semibold text-xl mb-2">{relatedArticle.title}</h3>
                      <p className="text-lg text-gray-500 mb-4">{relatedArticle.description}</p>
                      <Link href={`/articles/${relatedArticle.slug}`}>
                        <span className="inline-block px-4 py-2 border border-gray-300 rounded-lg text-lg font-medium text-gray-800 hover:bg-gray-100">
                          Read More
                        </span>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </section>
      </>
    );
  }
  

export async function getStaticProps({ params }) {
  const { slug } = params;
  const article = articles.find(article => article.slug === slug);
  const playlists = []; // Include static playlists data or fetch it
  const headerLectures = []; // Same for headerLectures
  const qnaCategories = []; // Same for qnaCategories

  return {
    props: {
      article,
      playlists,
      headerLectures,
      qnaCategories,
    },
  };
}

export async function getStaticPaths() {
  const paths = articles.map(article => ({
    params: { slug: article.slug },
  }));

  return { paths, fallback: false };
}
