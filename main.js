image1 =""
status1 = ""
objects = []
function preload(){
image1 = loadImage("car.jpg")
}
function setup(){
    canvas = createCanvas(600,400);
    canvas.center()
    video = createCapture(VIDEO)
    video.size(600,400)
    video.hide()
    objectDetector = ml5.objectDetector("cocossd", modeloaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects"
}
function modeloaded(){
    console.log("Model Is Loaded");
    status1 = true;
    
    
}
function gotResults(error,results){
    if(error){
        console.error(error)
    }
    else{
        console.log(results)
        objects = results;
    }
}
function draw(){
    console.log(objects)
    fill("red")
    noFill()    
    stroke("red")
    image(video,0,0,600,400);
    if(status1!= ""){
        objectDetector.detect(video,gotResults); 
        document.getElementById("status").innerHTML = "Status: Object Detected"
        for(var i=0; i < objects.length; i++){
        object_name = objects[i].label
        object_confidence = floor(objects[i].confidence * 100) +"%";
        object_x = objects[i].x 
        object_y = objects[i].y 
        object_width = objects[i].width
        object_height = objects[i].height
        rect(object_x,object_y,object_width,object_height)
        text(object_name +" "+ object_confidence,object_x +15,object_y +15)
    }
}
}

