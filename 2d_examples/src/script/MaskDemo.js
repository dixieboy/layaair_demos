// (function(){
//     var Sprite = Laya.Sprite;
//     var Texture = Laya.Texture;
//     var Handler = Laya.Handler;

//     var res;
//     var img;

//     (function(){
//         Laya.init(1136, 640);
//         Laya.stage.bgColor = "#ffffff";
//         res = "res/img/monkey1.png";
//         Laya.loader.load(res, Handler.create(this, graphicsImg));

//     })();

//     function graphicsImg() {
//         img = new Sprite();
//         img.graphics.drawTexture(Laya.loader.getRes(res), 150, 50);
//         Laya.stage.addChild(img);
//     }

// })();