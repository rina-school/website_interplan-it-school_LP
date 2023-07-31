$(document).ready(function () {

  // スクロールした場合の処理
  $(window).on('scroll', () => {

    // TOPへ戻るボタンの処理
    let scrollY = window.scrollY;
    let headerHeight = document.querySelector('.header-area-fix').getBoundingClientRect().height;

    // スクロール位置が「画面の高さ-ヘッダーの高さ」以上の場合
    if (scrollY >= (window.innerHeight - headerHeight)) {
      $('.return-to-top-btn-area').addClass('return-to-top-btn-view');

    } else {
      $('.return-to-top-btn-area').removeClass('return-to-top-btn-view');
    }
  });

  // ロード、または画面幅を変更した場合の処理
  $(window).on('load resize', () => {

    // 卒業生の作品のslickの動き
    $('#js-production-slick').not('.slick-initialized').slick({
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

    // FAQの質問をクリックした際の動作
    $('.faq-toggle-area').off('click');
    $('.faq-toggle-area').on('click', function(e) {
      $(this).toggleClass('js-faq-open');
      $(this).children('dd').slideToggle();
      //ボタン連打防止
      e.stopPropagation();
    });

    // #で始まるアンカーをクリックした場合に処理
    $('a[href^="#"]').off('click');
    $('a[href^="#"]').on('click', function(e) {
        // ハンバーガーメニューでクリックされていた場合、ハンバーガーメニューを閉じる
      if ($('header').hasClass('js-nav-sp-active')) {
        $('header').removeClass('js-nav-sp-active');
      }
      // リンク先の要素を取得
      let href= $(this).attr("href");
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

      // インタープランについての表示順変更のためDOM削除
      if ($('.js-about-txt-area').parent().attr('class') == 'about-txt-area') {
        $('.js-about-txt-area').unwrap();
      }

      // おすすめの理由4つについての表示順変更のためDOM削除
      for (let i = 1; i <= 4; i++) {
        if ($(`.js-reason-contents-item-0${i}`).parent().attr('class') == 'reason-contents-item-txt-area') {
          $(`.js-reason-contents-item-0${i}`).unwrap();
        }
      }

      // 卒業生の声のslickの動き
      $('#js-voice-slick').not('.slick-initialized').slick({
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

      // ハンバーガーメニューのクリック時処理
      $('.header-nav-btn').off('click');
      $('.header-nav-btn').on('click', e => {
        $('header').toggleClass('js-nav-sp-active');

        // ヘッダーロゴがクリックされればハンバーガーメニューは閉じる
        if ($('.logo').on('click', e => {
          $('header').removeClass('js-nav-sp-active');
        }))

        e.stopPropagation();
      });

      // 961px以上の場合
    } else {

      // インタープランについての表示順変更のためDOM追加
      if ($('.js-about-txt-area').parent().attr('class') != 'about-txt-area') {
        $('.js-about-txt-area').wrapAll('<div class="about-txt-area">');
      }

      // おすすめの理由4つについての表示順変更のためDOM追加
      for (let i = 1; i <= 4; i++) {
        if ($(`.js-reason-contents-item-0${i}`).parent().attr('class') != 'reason-contents-item-txt-area') {
          $(`.js-reason-contents-item-0${i}`).wrapAll('<div class="reason-contents-item-txt-area">');
        }
      }

      // 卒業生の声のslick無効化
      $('#js-voice-slick.slick-initialized').slick('unslick');

      // ハンバーガーメニューの解除
      $('.header-nav-btn').off('click');
      $('header').removeClass('js-nav-sp-active');
    }
  });
});