/**
 * Created by Administrator on 2016/5/10.
 */
import angular from 'angular';
import $ from 'jquery';
import "../style/emailService.css";
{
    "use strict";
    const template = require('./../pages/emailService.html');
    angular.module("popup/emailService",[])
        .directive('emailService',()=>{
            return {
                restrict: 'E',
                template: template,
                link() {
                }
            }
        })
        .provider("emailServiceProvider",function(){
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
        .controller("emailServiceController",['$scope','$http','emailServiceProvider',function($scope,$http,emailServiceProvider){
            $scope.close = () => {
                //hide popup background
                document.querySelector('.popup').style.display = "none";
                //add hide css to user-role
                document.querySelector('.popup email-service').classList.add('popupHide');
            }
            $scope.closeConfig = () => {
                document.querySelector('.configBackGround').style.display = "none";
            }
            /*show up panel and request data*/
            document.querySelector(".emailService>div").onclick = function(){
                /*clear old data*/
                document.querySelector(".smtpServer>input").value="";
                document.querySelector(".smtpPort>input").value="";
                document.querySelector(".username>input").value="";
                document.querySelector(".password>input").value="";
                document.querySelector(".emailAddress>input").value="";
                document.querySelector(".emailUserName>input").value="";
                document.querySelector("#tlsCheck").checked = false;
                document.querySelector("#sslCheck").checked=false;
                //send request
                emailServiceProvider.callItunes("/xdatainsight/api/emailconfig/getEmailConfig")
                .then((data)=>{
                        //set host
                        document.querySelector(".smtpServer>input").value = data.smtpHost;
                        //set port
                        document.querySelector(".smtpPort>input").value = data.smtpPort;
                        //set username
                        document.querySelector(".username>input").value = data.userId;
                        //set password
                        document.querySelector(".password>input").value = data.password;
                        //set emailAddress
                        document.querySelector(".emailAddress>input").value = data.defaultFrom;
                        //set emailName
                        document.querySelector(".emailUserName>input").value = data.fromName;
                        //set protocal
                        document.querySelector(".protocal>select").value = data.smtpProtocol;
                        //set checkbox1
                        document.querySelector("#tlsCheck").checked = (data.useStartTls=="true");
                        /*document.querySelector("#tlsCheck").checked = false;*/
                        //set checkbox2
                        document.querySelector("#sslCheck").checked = (data.useSsl=="true");
                        //judge and click
                        document.querySelector(".buttonGroup .testConnect").onclick = function(){
                            var host = document.querySelector(".smtpServer>input").value;
                            var port = document.querySelector(".smtpPort>input").value;
                            var username = document.querySelector(".username>input").value;
                            var password = document.querySelector(".password>input").value;
                            var emailAddress = document.querySelector(".emailAddress>input").value;
                            var emailName = document.querySelector(".emailUserName>input").value;
                            var protocal = document.querySelector(".protocal>select").value;
                            var checkbox1 = document.querySelector("#tlsCheck").checked;
                            var checkbox2 = document.querySelector("#sslCheck").checked;
                            var authentic = false;
                            if(username==""&&password==""){
                                authentic = false;
                            }else{
                                authentic = true;
                            }
                            authenticTestTrue(authentic,data.debug,data.smtpQuitWait,host,port,username,password,emailAddress,emailName,protocal,checkbox1,checkbox2);
                        }

                        document.querySelector(".checkConfirm").onclick = function(){
                            var host = document.querySelector(".smtpServer>input").value;
                            var port = document.querySelector(".smtpPort>input").value;
                            var username = document.querySelector(".username>input").value;
                            var password = document.querySelector(".password>input").value;
                            var emailAddress = document.querySelector(".emailAddress>input").value;
                            var emailName = document.querySelector(".emailUserName>input").value;
                            var protocal = document.querySelector(".protocal>select").value;
                            var checkbox1 = document.querySelector("#tlsCheck").checked;
                            var checkbox2 = document.querySelector("#sslCheck").checked;
                            var authentic = false;
                            if(username==""&&password==""){
                                authentic = false;
                            }else{
                                authentic = true;
                            }
                            saveConfig(authentic,data.debug,data.smtpQuitWait,host,port,username,password,emailAddress,emailName,protocal,checkbox1,checkbox2);
                        }
                 },(data)=>{
                 })
                /*save config*/
                function saveConfig(authentic,debug,smtpQuitWait,host,port,username,password,emailAddress,emailName,protocal,checkbox1,checkbox2){
                    var url = "/xdatainsight/api/emailconfig/setEmailConfig";
                    var data = {
                        "authenticate":authentic,
                        "debug": debug,
                        "defaultFrom": emailAddress,
                        "fromName": emailName,
                        "password": password,
                        "smtpHost": host,
                        "smtpPort": port,
                        "smtpProtocol": protocal,
                        "smtpQuitWait": smtpQuitWait,
                        "useSsl": checkbox2,
                        "useStartTls": checkbox1,
                        "userId": username
                    };
                    $http({
                        method: 'put',
                        headers:{contentType: "application/json; charset=utf-8", accept:"text/plain"},
                        url: url,
                        dataType: 'text/plain',
                        data: data
                    }).success((data)=>{
                        //hide popup background
                        document.querySelector('.popup').style.display = "none";
                        //add hide css to user-role
                        document.querySelector('.popup email-service').classList.add('popupHide');
                    }).error((data)=>{
                    });
                }
                /*authentic true*/
                function authenticTestTrue(authentic,debug,smtpQuitWait,host,port,username,password,emailAddress,emailName,protocal,checkbox1,checkbox2){
                    var url = "/xdatainsight/api/emailconfig/sendEmailTest";
                    /*getCurrentData*/
                    var data = {
                        "authenticate":authentic,
                        "debug": debug,
                        "defaultFrom": emailAddress,
                        "fromName": emailName,
                        "password": password,
                        "smtpHost": host,
                        "smtpPort": port,
                        "smtpProtocol": protocal,
                        "smtpQuitWait": smtpQuitWait,
                        "useSsl": checkbox2,
                        "useStartTls": checkbox1,
                        "userId": username
                    };
                    $http({
                        method: 'put',
                        headers:{contentType: "application/json; charset=utf-8", accept:"text/plain"},
                        url: url,
                        dataType: 'json',
                        data: data
                    }).success((data)=>{
                        if(data=="EmailTester.SUCESS"){
                            //change logo success
                            document.querySelector(".configTestSuccessLogo").setAttribute("class","configTestSuccessLogo testRight");
                            document.querySelector(".configSuccessLabel1").innerHTML = "成功连接到邮箱服务器";
                            document.querySelector(".configSuccessLabel2").innerHTML = "检查<a></a>的收件箱确认";
                            document.querySelector(".configSuccessLabel2>a").innerHTML = document.querySelector(".emailAddress>input").value;
                            document.querySelector(".configBackGround").style.display = "block";
                        }else{
                            document.querySelector(".configTestSuccessLogo").setAttribute("class","configTestSuccessLogo testWrong");
                            document.querySelector(".configSuccessLabel1").innerHTML = "未成功连接到邮箱服务器";
                            document.querySelector(".configSuccessLabel2").innerHTML = "";
                            document.querySelector(".configBackGround").style.display = "block";
                        }
                    }).error((data)=>{
                    });
                }
            }
        }])
}