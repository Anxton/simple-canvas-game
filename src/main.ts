import { Game } from "./game/game";

const canvas = document.querySelector("canvas") as HTMLCanvasElement;
const canvas2DContext = canvas.getContext("2d")!;

const game = new Game(canvas, canvas2DContext);

game.start();

const buttonAddEntity = document.getElementById("add-entity-button") as HTMLButtonElement;

buttonAddEntity.onclick = () => {
    game.addEntity();
};