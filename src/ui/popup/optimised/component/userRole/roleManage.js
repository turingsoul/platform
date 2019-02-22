/**
 * Created by Administrator on 2016/6/27.
 */
import angular from 'angular';
import $ from 'jquery';
import userRole from '../../../../../lib/doc/userRole';
import roles from '../../../../../lib/doc/roles';
import singleRole from '../../../../../lib/doc/singleRole';
{
    "use strict";
    angular.module('popup/userRole')
        .directive('roleManage',()=>{
            const template = require('./roleManage.html');
            return{
                restrict: 'E',
                template: template,
                link($scope){
                    /*tab2*/
                    document.querySelector(".jumpSelect11").onclick = function(){
                        $(".choosedSelect1").append($(".canChooseSelect1 option:selected"));
                    }
                    //select right to left
                    document.querySelector(".jumpSelect21").onclick = function(){
                        $(".canChooseSelect1").append($(".choosedSelect1 option:selected"));
                    }
                    //select left all to right
                    document.querySelector(".jumpSelect31").onclick = function(){
                        $(".choosedSelect1").append($(".canChooseSelect1").children());
                    }
                    //select right all to left
                    document.querySelector(".jumpSelect41").onclick = function(){
                        $(".canChooseSelect1").append($(".choosedSelect1").children());
                    }
                }
            }
        })
        .provider("roleManageProvider",function(){
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
        .factory("roleManageFactory",['$http',function($http){
            let service = [];
            service.createNewRole = (name) => {
                var url = "/xdatainsight/api/userroledao/createRole?roleName="+name;
                $http({
                    method: 'put',
                    headers:{contentType: "application/json; charset=utf-8"},
                    url: url,
                    dataType: 'json',
                    data: ''
                }).success((data)=>{
                }).error((data)=>{
                });
            }
            service.deleteRoles = (name) => {
                var nameLength = name.length;
                var nameString = "";
                var url = "/xdatainsight/api/userroledao/deleteRoles";
                for(var i=0;i<name.length;i++){
                    nameString = nameString+name[i]+"%09";
                }
                url = url+"?roleNames="+nameString;
                $http({
                    method: 'put',
                    headers:{contentType: "application/json; charset=utf-8"},
                    url: url,
                    dataType: 'json',
                    data: ''
                }).success((data)=>{
                }).error((data)=>{
                });
            }
            service.assignAllUserToRole = (name) => {
                var url = "/xdatainsight/api/userroledao/assignAllUsersToRole?roleName="+name;
                $http({
                    method: 'put',
                    headers:{contentType: "application/json; charset=utf-8"},
                    url: url,
                    dataType: 'json',
                    data: ''
                }).success((data)=>{
                }).error((data)=>{
                });
            }
            service.removeAllUserFromRole = (name) => {
                var url="/xdatainsight/api/userroledao/removeAllUsersFromRole?roleName="+name;
                $http({
                    method: 'put',
                    headers:{contentType: "application/json; charset=utf-8"},
                    url: url,
                    dataType: 'json',
                    data: ''
                }).success((data)=>{
                }).error((data)=>{
                });
            }
            service.assignUserToRole = (name,userList,userLength) => {
                var userNameString = "";
                for(var i=0;i<userLength;i++){
                    userList[i] = encodeURI(userList[i]);
                    userNameString += userList[i]+"%09";
                }
                var url = "/xdatainsight/api/userroledao/assignUserToRole?roleName="+name+"&userNames="+userNameString;
                $http({
                    method: 'put',
                    headers:{contentType: "application/json; charset=utf-8"},
                    url: url,
                    dataType: 'json',
                    data: ''
                }).success((data)=>{
                }).error((data)=>{
                });
            }
            service.removeUserFromRole = (name,userList,userLength) => {
                var userNameString = "";
                for(var i=0;i<userLength;i++){
                    userList[i] = encodeURI(userList[i]);
                    userNameString += userList[i]+"%09";
                }
                var url = "/xdatainsight/api/userroledao/removeUserFromRole?roleName="+name+"&userNames="+userNameString;
                $http({
                    method: 'put',
                    headers:{contentType: "application/json; charset=utf-8"},
                    url: url,
                    dataType: 'json',
                    data: ''
                }).success((data)=>{
                }).error((data)=>{
                });
            }
            service.modifyPower = (name,a) => {
                var findSecondName = function(b){
                    var returnName = "";
                    switch(b){
                        case "checkbox1":returnName = "org.pentaho.security.administerSecurity";break;
                        case "checkbox2":returnName = "org.pentaho.repository.execute";break;
                        case "checkbox3":returnName = "org.pentaho.repository.read";break;
                        case "checkbox4":returnName = "org.pentaho.scheduler.manage";break;
                        case "checkbox5":returnName = "org.pentaho.security.publish";break;
                        case "checkbox6":returnName = "org.pentaho.repository.create";break;
                        case "checkbox7":returnName = "org.pentaho.platform.dataaccess.datasource.security.manage";break;
                        default :
                    }
                    return returnName;
                }
                /*getAllCheck*/
                var checkListName = [];
                for(var i=1;i<=7;i++){
                    if(document.querySelector("#checkbox"+i).checked){
                        checkListName.push(findSecondName("checkbox"+i));
                    }
                }
                var url = "/xdatainsight/api/userroledao/roleAssignments";
                var data = {"assignments":[{"roleName":name,"logicalRoles":checkListName}]};
                $http({
                    method: 'put',
                    headers:{contentType: "application/json; charset=utf-8"},
                    url: url,
                    dataType: 'json',
                    data: data
                }).success((data)=>{
                }).error((data)=>{
                });
            }
            return service;
        }])
        .controller("roleManageController",['$scope','$http','roleManageProvider','roleManageFactory',function($scope,$http,roleManageProvider,roleManageFactory){
            /*modifyRolePower*/
            $(".roleManagerRight .authority>input").on("click",function(){
                var currentRole = $(".chooseUser2 option:selected")[0].innerHTML;
                 roleManageFactory.modifyPower(currentRole,this);
            });
            $scope._roleManageArr = {
                'org.pentaho.security.administerSecurity': 'authority0',
                'org.pentaho.repository.execute': 'authority1',
                'org.pentaho.repository.read': 'authority2',
                'org.pentaho.scheduler.manage': 'authority3',
                'org.pentaho.security.publish': 'authority4',
                'org.pentaho.repository.create': 'authority5',
                'org.pentaho.platform.dataaccess.datasource.security.manage': 'authority6'
            };
            /*getLogicalMap*/
            var showRoleAssignment = (name) => {
                /*reset*/
                var checkBoxs = document.querySelectorAll(".roleManagerRight>div>.controlList>.authority>input");
                for(var i=0;i<7;i++){
                    checkBoxs[i].checked = false;
                }
                roleManageProvider.callItunes("/xdatainsight/api/userroledao/logicalRoleMap")
                    .then((data)=>{
                        var roleListLength = data.assignments.length;
                        var choosedIndex = -1;
                        for(var i=0;i<roleListLength;i++){
                            if(data.assignments[i].roleName == name){
                                choosedIndex =i;
                                break;
                            }
                        }
                        if(choosedIndex!=-1){
                            if(!data.assignments[choosedIndex].hasOwnProperty("logicalRoles")){
                                /*dont have assignment and clear the assignment*/
                                var checkBoxs = document.querySelectorAll(".roleManagerRight>div>.controlList>.authority>input");
                                for(var i=0;i<7;i++){
                                    checkBoxs[i].checked = false;
                                }
                            }else{
                                /*judge if  String*/
                                var logicalRoleType = typeof(data.assignments[choosedIndex].logicalRoles);
                                if(logicalRoleType == "object"){
                                    var objectLength = data.assignments[choosedIndex].logicalRoles.length;
                                    for(var i=0;i<objectLength;i++){
                                        setChecked(data.assignments[choosedIndex].logicalRoles[i]);
                                    }
                                }else{
                                    setChecked(data.assignments[choosedIndex].logicalRoles);
                                }
                            }
                            if(data.assignments[choosedIndex].immutable == "true"){
                                var checkBoxs = document.querySelectorAll(".roleManagerRight>div>.controlList>.authority>input");
                                for(var i=0;i<7;i++){
                                    checkBoxs[i].disabled = true;
                                }
                            }else{
                                var checkBoxs = document.querySelectorAll(".roleManagerRight>div>.controlList>.authority>input");
                                for(var i=0;i<7;i++){
                                    checkBoxs[i].disabled = false;
                                }
                            }
                        }else{
                            var checkBoxs = document.querySelectorAll(".roleManagerRight>div>.controlList>.authority>input");
                            for(var i=0;i<7;i++){
                                checkBoxs[i].disabled = false;
                            }
                        }
                        $('.roleManagerRight .authority').hide();
                        //隐藏没有的权限
                        if(data.localizedRoleNames && data.localizedRoleNames.length){
                            data.localizedRoleNames.forEach(function(e){
                                $('.roleManagerRight .' + $scope._roleManageArr[e.roleName]).find('label').text(e.localizedName).end().show();
                            });
                        }

                    },(data)=>{

                    })
            }
            function setChecked(name){
                switch(name){
                    case "org.pentaho.security.administerSecurity":
                        document.querySelectorAll(".roleManagerRight>div>.controlList>.authority>input")[0].checked = true;break;
                    case "org.pentaho.repository.execute":
                        document.querySelectorAll(".roleManagerRight>div>.controlList>.authority>input")[1].checked = true;break;
                    case "org.pentaho.repository.read":
                        document.querySelectorAll(".roleManagerRight>div>.controlList>.authority>input")[2].checked = true;break;
                    case "org.pentaho.scheduler.manage":
                        document.querySelectorAll(".roleManagerRight>div>.controlList>.authority>input")[3].checked = true;break;
                    case "org.pentaho.security.publish":
                        document.querySelectorAll(".roleManagerRight>div>.controlList>.authority>input")[4].checked = true;break;
                    case "org.pentaho.repository.create":
                        document.querySelectorAll(".roleManagerRight>div>.controlList>.authority>input")[5].checked = true;break;
                    case "org.pentaho.platform.dataaccess.datasource.security.manage":
                        document.querySelectorAll(".roleManagerRight>div>.controlList>.authority>input")[6].checked = true;break;
                }
            }

            /*removeUserFromRole*/
            $scope.removeUsersFromRole = () => {
                var currentRole = $(".chooseUser2 option:selected")[0].innerHTML;
                var toAddUsers = $(".choosedSelect1 option:selected");
                var userLength = toAddUsers.length;
                var toAddUsersList = [];
                for(var i=0;i<userLength;i++){
                    toAddUsersList.push(toAddUsers[i].innerHTML);
                }
                $(".canChooseSelect1").append($(".choosedSelect1 option:selected"));
                /*add role */
                roleManageFactory.removeUserFromRole(currentRole,toAddUsersList,userLength);
            }
            /*addUserToRole*/
            $scope.addUserToRole = () => {
                var currentRole = $(".chooseUser2 option:selected")[0].innerHTML;
                var toAddUsers = $(".canChooseSelect1 option:selected");
                var userLength = toAddUsers.length;
                var toAddUsersList = [];
                for(var i=0;i<userLength;i++){
                    toAddUsersList.push(toAddUsers[i].innerHTML);
                }
                $(".choosedSelect1").append($(".canChooseSelect1 option:selected"));
                /*add role */
                roleManageFactory.assignUserToRole(currentRole,toAddUsersList,userLength);

            }
            /*remove all users from role*/
            $scope.removeAllUser = () => {
                var currentRole  = $(".chooseUser2 option:selected")[0].innerHTML;
                roleManageFactory.removeAllUserFromRole(currentRole);
            }
            /*assgin all users to role*/
            $scope.assignAllUser = () => {
                var currentRole  = $(".chooseUser2 option:selected")[0].innerHTML;
                roleManageFactory.assignAllUserToRole(currentRole);
            }
            //接受是否为第三方借口的标签
            $scope.ifThirdPart = false;
            $scope.$on("thirdPart",function(d,data){
                $scope.ifThirdPart = data;
                showRoleList();
            })
            var showRoleList = function(){
                if($scope.ifThirdPart == true || $scope.ifThirdPart == "true"){
                    var ifThirdUrl = "/xdatainsight/api/userrolelist/roles";
                }else{
                    var ifThirdUrl = "/xdatainsight/api/userroledao/roles";
                }
                //display all roles
                roleManageProvider.callItunes(ifThirdUrl)
                    .then((data)=>{
                        var rolesLength = data.roles && data.roles.length;
                        rolesLength || (rolesLength = 0);
                        $('.chooseUser2').html('');
                        // document.querySelector(".chooseUser2").innerHTML = "";
                        for(var i=0;i<rolesLength;i++){
                            var addOption = document.createElement("option");
                            var optionValue = data.roles[i];
                            addOption.innerHTML = optionValue;
                            document.querySelector(".chooseUser2").appendChild(addOption);
                        }
                        //roleAssignment
                        //getLogicalMap
                        var currentRole = $(".chooseUser2>option").html();
                        showRoleAssignment(""+currentRole);
                        /* =S add option's click eventListener*/
                        var _chooseUser2 = $(".chooseUser2");

                        _chooseUser2.data('isClick') !=='true' && $(".chooseUser2").on("click",function(){
                            /*get all roles*/
                            roleManageProvider.callItunes("/xdatainsight/api/userroledao/users")
                                .then((data)=>{
                                    $scope.longArray = data.users;
                                    /*get the all users*/
                                    var currentUser = $(".chooseUser2 option:selected")[0].innerHTML;
                                    showRoleAssignment(currentUser);
                                    roleManageProvider.callItunes("/xdatainsight/api/userroledao/roleMembers?roleName="+currentUser)
                                        .then((data)=>{
                                            if(data.users!=undefined){/*if the user have any power then excute*/
                                                var usersLength = data.users.length;
                                                $scope.shortArray = data.users;
                                                document.querySelector(".choosedSelect1").innerHTML = "";
                                                for(var i=0;i<usersLength;i++){
                                                    var addOption = document.createElement("option");
                                                    var optionValue = data.users[i];
                                                    addOption.innerHTML = optionValue;
                                                    document.querySelector(".choosedSelect1").appendChild(addOption);
                                                }
                                            }else{
                                                document.querySelector(".choosedSelect1").innerHTML = "";
                                                $scope.shortArray = [];
                                            }
                                            /*get different array and display them*/
                                            var c = differentArray($scope.longArray,$scope.shortArray);
                                            var usersLength = c.length;
                                            document.querySelector(".canChooseSelect1").innerHTML = "";
                                            for(var i=0;i<usersLength;i++){
                                                var addOption = document.createElement("option");
                                                var optionValue = c[i];
                                                addOption.innerHTML = optionValue;
                                                document.querySelector(".canChooseSelect1").appendChild(addOption);
                                            }

                                        },(data)=>{
                                        });
                                },(data)=>{
                                });

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
                        }) && _chooseUser2.data('isClick','true');
                        /* =E add option's click eventListener*/
                        /*set first user selected*/
                        var chooseUser2option = document.querySelector(".chooseUser2>option");
                        chooseUser2option && (chooseUser2option.selected = true);
                        /*get first roles's allUser and user*/
                        var chooseUser2option_selected = $(".chooseUser2 option:selected")[0];
                        var currentRole = chooseUser2option_selected ? chooseUser2option_selected.innerHTML : '';
                        /* =S get all User*/
                        roleManageProvider.callItunes("/xdatainsight/api/userroledao/users")
                            .then((data) =>{
                                $scope.longArray = data.users;
                                /* =S get selected role's user*/
                                roleManageProvider.callItunes("/xdatainsight/api/userroledao/roleMembers?roleName="+currentRole)
                                    .then((data)=>{
                                        if(data.users!=undefined){
                                            var rolesLength = data.users.length;
                                            $scope.shortArray = data.users;
                                            document.querySelector(".choosedSelect1").innerHTML = "";
                                            for(var i=0;i<rolesLength;i++){
                                                var addOption = document.createElement("option");
                                                var optionValue = data.users[i];
                                                addOption.innerHTML = optionValue;
                                                document.querySelector(".choosedSelect1").appendChild(addOption);
                                            }
                                        }else{
                                            document.querySelector(".choosedSelect1").innerHTML = "";
                                            $scope.shortArray = [];
                                        }
                                        /*get different array and display them*/
                                        var c = differentArray($scope.longArray,$scope.shortArray);
                                        var rolesLength = c.length;
                                        document.querySelector(".canChooseSelect1").innerHTML = "";
                                        for(var i=0;i<rolesLength;i++){
                                            var addOption = document.createElement("option");
                                            var optionValue = c[i];
                                            addOption.innerHTML = optionValue;
                                            document.querySelector(".canChooseSelect1").appendChild(addOption);
                                        }

                                    },(data)=>{
                                    });
                                /*=E get selected role's user*/
                            },(data) =>{
                            })
                        /* =E get all User*/



                    },(data) => {

                    })
            }
            var trigger = document.querySelector(".tabChoose>li:nth-child(2)");
            var trigger1 = document.querySelector(".userRole>div");
            trigger.addEventListener("click",showRoleList);
            /*trigger1.addEventListener("click",showRoleList);*/

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

        //add role true
        document.querySelector(".addNewRoleTrue").onclick = function(){
            var flag=0;
            if(document.querySelector(".inputNewRole").value ==""){
                document.querySelector(".roleNameNulTips").innerHTML = "角色名不能为空";
                document.querySelector(".inputNewRole").style.borderColor = "#ff4242";
                flag=1;
            }else{
                document.querySelector(".roleNameNulTips").innerHTML = "";
            }
            if(verifyRepeatRole()==1){
                document.querySelector(".roleNameNulTips").innerHTML = "角色名已存在";
                document.querySelector(".inputNewRole").style.borderColor = "#ff4242";
                flag=1;
            }
            if(flag==0){
                var addOption = document.createElement("option");
                var optionValue = document.querySelector(".inputNewRole").value;
                addOption.innerHTML = optionValue;
                document.querySelector(".chooseUser2").appendChild(addOption);
                document.querySelector(".addNewRole").style.display = "none";
                /*connect:add new Role*/
                roleManageFactory.createNewRole(optionValue);
                $(".secondShelter").hide();
                /* =S add option's click eventListener*/
                // $(".chooseUser2 option").on("click",function(){

                //     /*get all roles*/
                //     roleManageProvider.callItunes("/xdatainsight/api/userroledao/users")
                //         .then((data)=>{
                //             $scope.longArray = data.users;
                //             /*get the all users*/
                //             var currentUser = $(".chooseUser2 option:selected")[0].innerHTML;
                //             showRoleAssignment(currentUser);
                //             roleManageProvider.callItunes("/xdatainsight/api/userroledao/roleMembers?roleName="+currentUser)
                //                 .then((data)=>{

                //                     if(data.users!=undefined){/*if the user have any power then excute*/
                //                         var usersLength = data.users.length;
                //                         $scope.shortArray = data.users;
                //                         document.querySelector(".choosedSelect1").innerHTML = "";
                //                         for(var i=0;i<usersLength;i++){
                //                             var addOption = document.createElement("option");
                //                             var optionValue = data.users[i];
                //                             addOption.innerHTML = optionValue;
                //                             document.querySelector(".choosedSelect1").appendChild(addOption);
                //                         }
                //                     }else{
                //                         document.querySelector(".choosedSelect1").innerHTML = "";
                //                         $scope.shortArray = [];
                //                     }
                //                     get different array and display them
                //                     var c = differentArray($scope.longArray,$scope.shortArray);
                //                     var usersLength = c.length;
                //                     document.querySelector(".canChooseSelect1").innerHTML = "";
                //                     for(var i=0;i<usersLength;i++){
                //                         var addOption = document.createElement("option");
                //                         var optionValue = c[i];
                //                         addOption.innerHTML = optionValue;
                //                         document.querySelector(".canChooseSelect1").appendChild(addOption);
                //                     }

                //                 },(data)=>{
                //                 });
                //         },(data)=>{
                //         });

                //     var differentArray = function(longArray,shortArray){
                //         var c = [];
                //         var longArrayLength = longArray.length;
                //         var shortArrayLength = shortArray.length;
                //         for(var i=0;i<longArrayLength;i++){
                //             var flag = false;
                //             for(var j=0;j<shortArrayLength;j++){
                //                 if(longArray[i]==shortArray[j]){
                //                     flag=true;
                //                     break;
                //                 }
                //             }
                //             if(flag==false){
                //                 c.push(longArray[i]);
                //             }
                //         }
                //         return c;
                //     }

                // })
                /* =E add option's click eventListener*/

            }
        }
        //repeated role verify
        function verifyRepeatRole(){
            var flag=0;
            var newName = document.querySelector(".inputNewRole").value;
            var optionLength = document.querySelectorAll(".chooseUser2>option").length;
            var options = document.querySelector(".chooseUser2").options;
            for(var i=0;i<optionLength;i++){
                if(options[i].innerHTML==newName){
                    flag=1;
                }
            }
            return flag;
        }
            //new Role blur
            document.querySelector(".inputNewRole").onblur = function(){
                if(verifyRepeatRole()==1){
                    document.querySelector(".roleNameNulTips").innerHTML = "角色名已存在";
                    document.querySelector(".inputNewRole").style.borderColor = "#ff4242";
                }else{
                    document.querySelector(".roleNameNulTips").innerHTML = "";
                    document.querySelector(".inputNewRole").style.borderColor = "#d9d9d9";
                }
            }
            //delete role
            document.querySelector(".deleteOldRoleTrue").onclick = function(){
                var deleteList = $(".chooseUser2 option:selected");
                var deleteListLength = deleteList.length;
                var deleteNameList = [];
                for(var i=0;i<deleteListLength;i++){
                    deleteNameList.push(deleteList[i].innerHTML);
                }
                roleManageFactory.deleteRoles(deleteNameList);
                $(".secondShelter").hide();
                $(".chooseUser2 option:selected").remove();
                document.querySelector(".deleteOldRole").style.display = "none";

            }
    }])

}