import Phaser from 'phaser';

class PlayGame extends Phaser.Scene {

  
  constructor() {
    super('PlayGame');
  }

  preload(): void {
    this.load.tilemapTiledJSON('map', 'assets/map.json');
    this.load.image('sprites', 'assets/sprites.png');
  }

  create(): void {
    const map = this.make.tilemap({ key: 'map' });
    const tileSet = map.addTilesetImage('sprites', 'sprites');

    const backgroundLayer = map.createLayer('Background', tileSet!, 0, -424);
    const platformsLayer = map.createLayer('Platforms', tileSet!, 0, -424);

    this.cameras.main.setBounds(0, 0, 800, 600, false);
  }

  update(): void {

  }
}

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  scale: {
    autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
    mode: Phaser.Scale.NONE,
  },
  parent: 'game',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 50 },
      debug: true
    }
  },
  width: 800,
  height: 600,
  transparent: true,
  scene: PlayGame,
};

export default new Phaser.Game(config);
