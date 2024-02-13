import { Scene } from 'phaser'
import sky from '../../../public/background/sky.jpg'
import ground from '../../../public/platform/sol.png'
import platformsml from '../../../public/platform/platform_sml.png'
import platformmid from '../../../public/platform/platform_mid.png'
import platformbig from '../../../public/platform/platform_big.png'
import rock from '../../../public/rock.png'
import cage from '../../../public/cage.png'
import open from '../../../public/open.png'
import bird from '../../../public/animation/bird.png'
import raven from '../../../public/animation/raven.png'

export default class BootScene extends Scene {
  constructor() {
    super({ key: 'BootScene' })
  }

  preload() {
    this.load.image('sky', sky);
    this.load.image('ground', ground);
    this.load.image('platformsml', platformsml);
    this.load.image('platformmid', platformmid);
    this.load.image('platformbig', platformbig);
    this.load.image('rock', rock);
    this.load.image('cage', cage);
    this.load.image('open', open);
    this.load.spritesheet('bird', bird, { frameWidth: 32, frameHeight: 54 });
    this.load.spritesheet('raven', raven, { frameWidth: 32, frameHeight: 54 });
  }

  create() {
    this.scene.start('PlayScene')
  }
}
