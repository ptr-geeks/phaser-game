import * as Phaser from 'phaser';

export default class PTRScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PTRScene' });
  }

  preload() {
    this.load.image('geek', '/static/geekptr2022.svg');
  }

  create() {
    this.add.image(
      game.config.width / 2,
      game.config.height / 2,
      'geek'
    );
  }
}
