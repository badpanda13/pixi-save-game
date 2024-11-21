import * as PIXI from 'pixi.js'
import { loadAssets } from './common/assets'

const createScene = () => {
    console.log("create scene");
}

const initInteraction = () => {}

export const initGame = () => {
    console.log("initGame");
  
    loadAssets((progress) => {
      if(progress === 'all'){
         createScene()
         initInteraction()
      }
    })
 
 }


 /*
 import { Application, Assets, Sprite  } from 'pixi.js';
 import appTextures, { allTextureKeys } from './common/textures';

// Asynchronous IIFE
export const initGame = () => {
(async () =>
{
    // Create a PixiJS application.
    const app = new Application();
    console.log("new Application();");
    // Intialize the application.
    await app.init({ background: '#1099bb', resizeTo: window });

    // Then adding the application's canvas to the DOM body.
    document.body.appendChild(app.canvas);

     // Load the bunny texture.
   /*  for (const [key, value] of Object.entries(appTextures)) {
        console.log(`${key}: ${value}`);
        Assets.add(key, value);
        console.log("assets end");
      }*/
  /*   const textures = new Map();
     const keys = Object.entries(allTextureKeys).map(([key, value]) => value)
     let arrayForAsset = [];
     Object.entries(appTextures).forEach(([key, value]) => {
        textures.set(key, value)
    })

    const textures2 = await Assets.load(textures);
     const texture = await Assets.load('assets/sprites/enemy/shipBlue.png');
     const textures1 = await Assets.load([
        {
            alias: 'shipBlue',
            src: 'assets/sprites/enemy/shipBlue.png',
        },
        {
            alias: 'shipBlue2',
            src: 'assets/sprites/enemy/shipBlue2.png',
        }])
     // Create a new Sprite from an image path
     const bunny = new Sprite(textures2['shipBlue']);
 
     // Add to stage
     app.stage.addChild(bunny);
 
     // Center the sprite's anchor point
     bunny.anchor.set(0.5);
 
     // Move the sprite to the center of the screen
     bunny.x = app.screen.width / 2;
     bunny.y = app.screen.height / 2;


    // Add an animation loop callback to the application's ticker.
    app.ticker.add((time) =>
        {
           
            bunny.rotation += 0.1 * time.deltaTime;
        });
})();
} */