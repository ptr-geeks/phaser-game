import 'phaser';

const Constants = {
  BALL_RADIUS: 10,
  BALL_SPEED: 400,
  BALL_ACCELERATE_FACTOR: 1.05,

  PLAYER_ACCELERATION: 300,
  PLAYER_MAX_SPEED: 300,
};

class Pong extends Phaser.Scene {
  ball: Phaser.GameObjects.Arc;
  ballBody: Phaser.Physics.Arcade.Body;

  playerLeft: Phaser.Physics.Arcade.Body;
  playerLeftPoints: number = 0;
  playerRight: Phaser.Physics.Arcade.Body;
  playerRightPoints: number = 0;

  score: Phaser.GameObjects.Text;
  keys: any;

  constructor() {
    super('Pong');
  }

  // Create our Pong Ball
  createBall(): void {
    this.ball = this.add.circle(this.cameras.main.centerX, this.cameras.main.centerY, Constants.BALL_RADIUS, 0xffffff);
    this.physics.add.existing(this.ball);

    this.ballBody = this.ball.body as Phaser.Physics.Arcade.Body;
    this.ballBody.onWorldBounds = true;
    this.ballBody.setBounce(1)
      .setCollideWorldBounds(true, 1, 1)
      .setCircle(Constants.BALL_RADIUS);

    this.physics.world.on('worldbounds', this.handleBallWorldCollide, this);
  }

  // Creates a player with starting position of (x, y) and origin 0.5
  createPlayer(x: number, y: number): Phaser.Physics.Arcade.Body {
    const player = this.add.rectangle(x, y, 16, 100, 0xffffff);
    this.physics.add.existing(player);

    return (player.body as Phaser.Physics.Arcade.Body)
      .setImmovable()
      .setBounceY(0.8)
      .setDragY(Constants.PLAYER_ACCELERATION)
      .setMaxVelocityY(Constants.PLAYER_MAX_SPEED)
      .setCollideWorldBounds()
  }

  create(): void {
    // Nice little background
    this.add.rectangle(this.cameras.main.centerX, 0, 5, this.cameras.main.height, 0xffffff, 0.3)
      .setOrigin(0.5, 0);

    this.add.circle(this.cameras.main.centerX, this.cameras.main.centerY, 150, 0xffffff, 0)
      .setStrokeStyle(3, 0xffffff, 0.3);  

    // Score Text
    this.score = this.add.text(this.cameras.main.centerX, 10, '')
        .setFontFamily('Fira Code')
        .setFontSize(32)
        .setColor('rgba(255, 255, 255, 100)')
        .setOrigin(0.5, 0);

    this.updateScoreBoard();

    // Create our ball and two players
    this.createBall();

    this.playerLeft = this.createPlayer(0, 0);
    this.physics.add.collider(this.playerLeft.gameObject, this.ball, this.handleBallPlayerCollide);

    this.playerRight = this.createPlayer(this.cameras.main.width - 8, this.cameras.main.height - 50);
    this.physics.add.collider(this.playerRight.gameObject, this.ball, this.handleBallPlayerCollide);

    // Movement
    this.keys = this.input.keyboard?.addKeys('w,s,up,down');

    // Wait before you start our game
    this.time.delayedCall(2000, () => this.reset());
  }

  update(): void {
    this.playerLeft.setAccelerationY(0);
    this.playerRight.setAccelerationY(0);

    // Computer can improvise gameplay instead of us, cool little demo
    if (this.ballBody.velocity.x! < 0) {
      // Just follow the ball
      if (this.ball.y < this.playerLeft.y) {
        this.playerLeft.setAccelerationY(-Constants.PLAYER_ACCELERATION);
      }
      if (this.ball.y > this.playerLeft.y) {
        this.playerLeft.setAccelerationY(Constants.PLAYER_ACCELERATION);
      }
    }
    // Both players, of course
    else {
      if (this.ball.y < this.playerRight.y) {
        this.playerRight.setAccelerationY(-Constants.PLAYER_ACCELERATION);
      }
      if (this.ball.y > this.playerRight.y) {
        this.playerRight.setAccelerationY(Constants.PLAYER_ACCELERATION);
      }
    }

    // Left Player
    if (this.keys.w.isDown) {
      this.playerLeft.setAccelerationY(-Constants.PLAYER_ACCELERATION);
    }
    if (this.keys.s.isDown) {
      this.playerLeft.setAccelerationY(Constants.PLAYER_ACCELERATION);
    }
    // Right Player
    if (this.keys.up.isDown) {
      this.playerRight.setAccelerationY(-Constants.PLAYER_ACCELERATION);
    }
    if (this.keys.down.isDown) {
      this.playerRight.setAccelerationY(Constants.PLAYER_ACCELERATION);
    }
  }

  // Adds some dynamic to the game by increasing the ball speed and slightly adjusting the return angle
  handleBallPlayerCollide(_player: any, ball: any): void {
    const ballBody = ball.body as Phaser.Physics.Arcade.Body;
   
    const vec = ballBody.velocity;
    vec.x *= Constants.BALL_ACCELERATE_FACTOR;
    vec.y *= Constants.BALL_ACCELERATE_FACTOR;

    // Randomly rotate in either direction by max. 25 degrees
    vec.rotate(Phaser.Math.DegToRad(Phaser.Math.Between(-25, 25)));
    ballBody.setVelocity(vec.x, vec.y);
  }

  // Resets the ball back into it's original position and sends it in random direction
  reset(): void {
    this.ball.setPosition(this.cameras.main.centerX, this.cameras.main.centerY);
    this.ballBody.setImmovable(false);
    // We need to constraint the angle to avoid vertical and almost vertical balls
    const angle = Phaser.Math.Between(-45, 45);
    this.physics.velocityFromAngle(angle, Constants.BALL_SPEED, this.ballBody.velocity);
    // Randomly swap sides by negating our velocity vector
    if (Math.random() > 0.5) {
      this.ballBody.velocity.negate();
    }
  }

  // Updates our top score board text
  updateScoreBoard(): void {
    this.score.setText(`${this.playerLeftPoints} : ${this.playerRightPoints}`)
  }

  // Handles ball collision with left or right world boundary to reward points and reset back into starting position
  handleBallWorldCollide(_body: any, _up: boolean, _down: boolean, left: boolean, right: boolean): void {
    if (left) {
      this.playerRightPoints++;
    }
    if (right) {
      this.playerLeftPoints++;
    }

    if (left || right) {
      this.ballBody.setVelocity(0).setImmovable();
      this.updateScoreBoard();

      this.time.delayedCall(2000, () => this.reset());
    }
  }
}

// Configure and initialize our game
const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  scale: {
    autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
    mode: Phaser.Scale.NONE,
  },
  parent: 'game',
  physics: {
    default: 'arcade'
  },
  width: 800,
  height: 600,
  transparent: false,
  backgroundColor: 'rgba(0, 0, 0, 255)',
  clearBeforeRender: true,
  scene: Pong,
};

export default new Phaser.Game(config);
