import Image from "next/image";

const QuoteCard = ({
  quote: {
    image = "", //
    text = "",
    author = "",
  },
} = {}) => {
  return (
    <div className="qc-1">
      <div className="qc-1_image">
        <Image
          src={image}
          alt=""
          layout="fill"
          objectFit="cover"
          objectPosition="center center"
          loading="eager" unoptimized
        />
      </div>

      <div className="qc-1_layer">
        <h2>
          <q>{text}</q>
        </h2>
        <span>{author}</span>
      </div>
    </div>
  );
};

export default QuoteCard;
