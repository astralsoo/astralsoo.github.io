$(function(){
  // 각종 extra-list 보이기
  let open_extraList = function(){
    // gnb에서의 extra list 나타내기
    $(".gnb_item:last-of-type").click(function(){
      $(this).children(".extra_list").addClass("active");
    });

    // 프로필 클릭시 모달 보이기
    $(".user_profile").click(function(){
      $(this).siblings(".user_modal").fadeIn("fast");
    });

    // 트윗 …버튼, 공유하기 버튼에서의 extra list 나타내기
    $(".extra_menu_btn, .share > button").click(function(){
      $(this).siblings(".extra_list").slideDown(100);
    });

    // 실시간 트렌드에서의 extra list 나타내기
    $(".trend_ranking_item .extra_menu_btn").click(function(){
      $(this).siblings(".extra_list").slideDown(100);
    });

    // footer에서의 extra list 나타내기
    $(".footer_more").click(function(){
      $(this).children(".extra_list").addClass("active").css("display", "block");
    });
  };

  // extra-list 출현시 투명 딤드레이어 깔기
  let make_layer = function(){
    // gnb 더보기에서
    $(".gnb_item:last-of-type").click(function(){
      $(this).parent().siblings(".layer_dim").css("display", "block");
      $(this).parents("section").css("z-index", "15");
    });

    // 프로필 모달에서
    $(".user_profile").click(function(){
      $(this).siblings(".layer_dim").css("display", "block");
      $(this).parents("section").css("z-index", "15");
    });

    // 각 트윗, 트렌드 …버튼, 공유 버튼, 푸터 더보기 버튼에서
    $(".extra_menu_btn , .share > button, .footer_more").click(function(){
      let layer = $(".gnb .layer_dim").clone(true);
      $(this).after(layer);
      $(this).siblings(".layer_dim").css("display", "block");
      $(this).parents("section").css("z-index", "15");
    });
  };

  // 투명 딤드레이어 클릭시 레이어와 메뉴가 사라지는 기능
  let delete_layer = function(){
    $(".layer_dim").click(function(){
      $(".extra_list").removeClass("active");
      $(".user_modal").hide();
      $(this).hide();
      $(".main").find(".extra_list").hide();
      $(".right_bar").find(".extra_list").hide();
      $(".main").find(this).remove();
      $(".right_bar").find(this).remove();
      $("section").css("z-index", "auto");
    });
  };

  // 입력창 자동높이조절, 글자수 체크
  let twit_input = function(){
    autosize($("textarea"));

    $("textarea").keyup(function(){
      let text_length = $("textarea").val().length;
      $(".input_check_words > span").html((140-text_length));
      if(text_length <= 70){
        $(".input_check_words > span").css({"color":"#1DA1F2" , "font-weight":"normal"});
      }
      else if(text_length > 70 && text_length <= 125){
        $(".input_check_words > span").css({"color":"orange" , "font-weight":"normal"});
      }
      else if(text_length > 125){
        $(".input_check_words > span").css({"color":"red" , "font-weight":"bold"});
      }
    });
  };

  //새 트윗 입력
  let write_twit = function(){
    $(".input_twit").click(function(){
      let new_twit_text = $("textarea").val();
      if(new_twit_text.length === 0 ){
        alert("트윗 내용을 입력하세요!");
      }
      else{
        let new_twit_name = $($(".left_bar .user_name")[0]).text();
        let new_twit_id = $($(".left_bar .user_id")[0]).text();
        let new_twit = $(".main_twit_item.twit_item_basic").clone(true).removeClass("twit_item_basic");

        new_twit.find(".twit_content .twit_text").html(new_twit_text); //트윗내용 변경
        new_twit.find(".twit_header .twit_user_name").html(new_twit_name); //사용자 이름 변경
        new_twit.find(".twit_header .twit_user_id").html(new_twit_id); //사용자 id 변경


        new_twit.css("display", "none").prependTo(".main_twit_list").fadeIn();

        $("textarea").val("").css("height", "40px");
        $(".input_check_words > span").html("140").css({"color":"#1DA1F2" , "font-weight":"normal"});
      }
    });
    //올린 내 트윗 삭제
    $(".twit_delete").click(function(){
      $(this).parents(".main_twit_item").remove();
    });
  };

  let rt_like = function(){
    // 리트윗 버튼 기능
    $(".main_twit_item .retweet").click(function(){
      $(this).toggleClass("active");
      let rtNum = Number($(this).children(".twit_footer_btn_num").text());
      if($(this).hasClass("active")){
        $(this).find(".twit_footer_btn_num").html(rtNum + 1);
      }
      else{
        if(rtNum === 1){
          $(this).find(".twit_footer_btn_num").html("");
        }
        else{
          $(this).find(".twit_footer_btn_num").html(rtNum - 1);
        }
      }
    });
    // 잠금계정 리트윗 불가
    $(".main_twit_item[data-user='lock'] .retweet").click(function(){
      $(this).removeClass("active");
      $(this).find(".twit_footer_btn_num").html("");
    });

    // 좋아요 버튼 기능
    $(".like").click(function(){
      $(this).toggleClass("active");
      $(this).children("button").children(".fa").toggleClass("fa-heart-o").toggleClass("fa-heart");
      let likeNum = Number($(this).children(".twit_footer_btn_num").text());
      if($(this).hasClass("active")){
        $(this).find(".twit_footer_btn_num").html(likeNum + 1);
      }
      else{
        if(likeNum === 1){
          $(this).find(".twit_footer_btn_num").html("");
        }
        else{
          $(this).find(".twit_footer_btn_num").html(likeNum - 1);
        }
      }
    });
  };

  let trend_more = function(){
    // 실시간트렌드 더보기버튼
    $(".trend_more").click(function(){
      if($(".trend_ranking_item:nth-of-type(n+5)").is(":hidden") === true){
        $(".trend_ranking_item:nth-of-type(n+5)").css("display", "block");
      }
      else{
        $(this).attr("href", "#other");
      }
    });
  };

  let follow = function(){
    // 팔로우 버튼
    $(".follow_user > button").click(function(){
      $(this).toggleClass("active");
      if($(this).hasClass("active")){
        $(this).html("팔로잉");
      }
      else{
        $(this).html("팔로우");
      }
    });
  };

  let messenger = function(){
    // 쪽지창 열고 닫기
    $(".open_close_msn").click(function(){
      let icon = $(this).children(".fa");
      if($(icon).hasClass("fa-angle-double-up") === true){
        $(".messenger").addClass("active");
        $(icon).removeClass("fa-angle-double-up").addClass("fa-angle-double-down");
      }
      else{
        $(".messenger").removeClass("active");
        $(icon).removeClass("fa-angle-double-down").addClass("fa-angle-double-up");
      }
    });
    $(".msn_onoff").click(function(){
      $(".messenger").toggleClass("active");
      $(".open_close_msn > .fa").toggleClass("fa-angle-double-up").toggleClass("fa-angle-double-down")
    });
  };

  jQuery(document).ready(function(){
    // 현재 로그인한 유저 보이기
    let now_user = $(".left_bar .user_profile").clone();
    $(now_user).children(".user_img").css({"width":"50px", "height":"50px", "margin-top":"-5px"});
    $(now_user).prependTo(".user_now_logOn");
    let now_id = $(".user_id").first().text();
    $(".user_modal > a > span").html(now_id);

    // 트윗 리스트 extra list에 사용자 id 삽입
    for(let i = 1 ; i <= $(".main_twit_item").length ; i++){
      let list_id = $(".main_twit_item:nth-of-type("+i+") .twit_user_id").text();
      $(".main_twit_item:nth-of-type("+i+") .extra_list_item > a > span:nth-of-type(2)").html(list_id+" ");
    }

    //트렌드 랭킹 숫자 자동입력
    for(let i = 1; i <= $(".trend_ranking_item").length ; i++){
      let index = $(".trend_ranking_item:nth-of-type("+i+")").index() + 1;
      $(".trend_ranking_item:nth-of-type("+i+") .rank").html(index);
    }

    // 검색창 focus 배경 변경
    $(".search_box > input").focusin(function(){
      $(".search_box").addClass("active");
    });
    $(".search_box > input").focusout(function(){
      $(".search_box").removeClass("active");
    });

    open_extraList();
    make_layer();
    delete_layer();
    twit_input();
    write_twit();
    rt_like();
    trend_more();
    follow();
    messenger();
  });
});