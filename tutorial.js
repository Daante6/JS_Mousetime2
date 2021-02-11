function tutorialDraw(){
    
    //back
    fill(10,10,200);
    //rect(width-150,height-150,100,100);
    image(backImg,width-250,height-150);
    fill(255);
    //text("back",width-100,height-100);
    
        switch(tutorialStep){
            case 0:
                text("Welcome to MouseTime.",width/2,100);
                break;
            case 1:
                text("Objective of the game is to survive as long as possible",width/2,150);
                break;
            case 2:
                text("Use your mouse to move around within the border",width/2,200);
                break;
            case 3:
                text("Avoid all kinds of orbs and missles send by evil robot.\n Look out!!",width/2,100);
                if(tutorialStepC > 80){
                    image(warningImg,width/2+100,height/2-warningImg.height/2);
                }
                break;
            case 4:
                text("Missles explodes when they hit each other.",width/2,150);
                if(tutorialStepC == 0){
                    missleList.push(new Missle( width , 0 ,0,0));
                    missleList.push(new Missle( width , height ,0,0));
                    tutorialStepC++;
                }
                break;
            case 5:
                text("Blue and orange orbs follows a pattern.",width/2,200);
                if(tutorialStepC == 0){
                    for(j=0;j<6;j++){
                        aiList.push(new Orb(j*140+40,-80,0,5,0));
                        aiList.push(new OrbHeart(width/2,150,0,-11,-1));
                        aiList.push(new OrbHeart(width/2,150,0,-11,1));
                    }
                    tutorialStepC++;
                }
                break;
            case 6:
                text("Green orbs are directed at you",width/2,100);
                if(tutorialStepC == 0 || tutorialStepC == 10){
                    aiList.push(new Orb(robot.pos.x , robot.pos.y,player.pos.x-robot.pos.x,player.pos.y-robot.pos.y,1));
                    tutorialStepC++;
                }
                break;
            case 7:
                text("Lasers warms up, then they're deadly",width/2,150);
                if(tutorialStepC == 30){
                    laserList.push(new Laser(0,0,width,height));
                laserList.push(new Laser(width,0,0,height));
                }
                break;
            case 8:
                text("Level changes every 30 seconds, up to level 40",width/2,200);
                break;
            case 9:
                text("Play to get gold and unlock upgrades!",width/2,150);
                break;
            case 10:
                text("First upgrade gives you another chance",width/2,100);
                image(doubleImg,width/2+100,height/2-100);
                break;
            case 11:
                text("Second upgrade gives you barrier in bad situations",width/2,100);
                image(bombImg,width/2+100,height/2-100);
                break;
            case 12:
                text("Third upgrade gives you bonus levels from time to time",width/2,100);
                image(scoreImg,width/2+100,height/2-100);
                break;
            case 13:
                text("End of tutorial.\nGood luck!",width/2,150);
                break;
        }
        if(missleList.length==0 && aiList.length==0){
        tutorialStepC++;
        if(tutorialStepC>60*4){
            tutorialStep++;
            tutorialStepC=0;
        }
    }
    
    
    if(sec >= 12){
        image(robotImg,0,0);
    }
    
    
    //AILIST UPDATE+SHOW + HITBOX AILIST-PLAYER
    for(i=0;i<aiList.length;i++){
        aiList[i].update();
        aiList[i].show();
        if(collideCircleCircle(aiList[i].pos.x,aiList[i].pos.y,aiList[i].size*2,player.pos.x,player.pos.y,player.size*2)){
            reset();
        }
        if(aiList[i].life <= 0){
            aiList.splice(i,1);
        }
        
    }
    for(i=0;i<missleList.length;i++){
        missleList[i].update();
        missleList[i].show();
        if(missleList[i].life <= 0){
            missleList.splice(i,1);
        }
        if(collideCircleCircle(missleList[i].pos.x,missleList[i].pos.y,missleList[i].size*2,player.pos.x,player.pos.y,player.size*2)){
            reset();
        }
    }
                                    //MISSLE EXPLODE
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
        reset();
    }
    
    //TIMER SET
    secC++;
    if(secC==60){
        sec++;
        secC=0;
    }
    if(sec == 60){
        sec=0;
        min++;
    }
}

function tutorialUpdate(){ //MousePressedButton
    if(isRectClicked(width-250,height-150,200,100)){
        reset();
    }
}