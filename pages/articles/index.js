import { useRouter } from 'next/router';
import { server } from "../../lib/config";
import { getAllPlaylists2, getHeaderLectures, getAllQnaCategory } from "../../lib/fetch";
import Meta from "../../components/meta";
import Header2 from "../../components/header1";
import articles from '../../data/airticles-data';

export default function Articles({ playlists, headerLectures, qnaCategories }) {
  const router = useRouter();
  const isArticlesPage = router.pathname === '/articles';

  return (
    <>
     {isArticlesPage && (
      <Meta
        title="Articles"
        description="Sheikh Assim bin Luqman al-Hakeem was born in 1962 in the city of Al-Khobar..."
        url={`${server}/articles`}
        image={`${server}/img/id/default_share.jpeg`}
        type="website"
      />
     )}

      {isArticlesPage && (
        <Header2
          playlists={playlists}
          lectures={headerLectures}
          qna_categories={qnaCategories}
        />
      )}

      <section className='articles'>
      <div className="container mx-auto py-4">
          {isArticlesPage ? (
            <div className="container mx-auto pt-8 lg:pt-12">
              <div className='flex justify-between mx-2 items-center mb-[30px]'>
                <h2 className='blog__title text-[1.5rem] md:ml-0 lg:mr-0 font-bold text-center xl:text-left'>Articles</h2>
                {!isArticlesPage && (
                  <a href="/articles" className="text-[#4c5354] underline">
                    View All
                  </a>
                )}
              </div>
            </div>
          ) : (
            <div className='flex justify-between mx-2 items-center mb-[30px]'>
              <h2 className='blog__title text-[1.5rem] md:ml-0 lg:mr-0 font-bold text-center xl:text-left'>Articles</h2>
              {!isArticlesPage && (
                <a href="/articles" className="text-[#4c5354] underline">
                  View All
                </a>
              )}
            </div>
          )}
          <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-[50px]'>
            {articles.map(article => (
              <div key={article.id} className='blog__post mx-2 max-w-auto sm-w-auto shadow-custom2 rounded-[10px] overflow-hidden cursor-pointer group'>
                <div className='relative overflow-hidden'>
                  <img className='group-hover:scale-110 transition-all duration-500' src={article.image} alt={article.title} />
                </div>

                <div className='px-5 py-6 lg:py-4'>
                  <div className='mb-2'>{article.date}</div>
                  <h4 className='h4 mb-[10px] lg:text-xl line-clamp-2'>{article.title}</h4>
                  <p className='font-light text-[#777F81]'>
                    <span>
                      {article.description}
                    </span>
                    <a href={`/articles/${article.slug}`} className='italic underline text-[#4c5354]'>
                      Read more
                    </a>
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
