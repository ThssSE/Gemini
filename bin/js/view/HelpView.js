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
//游戏的帮助界面
var HelpView = /** @class */ (function (_super) {
    __extends(HelpView, _super);
    //构造函数
    function HelpView() {
        var _this = _super.call(this) || this;
        _this.prevY = 0;
        _this.contentImage.scrollRect = new Laya.Rectangle(0, 0, 600, 330);
        _this.init();
        return _this;
    }
    HelpView.prototype.init = function () {
        this.contentImage.y = 50;
        this.contentImage.scrollRect.y = 0;
        //设置拖动查看事件
        this.contentImage.on(Laya.Event.MOUSE_DOWN, this, this.startScrollText);
    };
    //开始拖动图像
    HelpView.prototype.startScrollText = function (e) {
        this.prevY = this.contentImage.mouseY;
        this.on(Laya.Event.MOUSE_MOVE, this, this.scrollText);
        this.on(Laya.Event.MOUSE_UP, this, this.finishScrollText);
    };
    //停止拖动图像
    HelpView.prototype.finishScrollText = function (e) {
        this.off(Laya.Event.MOUSE_MOVE, this, this.scrollText);
        this.off(Laya.Event.MOUSE_UP, this, this.finishScrollText);
    };
    //拖动图像
    HelpView.prototype.scrollText = function (e) {
        var nowY = this.contentImage.mouseY;
        this.contentImage.scrollRect.y += this.prevY - nowY;
        //设置拖动范围
        this.contentImage.scrollRect.y = Math.max(-50, this.contentImage.scrollRect.y);
        this.contentImage.scrollRect.y = Math.min(this.contentImage.height - 200, this.contentImage.scrollRect.y);
        this.prevY = nowY;
    };
    return HelpView;
}(ui.HelpViewUI));
//# sourceMappingURL=HelpView.js.map