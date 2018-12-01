$(function() {
    // 当前页面标识
    // var currentPage = 1;
    var currentPage = typeof(tools.getParameter.getUrlParameter('pageid')) == 'undefined' ? 1 : tools.getParameter.getUrlParameter('pageid');
    // 总页数变量
    var totlePage;
    // 发送 ajax 请求获取 推荐区域 信息并渲染到页面
    function render( pageid ) {
        $.ajax({
            type: 'get',
            url: 'http://127.0.0.1:9090/api/getmoneyctrl',
            data: {
                // 不传默认返回第 0 页数据
                pageid: pageid-1
            },
            dataType: 'json',
            success: function( data ) {
                // 控制台调试输出语句
                // console.log(data);
                // 评论字符串截取
                var comcountArr = [];
                data.result.forEach(function(e, i) {
                    comcountArr.push(e.productComCount.slice(1).split("人")[0]);
                });
                comcountArr.forEach(function(e, i) {
                    data.result[i].comcount = e;
                });
                // 获取总页数
                totlePage = Math.ceil(data.totalCount / data.pagesize);
                // 控制台调试输出语句
                // console.log(data.result);
                $('.moneyCtrl_recommend .recommend_list .recommend_list_ul').html(template('recommend_lists', data));
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
        // console.log({data : page});
        $('.page_select').html(template('page_list', {data : page}));
        // 同步当前页面标识为渲染的页数
        currentPage = currentPageNum;
    }
    // 执行函数并渲染页面
    render(currentPage);
    // 点击上一页并渲染指定页面
    $('.moneyCtrl_commodity_lists_page .prev').click(function() {
        if(currentPage <= 1) {
            return false;
        }
        currentPage--;
        location.href="moneyctrl.html?pageid="+(currentPage);
    });
    // 点击下一页并渲染指定页面
    $('.moneyCtrl_commodity_lists_page .next').click(function() {
        if(currentPage >= totlePage) {
            return false;
        }
        currentPage++;
        location.href="moneyctrl.html?pageid="+(currentPage);
    });
    // 点击分页器并渲染指定页面
    $('#page_select').on('change', function() {
        location.href="moneyctrl.html?pageid="+($('#page_select option:selected').val());
    });
});