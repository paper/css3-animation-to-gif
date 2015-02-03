
//用户配置
var config = {
  url : './demo/p-loading.htm',
  width : 50, 
  height : 50,
  
  time : 2500,   //动画一个周期的时间
  number : 20,   //小图片个数
  
  name : 'bubble',
  toDir : './bubble-frame/'
};

var page = require('webpage').create();

page.onConsoleMessage = function(msg, lineNum, sourceId) {
  console.log('CONSOLE: ' + msg + ' (from line #' + lineNum + ' in "' + sourceId + '")');
};

page.viewportSize = { width: config.width, height: config.height };

page.open(config.url, function(status){
  
  console.log('loading...');
  
  if( status !== 'success' ){
    console.log('please check your config\'s url');
    phantom.exit();
  }
  
  var number = config.number;
  var step = parseInt( config.time / number, 10);
  var delay = step;
  var cid = 0;
  
  // render 时间修正
  // 如果渲染多花了 t2 - t1 的时间，那么下次的渲染得提早点
  var t1, t2;
  
  var imgsBase64Wrap = [];
  
  function fn(){
    if( number === 0 ) {
    
      page.viewportSize = { width: config.number * config.width, height : config.height };
      page.content = '<html><body><canvas id="canvas"></canvas></body></html>';

      page.evaluate(function(obj) {
        
        document.body.style.margin = '0';
        
        var imgsBase64Wrap = obj.imgsBase64Wrap;
        var config = obj.config;
        
        var el = document.getElementById('canvas');
        var context = el.getContext('2d');
        var width = window.innerWidth;
        var height = window.innerHeight;

        el.width = width;
        el.height = height;
        
        var len = imgsBase64Wrap.length;
        var i = 0;
        
        function drawImage(){
          if( i >= len ){
            return;
          } 
          
          var img = document.createElement("img");
          var imgSrc = 'data:image/png;base64,' + imgsBase64Wrap[i];
          i++;
          
          img.onload = function(){
            context.drawImage(img, config.width * i, 0, config.width , config.height);
            drawImage();
          };
          
          img.src = imgSrc;
          
        }//end drawImage
        
        drawImage();
        
      }, {
        imgsBase64Wrap : imgsBase64Wrap,
        config : config
      });
      
      setTimeout(function(){
        page.render(config.name + '.png');
        
        console.log('done~');
        phantom.exit();
      }, 2000);
      
    }else{
    
      var fileName = config.name + cid;
      cid++;

      setTimeout(function(){
        t1 = +new Date();
        
        // 如果想生成很多每一帧小图片的童鞋，可以使用下面的代码
        // page.render(config.toDir + fileName + '.png');
        
        imgsBase64Wrap.push( page.renderBase64('PNG') );
        
        t2 = +new Date();
        
        number--;
        step = delay - (t2-t1);
        fn();
      },step);
    }
    
  }//end fn
  
  fn();
});


