$(document).ready(function () {

  const $returnTopBtnArea = $('.return-to-top-btn-area');
  const $headerFix = $('.header-area-fix');
  const $productionSlick = $('#js-production-slick');
  const $voiceSlick = $('#js-voice-slick')
  const $faqToggleArea = $('.faq-toggle-area');
  const $anchorLink = $('a[href^="#"]');
  const $header = $('header');
  const $aboutTxtArea = $('.js-about-txt-area');
  const $headerNavBtn = $('.header-nav-btn');

  // スクロールした場合の処理
  $(window).on('scroll', () => {
    let scrollY = window.scrollY;
    let headerHeight = $headerFix[0].getBoundingClientRect().height;
    let windowHeight = window.innerHeight;
    let scrollTop = $(window).scrollTop();

    // TOPへ戻るボタンの処理
    if (scrollY >= (windowHeight - headerHeight)) {
      $returnTopBtnArea.addClass('return-to-top-btn-active');

    } else {
      $returnTopBtnArea.removeClass('return-to-top-btn-active');
    }

    // cssのアニメーション処理
    $('.btn-hover-sway-bottom, .shiny-btn').each(function() {
      let position = $(this).offset().top;
      if (scrollTop > position - windowHeight){
        $(this).addClass('animetion-active');
      }
    });

    // 卒業生の作品
    $productionSlick.each(function() {
      let position = $(this).offset().top;
      if (scrollTop > position - windowHeight){

        // 卒業生の作品のslickの動き
        $productionSlick.not('.slick-initialized').slick({
          autoplay: true,
          autoplaySpeed: 0,
          speed: 5000, //スライドが流れる速度を設定
          cssEase: "linear", // スライドの流れ方を等速に設定
          infinite: true,
          slidesToShow: 4,
          slidesToScroll: 1,
          centerMode: true,
          variableWidth: true,
          swipe: false,
          arrows: false, // 矢印
          dots: false, // インジケーター
          pauseOnFocus: false,//フォーカスで一時停止
          pauseOnHover: false,//マウスホバーで一時停止
          responsive: [
            {
              breakpoint: 961, // 960px以下のサイズに適用
              settings: {
                speed: 4000,
              },
            },
          ]
        });
      }
    });

    // 960px以下の場合
    if (window.innerWidth <= 960) {

      // cssのアニメーション処理
      $voiceSlick.each(function() {
        let position = $(this).offset().top;
        if (scrollTop > position - windowHeight){
          // 卒業生の声のslickの動き
          $voiceSlick.not('.slick-initialized').slick({
            autoplay: true,
            autoplaySpeed: 5500,
            speed: 1000, //スライドが流れる速度を設定
            infinite: true,
            arrows: true, // 矢印
            dots: true, // インジケーター
            centerPadding: "10%",
            centerMode: true,
            variableWidth: true,
          });
        }
      });
    }
  });

  // ロード、または画面幅を変更した場合の処理
  $(window).on('load resize', () => {
    let windowHeight = window.innerHeight;
    let scrollTop = $(window).scrollTop();

    // cssのアニメーション処理
    $('.btn-hover-sway-bottom-auto, .shiny-btn-auto').each(function() {
      let position = $(this).offset().top;
      if (scrollTop > position - windowHeight){
        $(this).addClass('animetion-active');
      }
    });

    // FAQの質問をクリックした際の動作
    $faqToggleArea.off('click');
    $faqToggleArea.on('click', function(e) {
      $(this).toggleClass('js-faq-open');
      $(this).children('dd').slideToggle();
      //ボタン連打防止
      e.stopPropagation();
    });

    // #で始まるアンカーをクリックした場合に処理
    $anchorLink.off('click');
    $anchorLink.on('click', function(e) {
        // ハンバーガーメニューでクリックされていた場合、ハンバーガーメニューを閉じる
      if ($header.hasClass('js-nav-sp-active')) {
        $header.removeClass('js-nav-sp-active');
      }
      // リンク先の要素を取得
      let href= $(this).attr('href');
      let target = $(href == "#" || href == "" ? 'html' : href);
      // リンク先の要素が存在する場合はスクロール処理を実行
      if (target.length) {
        // ヘッダーの高さを考慮してスクロール位置を計算
        let position = target.offset().top;
        // スクロールアニメーションを実行
        $('html, body').animate({scrollTop: position}, 500, 'swing');
        return false;
      }
      e.stopPropagation();
    });

    // 960px以下の場合
    if (window.innerWidth <= 960) {

      // メインビジュアルの要素調整
      if (window.innerWidth * 1.5 > window.innerHeight) {
        $('.mv-contents-area').addClass('mv-contents-area-scale');

      } else {
        if ($('.mv-contents-area').hasClass('mv-contents-area-scale')) {
          $('.mv-contents-area').removeClass('mv-contents-area-scale');
        }
      }

      // インタープランについての表示順変更のためDOM削除
      if ($aboutTxtArea.parent().attr('class') == 'about-txt-area') {
        $aboutTxtArea.unwrap();
      }

      // おすすめの理由4つについての表示順変更のためDOM削除
      for (let i = 1; i <= 4; i++) {
        let $reasonContentsItem = $(`.js-reason-contents-item-0${i}`);
        if ($reasonContentsItem.parent().attr('class') == 'reason-contents-item-txt-area') {
          $reasonContentsItem.unwrap();
        }
      }

      // ハンバーガーメニューのクリック時処理
      $headerNavBtn.off('click');
      $headerNavBtn.on('click', e => {
        $header.toggleClass('js-nav-sp-active');

        // ヘッダーロゴがクリックされればハンバーガーメニューは閉じる
        if ($('.logo').on('click', e => {
          $header.removeClass('js-nav-sp-active');
        }))

        e.stopPropagation();
      });

      // 961px以上の場合
    } else {

      // メインビジュアルの要素調整
      if ($('.mv-contents-area').hasClass('mv-contents-area-scale')) {
        $('.mv-contents-area').removeClass('mv-contents-area-scale');
      }

      // インタープランについての表示順変更のためDOM追加
      if ($aboutTxtArea.parent().attr('class') != 'about-txt-area') {
        $aboutTxtArea.wrapAll('<div class="about-txt-area">');
      }

      // おすすめの理由4つについての表示順変更のためDOM追加
      for (let i = 1; i <= 4; i++) {
        let $reasonContentsItem = $(`.js-reason-contents-item-0${i}`);
        if ($reasonContentsItem.parent().attr('class') != 'reason-contents-item-txt-area') {
          $reasonContentsItem.wrapAll('<div class="reason-contents-item-txt-area">');
        }
      }

      // ハンバーガーメニューの解除
      $headerNavBtn.off('click');
      $header.removeClass('js-nav-sp-active');

      // 卒業生の声のslick無効化
      $('#js-voice-slick.slick-initialized').slick('unslick');
    }
  });
});