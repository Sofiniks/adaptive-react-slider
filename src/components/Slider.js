import React, { useCallback, useContext, useEffect, useRef, useState} from 'react'
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
        translateValue,
        activeItem,
        indicatorOptions,
        controlsOptions,
        activeSlides
    } = state;
    

    const [windowWidth, windowHeight] = useWindowSize();
    const wrapperRef = useRef(null);
    const transitionRef = useRef(null);
    const [wrapperWidth, setWrapperWidth] = useState(0);
    const [wrapperHeight, setWrapperHeight] = useState(0);
    const [swipeOptions, setSwipeOptions] = useState( 
        {dragging: false,
        touchObject: {
            startX: 0,
            startY: 0,
            endX: 0, 
            endY: 0, 
            length: 0,
            direction: -1
    }})


    useEffect(() => {
        setWrapperWidth(wrapperRef.current.getBoundingClientRect().width)
        setWrapperHeight(wrapperRef.current.getBoundingClientRect().height)
    }, [])
  
    useEffect(() => {
        const {width} = wrapperRef.current.getBoundingClientRect();
        dispatch({
            type: 'setSliderWidth',
            payload: width
        })
    },[wrapperRef, dispatch])


    useEffect(() => {
        dispatch({
            type: 'handleWindowResize',
            payload: { translateValue: activeItem * wrapperRef.current.getBoundingClientRect().width }
        })
    }, [wrapperRef, activeItem,  dispatch, windowHeight, windowWidth])


    const setActiveSlides = useCallback(() => {
        if(Array.isArray(children)) {
            dispatch({
                type: 'setActiveSlidesArray',
                payload: children.slice(children.slice(0, activeItem + 3))
            });
            return
        }

        dispatch({
            type: 'setActiveSlidesArray',
            payload: [children]
        })
    }, [children, activeItem, dispatch])

    useEffect(() => {
        if(!children) {
          return  
        }
        setActiveSlides();
    }, [children, setActiveSlides])


   
    const slideTransition = () => {
        let newActiveSlides = []
        
        if(activeItem === children.length - 1){
            newActiveSlides = [
                children[children.length - 2],
                children[children.length - 1],
                children[0]
            ]
        }else if(activeItem === 0) {
            newActiveSlides = [
                children[children.length - 1],
                children[0],
                children[1]
            ]
        }else {
            newActiveSlides = children.slice(activeItem - 1, activeItem + 2);
        }

        dispatch({
            type: "triggerSlideTransition",
            payload: {
                activeSlides: newActiveSlides,
                translateValue: wrapperRef.current.getBoundingClientRect().width,
            }
        })
    }

    
    useEffect(() => {
        transitionRef.current = slideTransition; 
    })

    useEffect(() => {
        const fireTransition = () => {
            transitionRef.current();
           
        }
        const transitionEnd = window.addEventListener('transitionend', fireTransition);
    
        return () => {
            window.removeEventListener('transitionend', transitionEnd)
        }
    }, [])

    

   const getSwipeDirection = (x1,x2,y1,y2) => {
       const xDist = x1 - x2;
       const yDist = y1 - y2;

       let swipeAngle = Math.round((Math.atan2(yDist, xDist) * 180) / Math.PI)

       if(swipeAngle < 0) {
           swipeAngle = 360 - Math.abs(swipeAngle)
       }
       if(swipeAngle <= 45 && swipeAngle >=0) {
        return 1;
        }

        if(swipeAngle <= 360 && swipeAngle >= 315) {
        return 1;
    }
    if(swipeAngle >= 135 && swipeAngle <= 225) {
        return -1;
    }
    return 0;
   }

   const onSwipeStart = e => {
       const startX = e.touches !== undefined ? e.touches[0].pageX : e.clientX;
       const startY = e.touches !== undefined ? e.touches[0].pageY : e.clientY;

       setSwipeOptions({
           dragging: true,
           touchObject: {
               startX,
               startY
           }
       })
       return true;
   }

   const onSwipeMove = e => {
    const curX = e.touches !== undefined ? e.touches[0].pageX : e.clientX;
    const curY = e.touches !== undefined ? e.touches[0].pageY : e.clientY;
    const {touchObject} = swipeOptions;
    const direction = getSwipeDirection(touchObject.startX, curX, touchObject.startY, curY);

    if(direction !== 0) {
        e.preventDefault();
    }

    const swipeLength = Math.round(Math.sqrt((curX - touchObject.startX) ** 2))

    setSwipeOptions({
        dragging: true,
        touchObject: {
            startX: touchObject.startX,
            startY: touchObject.startY,
            endX: curX,
            endY: curY,
            length: swipeLength,
            direction
        }
    })
}

const onSwipeEnd = () => {
    const {touchObject} = swipeOptions;
    if(touchObject.direction === 1) {
        dispatch({
            type: 'setNextSlide'
        })
    }else {
        dispatch({
            type: 'setPrevSlide'
        })
    }
    setSwipeOptions({
        dragging: false,
        touchObject: {
            startX: 0,
            startY: 0,
            endX: 0,
            endY: 0,
            length: 0,
            direction: -1
        }
    })
}


    
    let slidesArray = activeSlides.map((item, index) => {
        return (
            <SliderItem key={index} index={index}>
                {item}
            </SliderItem>
        )
    })
    if(!children) {
        return (
            <Wrapper ref={wrapperRef}>
                <SliderWrapper
                width='100%'
                >
                <h2>You need to pass some slider elements</h2>
                </SliderWrapper>
            </Wrapper>
        )
    }
 
    return (
        
        <Wrapper ref={wrapperRef}>
            {controlsOptions.show && <SliderButton previous/>}
           <SliderWrapper 
           width = {wrapperWidth * activeSlides.length}
           height = {wrapperHeight}
           translateValue={translateValue}
            onTouchStart={onSwipeStart}
            onTouchMove={onSwipeMove}
            onTouchEnd={onSwipeEnd}
           >
                {slidesArray}
            </SliderWrapper> 
            {controlsOptions.show && <SliderButton/>}
            {indicatorOptions.show && <Indicators/>}
        </Wrapper>
        
    )
}
export default Slider;