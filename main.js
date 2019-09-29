import * as utils from "./utils.js";

const dftOptions = {
  width: 500,
  height: 500,
  devicePixelRatio: 2,
  cellSize: 10
};

export default class Snake {

  constructor(options = {}) {
    this.$options = {...dftOptions, ...options};
    this.init();
    this.firstScreen();
  }


  // init snakeHead
  firstScreen() {
    const {width, height, cellSize} = this.$options;
    const row = height / cellSize, col = width / cellSize;
    const map = [...Array(row)].fill(0).map(i => [...Array(col).fill(0)]);
    const rx = utils.ranger(0, col - 1);
    const ry = utils.ranger(0, row - 1);
    const x = rx(), y = ry();
    console.log(x, y, map, map[y]);
    map[y][x] = 1;

    this.draw(map);
  }

  // region renderer
  init() {
    const {width, height, devicePixelRatio} = this.$options;
    const canvas = document.createElement("canvas");
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
    canvas.style.border = "1px solid";
    canvas.width = width * devicePixelRatio;
    canvas.height = height * devicePixelRatio;
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
  }

  draw(map) {
    const {width, height, devicePixelRatio} = this.$options;
    const c_h = height * devicePixelRatio / map.length;
    const c_w = width * devicePixelRatio / map[0].length;
    map.forEach((item, row) => item.forEach((flag, col) => {
      const x = col * c_w;
      const y = row * c_h;
      if (flag) {
        this.fillRect(x, y, c_w, c_h);
      } else {
        this.strokeRect(x, y, c_w, c_h);
      }
    }));
  }

  fillRect(x, y, w, h) {
    const ctx = this.ctx;
    ctx.save();
    ctx.fillRect(x, y, w, h);
    ctx.restore();
  }

  strokeRect(x, y, w, h) {
    const ctx = this.ctx;
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + w, y);
    ctx.lineTo(x + w, y + h);
    ctx.lineTo(x, y + h);
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
  }

  // endregion

  render(dom) {
    dom.appendChild(this.canvas);
  }
}