import React, { useReducer } from "react";
import {
  defaultIndicatorOptions,
  defaultControlsOptions,
} from "./defaultOptions";

const SliderContext = React.createContext();

const SliderProvider = ({
  children,
  childCount = 0,
  contentCoversContainer = true,
  itemFit = "cover",
  indicatorOptions,
  controlsOptions,
  slideTransitionValue = 0.3,
  currentSlideTransition = slideTransitionValue,
}) => {
  const [state, dispatch] = useReducer(
    (state, { type, payload }) => {
      switch (type) {
        case "updateActiveItem": {
          return {
            ...state,
            activeItem: payload,
          };
        }
        case "setSliderWidth": {
          return {
            ...state,
            sliderWidth: payload,
          };
        }
        case "setToSpecificItem": {
          return {
            ...state,
            activeItem: payload,
            translateValue: state.activeItem * state.sliderWidth,
          };
        }
        case "setTranslateValue": {
          return { ...state, translateValue: payload };
        }

        case "setNextSlide": {
          return {
            ...state,
            translateValue: state.translateValue + state.sliderWidth,
            activeItem:
              state.activeItem === childCount - 1 ? 0 : state.activeItem + 1,
          };
        }
        case "setPrevSlide": {
          return {
            ...state,
            translateValue: state.translateValue - state.sliderWidth,
            activeItem:
              state.activeItem === 0 ? childCount - 1 : state.activeItem - 1,
          };
        }
        case "handleWindowResize": {
          return {
            ...state,
            ...payload,
          };
        }
        case "setActiveSlidesArray": {
          return {
            ...state,
            activeSlides: payload,
          };
        }
        case "setCurrentSlideTransitionValue": {
          return {
            ...state,
            currentSlideTransition: payload,
          };
        }
        case "triggerSlideTransition": {
          return {
            ...state,
            ...payload,
          };
        }
        default: {
          return { ...state };
        }
      }
    },
    {
      childCount,
      activeItem: 0,
      translateValue: 0,
      sliderWidth: 0,
      itemFit,
      contentCoversContainer,
      indicatorOptions: {
        ...defaultIndicatorOptions,
        ...indicatorOptions,
      },
      controlsOptions: {
        ...defaultControlsOptions,
        ...controlsOptions,
      },
      activeSlides: [],
      slideTransitionValue,
      currentSlideTransition,
    }
  );

  return (
    <SliderContext.Provider value={{ state, dispatch }}>
      {children}
    </SliderContext.Provider>
  );
};

export { SliderContext, SliderProvider };
