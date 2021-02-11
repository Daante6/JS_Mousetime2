function preload() {
    
    bckground = loadImage('graphic/bckground.jpg');
    
    creditsImg = loadImage('graphic/credits.png');
    
    
    newGameImg = loadImage('graphic/newgame.jpg');
    continueImg = loadImage('graphic/continue.jpg');
    tutorialImg = loadImage('graphic/tutorial.jpg');
    resetImg = loadImage('graphic/reset.jpg');
    shopImg = loadImage('graphic/shop.jpg');
    backImg = loadImage('graphic/back.jpg');
    
    goldImg = loadImage('graphic/gold.png');
    leftImg = loadImage('graphic/left.png');
    rightImg = loadImage('graphic/right.png');
    doubleImg = loadImage('graphic/double.png');
    doubleDoneImg = loadImage('graphic/doubleDone.png');
    bombImg = loadImage('graphic/bomb.png');
    bombDoneImg = loadImage('graphic/bombDone.png');
    scoreImg = loadImage('graphic/score.png');
    scoreDoneImg = loadImage('graphic/scoreDone.png');
    scoreHitImg = loadImage('graphic/scoreHit.png');
    robotImg = loadImage('graphic/robot.png');
    missleImg = loadImage('graphic/missle.png');
    missleExplodeImg = loadImage('graphic/missleExplode.png');
    warningImg = loadImage('graphic/warning.png');
    barrier1Img = loadImage('graphic/barrier1.png');
    barrier2Img = loadImage('graphic/barrier2.png');
    orb1Img = loadImage('graphic/orb1.png');
    orb2Img = loadImage('graphic/orb2.png');
    orb3Img = loadImage('graphic/orb3.png');
    player1Img = loadImage('graphic/player1.png');
    player2Img = loadImage('graphic/player2.png');
    player3Img = loadImage('graphic/player3.png');
    player4Img = loadImage('graphic/player4.png');
    player5Img = loadImage('graphic/player5.png');
    player6Img = loadImage('graphic/player6.png');
    player7Img = loadImage('graphic/player7.png');
    player8Img = loadImage('graphic/player8.png');
    player9Img = loadImage('graphic/player9.png');
    player10Img = loadImage('graphic/player10.png');
    player11Img = loadImage('graphic/player11.png');
    player12Img = loadImage('graphic/player12.png');
    player13Img = loadImage('graphic/player13.png');
    player14Img = loadImage('graphic/player14.png');
    player15Img = loadImage('graphic/player15.png');
}

function setup()
{
    document.addEventListener('contextmenu', event => event.preventDefault());
    player = new Player();
    robot = new Robot(0,0);
    gold=70;
    highscore=0;
    upgrade1=0;
    upgrade2=0;
    update3=0;
    iconSaved=1;
    tutorialStep=0;
    tutorialStepC=0;
    iconActive=1; //shop player icon
    levelMax=1;
    checkCookie();
    iconBinary = int(getCookie("iconBinaryV"));
    iconActive = int(getCookie("iconActiveV"));
    iconSaved = int(getCookie("iconSavedV"));
    upgrade1 = int(getCookie("upgrade1V"));
    upgrade2 = int(getCookie("upgrade2V"));
    bonusLevel=0;
    upgrade3 = int(getCookie("upgrade3V"));
    gold = int(getCookie("goldV"));
    highscore = int(getCookie("highscoreV"));
    levelMax = int(getCookie("levelMaxV"));
    level=0;
    score=0;
    reset();
    changeIcon(int(iconSaved));
    iconList=[0,1,1,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0  ,0  ,0  ,0 ,0];
    iconCost=[0,0,0,10,20,40,40,40,60,60,80,80,80,140,140,180,200];
    sec=0;
    secC=0;
    min=0;
    createCanvas(800, 600);
    frameRate(60);
    background(51);
    start=0;
    textAlign(CENTER);
    textSize(20);
    stroke(10);
    noCursor();
    
    //attacks
    missleCD=0;
}

function draw()
{
    image(bckground,0,0);
    fill(255);
    if(start == 1){
        update(); 
    }else if(start==0){
                            //MAIN MENU
                    //new game
        fill(10,10,200);
        //rect(150,100,200,100);
        image(newGameImg,150,100);
        fill(230);
        //text('New game',250,150);
                    //Continue
        fill(10,10,200);
        //rect(width-350,100,200,100);
        image(continueImg,width-350,100);
        fill(230);
        //text('Continue',width-250,150);
                    //tutorial
        fill(10,10,200);
        //rect(width/2-100,400,200,100);
        image(tutorialImg,width/2-100,370);
        fill(230);
        //text('Tutorial',width/2,450);
                    //progress bar
        fill(230);
        text("Progress: " + levelMax + "/40",width/2,280);
        fill(0,0,0);
        rect(width/2-200,300,400,40);
        fill(200,200,10);
        rect(width/2-200,300,(levelMax/40)*400,40);
                    //shop
        fill(10,200,10);
        //rect(width/2+150,height-150,200,100);
        image(shopImg,width/2+150,height-150);
        fill(230);
        //text('Shop',width/2+250,height-100);
                    //credits
        image(creditsImg,width/2-creditsImg.width/2,height-creditsImg.height);
                    //reset progress
        fill(200,10,10);
        //rect(50,height-150,200,100);
        image(resetImg,50,height-150);
        fill(230);
        //text('Reset progress',150,height-100);
                    //highscore
        push();
        textAlign(LEFT);
        text("High score: " + highscore,0,60);
        pop();
    }else if(start == 2){ //shop
        shopDraw();
    }else if(start == 3){ //tutorial
        tutorialDraw();
    }
    if(start == 0 || start == 2){
        //stats
        //gold
        image(goldImg,0,0);
        fill(230);
        push();
        textAlign(LEFT);
        text(gold,30,30);
        pop();
    }
    
    player.update();
    player.show();
    
    fill(50);
    
    milisec = floor(map(secC, 0,100,0,60));
    if(min<10){
        timeText="0"+min;
    }else{
        timeText=min;
    }
    if(sec<10){
        timeText=timeText+":0"+sec;
    }else{
        timeText=timeText+":"+sec;
    }
    if(milisec<10){
        timeText=timeText+":0"+milisec;
    }else{
        timeText=timeText+":"+milisec;
    }
    
    if(start == 1){
        push();
        stroke(10);
        fill(245);
        text(timeText,width/2,50);
        text("Level: " + level,width/2,30);
        pop();
    }else if(start == 3){
        fill(255);
        text(timeText,width/2,50);
        text("Level: Tutorial",width/2,30);
    }
    
                                                    //DEBUG HERE
    
}//end draw



function mousePressed() {
    if(start == 0){ //main menu
        //new game
    if (mouseX >= 150 && mouseX <= 350 && mouseY >= 100 && mouseY <= 200) {
        level=1;
        if(upgrade1 == 1){
            life=2;
        }else{
            life=1;
        }
        start=1;
        sec=0;
        secC=0;
        min=0;
        }
        //continue
    if (mouseX >= 450 && mouseX <= 650 && mouseY >= 100 && mouseY <= 200) {
        level=levelMax;
        if(upgrade1 == 1){
            life=2;
        }else{
            life=1;
        }
        start=1;
        sec=0;
        secC=0;
        min=0;
        }
        //Tutorial
    if (mouseX >= 300 && mouseX <= 500 && mouseY >= 370 && mouseY <= 470) {
        
        start=3; //tutorial
        tutorialStep=0;
        sec=0;
        secC=0;
        min=0;
        }
        //Shop
    if (mouseX >= 550 && mouseX <= 750 && mouseY >= 450 && mouseY <= 550) {
        
        start=2; //shop
        //iconActive=1;
        sec=0;
        secC=0;
        min=0;
        }
        //reset
    if (mouseX >= 50 && mouseX <= 250 && mouseY >= 450 && mouseY <= 550) {
        levelMax = 1;
        gold=70;
        iconBinary=6;
        upgrade1=0;
        upgrade2=0;
        upgrade3=0;
        iconSaved=1;
        changeIcon(iconSaved);
        iconActive=1;
        highscore=0;
        saveAllCookies();
        start=0; //shop
        sec=0;
        secC=0;
        min=0;
        }
          
    }else if(start == 2){//Shop
        shopUpdate();
    }else if(start == 3){//tutorial
        tutorialUpdate();
    }
}
function reset(){
    robot.pos.set(30,30);
    robot.vel.set(0,0);
    robot.side = 1;
    goldTemp=0;
    if(level>levelMax){
        levelMax=level;
    }
    if(score > highscore){
        highscore=score;
    }
    score=0;
    level = 0;
    attackTime=1;
    attackType=25;
    barrierReady=100;
    laserList=[];
    aiList=[];
    particleList=[];
    missleList=[];
    bonusList=[];
    barrierList=[];
    bonusLevel=0;
    start=0;
    missleShift=1;
    missleCD=0;
    tutorialStep=3;
    tutorialStepC=0;
    saveAllCookies();
    if(upgrade1 == 1){
        life=2;
    }else{
        life=1;
    }
}

function keyPressed() { //handling bomb
  if (keyCode === 32) {
    if(start == 1 && upgrade2 == 1 && barrierReady >= 100){
        barrierList.push(new Barrier(player.pos.x,player.pos.y));
        barrierReady=0;
    }
  }
}

//COOKIES
function checkCookie() {
  
    
    var upgrade1=getCookie("upgrade1V");
    if (upgrade1 != "") {
  } else {
     upgrade1 = 0;
      
    setCookie("upgrade1V", upgrade1, 365);
  }
    
    var upgrade2=getCookie("upgrade2V");
    if (upgrade2 != "") {
  } else {
     upgrade2 = 0;
      
    setCookie("upgrade2V", upgrade2, 365);
  }
    
    var upgrade3=getCookie("upgrade3V");
    if (upgrade3 != "") {
  } else {
     upgrade3 = 0;
      
    setCookie("upgrade3V", upgrade3, 365);
  }
    
  var iconSaved=getCookie("iconSavedV");
    if (iconSaved != "") {
  } else {
     iconSaved = 1;
      
    setCookie("iconSavedV", iconSaved, 365);
  }
    
    var iconActive=getCookie("iconActiveV");
    if (iconActive != "") {
  } else {
     iconActive = 1;
      
    setCookie("iconActiveV", iconActive, 365);
  }
    
    var iconBinary=getCookie("iconBinaryV");
    if (iconBinary != "") {
  } else {
     iconBinary = 6;
      
    setCookie("iconBinaryV", iconBinary, 365);
  }
    
    var levelMax=getCookie("levelMaxV");
    if (levelMax != "") {
  } else {
     levelMax = 1;
    setCookie("levelMaxV", levelMax, 365);
  }
   
    var gold=getCookie("goldV");
    if (gold != "") {
  } else {
     gold = 70;
      
    setCookie("goldV", gold, 365);
  }
    var highscore=getCookie("highscoreV");
    if (highscore != "") {
  } else {
     highscore = 0;
      
    setCookie("highscoreV", highscore, 365);
  }
}

function saveTable() {
  var table = document.getElementById("myTable");
  var num = table.rows[0].cells.length; // amount of rows
  var data = '';
  for (var i = 1; i < table.rows.length; i++) {
    for (var j = 0; j < table.rows[0].cells.length - 1; j++) {
      data += table.rows[i].cells[j].innerHTML + "~";
    }
  }
  data += table.rows.length + ";" + table.rows[0].cells.length + ";" + data.substring(0, data.length);
  setCookie("data", data, 60);
  alert("Cookie Saved");
}

function setCookie(cname, cvalue, exdays) {

  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function LoadTable() {
  var data = getCookie("data");
  if (data != "") {
      newData=data;
      for(i=0;i<7;i++){
          tableData[i]=newData.slice(i*2,i*2+1);
      }
    alert("The table says:" + data);
  } else {
    alert("There is no data in the table");
  }
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function saveAllCookies(){
    setCookie("iconActiveV", iconActive, 365);
    setCookie("iconSavedV", iconSaved, 365);
    setCookie("goldV", gold, 365);
    setCookie("levelMaxV", levelMax, 365);
    setCookie("iconBinaryV",iconBinary,365);
    setCookie("iconSavedV",iconSaved,365);
    setCookie("upgrade1V",upgrade1,365);
    setCookie("upgrade2V",upgrade2,365);
    setCookie("upgrade3V",upgrade3,365);
    setCookie("highscoreV",highscore,365);
    
}