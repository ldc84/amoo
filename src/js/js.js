
(function ($) {

  // header
  $(function(){
    var body = $('body');
    var header = $('#header');
    var topSearch = header.find('.top-search');
    var topSearchInput = topSearch.find('> input');
    var topSearchDel = topSearch.find('> .btn-del');
    var topSearchButton = topSearch.find('> .btn-search');
    var topMypage = header.find('.mypage');
    var topMypageBtn = topMypage.find('> a');
    var topMenu = header.find('.m-menu');
    var mobileMenu = $('#mobileMenu');
    var mobileMenuClose = mobileMenu.find('.close');

    // top search
    topSearchInput.on('keyup', function(){
      var $thisVal = $(this).val();
      ($thisVal !== '') ? topSearchDel.addClass('ing') : topSearchDel.removeClass('ing') ;
      return false;
    });

    topSearchDel.on('click', function(){
      topSearchInput.val('').focus();
      topSearchDel.removeClass('ing');
      return false;
    });
    
    topMypageBtn.on('click', function(){
      topMypage.toggleClass('active');
      return false;
    });

    // mobile search
    topSearchButton.on('click', function(){
      if(topSearch.css("top") == '8px' && !topSearch.hasClass('active')){
        topSearch.addClass('active');
        topSearchInput.focus();
        return false;
      }
    });

    // mobile search focus out
    // topSearchInput.on('focusout', function(){
    //   if(topSearch.css("top") == '8px'){
    //     topSearch.removeClass('active');
    //   }
    // });

    // mobile menu
    topMenu.on('click', function(){
      body.addClass('over-hidden');
      header.after('<div class="dim"></div>');
      mobileMenu.addClass('active');
      return false;
    });

    mobileMenuClose.on('click', function(){
      body.removeClass('over-hidden');
      mobileMenu.removeClass('active');
      $('.dim').remove();
      return false;
    });

    // 로그인 _ 회원가입 / 아이디찾기/ 비번찾기
    // $(document).on('click', '.login-utill a', function(){
    //   var $this = $(this);
    //   var $url = $this.data('html-url');
    // });
  });

  // topic
  $(function(){
    var filteringTopic = $('.filtering-topic');
    var topic = filteringTopic.find('.topic a');
    var subtopic = filteringTopic.find('.subtopic');
    var toggleButton = filteringTopic.find('.toggle-box > a');
    var topicLocation = filteringTopic.find('.topic-location');
    var topicLocationBtn = topicLocation.find('> a');
    var mBtnCancel = filteringTopic.find('.m-btn-box-1 > .cancel');
    var mBtnOk = filteringTopic.find('.m-btn-box-1 > .ok');

    var topicSel = '';
    var subtopicList = [];

    // top search
    // topic.on('click', function(){
    //   var $this = $(this);
    //   var $parent = $this.parent('li');
    //   var $siblingsA = $parent.siblings('li').find('a');
    //   $this.addClass('active');
    //   $siblingsA.removeClass('active');
    //   subtopic.addClass('show');
    //   return false;
    // });

    // toggleButton
    toggleButton.on('click', function(){
      filteringTopic.toggleClass('close');
      return false;
    });

    // mobile open
    topicLocationBtn.on('click', function(){
      filteringTopic.addClass('active');
      if(subtopicList.length > 0){
        subtopic.addClass('show');        
      }
      return false;
    });

    // cancel
    mBtnCancel.on('click', function(){
      if(subtopicList.length > 0){

        topic.each(function(){
          var $this = $(this);
          var text = $this.text();
          (topicSel == text) ? $this.addClass('active') : $this.removeClass('active') ;
        });

        subtopic.find('input[type="checkbox"]').prop('checked', false);
        subtopic.find('input[type="checkbox"]').each(function(){
          var $this = $(this);
          var $id = $this.attr('id');
          for (var index = 0; index < subtopicList.length; index++) {
            const elem = subtopicList[index];
            if($id == elem){
              $this.prop('checked', true);
            }  
          }
        });
      }else {
        topic.removeClass('active');
        subtopic.find('input[type="checkbox"]').each(function(){
          var $this = $(this);
          $this.prop('checked', false);
        });
      }
      filteringTopic.removeClass('active');
      subtopic.removeClass('show');
      return false;
    });
    // ok
    mBtnOk.on('click', function(){
      topicLocationBtn.find('> div').empty();
      topicLocationBtn.find('> div').append('<ul></ul>');
      subtopicList = [];
      subtopic.find('input[type="checkbox"]').each(function(){
        var $this = $(this);
        var id = $this.attr('id');
        var text = $this.next('label').text();
        if($this.prop('checked') === true){
          subtopicList.push(id);
          topicLocationBtn.find('> div > ul').append('<li>'+ text +'</li>');
        }
      });
      if(subtopicList.length > 0){
        topic.each(function(){
          var $this = $(this);
          var text = $this.text();
          if($this.hasClass('active')){
            topicLocationBtn.find('> strong').text(text);
            topicSel = text;
          }
        });
      }
      filteringTopic.removeClass('active');
      topicLocation.addClass('selected');
      subtopic.removeClass('show');
      return false;
    });

  });

  // layer
  $(function(){
    var body = $('body');
    var dataElement = body.find('a[data-layer]');
    var layer = $('.layer');
    var layerClose = layer.find('.close');
    var layerClose2 = layer.find('.layer-close');
    var dim = $('<div class="dim"></div>');
      
    dataElement.on('click', function(){
      var target = $(this).data('target');

      layer.before(dim);
      body.addClass('over-hidden');
      $('.'+target).addClass('show');

      return false;
    });

    layerClose.on('click', function(){
      body.removeClass('over-hidden');
      layer.removeClass('show');
      $('.dim').remove();
      return false;
    });
    layerClose2.on('click', function(){
      body.removeClass('over-hidden');
      layer.removeClass('show');
      $('.dim').remove();
      return false;
    });

    $(document).on('click', '.dim', function(){
      if(layerClose) layerClose.trigger('click');
      if(layerClose2) layerClose2.trigger('click');
    });

  });

  // filter
  $(function(){
    var body = $('body');
    var header = $('#header');
    var filterBtn = $('.btn-filter');
    var filterBox = $('.filter-box-inner');
    var filterArrow = $('.arrow');
    var filterCancel = filterBox.find('.cancel');

    filterArrow.on('click', function(){
      var $this = $(this);
      var dl = $this.closest('dl');

      dl.toggleClass('closed');
      
      return false;
    });

    // mobile _ filter
    filterBtn.on('click', function(){
      body.addClass('over-hidden');
      header.after('<div class="dim"></div>');
      filterBox.addClass('active');
      return false;
    });

    // mobile _ cancel
    filterCancel.on('click', function(){
      body.removeClass('over-hidden');
      $('.dim').remove();
      filterBox.removeClass('active');
      return false;
    });
    

  });


  // detail
  $(function(){
    var detailHead = $('.detail-head');
    var detailYoutubeText = detailHead.find('.txt-youtube');
    var detailYoutubeTextMore = detailYoutubeText.find('.btn-text');
    var detailWith = $('.detail-with');
    var tabBtn = detailWith.find('.tab-type-1 a');
    var withBox = detailWith.find('.with-list-box');
    var howtoBox = withBox.find('.howto');
    var howtoList = howtoBox.find('.howto-list');
    var lessonBox = withBox.find('.lesson');
    var lessonList = lessonBox.find('.lesson-list > .list-type-4');

    // youtube text toggle
    detailYoutubeTextMore.on('click', function(){
      detailYoutubeText.find('> p').toggleClass('active');
      (detailYoutubeText.find('> p').hasClass('active')) ? detailYoutubeTextMore.text('간략히') : detailYoutubeTextMore.text('더보기') ;
      return false;
    });

    // clipboard
    $('.btn-clipboard').on('click', function(){
      var timer;

      $('.clipboard-toast').addClass('active');
      $('#hideCopy').select();
		  document.execCommand("copy");
      clearTimeout(timer);
      timer = setTimeout(function(){
        $('.clipboard-toast').removeClass('active'); 
      }, 2000);
      return false;
    });

    // tab _ 같이보면좋은강좌
    tabBtn.on('click', function(){
      var $this = $(this);
      var target = $this.data('target');

      tabBtn.removeClass('active');
      $this.addClass('active');

      $('.'+target).siblings().hide();
      $('.'+target).fadeIn(250);

      return false;
    });

    howtoList.slick({
      arrows: true,
      dots: false,
      appendArrows: howtoBox.find('.arrow-box'),
    });

    lessonList.slick({
      arrows: true,
      dots: false,
      slidesToShow: 4,
      slidesToScroll: 4,
      appendArrows: lessonBox.find('.arrow-box'),
      responsive: [
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            dots: false
          }
        },
      ]
    });
    
    $(window).on('load', function(){
      $('.visible-hide').removeClass('visible-hide').hide();
    })

    // layer _ 신고하기
    var reportList = $('.report-radio-list');
    var reportRadio = reportList.find('input[type=radio]');
    var reportTextarea = $('.report-write textarea');
    var textDefault = '신고하는 항목의 이유를 입력해주세요.\n보다 신속하고 정확한 처리에 도움이 됩니다. (최대 130자)\n';
    var textChange = [
      'EX) 결제해야 볼 수 있는 강좌입니다.',
      'EX) 잘못된 쇼핑몰 사이트로 넘어가네요.',
      'EX) 자바스크립트 강좌가 포토샵 교육분야에 들어가 있습니다.',
      'EX) 고급강좌가 초급강좌로 설정되어있습니다.',
      'EX) 혐오내용을 담고있는 강좌입니다.',
      'EX) 제가 그린 그림을 무단으로 사용하고 있습니다.',
      ''
    ]
    reportRadio.on('click', function(){
      var idx = $(this).closest('li').index();
      reportTextarea.attr('placeholder', textDefault+textChange[idx]);
    });

  });

  
  // userpage
  $(function(){
    var usertab = $('.user-tab-box');
    var usertabBtn = usertab.find('> a');
      
    usertabBtn.on('click', function(){
      usertab.toggleClass('active');
      return false;
    });

  });

})(jQuery);