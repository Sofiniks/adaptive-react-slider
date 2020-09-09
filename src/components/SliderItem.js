import React, { useContext } from 'react'
import styled from 'styled-components'
import {SliderContext} from '../store/store'

const Item = styled.li`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    `
const ChildWrapper = styled.div`
    position: relative;
    display: inherit;
    max-width: 100%;
    height: 100%;
    align-items: center;
    flex: ${({coverContainer}) => (coverContainer ? '1' : 'unset')};

    > *:first-child {
        display: flex;
        justify-content: center;
        align-items: center;
        max-width: 100%;
        width: ${({width}) => `${width}px`};
        flex: ${({coverContainer}) => (coverContainer ? '1' : 'unset')};
        object-fit: ${({coverContainer, itemFit}) => coverContainer ? itemFit : 'unset'};

    }
`

const SliderItem = ({children, index}) => {
    
    const context = useContext(SliderContext);
    const { state } = context;
    const {
        contentCoversContainer,
        itemFit,
        sliderWidth
    } = state;

    return (
        <Item
        active={index}
        >
            <ChildWrapper
            coverContainer={contentCoversContainer}
            itemFit={itemFit}
            width={sliderWidth}
            >
               {children} 
            </ChildWrapper>
        </Item>
    )
}

export default SliderItem;
