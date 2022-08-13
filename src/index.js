import * as Phaser from 'phaser';
import PTRScene from './scenes/ptr';

const config = {
  name: 'app',
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: [PTRScene],
};

window.game = new Phaser.Game(config);
