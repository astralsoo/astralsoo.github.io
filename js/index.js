$(document).ready(function () {
    setTimeout(function(){
	$('html').removeClass('no-js')
    }, 1200);
	
    //메인 오프닝 효과
    //case 1. gnb를 이용해 이동하는 경우
    $('.gnb-ul a, .m-gnb-ul a').click(function(){
        if($(this).hasClass('btn-open')){
            if(Math.floor(document.querySelector('.main-content-box01').getBoundingClientRect().bottom) <= screen.height){
                var id = $(this).attr('href');
                if(id === '#about'){
                    var vh = document.querySelector('.main-content-box01').getBoundingClientRect().bottom;
                    $('html, body').animate({
                        scrollTop : vh
                    });
                }
                else{
                    var h = document.querySelector(id).getBoundingClientRect().bottom;
                    $('html, body').animate({
                        scrollTop : h
                    });
                }
                $('.gnb-ul a, .m-gnb-ul a').removeClass('btn-open');
                $('header').addClass('on');
                $('.slideMenu').addClass('on');
            }
        }
        if($(this).attr('href') === '#main'){
            for(let i = 1; i < 4; i++){
                $('.gnb-ul > li').eq(i).children('a').addClass('btn-open');
                $('.m-gnb-ul > li').eq(i).children('a').addClass('btn-open');
            }
            $('header').removeClass('on');
            $('.slideMenu').removeClass('on');
        }
    });
    //case 2. 스크롤을 이동해 이용하는 경우
    $(window).scroll(function(){
		let num = document.querySelector('.main-content-box01').getBoundingClientRect().bottom;
		if(num < 1){
			$('.shadow').hide();
			$('.fixed').css({
				"position": "relative",
				"z-index": "1"
			});
            $('.gnb-ul a, .m-gnb-ul a').removeClass('btn-open');
            $('header').addClass('on');
            $('.slideMenu').addClass('on');
		}
		else{
			$('.shadow').show();
			$('.fixed').css({
				"position": "fixed",
				"z-index": "0"
			});
            for(let i = 1; i < 4; i++){
                $('.gnb-ul > li').eq(i).children('a').addClass('btn-open');
                $('.m-gnb-ul > li').eq(i).children('a').addClass('btn-open');
            }
            $('header').removeClass('on');
            $('.slideMenu').removeClass('on');
		}
	});

    //메인 텍스트 타이핑 효과
    const content = "안녕하세요, \n 3년차 퍼블리셔 임수민입니다.";
    const text = document.querySelector(".txt");
    let i = 0;

    function typing(){
        if (i < content.length) {
            let txt = content.charAt(i);
            text.innerHTML += txt === "\n" ? "<br/>": txt;
            i++;
        }
    }
    setTimeout(function(){
	setInterval(typing, 150);
    }, 2000);

    //메인컨텐츠3 스와이퍼
    var swiper = new Swiper(".swiper-portfolio", {
        effect: "coverflow",
        grabCursor: true,
        centeredSlides: true,
        loop: true,
        coverflowEffect: {
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        },
        navigation: {
            nextEl: '.swiper-navigation .swiper-next',
            prevEl: '.swiper-navigation .swiper-prev',
        },
        mousewheel: true,
        breakpoints: {
            0: {
                slidesPerView: 1,
            },
            769: {
                slidesPerView: 2,
            }
        }
    });
});
