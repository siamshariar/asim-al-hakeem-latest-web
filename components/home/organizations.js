import Slider from "react-slick";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import PostCardArticle2 from "../card/post-card-article2";
import PostCardOrganization from "../card/post-card-organization";

export default function HomeOrganizations({ organizations }) {
  const settings = {
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: true,
    prevArrow: <Prev />,
    nextArrow: <Next />,
    dots: false,
    draggable: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    speed: 500,
    infinite: true,
    cssEase: "ease",
    centerMode: true,
    mobileFirst: false,
    centerPadding: "0px",
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          centerPadding: "130px",
          arrows: false,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
          centerPadding: "87px",
          arrows: false,
        },
      },
      {
        breakpoint: 420,
        settings: {
          slidesToShow: 1,
          centerPadding: "47px",
          arrows: false,
        },
      },
    ],
  };

  return (
    <section className="h-sec">
      <div className="page-width">
        <div className="box">
          <h1 className="title-r title-center">
            <span>অর্গানাইজেশনস</span>
          </h1>

          <div className="row row-r">
            {
                organizations && organizations.length && organizations.map(organization =>
                    <div className="col col-r s12 xl4" key={organization.id}>
                      <PostCardOrganization organization={organization} />
                    </div>
                )
            }
          </div>

          {/*<div className="recent-slider-outer">*/}
          {/*  <div className="recent-slider-inner">*/}
          {/*    <Slider className="recent-slider" {...settings}>*/}
          {/*      {organizations &&*/}
          {/*        organizations.map((organization, i) => (*/}
          {/*          <PostCardOrganization key={i} organization={organization} />*/}
          {/*        ))}*/}
          {/*    </Slider>*/}
          {/*  </div>*/}
          {/*</div>*/}


        </div>
      </div>
    </section>
  );
}

const Prev = (props) => {
  return (
    <span className="recent-prev" onClick={props.onClick}>
      <KeyboardArrowLeftIcon />
    </span>
  );
};

const Next = (props) => {
  return (
    <span className="recent-next" onClick={props.onClick}>
      <KeyboardArrowRightIcon />
    </span>
  );
};
