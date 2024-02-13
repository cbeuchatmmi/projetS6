import { Scene, Tweens } from 'phaser'
import axios from 'axios' // Importez axios si vous utilisez cet outil pour les requêtes HTTP


export default class PlayScene extends Scene {
  constructor() {
    super({ key: 'PlayScene' });
    this.birds = null;
    this.cage = null;
    this.cursors = null;
    this.elapsedMilliseconds = 0;
    this.gameOver = false;
    this.gameOverText = null;
    this.gameTimer = null;
    this.pierre = 0;
    this.pierreText = null;
    this.platforms = null;
    this.player = null;
    this.rock = null;
    this.sol = null;
    this.timerText = null;
    this.score = { score_time: '', user_id: '', level_id: '1' };

    // Récupérer userId depuis le localStorage
    const userId = localStorage.getItem('userId');


    this.addScore = async (userId) => {
      this.score.user_id = userId; // Utilisez userId directement, pas userId.value
      try {
        const response = await axios.post(import.meta.env.VITE_API_URL + '/score/add', this.score);
        console.log('Score ajouté avec succès!');
        this.score = { score_time: this.timerText.text, user_id: userId, level_id: '1' };
        console.log('userId', userId);
      } catch (error) {
        console.log('Erreur lors de l\'ajout du score : ', error.response.data.error);
      }
    };

  }





  create() {

    // A simple background for our game
    this.add.image(400, 300, 'sky');

    // The platforms group contains the ground and the 2 ledges we can jump on
    this.platforms = this.physics.add.staticGroup();

    // Here we create the ground.
    // Scale it to fit the width of the game (the original sprite is 400x32 in size)
    this.platforms.create(400, 700, 'ground').setScale(1).refreshBody();

    // Now let's create some ledges
    this.platforms.create(400, 350, 'platformsml');//Lui
    this.platforms.create(150, 280, 'platformsml');
    this.platforms.create(650, 280, 'platformsml');
    this.platforms.create(400, 180, 'platformsml');
    this.platforms.create(400, 560, 'platformmid');
    this.platforms.create(150, 450, 'platformmid');
    this.platforms.create(650, 450, 'platformmid');
    this.platforms.create(100, 100, 'platformbig');
    this.platforms.create(700, 100, 'platformbig');

    // The player and its settings
    this.player = this.physics.add.sprite(100, 600, 'raven');
    this.player.setFrame(0);
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);

    // Apply gravity to the player
    this.physics.world.gravity.y = 330;

    // Our player animations, turning, walking left and walking right.
    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('raven', { start: 3, end: 5 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'turn',
      frames: [{ key: 'raven', frame: 7 }],
      frameRate: 10
    });

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('raven', { start: 6, end: 8 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'jump',
      frames: this.anims.generateFrameNumbers('raven', { start: 9, end: 11 }),
      frameRate: 10,
      onComplete: function () {
        this.player.anims.play('jump');
      }
    });

    // Input Events
    this.cursors = this.input.keyboard.createCursorKeys();

    // Some rock to collect, 12 in total, evenly spaced 70 pixels apart along the x-axis
    this.rock = this.physics.add.group({
      key: 'rock',
      repeat: 0,
      setXY: { x: 750, y: 50, stepX: 70 }
    });

    this.rock.children.iterate(function (child) {
      // Give each rock a slightly different bounce
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });

    this.birds = this.physics.add.group();
    this.createBird(400, 100, 'type1');  // You can specify the initial position here
    this.createBird(400, 270, 'type2'); // Position initiale du deuxième oiseau


    // The pierre
    this.pierreText = this.add.text(16, 16, 'Pierre: 0', { fontSize: '32px', fill: '#000' });

    // Collide the player and the rock with the platforms
    this.physics.add.collider(this.player, this.platforms);
    this.physics.add.collider(this.rock, this.platforms);
    this.physics.add.collider(this.birds, this.platforms);

    // Checks to see if the player overlaps with any of the rock, if he does, call the collectRock function
    this.physics.add.overlap(this.player, this.rock, this.collectRock, null, this);

    this.cage = this.physics.add.sprite(400, 520, 'cage');
    this.cage.setScale(1);
    this.cage.setCollideWorldBounds(true);
    this.cage.setSize(60, 50);

    // Ajout d'une collision entre le joueur et la cage
    this.physics.add.overlap(this.player, this.cage, this.interactWithCage, null, this);

    // Ajout de la cage aux collisions avec les plateformes
    this.physics.add.collider(this.cage, this.platforms);

    // Appeler la fonction de réinitialisation du chronomètre
    this.resetTimer(this);


  }

  update() {
    if (this.gameOver) {
      return;
    }

    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160);
      this.player.anims.play('left', true);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160);
      this.player.anims.play('right', true);
    } else {
      this.player.setVelocityX(0);
      this.player.anims.play('turn');
    }

    if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-330);
      this.player.anims.play('jump', true);
    }
    var positionYConstante = 100;

    this.birds.getChildren().forEach(function (bird) {
      if (bird.getData('movementType') === 'type1') {
        bird.y = positionYConstante;
      }
    });

    this.physics.world.overlap(this.player, this.birds, this.gameOverHandler, null, this);
  }

  updateTimer() {
    if (!this.gameOver) {
      this.elapsedMilliseconds += 10;
      var elapsedSeconds = Math.floor(this.elapsedMilliseconds / 1000);
      var elapsedMinutes = Math.floor(elapsedSeconds / 60);
      var displaySeconds = elapsedSeconds % 60;
      var displayMilliseconds = this.elapsedMilliseconds % 1000;

      this.timerText.setText(elapsedMinutes + ':' +
        (displaySeconds < 10 ? '0' : '') + displaySeconds + ':' +
        (displayMilliseconds < 100 ? '0' : '') +
        (displayMilliseconds < 10 ? '0' : '') + displayMilliseconds);
    }
  }

  collectRock(player, rock) {
    rock.disableBody(true, true);
    this.pierre++; // Assurez-vous d'utiliser "this.pierre" pour accéder à la variable de la classe
    this.pierreText.setText('Pierre: ' + this.pierre); // Assurez-vous d'utiliser "this.pierreText"
  }


  createBird(x, y, movementType) {
    var bird = this.birds.create(x, y, 'bird');
    bird.setSize(30, 30);

    if (movementType === 'type1') {
      // Mouvement de type 1 : Aller-retour horizontal
      var endX1 = x + 150;
      var endY1 = y;
      var duration1 = 1500;
      var delay1 = 0;

      var endX2 = x - 150;
      var endY2 = y;
      var duration2 = 1500;
      var delay2 = 0;

      // Début du mouvement
      this.startMovementSequence(bird, [
        { x: endX1, y: endY1, duration: duration1, delay: delay1 },
        { x: endX2, y: endY2, duration: duration2, delay: delay2 },
      ]);
    } else if (movementType === 'type2') {
      // Movement type 2: Diagonal up and down
      var endX1 = x + 250;
      var endY1 = y + 50;
      var duration1 = 1000;
      var delay1 = 0;

      var endX2 = x - 250;
      var endY2 = y - 50;
      var duration2 = 2000;
      var delay2 = 0;

      var endX3 = x;
      var endY3 = y;
      var duration3 = 1000;
      var delay3 = 0;

      // Define the sequence of movements
      var movements = [
        { x: endX1, y: endY1, duration: duration1, delay: delay1 },
        { x: endX2, y: endY2, duration: duration2, delay: delay2 },
        { x: endX3, y: endY3, duration: duration3, delay: delay3 }
      ];

      // Start the first movement
      this.startMovementSequence(bird, movements);
    }
  }

  startMovementSequence(bird, movements) {
    var index = 0;

    // Function to recursively execute the movements
    var executeMovement = () => {
      var movement = movements[index];

      // Execute the current movement
      this.moveBird(bird, movement.x, movement.y, movement.duration, movement.delay, () => {
        // Move to the next movement in the sequence
        index = (index + 1) % movements.length;
        // Execute the next movement after the current one completes
        executeMovement();
      });
    };

    // Start the movement sequence
    executeMovement();
  }


  moveBird(bird, targetX, targetY, duration, delay, onComplete) {
    this.tweens.add({
      targets: bird,
      x: targetX,
      y: targetY,
      duration: duration,
      delay: delay,
      ease: 'Linear',
      onComplete: onComplete
    });
  }





  gameOverHandler(player, bird) {
    // Définir le jeu comme terminé
    this.gameOver = true;

    // Arrêter le mouvement des oiseaux
    this.birds.setVelocityX(0);
    this.birds.setVelocityY(0);

    // Détruire l'ancien timer
    if (this.gameTimer) {
      this.gameTimer.destroy();
    }

    // Réinitialiser le timer
    this.elapsedMilliseconds = 0;

    // Afficher un message de fin de jeu
    this.gameOverText = this.add.text(400, 400, 'Game Over', { fontSize: '64px', fill: '#000' }).setOrigin(0.5);

    // Réinitialiser la scène après un court délai
    this.time.delayedCall(1000, function () {
      // Réinitialiser le joueur
      this.player.setFrame(0);
      this.player.setVelocity(0);
      this.player.setX(100);
      this.player.setY(600);

      // Réinitialiser les rochers
      this.rock.children.iterate(function (child) {
        child.enableBody(true, child.x, 70, true, true);
      });

      // Réinitialiser les oiseaux
      this.birds.clear(true, true);
      this.createBird(400, 100, 'type1');
      this.createBird(400, 270, 'type2');

      // Réinitialiser d'autres variables si nécessaire
      this.gameOver = false;
      this.pierre = 0;
      this.pierreText.setText('Pierre: ' + this.pierre);

      // Détruire l'ancien texte "Game Over"
      if (this.gameOverText) {
        this.gameOverText.destroy();
      }

      // Réinitialiser le timer
      this.resetTimer.call(this);
    }, [], this);
  }

  interactWithCage(player, cage) {
    if (this.pierre === 1 && !this.scoreAdded) {
      this.scoreAdded = true; // Définir un indicateur pour éviter les appels répétés
      this.gameTimer.destroy();
      this.cage.setTexture('open');
      this.add.text(400, 400, 'Félicitations', { fontSize: '64px', fill: '#000' }).setOrigin(0.5);
      console.log(this.timerText.text);
      this.score.score_time = this.timerText.text; // Utilisez this.score au lieu de score
      const userId = localStorage.getItem('userId'); // Récupérer userId depuis le localStorage
      this.addScore(userId); // Appel de addScore lorsque les conditions sont remplies
      this.time.delayedCall(1000, function () {
        this.scene.pause();
        this.events.off('update', this.update, this);
      }, [], this);
    }
  }



  // Fonction pour réinitialiser le chronomètre
  resetTimer() {
    this.elapsedMilliseconds = 0;

    // Destroy the old timer text if it exists
    if (this.timerText) {
      this.timerText.destroy();
    }

    var timeScale = 1; // Set the time scale to 1 for real-time progression
    this.gameTimer = this.time.addEvent({
      delay: 10, // Keep the delay at 10 milliseconds
      callback: this.updateTimer,
      callbackScope: this,
      loop: true
    });

    // Assign the new timer text to this.timerText
    this.timerText = this.add.text(16, 48, 'Time: 0:00:00', { fontSize: '32px', fill: '#000' });
  }
}