'use strict';

$(function () {

  var SERVER = '/user-service/api/v1';
  console.log(SERVER);

  var params = getQueryObject();
  if (params.target === 'reg') {
    $('.chooseRole').addClass('on').siblings('div').removeClass('on');
  }

  //查询url参数
  function getQueryObject(url) {
    url = url == null ? window.location.href : url;
    var search = url.substring(url.lastIndexOf('?') + 1);
    var obj = {};
    var reg = /([^?&=]+)=([^?&=]*)/g;
    search.replace(reg, function (rs, $1, $2) {
      var name = decodeURIComponent($1);
      var val = decodeURIComponent($2);
      val = String(val);
      obj[name] = val;
      return rs;
    });
    return obj;
  }

  /**
   * ajax请求
   * @param {String} url 请求地址
   * @param {Object} data 参数
   * @param {String} type 类型
   */
  function request(_ref) {
    var url = _ref.url,
        data = _ref.data,
        type = _ref.type;

    var token = getToken();
    return $.ajax({
      url: url,
      type: type,
      data: JSON.stringify(data),
      contentType: "application/json;charset=utf-8",
      beforeSend: function beforeSend(res) {
        if (token) {
          res.setRequestHeader("Authorization", token);
        }
      },
      dataType: 'json'
    });
  }

  //输入检查
  var inputCheck = {
    //登录前检查 若验证通过，返回username,psd
    'loginCheck': function loginCheck(usernameDom, psdDom) {
      var username = $.trim($(usernameDom).val());
      var psd = $(psdDom).val();
      if (!username) {
        $(usernameDom).siblings('.errmsg').html('用户名不能为空');
      }
      if (!psd) {
        $(psdDom).siblings('.errmsg').html('密码不能为空');
      }
      if (!username || !psd) {
        return false;
      } else {
        return {
          username: username,
          psd: psd
        };
      }
    },
    //注册前检查 若验证通过，返回username,psd
    'regCheck': function regCheck() {
      var username = $('#regUserName').val();
      var psd = $('#regPsd').val();
      var namecheck = /^[a-zA-Z0-9_-]{4,16}$/;
      var psdcheck = /^.*(?=.{6,})(?=.*\d)(?=.*[a-z]).*$/;
      var a = namecheck.test($.trim(username));
      var b = psdcheck.test(psd);
      var c = psd === $('#confirmPsd').val();
      if (!a) {
        $('#regnameErr').html('由4-16位大小写字母，数字，下划线组合');
      }
      if (!b) {
        $('#regpsdErr').html('请输入大于6位，且同时包含字母和数字');
      }
      if (!c) {
        $('#regconfirmpsdErr').html('两次密码不一致');
      }
      if (a && b && c) {
        return {
          username: username,
          psd: psd
        };
      } else {
        return false;
      }
    },
    //绑定手机检查 若验证通过，参数分别是手机号dom和验证码dom，返回phone,code
    'smsCheck': function smsCheck(phoneDom, codeDom) {
      var phone = $(phoneDom).val();
      var code = $(codeDom).val();
      var a = /^1[34578]\d{9}$/.test(phone);
      var b = /^\d{4}$/.test(code);
      if (!a) {
        $(phoneDom).siblings('.errmsg').html('手机号码格式不正确');
      }
      if (!b) {
        $(codeDom).siblings('.errmsg').html('验证码格式不正确');
      }
      if (a && b) {
        return {
          phone: phone,
          code: code
        };
      } else {
        return false;
      }
    }
    //清除错误信息
  };function clearErrmsg() {
    $('.errmsg').html('');
  }

  //设置token
  function setToken(token) {
    var time = new Date();
    time.setTime(time.getTime() + 60 * 1000);
    CookieUtil.set('hwUserToken', token, time);
    // window.sessionStorage.setItem('hwUserToken', token)
  }
  //获取token
  function getToken() {
    return CookieUtil.get('hwUserToken');
    // return window.sessionStorage.getItem('hwUserToken')
  }

  //设置用户基本信息userid,username,avatar,roletype
  function setUserData(res) {
    // window.sessionStorage.setItem('hwUserId', res.id)
    // window.sessionStorage.setItem('hwUserName', res.name)    
    // window.sessionStorage.setItem('hwUserAvatar', res.avatar)
    // window.sessionStorage.setItem('hwuserRole', JSON.stringify(res.role))
    CookieUtil.set('hwUserData', JSON.stringify(res));
  }

  //发送验证码等待时间
  function stopsend(ele) {
    $(ele).attr('disabled', "true");
    var time = 60;
    var timer = setInterval(function () {
      if (time-- == 1) {
        $(ele).removeAttr("disabled");
        clearInterval(timer);
      }
      $(ele).html(time == 0 ? '获取验证码' : time + 's');
    }, 1000);
  }

  //登录
  function userlogin() {
    clearErrmsg();
    var config = inputCheck.loginCheck('#loginUserName', '#loginPsd');
    if (config) {
      request({
        url: SERVER + '/users/login/',
        data: {
          username: config.username,
          password: config.psd,
          type: 2
        },
        type: 'POST'
      }).done(function (res) {
        console.log(res);
        $('#loginErr').html(res.message);
        if (res.code === 0) {
          setToken(res.data.token);
          setUserData(res.data);
          // location.href="/index.html";
        }
      }).fail(function (err) {
        console.log(err);
      });
    }
  }
  //注册
  function userRegist() {
    clearErrmsg();
    var config = inputCheck.regCheck();
    var role = $("[name='userrole']").filter(":checked").val();
    if (config) {
      request({
        url: SERVER + '/users/register/',
        data: {
          username: config.username,
          password: config.psd,
          role: parseInt(role)
        },
        type: 'POST'
      }).done(function (res) {
        $('#regErr').html(res.message);
        console.log(res);
        if (res.code === 0) {
          setToken(res.data.token);
          setUserData(res.data);
          $('.bindPhone').addClass('on').siblings('div').removeClass('on');
        }
      });
    }
  }
  //发送验证码
  function sendSMS(phoneDom, type, dom) {
    clearErrmsg();
    var phone = $(phoneDom).val();
    var a = /^1[34578]\d{9}$/.test(phone);
    if (!a) {
      $(phoneDom).siblings('.errmsg').html('手机号码格式不正确');
      return;
    } else {
      request({
        url: SERVER + '/users/sms/',
        data: {
          phone_number: phone,
          type: type
        },
        type: 'POST'
      }).done(function (res) {
        stopsend(dom);
        dom.data('serialNumber', res.data.serial_number);
      });
    }
  }
  //手机绑定
  function phoneBind() {
    clearErrmsg();
    var number = $('#sendBindMsg').data('serialNumber');
    var config = inputCheck.smsCheck('#bindphoneNum', '#verifyCode');
    if (config) {
      request({
        url: SERVER + '/users/phone/binding/',
        data: {
          phone_number: config.phone,
          verify_code: config.code,
          serial_number: number,
          type: 6
        },
        type: 'POST'
      }).done(function (res) {
        console.log(res);
        $('#bindmsg').html(res.message);
      });
    }
  }
  //密码重置
  function resetPsd() {
    clearErrmsg();
    var number = $('#sendResetPsdMsg').data('serialNumber');
    var config = inputCheck.smsCheck('#resetPsdPhone', '#resetPsdverifyCode');
    var config2 = inputCheck.loginCheck('#resetPsdName', '#resetPsdCode');
    if (config && config2) {
      request({
        url: SERVER + '/users/password/',
        data: {
          username: config2.username,
          password: config2.psd,
          verify_code: config.code,
          serial_number: number,
          sms_type: 4
        },
        type: 'put'
      }).done(function (res) {
        console.log(1, res);
      });
    }
  }
  //登录注册找回密码，步骤切换
  function switchStep(source, target) {
    $(source).on('click', function () {
      $(target).addClass('on').siblings('div').removeClass('on');
    });
  }

  switchStep('#toRegister', '.chooseRole');
  switchStep('#tologin', '.loginForm');
  switchStep('.chooseRole label', '.userRegister');
  switchStep('#forgetpsd a', '.resetpsd');

  $('#loginbtn').on('click', function () {
    userlogin();
  });
  $('#nextstep').on('click', function () {
    userRegist();
  });
  $('#complete').on('click', function () {
    phoneBind();
  });
  $('#resetPsd').on('click', function () {
    resetPsd();
  });
  $('#sendBindMsg').on('click', function () {
    sendSMS('#bindphoneNum', 6, $(this));
  });
  $('#sendResetPsdMsg').on('click', function () {
    sendSMS('#resetPsdPhone', 4, $(this));
  });

  //登录时暂时没啥用的切换
  $('.loginForm>div').on('click', 'span', function () {
    $(this).addClass('on').siblings().removeClass('on');
  });

  //按钮置灰
  $('.form-item').on('keyup', 'input', function () {
    clearErrmsg();
    var father = $(this).parents('.form-item');
    var type = father.data('type');
    switch (type) {
      case 'loginForm':
        if (inputCheck['loginCheck']('#loginUserName', '#loginPsd')) {
          father.find('input:submit').addClass('prepared');
        } else {
          father.find('input:submit').removeClass('prepared');
        }
        break;
      case 'userRegister':
        if (inputCheck['regCheck']()) {
          father.find('input:submit').addClass('prepared');
        } else {
          father.find('input:submit').removeClass('prepared');
        }
        break;
      case 'bindPhone':
        if (inputCheck['smsCheck']('#bindphoneNum', '#verifyCode')) {
          father.find('input:submit').addClass('prepared');
        } else {
          father.find('input:submit').removeClass('prepared');
        }
        break;
      case 'resetpsd':
        if (inputCheck.smsCheck('#resetPsdPhone', '#resetPsdverifyCode') && inputCheck.loginCheck('#resetPsdName', '#resetPsdCode')) {
          father.find('input:submit').addClass('prepared');
        } else {
          father.find('input:submit').removeClass('prepared');
        }
        return;
    }
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

        // $(this).css({
        //   "transform": "translateY("+X/20+"px) " +"translateX("+Y/20+"px) "
        // });
      });
    });
    $(dom).mouseleave(function () {
      $(this).css({
        "transform": "rotateY(0deg) rotateX(0deg)"
      });
    });
  }
  shakeAnimation('.imgbox');
});
//# sourceMappingURL=login.js.map
