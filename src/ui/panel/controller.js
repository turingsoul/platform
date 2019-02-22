import angular from 'angular';
import $ from 'jquery';

"use strict";
class reportForms {
  constructor() {
    this.mainNode = document.createElement("div");
    this.image = document.createElement("div");
    this.tipsNode = document.createElement("div");
    this.title = document.createElement("span");
    this.time = document.createElement("span");
    this.cancel = document.createElement("i");
    this.imgurl = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAgAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAECAaQDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD3+iiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAEqhqmppp0Q43yt91f6mtCuO16Qvq0gJyEAUfTGf615+Y4mWHoc0d9gGS61fyvu88qM5AUYAq9p/iGUSiO8IdGOPMxgr/APWrBor5ilmGIhPm5mxnoY5papaS7SaXbswwdmPy4q7X2lOXPFS7iCiiirAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigCOWVIYmklYKi9STisp/ElmrkKszgfxBRg/mazfEV28l79mBIjiAJHqT3/Ksavncdm86dV06XQZ3FlqVtfKfJchxyUbgirlefQzSQTLLGxV1OQRXZ2+p2s0MbmeJXZQSpccH0rty/MViE1U0kvxEXqKarqwyrAj2NOr1LoAoorF1DX47WRoYE82QcMScAH+tZVsRToR5qjsgNqiuZh8TSh/30CFfVDgj86021yxW2WbzM7hwg+9n0I7VhSzDD1E2pbAadUrzVLWyBEkmX/uLya568166uiUhzCh7KfmP40tnoN1ckPN+5Q/3h8x/CuWeYzqvkwsbvv0Abd65d3ZKQ5iQ9An3j+NRjRb5rZpzFjHOw/eP4V09npttZD91Hlu7tyauVKyydb3sTO78tkB53yODVuwsJr+cJGCEB+ZyOFFdlJaW0r7pLeJ29WQE1KiLGoVFCqOgAwBWFLI0p3nK6GNhiWGFIk+6ihR9BUlFFe+kkrIQUUUUwCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKimuIbdd00qRj/aOM1FDqFncMFiuI2Y8Bc4P5Vm6kE+VvUC1RSe9Zd7r1ra5WM+dJ6L0H40qtanSjzTdkBqZA61lXuvWttlYz50nop4H41gz399qknljcQekcY4q/ZeHHbD3b7R/cXr+deXLHVsQ+XCx07sDGu7l7y6edwAz9QOnTFQ1276XZtaG38lVQ85HUH1z61lv4XUuSl0QvYMmT/OvNxGUYnm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hXVhepz4joFFFFdRzHqXg/8A5Faz/wCB/wDobVu1heD/APkVrP8A4H/6G1btebP4md8PhQUUUVJQUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAVNU/wCQTef9cH/9BNeN17TdQ/aLWaDOPMQpn0yMV41PBLbTvBMhSSM7WU9jXVhnuc9dbEdFFKqlmCqCSeAAOprqOY9X8L/8i1Y/7h/ma16z9FtXstFtLeQYkSMbh6HqR+ZrQrzJatnfHYK8+8f/APITtf8Arj/7Ma9Brh/H9nIxtb1VJjAMbkfw9x+fP5VpRdpomqrxOIooorvOI3/Bn/IzW/8Auv8A+gmvUK848DWck2sm62kRQIct2LHjH8zXo9cNf4zso/CFQ3f/AB5T/wDXNv5VNTJUEsLxk4DKV4rE1PE6KluLeW0uJLedCksZ2sp9air007o89qwV6p4S/wCRYsvo3/obV5WAWIABJPQAda9d0Czex0K0t5MiRUywPYk5I/WufEvRI2oLU0qKKK5DqOG+IX+t0/8A3ZP/AGWuJru/H9rLJBZ3KITFEXVyP4c4x/I1wld9B+4jjrL3grc8If8AI02f/A//AEBqw66TwTZyz68lyqnyrdWLN2yQQB+p/KnVfuMmmveR6XRRRXnncIeleI17dXi91azWV1JbzoUljO1hXThnqznr9CGiilAJIAHJ6AV1nMeo+D/+RWs/+B/+htW7WV4cs5LHQLS3mUrIFLMp7FiWx+tateZL4md8dkFFFFIoKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACqtzp9ndsHubSCZgMAyRhiB+Iq1RQFih/Ymk/8AQMsv+/C/4VJBplhbSCS3sbaKQcbo4lU/mBVuindisgooopDCmuquhR1DKQQQRkEU6igCh/Ymlf8AQMs/+/C/4Un9iaT/ANAyy/78L/hWhRTuxWRHFDFBEI4Y1jjXoqDAH0FSUUUhhRRRQBWuLCzu2DXNpBMRwDJGGx+dQ/2JpP8A0DLP/vwv+FX6KLsVkU4NMsLaUSQWNtFIOjxxKp/MCrlFFAWCiiigY1lDKVYAg8EHvVL+xNKP/MMsv+/C/wCFX6KLisUP7E0r/oGWX/fhf8KtQwxW8QihiSONeiooAH4CpaKLsLIKKKKBhVa5sLO8Km5tIJyvTzYw2PzqzRQBQ/sTSf8AoGWX/fhf8KfDpen28olgsbaKQdGSJVI/ECrlFO7FZBRRRSGFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAf/9k=';
  }

  init(node) {
    // $(this.image).attr({'background': 'url(' + ((node.img && node.img[0]) || this.imgurl) + ') no-repeat 0 0','background-size': ''/*,'height':200,'width':300*/});
    $(this.image).css({
      width: '100%',
      height: '100%',
      background: 'url(' +  ((node.img || this.imgurl) + '?_=' + +new Date()) + ')no-repeat 0 0',
      'background-size': 'contain'
    });
    $(this.mainNode).attr({
      'class': "reportNode"
    });
    $(this.tipsNode).attr({
      'class': "tips"
    });
    $(this.link).attr({
      'class': 'linkNode'
    })
    let lastDate = new Date(node.lastUse);
    let Y = lastDate.getFullYear() + '-';
    let M = (lastDate.getMonth() + 1 < 10 ? '0' + (lastDate.getMonth() + 1) : lastDate.getMonth() + 1) + '-';
    let D = (lastDate.getDate() < 10 ? '0' : '') + lastDate.getDate() + ' ';
    let h = (lastDate.getHours() < 10 ? '0' : '') + lastDate.getHours() + ':';
    let m = (lastDate.getMinutes() < 10 ? '0' : '') + lastDate.getMinutes();
    $(this.time).html(Y + M + D + h + m);
    $(this.title).html(node.title);
    $(this.cancel).html("×");
    $(this.cancel).attr("title", "取消收藏");
    $(this.tipsNode).append(this.title);
    $(this.tipsNode).append(this.time);
    $(this.mainNode).append(this.cancel);
    $(this.mainNode).append(this.tipsNode);
    $(this.mainNode).append(this.image);
    $(".reportReview").append(this.mainNode);
    $(this.cancel).data('data',node);
  }
}

const reportList = (dataRecent, pluginConfig, type, $state, $rootScope, $scope, tabHandleFactory, recentFactory) => {
  return dataRecent.map((s) => {
    let report = new reportForms();
    report.init(s);
    report.path = s.fullPath;
    let paramData = report.path;
    let pluginName = paramData.split('.');
    let node = {
      file: {
        path: s.fullPath,
        title: s.title,
        img: s.img
      }
    };
    angular.element(report.mainNode).on('click', () => {
      pluginConfig.map((d) => {
        if (d.name == "." + pluginName[pluginName.length - 1] || pluginName[pluginName.length - 1] == "pdf" || pluginName[pluginName.length - 1] == "html") {
          tabHandleFactory.handle({
            tab: 'detailReport',
            pluginName: pluginName[1],
            pluginPath: pluginName[0],
            pathParam: '',
            name: pluginName[0].split('/').pop(),
            paramData: paramData
          });
          // $state.go('detailReport', {pluginName:pluginName[1],pluginPath:pluginName[0]});
          $rootScope.d = {
            pluginName: pluginName[1],
            pluginPath: pluginName[0],
            pathParam: pluginName[1] + ".edit"
          }
          //最近浏览打开时不再添加到最近浏览
          // recentFactory.handleRecentRecord(node);
        }
      })
    });
    angular.element(report.cancel).on('click', (e) => {
      e.stopPropagation();
      if (type === "favorites") {
        $scope.favorites($(e.target).data('data'), e.target.parentNode);
      } else {
        $scope.recent(/*s.title*/$(e.target).data('data'), e.target.parentNode);
      }
    });
    return report;
  })
};
export default reportList