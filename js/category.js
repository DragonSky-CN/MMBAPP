$(function() {
    // 发送 ajax 请求获取 分类标题 信息并渲染到页面
    $.ajax({
        type: 'get',
        url: 'http://127.0.0.1:9090/api/getcategorytitle',
        dataType: 'json',
        success: function( data ) {
            // 控制台调试输出语句
            // console.log(data);
            $('.mmb_category_container').html(template('category_lists_title', data));
            // 因为已经渲染出来了，所以事件委托不用放在父元素上
            /* $('.lists_title').on('click', function() {
                var id = $(this).data('id');
                // 查询类名为 .lists_title 的元素后面的元素 li 标签长度是否为 0
                // 没有 li 标签的话，向后台请求数据
                // 有 li 标签的话切换隐藏状态
                if($(this).next().find('li').length == 0) {
                    mmb_renderCategory(id);
                } else {
                    $(this).next().slideToggle();
                }
            }); */
            $('.lists_title').click(function() {
                // 移动端页面不弹出
                // alert('123');
                var id = $(this).data('id');
                mmb_list_sign_switch(id);
                // 查询类名为 .lists_title 的元素后面的元素 li 标签长度是否为 0
                // 没有 li 标签的话，向后台请求数据
                // 有 li 标签的话切换隐藏状态
                if($(this).next().find('li').length == 0) {
                    mmb_renderCategory(id);
                } else {
                    $(this).next().slideToggle();
                }
            });
        }
    });
    // 根据传递的 id 值，发送 ajax 请求获取 分类列表 信息并渲染到页面
    function mmb_renderCategory( id ) {
        $.ajax({
            type: 'get',
            url: 'http://127.0.0.1:9090/api/getcategory',
            data: {
                titleid: id
            },
            dataType: 'json',
            success: function( data ) {
                // 控制台调试输出语句
                // console.log(data);
                // 选择对应 索引值 的 div 的兄弟元素
                $ul = $('div[index=' + id + ']').next();
                $ul.html(template('category_lists_menu', data));
                $ul.css({'display':'none'});
                $ul.slideDown();
            }
        });
    }
    // 点击切换 i 标签 transform 旋转角度
    function mmb_list_sign_switch( id ) {
        $ul = $('div[index=' + id + '] i');
        var deg = $ul.css('transform');
        // 控制台调试输出语句
        // console.log(deg);
        if (deg == 'matrix(-1, 0, 0, -1, 0, 0)') {
            $ul.css('transform', 'rotate(0deg)');
        } else {
            $ul.css('transform', 'rotate(180deg)');
        }
    }
    // 回到顶部功能
    $('.footer_menu_returnTop').on('click', function() {
        $('html,body').animate({
            scrollTop: 0
        }, 500)
    });
})