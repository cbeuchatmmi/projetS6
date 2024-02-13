import { Scene, Tweens } from 'phaser'
import axios from 'axios' // Importez axios si vous utilisez cet outil pour les requêtes HTTP


export default class PlayScene extends Scene {
  constructor() {
    super({ key: 'PlayScene' });
    this.player = null;
    this.platforms = null;
    this.cursors = null;
    this.cheese = null;
    this.Win = false;
    this.gameTimer = null;
    this.elapsedMilliseconds = 0;
    this.timerText = null;

    this.score = { score_time: '', user_id: '', level_id: '2' };

    // Récupérer userId depuis le localStorage
    const userId = localStorage.getItem('userId');


    this.addScore = async (userId) => {
      this.score.user_id = userId;
      try {
        const response = await axios.post(import.meta.env.VITE_API_URL + '/score/add', this.score);
        console.log('Score ajouté avec succès!');
        this.score = { score_time: this.timerText.text, user_id: userId, level_id: '2' };
        console.log('userId', userId);
      } catch (error) {
        if (error.response) {
          console.log('Erreur lors de l\'ajout du score : ', error.response.data.error);
        } else {
          console.log('Erreur lors de l\'ajout du score : ', error.message);
        }
      }
    };


  }





  create() {

    // Créer l'image de fond blanche et la stocker dans une variable
    var whiteBackground = this.add.image(400, 400, 'white').setDepth(0); // Optionnel, car par défaut la profondeur est 0


    // // Planifier le remplacement de l'image de fond blanche par l'image noire après 2 secondes (2000 millisecondes)
    this.time.delayedCall(2000, function () {
      // Détruire l'image de fond blanche pour qu'elle disparaisse
      whiteBackground.destroy();

      // Créer l'image de fond noire
      this.add.image(400, 400, 'black').setDepth(1);
    }, [], this);

    // The platforms group contains the wall and the 2 ledges we can jump on
    this.platforms = this.physics.add.staticGroup();

    this.platforms.create(32, 493, 'wall1');
    this.platforms.create(71, 537, 'wall2');
    this.platforms.create(149, 507, 'wall3');
    this.platforms.create(110, 658, 'wall4');
    this.platforms.create(149, 695, 'wall5');
    this.platforms.create(422, 731, 'wall6');
    this.platforms.create(708, 500, 'wall7');
    this.platforms.create(561, 475, 'wall8');
    this.platforms.create(630, 733, 'wall9');
    this.platforms.create(570, 656, 'wall10');
    this.platforms.create(639, 578, 'wall11');
    this.platforms.create(483, 656, 'wall12');
    this.platforms.create(413, 578, 'wall13');
    this.platforms.create(149, 319, 'wall14');
    this.platforms.create(288, 241, 'wall15');
    this.platforms.create(366, 172, 'wall16');
    this.platforms.create(444, 280, 'wall17');
    this.platforms.create(444, 488, 'wall18');
    this.platforms.create(678, 664, 'wall19');
    this.platforms.create(678, 332, 'wall20');
    this.platforms.create(678, 125, 'wall21');
    this.platforms.create(600, 518, 'wall22');
    this.platforms.create(522, 633, 'wall23');
    this.platforms.create(383, 664, 'wall24');
    this.platforms.create(708, 69, 'wall25');
    this.platforms.create(336, 8, 'wall26');
    this.platforms.create(522, 85, 'wall27');
    this.platforms.create(552, 163, 'wall28');
    this.platforms.create(72, 289, 'wall29');
    this.platforms.create(72, 124, 'wall30');
    this.platforms.create(600, 250, 'wall31');
    this.platforms.create(522, 310, 'wall32');
    this.platforms.create(141, 241, 'wall33');
    this.platforms.create(552, 397, 'wall34');
    this.platforms.create(210, 85, 'wall35');
    this.platforms.create(141, 163, 'wall36');
    this.platforms.create(189, 337, 'wall37');
    this.platforms.create(249, 415, 'wall38');
    this.platforms.create(296, 493, 'wall39');
    this.platforms.create(305, 621, 'wall40');
    this.platforms.create(227, 651, 'wall41');
    this.platforms.create(71, 725, 'wall42');

    // The player and its settings
    this.player = this.physics.add.sprite(720, 100, 'rat').setDepth(10); // Assurez-vous que le joueur est devant le fond
    this.player.setFrame(0);
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);


    this.physics.add.collider(this.player, this.platforms);

    // var cheese; // Remove this line
    this.cheese = this.physics.add.sprite(710, 30, 'cheese').setDepth(10); // Assurez-vous que le fromage est devant le fond
    this.cheese.setScale(1);
    this.cheese.setCollideWorldBounds(true);
    this.cheese.setSize(60, 50);

    this.physics.add.collider(this.player, this.cheese, this.hitCheese, null, this);

    // Our player animations, turning, walking left and walking right.
    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('rat', { start: 2, end: 3 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'turn',
      frames: [{ key: 'rat', frame: 0 }],
      frameRate: 20
    });

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('rat', { start: 4, end: 5 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'up',
      frames: this.anims.generateFrameNumbers('rat', { start: 6, end: 8 }),
      frameRate: 10,
      onComplete: function () {
        this.player.anims.play('up');
      }
    });
    this.anims.create({
      key: 'down',
      frames: this.anims.generateFrameNumbers('rat', { start: 0, end: 1 }),
      frameRate: 10,
      onComplete: function () {
        this.player.anims.play('down');
      }
    });

    // Input Events
    this.cursors = this.input.keyboard.createCursorKeys();

    this.resetTimer(this);



  }

  update() {

    if (!this.Win) {

      if (this.cursors.left.isDown) {
        this.player.setVelocityX(-160);
        this.player.anims.play('left', true);
      }
      else if (this.cursors.right.isDown) {
        this.player.setVelocityX(160);
        this.player.anims.play('right', true);
      } else if (this.cursors.up.isDown) {
        this.player.setVelocityY(-160);
        this.player.anims.play('up', true);
      }
      else if (this.cursors.down.isDown) {
        this.player.setVelocityY(160);
        this.player.anims.play('down', true);
      }
      else {
        this.player.setVelocityX(0);
        this.player.setVelocityY(0);
        this.player.anims.play('turn');
      }
    }


  }


  hitCheese(player, cheese) {
    if (!this.Win) {
      this.Win = true; // Définir Win sur true pour empêcher les appels supplémentaires à addScore
      this.gameTimer.destroy();
      console.log(this.timerText.text)
      this.score.score_time = this.timerText.text; // Utilisez this.score au lieu de score
      const userId = localStorage.getItem('userId'); // Récupérer userId depuis le localStorage
      this.addScore(userId); // Appel de addScore lorsque les conditions sont remplies
      this.add.text(400, 400, 'Félicitations', { fontSize: '64px', fill: '#fff' }).setOrigin(0.5);
      this.time.delayedCall(1000, function () {
        this.scene.pause();
        this.events.off('update', this.update, this);
      }, [], this);
    }
  }


  updateTimer() {

    this.elapsedMilliseconds += 10;
    var elapsedSeconds = Math.floor(this.elapsedMilliseconds / 1000);
    var elapsedMinutes = Math.floor(elapsedSeconds / 60);
    var displaySeconds = elapsedSeconds % 60;
    var displayMilliseconds = this.elapsedMilliseconds % 1000;

    this.timerText.setText(elapsedMinutes + ':' +
      (displaySeconds < 10 ? '0' : '') + displaySeconds + ':' +
      (displayMilliseconds < 100 ? '0' : '') +
      (displayMilliseconds < 10 ? '0' : '') + displayMilliseconds).setDepth(10);
    ;

  }

  resetTimer() {
    this.elapsedMilliseconds = 0;

    if (this.timerText) {
      this.timerText.destroy();
    }

    var timeScale = 1; // Change timeScale à 1 pour un délai de 10 millisecondes
    this.gameTimer = this.time.addEvent({
      delay: 10 * timeScale,
      callback: this.updateTimer,
      callbackScope: this,
      loop: true
    });
    this.timerText = this.add.text(16, 48, 'Temps: 0:00:00', { fontSize: '32px', fill: '#fff' });
  }

}
