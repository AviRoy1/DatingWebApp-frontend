import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ReviewCard from "../Cards/ReviewCard";
import img1 from "../../assets/image1.jpg";

const CustomCaraousel = (props) => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  return (
    <Carousel
      responsive={responsive}
      infinite={true}
      draggable={false}
      autoPlay={true}
      autoPlaySpeed={3000}
    >
      <ReviewCard
        image={img1}
        name={props.data.name}
        review={props.data.review}
      />
      <ReviewCard
        image={img1}
        name={props.data.name}
        review={props.data.review}
      />
      <ReviewCard
        image={img1}
        name={props.data.name}
        review={props.data.review}
      />
    </Carousel>
  );
};

export default CustomCaraousel;
