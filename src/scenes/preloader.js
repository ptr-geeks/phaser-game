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
        this.load.image('heart', '/static/heart.png');
        
        //this.load.image('racman_idle', '/static/racman_idle.png');
        this.load.spritesheet('racman_idle', '/static/racman_idle.png', { frameWidth: 130, frameHeight: 130 });
        this.load.spritesheet('racman_walk', '/static/racman_walk.png', { frameWidth: 130, frameHeight: 130 });
        this.load.spritesheet('racman_jump', '/static/racman_jump.png', { frameWidth: 130, frameHeight: 140 });
    }

    create ()
    {
        this.anims.create({
            key: 'player_idle',
            frames: this.anims.generateFrameNumbers('racman_idle', { start: 0, end: 5 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'player_walk',
            frames: this.anims.generateFrameNumbers('racman_walk', { start: 0, end: 6 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'player_jump',
            frames: this.anims.generateFrameNumbers('racman_jump', { start: 0, end: 6 }),
            frameRate: 60,
            repeat: 0
        });

        this.scene.start('game');
    }
}
