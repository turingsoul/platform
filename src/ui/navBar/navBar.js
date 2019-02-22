/**
 * Created by Administrator on 2016/4/20.
 */
'use strict'

import angular from 'angular';
import ngRoute from 'angular-route';
import $ from 'jquery';
import '../menu/menu';
import '../style/navBar.css';
import {tips} from '../popup/dataSource/component/createModule/public';
import jsPdfDebug from '../../lib/js/jsPdf.debug.js';

{
    "use strict";
        angular.module('xdt/navBar',['xdt/menu'])
            .directive('navBar',()=>{
                const template = require('./navBar.html');
                return{
                    restrict: 'E',
                    template:template,
                    replace:true,
                    link(){
                        $('.buttom').on('click',()=>{
                            document.getElementsByClassName("userList")[0].className = "userList user-hide";
                            document.querySelector('menu-directive').classList.toggle('menu-hide');
                            //切换
                            if($("menu-directive").hasClass("menu-hide")){
                                $(".flexline").removeClass("unfolded").addClass("folded");
                            }else{
                                $(".flexline").removeClass("folded").addClass("unfolded");
                            }

                            $('menu-directive>ul>li').css("height", "48px");
                            let arrow = document.querySelectorAll("div.bkimg");
                            for(let r = 0;r<arrow.length;r++){
                                arrow[r].style.webkitTransform = "rotate(0deg)"; 
                            }                                                    
                            $('.menu .tableList').hide();
                        });
                        $('.userAttribute').on('click',()=>{
                            document.querySelector('menu-directive').className = "menu-hide";
                            $(".flexline").removeClass("unfolded").addClass("folded");
                            $('.userList').toggleClass('user-hide');
                        });
                        $('.navbar .userList li').on('click',()=>{
                            document.querySelector('.navbar .userList').classList.toggle('user-hide');
                        });
                        $(document).on("mouseover",".suffixList li",function(){
                            $(".suffixList .active").removeClass("active");
                            $(this).addClass("active");
                        });
                    }
                }
            })
            .provider("navBarProvider",function(){
                this.$get = ['$http', '$q',($http, $q)=>{
                    return {
                        callItunes(_finalUrl){
                            let deferred = $q.defer();
                            $http({
                                method: 'get',
                                headers:{contentType: "application/json; charset=utf-8"},
                                url: _finalUrl,
                                dataType: 'json',
                                data: ''
                            }).success((data)=>{
                                deferred.resolve(data);
                            }).error(()=>{
                                deferred.reject('There was an error')
                            });
                            return deferred.promise;
                        }
                    }
                }]
            })
            .filter("Suffix",function(){
                return function(input){
                    if(input.lastIndexOf(".")>0) {
                        return input.substring(0,input.lastIndexOf("."));
                    }else {
                        return input;
                    }
                }
            })
            .controller('navController', ['tabHandleFactory','$scope','$state','$rootScope','navBarProvider','$timeout', '$http', 'handleOthers', 
                (tabHandleFactory, $scope,$state,$rootScope,navBarProvider,$timeout, $http, handleOthers)=>{
                let userMenu = document.querySelectorAll('.navbar .userList li');
                let test = document.querySelector('.navbar .userList li');
                for(let a = 0;a<userMenu.length;a++){
                    let $dom = $(userMenu[a]);
                    /*将登陆排除在外*/
                    if(!$dom.is('.logOut')){
                        userMenu[a].addEventListener('click',($e)=>{
                            $scope.$emit('userSet', $e.currentTarget.className);
                        })
                    }
                }

                //监听开始菜单icon点击事件
                $scope.toggleIcon = () => {
                
                }

                $scope.blurEvent = () => {
                    document.querySelector(".yhn_search").style.backgroundColor = "#1A2D3F";
                    document.querySelector(".yhn_search").style.color = "#FEFEFF";
                    document.querySelector(".yhn_search1").style.backgroundColor = "#1A2D3F";
                    document.querySelector(".yhn_search1").style.color = "#FEFEFF";
                    $timeout(function(){
                        $rootScope.list=[];
                        document.querySelector(".suffixList").style.display = "none";
                    },200);

                };

                //替换掉显示和未显示的
                $scope.relplaceShowLi = ($index, x) => {
                    let isShowArr = $rootScope.projectArr.filter(e => e.isShow);
                    x.isShow = true;
                    $rootScope.projectArr.forEach(e => e.active = false);
                    x.active = true;
                    isShowArr[isShowArr.length - 1].isShow = false;

                    x.active = true;
                    $rootScope.selfWcdf = (x.data.pluginName === 'xdf' ||   x.data.pluginName === 'wcdf') ? true : false;//根据是否是仪表盘展示多余操作
                    $rootScope.selfSaiku = x.data.pluginName === 'saiku' ? true : false;//根据是否是多维分析展示多余操作
                    $rootScope.selfXdp = (x.data.pluginName === 'xdp') ? true : false;//根据是否是仪表盘展示多余操作
                    var projectNameArr = ["saiku", "wcdf", "adhoc", "html", "prpt", "pdf", "xwaqr",'xdf','xdp'];//可展示文件操作的文件类型
                    $rootScope.isHandleShow = (projectNameArr.includes(x.data.pluginName)
                                                && !x.name.includes('编辑')) ? true : false;
                    $rootScope.$emit('tabChange', {action: 'switch', data: x.data})
                }
                function setDomShowHide(domClass, blockOrNone){
                    document.getElementsByClassName(domClass)[0].style.display = blockOrNone;
                }
                //点击展示下拉列表
                /*$scope.showNavHideList = () => {
                    setDomShowHide('navList1', 'block');
                    setDomShowHide('toolbarBg', 'block');
                }*/
                //隐藏导航栏
                $scope.hideNav = () => {
                    setDomShowHide('navbar', 'none');
                    setDomShowHide('showNav', 'block');
                    var windowHeight = $(window).height();
                    $rootScope.navTabState = false;
                    $('.tabBox').css({
                        height: windowHeight
                    });
                    $('.tabBox iframe').css({
                        height: windowHeight
                    });
                }
                $rootScope.ifSaveResolve = () => {
                    $('#xdt-navBar .alert2').hide();
                }
                $rootScope.ifSaveRemove = () => {
                    var removeObj = $scope.removeObj;
                    removeObj && removeLii(removeObj.index,removeObj.deleteData);
                    $('#xdt-navBar .alert2').hide();
                }
                $rootScope.ifSaveRemoveResolve = () => {
                    $('#xdt-navBar .alert2').hide();
                }
                //展开导航栏
                $rootScope.showNav = () => {
                    setDomShowHide('showNav', 'none');
                    setDomShowHide('navbar', 'block');
                    var windowHeight = $(window).height();
                    $rootScope.navTabState = true;
                    // $('.tabBox').css('transform','scale(1,1)');
                    $('.tabBox').css({
                        height: windowHeight - 56
                    });
                    $('.tabBox iframe').css({
                        height: windowHeight -56
                    });
                }
                //隐藏弹窗
                $rootScope.navRemoveResolve = () => {
                    $('#xdt-navBar .alert1').hide();
                }
                //隐藏弹窗 页面跳转
                $rootScope.navRemoveList = () => {
                    $rootScope.projectArr = [];
                    $rootScope.doulbleArrow = false;
                    $rootScope.$emit('tabChange', {action: 'delete', data: []});
                    $('#xdt-navBar .alert1').hide();
                    $rootScope.tabindex = undefined;
                }
                function removeLii($index,deleteData){
                    $rootScope.projectArr.splice($index,1);
                    let noShowArr = $rootScope.projectArr.filter(e => !e.isShow);
                    var pWidth = $('.navList').parent().width() * 0.8,
                        cWidth = 0,
                        len = $rootScope.projectArr.length;
                    //当所有li的宽度加起来大于父容器的220时，添加进点击展示的框框
                    $('.navList li').map((i, e) => {
                        cWidth += $(e).outerWidth(true);
                    });
                    if(noShowArr.length > 0){
                        noShowArr[0].isShow = true;
                        noShowArr[0].active = true;
                    }
                    if(!noShowArr.length && len){
                        $rootScope.projectArr[len - 1].active = true;
                    }
                    var activeArr = $rootScope.projectArr.filter(e => e.active);
                    activeArr[0] && ($rootScope.selfWcdf = (activeArr[0].data.pluginName === 'xdf' ||  activeArr[0].data.pluginName === 'wcdf')? true : false);//根据是否是仪表盘展示多余操作
                    activeArr[0] && ($rootScope.selfSaiku = activeArr[0].data.pluginName === 'saiku' ? true : false);//根据是否是多维分析展示多余操作
                    activeArr[0] && ($rootScope.selfXdp= activeArr[0].data.pluginName === 'xdp' ? true : false);//根据是否是数据门户展示多余操作
                    $rootScope.doulbleArrow = $rootScope.projectArr.filter(e => !e.isShow).length ? true : false;

                    var projectNameArr = ["saiku", "wcdf", "adhoc", "html", "prpt", "pdf", "xwaqr",'xdf','xdp'];//可展示文件操作的文件类型
                    activeArr[0] && ($rootScope.isHandleShow = (projectNameArr.includes(activeArr[0].data.pluginName) 
                                                                    && !activeArr[0].name.includes('编辑')) ? true : false);

                    len || ($rootScope.tabCreated = false, window.location.hash = '#welcome');  
                    $rootScope.$emit('tabChange', {action: 'delete', data: deleteData});
                    len > 0 && $rootScope.$emit('tabChange', {action: 'switch', data: $rootScope.projectArr.filter(e => e.active)[0].data})
                }
                //移除当前节点
                $scope.removeLi = ($index) => {
                    const deleteData = $rootScope.projectArr[$index].data;
                    $scope.removeObj = null;
                    var ifPup = false;
                    ['newDashboard','operateEdit','newOlap','newPortal'].forEach(e => {
                        if(e === deleteData.tab && (deleteData.pluginName || /xdf|saiku/.test(deleteData.pluginName))){
                            ifPup = true;
                        } 
                    });
                    if(ifPup){
                        $('#xdt-navBar .alert2').show();
                        $scope.removeObj = {
                            index: $index,
                            deleteData: deleteData
                        }
                        return false;
                    }
                    removeLii($index,deleteData);
                    /*$rootScope.projectArr.splice($index,1);
                    let noShowArr = $rootScope.projectArr.filter(e => !e.isShow);
                    var pWidth = $('.navList').parent().width() * 0.8,
                        cWidth = 0,
                        len = $rootScope.projectArr.length;
                    //当所有li的宽度加起来大于父容器的220时，添加进点击展示的框框
                    $('.navList li').map((i, e) => {
                        cWidth += $(e).outerWidth(true);
                    });
                    if(noShowArr.length > 0){
                        noShowArr[0].isShow = true;
                        noShowArr[0].active = true;
                    }
                    if(!noShowArr.length && len){
                        $rootScope.projectArr[len - 1].active = true;
                    }
                    var activeArr = $rootScope.projectArr.filter(e => e.active);
                    activeArr[0] && ($rootScope.selfWcdf = (activeArr[0].data.pluginName === 'xdf' ||  activeArr[0].data.pluginName === 'wcdf')? true : false);//根据是否是仪表盘展示多余操作
                    activeArr[0] && ($rootScope.selfSaiku = activeArr[0].data.pluginName === 'saiku' ? true : false);//根据是否是多维分析展示多余操作
                    $rootScope.doulbleArrow = $rootScope.projectArr.filter(e => !e.isShow).length ? true : false;

                    var projectNameArr = ["saiku", "wcdf", "adhoc", "html", "prpt", "pdf", "xwaqr",'xdf'];//可展示文件操作的文件类型
                    activeArr[0] && ($rootScope.isHandleShow = (projectNameArr.includes(activeArr[0].data.pluginName) 
                                                                    && !activeArr[0].name.includes('编辑')) ? true : false);

                    len || ($rootScope.tabCreated = false, window.location.hash = '#welcome');  
                    $rootScope.$emit('tabChange', {action: 'delete', data: deleteData});
                    len > 0 && $rootScope.$emit('tabChange', {action: 'switch', data: $rootScope.projectArr.filter(e => e.active)[0].data})*/
                }
                //移除所有节点
                $scope.removeNavList = () => {
                    // $rootScope.projectArr = [];
                    // $rootScope.doulbleArrow = false;
                    // $rootScope.$emit('tabChange', {action: 'delete', data: []})
                    $('#xdt-navBar .alert1').show();
                }
                //点击当前的tab获取切换
                $scope.navListClick = ($index, x) => {
                    var selfActive = $rootScope.projectArr[$index];
                    //限制已经激活的
                    if(selfActive.active) return false;
                    $rootScope.projectArr.forEach(e => {
                        e.active = false;
                    });
                    selfActive.active = true;
                    $rootScope.selfWcdf = (selfActive.data.pluginName === 'xdf' || selfActive.data.pluginName === 'wcdf') ? true : false;//根据是否是仪表盘展示多余操作
                    $rootScope.selfSaiku = selfActive.data.pluginName === 'saiku' ? true : false;//根据是否是多维分析展示多余操作
                    $rootScope.selfXdp = selfActive.data.pluginName === 'xdp' ? true : false;//根据是否是数据门户展示多余操作
                    var projectNameArr = ["saiku", "wcdf", "adhoc", "html", "prpt", "pdf", "xwaqr",'xdf','xdp'];//可展示文件操作的文件类型
                    $rootScope.isHandleShow = (projectNameArr.includes(selfActive.data.pluginName) && !selfActive.name.includes('编辑')) ? true : false;
                    $rootScope.$emit('tabChange', {action: 'switch', data: selfActive.data});
                    if(selfActive.data.pluginName === 'xdf'){
                        setTimeout(function(){
                            var selfLi = $('.tabBox li:not(.ng-hide)').find('.detailReport');
                            selfLi[0] && selfLi[0].contentWindow.Dashboard.util.appResize();
                        },100)
                    }
                    
                }
                //展示导出收藏等
                $scope.showHandle = () => {
                    var activeObj = $rootScope.projectArr.filter(e => e.active);
                    if(activeObj[0] && activeObj[0].data.tab === 'detailReport'){
                        $('#panel1').show();
                    }
                }
                //yhn
                $scope.searchMe=(e)=>{
                    if($(".suffixList .active").length>0){
                        $scope.searchContent=$(".suffixList .active").text();
                    }
                    if(!$scope.searchContent || $scope.searchContent.length<0){
                        return;
                    }
                    $rootScope.blink = [];
                    $scope.pentadata = $rootScope.myFileTree;
                    loadSearchContent( $scope.searchContent, (data) => {
                        /*data里面是根据搜索内容返回来的搜索结果*/
                        dealWidthDisplayData(data);
                        findme(data,$scope.searchContent);
                        $rootScope.blink1=$rootScope.blink;
                        let pathParam = {
                            pathWindow: "searchResult",
                            pathName: "搜索"
                        };

                        /*tabHandleFactory.handle({
                          tab: 'searchResult', 
                          pluginName: '', 
                          pluginPath: '', 
                          pathParam: '', 
                          name: '搜索结果',
                          paramData: '搜索结果'
                        });*/
                        $state.go('searchResult');
                        $scope.$emit('fileWindowPath', pathParam);
                        $rootScope.nullName=$scope.searchContent;
                        $timeout(function(){
                            let searchNullNode =  document.querySelector(".searchContainer .searchNull");
                            /*通过判断结果列表的长度控制显示隐藏*/
                            if($rootScope.blink1.length == 0){
                                searchNullNode.classList.remove("hide");
                            }else{
                                searchNullNode.classList.add("hide");
                            }

                        },0);
                    });
                };
                $scope.focusEvent = () => {
                    document.querySelector(".yhn_search").style.backgroundColor = "white";
                    document.querySelector(".yhn_search").style.color = "black";
                    document.querySelector(".yhn_search1").style.backgroundColor = "white";
                    document.querySelector(".yhn_search1").style.color = "black";
                };

                $rootScope.blink = [];
                function generateRelativePath(path){
                    var temp = path.split("/");
                    temp.pop();
                    temp.push("");
                    var relaPath = temp.join("/");
                    relaPath = ""+relaPath;
                    return relaPath;
                }
                function generateIconClass(name){
                    var temp = name.split(".");
                    var iconClass = "";
                    switch(temp[temp.length-1]){
                        //仪表盘
                        case "wcdf":case 'xdf':iconClass="iconOfwcdf";break;
                        //即席查询classIcons
                        case "xwaqr":iconClass = "iconOfxwaqr";break;
                        //多位分析
                        case "saiku":iconClass = "iconOfsaiku";break;
                        //普通文件
                        case "html":iconClass = "iconOfCommonFile";break;
                        case "cda":iconClass = "iconOfCommonFile";break;
                        case "cdfde":iconClass = "iconOfCommonFile";break;
                        //报表
                        case "prpt":iconClass = "iconOfReport";break;
                        //数据门户
                        case "xdp":iconClass = "iconOfReport";break;
                        //普通文件
                        default :iconClass = "iconOfCommonFile";break;
                    }
                    if(temp.length==1){
                        //目录
                        iconClass = "iconOfdirectory";
                    }
                    return iconClass;
                }

                function transformFileType(file){
                    var name = file.name;
                    var temp = name.split(".");
                    var realname = "";
                    switch(temp[temp.length-1]){
                        case "wcdf":
                        case "xdf":
                            realname="仪表盘";break;
                        case "xwaqr":realname = "即席查询";break;
                        case "saiku":realname = "多维分析";break;
                        case "html":realname = "html文件";break;
                        case "cda":realname = "cda文件";break;
                        case "cdfde":realname = "cdfde文件";break;
                        case "prpt":realname = "报表";break;
                        case "xdp":realname = "数据门户";break;
                        default :realname = "普通文件";break;
                    }
                    if(temp[temp.length-1] && realname === '普通文件'){
                        realname = temp[temp.length-1] + '文件';
                    }
                    if(temp.length==1){
                        i++;
                        realname = "目录文件";
                    }else{
                        i++;
                    }
                    return realname;
                }
                function generateDisplayName(name){
                    var temp = name.split(".");
                    if(temp.length!=1){
                        temp.pop();
                    }
                    var realname = temp.join(".");
                    return realname;
                }
                var i=0;
                function dealWidthDisplayData(node){

                    if(node.file.name == "11"){
                        console.log("wtf");
                    }
                    //generate relative path
                    if(node.hasOwnProperty("children")){
                        if(node.file!=null){
                            //generate relative name
                            node.file.realPath = generateRelativePath(node.file.path).substring(0,generateRelativePath(node.file.path).lastIndexOf("\/"));
                            //generate fileType
                            node.file.fileType = transformFileType(node.file);
                            //generate displayName
                            node.file.realName = generateDisplayName(node.file.name);
                            //generate iconClass
                            node.file.classIcons = generateIconClass(node.file.name);
                            //generate amdMap
                            /*node.file.generated*/
                            ($scope.$parent.pluginConfig).map((d)=> {
                                if (d.name == '.' + node.file.name.split(".")[1]) {
                                    //cmdMap generated
                                    node.file.cmdMap = d.cmdMap;
                                    /*$scope.$on('canSchedule', (d, schedule)=> {
                                     data.folderList[i].file.schedule = (schedule && d.cmdMap.SCHEDULE_NEW);
                                     });*/
                                }
                            })
                        }
                        var childLength = node.children.length;
                        for(var i=0;i<childLength;i++){
                            dealWidthDisplayData(node.children[i]);
                        }
                    }else{
                        if(node.file!=null){
                            node.file.realPath = generateRelativePath(node.file.path).substring(0,generateRelativePath(node.file.path).lastIndexOf("\/"));
                            //generate fileType
                            node.file.fileType = transformFileType(node.file);
                            //generate displayName
                            node.file.realName = generateDisplayName(node.file.name);
                            //generate iconClass
                            node.file.classIcons = generateIconClass(node.file.name);
                            ($scope.$parent.pluginConfig).map((d)=> {
                                if (d.name == '.' + node.file.name.split(".")[1]) {
                                    //cmdMap generated
                                    node.file.cmdMap = d.cmdMap;
                                    /*$scope.$on('canSchedule', (d, schedule)=> {
                                     data.folderList[i].file.schedule = (schedule && d.cmdMap.SCHEDULE_NEW);

                                     });*/
                                }
                            })
                        }
                    }
                }
                function findme(node,alpha){
                    if (node.file.name.lastIndexOf(".")>0){
                        if(node.file.name.substring(0,node.file.name.lastIndexOf(".")).indexOf(alpha)>=0){
                            $rootScope.blink.push(node);
                        }
                    }else {
                        if(node.file.name.indexOf(alpha)>=0){
                            $rootScope.blink.push(node);
                        }
                    }

                    if(node.hasOwnProperty("children")){
                        var childLength = node.children.length;
                            for(var i=0;i<childLength;i++){
                                findme(node.children[i],alpha);
                            }
                    }
                }
                let loadSearchContent = (searchContent, callback) => {
                  var searchContent1 = encodeURI(searchContent);
                  $scope.$emit('loading',true);
                  $rootScope.globalLoading(true);
                  $http.get('/xdatainsight/api/repo/files/tree?showHidden='+($rootScope.ifhide?true:false)+'&filter=*'+searchContent1+'*|FILES&_='+new Date().getTime())
                     .success((response) => {
                        $scope.$emit('loading',false);
                        $rootScope.globalLoading(false);
                        if(!response) {
                          $rootScope.blink = [];
                          return '';
                        }
                        callback && callback(response);
                     })
                     .error((fail) => {

                     });
                }
                
                handleOthers.handle($scope);

                $scope.enterEvent = (e) => {
                    $rootScope.list=[];
                    //  enter
                    if(e.keyCode==13){

                        if($(".suffixList .active").length>0){
                            $scope.searchContent=$(".suffixList .active").text();
                        }
                        if(!$scope.searchContent || $scope.searchContent.length<0){
                            return;
                        }
                        $rootScope.blink = [];
                        $scope.pentadata = $rootScope.myFileTree;

                        loadSearchContent( $scope.searchContent, (data) => {
                          /*data里面是根据搜索内容返回来的搜索结果*/
                          dealWidthDisplayData(data);
                          findme(data,$scope.searchContent);
                          $rootScope.blink1=$rootScope.blink;
                          /*范湖最新的node*/
                          $rootScope.$broadcast("freshMySearchResult",$rootScope.blink1);

                          let pathParam = {
                              pathWindow: "searchResult",
                              pathName: "搜索"
                          };


                         // $state.go('searchResult');
                        tabHandleFactory.handle({
                            tab: 'searchResult', 
                            pluginName: '', 
                            pluginPath: '', 
                            pathParam: '', 
                            name: '搜索结果',
                            paramData: '搜索结果'
                        });
                          $scope.$emit('fileWindowPath', pathParam);
                          $rootScope.nullName=$scope.searchContent;
                          $timeout(function(){
                            let searchNullNode =  document.querySelector(".searchContainer .searchNull");
                            /*if(searchNullNode.hasOwnProperty("length")){
                                if(searchNullNode.length>0){
                                    $rootScope.blink1.length>0 ? searchNullNode.classList.add("hide") : searchNullNode.classList.remove("hide");
                                }
                            }*/
                            /*通过判断结果列表的长度控制显示隐藏*/
                            if(!searchNullNode) return ;
                            if($rootScope.blink1.length === 0 ){
                                searchNullNode.classList.remove("hide");
                            }else{
                                searchNullNode.classList.add("hide");
                            }

                          },0);
                        });

                    }
                };
                $scope.keyUpEvent=(e)=>{

                    //up
                    if(e.keyCode==38){
                        if($rootScope.list.length>0){
                            if($(".suffixList .active").length>0){
                                var that=$(".suffixList .active");
                                $(".suffixList .active").prev().addClass("active");
                                that.removeClass("active");
                            }else{}
                        }
                    }

                    //down
                    if(e.keyCode==40){
                        if($rootScope.list.length>0){
                            if($(".suffixList .active").length>0){
                                var that=$(".suffixList .active");
                                $(".suffixList .active").next().addClass("active");
                                that.removeClass("active");
                            }else{
                                $(".suffixList li:first").addClass("active");
                            }
                        }
                    }

                    if(e.keyCode!==13){
                        $rootScope.blink = [];
                        $scope.pentadata = $rootScope.myFileTree;
                        if($scope.pentadata){
                            dealWidthDisplayData($scope.pentadata[0]);
                            dealWidthDisplayData($scope.pentadata[1]);
                            /*$rootScope.blink.splice(0,$rootScope.blink);*/
                            findme($scope.pentadata[0],$scope.searchContent);
                            findme($scope.pentadata[1],$scope.searchContent);
                        }
                        $rootScope.list=$rootScope.blink;
                        if($rootScope.list.length<=0){
                            /*隐藏弹出列表*/
                            document.querySelector(".suffixList").style.display = "none";
                        }else{
                            /*显示弹出列表*/
                            document.querySelector(".suffixList").style.display = "block";
                        }
                        /*判断是否搜索内容为空*/
                        if($scope.searchContent && $scope.searchContent.length==0){
                            /*隐藏弹出列表*/
                            document.querySelector(".suffixList").style.display = "none";
                        }
                    }else{
                        $rootScope.list=[];
                        /*$rootScope.result=[];
                        $scope.result=[];*/
                        /*隐藏弹出列表*/
                        document.querySelector(".suffixList").style.display = "none";
                    }

                };
                //End yhn
                $scope.logOut = () => {
                    window.location.href="Logout";
                };
                //userGuide
                $scope.userGuide = () => {
                    window.location.href = "#welcome";
                    document.querySelector('div#yhnLoading').style.display="none";

                }
                $scope.modifyPassword = () => {
                    var modifyPasswordPanel = document.querySelector("#modifyPassword_yhn");
                    modifyPasswordPanel.style.display = "block";
                    document.querySelector('modify-password').classList.remove('popupHide');
                    /*reset*/
                    document.querySelector(".inputContent input").value = "";
                    document.querySelector(".newPassContent input").value = "";
                    document.querySelector(".checkPasswordContent input").value = "";
                    document.querySelector(".passCheckTips").innerHTML = "";
                    document.querySelector(".weak").style.background = "white";
                    document.querySelector(".middle").style.background = "white";
                    document.querySelector(".strong").style.background = "white";
                }

            }])
            .factory('handleOthers', ['$rootScope', '$state', '$http', 'tabHandleFactory',function($rootScope, $state, $http, tabHandleFactory){

                function handle(scope){
                    //收藏夹
                    scope.aCollection = () => {
                        tabHandleFactory.handle({
                              tab: 'collection', 
                              pluginName: '', 
                              pluginPath: '', 
                              pathParam: '', 
                              name: '收藏夹',
                              paramData: '收藏夹'
                            });
                    }
                    //最近打开
                    scope.aRecentReview = () => {
                         tabHandleFactory.handle({
                              tab: 'recentReview', 
                              pluginName: '', 
                              pluginPath: '', 
                              pathParam: '', 
                              name: '最近浏览',
                              paramData: '最近浏览'
                            });
                    }
                    //导出pdf
                    scope.pdf = () => {
                        var selfLi = $('.tabBox li:not(.ng-hide)').find('.detailReport');
                        if(selfLi && selfLi.length){
                            var iframeUrl = selfLi[0].contentWindow.location.href;
                            var last = iframeUrl.length;
                            var param = "";
                            if(iframeUrl.indexOf("?") > 0){
                                last = iframeUrl.indexOf("?");
                                param = encodeURI(iframeUrl.substr(iframeUrl.indexOf("?"),iframeUrl.length));
                            }
                            var code = iframeUrl.substring(iframeUrl.indexOf("repos")+6,last);
                            scope.iframeurl = "/xdatainsight/plugin/pdfexport/api/pdfjob?parampapersize="+$(window).width()+
                                "&paramurl="+window.location.origin+"/xdatainsight/api/repos/" + encodeURI(code).replace(/:/g, "%253A") + param;
                            window.open(scope.iframeurl);
                        }
                    };
                    //打印
                    scope.print = () => {
                        var selfLi = $('.tabBox li:not(.ng-hide)').find('.detailReport');
                        if(selfLi && selfLi.length){
                            selfLi[0].contentWindow.focus();
                            selfLi[0].contentWindow.print();
                        }
                    };
                    //导出为PDF
                    scope.pdfImport = ()=>{
                        var selfLi = $('.tabBox li:not(.ng-hide)').find('.detailReport');
                        //var $targetElem = selfLi[0].contentWindow.document.body;
                        var $targetElem = selfLi[0].contentWindow.document.body.getElementsByClassName("canvas")[0];
                        let fileName = document.body.querySelector(".navList .active").innerText;
                        let readBlobAsDataURL = (blob, callback)=>{
                            var a = new FileReader();
                            a.onload = function(e) {callback(e.target.result);};
                            a.readAsDataURL(blob);
                        }
    
                        selfLi[0].contentWindow.Dashboard.util
                            .downToPngPromise($targetElem, fileName)
                            .then((blob) =>{
                                readBlobAsDataURL(blob, function (dataurl){
                                    let canWidth = $targetElem.clientWidth;
                                    let canHeight =  $targetElem.clientHeight;
                                    let t = 'p';
                                    if(canWidth > canHeight){
                                        t = "l";
                                        canWidth = $targetElem.clientHeight;
                                        canHeight =  $targetElem.clientWidth;
                                    }
                                    let pdf = new jsPdfDebug(t, 'px',[canWidth,canHeight],true);
                                    let width = pdf.internal.pageSize.width;    
                                    let height = pdf.internal.pageSize.height;
                                    pdf.addImage(dataurl, 'JPEG', 0, 0, width, height,'','FAST');
                                    pdf.save(fileName + '.pdf');
                                });
                            });
                    }
                    //编辑
                    scope.edit = () => {
                        if(!$rootScope.editAble){
                            //获取当前打开文件对象
                            let thisOpenProject = $rootScope.projectArr.filter(obj => obj.active)[0];
                            let pathParam = 'editor';
                            tabHandleFactory.handle({
                              tab: 'operateEdit', 
                              pluginName: thisOpenProject.data.pluginName, 
                              pluginPath: thisOpenProject.data.pluginPath, 
                              pathParam: pathParam, 
                              name: '编辑_' + thisOpenProject.name,
                              paramData: thisOpenProject.data.pluginPath + '.' + thisOpenProject.data.pluginName
                            });
                        }else{
                            tips("无法编辑该类型报表");
                        }
                    };

                    //分享
                    scope.share = ()=>{
                      let data = {};

                      const name = $rootScope.d.name;
                      const path = $rootScope.d.path;
                      // 获取快照的url
                      const getUrl = `/xdatainsight/api/repo/files/snapshoot?filePath=${path}`;

                      // 判断是否已经创建了快照

                      $http({
                        method: "get",
                        headers: {Accept: "application/json"},
                        url: getUrl,
                      }).then(function (res) {
                        const id = res.data.id;
                        const expiryDate = res.data.expiryDate;
                        const snapshotPath = res.data.path;
                        const origin = window.location.origin;
                        const link = `${origin}/xdatainsight/content/dashboard-v3/index.html#path=${snapshotPath}&type=3`;
                        if(id !=="" && path !=="") {
                          //能够拿到快照的id和path,说明已经创建
                          data = {
                            snap:true,
                            name: name,
                            link: link,
                            snapId: id,
                            term: expiryDate
                          };

                          $rootScope.$broadcast('XDT_SHARE',data);

                        }else {
                          //未创建的情况下,显示创建弹窗
                          data = {
                            snap:false,
                          };
                          $rootScope.$broadcast('XDT_SHARE',data);

                        }
                      },function (err) {
                        console.log(err);
                      });

                    }

                    //收藏
                    scope.collect = ($event)=> {
                        // var dataUrl = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAgAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAECAaQDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD3+iiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAEqhqmppp0Q43yt91f6mtCuO16Qvq0gJyEAUfTGf615+Y4mWHoc0d9gGS61fyvu88qM5AUYAq9p/iGUSiO8IdGOPMxgr/APWrBor5ilmGIhPm5mxnoY5papaS7SaXbswwdmPy4q7X2lOXPFS7iCiiirAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigCOWVIYmklYKi9STisp/ElmrkKszgfxBRg/mazfEV28l79mBIjiAJHqT3/Ksavncdm86dV06XQZ3FlqVtfKfJchxyUbgirlefQzSQTLLGxV1OQRXZ2+p2s0MbmeJXZQSpccH0rty/MViE1U0kvxEXqKarqwyrAj2NOr1LoAoorF1DX47WRoYE82QcMScAH+tZVsRToR5qjsgNqiuZh8TSh/30CFfVDgj86021yxW2WbzM7hwg+9n0I7VhSzDD1E2pbAadUrzVLWyBEkmX/uLya568166uiUhzCh7KfmP40tnoN1ckPN+5Q/3h8x/CuWeYzqvkwsbvv0Abd65d3ZKQ5iQ9An3j+NRjRb5rZpzFjHOw/eP4V09npttZD91Hlu7tyauVKyydb3sTO78tkB53yODVuwsJr+cJGCEB+ZyOFFdlJaW0r7pLeJ29WQE1KiLGoVFCqOgAwBWFLI0p3nK6GNhiWGFIk+6ihR9BUlFFe+kkrIQUUUUwCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKimuIbdd00qRj/aOM1FDqFncMFiuI2Y8Bc4P5Vm6kE+VvUC1RSe9Zd7r1ra5WM+dJ6L0H40qtanSjzTdkBqZA61lXuvWttlYz50nop4H41gz399qknljcQekcY4q/ZeHHbD3b7R/cXr+deXLHVsQ+XCx07sDGu7l7y6edwAz9QOnTFQ1276XZtaG38lVQ85HUH1z61lv4XUuSl0QvYMmT/OvNxGUYnm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X6KLisUP7E0r/oGWX/fhf8KtQwxW8QihiSONeiooAH4CpaKLsLIKKKKBhVa5sLO8Km5tIJyvTzYw2PzqzRQBQ/sTSf8AoGWX/fhf8KfDpen28olgsbaKQdGSJVI/ECrlFO7FZBRRRSGFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAf/9k=";
                        var selfData = $rootScope.projectArr.filter(el => el.active)[0].data;
                        var data = {
                            "fullPath": selfData.pluginPath+"."+selfData.pluginName,
                            "title": selfData.pluginPath.slice(selfData.pluginPath.lastIndexOf("/")+1),
                            "lastUse": new Date().getTime()
                            // "img": dataUrl
                        };
                        var ind = -1;
                        var thisObj = $rootScope.collection.find((e,i)=>{
                            var flag = false;
                            flag = e.fullPath === data.fullPath && e.title === data.title && (ind = i);
                            return flag;
                        });
                        if(thisObj){
                            $rootScope.collection.splice(ind,1);
                        }
                        $rootScope.collection.unshift(data);
                        $http({
                            method: 'post',
                            headers: {Accept: "application/json"},
                            url: "/xdatainsight/plugin/xdt/api/user-settings/favorites",
                            dataType: 'json',
                            data: $rootScope.collection
                        }).success((data)=> {
                            tips("收藏成功");
                            //$rootScope.$emit("ceshi", 1);
                            //fly($event);
                        }).error((data)=> {
                            tips("收藏失败，稍后再试");
                        });
                    };
                    //设置主页
                    scope.homePage = ($event) => {
                        var selfData = $rootScope.projectArr.filter(el => el.active)[0].data;
                        var data = {"home-path": selfData.pluginPath + "." + selfData.pluginName};
                        $http({
                            method: 'post',
                            headers: {Accept: "application/json"},
                            url: "/xdatainsight/api/user-settings/home-path",
                            dataType: 'json',
                            data: data
                        }).success((data)=> {
                            $rootScope.homeIndex = data;
                            //fly($event);
                            tips("主页设置成功");
                        }).error((data)=> {
                            tips("主页设置失败，请稍后再试");
                        });
                    };

                }
                return {
                    handle: handle
                };
            }])

}

