import Phaser from 'phaser';

enum ImageNames {
  PhaserLogo = 'phaser3-logo'
}

class PlayGame extends Phaser.Scene {
  image: Phaser.GameObjects.Image;
  
  constructor() {
    super('PlayGame');
  }
  preload(): void {
    this.load.image(ImageNames.PhaserLogo, 'assets/phaser3-logo.png');
  }
  create(): void {
    this.image = this.add.image(400, 300, ImageNames.PhaserLogo);
  }
  update(): void {
    this.image.rotation += 0.01;
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
