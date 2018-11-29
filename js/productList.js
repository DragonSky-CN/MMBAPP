$(function() {
    // var categoryid = location.search.slice(-1);
    // 如果地址栏未传参，默认请求分类页 categoryid 为 0 的数据
    // 出现 BUG 的代码，截取字符串错误
    // var categoryid = location.search.slice(-1) == '' ? 0 : location.search.slice(-1);
    // var categoryid = location.search.split("=")[1] == '' ? 0 : location.search.split("=")[1];
    var categoryid = typeof(location.search.split("=")[1]) == 'undefined' ? 0 : location.search.split("=")[1];
    // console.log(typeof(location.search.split("=")[1]) == 'undefined');
    // 当前页面标识
    var currentPage = 1;
    // 总页数变量
    var totlePage;
    // 分类名称
    var category;
    // 发送 ajax 请求获取 导航菜单栏 信息并渲染到页面
    $.ajax({
        type: 'get',
        url: 'http://127.0.0.1:9090/api/getcategorybyid',
        data: {
            categoryid: categoryid
        },
        dataType: 'json',
        success: function( data ) {
            // 控制台调试输出语句
            // console.log(data);
            $('.mmb_nav_breadcrumbs').html(template('nav_breadcrumb', data));
            category = data.result[0].category;
        }
    });
    // 发送 ajax 请求获取对应的 商品列表 信息并渲染到页面
    function render( pageid ) {
        $.ajax({
            type: 'get',
            url: 'http://127.0.0.1:9090/api/getproductlist',
            data: {
                categoryid: categoryid,
                pageid: pageid
            },
            dataType: 'json',
            success: function( data ) {
                // 控制台调试输出语句
                // console.log(data);
                // 获取总页数
                totlePage = Math.ceil(data.totalCount / data.pagesize);
                data.category = category;
                $('.commodity_list_ul').html(template('commodity_list', data));
                renderPage(pageid);
            }
        });
    }
    // 分页跳转下拉菜单 信息渲染
    function renderPage(currentPageNum) {
        // 更改分页的数字
        var page = [];
        for(var i = 1; i < totlePage + 1; i++) {
            page.push({currentPageNum, totlePage});
        };
        console.log({data : page});
        $('.page_select').html(template('page_list', {data : page}));
        // 同步当前页面标识为渲染的页数
        currentPage = currentPageNum;
    }
    // 执行函数并渲染页面
    render(currentPage);
    // 点击上一页并渲染指定页面
    $('.mmb_commodity_lists_page .prev').click(function() {
        if(currentPage <= 1) {
            return false;
        }
        currentPage--;
        render(currentPage);
        // 返回顶部
        $(window).scrollTop(0);
    });
    // 点击下一页并渲染指定页面
    $('.mmb_commodity_lists_page .next').click(function() {
        if(currentPage >= totlePage) {
            return false;
        }
        currentPage++;
        render(currentPage);
        // 返回顶部
        $(window).scrollTop(0);
    });
    // 点击分页器并渲染指定页面
    $('#page_select').on('change', function() {
        render($('#page_select option:selected').val());
        // 返回顶部
        $(window).scrollTop(0);
    });
    // 回到顶部功能
    $('.footer_menu_returnTop').on('click', function() {
        $('html,body').animate({
            scrollTop: 0
        }, 500)
    });
})