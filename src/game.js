import * as PIXI from 'pixi.js'
import { loadAssets } from './common/assets'
import 'constants'
import appConstants from './common/constants.JS'
import { addPlayer, getPlayer, lockPlayer, playerShoots, playerTick } from './sprite/player';
import { initBullets, bulletTick, destroyBullet } from './sprite/bullets';
import { initPeople, peopleTick, restorePeople, destroyPerson} from './sprite/people'
import { initEnemies, addEnemy, enemyTick, destroyEmeny} from './sprite/enemy'
import { bombTick, destroyBomb, initBombs } from './sprite/bombs'
import { checkCollision, destroySprite } from "./common/utils";
import { initExplosions , explostionTick} from './sprite/explosions';

const WIDTH = appConstants.size.WIDTH;
const HEIGHT = appConstants.size.HEIGHT;
let rootContainer;
 
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

    rootContainer = app.stage;
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

    initExplosions(app, rootContainer);


    console.log("end create scene");
    return app;
}

const checkAllCollisions = () => {
    const enemies = rootContainer.getChildByName(appConstants.containers.enemies);
    const bullets = rootContainer.getChildByName(appConstants.containers.bullets);
    const people = rootContainer.getChildByName(appConstants.containers.people);
    const bombs = rootContainer.getChildByName(appConstants.containers.bomb);
    const player = rootContainer.getChildByName(appConstants.containers.player);

    if(enemies && bullets){
        const toRemove = [];
        bullets.children.forEach( (b) => {
            enemies.children.forEach( (e) => {
                if(e && b){
                    if(checkCollision(e,b)){
                        toRemove.push(b);
                        toRemove.push(e);
                    }
                }
            })
        })
        toRemove.forEach( (sprite) => {
            sprite.destroyMe();
        })
    }
    if(bombs && bullets){
        const toRemove = [];
        bullets.children.forEach( (b) => {
            bombs.children.forEach( (e) => {
                if(e && b){
                if(checkCollision(e,b)){
                    toRemove.push(b);
                    toRemove.push(e);
                }
                }
            })
        })
        toRemove.forEach( (sprite) => {
            sprite.destroyMe();
        })
    }
    if(bombs && player && !player.locked){
        const toRemove = [];
        bombs.children.forEach( (b) => {
                if(checkCollision(b, player)){
                    toRemove.push(b);
                    lockPlayer();
                }
            })
        toRemove.forEach( (sprite) => {
            sprite.destroyMe();
        })
        
    }
    if(bombs && people){
        const toRemove = [];
        bombs.children.forEach( (b) => {
            people.children.forEach( (p) => {
                if(b && p){
                    if(checkCollision(p,b)){
                        if(toRemove.indexOf(p) === -1){
                            toRemove.push(p);
                        }
                        if(toRemove.indexOf(b) === -1){
                            toRemove.push(b);
                        }
                    }
                }
            })   
        })
        toRemove.forEach( (b) => {
            b.destroyMe();
        })
    }
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
        explostionTick();
        checkAllCollisions();
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