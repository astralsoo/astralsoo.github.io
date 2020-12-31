$(function(){

  // stock 등락 표시 기능
  let Stock_Updown = function(){
    if($(".stock span:last-child").attr("data-change") === "plus"){
      $(".stock_price").prepend("<span>↑</span>");
    }
    else if($(".stock span:last-child").attr("data-change") === "minus"){
      $(".stock_price").prepend("<span>↓</span>");
    }
  }

  // 언어 선택 기능
  let Select_Lang = function(){
    let language = $(".lang").attr("lang");

    for(let i=0 ; i<=5 ; i++){
      if($(".lang_option > a:nth-child("+i+")").attr("lang") === language){
        $(".lang_option > a:nth-child("+i+")").addClass("active");
      }
    } // 선택된 언어 표시

    if($(window).width() >= 1005){
      $(".lang_btn").click(function(){
        if($(".lang_btn").hasClass("active") === false){
          $(this).addClass("active");
          $(".lang_option > a:visible").fadeOut(100);
          $(".lang_option > a").delay(300).fadeIn();
          $(".lang_option > span").css("opacity", "0").css("visibility", "hidden");
        }
        else{
          $(this).removeClass("active");
          $(".lang_option > a:visible").fadeOut();
          for(let i=0 ; i <=5 ; i++){
            if($(".lang_option > a:nth-child("+i+")").hasClass("active") === true){
              $(".lang_option > a:nth-child("+i+")").fadeIn("fast");
            }
          }
          $(".lang_option > span").css("opacity", "1").css("visibility", "visible");
        }
      })
      $(".lang_option > span").click(function(){
        if($(".lang_btn").hasClass("active") === false){
          $(this).addClass("active");
          $(".lang_option > a:visible").fadeOut(100);
          $(".lang_option > a").delay(300).fadeIn();
        }
        $(".lang_btn").addClass("active");
        $(this).css("opacity", "0").css("visibility", "hidden");
      })
      let currentLang = $(".lang").attr("lang");
      $(".lang_option > span").attr("title", "Selected language : "+currentLang);
    } //1022px 초과일 때

    if($(window).width() < 1005){
      $(".lang_btn").click(function(){
        if($(".lang_btn").hasClass("active") === false){
          $(this).addClass("active");
          $(".lang_option").fadeIn();
        }
        else{
          $(this).removeClass("active");
          $(".lang_option").fadeOut();
        }
      })
    } //max-width 1022px일때 
  }

  // gnb 호버 기능
  let Gnb_Hover = function(){
    $(".gnb_list_item > a").mouseenter(function(){
      $(".sub_list").removeClass("active");
      $(this).siblings(".sub_list").addClass("active");
    })
    $(".gnb_list_item").mouseleave(function(){
      $(".sub_list").removeClass("active");
    })
    $(".gnb_content_close").click(function(){
      $(".sub_list").removeClass("active");
    })
  }

  // 검색버튼, 검색창 검사 기능
  let Search = function(){
    $(".header_top > label").click(function(){
      $(this).toggleClass("active");
      $(".main .search").slideToggle();
    })
    $(".search_btn").click(function(){
      if($(".search input[id=search]").val() === ""){
        alert("Please enter valid search keyword");
      }
    })
  }

  // 스크롤시 gnb 숨김, 표시 기능
  let ScrollGnb = function(){
    $(window).scroll(function(){
      let HideHD = function(){
        $(".main .gnb").css("height", "0");
        $(".main .gnb_header").hide(); //gnb 숨기기
        $(".header_top .main_logo").css("transform", "scale(0.8)");
        $("header").css("background-color", "rgba(0, 0, 0, .85)"); //헤더 로고사이즈, 투명도
        $(".header_top .stock").hide(); //주식란 숨기기
        $(".header_top .menubar").show(); //햄버거바 표시
      }

      let ShowHD = function(){
        $(".main .gnb").css("height", "50px");
        $(".main .gnb_header").show(); //gnb 나타내기
        $(".header_top .main_logo").css("transform", "scale(1)");
        $("header").css("background-color", "#000"); //헤더 로고, 투명도 복귀
        $(".header_top .stock").show(); //주식란 복귀
        $(".header_top .menubar").hide(); //햄버거바 숨기기
      }

      let currheight = document.querySelector("section").getBoundingClientRect().top;
      let currWidth = $(window).width();

      if(currheight < -50 && currWidth >= 1005){
        HideHD();
        $("header").mouseenter(function(){
          ShowHD();
        });
        $(".gnb").mouseleave(function(){
          HideHD();
        })
      }
      else if(currheight < -50 && currWidth < 1005){
        $("header").css("background-color", "rgba(0, 0, 0, .85)");
        $("header").mouseenter(function(){
          null;
        });
      }
      else if(currheight > -100 && currWidth < 1005){
        $("header").css("background-color", "#000");
      }
      else if(currheight > -100 && currWidth >= 1005){
        ShowHD();
        $(".main .gnb").mouseleave(function(){
          ShowHD();
        })
      }
    })
  }

  // 1022px미만 햄버거버튼 작동 기능
  let Gnb_Menubar = function(){
    let currWidth = $(window).width();
    if(currWidth < 1005){
      $(".menubar").click(function(){
        $(".gnb").toggleClass("active");
        $(".menubar .fa").toggleClass("fa-bars").toggleClass("fa-times");
      })
    }
  }

  // 메인 배경 슬라이드 기능
  let VS_Slider = function(){
    // 메인비주얼 슬라이더
    $(".vs_slider_nav > div").click(function(){
      $(".vs_slider_nav > div").removeClass("active");
      $(this).addClass("active");
      let imgNum = $(this).attr("data-sliderNum");
      $(".visual_slider").removeClass().addClass("visual_slider " + imgNum);
    })
    //1055px미만 비주얼 슬라이더
    $(".slider_nav_btn:first-of-type").click(function(){
      let currentImg = $(".vs_slider_nav > div.active").attr("data-sliderNum");
      let currentImgNum = Number(currentImg.slice(3));
      $(".vs_slider_nav > div").removeClass("active");
      let newImg = "img"+(currentImgNum - 1);
      $(".vs_slider_nav > div[data-sliderNum='"+newImg+"']").addClass("active");
      $(".visual_slider").removeClass().addClass("visual_slider " + newImg);
    })
    $(".slider_nav_btn:last-of-type").click(function(){
      let currentImg = $(".vs_slider_nav > div.active").attr("data-sliderNum");
      let currentImgNum = Number(currentImg.slice(3));
      $(".vs_slider_nav > div").removeClass("active");
      let newImg = "img"+(currentImgNum + 1);
      $(".vs_slider_nav > div[data-sliderNum='"+newImg+"']").addClass("active");
      $(".visual_slider").removeClass().addClass("visual_slider " + newImg);
    })
  }
  
  jQuery(document).ready(function(){
    Stock_Updown();
    Select_Lang();
    Gnb_Hover();
    Search();
    ScrollGnb();
    Gnb_Menubar();
    VS_Slider();
  })


  //브랜드 슬라이드 무한 루프
  let opacityLeft = function(){
    for(let i = 1; i < 7; i++){
      if($(".brands_img_list > .brands_img_item:nth-of-type("+i+")").hasClass("active") === true){
        $(".brands_img_list > .brands_img_item:nth-of-type("+i+")").removeClass("active");
        $(".brands_img_list > .brands_img_item:nth-of-type("+(i-1)+")").addClass("active");
      }
    }
    for(let i = 1; i < 7; i++){
      if($(".brands_logo_list > .brands_logo_item:nth-of-type("+i+")").hasClass("active") === true){
        $(".brands_logo_list > .brands_logo_item:nth-of-type("+i+")").removeClass("active");
        $(".brands_logo_list > .brands_logo_item:nth-of-type("+(i-1)+")").addClass("active");
      }
    }
  };

  let opacityRight = function(){
    for(let i = 6; i >0; i--){
      if($(".brands_img_list > .brands_img_item:nth-of-type("+i+")").hasClass("active") === true){
        $(".brands_img_list > .brands_img_item:nth-of-type("+i+")").removeClass("active");
        $(".brands_img_list > .brands_img_item:nth-of-type("+(i+1)+")").addClass("active");
      }
    }
    for(let i = 6; i >0; i--){
      if($(".brands_logo_list > .brands_logo_item:nth-of-type("+i+")").hasClass("active") === true){
        $(".brands_logo_list > .brands_logo_item:nth-of-type("+i+")").removeClass("active");
        $(".brands_logo_list > .brands_logo_item:nth-of-type("+(i+1)+")").addClass("active");
      }
    }
  };

  let slideLeft = function(){
    $(".brands_img_list > .brands_img_item:last-of-type").prependTo(".brands_img_list");
    $(".brands_img_list").css("transform", "translateX(-1520px)").css("left", "55px");
    $(".brands_img_list").animate({
      "left": "525px"
    });

    $(".brands_logo_list > .brands_logo_item:last-of-type").prependTo(".brands_logo_list");
    $(".brands_logo_list").css("transform", "translateX(-1080px)").css("left", "0px");
    $(".brands_logo_list").animate({
      "left": "360px"
    });
  };

  let slideRight = function(){
    $(".brands_img_list > .brands_img_item:first-of-type").appendTo(".brands_img_list");  
    $(".brands_img_list").css("transform", "translateX(-1520px)").css("left", "995px");
    $(".brands_img_list").animate({
      "left": "525px"
    });

    $(".brands_logo_list > .brands_logo_item:first-of-type").appendTo(".brands_logo_list");  
    $(".brands_logo_list").css("transform", "translateX(-1080px)").css("left", "720px");
    $(".brands_logo_list").animate({
      "left": "360px"
    });
  };

  $(".brands_btn_left").click(function(){
    slideLeft();
    opacityLeft();
  })

  $(".brands_btn_right").click(function(){
    slideRight();
    opacityRight();
  })


  // 사이드 공유버튼 클릭시 모달, 딤 작동
  $(".share button").click(function(){
    $(".share button > .fa").toggleClass("fa-external-link").toggleClass("fa-times");
    $(".share_modal").fadeToggle();
    $(".modal_dimmed").fadeToggle();
  })


  // 스크롤다운시 top버튼 나타나기
  $(window).scroll(function(){
    let currheight = document.querySelector("body").getBoundingClientRect().top;
    if(currheight >= -500){
      $(".to_top").fadeOut();
    }
    else if(currheight < -500){
      $(".to_top").fadeIn();
    }
  })

})