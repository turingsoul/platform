import angular from 'angular';
import $ from 'jquery';
import '../style/modifyPassword.css';
{
    "use strict";
    const template = require('./../pages/modifyPassword.html');
    angular.module("xdt/modifyPassword",[])
        .directive('modifyPassword',()=>{
            return {
                restrict: 'E',
                template: template,
                link() {
                   document.querySelector(".content .inputPassword").onkeyup = function(e){
                       var inputValue = document.querySelector(".content .inputPassword").value;
                       var inputValueArray = inputValue.split("");
                       var inputValueLength = inputValueArray.length;
                       var passwordSafety =  judgeAlphaNumber(inputValueArray,inputValueLength);
                       setColorForPassword(passwordSafety);
                   }
                   function judgeAlphaNumber(value,valueLength){
                       var flag1 = false;
                       var flag2 = false;
                       var flag3 = false;
                       for(var i=0;i<valueLength;i++){
                           if((value[i].charCodeAt()>=65&&value[i].charCodeAt()<=90)||(value[i].charCodeAt()>=97&&value[i].charCodeAt()<=122)){
                               flag1 = true;
                           }else if(value[i].charCodeAt()>=48&&value[i].charCodeAt()<=57){
                               flag2 = true;
                           }else{
                               flag3 = true;
                           }
                       }
                       return flag1+flag2+flag3;
                   }
                   function setColorForPassword(number){
                       if(number==1){
                           document.querySelector(".weak").style.background = "#E65F5B";
                           document.querySelector(".middle").style.background = "white";
                           document.querySelector(".strong").style.background = "white";
                       }else if(number==2){
                           document.querySelector(".weak").style.background = "#E65F5B";
                           document.querySelector(".middle").style.background = "#E99E3C";
                           document.querySelector(".strong").style.background = "white";
                       }else if(number==3){
                           document.querySelector(".weak").style.background = "#E65F5B";
                           document.querySelector(".middle").style.background = "#E99E3C";
                           document.querySelector(".strong").style.background = "#9BCE4A";
                       }else{
                           document.querySelector(".weak").style.background = "white";
                           document.querySelector(".middle").style.background = "white";
                           document.querySelector(".strong").style.background = "white";
                       }

                   }
                    /*passwordRepeat*/
                    document.querySelector(".checkPasswordContent input").onblur = function(){
                        /*新密码*/
                        var password1 = document.querySelector(".newPassContent input").value;
                        /*确认密码*/
                        var password2 = document.querySelector(".checkPasswordContent input").value;

                        if(password1 != ""){
                            if(password1!= password2&&password2!=""){
                                document.querySelector(".passCheckTips").innerHTML = "两次密码输入不一致，请重新输入";
                            }else if(password1.length <6 || password1.length >16){
                                document.querySelector(".passCheckTips").innerHTML = "密码长度应该在6-16位";
                            }else if(password2 == ""){
                                document.querySelector(".passCheckTips").innerHTML = "请填入确认密码";
                            }
                            else{
                                document.querySelector(".passCheckTips").innerHTML = "";
                            }
                        }
                    }
                    document.querySelector(".newPassContent input").onblur = function(){
                        /*新密码*/
                        var password1 = document.querySelector(".newPassContent input").value;
                        /*确认密码*/
                        var password2 = document.querySelector(".checkPasswordContent input").value;

                        if(password1 != ""){
                            if(password1!= password2&&password2!=""){
                                document.querySelector(".passCheckTips").innerHTML = "两次密码输入不一致，请重新输入";
                            }else if(password1.length <6 || password1.length >16){
                                document.querySelector(".passCheckTips").innerHTML = "密码长度应该在6-16位";
                            }else if(password2 == ""){
                                document.querySelector(".passCheckTips").innerHTML = "请填入确认密码";
                            }
                            else{
                                document.querySelector(".passCheckTips").innerHTML = "";
                            }
                        }
                    }
                }

            }
        })
        .provider("modifyPasswordProvider",function(){
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
        .controller("modifyPasswordController",['$scope','modifyPasswordProvider','$http',function($scope,modifyPasswordProvider,$http){
            /*close panel*/
            $scope.closeModifyPass = () => {
                //hide popup background
                document.querySelector('.popup').style.display="none";
                //add hide css to user-role
                document.querySelector('.popup modify-password').classList.add('popupHide');
            };
            /*FailTips*/
            $scope.closeFailTips = () => {
                document.querySelector(".modifySuccess").style.display = "none";
                document.querySelector("#modifyPassword_yhn").style.display = "block";
            };
            /*SuccessTips*/
            $scope.closeSuccessTips = () => {
                document.querySelector(".modifySuccess1").style.display = "none";
                //hide popup background
                document.querySelector('.popup').style.display="none";
                //add hide css to user-role
                document.querySelector('.popup modify-password').classList.add('popupHide');
            };
            /*submit password*/
            $scope.submitPassword = (modifyPasswordController) => {
                /*提示内容的长度*/
                var tips = document.querySelector(".passCheckTips").innerHTML.length;
                /*获取确认密码文本框的值*/
                var checkPassword = document.querySelector(".checkPasswordContent input").value;
                if (tips<=0&&checkPassword.length!=0){
                    var url = "/xdatainsight/plugin/xdt/api/userroledao/changePassword";
                    $http({
                        method: 'put',
                        headers:{contentType: "application/json; charset=utf-8", accept:"application/json"},
                        url: url,
                        dataType: 'json',
                        data: {"cPassword":$scope.newPassword,"pPassword":$scope.originPassword}
                    }).success((data)=>{
                        /*修改取消成功跳转*/
                        document.querySelector("#modifyPassword_yhn").style.display = "none";
                        document.querySelector(".modifySuccess1").style.display = "block";
                    }).error((data)=>{
                        document.querySelector("#modifyPassword_yhn").style.display = "none";
                        document.querySelector(".modifySuccess").style.display = "block";
                    });
                }
            }
        }])
}