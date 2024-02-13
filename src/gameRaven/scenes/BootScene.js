import { Scene } from 'phaser'
import sky from '@/assets/background/sky.jpg'
import ground from '@/assets/platform/sol.png'
import platformsml from '@/assets/platform/platform_sml.png'
import platformmid from '@/assets/platform/platform_mid.png'
import platformbig from '@/assets/platform/platform_big.png'
import rock from '@/assets/rock.png'
import cage from '@/assets/cage.png'
import open from '@/assets/open.png'
import bird from '@/assets/animation/bird.png'
import raven from '@/assets/animation/raven.png'

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
