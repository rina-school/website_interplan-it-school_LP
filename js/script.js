$(document).ready(function()
{
  const faqToggleAreaAll = document.querySelectorAll('.faq-toggle-area');
  const returnToTopBtn = document.querySelector('.return-to-top-btn-area');
  const header = document.querySelector('.header-area-fix');

  // FAQの質問をクリックした際の動作
  for (let i = 0; i < faqToggleAreaAll.length; i++) {
    faqToggleAreaAll[i].addEventListener('click', (e) => {
      faqToggleAreaAll[i].classList.toggle('js-faq-answer-open');
      //ボタン連打防止
      e.stopPropagation();
    });
  }

  // #で始まるアンカーをクリックした場合に処理
  $('a[href^="#"]').click(function(){
    // スクロールの速度
    let speed = 500;// ミリ秒

    // アンカーの値取得
    let href= $(this).attr('href');

    // 移動先を取得
    let target = $(href == '#' || href == '' ? 'html' : href);

    // 移動先を数値で取得
    let position = target.offset().top;

    // スムーススクロール
    $('html, body').animate({scrollTop:position}, speed, 'swing');

    // URLにアンカーリンクを付加させない
    return false;
  });

  // 卒業生の作品のslickの動き
  $('#js-production-slick').slick({
    autoplay: true,
    autoplaySpeed: 0, 
    speed: 5000, //スライドが流れる速度を設定
    cssEase: "linear", // スライドの流れ方を等速に設定
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    swipe: false,
    arrows: false, // 矢印
    dots: false, // インジケーター
    pauseOnFocus: false,//フォーカスで一時停止
    pauseOnHover: false,//マウスホバーで一時停止
    responsive: [
      {
        breakpoint: 961, // 399px以下のサイズに適用
        settings: {
          speed: 1500,
        },
      },
    ]
  });

  // 卒業生の声のslickの動き
  $('#js-voice-slick').slick({
    responsive: [
      {
        breakpoint: 961, // 960px以下のサイズに適用
        settings: {
          autoplay: false,
          autoplaySpeed: 0, 
          speed: 4000, //スライドが流れる速度を設定
          infinite: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: true, // 矢印
          dots: true, // インジケーター
        },
      },
    ]
  });

  // TOPへ戻るボタンの処理
  window.addEventListener('scroll', () => {
    let scrollY = window.scrollY;
    let headerHeight = header.getBoundingClientRect().height;

    // スクロール位置が「画面の高さ-ヘッダーの高さ」以上の場合
    if (scrollY >= (window.innerHeight - headerHeight)) {
      returnToTopBtn.classList.add('return-to-top-btn-view');

    } else {
      returnToTopBtn.classList.remove('return-to-top-btn-view');
    }
  });


  // ロード、または画面幅を変更した場合の処理
  $(window).on('load resize', () => {
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
    }
  });

});

