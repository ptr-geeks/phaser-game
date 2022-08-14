import * as Phaser from 'phaser';

export default class Player extends Phaser.Physics.Arcade.Image {
    constructor(scene, x, y) {
        super(scene, x, y, 'sprites', 7);

        scene.add.existing(this);
        scene.physics.add.existing(this);
        //this.setCollideWorldBounds(true);

        this.movementKeys = scene.input.keyboard.addKeys("W,A,D");
        scene.cameras.main.startFollow(this, true, 0.05, 0, 0, 200);
    }

    preUpdate() {
        if (this.movementKeys.D.isDown) {
            this.setVelocityX(200);
        } else if (this.movementKeys.A.isDown) {
            this.setVelocityX(-200);
        } else {
            this.setVelocityX(0);
        }

        if (Phaser.Input.Keyboard.JustDown(this.movementKeys.W) && this.body.velocity.y === 0) {
            this.setVelocityY(-400);
        }
    }
}
