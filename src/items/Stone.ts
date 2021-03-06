namespace Game{
    export const fallingStoneSpeed: number = 2;//陨石下落的平均速度
}

//岩石类
class Stone extends Barrier<Laya.Image>{
    public isFalling:boolean;//是否正在坠落
    private _fallingStoneSpeed: number;//坠落速度
    private _up: number;//最高处
    private _down: number;//最低处
    private _hasInit: boolean;//是否完成位置的初始化

    constructor(backgroundImage:Laya.Image,width:number,height:number,name:string, isFalling:boolean=false)
    {
        super(backgroundImage,width,height,name);
        this.item = new Laya.Image();//重新绘制一个图片
        this.isFalling = isFalling;
        this._up = 0;
        this._down = Game.initialY; 
        this.init();
    }

    public init():void{
        this._isTouched = false;
        this._hasInit = false;
        this.isFalling = Math.random() < BarrierParameter.fallingStoneRate;
        this._fallingStoneSpeed = Math.random()%Game.fallingStoneSpeed/2+Game.fallingStoneSpeed;
    }

    //绘制item
    public drawItem():void
    {
        if(!this.isFalling){
            this.item.skin = Game.stoneImage;
            this.item.scaleX=this._width/40;
            this.item.scaleY=this._height/85;
        }else{
            this.item.skin = Game.fallingStoneImage;
            this.item.scaleX=this._width/30;
            this.item.scaleY=this._height/100;
        }
    }

    //判断球是否与陨石相撞
     public detectCollisions(ball:Ball):boolean
     {
        if(this._isTouched)
            return false;//如果已经碰撞，则不再判断
        return this.getInnerBounds(this.item.getBounds(), 0.8,0.8).intersects(ball.animation.getBounds());
     }

     //不断更新陨石的位置，只有当_isFalling为真时，位置才会改变
     public update(){
         if(this.isFalling){
            if(!this._hasInit){//保证陨石的初始化高度不会太低
                if(this.item.y > (this._down * 0.8))
                    this.item.y = this._up;
                this._hasInit = true;
            }
            this.item.y += this._fallingStoneSpeed;//不断坠落
            if(this.item.y >= this._down+this._height){//重复利用坠落的陨石
                this.item.y = this._up-this._height;
            }
         }
     }
}