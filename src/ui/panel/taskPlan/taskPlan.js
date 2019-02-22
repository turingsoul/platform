import angular from 'angular';
import $ from 'jquery';
import {tips} from '../../popup/dataSource/component/createModule/public';



{

    angular.module('xdt/taskPlan', [])
      .directive('taskPlan', ()=> {
        return {
          restrict: 'E',
          template: require('./taskPlan.html'),
          scope:{
            propdata:'<',
          },
          controller: ['$scope', '$state', 'panelFactory', '$http', '$rootScope', 'pageService', 'taskplanProvider',($scope, $state, panelFactory, $http, $rootScope, pageService, taskplanProvider)=> {
            $('.popup').hide();
            $('menu-directive').addClass('menu-hide');
            $(".flexline").removeClass("unfolded").addClass("folded");
            // document.querySelector('.popup').style.display = "none";
            // document.querySelector('menu-directive').classList.add('menu-hide');
            let pathParam = {
                pathWindow: "taskPlan",
                pathName: "任务计划"
            };
            $scope.$emit('fileWindowPath', pathParam);
            function getList() {
                $http({
                    method: 'get',
                    headers: {Accept: "application/json"},
                    url: "/xdatainsight/api/scheduler/jobs",
                    dataType: 'json',
                    data: ""
                }).success((data)=> {
                    if (data) {
                        $scope.planList = data.job;
                    } else {
                        $scope.planList = "";
                    }
                }).error((data)=> {
                    tips("错误，请重试");
                });
            }

            getList();
            //删除
            $scope.delJob = (e)=> {
                warnning("你确定要删除这个计划吗？");
                $('.myAlert').show();
                $("body").on("click", ".myCancel", function () {
                    $("body > .myAlert").remove();
                }).on("click", ".mySure", function () {
                    panelFactory.removeJob(e)
                        .then((data)=> {
                            getList();
                            $("body").off("click", ".myCancel").off("click", ".mySure");
                        }, (data)=> {
                            tips("错误，请重试");
                        });
                    $("body > .myAlert").remove();
                });
            };
            //切换暂停和开始
            $scope.startOrPause = (id, state, obj)=> {
                var url = state == "NORMAL" ? "/xdatainsight/api/scheduler/pauseJob" : "/xdatainsight/api/scheduler/resumeJob";
                var data = {
                    jobId: id
                };
                $http({
                    method: 'post',
                    headers: {"Content-Type": "application/json;charset=UTF-8"},
                    url: url,
                    dataType: 'json',
                    data: data
                }).success((data)=> {
                    obj.state = data;
                }).error((data)=> {
                    tips("错误，请重试");
                });
            };
            //warnning
            function warnning(e) {
                var div = '<div class="addMask myAlert"> <div class="alert-box"> <div class="title font-blod600"> ' +
                    '<span class="title-name">删除确认</span> <span class="title-cancel myCancel"' +
                    'title="关闭"></span> </div> <div class="alert-main"> <div class="imgbox1"></div> <p>' + e + '</p> ' +
                    '</div> <div class="alert-input"> <input type="button" class="myBtn mySure" value="删除"' +
                    ' title="删除"/> <input type="button" class="myBtn1 myCancel" value="取消" title="取消"/> ' +
                    '</div> </div> </div>';
                $("body").append(div);
            };
            //立即执行
            $scope.rightNow = (id, obj)=> {
                var data = {
                    jobId: id
                };
                $http({
                    method: 'post',
                    headers: {"Content-Type": "application/json;charset=UTF-8"},
                    url: "/xdatainsight/api/scheduler/triggerNow",
                    dataType: 'json',
                    data: data
                }).success((data)=> {
                    obj.state = data;
                    getList();
                    tips("您的文件正在后台处理，完成后将会保存在所选位置。")
                }).error((data)=> {
                    tips("错误，请重试");
                });
            };
            //编辑计划
            $scope.editPlan = (e)=> {
                document.querySelector('.addMask').style.display = 'block';
                $scope.jobId = e.jobId;
                panelFactory.getJobInfo(e)
                    .then((data)=> {
                        $scope.newPlan(data);
                    }, (data)=> {
                        tips("错误，请重试");
                    })
            };
            $(".datePicker").datepicker({
                dateFormat: "yy-mm-dd"
            });
            //$scope.myType = "onlyone";
            //$scope.radio = true;
            $scope.changeRaido = (x)=> {
                if (x) {
                    $("task-plan .sendMail .emailInfo").removeClass("hide");
                    // document.querySelector("task-plan .sendMail .emailInfo").classList.remove("hide");
                    $scope.emailTag = true;
                } else {
                    $("task-plan .sendMail .emailInfo").addClass("hide");
                    // document.querySelector("task-plan .sendMail .emailInfo").classList.add("hide");
                    $scope.emailTag = false;
                }
            };
            $scope.borderRed=($event, e, type)=>{
                if (isNaN(e) || !e) {
                    $event.target.style.borderColor = "red";
                } else {
                    $event.target.style.borderColor = "#d8d8d8";
                    type && ($scope[type] = e);
                }
            };
            $scope.changeOpt = (x) => {
                $scope._taskplan = x;
                /*var container = document.querySelectorAll("task-plan .mychoosedContent>div");
                for (var i = 0; i < container.length; i++) {
                    container[i].style.display = "none";
                }
                document.querySelector("task-plan .mychoosedContent>." + x + "").style.display = "block";*/
                //初值
                $scope.resizeType();
            };
            //赋值  初始值
            $scope.resizeType=()=>{
                $scope.mySecond = 30;
                $scope.myMinutes = 1;
                $scope.myHours = 1;
                $scope.myDay = 1;
                $scope.myMonth = 1;
                $scope.myYear = 1;
                $scope._myChoose0 = true;
                $scope._myChoose2 = true;
                $scope._myChoose4 = true;
                $scope._myChoose1 = false;
                $scope._myChoose3 = false;
                $scope._myChoose5 = false;
                ['2','3','4','5','6','0'].forEach(function(e){
                    $scope['_weekcheck' + e] = false;
                });

                $scope.daysOfWeek = '1';

                $scope.weeksOfMonth = '0';
                $scope.monthsOfYear = '0';

                $scope.monthsOfYear1 = '0';
                $scope.weeksOfMonth1 = '0';
                $scope.daysOfWeek1 = '1';
                $scope._weekcheck1 = true;
            };
            $scope.hours = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
            $scope.minutes = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09",
                "10", "11", "12", "13", "14", "15", "16", "17", "18", "19",
                "20", "21", "22", "23", "24", "25", "26", "27", "28", "29",
                "30", "31", "32", "33", "34", "35", "36", "37", "38", "39",
                "40", "41", "42", "43", "44", "45", "46", "47", "48", "49",
                "50", "51", "52", "53", "54", "55", "56", "57", "58", "59"
            ];
            $scope.closePlan = () => {
                document.querySelector("task-plan .taskPlan").classList.add("popuphide");
            };
            //文件
            file();
            function file() {
                panelFactory.fileTree()
                    .then((data)=> {
                        //$scope.myFileTree=data.children;
                        var et = new Tree(data.children, 'myFileTree2');
                    }, (data)=> {
                        tips("错误，请重试");

                    });
            }

            function Tree(data, el) {
                this.app = function (par, tag) {
                    return par.appendChild(document.createElement(tag))
                };
                this.create($('task-plan #' + el)[0], data)
            }

            Tree.fn = Tree.prototype = {
                create: function (par, group) {
                    var host = this, length = group.length;
                    for (var i = 0; i < length; i++) {
                        if(group[i].file.folder == "false") continue;
                        var dl = this.app(par, 'DL'), dt = this.app(dl, 'DT'), dd = this.app(dl, 'DD');
                        dt.innerHTML = '<a href="javascript:void(0)">' + group[i].file.title + '</a>';
                        dt.path = group[i].file.path;
                        dt.group = group[i].children;
                        dt.className += "node-close";
                        dt.onclick = function () {
                            $scope.planPath = this.path;
                            $(".planPath").text(this.path);
                            if (document.querySelector(".myFileTree .active")) {
                                document.querySelector(".myFileTree .active").classList.remove("active");
                            }
                            if (!this.group){
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
            };
            function trim(str) {
                str = str.replace(/^(\s|\u00A0)+/, '');
                for (var i = str.length - 1; i >= 0; i--) {
                    if (/\S/.test(str.charAt(i))) {
                        str = str.substring(0, i + 1);
                        break;
                    }
                }
                return str;
            }

            //编辑计划
            //day
            $scope.oneday = ()=> {
                $scope.dayable = false;
                $scope.myDay = $scope.myDay || 1;
            };
            $scope.everyworkday = ()=> {
                $scope.dayable = true;
                $scope.myDay = "";
            };
            //month
            $scope.onemonth = ()=> {
                $scope.monthable = false;
                $scope.myMonth = $scope.myMonth || 1;
            };
            $scope.everymonth = ()=> {
                $scope.monthable = true;
                $scope.myMonth = "";
            };
            //year
            $scope.oneyear = ()=> {
                $scope.yearable = false;
                $scope.myYear = $scope.myYear || 1;
            };
            $scope.everyear = ()=> {
                $scope.yearable = true;
                $scope.myYear = "";
            };
            $scope.newPlan = (jobInfo)=> {
                $scope.jobInfo = jobInfo;
                $scope.planName = jobInfo.jobName;
                var _seftJobParam = jobInfo.jobParams.jobParams.find(function(e){return e.name === 'ActionAdapterQuartzJob-StreamProvider'});
                if(_seftJobParam && _seftJobParam.value){
                    $("task-plan .planPath").text(_seftJobParam.value.split(".")[1].split("=")[1].substring(0, _seftJobParam.value.split(".")[1].split("=")[1].lastIndexOf("\/")));
                }
                /*if (jobInfo.jobParams.jobParams[1].value) {
                    if(jobInfo.jobParams.jobParams[1].value){
                        $("task-plan .planPath").text(jobInfo.jobParams.jobParams[1].value.split(".")[1].split("=")[1].substring(0, jobInfo.jobParams.jobParams[1].value.split(".")[1].split("=")[1].lastIndexOf("\/")));
                    }
                } else {
                    if(jobInfo.jobParams.jobParams[4].value){
                        $("task-plan .planPath").text(jobInfo.jobParams.jobParams[4].value.split(".")[1].split("=")[1].substring(0, jobInfo.jobParams.jobParams[4].value.split(".")[1].split("=")[1].lastIndexOf("\/")));
                    }
                }*/
                $('task-plan .fixedBox').removeClass('hide');
                $('task-plan .editPlan').removeClass('hide');
                // document.querySelector("task-plan .fixedBox").classList.remove("hide");
                // document.querySelector("task-plan .editPlan").classList.remove("hide");
                var currentDate = new Date();
                var currentTime = currentDate.getTime();
                taskplanProvider.callItunes("/xdatainsight/api/scheduler/blockout/hasblockouts?ts=" + currentTime)
                    .then((data)=> {
                        $scope.hasblockouts = data;
                    }, (data)=> {
                        tips("错误，请重试");
                    })
            };
            $scope.showPlan = () => {
                $scope.myType = $scope.jobInfo.jobTrigger.uiPassParam;
                var date = new Date();
                $scope._taskplan = $scope.myType;
                function getHour(e) {
                    var _data = e % 12 + '';
                    return _data.length > 1 ? _data : '0' + _data;
                }
                var startTimeArr = $scope.jobInfo.jobTrigger.startTime.split("T");
                $scope.myMinute = startTimeArr[1].split(":")[1];
                $scope.myHour = getHour(startTimeArr[1].split(":")[0]);
                $scope.myHalf = startTimeArr[1].split(":")[0] > 12 ? "PM" : "AM";
                $scope.myStartDate = startTimeArr[0];
                var _html = '';
                $scope.resizeType();
                switch ($scope.myType) {
                    case "RUN_ONCE":
                        break;
                    case "SECONDS":
                        $scope.mySecond = $scope.jobInfo.jobTrigger.repeatInterval;
                        break;
                    case "MINUTES":
                        $scope.myMinutes = $scope.jobInfo.jobTrigger.repeatInterval / (60);
                        break;
                    case "HOURS":
                        $scope.myHours = $scope.jobInfo.jobTrigger.repeatInterval / (3600);
                        break;
                    case "DAILY":
                        if ($scope.jobInfo.jobTrigger.repeatInterval) {
                            // $('#myChoose4').attr('checked',true);
                            $scope._myChoose4 = true;
                            // document.getElementById('myChoose4').checked = true;
                            $scope.myDay = $scope.jobInfo.jobTrigger.repeatInterval / (3600 * 24);
                        } else {
                            // $('#myChoose5').attr('checked',true);
                            $scope._myChoose5 = true;
                            // document.getElementById('myChoose5').checked = true;
                        }
                        break;
                    case "WEEKLY":
                        if($scope.jobInfo.jobTrigger.dayOfWeekRecurrences){
                            var days = $scope.jobInfo.jobTrigger.dayOfWeekRecurrences.recurrenceList.values;
                            for (var n in days) {
                                var value = days[n] - 1;
                                $scope['_weekcheck' + value] = true;
                                // $(".days input[type='checkbox'][value=" + value + "]").attr("checked", true);
                            }
                        }
                        break;
                    case "MONTHLY":
                        if ($scope.jobInfo.jobTrigger.dayOfMonthRecurrences) {
                            // $('#myChoose2').attr('checked',true);
                            $scope._myChoose2 = true;
                            // document.getElementById('myChoose2').checked = true;
                            $scope.myMonth = $scope.jobInfo.jobTrigger.dayOfMonthRecurrences.recurrenceList.values[0];
                        } else {
                            $scope._myChoose3 = true;
                            // $('#myChoose3').attr('checked',true);
                            // document.getElementById('myChoose3').checked = true;
                            $scope.daysOfWeek = $scope.jobInfo.jobTrigger.cronString.split("*")[1].split("#")[0] - 1 + '';
                            $scope.weeksOfMonth = $scope.jobInfo.jobTrigger.cronString.split("*")[1].split("#")[1] - 1 + '';
                            // $("task-plan .daysOfWeek").val($scope.jobInfo.jobTrigger.cronString.split("*")[1].split("#")[0] - 1);
                            // $("task-plan .weeksOfMonth").val($scope.jobInfo.jobTrigger.cronString.split("*")[1].split("#")[1] - 1);
                        }
                        break;
                    case "YEARLY":
                        if ($scope.jobInfo.jobTrigger.dayOfMonthRecurrences) {
                            // $('#mychoose0').attr('checked',true);
                            $scope._mychoose0 = true;
                            // document.getElementById('mychoose0').checked = true;
                            $scope.monthsOfYear = $scope.jobInfo.jobTrigger.monthlyRecurrences.recurrenceList.values[0];
                            // $("task-plan .monthsOfYear").val($scope.jobInfo.jobTrigger.monthlyRecurrences.recurrenceList.values[0]);
                            $scope.myYear = $scope.jobInfo.jobTrigger.dayOfMonthRecurrences.recurrenceList.values[0];
                        } else {
                            // $('#mychoose1').attr('checked',true);
                            $scope._mychoose1 = true;
                            // document.getElementById('mychoose1').checked = true;
                            _html = $scope.jobInfo.jobTrigger.cronString.split("?")[1].split(" ");
                            $scope.monthsOfYear1 = _html[1] - 1 + '';
                            $scope.daysOfWeek1 = _html[2].split("#")[0] - 1 + '';
                            $scope.weeksOfMonth1 = _html[2].split("#")[1] - 1 + '';
                            // $("task-plan .monthsOfYear1").val(_html[1] - 1);
                            // $("task-plan .daysOfWeek1").val(_html[2].split("#")[0] - 1);
                            // $("task-plan .weeksOfMonth1").val(_html[2].split("#")[1] - 1);
                        }
                        break;
                    case "taskplan":
                        break;
                }
                if (!$(".planPath").text()) {
                    tips("选择一个路径");
                    return;
                }
                if ($scope.hasblockouts == "false") {
                    $('task-plan .planBox').addClass('hide');
                    $('task-plan .mytaskPlan').removeClass('hide');
                    // document.querySelector("task-plan .planBox").classList.add("hide");
                    // document.querySelector("task-plan .mytaskPlan").classList.remove("hide");
                    /*var container = document.querySelectorAll("task-plan .mychoosedContent>div");
                    for (var i = 0; i < container.length; i++) {
                        container[i].style.display = "none";
                    }
                    document.querySelector("task-plan .mychoosedContent>." + $scope.myType).style.display = "block";*/
                }
            };
            $scope.email = ()=> {
                document.querySelector('.ifEmail input').checked = true;
                panelFactory.isAuthenticated()
                    .then((data)=> {
                        if (data) {
                            document.querySelector("task-plan .mytaskPlan").classList.add("hide");
                            document.querySelector("task-plan .sendMail").classList.remove("hide");
                            if ($scope.jobInfo.jobParams.jobParams[1].value) {
                                $scope.emailTag = false;
                                document.querySelector("task-plan .sendMail .emailInfo").classList.add("hide");
                                document.getElementById('emailNo').checked = true;
                            } else {
                                $scope.emailTag = true;
                                document.querySelector("task-plan .sendMail .emailInfo").classList.remove("hide");
                                document.getElementById('emailYes').checked = true;
                                $scope.emails = $scope.jobInfo.jobParams.jobParams[0].value;
                                $scope.emailsTitle = $scope.jobInfo.jobParams.jobParams[6].value;
                                $scope.emailMsn = $scope.jobInfo.jobParams.jobParams[3].value;
                                $scope.emailFileName = $scope.jobInfo.jobParams.jobParams[10].value;
                            }
                        }
                    }, (data)=> {
                        tips("你没有权限删除该文件/目录，或文件/目录已不存在，请联系管理员")
                    });
            };
            $scope.checkout = ()=> {
                document.querySelector('.addMask').style.display = 'none';
                var startTime = $scope.myStartDate + "T" + ($scope.myHalf == "PM" ? parseInt($scope.myHour) + 12 : $scope.myHour) + ":" + $scope.myMinute + ":00.000+08:00";
                var endTime = $("task-plan #" + $scope.myType + "end1").val() ? $("task-plan #" + $scope.myType + "end1").val() + "T23:59:59.000+08:00" : null;
                var data;
                switch ($scope.myType) {
                    case "RUN_ONCE":
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
                    case "SECONDS":
                        data = {
                            simpleJobTrigger: {
                                endTime: endTime,
                                repeatCount: -1,
                                repeatInterval: $scope.mySecond,
                                startTime: startTime,
                                uiPassParam: "SECONDS"
                            }
                        };
                        break;
                    case "MINUTES":
                        data = {
                            simpleJobTrigger: {
                                endTime: endTime,
                                repeatCount: -1,
                                repeatInterval: $scope.myMinutes * 60,
                                startTime: startTime,
                                uiPassParam: "MINUTES"
                            }
                        };
                        break;
                    case "HOURS":
                        data = {
                            simpleJobTrigger: {
                                endTime: endTime,
                                repeatCount: -1,
                                repeatInterval: $scope.myHours * 3600,
                                startTime: startTime,
                                uiPassParam: "HOURS"
                            }
                        };
                        break;
                    case "DAILY":
                        if ($scope.myDay) {
                            data = {
                                simpleJobTrigger: {
                                    endTime: endTime,
                                    repeatCount: -1,
                                    repeatInterval: $scope.myDay * 3600 * 24,
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
                    case "WEEKLY":
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
                    case "MONTHLY":
                        if ($scope.myMonth) {
                            data = {
                                complexJobTrigger: {
                                    daysOfMonth: [$scope.myMonth],
                                    endTime: endTime,
                                    startTime: startTime,
                                    uiPassParam: "MONTHLY"
                                }
                            }
                        } else {
                            data = {
                                complexJobTrigger: {
                                    daysOfWeek: [$("task-plan .daysOfWeek").val()],
                                    endTime: endTime,
                                    startTime: startTime,
                                    uiPassParam: "MONTHLY",
                                    weeksOfMonth: [$("task-plan .weeksOfMonth").val()]
                                }
                            }
                        }
                        break;
                    case "YEARLY":
                        if ($scope.myYear) {
                            data = {
                                complexJobTrigger: {
                                    daysOfMonth: [$scope.myYear],
                                    endTime: endTime,
                                    monthsOfYear: [$("task-plan .monthsOfYear").val()],
                                    startTime: startTime,
                                    uiPassParam: "YEARLY"
                                }
                            }
                        } else {
                            data = {
                                complexJobTrigger: {
                                    daysOfWeek: [$("task-plan .daysOfWeek1").val()],
                                    endTime: endTime,
                                    monthsOfYear: [$("task-plan .monthsOfYear1").val()],
                                    startTime: startTime,
                                    uiPassParam: "YEARLY",
                                    weeksOfMonth: [$("task-plan .weeksOfMonth1").val()]
                                }
                            }
                        }
                        break;
                    case "taskplan":
                        break;
                }
                var _selfJobParam = $scope.jobInfo.jobParams.jobParams.find(function(e){return e.name === "ActionAdapterQuartzJob-StreamProvider"});
                if(_selfJobParam && _selfJobParam.value){
                    data.inputFile = trim(_selfJobParam.value.split(":")[0].split("=")[1]);
                    // data.outputFile = trim(_selfJobParam.value.split(".")[1].split("=")[1].substring(0, _selfJobParam.value.split(".")[1].split("=")[1].lastIndexOf("\/")));
                }
                /*if ($scope.jobInfo.jobParams.jobParams[1].value) {
                    data.inputFile = trim($scope.jobInfo.jobParams.jobParams[1].value.split(":")[0].split("=")[1]);
                    data.outputFile = trim($scope.jobInfo.jobParams.jobParams[1].value.split(".")[1].split("=")[1].substring(0, $scope.jobInfo.jobParams.jobParams[1].value.split(".")[1].split("=")[1].lastIndexOf("\/")));
                } else {
                    data.inputFile = trim($scope.jobInfo.jobParams.jobParams[4].value.split(":")[0].split("=")[1]);
                    data.outputFile = trim($scope.jobInfo.jobParams.jobParams[4].value.split(".")[1].split("=")[1].substring(0, $scope.jobInfo.jobParams.jobParams[4].value.split(".")[1].split("=")[1].lastIndexOf("\/")));
                }*/
                data.jobName = $scope.planName;
                data.outputFile = $('.planPath').text();
                var _aaqa =  $scope.jobInfo.jobParams.jobParams.find(function(e){return e.name === "ActionAdapterQuartzJob-ActionId"}) || {};

                if ($scope.emailTag) {
                    data.jobParameters = [
                        {name: "_SCH_EMAIL_TO", stringValue: $scope.emails, type: "string"},
                        {name: "_SCH_EMAIL_CC", stringValue: "", type: "string"},
                        {name: "_SCH_EMAIL_BCC", stringValue: "", type: "string"},
                        {name: "_SCH_EMAIL_SUBJECT", stringValue: $scope.emailsTitle || "", type: "string"},
                        {name: "_SCH_EMAIL_MESSAGE", stringValue: $scope.emailMsn || "", type: "string"},
                        {name: "_SCH_EMAIL_ATTACHMENT_NAME", stringValue: $scope.emailFileName || "", type: "string"}
                    ];
                } else {
                    data.jobParameters = [{
                        name: /*$scope.jobInfo.jobParams.jobParams[5].name*/_aaqa.name,
                        stringValue: [/*$scope.jobInfo.jobParams.jobParams[5].value*/_aaqa.value],
                        type: "string"
                    }];
                }
                panelFactory.postJob(data)
                    .then((data)=> {
                        $scope.removeJob();
                    }, (data)=> {
                        $('.addMask').hide();
                        tips("错误，请重试");
                    });
            };
            //关闭
            $scope.close = ()=> {
                document.querySelector('.addMask').style.display = 'none';
                document.querySelector("task-plan .fixedBox").classList.add("hide");
                $("task-plan .planBox").addClass("hide");
            };
            //上一步
            $scope.preStep = (preStep, thisStep)=> {
                document.querySelector("task-plan ." + preStep + "").classList.remove("hide");
                document.querySelector("task-plan ." + thisStep + "").classList.add("hide");
            }
            //looklist
            $scope.lookList = ()=> {
                document.querySelector("task-plan .sendMail").classList.add("hide");
                document.querySelector("task-plan .checkout").classList.remove("hide");
                $state.go('taskPlan');
            };
            //remove
            $scope.removeJob = ()=> {
                panelFactory.removeJob($scope.jobId)
                    .then((data)=> {
                        document.querySelector("task-plan .sendMail").classList.add("hide");
                        document.querySelector("task-plan .fixedBox").classList.add("hide");
                        getList();
                        tips("更新成功！");
                    }, (data)=> {
                        tips("错误，请重试");
                    });
            };
        }]
        }
      })
}