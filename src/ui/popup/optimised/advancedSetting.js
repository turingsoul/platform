/**
 * Created by Administrator on 2016/5/10.
 */
import angular from "angular";
import $ from "jquery";
import "../style/advancedSetting.css";
import "../../style/jquery-ui.min.css";
import "../../style/jquery-ui.theme.min.css";
import "../../../lib/js/jquery-ui.min.js";
import moment from "moment";

{
    ("use strict");
    const template = require("../pages/advancedSetting.html");
    angular
        .module("popup/advancedSetting", [])
        .directive("advancedSetting", () => {
            return {
                restrict: "E",
                template: template,
                link() {
                    //verify second
                    $(".second .startdateSecond>input").blur(function() {
                        var content = parseInt(
                            document.querySelector(
                                ".second .startdateSecond>input"
                            ).value
                        );
                        if (isNaN(content)) {
                            document.querySelector(
                                ".second .startdateSecond>input"
                            ).style.borderColor = "red";
                        } else {
                            document.querySelector(
                                ".second .startdateSecond>input"
                            ).style.borderColor = "#d8d8d8";
                        }
                    });

                    //verify minutes
                    $(".minutes .startdateSecond>input").blur(function() {
                        var content = parseInt(
                            document.querySelector(
                                ".minutes .startdateSecond>input"
                            ).value
                        );
                        if (isNaN(content)) {
                            document.querySelector(
                                ".minutes .startdateSecond>input"
                            ).style.borderColor = "red";
                        } else {
                            document.querySelector(
                                ".minutes .startdateSecond>input"
                            ).style.borderColor = "#d8d8d8";
                        }
                    });

                    //verify hour
                    $(".hours .startdateSecond>input").blur(function() {
                        var content = parseInt(
                            document.querySelector(
                                ".hours .startdateSecond>input"
                            ).value
                        );
                        if (isNaN(content)) {
                            document.querySelector(
                                ".hours .startdateSecond>input"
                            ).style.borderColor = "red";
                        } else {
                            document.querySelector(
                                ".hours .startdateSecond>input"
                            ).style.borderColor = "#d8d8d8";
                        }
                    });

                    //verify day
                    $(".day>.startdateSecond>input:nth-child(4)").blur(function() {
                        var content = parseInt(
                            document.querySelector(
                                ".day>.startdateSecond>input:nth-child(4)"
                            ).value
                        );
                        if (isNaN(content)) {
                            document.querySelector(
                                ".day>.startdateSecond>input:nth-child(4)"
                            ).style.borderColor = "red";
                        } else {
                            document.querySelector(
                                ".day>.startdateSecond>input:nth-child(4)"
                            ).style.borderColor = "#d8d8d8";
                        }
                    });

                    //verify month
                    $(".month .startdateSecond>input:nth-child(4)").blur(
                        function() {
                            var content = parseInt(
                                document.querySelector(
                                    ".month .startdateSecond>input:nth-child(4)"
                                ).value
                            );
                            if (isNaN(content)) {
                                document.querySelector(
                                    ".month .startdateSecond>input:nth-child(4)"
                                ).style.borderColor = "red";
                            } else {
                                document.querySelector(
                                    ".month .startdateSecond>input:nth-child(4)"
                                ).style.borderColor = "#d8d8d8";
                            }
                        }
                    );

                    //verify year
                    $(".year .year_select1_day").blur(function() {
                        var content = parseInt(
                            document.querySelector(".year .year_select1_day")
                                .value
                        );
                        if (isNaN(content)) {
                            document.querySelector(
                                ".year .year_select1_day"
                            ).style.borderColor = "red";
                        } else {
                            document.querySelector(
                                ".year .year_select1_day"
                            ).style.borderColor = "#d8d8d8";
                        }
                    });
                    
                    //verify end
                    $("#only1start").datepicker({
                        dateFormat: "yy.mm.dd"
                    });
                    $("#secondDate1").datepicker({
                        dateFormat: "yy.mm.dd"
                    });
                    $("#secondEndDate").datepicker({
                        dateFormat: "yy.mm.dd"
                    });
                    $("#minutesDate1").datepicker({
                        dateFormat: "yy.mm.dd"
                    });
                    $("#minutesEndDate").datepicker({
                        dateFormat: "yy.mm.dd"
                    });
                    $("#hoursDate1").datepicker({
                        dateFormat: "yy.mm.dd"
                    });
                    $("#hoursEndDate").datepicker({
                        dateFormat: "yy.mm.dd"
                    });
                    $("#dayDate1").datepicker({
                        dateFormat: "yy.mm.dd"
                    });
                    $("#dayEndDate").datepicker({
                        dateFormat: "yy.mm.dd"
                    });
                    $("#weekDate1").datepicker({
                        dateFormat: "yy.mm.dd"
                    });
                    $("#weekEndDate").datepicker({
                        dateFormat: "yy.mm.dd"
                    });
                    $("#monthDate1").datepicker({
                        dateFormat: "yy.mm.dd"
                    });
                    $("#monthEndDate").datepicker({
                        dateFormat: "yy.mm.dd"
                    });
                    $("#yearDate1").datepicker({
                        dateFormat: "yy.mm.dd"
                    });
                    $("#yearEndDate").datepicker({
                        dateFormat: "yy.mm.dd"
                    });
                    $("#taskplanDate1").datepicker({
                        dateFormat: "yy.mm.dd"
                    });
                    $("#taskplanEndDate").datepicker({
                        dateFormat: "yy.mm.dd"
                    });
                    /*restrict1*/
                    var dateFormat = "yy.mm.dd",
                        from = $("#secondDate1")
                            .datepicker({
                                defaultDate: "+1w",
                                changeMonth: true,
                                numberOfMonths: 3
                            })
                            .on("change", function() {
                                to.datepicker(
                                    "option",
                                    "minDate",
                                    getDate(this)
                                );
                            }),
                        to = $("#secondEndDate")
                            .datepicker({
                                defaultDate: "+1w",
                                changeMonth: true,
                                numberOfMonths: 3
                            })
                            .on("change", function() {
                                from.datepicker(
                                    "option",
                                    "maxDate",
                                    getDate(this)
                                );
                            });

                    function getDate(element) {
                        var date;
                        try {
                            date = $.datepicker.parseDate(
                                dateFormat,
                                element.value
                            );
                        } catch (error) {
                            date = null;
                        }
                        return date;
                    }
                    //init what i choose and cancel the plan
                    var container = document.querySelectorAll(
                        ".choosedContent>div"
                    );
                    for (var i = 0; i < container.length; i++) {
                        container[i].style.display = "none";
                    }
                    document.querySelector(
                        ".choosedContent>.taskplan"
                    ).style.display = "block";
                }
            };
        })
        .provider("advancedSettingProvider", function() {
            this.$get = [
                "$http",
                "$q",
                ($http, $q) => {
                    return {
                        callItunes(_finalUrl) {
                            let deferred = $q.defer();
                            $http({
                                method: "get",
                                headers: {
                                    contentType:
                                        "application/json; charset=utf-8"
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
                }
            ];
        })
        .controller("advancedSettingWrapController", [
            "$scope",
            "$rootScope",
            "$http",
            "advancedSettingProvider",
            function($scope, $rootScope, $http, advancedSettingProvider) {
                //授权信息
                $scope.permit = {
                    show: false,
                    plugins: [],
                    authorizedUser: "",
                    authorizedProject: "",
                    authorizedPhone: "",
                    authorizedEmail: "",
                    authorizedType: "",
                    authorizedDate: "",
                    expireDate: "",
                    maxUser: ""
                };

                $scope.showPermit = () => {
                    document.querySelector('.advancedSettingBox').style.display = 'none';
                    advancedSettingProvider
                        .callItunes("/xdatainsight/api/system/licenceInfo")
                        .then(data => {
                            var plugins = [];
                            var handledPlugins = data.handledPlugins;
                            var allowedPlugins = data.allowedPlugins;

                            $(handledPlugins).each(function(i, v) {
                                plugins.push({
                                    name: v,
                                    checked: allowedPlugins.indexOf(v) > -1
                                });
                            });

                            $(["authorizedDate", "expireDate"]).each(function(
                                index,
                                value
                            ) {
                                data[value] = moment(data[value]).format(
                                    "YYYY-MM-DD HH:mm:ss"
                                );
                            });

                            $.extend($scope.permit, data || {});

                            $scope.permit.plugins = plugins;
                            $scope.permit.show = true;
                        });
                };

                $scope.closePermit = () => {
                    $scope.permit.show = false;
                    document.querySelector('.advancedSettingBox').style.display = 'block';
                };
            }
        ])
        .controller("advancedSettingController", [
            "$scope",
            "$rootScope",
            "$http",
            "advancedSettingProvider",
            function($scope, $rootScope, $http, advancedSettingProvider) {
                $scope.cancelCurrentPlan = () => {
                    var url2 = "/xdatainsight/api/scheduler/removeJob";
                    $http({
                        method: "DELETE",
                        headers: {
                            "content-Type": "application/json; charset=utf-8",
                            accept: "*/*"
                        },
                        url: url2,
                        data: { jobId: $rootScope.initialData.jobId }
                    })
                        .success(data => {
                            document.querySelector(
                                ".advancedSettingContent .planToDelete"
                            ).innerHTML = "计划删除";
                            document.querySelector(
                                ".advancedSettingContent .deletePlan"
                            ).style.display = "none";
                        })
                        .error(data => {});
                };
                $rootScope.damn = 1;
                $scope.$on("sendAllChild_yhn", function(evt, data) {
                    $('.advancedSettingBox').show();
                    //执行完成后就把该事件解绑
                    $rootScope.damn++;
                    if ($rootScope.damn == 7) {
                        //excute first inital request
                        var currentDate = new Date();
                        var currentTime = currentDate.getTime();
                        advancedSettingProvider
                            .callItunes(
                                "/xdatainsight/api/scheduler/getContentCleanerJob?cb=" +
                                    currentTime
                            )
                            .then(
                                data => {
                                    $rootScope.initialData = data;
                                    //judge which choose
                                    if (data.jobParams != null) {
                                        document.querySelector(
                                            ".advancedSettingContent .deletePlan"
                                        ).style.display = "inline-block";
                                        document.querySelector(
                                            ".advancedSettingContent .planToDelete"
                                        ).innerHTML = "编辑计划";
                                    } else {
                                        document.querySelector(
                                            ".advancedSettingContent .planToDelete"
                                        ).innerHTML = "计划删除";
                                        document.querySelector(
                                            ".advancedSettingContent .deletePlan"
                                        ).style.display = "none";
                                    }
                                },
                                data => {}
                            );
                        //excute first inital request end
                        $rootScope.damn = 1;
                    }
                });
                $scope.close = () => {
                    //hide popup background
                    document.querySelector(".popup").style.display = "none";
                    //add hide css to user-role
                    document
                        .querySelector(".popup advanced-setting")
                        .classList.add("popupHide");
                };
                $scope.showPlan = () => {
                    //showme
                    //set initial
                    //set initial end
                    document.querySelector('.advancedSettingBox').style.display = 'none';
                    var currentDate = new Date();
                    var currentTime = currentDate.getTime();
                    advancedSettingProvider
                        .callItunes(
                            "/xdatainsight/api/scheduler/getContentCleanerJob?cb=" +
                                currentTime
                        )
                        .then(
                            data => {
                                $rootScope.ll = data.jobId;
                                $rootScope.initialData = data;
                                advancedSettingProvider
                                    .callItunes(
                                        "/xdatainsight/api/scheduler/blockout/hasblockouts?ts=" +
                                            currentTime
                                    )
                                    .then(
                                        data => {
                                            if (data == "false") {
                                                document.querySelector(
                                                    ".advancedSettingPlan"
                                                ).style.display = "block";
                                                var container = document.querySelectorAll(
                                                    ".choosedContent>div"
                                                );
                                                for (
                                                    var i = 0;
                                                    i < container.length;
                                                    i++
                                                ) {
                                                    container[i].style.display =
                                                        "none";
                                                }
                                            }
                                            function PrefixInteger(num, n) {
                                                return (
                                                    Array(n).join(0) + num
                                                ).slice(-n);
                                            }
                                            function translateTime(time) {
                                                var response = [];
                                                response.year = time
                                                    .split("")
                                                    .splice(0, 4)
                                                    .join("");
                                                response.month = time
                                                    .split("")
                                                    .splice(5, 2)
                                                    .join("");
                                                response.date = time
                                                    .split("")
                                                    .splice(8, 2)
                                                    .join("");
                                                response.hours =
                                                    parseInt(
                                                        time
                                                            .split("")
                                                            .splice(11, 2)
                                                            .join("")
                                                    ) > 11
                                                        ? PrefixInteger(
                                                              parseInt(
                                                                  time
                                                                      .split("")
                                                                      .splice(
                                                                          11,
                                                                          2
                                                                      )
                                                                      .join("")
                                                              ) - 12,
                                                              2
                                                          )
                                                        : time
                                                              .split("")
                                                              .splice(11, 2)
                                                              .join("");
                                                response.am =
                                                    parseInt(
                                                        time
                                                            .split("")
                                                            .splice(11, 2)
                                                            .join("")
                                                    ) < 13
                                                        ? "AM"
                                                        : "PM";
                                                response.minutes = time
                                                    .split("")
                                                    .splice(14, 2)
                                                    .join("");
                                                response.seconds = parseInt(
                                                    time
                                                        .split("")
                                                        .splice(17, 2)
                                                        .join("")
                                                );
                                                return response;
                                            }
                                            //judge which choose
                                            if (
                                                $rootScope.initialData
                                                    .jobParams != null
                                            ) {
                                                var chooseDecider =
                                                    $rootScope.initialData
                                                        .jobParams.jobParams[0]
                                                        .value;
                                                switch (chooseDecider) {
                                                    case "RUN_ONCE":
                                                        document.querySelector(
                                                            "#advancedChoosedPlan"
                                                        ).value = "onlyone";
                                                        document.querySelector(
                                                            ".choosedContent>.onlyone"
                                                        ).style.display =
                                                            "block";
                                                        document.querySelector(
                                                            "#advancedChoosedPlan>option:nth-child(1)"
                                                        ).selected = true;

                                                        var startTime =
                                                            $rootScope
                                                                .initialData
                                                                .jobTrigger
                                                                .startTime;
                                                        var response = translateTime(
                                                            startTime
                                                        );
                                                        document.querySelector(
                                                            "#onlyoneHour"
                                                        ).value =
                                                            response.hours;
                                                        document.querySelector(
                                                            "#onlyoneMinute"
                                                        ).value =
                                                            response.minutes;
                                                        document.querySelector(
                                                            "#onlyoneHalfDay"
                                                        ).value = response.am;
                                                        document.querySelector(
                                                            "#only1start"
                                                        ).value =
                                                            response.year +
                                                            "." +
                                                            response.month +
                                                            "." +
                                                            response.date;
                                                        document.querySelector(
                                                            ".regularDayNumber"
                                                        ).value = "";
                                                        break;
                                                    case "SECONDS":
                                                        document.querySelector(
                                                            "#advancedChoosedPlan"
                                                        ).value = "second";
                                                        document.querySelector(
                                                            ".choosedContent>.second"
                                                        ).style.display =
                                                            "block";
                                                        document.querySelector(
                                                            "#advancedChoosedPlan>option:nth-child(2)"
                                                        ).selected = true;
                                                        var startTime =
                                                            $rootScope
                                                                .initialData
                                                                .jobTrigger
                                                                .startTime;
                                                        var endTime =
                                                            $rootScope
                                                                .initialData
                                                                .jobTrigger
                                                                .endTime;
                                                        var repeatInterval =
                                                            $rootScope
                                                                .initialData
                                                                .jobTrigger
                                                                .repeatInterval;
                                                        var response = translateTime(
                                                            startTime
                                                        );
                                                        var durations =
                                                            $rootScope
                                                                .initialData
                                                                .jobParams
                                                                .jobParams[1]
                                                                .value;
                                                        if (
                                                            endTime != undefined
                                                        ) {
                                                            var response2 = translateTime(
                                                                endTime
                                                            );
                                                            document.querySelector(
                                                                "#secondEndDate"
                                                            ).value =
                                                                response2.year +
                                                                "." +
                                                                response2.month +
                                                                "." +
                                                                response2.date;
                                                        }
                                                        document.querySelector(
                                                            "#yhn_secondHour"
                                                        ).value =
                                                            response.hours;
                                                        document.querySelector(
                                                            "#yhn_secondMinutes"
                                                        ).value =
                                                            response.minutes;
                                                        document.querySelector(
                                                            "#yhn_secondHalfDay"
                                                        ).value = response.am;
                                                        document.querySelector(
                                                            "#secondDate1"
                                                        ).value =
                                                            response.year +
                                                            "." +
                                                            response.month +
                                                            "." +
                                                            response.date;
                                                        document.querySelector(
                                                            ".second .startdateSecond>input"
                                                        ).value = repeatInterval;
                                                        if (
                                                            durations != "NaN"
                                                        ) {
                                                            document.querySelector(
                                                                ".regularDayNumber"
                                                            ).value =
                                                                durations /
                                                                (24 * 3600);
                                                        } else {
                                                            document.querySelector(
                                                                ".regularDayNumber"
                                                            ).value = 0;
                                                        }
                                                        break;
                                                    case "MINUTES":
                                                        document.querySelector(
                                                            "#advancedChoosedPlan"
                                                        ).value = "minutes";
                                                        document.querySelector(
                                                            ".choosedContent>.minutes"
                                                        ).style.display =
                                                            "block";
                                                        document.querySelector(
                                                            "#advancedChoosedPlan>option:nth-child(3)"
                                                        ).selected = true;

                                                        var startTime =
                                                            $rootScope
                                                                .initialData
                                                                .jobTrigger
                                                                .startTime;
                                                        var endTime =
                                                            $rootScope
                                                                .initialData
                                                                .jobTrigger
                                                                .endTime;
                                                        var repeatInterval =
                                                            $rootScope
                                                                .initialData
                                                                .jobTrigger
                                                                .repeatInterval;
                                                        var response = translateTime(
                                                            startTime
                                                        );
                                                        var durations =
                                                            $rootScope
                                                                .initialData
                                                                .jobParams
                                                                .jobParams[1]
                                                                .value;
                                                        if (
                                                            endTime != undefined
                                                        ) {
                                                            var response2 = translateTime(
                                                                endTime
                                                            );
                                                            document.querySelector(
                                                                "#minutesEndDate"
                                                            ).value =
                                                                response2.year +
                                                                "." +
                                                                response2.month +
                                                                "." +
                                                                response2.date;
                                                        }
                                                        document.querySelector(
                                                            "#yhn_minutesHour"
                                                        ).value =
                                                            response.hours;
                                                        document.querySelector(
                                                            "#yhn_minutesMinutes"
                                                        ).value =
                                                            response.minutes;
                                                        document.querySelector(
                                                            "#yhn_minutesHalfDay"
                                                        ).value = response.am;
                                                        document.querySelector(
                                                            "#minutesDate1"
                                                        ).value =
                                                            response.year +
                                                            "." +
                                                            response.month +
                                                            "." +
                                                            response.date;
                                                        document.querySelector(
                                                            ".minutes .startdateSecond>input"
                                                        ).value =
                                                            repeatInterval / 60;
                                                        if (
                                                            durations != "NaN"
                                                        ) {
                                                            document.querySelector(
                                                                ".regularDayNumber"
                                                            ).value =
                                                                durations /
                                                                (24 * 3600);
                                                        } else {
                                                            document.querySelector(
                                                                ".regularDayNumber"
                                                            ).value = 0;
                                                        }
                                                        break;
                                                    case "HOURS":
                                                        document.querySelector(
                                                            "#advancedChoosedPlan"
                                                        ).value = "hour";
                                                        document.querySelector(
                                                            ".choosedContent>.hours"
                                                        ).style.display =
                                                            "block";
                                                        document.querySelector(
                                                            "#advancedChoosedPlan>option:nth-child(4)"
                                                        ).selected = true;

                                                        var startTime =
                                                            $rootScope
                                                                .initialData
                                                                .jobTrigger
                                                                .startTime;
                                                        var endTime =
                                                            $rootScope
                                                                .initialData
                                                                .jobTrigger
                                                                .endTime;
                                                        var repeatInterval =
                                                            $rootScope
                                                                .initialData
                                                                .jobTrigger
                                                                .repeatInterval;
                                                        var response = translateTime(
                                                            startTime
                                                        );
                                                        var durations =
                                                            $rootScope
                                                                .initialData
                                                                .jobParams
                                                                .jobParams[1]
                                                                .value;
                                                        if (
                                                            endTime != undefined
                                                        ) {
                                                            var response2 = translateTime(
                                                                endTime
                                                            );
                                                            document.querySelector(
                                                                "#hoursEndDate"
                                                            ).value =
                                                                response2.year +
                                                                "." +
                                                                response2.month +
                                                                "." +
                                                                response2.date;
                                                        }
                                                        document.querySelector(
                                                            "#yhn_hoursHour"
                                                        ).value =
                                                            response.hours;
                                                        document.querySelector(
                                                            "#yhn_hoursMinutes"
                                                        ).value =
                                                            response.minutes;
                                                        document.querySelector(
                                                            "#yhn_hoursHalfDay"
                                                        ).value = response.am;
                                                        document.querySelector(
                                                            "#hoursDate1"
                                                        ).value =
                                                            response.year +
                                                            "." +
                                                            response.month +
                                                            "." +
                                                            response.date;
                                                        document.querySelector(
                                                            ".hours .startdateSecond>input"
                                                        ).value =
                                                            repeatInterval /
                                                            (60 * 60);
                                                        if (
                                                            durations != "NaN"
                                                        ) {
                                                            document.querySelector(
                                                                ".regularDayNumber"
                                                            ).value =
                                                                durations /
                                                                (24 * 3600);
                                                        } else {
                                                            document.querySelector(
                                                                ".regularDayNumber"
                                                            ).value = 0;
                                                        }
                                                        break;
                                                    case "DAILY":
                                                        document.querySelector(
                                                            "#advancedChoosedPlan"
                                                        ).value = "day";
                                                        document.querySelector(
                                                            ".choosedContent>.day"
                                                        ).style.display =
                                                            "block";
                                                        document.querySelector(
                                                            "#advancedChoosedPlan>option:nth-child(5)"
                                                        ).selected = true;

                                                        var startTime =
                                                            $rootScope
                                                                .initialData
                                                                .jobTrigger
                                                                .startTime;
                                                        var endTime =
                                                            $rootScope
                                                                .initialData
                                                                .jobTrigger
                                                                .endTime;
                                                        var repeatInterval =
                                                            $rootScope
                                                                .initialData
                                                                .jobTrigger
                                                                .repeatInterval;
                                                        var response = translateTime(
                                                            startTime
                                                        );
                                                        var durations =
                                                            $rootScope
                                                                .initialData
                                                                .jobParams
                                                                .jobParams[1]
                                                                .value;
                                                        if (
                                                            endTime != undefined
                                                        ) {
                                                            var response2 = translateTime(
                                                                endTime
                                                            );
                                                            document.querySelector(
                                                                "#dayEndDate"
                                                            ).value =
                                                                response2.year +
                                                                "." +
                                                                response2.month +
                                                                "." +
                                                                response2.date;
                                                        }
                                                        document.querySelector(
                                                            "#yhn_dayHours"
                                                        ).value =
                                                            response.hours;
                                                        document.querySelector(
                                                            "#yhn_dayMinutes"
                                                        ).value =
                                                            response.minutes;
                                                        document.querySelector(
                                                            "#yhn_dayHalfDay"
                                                        ).value = response.am;
                                                        document.querySelector(
                                                            "#dayDate1"
                                                        ).value =
                                                            response.year +
                                                            "." +
                                                            response.month +
                                                            "." +
                                                            response.date;
                                                        if (
                                                            repeatInterval ==
                                                            undefined
                                                        ) {
                                                            document.querySelector(
                                                                ".day .startdateSecond>input:nth-child(6)"
                                                            ).checked = true;
                                                            document.querySelector(
                                                                ".day .startdateSecond>input:nth-child(4)"
                                                            ).value = "";
                                                        } else {
                                                            document.querySelector(
                                                                ".day .startdateSecond>input:nth-child(2)"
                                                            ).checked = true;
                                                            document.querySelector(
                                                                ".day .startdateSecond>input:nth-child(4)"
                                                            ).value =
                                                                repeatInterval /
                                                                (60 * 60 * 24);
                                                        }

                                                        if (
                                                            durations != "NaN"
                                                        ) {
                                                            document.querySelector(
                                                                ".regularDayNumber"
                                                            ).value =
                                                                durations /
                                                                (24 * 3600);
                                                        } else {
                                                            document.querySelector(
                                                                ".regularDayNumber"
                                                            ).value = 0;
                                                        }
                                                        break;
                                                    case "WEEKLY":
                                                        document.querySelector(
                                                            "#advancedChoosedPlan"
                                                        ).value = "week";
                                                        document.querySelector(
                                                            ".choosedContent>.week"
                                                        ).style.display =
                                                            "block";
                                                        document.querySelector(
                                                            "#advancedChoosedPlan>option:nth-child(6)"
                                                        ).selected = true;

                                                        var startTime =
                                                            $rootScope
                                                                .initialData
                                                                .jobTrigger
                                                                .startTime;
                                                        var endTime =
                                                            $rootScope
                                                                .initialData
                                                                .jobTrigger
                                                                .endTime;
                                                        var repeatInterval =
                                                            $rootScope
                                                                .initialData
                                                                .jobTrigger
                                                                .repeatInterval;
                                                        var response = translateTime(
                                                            startTime
                                                        );
                                                        var durations =
                                                            $rootScope
                                                                .initialData
                                                                .jobParams
                                                                .jobParams[1]
                                                                .value;
                                                        var weeksDays =
                                                            $rootScope
                                                                .initialData
                                                                .jobTrigger
                                                                .dayOfWeekRecurrences
                                                                .recurrenceList
                                                                .values;
                                                        for (
                                                            var i = 0;
                                                            i <
                                                            weeksDays.length;
                                                            i++
                                                        ) {
                                                            var name =
                                                                "weekChoose" +
                                                                (weeksDays[i] -
                                                                    1);
                                                            document.querySelector(
                                                                "#" + name
                                                            ).checked = true;
                                                        }
                                                        if (
                                                            endTime != undefined
                                                        ) {
                                                            var response2 = translateTime(
                                                                endTime
                                                            );
                                                            document.querySelector(
                                                                "#weekEndDate"
                                                            ).value =
                                                                response2.year +
                                                                "." +
                                                                response2.month +
                                                                "." +
                                                                response2.date;
                                                        }
                                                        document.querySelector(
                                                            "#yhn_weekHours"
                                                        ).value =
                                                            response.hours;
                                                        document.querySelector(
                                                            "#yhn_weekMinutes"
                                                        ).value =
                                                            response.minutes;
                                                        document.querySelector(
                                                            "#yhn_weekHalfDay"
                                                        ).value = response.am;
                                                        document.querySelector(
                                                            "#weekDate1"
                                                        ).value =
                                                            response.year +
                                                            "." +
                                                            response.month +
                                                            "." +
                                                            response.date;
                                                        if (
                                                            durations != "NaN"
                                                        ) {
                                                            document.querySelector(
                                                                ".regularDayNumber"
                                                            ).value =
                                                                durations /
                                                                (24 * 3600);
                                                        } else {
                                                            document.querySelector(
                                                                ".regularDayNumber"
                                                            ).value = 0;
                                                        }
                                                        break;
                                                    case "MONTHLY":
                                                        document.querySelector(
                                                            "#advancedChoosedPlan"
                                                        ).value = "month";
                                                        document.querySelector(
                                                            ".choosedContent>.month"
                                                        ).style.display =
                                                            "block";
                                                        document.querySelector(
                                                            "#advancedChoosedPlan>option:nth-child(7)"
                                                        ).selected = true;

                                                        var startTime =
                                                            $rootScope
                                                                .initialData
                                                                .jobTrigger
                                                                .startTime;
                                                        var endTime =
                                                            $rootScope
                                                                .initialData
                                                                .jobTrigger
                                                                .endTime;
                                                        if (
                                                            $rootScope
                                                                .initialData
                                                                .jobTrigger
                                                                .dayOfMonthRecurrences ==
                                                            null
                                                        ) {
                                                            document.querySelector(
                                                                ".month .startdateSecond>input:nth-child(6)"
                                                            ).checked = true;
                                                            document.querySelector(
                                                                ".month .startdateSecond>input:nth-child(4)"
                                                            ).value = "";
                                                            var weeks =
                                                                $rootScope
                                                                    .initialData
                                                                    .jobTrigger
                                                                    .dayOfWeekRecurrences
                                                                    .qualifiedDayOfWeek;
                                                            switch (
                                                                weeks.dayOfWeek
                                                            ) {
                                                                case "MON":
                                                                    document.querySelector(
                                                                        "#yhn_month_week"
                                                                    ).value = 1;
                                                                    break;
                                                                case "TUE":
                                                                    document.querySelector(
                                                                        "#yhn_month_week"
                                                                    ).value = 2;
                                                                    break;
                                                                case "WED":
                                                                    document.querySelector(
                                                                        "#yhn_month_week"
                                                                    ).value = 3;
                                                                    break;
                                                                case "THU":
                                                                    document.querySelector(
                                                                        "#yhn_month_week"
                                                                    ).value = 4;
                                                                    break;
                                                                case "FRI":
                                                                    document.querySelector(
                                                                        "#yhn_month_week"
                                                                    ).value = 5;
                                                                    break;
                                                                case "SAT":
                                                                    document.querySelector(
                                                                        "#yhn_month_week"
                                                                    ).value = 6;
                                                                    break;
                                                                case "SUN":
                                                                    document.querySelector(
                                                                        "#yhn_month_week"
                                                                    ).value = 0;
                                                                    break;
                                                            }
                                                            switch (
                                                                weeks.qualifier
                                                            ) {
                                                                case "FIRST":
                                                                    document.querySelector(
                                                                        "#yhn_month_weekNumber"
                                                                    ).value = 0;
                                                                    break;
                                                                case "SECOND":
                                                                    document.querySelector(
                                                                        "#yhn_month_weekNumber"
                                                                    ).value = 1;
                                                                    break;
                                                                case "THIRD":
                                                                    document.querySelector(
                                                                        "#yhn_month_weekNumber"
                                                                    ).value = 2;
                                                                    break;
                                                                case "FOURTH":
                                                                    document.querySelector(
                                                                        "#yhn_month_weekNumber"
                                                                    ).value = 3;
                                                                    break;
                                                                case "LAST":
                                                                    document.querySelector(
                                                                        "#yhn_month_weekNumber"
                                                                    ).value = 4;
                                                                    break;
                                                            }
                                                        } else {
                                                            document.querySelector(
                                                                ".month .startdateSecond>input:nth-child(2)"
                                                            ).checked = true;
                                                            var repeatInterval =
                                                                $rootScope
                                                                    .initialData
                                                                    .jobTrigger
                                                                    .dayOfMonthRecurrences
                                                                    .recurrenceList
                                                                    .values;
                                                            document.querySelector(
                                                                ".month .startdateSecond>input:nth-child(4)"
                                                            ).value = repeatInterval;
                                                        }
                                                        var response = translateTime(
                                                            startTime
                                                        );
                                                        var durations =
                                                            $rootScope
                                                                .initialData
                                                                .jobParams
                                                                .jobParams[1]
                                                                .value;
                                                        if (
                                                            endTime != undefined
                                                        ) {
                                                            var response2 = translateTime(
                                                                endTime
                                                            );
                                                            document.querySelector(
                                                                "#monthEndDate"
                                                            ).value =
                                                                response2.year +
                                                                "." +
                                                                response2.month +
                                                                "." +
                                                                response2.date;
                                                        }
                                                        document.querySelector(
                                                            "#yhn_monthHours"
                                                        ).value =
                                                            response.hours;
                                                        document.querySelector(
                                                            "#yhn_monthMinutes"
                                                        ).value =
                                                            response.minutes;
                                                        document.querySelector(
                                                            "#yhn_monthHalfDay"
                                                        ).value = response.am;
                                                        document.querySelector(
                                                            "#monthDate1"
                                                        ).value =
                                                            response.year +
                                                            "." +
                                                            response.month +
                                                            "." +
                                                            response.date;
                                                        /* if(repeatInterval==undefined){
                                             document.querySelector(".month .startdateSecond>input:nth-child(6)").checked = true;
                                             document.querySelector(".month .startdateSecond>input:nth-child(4)").value = "";
                                             }else{
                                             document.querySelector(".month .startdateSecond>input:nth-child(2)").checked = true;
                                             document.querySelector(".month .startdateSecond>input:nth-child(4)").value = repeatInterval/(60*60*24);
                                             }*/

                                                        if (
                                                            durations != "NaN"
                                                        ) {
                                                            document.querySelector(
                                                                ".regularDayNumber"
                                                            ).value =
                                                                durations /
                                                                (24 * 3600);
                                                        } else {
                                                            document.querySelector(
                                                                ".regularDayNumber"
                                                            ).value = 0;
                                                        }
                                                        break;
                                                    case "YEARLY":
                                                        document.querySelector(
                                                            "#advancedChoosedPlan"
                                                        ).value = "year";
                                                        document.querySelector(
                                                            ".choosedContent>.year"
                                                        ).style.display =
                                                            "block";
                                                        document.querySelector(
                                                            "#advancedChoosedPlan>option:nth-child(8)"
                                                        ).selected = true;

                                                        var startTime =
                                                            $rootScope
                                                                .initialData
                                                                .jobTrigger
                                                                .startTime;
                                                        var endTime =
                                                            $rootScope
                                                                .initialData
                                                                .jobTrigger
                                                                .endTime;
                                                        var repeatInterval =
                                                            $rootScope
                                                                .initialData
                                                                .jobTrigger
                                                                .repeatInterval;
                                                        var response = translateTime(
                                                            startTime
                                                        );
                                                        var durations =
                                                            $rootScope
                                                                .initialData
                                                                .jobParams
                                                                .jobParams[1]
                                                                .value;
                                                        if (
                                                            $rootScope
                                                                .initialData
                                                                .jobTrigger
                                                                .dayOfMonthRecurrences !=
                                                            null
                                                        ) {
                                                            var date =
                                                                $rootScope
                                                                    .initialData
                                                                    .jobTrigger
                                                                    .dayOfMonthRecurrences
                                                                    .recurrenceList
                                                                    .values[0];
                                                            var month =
                                                                $rootScope
                                                                    .initialData
                                                                    .jobTrigger
                                                                    .monthlyRecurrences
                                                                    .recurrenceList
                                                                    .values[0];
                                                            document.querySelector(
                                                                ".year .year_select1_month"
                                                            ).value = month - 1;
                                                            document.querySelector(
                                                                ".year .year_select1_day"
                                                            ).value = date;
                                                            document.querySelector(
                                                                "#yearChoose1"
                                                            ).checked = true;
                                                        } else {
                                                            document.querySelector(
                                                                "#yearChoose2"
                                                            ).checked = true;
                                                            var month =
                                                                $rootScope
                                                                    .initialData
                                                                    .jobTrigger
                                                                    .monthlyRecurrences
                                                                    .recurrenceList
                                                                    .values[0];
                                                            var weeks =
                                                                $rootScope
                                                                    .initialData
                                                                    .jobTrigger
                                                                    .dayOfWeekRecurrences
                                                                    .qualifiedDayOfWeek;
                                                            document.querySelector(
                                                                ".year .year_select2_month"
                                                            ).value = month - 1;
                                                            switch (
                                                                weeks.dayOfWeek
                                                            ) {
                                                                case "MON":
                                                                    document.querySelector(
                                                                        ".year .year_select2_week"
                                                                    ).value = 1;
                                                                    break;
                                                                case "TUE":
                                                                    document.querySelector(
                                                                        ".year .year_select2_week"
                                                                    ).value = 2;
                                                                    break;
                                                                case "WED":
                                                                    document.querySelector(
                                                                        ".year .year_select2_week"
                                                                    ).value = 3;
                                                                    break;
                                                                case "THU":
                                                                    document.querySelector(
                                                                        ".year .year_select2_week"
                                                                    ).value = 4;
                                                                    break;
                                                                case "FRI":
                                                                    document.querySelector(
                                                                        ".year .year_select2_week"
                                                                    ).value = 5;
                                                                    break;
                                                                case "SAT":
                                                                    document.querySelector(
                                                                        ".year .year_select2_week"
                                                                    ).value = 6;
                                                                    break;
                                                                case "SUN":
                                                                    document.querySelector(
                                                                        ".year .year_select2_week"
                                                                    ).value = 0;
                                                                    break;
                                                            }
                                                            switch (
                                                                weeks.qualifier
                                                            ) {
                                                                case "FIRST":
                                                                    document.querySelector(
                                                                        ".year .year_select2_sequence"
                                                                    ).value = 0;
                                                                    break;
                                                                case "SECOND":
                                                                    document.querySelector(
                                                                        ".year .year_select2_sequence"
                                                                    ).value = 1;
                                                                    break;
                                                                case "THIRD":
                                                                    document.querySelector(
                                                                        ".year .year_select2_sequence"
                                                                    ).value = 2;
                                                                    break;
                                                                case "FOURTH":
                                                                    document.querySelector(
                                                                        ".year .year_select2_sequence"
                                                                    ).value = 3;
                                                                    break;
                                                                case "LAST":
                                                                    document.querySelector(
                                                                        ".year .year_select2_sequence"
                                                                    ).value = 4;
                                                                    break;
                                                            }
                                                        }
                                                        if (
                                                            endTime != undefined
                                                        ) {
                                                            var response2 = translateTime(
                                                                endTime
                                                            );
                                                            document.querySelector(
                                                                "#yearEndDate"
                                                            ).value =
                                                                response2.year +
                                                                "." +
                                                                response2.month +
                                                                "." +
                                                                response2.date;
                                                        }
                                                        document.querySelector(
                                                            "#yhn_yearHours"
                                                        ).value =
                                                            response.hours;
                                                        document.querySelector(
                                                            "#yhn_yearMinutes"
                                                        ).value =
                                                            response.minutes;
                                                        document.querySelector(
                                                            "#yhn_yearHalfDay"
                                                        ).value = response.am;
                                                        document.querySelector(
                                                            "#yearDate1"
                                                        ).value =
                                                            response.year +
                                                            "." +
                                                            response.month +
                                                            "." +
                                                            response.date;
                                                        if (
                                                            durations != "NaN"
                                                        ) {
                                                            document.querySelector(
                                                                ".regularDayNumber"
                                                            ).value =
                                                                durations /
                                                                (24 * 3600);
                                                        } else {
                                                            document.querySelector(
                                                                ".regularDayNumber"
                                                            ).value = 0;
                                                        }
                                                        break;
                                                    default:
                                                }
                                            } else {
                                                document.querySelector(
                                                    "#advancedChoosedPlan>option:nth-child(1)"
                                                ).selected = true;
                                                document.querySelector(
                                                    ".choosedContent>.onlyone"
                                                ).style.display = "block";
                                            }
                                        },
                                        data => {}
                                    );
                            },
                            data => {}
                        );
                };
                $scope.closePlan = () => {
                    document.querySelector(
                        ".advancedSettingPlan"
                    ).style.display = "none";
                  document.querySelector(
                    ".advancedSettingBox"
                  ).style.display = "block";
                };
                $scope.verifyNumber = () => {
                    var secondResult = parseInt($scope.secondNumber);
                    if (isNaN(secondResult)) {
                        document.querySelector(
                            ".second .startdateSecond>input:nth-child(3)"
                        ).style.borderColor = "red";
                    } else {
                        document.querySelector(
                            ".second .startdateSecond>input:nth-child(3)"
                        ).style.borderColor = "#D8D8D8";
                    }
                };
                $scope.hours = [
                    "01",
                    "02",
                    "03",
                    "04",
                    "05",
                    "06",
                    "07",
                    "08",
                    "09",
                    "10",
                    "11",
                    "12"
                ];
                $scope.minutes = [
                    "00",
                    "01",
                    "02",
                    "03",
                    "04",
                    "05",
                    "06",
                    "07",
                    "08",
                    "09",
                    "10",
                    "11",
                    "12",
                    "13",
                    "14",
                    "15",
                    "16",
                    "17",
                    "18",
                    "19",
                    "20",
                    "21",
                    "22",
                    "23",
                    "24",
                    "25",
                    "26",
                    "27",
                    "28",
                    "29",
                    "30",
                    "31",
                    "32",
                    "33",
                    "34",
                    "35",
                    "36",
                    "37",
                    "38",
                    "39",
                    "40",
                    "41",
                    "42",
                    "43",
                    "44",
                    "45",
                    "46",
                    "47",
                    "48",
                    "49",
                    "50",
                    "51",
                    "52",
                    "53",
                    "54",
                    "55",
                    "56",
                    "57",
                    "58",
                    "59"
                ];
                document.querySelector(
                    "#advancedChoosedPlan"
                ).onchange = () => {
                    var x = document.querySelector("#advancedChoosedPlan")
                        .value;
                    switch (x) {
                        case "onlyone":
                            var container = document.querySelectorAll(
                                ".choosedContent>div"
                            );
                            for (var i = 0; i < container.length; i++) {
                                container[i].style.display = "none";
                            }
                            document.querySelector(
                                ".choosedContent>.onlyone"
                            ).style.display = "block";
                            break;
                        case "second":
                            var container = document.querySelectorAll(
                                ".choosedContent>div"
                            );
                            for (var i = 0; i < container.length; i++) {
                                container[i].style.display = "none";
                            }
                            document.querySelector(
                                ".choosedContent>.second"
                            ).style.display = "block";
                            break;
                        case "minutes":
                            var container = document.querySelectorAll(
                                ".choosedContent>div"
                            );
                            for (var i = 0; i < container.length; i++) {
                                container[i].style.display = "none";
                            }
                            document.querySelector(
                                ".choosedContent>.minutes"
                            ).style.display = "block";
                            break;
                        case "hour":
                            var container = document.querySelectorAll(
                                ".choosedContent>div"
                            );
                            for (var i = 0; i < container.length; i++) {
                                container[i].style.display = "none";
                            }
                            document.querySelector(
                                ".choosedContent>.hours"
                            ).style.display = "block";
                            break;
                        case "day":
                            var container = document.querySelectorAll(
                                ".choosedContent>div"
                            );
                            for (var i = 0; i < container.length; i++) {
                                container[i].style.display = "none";
                            }
                            document.querySelector(
                                ".choosedContent>.day"
                            ).style.display = "block";
                            break;
                        case "week":
                            var container = document.querySelectorAll(
                                ".choosedContent>div"
                            );
                            for (var i = 0; i < container.length; i++) {
                                container[i].style.display = "none";
                            }
                            document.querySelector(
                                ".choosedContent>.week"
                            ).style.display = "block";
                            break;
                        case "month":
                            var container = document.querySelectorAll(
                                ".choosedContent>div"
                            );
                            for (var i = 0; i < container.length; i++) {
                                container[i].style.display = "none";
                            }
                            document.querySelector(
                                ".choosedContent>.month"
                            ).style.display = "block";
                            break;
                        case "year":
                            var container = document.querySelectorAll(
                                ".choosedContent>div"
                            );
                            for (var i = 0; i < container.length; i++) {
                                container[i].style.display = "none";
                            }
                            document.querySelector(
                                ".choosedContent>.year"
                            ).style.display = "block";
                            break;
                        case "taskplan":
                            var container = document.querySelectorAll(
                                ".choosedContent>div"
                            );
                            for (var i = 0; i < container.length; i++) {
                                container[i].style.display = "none";
                            }
                            document.querySelector(
                                ".choosedContent>.taskplan"
                            ).style.display = "block";
                            break;
                    }
                };
                /*验证是否大于当前时间,大于返回true，小于返回false*/
                $scope.verifyCurrentTime = (
                    year,
                    month,
                    date,
                    hour,
                    minutes
                ) => {
                    var a = new Date();
                    var yearsec = 365 * 24 * 60 * 60;
                    var monthsec = 30 * 24 * 60 * 60;
                    var datesec = 24 * 60 * 60;
                    var hoursec = 60 * 60;
                    var minutesec = 60;
                    var b =
                        a.getFullYear() * yearsec +
                        (a.getMonth() + 1) * monthsec +
                        a.getDate() * datesec +
                        a.getHours() * hoursec +
                        a.getMinutes() * minutesec;
                    var inputb =
                        year * yearsec +
                        month * monthsec +
                        date * datesec +
                        hour * hoursec +
                        minutes * minutesec;
                    if (inputb >= b) {
                        return true;
                    } else {
                        return false;
                    }
                };
                /*开始日期与结束日期对比*/
                $scope.endBeforeStart = (
                    year,
                    month,
                    date,
                    year1,
                    month1,
                    date1
                ) => {
                    var yearsec = 365 * 24 * 60 * 60;
                    var monthsec = 30 * 24 * 60 * 60;
                    var datesec = 24 * 60 * 60;
                    var inputstart =
                        year * yearsec + month * monthsec + date * datesec;
                    var inputend =
                        year1 * yearsec + month1 * monthsec + date1 * datesec;
                    if (inputend > inputstart) {
                        return true;
                    } else {
                        return false;
                    }
                };
                /*计划删除*/
                $scope.submitMyPlan = () => {
                  /*document.querySelector(".loader").style.display = "block";*/
                  // document.querySelector(".popup").style.display = "none";
                  // document.querySelector(".advancedSettingBox").style.display = "block";

                    /*进行正整数验证*/
                    function isPositiveNum(s) {
                        //是否为正整数
                        var re = /^[0-9]*[1-9][0-9]*$/;
                        return re.test(s);
                    }
                    var selector = document.querySelector(
                        "#advancedChoosedPlan"
                    ).value;
                    switch (selector) {
                        case "onlyone":
                            var year = document
                                .querySelector("#only1start")
                                .value.split("")
                                .splice(0, 4)
                                .join("");
                            var month = document
                                .querySelector("#only1start")
                                .value.split("")
                                .splice(5, 2)
                                .join("");
                            var date = document
                                .querySelector("#only1start")
                                .value.split("")
                                .splice(8, 2)
                                .join("");
                            var minutes = document.querySelector(
                                "#onlyoneMinute"
                            ).value;
                            var halfDay = document.querySelector(
                                "#onlyoneHalfDay"
                            ).value;
                            var hour =
                                document.querySelector("#onlyoneHalfDay")
                                    .value == "AM"
                                    ? document.querySelector("#onlyoneHour")
                                          .value
                                    : parseInt(
                                          document.querySelector("#onlyoneHour")
                                              .value
                                      ) + 12;
                            var myInputMs = (
                                document.querySelector(
                                    ".advancedSettingPlan .advancedPlanContent .regularDayNumber"
                                ).value *
                                24 *
                                60 *
                                60
                            ).toString();
                            var timeResult =
                                year +
                                "-" +
                                month +
                                "-" +
                                date +
                                "T" +
                                hour +
                                ":" +
                                minutes +
                                ":" +
                                "00.000+08:00";
                            /*添加时间验证*/
                            if (
                                $scope.verifyCurrentTime(
                                    year,
                                    month,
                                    date,
                                    hour,
                                    minutes
                                )
                            ) {
                                /*正整数验证*/
                                if (
                                    isPositiveNum(
                                        document.querySelector(
                                            ".advancedSettingPlan .advancedPlanContent .regularDayNumber"
                                        ).value
                                    )
                                ) {
                                    var url = "/xdatainsight/api/scheduler/job";
                                    var url2 = "/xdatainsight/api/scheduler/removeJob";
                                    var data = {
                                        jobName: "GeneratedContentCleaner",
                                        simpleJobTrigger: {
                                            uiPassParam: "RUN_ONCE",
                                            repeatInterval: 0,
                                            repeatCount: 0,
                                            startTime: timeResult,
                                            endTime: null
                                        },
                                        inputFile: "GeneratedContentCleaner",
                                        outputFile: "",
                                        jobParameters: [
                                            {
                                                name: "uiPassParam",
                                                type: "string",
                                                stringValue: ["RUN_ONCE"]
                                            },
                                            {
                                                name: "age",
                                                type: "string",
                                                stringValue: [myInputMs]
                                            },
                                            {
                                                name: "user_locale",
                                                type: "string",
                                                stringValue: ["zh_CN"]
                                            },
                                            {
                                                name:
                                                    "ActionAdapterQuartzJob-ActionUser",
                                                type: "string",
                                                stringValue: ["admin"]
                                            },
                                            {
                                                name:
                                                    "ActionAdapterQuartzJob-ActionClass",
                                                type: "string",
                                                stringValue: [
                                                    "org.pentaho.platform.admin.GeneratedContentCleaner"
                                                ]
                                            },
                                            {
                                                name: "lineage-id",
                                                type: "string",
                                                stringValue: [
                                                    "c364adbe-6eb9-4752-95ac-3895a6456592"
                                                ]
                                            }
                                        ],
                                        actionClass:
                                            "org.pentaho.platform.admin.GeneratedContentCleaner"
                                    };
                                    $http({
                                        method: "post",
                                        headers: {
                                            contentType:
                                                "application/json; charset=utf-8",
                                            accept: "text/plain"
                                        },
                                        url: url,
                                        dataType: "text/plain",
                                        data: data
                                    })
                                        .success(data => {
                                            if ($rootScope.initialData != "") {
                                                $http({
                                                    method: "DELETE",
                                                    headers: {
                                                        "content-Type":
                                                            "application/json; charset=utf-8",
                                                        accept: "*/*"
                                                    },
                                                    url: url2,
                                                    data: {
                                                        jobId: $rootScope.ll
                                                    }
                                                })
                                                    .success(data => {
                                                        var currentDate = new Date();
                                                        var currentTime = currentDate.getTime();
                                                        advancedSettingProvider
                                                            .callItunes(
                                                                "/xdatainsight/api/scheduler/getContentCleanerJob?cb=" +
                                                                    currentTime
                                                            )
                                                            .then(
                                                                data => {
                                                                    $rootScope.ll =
                                                                        data.jobId;
                                                                    $rootScope.initialData = data;
                                                                    document.querySelector(
                                                                        ".loader"
                                                                    ).style.display =
                                                                        "none";
                                                                    document.querySelector(
                                                                        ".advancedSettingPlan"
                                                                    ).style.display =
                                                                        "none";

                                                                  document.querySelector(
                                                                    ".advancedSettingBox"
                                                                  ).style.display =
                                                                    "block";

                                                                    document.querySelector(
                                                                        ".popup"
                                                                      ).style.display =
                                                                        "block";

                                                                },
                                                                data => {}
                                                            );
                                                    })
                                                    .error(data => {});
                                            } else {
                                                var currentDate = new Date();
                                                var currentTime = currentDate.getTime();
                                                advancedSettingProvider
                                                    .callItunes(
                                                        "/xdatainsight/api/scheduler/getContentCleanerJob?cb=" +
                                                            currentTime
                                                    )
                                                    .then(
                                                        data => {
                                                            document.querySelector(
                                                                ".advancedSettingContent .deletePlan"
                                                            ).style.display =
                                                                "inline-block";
                                                            document.querySelector(
                                                                ".advancedSettingContent .planToDelete"
                                                            ).innerHTML =
                                                                "编辑计划";
                                                            $rootScope.ll =
                                                                data.jobId;
                                                            $rootScope.initialData = data;
                                                            document.querySelector(
                                                                ".loader"
                                                            ).style.display =
                                                                "none";
                                                            document.querySelector(
                                                              ".advancedSettingPlan"
                                                            ).style.display =
                                                              "none";

                                                            document.querySelector(
                                                              ".advancedSettingBox"
                                                            ).style.display =
                                                              "block";

                                                            document.querySelector(
                                                              ".popup"
                                                            ).style.display =
                                                              "block";
                                                        },
                                                        data => {}
                                                    );
                                            }
                                        })
                                        .error(data => {});
                                } else {
                                    document.querySelector(".advancedSettingPlan").style.display = "none";
                                    document.querySelector(
                                        ".deleteTips3"
                                    ).style.display = "block";
                                }
                            } else {
                                document.querySelector(".advancedSettingPlan").style.display = "none";
                                document.querySelector(
                                    ".deleteTips2"
                                ).style.display = "block";
                            }
                            break;
                        case "second":
                            var startyear = document
                                .querySelector("#secondDate1")
                                .value.split("")
                                .splice(0, 4)
                                .join("");
                            var startmonth = document
                                .querySelector("#secondDate1")
                                .value.split("")
                                .splice(5, 2)
                                .join("");
                            var startdate = document
                                .querySelector("#secondDate1")
                                .value.split("")
                                .splice(8, 2)
                                .join("");
                            var endyear = document
                                .querySelector("#secondEndDate")
                                .value.split("")
                                .splice(0, 4)
                                .join("");
                            var endmonth = document
                                .querySelector("#secondEndDate")
                                .value.split("")
                                .splice(5, 2)
                                .join("");
                            var enddate = document
                                .querySelector("#secondEndDate")
                                .value.split("")
                                .splice(8, 2)
                                .join("");
                            var secondminutes = document.querySelector(
                                "#yhn_secondMinutes"
                            ).value;
                            var halfDay = document.querySelector(
                                "#yhn_secondHalfDay"
                            ).value;
                            var repeatInterval = document.querySelector(
                                ".second>.startdateSecond>input"
                            ).value
                                ? parseInt(
                                      document.querySelector(
                                          ".second>.startdateSecond>input"
                                      ).value
                                  )
                                : 0;
                            var secondhour =
                                document.querySelector("#yhn_secondHalfDay")
                                    .value == "AM"
                                    ? document.querySelector("#yhn_secondHour")
                                          .value
                                    : parseInt(
                                          document.querySelector(
                                              "#yhn_secondHour"
                                          ).value
                                      ) + 12;
                            var timeResultStart =
                                startyear +
                                "-" +
                                startmonth +
                                "-" +
                                startdate +
                                "T" +
                                secondhour +
                                ":" +
                                secondminutes +
                                ":" +
                                "00.000+08:00";
                            var timeResultEnd =
                                endyear +
                                "-" +
                                endmonth +
                                "-" +
                                enddate +
                                "T" +
                                secondhour +
                                ":" +
                                secondminutes +
                                ":" +
                                "00.000+08:00";
                            var myEndTime = document.querySelector(
                                "#secondEndDate"
                            ).value
                                ? timeResultEnd
                                : null;
                            var myInputMs = (
                                document.querySelector(
                                    ".advancedSettingPlan .advancedPlanContent .regularDayNumber"
                                ).value *
                                24 *
                                60 *
                                60
                            ).toString();
                            /*信息完整验证*/
                            if (
                                document.querySelector(
                                    ".advancedSettingPlan .advancedPlanContent .regularDayNumber"
                                ).value != "" &&
                                document.querySelector(
                                    ".second>.startdateSecond>input"
                                ).value != "" &&
                                document.querySelector("#secondEndDate")
                                    .value != "" &&
                                document.querySelector("#secondDate1").value !=
                                    "" &&
                                document.querySelector("#secondEndDate")
                                    .value != ""
                            ) {
                                /*天数合理性验证*/
                                if (
                                    isPositiveNum(
                                        document.querySelector(
                                            ".advancedSettingPlan .advancedPlanContent .regularDayNumber"
                                        ).value
                                    )
                                ) {
                                    /*秒数填写验证*/
                                    if (
                                        isPositiveNum(
                                            document.querySelector(
                                                ".second>.startdateSecond>input"
                                            ).value
                                        )
                                    ) {
                                        /*开始日期验证,需要满足大于当前时间*/
                                        if (
                                            $scope.verifyCurrentTime(
                                                startyear,
                                                startmonth,
                                                startdate,
                                                secondhour,
                                                secondminutes
                                            )
                                        ) {
                                            /*结束日期应当晚于开始日期*/
                                            if (
                                                $scope.endBeforeStart(
                                                    startyear,
                                                    startmonth,
                                                    startdate,
                                                    endyear,
                                                    endmonth,
                                                    enddate
                                                )
                                            ) {
                                                var url = "/xdatainsight/api/scheduler/job";
                                                var url2 =
                                                    "/xdatainsight/api/scheduler/removeJob";
                                                var data = {
                                                    jobName:
                                                        "GeneratedContentCleaner",
                                                    simpleJobTrigger: {
                                                        uiPassParam: "SECONDS",
                                                        repeatInterval: repeatInterval,
                                                        repeatCount: -1,
                                                        startTime: timeResultStart,
                                                        endTime: myEndTime
                                                    },
                                                    inputFile:
                                                        "GeneratedContentCleaner",
                                                    outputFile: "",
                                                    jobParameters: [
                                                        {
                                                            name: "uiPassParam",
                                                            type: "string",
                                                            stringValue: [
                                                                "RUN_ONCE"
                                                            ]
                                                        },
                                                        {
                                                            name: "age",
                                                            type: "string",
                                                            stringValue: [
                                                                myInputMs
                                                            ]
                                                        },
                                                        {
                                                            name: "user_locale",
                                                            type: "string",
                                                            stringValue: [
                                                                "zh_CN"
                                                            ]
                                                        },
                                                        {
                                                            name:
                                                                "ActionAdapterQuartzJob-ActionUser",
                                                            type: "string",
                                                            stringValue: [
                                                                "admin"
                                                            ]
                                                        },
                                                        {
                                                            name:
                                                                "ActionAdapterQuartzJob-ActionClass",
                                                            type: "string",
                                                            stringValue: [
                                                                "org.pentaho.platform.admin.GeneratedContentCleaner"
                                                            ]
                                                        },
                                                        {
                                                            name: "lineage-id",
                                                            type: "string",
                                                            stringValue: [
                                                                "4ef9c35f-036c-4a0e-9389-c04b16d3aa66"
                                                            ]
                                                        }
                                                    ],
                                                    actionClass:
                                                        "org.pentaho.platform.admin.GeneratedContentCleaner"
                                                };
                                                if (!isNaN(repeatInterval)) {
                                                    document.querySelector(
                                                        ".second .startdateSecond>input"
                                                    ).style.borderColor =
                                                        "#d8d8d8";
                                                    $http({
                                                        method: "post",
                                                        headers: {
                                                            contentType:
                                                                "application/json; charset=utf-8",
                                                            accept: "text/plain"
                                                        },
                                                        url: url,
                                                        dataType: "text/plain",
                                                        data: data
                                                    })
                                                        .success(data => {
                                                            if (
                                                                $rootScope.initialData !=
                                                                ""
                                                            ) {
                                                                $http({
                                                                    method:
                                                                        "DELETE",
                                                                    headers: {
                                                                        "content-Type":
                                                                            "application/json; charset=utf-8",
                                                                        accept:
                                                                            "*/*"
                                                                    },
                                                                    url: url2,
                                                                    data: {
                                                                        jobId:
                                                                            $rootScope.ll
                                                                    }
                                                                })
                                                                    .success(
                                                                        data => {
                                                                            var currentDate = new Date();
                                                                            var currentTime = currentDate.getTime();
                                                                            advancedSettingProvider
                                                                                .callItunes(
                                                                                    "/xdatainsight/api/scheduler/getContentCleanerJob?cb=" +
                                                                                        currentTime
                                                                                )
                                                                                .then(
                                                                                    data => {
                                                                                        $rootScope.ll =
                                                                                            data.jobId;
                                                                                        $rootScope.initialData = data;
                                                                                        document.querySelector(
                                                                                            ".loader"
                                                                                        ).style.display =
                                                                                            "none";
                                                                                        document.querySelector(
                                                                                            ".advancedSettingPlan"
                                                                                        ).style.display =
                                                                                            "none";

                                                                                      document.querySelector(
                                                                                        ".advancedSettingBox"
                                                                                      ).style.display =
                                                                                        "block";
                                                                                        document.querySelector(".popup").style.display = "block";
                                                                                    },
                                                                                    data => {}
                                                                                );
                                                                        }
                                                                    )
                                                                    .error(
                                                                        data => {}
                                                                    );
                                                            } else {
                                                                var currentDate = new Date();
                                                                var currentTime = currentDate.getTime();
                                                                advancedSettingProvider
                                                                    .callItunes(
                                                                        "/xdatainsight/api/scheduler/getContentCleanerJob?cb=" +
                                                                            currentTime
                                                                    )
                                                                    .then(
                                                                        data => {
                                                                            document.querySelector(
                                                                                ".advancedSettingContent .deletePlan"
                                                                            ).style.display =
                                                                                "inline-block";
                                                                            document.querySelector(
                                                                                ".advancedSettingContent .planToDelete"
                                                                            ).innerHTML =
                                                                                "编辑计划";
                                                                            $rootScope.ll =
                                                                                data.jobId;
                                                                            $rootScope.initialData = data;

                                                                          document.querySelector(
                                                                            ".popup"
                                                                          ).style.display =
                                                                            "block";
                                                                          document.querySelector(
                                                                            ".advancedSettingBox"
                                                                          ).style.display =
                                                                            "block";
                                                                            document.querySelector(
                                                                                ".loader"
                                                                            ).style.display =
                                                                                "none";
                                                                            document.querySelector(
                                                                                ".advancedSettingPlan"
                                                                            ).style.display =
                                                                                "none";
                                                                        },
                                                                        data => {}
                                                                    );
                                                            }
                                                        })
                                                        .error(data => {});
                                                } else {
                                                    document.querySelector(
                                                        ".second .startdateSecond>input"
                                                    ).style.borderColor = "red";
                                                }
                                            } else {
                                                document.querySelector('.advancedSettingPlan').style.display = 'none';
                                                $scope.showDangerousTips(
                                                    "结束日期应当晚于开始日期"
                                                );
                                            }
                                        } else {
                                            document.querySelector('.advancedSettingPlan').style.display = 'none';
                                            $scope.showDangerousTips(
                                                "开始日期需晚于系统当前时间"
                                            );
                                        }
                                    } else {
                                        document.querySelector('.advancedSettingPlan').style.display = 'none';
                                        $scope.showDangerousTips(
                                            "秒数填写错误"
                                        );
                                    }
                                } else {
                                    document.querySelector('.advancedSettingPlan').style.display = 'none';
                                    $scope.showDangerousTips("天数填写错误");
                                }
                            } else {
                                document.querySelector('.advancedSettingPlan').style.display = 'none';
                                $scope.showDangerousTips("信息未填写完整");
                            }
                            break;
                        case "minutes":
                            var startyear = document
                                .querySelector("#minutesDate1")
                                .value.split("")
                                .splice(0, 4)
                                .join("");
                            var startmonth = document
                                .querySelector("#minutesDate1")
                                .value.split("")
                                .splice(5, 2)
                                .join("");
                            var startdate = document
                                .querySelector("#minutesDate1")
                                .value.split("")
                                .splice(8, 2)
                                .join("");
                            var endyear = document
                                .querySelector("#minutesEndDate")
                                .value.split("")
                                .splice(0, 4)
                                .join("");
                            var endmonth = document
                                .querySelector("#minutesEndDate")
                                .value.split("")
                                .splice(5, 2)
                                .join("");
                            var enddate = document
                                .querySelector("#minutesEndDate")
                                .value.split("")
                                .splice(8, 2)
                                .join("");
                            var secondminutes = document.querySelector(
                                "#yhn_minutesMinutes"
                            ).value;
                            var halfDay = document.querySelector(
                                "#yhn_minutesHalfDay"
                            ).value;
                            var repeatInterval =
                                (document.querySelector(
                                    ".minutes>.startdateSecond>input"
                                ).value
                                    ? parseInt(
                                          document.querySelector(
                                              ".minutes>.startdateSecond>input"
                                          ).value
                                      )
                                    : 0) * 60;
                            var secondhour =
                                document.querySelector("#yhn_minutesHalfDay")
                                    .value == "AM"
                                    ? document.querySelector("#yhn_minutesHour")
                                          .value
                                    : parseInt(
                                          document.querySelector(
                                              "#yhn_minutesHour"
                                          ).value
                                      ) + 12;
                            var timeResultStart =
                                startyear +
                                "-" +
                                startmonth +
                                "-" +
                                startdate +
                                "T" +
                                secondhour +
                                ":" +
                                secondminutes +
                                ":" +
                                "00.000+08:00";
                            var timeResultEnd =
                                endyear +
                                "-" +
                                endmonth +
                                "-" +
                                enddate +
                                "T" +
                                secondhour +
                                ":" +
                                secondminutes +
                                ":" +
                                "00.000+08:00";
                            var myEndTime = document.querySelector(
                                "#minutesEndDate"
                            ).value
                                ? timeResultEnd
                                : null;
                            var myInputMs = (
                                document.querySelector(
                                    ".advancedSettingPlan .advancedPlanContent .regularDayNumber"
                                ).value *
                                24 *
                                60 *
                                60
                            ).toString();
                            //信息完整验证
                            if (
                                document.querySelector(
                                    ".advancedSettingPlan .advancedPlanContent .regularDayNumber"
                                ).value != "" &&
                                document.querySelector(
                                    ".minutes>.startdateSecond>input"
                                ).value != "" &&
                                document.querySelector("#minutesDate1").value !=
                                    "" &&
                                document.querySelector("#minutesEndDate")
                                    .value != ""
                            ) {
                                //天数合理性验证
                                if (
                                    isPositiveNum(
                                        document.querySelector(
                                            ".advancedSettingPlan .advancedPlanContent .regularDayNumber"
                                        ).value
                                    )
                                ) {
                                    //分钟数合理性验证
                                    if (
                                        isPositiveNum(
                                            document.querySelector(
                                                ".minutes>.startdateSecond>input"
                                            ).value
                                        )
                                    ) {
                                        //开始日期晚于当前时间验证
                                        if (
                                            $scope.verifyCurrentTime(
                                                startyear,
                                                startmonth,
                                                startdate,
                                                secondhour,
                                                secondminutes
                                            )
                                        ) {
                                            //结束日期应当晚于开始日期
                                            if (
                                                $scope.endBeforeStart(
                                                    startyear,
                                                    startmonth,
                                                    startdate,
                                                    endyear,
                                                    endmonth,
                                                    enddate
                                                )
                                            ) {
                                                var url = "/xdatainsight/api/scheduler/job";
                                                var url2 =
                                                    "/xdatainsight/api/scheduler/removeJob";
                                                var data = {
                                                    jobName:
                                                        "GeneratedContentCleaner",
                                                    simpleJobTrigger: {
                                                        uiPassParam: "MINUTES",
                                                        repeatInterval: repeatInterval,
                                                        repeatCount: -1,
                                                        startTime: timeResultStart,
                                                        endTime: timeResultEnd
                                                    },
                                                    inputFile:
                                                        "GeneratedContentCleaner",
                                                    outputFile: "",
                                                    jobParameters: [
                                                        {
                                                            name: "uiPassParam",
                                                            type: "string",
                                                            stringValue: [
                                                                "RUN_ONCE"
                                                            ]
                                                        },
                                                        {
                                                            name: "age",
                                                            type: "string",
                                                            stringValue: [
                                                                myInputMs
                                                            ]
                                                        },
                                                        {
                                                            name: "user_locale",
                                                            type: "string",
                                                            stringValue: [
                                                                "zh_CN"
                                                            ]
                                                        },
                                                        {
                                                            name:
                                                                "ActionAdapterQuartzJob-ActionUser",
                                                            type: "string",
                                                            stringValue: [
                                                                "admin"
                                                            ]
                                                        },
                                                        {
                                                            name:
                                                                "ActionAdapterQuartzJob-ActionClass",
                                                            type: "string",
                                                            stringValue: [
                                                                "org.pentaho.platform.admin.GeneratedContentCleaner"
                                                            ]
                                                        },
                                                        {
                                                            name: "lineage-id",
                                                            type: "string",
                                                            stringValue: [
                                                                "c364adbe-6eb9-4752-95ac-3895a6456592"
                                                            ]
                                                        }
                                                    ],
                                                    actionClass:
                                                        "org.pentaho.platform.admin.GeneratedContentCleaner"
                                                };
                                                if (!isNaN(repeatInterval)) {
                                                    document.querySelector(
                                                        ".minutes .startdateSecond>input"
                                                    ).style.borderColor =
                                                        "#d8d8d8";
                                                    $http({
                                                        method: "post",
                                                        headers: {
                                                            contentType:
                                                                "application/json; charset=utf-8",
                                                            accept: "text/plain"
                                                        },
                                                        url: url,
                                                        dataType: "text/plain",
                                                        data: data
                                                    })
                                                        .success(data => {
                                                            if (
                                                                $rootScope.initialData !=
                                                                ""
                                                            ) {
                                                                $http({
                                                                    method:
                                                                        "DELETE",
                                                                    headers: {
                                                                        "content-Type":
                                                                            "application/json; charset=utf-8",
                                                                        accept:
                                                                            "*/*"
                                                                    },
                                                                    url: url2,
                                                                    data: {
                                                                        jobId:
                                                                            $rootScope.ll
                                                                    }
                                                                })
                                                                    .success(
                                                                        data => {
                                                                            var currentDate = new Date();
                                                                            var currentTime = currentDate.getTime();
                                                                            advancedSettingProvider
                                                                                .callItunes(
                                                                                    "/xdatainsight/api/scheduler/getContentCleanerJob?cb=" +
                                                                                        currentTime
                                                                                )
                                                                                .then(
                                                                                    data => {
                                                                                        $rootScope.ll =
                                                                                            data.jobId;
                                                                                        $rootScope.initialData = data;
                                                                                        document.querySelector(
                                                                                            ".loader"
                                                                                        ).style.display =
                                                                                            "none";
                                                                                      document.querySelector(
                                                                                        ".advancedSettingBox"
                                                                                      ).style.display =
                                                                                        "block";

                                                                                        document.querySelector(
                                                                                            ".advancedSettingPlan"
                                                                                        ).style.display =
                                                                                            "none";
                                                                                        document.querySelector(
                                                                                          ".popup"
                                                                                        ).style.display =
                                                                                          "block";
                                                                                    },
                                                                                    data => {}
                                                                                );
                                                                        }
                                                                    )
                                                                    .error(
                                                                        data => {}
                                                                    );
                                                            } else {
                                                                var currentDate = new Date();
                                                                var currentTime = currentDate.getTime();
                                                                advancedSettingProvider
                                                                    .callItunes(
                                                                        "/xdatainsight/api/scheduler/getContentCleanerJob?cb=" +
                                                                            currentTime
                                                                    )
                                                                    .then(
                                                                        data => {
                                                                            document.querySelector(
                                                                                ".advancedSettingContent .deletePlan"
                                                                            ).style.display =
                                                                                "inline-block";
                                                                            document.querySelector(
                                                                                ".advancedSettingContent .planToDelete"
                                                                            ).innerHTML =
                                                                                "编辑计划";
                                                                            $rootScope.ll =
                                                                                data.jobId;
                                                                            $rootScope.initialData = data;
                                                                            document.querySelector(
                                                                                ".loader"
                                                                            ).style.display =
                                                                                "none";
                                                                          document.querySelector(
                                                                            ".advancedSettingBox"
                                                                          ).style.display =
                                                                            "block";
                                                                            document.querySelector(
                                                                                ".advancedSettingPlan"
                                                                            ).style.display =
                                                                                "none";
                                                                            document.querySelector(
                                                                              ".popup"
                                                                            ).style.display =
                                                                              "block";
                                                                        },
                                                                        data => {}
                                                                    );
                                                            }
                                                        })
                                                        .error(data => {});
                                                } else {
                                                    document.querySelector(
                                                        ".minutes .startdateSecond>input"
                                                    ).style.borderColor = "red";
                                                }
                                            } else {
                                                document.querySelector('.advancedSettingPlan').style.display = 'none';
                                                $scope.showDangerousTips(
                                                    "结束日期应当晚于开始日期"
                                                );
                                            }
                                        } else {
                                            document.querySelector('.advancedSettingPlan').style.display = 'none';
                                            $scope.showDangerousTips(
                                                "开始日期需晚于系统当前时间"
                                            );
                                        }
                                    } else {
                                        document.querySelector('.advancedSettingPlan').style.display = 'none';
                                        $scope.showDangerousTips(
                                            "分钟数填写错误"
                                        );
                                    }
                                } else {
                                    document.querySelector('.advancedSettingPlan').style.display = 'none';
                                    $scope.showDangerousTips("天数填写错误");
                                }
                            } else {
                                document.querySelector('.advancedSettingPlan').style.display = 'none';
                                $scope.showDangerousTips("信息未填写完整");
                            }
                            break;
                        case "hour":
                            var startyear = document
                                .querySelector("#hoursDate1")
                                .value.split("")
                                .splice(0, 4)
                                .join("");
                            var startmonth = document
                                .querySelector("#hoursDate1")
                                .value.split("")
                                .splice(5, 2)
                                .join("");
                            var startdate = document
                                .querySelector("#hoursDate1")
                                .value.split("")
                                .splice(8, 2)
                                .join("");
                            var endyear = document
                                .querySelector("#hoursEndDate")
                                .value.split("")
                                .splice(0, 4)
                                .join("");
                            var endmonth = document
                                .querySelector("#hoursEndDate")
                                .value.split("")
                                .splice(5, 2)
                                .join("");
                            var enddate = document
                                .querySelector("#hoursEndDate")
                                .value.split("")
                                .splice(8, 2)
                                .join("");
                            var secondminutes = document.querySelector(
                                "#yhn_hoursMinutes"
                            ).value;
                            var halfDay = document.querySelector(
                                "#yhn_hoursHalfDay"
                            ).value;
                            var repeatInterval =
                                (document.querySelector(
                                    ".hours>.startdateSecond>input"
                                ).value
                                    ? parseInt(
                                          document.querySelector(
                                              ".hours>.startdateSecond>input"
                                          ).value
                                      )
                                    : 0) * 3600;
                            var secondhour =
                                document.querySelector("#yhn_hoursHalfDay")
                                    .value == "AM"
                                    ? document.querySelector("#yhn_hoursHour")
                                          .value
                                    : parseInt(
                                          document.querySelector(
                                              "#yhn_hoursHour"
                                          ).value
                                      ) + 12;
                            var timeResultStart =
                                startyear +
                                "-" +
                                startmonth +
                                "-" +
                                startdate +
                                "T" +
                                secondhour +
                                ":" +
                                secondminutes +
                                ":" +
                                "00.000+08:00";
                            var timeResultEnd =
                                endyear +
                                "-" +
                                endmonth +
                                "-" +
                                enddate +
                                "T" +
                                secondhour +
                                ":" +
                                secondminutes +
                                ":" +
                                "00.000+08:00";
                            var myEndTime = document.querySelector(
                                "#hoursEndDate"
                            ).value
                                ? timeResultEnd
                                : null;
                            var myInputMs = (
                                document.querySelector(
                                    ".advancedSettingPlan .advancedPlanContent .regularDayNumber"
                                ).value *
                                24 *
                                60 *
                                60
                            ).toString();
                            //信息完整验证
                            if (
                                document.querySelector(
                                    ".advancedSettingPlan .advancedPlanContent .regularDayNumber"
                                ).value != "" &&
                                document.querySelector(
                                    ".hours>.startdateSecond>input"
                                ).value != "" &&
                                document.querySelector("#hoursDate1").value !=
                                    "" &&
                                document.querySelector("#hoursEndDate").value !=
                                    ""
                            ) {
                                //天数验证
                                if (
                                    isPositiveNum(
                                        document.querySelector(
                                            ".advancedSettingPlan .advancedPlanContent .regularDayNumber"
                                        ).value
                                    )
                                ) {
                                    //小时验证
                                    if (
                                        isPositiveNum(
                                            document.querySelector(
                                                ".hours>.startdateSecond>input"
                                            ).value
                                        )
                                    ) {
                                        //开始日期与系统时间验证
                                        if (
                                            $scope.verifyCurrentTime(
                                                startyear,
                                                startmonth,
                                                startdate,
                                                secondhour,
                                                secondminutes
                                            )
                                        ) {
                                            //开始日期与结束日期验证
                                            if (
                                                $scope.endBeforeStart(
                                                    startyear,
                                                    startmonth,
                                                    startdate,
                                                    endyear,
                                                    endmonth,
                                                    enddate
                                                )
                                            ) {
                                                var url = "/xdatainsight/api/scheduler/job";
                                                var url2 =
                                                    "/xdatainsight/api/scheduler/removeJob";
                                                var data = {
                                                    jobName:
                                                        "GeneratedContentCleaner",
                                                    simpleJobTrigger: {
                                                        uiPassParam: "HOURS",
                                                        repeatInterval: repeatInterval,
                                                        repeatCount: -1,
                                                        startTime: timeResultStart,
                                                        endTime: timeResultEnd
                                                    },
                                                    inputFile:
                                                        "GeneratedContentCleaner",
                                                    outputFile: "",
                                                    jobParameters: [
                                                        {
                                                            name: "uiPassParam",
                                                            type: "string",
                                                            stringValue: [
                                                                "RUN_ONCE"
                                                            ]
                                                        },
                                                        {
                                                            name: "age",
                                                            type: "string",
                                                            stringValue: [
                                                                myInputMs
                                                            ]
                                                        },
                                                        {
                                                            name: "user_locale",
                                                            type: "string",
                                                            stringValue: [
                                                                "zh_CN"
                                                            ]
                                                        },
                                                        {
                                                            name:
                                                                "ActionAdapterQuartzJob-ActionUser",
                                                            type: "string",
                                                            stringValue: [
                                                                "admin"
                                                            ]
                                                        },
                                                        {
                                                            name:
                                                                "ActionAdapterQuartzJob-ActionClass",
                                                            type: "string",
                                                            stringValue: [
                                                                "org.pentaho.platform.admin.GeneratedContentCleaner"
                                                            ]
                                                        },
                                                        {
                                                            name: "lineage-id",
                                                            type: "string",
                                                            stringValue: [
                                                                "c364adbe-6eb9-4752-95ac-3895a6456592"
                                                            ]
                                                        }
                                                    ],
                                                    actionClass:
                                                        "org.pentaho.platform.admin.GeneratedContentCleaner"
                                                };
                                                if (!isNaN(repeatInterval)) {
                                                    document.querySelector(
                                                        ".hours .startdateSecond>input"
                                                    ).style.borderColor =
                                                        "#d8d8d8";
                                                    $http({
                                                        method: "post",
                                                        headers: {
                                                            contentType:
                                                                "application/json; charset=utf-8",
                                                            accept: "text/plain"
                                                        },
                                                        url: url,
                                                        dataType: "text/plain",
                                                        data: data
                                                    })
                                                        .success(data => {
                                                            if (
                                                                $rootScope.initialData !=
                                                                ""
                                                            ) {
                                                                $http({
                                                                    method:
                                                                        "DELETE",
                                                                    headers: {
                                                                        "content-Type":
                                                                            "application/json; charset=utf-8",
                                                                        accept:
                                                                            "*/*"
                                                                    },
                                                                    url: url2,
                                                                    data: {
                                                                        jobId:
                                                                            $rootScope.ll
                                                                    }
                                                                })
                                                                    .success(
                                                                        data => {
                                                                            var currentDate = new Date();
                                                                            var currentTime = currentDate.getTime();
                                                                            advancedSettingProvider
                                                                                .callItunes(
                                                                                    "/xdatainsight/api/scheduler/getContentCleanerJob?cb=" +
                                                                                        currentTime
                                                                                )
                                                                                .then(
                                                                                    data => {
                                                                                        $rootScope.ll =
                                                                                            data.jobId;
                                                                                        $rootScope.initialData = data;
                                                                                      document.querySelector('.advancedSettingBox').style.display = 'block';
                                                                                        document.querySelector(
                                                                                            ".loader"
                                                                                        ).style.display =
                                                                                            "none";
                                                                                        document.querySelector(
                                                                                            ".advancedSettingPlan"
                                                                                        ).style.display =
                                                                                            "none";
                                                                                        document.querySelector('.popup').style.display = 'block';
                                                                                    },
                                                                                    data => {}
                                                                                );
                                                                        }
                                                                    )
                                                                    .error(
                                                                        data => {}
                                                                    );
                                                            } else {
                                                                var currentDate = new Date();
                                                                var currentTime = currentDate.getTime();
                                                                advancedSettingProvider
                                                                    .callItunes(
                                                                        "/xdatainsight/api/scheduler/getContentCleanerJob?cb=" +
                                                                            currentTime
                                                                    )
                                                                    .then(
                                                                        data => {
                                                                            document.querySelector(
                                                                                ".advancedSettingContent .deletePlan"
                                                                            ).style.display =
                                                                                "inline-block";
                                                                            document.querySelector(
                                                                                ".advancedSettingContent .planToDelete"
                                                                            ).innerHTML =
                                                                                "编辑计划";
                                                                            $rootScope.ll =
                                                                                data.jobId;
                                                                            $rootScope.initialData = data;
                                                                            document.querySelector(
                                                                                ".loader"
                                                                            ).style.display =
                                                                                "none";
                                                                          document.querySelector('.advancedSettingBox').style.display = 'block';

                                                                            document.querySelector(
                                                                                ".advancedSettingPlan"
                                                                            ).style.display =
                                                                                "none";
                                                                            document.querySelector('.popup').style.display = 'block';
                                                                        },
                                                                        data => {}
                                                                    );
                                                            }
                                                        })
                                                        .error(data => {});
                                                } else {
                                                    document.querySelector(
                                                        ".hours .startdateSecond>input"
                                                    ).style.borderColor = "red";
                                                }
                                            } else {
                                              document.querySelector('.advancedSettingPlan').style.display = 'none';
                                                $scope.showDangerousTips(
                                                    "结束日期应当晚于开始日期"
                                                );
                                            }
                                        } else {
                                          document.querySelector('.advancedSettingPlan').style.display = 'none';
                                            $scope.showDangerousTips(
                                                "开始日期需晚于系统当前时间"
                                            );
                                        }
                                    } else {
                                      document.querySelector('.advancedSettingPlan').style.display = 'none';
                                        $scope.showDangerousTips(
                                            "分钟数填写错误"
                                        );
                                    }
                                } else {
                                  document.querySelector('.advancedSettingPlan').style.display = 'none';
                                    $scope.showDangerousTips("天数填写错误");
                                }
                            } else {
                                document.querySelector('.advancedSettingPlan').style.display = 'none';
                                $scope.showDangerousTips("信息未填写完整");
                            }

                            break;
                        case "day":
                            var startyear = document
                                .querySelector("#dayDate1")
                                .value.split("")
                                .splice(0, 4)
                                .join("");
                            var startmonth = document
                                .querySelector("#dayDate1")
                                .value.split("")
                                .splice(5, 2)
                                .join("");
                            var startdate = document
                                .querySelector("#dayDate1")
                                .value.split("")
                                .splice(8, 2)
                                .join("");
                            var endyear = document
                                .querySelector("#dayEndDate")
                                .value.split("")
                                .splice(0, 4)
                                .join("");
                            var endmonth = document
                                .querySelector("#dayEndDate")
                                .value.split("")
                                .splice(5, 2)
                                .join("");
                            var enddate = document
                                .querySelector("#dayEndDate")
                                .value.split("")
                                .splice(8, 2)
                                .join("");
                            var secondminutes = document.querySelector(
                                "#yhn_dayMinutes"
                            ).value;
                            var secondminutes = document.querySelector(
                                "#yhn_dayMinutes"
                            ).value;
                            var halfDay = document.querySelector(
                                "#yhn_dayHalfDay"
                            ).value;
                            var repeatInterval =
                                (document.querySelector(
                                    ".day>.startdateSecond>input:nth-child(4)"
                                ).value
                                    ? parseInt(
                                          document.querySelector(
                                              ".day>.startdateSecond>input:nth-child(4)"
                                          ).value
                                      )
                                    : 0) *
                                3600 *
                                24;
                            var secondhour =
                                document.querySelector("#yhn_dayHalfDay")
                                    .value == "AM"
                                    ? document.querySelector("#yhn_dayHours")
                                          .value
                                    : parseInt(
                                          document.querySelector(
                                              "#yhn_dayHours"
                                          ).value
                                      ) + 12;
                            var timeResultStart =
                                startyear +
                                "-" +
                                startmonth +
                                "-" +
                                startdate +
                                "T" +
                                secondhour +
                                ":" +
                                secondminutes +
                                ":" +
                                "00.000+08:00";
                            var timeResultEnd =
                                endyear +
                                "-" +
                                endmonth +
                                "-" +
                                enddate +
                                "T" +
                                secondhour +
                                ":" +
                                secondminutes +
                                ":" +
                                "00.000+08:00";
                            var myEndTime = document.querySelector(
                                "#dayEndDate"
                            ).value
                                ? timeResultEnd
                                : null;
                            var myInputMs = (
                                document.querySelector(
                                    ".advancedSettingPlan .advancedPlanContent .regularDayNumber"
                                ).value *
                                24 *
                                60 *
                                60
                            ).toString();
                            //信息完整验证check1
                            if (
                                (document.querySelector("#daysChoose1")
                                    .checked == true &&
                                    document.querySelector(
                                        ".day>.startdateSecond>input:nth-child(4)"
                                    ).value != "") ||
                                document.querySelector("#daysChoose2")
                                    .checked == true
                            ) {
                                //信息未完整
                                if (
                                    document.querySelector(
                                        ".advancedSettingPlan .advancedPlanContent .regularDayNumber"
                                    ).value != "" &&
                                    document.querySelector("#dayDate1").value !=
                                        "" &&
                                    document.querySelector("#dayEndDate")
                                        .value != ""
                                ) {
                                    //周期验证
                                    if (
                                        (document.querySelector("#daysChoose1")
                                            .checked == true &&
                                            isPositiveNum(
                                                document.querySelector(
                                                    ".day>.startdateSecond>input:nth-child(4)"
                                                ).value
                                            )) ||
                                        document.querySelector("#daysChoose2")
                                            .checked == true
                                    ) {
                                        //天数验证
                                        if (
                                            isPositiveNum(
                                                document.querySelector(
                                                    ".advancedSettingPlan .advancedPlanContent .regularDayNumber"
                                                ).value
                                            )
                                        ) {
                                            //开始日期与系统时间验证
                                            if (
                                                $scope.verifyCurrentTime(
                                                    startyear,
                                                    startmonth,
                                                    startdate,
                                                    secondhour,
                                                    secondminutes
                                                )
                                            ) {
                                                //开始日期与结束日期验证
                                                if (
                                                    $scope.endBeforeStart(
                                                        startyear,
                                                        startmonth,
                                                        startdate,
                                                        endyear,
                                                        endmonth,
                                                        enddate
                                                    )
                                                ) {
                                                    var url =
                                                        "/xdatainsight/api/scheduler/job";
                                                    var url2 =
                                                        "/xdatainsight/api/scheduler/removeJob";
                                                    var data2 = {
                                                        jobName:
                                                            "GeneratedContentCleaner",
                                                        complexJobTrigger: {
                                                            uiPassParam:
                                                                "DAILY",
                                                            daysOfWeek: [
                                                                "1",
                                                                "2",
                                                                "3",
                                                                "4",
                                                                "5"
                                                            ],
                                                            startTime: timeResultStart,
                                                            endTime: timeResultEnd
                                                        },
                                                        inputFile:
                                                            "GeneratedContentCleaner",
                                                        outputFile: "",
                                                        jobParameters: [
                                                            {
                                                                name:
                                                                    "uiPassParam",
                                                                type: "string",
                                                                stringValue: [
                                                                    "RUN_ONCE"
                                                                ]
                                                            },
                                                            {
                                                                name: "age",
                                                                type: "string",
                                                                stringValue: [
                                                                    myInputMs
                                                                ]
                                                            },
                                                            {
                                                                name:
                                                                    "user_locale",
                                                                type: "string",
                                                                stringValue: [
                                                                    "zh_CN"
                                                                ]
                                                            },
                                                            {
                                                                name:
                                                                    "ActionAdapterQuartzJob-ActionUser",
                                                                type: "string",
                                                                stringValue: [
                                                                    "admin"
                                                                ]
                                                            },
                                                            {
                                                                name:
                                                                    "ActionAdapterQuartzJob-ActionClass",
                                                                type: "string",
                                                                stringValue: [
                                                                    "org.pentaho.platform.admin.GeneratedContentCleaner"
                                                                ]
                                                            },
                                                            {
                                                                name:
                                                                    "lineage-id",
                                                                type: "string",
                                                                stringValue: [
                                                                    "d201b10c-347a-47c8-ae56-3ed491c3ff7e"
                                                                ]
                                                            }
                                                        ],
                                                        actionClass:
                                                            "org.pentaho.platform.admin.GeneratedContentCleaner"
                                                    };
                                                    var data1 = {
                                                        jobName:
                                                            "GeneratedContentCleaner",
                                                        simpleJobTrigger: {
                                                            uiPassParam:
                                                                "DAILY",
                                                            repeatInterval: repeatInterval,
                                                            repeatCount: -1,
                                                            startTime: timeResultStart,
                                                            endTime: timeResultEnd
                                                        },
                                                        inputFile:
                                                            "GeneratedContentCleaner",
                                                        outputFile: "",
                                                        jobParameters: [
                                                            {
                                                                name:
                                                                    "uiPassParam",
                                                                type: "string",
                                                                stringValue: [
                                                                    "RUN_ONCE"
                                                                ]
                                                            },
                                                            {
                                                                name: "age",
                                                                type: "string",
                                                                stringValue: [
                                                                    myInputMs
                                                                ]
                                                            },
                                                            {
                                                                name:
                                                                    "user_locale",
                                                                type: "string",
                                                                stringValue: [
                                                                    "zh_CN"
                                                                ]
                                                            },
                                                            {
                                                                name:
                                                                    "ActionAdapterQuartzJob-ActionUser",
                                                                type: "string",
                                                                stringValue: [
                                                                    "admin"
                                                                ]
                                                            },
                                                            {
                                                                name:
                                                                    "ActionAdapterQuartzJob-ActionClass",
                                                                type: "string",
                                                                stringValue: [
                                                                    "org.pentaho.platform.admin.GeneratedContentCleaner"
                                                                ]
                                                            },
                                                            {
                                                                name:
                                                                    "lineage-id",
                                                                type: "string",
                                                                stringValue: [
                                                                    "1566edef-6708-4d66-9197-f88fbf6d9fc2"
                                                                ]
                                                            }
                                                        ],
                                                        actionClass:
                                                            "org.pentaho.platform.admin.GeneratedContentCleaner"
                                                    };
                                                    var data = document.querySelector(
                                                        ".day>.startdateSecond>input:nth-child(6)"
                                                    ).checked
                                                        ? data2
                                                        : data1;
                                                    if (
                                                        !isNaN(repeatInterval)
                                                    ) {
                                                        document.querySelector(
                                                            ".day>.startdateSecond>input:nth-child(4)"
                                                        ).style.borderColor =
                                                            "#d8d8d8";
                                                        $http({
                                                            method: "post",
                                                            headers: {
                                                                contentType:
                                                                    "application/json; charset=utf-8",
                                                                accept:
                                                                    "text/plain"
                                                            },
                                                            url: url,
                                                            dataType:
                                                                "text/plain",
                                                            data: data
                                                        })
                                                            .success(data => {
                                                                if (
                                                                    $rootScope.initialData !=
                                                                    ""
                                                                ) {
                                                                    $http({
                                                                        method:
                                                                            "DELETE",
                                                                        headers: {
                                                                            "content-Type":
                                                                                "application/json; charset=utf-8",
                                                                            accept:
                                                                                "*/*"
                                                                        },
                                                                        url: url2,
                                                                        data: {
                                                                            jobId:
                                                                                $rootScope.ll
                                                                        }
                                                                    })
                                                                        .success(
                                                                            data => {
                                                                                var currentDate = new Date();
                                                                                var currentTime = currentDate.getTime();
                                                                                advancedSettingProvider
                                                                                    .callItunes(
                                                                                        "/xdatainsight/api/scheduler/getContentCleanerJob?cb=" +
                                                                                            currentTime
                                                                                    )
                                                                                    .then(
                                                                                        data => {
                                                                                            $rootScope.ll =
                                                                                                data.jobId;
                                                                                            $rootScope.initialData = data;
                                                                                            document.querySelector(
                                                                                                ".loader"
                                                                                            ).style.display =
                                                                                                "none";
                                                                                            document.querySelector('.advancedSettingBox').style.display = 'block';

                                                                                            document.querySelector(
                                                                                                ".advancedSettingPlan"
                                                                                            ).style.display =
                                                                                                "none";
                                                                                            document.querySelector('.popup').style.display = 'block';
                                                                                        },
                                                                                        data => {}
                                                                                    );
                                                                            }
                                                                        )
                                                                        .error(
                                                                            data => {}
                                                                        );
                                                                } else {
                                                                    var currentDate = new Date();
                                                                    var currentTime = currentDate.getTime();
                                                                    advancedSettingProvider
                                                                        .callItunes(
                                                                            "/xdatainsight/api/scheduler/getContentCleanerJob?cb=" +
                                                                                currentTime
                                                                        )
                                                                        .then(
                                                                            data => {
                                                                                document.querySelector(
                                                                                    ".advancedSettingContent .deletePlan"
                                                                                ).style.display =
                                                                                    "inline-block";
                                                                                document.querySelector(
                                                                                    ".advancedSettingContent .planToDelete"
                                                                                ).innerHTML =
                                                                                    "编辑计划";
                                                                                $rootScope.ll =
                                                                                    data.jobId;
                                                                                $rootScope.initialData = data;
                                                                                document.querySelector(
                                                                                    ".loader"
                                                                                ).style.display =
                                                                                    "none";
                                                                              document.querySelector('.advancedSettingBox').style.display = 'block';

                                                                                document.querySelector(
                                                                                    ".advancedSettingPlan"
                                                                                ).style.display =
                                                                                    "none";
                                                                                document.querySelector('.popup').style.display = 'block';
                                                                            },
                                                                            data => {}
                                                                        );
                                                                }
                                                            })
                                                            .error(data => {});
                                                    } else {
                                                        document.querySelector(
                                                            ".day>.startdateSecond>input:nth-child(4)"
                                                        ).style.borderColor =
                                                            "red";
                                                    }
                                                } else {
                                                  document.querySelector('.advancedSettingPlan').style.display = 'none';
                                                    $scope.showDangerousTips(
                                                        "结束时间应当晚于开始时间"
                                                    );
                                                }
                                            } else {
                                              document.querySelector('.advancedSettingPlan').style.display = 'none';
                                                $scope.showDangerousTips(
                                                    "开始时间晚于系统当前时间"
                                                );
                                            }
                                        } else {
                                          document.querySelector('.advancedSettingPlan').style.display = 'none';
                                            $scope.showDangerousTips(
                                                "天数填写错误"
                                            );
                                        }
                                    } else {
                                      document.querySelector('.advancedSettingPlan').style.display = 'none';
                                        $scope.showDangerousTips(
                                            "周期天数填写错误"
                                        );
                                    }
                                } else {
                                  document.querySelector('.advancedSettingPlan').style.display = 'none';
                                    $scope.showDangerousTips("信息未填写完整");
                                }
                            } else {
                              document.querySelector('.advancedSettingPlan').style.display = 'none';
                                $scope.showDangerousTips("定期模式未填写完整");
                            }
                            break;
                        case "week":
                            var startyear = document
                                .querySelector("#weekDate1")
                                .value.split("")
                                .splice(0, 4)
                                .join("");
                            var startmonth = document
                                .querySelector("#weekDate1")
                                .value.split("")
                                .splice(5, 2)
                                .join("");
                            var startdate = document
                                .querySelector("#weekDate1")
                                .value.split("")
                                .splice(8, 2)
                                .join("");
                            var endyear = document
                                .querySelector("#weekEndDate")
                                .value.split("")
                                .splice(0, 4)
                                .join("");
                            var endmonth = document
                                .querySelector("#weekEndDate")
                                .value.split("")
                                .splice(5, 2)
                                .join("");
                            var enddate = document
                                .querySelector("#weekEndDate")
                                .value.split("")
                                .splice(8, 2)
                                .join("");
                            var secondminutes = document.querySelector(
                                "#yhn_weekMinutes"
                            ).value;
                            var halfDay = document.querySelector(
                                "#yhn_weekHalfDay"
                            ).value;
                            var secondhour =
                                document.querySelector("#yhn_weekHalfDay")
                                    .value == "AM"
                                    ? document.querySelector("#yhn_weekHours")
                                          .value
                                    : parseInt(
                                          document.querySelector(
                                              "#yhn_weekHours"
                                          ).value
                                      ) + 12;
                            var timeResultStart =
                                startyear +
                                "-" +
                                startmonth +
                                "-" +
                                startdate +
                                "T" +
                                secondhour +
                                ":" +
                                secondminutes +
                                ":" +
                                "00.000+08:00";
                            var timeResultEnd =
                                endyear +
                                "-" +
                                endmonth +
                                "-" +
                                enddate +
                                "T" +
                                secondhour +
                                ":" +
                                secondminutes +
                                ":" +
                                "00.000+08:00";
                            var myInputMs = (
                                document.querySelector(
                                    ".advancedSettingPlan .advancedPlanContent .regularDayNumber"
                                ).value *
                                24 *
                                60 *
                                60
                            ).toString();
                            //定期模式验证
                            if (
                                document.querySelector("#weekChoose0")
                                    .checked == true ||
                                document.querySelector("#weekChoose1")
                                    .checked == true ||
                                document.querySelector("#weekChoose2")
                                    .checked == true ||
                                document.querySelector("#weekChoose3")
                                    .checked == true ||
                                document.querySelector("#weekChoose4")
                                    .checked == true ||
                                document.querySelector("#weekChoose5")
                                    .checked == true ||
                                document.querySelector("#weekChoose6")
                                    .checked == true
                            ) {
                                //信息填写完整验证
                                if (
                                    document.querySelector(
                                        ".advancedSettingPlan .advancedPlanContent .regularDayNumber"
                                    ).value != "" &&
                                    document.querySelector("#weekDate1")
                                        .value != "" &&
                                    document.querySelector("#weekEndDate")
                                        .value != ""
                                ) {
                                    //天数合理性验证
                                    if (
                                        isPositiveNum(
                                            document.querySelector(
                                                ".advancedSettingPlan .advancedPlanContent .regularDayNumber"
                                            ).value
                                        )
                                    ) {
                                        //开始时间与系统时间
                                        if (
                                            $scope.verifyCurrentTime(
                                                startyear,
                                                startmonth,
                                                startdate,
                                                secondhour,
                                                secondminutes
                                            )
                                        ) {
                                            //开始时间与结束时间
                                            if (
                                                $scope.endBeforeStart(
                                                    startyear,
                                                    startmonth,
                                                    startdate,
                                                    endyear,
                                                    endmonth,
                                                    enddate
                                                )
                                            ) {
                                                var url = "/xdatainsight/api/scheduler/job";
                                                var url2 =
                                                    "/xdatainsight/api/scheduler/removeJob";
                                                var daysOfWeek = [];
                                                for (var i = 0; i < 7; i++) {
                                                    if (
                                                        document.querySelector(
                                                            "#weekChoose" + i
                                                        ).checked
                                                    ) {
                                                        daysOfWeek.push("" + i);
                                                    }
                                                }
                                                var data = {
                                                    jobName:
                                                        "GeneratedContentCleaner",
                                                    complexJobTrigger: {
                                                        uiPassParam: "WEEKLY",
                                                        daysOfWeek: daysOfWeek,
                                                        startTime: timeResultStart,
                                                        endTime: timeResultEnd
                                                    },
                                                    inputFile:
                                                        "GeneratedContentCleaner",
                                                    outputFile: "",
                                                    jobParameters: [
                                                        {
                                                            name: "uiPassParam",
                                                            type: "string",
                                                            stringValue: [
                                                                "WEEKLY"
                                                            ]
                                                        },
                                                        {
                                                            name: "age",
                                                            type: "string",
                                                            stringValue: [
                                                                myInputMs
                                                            ]
                                                        },
                                                        {
                                                            name: "user_locale",
                                                            type: "string",
                                                            stringValue: [
                                                                "zh_CN"
                                                            ]
                                                        },
                                                        {
                                                            name:
                                                                "ActionAdapterQuartzJob-ActionUser",
                                                            type: "string",
                                                            stringValue: [
                                                                "admin"
                                                            ]
                                                        },
                                                        {
                                                            name:
                                                                "ActionAdapterQuartzJob-ActionClass",
                                                            type: "string",
                                                            stringValue: [
                                                                "org.pentaho.platform.admin.GeneratedContentCleaner"
                                                            ]
                                                        },
                                                        {
                                                            name: "lineage-id",
                                                            type: "string",
                                                            stringValue: [
                                                                "d201b10c-347a-47c8-ae56-3ed491c3ff7e"
                                                            ]
                                                        }
                                                    ],
                                                    actionClass:
                                                        "org.pentaho.platform.admin.GeneratedContentCleaner"
                                                };
                                                $http({
                                                    method: "post",
                                                    headers: {
                                                        contentType:
                                                            "application/json; charset=utf-8",
                                                        accept: "text/plain"
                                                    },
                                                    url: url,
                                                    dataType: "text/plain",
                                                    data: data
                                                })
                                                    .success(data => {
                                                        if (
                                                            $rootScope.initialData !=
                                                            ""
                                                        ) {
                                                            $http({
                                                                method:
                                                                    "DELETE",
                                                                headers: {
                                                                    "content-Type":
                                                                        "application/json; charset=utf-8",
                                                                    accept:
                                                                        "*/*"
                                                                },
                                                                url: url2,
                                                                data: {
                                                                    jobId:
                                                                        $rootScope.ll
                                                                }
                                                            })
                                                                .success(
                                                                    data => {
                                                                        var currentDate = new Date();
                                                                        var currentTime = currentDate.getTime();
                                                                        advancedSettingProvider
                                                                            .callItunes(
                                                                                "/xdatainsight/api/scheduler/getContentCleanerJob?cb=" +
                                                                                    currentTime
                                                                            )
                                                                            .then(
                                                                                data => {
                                                                                    $rootScope.ll =
                                                                                        data.jobId;
                                                                                    $rootScope.initialData = data;
                                                                                    document.querySelector(
                                                                                        ".loader"
                                                                                    ).style.display =
                                                                                        "none";
                                                                                  document.querySelector('.advancedSettingBox').style.display = 'block';

                                                                                    document.querySelector(
                                                                                        ".advancedSettingPlan"
                                                                                    ).style.display =
                                                                                        "none";
                                                                                    document.querySelector('.popup').style.display = 'block';
                                                                                },
                                                                                data => {}
                                                                            );
                                                                    }
                                                                )
                                                                .error(
                                                                    data => {}
                                                                );
                                                        } else {
                                                            var currentDate = new Date();
                                                            var currentTime = currentDate.getTime();
                                                            advancedSettingProvider
                                                                .callItunes(
                                                                    "/xdatainsight/api/scheduler/getContentCleanerJob?cb=" +
                                                                        currentTime
                                                                )
                                                                .then(
                                                                    data => {
                                                                        document.querySelector(
                                                                            ".advancedSettingContent .deletePlan"
                                                                        ).style.display =
                                                                            "inline-block";
                                                                        document.querySelector(
                                                                            ".advancedSettingContent .planToDelete"
                                                                        ).innerHTML =
                                                                            "编辑计划";
                                                                        $rootScope.ll =
                                                                            data.jobId;
                                                                        $rootScope.initialData = data;
                                                                        document.querySelector(
                                                                            ".loader"
                                                                        ).style.display =
                                                                            "none";

                                                                      document.querySelector('.advancedSettingBox').style.display = 'block';

                                                                        document.querySelector(
                                                                            ".advancedSettingPlan"
                                                                        ).style.display =
                                                                            "none";
                                                                        document.querySelector('.popup').style.display = 'block';
                                                                    },
                                                                    data => {}
                                                                );
                                                        }
                                                    })
                                                    .error(data => {});
                                            } else {
                                              document.querySelector('.advancedSettingPlan').style.display = 'none';
                                                $scope.showDangerousTips(
                                                    "结束时间应当晚于开始时间"
                                                );
                                            }
                                        } else {
                                          document.querySelector('.advancedSettingPlan').style.display = 'none';
                                            $scope.showDangerousTips(
                                                "开始时间应当晚于系统当前时间"
                                            );
                                        }
                                    } else {
                                      document.querySelector('.advancedSettingPlan').style.display = 'none';
                                        $scope.showDangerousTips(
                                            "天数填写错误"
                                        );
                                    }
                                } else {
                                  document.querySelector('.advancedSettingPlan').style.display = 'none';
                                    $scope.showDangerousTips("信息未填写完整");
                                }
                            } else {
                                document.querySelector('.advancedSettingPlan').style.display = 'none';
                                $scope.showDangerousTips("定期模式未填写");
                            }

                            break;
                        case "month":
                            var startyear = document
                                .querySelector("#monthDate1")
                                .value.split("")
                                .splice(0, 4)
                                .join("");
                            var startmonth = document
                                .querySelector("#monthDate1")
                                .value.split("")
                                .splice(5, 2)
                                .join("");
                            var startdate = document
                                .querySelector("#monthDate1")
                                .value.split("")
                                .splice(8, 2)
                                .join("");
                            var endyear = document
                                .querySelector("#monthEndDate")
                                .value.split("")
                                .splice(0, 4)
                                .join("");
                            var endmonth = document
                                .querySelector("#monthEndDate")
                                .value.split("")
                                .splice(5, 2)
                                .join("");
                            var enddate = document
                                .querySelector("#monthEndDate")
                                .value.split("")
                                .splice(8, 2)
                                .join("");
                            var myInputMs = (
                                document.querySelector(
                                    ".advancedSettingPlan .advancedPlanContent .regularDayNumber"
                                ).value *
                                24 *
                                60 *
                                60
                            ).toString();
                            var secondminutes = document.querySelector(
                                "#yhn_monthMinutes"
                            ).value;
                            var secondhour =
                                document.querySelector("#yhn_monthHalfDay")
                                    .value == "AM"
                                    ? document.querySelector("#yhn_monthHours")
                                          .value
                                    : parseInt(
                                          document.querySelector(
                                              "#yhn_monthHours"
                                          ).value
                                      ) + 12;
                            var timeResultStart =
                                startyear +
                                "-" +
                                startmonth +
                                "-" +
                                startdate +
                                "T" +
                                secondhour +
                                ":" +
                                secondminutes +
                                ":" +
                                "00.000+08:00";
                            var timeResultEnd =
                                endyear +
                                "-" +
                                endmonth +
                                "-" +
                                enddate +
                                "T" +
                                secondhour +
                                ":" +
                                secondminutes +
                                ":" +
                                "00.000+08:00";
                            var daysOfMonth = [];
                            var days = document.querySelector(
                                ".month .startdateSecond>input:nth-child(4)"
                            ).value;
                            daysOfMonth.push(days);
                            //定期模式完整性验证
                            if (
                                (document.querySelector("#monthChoose1")
                                    .checked == true &&
                                    document.querySelector(
                                        ".month .startdateSecond>input:nth-child(4)"
                                    ).value != "") ||
                                document.querySelector("#monthChoose2")
                                    .checked == true
                            ) {
                                //完整性验证
                                if (
                                    document.querySelector(
                                        ".advancedSettingPlan .advancedPlanContent .regularDayNumber"
                                    ).value != "" &&
                                    document.querySelector("#monthDate1")
                                        .value != "" &&
                                    document.querySelector("#monthEndDate")
                                        .value != ""
                                ) {
                                    //天数正确性验证
                                    if (
                                        isPositiveNum(
                                            document.querySelector(
                                                ".advancedSettingPlan .advancedPlanContent .regularDayNumber"
                                            ).value
                                        )
                                    ) {
                                        //定期模式每月天数验证
                                        if (
                                            isPositiveNum(
                                                document.querySelector(
                                                    ".month .startdateSecond>input:nth-child(4)"
                                                ).value
                                            )
                                        ) {
                                            //开始时间与系统时间
                                            if (
                                                $scope.verifyCurrentTime(
                                                    startyear,
                                                    startmonth,
                                                    startdate,
                                                    secondhour,
                                                    secondminutes
                                                )
                                            ) {
                                                //开始时间与结束时间
                                                if (
                                                    $scope.endBeforeStart(
                                                        startyear,
                                                        startmonth,
                                                        startdate,
                                                        endyear,
                                                        endmonth,
                                                        enddate
                                                    )
                                                ) {
                                                    var url =
                                                        "/xdatainsight/api/scheduler/job";
                                                    var url2 =
                                                        "/xdatainsight/api/scheduler/removeJob";

                                                    var data1 = {
                                                        jobName:
                                                            "GeneratedContentCleaner",
                                                        complexJobTrigger: {
                                                            uiPassParam:
                                                                "MONTHLY",
                                                            daysOfMonth: daysOfMonth,
                                                            startTime: timeResultStart,
                                                            endTime: timeResultEnd
                                                        },
                                                        inputFile:
                                                            "GeneratedContentCleaner",
                                                        outputFile: "",
                                                        jobParameters: [
                                                            {
                                                                name:
                                                                    "uiPassParam",
                                                                type: "string",
                                                                stringValue: [
                                                                    "MONTHLY"
                                                                ]
                                                            },
                                                            {
                                                                name: "age",
                                                                type: "string",
                                                                stringValue: [
                                                                    myInputMs
                                                                ]
                                                            },
                                                            {
                                                                name:
                                                                    "user_locale",
                                                                type: "string",
                                                                stringValue: [
                                                                    "zh_CN"
                                                                ]
                                                            },
                                                            {
                                                                name:
                                                                    "ActionAdapterQuartzJob-ActionUser",
                                                                type: "string",
                                                                stringValue: [
                                                                    "admin"
                                                                ]
                                                            },
                                                            {
                                                                name:
                                                                    "ActionAdapterQuartzJob-ActionClass",
                                                                type: "string",
                                                                stringValue: [
                                                                    "org.pentaho.platform.admin.GeneratedContentCleaner"
                                                                ]
                                                            },
                                                            {
                                                                name:
                                                                    "lineage-id",
                                                                type: "string",
                                                                stringValue: [
                                                                    "1566edef-6708-4d66-9197-f88fbf6d9fc2"
                                                                ]
                                                            }
                                                        ],
                                                        actionClass:
                                                            "org.pentaho.platform.admin.GeneratedContentCleaner"
                                                    };

                                                    //by week
                                                    var weeksOfMonth = [];
                                                    var daysOfWeek = [];
                                                    var monthWeek = document.querySelector(
                                                        "#yhn_month_weekNumber"
                                                    ).value;
                                                    var weekday = document.querySelector(
                                                        "#yhn_month_week"
                                                    ).value;
                                                    weeksOfMonth.push(
                                                        monthWeek
                                                    );
                                                    daysOfWeek.push(weekday);
                                                    var data2 = {
                                                        jobName:
                                                            "GeneratedContentCleaner",
                                                        complexJobTrigger: {
                                                            uiPassParam:
                                                                "MONTHLY",
                                                            weeksOfMonth: weeksOfMonth,
                                                            daysOfWeek: daysOfWeek,
                                                            startTime: timeResultStart,
                                                            endTime: timeResultEnd
                                                        },
                                                        inputFile:
                                                            "GeneratedContentCleaner",
                                                        outputFile: "",
                                                        jobParameters: [
                                                            {
                                                                name:
                                                                    "uiPassParam",
                                                                type: "string",
                                                                stringValue: [
                                                                    "MONTHLY"
                                                                ]
                                                            },
                                                            {
                                                                name: "age",
                                                                type: "string",
                                                                stringValue: [
                                                                    myInputMs
                                                                ]
                                                            },
                                                            {
                                                                name:
                                                                    "user_locale",
                                                                type: "string",
                                                                stringValue: [
                                                                    "zh_CN"
                                                                ]
                                                            },
                                                            {
                                                                name:
                                                                    "ActionAdapterQuartzJob-ActionUser",
                                                                type: "string",
                                                                stringValue: [
                                                                    "admin"
                                                                ]
                                                            },
                                                            {
                                                                name:
                                                                    "ActionAdapterQuartzJob-ActionClass",
                                                                type: "string",
                                                                stringValue: [
                                                                    "org.pentaho.platform.admin.GeneratedContentCleaner"
                                                                ]
                                                            },
                                                            {
                                                                name:
                                                                    "lineage-id",
                                                                type: "string",
                                                                stringValue: [
                                                                    "d201b10c-347a-47c8-ae56-3ed491c3ff7e"
                                                                ]
                                                            }
                                                        ],
                                                        actionClass:
                                                            "org.pentaho.platform.admin.GeneratedContentCleaner"
                                                    };
                                                    var data = document.querySelector(
                                                        "#monthChoose1"
                                                    ).checked
                                                        ? data1
                                                        : data2;
                                                    if (
                                                        !isNaN(parseInt(days))
                                                    ) {
                                                        document.querySelector(
                                                            ".month .startdateSecond>input:nth-child(4)"
                                                        ).style.borderColor =
                                                            "#d8d8d8";
                                                        $http({
                                                            method: "post",
                                                            headers: {
                                                                contentType:
                                                                    "application/json; charset=utf-8",
                                                                accept:
                                                                    "text/plain"
                                                            },
                                                            url: url,
                                                            dataType:
                                                                "text/plain",
                                                            data: data
                                                        })
                                                            .success(data => {
                                                                if (
                                                                    $rootScope.initialData !=
                                                                    ""
                                                                ) {
                                                                    $http({
                                                                        method:
                                                                            "DELETE",
                                                                        headers: {
                                                                            "content-Type":
                                                                                "application/json; charset=utf-8",
                                                                            accept:
                                                                                "*/*"
                                                                        },
                                                                        url: url2,
                                                                        data: {
                                                                            jobId:
                                                                                $rootScope.ll
                                                                        }
                                                                    })
                                                                        .success(
                                                                            data => {
                                                                                var currentDate = new Date();
                                                                                var currentTime = currentDate.getTime();
                                                                                advancedSettingProvider
                                                                                    .callItunes(
                                                                                        "/xdatainsight/api/scheduler/getContentCleanerJob?cb=" +
                                                                                            currentTime
                                                                                    )
                                                                                    .then(
                                                                                        data => {
                                                                                            $rootScope.ll =
                                                                                                data.jobId;
                                                                                            $rootScope.initialData = data;
                                                                                            document.querySelector(
                                                                                                ".loader"
                                                                                            ).style.display =
                                                                                                "none";

                                                                                          document.querySelector('.advancedSettingBox').style.display = 'block';
                                                                                            document.querySelector(
                                                                                                ".advancedSettingPlan"
                                                                                            ).style.display =
                                                                                                "none";
                                                                                            document.querySelector('.popup').style.display = 'block';
                                                                                        },
                                                                                        data => {}
                                                                                    );
                                                                            }
                                                                        )
                                                                        .error(
                                                                            data => {}
                                                                        );
                                                                } else {
                                                                    var currentDate = new Date();
                                                                    var currentTime = currentDate.getTime();
                                                                    advancedSettingProvider
                                                                        .callItunes(
                                                                            "/xdatainsight/api/scheduler/getContentCleanerJob?cb=" +
                                                                                currentTime
                                                                        )
                                                                        .then(
                                                                            data => {
                                                                                document.querySelector(
                                                                                    ".advancedSettingContent .deletePlan"
                                                                                ).style.display =
                                                                                    "inline-block";
                                                                                document.querySelector(
                                                                                    ".advancedSettingContent .planToDelete"
                                                                                ).innerHTML =
                                                                                    "编辑计划";
                                                                                $rootScope.ll =
                                                                                    data.jobId;
                                                                                $rootScope.initialData = data;
                                                                                document.querySelector(
                                                                                    ".loader"
                                                                                ).style.display =
                                                                                    "none";
                                                                                document.querySelector('.advancedSettingBox').style.display = 'block';
                                                                                document.querySelector(".advancedSettingPlan").style.display = "none";
                                                                                document.querySelector('.popup').style.display = 'block';
                                                                            },
                                                                            data => {}
                                                                        );
                                                                }
                                                            })
                                                            .error(data => {
                                                              document.querySelector('.advancedSettingPlan').style.display = 'none';
                                                                $scope.showDangerousTips(
                                                                    "添加删除计划失败"
                                                                );
                                                            });
                                                    } else {
                                                        document.querySelector(
                                                            ".month .startdateSecond>input:nth-child(4)"
                                                        ).style.borderColor =
                                                            "red";
                                                    }
                                                } else {
                                                  document.querySelector('.advancedSettingPlan').style.display = 'none';
                                                    $scope.showDangerousTips(
                                                        "结束时间应当晚于开始时间"
                                                    );
                                                }
                                            } else {
                                              document.querySelector('.advancedSettingPlan').style.display = 'none';
                                                $scope.showDangerousTips(
                                                    "开始时间应当晚于系统当前时间"
                                                );
                                            }
                                        } else {
                                          document.querySelector('.advancedSettingPlan').style.display = 'none';
                                            $scope.showDangerousTips(
                                                "定期模式天数填写错误"
                                            );
                                        }
                                    } else {
                                      document.querySelector('.advancedSettingPlan').style.display = 'none';
                                        $scope.showDangerousTips(
                                            "删除天数填写错误"
                                        );
                                    }
                                } else {
                                  document.querySelector('.advancedSettingPlan').style.display = 'none';
                                    $scope.showDangerousTips("信息未填写完整");
                                }
                            } else {
                              document.querySelector('.advancedSettingPlan').style.display = 'none';
                                $scope.showDangerousTips("定期模式未填写完整");
                            }

                            break;
                        case "year":
                            var startyear = document
                                .querySelector("#yearDate1")
                                .value.split("")
                                .splice(0, 4)
                                .join("");
                            var startmonth = document
                                .querySelector("#yearDate1")
                                .value.split("")
                                .splice(5, 2)
                                .join("");
                            var startdate = document
                                .querySelector("#yearDate1")
                                .value.split("")
                                .splice(8, 2)
                                .join("");
                            var endyear = document
                                .querySelector("#yearEndDate")
                                .value.split("")
                                .splice(0, 4)
                                .join("");
                            var endmonth = document
                                .querySelector("#yearEndDate")
                                .value.split("")
                                .splice(5, 2)
                                .join("");
                            var enddate = document
                                .querySelector("#yearEndDate")
                                .value.split("")
                                .splice(8, 2)
                                .join("");
                            var myInputMs = (
                                document.querySelector(
                                    ".advancedSettingPlan .advancedPlanContent .regularDayNumber"
                                ).value *
                                24 *
                                60 *
                                60
                            ).toString();
                            var secondminutes = document.querySelector(
                                "#yhn_yearMinutes"
                            ).value;
                            var secondhour =
                                document.querySelector("#yhn_yearHalfDay")
                                    .value == "AM"
                                    ? document.querySelector("#yhn_yearHours")
                                          .value
                                    : parseInt(
                                          document.querySelector(
                                              "#yhn_yearHours"
                                          ).value
                                      ) + 12;
                            var timeResultStart =
                                startyear +
                                "-" +
                                startmonth +
                                "-" +
                                startdate +
                                "T" +
                                secondhour +
                                ":" +
                                secondminutes +
                                ":" +
                                "00.000+08:00";
                            var timeResultEnd =
                                endyear +
                                "-" +
                                endmonth +
                                "-" +
                                enddate +
                                "T" +
                                secondhour +
                                ":" +
                                secondminutes +
                                ":" +
                                "00.000+08:00";
                            var url = "/xdatainsight/api/scheduler/job";
                            var url2 = "/xdatainsight/api/scheduler/removeJob";
                            var daysOfMonth = [];
                            var monthsOfYear = [];
                            monthsOfYear.push(
                                document.querySelector(
                                    ".year .year_select1_month"
                                ).value
                            );
                            daysOfMonth.push(
                                document.querySelector(
                                    ".year .year_select1_day"
                                ).value
                            );
                            /*by days*/
                            var data1 = {
                                jobName: "GeneratedContentCleaner",
                                complexJobTrigger: {
                                    uiPassParam: "YEARLY",
                                    monthsOfYear: monthsOfYear,
                                    daysOfMonth: daysOfMonth,
                                    startTime: timeResultStart,
                                    endTime: timeResultEnd
                                },
                                inputFile: "GeneratedContentCleaner",
                                outputFile: "",
                                jobParameters: [
                                    {
                                        name: "uiPassParam",
                                        type: "string",
                                        stringValue: ["MONTHLY"]
                                    },
                                    {
                                        name: "age",
                                        type: "string",
                                        stringValue: [myInputMs]
                                    },
                                    {
                                        name: "user_locale",
                                        type: "string",
                                        stringValue: ["zh_CN"]
                                    },
                                    {
                                        name:
                                            "ActionAdapterQuartzJob-ActionUser",
                                        type: "string",
                                        stringValue: ["admin"]
                                    },
                                    {
                                        name:
                                            "ActionAdapterQuartzJob-ActionClass",
                                        type: "string",
                                        stringValue: [
                                            "org.pentaho.platform.admin.GeneratedContentCleaner"
                                        ]
                                    },
                                    {
                                        name: "lineage-id",
                                        type: "string",
                                        stringValue: [
                                            "1566edef-6708-4d66-9197-f88fbf6d9fc2"
                                        ]
                                    }
                                ],
                                actionClass:
                                    "org.pentaho.platform.admin.GeneratedContentCleaner"
                            };
                            /*by weeks*/
                            var monthsOfYear2 = [];
                            var weeksOfMonth2 = [];
                            var daysOfWeek2 = [];
                            monthsOfYear2.push(
                                document.querySelector(
                                    ".year .year_select2_month"
                                ).value
                            );
                            weeksOfMonth2.push(
                                document.querySelector(
                                    ".year .year_select2_sequence"
                                ).value
                            );
                            daysOfWeek2.push(
                                document.querySelector(
                                    ".year .year_select2_week"
                                ).value
                            );
                            var data2 = {
                                jobName: "GeneratedContentCleaner",
                                complexJobTrigger: {
                                    uiPassParam: "YEARLY",
                                    monthsOfYear: monthsOfYear2,
                                    weeksOfMonth: weeksOfMonth2,
                                    daysOfWeek: daysOfWeek2,
                                    startTime: timeResultStart,
                                    endTime: timeResultEnd
                                },
                                inputFile: "GeneratedContentCleaner",
                                outputFile: "",
                                jobParameters: [
                                    {
                                        name: "uiPassParam",
                                        type: "string",
                                        stringValue: ["MONTHLY"]
                                    },
                                    {
                                        name: "age",
                                        type: "string",
                                        stringValue: [myInputMs]
                                    },
                                    {
                                        name: "user_locale",
                                        type: "string",
                                        stringValue: ["zh_CN"]
                                    },
                                    {
                                        name:
                                            "ActionAdapterQuartzJob-ActionUser",
                                        type: "string",
                                        stringValue: ["admin"]
                                    },
                                    {
                                        name:
                                            "ActionAdapterQuartzJob-ActionClass",
                                        type: "string",
                                        stringValue: [
                                            "org.pentaho.platform.admin.GeneratedContentCleaner"
                                        ]
                                    },
                                    {
                                        name: "lineage-id",
                                        type: "string",
                                        stringValue: [
                                            "d201b10c-347a-47c8-ae56-3ed491c3ff7e"
                                        ]
                                    }
                                ],
                                actionClass:
                                    "org.pentaho.platform.admin.GeneratedContentCleaner"
                            };
                            var data = document.querySelector("#yearChoose1")
                                .checked
                                ? data1
                                : data2;
                            if (
                                !isNaN(
                                    parseInt(
                                        document.querySelector(
                                            ".year .year_select1_day"
                                        ).value
                                    )
                                )
                            ) {
                                document.querySelector(
                                    ".year .year_select1_day"
                                ).style.borderColor = "#d8d8d8";
                                $http({
                                    method: "post",
                                    headers: {
                                        contentType:
                                            "application/json; charset=utf-8",
                                        accept: "text/plain"
                                    },
                                    url: url,
                                    dataType: "text/plain",
                                    data: data
                                })
                                    .success(data => {
                                        if ($rootScope.initialData != "") {
                                            $http({
                                                method: "DELETE",
                                                headers: {
                                                    "content-Type":
                                                        "application/json; charset=utf-8",
                                                    accept: "*/*"
                                                },
                                                url: url2,
                                                data: { jobId: $rootScope.ll }
                                            })
                                                .success(data => {
                                                    var currentDate = new Date();
                                                    var currentTime = currentDate.getTime();
                                                    advancedSettingProvider
                                                        .callItunes(
                                                            "/xdatainsight/api/scheduler/getContentCleanerJob?cb=" +
                                                                currentTime
                                                        )
                                                        .then(
                                                            data => {
                                                                $rootScope.ll =
                                                                    data.jobId;
                                                                $rootScope.initialData = data;
                                                                document.querySelector(
                                                                    ".loader"
                                                                ).style.display =
                                                                    "none";
                                                                document.querySelector('.advancedSettingBox').style.display = 'block';
                                                                document.querySelector(".advancedSettingPlan").style.display = "none";
                                                                document.querySelector('.popup').style.display = 'block';
                                                            },
                                                            data => {}
                                                        );
                                                })
                                                .error(data => {});
                                        } else {
                                            var currentDate = new Date();
                                            var currentTime = currentDate.getTime();
                                            advancedSettingProvider
                                                .callItunes(
                                                    "/xdatainsight/api/scheduler/getContentCleanerJob?cb=" +
                                                        currentTime
                                                )
                                                .then(
                                                    data => {
                                                        document.querySelector(
                                                            ".advancedSettingContent .deletePlan"
                                                        ).style.display =
                                                            "inline-block";
                                                        document.querySelector(
                                                            ".advancedSettingContent .planToDelete"
                                                        ).innerHTML =
                                                            "编辑计划";
                                                        $rootScope.ll =
                                                            data.jobId;
                                                        $rootScope.initialData = data;
                                                        document.querySelector(
                                                            ".loader"
                                                        ).style.display =
                                                            "none";
                                                        document.querySelector('.advancedSettingBox').style.display = 'block';
                                                        document.querySelector(".advancedSettingPlan").style.display = "none";
                                                         document.querySelector('.popup').style.display = 'block';
                                                    },
                                                    data => {}
                                                );
                                        }
                                    })
                                    .error(data => {});
                            } else {
                                document.querySelector(
                                    ".year .year_select1_day"
                                ).style.borderColor = "red";
                            }

                            break;
                        case "taskplan":
                            break;
                    }
                };
                $scope.deleteImediate = () => {
                    document.querySelector('.advancedSettingBox').style.display = 'none';
                    var url = "/xdatainsight/api/scheduler/job";
                    var currentTime = new Date();
                    var year = currentTime.getFullYear();
                    var month = preZero(currentTime.getMonth(), 2);
                    var date = preZero(currentTime.getDate(), 2);
                    var hour = preZero(currentTime.getHours(), 2);
                    var minutes = preZero(currentTime.getMinutes(), 2);
                    var seconds = preZero(currentTime.getSeconds(), 2);
                    var milliSeconds = preZero(
                        currentTime.getMilliseconds(),
                        3
                    );
                    var timeResult =
                        year +
                        "-" +
                        month +
                        "-" +
                        date +
                        "T" +
                        hour +
                        ":" +
                        minutes +
                        ":" +
                        seconds +
                        "." +
                        milliSeconds +
                        "+08:00";
                    var immediateDeleteDay =
                        document.getElementById("deleteImmediateDay").value *
                        24 *
                        60 *
                        60;

                    var data = {
                        jobName: "Content Cleaner",
                        actionClass:
                            "org.pentaho.platform.admin.GeneratedContentCleaner",
                        jobParameters: [
                            {
                                name: "age",
                                stringValue: immediateDeleteDay,
                                type: "string"
                            }
                        ],
                        simpleJobTrigger: {
                            endTime: null,
                            repeatCount: "0",
                            repeatInterval: "0",
                            startTime: timeResult,
                            uiPassParam: "RUN_ONCE"
                        }
                    };
                    /*进行正整数验证*/
                    function isPositiveNum(s) {
                        //是否为正整数
                        var re = /^[0-9]*[1-9][0-9]*$/;
                        return re.test(s);
                    }
                    if (
                        isPositiveNum(
                            document.getElementById("deleteImmediateDay").value
                        )
                    ) {
                        /*showWaiting*/
                        document.querySelector(".loader").style.display =
                            "block";
                        $http({
                            method: "post",
                            headers: {
                                contentType: "application/json; charset=utf-8",
                                accept: "text/plain"
                            },
                            url: url,
                            dataType: "text/plain",
                            data: data
                        })
                            .success(data => {
                                document.querySelector(
                                    ".loader"
                                ).style.display = "none";
                                document.querySelector(
                                    ".deleteTips"
                                ).style.display = "block";
                                //hide popup background
                                /*document.querySelector('.popup').style.display = "none";*/
                                //add hide css to user-role
                                /*document.querySelector('.popup email-service').classList.add('popupHide');*/
                            })
                            .error(data => {
                                document.querySelector(
                                    ".loader"
                                ).style.display = "none";
                                document.querySelector(
                                    ".deleteFailTips"
                                ).style.display = "block";
                            });
                    } else {
                        //弹出请输入正整数提示
                        document.querySelector(".deleteTips1").style.display =
                            "block";
                    }
                };
                $scope.closeYhnLoading = () => {
                    // document.querySelector(".loader").style.display = "none";
                    $rootScope.globalLoading(false);
                };
                $scope.clearFlush = () => {

                    document.querySelector(".advancedSettingBox").style.display = "none";
                    //showWaiting
                    // document.querySelector(".loader").style.display = "block";
                    $rootScope.globalLoading(true);
                    //verify identity
                    advancedSettingProvider
                        .callItunes("/xdatainsight/api/mantle/isAuthenticated")
                        .then(
                            data => {
                                if (data) {
                                    //system Setting
                                    advancedSettingProvider
                                        .callItunes(
                                            "/xdatainsight/api/system/refresh/systemSettings"
                                        )
                                        .then(
                                            data => {
                                                //report origin data
                                                advancedSettingProvider
                                                    .callItunes(
                                                        "/xdatainsight/api/system/refresh/metadata"
                                                    )
                                                    .then(
                                                        data => {
                                                            //global variable
                                                            advancedSettingProvider
                                                                .callItunes(
                                                                    "/xdatainsight/api/system/refresh/globalActions"
                                                                )
                                                                .then(
                                                                    data => {
                                                                        //multi model
                                                                        advancedSettingProvider
                                                                            .callItunes(
                                                                                "/xdatainsight/api/system/refresh/mondrianSchemaCache"
                                                                            )
                                                                            .then(
                                                                                data => {
                                                                                    //report dataCache
                                                                                    advancedSettingProvider
                                                                                        .callItunes(
                                                                                            "/xdatainsight/api/system/refresh/reportingDataCache"
                                                                                        )
                                                                                        .then(
                                                                                            data => {
                                                                                                //DateStore Cache
                                                                                                var date = new Date();
                                                                                                var time = date.getTime();
                                                                                                advancedSettingProvider
                                                                                                    .callItunes(
                                                                                                        "/xdatainsight/plugin/cda/api/clearCache?ts=" +
                                                                                                            time
                                                                                                    )
                                                                                                    .then(
                                                                                                        data => {
                                                                                                            //show success tips
                                                                                                            $scope.closeYhnLoading();
                                                                                                            document.querySelector(
                                                                                                                ".flushTips"
                                                                                                            ).style.display =
                                                                                                                "block";
                                                                                                        },
                                                                                                        data => {
                                                                                                            document.querySelector(
                                                                                                                ".flushFailTips"
                                                                                                            ).style.display =
                                                                                                                "block";
                                                                                                            $scope.closeYhnLoading();
                                                                                                        }
                                                                                                    );
                                                                                            },
                                                                                            data => {
                                                                                                document.querySelector(
                                                                                                    ".flushFailTips"
                                                                                                ).style.display =
                                                                                                    "block";
                                                                                                $scope.closeYhnLoading();
                                                                                            }
                                                                                        );
                                                                                },
                                                                                data => {
                                                                                    document.querySelector(
                                                                                        ".flushFailTips"
                                                                                    ).style.display =
                                                                                        "block";
                                                                                    $scope.closeYhnLoading();
                                                                                }
                                                                            );
                                                                    },
                                                                    data => {
                                                                        document.querySelector(
                                                                            ".flushFailTips"
                                                                        ).style.display =
                                                                            "block";
                                                                        $scope.closeYhnLoading();
                                                                    }
                                                                );
                                                        },
                                                        data => {
                                                            document.querySelector(
                                                                ".flushFailTips"
                                                            ).style.display =
                                                                "block";
                                                            $scope.closeYhnLoading();
                                                        }
                                                    );
                                            },
                                            data => {
                                                document.querySelector(
                                                    ".flushFailTips"
                                                ).style.display = "block";
                                                $scope.closeYhnLoading();
                                            }
                                        );
                                }
                            },
                            data => {
                                document.querySelector(
                                    ".flushFailTips"
                                ).style.display = "block";
                                $scope.closeYhnLoading();
                            }
                        );
                };
                $scope.clearFlushTips = () => {
                    document.querySelector(".flushTips").style.display = "none";
                    document.querySelector(".advancedSettingBox").style.display = "block";
                };
                $scope.clearDeleteTips = () => {
                    document.querySelector(".deleteTips").style.display = "none";
                    document.querySelector(".popup").style.display = "none";
                    $('.advancedSettingBox').hide();
                    // document.querySelector(".advancedSettingBox").style.display = "block";

                };
                $scope.clearDeleteTips1 = () => {
                    document.querySelector(".deleteTips1").style.display =
                        "none";
                  document.querySelector(".advancedSettingBox").style.display =
                    "block";
                };
                $scope.clearDeleteTips2 = () => {
                    document.querySelector(".deleteTips2").style.display =
                        "none";
                    document.querySelector(".advancedSettingPlan").style.display =
                        "block";
                };
                $scope.clearDeleteTips3 = () => {
                    document.querySelector(".deleteTips3").style.display =
                        "none";
                  document.querySelector(".advancedSettingPlan").style.display =
                    "block";
                };
                $scope.clearDeleteTips4 = () => {
                    document.querySelector(".deleteTips4").style.display =
                        "none";
                  document.querySelector(".advancedSettingPlan").style.display =
                    "block";
                };
                $scope.showDangerousTips = a => {
                    document.querySelector("#commonTips").innerHTML = a;
                    document.querySelector(".deleteTips4").style.display =
                        "block";
                };
                $scope.clearFlushFailTips = () => {
                    document.querySelector(".flushFailTips").style.display =
                        "none";
                };
                $scope.clearDeleteFailTips = () => {
                    document.querySelector(".deleteFailTips").style.display =
                        "none";
                    $('.popup').hide();
                    $('.advancedSettingBox').hide();
                };
                function preZero(num, n) {
                    var i = (num + "").length;
                    while (i++ < n) num = "0" + num;
                    return num;
                }
            }
        ]);
}
