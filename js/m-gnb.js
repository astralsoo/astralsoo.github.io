$(document).ready(function () {
    $('.m-gnb-open').click(function(){
        $('.slideMenu').slideDown();
        $(this).hide();
        $('.m-gnb-close').show();
        $('.layer').fadeIn();
    });
    $('.m-gnb-close').click(function(){
        $('.slideMenu').slideUp();
        $(this).hide();
        $('.m-gnb-open').show();
        $('.layer').fadeOut();
    });
    $('.m-gnb-ul a').click(function(){
        $('.slideMenu').slideUp();
        $('.m-gnb-close').hide();
        $('.m-gnb-open').show();
        $('.layer').fadeOut();
    });
});
