/**
 * Created by Administrator on 2016/4/18.
 */
import angular from "angular";
import $ from "jquery";
import "../style/popup.css";
import "./dataSource/createConnect";
import "./dataSource/createModule";
import "./dataSource/existData";
import "./dataSource/importModule";
import "./optimised/userRole";
import "./optimised/advancedSetting";
import "./optimised/emailService";
import "./user/userAdmin";
import "./user/modifyPassword";
import "./user/advice";
import "./user/about";
import "./user/helpCenter";
import "./share/share"

{
    ("use strict");
    angular
        .module("xdt/popup", [
            "xdt/dataSource",
            "xdt/optimised",
            "xdt/administration",
            "xdt/permit",
            "xdt/share"
        ])
        .directive("popupDirective", () => {
            const template = require("./popup.html");
            return {
                restrict: "E",
                template: template,
                link($scope) {
                    $(".popup").children().addClass("popupHide");
                }
            };
        })
        .provider("popupProvider", function() {
            this.$get = ($http, $q) => {
                return {
                    callItunes(_finalUrl) {
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
            };
        })
        .factory("popupFactory", () => {
            let service = {};
            service.popupName = name => {
                document.querySelector(".popup").style.display = "block";
                switch (name) {
                    case "createLink":
                        document.querySelector(".popup create-connect").classList.remove("popupHide");
                        break;
                    case "createModule":
                        document.querySelector(".popup create-module").classList.remove("popupHide");
                        break;
                    case "leadinModule":
                        document.querySelector(".popup import-data").classList.remove("popupHide");
                        break;
                    case "existData":
                        document.querySelector(".popup exist-data").classList.remove("popupHide");
                        break;
                    case "userRole":
                        //改版之前弹窗的形式出现的逻辑
                        document.querySelector(".popup user-role").classList.remove("popupHide");
                        //改版后的逻辑
                        // document.querySelector(".popup").style.display = 'none';
                        break;
                    case "taskPlan":
                        document.querySelector(".popup").style.display = "none";
                        //$scope.closeLoading();
                        break;
                    case "emailService":
                        document.querySelector(".popup email-service").classList.remove("popupHide");
                        break;
                    case "advancedSetting":
                        document.querySelector(".popup advanced-setting").classList.remove("popupHide");
                        break;
                    case "userSet":
                        document.querySelector(".popup user-admin").classList.remove("popupHide");
                        break;
                    case "passwordSet":
                        document.querySelector(".popup modify-password").classList.remove("popupHide");
                        break;
                    case "display helpCenter":
                        document.querySelector(".popup").style.display = "none";
                        /*document.querySelector('.popup help-center').classList.remove('popupHide');*/
                        break;
                    case "advice":
                        document.querySelector(".popup user-advice").classList.remove("popupHide");
                        break;
                    case "display about":
                        //document.querySelector('.popup user-about').classList.remove('popupHide');
                        document.querySelector(".popup").style.display = "none";
                        break;
                    case "share":
                        $('#xdt-share').removeClass('popupHide');
                        break;
                }
            };
            return service;
        })
        .controller("popController", [
            "$scope",
            "$rootScope",
            "popupFactory",
            "userRoleProvider",
            ($scope, $rootScope, popupFactory, userRoleProvider) => {
                $scope.$on("popupOne", (d, data) => {
                    if (data == "advancedSetting") {
                        $scope.$broadcast("sendAllChild_yhn");
                    }
                    //existData 组件打开就重新去拉取数据
                    if (data == "existData") {
                        $rootScope.$broadcast("dataBaseType");
                        $rootScope.$broadcast("updata", 1);
                        $scope.$emit("loading", true); //显示过渡条
                        $scope.$on("showExistData", () => {
                            popupFactory.popupName(data);
                        });
                    } else {
                        //如果是新建数据源连接createLink 就发信号重置高级设置
                        popupFactory.popupName(data);
                        if (data == "createLink") {
                            $scope.$emit("yhnCreateLink");
                            $scope.$broadcast("yhnCreateLink");
                        }
                    }
                });
                $scope.$on("userAdmin", (d, data) => {
                    if ($rootScope.ifThirdPart == true) {
                        //用户设置日期提示消失
                        document.querySelector(
                            "#yhnUserExpireTips"
                        ).style.display = "none";
                    }
                    popupFactory.popupName(data);
                    //发送请求控制时间显示
                    userRoleProvider
                        .callItunes("/xdatainsight/api/system/authentication-provider")
                        .then(
                            data => {
                                if (
                                    data.authenticationType == "ldap" ||
                                    data.authenticationType == "jdbc"
                                ) {
                                    //用户设置日期提示消失
                                    document.querySelector(
                                        "#yhnUserExpireTips"
                                    ).style.display = "none";
                                }
                            },
                            data => {}
                        );
                });
                $scope.closeLoading = () => {
                    document.querySelector(".popup").style.background = "rgba(0,0,0,0.7)";
                    document.querySelector(".popup").style.display = "none";
                    $rootScope.globalLoading(false);
                };
            }
        ]);
}
