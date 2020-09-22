import React from "react";

const Arrow = () => {
  return (
    <svg
      data-testid="arrow-prev"
      role="img"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      width='40'
      height='40'
      viewBox="0 0 80 80"
      aria-labelledby="previousChevronId previousChevronDescId"
     
    >
      <title id="previousChevronId">Previous Item</title>
      <desc id="previousChevronDescId">
        An arrow to go to the previous item in the carousel
      </desc>
      <path
        fill='#000000'
        d="M49.808 18.064c1.784 1.744 1.924 4.172 0 6.304l-14.988 15.632 14.988 15.632c1.924 2.132 1.784 4.564 0 6.296-1.78 1.744-4.788 1.632-6.46 0-1.672-1.624-18.008-18.78-18.008-18.78-0.892-0.868-1.34-2.008-1.34-3.148s0.448-2.28 1.34-3.156c0 0 16.336-17.148 18.008-18.78 1.672-1.636 4.68-1.744 6.46 0z"
      />
    </svg>
  );
};

export default Arrow;