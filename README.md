# VueCircleControlSlider

[![NPM Version](https://img.shields.io/npm/v/vue-circle-control-slider.svg)](https://www.npmjs.com/package/vue-circle-control-slider)
[![NPM Downloads](https://img.shields.io/npm/dm/vue-circle-control-slider.svg)](https://www.npmjs.com/package/vue-circle-control-slider)
[![Vue 2.x](https://img.shields.io/badge/vue-2.x-success)](https://vuejs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-orange.svg)](http://opensource.org/licenses/MIT)
[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://vue-circle-control-slider.firebaseapp.com/)

Circle Control Slider component for Vue.js based on SVG.

🎮 **[Try the Live Demo →](https://vue-circle-control-slider.firebaseapp.com/)**

> **Note:** This package targets **Vue 2.x** (tested on Vue 2.7). Vue 3 support is planned for a future major release.

## Table of contents

- [Installation](#installation)
- [Usage](#usage)
- [Props](#props)
- [Events](#events)
- [Slots](#slots)
- [Examples](#examples)
- [Demo](#demo)

## Installation

```bash
npm install --save vue-circle-control-slider
```

## Usage

### Global registration (main.js)

```javascript
import Vue from 'vue';
import VueCircleControlSlider from 'vue-circle-control-slider';
import 'vue-circle-control-slider/dist/VueCircleControlSlider.css';

Vue.component('VueCircleControlSlider', VueCircleControlSlider);
```

### Local registration (inside component)

```html
<script>
import VueCircleControlSlider from 'vue-circle-control-slider';
import 'vue-circle-control-slider/dist/VueCircleControlSlider.css';

export default {
    components: {
        VueCircleControlSlider,
    },
};
</script>
```

## Features

- SVG-based rendering (scales perfectly, no canvas)
- Two-way binding via `v-model` (emits `input` event)
- Configurable `min`, `max`, `stepSize`
- Smooth animation on click (with `requestAnimationFrame`)
- Touch device support (`touchmove`)
- Disabled state
- Full size and color customization
- Default slot for custom center content (icons, labels, progress text)

## Props

| Prop             | Type    | Default     | Description                                                                               |
| ---------------- | ------- | ----------- | ----------------------------------------------------------------------------------------- |
| `value`          | Number  | `0`         | Current value (use with `v-model` or `:value` + `@input`)                                 |
| `size`           | Number  | `200`       | SVG width & height in px                                                                  |
| `min`            | Number  | `0`         | Minimum value                                                                             |
| `max`            | Number  | `100`       | Maximum value                                                                             |
| `stepSize`       | Number  | `1`         | Gap between discrete values                                                               |
| `ms`             | Number  | `500`       | Click-animation duration in ms                                                            |
| `startAngleOffset` | Number | `90`       | Angle offset in degrees (where `0` starts on the circle)                                  |
| `disabled`       | Boolean | `false`    | Disable click / touch / mouse interactions                                                |
| `dial`           | Boolean | `false`    | Show current value in the center of the circle                                            |
| `dialTextColor`  | String  | `'black'`  | Color of dial text                                                                        |
| `dialFontSize`   | Number  | `50`       | Font-size of dial text                                                                    |
| `sign`           | String  | `''`       | Suffix appended to dial value (e.g. `'%'`)                                                |
| `circleColor`    | String  | `'#9E9E9E'` | Color of the background circle                                                            |
| `circleWidth`    | Number  | `6`        | Stroke width of the background circle                                                     |
| `progressColor`  | String  | `'#2196F3'` | Color of the progress arc                                                                 |
| `progressWidth` | Number   | `8`        | Stroke width of the progress arc                                                          |
| `offKnob`        | Boolean | `false`    | Hide the knob entirely                                                                    |
| `offKnobNumber`  | Boolean | `false`    | Hide the number inside the knob                                                           |
| `knobColor`      | String  | `'white'`  | Knob fill color (auto switches to `progressColor` when `offKnobNumber=true` and default)  |
| `knobBorderColor` | String | `'#2196F3'` | Knob border color (defaults to `progressColor` unless explicitly set)                    |
| `knobBorderWidth` | Number | `3`        | Knob border width in px                                                                   |
| `knobTextColor`  | String  | `'black'`  | Color of the number inside the knob                                                       |
| `knobRadius`     | Number  | `18`       | Knob radius in px                                                                         |

> ⚠️ **Migrating from earlier builds?** The prop name is `knobBorderWidth` (not `knobBorderWith`). If you ever saw the typo version, it is fixed in v1.1.0+.

## Events

| Event   | Payload | Description                                                           |
| ------- | ------- | --------------------------------------------------------------------- |
| `input` | Number  | Emitted when value changes — enables `v-model` out of the box         |
| `value` | Number  | Legacy event, same payload as `input`. Kept for backward compatibility |

## Slots

| Slot    | Description                                                                                          |
| ------- | ---------------------------------------------------------------------------------------------------- |
| default | Rendered inside `.box-svg` wrapper, on top of the SVG. Useful for icons, labels, or extra overlays.  |

## Examples

### Basic with v-model

```html
<template>
    <vue-circle-control-slider v-model="volume" />
</template>

<script>
export default {
    data() {
        return { volume: 50 };
    },
};
</script>
```

### Legacy event style (still supported)

```html
<vue-circle-control-slider :value="volume" @value="onChange" />
```

### Customized appearance

```html
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
```

### Using the default slot — download progress

Use the slot to render custom content (e.g. a download-progress label) on top of the slider:

```html
<template>
    <vue-circle-control-slider
        v-model="progress"
        :size="220"
        :min="0"
        :max="100"
        offKnob
        dial
        sign="%"
        progressColor="#4caf50"
        circleColor="#e0e0e0"
    >
        <div class="download-overlay">
            <small>Downloading</small>
            <strong>{{ fileName }}</strong>
        </div>
    </vue-circle-control-slider>
</template>

<script>
export default {
    data() {
        return {
            progress: 0,
            fileName: 'archive.zip',
        };
    },
    mounted() {
        const interval = setInterval(() => {
            this.progress += 1;
            if (this.progress >= 100) clearInterval(interval);
        }, 80);
    },
};
</script>

<style scoped>
.download-overlay {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    padding-bottom: 12px;
    pointer-events: none;
    font-family: sans-serif;
}
.download-overlay small {
    opacity: 0.6;
}
</style>
```

> Tip: The wrapper `.box-svg` has `position: relative`, so absolutely-positioned slot content lines up with the SVG center without extra setup.

## Demo

- [Live Demo](https://vue-circle-control-slider.firebaseapp.com/)
- [GitHub repository](https://github.com/vasyl-bilous/VueCircleControlSlider)

## Changelog

### 1.1.1
- 📝 Polished changelog wording

### 1.1.0
- ✨ Added default `<slot>` for custom center content
- ✨ Emits `input` event for `v-model` support (legacy `value` event kept)
- 🐛 Improved knob border width prop handling
- 🐛 Improved touch event handling
- 🐛 Improved event listener cleanup on component unmount
- 🐛 Prevented overlapping click animations
- 🐛 Improved radius calculation when `offKnob` is enabled
- 🔧 Migrated build system from `vue-cli-service` to Vite 5
- 🔧 Upgraded Sass from deprecated `node-sass` to Dart `sass`
- 🔧 Vue bumped to 2.7

## License

[MIT](http://opensource.org/licenses/MIT)
