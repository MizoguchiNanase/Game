var canvas;
var scene = 0;
var hpme = 250;
var hpyou = 250;
var attackme = 30;
var attackyou = 30;
var time = 30;

  var keyStr;
  var select = 0;
  var select_e = 0;

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
    //initGame();
}

//使う値の初期化
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
function end(num){
    //スコア換算とランキング登録
    var name = "User";
    var score = 30-time*100+hpme;
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
  if(hpme == 0){
    return 2;
  }
  if(hpyou == 0){
    return 1;
  }
  if(time == 0){
    return 3;
  }
  if((hpme > 0)&&(hpyou > 0)){
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

  character(me,you);
}
/*
function redraw(){
  draw();
}*/

//キー判定
document.onkeydown = function (e){
  if(scene == 1){
    if(e.keyCode == 38){//上
        keyStr = "溜め";
        select = 1;
    }else if(e.keyCode == 39){//右
        keyStr = "攻撃";
        select = 2;
    }else if(e.keyCode == 40){//下
        keyStr = "守り";
        select = 3;
    }/*else if(e.keyCode == 37){//左
        keyStr = "リタイア";
        select = 4;
    }*/else {
        select = 0;
    }

    //CPの技選択
    select_e = Math.floor( Math.random()*3 ) + 1;
    if(select != 0){
      hpupdate(select,select_e);
      j = judge(select,select_e);

      switch(j){
         case 0://勝ち負けついてない
             draw();
             break;
         case 1://勝ち
             end(1);
             runking();
             break;
         case 2://負け
             end(2);
             runking();
             break;
         case 3://引き分け
             end(3);
             runking();
             break;
         default:
             draw();
         }
         /*
         select = 0;
         select_e = 0;
         */
         var k;
         if(select_e == 1){
           k = "溜め";
         }else if(select_e == 2){
           k = "攻撃";
         }else if(select_e == 3){
           k = "守り";
         }else{
           k = "--";
         }
         console.log(scene,select,select_e,keyStr,k);
         console.log(time,hpme,attackme,hpyou,attackyou);
       }
   }
}

//体力表示更新
function character(me,you){

    var img = new Image();
    img.src = "../image/pi.jpg";
    ctx.drawImage(img,0,0,500,500);
}


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
  if(me==2){
    attackme=30;
  }
  if(you==2){
    attackyou=30;
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

//ページ遷移
function ChangeToMenu() {
    $("#menu_page").css({
        "display": "block"
    });
    $('#play_page').css({
        "display": "none"
    });
    $("#howto_page").css({
        "display": "none"
    });
    $("#runking_page").css({
        "display": "none"
    });
}
function ChangeToPlaying() {
    $("#menu_page").css({
        "display": "none"
    });
    $('#play_page').css({
        "display": "block"
    });
    $("#howto_page").css({
        "display": "none"
    });
    $("#runking_page").css({
        "display": "none"
    });
}
function ChangeToHowto() {
    $('#menu_page').css({
        "display": "none"
    });
    $("#play_page").css({
	"display": "none"
    });
    $('#howto_page').css({
        "display": "block"
    });
    $("#runking_page").css({
        "display": "none"
    });
}
function ChangeToRunking() {
    $('#menu_page').css({
        "display": "none"
    });
    $("#play_page").css({
        "display": "none"
    });
    $("#howto_page").css({
        "display": "none"
    });
    $('#runking_page').css({
        "display": "block"
    });
}
