<template>
    <div id="plane">
        <div id="game" class="game"></div>
    </div>
</template>
<style lang="less">
    #plane{
        canvas {
            margin: 0 auto;
        }
        .logo {
            position: absolute;
            left: -1000px;
            top: -1000px;
        }
        .share {
            position: absolute;
            width: 100%;
            height: 100%;
            display: none;
            z-index: 2;
        }
        .share img {
            position: absolute;
        }
        .share .sharepng {
            width: 100%;
            height: 100%;
            top: 0px;
            left: 0px;
        }
        .game {
            position: absolute;
            width: 100%;
            height: 100%;
        }
    }
</style>
<script>
    import bg from '../../img/assets/bg.jpg';
    import preloader from '../../img/assets/preloader.gif';
//    import copyright from '../../img/assets/copyright.png';
    import myplane from '../../img/assets/myplane.png';
    import startbutton from '../../img/assets/startbutton.png';
    import replaybutton from '../../img/assets/replaybutton.png';
//    import sharebutton from '../../img/assets/sharebutton.png';
    import mybullet from '../../img/assets/mybullet.png';
    import bullet from '../../img/assets/bullet.png';
    import enemy1 from '../../img/assets/enemy1.png';
    import enemy2 from '../../img/assets/enemy2.png';
    import enemy3 from '../../img/assets/enemy3.png';
    import explode1 from '../../img/assets/explode1.png';
    import explode2 from '../../img/assets/explode2.png';
    import explode3 from '../../img/assets/explode3.png';
    import myexplode from '../../img/assets/myexplode.png';
    import award from '../../img/assets/award.png';
    import normalback from '../../img/assets/normalback.mp3';
    import playback from '../../img/assets/playback.mp3';
    import fashe from '../../img/assets/fashe.mp3';
    import crash1 from '../../img/assets/crash1.mp3';
    import crash2 from '../../img/assets/crash2.mp3';
    import crash3 from '../../img/assets/crash3.mp3';
    import ao from '../../img/assets/ao.mp3';
    import pi from '../../img/assets/pi.mp3';
    import deng from '../../img/assets/deng.mp3';
    export default{
        //数据处理
        data(){
            return {}
        },
        //引用的组件
        components: {},
        //方法
        methods: {},
        //生命周期
        created(){
            // 分数
            var score = 0;

            var w = document.documentElement.scrollWidth || document.body.scrollWidth;
            var h = document.documentElement.scrollHeight || document.body.scrollHeight;

            var game = new Phaser.Game(w, h, Phaser.CANVAS, 'game');

            game.States = {};
            function Enemy(config) {
                this.init = function() {
                    this.enemys = game.add.group();
                    this.enemys.enableBody = true;
                    this.enemys.createMultiple(config.selfPool, config.selfPic);
                    this.enemys.setAll('outOfBoundsKill', true);
                    this.enemys.setAll('checkWorldBounds', true);
                    // 敌人的子弹
                    this.enemyBullets = game.add.group();
                    this.enemyBullets.enableBody = true;
                    this.enemyBullets.createMultiple(config.bulletsPool, config.bulletPic);
                    this.enemyBullets.setAll('outOfBoundsKill', true);
                    this.enemyBullets.setAll('checkWorldBounds', true);
                    // 敌人的随机位置范围
                    this.maxWidth = game.width - game.cache.getImage(config.selfPic).width;
                    // 产生敌人的定时器
                    game.time.events.loop(Phaser.Timer.SECOND * config.selfTimeInterval, this.generateEnemy, this);
                    // 敌人的爆炸效果
                    this.explosions = game.add.group();
                    this.explosions.createMultiple(config.explodePool, config.explodePic);
                    this.explosions.forEach(function(explosion) {
                        explosion.animations.add(config.explodePic);
                    }, this);
                }
                // 产生敌人
                this.generateEnemy = function() {
                    var e = this.enemys.getFirstExists(false);
                    if(e) {
                        e.reset(game.rnd.integerInRange(0, this.maxWidth), -game.cache.getImage(config.selfPic).height);
                        e.life = config.life;
                        e.body.velocity.y = config.velocity;
                    }
                }
                // 敌人开火
                this.enemyFire = function() {
                    this.enemys.forEachExists(function(enemy) {
                        var bullet = this.enemyBullets.getFirstExists(false);
                        if(bullet) {
                            if(game.time.now > (enemy.bulletTime || 0)) {
                                bullet.reset(enemy.x + config.bulletX, enemy.y + config.bulletY);
                                bullet.body.velocity.y = config.bulletVelocity;
                                enemy.bulletTime = game.time.now + config.bulletTimeInterval;
                            }
                        }
                    }, this);
                };
                // 打中了敌人
                this.hitEnemy = function(myBullet, enemy) {
                    try {
                        config.firesound.play();
                    } catch(e) {}
                    myBullet.kill();
                    enemy.life--;
                    if(enemy.life <= 0) {
                        try {
                            config.crashsound.play();
                        } catch(e) {}
                        enemy.kill();
                        var explosion = this.explosions.getFirstExists(false);
                        explosion.reset(enemy.body.x, enemy.body.y);
                        explosion.play(config.explodePic, 30, false, true);
                        score += config.score;
                        config.game.updateText();
                    }
                };
            }
            game.States.boot = function() {
                this.preload = function() {
                    if(typeof(GAME) !== "undefined") {
                        this.load.baseURL = GAME + "/";
                    }
                    if(!game.device.desktop){
                        this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
                        this.scale.forcePortrait = true;
                        this.scale.refresh();
                    }
                    game.load.image('loading', preloader);
                };
                this.create = function() {
                    game.state.start('preload');
                };
            };

            game.States.preload = function() {
                this.preload = function() {
                    var preloadSprite = game.add.sprite(10, game.height/2, 'loading');
                    game.load.setPreloadSprite(preloadSprite);
                    game.load.image('background', bg);
//                    game.load.image('copyright', copyright);
                    game.load.spritesheet('myplane', myplane, 40, 40, 4);
                    game.load.spritesheet('startbutton', startbutton, 100, 40, 2);
                    game.load.spritesheet('replaybutton', replaybutton, 80, 30, 2);
//                    game.load.spritesheet('sharebutton', sharebutton, 80, 30, 2);
                    game.load.image('mybullet', mybullet);
                    game.load.image('bullet', bullet);
                    game.load.image('enemy1', enemy1);
                    game.load.image('enemy2', enemy2);
                    game.load.image('enemy3', enemy3);
                    game.load.spritesheet('explode1', explode1, 20, 20, 3);
                    game.load.spritesheet('explode2', explode2, 30, 30, 3);
                    game.load.spritesheet('explode3', explode3, 50, 50, 3);
                    game.load.spritesheet('myexplode', myexplode, 40, 40, 3);
                    game.load.image('award', award);
                    game.load.audio('normalback', normalback);
                    game.load.audio('playback', playback);
                    game.load.audio('fashe', fashe);
                    game.load.audio('crash1', crash1);
                    game.load.audio('crash2', crash2);
                    game.load.audio('crash3', crash3);
                    game.load.audio('ao', ao);
                    game.load.audio('pi', pi);
                    game.load.audio('deng', deng);
                };
                this.create = function() {
                    game.state.start('main');
                };
            };

            game.States.main = function() {
                this.create = function() {
                    // 背景
                    var bg = game.add.tileSprite(0, 0, w, h, 'background');
                    // 版权
//                    this.copyright = game.add.image(12, game.height - 16, 'copyright');
                    // 我的飞机
                    this.myplane = game.add.sprite(100, 100, 'myplane');
                    this.myplane.animations.add('fly');
                    this.myplane.animations.play('fly', 12, true);
                    // 开始按钮
                    this.startbutton = game.add.button(70, 200, 'startbutton', this.onStartClick, this, 1, 1, 0);
                    // 背景音乐
                    this.normalback = game.add.audio('normalback', 0.2, true);
                    this.normalback.play();
                };
                this.onStartClick = function() {
                    game.state.start('start');
                    this.normalback.stop();
                };
            };

            game.States.start = function() {
                this.create = function() {
                    // 物理系统
                    game.physics.startSystem(Phaser.Physics.ARCADE);
                    // 背景
                    var bg = game.add.tileSprite(0, 0, game.width, game.height, 'background');
                    bg.autoScroll(0, 20);
                    // 我的飞机
                    this.myplane = game.add.sprite(100, 100, 'myplane');
                    this.myplane.animations.add('fly');
                    this.myplane.animations.play('fly', 12, true);
                    game.physics.arcade.enable(this.myplane);
                    this.myplane.body.collideWorldBounds = true;
                    this.myplane.level = 2;
                    // 动画
                    var tween = game.add.tween(this.myplane).to({y: game.height - 40}, 1000, Phaser.Easing.Sinusoidal.InOut, true);
                    tween.onComplete.add(this.onStart, this);
                    // 背景音乐
                    this.playback = game.add.audio('playback', 0.2, true);
                    this.playback.play();
                    // 开火音乐
                    this.pi = game.add.audio('pi', 1, false);
                    // 打中敌人音乐
                    this.firesound = game.add.audio('fashe', 5, false);
                    // 爆炸音乐
                    this.crash1 = game.add.audio('crash1', 10, false);
                    this.crash2 = game.add.audio('crash2', 10, false);
                    this.crash3 = game.add.audio('crash3', 20, false);
                    // 挂了音乐
                    this.ao = game.add.audio('ao', 10, false);
                    // 接到了奖音乐
                    this.deng = game.add.audio('deng', 10, false);
                };
                this.onStart = function() {
                    // 我的子弹
                    this.mybullets = game.add.group();
                    this.mybullets.enableBody = true;
                    this.mybullets.createMultiple(50, 'mybullet');
                    this.mybullets.setAll('outOfBoundsKill', true);
                    this.mybullets.setAll('checkWorldBounds', true);
                    this.myStartFire = true;
                    this.bulletTime = 0;
                    // 我的飞机允许拖拽
                    this.myplane.inputEnabled = true;
                    this.myplane.input.enableDrag(false);
                    // 奖
                    this.awards = game.add.group();
                    this.awards.enableBody = true;
                    this.awards.createMultiple(1, 'award');
                    this.awards.setAll('outOfBoundsKill', true);
                    this.awards.setAll('checkWorldBounds', true);
                    this.awardMaxWidth = game.width - game.cache.getImage('award').width;
                    game.time.events.loop(Phaser.Timer.SECOND * 30, this.generateAward, this);
                    // 分数
                    var style = {font: "16px Arial", fill: "#ff0000"};
                    this.text = game.add.text(0, 0, "Score: 0", style);
                    score = 0;
                    // 敌机
                    var enemyTeam = {
                        enemy1: {
                            game: this,
                            selfPic: 'enemy1',
                            bulletPic: 'bullet',
                            explodePic: 'explode1',
                            selfPool: 10,
                            bulletsPool: 50,
                            explodePool: 10,
                            life: 2,
                            velocity: 50,
                            bulletX: 9,
                            bulletY: 20,
                            bulletVelocity: 200,
                            selfTimeInterval: 2,
                            bulletTimeInterval: 1000,
                            score: 10,
                            firesound: this.firesound,
                            crashsound: this.crash1
                        },
                        enemy2: {
                            game: this,
                            selfPic: 'enemy2',
                            bulletPic: 'bullet',
                            explodePic: 'explode2',
                            selfPool: 10,
                            bulletsPool: 50,
                            explodePool: 10,
                            life: 3,
                            velocity: 40,
                            bulletX: 13,
                            bulletY: 30,
                            bulletVelocity: 250,
                            selfTimeInterval: 3,
                            bulletTimeInterval: 1200,
                            score: 20,
                            firesound: this.firesound,
                            crashsound: this.crash2
                        },
                        enemy3: {
                            game: this,
                            selfPic: 'enemy3',
                            bulletPic: 'bullet',
                            explodePic: 'explode3',
                            selfPool: 5,
                            bulletsPool: 25,
                            explodePool: 5,
                            life: 10,
                            velocity: 30,
                            bulletX: 22,
                            bulletY: 50,
                            bulletVelocity: 300,
                            selfTimeInterval: 10,
                            bulletTimeInterval: 1500,
                            score: 50,
                            firesound: this.firesound,
                            crashsound: this.crash3
                        }
                    }
                    this.enemy1 = new Enemy(enemyTeam.enemy1);
                    this.enemy1.init();
                    this.enemy2 = new Enemy(enemyTeam.enemy2);
                    this.enemy2.init();
                    this.enemy3 = new Enemy(enemyTeam.enemy3);
                    this.enemy3.init();
                };
                // 产生一个奖
                this.generateAward = function() {
                    var award = this.awards.getFirstExists(false);
                    if(award) {
                        award.reset(game.rnd.integerInRange(0, this.awardMaxWidth), -game.cache.getImage('award').height);
                        award.body.velocity.y = 500;
                    }
                };
                // 自己开火
                this.myFireBullet = function() {
                    if(this.myplane.alive && game.time.now > this.bulletTime) {
                        try {
                            this.pi.play();
                        } catch(e) {}
                        var bullet;
                        bullet = this.mybullets.getFirstExists(false);
                        if(bullet) {
                            bullet.reset(this.myplane.x + 16, this.myplane.y - 15);
                            bullet.body.velocity.y = -400;
                            this.bulletTime = game.time.now + 200;
                        }
                        if(this.myplane.level >= 2) {
                            bullet = this.mybullets.getFirstExists(false);
                            if(bullet) {
                                bullet.reset(this.myplane.x + 16, this.myplane.y - 15);
                                bullet.body.velocity.y = -400;
                                bullet.body.velocity.x = -40;
                                this.bulletTime = game.time.now + 200;
                            }
                            bullet = this.mybullets.getFirstExists(false);
                            if(bullet) {
                                bullet.reset(this.myplane.x + 16, this.myplane.y - 15);
                                bullet.body.velocity.y = -400;
                                bullet.body.velocity.x = 40;
                                this.bulletTime = game.time.now + 200;
                            }
                        }
                        if(this.myplane.level >= 3) {
                            bullet = this.mybullets.getFirstExists(false);
                            if(bullet) {
                                bullet.reset(this.myplane.x + 16, this.myplane.y - 15);
                                bullet.body.velocity.y = -400;
                                bullet.body.velocity.x = -80;
                                this.bulletTime = game.time.now + 200;
                            }
                            bullet = this.mybullets.getFirstExists(false);
                            if(bullet) {
                                bullet.reset(this.myplane.x + 16, this.myplane.y - 15);
                                bullet.body.velocity.y = -400;
                                bullet.body.velocity.x = 80;
                                this.bulletTime = game.time.now + 200;
                            }
                        }
                    }
                };
                // 被敌机打中
                this.hitMyplane = function(myplane, bullet) {
                    bullet.kill();
                    if(myplane.level > 1) {
                        myplane.level--;
                    } else {
                        myplane.kill();
                        this.dead();
                    }
                };
                // 与敌机撞击
                this.crashMyplane = function(myplane, enemy) {
                    myplane.kill();
                    this.dead();
                }
                // 得奖了
                this.getAward = function(myplane, award) {
                    award.kill();
                    try {
                        this.deng.play();
                    } catch(e) {}
                    if(myplane.level < 3) {
                        myplane.level++;
                    }
                };
                // 更新分数
                this.updateText = function() {
                    this.text.setText("Score: " + score);
                };
                // 挂了
                this.dead = function() {
                    try {
                        this.ao.play();
                    } catch(e) {}
                    var myexplode = game.add.sprite(this.myplane.x, this.myplane.y, 'myexplode');
                    var anim = myexplode.animations.add('myexplode');
                    myexplode.animations.play('myexplode', 30, false, true);
                    anim.onComplete.add(this.gotoOver, this);
                };
                // 跳转到Over场景
                this.gotoOver = function() {
                    this.playback.stop();
                    game.state.start('over');
                };
                // 更新函数
                this.update = function() {
                    if(this.myStartFire) {
                        this.myFireBullet();
                        this.enemy1.enemyFire();
                        this.enemy2.enemyFire();
                        this.enemy3.enemyFire();
                        // 碰撞检测
                        game.physics.arcade.overlap(this.mybullets, this.enemy1.enemys, this.enemy1.hitEnemy, null, this.enemy1);
                        game.physics.arcade.overlap(this.mybullets, this.enemy2.enemys, this.enemy2.hitEnemy, null, this.enemy2);
                        game.physics.arcade.overlap(this.mybullets, this.enemy3.enemys, this.enemy3.hitEnemy, null, this.enemy3);
                        game.physics.arcade.overlap(this.enemy1.enemyBullets, this.myplane, this.hitMyplane, null, this);
                        game.physics.arcade.overlap(this.enemy2.enemyBullets, this.myplane, this.hitMyplane, null, this);
                        game.physics.arcade.overlap(this.enemy3.enemyBullets, this.myplane, this.hitMyplane, null, this);
                        game.physics.arcade.overlap(this.enemy1.enemys, this.myplane, this.crashMyplane, null, this);
                        game.physics.arcade.overlap(this.enemy2.enemys, this.myplane, this.crashMyplane, null, this);
                        game.physics.arcade.overlap(this.enemy3.enemys, this.myplane, this.crashMyplane, null, this);
                        game.physics.arcade.overlap(this.awards, this.myplane, this.getAward, null, this);
                    }
                };
            };

            game.States.over = function() {
                this.create = function() {
                    // 背景
                    var bg = game.add.tileSprite(0, 0, game.width, game.height, 'background');
                    // 版权
//                    this.copyright = game.add.image(12, game.height - 16, 'copyright');
                    // 我的飞机
                    this.myplane = game.add.sprite(100, 100, 'myplane');
                    this.myplane.animations.add('fly');
                    this.myplane.animations.play('fly', 12, true);
                    // 分数
                    var style = {font: "bold 32px Arial", fill: "#ff0000", boundsAlignH: "center", boundsAlignV: "middle"};
                    this.text = game.add.text(0, 0, "Score: " + score, style);
                    this.text.setTextBounds(0, 0, game.width, game.height);
                    // 重来按钮
                    this.replaybutton = game.add.button(30, 300, 'replaybutton', this.onReplayClick, this, 0, 0, 1);
                    // 分享按钮
//                    this.sharebutton = game.add.button(130, 300, 'sharebutton', this.onShareClick, this, 0, 0, 1);
                    // 背景音乐
                    this.normalback = game.add.audio('normalback', 0.2, true);
                    this.normalback.play();
                };
                // 重来
                this.onReplayClick = function() {
                    this.normalback.stop();
                    game.state.start('start');
                };
                // 分享
                this.onShareClick = function() {
                    document.title = makeTitle(score);
                    document.getElementById('share').style.display = 'block';
                };
            }

            game.state.add('boot', game.States.boot);
            game.state.add('preload', game.States.preload);
            game.state.add('main', game.States.main);
            game.state.add('start', game.States.start);
            game.state.add('over', game.States.over);

            game.state.start('boot');
        },
        computed: {},
        mounted(){


        }
    }
</script>
