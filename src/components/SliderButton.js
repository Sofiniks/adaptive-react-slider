import React, { useContext } from "react";
import styled from "styled-components";
import Arrow from "./SVG/Arrow";
import { SliderContext } from "../store/store";

const Button = styled.button`
    position: absolute;
    ${(props) => (props.previous ? "left: 10px" : "right: 10px")};
    ${(props) =>
      props.previous ? "transform: rotate(0deg)" : "transform: rotate(180deg)"};
    z-index: 3;
    top: 50%;
    width: ${({ options }) => options.width};
    height: ${({ options }) => options.height}};
    border: none; 
    background-color: ${({ options }) => options.backgroundColor}};
    color: ${({ options }) => options.color}};
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`;

const SliderButton = ({ previous }) => {
  const { state, dispatch } = useContext(SliderContext);
  const { controlsOptions } = state;

  const handleNext = () => {
    dispatch({
      type: "setNextSlide",
    });
  };

  const handlePrev = () => {
    dispatch({
      type: "setPrevSlide",
    });
  };

  const handleClick = () => {
    if (previous) {
      handlePrev();
      return;
    }
    handleNext();
  };

  return (
    <Button previous={previous} onClick={handleClick} options={controlsOptions}>
      {previous ? <Arrow /> : <Arrow transform='rotate(180deg)' />}
    </Button>
  );
};

export default SliderButton;
