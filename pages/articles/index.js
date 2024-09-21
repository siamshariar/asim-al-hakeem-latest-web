import { useRouter } from 'next/router';
import { server } from "../../lib/config";
import { getAllPlaylists2, getHeaderLectures, getAllQnaCategory } from "../../lib/fetch";
import Meta from "../../components/meta";
import Header2 from "../../components/header1";

// Static articles data
const articles = [
  {
    id: '1',
    slug: 'dawah-in-the-media-problems-and-solutions',
    title: "Da'wah in the media: problems and solutions",
    date: 'Sep 5, 2024',
    description: 'Al-Qur\'anul Kareem is the greatest and eternal miracle revealed by Allah...',
    image: 'img/articles/01.jpg',
  },
  {
    id: '2',
    slug: 'titles-and-honorific-titles-of-the-companions',
    title: 'Titles and honorific titles of the Companions of the Prophet (ﷺ)',
    date: 'May 18, 2024',
    description: 'Only the believer has love for the Messenger of Allah, peace and blessings be upon him...',
    image: 'img/articles/02.jpg',
  },
  {
    id: '3',
    slug: 'provisions-of-ushar-and-kharaj',
    title: 'Provisions of Ushar and Kharaj',
    date: 'Feb 22, 2024',
    description: 'Without a balanced, welfare oriented and comprehensive system it is not at all possible...',
    image: 'img/articles/05.jpg',
  },
];

export default function Articles({ playlists, headerLectures, qnaCategories }) {
  const router = useRouter();
  const isArticlesPage = router.pathname === '/articles';

  return (
    <>
      <Meta
        title="Articles"
        description="Sheikh Assim bin Luqman al-Hakeem was born in 1962 in the city of Al-Khobar..."
        url={`${server}/articles`}
        image={`${server}/img/id/default_share.jpeg`}
        type="website"
      />

      {isArticlesPage && (
        <Header2
          playlists={playlists}
          lectures={headerLectures}
          qna_categories={qnaCategories}
        />
      )}

      <section className='articles py-[120px]'>
        <div className='container mx-auto'>
          <h2 className='blog__title h2 mb-[50px] text-center xl:text-left'>Articles</h2>

          <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-[50px]'>


            {articles.map(article => (
              <div key={article.id} className='blog__post max-w-[650px] sm-w-[500px] shadow-custom2 rounded-[10px] overflow-hidden cursor-pointer group'>
                <div className='relative overflow-hidden'>
                  <img className='group-hover:scale-110 transition-all duration-500' src={article.image} alt={article.title}/>
                </div>

                <div className='px-5 py-6'>
                  <div className='mb-4'>{article.date}</div>
                  <h4 className='h4 mb-[10px]'>{article.title}</h4>
                  <p className='font-light text-[#777F81]'>
                    {article.description}
                    <a href={`/articles/${article.slug}`} className='italic underline text-[#4c5354]'>Read more</a>
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}

export async function getStaticProps(context) {
  const playlists = await getAllPlaylists2();
  const headerLectures = await getHeaderLectures();
  const qnaCategories = await getAllQnaCategory();

  return {
    props: {
      playlists: playlists.playlists,
      headerLectures,
      qnaCategories,
    },
  };
}
