import React, {useContext, useEffect, useState} from 'react'
import styled from 'styled-components'
import {SliderContext} from '../store/store'

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: no-wrap;
    justify-content: space-between;
    margin: auto;
    position: absolute;
    bottom: 10%;
    left: 0;
    right: 0;
`

const Indicator = styled.div`
    ${({ options }) => {
        switch(options.shape) {
            case 'square': {
                return `
                width: ${options.width};
                height: ${options.height};
                border-radius: 0;
                `;
            }
            case 'circle': {
                return `
                width: ${options.width};
                height: ${options.height};
                border-radius: 50%;
                `;
            }
            default: {
                return `
                width: ${options.width};
                height: ${options.height};
                border-radius: 50px;
                `;
            }
        }}}
    border: ${({options}) => options.border};
    background-color: ${({ active, options}) => 
    active ? options.activeColor : options.inactiveColor};
    transition: all 0.3s ease;
    cursor: pointer;
}
`

const Indicators = () => {
    const {state , dispatch} = useContext(SliderContext);
    const {childCount , activeItem, indicatorOptions} = state;
    const [wrapperWidth, setWrapperWidth] = useState(20 * childCount);


const handleClick = index => {
    dispatch({
        type: "setToSpecificItem", payload: index
    })
}

const renderIndicators = () => {
    return [...Array(childCount).fill('')].map((_, index) => (
        <Indicator
        key={`indicator-${index}`}
        active={index === activeItem}
        onClick = {() => handleClick(index)}
        options = {indicatorOptions}
        />
    ))
}

useEffect(() => {
    setWrapperWidth(20 * childCount + 5 * childCount)
},[childCount])

return (
    <Wrapper
        style={{width: `${wrapperWidth}px` || `0px`}}
    >
        {renderIndicators()}
    </Wrapper>
)
}

export default Indicators;