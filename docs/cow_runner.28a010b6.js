parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"rnSf":[function(require,module,exports) {
module.exports="cow_runner_bgm.ee5f2e86.mp3";
},{}],"NGSU":[function(require,module,exports) {
module.exports="bruh.0b1d21ee.mp3";
},{}],"xLp4":[function(require,module,exports) {
module.exports="title_cow.0032a272.png";
},{}],"zu3H":[function(require,module,exports) {
module.exports="player.eeb272b9.png";
},{}],"PtQw":[function(require,module,exports) {
module.exports="cow1.546f40e1.png";
},{}],"X24M":[function(require,module,exports) {
module.exports="cow2.509e3cc0.png";
},{}],"NXWR":[function(require,module,exports) {
module.exports="cow3.c71240cd.png";
},{}],"yZVk":[function(require,module,exports) {
module.exports="cow4.9423fe25.png";
},{}],"Ywbv":[function(require,module,exports) {
module.exports="background.ad89801c.png";
},{}],"rYwD":[function(require,module,exports) {
"use strict";var i=d(require("./../sound/cow_runner_bgm.mp3")),e=d(require("./../sound/bruh.mp3")),t=d(require("./../image/title_cow.png")),s=d(require("./../image/player.png")),n=d(require("./../image/cow1.png")),r=d(require("./../image/cow2.png")),o=d(require("./../image/cow3.png")),a=d(require("./../image/cow4.png")),h=d(require("./../image/background.png"));function d(i){return i&&i.__esModule?i:{default:i}}phina.globalize();var l=640,c=960,u=800,p={sound:{bgm:i.default,bruh:e.default},image:{titleCow:t.default,player:s.default,cow1:n.default,cow2:r.default,cow3:o.default,cow4:a.default,background:h.default}};phina.define("Title",{superClass:"DisplayScene",init:function(){this.superInit(),Sprite("background").addChildTo(this).setPosition(this.gridX.center(),this.gridY.center()),Label({text:"牛を避けるだけのゲーム",fontSize:48,fill:"#000000"}).addChildTo(this).setPosition(this.gridX.center(),this.gridY.span(4)),Sprite("titleCow",256,256).addChildTo(this).setPosition(this.gridX.center(),this.gridY.center()),Label({text:"タップしてスタート",fontSize:32,fill:"#808080"}).addChildTo(this).setPosition(this.gridX.center(),this.gridY.span(12))},onpointstart:function(){SoundManager.playMusic("bgm"),this.exit()}}),phina.define("Result",{superClass:"DisplayScene",init:function(i){var e=this;this.superInit(i),Sprite("background").addChildTo(this).setPosition(this.gridX.center(),this.gridY.center()),Label({text:"評価",fontSize:24}).addChildTo(this).setPosition(this.gridX.center(),this.gridY.span(7)),Label({text:"避けた牛の数："+i.score,fontSize:48,fill:"#000000"}).addChildTo(this).setPosition(this.gridX.center(),this.gridY.span(4));var t="";i.score<=10?t="💩":i.score>10&&i.score<=30?t="😕":i.score>30&&i.score<=50?t="😯":i.score>50&&i.score<=70?t="😀":i.score>70&&i.score<=90?t="😏":i.score>90&&i.score<=110?t="😎":i.score>110&&i.score<=200?t="🐄":i.score>200&&(t="👑"),Label({text:t,fontSize:64}).addChildTo(this).setPosition(this.gridX.center(),this.gridY.center());Button({text:"ツイート",fill:"#4682b4"}).setPosition(this.gridX.span(4),this.gridY.span(12)).addChildTo(this).on("push",function(){var e="スコア: {0}\n{1}".format(i.score,"牛を避けるだけのゲーム"),t=phina.social.Twitter.createURL({text:e,hashtags:"牛を避けるだけのゲーム",url:"https://git-gen.github.io/cow_runner"});window.open(t,"share window","width=480, height=320")}),Button({text:"プレイ",fill:"#4682b4"}).setPosition(this.gridX.span(12),this.gridY.span(12)).addChildTo(this).on("push",function(){e.exit()})}}),phina.define("Main",{superClass:"DisplayScene",init:function(){this.superInit({width:l,height:c}),Sprite("background").addChildTo(this).setPosition(this.gridX.center(),this.gridY.center()),this.score=0,this.scoreLabel=Label(this.score).addChildTo(this),this.scoreLabel.x=this.gridX.center(),this.scoreLabel.y=this.gridY.span(1),this.bombGroup=DisplayElement().addChildTo(this),this.player=Sprite("player",40,60).addChildTo(this),this.player.setPosition(320,u)},update:function(i){var e=i.pointer;e.getPointing()&&(e.x<0?this.player.setPosition(0,u):e.x>640?this.player.setPosition(640,u):this.player.setPosition(e.x,u)),this.bombGroup.children.forEach(function(i){this.height<i.y&&(this.score+=1,this.scoreLabel.text=this.score,i.remove()),this.player.hitTestElement(i)&&this.gameover()}.bind(this)),i.frame%5==0&&this.spawnBomb()},spawnBomb:function(){var i=Math.randint(0,this.width);Bomb(i,-100).addChildTo(this.bombGroup)},gameover:function(){SoundManager.setVolume(2),SoundManager.play("bruh"),this.exit({score:this.score})}}),phina.define("Bomb",{superClass:"phina.display.Sprite",init:function(i,e){switch(Math.randint(1,4)){case 1:this.superInit("cow1",64,52);break;case 2:this.superInit("cow2",128,52);break;case 3:this.superInit("cow3",64,52);break;case 4:this.superInit("cow4",128,52)}var t=Math.randint(10,80);this.accel=t,this.setPosition(i,e)},update:function(){this.y+=this.accel}}),phina.main(function(){var i=GameApp({width:l,height:c,assets:p,debug:!1,startLabel:"Title",scenes:[{className:"Title",label:"Title",nextLabel:"Main"},{className:"Main",label:"Main",nextLabel:"Result"},{className:"Result",label:"Result",nextLabel:"Main"}]});i.domElement.addEventListener("touchend",function e(){var t=phina.asset.Sound();t.loadFromBuffer(),t.play().stop(),i.domElement.removeEventListener("touchend",e)}),i.run()});
},{"./../sound/cow_runner_bgm.mp3":"rnSf","./../sound/bruh.mp3":"NGSU","./../image/title_cow.png":"xLp4","./../image/player.png":"zu3H","./../image/cow1.png":"PtQw","./../image/cow2.png":"X24M","./../image/cow3.png":"NXWR","./../image/cow4.png":"yZVk","./../image/background.png":"Ywbv"}]},{},["rYwD"], null)
//# sourceMappingURL=cow_runner.28a010b6.js.map