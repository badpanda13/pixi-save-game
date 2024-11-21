import {Assets} from 'pixi.js';
import appTextures, { allTextureKeys } from './textures';

Object.entries(appTextures).forEach(([key, value]) => {
    console.log("assets.js" + key +" "+ value);
    Assets.add({ alias: key, src: value});
    console.log("assets end");
})

const textures = new Map()

export const loadAssets = (onProgress) => {
    console.log("loadAssets");
    const keys = Object.entries(allTextureKeys).map(([key, value]) => value)
    Assets.load([...keys], onProgress).then((data) => {
        console.log("loading...  "+data);
        Object.entries(data).forEach(([key, value]) => {
            textures.set(key, value)
        })
        onProgress('all')
    })
}

export const getTexture = (id) => {
    if(textures.has(id)){
        return textures.get(id)
    }
    return null
}