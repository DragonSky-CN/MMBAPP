$(function() {
    var productid = tools.getParameter.getUrlParameter('productId');
    // 发送 ajax 请求获取 导航菜单栏 信息并渲染到页面
    $.ajax({
        type: 'get',
        url: 'http://127.0.0.1:9090/api/getproduct',
        data: {
            productid: productid
        },
        dataType: 'json',
        success: function( data ) {
            // 控制台调试输出语句
            // console.log(data);
            var brandName = tools.getParameter.getUrlParameter('brandName');
            var category = tools.getParameter.getUrlParameter('category');
            data.result[0].brandName = brandName;
            data.result[0].category = category;
            $('.mmb_nav_breadcrumbs').html(template('nav_breadcrumb', data));
        }
    });
    // 发送 ajax 请求获取 商品详情区域 信息并渲染到页面
    $.ajax({
        type: 'get',
        url: 'http://127.0.0.1:9090/api/getproduct',
        data: {
            productid: productid
        },
        dataType: 'json',
        success: function( data ) {
            // 控制台调试输出语句
            // console.log(data);
            $('.commodity_show').html(template('commodity_info', data));
        }
    });
    // 发送 ajax 请求获取 商品详情评价区域 信息并渲染到页面
    $.ajax({
        type: 'get',
        url: 'http://127.0.0.1:9090/api/getproductcom',
        data: {
            productid: productid
        },
        dataType: 'json',
        success: function( data ) {
            // 控制台调试输出语句
            console.log(data);
            $('.commodity_evaluates').html(template('user_commodity_evaluates', data));
        }
    });
});