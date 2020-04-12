
# daterangepicker 使用及小bug修复
>2018-02-28
<tag-part tagName="javascript"/>
[[toc]]

双日历时间段选择插件 — daterangepicker是bootstrap框架后期的一个时间控件，可以设定多个时间段选项，也可以自定义时间段，由用户自己选择起始时间和终止时间，时间段的最大跨度可以在程序里设定。

## 一、引用

daterangepicker依托monent.js 和jquery使用。所以在使用中在引入daterangepicker之前必须引入monent.js和jquery以及bootstrap。
```html
<script type="text/javascript" src="jquery.js"></script>
<script type="text/javascript" src="moment.js"></script>
<script type="text/javascript" src="daterangepicker.js"></script>
<link rel="stylesheet" type="text/css" href="bootstrap.css" />
<link rel="stylesheet" type="text/css" href="daterangepicker-bs3.css" />
```
或者在使用模块化编程时，比如使用seaj.js时，在整个代码压缩前面加入
```javascript
define("gallery/daterangepicker/1.3.7/daterangepicker",["jquery","moment","./daterangepicker-bs3.css"], function(a){a("jquery");window.moment=a("moment"),a("./daterangepicker-bs3.css"),
````

(中间可以加入daterangepicker.js的源代码）（此刻在项目中遇到，自己折腾的出来的，可用；还不通透，有待进步）　　

最后面加入

```javascript
define("gallery/daterangepicker/1.3.7/daterangepicker-bs3.css",[],function(){   
    seajs.importStyle(".daterangepicker{position:absolute;color:inherit;
    //.........
    }
    )}) 
})
```

## 　二、使用

在使用中，需要注意datetimepicker的参数配置（这个在官网上都可以查到），此处我想说明的是，可以在官网上下载源码，根据其demo来配置参数了解其各个用处

![image](http://upload-images.jianshu.io/upload_images/6230931-be168163ae890b69..png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

在上面的复选框中通过选择，可以配置不同的参数。此处简单说明一下自己在项目中所用到的参数，以及使用方法。

由于项目整个系统，存在双日期或者单日期，或者有时分秒或者无时分秒。所以两两组合分为四种情况。

所以我使用以下：

```javascript
/**
 * 日历
 * @param obj eles 日期输入框
 * @param boolean dobubble    是否为双日期（true）
 * @param boolean secondNot    有无时分秒（有则true）
 * @return none
 */
function calenders(eles,dobubble,secondNot){
    var singleNot,formatDate;
    if(dobubble ==true){
        singleNot = false;
    }else{
        singleNot = true;
    }
    if(secondNot ==true){
        formatDate = "YYYY-MM-DD HH:mm:ss";
    }else{
        formatDate = "YYYY-MM-DD";
    }
    
    $(eles).daterangepicker({
        "singleDatePicker": singleNot,
        "timePicker": secondNot,
        "timePicker24Hour": secondNot,
        "timePickerSeconds": secondNot,
        "showDropdowns":true,
        "timePickerIncrement" :1,
        "linkedCalendars": false,
        "autoApply":true,
        "autoUpdateInput":false, 
        "locale": {
            "direction": "ltr",
            "format": formatDate,
            "separator": "~",
            "applyLabel": "Apply",
            "cancelLabel": "Cancel",
            "fromLabel": "From",
            "toLabel": "To",
            "customRangeLabel": "Custom",
            "daysOfWeek": [
                "Su",
                "Mo",
                "Tu",
                "We",
                "Th",
                "Fr",
                "Sa"
            ],
            "monthNames": [
                "一月",
                 "二月",
                 "三月",
                 "四月",
                 "五月",
                 "六月",
                 "七月",
                 "八月",
                 "九月",
                 "十月",
                 "十一月",
                 "十二月"
            ],
            "firstDay": 1
        }
    }, function(start,end, label) {
        if(secondNot ==true&&dobubble ==true){
            $(eles).val($.trim(start.format('YYYY-MM-DD HH:mm:ss')+'~'+end.format('YYYY-MM-DD HH:mm:ss')));
        }else if(secondNot ==false&&dobubble ==true){
            $(eles).val($.trim(start.format('YYYY-MM-DD')+'~'+ end.format('YYYY-MM-DD')));
        }else if(secondNot ==false&&dobubble ==false){
             $(eles).val(start.format('YYYY-MM-DD'));
        }else if(secondNot ==true&&dobubble ==false){
            $(eles).val(start.format('YYYY-MM-DD HH:mm:ss'));
        }
    });
    //清空
    $(eles).siblings().click(function(){
        $(eles).val('');
    })
}
```

由于daterangepicker没有自带清空功能，而项目要求中，有时候日期框要为空，所以我在input框后面加了一个叉按钮。如下图效果，实现清空

![image](http://upload-images.jianshu.io/upload_images/6230931-6a2a50267cd5c1b0..png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

代码可以作为参考（这个有各种实现方式）
```html
 <div class="input-group">
     <input type="text" name="extractionDate11" id="extractionDate11" class="form-control dateStart" placeholder="请选择起始时间" readonly size="30">
    <div class="input-group-addon clearBtns">x</div>
 </div>
 <span class="caret"></span>
```
而对于各种情况下的的引用：

单日期不带时分秒： `calenders("#bgrq",false,false); `

单日期带时分秒：`calenders('#inputDate',false,true); `

双日期不带时分秒： `calenders('#extractionDate11',true,false); `

双日期带时分秒：`calenders('#extractionDate11',true,true); `

## 三、问题解决

### 1、点开下拉日期框，点击空白处，日期框关闭，传值问题

由于daterangepicker所做的功能是：在点开下拉日期框后，点击页面其他地方，日期框关闭，此时之前所选的日期值就自动保存到日期框上，而我们的习惯时，这样的操作相当于取消，所以在源码上做一修改：

在源码中搜索outsideClick方法：

将其中的this.hide()替换。

```javascript
outsideClick: function(e) {
    var target = $(e.target);
    // if the page is clicked anywhere except within the daterangerpicker/button
    // itself then call this.hide()
    if (
        // ie modal dialog fix
        e.type == "focusin" ||
        target.closest(this.element).length ||
        target.closest(this.container).length ||
        target.closest('.calendar-table').length
        ) return;
    // this.hide();
    if (this.isShowing){
        $(document).off('.daterangepicker');
        $(window).off('.daterangepicker');
        this.container.hide();
        this.element.trigger('hide.daterangepicker', this);
        this.isShowing = false;
    }
    this.element.trigger('outsideClick.daterangepicker', this);
},
```

同时，必须将show方法中的更改，否则当用户选择双日期时若只选择了一个日期然后点击空白处，而下一次再点击input框时就报错了，无法再使用了。

```javascript
/*this.oldStartDate = this.startDate.clone();
this.oldEndDate = this.endDate.clone();
this.previousRightTime = this.endDate.clone();*/

this.oldStartDate = this.startDate;
this.oldEndDate = this.endDate;
this.previousRightTime = this.endDate;
```

### 2、日期初始为空的问题

daterangepicker在初始时会给所绑定的input框自动赋值当前日期，即参数 "autoUpdateInput":true/false,  当其为true时会自动加上日期，在选择false时就初始为空，可是在后面选择日期后有的情况下不会自动应用。所以要做一些修改（此借鉴于博友http://blog.csdn.net/qq_33518042/article/details/77175645）此处我们更明晰一点

（引用：在此我们可以使用autoUpdateInput属性，autoUpdateInput是用来打开和关闭daterangepicker选择时，是否自动传值到input[text] 这个DOM的属性，通过设置初始autoUpdateInput为false，可以实现初始值为空，这是在input中设置的placeholder才能正常显现出来。但是设置该属性之后，不管怎么选择daterangePikcer的日期，都不会有传值到input中，也就是没有办法正常显示选择的日期了，所以要在恰当的时刻，调用$(id).data('daterangepicker').autoUpdateInput=true,就可以了。作者最初设置为，最初默认值为空，当daterangepicker 的input发生点击时，autoUpadateInput=true，但是这时出现input不管是否选中日期，都会自动有值，所以为了修改这个问题，我在daterangepicker的源码中进行了修改，当然也可以重新更改需要的onclick事件。

在源码中，当autoUpdateInput设置为false之后，我们想要在点击确定，选中日期和点击range三个地方，将autoUpdateInput改变回来，所以，在三处设置this.autoUpdateInput=true属性）

1）在1210行左右的clickRange方法中：添加可以如下对照以下代码：

```javascript
clickRange: function(e) {
    var label = e.target.getAttribute('data-range-key');
    this.chosenLabel = label;
    if (label == this.locale.customRangeLabel) {
        this.showCalendars();
    // } else {
        }else if (!this.endDate && date.isBefore(this.startDate)) {
        this.autoUpdateInput=true;
            //special case: clicking the same date for start/end,
            //but the time of the end date is before the start date
            this.setEndDate(this.startDate.clone());
        } else { // picking end
        this.autoUpdateInput=true;


        var dates = this.ranges[label];
        this.startDate = dates[0];
        this.endDate = dates[1];

        if (!this.timePicker) {
            this.startDate.startOf('day');
            this.endDate.endOf('day');
        }

        if (!this.alwaysShowCalendars)
            this.hideCalendars();
        this.clickApply();
    }
},
```
2）、在1340行左右，两处添加  this.autoUpdateInput=true; 请对照以下：
```javascript
} else if (!this.endDate && date.isBefore(this.startDate)) {
    this.autoUpdateInput=true;
    //special case: clicking the same date for start/end,
    //but the time of the end date is before the start date
    this.setEndDate(this.startDate.clone());
} else { // picking end
    this.autoUpdateInput=true;
    if (this.timePicker) {
        var hour = parseInt(this.container.find('.right .hourselect').val(), 10);
        if (!this.timePicker24Hour) {
            var ampm = this.container.find('.right .ampmselect').val();
            if (ampm === 'PM' && hour < 12)
                hour += 12;
            if (ampm === 'AM' && hour === 12)
                hour = 0;
        }
```
3）、在1400行左右，给clickApply方法中添加  this.autoUpdateInput=true; 
```javascript
clickApply: function(e) {
   this.autoUpdateInput=true;
       this.hide();
     this.element.trigger('apply.daterangepicker', this);
},
```
![image](http://upload-images.jianshu.io/upload_images/6230931-74a3147afc112f51..png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

  ![image](http://upload-images.jianshu.io/upload_images/6230931-6d1bcd8e287cb6b7..png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


![image](http://upload-images.jianshu.io/upload_images/6230931-59134f7c1b70d36f..png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![image](http://upload-images.jianshu.io/upload_images/6230931-2adc8625ea3372d1..png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


