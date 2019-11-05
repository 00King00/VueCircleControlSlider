<template>
  <div id="box-svg">
    <svg :width="size + 'px'" :height="size + 'px'" :viewBox="'0 0 ' + size + ' ' + size" ref="_svg"
      @touchmove="handleTouchMove"
      @click="handleClick"
      @mousedown="handleMouseDown"
      @mouseup="handleMouseUp"
    >
      <g>
        <circle :stroke="circleColor" fill="none" :stroke-width="circleWidth" :cx="cpCenter" :cy="cpCenter" :r="radius"></circle>
        <text v-if="dial" x="50%" y="50%" :font-size="dialFontSize" :fill="dialTextColor" alignment-baseline="middle" text-anchor="middle"  stroke-width="0" >{{currentStepValue+sign}}</text>
        <path :stroke="progressColor" fill="none" :stroke-width="progressWidth" :d="cpPathD"></path>
        <circle  v-if="!offKnob" :fill="knobColor" :r="cpKnobRadius" :cx="cpPathX+circleSiftX" :cy="cpPathY+circleSiftY"  :stroke="cpKnobBorderColor" :stroke-width="knobBorderWith" ></circle>
        <text v-if="!offKnobNumber&&!offKnob" :fill="knobTextColor" font-size="22" :x="cpPathX - shiftX" :y="cpPathY + 7" class="knob-text">{{currentStepValue}}</text> 
      </g>
    </svg>
  </div>
</template>
<script>
import TouchPosition from './helpers/touch_position.js'
import CircleState from './helpers/circle_state.js'
export default {
  name: 'CircleControler',
   data () {
    return {
      steps: null,
      stepsCount: null,
      radius: 0,
      angle: 0,
      currentStepValue: 0,
      mousePressed: false,
      circleState: null,
      mousemoveTicks: 0,
      startAngleOffset: 0
    }
  },
   props: {
    dialTextColor:{ type: String, required: false, default: 'black' },
    offKnob:{ type: Boolean, required: false, default: false },
    dial:{ type: Boolean, required: false, default: false },
    sign:{ type: String, required: false, default: "" },
    dialFontSize:{ type: Number, required: false, default: 50 },
    knobBorderWith:{ type: Number, required: false, default: 3 },
    offKnobNumber:{ type: Boolean, required: false, default: false },
    //startAngleOffset: { type: Number, required: false, default: 0 },
    value: { type: Number, required: false, default: 0},
    size: { type: Number, required: false, default: 200},
    stepSize: { type: Number, required: false, default: 1},
    min: { type: Number, required: false, default: 0 },
    max: { type: Number, required: false, default: 100 },
    circleColor: { type: String, required: false, default: '#9E9E9E' },
    progressColor: { type: String, required: false, default: '#2196F3' },
    knobColor: { type: String, required: false, default: 'white' },
    knobBorderColor: { type: String, required: false, default: '#2196F3' },
    knobTextColor:{ type: String, required: false, default: 'black' },
    knobRadius: { type: Number, required: false, default: 18 },
    circleWidth: { type: Number, required: false, default: 6 },
    //circleWidthRel: { type: Number, required: false, default: 20 },
    progressWidth: { type: Number, required: false, default: 8 },
    //progressWidthRel: { type: Number, required: false, default: 4 },
    disabled:{ type: Boolean, required: false, default: false }
  },
  created () {
    this.stepsCount = 1 + (this.max - this.min) / this.stepSize
    this.steps = Array.from({
      length: this.stepsCount
    }, (_, i) => this.min + i * this.stepSize)

    this.circleState = new CircleState(this.steps, this.startAngleOffset, this.value)
    this.angle = this.circleState.angleValue
    this.currentStepValue = this.circleState.currentStep

    let maxCurveWidth = Math.max(this.circleWidth, this.progressWidth)
    this.radius = (this.size / 2) - Math.max(maxCurveWidth, this.cpKnobRadius * 2) / 2
    this.updateFromPropValue(this.value)
    
  },
  mounted () {
    this.touchPosition = new TouchPosition(this.$refs._svg, this.radius, this.radius / 2)
    if(this.offKnobNumber){
        this.knobColor = this.progressColor;
        this.knobBorderColor = this.progressColor;
        this.knobRadius = 12;
      }
     
  },
  computed: {
    cpKnobBorderColor(){ return this.knobBorderColor !== '#2196F3' ? this.knobBorderColor : this.progressColor; },
    shiftX(){ return this.currentStepValue >= 100 ? 17 : this.currentStepValue > 9 ? 11 : 6 },
    circleSiftX(){ return this.currentStepValue == 5  ? 1 : this.currentStepValue == 15 ? -1 :0 },
    circleSiftY(){ return this.currentStepValue == 0  ? -1 : this.currentStepValue == 10 ? 1 :0 },
    cpCenter () { return this.size / 2 },
    cpAngle () { return this.angle + Math.PI / 2 },
    //cpMainCircleStrokeWidth () { return this.circleWidth || (this.size / 2)/this.circleWidthRel },
    cpPathDirection () { return (this.cpAngle < 3 / 2 * Math.PI) ? 0 : 1 },
    cpPathX () { return this.cpCenter + this.radius * Math.cos(this.cpAngle) },
    cpPathY () { return this.cpCenter + this.radius * Math.sin(this.cpAngle) },
    //cpPathStrokeWidth () { return this.progressWidth || (this.size / 2) / this.progressWidthRel },
    cpKnobRadius () {
      if (this.offKnobNumber && this.knobRadius == 18) {
        return 15
      } else {return this.knobRadius}
    },
    cpPathD () {
      // let parts = []
      // parts.push('M' + this.cpCenter)
      // parts.push(this.cpCenter + this.radius)
      // parts.push('A')
      // parts.push(this.radius)
      // parts.push(this.radius)
      // parts.push(0)
      // parts.push(this.cpPathDirection)
      // parts.push(1)
      // parts.push(this.cpPathX)
      // parts.push(this.cpPathY)
      // return parts.join(' ')
      return `M${this.cpCenter} ${this.cpCenter+this.radius} A ${this.radius} ${this.radius} 0 ${this.cpPathDirection} 1 ${this.cpPathX} ${this.cpPathY}`
    }
  },
  methods: {
    fitToStep (val) { return Math.round(val/this.stepSize) * this.stepSize },
    handleClick (e) {
      if (this.disabled) return false
      this.touchPosition.setNewPosition(e)
      if (this.touchPosition.isTouchWithinSliderRange) {
        const newAngle = this.touchPosition.sliderAngle
        this.animateSlider(this.angle, newAngle)
      }
    },
    handleMouseDown (e) {
      if (this.disabled) return false
      e.preventDefault()
      this.mousePressed = true
      window.addEventListener('mousemove', this.handleWindowMouseMove)
      window.addEventListener('mouseup', this.handleMouseUp)
    },
    handleMouseUp (e) {
      e.preventDefault()
      if (this.disabled) return false
      this.mousePressed = false
      window.removeEventListener('mousemove', this.handleWindowMouseMove)
      window.removeEventListener('mouseup', this.handleMouseUp)
      this.mousemoveTicks = 0
    },
    handleWindowMouseMove (e) {
      if (this.disabled) return false
      e.preventDefault()
      if (this.mousemoveTicks < 5) {
        this.mousemoveTicks++
        return
      }
      this.touchPosition.setNewPosition(e)
      this.updateSlider()
    },
    handleTouchMove (e) {
      if (this.disabled) return false
      this.$emit('touchmove')
      // Do nothing if two or more fingers used
      if (e.targetTouches.length > 1 || e.changedTouches.length > 1 || e.touches.length > 1) {
        return true
      }

      const lastTouch = e.targetTouches.item(e.targetTouches.length - 1)
      this.touchPosition.setNewPosition(lastTouch)

      if (this.touchPosition.isTouchWithinSliderRange) {
        e.preventDefault()
        this.updateSlider()
      }
    },
    updateAngle (angle) {
      this.circleState.updateCurrentStepFromAngle(angle)
      this.angle = this.circleState.angleValue
      this.currentStepValue = this.circleState.currentStep
      this.$emit('input', this.currentStepValue)
    },
    updateFromPropValue (value) {
      let stepValue = this.fitToStep(value)
      this.circleState.updateCurrentStepFromValue(stepValue)
      this.angle = this.circleState.angleValue
      this.currentStepValue = stepValue
      this.$emit('input', this.currentStepValue)

    },
    updateSlider () {
      const angle = this.touchPosition.sliderAngle
      if (Math.abs(angle - this.angle) < Math.PI) {
        this.updateAngle(angle)
      }
    },
    animateSlider (startAngle, endAngle) {
      const direction = startAngle < endAngle ? 1 : -1
      const curveAngleMovementUnit = direction * this.circleState.angleUnit * 2

      const animate = () => {
        if (Math.abs(endAngle - startAngle) < Math.abs(2 * curveAngleMovementUnit)) {
          this.updateAngle(endAngle)
        } else {
          const newAngle = startAngle + curveAngleMovementUnit
          this.updateAngle(newAngle)
          this.animateSlider(newAngle, endAngle)
        }
      }

      window.requestAnimationFrame(animate)
    }
  },
  watch: {
    value (val) {
      this.updateFromPropValue(val);
    },
    offKnobNumber(v){
        if(v === true){
        this.knobColor = this.progressColor;
        this.knobBorderColor = this.progressColor;
        this.knobRadius = 12;
      }else {
        this.knobRadius = 18;
        this.knobColor = 'white'
      }
    },
    progressColor(v){
      if(this.offKnobNumber)
       this.knobColor = v;
       this.knobBorderColor = v;
    }  
  }
}
</script>
<style lang="scss" scoped>
  #box-svg{
    display: inline-block;
  }
  svg {
    overflow: visible;
    height: 100%;
    width: 100%;
    circle{
      cursor: pointer;
    }
    text.knob-text{
      cursor: pointer;
      font-weight: 600;
    }
  }
</style>
