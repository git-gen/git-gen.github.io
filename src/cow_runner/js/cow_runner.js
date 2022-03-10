import bgm from './../sound/cow_runner_bgm.mp3'
import bruh from './../sound/bruh.mp3'
import titleCow from './../image/title_cow.png'
import player from './../image/player.png'
import cow1 from './../image/cow1.png'
import cow2 from './../image/cow2.png'
import cow3 from './../image/cow3.png'
import cow4 from './../image/cow4.png'
import background from './../image/background.png'

// グローバルに展開
phina.globalize()

const SCREEN_WIDTH = 640
const SCREEN_HEIGHT = 960
const PLAYER_POSITION = 800
const ASSETS = {
  sound: {
    'bgm': bgm,
    'bruh': bruh,
  },
  image: {
    'titleCow': titleCow,
    'player': player,
    'cow1': cow1,
    'cow2': cow2,
    'cow3': cow3,
    'cow4': cow4,
    'background': background
  },
}

/*
 * タイトル
 */
phina.define("Title", {
  superClass: 'DisplayScene',
  init: function() {
    // 親クラス初期化
    this.superInit();

    // 背景
    Sprite('background').addChildTo(this).setPosition(this.gridX.center(), this.gridY.center());

    // ラベル
    Label({
      text: '牛を避けるだけのゲーム',
      fontSize: 48,
      fill: '#000000',
    }).addChildTo(this).setPosition(this.gridX.center(), this.gridY.span(4));

    Sprite('titleCow', 256, 256).addChildTo(this).setPosition(this.gridX.center(), this.gridY.center());

    Label({
      text: 'タップしてスタート',
      fontSize: 32,
      fill: '#808080',
    }).addChildTo(this).setPosition(this.gridX.center(), this.gridY.span(12));
  },

  // タッチで次のシーンへ
  onpointstart: function() {
    SoundManager.playMusic('bgm');
    this.exit();
  },
});

/*
 * リザルト
 */
phina.define("Result", {
  superClass: 'DisplayScene',
  init: function(params) {
    // 親クラス初期化
    this.superInit(params);

    // 背景
    Sprite('background').addChildTo(this).setPosition(this.gridX.center(), this.gridY.center());

    // 評価テキスト
    Label({
      text: '評価',
      fontSize: 24,
    }).addChildTo(this).setPosition(this.gridX.center(), this.gridY.span(7));

    // 評価
    Label({
      text: '避けた牛の数：' + params.score,
      fontSize: 48,
      fill: '#000000',
    }).addChildTo(this).setPosition(this.gridX.center(), this.gridY.span(4));

    let result = ''
    if (params.score <= 10) {
      result = '💩'
    } else if (params.score > 10 && params.score <= 30) {
      result = '😕'
    } else if (params.score > 30 && params.score <= 50) {
      result = '😯'
    } else if (params.score > 50 && params.score <= 70) {
      result = '😀'
    } else if (params.score > 70 && params.score <= 90) {
      result = '😏'
    } else if (params.score > 90 && params.score <= 110) {
      result = '😎'
    } else if (params.score > 110 && params.score <= 200) {
      result = '🐄'
    } else if (params.score > 200) {
      result = '👑'
    }

    // ラベル
    Label({
      text: result,
      fontSize: 64,
    }).addChildTo(this).setPosition(this.gridX.center(), this.gridY.center());


    const tweet = Button({text: "ツイート", fill: '#4682b4'})
      .setPosition(this.gridX.span(4), this.gridY.span(12))
      .addChildTo(this)
      .on('push', ()=> {
        const text = 'スコア: {0}\n{1}'.format(params.score, '牛を避けるだけのゲーム');
        const url = phina.social.Twitter.createURL({
          text: text,
          hashtags: '牛を避けるだけのゲーム',
          url: 'https://git-gen.github.io/cow_runner',
        });
        window.open(url, 'share window', 'width=480, height=320');
      });

    const play = Button({text: "プレイ", fill: '#4682b4'})
      .setPosition(this.gridX.span(12), this.gridY.span(12))
      .addChildTo(this)
      .on('push', ()=> {
        this.exit()
      });

  }
});

/*
 * メイン
 */
phina.define('Main', {
  superClass: 'DisplayScene',
  init: function() {
    this.superInit({
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT,
    })

    // 背景
    Sprite('background').addChildTo(this).setPosition(this.gridX.center(), this.gridY.center());

    // スコア
    this.score = 0
    this.scoreLabel = Label(this.score).addChildTo(this)
    this.scoreLabel.x = this.gridX.center()
    this.scoreLabel.y = this.gridY.span(1)

    this.bombGroup = DisplayElement().addChildTo(this)

    // プレイヤー
    this.player = Sprite('player', 40, 60).addChildTo(this)
    this.player.setPosition(320, PLAYER_POSITION)
  },
  // 毎フレーム更新処理
  update(app) {
    const p = app.pointer
    if (p.getPointing()) {
      if (p.x < 0) {
        this.player.setPosition(0, PLAYER_POSITION)
      } else if (p.x > 640) {
        this.player.setPosition(640, PLAYER_POSITION)
      } else {
        this.player.setPosition(p.x, PLAYER_POSITION)
      }
    }

    this.bombGroup.children.forEach(
      function (bomb) {
        if (this.height < bomb.y) {
          this.score += 1
          this.scoreLabel.text = this.score
          bomb.remove()
        }
        if (this.player.hitTestElement(bomb)) {
          this.gameover()
        }
      }.bind(this)
    )

    if (app.frame % 5 === 0) {
      this.spawnBomb()
    }
  },
  // 爆弾スポーン
  spawnBomb() {
    const x = Math.randint(0, this.width)
    const y = -100
    Bomb(x, y).addChildTo(this.bombGroup)
  },
  // ゲームオーバー
  gameover() {
    SoundManager.setVolume(2);
    SoundManager.play('bruh');
    this.exit({
      score: this.score,
    })
  },
})

/*
 * 爆弾
 */
phina.define('Bomb', {
  superClass: 'phina.display.Sprite',

  init(x, y) {
    const randomType = Math.randint(1, 4)
    switch (randomType) {
      case 1:
        this.superInit('cow1', 64, 52)
        break;
      case 2:
        this.superInit('cow2', 128, 52)
        break;
      case 3:
        this.superInit('cow3', 64, 52)
        break;
      case 4:
        this.superInit('cow4', 128, 52)
        break;
    }

    const randomAccel = Math.randint(10, 80)
    this.accel = randomAccel
    this.setPosition(x, y)
  },

  update() {
    this.y += this.accel
  },
})

/*
 * メイン処理
 */
phina.main(function () {
  // アプリケーションを生成
  const app = GameApp({
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    assets: ASSETS,
    debug: false,
    startLabel: 'Title',
    scenes: [
      {
        className: 'Title',
        label: 'Title',
        nextLabel: 'Main',
      },
      {
        className: 'Main',
        label: 'Main',
        nextLabel: 'Result',
      },
      {
        className: 'Result',
        label: 'Result',
        nextLabel: 'Main',
      },
    ]
  })

  app.domElement.addEventListener('touchend', function dummy() {
    const s = phina.asset.Sound();
    s.loadFromBuffer();
    s.play().stop();
    app.domElement.removeEventListener('touchend', dummy);
  });

  // 実行
  app.run()
})
