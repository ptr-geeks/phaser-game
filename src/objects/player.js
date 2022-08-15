import * as Phaser from 'phaser';

export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'racman_idle');
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setScale(0.5);
        //this.setDragX(0.2);
        
        this.movementKeys = scene.input.keyboard.addKeys("W,A,D");
        scene.cameras.main.startFollow(this, true, 0.05, 0, 0, 200);
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);

        if (this.movementKeys.D.isDown) {
            this.setVelocityX(200);
            this.setFlipX(false);
        } else if (this.movementKeys.A.isDown) {
            this.setVelocityX(-200);
            this.setFlipX(true);
        } else {
            this.setVelocityX(0);
        }

        if (this.body.onFloor() && (this.movementKeys.D.isDown || this.movementKeys.A.isDown)) {
            this.play('player_walk', true);
        } else if (this.body.onFloor()) {
            this.play('player_idle', true);
        } else {
            this.stop();
        }

        if (Phaser.Input.Keyboard.JustDown(this.movementKeys.W) && this.body.onFloor()) {
            this.setVelocityY(-400);
        }
    }
}
