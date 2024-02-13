import { Scene } from 'phaser'
import sky from '@/gameRaven/assets/background/sky.jpg'
import ground from '@/gameRaven/assets/platform/sol.png'
import platformsml from '@/gameRaven/assets/platform/platform_sml.png'
import platformmid from '@/gameRaven/assets/platform/platform_mid.png'
import platformbig from '@/gameRaven/assets/platform/platform_big.png'
import rock from '@/gameRaven/assets/rock.png'
import cage from '@/gameRaven/assets/cage.png'
import open from '@/gameRaven/assets/open.png'
import bird from '@/gameRaven/assets/animation/bird.png'
import raven from '@/gameRaven/assets/animation/raven.png'

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