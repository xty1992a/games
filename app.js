import Snake from "./main.js";

!function () {
  window.addEventListener("load", function () {
    const snake = new Snake({
      width: 600,
      height: 600,
      cellSize: 60
    });

    snake.render(document.body);
  });
}();