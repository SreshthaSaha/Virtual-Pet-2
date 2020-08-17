var dog, happyDog;
var dogIMG,happyDogIMG;
var database;
var foodS, foodStock;
var milkImage;
var feedPet,addFood;
var fedTime,lastFed;
var milk;

function preload(){
   dogIMG = loadImage("Dog.png")
   happyDogIMG = loadImage("happydog.png")
   milkImage = loadImage("Milk.png");
}
function setup() {
  createCanvas(1000,500);

  database = firebase.database();
  foodStock = database.ref('Food');
  foodStock.on("value", readStock);

  milk = new Foodclass();

  dog = createSprite(450,300,50,50);
  dog.addImage(dogIMG); 
  dog.scale = 0.2; 

  feedPet=createButton("Feed the dog");
  feedPet.position(700,95);
  feedPet.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
}


function draw() {  
  background(46,189,37);

  milk.display();

  fedTime=database.ref('feedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });

  fill("black");
  textSize(20);
  // text("Food Remaining : " + foodS , 300,200);
  // text("NOTE : Press UP_ARROW key to feed Drago the milk",300,30);

  if(lastFed>=12){
    text("lastFed"+lastfed%12+"pm",350,30);
   }else if(lastFed === 0){
     text("Last Fed : 12 AM ",350,30);
   }else{
     text("Last Fed : " + lastFed + "AM",350,30);
   }
  
  drawSprites();
  //add styles here
 
}
function readStock(data){
  foodS = data.val();
  milk.updateFoodStock(foodS);
}
function writeStock(x){
    if(x<=0){
      x = 0;
    }else{
      x = x - 1;
    } 
  database.ref('/').update({
     Food:x
  })
}
function feedDog(){
  dog.addImage(happyDogIMG);

  milk.updateFoodStock(milk.getFoodStock()-1);
  database.ref('/').update({
    Food: milk.getFoodStock(),
    FeedTime:hour()
  })
}
function addFoods(){
  foodS++;
  database.ref('/').update({
  Food:foodS
  })
}



