import * as Phaser from 'phaser';

export default class UI extends Phaser.Scene {
    constructor() {
        super('ui');
        this.score = 0;
    }

    create() {
        this.scoreText = this.add.text(5, 30, String(this.score).padStart(6, '0'), {
            fontFamily: 'Arial',
            color: '#000000',
            fontSize: 48
        });
        this.scoreText.setOrigin(0);

        this.hearths = this.add.group();
        this.hearths.createMultiple({ 
            key: 'heart', 
            quantity: 3,
            setXY: {
                x: 20,
                y: 20,
                stepX: 30
            },
            setScale: {
                x: 0.1,
                y: 0.1
            },
            setOrigin: 0
         });
    }

    preUpdate() {

    }
}