function update(){
    
 if(attackTime == 0){
     //aiList=[];
     missleList=[];
     bonusList=[];
     //particleList=[];
     //laserList=[];
     missleCD=90;
     if(attackType == 6){
         robot.pos.set(30,30);
         robot.vel.set(0,0);
         robot.side = 1;
     }
     if(upgrade3 == 1){
         bonusLevel++;
     }
     //attackType = 11;
     while(1){
         if(bonusLevel > 2){
             attackType=100;
             bonusLevel=0;
             break;
         }else{
             if(level <= 5){
                 attackTypeMax=6;
             }else if(level <= 10){
                 attackTypeMax=10;
             }else{
                 attackTypeMax=13;
             }
             temp = floor(random(0,attackTypeMax));
                if(temp != attackType){
                attackType = temp;
                break;
            }
         }
         
    }
     
     switch (attackType) {
    case 0: //missles
        attackTime = 8*60;
        break;
    case 1: //orbV Vertical
        attackTime = (9)*60; 
        break;
    case 2: //orbH Horizontal
        attackTime = (9)*60;  
        break;
    case 3: //orbD Diagonal
        attackTime = (9)*60;  
        break;
    case 5: //orb Sine
        attackTime = (9)*60;  
        break;
    case 4: //orb Cross
        attackTime = (9)*60;  
        break;
    case 6: //robot chase
        attackTime = 8*60;
        aiList.push(new OrbRobot(robot.pos.x , robot.pos.y));
        break;
    case 10: //orb plus
        attackTime = 8*60;
        break;
    case 8: //orb cross
        attackTime = 8*60;
        break;
    case 9: //shooting robot
        attackTime = 8*60;
        break;
    case 7: //Random lasers
        attackTime = 8*60;
        break;
    case 11: //Random moving lasers
        attackTime = 8*60;
        break;
    case 12: //Figure lasers
        attackTime = 8*60;
        break;
    case 100: //bonus level
        attackTime = 6*60;
        break;
     }
 }else{
     attackTime--;
 }   

    switch(attackType){
    case 0: //OrbV vertical
        if(missleCD % 46 == 0){
        missleShift=missleShift * -1;
        for(j=0;j<6;j++){
            aiList.push(new Orb(j*140+40+(35*missleShift),-80,0, 4 + 0.05*level ,0,0,0.06));
            if(level >= 10){
                aiList.push(new OrbHeart(width/2,150,0,-11,-1));
                aiList.push(new OrbHeart(width/2,150,0,-11,1));
            }
        }}
        if(missleCD == 0){
        if( level > 20){
            aiList.push(new Orb(robot.pos.x , robot.pos.y,player.pos.x-robot.pos.x,player.pos.y-robot.pos.y,1));
        }
        missleCD = 90;
        }else{
        missleCD--;
    }
        break;
    case 1: //orbH Horizontal
        if(missleCD % 46 == 0){
        missleShift=missleShift * -1;
        for(j=0;j<11;j++){
            aiList.push(new Orb(width+30,j*140+20+(35*missleShift),-5 - 0.05*level,0,0,-0.06,0));
        }}
    if(missleCD == 0){
        if( level >= 5){
            aiList.push(new Orb(robot.pos.x , robot.pos.y,player.pos.x-robot.pos.x,player.pos.y-robot.pos.y,1));
        }
        missleCD=90;   
    }else{
        missleCD--;
    }
        break;
    case 2: //Orb Sine
        if(missleCD % 46 == 0){
        missleShift=missleShift * -1;
        for(j=0;j<12;j++){
            aiList.push(new OrbSine(j*140-60+(35*missleShift),-30,-2,4 + 0.05*level,0,0.06,0));
        }}
    if(missleCD == 0){
        if( level >= 5){
            aiList.push(new Orb(robot.pos.x , robot.pos.y,player.pos.x-robot.pos.x,player.pos.y-robot.pos.y,1));
        }
        missleCD=90;
    }else{
        missleCD--;
    }
        break;
    case 6: //robot chase
        if(attackTime > 420){
        robot.vel.set(0,0);
        image(warningImg,width/2-warningImg.width/2,height/2-warningImg.width/2);
    }else{
        robot.chase();
    }
    if(level >= 5){
        if(missleCD == 0){
            aiList.push(new Orb(robot.pos.x , robot.pos.y,-4,0,1));
            aiList.push(new Orb(robot.pos.x , robot.pos.y,4,0,1));
            aiList.push(new Orb(robot.pos.x , robot.pos.y,0,4,1));
            aiList.push(new Orb(robot.pos.x , robot.pos.y,0,-4,1));
            if(level >=15){
                aiList.push(new Orb(robot.pos.x , robot.pos.y,-4,-4,1));
                aiList.push(new Orb(robot.pos.x , robot.pos.y,4,4,1));
                aiList.push(new Orb(robot.pos.x , robot.pos.y,-4,4,1));
                aiList.push(new Orb(robot.pos.x , robot.pos.y,4,-4,1));
            }
            missleCD=160;
        }else{
            missleCD--;
        }
    }
        break;
    case 4: //Orb Cross
        if(attackTime == 8*60){
        //Up-right
        aiList.push(new Orb(width+40,-30,-800,600,0));
        aiList.push(new Orb(width+100,+50,-800,600,0));
        aiList.push(new Orb(width-20,-110,-800,600,0));
        //up-left
        aiList.push(new Orb(-40,-30,800,600,0));
        aiList.push(new Orb(40,-90,800,600,0));
        aiList.push(new Orb(-120,30,800,600,0));
        }
    if(attackTime == 4*60){
        //Up-right
        aiList.push(new Orb(width+40,-30,-800,600,0));
        aiList.push(new Orb(width+100,+50,-800,600,0));
        aiList.push(new Orb(width-20,-110,-800,600,0));
        //up-left
        aiList.push(new Orb(-40,-30,800,600,0));
        aiList.push(new Orb(40,-90,800,600,0));
        aiList.push(new Orb(-120,30,800,600,0));
        }
    if(level >= 5){
        if(missleCD == 0){
            aiList.push(new Orb(robot.pos.x , robot.pos.y,player.pos.x-robot.pos.x,player.pos.y-robot.pos.y,1));
            missleCD=80;
        }else{
            missleCD--;
        }
    }
        break;
    case 5: // shooting robot
        if(missleCD == 0){
            aiList.push(new Orb(robot.pos.x , robot.pos.y,player.pos.x-robot.pos.x,player.pos.y-robot.pos.y,1));
            missleCD=floor(20-level*0.2);
        }else{
            missleCD--;
        }
        break;
    case 3: //random lasers
        if(missleCD == 0){
            laserList.push(new LaserRandom(1,0));
            laserList.push(new LaserRandom(0,0));
            missleCD=35-floor(level/2);
            
        }else{
            missleCD--;
        }
        break;
    case 7: //missles
        if(missleCD % 46 == 0){
            missleList.push(new Missle( robot.pos.x , robot.pos.y,robot.vel.x * 3,robot.vel.y * 3));
        }
    if(missleCD == 0){
        missleCD=90;
    }else{
        missleCD--;
    }
    
    
    for(i=0;i<missleList.length-1;i++){
        for(j=i+1;j<missleList.length;j++){
            if(collideCircleCircle(missleList[i].pos.x,missleList[i].pos.y,missleList[i].size*2,missleList[j].pos.x,missleList[j].pos.y,missleList[j].size*2)){
                
                particleList.push(new MissleExplode(missleList[j].pos.x,missleList[j].pos.y));
                missleList.splice(j,1);
                particleList.push(new MissleExplode(missleList[i].pos.x,missleList[i].pos.y));
                missleList.splice(i,1);
                break;
            }
        }
    }
        break;
    case 8: //orb diagonal
        if(missleCD % 46 == 0){
        missleShift=missleShift * -1;
        
        for(j=0;j<15;j++){
            aiList.push(new Orb(j*100+20+(30*missleShift)+width/2,j*100+20+(30*missleShift)-width/2,-4 - 0.05*level,4 + 0.05*level,0,-0.06,0.06));
        }}
        if(missleCD == 0){
        if( level >= 5){
            aiList.push(new Orb(robot.pos.x , robot.pos.y,player.pos.x-robot.pos.x,player.pos.y-robot.pos.y,1));
        }
        missleCD=90;
    }else{
        missleCD--;
    }
        break;
    case 9: //orb crossroad
        if(missleCD % 81 == 0){
        missleShift=missleShift * -1;
        for(j=0;j<14;j++){
            aiList.push(new Orb(j*120-10+(20*missleShift),-120,0,4+0.05*level,0)); //V
            aiList.push(new Orb(width,j*120+20,-3-0.05*level,0,0)); //H
        }
        }
    if(missleCD == 0){
        if( level >= 5){
            
            aiList.push(new Orb(robot.pos.x , robot.pos.y,player.pos.x-robot.pos.x,player.pos.y-robot.pos.y,1));
        }
        missleCD=240;
    }else{
        missleCD--;
    }
        break;
    case 10: //random moving lasers
        if(missleCD == 0){
            laserList.push(new LaserRandom(1,1));
            laserList.push(new LaserRandom(0,1));
            missleCD=50-floor(level/2);
            
        }else{
            missleCD--;
        }
        break;
    case 11: //orb plus
        if(attackTime == 8*60){
            //Vertical
            aiList.push(new Orb(width/2-120,-120,0,3+0.05*level,0,0,0.06));
            aiList.push(new Orb(width/2,-120,0,3+0.05*level,0,0,0.06));
            aiList.push(new Orb(width/2+120,-120,0,3+0.05*level,0,0,0.06));
            aiList.push(new Orb(width/2-120,height+120,0,-2-0.05*level,0,0,-0.06));
            aiList.push(new Orb(width/2,height+120,0,-2-0.05*level,0,0,-0.06));
            aiList.push(new Orb(width/2+120,height+120,0,-2-0.05*level,0,0,-0.06));
            //Horizontal
            aiList.push(new Orb(-120,height/2,4+0.05*level,0,0));
            aiList.push(new Orb(-120,height/2+60,4+0.05*level,0,0));
            aiList.push(new Orb(-120,height/2-60,4+0.05*level,0,0));
            aiList.push(new Orb(width+120,height/2,-4-0.05*level,0,0));
            aiList.push(new Orb(width+120,height/2-60,-4-0.05*level,0,0));
            aiList.push(new Orb(width+120,height/2+60,-4-0.05*level,0,0));
        }
    if(attackTime == 4*60){
            //Vertical
            aiList.push(new Orb(width/2-120,-120,0,3+0.05*level,0,0,0.06));
            aiList.push(new Orb(width/2,-120,0,3+0.05*level,0,0,0.06));
            aiList.push(new Orb(width/2+120,-120,0,3+0.05*level,0,0,0.06));
            aiList.push(new Orb(width/2-120,height+120,0,-2-0.05*level,0,0,-0.06));
            aiList.push(new Orb(width/2,height+120,0,-2-0.05*level,0,0,-0.06));
            aiList.push(new Orb(width/2+120,height+120,0,-2-0.05*level,0,0,-0.06));
            //Horizontal
            aiList.push(new Orb(-120,height/2,4+0.05*level,0,0));
            aiList.push(new Orb(-120,height/2+120,4+0.05*level,0,0));
            aiList.push(new Orb(-120,height/2-120,4+0.05*level,0,0));
            aiList.push(new Orb(width+120,height/2,-4-0.05*level,0,0));
            aiList.push(new Orb(width+120,height/2-120,-4-0.05*level,0,0));
            aiList.push(new Orb(width+120,height/2+120,-4-0.05*level,0,0));
    }
        break;
    case 12: //figure lasers
        if(missleCD == 0){
            figure = floor(random(0,5));
            switch (figure) {
            case 0: //star
                laserList.push(new Laser(width/2,10,10,500));
                laserList.push(new Laser(10,500,width-10,500));
                laserList.push(new Laser(width/2,10,width-10,500));
                laserList.push(new Laser(10,100,width-10,100));
                laserList.push(new Laser(width/2,590,width-10,100));
                laserList.push(new Laser(width/2,590,10,100));
                break;
            case 1: //cat
                //eyes
                laserList.push(new Laser(150,200,200,100));
                laserList.push(new Laser(200,100,250,200));
                laserList.push(new Laser(550,200,600,100));
                laserList.push(new Laser(600,100,650,200));
                //mouth
                laserList.push(new Laser(150,300,250,450));
                laserList.push(new Laser(250,450,400,300));
                laserList.push(new Laser(550,450,400,300));
                laserList.push(new Laser(550,450,650,300));
                break;
            case 2: //hourglass
                laserList.push(new Laser(100,100,700,100));
                laserList.push(new Laser(100,500,700,100));
                laserList.push(new Laser(100,500,700,500));
                laserList.push(new Laser(100,100,700,500));
                break;
            case 3: //plus + cross
                laserList.push(new Laser(400,-10,400,610));
                laserList.push(new Laser(-10,300,810,300));
                laserList.push(new Laser(-10,-10,810,610));
                laserList.push(new Laser(810,-10,-10,610));
                break;
            case 4: //DANTE
                    //D
                laserList.push(new Laser(100,150,100,450));
                laserList.push(new Laser(150,450,100,450));
                laserList.push(new Laser(150,450,200,300));
                laserList.push(new Laser(100,150,200,300));
                    //A
                laserList.push(new Laser(240,450,280,150));
                laserList.push(new Laser(320,450,280,150));
                laserList.push(new Laser(255,350,315,350));
                //N
                laserList.push(new Laser(360,450,360,150));
                laserList.push(new Laser(440,450,360,150));
                laserList.push(new Laser(440,450,440,150));
                    //T
                laserList.push(new Laser(480,150,560,150));
                laserList.push(new Laser(520,150,520,450));
                    //E
                laserList.push(new Laser(600,150,680,150));
                laserList.push(new Laser(600,150,600,450));
                laserList.push(new Laser(600,300,680,300));
                laserList.push(new Laser(600,450,680,450));
                break;
            }
            if(level >= 5){
                aiList.push(new Orb(robot.pos.x , robot.pos.y,player.pos.x-robot.pos.x,player.pos.y-robot.pos.y,1));
            }
            missleCD=100-floor(level/2);
            
        }else{
            missleCD--;
        }
        break;
    case 100:
        text("BONUS LEVEL\nCOLLECT BONUSES",width/2,130);
    if(attackTime == 6*60){
        bonusList.push(new Bonus());
        bonusList.push(new Bonus());
    }else if(attackTime == 4*60){
        bonusList.push(new Bonus());
        bonusList.push(new Bonus());
    }else if(attackTime == 2*60){
        bonusList.push(new Bonus());
        bonusList.push(new Bonus());
    }
    for(i=0;i<bonusList.length;i++){
        bonusList[i].show();
        bonusList[i].life--;
        if(bonusList[i].life <= 0){
            bonusList.splice(i,1);
            break;
        }
        if(collideCircleCircle(bonusList[i].pos.x,bonusList[i].pos.y,bonusList[i].size*2,player.pos.x,player.pos.y,player.size*2)){
            particleList.push(new BonusPoints(bonusList[i].pos.x , bonusList[i].pos.y));
            bonusList.splice(i,1);
            goldTemp = goldTemp + 5;
            break;
        }
    }
        break;
}
    
                                    //BARRIER
    if(upgrade2 == 1){
        fill(10,10,10);
        rect(600,30,100,10);
        if(barrierReady < 100){
            fill(250,250,10);
        }else{
            fill(10,250,10);
        }
        rect(600,30,barrierReady,10);
        if(barrierReady > 99){
            text("SPACE", 650,25);
        }else{
            text("Barrier", 650,25);
        }
        
    }
    for(i=0;i<barrierList.length;i++){
        barrierList[i].update();
        barrierList[i].show();
        if(barrierList[i].life <= 0){
            barrierList.splice(i,1);
            break;
        }
        for(j=0;j<aiList.length;j++){
            if(collideCircleCircle(barrierList[i].pos.x,barrierList[i].pos.y,barrierList[i].size*2,aiList[j].pos.x,aiList[j].pos.y,aiList[j].size*2)){
                aiList.splice(j,1);
                break;
            }
        }
        for(j=0;j<missleList.length;j++){
        if(collideCircleCircle(barrierList[i].pos.x,barrierList[i].pos.y,barrierList[i].size*2,missleList[j].pos.x,missleList[j].pos.y,missleList[j].size*2)){
                missleList.splice(j,1);
                break;
            }
        }
        for(j=0;j<laserList.length;j++){
            if(collideLineCircle(laserList[i].pos1.x, laserList[i].pos1.y, laserList[i].pos2.x, laserList[i].pos2.y,barrierList[i].pos.x,barrierList[i].pos.y,barrierList[i].size*2)){
                laserList.splice(j,1);
                break;
            }
        }
    }
                                    //AILIST UPDATE+SHOW + HITBOX AILIST-PLAYER
    for(i=0;i<aiList.length;i++){
        aiList[i].update();
        aiList[i].show();
    }
    for(i=0;i<aiList.length;i++)
    {
        if(aiList[i].life <= 0){
            aiList.splice(i,1);
            i=0;
            //break;
        }
    }
    for(i=0;i<aiList.length;i++)
    {
        if(collideCircleCircle(aiList[i].pos.x,aiList[i].pos.y,aiList[i].size*2,player.pos.x,player.pos.y,player.size*2)){
            aiList.splice(i,1);
            playerHit();
            i=0;
            //break;
        }
    }
                                    //MISSLE
    for(i=0;i<missleList.length;i++){
        missleList[i].update();
        missleList[i].show();
        if(missleList[i].life <= 0){
            missleList.splice(i,1);
        }
        if(collideCircleCircle(missleList[i].pos.x,missleList[i].pos.y,missleList[i].size*2,player.pos.x,player.pos.y,player.size*2)){
            missleList.splice(i,1);
            playerHit();
        }
    }
                                    //LASER HANDLING
    for(i=0;i<laserList.length;i++){
        laserList[i].update();
        laserList[i].show();
        if(laserList[i].hit == 1){
            if(collideLineCircle(laserList[i].pos1.x, laserList[i].pos1.y, laserList[i].pos2.x, laserList[i].pos2.y,player.pos.x,player.pos.y,player.size*2)){
            laserList.splice(i,1);
            playerHit();
            break;
        }
        }
        if(laserList[i].life <= 0){
            laserList.splice(i,1);
        }
        
    }
                                    //BULLET EXPLODE UPDATE+SHOW
    for(i=0;i<particleList.length;i++){
        particleList[i].update();
        particleList[i].show();
        if(particleList[i].life <= 0){
            particleList.splice(i,1);
            break;
        }
    }
                                    //HITBOX PLAYER-BORDER
    if(player.pos.x <= 0 || player.pos.x >= 800 || player.pos.y <= 0 || player.pos.y >= 600){
        playerHit();
    }
    
    if(level > 7){
        if(attackType != 6){
            robot.move();
        }
    }
    robot.update();
    robot.show();
    
                                            //TIMER SET
    secC++;
    if(secC==60){
        sec++;
        secC=0;
        if(upgrade2==1){
            if(barrierReady<100){
                barrierReady = barrierReady+2;
            }
        }
    }
    if(sec == 60){
        sec=0;
        min++;
    }
    if((secC == 0 && sec == 0 && min > 0) || (secC == 0 && sec == 30 )){
        if(level < 40){
            level++;
        }
    }
    
    
} //end Update()

function playerHit(){
    life--;
    if(life < 1){ //gameover
        score = floor((min*75 + sec*0.6) * (1+ 0.07*level));
        goldTemp= floor(goldTemp + score*0.5);
        gold = gold + goldTemp;
        alert("Game over! \nScore: "+score+"\nGold earned: "+goldTemp);
        reset();
    }
}
