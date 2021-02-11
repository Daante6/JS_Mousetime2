                                    //PLAYER
class Player { 
constructor(){  
    this.pos= createVector(width/2,height/2);
    this.size=player4Img.width/2-2;
    this.image = player1Img;
    }
update(){
    this.pos.set(mouseX,mouseY);
}
show(){
    image(this.image,this.pos.x-this.size,this.pos.y-this.size+2);
}
    
} //end Player

class Robot{
    constructor(x,y){  
    this.pos= createVector(x,y);
    this.vel = createVector(0,0);
    this.acc = createVector(0,0);
    this.size=robotImg.width/2;
    this.side = 1; //0-left 1-up 2-right 3-down, clockwise
    }
move(){
    switch(this.side){
        case 0:
            this.vel.set(0,-2);
            if(this.pos.y <= this.size){
                this.side = 1;
            }
            break;
        case 1:
            this.vel.set(2,0);
            if(this.pos.x >= width-this.size){
                this.side = 3;
            }
            break;
        case 2:
            this.vel.set(0,2);
            if(this.pos.y >= height-this.size){
                this.side = 3;
            }
            break;
        case 3:
            this.vel.set(-2,0);
            if(this.pos.x <= this.size){
                this.side = 1;
            }
            break;
    }
}
chase(){
    this.vel=p5.Vector.sub(player.pos, this.pos);
    this.vel.limit(4+0.1*level);
}
update(){
    this.vel.add(this.acc);
    this.pos.add(this.vel);
}
show(){
    image(robotImg,this.pos.x-this.size,this.pos.y-this.size);
}
}//end Robot

                                    //MISSLE
class Missle{
constructor(x,y,velx,vely){
    this.lifemax=1000;
    this.life=this.lifemax;
    this.size=missleImg.height/2;
    this.pos = createVector(x,y);
    this.vel = createVector(velx,vely);
    this.acc = createVector(0,0);
    this.randAcc = floor(random(150,350));
    }
update(){
    
    this.acc=p5.Vector.sub(player.pos, this.pos);
    this.acc.setMag(((this.lifemax-this.life)/this.randAcc)+0.01*level);
    this.vel.add(this.acc);
    this.vel.limit(9+0.05*level);
    this.pos.add(this.vel);
    this.life--;
}
show(){
    //fill(200,50,50);
    //circle(this.pos.x,this.pos.y,this.size);
    push();
    angleMode(RADIANS);
    translate(this.pos.x,this.pos.y);
    rotate(this.vel.heading()+HALF_PI);
    //rotate(this.vel.heading());
    image(missleImg,0-this.size,0-this.size);
    pop();
    fill(255);
}
}//end Missle
                        //MISSLE EXPLODE
class MissleExplode{
constructor(x,y){
    this.pos = createVector(x,y);
    this.lifemax=60;
    this.life=this.lifemax;
    this.size=missleExplodeImg.width/2;
    }
update(){
    this.life--;
}
show(){
        push();
            tint(255, (this.life/this.lifemax)*255);
            image(missleExplodeImg,this.pos.x-this.size,this.pos.y-this.size);
            noTint();
        pop();
    
}    
}//end missleexplode
                    
                                                //LASER RANDOM
class LaserRandom{
    constructor(direction,moving){
        this.lifeMax=100;
        this.life=this.lifeMax;
        this.hit = 0;
        if(direction==0){ //V
            this.pos1=createVector(floor(random(0,800)),-100);
            this.pos2=createVector(floor(random(0,800)),height+100);
        }else{ //H
            this.pos1=createVector(width+100,floor(random(0,600)));
            this.pos2=createVector(-100,floor(random(0,600)));
        }
        if(moving){
            this.vel=p5.Vector.random2D();
        }else{
            this.vel=createVector(0,0);
        }
        
    }
    update(){
        this.life--;
        this.pos1.add(this.vel);
        this.pos2.add(this.vel);
    }
    show(){
        push();
        if(this.life > this.lifeMax-50){
            strokeWeight(floor((this.lifeMax-this.life)/5)+1);
            stroke(255,165,0);
            line(this.pos1.x, this.pos1.y, this.pos2.x, this.pos2.y);
        }else{
            this.hit=1;
            strokeWeight(6);
            stroke(250,10,10);
            line(this.pos1.x, this.pos1.y, this.pos2.x, this.pos2.y);
        }
        pop();
    }
}
                                            //LASER FIGURE
class Laser{
    constructor(x1,y1,x2,y2){
        this.lifeMax=120;
        this.life=this.lifeMax;
        this.pos1=createVector(x1,y1);
        this.pos2=createVector(x2,y2);
        this.hit = 0;
    }
    update(){
        this.life--;
    }
    show(){
        push();
        if(this.life > this.lifeMax-50){
            strokeWeight(floor((this.lifeMax-this.life)/5)+1);
            stroke(255,165,0);
            line(this.pos1.x, this.pos1.y, this.pos2.x, this.pos2.y);
        }else{
            this.hit=1;
            strokeWeight(6);
            stroke(250,10,10);
            line(this.pos1.x, this.pos1.y, this.pos2.x, this.pos2.y);
        }
        pop();
    }
}

                            //ORB
class Orb{
constructor(x,y,velx,vely,color,accx,accy){
    this.lifemax=300;
    this.life=this.lifemax;
    this.size=20;
    this.pos = createVector(x,y);
    this.vel = createVector(velx,vely);
    this.acc = createVector(accx,accy);
    this.color = color;
    }
update(){
    this.life--;
    this.vel.add(this.acc);
    this.vel.limit(6+0.07*level);
    this.pos.add(this.vel);
}
show(){
    push();
    if(this.color == 1){
        //fill(250,250,10);
        image(orb2Img,this.pos.x-this.size,this.pos.y-this.size);
    }else{
        image(orb1Img,this.pos.x-this.size,this.pos.y-this.size);
        //fill(50,50,200);
    }
    //circle(this.pos.x,this.pos.y,this.size);
    pop();
}
}//end Orb

                            //Orb Heart
class OrbHeart extends Orb{
    constructor(x,y,velx,vely,side){
    super(x,y,velx,vely);
    this.acc = createVector(0,0);
    this.side = side;
}
    update(){
        if(this.life > 265){
            this.acc.set(0.9*this.side,0.5);
        }else{
            this.acc.set(-3*this.side,6);
        }
    this.life--;
    //this.vel = p5.Vector.add(this.vel, this.acc);
    this.vel.add(this.acc);
    this.vel.limit(8+0.05*level);
    this.pos.add(this.vel);
    }
    show(){
        //fill(200,20,20);
        //circle(this.pos.x,this.pos.y,this.size);
        image(orb3Img,this.pos.x-this.size,this.pos.y-this.size);
    }
} // end OrbHeart

                                    //Orb SIN
class OrbSine extends Orb{
constructor(x,y,velx,vely){
    super(x,y,velx,vely);
    this.acc = createVector(0,0);
    this.lifemax = 2000;
    this.life = this.lifemax;
}
update(){
    //this.life = this.life - 0.05;
    this.life = this.life - 3;
    
    push();
    angleMode(DEGREES);
    this.acc.set(sin(this.life)*0.1,0);
    pop();
    this.vel = p5.Vector.add(this.vel, this.acc);
    this.vel.limit(9);
    this.pos.add(this.vel);
}
show(){
    image(orb1Img,this.pos.x-this.size,this.pos.y-this.size);
}
}//end OrbSine

        //Orb Robot
class OrbRobot extends Orb{
constructor(x,y){
    super(x,y);
    this.acc = createVector(0,0);
    this.lifemax=990;
    this.life=this.lifemax;
    this.sizeChange = 100+int(level);
}
update(){
    this.pos.set(robot.pos);
    angleMode(RADIANS);
    this.size = abs(sin(this.life)*this.sizeChange);
    this.life = this.life-0.02;
}
show(){
    fill(200,20,20);
    circle(this.pos.x,this.pos.y,this.size);
}
} //end Orb Robot

class Bonus{
    constructor(){
        this.pos = createVector(100+ floor( random(0,4) )*200 , 100+ floor( random(0,4) )*200);
        this.life=60;
        this.size=scoreHitImg.width/2;
    }
    show(){
    image(scoreHitImg,this.pos.x-this.size,this.pos.y-this.size);
}
}

class BonusPoints{
    constructor(x,y){
        this.pos = createVector(x,y);
        this.life=60;
        this.vel = createVector(0,-2);
    }
    show(){
        text("+5 gold",this.pos.x,this.pos.y);
    }
    update(){
        this.life--;
        this.pos.add(this.vel);
    }
}

class Barrier{
    constructor(x,y){
        this.pos = createVector(x,y);
        this.life=60;
        this.pic=1;
        this.picC=0;
        this.size = barrier1Img.width/2;
    }
    update(){
        this.life--;
        this.pos.set(player.pos);
        this.picC++;
        if(this.picC == 4){
            this.pic = this.pic * -1;
            this.picC=0;
        }
    }
    show(){
        if(this.pic == 1){
            image(barrier1Img,this.pos.x-this.size,this.pos.y-this.size);
        }else{
            image(barrier2Img,this.pos.x-this.size,this.pos.y-this.size);
        }
    }
}

