/**
 * Created by Administrator on 2016/5/10.
 */
import angular from 'angular';
import $ from 'jquery';
import userRole from '../../../lib/doc/userRole';
import roles from '../../../lib/doc/roles';
import singleRole from '../../../lib/doc/singleRole';
import './advancedSetting';
//import './taskPlan';
import './emailService';
import '../style/userRole.css';
import './component/userRole/userManage';
import './component/userRole/roleManage';
import './component/userRole/systemRole';
{
    "use strict";
    const template = require('./../pages/userRole.html');
    angular.module('xdt/optimised',['popup/userRole','popup/emailService','popup/advancedSetting'])
        .directive('userRole',()=>{
            return {
                restrict: 'E',
                template: template,
                link(){
                    function init(){
                        document.querySelector(".tabChoose>li:nth-child(1)").className = "tabChoosed";
                        document.querySelector(".tabChoose>li:nth-child(2)").className = "tabUnChoosed";
                        document.querySelector(".tabChoose>li:nth-child(3)").className = "tabUnChoosed";
                        document.querySelector(".tabContent>li:nth-child(1)").style.display = "block";
                        document.querySelector(".tabContent>li:nth-child(2)").style.display = "none";
                        document.querySelector(".tabContent>li:nth-child(3)").style.display = "none";
                    }
                    init();
                    //cancel
                    document.getElementsByClassName("btnSubmit")[0].onclick = function(){
                        //hide popup background
                        document.querySelector('.popup').style.display="none";
                        //add hide css to user-role
                        document.querySelector('.popup user-role').classList.add('popupHide');
                    }
                    //tab and tabcontent control
                    //tab1 base click
                    document.querySelector(".tabChoose>li:nth-child(1)").onclick = function(){
                        document.querySelector(".tabChoose>li:nth-child(1)").className = "tabChoosed";
                        document.querySelector(".tabChoose>li:nth-child(2)").className = "tabUnChoosed";
                        document.querySelector(".tabChoose>li:nth-child(3)").className = "tabUnChoosed";
                        document.querySelector(".tabContent>li:nth-child(1)").style.display = "block";
                        document.querySelector(".tabContent>li:nth-child(2)").style.display = "none";
                        document.querySelector(".tabContent>li:nth-child(3)").style.display = "none";
                    }
                    //tab2 base click
                    document.querySelector(".tabChoose>li:nth-child(2)").onclick = function(){
                        document.querySelector(".tabChoose>li:nth-child(2)").className = "tabChoosed";
                        document.querySelector(".tabChoose>li:nth-child(1)").className = "tabUnChoosed";
                        document.querySelector(".tabChoose>li:nth-child(3)").className = "tabUnChoosed";
                        document.querySelector(".tabContent>li:nth-child(2)").style.display = "block";
                        document.querySelector(".tabContent>li:nth-child(1)").style.display = "none";
                        document.querySelector(".tabContent>li:nth-child(3)").style.display = "none";
                    }
                    //tab3 base click
                    document.querySelector(".tabChoose>li:nth-child(3)").onclick = function(){
                        document.querySelector(".tabChoose>li:nth-child(3)").className = "tabChoosed";
                        document.querySelector(".tabChoose>li:nth-child(1)").className = "tabUnChoosed";
                        document.querySelector(".tabChoose>li:nth-child(2)").className = "tabUnChoosed";
                        document.querySelector(".tabContent>li:nth-child(3)").style.display = "block";
                        document.querySelector(".tabContent>li:nth-child(1)").style.display = "none";
                        document.querySelector(".tabContent>li:nth-child(2)").style.display = "none";
                    }
                    //show add user box and reset style
                    document.getElementsByClassName("addUser")[0].onclick = function(){
                        // 显示二级遮罩
                        $(".secondShelter").show();

                        document.getElementsByClassName("addNewUserItem1")[0].style.display = 'block';
                        document.getElementsByClassName("addNewUserItem2")[0].style.display = 'block';
                        document.getElementsByClassName("addNewUserItem3")[0].style.display = 'block';

                        document.getElementsByClassName("inputNewUser")[0].value = "";
                        document.getElementsByClassName("inputNewPassword")[0].value = "";
                        document.getElementsByClassName("inputCheckNewPassword")[0].value = "";
                        document.getElementsByClassName("userNameTips")[0].innerHTML = "";
                        document.getElementsByClassName("userPasswordTips")[0].innerHTML = "";

                        document.getElementsByClassName("inputNewUser")[0].style.borderColor = "#d9d9d9";
                        document.getElementsByClassName("inputNewPassword")[0].style.borderColor = "#d9d9d9";
                        document.getElementsByClassName("inputCheckNewPassword")[0].style.borderColor = "#d9d9d9";
                        document.getElementsByClassName("addNewUser")[0].style.display = "block";
                        document.getElementsByClassName("inputNewUser")[0].focus();
                    }
                    //hide add user box
                    document.getElementsByClassName("addNewUserFalse")[0].onclick = function(){
                        //隐藏遮罩
                        $(".secondShelter").hide();
                        document.getElementsByClassName("addNewUser")[0].style.display = "none";
                    }
                      document.getElementsByClassName("addNewUserFalse")[1].onclick = function(){
                        //隐藏遮罩
                        $(".secondShelter").hide();
                        document.getElementsByClassName("addNewUser")[0].style.display = "none";
                      }
                    //show up delete panel
                    document.querySelector(".deleteUser").onclick = function(){
                        //显示二级弹窗
                        $(".secondShelter").show();
                        var flag=false;
                        var chooseUserLength = document.querySelector(".chooseUser").options.length;
                        for(var i=0;i<chooseUserLength;i++){
                            if(document.querySelector(".chooseUser").options[i].selected){
                                flag=true;
                                break;
                            }
                        }
                        if(flag==true){
                            document.querySelector(".deleteOldUser").style.display = "block";
                        }else {
                          $(".secondShelter").hide();
                        }
                    }
                    //hide delete panel
                    document.getElementsByClassName("deleteOldUserFalse")[0].onclick = function(){
                        $(".secondShelter").hide();
                        document.getElementsByClassName("deleteOldUser")[0].style.display = "none";
                    }
                    document.getElementsByClassName("deleteOldUserFalse")[1].onclick = function(){
                        $(".secondShelter").hide();
                        document.getElementsByClassName("deleteOldUser")[0].style.display = "none";
                    }
                    //show up add role panel
                    document.querySelector(".addRole").onclick = function(){
                        // 添加二级遮罩
                        $(".secondShelter").show();
                        document.querySelector(".addNewRoleItem").style.display = 'block';
                        document.querySelector(".inputNewRole").value="";
                        document.querySelector(".roleNameNulTips").innerHTML = "";
                        document.querySelector(".addNewRole").style.display = "block";
                        document.querySelector(".inputNewRole").style.borderColor = "#d9d9d9";
                        document.querySelector(".inputNewRole").focus();
                    }
                    //hide add role panel
                    document.getElementsByClassName("addNewRoleFalse")[0].onclick = function(){
                        $(".secondShelter").hide();
                        document.getElementsByClassName("addNewRole")[0].style.display = "none";
                    }
                    document.getElementsByClassName("addNewRoleFalse")[1].onclick = function(){
                        $(".secondShelter").hide();
                        document.getElementsByClassName("addNewRole")[0].style.display = "none";
                    }
                    //show up delete role panel
                    document.querySelector(".deleteRole").onclick = function(){
                        //添加二级遮罩
                        $(".secondShelter").show();
                        var flag = false;
                        var chooseRoleLength = document.querySelector(".chooseUser2").options.length;
                        for(var i=0;i<chooseRoleLength;i++){
                            if(document.querySelector(".chooseUser2").options[i].selected){
                                flag=true;
                                break;
                            }
                        }
                        if(flag==true){
                            document.querySelector(".deleteOldRole").style.display = "block";
                        }else {
                          $(".secondShelter").hide();
                        }
                    }
                    //hide delete role panel
                    document.getElementsByClassName("deleteOldRoleFalse")[0].onclick = function(){
                        $(".secondShelter").hide();
                        document.getElementsByClassName("deleteOldRole")[0].style.display = "none";
                    }
                    document.getElementsByClassName("deleteOldRoleFalse")[1].onclick = function(){
                        $(".secondShelter").hide();
                        document.getElementsByClassName("deleteOldRole")[0].style.display = "none";
                    }
                    //hide modify password
                    document.getElementsByClassName("modiPasswordFalse")[0].onclick = function(){
                        $(".secondShelter").hide();
                        document.getElementsByClassName("modifyPassword")[0].style.display = "none";
                    }
                    document.getElementsByClassName("modiPasswordFalse")[1].onclick = function(){
                        $(".secondShelter").hide();
                        document.getElementsByClassName("modifyPassword")[0].style.display = "none";
                    }
                }
            }
        })
        .provider("userRoleProvider",function(){
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
                        })
                        return deferred.promise;
                    }
                }
            }]
        })
        .controller("userRoleController",['$rootScope','$scope','userRoleProvider','$http',function($rootScope,$scope,userRoleProvider,$http){

            $scope.close = () => {
                //hide popup background
                document.querySelector('.popup').style.display="none";
                //add hide css to user-role
                document.querySelector('.popup user-role').classList.add('popupHide');
            }
            document.querySelector(".userRole>div").onclick = function(){
                var longArray = [];
                var postUrlString = "";
                //首先发送一个服务器认证管理提供者请求
                userRoleProvider.callItunes("/xdatainsight/api/system/authentication-provider")
                .then((data)=>{
                    if(data.authenticationType=="ldap"||data.authenticationType=="jdbc"){
                        //第三方模式
                        //更改tab切换样式
                        document.querySelector(".tabChoose>li:nth-child(1)").innerHTML = "";
                        document.querySelector(".tabChoose>li:nth-child(1)").style.width = "1px";
                        document.querySelector(".tabChoose>li:nth-child(2)").style.width = "calc(50% - 2px)";
                        document.querySelector(".tabChoose>li:nth-child(3)").style.width = "calc(50% - 2px)";
                        //tab初始化
                        document.querySelector(".tabChoose>li:nth-child(2)").className = "tabChoosed";
                        document.querySelector(".tabChoose>li:nth-child(3)").className = "tabUnChoosed";
                        document.querySelector(".tabContent>li:nth-child(1)").style.display = "none";
                        document.querySelector(".tabContent>li:nth-child(2)").style.display = "block";
                        document.querySelector(".tabContent>li:nth-child(3)").style.display = "none";
                        //隐藏添加删除按钮
                        document.querySelector(".roleDisplayPart>div>.addRole").style.display = "none";
                        document.querySelector(".roleDisplayPart>div>.deleteRole").style.display = "none";
                        //隐藏用户列表
                        document.querySelector(".roleManagerRight>div:nth-child(2)").style.display = "none";
                        $scope.$broadcast("thirdPart",true);
                        postUrlString = "/xdatainsight/api/userrolelist/roles";
                    }else{
                        $scope.$broadcast("thirdPart",false);
                        postUrlString = "/xdatainsight/api/userroledao/roles";
                    }

                    userRoleProvider.callItunes(postUrlString)
                        .then((data)=>{
                            longArray = data.roles;
                        }, (data)=>{
                        })
                },(data)=>{
                    console.log(data);
                })

                //设置初始化click监听事件
                $scope.initClickState = true;
                //设置基础密码
                document.querySelector(".userTxt").value = "**********";
                //get all roles

                userRoleProvider.callItunes("/xdatainsight/api/userroledao/users")
                 .then((data)=>{
                        //容错
                        if(!data || !data.users){
                            return;
                        }
                        var usersLength = data.users.length;
                        document.querySelector(".chooseUser").innerHTML = "";
                        for(var i=0;i<usersLength;i++){
                            var addOption = document.createElement("option");
                            var optionValue = data.users[i];
                            addOption.innerHTML = optionValue;
                            document.querySelector(".chooseUser").appendChild(addOption);
                        }
                        //set first user selected
                        document.querySelector(".chooseUser>option").selected = true;
                        //get first user's roles and display
                        var optionValue = document.querySelector(".chooseUser>option:nth-child(1)").innerHTML;
                        var currentUserName = optionValue;
                        userRoleProvider.callItunes("/xdatainsight/api/userroledao/userRoles?userName="+optionValue+ "&time" + new Date().getTime())
                        .then((data)=>{
                            if(data.roles!=undefined){/*if the user have any power then excute*/
                                if(data.roles.length){
                                    var rolesLength = data.roles.length;
                                    //get choosed roles
                                    var shortArray = data.roles;
                                    document.querySelector(".choosedSelect").innerHTML = "";
                                    for(var i=0;i<rolesLength;i++){
                                        var addOption = document.createElement("option");
                                        var optionValue = data.roles[i];
                                        addOption.innerHTML = optionValue;
                                        document.querySelector(".choosedSelect").appendChild(addOption);
                                    }
                                    //display user's unchoosed role
                                    //get all roles
                                    var differentArray = function(longArray,shortArray){
                                        var c = [];
                                        var longArrayLength = longArray.length;
                                        var shortArrayLength = shortArray.length;
                                        for(var i=0;i<longArrayLength;i++){
                                            var flag = false;
                                            for(var j=0;j<shortArrayLength;j++){
                                                if(longArray[i]==shortArray[j]){
                                                    flag=true;
                                                    break;
                                                }
                                            }
                                            if(flag==false){
                                                c.push(longArray[i]);
                                            }
                                        }
                                        return c;
                                    }
                                    //get different array and display them
                                    var c = differentArray(longArray,shortArray);
                                    var rolesLength = c.length;
                                    document.querySelector(".canChooseSelect").innerHTML = "";
                                    for(var i=0;i<rolesLength;i++){
                                        var addOption = document.createElement("option");
                                        var optionValue = c[i];
                                        addOption.innerHTML = optionValue;
                                        document.querySelector(".canChooseSelect").appendChild(addOption);
                                    }
                                }
                            }else{
                                document.querySelector(".choosedSelect").innerHTML = "";
                            }
                            //发送当前选中用户
                            $scope.$broadcast("yhnCurrentUser",currentUserName);
                            //第一次获取权限请求
                            $http({
                                method: 'get',
                                headers:{Accept: "application/json"},
                                url: "/xdatainsight/api/userroledao/getUserLimit?user="+currentUserName+"&time" +new Date().getTime(),
                                dataType: ''
                            }).success((data)=>{

                                //先判断是否为禁用
                                if(data.enable == "true"){
                                    //取消禁用打钩
                                    document.querySelector("#abandonCheck").checked = false;
                                    //判断是否为长期用户
                                    if(data.endDate == 253402271999000){
                                        //长期用户设置状态字体颜色和内容
                                        document.querySelector("#stateExpire").style.color = "green";
                                        document.querySelector("#stateExpire").innerHTML = "正常";
                                        //设置选择框内容
                                        $scope.$broadcast("expire",data);
                                        //设置选择框显示值
                                    }else if(data.expiredMilliseconds >= 0){
                                        $scope.$broadcast("expire",data);
                                        document.querySelector("#stateExpire").style.color = "green";
                                        document.querySelector("#stateExpire").innerHTML = "正常";
                                    }else if(data.expiredMilliseconds < 0){
                                        $scope.$broadcast("expire",data);
                                        document.querySelector("#stateExpire").style.color = "red";
                                        document.querySelector("#stateExpire").innerHTML = "已过期";
                                    }
                                }else if(data.enable == "false"){
                                    //被禁用
                                    //禁用打钩
                                    document.querySelector("#abandonCheck").checked = true;
                                    //设置状态字体颜色和内容
                                    document.querySelector("#stateExpire").style.color = "red";
                                    document.querySelector("#stateExpire").innerHTML = "已禁用";
                                    $scope.$broadcast("expire",data);
                                }
                            }).error((data)=>{
                                console.log("获取权限日期失败");
                            });
                        }, (data)=>{
                        })
                        //get first user's role
                        var firstValue = document.querySelector(".chooseUser>option").value;

                        //get each user's role
                        function refreshme(){
                            $(".chooseUser").on("click",function(e){
                                var target = $(".chooseUser option:selected")[0];
                                if(target){
                                    var optionValue = target.innerHTML;
                                    var myCurrentOptionUsername = optionValue;
                                    userRoleProvider.callItunes("/xdatainsight/api/userroledao/userRoles?userName="+optionValue + "&time" + new Date().getTime())
                                            .then((data)=>{
                                                if(data.roles!=undefined){/*if the user have any power then excute*/
                                                    var rolesLength = data.roles.length;
                                                    var shortArray = data.roles;
                                                    document.querySelector(".choosedSelect").innerHTML = "";
                                                    for(var i=0;i<rolesLength;i++){
                                                        var addOption = document.createElement("option");
                                                        var optionValue = data.roles[i];
                                                        addOption.innerHTML = optionValue;
                                                        document.querySelector(".choosedSelect").appendChild(addOption);
                                                    }
                                                }else{
                                                    document.querySelector(".choosedSelect").innerHTML = "";
                                                    var shortArray = [];
                                                }
                                                //then get all the roles
                                                //get all roles
                                                var differentArray = function(longArray,shortArray){
                                                    var c = [];
                                                    var longArrayLength = longArray.length;
                                                    var shortArrayLength = shortArray.length;
                                                    for(var i=0;i<longArrayLength;i++){
                                                        var flag = false;
                                                        for(var j=0;j<shortArrayLength;j++){
                                                            if(longArray[i]==shortArray[j]){
                                                                flag=true;
                                                                break;
                                                            }
                                                        }
                                                        if(flag==false){
                                                            c.push(longArray[i]);
                                                        }
                                                    }
                                                    return c;
                                                }
                                                //get different array and display them
                                                var c = differentArray(longArray,shortArray);
                                                var rolesLength = c.length;
                                                document.querySelector(".canChooseSelect").innerHTML = "";
                                                for(var i=0;i<rolesLength;i++){
                                                    var addOption = document.createElement("option");
                                                    var optionValue = c[i];
                                                    addOption.innerHTML = optionValue;
                                                    document.querySelector(".canChooseSelect").appendChild(addOption);
                                                }
                                                //发送当前选中用户
                                                $scope.$broadcast("yhnCurrentUser",myCurrentOptionUsername);
                                                //点击列表时获取权限请求
                                                $http({
                                                    method: 'get',
                                                    headers:{Accept: "application/json"},
                                                    url: "/xdatainsight/api/userroledao/getUserLimit?user="+myCurrentOptionUsername + "&time" +new Date().getTime(),
                                                    dataType: ''
                                                }).success((data)=>{
                                                    //先判断是否为禁用
                                                    if(data.enable == "true"){
                                                        //取消禁用打钩
                                                        document.querySelector("#abandonCheck").checked = false;
                                                        //判断是否为长期用户
                                                        if(data.endDate == 253402271999000){
                                                            //长期用户设置状态字体颜色和内容
                                                            document.querySelector("#stateExpire").style.color = "green";
                                                            document.querySelector("#stateExpire").innerHTML = "正常";
                                                            //设置选择框内容
                                                            $scope.$broadcast("expire",data);
                                                        }else if(data.expiredMilliseconds >= 0){
                                                            $scope.$broadcast("expire",data);
                                                            document.querySelector("#stateExpire").style.color = "green";
                                                            document.querySelector("#stateExpire").innerHTML = "正常";
                                                        }else if(data.expiredMilliseconds < 0){
                                                            $scope.$broadcast("expire",data);
                                                            document.querySelector("#stateExpire").style.color = "red";
                                                            document.querySelector("#stateExpire").innerHTML = "已过期";
                                                        }
                                                    }else if(data.enable == "false"){
                                                        //被禁用
                                                        //禁用打钩
                                                        document.querySelector("#abandonCheck").checked = true;
                                                        //设置状态字体颜色和内容
                                                        document.querySelector("#stateExpire").style.color = "red";
                                                        document.querySelector("#stateExpire").innerHTML = "已禁用";
                                                        $scope.$broadcast("expire",data);
                                                    }
                                                }).error((data)=>{
                                                    console.log("获取权限日期失败");
                                                });
                                            }, (data)=>{
                                            })
                                    
                                }
                            })
                            /*$(".chooseUser").on("click","option",function(e){

                                var optionValue = $(this)[0].innerHTML;
                                var myCurrentOptionUsername = optionValue;
                                userRoleProvider.callItunes("/xdatainsight/api/userroledao/userRoles?userName="+optionValue)
                                    .then((data)=>{
                                        if(data.roles!=undefined){
                                        //if the user have any power then excute
                                            var rolesLength = data.roles.length;
                                            var shortArray = data.roles;
                                            document.querySelector(".choosedSelect").innerHTML = "";
                                            for(var i=0;i<rolesLength;i++){
                                                var addOption = document.createElement("option");
                                                var optionValue = data.roles[i];
                                                addOption.innerHTML = optionValue;
                                                document.querySelector(".choosedSelect").appendChild(addOption);
                                            }
                                        }else{
                                            document.querySelector(".choosedSelect").innerHTML = "";
                                            var shortArray = [];
                                        }
                                        //then get all the roles
                                        //get all roles
                                        var differentArray = function(longArray,shortArray){
                                            var c = [];
                                            var longArrayLength = longArray.length;
                                            var shortArrayLength = shortArray.length;
                                            for(var i=0;i<longArrayLength;i++){
                                                var flag = false;
                                                for(var j=0;j<shortArrayLength;j++){
                                                    if(longArray[i]==shortArray[j]){
                                                        flag=true;
                                                        break;
                                                    }
                                                }
                                                if(flag==false){
                                                    c.push(longArray[i]);
                                                }
                                            }
                                            return c;
                                        }
                                        //get different array and display them
                                        var c = differentArray(longArray,shortArray);
                                        var rolesLength = c.length;
                                        document.querySelector(".canChooseSelect").innerHTML = "";
                                        for(var i=0;i<rolesLength;i++){
                                            var addOption = document.createElement("option");
                                            var optionValue = c[i];
                                            addOption.innerHTML = optionValue;
                                            document.querySelector(".canChooseSelect").appendChild(addOption);
                                        }
                                        //发送当前选中用户
                                        $scope.$broadcast("yhnCurrentUser",myCurrentOptionUsername);
                                        //点击列表时获取权限请求
                                        $http({
                                            method: 'get',
                                            headers:{Accept: "application/json"},
                                            url: "/xdatainsight/api/userroledao/getUserLimit?user="+myCurrentOptionUsername,
                                            dataType: ''
                                        }).success((data)=>{
                                            //先判断是否为禁用
                                            if(data.enable == "true"){
                                                //取消禁用打钩
                                                document.querySelector("#abandonCheck").checked = false;
                                                //判断是否为长期用户
                                                if(data.endDate == 253402271999000){
                                                    //长期用户设置状态字体颜色和内容
                                                    document.querySelector("#stateExpire").style.color = "green";
                                                    document.querySelector("#stateExpire").innerHTML = "正常";
                                                    //设置选择框内容
                                                    $scope.$broadcast("expire",data);
                                                }else if(data.expiredMilliseconds >= 0){
                                                    $scope.$broadcast("expire",data);
                                                    document.querySelector("#stateExpire").style.color = "green";
                                                    document.querySelector("#stateExpire").innerHTML = "正常";
                                                }else if(data.expiredMilliseconds < 0){
                                                    $scope.$broadcast("expire",data);
                                                    document.querySelector("#stateExpire").style.color = "red";
                                                    document.querySelector("#stateExpire").innerHTML = "已过期";
                                                }
                                            }else if(data.enable == "false"){
                                                //被禁用
                                                //禁用打钩
                                                document.querySelector("#abandonCheck").checked = true;
                                                //设置状态字体颜色和内容
                                                document.querySelector("#stateExpire").style.color = "red";
                                                document.querySelector("#stateExpire").innerHTML = "已禁用";
                                                $scope.$broadcast("expire",data);
                                            }
                                        }).error((data)=>{
                                            console.log("获取权限日期失败");
                                        });
                                    }, (data)=>{
                                    })
                            })*/
                        };
                        if($scope.initClickState == true){
                            refreshme();
                            $scope.initClickState = false;
                        }
                        $scope.$on("refreshClick",function(){
                            //解除原先事件绑定
                            $(".chooseUser>option").unbind("click");
                            refreshme();
                        });
                     /*end*/
                 }, (data)=>{
                 })

            }

        }])
}
