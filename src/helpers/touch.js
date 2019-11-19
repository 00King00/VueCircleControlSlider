export default class TouchPosition{
    constructor(svgElement, radius, circleCenter, startAngleOffset){
        this.svgElement = svgElement
        this.radius = radius
        this.circleCenter = circleCenter
        this.startAngleOffset = startAngleOffset
    }
    setNewPosition (e) {
        const dimensions = this.svgElement.getBoundingClientRect()
        const size = dimensions.width
        this.center = size / 2
        this.relativeX = e.clientX - dimensions.left
        this.relativeY = e.clientY - dimensions.top
        this.rightTriangleSideX = -this.center + this.relativeX
        this.rightTriangleSideY = this.center - this.relativeY
        console.log("x "+this.relativeX +" y "+this.relativeY)
        console.log("rightTriangleSideX: " + this.rightTriangleSideX + "rightTriangleSideY: " + this.rightTriangleSideY)
        return this
        
      }
    calcAngleDegrees(x, y){
        if(y>0){
            return Math.abs(Math.atan2(y, x) * 180 / Math.PI - 360 )
          } else {
            return Math.abs(Math.atan2(y, x) * 180 / Math.PI);
          }
    }

    get getAngle(){
      const deltaAngle = 360 - this.startAngleOffset;
      //360-45=315
      const angle = this.calcAngleDegrees(this.rightTriangleSideX, this.rightTriangleSideY)
      console.log("A"+angle);
      
      const extraAngle = this.startAngleOffset + angle - this.startAngleOffset
      if(angle<this.startAngleOffset && deltaAngle){
        return Math.ceil(270+extraAngle)
      }else {
        console.log(Math.ceil(angle-this.startAngleOffset));
        return angle-this.startAngleOffset

      }
       
    }
}