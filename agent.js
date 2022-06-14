class AgentList {
    constructor(size, speed, path, playground){
        this.size = size; 
        this.speed = speed; 
        this.path = path;
        this.list = [];
        this.playground = playground;
        this.hightlightIndex = 0;
    }

    addAgent(pos = null){

        if (pos == null){ pos = {
            x : random(this.playground.xmin, this.playground.xmax),
            y : random(this.playground.ymin, this.playground.ymax)
            };
        };

        this.list.push(new Agent(this.list.length, pos, this.size , this.speed, this.playground, this.path));
    }

    push(agent){this.list.push(agent);}

    getAgent(index){return this.list[index];}

    getHightlight(){
        return this.list[this.hightlightIndex];
    }

    draw(){
        for (var i = 0; i < this.list.length; i++){
            this.list[i].draw();
        }
    }

    update(){
        for (var i = 0; i < this.list.length; i++){
            this.list[i].update();
        }

        this.checkCollide()
    }

    checkCollide(){}
}


class Agent {
    constructor(id,pos,size,speed,playground,path){
        this.id = id;
        this.pos = pos;
        this.speed = speed;
        this.direction = random(-PI,PI);
        this.pic = loadImage(path);
        this.size = size;
        this.pic.resize(this.size, 0);
        this.playgound = playground;
        this.hightlight = false;
    }

    update(){
        //move
        this.pos.x += this.speed*cos(this.direction);
        this.pos.y += this.speed*sin(this.direction);

        //handle out of bounds
        if (this.pos.x >= this.playgound.xmax){this.direction = PI - this.direction; this.pos.x -= this.speed};
        if (this.pos.x <= this.playgound.xmin){this.direction = PI - this.direction; this.pos.x += this.speed};
        if (this.pos.y >= this.playgound.ymax){this.direction = - this.direction; this.pos.y -= this.speed};
        if (this.pos.y <= this.playgound.ymin){this.direction = - this.direction; this.pos.y += this.speed};

    }

    draw(){
        image(this.pic, this.pos.x, this.pos.y);
        if(this.highlight){
            noFill();
            stroke(51);
            circle(this.pos.x, this.pos.y, this.size);
        }
    }

    pointCollide(x,y){
        return collidePointCircle(x,y,this.pos.x,this.pos.y,this.size)
    }

    copy(agent){
        this.id = agent.id;
        this.pos = agent.pos;
        this.speed = agent.speed;
        this.direction = agent.direction;
        this.pic = agent.pic;
        this.size = agent.size;
        this.playgound = agent.playground;
        this.hightlight = agent.hightlight;
    }
}