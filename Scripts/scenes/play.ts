namespace scenes {
  export class Play extends objects.Scene {
    // private instance variable
    private _player: objects.Player;
    private _ocean: objects.Ocean;
    private _island: objects.Island;

    private _cloudNum: number;
    private _clouds: objects.Cloud[];

    private _enemy: objects.Enemy;

    private _engineSound: createjs.AbstractSoundInstance;

    private _bulletManager: managers.Bullet;

    // public properties

    // constructor
    constructor() {
      super();

      this.Start();
    }

    // private methods

    // public methods

    public Start(): void {
      this._cloudNum = 3;

      this._ocean = new objects.Ocean();

      this._island = new objects.Island();

      this._enemy = new objects.Enemy();

      this._player = new objects.Player();
      managers.Game.player = this._player;

      // Instantiates a new Array container of Type objects.Cloud
      this._clouds = new Array<objects.Cloud>();

      // Fill the Cloud Array with Clouds
      for (let count = 0; count < this._cloudNum; count++) {
        this._clouds[count] = new objects.Cloud();
      }

      // play background engine sound when the level starts
      this._engineSound = createjs.Sound.play("engineSound");
      this._engineSound.volume = 0.1;
      this._engineSound.loop = -1; // loop forever

      // instantiates a new bullet manager
      this._bulletManager = new managers.Bullet();
      managers.Game.bulletManager = this._bulletManager;

      this.SetupInput();

      this.Main();
    }

    public SetupInput(): void {
      this.on("mousedown", managers.Input.OnLeftMouseDown);
    }

    public Update(): void {
      this._ocean.Update();
      this._player.Update();
      this._island.Update();

      // check if player and island are colliding
      managers.Collision.Check(this._player, this._island);

      // Update Each cloud in the Cloud Array
      this._clouds.forEach(cloud => {
        cloud.Update();
        managers.Collision.Check(this._player, cloud);
      });

      this._enemy.Update();
      managers.Collision.Check(this._player, this._enemy);

      this._bulletManager.Update();
      this._bulletManager.Bullets.forEach(bullet => {
        managers.Collision.Check(this._player, bullet);
        managers.Collision.Check(bullet, this._enemy);
      });
    }

    public Destroy(): void {
      this.removeAllChildren();
      this._engineSound.stop();
      this.off("mousedown", managers.Input.OnLeftMouseDown);
    }

    public Reset(): void {}

    public Main(): void {
      // adds ocean to the scene
      this.addChild(this._ocean);

      // adds island to the scene
      this.addChild(this._island);

      this.addChild(this._enemy);

      // adds player to the scene
      this.addChild(this._player);

      // adds bullets to the scene
      this._bulletManager.Bullets.forEach(bullet => {
        this.addChild(bullet);
      });

      // adds Each Cloud in the Cloud Array to the Scene
      this._clouds.forEach(cloud => {
        this.addChild(cloud);
      });

      // add ScoreBoard UI to the Scene
      managers.Game.scoreBoard.AddGameUI(this);
    }
  }
}
