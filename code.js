var p5Inst = new p5(null, 'sketch');

window.preload = function () {
  initMobileControls(p5Inst);

  p5Inst._predefinedSpriteAnimations = {};
  p5Inst._pauseSpriteAnimationsByDefault = false;
  var animationListJSON = {"orderedKeys":[],"propsByKey":{}};
  var orderedKeys = animationListJSON.orderedKeys;
  var allAnimationsSingleFrame = false;
  orderedKeys.forEach(function (key) {
    var props = animationListJSON.propsByKey[key];
    var frameCount = allAnimationsSingleFrame ? 1 : props.frameCount;
    var image = loadImage(props.rootRelativePath, function () {
      var spriteSheet = loadSpriteSheet(
          image,
          props.frameSize.x,
          props.frameSize.y,
          frameCount
      );
      p5Inst._predefinedSpriteAnimations[props.name] = loadAnimation(spriteSheet);
      p5Inst._predefinedSpriteAnimations[props.name].looping = props.looping;
      p5Inst._predefinedSpriteAnimations[props.name].frameDelay = props.frameDelay;
    });
  });

  function wrappedExportedCode(stage) {
    if (stage === 'preload') {
      if (setup !== window.setup) {
        window.setup = setup;
      } else {
        return;
      }
    }
// -----

function draw() {
 background("lightGRAY");
  drawSprites();

  if (keyDown(RIGHT_ARROW)) {
    thief.velocityX=2;
    thief.velocityY=0;
    }
  if (keyDown(LEFT_ARROW)) {
   thief.velocityX=-2; 
   thief.velocityY=0;
  }
  if (keyDown(UP_ARROW)) {
    thief.velocityX=0;
    thief.velocityY=-2;
  }
  if (keyDown(DOWN_ARROW)) {
    thief.velocityX=0;
    thief.velocityY=2;
  }
  
createEdgeSprites();
  laser1.bounceOff(topEdge);
  laser1.bounceOff(bottomEdge);
  
  laser2.bounceOff(topEdge);
  laser2.bounceOff(bottomEdge);
  laser2.bounceOff(diamond);
  
  
  if (laser1.isTouching(thief)||laser2.isTouching(thief)) {
    
    fill("red");
    textSize(25);
    text("THIEF IS CAUGHT",100,200);
    laser1.setVelocity(0,0);
    laser2.setVelocity(0,0);
    thief.setVelocity(0,0);
  }
   laser1.isTouching(thief);
   laser2.isTouching(thief);
  
  thief.bounceOff(edges);
  
  thief.collide(diamond);
  if (thief.collide(diamond)) {
    thief.x=100;
    thief.y=350;
    }
  
  
  
  
  
}
var thief = createSprite(100, 350,15,15);
thief.shapeColor="black";

var laser1 = createSprite(100, 300,200,5);
laser1.shapeColor="red";
laser1.velocityY=-2;

var laser2 = createSprite(300, 100,200,5);
laser2.shapeColor="red";
laser2.velocityY=2;

var diamond = createSprite(360, 30,13,13);
diamond.shapeColor="cyan";
diamond.rotation=45;
















// -----
    try { window.draw = draw; } catch (e) {}
    switch (stage) {
      case 'preload':
        if (preload !== window.preload) { preload(); }
        break;
      case 'setup':
        if (setup !== window.setup) { setup(); }
        break;
    }
  }
  window.wrappedExportedCode = wrappedExportedCode;
  wrappedExportedCode('preload');
};

window.setup = function () {
  window.wrappedExportedCode('setup');
};
