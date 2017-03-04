# Nav.js

基于JQuery的导航栏小插件

### 基本使用
```html
<style>
        .nav{
            position: fixed;
        }
        .nav_item.active {
            background: cadetblue;
        }
</style>

<div class="nav">
    <div href="javascript:;" class="nav_item active" data-target=".e-1">example-1</div>
    <div href="javascript:;" class="nav_item " data-target=".e-2">example-2</div>
    <div href="javascript:;" class="nav_item " data-target=".e-3">example-3</div>
    <div href="javascript:;" class="nav_item " data-target=".e-4">example-4</div>
    <div href="javascript:;" class="nav_item " data-target=".e-5">example-5</div>
    <div href="javascript:;" class="nav_item " data-target=".e-6">example-6</div>
</div>
```


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

       // 是否采用内部自带的点击滚动功能
       // 默认是"false"
       autoScroll: settings.autoScroll || false,
       // 是否采用内部自带的滚动高亮检测
       // 默认是"false"
       autoScrollDetect: settings.autoScrollDetect || false,
       // 这两个功能正常使用的前提是，你必须给他指定data-attr，且data-attr是你希望滑动到的元素的选择器。
       // example : <div class = "nav_item" data-target=".my-target1"/>my nav button 1</div>
       // 如果你给出不能选出元素的选择器，将会报错。

       //这个参数晚点再说 :)
       detectionLine: settings.detectionLine || 0.4,
       // 因为在检测滑动的过程中使用了延迟检测避免回调过多导致性能问题，预定是0.05s检测一次，你觉得不够精准的话，可以减少数值。
       detectionInterval: settings.detectionInterval || 50,

       // 在普通情况下这个回调是不会用到的。
       // 但是假如，你希望给你的轮播图加个导航栏。点击导航栏的元素就会滑动到对应的地方。
       // 你可以在html的data-attr上定义好你的位置，navJS会在点击的时候，给你返回一个参数，其值就是你定义的data-attr值。
       // 可以根据这个值，调用轮播图的api，给出位置对其进行移动。
       // ps : 之后我会给一个实例。
       onNavClick: settings.onNavClick || new Function(),

       // 用于自定义检测器，onCustomDetectorRegister会在初始化时被调用，返回一个函数activator(data-attr)。
       // 你传入在html中预定义好的data-attr值，navjs就会帮你给元素加上一个active的类（这个类名是你定义的，或者采用预定值active）
       useCustomDetector: settings.useCustomDetector || false,
       onCustomDetectorRegister: settings.onCustomDetectorRegister || new Function()
   }

```

### 例子
#### 基本使用 2
```html
<style>
        .mynav{
            position: fixed;
        }
        .mynav_item.mynav-active {
            background: cadetblue;
        }
        .e-1,.e-2{
            height : 1000px;
            width : 100%;
        }
</style>

<div class="mynav">
    <div href="javascript:;" class="mynav_item mynav-active" data-targetToItem=".e-1">item1</div>
    <div href="javascript:;" class="mynav_item " data-targetToItem=".e-2">item2</div>
</div>

<div class="e-1">e-1</div>
<div class="e-2">e-2</div>
```

```javascript
var ctrlO = Nav.init({
    autoScroll : true,
    autoScrollDetect : true,
    navClassName: "mynav",
    navActiveClassName: "mynav-active",
    navItemClassName: "mynav_item",
    targetAttr: "targetToItem"
})
```
这是上面基本使用的自定义类版本，带有自动检测位置并高亮元素，且点击对应元素滑动到对应选择器的位置。
```javascript
var ctrlO = Nav.init({
    autoScrollDetect : true,
    navClassName: "mynav",
    navActiveClassName: "mynav-active",
    navItemClassName: "mynav_item",
    targetAttr: "targetToItem"
})
```
这是只带有检测滚动位置的并将对应的元素高亮的功能。
#### 配合滑动元素使用
现在有不少开源的滑动插件，如swiper.js。Navjs可以配合这些插件的api进行导航。
这里演示的不是真实情况下的api，只是一些模拟api，这些api都是十分常见的api，可以在这类滑动插件当中找到。（说白了就是swiper）
为了说明应用，定义几个这里要用的 :
##### slideTo(index)
滑动元素，滑到传入的索引
##### onSlideFinished = function(instance){ instance.index }
滑动结束后的回调函数，```instance``` 是传入滑动元素的实例。```instance.index``` 可以获得滑动后的索引。

先摆出html代码，也是伪代码
```html
<style>
        .mynav{
            position: fixed;
        }
        .mynav_item.mynav-active {
            background: cadetblue;
        }
        .e-1,.e-2{
            height : 1000px;
            width : 100%;
        }
</style>

<div class="mynav">
    <div href="javascript:;" class="mynav_item mynav-active" data-target="1">item1</div>
    <div href="javascript:;" class="mynav_item " data-target="2">item2</div>
</div>
<div>
    这里是你的滑动元素结构....
</div>
```
```javascript
var slideInstance = (一个实例),
    ctrlO = Nav.init({
        navClassName: "mynav",
        navActiveClassName: "mynav-active",
        navItemClassName: "mynav_item",
        targetAttr: "targetToItem",
        // 点击mynav_item后的回调函数，它会返回一个target，就是data-target的值。
        // 假如你设置的target是slideInstance的索引的话，那么slide就会自动滑动到对应的地方。
        onNavClick: function(targetAttr){
            slideInstance.slideTo(targetAttr);
        },
        // 定义滑动超过后悬浮的类名
        navStickyClassName : settings.navStickedClassName || "sticky",
        // 假如有滑动到超过导航条位置后悬浮的需求可以使用这个变量
        isSticky : settings.isSticky || false,
        // 开启自定义探测器
         useCustomDetector:true,
         // 你传入在html中预定义好的data-target值，navjs就会帮你给元素加上一个mynav-active的类）
         // 假如你设置的target是slideInstance的索引的话, 那么对应的元素就会有一个mynav-active的类。
         onCustomDetectorRegister: function(activator){
            slideInstance.onSlideFinished = function(instance){
                activator(instance.index);
            }
         }
    });

```
### 版本
v0.0.1 暂时能用，先开一个坑，因为这个是做项目抽象出来的一个组件，匆忙用了jQuery，之后要摆脱jQuery的魔爪。
v0.0.2 更新了一下 readme，依旧未做测试～。
v0.0.3 更新了一下，加入了滑动到超过导航条位置后添加悬浮类名的功能。