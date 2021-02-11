function shopDraw(){
        //back to menu
        fill(10,10,200);
        //rect(width/2-100,450,200,100);
        image(backImg,width/2-100,450);
        fill(230);
        //text('Back',width/2,500);
        //desciption
        push();
        textSize(24);
        //upgrades
        text("Upgrades", width/2,50);
    push();
    textAlign(LEFT);
        //double life
        if(upgrade1 == 0){
            image(doubleImg,150,80);
            text("Gives you a second life every game (500 gold)",225,105);
        }else{
            image(doubleDoneImg,150,80);
            text("Bought",225,105);
        }
        //bomb
        if(upgrade2 == 0){
            image(bombImg,150,150);
            text("Use bombs using SPACE (300 gold)",225,175);
        }else{
            image(bombDoneImg,150,150);
            text("Bought",225,175);
        }
        //points
        if(upgrade3 == 0){
            image(scoreImg,150,220);
            text("Chance for bonus levels (100 gold)",225,245);
        }else{
            image(scoreDoneImg,150,220);
            text("Bought",225,245);
        }
    pop();
        //apperance
        text("Appearance",width/2,300);
    
    switch (iconActive) {
    case 1:
        image(player1Img,width/2-player2Img.width/2,330);
        break;
    case 2:
        image(player2Img,width/2-player2Img.width/2,330);
        break;
    case 3:
        image(player3Img,width/2-player2Img.width/2,330);
        break;
    case 4:
        image(player4Img,width/2-player2Img.width/2,330);
        break;
    case 5:
        image(player5Img,width/2-player2Img.width/2,330);
        break;
    case 6:
        image(player6Img,width/2-player2Img.width/2,330);
        break;
    case 7:
        image(player7Img,width/2-player2Img.width/2,330);
        break;
    case 8:
        image(player8Img,width/2-player2Img.width/2,330);
        break;
    case 9:
        image(player9Img,width/2-player2Img.width/2,330);
        break;
    case 10:
        image(player10Img,width/2-player2Img.width/2,330);
        break;
    case 11:
        image(player11Img,width/2-player2Img.width/2,330);
        break;
    case 12:
        image(player12Img,width/2-player2Img.width/2,330);
        break;
    case 13:
        image(player13Img,width/2-player2Img.width/2,330);
        break;
    case 14:
        image(player14Img,width/2-player2Img.width/2,330);
        break;
    case 15:
        image(player15Img,width/2-player2Img.width/2,330);
        break;
    }
        if((iconBinary & pow(2,iconActive)) == (pow(2,iconActive))){
            text("Click to activate", width/2,400);
        }else{
            text("Click to unlock (" + iconCost[iconActive] + ")", width/2,400);
        }
        image(leftImg,width/2-100,330);
        image(rightImg,width/2+50,330);
        pop();
}

function shopUpdate(){
    //back to menu
        if(isRectClicked(width/2-100,450,200,100)){
        start=0;
        sec=0;
        secC=0;
        min=0;
        saveAllCookies();
        }
    //left
        if (mouseX >= 300 && mouseX <= 350 && mouseY >= 330 && mouseY <= 380) {
        iconActive--;
        if(iconActive<1){
            iconActive=15;
        }
        }
    //right
        
        if(isRectClicked(450,330,50,50)){
            iconActive++;
        if(iconActive>15){
            iconActive=1;
        }
        }
    //icon
        if(isRectClicked(width/2-25,330,50,50)){
            if((iconBinary & pow(2,iconActive)) == (pow(2,iconActive))){
                changeIcon(iconActive);
                iconSaved = iconActive;
                saveAllCookies();
            }else if(gold >= iconCost[iconActive]){
                gold = gold - iconCost[iconActive];
                iconBinary = int(iconBinary) + pow(2,iconActive);
                iconSaved = iconActive;
                changeIcon(int(iconSaved));
                iconList[iconActive]=1;
                saveAllCookies();
            }else if(gold < iconCost[iconActive]){
                alert("Insufficient funds");
            }
        }
    //upgrade1
        if(isRectClicked(150,80,50,50)){
            if(upgrade1 == 0){
               if(gold >= 500){
                   upgrade1 = 1;
                   gold = gold-500;
                   saveAllCookies();
               }else{
                   alert("Insufficient funds");
               }
            }
        }
    //upgrade2
        if(isRectClicked(150,150,50,50)){
            if(upgrade2 == 0){
               if(gold >= 300){
                   upgrade2 = 1;
                   gold = gold-300;
                   saveAllCookies();
               }else{
                   alert("Insufficient funds");
               }
            }
        }
    //upgrade3
        if(isRectClicked(150,220,50,50)){
            if(upgrade3 == 0){
               if(gold >= 100){
                   upgrade3 = 1;
                   gold = gold-100;
                   saveAllCookies();
               }else{
                   alert("Insufficient funds");
               }
            }
        }
}

function changeIcon(number){
    switch (number) {
    case 1:
        player.image=player1Img;
        break;
    case 2:
        player.image=player2Img;
        break;
    case 3:
        player.image=player3Img;
        break;
    case 4:
        player.image=player4Img;
        break;
    case 5:
        player.image=player5Img;
        break;
    case 6:
        player.image=player6Img;
        break;
    case 7:
        player.image=player7Img;
        break;
    case 8:
        player.image=player8Img;
        break;
    case 9:
        player.image=player9Img;
        break;
    case 10:
        player.image=player10Img;
        break;
    case 11:
        player.image=player11Img;
        break;
    case 12:
        player.image=player12Img;
        break;
    case 13:
        player.image=player13Img;
        break;
    case 14:
        player.image=player14Img;
        break;
    case 15:
        player.image=player15Img;
        break;
    case 16:
        player.image=player16Img;
        break;
    }
}

function isRectClicked(x,y,w,h){
    if (mouseX >= x && mouseX <= x+w && mouseY >= y && mouseY <= y+h) {
        return true;
    }
}

