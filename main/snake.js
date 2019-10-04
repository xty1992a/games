import * as utils from "./utils.js";

const dftOptions = {
    max_x: 100,
    max_y: 100,
    min_x: 0,
    min_y: 0,
}

export default class Snake {
    constructor(options) {
        this.$options = {...dftOptions, ...options};
        this.body = [];
        this.create();
        this.length = this.body.length
    }

    create() {
        const {max_x, max_y, min_x, min_y} = this.$options;
        const position = Snake.randomPosition({max_x, max_y, min_x, min_y})
        this.body.push(position)
    }

    move(dir) {
        const {body} = this
        const {max_x, max_y, min_x, min_y} = this.$options;

        const head = {...body[0]};
        console.log(head)
        switch (dir) {
            case 'left':
                head.x = head.x - 1;
                break;
            case 'right':
                head.x = head.x + 1;
                break;
            case 'up':
                head.y = head.y - 1;
                break;
            case 'down':
                head.y = head.y + 1;
                break;
        }
        this.body = [head, ...body].slice(0, this.length)
        if(head.x<0||head.x>max_x||head.y<0||head.y>max_y) {
            this.isDead = true;
        }
    }

    grow() {
        this.length += 1
    }

    hit(pos) {
        return pos.x===this.body[0].x && pos.y===this.body[0].y
    }

    static randomPosition({max_x, max_y, min_x, min_y}) {
        const rx = utils.ranger(min_x, max_x);
        const ry = utils.ranger(min_y, max_y);
        return {
            x:rx(),
            y: ry()
        }
    }

}