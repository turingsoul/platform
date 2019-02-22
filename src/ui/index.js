/**
 * Created by Administrator on 2016/4/15.
 */
import angular from "angular";
import $ from "jquery";
import "./navBar/navBar";
import "./filePath/filePath";
import "./popup/popup";
import "./panel/panel";
import "./permit/permit";
import "./style/app.css";
import "./style/global.css";
import server from "./menu/server";
import { loading, closeLoading } from "./popup/dataSource/component/createModule/public.js";
import '@/lib/js/polyfill.min'

{
    ("use strict");
    const app = angular.module("xdt", [
        "xdt/navBar",
        "xdt/filePath",
        "xdt/panel",
        "xdt/popup"
    ]);
    //点击隐藏菜单
    function hideMenu(){
        document.getElementsByClassName("userList")[0].className = "userList user-hide";
        $('menu-directive').addClass('menu-hide');
        //切换
        $(".flexline").removeClass("unfolded").addClass("folded");                                                  
        $('.menu .tableList').hide();
    }
    // window.hideXdtMenu = hideMenu;
    window.onblur = hideMenu;
    /*//挂载事件监听
    setInterval(function(){
        $('iframe').each(function(e,item){
            var thisIframe = $(item);
            thisIframe.data('aa') || thisIframe.on('load',function(){
                thisIframe.data('aa',5)
                this.contentDocument.addEventListener('click',function(){hideMenu()},true);
            });
        });
    },1000);*/
    app.config(['$httpProvider',function($httpProvider){
        let myHttpProvider = function($q,$rootScope){
            return {
                request(config){
                    return config;
                },
                response(response){
                    return response;
                },
                responseError(rejection){
                    let { status } = rejection;

                    switch(status){
                        case 401:
                            // $rootScope.showLoginForm();
                        break;
                    }
                    return $q.reject(rejection);
                }
            }
        }
        myHttpProvider.$inject = ['$q','$rootScope'];
        $httpProvider.interceptors.push(myHttpProvider);
    }]);
    
    app.directive("xdtHome", () => {
        const template = require("./app.html");
        return {
            restrict: "E",
            template: template,
            replace:true,
            link(element) {
                if (!("classList" in document.documentElement)) {
                    Object.defineProperty(HTMLElement.prototype, "classList", {
                        get: function() {
                            var self = this;
                            function update(fn) {
                                return function(value) {
                                    var classes = self.className.split(/\s+/g),
                                        index = classes.indexOf(value);

                                    fn(classes, index, value);
                                    self.className = classes.join(" ");
                                };
                            }

                            return {
                                add: update(function(classes, index, value) {
                                    if (!~index) classes.push(value);
                                }),

                                remove: update(function(classes, index) {
                                    if (~index) classes.splice(index, 1);
                                }),

                                toggle: update(function(classes, index, value) {
                                    if (~index) classes.splice(index, 1);
                                    else classes.push(value);
                                }),

                                contains: function(value) {
                                    return !!~self.className
                                        .split(/\s+/g)
                                        .indexOf(value);
                                },

                                item: function(i) {
                                    return (
                                        self.className.split(/\s+/g)[i] || null
                                    );
                                }
                            };
                        }
                    });
                }
                /*get screen height*/
                /*hide two panels while click on the blanks*/
                document.onclick = function(e) {
                    var displayFlag = e.target.className.substring(0, 7);
                    if (displayFlag != "display") {
                        document.getElementsByTagName(
                            "menu-directive"
                        )[0].className = "menu-hide";
                        $(".flexline").removeClass("unfolded").addClass("folded");
                        document.getElementsByClassName(
                            "userList"
                        )[0].className = "userList user-hide";
                        if (
                            document.getElementsByClassName(
                                "operate-menu"
                            )[0] != undefined
                        ) {
                            document.getElementsByClassName(
                                "operate-menu"
                            )[0].style.display = "none";
                        }
                        document.querySelector("#myshelter").style.width = "0%";
                    } else {
                        document.querySelector("#myshelter").style.width =
                            "100%";
                    }
                    //点击显示隐藏
                    var classArr = [
                        {
                            className: "showOtherBtn",
                            isShowObj: document.getElementsByClassName(
                                "navList1"
                            )[0],
                            addName: "selfShow1"
                        },
                        {
                            className: "showPageControll",
                            isShowObj: document.getElementById("panel1"),
                            addName: "selfShow2"
                        }
                    ];
                    //由于iframe不能添加外部事件，采取用外部div覆盖iframe区域的方式处理
                    var toolbarBg = $(".toolbarBg");

                    classArr.map(item => {
                        var selfStyle = item.isShowObj.style.display;
                        if (
                            e.target.className !== item.className &&
                            toolbarBg.hasClass(item.addName)
                        ) {
                            item.isShowObj.style.display = "none";
                            toolbarBg.hide();
                            toolbarBg.removeClass(item.addName);
                        } else if (e.target.className === item.className) {
                            if (selfStyle === "none") {
                                item.isShowObj.style.display = "block";
                                toolbarBg.show();
                                toolbarBg.addClass(item.addName);
                            } else {
                                item.isShowObj.style.display = "none";
                                toolbarBg.hide();
                                toolbarBg.removeClass(item.addName);
                            }
                        }
                    });
                };
                document.ondragstart = function() {
                    return false;
                };
            }
        };
    });
    app.service("pageService", function() {
        let pluginArr = [];
        var containsKey = (key, dataConfig) => {
            for (var p = 0; p < dataConfig.length; p++) {
                if (key == dataConfig[p].name) {
                    return true;
                }
            }
            return false;
        };
        var getValue = (key, dataConfig) => {
            for (var p = 0; p < dataConfig.length; p++) {
                if (key == dataConfig[p].name) {
                    return dataConfig[p].value;
                }
            }
            return null;
        };
        this.pluginValue = dataConfig => {
            let index = 0;
            let pluginKey = "plugin-content-type-" + index;
            while (containsKey(pluginKey, dataConfig)) {
                let pluginIcon = "plugin-content-type-icon-" + index;
                let plugin = {
                    name: getValue(pluginKey, dataConfig),
                    icon: getValue(pluginIcon, dataConfig),
                    cmdMap: {}
                };
                pluginArr.push(plugin);
                let cmdIndex = 0;
                let cmdSetting = pluginKey + "-command-" + cmdIndex;
                while (containsKey(cmdSetting, dataConfig)) {
                    let cmd = getValue(cmdSetting, dataConfig);
                    let cmdperspective =
                        pluginKey + "-command-perspective-" + cmdIndex;
                    plugin.cmdMap[cmd] = getValue(cmdperspective, dataConfig);
                    cmdSetting = pluginKey + "-command-" + ++cmdIndex;
                }
                pluginKey = "plugin-content-type-" + ++index;
            }
            return pluginArr;
        };
    });
    app.provider("pageProvider", function() {
        this.$get = [
            "$http",
            "$q",
            ($http, $q) => {
                return {
                    xdtAjaxParam(_finalUrl) {
                        let deferred = $q.defer();
                        $http({
                            method: "get",
                            headers: {
                                contentType: "application/json; charset=utf-8"
                            },
                            url: _finalUrl,
                            dataType: "json",
                            data: ""
                        })
                            .success(data => {
                                deferred.resolve(data);
                            })
                            .error(() => {
                                deferred.reject("There was an error");
                            });
                        return deferred.promise;
                    }
                };
            }
        ];
    });
    app.factory("pageFactory", ["$rootScope", $rootScope => {
            let service = {};
            service.loading = () => {
                $rootScope.globalLoading(true);
            };
            service.loadingClose = () => {
                $rootScope.globalLoading(false);
            };
            service.getWindowHeight = () => {
                var height = $(window).height();
                var iframeheight = $rootScope.ifheadhide ? height : height - 56;
                let iframeList = document.querySelectorAll("iframe");
                for (let i = 0; i < iframeList.length; i++) {
                    iframeList[i].style.height = iframeheight + "px";
                }
            };
            return service;
        }
    ]);
    app.controller("pageController", [ "$scope", "$http", "pageService", "pageProvider", "$rootScope", "pageFactory", "$state", "tabHandleFactory", 
    "listDatabase", 'popupFactory', ( $scope, $http, pageService, pageProvider, $rootScope, pageFactory, $state, tabHandleFactory, listDatabase, 
        popupFactory ) => {
        var _href = location.href.split("?");
        var ifheadhide = false;
        /*if((_href[1] && _href[1].split('&').find(e=>/ifheadhide/.test(e))) || sessionStorage.getItem('xdfifheadhide') === 'true'){
            ifheadhide = true;
            $rootScope.ifheadhide = true;
            sessionStorage.setItem('xdfifheadhide','true');
        }*/

        $rootScope.globalLoading = function(statu) {
            if(statu === true){
                loading();
            }else{
                closeLoading();
            }
        };

        //弹出登录超时登录框
        $rootScope.showLoginForm = function(){
            $("#login_form_username").val($rootScope.login_name);
            $(".login-form-wrap").show();
        };

        //关闭登录超时登录框
        $rootScope.hideLoginForm = function(){
            $(".login-form-wrap").hide();
        }


        // ============================== WebSocket start ======================================
        function isHttps(){
            return /^https:/.test(window.location.href);
        }
        let lockReconnect = false;//避免ws重复连接
        let host = window.location.host;
        let ws = null;// 判断当前浏览器是否支持WebSocket
        let wsUrl = (isHttps() ? 'wss://':'ws://') + host +'/xdatainsight/webSocket/connect';
        //心跳检测
        let heartCheck = {
            timeout: 20000,        //20s发一次心跳
            timeoutObj: null,
            reset: function(){
                window.clearInterval(this.timeoutObj);
                return this;
            },
            start: function(){
                let self = this;
                this.timeoutObj = window.setInterval(() =>{
                    ws && ws.send("");
                    console.log("ping!")
                }, this.timeout)
            }
        }

        //连接ws
        createWebSocket(wsUrl);   

        function createWebSocket(url) {
            try{
                if('WebSocket' in window){
                    ws = new WebSocket(url);
                }else if('MozWebSocket' in window){  
                    ws = new MozWebSocket(url);
                }else{
                    console.log("您的浏览器不支持websocket协议,建议使用新版谷歌、火狐等浏览器，请勿使用IE10以下浏览器，360浏览器请使用极速模式，不要使用兼容模式！");
                }
                initEventHandle();
            }catch(e){
                reconnect(url);
                console.log(e);
            }     
        }

        function initEventHandle() {
            ws.onopen = (event) => {
                //心跳检测重置
                heartCheck.reset().start();
                ws.send('');
                console.log("Open the socket.",event);
            };
            ws.onmessage = (event) => {
                console.log("Socket Message.",event);
            }
            ws.onerror = (event) => {
                console.log("Socket Error",event);
            };
            ws.onclose = (event) => {
                let { code } = event;
                
                console.log("Socket Closed by Server.",event);
                //重置心跳
                heartCheck.reset();

                /**
                 * ws关闭时code为1008或者请求状态码401表示登录超时，弹出登录超时框。
                 * 其他情况直接尝试重新连接ws
                 */
                if(code === 1008){
                    $rootScope.showLoginForm();
                }else{
                    $.ajax('/xdatainsight/api/system/status').then(
                        rep => {
                            reconnect(wsUrl);
                        },
                        error => {
                            let { status } = error;
                            if(status === 401){
                                $rootScope.showLoginForm();
                            }else{
                                reconnect(wsUrl);
                            }
                            console.log('error',error);
                        }
                    );
                }
            };
        }

        // 监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
        window.onbeforeunload = () => {
            ws.close();
        }  

        //重连
        function reconnect(url = wsUrl) {
            if(lockReconnect){
                return;
            }
            lockReconnect = true;
            //没连接上会一直重连，设置延迟避免请求过多
            setTimeout(()=> {     
                createWebSocket(url);
                lockReconnect = false;
            }, 2000);
        }

        $rootScope.wsReconnect = reconnect;

        // ============================== WebSocket end ======================================

        if (_href[1]) {
            ifheadhide = _href[1];
            if (ifheadhide.indexOf("ifheadhide=true") > -1) {
                ifheadhide = true;
                sessionStorage.setItem("xdfifheadhide", "true");
            } else if (ifheadhide.indexOf("ifheadhide=false") > -1) {
                ifheadhide = false;
                sessionStorage.setItem("xdfifheadhide", "");
            }
        }
        if (sessionStorage.getItem("xdfifheadhide") === "true") {
            sessionStorage.setItem("xdfifheadhide", "true");
            ifheadhide = true;
        } else {
            sessionStorage.setItem("xdfifheadhide", "");
            ifheadhide = false;
        }
        $rootScope.ifheadhide = ifheadhide;
        $rootScope.tabsHeight = "100%";
        $rootScope.dataCache = {
            treeData: {},
            trashData: null
        };
        // 给下列tab添加参数用
        $rootScope.tabindex = $rootScope.tabindex || {
            newOlap: 0,
            newAdhoc: 0,
            newDashboard: 0,
            newPortal: 0
        };

        $rootScope.tabCreated = false;

        window.onerror = true;
        $(window).on("resize", () => {
            pageFactory.getWindowHeight();
            //重新计算标签
            $rootScope.projectArr = $rootScope.projectArr || [];
            var pWidth = $(".navList").parent().width() - 380,
                //容纳标签个数
                liCount = (pWidth / 190) >> 0,
                showArr = $rootScope.projectArr.filter(e => e.isShow),
                hideArr = $rootScope.projectArr.filter(e => !e.isShow),
                selfHideArr = $.extend(true, {}, { arr: hideArr }).arr;

            if (showArr.length > liCount && liCount > 0) {
                showArr.filter(e => !e.active)
                    .splice(0, showArr.length - liCount)
                    .map(el => {
                        el.isShow = false;
                    });
                $rootScope.doulbleArrow = true;
            } else if (showArr.length < liCount && hideArr.length) {
                hideArr.splice(0, liCount - showArr.length).map(el => {
                    el.isShow = true;
                });
                liCount - showArr.length >= selfHideArr.length && ($rootScope.doulbleArrow = false);
            }

            $rootScope.$apply();
            var windowHeight = $(window).height();
            if ( document.getElementsByClassName("navbar")[0].style.display === "none" ) {
                $(".tabBox").css({ height: windowHeight });
                $(".tabBox iframe").css({ height: windowHeight });
            } else {
                $(".tabBox").css({ 
                    height: $rootScope.ifheadhide ? windowHeight : windowHeight - 56
                });
                // $(".tabBox iframe").css({
                //     height: $rootScope.ifheadhide
                //         ? windowHeight
                //         : windowHeight - 56
                // });
            }
        });

        //初始化创建项目打开数组
        $rootScope.projectArr = $rootScope.projectArr || [];
        pageFactory.loading();
        $rootScope.$on("editor", (d, data) => {
            var type = data.file.name.split(".")[1];
            if (type == "saiku" || type == "xdf" || type == "xwaqr" || type =="xdp") {
                $rootScope.editAble = false;
            } else {
                $rootScope.editAble = true;
            }
            var param = data;
            let pluginName = param.file.path.split(".");
            let name = param.file.name.split(".")[0];
            if (param.file.cmdMap) {
                var pathParam = param.file.cmdMap.EDIT;
            } else {
                var pathParam = "";
            }
            $rootScope.d = {
                pluginName: pluginName[1],
                pluginPath: pluginName[0],
                pathParam: pathParam,
                fileId: param.file.id,
                name: name,
                path: param.file.path
            };
            //$state.go('operateEdit', {pluginName:pluginName[1],pluginPath:pluginName[0],pathParam:param.file.cmdMap.EDIT});
        });
        //监听有无设置home
        $scope.$on("ifHome", (d, data) => {
            $rootScope.ifHome = data;
        });

        $scope.$on("fileWindowPath", (d, data) => {
            $scope.$broadcast("detailPath", data);
        });
        $scope.$on("popupName", (d, data) => {
            $scope.$broadcast("popupOne", data);
        });
        $scope.$on("userSet", (d, data) => {
            $scope.$broadcast("userAdmin", data);
        });
        $scope.$on("mypower", (d, data) => {
            $scope.$broadcast("mypowerUpdata", data);
        });
        $rootScope.$on("Jdbc", (d, data) => {
            $scope.$broadcast("getJdbc", data);
        });
        $scope.$on("loading", (d, data) => {
            data ? pageFactory.loading() : pageFactory.loadingClose();
        });

        $rootScope.typeWhiteList = [];

        pageProvider
            .xdtAjaxParam("/xdatainsight/api/repo/files/typeWhiteList")
            .then(function(data) {
                if (data) {
                    $rootScope.typeWhiteList = data;
                }
            });
        //本地调试用cookie信息
        // window.cookie = 'JSESSIONID=35E0F721192EC847BCAE9C10F5331CC4';
        pageProvider.xdtAjaxParam("/xdatainsight/api/scheduler/canSchedule").then(
            data => {
                $scope.$broadcast("canSchedule", data);
                pageProvider.xdtAjaxParam("/xdatainsight/api/mantle/settings").then(
                    data => {
                        $scope.$broadcast("settingsInfo", data);
                        let dataConfig = data.setting;
                        let pluginParam = pageService.pluginValue( dataConfig );
                        $scope.pluginConfig = pluginParam;
                        pageProvider
                            .xdtAjaxParam( "/xdatainsight/plugin/xdt/api/user-settings/list?_=" + new Date().getTime() )
                            .then(
                                data => { 
                                    $rootScope.ifhide = $rootScope.ifhide ? $rootScope.ifhide : false;
                                    //最近浏览
                                    $rootScope.dataRecent = [];
                                    //收藏夹
                                    $rootScope.collection = [];
                                    //案例
                                    $rootScope.caseList = [];
                                    pageFactory.loadingClose();
                                    $scope.dataReports = data.setting;
                                    let jsonLength = data.setting.length;
                                    let login_name = "";
                                    for (let i = 0; i < jsonLength; i++) {
                                        if ( data.setting[i].name == "session_name" ) {
                                            //get login user's name
                                            login_name = data.setting[i].value;
                                        }
                                    }
                                    $scope.dataReports.map(d => {
                                        if (d.name == "recent") {
                                            d.value && ($rootScope.dataRecent = JSON.parse( d.value ));
                                        } else if (d.name == "favorites") {
                                            d.value && ($rootScope.collection = JSON.parse( d.value ));
                                        }
                                    });
                                    $("#username").text(login_name); //set user's name
                                    //获取用户名
                                    var selfData = data.setting;
                                    var currentUserName = login_name;
                                    //存储用户过期时间信息
                                    $rootScope.userExpireTime = -1;
                                    //存储用户名
                                    $rootScope.login_name = login_name;
                                    //获取用户过期时间信息
                                    $http({
                                        method: "get",
                                        headers: {
                                            Accept: "application/json"
                                        },
                                        url: "/xdatainsight/api/userroledao/getUserLimit?user=" + currentUserName,
                                        dataType: ""
                                    })
                                        .success(data => {
                                            $rootScope.ifThirdPart = false;
                                            if (data == "") {
                                                //返回结果为no content 证明是LDAP登录
                                                $rootScope.ifThirdPart = true;
                                            }
                                            //获取过期日期
                                            $rootScope.userExpireTime = data.endDate;
                                            if ( currentUserName != "admin" ) {
                                                //分永久账户和时间范围账户两种，生成对应的显示字符
                                                if ( $rootScope.userExpireTime == 253402271999000 ) {
                                                    var text = "此用户长期有效";
                                                    document.querySelector( "#yhnUserExpireTips" ).style.color = "green";
                                                    document.querySelector( "#yhnUserExpireTips" ).innerHTML = text;
                                                } else {
                                                    var text = "此用户将在" + parseInt( data.expiredMilliseconds / (24 * 60 * 60 * 1000) ) + "天后过期！";
                                                    document.querySelector( "#yhnUserExpireTips" ).style.color = "red";
                                                    document.querySelector( "#yhnUserExpireTips" ).innerHTML = text;
                                                }
                                            } else {
                                                var text = "此用户长期有效";
                                                document.querySelector( "#yhnUserExpireTips" ).style.color = "#1890ff";
                                                document.querySelector( "#yhnUserExpireTips" ).innerHTML = text;
                                            }
                                            //监听hash值
                                            window.addEventListener( "hashchange", function() {
                                                    if ( location.hash == "#/welcome" ) {
                                                        document.title = "欢迎 - xDataInsight";
                                                        $rootScope.$emit( "yhnIfhide" );
                                                    }
                                                }
                                            );
                                            //第三方cookie存取
                                            $rootScope.isFirstEnter = true;
                                            //初始化  清楚数组，重置标记
                                            $rootScope.tabCreated = undefined;
                                            $rootScope.projectArr = [];
                                            $rootScope.tabs = [];
                                            if ( !localStorage.getItem( "" + currentUserName ) ) {
                                                console.log("第一次登录");

                                                //没有读到弹出欢迎页

                                                localStorage.setItem( "" + currentUserName, 1 );
                                                var homePath;
                                                homePath = selfData && selfData.filter( el => el.name === "home-path" )[0];
                                                var hashPath = homePath ? homePath["value"] ? "#home" : "#welcome" : "#welcome";
                                                window.location.href = hashPath;
                                                $scope.welcomePopPageCtrl =
                                                    hashPath === "#home" ? false : true;
                                                $rootScope.welcomePopPageCtrl = hashPath === "#home" ? false : true;
                                                //首次进来弹出框
                                                /*document.querySelector(".popGuide").style.display = "block";*/
                                                // $scope.welcomePopPageCtrl = true;
                                                // $rootScope.welcomePopPageCtrl = true;
                                            } else {
                                                //读到了就默认首页了
                                                $scope.welcomePopPageCtrl = false;
                                                $rootScope.welcomePopPageCtrl = false;
                                                if (
                                                    $rootScope.ifHome == 0
                                                ) {
                                                    //如果主页未设置则跳转欢迎页
                                                    window.location.href = "#welcome";
                                                } else {
                                                    window.location.href = "#home";
                                                }
                                            }
                                        })
                                        .error(data => {
                                            console.log("获取权限日期失败");
                                        });
                                },
                                data => {}
                            );
                    },
                    data => {
                        pageFactory.loadingClose();
                    }
                );
            },
            data => {
                pageFactory.loadingClose();
            }
        );

        //挂载业务数据编辑
        $rootScope.editDatset = function(name) {
            $("#yhnLoading").show();
            $("exist-data").removeClass("popupHide");
            $(".agileBox").removeClass("hide");
            // loading();
            listDatabase
                .callItunes(
                    "/xdatainsight/plugin/data-access/api/datasource/modeler/loadDomain?dswId=" +
                        encodeURI(name) +
                        "&_=" +
                        +new Date()
                )
                .then(
                    data => {
                        $rootScope.$emit("editContent", data);
                        listDatabase
                            .callItunes(
                                "/xdatainsight/plugin/data-access/api/datasource/modeler/loadTables?dswId=" +
                                    encodeURI(name) +
                                    "&_=" +
                                    +new Date()
                            )
                            .then(
                                data => {
                                    $rootScope.$emit("editContent1", data);
                                    $(".agileBox .mainItem2 .mainItemTitle>span")
                                    .eq(1)
                                    .click();
                                },
                                data => {
                                    // closeLoading();
                                    // document
                                    //     .querySelector(".agileBox")
                                    //     .classList.remove("hide");
                                }
                            );
                    },
                    data => {
                        // closeLoading();
                    }
                );
            $rootScope.$emit("liName", name);
        };

        //window.postMessga 接收处，来自dashboard
        window.addEventListener(
            "message",
            e => {
                try {
                    let data = JSON.parse(e.data);
                    if (data.type) {
                        switch (data.type) {
                            case "ADD_DATASOURCE_MODEL":
                                $scope.$broadcast(
                                    "popupOne",
                                    "createModule"
                                );
                                $rootScope.$emit("Jdbc", 1);
                                $rootScope.$emit("dataBaseType", 1);
                                break;
                            case "EDIT_DATASET":
                                $rootScope.editDatset(data.data.name);
                                break;
                            case "SQL_EDIT":
                                //$rootScope.$broadcast("dataBaseType");
                                //$rootScope.$broadcast("updata",1);
                                $rootScope.$broadcast('loading',true);//显示过渡条
                                document.querySelector('.popup').style.display="block";
                                $('.advancedSettingBox').hide();
                                $rootScope.$broadcast('showExistData');
                                $rootScope.$emit("_sqlEdit", data.data);
                                break;
                            case 'SQL_ADD':
                                document.querySelector(".popup").style.display = "block";
                                document.querySelector(".popup create-connect").classList.remove("popupHide");
                                $rootScope.$broadcast('getDataBaseType');
                                break;
                            case 'LOGOUT':
                                window.location.href="Logout";
                                break;
                            default:break;
                        }
                    } else {
                        let pluginName = data.file.path.split(".");
                        tabHandleFactory.handle({
                            tab: "operateEdit",
                            pluginName: pluginName[1],
                            pluginPath: pluginName[0],
                            pathParam: "editor",
                            name: "编辑_" + pluginName[0].split("/").pop(),
                            paramData: pluginName[0] + "." + pluginName[1]
                        });

                        $rootScope.$apply();
                    }
                } catch (error) {
                    console.warn("未知postmessage");
                }
            },
            false
        );
    }]);
    app.factory("tabHandleFactory", [
        "$rootScope",
        "$state",
        ($rootScope, $state) => {
            let service = {};
            service.handle = stateparam => {
                const addtab = stateparam;
                //挂载全局tab数组
                let addtabparam = {
                    data: addtab,
                    active: true, //至于激活状态
                    isShow: true, //把当前打开的对象致为展示状态
                    name: addtab.name
                };
                //存放所有tab 的状态数据
                $rootScope.projectArr = $rootScope.projectArr || [];
                document.title = addtab.name;
                //先把所有数组致为未激活状态
                $rootScope.projectArr.forEach(e => (e.active = false));
                //取出展示的tab数组
                let isShowArr = $rootScope.projectArr.filter(e => e.isShow);
                //取出隐藏的数组
                let isNoShowArr = $rootScope.projectArr.filter(e => !e.isShow);

                $rootScope.doulbleArrow || ($rootScope.doulbleArrow = false);
                //获取容器宽度
                var pWidth =
                        $(".navList")
                            .parent()
                            .width() - 380,
                    cWidth = 0;
                //当所有li的宽度加起来大于父容器的220时，添加进点击展示的框框
                $(".navList li").map((i, e) => {
                    cWidth += $(e).outerWidth(true);
                });

                //判断是否有重复数据
                let isConvert = $rootScope.projectArr.filter(e => {
                    if (
                        JSON.stringify(addtabparam.data) ==
                        JSON.stringify(e.data)
                    ) {
                        e.active = true;
                        e.isShow = true;
                        return e;
                    }
                });
                isConvert.length === 0 &&
                    $rootScope.projectArr.push(addtabparam);

                if (
                    isConvert.length &&
                    isNoShowArr.length &&
                    isNoShowArr.filter(
                        el => el.data.paramData === isConvert[0].data.paramData
                    )[0]
                ) {
                    //有重复数组  并且在隐藏的数组存在
                    isShowArr[0].isShow = false;
                    $rootScope.doulbleArrow = true;
                }
                /*else if(isNoShowArr.length > 0 && !isConvert.length){//没重复数组 并且隐藏数组存在
            isShowArr[0].isShow = false;
            $rootScope.doulbleArrow = true;
        }*/ //添加的时候  如果宽度差小于400  并且显示标签的有值   就把第一个标签放入隐藏数组
                //由于渲染时间延时与数据操作之后  所以需要吧判断间距设置比较相当于两个li的宽度
                else if (
                    pWidth - cWidth < 190 &&
                    isShowArr.length > 0 &&
                    !isConvert.length
                ) {
                    isShowArr[0].isShow = false;
                    $rootScope.doulbleArrow = true;
                }

                //去掉路由，避免刷新
                //第一次 启用路由，第二次则用 更新数组
                if (!$rootScope.tabCreated) {
                    $rootScope.tabparam = addtab;
                    $rootScope.tabCreated = true;
                    $state.go("tabs");
                } else {
                    $rootScope.$emit("tabChange", {
                        action: "add",
                        data: addtab
                    });
                }
            };
            return service;
        }
    ]);
    app.factory("recentFactory", [
        "$http",
        "$q",
        "$rootScope",
        ($http, $q, $rootScope) => {
            let service = {};
            service.recentXhr = data => {
                let deferred = $q.defer();
                $http({
                    method: "post",
                    headers: { Accept: "application/json" },
                    url: "/xdatainsight/plugin/xdt/api/user-settings/recent",
                    data: data,
                    dataType: "json"
                })
                    .success(data => {
                        deferred.resolve(data);
                    })
                    .error(() => {
                        deferred.reject("There was an error");
                    });
                return deferred.promise;
            };
            //删除接口
            service.deleteXhr = (data, url) => {
                let deferred = $q.defer();
                $http({
                    method: "post",
                    headers: { Accept: "application/json" },
                    url: url,
                    data: data,
                    dataType: "json"
                })
                    .success(data => {
                        deferred.resolve(data);
                    })
                    .error(() => {
                        deferred.reject("There was an error");
                    });
                return deferred.promise;
            };
            //最近浏览添加
            service.recentAddXhr = data => {
                let deferred = $q.defer();
                $http({
                    method: "post",
                    headers: { Accept: "application/json" },
                    url: "/xdatainsight/plugin/xdt/api/user-settings/recent/add",
                    data: data,
                    dataType: "json"
                })
                    .success(data => {
                        deferred.resolve("success");
                    })
                    .error(() => {
                        deferred.reject("There was an error");
                    });
                return deferred.promise;
            };
            service.handleRecentRecord = function(node) {
                let reportType = [
                    "saiku",
                    "wcdf",
                    "adhoc",
                    "html",
                    "prpt",
                    "pdf",
                    "xwaqr",
                    "xdf"
                ];
                let pluginName = node.file.path.split(".");
                let fileFormat = pluginName[pluginName.length - 1];
                if (reportType.indexOf(fileFormat) > -1) {
                    var recent = {
                        fullPath: node.file.path,
                        title: node.file.title,
                        lastUse: new Date().getTime(),
                        img: node.file.img || []
                    };
                    if (
                        $rootScope.dataRecent &&
                        Array.isArray($rootScope.dataRecent) &&
                        $rootScope.dataRecent.length > 0
                    ) {
                        var fullPath = $rootScope.dataRecent.map(
                            re => re.fullPath
                        );

                        if (fullPath.indexOf(node.file.path) == -1) {
                            $rootScope.dataRecent.splice(0, 0, recent);
                        } else {
                            var index = fullPath.indexOf(node.file.path);
                            fullPath.splice(index, 1);
                            fullPath.splice(0, 0, node.file.path);

                            $rootScope.dataRecent.splice(index, 1);
                            $rootScope.dataRecent.splice(0, 0, recent);
                        }
                    } else {
                        $rootScope.dataRecent.push(recent);
                    }
                    service.recentXhr($rootScope.dataRecent);
                }
            };
            return service;
        }
    ]);
}
