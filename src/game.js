import * as PIXI from 'pixi.js'
import { loadAssets } from './common/assets'
import 'constants'
import appConstants from './common/constants.JS'
import { addPlayer, getPlayer, playerShoots, playerTick } from './sprite/player';
import { initBullets, bulletTick } from './sprite/bullets';
import { initPeople, peopleTick, restorePeople, } from './sprite/people'
import { initEnemies, addEnemy, enemyTick} from './sprite/enemy'
import { bombTick, initBombs } from './sprite/bombs'

const WIDTH = appConstants.size.WIDTH;
const HEIGHT = appConstants.size.HEIGHT;

const gameState = {
    stopped: false,
    moveLeftActive: false,
    moveRightActive: false
}

const createScene = async () => {
    console.log("createScene");
    const app = new PIXI.Application();
    await app.init({
        background: '#000000',
        antialias: true,
        width: WIDTH,
        height: HEIGHT
    });

    // Append the application canvas to the document body
    document.body.appendChild(app.canvas);
    gameState.app = app;

    const rootContainer = app.stage;
    rootContainer.interactive = true;
    rootContainer.hitArea = app.screen;
   
    const bullets = initBullets(app, rootContainer);
    rootContainer.addChild(bullets);

    const player = addPlayer(app, rootContainer);
    rootContainer.addChild(player);

    const people = initPeople(app, rootContainer);
    restorePeople();
    rootContainer.addChild(people);


    const enemies = initEnemies(app, rootContainer);
    addEnemy();
    rootContainer.addChild(enemies);

    const bombs = initBombs(app, rootContainer);
    rootContainer.addChild(bombs);

    console.log("end create scene");
    return app;
}

const initInteraction = () => {
    let player = getPlayer();
    console.log(player);
    gameState.mousePosition = player.position.x;

    gameState.app.stage.addEventListener("pointermove", (e) => {
        gameState.mousePosition = e.global.x;
    })

    document.addEventListener("keydown", (e) => {
        if(e.code === 'Space'){
            playerShoots();
        }
    })

    gameState.app.ticker.add((delat) => {
        playerTick(gameState);
        bulletTick();
        peopleTick();
        enemyTick();
        bombTick();
    })
}

export const initGame = () => {
    console.log("initGame");
  
    loadAssets(async (progress) => {
      if(progress === 'all'){
         await createScene();
         initInteraction();
      }
    })
 
 }