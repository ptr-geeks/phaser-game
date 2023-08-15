import Phaser from 'phaser';

class PlayGame extends Phaser.Scene {
  keys: Phaser.Types.Input.Keyboard.CursorKeys;
  player: Phaser.Physics.Arcade.Sprite;

  constructor() {
    super('PlayGame');
  }

  preload(): void {
    // Background
    this.load.image('background', 'assets/background.jpg');

    // World
    this.load.tilemapTiledJSON('map', 'assets/map.json');
    this.load.image('sprites', 'assets/sprites.png');

    // Player
    this.load.spritesheet('player_idle', 'assets/player_idle.png', {
      frameWidth: 32,
      frameHeight: 32
    });

    this.load.spritesheet('player_run', 'assets/player_run.png', {
      frameWidth: 32,
      frameHeight: 32
    });

    this.load.spritesheet('player_jump', 'assets/player_jump.png', {
      frameWidth: 32,
      frameHeight: 32
    });

    this.load.spritesheet('player_fall', 'assets/player_fall.png', {
      frameWidth: 32,
      frameHeight: 32
    });

    this.load.spritesheet('player_land', 'assets/player_land.png', {
      frameWidth: 32,
      frameHeight: 32
    });
  }

  create(): void {
    this.cameras.main.setBounds(0, 0, 1920, 600);
    this.physics.world.setBounds(0, 0, 1920, 1024);

    // Background
    this.add.tileSprite(0, 0, 0, 0, 'background')
      .setOrigin(0, 0)
      .setScrollFactor(0.5, 0)
      .setScale(1, 0.8)
      .setDepth(-100);

    // World
    const map = this.make.tilemap({ key: 'map' });
    const tileSet = map.addTilesetImage('sprites', 'sprites');

    const backgroundLayer = map.createLayer('Background', tileSet!, 0, -424);
    const platformsLayer = map.createLayer('Platforms', tileSet!, 0, -424);
    platformsLayer?.setCollision([1, 43]);

    // Player
    this.player = this.physics.add.sprite(50, 450, 'player_idle', 0)
      .setScale(1)
      .setCollideWorldBounds(true);

    this.physics.add.collider(this.player, platformsLayer!);

    this.anims.create({
      key: 'player_idle',
      frames: this.anims.generateFrameNumbers('player_idle', {
        start: 0,
        end: 4
      }),
      frameRate: 8,
      repeat: -1,
    });

    this.anims.create({
      key: 'player_run',
      frames: this.anims.generateFrameNumbers('player_run', {
        start: 0,
        end: 5
      }),
      frameRate: 8,
      repeat: -1,
    });

    this.anims.create({
      key: 'player_jump',
      frames: this.anims.generateFrameNumbers('player_jump', {
        frames: [0]
      }),
      frameRate: 1,
      repeat: 0,
    });

    this.anims.create({
      key: 'player_fall',
      frames: this.anims.generateFrameNumbers('player_fall', {
        frames: [0]
      }),
      frameRate: 1,
      repeat: 0,
    });

    this.anims.create({
      key: 'player_land',
      frames: this.anims.generateFrameNumbers('player_land', {
        start: 0,
        end: 3
      }),
      frameRate: 12,
      repeat: 0,
    });

    // Camera
    this.cameras.main.startFollow(this.player, true, 0.08, 0.08);

    // Keys
    this.keys = this.input.keyboard?.createCursorKeys()!;
  }
  playerDebug: boolean = true;
  update(): void {
    this.player.setVelocityX(0);

    if (this.keys.right.isDown) {
      this.player.setVelocityX(100);
      this.player.setFlipX(false);
      this.player.anims.play('player_run', true);
    }
    if (this.keys.left.isDown) {
      this.player.setVelocityX(-100);
      this.player.setFlipX(true);
      this.player.anims.play('player_run', true);
    }

    if (this.keys.up.isDown && this.player.body?.blocked.down) {
      this.player.setVelocityY(-235);
      this.player.anims.play('player_jump');
    }
    // We're falling
    if (this.player.body?.velocity.y! > 0) {
      this.player.anims.play('player_fall');
    }
    // Epic landing!
    if (this.player.body?.deltaY()! > 0.5 && this.player.body?.blocked.down) {
      this.player.anims.play('player_land');
    }
    else if (this.player.body?.velocity.length() == 0 && this.player.body.blocked.down) {
      if (!this.player.anims.isPlaying) {
        this.player.anims.play('player_idle', true);
      }
    }
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
      gravity: { y: 200 },
      debug: false
    }
  },
  width: 800,
  height: 600,
  transparent: true,
  scene: PlayGame,
};

export default new Phaser.Game(config);
