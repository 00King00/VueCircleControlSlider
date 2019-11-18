export default class TouchPosition {
  constructor (containerElement, sliderRadius, sliderTolerance) {
    this.containerElement = containerElement
    this.sliderRadius = sliderRadius
    this.sliderTolerance = sliderTolerance
  }

  setNewPosition (e) {
    const dimensions = this.containerElement.getBoundingClientRect()
    const size = dimensions.width
    this.center = size / 2
    this.relativeX = e.clientX - dimensions.left
    this.relativeY = e.clientY - dimensions.top
    console.log("x "+this.relativeX +" y "+this.relativeY)
    
  }

  // calcAngleDegrees(x, y) {
  //   return Math.atan2(y - this.center, x - this.center) * 180 / Math.PI;
  // }  //**

  get sliderAngle () {
    return (Math.atan2(this.relativeY - this.center, this.relativeX - this.center) + Math.PI * 3 / 2) % (Math.PI * 2)
  }
  // get sliderAngele(){
  //   return this.calcAngleDegrees(this.relativeX, this.relativeY)
  // }

  get isTouchWithinSliderRange () {
    const touchOffset = Math.sqrt(Math.pow(Math.abs(this.relativeX - this.center), 2) + Math.pow(Math.abs(this.relativeY - this.center), 2));
    return Math.abs(touchOffset - this.sliderRadius) <= this.sliderTolerance
  }
}
