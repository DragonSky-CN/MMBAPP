$(function() {
    // 发送 ajax 请求获取 折扣商品推荐列表 信息并渲染到页面
    $.ajax({
        type: 'get',
        url: 'http://127.0.0.1:9090/api/getinlanddiscount',
        dataType: 'json',
        success: function( data ) {
            // 控制台调试输出语句
            console.log(data);
            // 实现图片懒加载功能
            var src = '../images/timg.gif';
            var loading = '<img src="./images/timg.gif" alt="">';
            var trueImg;
            data.result.forEach(function(e, i) {
                e.loading = loading;
                e.src = src;
                // 处理数据，获得图片地址
                // console.log(e.productImg);
                // 截取的 &amp; 会作为字符处理，所以直接打开无法访问
                e.trueImgSrc = e.productImg.split(' ')[1].split('src=')[1].slice(1).slice(0, -1);
                // 发现 BUG 如果后台返回的图片地址含有 &amp; 字符，个人认为是模板引擎对这种字符做了特殊处理，所以可以正常显示图片
                // 如果不使用模板引擎，直接 JS 操作的话，会造成图片访问失败的 BUG
                // console.log(e.trueImgSrc);
                // 解决 BUG 思路，使用正则匹配替换 &amp; 为 &
                // 定义正则表达式，全局匹配
                var re = new RegExp('&amp;', 'g');
                var trueImgSrcTemp = e.trueImgSrc.replace(re, '&');
                e.trueImgSrc = trueImgSrcTemp;
                // console.log(e.trueImgSrc);
            })
            $('.recommend_list').html(template('recommend_lists', data));
            $lazyLoad = $('.recommend_list .list_img');

            // 懒加载函数
            var lazyLoad = (function() {
                // 初始化函数，由于滚动事件非常消耗性能
                // 使用定时器替换（不是滚动就会触发），滚动后 200ms 后触发
                var timer;
                function init() {
                    $(window).on('scroll', function() {
                        if(timer) {
                            clearTimeout(timer);
                        }
                        timer = setTimeout(function() {
                            checkShowImg();
                        }, 200);
                    });
                }
                // 判断图片是否加载 函数，如果图片中含有 isLoaded 属性，证明这张图片已经加载过了，直接 return
                // 如果图片没有 isLoaded 属性，进入 准备展示图片 函数
                function checkShowImg() {
                    $lazyLoad.each(function() {
                        $commodity = $(this);
                        if($commodity.attr('isLoaded')) {
                            return;
                        }
                        if(shouldShowImg($commodity)) {
                            showImg($commodity);
                        }
                    }); 
                }
                // 准备展示图片 函数，获取屏幕可视高度，滚动高度，要展示的元素到文档的高度
                // 如果元素到文档的高度小于屏幕的可视高度加上滚动高度，说明元素在可视区域内，返回 true
                // 否则返回 false
                // top < windowH + scrollH
                function shouldShowImg($commodity_img) {
                    var scrollH = $(window).scrollTop(),
                        windowH = $(window).height(),
                        top = $commodity_img.offset().top;
                    if(top < windowH + scrollH) {
                        return true;
                    } else {
                        return false;
                    }
                }
                // 显示图片 函数，将元素的 src 的内容替换为自定义 data-src(真正的图片地址)的内容
                function showImg($commodity_img) {
                    $commodity_img.find('img').attr('src', $commodity_img.data('src'));
                    $commodity_img.attr('isLoaded', true);
                }
                // 函数返回一个对象
                return {
                    init: init
                }
            })();
            // 执行函数
            lazyLoad.init();
        }
    });
});