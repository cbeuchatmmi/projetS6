import { Scene } from 'phaser'

import white from '../../../public/background/white.jpg'
import black from '../../../public/background/black.jpg'
import cheese from '../../../public/cheese.png'
import wall1 from '../../../public/wall/wall1.jpg'
import wall2 from '../../../public/wall/wall2.jpg'
import wall3 from '../../../public/wall/wall3.jpg'
import wall4 from '../../../public/wall/wall4.jpg'
import wall5 from '../../../public/wall/wall5.jpg'
import wall6 from '../../../public/wall/wall6.jpg'
import wall7 from '../../../public/wall/wall7.jpg'
import wall8 from '../../../public/wall/wall8.jpg'
import wall9 from '../../../public/wall/wall9.jpg'
import wall10 from '../../../public/wall/wall10.jpg'
import wall11 from '../../../public/wall/wall11.jpg'
import wall12 from '../../../public/wall/wall12.jpg'
import wall13 from '../../../public/wall/wall13.jpg'
import wall14 from '../../../public/wall/wall14.jpg'
import wall15 from '../../../public/wall/wall15.jpg'
import wall16 from '../../../public/wall/wall16.jpg'
import wall17 from '../../../public/wall/wall17.jpg'
import wall18 from '../../../public/wall/wall18.jpg'
import wall19 from '../../../public/wall/wall19.jpg'
import wall20 from '../../../public/wall/wall20.jpg'
import wall21 from '../../../public/wall/wall21.jpg'
import wall22 from '../../../public/wall/wall22.jpg'
import wall23 from '../../../public/wall/wall23.jpg'
import wall24 from '../../../public/wall/wall24.jpg'
import wall25 from '../../../public/wall/wall25.jpg'
import wall26 from '../../../public/wall/wall26.jpg'
import wall27 from '../../../public/wall/wall27.jpg'
import wall28 from '../../../public/wall/wall28.jpg'
import wall29 from '../../../public/wall/wall29.jpg'
import wall30 from '../../../public/wall/wall30.jpg'
import wall31 from '../../../public/wall/wall31.jpg'
import wall32 from '../../../public/wall/wall32.jpg'
import wall33 from '../../../public/wall/wall33.jpg'
import wall34 from '../../../public/wall/wall34.jpg'
import wall35 from '../../../public/wall/wall35.jpg'
import wall36 from '../../../public/wall/wall36.jpg'
import wall37 from '../../../public/wall/wall37.jpg'
import wall38 from '../../../public/wall/wall38.jpg'
import wall39 from '../../../public/wall/wall39.jpg'
import wall40 from '../../../public/wall/wall40.jpg'
import wall41 from '../../../public/wall/wall41.jpg'
import wall42 from '../../../public/wall/wall42.jpg'
import rat from '../../../public/animation/rat.png'


export default class BootScene extends Scene {
  constructor() {
    super({ key: 'BootScene' })
  }

  preload() {
    this.load.image('white', white);
    this.load.image('black', black);
    this.load.image('cheese', cheese);
    this.load.image('wall1', wall1);
    this.load.image('wall2', wall2);
    this.load.image('wall3', wall3);
    this.load.image('wall4', wall4);
    this.load.image('wall5', wall5);
    this.load.image('wall6', wall6);
    this.load.image('wall7', wall7);
    this.load.image('wall8', wall8);
    this.load.image('wall9', wall9);
    this.load.image('wall10', wall10);
    this.load.image('wall11', wall11);
    this.load.image('wall12', wall12);
    this.load.image('wall13', wall13);
    this.load.image('wall14', wall14);
    this.load.image('wall15', wall15);
    this.load.image('wall16', wall16);
    this.load.image('wall17', wall17);
    this.load.image('wall18', wall18);
    this.load.image('wall19', wall19);
    this.load.image('wall20', wall20);
    this.load.image('wall21', wall21);
    this.load.image('wall22', wall22);
    this.load.image('wall23', wall23);
    this.load.image('wall24', wall24);
    this.load.image('wall25', wall25);
    this.load.image('wall26', wall26);
    this.load.image('wall27', wall27);
    this.load.image('wall28', wall28);
    this.load.image('wall29', wall29);
    this.load.image('wall30', wall30);
    this.load.image('wall31', wall31);
    this.load.image('wall32', wall32);
    this.load.image('wall33', wall33);
    this.load.image('wall34', wall34);
    this.load.image('wall35', wall35);
    this.load.image('wall36', wall36);
    this.load.image('wall37', wall37);
    this.load.image('wall38', wall38);
    this.load.image('wall39', wall39);
    this.load.image('wall40', wall40);
    this.load.image('wall41', wall41);
    this.load.image('wall42', wall42);
    this.load.spritesheet('rat', rat, { frameWidth: 32, frameHeight: 35 });
  }

  create() {
    this.scene.start('PlayScene')
  }
}


