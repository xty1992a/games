import Game from "./main/index.js";

!function () {
  window.addEventListener("load", function () {
    const game = new Game({
      width: 600,
      height: 600,
      cellSize: 60
    });

    game.render(document.body);
  });
}();