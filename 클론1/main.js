$(function(){

  // 메인 배경화면 슬라이드 기능
  let SlidePlus = function(){
    let mainPage = document.querySelector(".main");
    let mainPageIndex = mainPage.classList[1];
    let mainPageNum = mainPageIndex.slice(mainPageIndex.length - 1);
    $(".main_text > h2").removeClass("active");
    if(mainPageNum < 3){
      $(".main").removeClass("mainBG0" + mainPageNum +"");
      mainPageNum++;
      $(".main").addClass("mainBG0" + mainPageNum +"");
      let PgIndexNow = mainPage.classList[1];
      $(".main_text > h2[data-mainBGnum='" + PgIndexNow +"']").addClass("active");
    }
    else if(mainPageNum == 3){
      $(".main").removeClass("mainBG03");
      $(".main").addClass("mainBG01");
      $(".main_text > h2:nth-child(1)").addClass("active");
    }
  }
  let SlideMinus = function(){
    let mainPage = document.querySelector(".main");
    let mainPageIndex = mainPage.classList[1];
    let mainPageNum = mainPageIndex.slice(mainPageIndex.length - 1);
    $(".main_text > h2").removeClass("active");
    if(mainPageNum > 1 && mainPageNum < 4){
      $(".main").removeClass("mainBG0" + mainPageNum +"");
      mainPageNum--;
      $(".main").addClass("mainBG0" + mainPageNum +"");
      let PgIndexNow = mainPage.classList[1];
      $(".main_text > h2[data-mainBGnum='" + PgIndexNow +"']").addClass("active");
    }
    else if(mainPageNum == 1){
      $(".main").removeClass("mainBG01");
      $(".main").addClass("mainBG03");
      $(".main_text > h2:nth-child(3)").addClass("active");
    }
  }
  let Btn_Slide = function(){
    $("button.slide_plus").click(function(){
      SlidePlus();
    });
    $("button.slide_minus").click(function(){
      SlideMinus();
    });
  }

  // 자동으로 슬라이드
  let autoPlus = function(){
    window.setInterval(SlidePlus, 4000);
  };
  
  // GNB 슬라이드다운 기능
  let Gnb_SlideDown = function(){
    $(".gnb_item").mouseenter(function(){
      $(this).children(".sub_list").slideDown("fast");
    }).mouseleave(function(){
      $(".sub_list").hide();
    })
  }

  // 전체메뉴 열어보기 기능
  let Open_SubGnb = function(){
    $(".btn_sub_gnb").click(function(){
      $(".sub_gnb").toggleClass("active");
    })
    $(".btn_sub_close").click(function(){
      $(".sub_gnb").removeClass("active");
    })
  }

  //현황 버튼 기능
  let Open_Current = function(){
    $(".curr_btn").click(function(){
      if($(this).hasClass("closed")){
        if($(this).hasClass("active")){
          $(this).siblings().removeClass("active");
          let classname = $(this).attr("data-currpage");
          $(".main_curr_box > div").removeClass("active");
          $(".main_curr_box ."+classname).addClass("active");
          $(".main_curr_box").slideDown();
          $(".curr_btn").find(".fa").removeClass("fa-arrow-circle-down").addClass("fa-arrow-circle-up");
          $(".curr_btn").children(".arrow_down").attr("title", "접기");
          $(".curr_btn").removeClass("closed").addClass("open");
        }
        else{
          $(this).addClass("active").siblings().removeClass("active");
          let classname = $(this).attr("data-currpage");
          $(".main_curr_box > div").removeClass("active");
          $(".main_curr_box ."+classname).addClass("active");
        }
      }
      else if($(this).hasClass("open")){
        if($(this).hasClass("active")){
          $(".main_curr_box").slideUp();
          $(".curr_btn").find(".fa").addClass("fa-arrow-circle-down").removeClass("fa-arrow-circle-up");
          $(".curr_btn").children(".arrow_down").attr("title", "클릭하여 청원현황 보기");
          $(".curr_btn").removeClass("open").addClass("closed");
        }
        else{
          $(this).addClass("active").siblings().removeClass("active");
          let classname = $(this).attr("data-currpage");
          $(".main_curr_box > div").removeClass("active");
          $(".main_curr_box ."+classname).addClass("active");
        }
      }
    })
  }

  //현황 검색어 위치 랜덤설정
  let Search_word  = function(){
    $(".curr_btn:last-of-type").click(function(){
      if($(this).hasClass("active")){
        if($(this).hasClass("open")){
          for(let i = 1; i<=$(".curr_search > a").length ; i++){
            let getRandomNum = function(min, max) {
              return Math.floor(Math.random() * (max - min) + min) + "%";
            }
            let getRandomColor = function(max){
              let arr_color = ["#c6679d", "#cd37c5", "#c5952b", "#59b576", "#19887c", "#dc346c", "#9dae05", "#32f5c7", "#71fb1e", "#bebccc"];
              let randomIndex = Math.floor(Math.random() * Math.floor(max));
              return arr_color[randomIndex];
            }
            let random_offsetX = getRandomNum(1, 75);
            let random_offsetY = getRandomNum(1, 75);
            let random_color = getRandomColor(10);
            $(".curr_search > a:nth-of-type("+i+")").css({
              "top":random_offsetY,
              "left":random_offsetX,
              "color":random_color
            })
          }
        }
      }
    })
  }

  // 동의, 임박, 공개순 페이지 전환
  let Range_Page = function(){
    $(".btn_range > button").click(function(){
      $(".btn_range > button").removeClass("active");
      $(this).addClass("active");
      
      let pagenum = $(this).attr("data-page");
      $(".ctt_page").removeClass("active");
      $("." + pagenum).addClass("active");

      if(window.innerWidth < 780){
        if($(".ctt_page.page1").hasClass("active")){
          $(".content_wrap").css("height", "800px");
        }
        if($(".ctt_page.page2").hasClass("active")){
          $(".content_wrap").css("height", "940px");
        }
        if($(".ctt_page.page3").hasClass("active")){
          $(".content_wrap").css("height", "940px");
        }
      }
    })
  }

  // 기타 작은 버튼 기능
  let Click_Button = function(){
    // 전체보기 버튼 기능
    $(".btn_category").click(function(){
      $(this).toggleClass("active");
      $(this).children(".fa").toggleClass("fa-angle-down").toggleClass("fa-angle-up");
    })
    // 배너 이미지 버튼 기능
    $(".banner_btn").click(function(){
      $(".banner_btn").removeClass("active");
      $(".banner_link").removeClass("active");
      $(this).addClass("active");
      let bannerNum = $(this).attr("data-slide");
      $(".banner_link." + bannerNum).addClass("active");
    })
    // 국회관련 페이지 열어보기
    $(".ft_outlink > button").click(function(){
      $(this).toggleClass("active");
    })
  }
  // 스크롤다운 to top 출현 기능
  let To_Top = function(){
    $(window).scroll(function(){
      let currheight = document.querySelector("body").getBoundingClientRect().top;
      if(currheight >= -800){
        $(".totop").removeClass("active");
      }
      else if(currheight < -800){
        $(".totop").addClass("active");
      }
    })
  }
  
  $(document).ready(function(){
    Btn_Slide();
    autoPlus();
  });

  $(document).ready(function(){
    Gnb_SlideDown();
    Open_SubGnb();
    Open_Current();
    Search_word();
    Range_Page();
    Click_Button();
    To_Top();
  });

  // 청원목록 그래프 바 표시
  for(let i = 1 ; i < 4 ; i++){
    for(let j = 1 ; j < 4 ; j++){
      let graph_w = $(".page"+ i + "> div:nth-child(" + j +")").find(".agree_per").attr("data-per");
      $(".page" + i + "> div:nth-child(" + j +")").find(".graph_bar").css("width", graph_w);
    }
  };

})
