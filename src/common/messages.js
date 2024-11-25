import { Container, Graphics, Text, TextStyle , Texture} from "pixi.js";
import appConstants from "./constants.JS";
import { restartGame } from "../common/eventHub";


// Создаем градиент 
const canvas = document.createElement('canvas'); 
const context = canvas.getContext('2d'); 
canvas.width = 100; 
canvas.height = 100;
const gradient = context.createLinearGradient(0, 0, 0, 100); 
gradient.addColorStop(0, '#ffffff'); 
gradient.addColorStop(1, '#00ff99'); 
context.fillStyle = gradient; 
context.fillRect(0, 0, 100, 100); 
const texture = Texture.from(canvas);

const style = new TextStyle({
  fontFamily: "Arial",
  fontSize: 36,
  fontStyle: "normal",
  fontWeight: "bold",
  fill:texture ,// ["#ffffff", "#00ff99"], // <- gradient
  stroke: "#4a1850",
  strokeThickness: 5,
  dropShadow: true,
  dropShadowColor: "#000000",
  dropShadowBlur: 4,
  dropShadowDistance: 6,
  wordWrap: true,
  wordWrapWidth: 440,
  lineJoin: "round",
});

const gameOverMessage = new Container();
gameOverMessage.interactive = true;

const graphics = new Graphics();
graphics.lineStyle(1, 0xff00ff, 1);
graphics.beginFill(0x650a5a, 0.25);
graphics.drawRoundedRect(0, 0, 250, 100, 16);
graphics.endFill();

gameOverMessage.addChild(graphics);

const text = new Text("Game Over", style);
text.anchor.set(0.5);
text.x = 250 / 2;
text.y = 100 / 2;
gameOverMessage.addChild(text);
gameOverMessage.on("pointertap", () => {
  restartGame(appConstants.events.gameOver);
});

export const getGameOver = () => {
  gameOverMessage.position.x = appConstants.size.WIDTH / 2 - gameOverMessage.width / 2;
  gameOverMessage.position.y = appConstants.size.HEIGHT / 2 - gameOverMessage.height / 2;
  return gameOverMessage;
};

const youWinMessage = new Container();
youWinMessage.interactive = true;

const graphics2 = new Graphics();
graphics2.lineStyle(1, 0xff00ff, 1);
graphics2.beginFill(0x650a5a, 0.25);
graphics2.drawRoundedRect(0, 0, 250, 100, 16);
graphics2.endFill();

youWinMessage.addChild(graphics2);

const text2 = new Text("You Win!", style);
text2.anchor.set(0.5);
text2.x = 250 / 2;
text2.y = 100 / 2;
youWinMessage.addChild(text2);
youWinMessage.on("pointertap", () => {
  restartGame(appConstants.events.youWin);
});

export const getYouWin = () => {
  youWinMessage.position.x = appConstants.size.WIDTH / 2 - youWinMessage.width / 2;
  youWinMessage.position.y = appConstants.size.HEIGHT / 2 - youWinMessage.height / 2;
  return youWinMessage;
};