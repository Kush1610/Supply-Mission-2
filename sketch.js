var Start=0
var Play=1
var GameState=Start

var helicopterIMG, helicopterSprite, packageSprite,packageIMG;
var packageBody,ground
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

function preload()
{
	helicopterIMG=loadImage("helicopter3.gif")
	packageIMG=loadImage("package.png")
	helicopter2IMG=loadImage("helicopter.gif")
	backIMG=loadImage("background.jpg")
}

function setup() {
	createCanvas(800, 700);
	rectMode(CENTER);
	

	packageSprite=createSprite(width/2-200, 80, 10,10);
	packageSprite.addImage(packageIMG)
	packageSprite.scale=0.2
    packageSprite.visible=false

	helicopterSprite=createSprite(width/2-200, 150, 10,10);
	helicopterSprite.addImage(helicopterIMG)
	helicopterSprite.scale=1.6
	helicopterSprite.visible=false

	helicopter2Sprite=createSprite(width/2, 230, 10,10);
	helicopter2Sprite.addImage(helicopter2IMG)
	helicopter2Sprite.scale=2
	helicopter2Sprite.visible=false

	groundSprite=createSprite(width/2, height-10, width,10);
	groundSprite.shapeColor=color(255)
	groundSprite.visible=false


	engine = Engine.create();
	world = engine.world;

	packageBody = Bodies.circle(width/2-187 , 185 , 5 , {restitution:0.4, isStatic:true});
	World.add(world, packageBody);
	

	//Create a Ground
	ground = Bodies.rectangle(width/2, 650, width, 10 , {isStatic:true} );
 	World.add(world, ground);

 	boxPosition=width/2-100
 	boxY=635;


 	boxleftSprite=createSprite(boxPosition, boxY, 20,100);
 	boxleftSprite.shapeColor=color(255,0,0);
	boxleftSprite.visible=false

 	boxLeftBody = Bodies.rectangle(boxPosition+20, boxY, 20,100 , {isStatic:true} );
 	World.add(world, boxLeftBody);

 	boxBase=createSprite(boxPosition+100, boxY+40, 200,20);
 	boxBase.shapeColor=color(255,0,0);
	boxBase.visible=false

 	boxBottomBody = Bodies.rectangle(boxPosition+100, boxY+45-20, 200,20 , {isStatic:true} );
 	World.add(world, boxBottomBody);

 	boxleft2Sprite=createSprite(boxPosition+200 , boxY, 20,100);
 	boxleft2Sprite.shapeColor=color(255,0,0);
	boxleft2Sprite.visible=false

 	boxRightBody = Bodies.rectangle(boxPosition+200-20 , boxY, 20,100 , {isStatic:true} );
 	World.add(world, boxRightBody);

	Engine.run(engine);
  
}


function draw() {
  rectMode(CENTER);
  background(backIMG);

  if(GameState===Start)
  {
	helicopter2Sprite.visible=true;
	drawSprites();
	textSize(67)
	fill("White");
	text("Press 'Enter to Start",100,530)

  }

  if(keyCode===ENTER)
    {
        GameState=Play
		packageSprite.visible=true
        helicopterSprite.visible=true
        helicopter2Sprite.visible=false
        groundSprite.visible=true
		boxleftSprite.visible=true
        boxBase.visible=true
        boxleft2Sprite.visible=true
    }

 if(GameState===Play)
 {
  packageSprite.x= packageBody.position.x 
  packageSprite.y= packageBody.position.y 

  

  if(keyCode===DOWN_ARROW)
{
Matter.Body.setStatic(packageBody,false)
Matter.Body.translate(packageBody,{x:+0,y:0})
}
  
 drawSprites();
  textSize(47)
  fill("White");
  text("Press arrow keys to move helicopter",10,50)
  text("Press down arrow to drop supplies",10,100)
}

 
}
function keyPressed()
{
	if(keyCode===LEFT_ARROW)
  {
	  helicopterSprite.x=helicopterSprite.x-5
	  Matter.Body.translate(packageBody,{x:-5,y:0})
  }

  if(keyCode===RIGHT_ARROW)
  {
	  helicopterSprite.x=helicopterSprite.x+5
	  Matter.Body.translate(packageBody,{x:+5,y:0})
  }
}