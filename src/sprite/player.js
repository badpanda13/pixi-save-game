import {Sprite} from 'pixi.js'
import { getTexture } from '../common/assets'
import appConstants from '../common/constants.JS'
import { allTextureKeys } from '../common/textures'
import { addBullet } from './bullets'
//import { addBullet } from './bullets'

let player
let app
let lockTimeout

export const addPlayer = (currApp, root) => {
    console.log("addPlayer "+ player);
    if(player) {
        return player;
    }
    app = currApp;
    player = new Sprite(getTexture(allTextureKeys.spaceShip));
    player.name = appConstants.containers.player;
    player.anchor.set(0.5);
    player.scale.set(0.3);
    player.position.x = appConstants.size.WIDTH / 2;
    player.position.y =appConstants.size.HEIGHT - 200;
    console.log("create player "+ player);
    return player;
}

export const getPlayer = () => player

export const lockPlayer = () => {
    if(lockPlayer){
        return
    }
    player.locked = true;
    lockTimeout = setTimeout(() => {
        lockTimeout = null;
        player.locked = false;
    }, appConstants.timeouts.playerLock);
}

export const playerShoots = () => {
    if(!lockTimeout){
        addBullet({x: player.position.x, y: player.position.y});
    }
}

export const playerTick = (state) => {
    if(lockPlayer){
        player.alpha = 0.5;
    } else {
        player.alpha = 1;
    }

    const playerPosition = player.position.x;
    player.position.x = state.mousePosition;
    if(player.position.x < playerPosition){
        player.rotation = -0.3;
    } else {
        player.rotation = 0;
    }
}