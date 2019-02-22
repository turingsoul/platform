import angular from 'angular';
import $ from 'jquery';
import './searchResult.css';
import "../../style/taskPlan.css";
import {tips} from '../../popup/dataSource/component/createModule/public';
import { forEach } from 'angular-ui-router';
import { setTimeout } from 'timers';


{

    angular.module('xdt/searchResult', [])
        .directive('searchResult', () => {
            return {
                restrict: 'E',
                template: require('./searchResult.html'),
                scope: {
                    propdata: '<',
                }
            }
        })
        .controller('searchResult', ['$scope', '$state', 'panelFactory', 'folderFactory','operateFactory','$http', '$rootScope', 'pageService', 'taskplanProvider', 'tabHandleFactory', 'recentFactory',
                                        ($scope, $state, panelFactory, folderFactory,operateFactory,$http, $rootScope, pageService, taskplanProvider, tabHandleFactory, recentFactory) => {
            //初始化数据
            $scope.all = false;
            $scope.ifSelected = false;
            $scope.result = $rootScope.blink1;
            $scope.fileListLoading = false;

            $rootScope.$on("removeMovedSearchItem",function(d,data){
                for(var i=0;i<$scope.result.length;i++){
                    if($scope.result[i].file.id == data){
                        $scope.result.splice(i,1);
                    }
                }
            })

            $rootScope.$on("freshMySearchResult",function(d,data){
                $scope.result = data;
            })

            $scope.selectedArray = {};//已选的array

            $scope.tree = false;//文件树

            $scope.order = 'file.fileType';//排序
            $scope.desc = true;

            $scope.processing = {//批量处理状态
                "action" :"" ,
                "title" : "",
                "pause" : false,
                "all" : 0,
                "left" : 0,
                "current" : "",
                "error" : false  
            };

            $scope.singleFile = {};//处理单项

            $scope.plan = {};//处理计划
            $scope.hours = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
            $scope.minutes = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09",
                "10", "11", "12", "13", "14", "15", "16", "17", "18", "19",
                "20", "21", "22", "23", "24", "25", "26", "27", "28", "29",
                "30", "31", "32", "33", "34", "35", "36", "37", "38", "39",
                "40", "41", "42", "43", "44", "45", "46", "47", "48", "49",
                "50", "51", "52", "53", "54", "55", "56", "57", "58", "59"
            ];

            if ($rootScope.nullName) {
                if ($rootScope.blink.length > 0) {
                    document.querySelector(".searchContainer .searchNull").classList.add("hide");
                } else {
                    document.querySelector(".searchContainer .searchNull").classList.remove("hide");
                }
            };

            $scope.checkAll = function(){
                $scope.selectedArray = {};
                if($scope.all){
                    for(let i = 0; i<$scope.result.length; i++){
                        $scope.result[i].file.fileChecked = true;
                        $scope.selectedArray[$scope.result[i].file.id] = $scope.result[i];
                        $scope.ifSelected = true;
                    }
                }else{
                    for(let i = 0; i<$scope.result.length; i++){
                        $scope.result[i].file.fileChecked = false;
                        $scope.ifSelected = false;
                    }
                } 
            };

            $scope.singleCheck = function(node){


                if(node.file.fileChecked){
                    $scope.selectedArray[node.file.id] = node;
                }else{
                    delete $scope.selectedArray[node.file.id];
                }

                /*每次重新整理*/


                if(Object.keys($scope.selectedArray).length){
                    $scope.ifSelected = true;
                }else{
                    $scope.ifSelected = false;
                }
            };

            //批量操作
            $scope.batch = function(action){
                $("#positionChoose1").empty();
                if(action == "copy" || action == "move"){
                    $("#searchSection .copyTo").removeClass("hide"); 
                    if($rootScope.myFileTree){
                        var et = new Tree($rootScope.myFileTree, 'positionChoose1');
                    }else{
                        getFile('positionChoose1');
                    }
                }else{
                    $("#searchSection .alert").removeClass("hide"); 
                    $scope.deleteSingle = false;
                }
                initProcessing(action);
                $scope.singleFile = {};
            };
            //发送批量操作请求
            $scope.sendMultiCopy = function(){
                var targetPath  = "";
                switch($scope.processing.action){
                    case "copy" :
                        targetPath = "/xdatainsight/api/repo/files/"+encodeURI($(".copyTo .targetPath").text().split("/").join(":")).split(":").join("%3A")+"/children?mode=2";
                        $("#searchSection .copyTo").addClass("hide");
                        for(var item in $scope.selectedArray){
                            if(!$scope.processing.pause){
                                $scope.processing.current = $scope.selectedArray[item].file.name;
                                panelFactory.copyTo(item, targetPath)
                                .then((data)=>{
                                    $scope.processing.left--;
                                },(data)=> {
                                    $scope.processing.error = true;
                                    $scope.processing.pause = true;
                                });
                            }
                        }
                        break;
                    case "move" :

                        targetPath = "/xdatainsight/api/repo/files/"+encodeURI($(".copyTo .targetPath").text().split("/").join(":")).split(":").join("%3A")+"/move";
                        $("#searchSection .copyTo").addClass("hide");
                        for(var item in $scope.selectedArray){
                            if(!$scope.processing.pause){
                                $scope.processing.current = $scope.selectedArray[item].file.name;
                                panelFactory.moveTo(item, targetPath)
                                .then((data)=>{
                                    //将文件删除

                                    $rootScope.$broadcast("removeMovedSearchItem",$scope.selectedArray[item].file.id);
                                    $scope.processing.left--;
                                },(data)=> {
                                    $scope.processing.error = true;
                                    $scope.processing.pause = true;
                                });
                            }
                        }
                        break;
                    case "delete":
                        targetPath = "/xdatainsight/api/repo/files/delete";
                        $("#searchSection .alert").addClass("hide");
                        for(var item in $scope.selectedArray){
                            if(!$scope.processing.pause){
                                $scope.processing.current = $scope.selectedArray[item].file.name;
                                let deleteIt = (item)=>{
                                    panelFactory.delete(item, "/xdatainsight/api/repo/files/delete")
                                    .then((data)=>{
                                        $scope.processing.left--;
                                        for(var i = $scope.result.length-1; i>-1; i--){
                                            if($scope.result[i].file.id === item){
                                                $scope.result.splice(i,1);
                                                delete $scope.selectedArray[item];
                                            }
                                        }   
                                    },(data)=> {
                                        $scope.processing.error = true;
                                        $scope.processing.pause = true;
                                    });
                                };
                                deleteIt(item);
                            }
                        }
                    default:
                        break; 
                }
                $("#searchSection .durationTipCopy").removeClass("hide"); 
            };
            //取消批量操作
            $scope.closeMultiCopy = function(){
                $scope.processing.action == "delete" ? $("#searchSection .alert").addClass("hide") : $(".copyTo").addClass("hide"); 
            };
            //停止进程 取消批量操作
            $scope.pauseAndCancelCopy = function(){
                $scope.processing.pause = true;
                $("#searchSection .durationTipCopy").addClass("hide"); 
                reSearch();
            }; 
            //结束 关闭批量操作
            $scope.completeAndCloseCopy = function(){
                $("#searchSection .durationTipCopy").addClass("hide"); 
                reSearch();
            }; 
            /*文件管理排序*/
            $scope.itemSort = function(event,order,desc){
                /*if( $scope.order !== order || $scope.desc !== desc){
                    $(".searchTitle .orderBy").removeClass("orderBy");
                    $event.target.classList.add("orderBy");
                    $scope.order = order;
                    $scope.desc = desc;
                }else{
                    return;
                }*/
                var thisElement;
                var selfElement = $(event.target);
                thisElement = selfElement;
                //重新赋值
                if(selfElement[0].tagName==='A'){
                  thisElement = selfElement.parent();
                }
                $(".searchContainer .searchTitle a.up").css(
                  "border-bottom",
                  "5px solid #fff"
                );
                $(".searchContainer .searchTitle a.down").css(
                  "border-top",
                  "5px solid #fff"
                );
                //判断点击的内部元素
                if(selfElement[0].tagName === 'A' && !selfElement.hasClass('name')){
                  thisElement.attr("data-pointer", selfElement.attr("data-pointer"));
                }
                $scope.order = order;
                var fileIndex = thisElement.attr("data-pointer");
                if (fileIndex == 0 || fileIndex == 8 || !fileIndex) {
                  /*未排序的，排序，我们规定七上八下*/
                  thisElement.attr("data-pointer", 7);
                  thisElement.find("a.up").css("border-bottom", "5px solid #000");
                  thisElement.find("a.down").css("border-top", "5px solid #fff");
                  $scope.desc = false;
                } else if (fileIndex == 7) {
                  thisElement.attr("data-pointer", 8);
                  thisElement.find("a.up").css("border-bottom", "5px solid #fff");
                  thisElement.find("a.down").css("border-top", "5px solid #000");
                  $scope.desc = true;
                }
            }

            //初始化"处理中"的各参数
            function initProcessing(action){
                $scope.processing = {
                    "action" : action,
                    "title" : "",
                    "all" : Object.keys($scope.selectedArray).length,
                    "left" :  Object.keys($scope.selectedArray).length,
                    "pause" : false,
                    "current" : "",
                    "error" : false
                };

                if(action == "copy"){
                    $scope.processing.title = "复制"; 
                }else if(action == "move"){
                    $scope.processing.title = "移动"; 
                }else{
                    $scope.processing.title = "删除"; 
                }
            }
            
            function reSearch(){
            }

            //新开窗口
            $scope.newWindowOpen = (node)=> {
                panelFactory.newWindowOpen(node);
            };

            //编辑
            $scope.editFile = param => {
                let pluginName1 = param.file.path.split("."),pluginName=[];
                let len = pluginName1.length,
                    ppa = pluginName1.splice(len - 1,1);
                pluginName.push(pluginName1.join('.'),ppa[0]);
                tabHandleFactory.handle({
                  tab: "operateEdit",
                  pluginName: pluginName[1],
                  pluginPath: pluginName[0],
                  pathParam: param.file.cmdMap.EDIT,
                  name: "编辑_" + pluginName[0].split("/").pop(),
                  paramData: pluginName[0] + "." + pluginName[1]
                });
              };

            //文件 重命名
            $scope.renameFile = (node, $event)=> {
              document.querySelector('.addMask1').style.display = 'block';
                $('#searchSection .renamePopup').show();
                $scope.singleFile.nodeFile = node.file;
                $scope.singleFile.oldName =  $event.target.attributes["fileName"].value;
            };
            $scope.removePopup = ()=> {
                document.querySelector('.addMask1').style.display = 'none';
                $('#searchSection .renamePopup').hide();
                $("#searchSection .renamePopup .renameTips").addClass('hiddenTips');
            };

            function showErrorMsg(message){
                let $error = $("#searchSection .renamePopup .renameTips");
                $error.text(message).removeClass("hiddenTips");
            }
            
            function hideErrorMsg(){
                let $error = $("#searchSection .renamePopup .renameTips");
                $error.text('').addClass("hiddenTips");
            }

            $scope.renameInputKeyup = ()=>{
                hideErrorMsg();
            }

            $scope.renameRequest = ()=> {
                let newName = $('#searchSection .renamePopup .renameInput').val();
                newName = $.trim(newName);
                if(newName===''){
                    showErrorMsg('名字不能为空');
                    return;
                }
                if(/[\\/:;\?\+#%&\*\|\[\]]+/.test(newName)){
                    showErrorMsg('名字不能包含下列字符：\\/:;?+#%&*|[]');
                    return;
                }
                panelFactory.renameRequest($scope.singleFile.oldName, $scope.singleFile.nodeFile.path)
                    .then((data)=>{
                        document.querySelector('.addMask1').style.display = 'none';
                        $('#searchSection .renamePopup').hide();
                        for(var i in $scope.result){
                            if($scope.result[i].file.id === $scope.singleFile.nodeFile.id){
                                $scope.result[i].file.path = $scope.result[i].file.path.replace($scope.result[i].file.realName ,$scope.singleFile.oldName);
                                $scope.result[i].file.name =  $scope.singleFile.oldName;
                            }
                        };
                    },(data)=> {
                        showErrorMsg('你没有权限重命名该文件，或目标名称已存在');
                        // $("#searchSection .renamePopup .renameTips").removeClass('hiddenTips');
                    });
            };

            //下载
            $scope.downloadFile = (node)=>{
                panelFactory.downloadFile(node); 
            }

            //删除单个
            $scope.deleteFile = (node)=>{
                $scope.processing.action = "delete";
                $scope.singleFile.deleteSingle = node;
                $("#searchSection .alert").removeClass("hide"); 
            }
            
            /*控制文件name颜色*/
            $scope.color = (x)=> {
                var arr = ["saiku", "wcdf", "adhoc", "html", "prpt", "pdf", "xwaqr",'xdf',"xdp"];
                var item = x.substring(x.lastIndexOf(".") + 1, x.length);
                if($rootScope.typeWhiteList.indexOf(item) > -1 || /jpg|png|gif|bmp|jpeg/i.test(item)){
                    return "fileName blue";
                }else{
                    return "fileName"; 
                }
            };

            $scope.deleteSingle = ()=>{
                $("#searchSection .alert").addClass("hide");
                panelFactory.delete($scope.singleFile.deleteSingle.file.id, "/xdatainsight/api/repo/files/delete")
                    .then((data)=>{
                        var deleteObj;
                        for(var i in $scope.result){
                            if($scope.result[i].file.id === $scope.singleFile.deleteSingle.file.id){
                                deleteObj = $scope.result.splice(i,1);
                            }
                        };
                        if(deleteObj && deleteObj[0]){
                            var _deleteObj = $.extend(true,{},deleteObj[0].file);
                            _deleteObj.fullPath = _deleteObj.path;
                            recentFactory.deleteXhr(_deleteObj,'/xdatainsight/plugin/xdt/api/user-settings/recent/delete');
                            recentFactory.deleteXhr(_deleteObj,'/xdatainsight/plugin/xdt/api/user-settings/favorites/delete');
                        }
                    });
            }
            /*直接点击打开文件*/
            $scope.reportOpenSearch = (node)=> {
                $rootScope.$emit("editor", node);
                panelFactory.reportOpen(node, $state);
            };
            //使用ymx的方法实现跳转定位
            $scope.$on("redirectYMX",function(node){
                $scope.jumpToFileManagement(node);
            });

            $scope.jumpToFileManagement =(node)=>{
                //跳转到文件管理页面
                let type = "fileManagement";
                tabHandleFactory.handle({
                    tab:type, 
                    pluginName: '', 
                    pluginPath: '', 
                    pathParam:'',
                    name:{taskPlan: 'taskPlan',fileManagement:'文件管理'}[type],
                    paramData: {taskPlan: 'taskPlan',fileManagement:'文件管理'}[type]
                });
                
                setTimeout(function(){
                    //这里设置settimeout为了要tab打开再进行下一步
                    $rootScope.$emit("jumpToFile",{id : node.file.id});
                }, 1000);
            };
    
            //属性
            $scope.openProperty= (node)=>{
                document.querySelector('.addMask1').style.display = 'block';
                $scope.singleFile = node;
                $scope.singleFile.position = node.file.path.substring(0,node.file.path.lastIndexOf("\/"));
                node.file.hidden === "true" ? $scope.singleFile.fileHiden = true : $scope.singleFile.fileHiden = false;
                $scope.singleFile.readAble = true;

                $("#searchSection .commonBox").css("display","block"); 

                $("#searchSection .selectProperty li").click(function () {
                    $(this).addClass("active").siblings().removeClass("active");
                    $(".item").hide();
                    $(".item"+$(this).index()).show();
                });

                folderFactory.getInfoAjax('/xdatainsight/api/repo/files/'+node.file.path+'/acl?random='+ $.now(),'get')
                    .then((data)=>{
                        data.entriesInheriting  === "true" ? $scope.singleFile.inherit = true : $scope.singleFile.inherit = false;
                        $scope.singleFile.shareData = data;
                        $scope.getUserName(data.aces[0]);
                    },(data)=>{
                    })
            };
            //关闭属性
            $scope.folderOperateClose = ()=>{
                document.querySelector('.addMask1').style.display = 'none';
                $("#searchSection .commonBox").css("display","none"); 
            };
            //修改继承
            $scope.changeInhert = (e) =>{
                if ($scope.singleFile.position.length>0){
                    if (e){
                        operateFactory.operateRequest('/xdatainsight/api/repo/files/'+$scope.singleFile.position+'/acl?random='+ $.now(),'get')
                            .then((data)=>{
                                $scope.singleFile.allDisabled = true;
                                $scope.singleFile.deleteDisabled = true;
                                $scope.singleFile.writeDisabled = true;
                                $scope.singleFile.shareData.aces = data.aces;
                                $scope.singleFile.shareData.entriesInheriting = "true";
                                $scope.getUserName(data.aces[0]);
                            },(data)=>{
                            })
                    } else {
                        $scope.getUserName($scope.singleFile.selectName);
                    }
                } else {
                    $scope.singleFile.inherit = false;
                    tips("不能从文件夹继承权限 Not Found");
                }
            };
            //获取角色权限
            $scope.getUserName = (name)=>{
                $scope.singleFile.selectName = name;
                $scope.singleFile.canDelete = $scope.singleFile.selectName.modifiable;
                $scope.singleFile.ableName = name.recipient;
                for (var i = 0; i < $scope.singleFile.shareData.aces.length; i++){
                    if ($scope.singleFile.shareData.aces[i].recipient == name.recipient){
                        $scope.singleFile.modified = $scope.singleFile.shareData.aces[i];
                    }
                }
                $scope.getPermissions($scope.singleFile.selectName);
            };
            //角色列表
            $scope.roleBox = () =>{
                if ($scope.singleFile.inherit){
                    tips("继承目录权限，不可编辑");
                    return false;
                }
                operateFactory.operateRequest('/xdatainsight/api/userrolelist/permission-users','get')
                    .then((data)=>{
                        $scope.singleFile.usersName = $scope.filterRole(data.users);
                    },(data)=>{

                    })
                operateFactory.operateRequest('/xdatainsight/api/userrolelist/permission-roles','get')
                    .then((data)=>{
                        $scope.singleFile.rolesName = $scope.filterRole(data.roles);
                    },(data)=>{

                    })
                $(".roleBox").css("display","block");
            };
            //添加成员
            $scope.addRole = () =>{
                var Option1=$(".propertyUser option");
                var Option2=$(".propertyRole option");
                add(Option1,0);
                add(Option2,1);
                function add(e,num) {
                    for(var i=0;i<e.length;i++){
                        if(e[i].selected){
                            var add = {
                                modifiable:"true",
                                permissions:"0",
                                recipient:e[i].value,
                                recipientType:num
                            };
                            $scope.singleFile.shareData.aces.push(add);
                            angular.element(e[i]).remove();
                        }
                    }
                };
                $scope.closeRoleBox();
            };
            //移除成员
            $scope.removeRole = () =>{
                if ($scope.singleFile.canDelete === "true"){
                    var options = document.querySelectorAll(".item1 option");
                    for (var i = 0; i<options.length; i ++){
                        if (options[i].selected){
                            $scope.singleFile.shareData.aces.splice(i,1);
                        }
                    }
                }
            };
            //关闭角色列表
            $scope.closeRoleBox = () =>{
                $(".roleBox").css("display","none");
            };
            //更改属性
            $scope.propertyComplete = () =>{
                var stringKeyStringValueDto ={stringKeyStringValueDto : [{key: "_PERM_HIDDEN", value: $scope.singleFile.fileHiden.toString()}]};
                operateFactory.operateRequest('/xdatainsight/api/repo/files/'+$scope.singleFile.file.path+'/metadata','put',stringKeyStringValueDto)
                    .then((data)=>{
                        //refresh;
                        $scope.folderOperateClose();
                    },(data)=>{
                    })
                operateFactory.operateRequest('/xdatainsight/api/repo/files/'+$scope.singleFile.file.path+'/acl?random='+$.now(),'put',$scope.singleFile.shareData)
                    .then((data)=>{
                        tips("修改成功");
                        $scope.folderOperateClose();
                    },(data)=>{
                        if($scope.singleFile.file.folder == "true"){
                            tips("你没有权限修改目录属性，请联系管理员");
                        }else{
                            tips("你没有权限修改文件属性，请联系管理员");
                        }

                    })
            }
            //设置权限
            $scope.getPermissions = (data)=>{
                $scope.singleFile.allDisabled = false;
                if (data.permissions.length === 1){
                    if (data.permissions === "4"){
                        $scope.singleFile.allAble = true;
                        $scope.singleFile.writeAble = true;
                        $scope.singleFile.deleteAble = true;
                        $scope.singleFile.deleteDisabled = true;
                        $scope.singleFile.writeDisabled = true;
                    } else {
                        $scope.singleFile.allAble = false;
                        $scope.singleFile.writeAble = false;
                        $scope.singleFile.deleteAble = false;
                        $scope.singleFile.deleteDisabled = false;
                        $scope.singleFile.writeDisabled = false;
                    }
                } else {
                    if (data.permissions.length === 2){
                        $scope.singleFile.allAble = false;
                        $scope.singleFile.deleteAble = false;
                        $scope.singleFile.deleteDisabled = false;
                        $scope.singleFile.writeAble = true;
                        $scope.singleFile.writeDisabled = false;
                    }
                    if (data.permissions.length === 3){
                        $scope.singleFile.allAble = false;
                        $scope.singleFile.deleteAble = true;
                        $scope.singleFile.deleteDisabled = false;
                        $scope.singleFile.writeAble = true;
                        $scope.singleFile.writeDisabled = true;
                    }
                }
                if ($scope.singleFile.canDelete === "false" || $scope.singleFile.inherit ===true){
                    $scope.singleFile.allDisabled = true;
                    $scope.singleFile.deleteDisabled = true;
                    $scope.singleFile.writeDisabled = true;
                }
            };
            //过滤角色
            $scope.filterRole = (e) =>{
                for (var i = 0; i < $scope.singleFile.shareData.aces.length; i++){
                    if (e.indexOf($scope.singleFile.shareData.aces[i].recipient)>=0){
                        e.splice(e.indexOf($scope.singleFile.shareData.aces[i].recipient),1);
                    }
                }
                return e;
            };
        
            //计划 新建计划 选位置
            $scope.newPlan = (files)=> {
                document.querySelector('.addMask1').style.display = 'block';

                getFile('myFileTree1');
                $scope._taskplan = 'onlyone';
                $("#searchSection .fixedBox").removeClass("hide");
                $("#searchSection .fixedBox .editPlan").removeClass("hide");
                $scope.plan = {};

                $scope.plan.planFile = files;
                $scope.plan.planName = files.name;
               
                var currentDate = new Date();
                var currentTime = currentDate.getTime();
                taskplanProvider.callItunes("/xdatainsight/api/scheduler/blockout/hasblockouts?ts=" + currentTime)
                    .then((data)=> {
                        $scope.plan.hasblockouts = data;
                    }, (data)=> {

                    })
            };
            
            //新建计划 选时间
            $scope.showPlan = () => {
                $scope.plan.planPath = $("#searchSection .fixedBox .targetPath ").text();
                if (!$scope.plan.planPath) {
                    tips("选择一个路径");
                    return;
                }
                $scope.plan.myType = "onlyone";
                var date = new Date();
                $scope.plan.myHour = getHour(date.getHours());
                $scope.plan.myMinute = zero(date.getMinutes());
                $scope.plan.myHalf = date.getHours() > 12 ? "PM" : "AM";
                $scope.plan.myStartDate = zero(date.getFullYear()) + "-" + zero(date.getMonth() + 1) + "-" + zero(date.getDate());
                
                if ($scope.plan.hasblockouts == "false") {
                    $("search-result .planBox").addClass("hide");
                    $("search-result .mytaskPlan").removeClass("hide");
                    $scope._taskplan = 'onlyone';
                    /*var container = document.querySelectorAll(".mychoosedContent>div");
                    for (var i = 0; i < container.length; i++) {
                        container[i].style.display = "none";
                    }
                    document.querySelector(".searchResultList .mychoosedContent>.onlyone").style.display = "block";*/
                }
            };
            //生成时间选择器
            $("#searchSection .datePicker").datepicker({
                dateFormat: "yy-mm-dd"
            });
            //新建计划 选时间 改变模式
            $scope.changeOpt = (x) => {
                /*switch (x) {
                    case "onlyone":
                    case "week":
                        tagRed = false;
                        break;
                    case "second":
                    case "minutes":
                    case "hour":
                    case "day":
                    case "month":
                    case "year":
                        tagRed = true;
                        break;
                }
                var container = document.querySelectorAll(".searchResultList .mychoosedContent>div");
                for (var i = 0; i < container.length; i++) {
                    container[i].style.display = "none";
                }
                document.querySelector(".searchResultList .mychoosedContent>." + x + "").style.display = "block";*/
                $scope._taskplan = x;
                //初始值
                switch (x) {
                    case "onlyone":
                        break;
                    case "second":
                        $scope.plan.mySecond = 30;
                        break;
                    case "minutes":
                        $scope.plan.myMinutes = 1;
                        break;
                    case "hour":
                        $scope.plan.myHours = 1;
                        break;
                    case "day":
                        $scope.plan.myDay = 1;
                        break;
                    case "week":
                        break;
                    case "month":
                        $scope.plan.myMonth = 1;
                        break;
                    case "year":
                        $scope.plan.myYear = 1;
                        break;
                    case "taskplan":
                        break;
                }
            };
            //新建计划 发送email
            $scope.email = ()=> {
                /*if (tagRed) {
                    return;
                }*/
                document.querySelector('.ifEmail input').checked = true;
                panelFactory.isAuthenticated()
                    .then((data)=> {
                        if (data) {
                            $("search-result .mytaskPlan").addClass("hide");
                            $("search-result .sendMail").removeClass("hide");
                        }
                    }, (data)=> {
                        tips("删除失败，请稍后再试！")
                    });
            };
            
            //新建计划 验证数据
            $scope.checkout = ()=> {
                var startTime = $("#" + $scope.plan.myType).val() + "T" + ($scope.plan.myHalf == "PM" ? parseInt($scope.plan.myHour) + 12 : $scope.plan.myHour) + ":" + $scope.plan.myMinute + ":00.000+08:00";
                var endTime = $("#" + $scope.plan.myType + "end").val() ? $("#" + $scope.plan.myType + "end").val() + "T23:59:59.000+08:00" : null;
                var data;
                switch ($scope.plan.myType) {
                    case "onlyone":
                        data = {
                            simpleJobTrigger: {
                                endTime: null,
                                repeatCount: 0,
                                repeatInterval: 0,
                                startTime: startTime,
                                uiPassParam: "RUN_ONCE"
                            }
                        };
                        break;
                    case "second":
                        data = {
                            simpleJobTrigger: {
                                endTime: endTime,
                                repeatCount: -1,
                                repeatInterval: $scope.plan.mySecond,
                                startTime: startTime,
                                uiPassParam: "SECONDS"
                            }
                        };
                        break;
                    case "minutes":
                        data = {
                            simpleJobTrigger: {
                                endTime: endTime,
                                repeatCount: -1,
                                repeatInterval: $scope.plan.myMinutes * 60,
                                startTime: startTime,
                                uiPassParam: "MINUTES"
                            }
                        };
                        break;
                    case "hour":
                        data = {
                            simpleJobTrigger: {
                                endTime: endTime,
                                repeatCount: -1,
                                repeatInterval: $scope.plan.myHours * 3600,
                                startTime: startTime,
                                uiPassParam: "HOURS"
                            }
                        };
                        break;
                    case "day":
                        if ($scope.plan.myDay) {
                            data = {
                                simpleJobTrigger: {
                                    endTime: endTime,
                                    repeatCount: -1,
                                    repeatInterval: $scope.plan.myDay * 3600 * 24,
                                    startTime: startTime,
                                    uiPassParam: "DAILY"
                                }
                            };
                        } else {
                            data = {
                                complexJobTrigger: {
                                    daysOfWeek: ["1", "2", "3", "4", "5"],
                                    endTime: endTime,
                                    startTime: startTime,
                                    uiPassParam: "DAILY"
                                }
                            }
                        }
                        break;
                    case "week":
                        var obj = document.getElementsByName("myChecked");
                        var daysOfWeek = [];
                        for (var n in obj) {
                            if (obj[n].checked) {
                                daysOfWeek.push(obj[n].value);
                            }
                        }
                        data = {
                            complexJobTrigger: {
                                daysOfWeek: daysOfWeek,
                                endTime: endTime,
                                startTime: startTime,
                                uiPassParam: "WEEKLY"
                            }
                        };
                        break;
                    case "month":
                        if ($scope.plan.myMonth) {
                            data = {
                                complexJobTrigger: {
                                    daysOfMonth: [$scope.plan.myMonth],
                                    endTime: endTime,
                                    startTime: startTime,
                                    uiPassParam: "MONTHLY"
                                }
                            }
                        } else {
                            data = {
                                complexJobTrigger: {
                                    daysOfWeek: [$(".daysOfWeek").val()],
                                    endTime: endTime,
                                    startTime: startTime,
                                    uiPassParam: "MONTHLY",
                                    weeksOfMonth: [$(".weeksOfMonth").val()]
                                }
                            }
                        }
                        break;
                    case "year":
                        if ($scope.plan.myYear) {
                            data = {
                                complexJobTrigger: {
                                    daysOfMonth: [$scope.plan.myYear],
                                    endTime: endTime,
                                    monthsOfYear: [$(".monthsOfYear").val()],
                                    startTime: startTime,
                                    uiPassParam: "YEARLY"
                                }
                            }
                        } else {
                            data = {
                                complexJobTrigger: {
                                    daysOfWeek: [$(".daysOfWeek1").val()],
                                    endTime: endTime,
                                    monthsOfYear: [$(".monthsOfYear1").val()],
                                    startTime: startTime,
                                    uiPassParam: "YEARLY",
                                    weeksOfMonth: [$(".weeksOfMonth1").val()]
                                }
                            }
                        }
                        break;
                    case "taskplan":
                        break;
                }
                data.inputFile = $scope.plan.planFile.path;
                data.jobName = $scope.plan.planName;
                if ($scope.plan.emailTag) {
                    data.jobParameters = [
                        {name: "_SCH_EMAIL_TO", stringValue: $scope.plan.emails, type: "string"},
                        {name: "_SCH_EMAIL_CC", stringValue: "", type: "string"},
                        {name: "_SCH_EMAIL_BCC", stringValue: "", type: "string"},
                        {name: "_SCH_EMAIL_SUBJECT", stringValue: $scope.plan.emailsTitle || "", type: "string"},
                        {name: "_SCH_EMAIL_MESSAGE", stringValue: $scope.plan.emailMsn || "", type: "string"},
                        {name: "_SCH_EMAIL_ATTACHMENT_NAME", stringValue: $scope.plan.emailFileName || "", type: "string"}
                    ];
                } else {
                    data.jobParameters = [];
                }
                data.outputFile = $scope.plan.planPath;
                panelFactory.postJob(data)
                    .then((data)=> {
                        document.querySelector(".sendMail").classList.add("hide");
                        document.querySelector(".checkout").classList.remove("hide");
                    }, (data)=> {
                    });
            };
            //looklist
            $scope.lookList = ()=> {
                document.querySelector('.addMask1').style.display = 'none';
                $("search-result .sendMail").addClass("hide");
                $("search-result .checkout").removeClass("hide");
                $("search-result .fixedBox").addClass("hide");
                $("search-result .planBox").addClass("hide");

                let type = 'taskPlan';
                tabHandleFactory.handle({
                  tab:type, 
                  pluginName: '', 
                  pluginPath: '', 
                  pathParam:'',
                  name:{taskPlan: 'taskPlan',fileManagement:'文件管理'}[type],
                  paramData: {taskPlan: 'taskPlan',fileManagement:'文件管理'}[type]
                });
            };

            //关闭新建计划
            $scope.closePlanBox =()=>{
                document.querySelector('.addMask1').style.display = 'none';
                $("#searchSection .fixedBox").addClass("hide");
                $("#searchSection .planBox").addClass("hide");
            }
            $scope.preStep = (preStep, thisStep)=> {
                $("search-result ." + preStep + "").removeClass("hide");
                $("search-result ." + thisStep + "").addClass("hide");
            };
            //验证
            /*var tagRed = false;
            $scope.borderRed = ($event, e)=> {
                if (isNaN(e) || !e) {
                    $event.target.style.borderColor = "red";
                    tagRed = true;
                } else {
                    $event.target.style.borderColor = "#d8d8d8";
                    tagRed = false;
                }
            };*/
            $scope.borderRed = ($event, e, type)=> {
                if (isNaN(e) || !e) {
                    $event.target.style.borderColor = "red";
                    // tagRed = true;
                } else {
                    $event.target.style.borderColor = "#d8d8d8";
                    type && ($scope.plan[type] = e);
                    // tagRed = false;
                }
            };
            //day
            $scope.oneday = ()=> {
                $scope.plan.dayable = false;
                // tagRed = true;
                $scope.plan.myDay = $scope.plan.myDay || 1;
            };
            $scope.everyworkday = ()=> {
                $scope.plan.dayable = true;
                $scope.plan.myDay = "";
                // tagRed = false;
            };
            //month
            $scope.onemonth = ()=> {
                $scope.plan.monthable = false;
                $scope.plan.myMonth = $scope.plan.myMonth || 1;
                // tagRed = true;
            };
            $scope.everymonth = ()=> {
                $scope.plan.monthable = true;
                $scope.plan.myMonth = "";
                // tagRed = false;
            };
            //year
            $scope.oneyear = ()=> {
                $scope.plan.yearable = false;
                $scope.plan.myYear = $scope.plan.myYear || 1;
                // tagRed = true;
            };
            $scope.everyear = ()=> {
                $scope.plan.yearable = true;
                $scope.plan.myYear = "";
                // tagRed = false;
            };

            $rootScope.$on("myMenuFreshed",function(d,data){
                $rootScope.myFileTree = data;
            })
            //判断类型
            function judgeType(data){
                return Object.prototype.toString.call(data).slice(8,-1)
            }
            $scope.isInWhiteList = function(fileName){
              var suffix = '';
              var reg = /\.([^\.]+)$/;

              if(reg.test(fileName)){
                  suffix = fileName.match(reg)[1];
              }

              if(suffix && ($rootScope.typeWhiteList.indexOf(suffix) > -1 || /jpg|png|gif|bmp|jpeg/i.test(suffix))){
                  return true;
              }

              return false;
            }
            //判断后缀名
            $scope.Suffix = (x,tt) => {
                var arr = ["wcdf", "waqr", "saiku", "prpt", "xwaqr", "xdf","xdp"];
                var item = x.substring(x.lastIndexOf(".") + 1, x.length);
                var assignments = $rootScope._roleManage && $rootScope._roleManage.assignments,
                    _assignment,
                    isShow = false,
                    isShowEdit = false,
                    _assignmentObj = {logicalRoles:[],logicalRoles1:{}};
                if(judgeType(assignments) === 'Object'){
                  if(judgeType(assignments.logicalRoles) === 'String'){
                    _assignment = {
                      logicalRoles:[assignments.logicalRoles]
                    }
                  }else{
                    _assignment = assignments
                  }
                }
                if(judgeType(assignments) === 'Array'){
                  assignments.forEach(function(e,i){
                    judgeType(e.logicalRoles) === 'Array' ? 
                    e.logicalRoles.forEach(function(item,ii){
                      _assignmentObj.logicalRoles1[item] = '';
                    }) : (_assignmentObj.logicalRoles1[e.logicalRoles] = '')
                  });
                  for(var key in _assignmentObj.logicalRoles1){
                    _assignmentObj.logicalRoles.push(key);
                  }
                  _assignment = _assignmentObj;
                }
                _assignment && _assignment.logicalRoles.forEach(function(e,i){
                  e === 'org.pentaho.scheduler.manage' && (isShow = true);
                  e === 'org.pentaho.repository.create' && (isShowEdit = true);
                });
                if(!isShow && tt === 'filePlan'){
                  return isShow;
                }
                if(!isShowEdit && tt === 'edit'){
                  return isShowEdit;
                }
                if(arr.indexOf(item) > -1 && $rootScope.typeWhiteList.indexOf(item) > -1){
                    return true;
                }else{
                    return false;
                }

                if (arr.indexOf(item) == "-1") {
                    return false;
                } else {
                    return true;
                }
            };

            //require文件
            function getFile(tag) {
                $scope.fileListLoading = true;
                tag && $("#"+tag).empty();
                return panelFactory.fileTree()
                    .then((data)=> {
                        $rootScope.myFileTree = data.children;
                        var et = new Tree(data.children, tag);
                        $scope.fileListLoading = false;
                    }, (data)=> {
                        tips("错误，请重试");
                        $scope.fileListLoading = false;
                    });
            }
            //创建文件树
            function Tree(data, el) {
                this.app = function (par, tag) {
                    return par.appendChild(document.createElement(tag))
                };
                if(document.querySelector("#myFileTree1").innerHTML == ""){
                    this.create($('#' + el)[0], data)
                }

            }
            Tree.fn = Tree.prototype = {
                create: function (par, group) {
                    var host = this, length = group.length;
                    for (var i = 0; i < length; i++) {
                        if (group[i].file.name != "trash") {

                            if (group[i].file.folder == "false") continue;
                            var dl = this.app(par, 'DL'), dt = this.app(dl, 'DT'), dd = this.app(dl, 'DD');
                            dt.innerHTML = '<a href="javascript:void(0)">' + group[i].file.title + '</a>';
                            dt.path = group[i].file.path;
                            dt.group = group[i].children;
                            dt.className += "node-close";
                            dt.onclick = function (event) {
                                $scope.planPath = this.path;
                                var $thisTree = $(event.target).closest(".content");

                                $thisTree.find(".targetPath").text(this.path);
                                if ($thisTree.find(".active").length) {
                                    $thisTree.find(".active").removeClass("active");
                                }

                                if (!this.group) {
                                    if(this.className != "node-open"){
                                        this.className = "node-open active";
                                    }else{
                                        this.className = "node-close active";
                                    }
                                    return;
                                }
                                var dd = this.nextSibling;
                                if (!dd.hasChildNodes()) {
                                    if(dd.style.display == "block"){
                                        dd.style.display = "";
                                        this.className = "node-close active";
                                    }else if(dd.style.display == "") {
                                        var tag = this.group.some(function(ele,i,arr){
                                            if(ele.hasOwnProperty("children")){
                                                return true;
                                            }
                                            if(ele.file.folder == "true"){
                                                return true;
                                            }
                                            return false;
                                        })
                                        if(tag){
                                            host.create(dd, this.group);
                                            dd.style.display = "";
                                            this.className = "node-open active";
                                        }else{
                                            dd.style.display = "block";
                                            this.className = "node-open active";
                                        }

                                    }
                                } else {
                                    var set = dd.style.display == 'none' ? ['', 'node-open active'] : ['none', 'node-close active'];
                                    dd.style.display = set[0];
                                    this.className = set[1]
                                }
                            }
                        }
                    }
                }
            }
            //时间转换
            function getHour(e) {
                var data;
                if (e > 9) {
                    if (e > 12) {
                        data = "0" + (e - 12);
                    } else {
                        data = e;
                    }
                } else {
                    data = "0" + e;
                }
                return data.toString();
            }
            function zero(e) {
                var data;
                if (e > 9) {
                    data = e;
                } else {
                    data = "0" + e;
                }
                return data.toString();
            }
        }]);
}