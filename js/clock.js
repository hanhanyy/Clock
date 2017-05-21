  window.onload=function(){
var dom = document.getElementById('clock');
var cxt = dom.getContext('2d');               //获取上下文本
var width = cxt.canvas.width;
var height = cxt.canvas.height;
var r = width/2;
var rem  = width / 200;      //给时钟的定义一个比例，适用于各个属性放大或缩小的状态
function drawbackground(){
   cxt.save();
   cxt.fillStyle = 'red';
   cxt.translate(r,r);                           //设置画圆的原点
   cxt.beginPath();                              //设置一条起始路径
   cxt.lineWidth = 10*rem;                       //设置当前线条的宽度
   cxt.arc(0,0,r-cxt.lineWidth/2,0,2*Math.PI,false);          //创建弧
   cxt.stroke();                                //绘制已定的路径
   var hourNum = [3,4,5,6,7,8,9,10,11,12,1,2];       //设一个数组用来存放时间数
   cxt.font = 18 * rem + 'px Arial';
   cxt.textAlign = 'center';                         //画布填充文本竖直方向的居中
   cxt.textBaseline = 'middle';                      //水平方向的居中
   hourNum.forEach(function(number,i){             //遍历数组的时间数，传一个数值和索引值
       var rab = 2 * Math.PI / 12 * i;             //每个时间之间的弧度，因为弧度=弧长/半径，所以整个圆的弧度为2*Math.PI
       var x = Math.cos(rab)*(r-30 *rem);              //x轴的坐标
       var y = Math.sin(rab)*(r-30 *rem);              //y轴的坐标
       cxt.fillText(number,x,y);                  //填充文本
   });
    for(var i= 0; i<60;i++){        //循环小时内的60个点
     var rab = 2 * Math.PI / 60 *i;
     var x = Math.cos(rab) * (r-20 *rem);
     var y = Math.sin(rab) * (r-20 *rem);
     cxt.beginPath();
     if(i % 5 === 0){                  //判断当为小时的时候颜色为黑色，不为小时则为灰色
        cxt.fillStyle = '#000';
       cxt.arc(x,y,2 *rem,0,2*Math.PI,false);
     }
    else{
        cxt.fillStyle = "#ccc";
        cxt.arc(x,y,2 *rem,0,2*Math.PI,false);
        } 
     cxt.fill();                      //填充当前绘图
    }
}
function drawHour(hour,minutes){
  cxt.save();
  cxt.beginPath();
  var rad = 2*Math.PI / 12 *hour;
  var mrad = 2*Math.PI / 12 / 60 *minutes;
  cxt.rotate(rad + mrad);
  cxt.moveTo(0,10 *rem);
  cxt.lineWidth = 6 *rem;
  cxt.lineCap = "round";
  cxt.lineTo(0,-r / 2 );
  cxt.stroke();
  cxt.restore();
}

function drawMinutes(minutes){
  cxt.save();                             //保存当前环境的状态
  cxt.beginPath();
  var rad = 2*Math.PI / 60 *minutes;      //分针的弧度
  cxt.rotate(rad);                        //旋转弧度
  cxt.moveTo(0,10 *rem);                  //把画布创建到指定点，不创建线条
  cxt.lineWidth = 3 *rem;                 //设置或返回当前线条的宽度
  cxt.lineCap = "round";                  //设置或返回当前线条的结束端点样式
  cxt.lineTo(0,-r +30 *rem);              //添加一个新点，然后从该点到指定点的线条
  cxt.stroke();
  cxt.restore();                        //返回之前保存过的路径和属性
}

function drawSecond(second){
  cxt.save();
  cxt.beginPath();
  cxt.fillStyle = "red";
  var rad = 2*Math.PI / 60 *second;
  cxt.rotate(rad);
  cxt.moveTo(-2 *rem,20 *rem);
  cxt.lineTo(2 *rem,20 *rem);
  cxt.lineTo(1, -r +20 *rem);
  cxt.lineTo(-1, -r +20 *rem);
  cxt.fill();
  cxt.restore();
}
function drawDot(){
    cxt.beginPath();
    cxt.fillStyle = '#fff';               //定义填充的样式
    cxt.arc(0,0,3 *rem,0,2 * Math.PI,false);
    cxt.fill();
}
function draw(){
    cxt.clearRect(0,0,width,height);          //给定的矩形内清除样式的像素
    var data  = new Date();
    var hour = data.getHours();
    var minutes = data.getMinutes();
    var second = data.getSeconds();
    drawbackground();
    drawHour(hour,minutes);
    drawMinutes(minutes);
    drawSecond(second);
    drawDot();  
    cxt.restore();
}
draw();
setInterval(draw,1000);
    }