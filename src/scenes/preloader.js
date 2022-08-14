import * as Phaser from 'phaser';

export default class Preloader extends Phaser.Scene
{
    constructor ()
    {
        super('preloader');
    }

    preload ()
    {
        this.loadText = this.add.text(400, 300, 'Loading...').setOrigin(0.5);

        this.load.image('background', '/static/background.jpg');
        this.load.spritesheet('sprites', '/static/sprites.png', { frameWidth: 64, frameHeight: 64 });
    }

    create ()
    {
        this.scene.start('game');
    }
}
