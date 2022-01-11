import { colors } from "../utils/constants";

const circum = 2 * Math.PI;

export default class Circle {
  constructor(canvas, center, radius, color, lineWidth, arcColor, opacity) {
    this.canvas = canvas;
    this.center = center;
    this.radius = radius;
    this.color = color ? (colors[color] ? colors[color] : "white") : "white";
    this.context = canvas.getContext("2d");
    this.lineWidth = lineWidth ? lineWidth : 1;
    this.arcColor = arcColor
      ? colors[arcColor]
        ? colors[arcColor]
        : "black"
      : "black";
    this.opacity = opacity;
    this.arc = 0;
  }

  clearAndBegin() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.beginPath();
  }

  createCircle() {
    let centerX = this.canvas.width * this.center.x;
    let centerY = this.canvas.height * this.center.y;

    this.context.beginPath();
    this.context.arc(centerX, centerY, this.radius, 0, circum, false);
    this.context.fillStyle = this.color;
    this.context.fill();
    this.context.lineWidth = this.lineWidth;
    this.context.strokeStyle = this.arcColor;
    this.context.stroke();
  }

  animateStroke(speed = 100) {
    let angle = 0;
    let final = circum * 10000;
    let ctx = this.context;
    let cvs = this.canvas;
    let radius = this.radius;
    let cen = this.center;
    let lw = this.lineWidth;
    let ac = this.arcColor;
    let interval = setInterval(function () {
      angle += speed;
      ctx.clearRect(0, 0, cvs.width, cvs.height);
      ctx.beginPath();
      ctx.arc(
        cvs.width * cen.x,
        cvs.height * cen.y,
        radius,
        0,
        angle / 10000,
        false
      );
      ctx.lineWidth = lw;
      ctx.strokeStyle = ac;
      ctx.stroke();
      if (angle >= final) {
        console.log(angle);
        clearInterval(interval);
      }
    }, 1);
  }

  animateStretchPromise(hor, vert, speed) {
    return new Promise((resolve, reject) => {
      let context = this.context;
      let cvs = this.canvas;
      let radius = this.radius
      let hiter = 1
      let viter = 1
      let cen = this.center
      let lw = this.lineWidth;
      let ac = this.arcColor;
      let hinc = (hor / 1000) * (speed / 100)
      let vinc = (vert / 1000) * (speed / 100)
      const interval = setInterval(function () {
        console.log(hiter, hor, viter, vert)
        context.beginPath()
        context.clearRect(0, 0, cvs.width, cvs.height)
        context.save();
        context.translate(cvs.width * cen.x, cvs.height * cen.y);
        context.scale(hiter, viter);
        context.translate(cvs.width * cen.x * -1, cvs.height * cen.y * -1);
        context.arc(cvs.width * cen.x, cvs.height * cen.y, radius, 0, circum, true);
        context.closePath();
        context.lineWidth = lw;
        context.strokeStyle = ac;
        context.stroke();
        context.restore();
        if (hiter >= hor && viter >= vert) {
          console.log(hiter, hor, viter, vert)
          clearInterval(interval)
          resolve("Animation Complete")
        }
        if (hiter < hor) {
          if (hiter < 1) {
            hiter -= hinc
          } else {
            hiter += hinc
          }
        } 
        if (viter < vert) {
          if (viter < 1) {
            viter -= vinc
          } else {
            viter += vinc
          }
        }
      }, 1);
    })
  }

  async animateStretch() {
    console.log(await this.animateStretchPromise())
  }
}
