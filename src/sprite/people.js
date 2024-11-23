import { Container, Sprite } from "pixi.js";
import { getTexture } from "../common/assets";
import appConstants from "../common/constants.JS";
import { allTextureKeys } from "../common/textures";
import { destroySprite, randomIntFromInterval } from "../common/utils";

let app;
let rootContainer;
let people;
let aliveCoords = [];
let peopleFrames = null;
let tombStoneFrames = null;

export const destroyPerson = (p) => {
    const pos = {x: p.position.x, y: p.position.y};

    if(p.alive ){
        const frameName = tombStoneFrames[randomIntFromInterval(0, tombStoneFrames.length-1)];
        const tombStone = new Sprite(frameName);
        tombStone.anchor.set(0.5, 1);
        tombStone.alive = false;
        tombStone.name = p.name;
        tombStone.position.x = pos.x;
        tombStone.position.y = y + 100 ;
        tombStone.destroyMe = function(){
            destroyPerson(this);
          }
        people.removeChild(p);
        p.destroy({children: true});
        people.addChild(tombStone);
        recalculateAlivePeople();

    } else {
        destroySprite(p);
    }
};

export const initPeople = (currApp, root) => {
    if (!peopleFrames) {
        peopleFrames = [getTexture(allTextureKeys.man), getTexture(allTextureKeys.man2), getTexture(allTextureKeys.woman)];
      }
      if (!tombStoneFrames) {
        tombStoneFrames = [getTexture(allTextureKeys.TombStone1), getTexture(allTextureKeys.TombStone2)];
      }
      people = new Container();
      people.name = appConstants.containers.people;
      app = currApp;
      rootContainer = root;
      return people;
    }

    let x =10;
    let y = appConstants.size.HEIGHT;

    const recalculateAlivePeople = () => {
        const result = [];
        people.children.forEach((p) => {
            if(p.alive){
                result.push(p.position.x);
            }
        })
        aliveCoords = [...result];
    }

    export const restorePeople = () => {
        aliveCoords.length = 0;
        x = 30;
        y = appConstants.size.HEIGHT;

        const toRemove = [];

        people.children.forEach((p) => {
            toRemove.push(p);
        })

        toRemove.forEach((p)=>{
            destroySprite(p);
        })

        let i = 0;
        while (x < appConstants.size.WIDTH) {
            const frameName = peopleFrames[randomIntFromInterval(0, peopleFrames.length-1)];
            const man = new Sprite(frameName);
            man.anchor.set(0.5, 1);
            man.name = i;
            man.alive = true;
            man.position.x = x;
            man.position.y = y;
            man.destroyMe = function(){
                destroyPerson(this);
              }
            x += man.width + 10;
            people.addChild(man);
            i++
          }
          recalculateAlivePeople();
    }


    export const getAlivePeople = () => {
        return [...aliveCoords];
    }

    export const getRandomAlivePersone = () => {
        const allAlive = getAlivePeople();
        if(allAlive.length){
            return allAlive[randomIntFromInterval(0, allAlive.length)];
        }
        return null;
    };

    export const peopleTick = () => {
        people.children.forEach( (p) => {
            if(p.position.y > y){
                p.position.y -= 1;
            }
        })
    }
