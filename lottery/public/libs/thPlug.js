
(function(win, doc) {
    //兼容配置：如果requestAnimFrame支持不可用，还是可以用回内置的setTimeout。 
    win.requestAnimFrame = (function() {
        return win.requestAnimationFrame ||
            win.webkitRequestAnimationFrame ||
            win.mozRequestAnimationFrame ||
            win.oRequestAnimationFrame ||
            win.msRequestAnimationFrame ||
            function(callback) {
                win.setTimeout(callback, 1000 / 30); //如果requestAnimFrame支持不可用，还是可以用回内置的setTimeout。
            };
    })();

    /*==========  游戏函数的构造方法  ==========*/
    win.SQ = function() {

    }
    /*==========  构造函数属性设定  ==========*/


    /*==========  rem初始化设定  ==========*/
    SQ.prototype.remInit = function() {
        //根据比例改变 HTML字号大小
        var docEle = doc.documentElement, //获取html元素
            width = docEle.clientWidth;
        width && (docEle.style.fontSize = 10 * width / 320 + "px"); //设置html的fontSize，随着event的改变而改变。
    }

    /*==========  ios验证  ==========*/
    SQ.prototype.isIos = function() {
        var u = navigator.userAgent;
        // var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        // alert('是否是Android：'+isAndroid);
        // alert('是否是iOS：'+isiOS);
        return isiOS;
    }
    /*==========  wx验证  ==========*/
    SQ.prototype.isWeiXin = function() {
        var weixin = false;
        var ua = win.navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
            weixin = true;
        } else {
            weixin = false;
        }
        return weixin;
    }
    /*==========  是否移动端  ==========*/
    SQ.prototype.isMobile = function() {
        var isMobile = true;
        if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
            isMobile = true;
        } else {
            isMobile = false;
        }
        return isMobile;
    }
    /*==========  是否支付宝 ==========*/
    SQ.prototype.isAlipay = function() {
        var userAgent = navigator.userAgent.toLowerCase();
        if(userAgent.match(/Alipay/i)=="alipay"){
            return true;
        }else{
            return false;
        }
    }


    /*==========  是否支付宝 PHP  ==========*/
    // SQ.prototype.IsWeixinOrAlipay = function() {
    //     //判断是不是微信
    //     if ( strpos($_SERVER['HTTP_USER_AGENT'], 'MicroMessenger') !== false ) {  
    //         return "WeiXIN";  
    //     }    
    //     //判断是不是支付宝
    //     if (strpos($_SERVER['HTTP_USER_AGENT'], 'AlipayClient') !== false) {
    //         return "Alipay";  
    //     }
    //     //哪个都不是
    //     return "false";
    // }


    //手机验证
    //手机号码验证
    SQ.prototype.checkMobile = function(str, callback) { // 验证手机号正则
        var re = /^1[3|4|5|7|8][0-9]{9}$/;
        if (re.test(str)) {
            return true;
        } else {
            return false;
        }
    }
    //输入框号码 只能数字限制
    SQ.prototype.inputPhoneCode = function(obj) {
        obj.value = obj.value.replace(/[^0-9-]+/g, '');
        if (obj.value.length >= 11) {
            obj.value = obj.value.substring(0, 11);
        }
    }
    // 判断字符串的字节长度
    SQ.prototype.getStrLength = function (str) {
        var leng = str.length;
        var cnChar = str.match(/[^\x00-\x80]/g); //利用match方法检索出中文字符并返回一个存放中文的数组  
        if (cnChar) leng += cnChar.length; //算出实际的字符长度  
        return leng;
    }
    //限制字符串的字节长度,超过长度显示 ...
    SQ.prototype.outText = function (str, maxLeng ) {
        str = str + '';
        var removeText = 3;
        var contentLeng = getStrLength(str);
        var l = str.length;
        var endLeng = 1;

        if (contentLeng > maxLeng) {
            for (; endLeng <= l; endLeng++) {
                if (getStrLength(str.substring(0, endLeng)) > (maxLeng - 3)) {
                    endLeng--;
                    break;
                } else if (getStrLength(str.substring(0, endLeng)) == (maxLeng - 3)) {
                    break;
                }
            }
            str = str.substring(0, endLeng) + '...';

        }
        return str;
    }      

    //预加载图片  传递图片路径数组  当所有图片加载完回调函数
    SQ.prototype.preloadimages = function(arr, callback, stepCallback) {
        var newimages = [],
            loadedimages = 0;

        function imageloadpost() {
            loadedimages++;
            stepCallback(loadedimages, arr.length);
            if (loadedimages == arr.length) {
                callback(newimages) //加载完成用我们调用postaction函数并将newimages数组做为参数传递进去
            }
        }
        for (var i = 0; i < arr.length; i++) {
            newimages[i] = new Image();
            newimages[i].src = arr[i];
            newimages[i].onload = function() {
                imageloadpost();
            }
            newimages[i].onerror = function() {
                imageloadpost();
            }
        }
    }

    //canvas帧动画
    SQ.prototype.canvasFrame = function(opations) {
        // var opations = {   //使用方法
        //             canvasId: "animation_canvas",
        //             canvasWidth: 640,
        //             canvasHeight: 1008,
        //             firstImgSrc: './images/',
        //             imgType: '.png',
        //             imgLength: 4,
        //             speed: 200,
        //             infinit: false,
        //         };

        var canvas = null; //初始化参数
        var img = null;
        var ctx = null;
        var imageReady = false;
        var canvas = doc.getElementById(opations.canvasId);
        canvas.width = opations.canvasWidth;
        canvas.height = opations.canvasHeight;

        // if (!canvas.getContext) {  //判断是否支持 canvas
        //     console.log("Canvas not supported. Please install a HTML5 compatible browser.");
        //     return;
        // }
        // get 2D context of canvas and draw rectangel

        ctx = canvas.getContext("2d");
        ctx.fillStyle = "transparent";
        // ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.clearRect(0, 0, opations.canvasWidth, opations.canvasHeight);

        img = doc.createElement('img');
        img.src = opations.firstImgSrc + '0' + opations.imgType;
        img.onload = loaded();
        //保证只有图像加载后才开始循环动画
        function loaded() {
            imageReady = true;
            update();
            // setTimeout(update, 1000 / 3); //添加3帧每秒间隔计时器
        }

        function redraw() {
            // ctx.fillStyle = "black";  //清空画布
            // ctx.fillRect(0, 0, opations.canvasWidth, opations.canvasHeight);
            ctx.clearRect(0, 0, opations.canvasWidth, opations.canvasHeight);
            ctx.drawImage(img, 0, 0, opations.canvasWidth, opations.canvasHeight);

        }
        //为了让图片以规定的速度动画，我们必须追踪已经经过的时间，然后根据分配给每帧的时间播放帧。基本步骤是：

        //1、按每秒几帧设置动画速度(msPerFrame)。

        //2、当你循环游戏时，计算一下自最后一帧以后已经经过了多少时间（delta）。

        //3、如果已经经过的时间足够把动画帧播完，那么播放这一帧并设置累积delta为0。

        //4、如果已经经过的时间不够，那么记住（累积）delta时间（acDelta）。
        var frame = 0;
        var lastUpdateTime = 0;
        var acDelta = 0;
        var msPerFrame = opations.speed;

        function update() {
            if (frame >= opations.imgLength) {
                if (!opations.infinit) {
                    return
                }
                frame = 0; //当绘制后且帧推进完，计时器就会重置。
            }
            requestAnimFrame(update);
            var delta = Date.now() - lastUpdateTime;
            //console.log(Date.now(),lastUpdateTime);
            if (acDelta > msPerFrame) {
                acDelta = 0;
                redraw();
                img.src = opations.firstImgSrc + frame + opations.imgType;
                frame++;
            } else {
                acDelta += delta;
            }
            lastUpdateTime = Date.now();
        }
    }

    //地址栏相关
// url 去参数
    SQ.prototype.delQueStr = function (url) {
        var str = '';
        if (url.indexOf('?') != -1) {
            str = url.substr(0, url.indexOf('?'));
        } else {
            str = url;
        }
        return str;
    }

    SQ.prototype.getHash = function() {
        return win.location.hash;
    }
    SQ.prototype.setHash = function(str) {
        win.location.hash = str;
    }
    SQ.prototype.getParameters = function() {
        var searchUrl = decodeURI(win.location.search);
        searchUrl = searchUrl.replace(/amp;/g, ''); //微信将 & 转意 &amp;删除多余字符
        var requestUrl = new Object();
        if (searchUrl.indexOf("?") != -1) { //判断是否存在，如果返回-1，则表明不存在-->
            var str = searchUrl.substr(1); //从第1个字符开始截取-->
            var strs = str.split("&"); //表示以“&’”为分隔符进行分隔，返回的是一个数组-->
            for (var i = 0; i < strs.length; i++) {
                requestUrl[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
            }
        }
        return requestUrl;
    }

    /*封装tap*/
    SQ.prototype.tap = function(dom, callback, bool) {
        /*
         * 要求  没有触发 touchmove 事件
         *       并且响应速度要比click快
         */
        if (dom && typeof dom == 'object') {
            var isMove = false;
            var startTime = 0;
            dom.addEventListener('touchstart', function(e) {
                if (!!bool) e.preventDefault();
                //if(debug) console.log('touchstart');
                //console.time('tap');/*记录tap这个参数现在的时间*/
                startTime = Date.now();
            });
            dom.addEventListener('touchmove', function(e) {
                //if(bool) e.preventDefault();
                //if(debug) console.log('touchmove');
                isMove = true;
            });
            dom.addEventListener('touchend', function(e) {
                // if(bool) e.preventDefault();
                //if(debug) console.log('touchend');
                //console.timeEnd('tap')/*打印tap这个参数距离上一次记录的时候的时间*/
                /*判读  是否满足tap 的要求  一般要求tap的响应时间150*/
                if (!isMove && (Date.now() - startTime) < 150) {
                    /*调用 callback*/
                    callback && callback(e);
                }
                /*重置 参数*/
                isMove = false;
                startTime = 0;
            });
        }
    }

    // 滑动事件
    SQ.prototype.swipMain = function(element, callback, bool) {
        var isTouchMove, startTx, startTy, wevent;

        element.addEventListener('touchstart', function(e) {
            e = e || event;
            if (!!bool) e.preventDefault();
            var touches = e.touches[0];
            startTx = touches.clientX;
            startTy = touches.clientY;
            isTouchMove = false;
        }, false);

        element.addEventListener('touchmove', function(e) {
            isTouchMove = true;
            wevent = e || event;
            if (!!bool) e.preventDefault();
        }, false);

        element.addEventListener('touchend', function(e) {
            if (!isTouchMove) {
                return;
            }

            var touches = e.changedTouches[0],
                endTx = touches.clientX,
                endTy = touches.clientY,
                distanceX = startTx - endTx
            distanceY = startTy - endTy,
                isSwipe = false;

            var direction = '';

            if (Math.abs(distanceX) >= Math.abs(distanceY)) {
                if (distanceX > 20) {
                    isSwipe = true;
                    direction = 'left';
                } else if (distanceX < -20) {
                    isSwipe = true;
                    direction = 'right';
                }
            } else {
                if (distanceY > 20) {
                    isSwipe = true;
                    direction = 'up';
                } else if (distanceY < -20) {
                    isSwipe = true;
                    direction = 'down';
                }
            }

            if (isSwipe) {
                callback(direction, wevent);
            }
        }, false);
    }; //滑动事件

})(window, document);