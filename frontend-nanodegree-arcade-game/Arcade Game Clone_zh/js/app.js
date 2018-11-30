//非常抱歉，让您等了这么久，因为我的个人原因，现在才开始前端进阶的学习，
//刚开始看的时候有点懵，不知到该从何下手，在此http://discussions.youdaxue.com/t/topic/32577处参考别人的思路
//写代码前要整理清楚自己的思路，有计划，分模块的完成一项任务
//在碰撞检测初遇到问题，参考http://discussions.youdaxue.com/t/classic-arcade-game/36088
//代码规范参考http://udacity.github.io/frontend-nanodegree-styleguide/javascript.html
//
//使用严格模式
'use strict';

// 这是我们的玩家要躲避的敌人 
var Enemy = function(x,y,speed) {
    // 要应用到每个敌人的实例的变量写在这里
    // 我们已经提供了一个来帮助你实现更多
    this.x = x;
    this.y = y;
    // 敌人的图片，用一个我们提供的工具函数来轻松的加载文件
    this.sprite = 'images/enemy-bug.png';
    this.speed = speed;
};

// 此为游戏必须的函数，用来更新敌人的位置
// 参数: dt ，表示时间间隙
Enemy.prototype.update = function(dt) {
    // 你应该给每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上
    // 都是以同样的速度运行的
    this.x += dt * this.speed;
    //当虫子超出屏幕范围，将敌人复位
    if(this.x > 505){
        //敌人回到起始位置
        this.x = -101;
    };
    //检测玩家的状态
    //player.update();
    //检测敌人和玩家是否碰撞
    this.CollisionTest(player);
};

//此函数用来做敌人和玩家的碰撞测试
//参考http://discussions.youdaxue.com/t/classic-arcade-game/36088的碰撞测试
Enemy.prototype.CollisionTest  = function (player) {
    if (this.y -40 <= player.y && player.y <= this.y + 40 && this.x -50 <= player.x && player.x <= this.x+60) {
        //挑战失败，玩家回到起始位置
        player.x = 202;
        player.y = 83 * 4 + 55;
   };
};

// 此为游戏必须的函数，用来在屏幕上画出敌人，
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// 这是我么胜利的标志
//var Star = function(x,y) {
//     this.x = x;
//     this.y = y;
//     // 敌人的图片，用一个我们提供的工具函数来轻松的加载文件
//     this.sprite = 'images/Star.png';
// };

// //为此游戏绘制胜利图案
// Star.prototype.render = function() {
//     ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
// };



// 现在实现你自己的玩家类
// 这个类需要一个 update() 函数， render() 函数和一个 handleInput()函数
var Player =function(x,y){
    this.x = x;    //玩家的位置，横坐标
    this.y = y;    //玩家的位置，纵坐标
    this.sprite = 'images/char-cat-girl.png';    //玩家图片
};

//此函数用来检测玩家的状态
Player.prototype.update = function () {
//当玩家到达水域，玩家回到起始位置
    if(this.y <= 0){
        num += 1;

        alert(`恭喜成功！！！ 已成功过河${num}次`);
        player.x = 202;
        player.y = 83 * 4 + 55;
    };
};

//此函数用来控制玩家的方向，并且给玩家设置的移动范围
//此处调整玩家的地方花费时间过多，不能钻牛角尖
//参考http://discussions.youdaxue.com/t/classic-arcade-game/36088
Player.prototype.handleInput = function (movement) {
    switch(movement){
        //左
        case 'left': 
            if(this.x > 0){
                this.x -= 101;
            } break;
        //右
        case 'right':
            if(this.x < 400){
                this.x += 101;
            } break;
        //上
        case 'up': 
            if(this.y >= 55){
                this.y -= 83;
            } break;
        //下
        case 'down':
            if(this.y <= 380){
                this.y += 83;
            } break;
    }

};

//在屏幕上画出玩家
Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite),this.x,this.y);
};

// 现在实例化你的所有对象
// 把所有敌人的对象都放进一个叫 allEnemies 的数组里面
// 把玩家对象放进一个叫 player 的变量里面
// 参考http://discussions.youdaxue.com/t/classic-arcade-game/36088

// 此函数生成随机数
function randomNum(){
    return parseInt(Math.random()*(200-50+1)+50,10);
};

// 敌人
var allEnemies = [];
//可控制敌人的密度（敌人的数量）
for (var i = 0; i < 2; i++){
    //控制只虫子只能在规定的三条线路上
    for (var j=0; j < 3; j++){
        allEnemies.push(new Enemy(-101,83 * j + 55,randomNum()));
    };
};

//玩家
var player = new Player(202, 83 * 4 + 55);
//计算成功次数
var num = 0;
//绘制星星
//var star = new Star(202, 83 * 2);



// 这段代码监听游戏玩家的键盘点击事件并且代表将按键的关键数字送到 Player.handleInput()
// 方法里面。你不需要再更改这段代码了。
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);

});
