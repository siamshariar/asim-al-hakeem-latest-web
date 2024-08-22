import { server } from "../../lib/config";
import {
	getAllPlaylists2,
	getHeaderLectures,
	getAllQnaCategory,
} from "../../lib/fetch";
import Meta from "../../components/meta";
import Header from "../../components/header";

import React from 'react';
import { useRouter } from 'next/router';
import { verses } from '../../data/verses';
import styles from '../../styles/VerseDetails.module.scss';

const VerseDetails = ({ playlists, headerLectures, qnaCategories }) => {
  const router = useRouter();
  const { id } = router.query;


  console.log("ID from query:", id);


  const verse = verses.find((v) => v.id === parseInt(id));

  if (!verse) {
    return <p>Verse not found</p>;
  }

  return (
    <>
      <Meta
        title="Tafseer"
        description="Learn more about this verse..."
        url={`${server}/verse-details/${id}`}
        image={`${server}/img/id/default_share.jpeg`}
        type="website"
      />

      <Header
        playlists={playlists}
        lectures={headerLectures}
        qna_categories={qnaCategories}
      />
    
      <div className={styles.verseDetails}>
        <h1>{verse.verse}</h1>
        <p>{verse.word}</p>
        <h2 style={{ fontSize: '20px' }}>Tafseer of this verse:</h2>
        <p style={{ fontSize: '18px', marginTop: '10px' }}>{verse.tafseer}</p>
      </div>
    </>
  );
};

export async function getStaticProps() {
  try {
    const playlists = await getAllPlaylists2();
    const headerLectures = await getHeaderLectures();
    const qnaCategories = await getAllQnaCategory();

    return {
      props: {
        playlists: playlists?.playlists || [], 
        headerLectures: headerLectures || [], 
        qnaCategories: qnaCategories || [],   
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        playlists: [],         
        headerLectures: [],   
        qnaCategories: [],     
      },
    };
  }
}

export async function getStaticPaths() {
  const paths = verses.map((verse) => ({
    params: { id: verse.id.toString() },
  }));

  return {
    paths,
    fallback: false,
  };
}

export default VerseDetails;
