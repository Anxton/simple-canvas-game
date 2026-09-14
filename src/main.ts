import { Game } from "./game/game";

const canvas = document.querySelector("canvas") as HTMLCanvasElement;
const canvas2DContext = canvas.getContext("2d")!;

const entityCountSlider = document.getElementById("entity-count") as HTMLInputElement;
const buttonAddEntities = document.getElementById("add-entities-button") as HTMLButtonElement;
const buttonClearEntities = document.getElementById("clear-entities-button") as HTMLButtonElement;
const buttonStopGame = document.getElementById("stop-game-button") as HTMLButtonElement;

const game = new Game(canvas, canvas2DContext);

game.init();

entityCountSlider.oninput = () => {
  entityCountSlider.previousElementSibling!.textContent = entityCountSlider.value;
};
buttonAddEntities.onclick = () => {
  for (let i = 0; i < parseInt(entityCountSlider.value); i++) {
    game.addEntity();
  }
};
buttonClearEntities.onclick = () => {
  game.clearEntities();
};
buttonStopGame.onclick = () => {
  game.stop();
};
