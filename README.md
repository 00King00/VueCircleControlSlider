# VueCircleControlSlider

[![](https://img.shields.io/badge/vue-2.x-success)](https://vuejs.org/) ![](https://img.shields.io/badge/npm-v%206.4.1-green) ![](https://img.shields.io/badge/release-v%201.0.3-blue) [![](https://img.shields.io/badge/License-MIT-orange)](http://opensource.org/licenses/MIT)

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
| size             | Number        | 200      | set svg width & heigth |
| dial             | Boolean       | false    | show value inside circle center |
| dialTextColor    | String        | `black`  | set color of dial value inside circle center |
| dialFontSize     | Number        | 50       | set font-size of dial
| sign             | String        | `""`     | add sign to the end value row inside circle center for exampe it's `"%"` add persent sign |
| min              | Number        | 0        | set the minimum value |
| max              | Number        | 100      | set the maximum value |
| startAngleOffset | Number        | 90       | set angle offset |
| offKnob          | Boolean       | false    | remove circle knob |
| offKnobNumber    | Boolean       | false    | remove value in circle knob |
| knobColor        | String        | `white`  | set knob color |
| knobTextColor    | String        | `black`  | set knob text color |
| knobBorderColor  | String        | `#2196F3`| knob border color just sets the same color as progressColor |
| knobBorderWith   | Number        | 3        | set knob border with in px |
| knobRadius       | Number        | 18       | set knob radius in px |
| progressWidth    | Number        | 8        | set width of circle progress |
| progressColor    | Number        | `#2196F3`| set color of circle progress curve |
| circleWidth      | Number        | 6        | set width of circle |
| circleColor      | String        | `#9E9E9E`| set border color of circle |
| stepSize         | Number        | 1        | set the gap between the values |
| disabled         | Boolean       | false    | desabled events |


### Slots

There is no any slots available


## Demo

- [Git sources](https://github.com/00King00/VueCircleControlSlider)

## License

[MIT](http://opensource.org/licenses/MIT)