import { server } from "../lib/config";
import Image from "next/image";
import { 
    Facebook, 
    Youtube, 
    Mail 
} from 'lucide-react'; // Import the desired icons
import {
    getAllPlaylists2,
    getAllQnaCategory,
    getHeaderLectures,
} from "../lib/fetch";
import Meta from "../components/meta";
import Header2 from "../components/header1";

export default function About({ playlists, headerLectures, qna_categories }) {
    const profile = {
        name: 'Asim Al Hakeem',
        about: [
            `Sheikh Assim bin Luqman al-Hakeem was born in 1962 in
			the city of Al-Khobar, which lies in the east of the
			Kingdom of Saudi Arabia. He was raised there until the
			age of 12 before he and his family moved to the Western
			Province of Saudi Arabia, to the city of Jeddah. The
			city of Jeddah is the gateway to the two Holy Mosques,
			with Makkah being about 85-90 kilometers away and
			Madinah, where the Mosque of the Prophet salla Allahu
			‘alaihi wa sallam is located, being 400 kilometers away.
			Sheikh Assim was there with Huda TV at the channel’s
			initial stages and he was also the first Sheikh of Ask
			Huda. He used to be an Imam in Jeddah before but since
			this is a kind of job that requires dedication and
			devotion, time does not permit him to be a full-time
			Imam now, so he only delivers the Friday Sermon.`,

`			Sheikh Assim grew up in Al-Khobar like, as he says, “any
			other kid down the block”; going to school, having
			friends, having the things kids want to play with and to
			enjoy themselves. Now, times have changed for him
			dramatically and drastically because, he says, as we
			grow up, we have so many obligations that we have to
			fulfill that we wish that there were 48 hours in a day
			instead of just 24. We feel that time is always a
			problem for us. When we are young, the only thing we
			think about is playing and enjoying ourselves, i.e.,
			killing time. This is all what the youth think about;
			just wasting time, playing cards, going around the
			streets, riding bikes, watching movies, listening to
			music, and doing anything to fill up their time. And
			usually, the Shaitan drives people to do something and
			waste their time in something that is not useful. So,
			this has changed for the Sheikh, as an individual,
			drastically. And he thinks that it is the same thing
			with all the youth; it is an ongoing process.`,

            `With regards to his university life, the Sheikh returned
			to the Eastern Province, after finishing his high school
			in 1980, to attend one of the most prominent
			universities in Saudi Arabia, the King Fahd University
			of Petroleum and Minerals. He says that this was a
			blessing and a curse at the same time. His English, at
			the time, was adequate. This helped him pass the level
			test, which allowed him to skip a whole year, which is
			the orientation year. And this, he feels, was a blessing
			as well as a curse because he was doing the freshman
			year while his friends were doing the orientation year.
			This made him go easy and take his studies lightly. So
			he spent his time during this year at the university
			going to the beach, playing sports, etc. This was a fun
			time for him because while everybody was studying and
			working hard, all he was doing was sleeping and playing
			sports. But when the second semester came, he became a
			little depressed because he felt that this could not go
			on. He hadn’t gotten good grades. So, he made his
			decision, quit the university and went back to Jeddah,
			the Western Province.`,

            `In Jeddah, he got a job, which was a very prominent job
			that paid a lot of money at the time. They gave him a
			car and a good salary. He worked at this job for about a
			year or so. Then, a twist came in his life when he once
			had to call one of his friend’s house and his mother
			answered the phone. She asked him who he was and he gave
			her his name. But he didn’t know her, as the custom is
			in Islam is that men don’t talk unnecessarily to women.
			She said, “You are my son’s friend, right?” He said yes.
			She said, “Son, until when are you going to stay like
			this; a punk?” The Sheikh was shocked by this. She
			continued by saying, “You can’t live like this, without
			going to school.” He told her that he was working. She
			said, “No, no, you have to go back to school.” So the
			Sheikh agreed but pointed out that the semester had
			already started 4 weeks ago. She told him not to worry,
			that she knew people and that she would pull a few
			strings and that the next morning he should go to the
			university with her son. The Sheikh hung up, feeling a
			little skeptical about the whole thing. The following
			morning, his friend called and they went to the
			university together. He was still skeptical but when he
			went to the registration office, he found a letter there
			from the Minister of Education, with his name on it!
			When he was told of the various courses that the
			university had to offer, the Sheikh chose to study
			English Literature because he thought it would be an
			easy subject. He did very well in his studies, ranked
			No.1 in the university in the first semester, got an
			Honor’s Certificate and a monetary prize. He finished
			university with a Major in Linguistics.`,

            `What the Sheikh never imagined was that he would use
			this English language to preach Islam. He comes from a
			Westernized family who spoke with each other in English
			while growing up. They were so Westernized that it was
			almost in their blood, as if they were born and raised
			abroad. The Sheikh considered that this was an
			inferiority complex. When he was a teacher, teaching in
			public high schools (for about 15 years), it had become
			a rumor among the kids that Mr. Assim is married to an
			American lady and that he has a Green Card. In reality,
			he had never been to America except only for about 4
			weeks in his life. This was the rumor apparently just
			because he spoke the language. The Sheikh considers it a
			blessing from Allah ‘azza wa jal and he values this
			blessing. He never thought, not even in his wildest
			dreams that he would use it to propagate Islam, to
			propagate what he believes in.`,

            `Before starting to preach Islam in English, the Sheikh
			had started to preach Islam in Arabic in 1989. It all
			started when the Imam of the Masjid, close to where he
			lived, left the job because he was not a Saudi. The
			people in the neighborhood started looking for someone
			to give the Friday Sermon. Nobody volunteered. So they
			chose the Sheikh because he was a teacher, prayed 5
			times a day and looked like a committed Muslim. He was
			hesitant because, as he said, he didn’t feel like he had
			sufficient knowledge for it. But the people said that he
			was the only one. So the Sheikh sought the Support of
			Allah, prepared the Friday Sermon and delivered it. And
			because he was a teacher, it wasn’t that scary for him.
			So he delivered the speech and led the prayer. The
			people liked it and made his position permanent. This
			ignited in him the urge to seek knowledge because every
			Friday he had to teach people something that is
			beneficial to them. He could not go unprepared. That
			meant that he had to do his research, had to study and
			prepare something that is useful and deliver it in less
			than 20 minutes.`,

            `The journey to preaching Islam in English started when
			the Sheikh presented a program in Arabic for the famous
			channel ‘Iqra’’. He did the program with Sheikh Sa’eed
			Sha’lan, one of the prominent Sheikhs of our time, who
			was also one of his own Sheikhs. A year or two into this
			and the Sheikh received a request to prepare a program
			in English for Saudi National TV, 2nd Channel. He did
			this program every week for 3 years until he completed
			it. And Alhamdulillah, it was a successful program. The
			Sheikh also did a few programs for Al-Majd back when it
			had an English channel (this channel was aired only for
			one year after which it didn’t continue). And since
			then, as the Sheikh puts it, people have been very
			generous and have thought good of him and have been
			inviting him to do various programs every now and then.`,

            `While talking about his daily schedule, the Sheikh says
			that he does not feel that he really dedicates a lot of
			his time for Da’wah. However, he believes that every
			Muslim’s life should be devoted for Da’wah. Even when we
			are with our family it could be Da’wah; even when we are
			at work, it could be Da’wah. The Sheikh has a daytime
			job as the General Manager of Human Resources, Public
			Relations and Legal Affairs in a company that deals with
			earth-moving and rock-cutting. This is a specialized and
			a very reputable company in Jeddah, growing rapidly and
			the employees are all professionals. The Sheikh works
			between 8-9 hours a day. He also goes to the gym for an
			hour and a half about 4 days a week. The Sheikh admits
			that he used to be fitter than this because he used to
			play 7 days a week for 2-3 hours each day. He used to
			play professional squash and has taken part in two
			tournaments in squash in the Western Province. He also
			played professional table tennis and badminton.`,

            `Continuing his daily routine, he says that after gym, he
			hits the showers, has his meal after returning home and
			prepares, between Maghrib and ‘Isha, for his class that
			he gives in the Masjid after ‘Isha prayer. In his
			classes, the Sheikh has given lectures on different
			books, the current one being Sahih al-Bukhari, which he
			explains in Arabic. After that, he goes back home and
			sits and spends time with his kids and his wives. When
			being commented on his schedule, that it seems quite
			busy, the Sheikh says that he feels that it’s not busy
			because he is still not doing enough. He wishes that he
			can spend more time with his kids and with his mother.
			He wishes that he could do other things that he wants to
			and admits that he doesn’t even spend time with friends.
			He says that he spends around 95% of his time with his
			wives and kids. He feels that this is his safe haven and
			that this is where he finds himself. Even so, he says
			that they still demand more and more. An example of this
			is when many brothers and sisters in distress frequently
			call the Sheikh, asking questions and seeking advice,
			and the time this takes adds up to a total of 2-3 hours
			a day. So whenever the phone rings, one of his daughters
			sometimes starts making faces at him, saying, “Turn it
			off! Turn it off! We want to sit with you.” And whenever
			he opens his laptop to answer ‘Ask Huda’s’ questions and
			e-mails, she says, “Again? Come on, give us time.” But
			in the end, it is something that we all have to learn to
			balance.`,

            `The Sheikh is a frequent traveler, and has done some
			Da’wah work in places such as India and the UK. He is
			asked about what the experience was like, and about his
			feelings when he reflects back and thinks about how he
			was being prepared by Allah to travel to these places
			and engage in Da’wah work there later in his life,
			without having realized it at the time that he was
			getting ready for such great work. The Sheikh comments
			that he can say in confidence that not one single day
			passes without him realizing the blessings of Allah on
			him. He says that he always attributes whatever success
			he has in his life to Allah the Almighty, Who prepared
			him and blessed him with the knowledge and with what
			people attribute to him as wisdom, even though the
			Sheikh doesn’t see it as wisdom. He enjoys what he is.
			He doesn’t have any regrets. It is, as he says, the
			Grace of Allah ‘azza wa jall upon him. Coming back to
			his experience of his Da’wah work in India, he says that
			it was overwhelming and mind-blowing. He was invited by
			Dr. Zakir Naik in December 2007 to participate in the
			Peace Conference. There, the Sheikh got to meet several
			scholars and stay with them for about 10 days, which he
			says was the experience of his life. Being there with
			Sheikh Jafir Idrees was an experience in and of itself.
			Add to that ‘Abdur-Raheem Green, Abu Ameenah Bilal
			Philips, Hussein Ye, Salim al-‘Amry, Yasir Fazaga, Yusuf
			Estes (who was staying in a different hotel), and many
			others. Just being with these great Scholars and
			Da’eeah, having lunch and dinner with them, and seeing
			how small he was, compared to these mountains, was a
			mind-blowing experience, which he says he enjoyed fully.
			The Sheikh also travels regularly to the UK. He says
			that the brothers there are very generous and that they
			keep on calling him to give them lectures and lessons.
			He says that he really sees Islam there. He sees people
			in the midst of all this Kufr holding fast to their
			Deen, always smiling, not violent but tolerant and they
			love ‘love’ for everyone. This is also a great
			experience for him.`,

            `The Sheikh is asked about what he thinks about the role
			of the media, that he has been part of for quite a
			while, in Da’wah. Does he think that this is something
			that the preachers should look forward to and that it is
			the ‘real Da’wah’? He responds by saying that he doesn’t
			think that it is the ‘real Da’wah’ but it is a big
			portion of it. He gives an example of how he could spend
			the time that he is now spending in front of the
			cameras, in the masjid, preaching to a 100 or 200
			people. Through the programs on TV, he could preach to
			not less than 200-300 thousand people, listening to what
			he has to say. So the impact and the end result is far
			greater than doing it in the masjid. Through videos and
			programs we get quantity, to which we can add, with the
			Grace of Allah, some quality. But in the masjid we get
			quality, where we focus on certain individuals. And the
			Sheikh believes that it is the Muslim’s obligation to
			support such media channels. If any Muslim wants great
			reward, he can support such authentic Islamic channels
			and programs, by sponsoring an episode or several
			episodes, or sponsoring a program for a year and so on.
			He believes that there are many businessmen and
			enthusiasts who have the money and are willing to use it
			in this cause. He encourages such people to come forward
			and approach the Management Teams of such channels,
			which is easily possible through the social media such
			as e-mail. By doing this, they can be part of the reward
			in sha Allah.`,

            `When asked to mention one blessing that he thinks was
			very special in all the years of spreading the message
			of Islam, he says that he cannot count the numerous
			Blessings of Allah ‘azza wa jall upon him. However, one
			of the greatest blessings for him is when he talks on
			the phone for 40-50 minutes to a sister in distress, who
			cries, weeps and complains about her husband and he
			reconciles between them, and the sister later sends him
			a message saying, “JazakAllahu khairan, things are okay
			now by the Grace of Allah and, after that, because of
			you.`,
        ],
        imageSrc: '/img/about/about-img.jpg',
        socials: {
            facebook: 'https://www.facebook.com/SheikhAssimAlhakeemTeam/',
            youtube: 'https://www.youtube.com/user/assimalhakeem',
            email: 'asimalhakeem@gmail.com',
        }
    };

    return (
        <>
            <Meta
                title="About"
                description="Sheikh Assim bin Luqman al-Hakeem was born in 1962 in the city of Al-Khobar, which lies in the east of the Kingdom of Saudi Arabia. He was raised there until the age of 12 before he and his family moved to the Western Province of Saudi Arabia"
                url={`${server}/about`}
                image={`${server}/img/id/default_share.jpeg`}
                type="website"
            />

            <Header2
                playlists={playlists}
                lectures={headerLectures}
                qna_categories={qna_categories}
            />

            <section className="min-h-screen py-6 lg:py-12 mx-4 bg-gray-100">
                <div className="max-w-[1250px] mx-auto">
                    <div className="bg-white shadow-xl rounded-lg overflow-hidden">
                        <div className="md:flex">
                            <div className="md:flex-shrink-0">
							<div className="md:flex-shrink-0 w-full md:w-48 md:h-48">
								<Image
									src={profile.imageSrc}
									alt={`Profile picture of ${profile.name}`}
									width={300} // Set to the intended larger width
									height={300} // Set to the intended larger height
									className="w-full h-full object-cover rounded-br-lg" // Ensure full container size on small screens
								/>
							</div>

                            </div>
                            <div className="p-8">
                                <h1 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                                    {profile.name}
                                </h1>
                                <div className="mt-4 flex space-x-4">
                                    <a 
                                        href={profile.socials.facebook} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        aria-label="Facebook profile"
                                        className="text-blue-600 hover:text-blue-800"
                                    >
                                        <Facebook className="w-8 h-8" />
                                    </a>
                                    <a 
                                        href={profile.socials.youtube} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        aria-label="YouTube channel"
                                        className="text-red-600 hover:text-red-800"
                                    >
                                        <Youtube className="w-8 h-8" />
                                    </a>
                                    <a 
                                        href={profile.socials.email} 
                                        aria-label="Email John Doe"
                                        className="text-gray-600 hover:text-gray-800"
                                    >
                                        <Mail className="w-8 h-8" />
                                    </a>
                                </div>
                            </div>
                        </div>
                        
                        <div className="px-8 py-8">
                            <h2 className="text-[26px] text-[#4a5568] font-bold mb-4">Introduction</h2>
                            <div className="space-y-4">
                                {profile.about.map((para, index) => (
                                    <p style={{ fontFamily: "'Inter', Arial, sans-serif" }} className="text-[1rem] text-[#4a5568 !important] mb-4" key={index}>{para}</p>
                                ))}
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
    const headerLectures = await getHeaderLectures();
    const qna_categories = await getAllQnaCategory();

    return {
        props: {
            playlists: playlists.playlists,
            headerLectures,
            qna_categories,
        },
    };
}
