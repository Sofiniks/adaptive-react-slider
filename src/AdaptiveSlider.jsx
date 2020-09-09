import React from 'react';
import Slider from './components/Slider'
import {SliderProvider} from './store/store'


const AdaptiveSlider = ({
  children,
  contentCoversContainer,
  itemFit,
  indicatorOptions,
  controlsOptions
}) => {
  return (
    <SliderProvider
    childCount={children ? children.length : 0}
    contentCoversContainer={contentCoversContainer}
    itemFit={itemFit}
    indicatorOptions={indicatorOptions}
    controlsOptions={controlsOptions}
    >
    <Slider>
      {children}
    </Slider>
</SliderProvider>
  );
}

export default AdaptiveSlider;
