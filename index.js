$(function(){
  //익스플로러 확인
  let agent = navigator.userAgent.toLowerCase();
  if(
    (navigator.appName == "Netscape" && navigator.userAgent.search("Trident") != -1) || (agent.indexOf("msie") != -1)
  ){
    alert("본 페이지는 익스플로러에서 제대로 작동하지 않을 수 있습니다.");
  }

  //각 페이지로 이동하는 함수
  let To_1st = function(){
    $(".slide_wrap").css("transform", "translateX(0)");
    //gnb버튼
    $(".gnb_item").removeClass("active");
    $(".gnb_item:nth-of-type(1)").addClass("active");
  };
  let To_2nd = function(){
    $(".slide_wrap").css("transform", "translateX(-20%)");
    $(".about_wrap .headline").css("animation", "ani_about 1s 1s both");
    $(".about_wrap .about_content").delay(2000).fadeIn();
    //gnb버튼
    $(".gnb_item").removeClass("active");
    $(".gnb_item:nth-of-type(2)").addClass("active");
  };
  let To_3rd = function(){
    $(".slide_wrap").css("transform", "translateX(-40%)");
    $(".skill_wrap .headline").css("animation", "ani_skill_h2 1s 1s both");
    // 스킬바 애니메이션 작동
    $(".skill_bar > span").css("animation", "ani_skill 1s both");
    $(".skill_tech li:nth-of-type(1) .skill_bar > span").css("animation-delay", "1.5s");
    $(".skill_tech li:nth-of-type(2) .skill_bar > span").css("animation-delay", "2s");
    $(".skill_tech li:nth-of-type(3) .skill_bar > span").css("animation-delay", "2.5s");
    $(".skill_tech li:nth-of-type(4) .skill_bar > span").css("animation-delay", "3s");
    //gnb버튼
    $(".gnb_item").removeClass("active");
    $(".gnb_item:nth-of-type(3)").addClass("active");
  };
  let To_4th = function(){
    $(".slide_wrap").css("transform", "translateX(-60%)");
    $("#portfolio").scrollTop(0);
    //gnb버튼
    $(".gnb_item").removeClass("active");
    $(".gnb_item:nth-of-type(4)").addClass("active");
  };
  let To_5th = function(){
    $(".slide_wrap").css("transform", "translateX(-80%)");
    $(".contact .headline").css("animation", "ani_contact 1s 1s both");
    $(".contact > a").css("animation", "ani_contact 1s 2s both")
    //gnb버튼
    $(".gnb_item").removeClass("active");
    $(".gnb_item:nth-of-type(5)").addClass("active");
  };

  let Contribution_btn = function(){
    $(".contribution_btn").click(function(){
      $(this).toggleClass("active");
      $(this).siblings(".contribution_list").delay(500).slideToggle();
      $(this).siblings(".hover_icon").toggleClass("active");
      if($(this).hasClass("active")){
        $(this).attr("title", "기여도 접기");
      }
      else{
        $(this).attr("title", "기여도 열어보기");
      }
    })
  };

  //마우스휠 이벤트
  let wheel_event = function(){
    let page1 = document.getElementById("main");
    let page2 = document.getElementById("about");
    let page3 = document.getElementById("skill");
    let page4 = document.getElementById("portfolio");
    let page5 = document.getElementById("contact");

    //1페이지에서
    page1.addEventListener('wheel', function(e){
      if(e.deltaY > 0){
        To_2nd();
      }
      else if(e.deltaY < 0){
        console.log("첫페이지입니다.");
      }
    });
    //2페이지에서
    page2.addEventListener('wheel', function(e){
      if(e.deltaY > 0){
        To_3rd();
      }
      else if(e.deltaY < 0){
        To_1st();
      }
    });
    //3페이지에서
    page3.addEventListener('wheel', function(e){
      if(e.deltaY > 0){
        To_4th();
      }
      else if(e.deltaY < 0){
        To_2nd();
      }
    });
    //4페이지에서
    let index = 0;
    $("a[href='#page1']").click(function(){
      index = 1;
    })
    $("a[href='#page2']").click(function(){
      index = 2;
    })
    $("a[href='#page3']").click(function(){
      index = 3;
    })
    $("a[href='#page4']").click(function(){
      index = 4;
    })
    page4.addEventListener('wheel', function(e){
      if(e.deltaY > 0){
        if(index < 4){
          index++;
          let h = $($("#portfolio > div")[index]).offset().top;
          console.log(h);
          $("#portfolio").stop(true, true).animate({"scrollTop": h*index},500);
        }
        else{
          console.log("페이지가 맨 아래입니다");
          To_5th();
        }
      }
      else if(e.deltaY < 0){
        if(index > 0){
          index--;
          let h = $($("#portfolio > div")[index]).offset().top;
          console.log(h);
          $("#portfolio").stop(true, true).animate({"scrollTop": -(h*index)},500);
        }
        else{
          console.log("페이지가 맨 위입니다");
          To_3rd();
        }
      }
    });
    //5페이지에서
    page5.addEventListener('wheel', function(e){
      if(e.deltaY > 0){
        console.log("마지막페이지입니다.");
      }
      else if(e.deltaY < 0){
        To_4th();
        index = 0;
      }
    });
  }

  jQuery(document).ready(function(){
    Contribution_btn();
    wheel_event();
    $(".gnb_item:nth-of-type(1)").click(function(){
      To_1st();
    })
    $(".gnb_item:nth-of-type(2)").click(function(){
      To_2nd();
    })
    $(".gnb_item:nth-of-type(3)").click(function(){
      To_3rd();
    })
    $(".gnb_item:nth-of-type(4)").click(function(){
      To_4th();
    })
    $(".gnb_item:nth-of-type(5)").click(function(){
      To_5th();
    })
    
    //스킬바 각각의 width값
    let tech_li = ".skill_tech .skill_list > li";
    for(let i = 1 ; i < $(tech_li).length + 1 ; i++){
      let w = $(tech_li+":nth-of-type("+i+") .skill_bar > span").attr("data-progress");
      $(tech_li+":nth-of-type("+i+") .skill_bar > span").css("width", w);
    }
    
    //890px미만일때 각 스킬 제목 버튼 클릭기능
    $(".skill_wrap h3").click(function(){
      if(window.innerWidth < 890){
        $(this).toggleClass("active");
        $(this).siblings(".skill_list").slideToggle();
      }
    })
    $(window).resize(function(){
      if(window.innerWidth >= 890){
        $(".skill_list").css("display", "block");
      }
      else if(window.innerWidth < 890){
        $(".skill_bn .skill_list, .skill_lang .skill_list").css("display", "none");
        $(".skill_bn > h3, .skill_lang > h3").removeClass("active");
        $(".skill_tech > h3").addClass("active");
      }
    }) //리사이징 대응
    
  });


});
