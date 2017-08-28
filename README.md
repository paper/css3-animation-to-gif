# css3-animation-to-gif
利用 Phantomjs 把 css3 动画 变成 gif 的帧


## 说明

#### 一开始

1. 使用 `PhantomJS` 抓取 demo 文件夹里 `p-loading.htm` 播放css3动画的截图
1. 一张一张存储起来，放到 bubble-frame 里面
1. 利用 gif 制作软件（我这里使用的是 Easy GIF Animator 6 Pro，一键操作，10秒不到）生成 gif 图（就是在 bubble-frame 里面的 bubble.gif）

**但** gif 效果很差！ :scream: :gun:


#### 所以修改

1. 每次截图，保存为base64，先存储起来
1. 新建一个带有 `canvas` 的页面，把存起来的图片，顺序平铺到画布上
1. 再截这个 “sprite” 图片

使用 `setInterval`（或 `setTimeout`）播放这个图片： [Demo](https://paper.github.io/css3-animation-to-gif/togif-test.html)

可以和 [css3 的动画](https://paper.github.io/css3-animation-to-gif/demo/p-loading.htm) 做个对比，效果还不错~   
或者看 [这里](https://paper.github.io/p-loading/p-loading.htm)

## 补充

1. 最后生成的精灵图片，可以使用我写的 [tiny node插件](https://github.com/paper/tinypng-node-plugin)，自动压一下。当然也可以自己通过tiny官网去压一下，能节省不少空间
1. `page.evaluate` 环境好像不能读取本地的图片，所以才改为base64的，如果有知道的童鞋希望可以告诉我一下
1. 显示时，动画运行；隐藏时，动画停止。这样可以节省性能，也应该这样去做。聪明的你，一定知道怎么做~~
