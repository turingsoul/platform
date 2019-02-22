import angular from 'angular';
import 'angular-ui-router';
import 'angular-route';
import $ from 'jquery';

import '../style/panel.css';
import '../style/taskPlan.css';
import '../utils/file_tree/file-tree';

import '../../lib/js/jquery-ui.min.js';
import '../style/jquery-ui.min.css';
import '../style/jquery-ui.theme.min.css';
import '../style/taskPlan.css';
import '../style/welcome.css';
import {tips} from '../popup/dataSource/component/createModule/public';

import './detailReport/detailReport';
import './fileManagement/fileManagement';
import './queryManagement/queryManagement';
import './searchResult/searchResult';
import './taskPlan/taskPlan';
import './collection/collection';
import './newAdhoc/newAdhoc';
import './newDashboard/newDashboard';
import './newOlap/newOlap';
import './operateEdit/operateEdit';
import './recentReview/recentReview';
import './newPortal/newPortal';
import './userManger/userManager';
import './userManger/userTree/userTree';
Object.defineProperty(Array.prototype, "includes", {
  value: function(item){
      return this.indexOf(item) === -1 ? false : true;
    },
  enumerable: false
});
String.prototype.includes || (String.prototype.includes = function(item){
return this.indexOf(item) === -1 ? false : true;
});
{
    "use strict";
    angular.module('xdt/panel', ['ui.router', 'xdt/folder',
    'xdt/detailReport','xdt/fileManagement','xdt/queryManagement','xdt/searchResult','xdt/taskPlan', 'xdt/collection','xdt/newAdhoc','xdt/newDashboard','xdt/newOlap','xdt/operateEdit','xdt/recentReview','xdt/newPortal','xdt/userManager','xdt/userTree'])
        .config(['$stateProvider', '$urlRouterProvider', '$locationProvider',($stateProvider, $urlRouterProvider, $locationProvider)=> {
            $stateProvider
                .state("index", {
                  url: '/home',
                  template: '<div></div>',
                  controller: ['$state', '$scope', '$rootScope', 'pageFactory', '$http', 'tabHandleFactory', ($state, $scope, $rootScope, pageFactory, $http, tabHandleFactory) => {
                    var timeStamp = Date.parse(new Date());
                    //清空$rootScope.projectArr
                    $rootScope.projectArr = [];
                    if (window.location.href.split("/").pop() != "Login") {
                      $http({
                        method: 'get',
                        headers: {
                          Accept: "application/json"
                        },
                        url: "/xdatainsight/api/user-settings/home-path?t=" + timeStamp,
                        dataType: 'json'
                      }).success((data) => {
                        if (!data["home-path"] || $rootScope.ifheadhide) {
                          // $scope.$emit('ifHome',0);
                          $rootScope.welcomePopPageCtrl = true;
                          window.location.hash = '#welcome'
                          return;
                        }
                        // data["home-path"] = '/public/测试仪表盘保存2017-09-07_163136.wcdf';
                        var pluginPathArr1 = data["home-path"].split('.');
                        $rootScope.welcomePopPageCtrl = false;
                        $scope.homeIndex = data["home-path"];
                        var homeIndex = $scope.homeIndex,pluginPathArr=[];
                        homeIndex = homeIndex.split(".");
                        let len = homeIndex.length,
                            ppa = homeIndex.splice(len - 1,1);
                        pluginPathArr.push(homeIndex.join('.'),ppa[0]);
                        let homeParams = {
                          pluginName: pluginPathArr[1],
                          pluginPath: pluginPathArr[0]
                        };
                        // $rootScope.pluginName = homeParams.pluginName;
                        // $rootScope.pluginPath = homeParams.pluginPath;
                        $scope.$emit('fileWindowPath', homeParams);
                        $scope.$emit('ifHome', 1);
                        let homePath = $scope.homeIndex;
                        //var suffix2 = $scope.homeIndex.substring(0,$scope.homeIndex.lastIndexOf("."));
                        var dataUrl;
                        var suffix = $scope.homeIndex.substring($scope.homeIndex.lastIndexOf(".") + 1, $scope.homeIndex.length);
                        switch (suffix) {
                          case "html":
                            dataUrl = "content";
                            break;
                          case "xwaqr":
                            dataUrl = "generatedContent";
                            break;
                          case "prpt":
                            dataUrl = "viewer";
                            break;
                          case "saiku":
                            dataUrl = "run";
                            break;
                          case "wcdf":
                            dataUrl = "generatedContent";
                            break;
                          default:
                            dataUrl = "generatedContent";
                            break;
                        }
                        let dataPath = encodeURI((homePath).replace(/:/g, "\t").replace(/\//g, ":"));
                        //$state.go('detailReport', {pluginName:suffix1,pluginPath:suffix2});
                        // $("iframe.homeReport").attr("src", "/xdatainsight/api/repos/" + dataPath + "/" + dataUrl);
                        pageFactory.getWindowHeight();
                        $scope.dataUrl = dataUrl;

                        // if (suffix === 'xdf') {
                          $rootScope.homeIframeUrl = "/xdatainsight/api/repos/" + dataPath + "/" + dataUrl;
                        /*} else {
                          $rootScope.homeIframeUrl = `dashboard-v3/index.html#path=${homePath.replace(/\.xdf$/,'')}&type=0`
                        }*/
                        tabHandleFactory.handle({
                          tab: 'detailReport',
                          pluginName: pluginPathArr[1],
                          pluginPath: pluginPathArr[0],
                          pathParam: '',
                          name: pluginPathArr[0].replace(/^\/.*\//, ''),
                          paramData: data["home-path"]
                        });
                      }).error((data) => {});
                    }
                  }]
                })
                .state("welcome", {
                    url: "/welcome",
                    template: require("./welcome.html"),
                    controller: 'welcome'
                })
                .state("tabs", {
                    url: "/tabs",
                    template: require("./tabs.html"),
                    controller: 'tabsController',
                    onEnter: ['$rootScope',function($rootScope) {
                      return $rootScope.tabparam ? true : false;
                    }],
                    onExit: ['$rootScope',function ($rootScope) {
                      $rootScope.projectArr = [];
                      $rootScope.doulbleArrow = false;
                      $rootScope.tabs = [];
                      $rootScope.tabCreated = false;
                      $rootScope.tabparam = null;
                      $('#xdt-navBar .alert1').hide();
                      $rootScope.tabindex = undefined;
                      location.hash = "#/welcome";
                    }]
  
                })
                .state("recentReview", {
                    url: "/recentReview",
                    template: "<div class='reportReview'></div>",
                    controller: 'recentReviewCont',
                    onExit: ['$rootScope',function ($rootScope) {
                      document.querySelector('.lastest').style.backgroundPositionX = '0px';
                      document.querySelector('.lastest').style.backgroundPositionY = '-67px';
                    }]
                })
                .state("collection", {
                    url: "/collection",
                    template: "<div class='reportReview'></div>",
                    controller: 'collectionCont',
                    onExit: ['$rootScope',function ($rootScope) {
                      document.querySelector('.navbar .collection1').style.backgroundPositionX = '0px';
                      document.querySelector('.navbar .collection1').style.backgroundPositionY = '-109px';
                    }]
                })
                .state("searchResult", {
                    url: "/searchResult",
                    template: require('./searchResult/searchResult.html'),
                    controller: 'searchResult'
                })

        }])
        .provider("taskplanProvider", function () {
            this.$get = ['$http', '$q',($http, $q)=> {
                return {
                    callItunes(_finalUrl){
                        let deferred = $q.defer();
                        $http({
                            method: 'get',
                            headers: {contentType: "application/json; charset=utf-8"},
                            url: _finalUrl,
                            dataType: 'json',
                            data: ''
                        }).success((data)=> {
                            deferred.resolve(data);
                        }).error(()=> {
                            deferred.reject('There was an error')
                        });
                        return deferred.promise;
                    }
                }
            }]
        })
        .filter('runTime', function () {
            return function (input) {
                if (input) {
                    return input.split("T")[0] + " " + input.split("T")[1].split("+")[0];
                } else {
                    return "-";
                }
            }
        })
        .filter('path', function () {
            return function (_input, param) {
                var input = _input && _input.find(e=>e.name=='ActionAdapterQuartzJob-StreamProvider');
                input = input && input.value;
                if (input) {
                    if (input.split(".")[1]) {
                        return param == "fileSource" ? input.split(".")[0].split("=")[1] : input.split(".")[1].split("=")[1].substring(0, input.split(".")[1].split("=")[1].lastIndexOf("\/"));
                    } else {
                        return "-";
                    }
                }
            }
        })
        .filter('repeatDetail', function () {
            var months = ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"];
            var weeks = ["星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
            var nums = ["第一", "第二", "第三", "第四", "最后"];

            function startTime(e) {
                return " at " + e.split("T")[1].split("+")[0];
            }

            function week(e) {
                var data = "";
                for (var i = 0; i < e.length; i++) {
                    data += weeks[e[i] - 1] + " ";
                }
                return data;
            }

            function monthWeek(e) {
                var arg1 = e.split("*")[1].split("#")[0];
                var arg2 = e.split("*")[1].split("#")[1];
                return nums[arg2 - 1] + weeks[arg1 - 1];
            }

            function monthsWeek(e) {
                if(!e) return "-";
                var month = e.split("?")[1].split(" ")[1];
                var week = e.split("?")[1].split(" ")[2].split("#")[0];
                var num = e.split("?")[1].split(" ")[2].split("#")[1];
                return months[month - 1] + " " + nums[num - 1] + "个" + weeks[week - 1];
            }

            return function (input) {
                switch (input.uiPassParam) {
                    case "RUN_ONCE":
                        return "只运行一次";
                        break;
                    case "SECONDS":
                        return "每隔" + input.repeatInterval + "秒钟" + startTime(input.startTime);
                        break;
                    case "MINUTES":
                        return "每隔" + input.repeatInterval / 60 + "分钟" + startTime(input.startTime);
                        break;
                    case "HOURS":
                        return "每隔" + input.repeatInterval / 3600 + "小时" + startTime(input.startTime);
                        break;
                    case "DAILY":
                        return input.repeatInterval ? "每隔" + input.repeatInterval / 86400 + "天" + startTime(input.startTime) : "每个工作日" + startTime(input.startTime);
                        break;
                    case "WEEKLY":
                        return week(input.dayOfWeekRecurrences.recurrenceList.values) + startTime(input.startTime);
                        break;
                    case "MONTHLY":
                        return input.dayOfWeekRecurrences ? "每月" + monthWeek(input.cronString) + startTime(input.startTime) : "每月" + input.dayOfMonthRecurrences.recurrenceList.values[0] + "号" + startTime(input.startTime);
                        break;
                    case "YEARLY":
                        return input.dayOfMonthRecurrences ? "每年" + input.monthlyRecurrences.recurrenceList.values[0] + "月" + input.dayOfMonthRecurrences.recurrenceList.values[0] + "号" + startTime(input.startTime) : monthsWeek(input.cronString) + startTime(input.startTime);
                        break;
                }
            }
        })
        .filter('psState', function () {
            return function (input) {
                return input == "PAUSED" ? "恢复" : "暂停";
            }
        })
        .filter('suffixName', function () {
            return function (input) {
                if (input == "undefined 文件") {
                    return "文件夹";
                }
                if (input.lastIndexOf(".") > 0) {
                    return input.substring(0, input.lastIndexOf("."));
                } else {
                    return input;
                }
            }
        })
        .controller('welcome', ['$scope', '$state', 'panelFactory', '$http', '$rootScope', 'pageService', 'taskplanProvider','popupFactory','$timeout', 'tabHandleFactory', '$q',
                                ($scope, $state, panelFactory, $http, $rootScope, pageService, taskplanProvider,popupFactory,$timeout, tabHandleFactory, $q)=> {
            $rootScope.$emit("yhnIfhide");
            var deffer = $q.defer();
            /*$rootScope.$on("yhnIfhide",function(){
                $http.get("/xdatainsight/api/repo/files/:public:sample/tree?showHidden="+($rootScope.ifhide?true:false)+"&filter=*.wcdf|*.xdf|FILES&_="+new Date().getTime())
                    .success(function(response1){
                        $rootScope.caseList = $.extend(true,{},{aa: panelFactory.getFirstFiveCase(response1)}).aa;
                        $rootScope.caseList.forEach(e=>{
                            e._image = 'grey url(/xdatainsight/api/repos/' + e.file.path.replace(/\//g,':') + '/thumbnail)  0px 0px / 100% no-repeat';
                        });
                    })
                    .error(function () {
                        $http.get("/xdatainsight/api/repo/files/:public/tree?showHidden="+($rootScope.ifhide?true:false)+"&filter=*.wcdf|*.xdf|FILES&_="+new Date().getTime())
                            .success(function(response2){
                                $rootScope.caseList = $.extend(true,{},{aa: panelFactory.getFirstFiveCase(response2)}).aa;
                                $rootScope.caseList.forEach(e=>{
                                    e._image = 'grey url(/xdatainsight/api/repos/' + e.file.path.replace(/\//g,':') + '/thumbnail)  0px 0px / 100% no-repeat';
                                });
                                console.log('$scope.caseList',$rootScope.caseList);
                            })
                            .error(function (response2) {
                                console.log("暂无数据");
                            })
                    })
            })*/
            $rootScope.queryyhnIfhideObj = $rootScope.queryyhnIfhideObj || queryyhnIfhide();
            $rootScope.queryyhnIfhideObj.then((response)=>{
                $rootScope.caseList = $.extend(true,{},{aa: panelFactory.getFirstFiveCase(response)}).aa;
                $rootScope.caseList.forEach(e=>{
                    e._image = 'url(/xdatainsight/api/repos/' + e.file.path.replace(/\//g,':') + '/thumbnail)  0px 0px / 100% no-repeat';
                    let time = new Date(+e.file.createdDate);
                    let Y = time.getFullYear(),
                        M = time.getMonth() + 1,
                        D = time.getDate(),
                        H = time.getHours(),
                        m = time.getMinutes();
                        e._time = Y + '-' + 
                              (M < 10 ? '0' + M : M) + '-' +
                              (D < 10 ? '0' + D : D) + ' ' +
                              (H < 10 ? '0' + H : H) + ':' +
                              (m < 10 ? '0' + m : m);
                });

            });
            //查询请求封装  只进行一次查询
            function queryyhnIfhide(){
                $http.get("/xdatainsight/api/repo/files/:public:sample/tree?showHidden="+($rootScope.ifhide?true:false)+"&filter=*.wcdf|*.xdf|FILES&_="+new Date().getTime())
                    .success(function(response1){
                        deffer.resolve(response1);
                    })
                    .error(function () {
                        $http.get("/xdatainsight/api/repo/files/:public/tree?showHidden="+($rootScope.ifhide?true:false)+"&filter=*.wcdf|*.xdf|FILES&_="+new Date().getTime())
                            .success(function(response2){
                                deffer.resolve(response2);
                            })
                            .error(function (response2) {
                                deffer.resolve({});
                            })
                    });
                return deffer.promise;
            }
            $scope.reportOpen = (node)=> {
                $rootScope.$emit("editor", node);
                panelFactory.reportOpen(node, $state);
            };

            //获取欢迎页面下方展示案例
            /*$scope.caseList = ['111','222','333'];*/

            // 给下列tab添加参数用并重置
            $rootScope.tabindex = {
              newOlap: 0,
              newAdhoc: 0,
              newDashboard: 0,
              newPortal:0
             };
            //仪表盘
            $scope.openDashboard = function(){
                $rootScope.projectArr = [];
                $rootScope.tabCreated = undefined;
                if($scope.getReport() == true && $scope.getXdf() === true){
                    // window.location.href = "#newDashboard";
                    var type = "newDashboard";
                    ++$rootScope.tabindex[type]
                    tabHandleFactory.handle({
                      tab:type, 
                      pluginName: $rootScope.tabindex[type], 
                      pluginPath: '', 
                      pathParam:'',
                      name: {newOlap:'新建多维分析', newDashboard:'新建仪表盘',newPortal:'新建数据门户',newAdhoc:'newAdhoc'}[type] + '_' + $rootScope.tabindex[type],
                      paramData: {newOlap:'新建多维分析', newDashboard:'新建仪表盘',newPortal:'新建数据门户',newAdhoc:'newAdhoc'}[type] + '_' + $rootScope.tabindex[type]
                    });
                }else{
                    // tips("需分析报表权限");
                }
            }
            //多维分析
            $scope.openNewOlap = function(){
                $rootScope.projectArr = [];
                if($scope.getReport() == true && $scope.getSaiku() === true){
                    // window.location.href = "#newOlap";
                    var type = "newOlap";
                    ++$rootScope.tabindex[type]
                    tabHandleFactory.handle({
                      tab:type, 
                      pluginName: $rootScope.tabindex[type], 
                      pluginPath: '', 
                      pathParam:'',
                      name: {newOlap:'新建多维分析', newDashboard:'新建仪表盘',newPortal:'新建数据门户',newAdhoc:'newAdhoc'}[type] + '_' + $rootScope.tabindex[type],
                      paramData: {newOlap:'新建多维分析', newDashboard:'新建仪表盘',newPortal:'新建数据门户',newAdhoc:'newAdhoc'}[type] + '_' + $rootScope.tabindex[type]
                    });
                }else{
                    // tips("需分析报表权限");
                }
            }
            //数据门户
            $scope.openPortal = function(){
                $rootScope.projectArr = [];
                $rootScope.tabCreated = undefined;
                if($scope.getReport() == true && $scope.getXdp() === true){
                    var type = "newPortal";
                    ++$rootScope.tabindex[type]
                    tabHandleFactory.handle({
                      tab:type, 
                      pluginName: $rootScope.tabindex[type], 
                      pluginPath: '', 
                      pathParam:'',
                      name: {newOlap:'新建多维分析', newDashboard:'新建仪表盘',newPortal:'新建数据门户',newAdhoc:'newAdhoc'}[type] + '_' + $rootScope.tabindex[type],
                      paramData: {newOlap:'新建多维分析', newDashboard:'新建仪表盘',newPortal:'新建数据门户',newAdhoc:'newAdhoc'}[type] + '_' + $rootScope.tabindex[type]
                    });
                }else{
                    // tips("需分析报表权限");
                }
            }
            //导入数据
            $scope.leadingData = function(){
                if($scope.getManageData() == true){
                    $rootScope.$emit("Jdbc", 1);
                    document.querySelector('.popup').style.display="block";
                    $('.advancedSettingBox').hide();
                    document.querySelector('.popup create-module').classList.remove('popupHide');
                }else{
                    // tips("需管理数据源权限");
                }
            }
            //链接数据库
            $scope.creatLink = function(){
                if($scope.getManageData() == true){
                    $rootScope.$emit("dataBaseType",1);
                    document.querySelector('.popup').style.display="block";
                    $('.advancedSettingBox').hide();
                    document.querySelector('.popup create-connect').classList.remove('popupHide');
                }else{
                    // tips("需管理数据源权限");
                }
            }
            //创建业务关系
            $scope.createRelation = function(){
                if($scope.getManageData() == true){
                    $rootScope.$emit("Jdbc", 1);
                    document.querySelector('.popup').style.display="block";
                    $('.advancedSettingBox').hide();
                    document.querySelector('.popup create-module').classList.remove('popupHide');
                }else{
                    // tips("需管理数据源权限");
                }
            }
            //快速建模
            $scope.quickModule = function(){
                if($scope.getManageData() == true){
                    document.querySelector('.popup').style.display="block";
                    $('.advancedSettingBox').hide();
                    document.querySelector('.popup exist-data').classList.remove('popupHide');
                    $rootScope.$broadcast("dataBaseType");
                    $rootScope.$broadcast("updata",1);
                    $scope.$emit('loading',true);//显示过渡条
                    $rootScope.globalLoading(false); //隐藏过渡条
                    $scope.$on('showExistData', (data)=> {
                        popupFactory.popupName(data);
                    })
                }else{
                    // tips("需管理数据源权限");
                }
            }
            // $scope._timer = $scope._timer || null;
            // $rootScope.$on('loading',function(){
            //     $scope.$emit('loading',true);//显示过渡条
            // });
            $rootScope.$on('showExistData',function(){
                $scope.$on('showExistData', ()=> {
                    popupFactory.popupName(data);
                });
            });
            /*window.addEventListener("message", dat => {
                var data = dat.data;
                try{
                    data = JSON.parse(data);
                    if(data.sqlEdit){
                        clearTimeout($scope._timer);
                        $scope._timer = setTimeout(function(){
                            $rootScope.$broadcast("dataBaseType");
                            $rootScope.$broadcast("updata",1);
                            $scope.$emit('loading',true);//显示过渡条
                            document.querySelector('.popup').style.display="block";
                            $scope.$on('showExistData', ()=> {
                                popupFactory.popupName(data);
                            });
                            $rootScope.$emit("_sqlEdit", data.sqlEdit);
                        },300);
                    }
                }catch(e){

                }
                
            }, false);*/
            // $rootScope.firstWelcomeInfo = $rootScope.firstWelcomeInfo === undefined ? true : false;
            $scope.welcomePopPageCtrl = $rootScope.welcomePopPageCtrl;
            $rootScope.welcomeCount = $rootScope.welcomeCount ? $rootScope.welcomeCount : 0;
            $rootScope.welcomeCount ++;
            if($rootScope.welcomeCount == 1 && !$rootScope.adminUserName){
              $scope.welcomePopPageCtrl = false
            }
            $rootScope.welcomeCount > 1 && ($scope.welcomePopPageCtrl = false);
            //关闭悬浮框控制
            $scope.closeIknow = function(){
                $scope.welcomePopPageCtrl = false;
            }
            //弹出悬浮框
            $scope.openIknow = function(){
                $scope.welcomePopPageCtrl = true;
            }
            //获取当前数据源权限功能
            $scope.getManageData = function(){
                var tag = $(".menu li.dataSourceList").hasClass("ng-hide");
                if(tag != true&&tag != "true"){
                    return true;
                }else{
                    return false;
                }
            }
            //获取分析与报表权限功能
            $scope.getReport = function(){
                var tag = $(".menu li.newPulgin").hasClass("ng-hide");
                if(tag != true&&tag != "true"){
                    return true;
                }else{
                    return false;
                }
            }

            //获取多维分析功能
            $scope.getXdf = function(){
                return !$('.menu li.newPulgin .xdf').is('.alt');
            }

            //获取仪表盘功能
            $scope.getSaiku = function(){
                return !$('.menu li.newPulgin .saiku').is('.alt');
            }

            //获取仪表盘功能
            $scope.getXdp = function(){
                return !$('.menu li.newPulgin .xdp').is('.alt');
            }

            //处理置灰
            //获取权限处理置灰
            $timeout(function(){
                if(!$scope.getManageData()){
                    document.querySelector(".clickGrid .welcomeCtrol1").style.opacity = "0.5";
                    document.querySelector(".clickGrid .welcomeCtrol2").style.opacity = "0.5";
                    $(".clickGrid .welcomeCtrol1").removeClass("contrlHover");
                    $(".clickGrid .welcomeCtrol2").removeClass("contrlHover");
                }

                if(!$scope.getReport()){
                    document.querySelector(".clickGrid .welcomeCtrol3").style.opacity = "0.5";
                    document.querySelector(".clickGrid .welcomeCtrol4").style.opacity = "0.5";
                     document.querySelector(".clickGrid .welcomeCtrol5").style.opacity = "0.5";
                    $(".clickGrid .welcomeCtrol5").removeClass("contrlHover");
                    $(".clickGrid .welcomeCtrol3").removeClass("contrlHover");
                    $(".clickGrid .welcomeCtrol4").removeClass("contrlHover");
                }

                if(!$scope.getXdf()){
                    document.querySelector(".clickGrid .welcomeCtrol4").style.opacity = "0.5";
                    $(".clickGrid .welcomeCtrol4").removeClass("contrlHover");
                }

                if(!$scope.getSaiku()){
                    document.querySelector(".clickGrid .welcomeCtrol3").style.opacity = "0.5";
                    $(".clickGrid .welcomeCtrol3").removeClass("contrlHover");
                }

                if(!$scope.getXdp()){
                    document.querySelector(".clickGrid .welcomeCtrol5").style.opacity = "0.5";
                    $(".clickGrid .welcomeCtrol5").removeClass("contrlHover");
                }
            },300);


        }])
        .controller('tabsController', ['$rootScope', '$scope', 'tabsFactory',($rootScope, $scope, tabsFactory) => {
          let handler = tabsFactory.handler;
          $rootScope.tabCreated = true;
          handler('add', $rootScope.tabparam || {}, $scope);
        
          $rootScope.$on('tabChange', (e, eventData) => {
            const {action, data} = eventData;
            handler(action, data, $scope);
          });
        }])
        .factory('tabsFactory', ['$rootScope', '$state', ($rootScope, $state) => {
          let service={}; 
          service.handler = (action, $stateParams, $scope) => {
            if(!$stateParams) return false;
            //actoin || new add switch delete
            $rootScope.tabs = $rootScope.tabs || [];

            //collection,filemanagement,recentReview,searchResult,taskplan  只能新开一个
            //newDashboard, newOlap,newAdhoc 可以开多个
            const onlyOneTabs = ['collection','fileManagement','queryManagement','searchResult','taskPlan'];
            const multiTabs = ['newDashboard', 'newOlap','newAdhoc','newPortal'];
            const tab = $stateParams.tab;
            let onlyOne = false;
            var selfPro = $rootScope.projectArr.filter(e=>e.active)[0];
            //设置激活浏览器标题
            selfPro && (document.title = selfPro.name + ' - xDataInsight');
            switch(action) {
              case 'delete': 
                if((Array.isArray($stateParams) && $stateParams.length == 0) || $rootScope.projectArr.length === 0) {
                  $rootScope.tabs = [];
                  $rootScope.tabCreated = false;
                  $state.go('welcome',{});
                }
                else {
                  $rootScope.tabs = $rootScope.tabs.filter(tabcf => {
                    if(JSON.stringify(tabcf.data) != JSON.stringify($stateParams)) return true;
                  })
                }
              break;
              case 'switch': 
                $rootScope.tabs.forEach(tabcf => {
                  tabcf.state  = JSON.stringify(tabcf.data) == JSON.stringify($stateParams) ?  !0 : !1;
                });
              break;
              case 'add': 
                $rootScope.tabs.forEach(tabcf => tabcf.state = false);
                var projectNameArr = ["saiku", "wcdf", "adhoc", "html", "prpt", "pdf", "xwaqr",'xdf','xdp'];//可展示文件操作的文件类型
                $rootScope.isHandleShow = (projectNameArr.includes($stateParams.pluginName) && !$stateParams.name.includes('编辑')) ? true : false;
                $rootScope.selfWcdf = $stateParams.pluginName === 'xdf' ? true : false;
                $rootScope.selfXdp = $stateParams.pluginName === 'xdp' ? true : false;
                $rootScope.selfSaiku = $stateParams.pluginName === 'saiku' ? true : false;//根据是否是多维分析展示多余操作
                //检查是否有已经打开的
                $rootScope.tabs.forEach(tabcf => {
                  //只能开一个
                  if(onlyOneTabs.includes(tabcf.type)) {
                    if(tabcf.type == tab) {
                      onlyOne = true;
                      //打开已经渲染的
                      tabcf.state = true;
                      return false;
                    }
                  }
                  else {
                    if(JSON.stringify(tabcf.data) == JSON.stringify($stateParams)) {
                      onlyOne = true;
                      //打开已经渲染的
                      tabcf.state = true;
                      return false;
                    }
                  }
                  
                });
                //新开
              if(!onlyOne) {
                $rootScope.tabs.push({
                  state: true,
                  type: tab,
                  data: $stateParams
                });
              }
              break;
              default:
            }
            $scope.tabs = $rootScope.tabs;
          }

          return service;
        }])
        .factory('panelFactory', ['$http', '$q', '$rootScope', 'tabHandleFactory','recentFactory',($http, $q, $rootScope, tabHandleFactory,recentFactory)=> {
            let service = {};
            service.getFirstFiveCase = (inputNode)=> {
                var firstFive = [];
                var flagIndex = 0;
                function yhnCallBackChildren(node){
                    if(flagIndex<5){
                        if(node.hasOwnProperty("file")){
                            if(node.file.folder == "false" && /^(wcdf|xdf)$/.test(node.file.path.split(".")[1])/*=="wcdf"*/){
                                firstFive.push(node);
                                flagIndex++;
                                if(flagIndex>=5){
                                    return firstFive;
                                }
                            }
                        }
                        if(node.hasOwnProperty("children")){
                            for(var i=0;i<node.children.length;i++){
                                yhnCallBackChildren(node.children[i]);
                            }
                        }
                    }else{
                    }
                }
                yhnCallBackChildren(inputNode);
                return firstFive;
            }
            service.downloadFile = (node)=> {
                let filePath = encodeURI((node.file.path).replace(/:/g, "\t").replace(/\//g, ":"))
                var elemIF = document.createElement("iframe");
                elemIF.src = "/xdatainsight/api/repo/files/" + filePath + "/download?withManifest=true";
                elemIF.style.display = "none";
                document.body.appendChild(elemIF);
            };
            service.newWindowOpen = (obj)=> {
                recentFactory.handleRecentRecord(obj);
                let dataRUN = obj.file.cmdMap ? obj.file.cmdMap.RUN : "content";

                let dataPath = encodeURI((obj.file.path).replace(/:/g, "\t").replace(/\//g, ":"));
                let dataUrl = dataRUN ? dataRUN : "generatedContent";
                var pdf = obj.file.path.substring(obj.file.path.lastIndexOf(".") + 1, obj.file.path.length);
                if (pdf === "pdf") {
                    window.open("/xdatainsight/api/repos/" + obj.file.path.replace(/\//g, "%3A") + "/content?ts=" + obj.file.lastModifiedDate + "");
                }/*else if(pdf === 'xdf'){
                  window.open(`dashboard-v3/index.html#path=${obj.file.path.replace(/\.xdf$/,'').replace(/:/g,'/')}&type=0`);
                } */
                else if(pdf === 'xdp'){
                   //window.open(`http://localhost:3000/#/runner#path=${obj.file.path.replace(/\.xdp$/,'').replace(/:/g,'/')}`);
                    window.open(`content/data-portal/index.html#runner#path=${obj.file.path.replace(/\.xdp$/,'').replace(/:/g,'/')}`);
                } else {
                    window.open("/xdatainsight/api/repos/" + dataPath + "/" + dataUrl);
                }
            };
            service.reportOpen = (param, $state)=> {
                // recentFactory.handleRecentRecord(param);
                //添加进最近浏览
                recentFactory.recentAddXhr(param).catch( (e) => recentFactory.handleRecentRecord(param) );
                let reportType = ["saiku", "wcdf", "adhoc",  "prpt", "xwaqr",'xdf','xdp'];
                let pluginName = (param.file.path).split('.');
                var suffx = pluginName[pluginName.length - 1];

                /**
                 * 所有包含有文件操作的plugin均修改为如下逻辑：
                 * 通过 /xdatainsight/api/repo/files/typeWhiteList 接口 获取平台能打开哪些文件
                 * 
                 * $rootScope.typeWhiteList在index.js中做了缓存
                 */
                if($rootScope.typeWhiteList.indexOf(suffx) > -1 || /jpg|png|gif|bmp|jpeg/i.test(suffx)){
                    tabHandleFactory.handle({
                        tab: 'detailReport', 
                        pluginName: pluginName[pluginName.length - 1], 
                        pluginPath: param.file.path.substring(0, param.file.path.lastIndexOf(".")), 
                        pathParam:'',
                        name: param.file.path.substring(0, param.file.path.lastIndexOf(".")).replace(/^\/.*\//,''),
                        paramData: param.file.path
                      });
                      // $state.go('detailReport', {
                      //     pluginName: pluginName[pluginName.length - 1],
                      //     pluginPath: param.file.path.substring(0, param.file.path.lastIndexOf("."))
                      // });
                }
            };
            service.searchreportOpen = (param, $state)=> {
                let reportType = ["saiku", "wcdf", "adhoc", "html", "prpt","xdf","xdp"];
                let pluginName = (param.path).split('.');
                reportType.map((d)=> {
                    if (d == pluginName[1]) {
                        $state.go('detailReport', {pluginName: pluginName[1], pluginPath: pluginName[0]});
                    }
                });
            };
            service.renameRequest = (fileParam, filePathRename)=> {
                let dataPath = encodeURI(filePathRename.replace(/:/g, "\t").replace(/\//g, ":"));
                let dataName = encodeURI(fileParam);
                let deferred = $q.defer();
                $http({
                    method: 'put',
                    headers: {contentType: "application/json; charset=utf-8"},
                    url: '/xdatainsight/api/repo/files/' + dataPath + '/rename?newName=' + dataName,
                    dataType: 'json',
                    data: ''
                }).success((data)=> {
                    deferred.resolve(data);
                }).error(()=> {
                    deferred.reject('There was an error');
                });
                return deferred.promise;
            };

            //lv
            //delete file
            service.delete = (fileId, url)=> {
                let deferred = $q.defer();
                $http({
                    method: 'put',
                    headers: {"Content-Type": "text/plain"},
                    url: url,
                    dataType: 'json',
                    data: fileId
                }).success((data)=> {
                    deferred.resolve(data);
                }).error(()=> {
                    deferred.reject('There was an error')
                });
                return deferred.promise;
            };
            service.copyTo = (fileId, url)=> {
                let deferred = $q.defer();
                $http({
                    method: 'put',
                    headers: {"Content-Type": "text/plain; charset=utf-8"},
                    url: url,
                    dataType: 'json',
                    data: fileId
                }).success((data)=> {
                    deferred.resolve(data);
                }).error(()=> {
                    deferred.reject('There was an error')
                });
                return deferred.promise;
            };
            service.moveTo = (fileId, url)=> {
                let deferred = $q.defer();
                $http({
                    method: 'put',
                    headers: {"Content-Type": "text/plain; charset=utf-8"},
                    url: url,
                    dataType: 'json',
                    data: fileId
                }).success((data)=> {
                    deferred.resolve(data);
                }).error(()=> {
                    deferred.reject('There was an error')
                });
                return deferred.promise;
            };
            service.restore = (fileId)=> {
                let deferred = $q.defer();
                $http({
                    method: 'put',
                    headers: {contentType: "application/json; charset=utf-8"},
                    url: '/xdatainsight/api/repo/files/restore',
                    dataType: 'json',
                    data: fileId
                }).success((data)=> {
                    deferred.resolve(data);
                }).error((e)=> {
                    deferred.reject(e)
                });
                return deferred.promise;
            };
            //文件树
            service.fileTree = ()=> {
                let deferred = $q.defer();
                $http({
                    method: 'get',
                    headers: {Accept: "application/json"},
                    url: "/xdatainsight/api/repo/files/tree?showHidden="+($rootScope.ifhide?true:false)+"&filter=*|FILES&_="+new Date().getTime(),
                    dataType: ''
                }).success((data)=> {
                    deferred.resolve(data);
                }).error((data)=> {
                });
                return deferred.promise;
            };
            service.isAuthenticated = ()=> {
                let deferred = $q.defer();
                $http({
                    method: 'get',
                    headers: {contentType: "application/json; charset=utf-8"},
                    url: '/xdatainsight/api/mantle/isAuthenticated',
                    dataType: 'json',
                    cache:false,
                    data: ""
                }).success((data)=> {
                    deferred.resolve(data);
                }).error(()=> {
                    deferred.reject('There was an error')
                });
                return deferred.promise;
            };
            service.postJob = (data)=> {
                let deferred = $q.defer();
                $http({
                    method: 'post',
                    headers: {contentType: "application/json; charset=utf-8"},
                    url: '/xdatainsight/api/scheduler/job',
                    dataType: 'json',
                    cache:false,
                    data: data
                }).success((data)=> {
                    deferred.resolve(data);
                }).error(()=> {
                    deferred.reject('There was an error')
                });
                return deferred.promise;
            };
            service.getJobInfo = (job)=> {
                var date = job.jobId.substring(job.jobId.length - 13);
                var jobId = job.userName + "%09" + job.jobName + "%09" + date;
                let deferred = $q.defer();
                $http({
                    method: 'get',
                    headers: {contentType: "application/json; charset=utf-8"},
                    url: '/xdatainsight/api/scheduler/jobinfo?jobId=' + jobId + '',
                    dataType: 'json'
                }).success((data)=> {
                    deferred.resolve(data);
                }).error(()=> {
                    $('.addMask').hide();//错误隐藏弹窗
                    deferred.reject('There was an error')
                });
                return deferred.promise;
            };
            service.removeJob = (jobId)=> {
                let deferred = $q.defer();
                var data = {
                    jobId: jobId
                };
                $http({
                    method: 'delete',
                    headers: {"Content-Type": "application/json;charset=UTF-8"},
                    url: '/xdatainsight/api/scheduler/removeJob',
                    dataType: 'json',
                    data: data
                }).success((data)=> {
                    deferred.resolve(data);
                }).error(()=> {
                    deferred.reject('There was an error')
                });
                return deferred.promise;
            };
            service.getFavorites = (data, method)=> {
                let deferred = $q.defer();
                $http({
                    method: method,
                    headers: {"Content-Type": "application/json;charset=UTF-8"},
                    url: '/xdatainsight/plugin/xdt/api/user-settings/favorites',
                    dataType: 'json',
                    cache:false,
                    data: data
                }).success((data)=> {
                    deferred.resolve(data);
                }).error(()=> {
                    deferred.reject('There was an error')
                });
                return deferred.promise;
            };
            service.recentXhr = (data)=> {
                let deferred = $q.defer();
                $http({
                    method: 'post',
                    headers: {Accept: "application/json"},
                    url: '/xdatainsight/plugin/xdt/api/user-settings/recent',
                    data: data,
                    cache:false,
                    dataType: 'json'
                }).success((data)=> {
                    deferred.resolve(data);
                }).error(()=> {
                    deferred.reject('There was an error')
                });
                return deferred.promise;
            };
            return service;
        }])
        
}