import { AnimatedSprite, Texture, Container } from 'pixi.js';
import { ColorMatrixFilter } from '@pixi/filter-color-matrix';
import appConstants from "../common/projectConstants";
import { destroySprite } from '../common/utils';

let app
let bullets
let timeout

const bulletTypes = ['Bullet_Sequence1', 'Bullet_Sequence2']

const bulletSpeed = 1

const allTextures = {}

export const destroyBullet = (bullet) => {
    destroySprite(bullet);
} 

export const initBullets = ( currApp, root) => {
    bullets = new Container()
    bullets.name = appConstants.containers.bullets,
    app = currApp
    return bullets
}

export const clearBullets = () => {
    bullets.children.forEach((b) => {
        destroySprite(b);
    }) 
}

export const addBullet = (coord) => {
    // if(timeout){
    //     //sound 
    //     return
    // }

    const bulletType = bulletTypes[Math.floor(Math.random() * bulletTypes.length)]
    
    let textures = []
    if(allTextures[bulletType]){
        textures = allTextures[bulletType]
    } else {
        for(let i = 0; i < 6; i++){
            const texture = Texture.from (`${bulletType} ${i+1}.png`)
            textures.push(texture)
        }
        allTextures[bulletType] = textures
    }

    const bullet = new AnimatedSprite(textures)
    const filter = new ColorMatrixFilter();

    bullet.loop = false
    const { matrix } = filter
    matrix[1] = Math.sin(Math.random() * 10)
    matrix[2] = Math.cos(Math.random() * 10)
    matrix[3] = Math.cos(Math.random() * 10)
    matrix[4] = Math.sin(Math.random() * 10)
    matrix[5] = Math.sin(Math.random() * 10)
    matrix[6] = Math.sin(Math.random() * 10)
    bullet.filters = [filter]
    bullet.animationSpeed = 0.2
    bullet.anchor.set(0.5)
    bullet.position.set(coord.x, coord.y - 10)
    bullet.destroyMe = function(){
        destroyBullet(this);
      }
    bullets.addChild(bullet)
    bullet.play()
    //sound play 

    timeout = setTimeout(() => {
        timeout = null
    }, appConstants.timeouts.playerShoots)
}


export const bulletTick = () => {
    const toRemove = []
    bullets.children.forEach((b) => {
        b.position.y -= bulletSpeed * 2
        if(b.position.y < 0){
            toRemove.push(b)
        }
    })
    toRemove.forEach((b) => {
        destroySprite(b);
    })
}