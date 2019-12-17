<template>
  <div id="box-svg">
    <svg :width="size + 'px'" :height="size + 'px'" :viewBox="'0 0 ' + size + ' ' + size" ref="_svg"
      @click="handleClick"
      @tochmove="handleTouchMove"
      @mousedown.prevent="handleMouseDown"  
    >
      <g>
        <circle :stroke="circleColor" fill="none" :stroke-width="circleWidth" :cx="cpCenter" :cy="cpCenter" :r="radius"></circle>
        <text v-if="dial" x="50%" y="50%" :font-size="dialFontSize" :fill="dialTextColor" alignment-baseline="middle" text-anchor="middle"  stroke-width="0" >{{valueReflect+sign}}</text>
        <path :stroke="progressColor" fill="none" :stroke-width="progressWidth" :d="cpPathD"></path>
        <circle  v-if="!offKnob" :fill="knobColor" :r="cpKnobRadius" :cx="cpPathX+circleSiftX" :cy="cpPathY+circleSiftY"  :stroke="cpKnobBorderColor" :stroke-width="knobBorderWith" ></circle>
        <text v-if="!offKnobNumber&&!offKnob" :fill="knobTextColor" font-size="20" :x="cpPathX - shiftX" :y="cpPathY + 7" class="knob-text">{{valueReflect}}</text> 
      </g>
    </svg>
  </div>
</template>
<script>
import TouchPosition from './helpers/touch_position.js'
import CircleState from './helpers/circle_state.js'
export default {
  name: 'VueCircleControlSlider',
   data () {
    return {
      steps: null,
      stepsCount: null,
      radius: 0,
      circleState: null,
      valueReflect: this.value,
    }
  },
  props: {
    ms:{type: Number, required: false, default: 500},
    dialTextColor:{ type: String, required: false, default: 'black' },
    offKnob:{ type: Boolean, required: false, default: false },
    dial:{ type: Boolean, required: false, default: false },
    sign:{ type: String, required: false, default: "" },
    dialFontSize:{ type: Number, required: false, default: 50 },
    knobBorderWith:{ type: Number, required: false, default: 3 },
    offKnobNumber:{ type: Boolean, required: false, default: false },
    startAngleOffset: { type: Number, required: false, default: 90 },
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
    progressWidth: { type: Number, required: false, default: 8 },
    disabled:{ type: Boolean, required: false, default: false }
  },
  created () {
    this.updateInCreated()
  },
  mounted () {
    this.updateInMounted()
    if(this.offKnobNumber){
        this.knobColor = this.progressColor;
        this.knobBorderColor = this.progressColor;
        this.knobRadius = 12;
      }
     
  },
  computed: {
    cpKnobBorderColor(){ return this.knobBorderColor !== '#2196F3' ? this.knobBorderColor : this.progressColor; },
    shiftX(){ return this.valueReflect >= 100 ? 17 : this.valueReflect > 9 ? 11 : 6 },
    circleSiftX(){ return this.valueReflect == 5  ? 1 : this.valueReflect == 15 ? -1 :0 },
    circleSiftY(){ return this.valueReflect == 0  ? -1 : this.valueReflect == 10 ? 1 :0 },
    cpCenter () { return this.size / 2 },
    cpAngle(){ return this.circleState.convertValueToAngle(this.valueReflect) },
    cpPathDirection () { return this.cpAngle > 180 ? 1 : 0 },
    cpPathX () { return this.circleState.getPositionX(this.cpAngle) },
    cpPathY () { return this.circleState.getPositionY(this.cpAngle) },
    cpStartPositionX(){return this.circleState.getPositionX(0)},
    cpStartPositionY(){return this.circleState.getPositionY(0)},
    cpKnobRadius () {
      if (this.offKnobNumber && this.knobRadius == 18) {
        return 15
      } else {return this.knobRadius}
    },
    cpPathD () {return `M${this.cpStartPositionX} ${this.cpStartPositionY} A ${this.radius} ${this.radius} 0 ${this.cpPathDirection} 1 ${this.cpPathX} ${this.cpPathY} `}
  },
  methods: {
    updateInCreated(){
      this.stepsCount = 1 + (this.max - this.min) / this.stepSize
      this.steps = Array.from({length: this.stepsCount}, (_, i) => this.min + i * this.stepSize)
      let maxCurveWidth = Math.max(this.circleWidth, this.progressWidth)
      this.radius = (this.size / 2) - Math.max(maxCurveWidth, this.cpKnobRadius * 2) / 2
      this.circleState = new CircleState(this.steps, this.value, this.radius, this.size/2, this.startAngleOffset)
    },
    updateInMounted(){ this.touchPosition = new TouchPosition(this.$refs._svg, this.radius, this.radius/2, this.startAngleOffset) },
    async animate(from, to, ms=500){
      while(await new Promise (resolve => {
        setTimeout(()=>{
            if(from < to){
              resolve(from++)
            }else{resolve(from--)}
           
        }, ms/this.stepsCount)
      }) !== to){
        this.valueReflect = from
      }
    },
    updateValue(e){
      if (this.disabled) return false
      const angle = this.touchPosition.setNewPosition(e).getAngle 
      const value = this.circleState.converAngleToValue(angle) 
      this.$emit("value", value) 
      e.type === 'click' ? this.animate(this.valueReflect, value, this.ms) : this.valueReflect = value

    },
    handleClick (e) { this.updateValue(e) },
    handleTouchMove (e) { this.updateValue(e) },
    handleMouseDown (e) {
      window.addEventListener('mousemove', this.handleWindowMouseMove)
      window.addEventListener('mouseup', this.handleMouseUp)
    },
    handleMouseUp (e) {
      window.removeEventListener('mousemove', this.handleWindowMouseMove)
      window.removeEventListener('mouseup', this.handleMouseUp)
    },
    handleWindowMouseMove (e) { this.updateValue(e) },
    
  },
  watch: {
    value (v){ this.valueReflect = v },
    size(v){
      this.updateInCreated()
      this.updateInMounted()
    },
    startAngleOffset(){ 
      this.updateInCreated()
      this.updateInMounted()
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
    circle, path{
      cursor: pointer;
    }
    text.knob-text{
      cursor: pointer;
      font-weight: 600;
    }
  }
</style>
