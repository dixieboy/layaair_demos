
(function(window){
	var Laya=window.Laya;
	var AtlasInfoManager=Laya.AtlasInfoManager,BlinnPhongMaterial=Laya.BlinnPhongMaterial,Camera=Laya.Camera;
	var ClassUtils=Laya.ClassUtils,DirectionLight=Laya.DirectionLight,Handler=Laya.Handler,MeshSprite3D=Laya.MeshSprite3D;
	var PrimitiveMesh=Laya.PrimitiveMesh,ResourceVersion=Laya.ResourceVersion,Scene=Laya.Scene,Scene3D=Laya.Scene3D;
	var Stat=Laya.Stat,Texture2D=Laya.Texture2D,URL=Laya.URL,Utils=Laya.Utils,Vector3=Laya.Vector3;
	
	/**
	*游戏初始化配置
	*/
	class GameConfig{
		constructor(){}
		static init (){
			var reg=ClassUtils.regClass;
			reg("script.GameUI",GameUI);
		}
	}

	Laya.GameConfig=GameConfig;
	GameConfig.width=640;
	GameConfig.height=1136;
	GameConfig.scaleMode="fixedwidth";
	GameConfig.screenMode="none";
	GameConfig.alignV="top";
	GameConfig.alignH="left";
	GameConfig.startScene="test/TestScene.scene";
	GameConfig.sceneRoot="";
	GameConfig.debug=false;
	GameConfig.stat=false;
	GameConfig.physicsDebug=false;
	GameConfig.exportSceneToJson=true;
	GameConfig.__init$=function(){
		GameConfig.init();
	}
	
	class Main{
		constructor (){
			if (window["Laya3D"])window["Laya3D"].init(GameConfig.width,GameConfig.height);
			else Laya.init(GameConfig.width,GameConfig.height,Laya["WebGL"]);
			Laya["Physics"] && Laya["Physics"].enable();
			Laya["DebugPanel"] && Laya["DebugPanel"].enable();
			Laya.stage.scaleMode=GameConfig.scaleMode;
			Laya.stage.screenMode=GameConfig.screenMode;
			Laya.stage.alignV=GameConfig.alignV;
			Laya.stage.alignH=GameConfig.alignH;
			URL.exportSceneToJson=GameConfig.exportSceneToJson;
			if (GameConfig.debug || Utils.getQueryString("debug")=="true")Laya.enableDebugPanel();
			if (GameConfig.physicsDebug && Laya["PhysicsDebugDraw"])Laya["PhysicsDebugDraw"].enable();
			if (GameConfig.stat)Stat.show();
			Laya.alertGlobalError(true);
			ResourceVersion.enable("version.json",Handler.create(this,this.onVersionLoaded),ResourceVersion.FILENAME_VERSION);
		}
		onVersionLoaded(){
			AtlasInfoManager.enable("fileconfig.json",Handler.create(this,this.onConfigLoaded));
			}onConfigLoaded(){
			GameConfig.startScene && Scene.open(GameConfig.startScene);
		}
	}

	Laya.Main=Main;	
	window.ui={};ui.test={};

	class TestSceneUI extends Scene{
		constructor(){
			super();
		}
		createChildren(){
			super.createChildren();
			this.loadScene("test/TestScene");
		}
	}

	ui.test.TestSceneUI=Laya.TestSceneUI=TestSceneUI;	
	window.script={};

	/**
	*本示例采用非脚本的方式实现，而使用继承页面基类，实现页面逻辑。在IDE里面设置场景的Runtime属性即可和场景进行关联
	*相比脚本方式，继承式页面类，可以直接使用页面定义的属性（通过IDE内var属性定义），比如this.tipLbll，this.scoreLbl，具有代码提示效果
	*建议：如果是页面级的逻辑，需要频繁访问页面内多个元素，使用继承式写法，如果是独立小模块，功能单一，建议用脚本方
	*/
	class GameUI extends TestSceneUI{
		constructor (){
			super();
			var scene=Laya.stage.addChild(new Scene3D());
			var camera=(scene.addChild(new Camera(0,0.1,100)));
			camera.transform.translate(new Vector3(0,3,3));
			camera.transform.rotate(new Vector3(-30,0,0),true,false);
			var directionLight=scene.addChild(new DirectionLight());
			directionLight.color=new Vector3(0.6,0.6,0.6);
			directionLight.transform.worldMatrix.setForward(new Vector3(1,-1,0));
			var box=scene.addChild(new MeshSprite3D(PrimitiveMesh.createBox(1,1,1)));
			box.transform.rotate(new Vector3(0,45,0),false,false);
			var material=new BlinnPhongMaterial();
			Texture2D.load("res/layabox.png",Handler.create(null,function(tex){
				material.albedoTexture=tex;
			}));
			box.meshRenderer.material=material;
		}
	}

	script.GameUI=Laya.GameUI=GameUI;
	Laya.__init([GameConfig]);

	/**LayaGameStart**/
	new Main();

	return Laya;
}(window));
