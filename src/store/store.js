import React, { useReducer } from 'react';
import {defaultIndicatorOptions, defaultControlsOptions} from './defaultOptions'

const SliderContext = React.createContext();

const SliderProvider = ({
    children,
    childCount = 0,
    contentCoversContainer = true,
    itemFit = 'cover', 
    indicatorOptions,
    controlsOptions
}) => {
    const [state, dispatch] = useReducer(
        (state, {type, payload}) => {
            switch (type) {
                case 'setSliderWidth' : {
                    return {
                        ...state,
                        sliderWidth: payload
                    }
                }
                case 'setToSpecificItem': {
                    return {
                        ...state,
                        activeItem: payload,
                        translateValue: state.activeItem * state.sliderWidth
                    }
                }
                case 'setNextSlide': {
                    return {
                        ...state,
                        translateValue: state.translateValue >= (state.sliderWidth * (state.childCount - 1)) ? 0 
                        : state.translateValue + state.sliderWidth,
                        activeItem: state.activeItem === childCount - 1 ? 0 : state.activeItem + 1
                    }
                }
                case 'setPrevSlide': {
                    return {
                        ...state,
                        translateValue: state.translateValue <= 0 ? (state.sliderWidth * (state.childCount - 1))
                        : state.translateValue - state.sliderWidth,
                        activeItem: state.activeItem === 0 ? childCount - 1 : state.activeItem - 1
                    }
                }
                case 'handleWindowResize': {
                    return {
                        ...state,
                        ...payload
                }
            }
            default: {
                    return {...state}
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
                ...indicatorOptions
            },
            controlsOptions: {
                ...defaultControlsOptions,
                ...controlsOptions
            }
        }
    )
    
    
    return (
        <SliderContext.Provider value={{state, dispatch}}>
                {children}
           </SliderContext.Provider>
    )
}

export {SliderContext, SliderProvider};

