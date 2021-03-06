module managers {
    export class Collision {
        // private instance variables

        // public properties

        // constructor

        // private methods

        // public methods
        public static Check(object1: objects.GameObject, object2: objects.GameObject): void {

            if (!object2.IsColliding) {
                let distance = util.Vector2.Distance(object1.Position, object2.Position);
                let totalHeight = object1.HalfHeight + object2.HalfHeight;
                // check if object 1 is colliding with object 2
                if (distance < totalHeight) {
                    object2.IsColliding = true;

                    switch(object2.name) {
                        case "island":
                            let yaySound = createjs.Sound.play("yaySound");
                            yaySound.volume = 0.1;
                            managers.Game.scoreBoard.Score += 100;
                        break;
                        case "cloud":
                            let thunderSound = createjs.Sound.play("thunderSound");
                            thunderSound.volume = 0.1;
                            managers.Game.scoreBoard.Lives -= 1;

                        break;
                        case "enemy":
                            if(object1.name == "bullet") {
                                    let explosionSound = createjs.Sound.play("explosionSound");
                                    explosionSound.volume = 0.1;
                                    managers.Game.scoreBoard.Score += 100;
                                    object2.Reset();
                                    object1.Reset();
                                    console.log("enemy hit by bullet");
                            }
                            else
                            {
                                let explosionSound = createjs.Sound.play("explosionSound");
                                explosionSound.volume = 0.1;
                                managers.Game.scoreBoard.Lives -=1;
                            }
                            


                        break;

                        case "bullet":
                            let explosionSound = createjs.Sound.play("explosionSound");
                            explosionSound.volume = 0.1;
                            managers.Game.scoreBoard.Lives -=1;
                            object2.Reset();
                        break;
                    }

                    if(managers.Game.scoreBoard.Lives <= 0) {
                        managers.Game.currentState = config.Scene.OVER;
                        if(managers.Game.scoreBoard.HighScore <= managers.Game.scoreBoard.Score) {
                            managers.Game.scoreBoard.HighScore = managers.Game.scoreBoard.Score;
                        }
                    }
                }
            }


        }
    }
}