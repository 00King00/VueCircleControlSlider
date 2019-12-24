# VueCircleControlSlider

[![](https://img.shields.io/badge/vue-2.x-success)](https://vuejs.org/) ![](https://img.shields.io/badge/npm-v%206.4.1-green) ![](https://img.shields.io/badge/release-v%201.0.6-blue) [![](https://img.shields.io/badge/License-MIT-orange)](http://opensource.org/licenses/MIT) [![](https://img.shields.io/badge/author-page-orange)](https://mr-bilous.firebaseapp.com/)

It is Circle Control Slider component for Vue.js based on SVG view.

## Table of contents

- [Installation](#installation)
- [Usage](#usage)
- [Demo](#demo)

## Installation
```
npm install --save vue-circle-control-slider
```
## Usage
### adding into main.js (global registration)
```javascript
import Vue from 'vue'
import VueCircleControlSlider from 'vue-circle-control-slider'
import 'vue-circle-control-slider/dist/VueCircleControlSlider.css'
Vue.component('VueCircleControlSlider', VueCircleControlSlider); //global registration
```
### or adding into your vue component (local registration)
```html
<script>
import VueCircleControlSlider from 'vue-circle-control-slider'
export default{
    //*...some code...*//
    components: {
        //*...other components...*//
        VueCircleControlSlider //local registration in your component
    }
}
</script>
```
## Functionality
- svg based view
- 2 way binding data value 
- defining min & max values
- defining step size
- animation while updating to new value on click by circle
- touch devices support (`touchmove`)
- available disabled events
- sizes customization: exact and relative definitions
- colors customization

## Examples

When you have been register component with name `VueCircleControlSlider` so you can just use it right away:

```html
...
<vue-circle-control-slider :value="pushSomeValue"/>
<vue-circle-control-slider @value="receiveSomeValue"/>
...
```
or customize some properties:
```html
...
<vue-circle-control-slider
  :size="300"
  :min="0"
  :max="100"
  circleColor="black"
  progressColor="red"
  :knobRadius="20"
  :progressWidth="10"
  dial
  sign="%"
  dialTextColor="red"
/>
...
```

## Interface
### Props

| Props            | Type          | Default  | Description  |
| ---------------- |:--------------| ---------|--------------|
| value            | Number        | 0        | init start value |
| size             | Number        | 200      | sets svg width & heigth |
| dial             | Boolean       | false    | show value inside circle center |
| dialTextColor    | String        | `black`  | sets color of dial value inside circle center |
| dialFontSize     | Number        | 50       | sets font-size of dial
| sign             | String        | `""`     | add sign to the end value row inside circle center for exampe it's `"%"` add persent sign |
| min              | Number        | 0        | sets the minimum value |
| max              | Number        | 100      | sets the maximum value |
| startAngleOffset | Number        | 90       | sets angle offset |
| offKnob          | Boolean       | false    | remove circle knob |
| offKnobNumber    | Boolean       | false    | remove value in circle knob |
| knobColor        | String        | `white`  | sets knob color (unless explicitly stated, the props is the same as progressColor ) |
| knobTextColor    | String        | `black`  | sets knob text color |
| knobBorderColor  | String        | `#2196F3`| knob border color (unless explicitly stated, the props is the same as progressColor ) |
| knobBorderWidth  | Number        | 3        | sets knob border with in px |
| knobRadius       | Number        | 18       | sets knob radius in px |
| progressWidth    | Number        | 8        | sets width of circle progress in px |
| progressColor    | String        | `#2196F3`| sets color of circle progress curve |
| circleWidth      | Number        | 6        | sets width of circle border in px |
| circleColor      | String        | `#9E9E9E`| sets border color of circle |
| stepSize         | Number        | 1        | sets the gap between the values |
| ms               | Number        | 500      | sets the duration of the animation |
| disabled         | Boolean       | false    | desabled events |


### Slots
There is no any slots available
## Demo
- [Live Demo](https://vue-circle-control-slider.firebaseapp.com)
- [Git sources](https://github.com/00King00/VueCircleControlSlider)

## License

[MIT](http://opensource.org/licenses/MIT)
