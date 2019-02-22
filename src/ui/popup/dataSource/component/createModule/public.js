
import angular from 'angular';
import { clearTimeout } from 'timers';
import $ from 'jquery';


export function closePopup() {
  var all = document.querySelectorAll(".createModel");
  for (var i = 0; i < all.length; i++) {
    all[i].classList.add("hide");
  }
  document.querySelector(".popup").style.display = "none";
  document.querySelector('.popup create-module').classList.add('popupHide');
  document.querySelector(".createModel1").classList.remove("hide");
}
export function closeAlert() {
  var all = document.querySelectorAll(".alert");
  for (var i = 0; i < all.length; i++) {
    all[i].classList.add("hide");
  }
}
var popTips = false;
var tipsTimer;
export function tips(e) {
  var tips = '<div class="myTips">' + e + '</div>';
  if (!popTips) {
    angular.element(document.querySelector("body")).append(tips);
    tipsTimer = setTimeout(function () {
      angular.element(document.querySelector(".myTips")).remove();
      popTips = false;
    }, 2000);
  }else {
    clearTimeout(tipsTimer);
    angular.element(document.querySelector(".myTips")).remove();
    angular.element(document.querySelector("body")).append(tips);
    tipsTimer = setTimeout(function () {
      angular.element(document.querySelector(".myTips")).remove();
      popTips = false;
    }, 2000);
  }
}


export function init1() {
  document.querySelector(".model-name input").value = "";
  document.querySelector(".model-name input").classList.remove("tipsRed");
  //document.querySelectorAll(".model-connect option")[0].setAttribute("selected","selected");
  document.querySelector(".model-connect select").value = "0";
  document.querySelector(".model-type").classList.remove("hide");
  document.querySelector(".modelExist").classList.add("hide");
}
export function init2() {
  var allInput = document.querySelectorAll(".args input");
  for (var i = 0; i < allInput.length; i++) {
    angular.element(allInput[i]).parent().find("p").addClass("warning");
    allInput[i].classList.remove("tipsRed");
    allInput[i].value = "";
  }
}
export function init3() {
    var all1 = document.querySelectorAll(".rSheet option");
    //将rSheet表清空,不这么做，会出现问题
    document.querySelector(".rSheet").innerHTML = "";
    document.querySelector(".factSheet").value = '';
    var all2 = document.querySelectorAll(".factSheet option");
    for (var i = 0; i < all1.length; i++) {
        $(all1[i]).hide();
        $(all2[i + 1]).hide();
        // all1[i].style.display = "none";
        // all2[i + 1].style.display = "none";
    }
  document.querySelector(".sheet-right .warning-info").classList.add("warning");
  document.querySelector(".setType select").value = "0";
  document.querySelector(".sheet-body").classList.remove("hide");
  document.querySelector(".SQL-body").classList.add("hide");
  document.querySelector(".queryNext").classList.remove("hide");
  document.querySelector(".queryComplete").classList.add("hide");
}
export function complete() {
  init1();
  init2();
  init3();
  document.querySelector(".modelQuery").classList.add("hide");
  document.querySelector(".sheetRelation").classList.add("hide");
  document.querySelector(".popup").style.display = "none";
  document.querySelector(".createModel1").classList.remove("hide");

}
export function fileInit() {
    $(".file-path").html("");
    $(".file-hide input[type=file]").val("");
    $(".section1-right option").eq(0).attr("selected","selected");
    $(".file-separator input").eq(0).attr("checked",true);
    $(".file-identifier input").eq(0).attr("checked",true);
    $(".file-separator input[type=text]").attr("disabled","disabled");
    $(".file-separator input[type=text]").val("");
    $(".data-list tr").addClass("hide");
}

function _loading(statu){
    let $loading = $("#xdt-global-loading");
    if (!$loading.length) {
        $loading = $(
            "<div id='xdt-global-loading' class='xdt-global-loading__wrap'>\
                <div class='xdt-global-loading'>\
                    <div class='xdt-global-loading__square'></div>\
                    <div class='xdt-global-loading__square'></div>\
                    <div class='xdt-global-loading__square'></div>\
                    <div class='xdt-global-loading__square'></div>\
                    <div class='xdt-global-loading__square'></div>\
                    <div class='xdt-global-loading__square'></div>\
                    <div class='xdt-global-loading__square'></div>\
                </div>\
            </div>"
        );
        $loading.appendTo("body");
    }
    $loading.css("display", statu ? "block" : "none");
}

export function loading() {
    _loading(true);
}

export function closeLoading() {
    _loading(false);
}


