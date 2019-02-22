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
        .directive('systemRole',()=>{
            const template = require('./systemRole.html');
            return{
                restrict: 'E',
                template: template,
                link($scope){
                }
            }
        })
        .provider("systemRoleProvider",function(){
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
        .factory("systemRoleFactory",['$http',function($http){
            let service = [];
            service.modifyPower = (name,a) => {
                var findSecondName = function(b){
                    var returnName = "";
                    switch(b){
                        case "checkbox12":returnName = "org.pentaho.security.administerSecurity";break;
                        case "checkbox22":returnName = "org.pentaho.repository.execute";break;
                        case "checkbox32":returnName = "org.pentaho.repository.read";break;
                        case "checkbox42":returnName = "org.pentaho.scheduler.manage";break;
                        case "checkbox52":returnName = "org.pentaho.security.publish";break;
                        case "checkbox62":returnName = "org.pentaho.repository.create";break;
                        case "checkbox72":returnName = "org.pentaho.platform.dataaccess.datasource.security.manage";break;
                        default :
                    }
                    return returnName;
                }
                /*getAllCheck*/
                var checkListName = [];
                for(var i=1;i<=7;i++){
                    if(document.querySelector("#checkbox"+i+"2").checked){
                        checkListName.push(findSecondName("checkbox"+i+"2"));
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
        .controller("systemRoleController",['$scope','$http','systemRoleProvider','systemRoleFactory',function($scope,$http,systemRoleProvider,systemRoleFactory){
            $(".systemRoleRight .authority>input").on("click",function(){
                var currentRole = $(".chooseUser22 option:selected")[0].innerHTML;
                systemRoleFactory.modifyPower(currentRole,this);
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
                var checkBoxs = document.querySelectorAll(".systemRoleRight>.controlList>.authority>input");
                for(var i=0;i<7;i++){
                    checkBoxs[i].checked = false;
                }
                systemRoleProvider.callItunes("/xdatainsight/api/userroledao/logicalRoleMap")
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
                                var checkBoxs = document.querySelectorAll(".systemRoleRight>.controlList>.authority>input");
                                for(var i=0;i<7;i++){
                                    checkBoxs[i].disabled = true;
                                }
                            }else{
                                var checkBoxs = document.querySelectorAll(".systemRoleRight>.controlList>.authority>input");
                                for(var i=0;i<7;i++){
                                    checkBoxs[i].disabled = false;
                                }
                            }
                        }
                        $('.systemRoleRight .authority').hide();
                        //隐藏没有的权限
                        if(data.localizedRoleNames && data.localizedRoleNames.length){
                            data.localizedRoleNames.forEach(function(e){
                                $('.systemRoleRight .' + $scope._roleManageArr[e.roleName]).find('label').text(e.localizedName).end().show();
                            });
                        }
                    },(data)=>{
                    })
            }

            function setChecked(name){
                switch(name){
                    case "org.pentaho.security.administerSecurity":
                        document.querySelectorAll(".systemRoleRight>.controlList>.authority>input")[0].checked = true;break;
                    case "org.pentaho.repository.execute":
                        document.querySelectorAll(".systemRoleRight>.controlList>.authority>input")[1].checked = true;break;
                    case "org.pentaho.repository.read":
                        document.querySelectorAll(".systemRoleRight>.controlList>.authority>input")[2].checked = true;break;
                    case "org.pentaho.scheduler.manage":
                        document.querySelectorAll(".systemRoleRight>.controlList>.authority>input")[3].checked = true;break;
                    case "org.pentaho.security.publish":
                        document.querySelectorAll(".systemRoleRight>.controlList>.authority>input")[4].checked = true;break;
                    case "org.pentaho.repository.create":
                        document.querySelectorAll(".systemRoleRight>.controlList>.authority>input")[5].checked = true;break;
                    case "org.pentaho.platform.dataaccess.datasource.security.manage":
                        document.querySelectorAll(".systemRoleRight>.controlList>.authority>input")[6].checked = true;break;
                }
            }
            /*display*/
            var trigger = document.querySelector(".userRole>div");
            trigger.addEventListener("click",function(){
                systemRoleProvider.callItunes("/xdatainsight/api/userrolelist/extraRoles")
                .then((data)=>{
                        /*display system role*/
                        var rolesLength = data.roles.length;
                        document.querySelector(".chooseUser22").innerHTML = "";
                        for(var i=0;i<rolesLength;i++){
                            var addOption = document.createElement("option");
                            var optionValue = data.roles[i];
                            addOption.innerHTML = optionValue;
                            document.querySelector(".chooseUser22").appendChild(addOption);
                        }
                        /*set first option selected*/
                        document.querySelector(".chooseUser22>option").selected = true;
                        /*add listener*/
                        $(".chooseUser22").on("click",function(){
                            var currentUser = $(".chooseUser22 option:selected")[0].innerHTML;
                            showRoleAssignment(currentUser);
                        })
                        /*get first roleAssignment*/
                        var currentRole = document.querySelector(".chooseUser22>option").innerHTML;
                        showRoleAssignment(""+currentRole);
                },(data)=>{

                })
            })


        }])
}