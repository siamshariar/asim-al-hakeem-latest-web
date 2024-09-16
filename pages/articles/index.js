import { useRouter } from 'next/router';
import { server } from "../../lib/config";
import {
  getArticles,
  getAllPlaylists2,
  getHeaderLectures,
  getAllQnaCategory,
} from "../../lib/fetch";
import Meta from "../../components/meta";
import Header2 from "../../components/header1";

export default function Articles({
  articles,
  playlists,
  headerLectures,
  qnaCategories,
}) {
  const router = useRouter();
  const isArticlesPage = router.pathname === '/articles';

  return (
    <>
      <Meta
        title="Articles"
        description="Sheikh Assim bin Luqman al-Hakeem was born in 1962 in the city of Al-Khobar, which lies in the east of the Kingdom of Saudi Arabia. He was raised there until the age of 12 before he and his family moved to the Western Province of Saudi Arabia"
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

          <div className='flex flex-col xl:flex-row gap-y-6 xl:gap-y-0 items-center xl:justify-between mb-[50px]'>
          <div className='blog__post max-w-[420px] shadow-custom2 rounded-[10px] overflow-hidden cursor-pointer group'>
            <div className='relative overflow-hidden'>
              <img className='group-hover:scale-110 transition-all duration-500' src="img/articles/01.jpg" alt=""/>
            </div>

            <div className='px-5 py-6'>
              <div className='mb-4'>Sep 5, 2024</div>
              <h4 className='h4 mb-[10px]'>Da'wah in the media: problems and solutions</h4>
              <p className='font-light text-[#777F81]'>Al-Qur'anul Kareem is the greatest and eternal miracle revealed by Allah subhanahu wa ta'ala to the Holy Prophet, peace and blessings be upon him...

                <a href='' className='italic underline text-[#4c5354]'>Read more</a>
              </p>
            </div>
          </div>
          <div className='blog__post max-w-[420px] shadow-custom2 rounded-[10px] overflow-hidden cursor-pointer group'>
            <div className='relative overflow-hidden'>
              <img className='group-hover:scale-110 transition-all duration-500' src="img/articles/02.jpg" alt=""/>
            </div>

            <div className='px-5 py-6'>
              <div className='mb-4'>May 18, 2024</div>
              <h4 className='h4 mb-[10px]'>Titles and honorific titles of the Companions of the Prophet (ﷺ).</h4>
              <p className='font-light text-[#777F81]'>Only the believer has love for the Messenger of Allah, peace and blessings be upon him. Because Rasulullah SAW...

                <a href='' className='italic underline text-[#4c5354]'>Read more</a>
              </p>
            </div>
          </div>
          <div className='blog__post max-w-[420px] shadow-custom2 rounded-[10px] overflow-hidden cursor-pointer group'>
            <div className='relative overflow-hidden'>
              <img className='group-hover:scale-110 transition-all duration-500' src="img/articles/05.jpg" alt=""/>
            </div>

            <div className='px-5 py-6'>
              <div className='mb-4'>Feb 22, 2024</div>
              <h4 className='h4 mb-[10px]'>Provisions of Ushar and Kharaj</h4>
              <p className='font-light text-[#777F81]'>Without a balanced, welfare oriented and comprehensive system it is not at all possible for people to lead a healthy and normal social life...

                <a href='' className='italic underline text-[#4c5354]'>Read more</a>
              </p>
            </div>
          </div>
        </div>

 

        </div>
      </section>
    </>
  );
}

export async function getStaticProps(context) {
  const articles = await getArticles();
  const playlists = await getAllPlaylists2();
  const headerLectures = await getHeaderLectures();
  const qnaCategories = await getAllQnaCategory();

  return {
    props: {
      articles,
      playlists: playlists.playlists,
      headerLectures,
      qnaCategories,
    },
  };
}
