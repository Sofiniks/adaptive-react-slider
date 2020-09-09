import React, { useContext, useEffect} from 'react'
import styled from 'styled-components'
import SliderItem from './SliderItem'
import SliderButton from './SliderButton'
import {SliderContext} from '../store/store'
import useWindowSize from '../hooks/useWindowSize'
import Indicators from './Indicators'


const Wrapper = styled.div`
        width: 100%;
        overflow: hidden;
        position: relative;
        height: 100vh;
        max-height: 100%;
    `

    const SliderWrapper = styled.ul`
        width: 100%;
        display: flex;
        flex-wrap: no-wrap;
        position: relative;
        overflow: hidden;
        width: ${props => props.width}px;
        height:${props => props.height}px;
        padding: 0;
        margin: 0;
        list-style: none;
        justify-content: center;
        align-items: center;
        text-align: center;
        transform: translate(-${props => props.translateValue}px, 0);
    `
const Slider = ({children}) => {

    const {state, dispatch} = useContext(SliderContext);
    const {
        childCount,
        translateValue,
        activeItem,
        indicatorOptions,
        controlsOptions
    } = state;

    const [windowWidth, windowHeight] = useWindowSize();
  
    useEffect(() => {
        dispatch({
            type: 'setSliderWidth',
            payload: windowWidth
        })
    },[windowWidth, dispatch])


    useEffect(() => {
        dispatch({
            type: 'handleWindowResize',
            payload: { translateValue: activeItem * windowWidth }
        })
    }, [windowWidth, activeItem,  dispatch])

    console.log(windowWidth);

    
    
    let slidesArray = children.map((item, index) => {
        return (
            <SliderItem key={index} index={index}>
                {item}
            </SliderItem>
        )
    })
    const handleTouch = () => {
        dispatch({
            type: 'setNextSlide'
        })
    }
    return (
        
        <Wrapper>
            {controlsOptions.show && <SliderButton previous/>}
           <SliderWrapper 
           width = {windowWidth * childCount}
           height = {windowHeight}
           translateValue={translateValue}
           onTouchEnd={handleTouch}
           >
                {slidesArray}
            </SliderWrapper> 
            {controlsOptions.show && <SliderButton/>}
            {indicatorOptions.show && <Indicators/>}
        </Wrapper>
        
    )
}
export default Slider;