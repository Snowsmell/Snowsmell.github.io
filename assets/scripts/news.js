'use strict';

$(function () {
  //请求到的信息列表

  function getnews() {
    $.ajax({
      url: 'http://test.oms.hwariot.com/api/v1/news/?page_size=4',
      type: 'GET',
      dataType: "json",
      data: {}
    }).done(function (res) {
      console.log(res);
      if (res.count > 0) {
        var page = '';
        res.results.forEach(function (v, i) {
          var a = v.summary.length > 40 ? "..." : "";
          page += '\n          <li>\n            <a href="/newsdetail.html?id=' + v.id + '">\n              <div class="imgbox">\n                <img src="' + v.image_url + '" alt="">\n              </div>\n              <div class="text">\n                <h3>' + v.title + '</h3>\n                <p>' + (v.summary.substr(0, 40) + a) + '</p>\n                <span>' + v.created_time + '</span>\n              </div>\n            </a>\n          </li>';
        });
        $('#news-list').html(page);
      }
    });
  }
  getnews();
  // 暂时方便用的
  // var context = ''
  // var newsItem =
  //   `     
  //   <li>
  //     <a href="/newsdetail.html">
  //       <div class="imgbox">
  //         <img src="/assets/images/news/news1.jpg" alt="">
  //       </div>
  //       <div class="text">
  //         <h3>华瑞物联APP1.0成功上线</h3>
  //         <p>中小微企业为中国经济发展做出了巨大贡献，由由于种种原因，中小微企业...</p>
  //         <span>2018-02-06  12：34</span>
  //       </div>
  //     </a>
  //   </li>
  // `
  // for (let i = 0; i < 9; i++) {
  //   context += newsItem
  // }
  // $('#news-list').html(context)
});
//# sourceMappingURL=news.js.map
