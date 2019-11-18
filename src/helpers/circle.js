export default class CircleState {
    constructor (stepsArray, initialValue, radius, center, offset=0) {
      this.stepsArray = stepsArray
      this.offset = offset
      this.currentStepIndex = 0
      this.radius = radius
      this.center = center
      this.convertedDegreesToRadians = Math.PI/180
      // for (let stepIndex in this.steps) {
      //   if (this.steps[stepIndex] === initialValue) {
      //     this.currentStepIndex = stepIndex
      //     break
      //   }
      // }
      this.currentStepIndex = this.stepsArray.findIndex((v,i) => i === initialValue)
      this.firstStep = this.stepsArray[0]
      this.stepsQuantity = this.stepsArray.length - 1
      this.lastStep = this.stepsArray[this.stepsQuantity]
    }
    get angleUnit(){ return 365/this.stepsQuantity }

    get currentStep () { return this.stepsArray[this.currentStepIndex] }
    convertValueToAngle (val) { return this.angleUnit * val}
    getPositionX(angle){
      console.log(Math.cos(angle*this.convertedDegreesToRadians));
      
      return this.center + this.radius*Math.cos(angle*this.convertedDegreesToRadians) - 0.00001
    }
    getPositionY(angle){
      console.log(Math.sin(angle*this.convertedDegreesToRadians));
      
      return this.center + this.radius*Math.sin(angle*this.convertedDegreesToRadians) - 0.00001
    }
  
   
  }
  