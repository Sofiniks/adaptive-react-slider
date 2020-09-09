import React from "react";

const ArrowNext = () => {
  return (
    <svg
      data-testid="arrow-next"
      role="img"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      width='60'
      height='60'
      viewBox="0 0 80 80"
      aria-labelledby="nextChevronId nextChevronDescId"
    >
      <title id="nextChevronId">Next Item</title>
      <desc id="nextChevronDescId">
        An arrow to go to the next item in the carousel
      </desc>
      <path
        fill='#000000'
        d="M36.652 18.064c1.672 1.632 18.008 18.78 18.008 18.78 0.892 0.876 1.34 2.016 1.34 3.156s-0.448 2.28-1.34 3.148c0 0-16.336 17.156-18.008 18.78-1.672 1.632-4.68 1.744-6.46 0-1.784-1.736-1.924-4.164 0-6.296l14.988-15.632-14.988-15.632c-1.924-2.132-1.784-4.564 0-6.304 1.78-1.744 4.788-1.636 6.46 0z"
      />
    </svg>
  );
};

export default ArrowNext;