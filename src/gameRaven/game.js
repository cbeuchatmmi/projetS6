import Phaser from 'phaser'
import BootScene from '@/gameRaven/scenes/BootScene'
import PlayScene from '@/gameRaven/scenes/PlayScene'

function launch(containerId) {
  return new Phaser.Game({
    type: Phaser.AUTO,
    width: 800,
    height: 700,
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 330 },
        debug: false,
      }
    },
    scene: [BootScene, PlayScene]
  })
}

export default launch
export { launch }
