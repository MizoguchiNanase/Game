<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="utf-8">
  <title>battle game!</title>
  <link rel="stylesheet" href="css/styles.css">
</head>
<body>
  <div id="menu_page" class="container" style="display: block;">
    <div id="title">battle game</div>
    <div class="buttons">
      <div id="start_button" class="menu_button" onclick="ChangeToPlaying();">スタート</div>
      <div id="howto_button" class="menu_button" onclick="ChangeToHowto();">遊び方</div>
      <div id="runking_button" class="menu_button" onclick="ChangeToRunking();">ランキング</div>
    </div>
  </div>
  <div id="play_page" class="container" style="display: none;">
    <div id="canvas_wrapper">
      <canvas id="game" width="500" height="300"></canvas>
    </div>
    <div id="hp_container">
      <div class="hp_wrapper">
        <div id="me"></div>
      </div>
      <div class="hp_wrapper">
        <div id="you"></div>
      </div>
      <div class="hp_wrapper">
        <div id="me_en"></div>
      </div>
      <div class="hp_wrapper">
        <div id="you_en"></div>
      </div>
      <div id="time"></div>
    </div>
  </div>
  <div id="howto_page" class="container" style="display: none;">
    <div id="title">遊び方</div>
  </div>
  <div id="runking_page" class="container" style="display: none;">
    <div id="title">ランキング</div>
    <?php
      $score = $_POST["score"];
      echo "score=".$score;


    ?>

  </div>




</body>
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js"></script>
<script src = "js/main.js"></script>
</html>
