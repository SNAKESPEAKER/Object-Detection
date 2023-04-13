var img= "";
var Status= "";
var objects= [];

function preload() {
 img= loadImage("bedroom.jpg"); 
}

function setup() {
 canvas= createCanvas(600,400);
 canvas.center();   
 obj= ml5.objectDetector("cocossd", modelLoaded);  
 document.getElementById("status").innerHTML= "Status: Detecting Objects";
}

function modelLoaded(){
console.log("Model is loaded!");
Status= true;
obj.detect(img, gotResults);
}

function gotResults(error, result) {
   if (error) {
    console.error(error);
   } else{
    console.log(result);
    objects= result;
   }
}


function draw() {
   image(img,0,0,600,400);                                                   
   if (Status!="" ) {
      for ( index = 0; index < objects.length; index++) {
         document.getElementById("status").innerHTML= "Status: Object Detected!"; 
         fill("darkgreen");
         stroke("darkgreen");
         noFill();
         percent= floor(objects[index].confidence *100);
         text(objects[index].label+" "+percent+"%",objects[index].x,objects[index].y);              
           rect(objects[index].x,objects[index].y,objects[index].width,objects[index].height);        
      }
   }
   }