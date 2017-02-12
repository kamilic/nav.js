# Nav.js

基于JQuery的导航栏小插件

### 基本使用
```html
<style>
        pre {
            height: 500px;
        }
        .nav{
            position: fixed;
        }
        .nav_item.active {
            background: cadetblue;
        }
</style>

<div class="nav nav-vertical nav-floating nav-fixed nav-folded">
    <div class="nav-fold_controller"></div>
    <div href="javascript:;" class="nav_item active" data-target=".e-1">example-1</div>
    <div href="javascript:;" class="nav_item " data-target=".e-2">example-2</div>
    <div href="javascript:;" class="nav_item " data-target=".e-3">example-3</div>
    <div href="javascript:;" class="nav_item " data-target=".e-4">example-4</div>
    <div href="javascript:;" class="nav_item " data-target=".e-5">example-5</div>
    <div href="javascript:;" class="nav_item " data-target=".e-6">example-6</div>
</div>
```

#### 创建方式 1
这是一个什么功能都没有的nav, 但你可以通过后续对对象设置参数控制。
```javascript
var ctrlO = Nav.init(); // ${ctrlO} 是一个navCtrl对象，里面包含控制navJS其他功能的参数
```

#### 创建方式 2
你可以通过对 ```Nav.init()``` 传入参数进行初始化。
例子创建的是一个滑动检测高亮和点击到点击nav元素后滑动到其指定位置的nav。
```javascript
var ctrlO = Nav.init({
    autoScroll : true,
    autoScrollDetect : true
})
```

### 参数解释

```javascript
   {
       // 你的nav元素类名
       navClassName: settings.navClassName || "nav",
       // 在点击滑动与滑动检测时会用到的类名，它会被添加到nav_item上，这个类可以用于导航的高亮。
       navActiveClassName: settings.navActiveClassName || "active",
       // nav_item是nav里面的可点击元素，你必须要给它指定类名。 默认值是 "nav_item"。
       navItemClassName: settings.navItemClassName || "nav_item",
       // data-attr的名称，你可以给它定义其他名称，以防它与你的其他应用冲突。
       // 你必须要指定这个，否则出现什么事情我不负责任。。
       targetAttr: settings.targetAttr || "target",
       // 你的nav元素类名
       navClassName: settings.navClassName || "nav",

       // 是否采用内部自带的点击滚动功能
       // 默认是"false"
       autoScroll: settings.autoScroll || false,
       // 是否采用内部自带的滚动高亮检测
       // 默认是"false"
       autoScrollDetect: settings.autoScrollDetect || false,
       // 这两个功能正常使用的前提是，你必须给他指定data-attr，且data-attr是你希望滑动到的元素的选择器。
       // example : <div class = "nav_item" data-target=".my-target1"/>my nav button 1</div>
       // 如果你给出不能选出元素的选择器，将会报错。

       //这两个参数晚点再说 :)
       detectionLine: settings.detectionLine || 0.4,
       detectionInterval: settings.detectionInterval || 50,

       // 在普通情况下这个回调是不会用到的。
       // 但是假如，你希望给你的轮播图加个导航栏。点击导航栏的元素就会滑动到对应的地方。
       // 你可以在html的data-attr上定义好你的位置，navJS会在点击的时候，给你返回一个参数，其值就是你定义的data-attr值。
       // 可以根据这个值，调用轮播图的api，给出位置对其进行移动。
       // ps : 之后我会给一个实例。
       onNavClick: settings.onNavClick || new Function(),

       // 还在测试当中。
       useCustomDetector: settings.useCustomDetector || false,
       onCustomDetectorRegister: settings.onCustomDetectorRegister || new Function()

   }

```

#### 版本
v0.0.1 暂时能用，先开一个坑，因为这个是做项目抽象出来的一个组件，匆忙用了jQuery，之后要摆脱jQuery的魔爪。