/**
 * Created by Administrator on 2016/6/27.
 */
import angular from "angular";
import $ from "jquery";
import userRole from "../../../../../lib/doc/userRole";
import roles from "../../../../../lib/doc/roles";
import singleRole from "../../../../../lib/doc/singleRole";
import { tips } from "../../../dataSource/component/createModule/public";
{
  ("use strict");
  angular
    .module("popup/userRole", [])
    .directive("userManage", () => {
      const template = require("./userManage.html");
      return {
        restrict: "E",
        template: template,
        link($scope) {
          //tab1
          //select right to left
          document.querySelector(".jumpSelect2").onclick = function() {
            $(".canChooseSelect").append($(".choosedSelect option:selected"));
          };
        }
      };
    })
    .provider("getUserRoleProvider", function() {
      this.$get = [
        "$http",
        "$q",
        ($http, $q) => {
          return {
            callItunes(url) {
              let deferred = $q.defer();
              $http({
                method: "get",
                headers: { contentType: "application/json; charset=utf-8" },
                url: url,
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
    })
    .factory("userFactory", [
      "$http",
      $http => {
        let service = [];
        service.addNewUser = (url, data, onsuccess, onerror) => {
          $http({
            method: "put",
            headers: { contentType: "application/json; charset=utf-8" },
            url: url,
            dataType: "text",
            data: data
          })
            .success(data => {
              onsuccess && onsuccess(data);
            })
            .error(e => {
              onerror && onerror(e);
            });
        };
        service.deleteUser = name => {
          var nameLength = name.length;
          var nameString = "";
          var url = "/xdatainsight/api/userroledao/deleteUsers";
          for (var i = 0; i < name.length; i++) {
            nameString = nameString + name[i] + "%09";
          }
          url = url + "?userNames=" + nameString;
          $http({
            method: "put",
            headers: { contentType: "application/json; charset=utf-8" },
            url: url,
            dataType: "json",
            data: ""
          })
            .success(data => {})
            .error(data => {});
        };
        service.modifyPassword = (name, password) => {
          var url = "/xdatainsight/api/userroledao/updatePassword";
          var data = { userName: name, password: password };
          $http({
            method: "put",
            headers: { contentType: "application/json; charset=utf-8" },
            url: url,
            dataType: "json",
            data: data
          })
            .success(data => {})
            .error(data => {});
        };
        //assignAllRolesToUser
        service.assignAllRolesToUser = name => {
          var url = "/xdatainsight/api/userroledao/assignAllRolesToUser?userName=" + name;
          $http({
            method: "put",
            headers: { contentType: "application/json; charset=utf-8" },
            url: url,
            dataType: "json",
            data: ""
          })
            .success(data => {})
            .error(data => {});
        };
        service.removeAllRolesFromUser = name => {
          var url = "/xdatainsight/api/userroledao/removeAllRolesFromUser?userName=" + name;
          $http({
            method: "put",
            headers: { contentType: "application/json; charset=utf-8" },
            url: url,
            dataType: "json",
            data: ""
          })
            .success(data => {})
            .error(data => {});
        };
        service.assignRoleToUser = (name, roleList, rolelength) => {
          var roleNameString = "";
          for (var i = 0; i < rolelength; i++) {
            roleList[i] = encodeURI(roleList[i]);
            roleNameString += roleList[i] + "%09";
          }
          var url =
            "/xdatainsight/api/userroledao/assignRoleToUser?userName=" +
            name +
            "&roleNames=" +
            roleNameString;
          $http({
            method: "put",
            headers: { contentType: "application/json; charset=utf-8" },
            url: url,
            dataType: "json",
            data: ""
          })
            .success(data => {})
            .error(data => {});
        };
        service.removeRoleFromUser = (name, roleList, rolelength) => {
          var roleNameString = "";
          for (var i = 0; i < rolelength; i++) {
            roleList[i] = encodeURI(roleList[i]);
            roleNameString += roleList[i] + "%09";
          }
          var url =
            "/xdatainsight/api/userroledao/removeRoleFromUser?userName=" +
            name +
            "&roleNames=" +
            roleNameString;
          $http({
            method: "put",
            headers: { contentType: "application/json; charset=utf-8" },
            url: url,
            dataType: "json",
            data: ""
          })
            .success(data => {})
            .error(data => {});
        };
        return service;
      }
    ])

    .controller("userManageController", [
      "$rootScope",
      "$scope",
      "userFactory",
      "$http",
      "getUserRoleProvider",
      ($rootScope, $scope, userFactory, $http, getUserRoleProvider) => {
        //初始化时间插件
        $("#timePickPeriod1").datepicker({
          dateFormat: "yy.mm.dd",
          onSelect: function(dateText) {
            //为空验证并且验证格式正确性
            timePick(dateText);
          }
        });
        $("#timePickPeriod2").datepicker({
          dateFormat: "yy.mm.dd",
          onSelect: function(dateText) {
            //为空验证并且验证格式正确性
            timePick(dateText);
          }
        });
        //时间框1,2绑定函数
        function timePick(dateText) {
          //获取两个时间的值
          var time1 = document.querySelector("#timePickPeriod1").value;
          var time2 = document.querySelector("#timePickPeriod2").value;
          //非空验证
          if (time1 != "" && time2 != "") {
            //格式验证
            var pattern1 = new RegExp(
              "^([0-9][0-9][0-9][0-9]).([0-9][0-9]).([0-9][0-9])$"
            );
            if (pattern1.test(time1) && pattern1.test(time2)) {
              //验证前后
              var myTime1 = Date.parse($scope.transformDateInt1(time1));
              var myTime2 = Date.parse($scope.transformDateInt2(time2));
              if (myTime1 < myTime2) {
                //发送请求
                $scope.currentUserNameYhnState.startDate = myTime1;
                $scope.currentUserNameYhnState.endDate = myTime2;
                $http({
                  method: "post",
                  headers: { Accept: "application/json" },
                  url: "/xdatainsight/api/userroledao/setUserLimit",
                  dataType: "json",
                  data: $scope.currentUserNameYhnState
                })
                  .success(data => {
                    $scope.currentUserNameYhnState = data;
                    if (
                      $scope.currentUserNameYhnState.expiredMilliseconds > 0
                    ) {
                      document.querySelector("#stateExpire").style.color =
                        "green";
                      document.querySelector("#stateExpire").innerHTML = "正常";
                    } else {
                      document.querySelector("#stateExpire").style.color =
                        "red";
                      document.querySelector("#stateExpire").innerHTML =
                        "已过期";
                    }
                    //判断是否已经禁用
                    if (
                      $scope.currentUserNameYhnState.enable == "false" ||
                      $scope.currentUserNameYhnState.enable == false
                    ) {
                      document.querySelector("#stateExpire").style.color =
                        "red";
                      document.querySelector("#stateExpire").innerHTML =
                        "已禁用";
                    }
                  })
                  .error(data => {});
              } else {
                tips("开始日期需小于结束日期");
              }
            } else {
              tips("请输入正确格式");
            }
          } else if (time1 == "") {
            tips("请输入开始日期");
          } else if (time2 == "") {
            tips("请输入结束日期");
          }
        }

        //长期与期间选择框
        $scope.yhnLongOrPeriod = "long";
        $scope.longOrPeriod = function(e) {
          //如果是长期的话，传送接口，如果不是禁用则更改状态
          if ($scope.yhnLongOrPeriod == "long") {
            if (
              $scope.currentUserNameYhnState.enable == "true" ||
              $scope.currentUserNameYhnState.enable == true
            ) {
              document.querySelector("#stateExpire").style.color = "green";
              document.querySelector("#stateExpire").innerHTML = "正常";
            }
            $scope.currentUserNameYhnState.endDate = 253402271999000;
            $http({
              method: "post",
              headers: { Accept: "application/json" },
              url: "/xdatainsight/api/userroledao/setUserLimit",
              dataType: "json",
              data: $scope.currentUserNameYhnState
            })
              .success(data => {
                $scope.currentUserNameYhnState = data;
              })
              .error(data => {});
          } else {
            //范围的话每次先进行清空操作
            document.querySelector("#timePickPeriod1").value = "";
            document.querySelector("#timePickPeriod2").value = "";
          }
        };
        //存储开始时间
        $scope.timeStartOld = "";
        //日期选择
        $scope.transformDateString = function(a) {
          var myDate = new Date(a);
          var returnString = "";
          returnString += myDate.getFullYear();
          returnString += ".";
          if (myDate.getMonth() + 1 < 10) {
            returnString += "0";
          }
          returnString += myDate.getMonth() + 1;
          returnString += ".";
          if (myDate.getDate() < 10) {
            returnString += "0";
          }
          returnString += myDate.getDate();
          return returnString;
        };
        $scope.transformDateInt1 = function(myString) {
          var year = myString.split(".")[0];
          var month = myString.split(".")[1];
          var date = myString.split(".")[2];
          var myDate = new Date();
          myDate.setFullYear(year);
          myDate.setMonth(month - 1);
          myDate.setDate(date);
          myDate.setHours(0);
          myDate.setMinutes(0);
          myDate.setSeconds(0);
          return myDate;
        };
        $scope.transformDateInt2 = function(myString) {
          var year = myString.split(".")[0];
          var month = myString.split(".")[1];
          var date = myString.split(".")[2];
          var myDate = new Date();
          myDate.setFullYear(year);
          myDate.setMonth(month - 1);
          myDate.setDate(date);
          myDate.setHours(23);
          myDate.setMinutes(59);
          myDate.setSeconds(59);
          return myDate;
        };
        $scope.abandonCheckButton = function() {
          //判断
          if (document.querySelector("#abandonCheck").checked == true) {
            //禁用处理，设置状态并发送请求
            document.querySelector("#stateExpire").style.color = "red";
            document.querySelector("#stateExpire").innerHTML = "已禁用";
            //发送禁用状态
            $scope.currentUserNameYhnState.enable = false;
            $http({
              method: "post",
              headers: { Accept: "application/json" },
              url: "/xdatainsight/api/userroledao/setUserLimit",
              dataType: "json",
              data: $scope.currentUserNameYhnState
            })
              .success(data => {
                $scope.currentUserNameYhnState = data;
              })
              .error(data => {});
          } else {
            //发送不禁用状态
            $scope.currentUserNameYhnState.enable = true;
            $http({
              method: "post",
              headers: { Accept: "application/json" },
              url: "/xdatainsight/api/userroledao/setUserLimit",
              dataType: "json",
              data: $scope.currentUserNameYhnState
            })
              .success(data => {
                $scope.currentUserNameYhnState = data;
              })
              .error(data => {});
            //判断是已过期还是正常
            if ($scope.currentUserNameYhnState.expiredMilliseconds >= 0) {
              //正常提示
              document.querySelector("#stateExpire").style.color = "green";
              document.querySelector("#stateExpire").innerHTML = "正常";
            } else if ($scope.currentUserNameYhnState.expiredMilliseconds < 0) {
              //过期提示
              document.querySelector("#stateExpire").style.color = "red";
              document.querySelector("#stateExpire").innerHTML = "已过期";
            }
          }
        };
        //存储当前用户名
        $scope.currentUserNameYhn = "";
        //接受返回的当前用户名
        $scope.$on("yhnCurrentUser", function(d, data) {
          $scope.currentUserNameYhn = data;
        });
        //接受返回的权限请求
        $scope.$on("expire", function(e, data) {
          //恢复权限控制组件正常状态
          document.querySelector("#abandonCheck").removeAttribute("disabled");
          document
            .querySelector("#selectPeriodControl")
            .removeAttribute("disabled");
          //存储当前用户数据
          $scope.currentUserNameYhnState = data;
          if ($scope.currentUserNameYhn != "admin") {
            if (
              data.endDate == 253402271999000 ||
              data.endDate == "253402271999000"
            ) {
              $scope.yhnLongOrPeriod = "long";
            } else {
              $scope.yhnLongOrPeriod = "short";
              //时间转换
              document.querySelector(
                "#timePickPeriod1"
              ).value = $scope.transformDateString(parseInt(data.startDate));
              document.querySelector(
                "#timePickPeriod2"
              ).value = $scope.transformDateString(parseInt(data.endDate));
            }
          } else {
            //设置admin禁用和长期
            $scope.yhnLongOrPeriod = "long";
            document.querySelector("#abandonCheck").disabled = "disabled";
            document.querySelector("#selectPeriodControl").disabled =
              "disabled";
          }
        });
        $scope.ifShowPeriod = function() {
          if ($scope.yhnLongOrPeriod == "short") {
            return true;
          } else {
            return false;
          }
        };
        //removeRolesFromUser
        $scope.removeRolesFromUser = () => {
          var currentUser = $(".chooseUser option:selected")[0].innerHTML;
          var toRemoveRoles = $(".choosedSelect option:selected");
          var roleLength = toRemoveRoles.length;
          var toRemoveRolesList = [];
          for (var i = 0; i < roleLength; i++) {
            toRemoveRolesList.push(toRemoveRoles[i].innerHTML);
          }
          $(".canChooseSelect").append($(".choosedSelect option:selected"));
          //remove role
          userFactory.removeRoleFromUser(
            currentUser,
            toRemoveRolesList,
            roleLength
          );
        };
        //addRolesToUser
        $scope.addRolesToUser = () => {
          var currentUser = $(".chooseUser option:selected")[0].innerHTML;
          var toAddRoles = $(".canChooseSelect option:selected");
          var roleLength = toAddRoles.length;
          var toAddRolesList = [];
          for (var i = 0; i < roleLength; i++) {
            toAddRolesList.push(toAddRoles[i].innerHTML);
          }
          $(".choosedSelect").append($(".canChooseSelect option:selected"));
          //add role
          userFactory.assignRoleToUser(currentUser, toAddRolesList, roleLength);
        };
        //add new user
        $scope.addUserTrue = () => {
          

          var flag = 1;
          if (
            document.querySelector(".inputNewPassword").value !=
            document.querySelector(".inputCheckNewPassword").value
          ) {
            document.querySelector(".userPasswordTips").innerHTML =
              "两次密码不一致,请重新输入";
            document.getElementsByClassName(
              "inputNewPassword"
            )[0].style.borderColor =
              "#ff4242";
            document.getElementsByClassName(
              "inputCheckNewPassword"
            )[0].style.borderColor =
              "#ff4242";
            flag = 0;
          } else if (
            document.querySelector(".inputNewPassword").value == "" &&
            document.querySelector(".inputCheckNewPassword").value == ""
          ) {
            document.querySelector(".userPasswordTips").innerHTML =
              "密码不能为空";
            document.getElementsByClassName(
              "inputNewPassword"
            )[0].style.borderColor =
              "#ff4242";
            document.getElementsByClassName(
              "inputCheckNewPassword"
            )[0].style.borderColor =
              "#ff4242";
            flag = 0;
          } else {
            document.querySelector(".userPasswordTips").innerHTML = "";
            document.getElementsByClassName(
              "inputNewPassword"
            )[0].style.borderColor =
              "#a9a9a9";
          }
          if (document.querySelector(".inputNewUser").value == "") {
            document.querySelector(".userNameTips").innerHTML =
              "用户名不能为空";
            document.getElementsByClassName(
              "inputNewUser"
            )[0].style.borderColor =
              "#ff4242";
            flag = 0;
          } else {
            document.querySelector(".userNameTips").innerHTML = "";
            document.getElementsByClassName(
              "inputNewUser"
            )[0].style.borderColor =
              "#a9a9a9";
          }
          if (verifyRepeatUser() == 1) {
            document.querySelector(".userNameTips").innerHTML = "用户名已存在";
            document.getElementsByClassName(
              "inputNewUser"
            )[0].style.borderColor =
              "#ff4242";
            flag = 0;
          }
          if (flag == 1) {
            var username = document.querySelector(".inputNewUser").value;
            var onsuccess = function(data) {
              $(".secondShelter").hide();
              var addSpan = document.createElement("option");
              addSpan.setAttribute("ng-click", "hello();");
              addSpan.innerHTML = username;
              document.querySelector(".chooseUser").appendChild(addSpan);
              document.querySelector(".addNewUser").style.display = "none";
            };
            var onerror = function(e) {
              var errorMessage = e.errorMessage || "";
              if (errorMessage === "Maximum number of users exceeded") {
                errorMessage = "由于软件许可限制，无法添加更多用户!";
              }
              $(".userNameTips").text(errorMessage);
            };

            //connect:add new user
            var addNewUserUrl = "/xdatainsight/api/userroledao/createUser";
            var newUserName = document.querySelector(".inputNewUser").value;
            var newUserPassword = document.querySelector(
              ".inputCheckNewPassword"
            ).value;
            var data = { userName: newUserName, password: newUserPassword };
            userFactory.addNewUser(addNewUserUrl, data, onsuccess, onerror);
            $scope.$emit("refreshClick");
          }
        };

        //repeated user verify
        function verifyRepeatUser() {
          var flag = 0;
          var newName = document.querySelector(".inputNewUser").value;
          var optionLength = document.querySelectorAll(".chooseUser>option")
            .length;
          var options = document.querySelector(".chooseUser").options;
          for (var i = 0; i < optionLength; i++) {
            if (options[i].innerHTML == newName) {
              flag = 1;
            }
          }
          return flag;
        }
        //new user input blur
        document.querySelector(".inputNewUser").onblur = function() {
          if (verifyRepeatUser() == 1) {
            document.querySelector(".userNameTips").innerHTML = "用户名已存在";
            document.getElementsByClassName(
              "inputNewUser"
            )[0].style.borderColor =
              "#ff4242";
          } else {
            document.querySelector(".userNameTips").innerHTML = "";
            // document.getElementsByClassName(
            //   "inputNewUser"
            // )[0].style.borderColor =
            //   "#a9a9a9";
          }
        };
        //delete user true
        document.querySelector(".deleteOldUserTrue").onclick = function() {
          $(".secondShelter").hide();
          var nameList = $(".chooseUser option:selected");
          $(".chooseUser option:selected").remove();
          document.querySelector(".deleteOldUser").style.display = "none";
          var nameLength = nameList.length;
          var nameArray = [];
          for (var i = 0; i < nameLength; i++) {
            nameArray.push(nameList[i].innerHTML);
          }
          /*connect:deleteUser*/
          userFactory.deleteUser(nameArray);
        };
        //showup modify password
        document.querySelector(".userBtn").onclick = function() {
          $(".secondShelter").show();
          var selectedLength = $(".chooseUser option:selected").length;
          if (selectedLength == 1) {
            document.querySelector(".modifyPassword").style.display = "block";
            document.querySelector(".modiPasswordTips").innerHTML = "";
            document.querySelector(".inputModiPassword").value = "";
            document.querySelector(".inputModiPasswordAgain").value = "";
            document.querySelector(".inputModiPassword").style.borderColor =
              "#d9d9d9";
            document.querySelector(
              ".inputModiPasswordAgain"
            ).style.borderColor =
              "#d9d9d9";
            document.querySelector(".inputModiPassword").focus();
          }
        };
        //modify password repeat-check
        document.querySelector(".modiPasswordTrue").onclick = function() {
          var flag = 0;
          if (
            document.querySelector(".inputModiPassword").value !=
            document.querySelector(".inputModiPasswordAgain").value
          ) {
            document.querySelector(".modiPasswordTips").innerHTML =
              "两次密码输入不一致，请重新输入";
            document.querySelector(
              ".inputModiPasswordAgain"
            ).style.borderColor =
              "#ff4242";
            document.querySelector(".inputModiPassword").style.borderColor =
              "#ff4242";
            flag = 1;
          } else {
            document.querySelector(".modiPasswordTips").innerHTML = "";
          }
          if (document.querySelector(".inputModiPassword").value == "") {
            document.querySelector(".modiPasswordTips").innerHTML =
              "密码不能为空";
            document.querySelector(".inputModiPassword").style.borderColor =
              "#ff4242";
            document.querySelector(
              ".inputModiPasswordAgain"
            ).style.borderColor =
              "#ff4242";
            flag = 1;
          }
          if (flag != 1) {
            var currentUser = $(".chooseUser option:selected")[0].innerHTML;
            var newPassword = document.querySelector(".inputModiPasswordAgain")
              .value;
            userFactory.modifyPassword(currentUser, newPassword);
            document.querySelector(".userTxt").value = document.querySelector(
              ".inputModiPassword"
            ).value;
            document.querySelector(".modifyPassword").style.display = "none";
            $(".secondShelter").hide();
          }
        };

        //select left all to right
        document.querySelector(".jumpSelect3").onclick = function() {
          $(".choosedSelect").append($(".canChooseSelect").children());
          var currentUser = $(".chooseUser option:selected")[0].innerHTML;
          //connect:assignAllRolesToUser
          userFactory.assignAllRolesToUser(currentUser);
        };
        //select right all to left
        document.querySelector(".jumpSelect4").onclick = function() {
          $(".canChooseSelect").append($(".choosedSelect").children());
          var currentUser = $(".chooseUser option:selected")[0].innerHTML;
          //connect:removeAllRolesFromUser
          userFactory.removeAllRolesFromUser(currentUser);
        };
      }
    ]);
}
