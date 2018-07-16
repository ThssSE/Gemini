var Barrier=function(){function t(t,i,e,h,a,o,s){void 0===i&&(i=5),void 0===e&&(e=15),void 0===h&&(h=100),void 0===a&&(a=100),void 0===o&&(o=50),void 0===s&&(s=100),this.blackHoles=[],this.stones=[],this._blackHolesNum=i,this._stonesNum=e,this._blackHoleWidth=h,this._blackHoleHeight=a,this._stoneWidth=o,this._stoneHeight=s,this.updateBarrier(t)}return t.prototype.updateBarrier=function(t){var i=this;for(this.blackHoles.slice(0),this.stones.slice(0);t.removeChildByName("blackhole"););for(;t.removeChildByName("stone"););for(var e=t.height/this._blackHolesNum,h=0;h<this._blackHolesNum;h++){var a=new Laya.Animation;a.width=this._blackHoleWidth,a.height=this._blackHoleHeight,a.name="blackhole",a.x=Math.min(t.width-this._blackHoleWidth,Math.random()*t.width),a.y=Math.min((h+Math.random())*e,t.height-this._blackHoleHeight-100),this.blackHoles.push(a),t.addChild(a)}for(var o=t.height/this._stonesNum,s=function(e){var h=new Laya.Image;h.width=n._stoneWidth,h.height=n._stoneHeight,h.name="stone";var a,s,l,r;for((r=new Laya.Sprite).width=n._blackHoleWidth+2*n._stoneWidth,r.height=n._blackHoleHeight+2*n._stoneHeight;;)if(s=Math.min(t.width-n._stoneWidth,Math.random()*t.width),l=Math.min((e+Math.random())*o,t.height-n._stoneHeight-100),a=0,n.blackHoles.forEach(function(t){r.x=t.x-i._stoneWidth,r.y=t.y-i._stoneHeight,r.hitTestPoint(s,l)&&(a+=1)}),!a)break;h.x=s,h.y=l,n.stones.push(h),t.addChild(h)},n=this,h=0;h<this._stonesNum;h++)s(h)},t.prototype.drawBarriers=function(){var t=this;this.blackHoles.forEach(function(i){i.loadAnimation(Game.serverResURL+"/GameAnimation/BlackHole.ani"),i.scaleX=t._blackHoleWidth/100,i.scaleY=t._blackHoleHeight/100,i.play()}),this.stones.forEach(function(i){i.loadImage("res/atlas/ui/stone.png"),i.scaleX=t._stoneWidth/108,i.scaleY=t._stoneHeight/191})},t}();