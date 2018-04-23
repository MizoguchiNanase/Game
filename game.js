var canvas;
var scene;
var hpme = 250;
var hpyou = 250;
var attackme = 30;
var attackyou = 30;
var time = 30;
var test;

var element = document.getElementById("time");
element.innerHTML = time;

window.onload = function(){
    canvas = document.getElementById('game');
    ctx = canvas.getContext('2d');
    buttonStart = document.getElementById('start_button');
    buttonHowto = document.getElementById('howto_button');
    buttonRunking = document.getElementById('runking_button');
    buttonStart.addEventListener('click', start);;
    buttonHowto.addEventListener('click', howto);;
    buttonRunking.addEventListener('click', runking);
    initGame();
}

function initGame(){
    hpme = 250;
    hpyou = 250;
    attackme = 30;
    attackyou = 30;
    time = 30;
}

//スタート画面
function start(){
    scene = 1;
    draw();
}
//ゲームクリア->ランキング画面
function end(){
    //スコア換算とランキング登録
    Name = "User";
    Score = 30-time*100+hpme;
    //データベースに登録
    runking();
}
//遊び方画面
function howto(){
    scene = 2;
    ChangeToHowto();
}
//ランキング画面
function runking(){
    scene = 3;
    ChangeToRunking();
}

//勝敗判定
function judge(){
  if(hpme==0){
    return 2;
  }
  if(hpyou==0){
    return 1;
  }
  if(time==0){
    return 3;
  }
  if((hpme>0)&&(hpyou>0)){
    return 0;
  }
}

//画面描画
function draw(){
ctx.fillStyle = "#eeeeee";
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.fillStyle = "#0a0a0a";
ctx.font = "48px serif";
ctx.fillText(hpme, 10, 50);
}

//キー判定
document.onkeydown = function (e){
  var keyStr;
  var select;
  var select_e;
  if(e.keyCode == 38){
      keyStr = "溜め";
      select = 1;
  } if(e.keyCode == 39){
      keyStr = "攻撃";
      select = 2;
      } if(e.keyCode == 40){
           keyStr = "守り";
           select = 3;
       } if(e.keyCode == 37){
           keyStr = "リタイア";
           select = 4;
       } else {
           //
           select = 0;
       }
       if(scene == 1){
           select_e = Math.random()%4 + 1;

           j = judge(select,select_e);
           switch(j){
           case 0:
               draw();
               break;
           case 1:
               end(1);
               runking();
               break;
           case 2:
           end(2);
           runking();
           break;
       case 3:
           end(3);
           runking();
           break;
       default:
           draw();
       }
       select = 0;
       select_e = 0;
   }
  }
}

//体力表示更新
function hpupdate(me,you){
  if(me==1){
    attackme+=30;
  }
  if(you==1){
    attackyou+=30;
  }
  if((me==2)&&(you==1)){
    hpyou-=attackme;
  }
  if((me==1)&&(you==2)){
    hpme-=attackyou;
  }
  if((me==2)&&(you==2)){
    if(attackme>attackyou){
      hpyou-=(attackme-attackyou);
    }
    else if(attackme<attackyou){
      hpme-=(attackyou-attackme);
    }
  }
  if((me==3)&&(you==2)){
    attackyou=30;
  }
  if((me==2)&&(you==3)){
    attackme=30;
  }
  if(hpme<0){
    hpme=0;
  }
  if(hpyou<0){
    hpyou=0;
  }
  $("#me").css({
    "width":hpme+"px"
  });
  $("#you").css({
    "width":hpyou+"px"
  });
  time--;
  element.innerHTML = time;

}
