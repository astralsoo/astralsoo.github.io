$(function(){
  // 헤더 gnb 클릭
  let click_gnb = function(){
    $(".gnb_item").click(function(){
      $(".gnb_item").removeClass("active");
      $(this).addClass("active");
      //스무스 스크롤링
      let target = $(this).children().attr("href");
      if(target === "#"){
        $("html, body").animate({
          'scrollTop': 0
        }, 500);
      }
      else{
        let h = $(target).offset().top;
        $("html, body").animate({
          'scrollTop': h
        }, 500);
      }
      //모바일환경 gnb 숨기기
      if($(".header").hasClass("active")){
        window.setTimeout(
          function(){
            $(".header").removeClass("active");
            $(".gnb_btn > .fa").removeClass("fa-angle-double-left").addClass("fa-angle-double-right");
          }, 1000
        )
      }
    })
  }

  // gnb 변화 함수
  let change_gnb = function(){
    let index = $("section").length;
    let section = $("section");
    for(let i = 0; i < index; i++){
      let section_height = section[i].getBoundingClientRect().top;
      let win_height = window.innerHeight;
      if(section_height >= 0 &&
         section_height < (win_height * 0.3)){
        $(".gnb_item").removeClass("active");
        $($(".gnb_item")[i]).addClass("active");
      }
    }
  }

  // 모바일버전 gnb 출현 버튼
  let open_gnb = function(){
    $(".gnb_btn").click(function(){
      $(".header").toggleClass("active");
      $(this).children(".fa").toggleClass("fa-angle-double-right").toggleClass("fa-angle-double-left");
    })
  }

  // 각 섹션 스크롤시 작동하는 애니메이션
  let section_ani = function(){
    let trigger_height = window.innerHeight * 0.3;
    let service_height = document.getElementById("service").getBoundingClientRect().top;
    let about_height = document.getElementById("about").getBoundingClientRect().top;
    let price_height = document.getElementById("price").getBoundingClientRect().top;
    let work_height = document.getElementById("work").getBoundingClientRect().top;
    let client_height = document.getElementById("client").getBoundingClientRect().top;
    let contact_height = document.getElementById("contact").getBoundingClientRect().top;

    if(service_height > 0 && service_height < trigger_height){
      $(".service_item").css("opacity", "1");
    }
    if(about_height > 0 && about_height < trigger_height){
      $(".about .header_text > p").css({
        "opacity":"1",
        "transform":"translateX(0)"
      });
    }
    if(price_height > 0 && price_height < trigger_height){
      $(".price_item").css("animation", "plan_fade .5s forwards");
      $(".price_item:nth-of-type(2)").css("animation-delay", ".5s");
      $(".price_item:nth-of-type(3)").css("animation-delay", "1s");
    }
    if(work_height > 0 && work_height < trigger_height){
      $(".work_step_item").css({
        "opacity":"1",
        "transform":"translate(0, 0)"
      });
    }
    if(client_height > 0 && client_height < trigger_height){
      $(".testimonial_item").css({
        "opacity":"1",
        "transform":"translateX(0)"
      });
    }
    if(contact_height > 0 && contact_height < trigger_height){
      $(".address_box").css({
        "opacity":"1",
        "transform":"translateY(0)"
      });
    }
  }
  
  // 메인 썸네일 슬라이드
  let thumb_slide = function(){
    $(".thumb_label > span").click(function(){
      $(".thumb_label > span").removeClass("active");
      $(this).addClass("active");
      let thumb_num = $(this).attr("data-img");
      switch(thumb_num){
        case "thumbnail1":
          $(".thumb_items_wrap").css("transform", "translateX(0)");
          break;
        case "thumbnail2":
          $(".thumb_items_wrap").css("transform", "translateX(-33.3333333%)");
          break;
        case "thumbnail3":
          $(".thumb_items_wrap").css("transform", "translateX(-66.6666666%)");
          break;
      }
    });
  }

  // 스크롤다운 to top 출현 기능
  let to_top = function(){
    let currheight = document.querySelector("body").getBoundingClientRect().top;
    if(currheight >= -800){
      $(".to_top").removeClass("active");
    }
    else if(currheight < -800){
      $(".to_top").addClass("active");
    }
  }

  jQuery(document).ready(function(){
    click_gnb();
    open_gnb();
    thumb_slide();
    
    $(window).scroll(function(){
      change_gnb();
      section_ani();
      to_top();
    });
    $(window).on("load", function(){
      change_gnb();
    });
  });
});
