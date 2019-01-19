window.onload = start;
var canvas;
var ctx;
var interval;
var int;
var yellow = false;
var yellow3=false;
var enter = false;
var x1;
var y1;
var x;
var y;
var score=0;
var highscore;
var car;
highscore=localStorage.getItem('high');
if(highscore==null)
    highscore=0;
var xp = 285;
var yp = 470;
var up=false;
var left=false;
var right=false;
var down=false;
var speed = 45;
var cars = [];
var spot=0;
var ts=0;
var win=false;
for(var i =0; i<6; i++)
   cars[i] = {x:0, y:0, s:0, r:Math.floor(Math.random()*255), g:Math.floor(Math.random()*255), b:Math.floor(Math.random()*255), convert: Math.floor(Math.random()*3+1)};

function start()
{
   canvas = document.getElementById("myCanvas");
   ctx = canvas.getContext("2d");
   document.addEventListener("keyup", keyUpHandler,false);
   document.addEventListener("mouseup", mouseUpHandler,false);
   document.addEventListener("mousemove",mouseMoveHandler,false);
   car = new Audio();
   car.src = "carhit.mp3";
   for(var i = 0; i<6; i++)
   {
       var r = Math.random()*3+1;
       cars[i].s = r;
   }
   cars[0].y= 35;
   cars[1].y= 95;
   cars[2].y= 195;
   cars[3].y= 255;
   cars[4].y= 355;
   cars[5].y= 415;
   interval = setInterval(setTitle, 10);
   setTitle();
}
function setTitle()
{
   ctx.beginPath();
   ctx.clearRect(0,0,canvas.width,canvas.height);
   drawBackground();
   drawRoads();
   makeCars0();
   makeCars1();
   makeCars2();
   makeCars3();
   makeCars4();
   makeCars5();
   makeWind();
   makeHeadlights();
   makeTaillights();
   makeMirrors();
   print();
   drawPlayer();
   drawPlayer2();
   for(var i =1; i<6; i=i+2)
   {
       cars[i].x+=cars[i].s;
       if(cars[i].x>canvas.width)
           cars[i].x=-80;
   }
   for(var i = 0; i<5; i=i+2)
   {
       cars[i].x-=cars[i].s;
       if(cars[i].x<-80)
           cars[i].x=canvas.width;
   }  
   ctx.font = "100px Impact";
   ctx.fillStyle = "#ffffff";
   ctx.fillText("Jump!",180,230);
   ctx.font = "20px Comic Sans MS";
   ctx.fillText("Adam Janicki", 235, 278)
   makeStart();
   ctx.closePath();
   ctx.fillStyle = "#000000";
  ctx.font = "58px Impact";
  ctx.fillText("Start", 242, 428);

  if(enter==true)
  {
      ctx.clearRect(0,0,canvas.width,canvas.height);
      clearInterval(interval);
      int = setInterval(time, 100);
      interval = setInterval(play,20);
      play();
  }
}
function makeStart()
{
    ctx.beginPath();
    if(yellow==true)
       ctx.fillStyle="rgb(0,250,250)";
   else if(yellow==false)
       ctx.fillStyle="rgb(255,255,255)";
  
   ctx.rect(225,380,150,50);
   ctx.fill();
   ctx.closePath();
}
function makeCars0()
{
   ctx.beginPath();
   ctx.rect(cars[0].x,cars[0].y,80,50);
   ctx.fillStyle = "rgb("+cars[0].r+","+cars[0].g+","+cars[0].b+")";
   ctx.fill();
}
function makeMirrors()
{
    ctx.beginPath();
    ctx.fillStyle = "#ffffff";
    for(var i = 0; i<5; i=i+2)
    {
        ctx.rect(cars[i].x+30, cars[i].y-3,4,6);
        ctx.rect(cars[i].x+30, cars[i].y+47,4,6);
    }
    for(var i = 1; i<6; i=i+2)
    {
        ctx.rect(cars[i].x+46, cars[i].y-3,4,6);
        ctx.rect(cars[i].x+46, cars[i].y+47,4,6);
    }
    ctx.fill();
}
function makeWind()
{
    ctx.beginPath();
    for(var i = 1; i<6;i=i+2)
    {
    if(cars[i].convert==3)
        ctx.rect(cars[i].x+40,cars[i].y+5,20,40)
    else
        ctx.rect(cars[i].x+20, cars[i].y+5,40,40)
    }
    for(var i = 0; i<5;i=i+2)
    {
    if(cars[i].convert==3)
        ctx.rect(cars[i].x+20,cars[i].y+5,20,40)
    else
        ctx.rect(cars[i].x+20, cars[i].y+5,40,40)
    }
    ctx.fillStyle = "#000000";
   ctx.fill();
}
function makeHeadlights()
{
    ctx.beginPath();
    ctx.fillStyle = "#ffff00";
    for(var i = 0; i<5; i=i+2)
    {
        ctx.rect(cars[i].x, cars[i].y,4,6);
        ctx.rect(cars[i].x, cars[i].y+44,4,6);
    }
    for(var i = 1; i<6; i=i+2)
    {
        ctx.rect(cars[i].x+76, cars[i].y,4,6);
        ctx.rect(cars[i].x+76, cars[i].y+44,4,6);
    }
    ctx.fill();
}
function makeTaillights()
{
    ctx.beginPath();
    ctx.fillStyle = "#ff0000";
    for(var i = 1; i<6; i=i+2)
    {
        ctx.rect(cars[i].x, cars[i].y,4,6);
        ctx.rect(cars[i].x, cars[i].y+44,4,6);
    }
    for(var i = 0; i<5; i=i+2)
    {
        ctx.rect(cars[i].x+76, cars[i].y,4,6);
        ctx.rect(cars[i].x+76, cars[i].y+44,4,6);
    }
    ctx.fill();
}
function makeCars1()
{
   ctx.beginPath();
   ctx.rect(cars[1].x,cars[1].y,80,50);
   ctx.fillStyle = "rgb("+cars[1].r+","+cars[1].g+","+cars[1].b+")";
   ctx.fill();
}
function makeCars2()
{
   ctx.beginPath();
   ctx.rect(cars[2].x,cars[2].y,80,50);
   ctx.fillStyle = "rgb("+cars[2].r+","+cars[2].g+","+cars[2].b+")";
   ctx.fill();
}
function makeCars3()
{
   ctx.beginPath();
   ctx.rect(cars[3].x,cars[3].y,80,50);
   ctx.fillStyle = "rgb("+cars[3].r+","+cars[3].g+","+cars[3].b+")";
   ctx.fill();
}
function makeCars4()
{
   ctx.beginPath();
   ctx.rect(cars[4].x,cars[4].y,80,50);
   ctx.fillStyle = "rgb("+cars[4].r+","+cars[4].g+","+cars[4].b+")";
   ctx.fill();
}
function makeCars5()
{
   ctx.beginPath();
   ctx.rect(cars[5].x,cars[5].y,80,50);
   ctx.fillStyle = "rgb("+cars[5].r+","+cars[5].g+","+cars[5].b+")";
   ctx.fill();
}
function play()
{
   ctx.clearRect(0,0,canvas.width,canvas.height);
   drawBackground();
   drawRoads();
   makeCars0();
   makeCars1();
   makeCars2();
   makeCars3();
   makeCars4();
   makeCars5();
   makeWind();
   makeTaillights();
   makeHeadlights();
   makeMirrors();
   print();
   drawPlayer();
   drawPlayer2();
   collisionDetection();
   if(left==true && xp-speed>=0)
   {   xp-=speed;
       ts=0;
       left=false;
   }
   if(right==true && xp+speed+30<=canvas.width)
    {
       xp+=speed;
       ts=0;
       right=false;
    } 
   if(up==true && yp>=0)
    {  
       if(spot==0)
           yp-=42;
       if(spot==1)
           yp-=60;
       if(spot==2)
           yp-=52;
       if(spot==3)
           yp-=48;
       if(spot==4)
           yp-=60;
       if(spot==5)
           yp-=52;
       if(spot==6)
           yp-=52;
       if(spot==7)
           yp-=56;
       if(spot==8)
           yp-=50;
      
       ts=0;
       up=false;
       spot++;
       score++;
    }
    if(down==true && yp+30<=canvas.height)
    {  
       if(spot==1)
           yp+=42;
       if(spot==2)
           yp+=60;
       if(spot==3)
           yp+=52;
       if(spot==4)
           yp+=48;
       if(spot==5)
           yp+=60;
       if(spot==6)
           yp+=52;
       if(spot==7)
           yp+=52;
       if(spot==8)
           yp+=56;
  
       ts=0;
       down=false;
       spot--;
       score--;
    }

   for(var i =1; i<6; i=i+2)
   {
       cars[i].x+=cars[i].s;
       if(cars[i].x>canvas.width)
           cars[i].x=-80;
   }
   for(var i = 0; i<5; i=i+2)
   {
       cars[i].x-=cars[i].s;
       if(cars[i].x<-80)
           cars[i].x=canvas.width;
   }  
   if(yp+30<=30)
       resetLevel();
}
function time()
{
   ts++;
}
function collisionDetection()
{
   for(var i = 0; i<6; i++)
   {
       var x = cars[i].x;
       var y =cars[i].y;
       if(xp+30>=x && xp<=x+80 && yp+30>=y && yp<y+50)
       {
        if(highscore==0 || highscore==null)
        {
            localStorage.setItem('high',score);
        }
        else if(score>highscore)
        {
            localStorage.setItem('high',score);
        }
           win=true;
           car.play();
           clearInterval(interval);
           yp=470;
           interval=setInterval(setWin,20);
          setWin();
       }
   }
}
function resetLevel()
{
   yp=470;
   xp=285;
   spot=0;
   for(var i = 0; i<6; i++)
   {
       var r =2*(Math.random());
       cars[i].s+=r;
   }
}
function setWin()
{
   ctx.clearRect(0,0,canvas.width,canvas.height);
   ctx.beginPath();
   drawBackground();
   drawRoads();
   makeCars0();
   makeCars1();
   makeCars2();
   makeCars3();
   makeCars4();
   makeCars5();
   makeWind();
   makeHeadlights();
   makeTaillights();
   makeMirrors();
   print();
   for(var i =1; i<6; i=i+2)
   {
       cars[i].x+=cars[i].s;
       if(cars[i].x>canvas.width)
           cars[i].x=-80;
   }
   for(var i = 0; i<5; i=i+2)
   {
       cars[i].x-=cars[i].s;
       if(cars[i].x<-80)
           cars[i].x=canvas.width;
   }
 ctx.font = "100px Impact";
 ctx.fillStyle = "rgb(255,126,48)";
 ctx.fillText("Game Over",90,200);
 ctx.font = "50px Impact";
 ctx.fillText("Score: "+score,230,280);
 ctx.fillText("High: "+highscore,230,340);
 if(score>highscore)
    ctx.fillText("New Highscore!",160,400)
 ctx.font = "20px Courier New";
 if(yellow3==true)
      ctx.fillStyle = "#dbff4d";
  else if(yellow3==false)
      ctx.fillStyle = "#ffffff";
 ctx.rect(255,460, 100,25);
 ctx.fill();
 ctx.fillStyle = "#000000";
 ctx.fillText("Restart",260,480);
 ctx.closePath();
}
function print()
{
   ctx.beginPath();
   ctx.fillStyle = "#000000";
   ctx.font = "20px Impact";
   ctx.fillText(""+score, 10, 25);
   if(highscore!=null)
       ctx.fillText("HI: "+highscore,542,25);
   else{
       highscore=0;
       ctx.fillText("HI: "+highscore,542,25);
   }
}
function drawBackground()
{
   ctx.beginPath();
   ctx.rect(0,0,canvas.width, 30);
   ctx.rect(0,canvas.height-30,canvas.width, 30);
   ctx.rect(0,160-10,canvas.width, 40);
   ctx.rect(0,320-10,canvas.width, 40);
   ctx.fillStyle = "rgb(20,230,60)";
   ctx.fill();
   ctx.closePath();
}
function drawRoads()
{
   var a = 5;
   ctx.beginPath();
   for(var i = 0; i<40; i++)
   {
       ctx.rect(a+(i*15),100-10,10,6);
       ctx.rect(a+(i*15),260-10,10,6);
       ctx.rect(a+(i*15),420-10,10,6);
   }
   ctx.fillStyle = "rgb(255,255,255)";
   ctx.fill();
   ctx.closePath();
}
function drawPlayer()
{
   ctx.beginPath();
   ctx.fillStyle = "#1a237e";
   ctx.rect(xp, yp, 30, 30);
   ctx.fill();
   ctx.closePath();
}
function drawPlayer2()
{
    ctx.beginPath();
   ctx.fillStyle = "#67ff03";
   ctx.rect(xp+7, yp+7, 16, 16);
   ctx.fill();
   ctx.closePath();
}
function mouseMoveHandler(e)
{
   x1 = e.clientX-canvas.offsetLeft;
   y1 = e.clientY-canvas.offsetTop;
   if(x1>=225 && x1<=375 && y1>=380 && y1<=430)
   {
       yellow=true;
   }
   if((x1<=225 || x1>=375) || (y1<=380 || y1>=430) && yellow == true)
  {
      yellow=false;
  }
  if(x1>=255 && x1<=355 && y1>=460 && y1<485 && win==true)
 {
     yellow3 = true;
 }
 if((x1<=255 || x1>=355 || y1<=460 || y1>485) && win==true)
 {
     yellow3 = false;
 }
}
function mouseUpHandler(e)
{
   x = e.clientX-canvas.offsetLeft;
   y=e.clientY-canvas.offsetTop;
   if(x>=225 && x<=375 && y>=380 && y<=430)
      enter=true;
   if(x>=255 && x<=355 && y>=460 && y<485 && win==true)
      {
          document.location.reload();
      }
}
function keyUpHandler(e)
{
   if(e.keyCode==82)
   window.location.reload();
   if(e.keyCode==13)
       enter=true;
   if(e.keyCode==37&&ts>=1)
       left=true;
    else if(e.keyCode==32&&ts>=1)
        up=true;
   else if(e.keyCode==38&&ts>=1)
       up=true;
   else if(e.keyCode==39&&ts>=1)
       right=true;
   else if(e.keyCode==40&&ts>=1)
       down=true;
}
