'use strict';

$(function () {
  $('#fullpage').fullpage({
    css3: true,
    anchors: ['homepage', 'energysave', 'innovation', 'partner', 'aboutus'],
    menu: ".menu",
    afterLoad: function afterLoad(anchorLink, index) {
      //首屏幕的动画
      if (!$('.homepage').hasClass('on')) {
        setTimeout(function () {
          $('.homepage').addClass('on');
        }, 2000);
      }
      toChange(index);
    },
    onLeave: function onLeave(index, direction) {
      // console.log('离开', index, direction)
    }
  });

  function toDecimal(x) {
    var f = parseFloat(x);
    if (isNaN(f)) {
      return false;
    }
    var f = Math.round(x * 10) / 10;
    var s = f.toString();
    var rs = s.indexOf('.');
    if (rs < 0) {
      rs = s.length;
    }
    return s;
  }
  //每屏首次加载后执行的函数
  function toChange(index) {
    switch (index) {
      case 2:
        if (!$('.energysave').hasClass('on')) {
          $('.energysave').addClass('on').find('li b').each(function (i, v) {
            $(this).prop('Counter', 0).animate({
              Counter: $(this).text()
            }, {
              duration: 2000,
              easing: 'swing',
              step: i == 2 ? function (now) {
                $(this).text(toDecimal(now));
              } : function (now) {
                $(this).text(Math.ceil(now));
              }
            });
          });
        }
        break;
      case 3:
        if (!$('.innovation').hasClass('on')) {
          $('.innovation').addClass('on');
        }
        break;
      case 4:
        if (!$('.partner').hasClass('on')) {
          $('.partner').addClass('on');
        }
        break;
      case 5:
        if (!$('.aboutus').hasClass('on')) {
          $('.aboutus').addClass('on');
        }
        break;
    }
  }
  //创新科技四个气泡框选择
  $('#fourbubble').on('click', 'li', function () {
    var index = $(this).index();
    $('#fourcontent span').animate({
      'left': 12.5 + 25 * index + '%'
    }, 100);
    $('#fourcontent p').eq(index).addClass('on').siblings('p').removeClass('on');
  });

  //图片微交互
  function shakeAnimation(dom) {
    $(dom).mouseenter(function () {
      var thisPX = $(this).offset().left;
      var thisPY = $(this).offset().top;
      var boxWidth = $(this).outerWidth();
      var boxHeight = $(this).outerHeight();
      $(this).mousemove(function (event) {
        var mouseX = event.pageX - thisPX;
        var mouseY = event.pageY - thisPY;
        var X;
        var Y;
        if (mouseX > boxWidth / 2) {
          X = mouseX - boxWidth / 2;
        } else {
          X = mouseX - boxWidth / 2;
        }
        if (mouseY > boxHeight / 2) {
          Y = boxHeight / 2 - mouseY;
        } else {
          Y = boxHeight / 2 - mouseY;
        }

        $(this).find('img').each(function (i, v) {
          var s = i % 2 === 0 ? 10 + 10 * i : 10 + 10 * i;
          $(v).css({
            "transform": "translateY(" + X / s + "px) " + "translateX(" + Y / s + "px) "
          });
        });
      });
    });
    $(dom).mouseleave(function () {
      $(this).css({
        "transform": "rotateY(0deg) rotateX(0deg)"
      });
    });
  }
  shakeAnimation('aside');
});
//# sourceMappingURL=base.js.map
