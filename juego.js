var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

//load images
var diver = new Image();
var bg = new Image();
var pipeNorth = new Image();
var pipeSouth = new Image();

var sharkn = new Image();
var sharks = new Image();



diver.src = "images/diver.png";
bg.src = "images/back.png";
pipeNorth.src = "images/pipeNorth.png";
pipeSouth.src = "images/pipeSouth.png";

sharkn.src = "images/sharkn.png"
sharks.src = "images/sharks.png"

//variables
var gap = 90;
var constant;

var gap2 = 250;
var constant2;

var bX = 10;
var bY = 150;

var gravity = 0.5;

var hp = 200;
var score = 0;

//audio files
var scor = new Audio();
scor.src = "sounds/score.mp3";


//on key
document.addEventListener('keydown',movimiento);

function movimiento(){

  keyCode=window.event.keyCode;
    switch (keyCode){
    case 40: //abajo
	bY += 10;
	break;
    case 39: //derecha
	bX += 15;
	break;
    case 38: //arriba
	bY -= 15;
	break;
    case 37: //izquierda
	bX -= 15;
	break;
    default:
	break;
    }
}


//pipe coordinates
var pipe = [];

pipe[0] = {
    x : cvs.width,
    y : 0
};


var sharkcoor = [];

sharkcoor[0] = {
    x : cvs.width + 200,
    y : 0
};

//draw images
function draw(){

    ctx.drawImage(bg,0,0);

    for(var i = 0; i < pipe.length; i++){

        constant = pipeNorth.height+gap;
        ctx.drawImage(pipeNorth,pipe[i].x,pipe[i].y);
        ctx.drawImage(pipeSouth,pipe[i].x,pipe[i].y+constant);

        pipe[i].x-=2.5;

        if( pipe[i].x == 125 ){
            pipe.push({
                x : cvs.width,
                y : Math.floor(Math.random()*pipeNorth.height)-pipeNorth.height
            });
        }

        //detect collision
        if( bX + diver.width >= pipe[i].x && bX <= pipe[i].x + pipeNorth.width && (bY <= pipe[i].y + pipeNorth.height || bY+diver.height >= pipe[i].y+constant)){
            //location.reload(); //reload the page
            hp-=1;
        }

        if(pipe[i].x == 5){
            score++;
            scor.play();
        }

        if(hp==0){
          location.reload();
        }
      }

      for(var i = 0; i < sharkcoor.length; i++){

          constant2 = sharkn.height+gap2;
          ctx.drawImage(sharkn,sharkcoor[i].x,sharkcoor[i].y);
          ctx.drawImage(sharks,sharkcoor[i].x+100,sharkcoor[i].y+constant2);

          sharkcoor[i].x-=5;

          if( sharkcoor[i].x == 125 ){
              sharkcoor.push({
                  x : cvs.width+20,
                  y : Math.floor(Math.random()*sharkn.height)+sharkn.height
              });
          }

          //detect collision
          if( bX + diver.width >= sharkcoor[i].x && bX <= sharkcoor[i].x + sharkn.width && (bY <= sharkcoor[i].y + sharkn.height || bY+diver.height >= sharkcoor[i].y+constant2)){
              //location.reload(); //reload the page
              hp-=1;
          }

          if(sharkcoor[i].x == 5){
              score++;
              scor.play();
          }

          if(hp==0){
            location.reload();
          }


        }



    ctx.drawImage(diver,bX,bY);

    bY += gravity;

    ctx.fillStyle = "#000";
    ctx.font = "20px Verdana";
	  var gradient = ctx.createLinearGradient(0, 0, cvs.width, 0);
	  gradient.addColorStop("0"," white");
	  gradient.addColorStop("0.5", "yellow");
	  gradient.addColorStop("1.0", "blue");

	  ctx.fillStyle = gradient;

    ctx.fillText("Health Points: "+hp,10,cvs.height-20);
    ctx.font = "20px Verdana";
    ctx.fillText("Score: "+score,10,cvs.height-40);

    requestAnimationFrame(draw);

}

draw();
