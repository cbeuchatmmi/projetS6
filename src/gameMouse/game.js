import Phaser from 'phaser'
import BootScene from '@/gameMouse/scenes/BootScene'
import PlayScene from '@/gameMouse/scenes/PlayScene'

function launch(containerId) {
  return new Phaser.Game({
    type: Phaser.AUTO,
    width: 746,
    height: 800,
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 0 },
        debug: false,
      }
    },
    scene: [BootScene, PlayScene]
  })
}

export default launch
export { launch }
