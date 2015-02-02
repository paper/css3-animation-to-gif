
//用户配置
var config = {
  url : './demo/p-loading.htm',
  width : 50, 
  height : 50,
  
  time : 2500,   //动画一个周期的时间
  fps : 33,      //帧
  name : 'bubble',
  toDir : './bubble-frame/'
}

var page = require('webpage').create();

page.viewportSize = { width: config.width, height: config.height };

page.open(config.url, function(status){

  if( status !== 'success' ){
    console.log('please check your config\'s url');
    phantom.exit();
  }
  
  var f = config.fps;
  var step = parseInt( config.time / config.fps, 10);
  var delay = step;
  var cid = 0;
  
  // render 的时间修正
  // 如果渲染多多花了 t2 - t1 的时间，那么下次的渲染得提早点
  var t1, t2;
  
  function fn(){
    if( f == 0 ) {
      phantom.exit();
    }
    
    var fileName = config.name + cid;
    
    cid++;

    setTimeout(function(){
      t1 = +new Date();
      page.render(config.toDir + fileName + '.png');
      t2 = +new Date();
      
      f--;
      step = delay - (t2-t1);
      fn();
    },step);
  }
  
  fn();
});


