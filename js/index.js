$(function() {
    // 发送 ajax 请求获取 菜单栏 信息并渲染到页面
    $.ajax({
        type: 'get',
        url: 'http://127.0.0.1:9090/api/getindexmenu',
        dataType: 'json',
        success: function( data ) {
            // 控制台调试输出语句
            // console.log(data);
            // 改名操作，把 data.result 改成 data.list 再包装成一个对象
            // artTemplate 只支持传入对象
            // console.log({list : data.result});
            $('.mmb_menus').html(template('menu_items', data));
            /* 
            JQuery  nextAll() 方法：
                匹配类名为 more 的元素之后的所有同辈元素
             */
            $('.mmb_menus .more').nextAll().hide();
        }
    });
    // 点击 更多 按钮后，显示隐藏的最后一行 div
    $('.mmb_menus').on('click', '.more', function() {
        /* 
        JQuery  slideToggle() 方法：
            通过使用滑动效果（高度变化）来切换元素的可见状态。
            如果被选元素是可见的，则隐藏这些元素；
            如果被选元素是隐藏的，则显示这些元素；
         */
        $(this).nextAll().slideToggle();
    });
    // 发送 ajax 请求获取 折扣推荐 信息并渲染到页面
    $.ajax({
        type: 'get',
        url: 'http://127.0.0.1:9090/api/getmoneyctrl',
        dataType: 'json',
        success: function( data ) {
            // 控制台调试输出语句
            // console.log(data);
            var comcountArr = [];
            var comcountObj = {};
            data.result.forEach(function(e, i) {
                comcountArr.push(e.productComCount.slice(1).split("人")[0]);
            });
            comcountArr.forEach(function(e, i) {
                data.result[i].comcount = e;
            });
            // 控制台调试输出语句
            // console.log(data.result);
            $('.mmb_recommend .recommend_list .recommend_list_ul').html(template('recommend_lists', data));
        }
    });
});