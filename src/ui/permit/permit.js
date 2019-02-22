import angular from 'angular';
import $ from 'jquery';
import './login/login.css'
import '@/lib/js/jsencrypt.min'
import {tips} from '@/ui/popup/dataSource/component/createModule/public';

const template = require('./login/login.html');

function urlsafe_b64encode(a) {
    var temp1 = a.split("+").join("-");
    var temp2 = temp1.split("/").join("_");
    var temp3 = temp2.split("=").join("");
    return temp3;
}

function encryptPwd(value) {
    let encrypt = new JSEncrypt();
    encrypt.setPublicKey("MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCb/WfSoGB9yMmE83baMnw9yfsb\
    6L27AB1J1BT20d0/LbyqTkGvuksSwj5CuqvcQE7coDeC/CNkf7ggEvo1nNIbbSGe6jJIfFN2YUmI7ts6s6e4tSq\
    KhhzBoaBE50TPNFsDLGj0m3AmC8j+WCWLxeeYlglpfrLMmlDtxCDjCbRnxwIDAQAB"
    );
    return urlsafe_b64encode(encrypt.encrypt(value));
}

angular
.module('xdt/permit',[])
.directive('loginForm',()=>{
    return {
        restrict: 'E',
        replace:true,
        template: template,
        link() {

        }
    }
})
.controller('loginFormCtr',['$rootScope','$scope','$http',( $rootScope,$scope,$http )=>{

    /**
     * 初始化
     */
    function init(){
        $scope.password = '';
        $scope.errorMsg = '';
        $scope.loading = false;
    }

    /**
     * 关闭弹框
     */
    function close(){
        init();
        $rootScope.hideLoginForm();
    }

    init();

    //点击登录
    $scope.login = function(){
        //避免重复点击
        if($scope.loading === true){
            return;
        }

        let username = $("#login_form_username").val();
        let { password } = $scope;
        let $form = $('#xdt-login-form form');

        //找不到用户名
        if(!username){
            $scope.errorMsg = "用户名不能为空";
            return;
        }

        //未输入密码
        if(!password){
            $scope.errorMsg = "请输入密码";
            return;
        }

        //置空错误信息
        $scope.errorMsg = "";
        $scope.loading = true;

        let data = ['j_username=',username,'&j_password=',encryptPwd(password)].join('');

        $.ajax({
            type: "POST",
            url: "/xdatainsightj_spring_security_check",
            dataType: "text",
            data:data,
            error: function(xhr, ajaxOptions, thrownError) {
                $scope.loading = false;
            },
            success: function(data, textStatus, jqXHR) {
                //返回状态
                var responseTag = jqXHR.getResponseHeader("x-request-url").split("=")[1];

                //状态1  密码错误
                if (responseTag == 1) {
                    // fail
                    $scope.errorMsg = '密码错误';
                    //状态2  已登录
                } else if (responseTag == 2) {
                    $scope.errorMsg = '已登录';
                    close();
                    $rootScope.wsReconnect();
                    //状态过期
                } else if (responseTag == "AccountExpired") {
                    $scope.errorMsg = '用户已过期';
                    //状态禁用
                } else if (responseTag == "Disabled") {
                    $scope.errorMsg = '用户已禁用';
                } else if (responseTag == "ClientError") {
                    $scope.errorMsg = '客户端发生错误，请联系管理员';
                    //登录
                } else if (responseTag === "MaximumUserExceeded") {
                    $scope.errorMsg = '超过总用户数，请联系管理员';
                } else if (responseTag === "SingleUserMaximumSessionExceeded") {
                    $scope.errorMsg = '超过单一用户上限，请联系管理员';
                } else {
                    close();
                    tips('登录成功。');
                    $rootScope.wsReconnect();
                }

                $scope.loading = false;

                if (!$scope.$$phase && !$scope.$root.$$phase) {
                    $scope.$digest();
                }
            }
        });
    }
}]);