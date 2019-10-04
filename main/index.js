import * as utils from "./utils.js";
import Snake from './snake.js'

const dftOptions = {
  width: 500,
  height: 500,
  devicePixelRatio: 2,
  cellSize: 10,
  gameSpeed: 1000,
};

export default class Game {

  constructor(options = {}) {
    this.$options = {...dftOptions, ...options};
    this.init();

    this.playing = false
    this.dirtive = 'left'

    this.createSnake();
  }


  // init snakeHead
  createSnake() {
    const {width, height, cellSize} = this.$options;
    const row = height / cellSize, col = width / cellSize;
    // map[y][x] = 1;
    this.row = row;
    this.col = col;
    this.snake = new Snake({
      max_x: col - 1,
      max_y: row - 1,
    });
    this.createFood();
    console.log(this.snake);
    this.draw(this.composeMap());
    this.keyPress = this.keyPress.bind(this);

    this.listen()
  }

  composeMap() {
    const {row, col, snake} = this;
    return [...Array(row)]
        .fill(0)
        .map((i, r) =>
            [...Array(col)
                .fill(0)
                .map((n,c) => {
                  if(c===this.food.x && r===this.food.y) return 1
                  const findOne = snake.body.find(it => it.x === c && it.y ===r)
                  if(findOne) {
                    return 1
                  }
                  return 0
                })
            ]
        );
  }

  async loop() {
    while (this.playing) {
      await utils.sleep(this.$options.gameSpeed)

      if(this.snake.hit(this.food)) {
        this.createFood();
        this.snake.grow()
      }

      this.snake.move(this.dirtive);

      if(this.snake.isDead) {
        alert('YOU DEAD!')
        this.playing = false
        return
      }
      this.draw(this.composeMap());
    }
  }

  createFood() {
    let food =   Snake.randomPosition(this.snake.$options)
    while (this.snake.hit(food)) {
      food=Snake.randomPosition(this.snake.$options)
    }
    this.food = food
  }

  listen() {
    document.addEventListener('keydown',  this.keyPress)
  }

  unlisten() {
    document.removeEventListener('keydown',  this.keyPress)
  }

  keyPress(e) {
    switch (e.keyCode) {
      case 32:
        this.playing = !this.playing
        this.loop()
        break
      case 37:
        this.dirtive = 'left'
        break
      case 38:
        this.dirtive = 'up'
        break
      case 39:
        this.dirtive = 'right'
        break
      case 40:
        this.dirtive = 'down'
        break
    }
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
    this.ctx.clearRect(0,0,width*devicePixelRatio, height*devicePixelRatio)
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