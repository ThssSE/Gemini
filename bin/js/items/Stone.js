var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Game;
(function (Game) {
    Game.fallingStoneSpeed = 2; //陨石下落的平均速度
})(Game || (Game = {}));
//岩石类
var Stone = /** @class */ (function (_super) {
    __extends(Stone, _super);
    function Stone(backgroundImage, width, height, name, isFalling) {
        if (isFalling === void 0) { isFalling = false; }
        var _this = _super.call(this, backgroundImage, width, height, name) || this;
        _this.item = new Laya.Image(); //重新绘制一个图片
        _this.isFalling = isFalling;
        _this._up = 0;
        _this._down = Game.initialY;
        _this.init();
        return _this;
    }
    Stone.prototype.init = function () {
        this._isTouched = false;
        this._hasInit = false;
        this.isFalling = Math.random() < BarrierParameter.fallingStoneRate;
        this._fallingStoneSpeed = Math.random() % Game.fallingStoneSpeed / 2 + Game.fallingStoneSpeed;
    };
    //绘制item
    Stone.prototype.drawItem = function () {
        if (!this.isFalling) {
            this.item.skin = Game.stoneImage;
            this.item.scaleX = this._width / 40;
            this.item.scaleY = this._height / 85;
        }
        else {
            this.item.skin = Game.fallingStoneImage;
            this.item.scaleX = this._width / 30;
            this.item.scaleY = this._height / 100;
        }
    };
    //判断球是否与陨石相撞
    Stone.prototype.detectCollisions = function (ball) {
        if (this._isTouched)
            return false; //如果已经碰撞，则不再判断
        return this.getInnerBounds(this.item.getBounds(), 0.8, 0.8).intersects(ball.animation.getBounds());
    };
    //不断更新陨石的位置，只有当_isFalling为真时，位置才会改变
    Stone.prototype.update = function () {
        if (this.isFalling) {
            if (!this._hasInit) { //保证陨石的初始化高度不会太低
                if (this.item.y > (this._down * 0.8))
                    this.item.y = this._up;
                this._hasInit = true;
            }
            this.item.y += this._fallingStoneSpeed; //不断坠落
            if (this.item.y >= this._down + this._height) { //重复利用坠落的陨石
                this.item.y = this._up - this._height;
            }
        }
    };
    return Stone;
}(Barrier));
//# sourceMappingURL=Stone.js.map