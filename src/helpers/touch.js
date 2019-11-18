export default class TouchPosition{
    constructor(svgElement, radius, circleCenter){
        this.svgElement = svgElement
        this.radius = radius
        this.circleCenter = circleCenter
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
        
      }
    calcAngleDegrees(x, y){
        if(y>0){
            return Math.abs(Math.atan2(y, x) * 180 / Math.PI - 360 )
          } else {
            return Math.abs(Math.atan2(y, x) * 180 / Math.PI);
          }
    }

    get getAngele(){
        return this.calcAngleDegrees(this.rightTriangleSideX, this.rightTriangleSideY)
    }
}