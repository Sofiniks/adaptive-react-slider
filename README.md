# Adaptive-React-Slider

A very simple slider, usable with any elements that are passed in including images. Can be configured with various options.

## Installation

Use the package your package manager of choice to install

```javascript
npm install adaptive-react-slider
```

or

```javascript
yarn add adaptive-react-slider
```

## Usage

Import the AdaptiveSlider component and add your slides as child elements inside.

```
import AdaptiveSlider from 'adaptive-react-slider';

<AdaptiveSlider>
  <img src={img1} alt="You can use images in the slider!"/>
  <div>
    <h2>Hello from heading</h2>
    <p>You can use text here too!</p>
  </div>
  <div>
    <h2>Text and Images!?</h2>
  </div>
</AdaptiveSlider>
```

## Options

There are a few configurable features that can be passed in as props to the AdaptiveSlider component. These are:

| Prop                   |  Type  | Default |
| ---------------------- | :----: | ------: |
| showIndicators         |  bool  |    true |
| contentCoversContainer |  bool  |    true |
| itemFit                | string | "cover" |
| controlsOptions        | object |         |
| indicatorOptions       | object |         |

- `showIndicators` Enable or disable the showing of the indicators at the bottom of the carousel
- `contentCoversContainer` A boolean that decides if the slides in the carousel should take up all available space
- `itemFit` A string value to be one of any value able to be passed to the CSS property `object-fit`
- `controlsOptions` An object that allows for some control over how the navigation buttons are displayed. Defaults to:
  ```javascript
   {
        show: true,
        height: '40px',
        width: '40px',
        backgroundColor: 'rgba(255,255,255,0.75)',
        color: 'black'
   }
  ```
  - `show`: A boolean to decide if the buttons should be shown or not
  - `width`: A string to set the width of the button. Using a string allows you to pass your own units e.g "10rem" or "10%", rather that "px" being hardcoded.
  - `height`: A string to set the height of the button. Using a string allows you to pass your own units e.g "10rem" or "10%", rather that "px" being hardcoded.
  - `backgroundColor`: Any valid CSS property that can be used to change an elements background-color
  - `color`: Any valid CSS property that can be used to change an elements color
- `indicatorOptions` An object that allows for some control over how the slide indicators are displayed. Defaults to:
  ```javascript
    {
        show: true,
        shape: 'circle',
        height: '10px',
        width: '10px',
        activeColor: 'rgba(0,0,0,0.75)',
        inactiveColor: 'rgba(255,255,255,0.75)',
        border: '1px solid #ccc'
    }
  ```
  - `show`: A boolean to decide if the indicators should be shown or not
  - `shape`: A string to decide what shape the indicators should appear as. Available values are "square" and "circle".
  - `height`: A string to set the height of the indicators. Using a string allows you to pass your own units e.g "10rem" or "10%", rather that "px" being hardcoded.
  - `width`: A string to set the width of the indicators. Using a string allows you to pass your own units e.g "10rem" or "10%", rather that "px" being hardcoded.
  - `activeColor`: Can be any valid CSS colour. This is used to show which slide is currently active in the indicator section.
  - `inactiveColor`: Can be any valid CSS colour. This is used to set the colour of the inactive slide indicators.
  - `border`: This can be any valid border CSS. Applies a border around each indicator.
  

