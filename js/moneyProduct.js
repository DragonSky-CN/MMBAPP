$(function() {
    var productid = tools.getParameter.getUrlParameter('productId');
    // 如果没有参数，自动跳转到 最新优惠界面
    if(typeof(productid) == 'undefined') {
        location.href="moneyctrl.html";
    }
    // 发送 ajax 请求获取 指定商品折扣 信息并渲染到页面
    $.ajax({
        type: 'get',
        url: 'http://127.0.0.1:9090/api/getmoneyctrlproduct',
        data: {
            productid: productid
        },
        dataType: 'json',
        success: function( data ) {
            // 控制台调试输出语句
            // console.log(data);
            $('.moneyProduct_recommend_info .recommend_info').html(template('recommend_infos', data));            
        }
    });
});