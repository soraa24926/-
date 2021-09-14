const canvas =document.querySelector("canvas")
const replay =document.getElementById("replay")
// 正解数
let point = 0;
// 1辺のマスの数　Math.floorは切り捨て整数化
let dim = Math.floor(point / 3) + 2;
// マスの１辺の長さ+2　＋２は間隔空白分
let size =canvas.width / dim;
//答え
let answer =[
  // ランダムは0.0etc1〜0.99etcの数字が出るそれにdimをかけてdim以下の数字を作り出す
  // ループ文が0スタートのためMath.floorで切り捨てを行い整数にして０からdim-1の整数を作る
  Math.floor(Math.random() * dim),
  Math.floor(Math.random() * dim)
];
let play =true

// 2回目以降の表示の際の計算
function init(){
  // 1辺のマスの数　Math.floorは切り捨て整数化
  dim = Math.floor(point / 3) + 2;
  // マスの１辺の長さ+2　＋２は間隔空白分
  size =canvas.width / dim;
  //答え
  answer =[
    // ランダムは0.0etc1〜0.99etcの数字が出るそれにdimをかけてdim以下の数字を作り出す
    // ループ文が0スタートのためMath.floorで切り捨てを行い整数にして０からdim-1の整数を作る
    Math.floor(Math.random() * dim),
    Math.floor(Math.random() * dim)
  ];
}


function draw(){
  // canvasの環境を取得してcanvasが適用されていなかったら終了
  if(typeof canvas.getContext ==="undefined"){
    return;
  }
  // ２Dでの表示
   ctx = canvas.getContext("2d");

  // 前回のエリアのクリア
  ctx.clearRect(0,0,canvas.width,canvas.height)

  // マスの色彩０〜３６０
  let hue = Math.random() * 360;
  // ベースカラー設定
  let baseColor = 'hsl(' + hue + ', 80%, 50%)';
  // 正解の明るさ
  let lightness = Math.max(75 - point,53);
  // 正解カラー設定
  let answerColor ='hsl(' + hue + ', 80%,' + lightness + '%)'

  //x（横）が０の時のy（縦）０〜dimを生成、xが１の時のetc
  for(let x = 0;x < dim;x++){
    for(let y = 0;y < dim;y++){
      // 赤の透明度０〜１のランダム設定
      // ctx.fillStyle = "rgba(255,0,0,"+ Math.random() + ")";
      // answerの０個目の数字がxかつ１個目の数字がyだったら
      if (answer[0] === x && answer[1] === y) {
        // asswer
        ctx.fillStyle = answerColor;
      } else {
        // answer以外
        ctx.fillStyle = baseColor;
      }
      // X開始地点,Y開始地点,width、height
      ctx.fillRect(size * x,size * y,size - 2,size - 2)

      // // 文字の色
      // ctx.fillStyle ="black"
      // // 標準だと文字表示地点の右上に書かれてしまうため右下に書かれるように指定
      // ctx.textBaseline="top"
      // // 文字表示（表示文字、X軸開始地点、Y軸開始地点）
      // ctx.fillText(x + "`" + y,size * x,size * y)
    }
  }

}

// クリックされた位置の測定
canvas.addEventListener("click",function(e){
  if (play === false) {
    return;
  }
  // canvas(panel)の左上の位置をページ全体から座標で取得　e.targetはクリックした要素
  const panel = e.target.getBoundingClientRect();
  // クリックした位置　ページ全体からのクリックした位置の座標ーページ全体からcanvas左上角までの距離ースクロール分の距離　e.pageはクリックされた座標の取得
  let x = e.pageX - panel.left - window.scrollX;
  let y = e.pageY - panel.top - window.scrollY;
  // answerとクリック位置/１辺サイズを切り捨て整数化し出したクリックしたマスの数が一致したら　Math.floorは切り捨て整数化
  if (answer[0] === Math.floor(x / size) && answer[1] === Math.floor(y / size) ) {
    point++
    // 再度の基本計算
    init();
    // 表示のし直し
    draw();
  }else{
    alert("あなたのスコアは" + point + "です！")
    play =false
    // クラスの書き込み　空白のためなしに
    replay.className ="";
  }
})
//初めの表示
draw();
