export default class CircleState {
    constructor (stepsArray, initialValue, radius, center, offset) {
      this.stepsArray = stepsArray
      this.offset = offset
      this.currentStepIndex = 0
      this.radius = radius
      this.center = center
      this.convertedDegreesToRadians = Math.PI/180
      this.currentStepIndex = this.stepsArray.findIndex((v,i) => v === initialValue)
      this.firstStep = this.stepsArray[0]
      this.stepsQuantity = this.stepsArray.length - 1
      this.lastStep = this.stepsArray[this.stepsQuantity]
      this.convertValueToAngle(initialValue)
    }
    get angleUnit(){ return 365/this.stepsQuantity }

    get currentStep () { return this.stepsArray[this.currentStepIndex] }
   
    convertValueToAngle (val) {
      for (let i = 0; i < this.stepsQuantity; i++) {
        if (val == this.stepsArray[i]) {
          this.currentStepIndex = i
          break
        }
      }
       
      const corectAngle = this.angleUnit *  this.currentStepIndex;
     
      return corectAngle > 360 ? 360-0.05001 : corectAngle
    }
    converAngleToValue(angle){ return angle >=358 ? this.lastStep : this.stepsArray[Math.ceil(angle/(this.angleUnit))] }
    getPositionX(angle){ return this.center + this.radius*Math.cos((angle+this.offset)*this.convertedDegreesToRadians) - 0.00001 }
    getPositionY(angle){ return this.center + this.radius*Math.sin((angle+this.offset)*this.convertedDegreesToRadians) - 0.00001 }
  
   
  }
  