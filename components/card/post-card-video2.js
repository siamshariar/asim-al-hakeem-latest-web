import Image from 'next/image';
import { date } from '../../lib/format';

export default function PostCardVideo2({ item, statistics, onClick }) {
    const id = item.id;
    const image = item.image;
    const title = item.title;
    const publishedAt = date(item.date);
    const viewCount = statistics ? statistics[id] : '';

    return (
        <div className="card card-r pc-video" onClick={() => onClick(id, title)}>
            <div className="card-image">
                <div className="image-r">
                <Image
                    src={image ? `https://i.ytimg.com/vi/${id}/mqdefault.jpg` : `/img/post/youtube-default.jpg`}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    style={{
                        objectFit: 'cover',
                        objectPosition: 'center center',
                    }}
                    loading="eager"
                />


                </div>
            </div>

            <div className="card-content">
                <div className="heading-r">{title}</div>
                <div className="data-line">
                    <span className="view-r">{viewCount} views</span>
                    <span className="date-r">{publishedAt}</span>
                </div>
            </div>
        </div>
    );
}
