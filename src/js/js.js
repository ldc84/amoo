
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
    topic.on('click', function(){
      var $this = $(this);
      var $parent = $this.parent('li');
      var $siblingsA = $parent.siblings('li').find('a');
      $this.addClass('active');
      $siblingsA.removeClass('active');
      subtopic.addClass('show');
      return false;
    });

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

})(jQuery);