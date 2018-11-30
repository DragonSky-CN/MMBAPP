// 回到顶部功能
$('.footer_menu_returnTop').on('click', function() {
    $('html,body').animate({
        scrollTop: 0
    }, 500);
});