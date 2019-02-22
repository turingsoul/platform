/**
 * Created by Administrator on 2016/5/3.
 */
import angular from "angular";
import $ from "jquery";
import "../style/menu.css";
import "../popup/popup";
import pinyin from "./server";

{
    ("use strict");
    const template = require("./menu.html");
    angular
        .module("xdt/menu", [])
        .directive("menuDirective", () => {
            return {
                restrict: "E",
                template: template,
                link() {
                    /*listen on scroll*/
                    document.querySelector(".tableList").onscroll = function() {
                        if (
                            document.querySelector(".tableList").scrollTop == 0
                        ) {
                            document.querySelector(".shelter").style.display =
                                "none";
                        } else {
                            document.querySelector(".shelter").style.display =
                                "block";
                        }
                        var alphaList = [];
                        /*get alpha length*/
                        var alphaLength = document.querySelectorAll(
                            ".tableList>li"
                        ).length;
                        /*get alpha list*/
                        for (let i = 0; i < alphaLength; i++) {
                            alphaList.push(
                                document
                                    .querySelectorAll(".tableList>li")
                                    .item(i)
                                    .children.item(0)
                                    .children.item(1).innerHTML
                            );
                        }
                        /*calculate length*/
                        var currentLength = 0;
                        var myul = document.querySelectorAll(".tableList>li");
                        var scrollDistance = document.querySelector(
                            ".tableList"
                        ).scrollTop;
                        for (var i = 0; i < alphaLength; i++) {
                            currentLength =
                                currentLength + myul.item(i).offsetHeight;
                            if (currentLength >= scrollDistance) {
                                document.querySelector(
                                    ".shelter"
                                ).style.opacity = 0;
                                document.querySelector(".shelter").innerHTML =
                                    alphaList[i];
                                document.querySelector(
                                    ".shelter"
                                ).style.opacity = 1;
                                break;
                            } else {
                            }
                        }
                    };
                }
            };
        })
        .factory("menuFactory", [
            "$http",
            "$q",
            ($http, $q) => {
                let service = {};
                service.list = $event => {
                    //将选中分析浏览部分选中效果清空
                    $(".openReport .yhnBlueBG").removeClass("yhnBlueBG");
                    $(".menu .tableList").hide();
                    let imgNode = $event.target.parentNode.querySelectorAll(
                        "div.bkimg"
                    );
                    /*选中的旋转角标*/
                    let imgNode2 = document.querySelectorAll("div.bkimg");
                    /*所有旋转角标*/
                    /*获取当前列表下子列表的长度*/
                    let divNumLength =
                        $event.target.parentNode.querySelectorAll("div")
                            .length -
                        $event.target.parentNode.querySelectorAll(".alt")
                            .length;
                    let liNum = document.querySelectorAll(".menu>li");
                    if ($event.target.localName == "span") {
                        if (
                            $event.target.parentNode.style.height ==
                                $event.target.clientHeight + "px" ||
                            $event.target.parentNode.style.height == "" ||
                            $event.target.parentNode.style.height ==
                                $event.target.clientHeight - 1 + "px"
                        ) {
                            for (var i = 0; i < liNum.length; i++) {
                                /*所有的都回收*/
                                if (
                                    parseInt(liNum[i].style.height) >
                                    $event.target.clientHeight
                                ) {
                                    liNum[i].style.height =
                                        $event.target.clientHeight + "px";
                                    // imgNode2[i].style.webkitTransform = "rotate(0deg)";
                                    imgNode2[i].style.transform =
                                        "rotate(0deg)";
                                }
                            }
                            $event.target.parentNode.style.height =
                                40 * (divNumLength - 1) + 48 + "px";
                            /*展开选中项*/
                            // imgNode[0].style.webkitTransform = "rotate(90deg)";
                            imgNode[0].style.transform = "rotate(90deg)";
                        } else {
                            var origin =
                                $event.target.clientHeight == 48
                                    ? $event.target.clientHeight
                                    : 48;
                            $event.target.parentNode.style.height =
                                origin + "px";
                            imgNode[0].style.transform = "rotate(0deg)";
                        }
                    }
                };
                service.tableList = $event => {
                    if ($event.target.className == "display firstLetter") {
                        let liNum = document.querySelectorAll(
                            ".menu>div.tableList>li"
                        );
                        let divNum = $event.target.parentNode.querySelectorAll(
                            ".menu>div.tableList>li a"
                        );
                        let iconTriangle = $event.target.parentNode.querySelectorAll(
                            "span.iconTriangle"
                        );
                        let nodeTriangle = document.querySelectorAll(
                            ".menu span.iconTriangle"
                        );
                        if (
                            $event.target.parentNode.style.height ==
                            $event.target.clientHeight +
                                "px" /*||$event.target.parentNode.style.height==""*/
                        ) {
                            /*for(var i=0;i<liNum.length;i++){
                         if( parseInt(liNum[i].style.height)>$event.target.clientHeight){
                         liNum[i].style.height=$event.target.clientHeight+"px";
                         nodeTriangle[i].style.webkitTransform="rotate(0deg)";
                         }
                         }*/
                            $event.target.parentNode.style.height =
                                60 * divNum.length + 40 + "px";
                            iconTriangle[0].style.webkitTransform =
                                "rotate(90deg)";
                        } else {
                            $event.target.parentNode.style.height =
                                $event.target.clientHeight + "px";
                            iconTriangle[0].style.webkitTransform =
                                "rotate(0deg)";
                        }
                    } else {
                    }
                };
                service.filterFile = (files, suffix, result) => {
                    //配置正则字符串
                    var selfHtml = suffix;
                    if (suffix === "wcdf") {
                        selfHtml += "|xdf";
                    } else if (suffix === "prpt") {
                        selfHtml += "|htm|html";
                    }
                    let selfReg = RegExp("^(" + selfHtml + ")$");
                    for (var p in files) {
                        if (p == "children") {
                            for (var q in files[p]) {
                                if (files[p][q]["children"] != undefined) {
                                    service.filterFile(
                                        files[p][q],
                                        suffix,
                                        result
                                    );
                                } else {
                                    if (files[p][q]["file"] != undefined) {
                                        var fileName = files[p][q]["file"].name;
                                        if (
                                            selfReg.test(
                                                fileName.substr(
                                                    fileName.lastIndexOf(".") +
                                                        1,
                                                    fileName.length
                                                )
                                            ) /* == suffix*/
                                        ) {
                                            result.push(files[p][q]);
                                        }
                                    }
                                }
                            }
                        } else if (p == "file") {
                            var fileName = files[p].name;
                            if (
                                selfReg.test(
                                    fileName.substr(
                                        fileName.lastIndexOf(".") + 1,
                                        fileName.length
                                    )
                                ) /* == suffix*/ &&
                                !selfReg.test(fileName) /* != suffix*/
                            ) {
                                result.push(files[p]);
                            }
                        }
                    }
                };
                service.wordsSort = files => {
                    return files.sort((a, b) => {
                        return pinyin
                            .getFullChars(a["file"].name)
                            .localeCompare(
                                pinyin.getFullChars(b["file"].name),
                                "en"
                            );
                    });
                };
                service.fileMenuLoc = $event => {
                    $(".popup").hide();
                    $(".menu .tableList").show();
                };
                service.timeFormat = t => {
                    if (t[4] == "-") {
                        /*avoid double convert*/
                        return t;
                    } else {
                        let lastDate = new Date(parseInt(t));
                        let Y = lastDate.getFullYear() + "-";
                        let M =
                            (lastDate.getMonth() + 1 < 10
                                ? "0" + (lastDate.getMonth() + 1)
                                : lastDate.getMonth() + 1) + "-";
                        let D =
                            (lastDate.getDate() < 10 ? "0" : "") +
                            lastDate.getDate() +
                            " ";
                        let h =
                            (lastDate.getHours() < 10 ? "0" : "") +
                            lastDate.getHours() +
                            ":";
                        let m =
                            (lastDate.getMinutes() < 10 ? "0" : "") +
                            lastDate.getMinutes();
                        return Y + M + D + h + m;
                    }
                };
                service.recentXhr = data => {
                    let deferred = $q.defer();
                    $http({
                        method: "post",
                        headers: { Accept: "application/json" },
                        url: "/xdatainsight/plugin/xdt/api/user-settings/recent",
                        data: data,
                        dataType: "json"
                    })
                        .success(data => {
                            deferred.resolve(data);
                        })
                        .error(() => {
                            deferred.reject("There was an error");
                        });
                    return deferred.promise;
                };
                return service;
            }
        ])
        .service("menuService", () => {})
        .controller("menuController", [
            "$scope",
            "menuFactory",
            "$rootScope",
            "$http",
            "$state",
            "tabHandleFactory",
            "recentFactory",
            (
                $scope,
                menuFactory,
                $rootScope,
                $http,
                $state,
                tabHandleFactory,
                recentFactory
            ) => {
                /*权限热插拔*/
                /*设置显示*/
                $scope.loadingState = false;
                $scope.settingDisplayControl = function() {
                    if ($scope && $scope.adminSecurity) {
                        return $scope.adminSecurity == true &&
                            $scope.planContent == true
                            ? false
                            : true;
                    } else return true;
                };
                /*创建内容权限以及数据源权限*/
                $scope.reportCreate = false;
                $scope.manageDataSource = false;
                $scope.adminSecurity = true;
                $scope.planContent = true;
                $scope.listLoadingShow = false;

                //判断类型
                function judgeType(data){
                    return Object.prototype.toString.call(data).slice(8,-1)
                }
                /*判断是否为登录页*/
                if (window.location.href.split("/").pop() != "Login") {
                    $http
                        .get("/xdatainsight/plugin/xdt/api/userroledao/logicalRoleMap")
                        .success(function(response) {
                            $rootScope._roleManage = response;
                            
                            var assignments = $rootScope._roleManage && $rootScope._roleManage.assignments,
                                _assignment,
                                _assignmentObj = {logicalRoles:[],logicalRoles1:{}};
                            judgeType(assignments) === 'Object' && (_assignment = assignments);
                            if(judgeType(assignments) === 'Array'){
                              assignments.forEach(function(e,i){
                                judgeType(e.logicalRoles) === 'Array' ? 
                                e.logicalRoles.forEach(function(item,ii){
                                  _assignmentObj.logicalRoles1[item] = '';
                                }) : (_assignmentObj.logicalRoles1[e.logicalRoles] = '')
                              });
                              for(var key in _assignmentObj.logicalRoles1){
                                _assignmentObj.logicalRoles.push(key);
                              }
                              _assignment = _assignmentObj;
                            }
                            //创建内容 org.pentaho.repository.create
                            _assignment.logicalRoles.includes('org.pentaho.repository.create') && ($rootScope._xdfAndOlapIsEdit = true);
                            $rootScope.typeWhiteList.includes('xdf') && ($rootScope._xdfIsEdit = true);
                            $rootScope.typeWhiteList.includes('saiku') && ($rootScope._saikuIsEdit = true);
                            $rootScope.typeWhiteList.includes('xdp') && ($rootScope._xdpIsEdit = true);
                            // console.log('_assignment',_assignment);

                            var localizedRoleNames =
                                response.localizedRoleNames;
                            var roleNames = [];
                            $scope.roleData = response.assignments;
                            if (!$scope.roleData) return;

                            for (
                                var i = 0;
                                i < localizedRoleNames.length;
                                i++
                            ) {
                                roleNames.push(localizedRoleNames[i].roleName);
                            }

                            if ($scope.roleData instanceof Array) {
                                for (
                                    var i = 0;
                                    i < $scope.roleData.length;
                                    i++
                                ) {
                                    if (
                                        typeof $scope.roleData[i]
                                            .logicalRoles === "string"
                                    ) {
                                        if (
                                            $scope.roleData[i].logicalRoles ==
                                            "org.pentaho.repository.create"
                                        ) {
                                            $scope.reportCreate = true;
                                        }
                                        if (
                                            $scope.roleData[i].logicalRoles ==
                                            "org.pentaho.platform.dataaccess.datasource.security.manage"
                                        ) {
                                            $scope.manageDataSource = true;
                                        }
                                        if (
                                            $scope.roleData[i].logicalRoles ==
                                            "org.pentaho.security.administerSecurity"
                                        ) {
                                            $scope.adminSecurity = false;
                                        }
                                        if (
                                            $scope.roleData[i].logicalRoles ==
                                            "org.pentaho.scheduler.manage"
                                        ) {
                                            $scope.planContent = false;
                                        }
                                    } else {
                                        if (
                                            $scope.roleData[i].hasOwnProperty(
                                                "logicalRoles"
                                            )
                                        ) {
                                            if (
                                                $scope.roleData[
                                                    i
                                                ].logicalRoles.hasOwnProperty(
                                                    "length"
                                                )
                                            ) {
                                                for (
                                                    var j = 0;
                                                    j <
                                                    $scope.roleData[i]
                                                        .logicalRoles.length;
                                                    j++
                                                ) {
                                                    if (
                                                        $scope.roleData[i]
                                                            .logicalRoles[j] ==
                                                        "org.pentaho.repository.create"
                                                    ) {
                                                        $scope.reportCreate = true;
                                                    }
                                                    if (
                                                        $scope.roleData[i]
                                                            .logicalRoles[j] ==
                                                        "org.pentaho.platform.dataaccess.datasource.security.manage"
                                                    ) {
                                                        $scope.manageDataSource = true;
                                                    }
                                                    if (
                                                        $scope.roleData[i]
                                                            .logicalRoles[j] ==
                                                        "org.pentaho.security.administerSecurity"
                                                    ) {
                                                        $scope.adminSecurity = false;
                                                    }
                                                    if (
                                                        $scope.roleData[i]
                                                            .logicalRoles[j] ==
                                                        "org.pentaho.scheduler.manage"
                                                    ) {
                                                        $scope.planContent = false;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            } else {
                                if (
                                    typeof $scope.roleData.logicalRoles ===
                                    "string"
                                ) {
                                    if (
                                        $scope.roleData.logicalRoles ==
                                        "org.pentaho.repository.create"
                                    ) {
                                        $scope.reportCreate = true;
                                    }
                                    if (
                                        $scope.roleData.logicalRoles ==
                                        "org.pentaho.platform.dataaccess.datasource.security.manage"
                                    ) {
                                        $scope.manageDataSource = true;
                                    }
                                    if (
                                        $scope.roleData.logicalRoles ==
                                        "org.pentaho.security.administerSecurity"
                                    ) {
                                        $scope.adminSecurity = false;
                                    }
                                    if (
                                        $scope.roleData.logicalRoles ==
                                        "org.pentaho.scheduler.manage"
                                    ) {
                                        $scope.planContent = false;
                                    }
                                } else {
                                    for (
                                        var i = 0;
                                        i < $scope.roleData.logicalRoles.length;
                                        i++
                                    ) {
                                        if (
                                            $scope.roleData.logicalRoles[i] ==
                                            "org.pentaho.repository.create"
                                        ) {
                                            $scope.reportCreate = true;
                                        }
                                        if (
                                            $scope.roleData.logicalRoles[i] ==
                                            "org.pentaho.platform.dataaccess.datasource.security.manage"
                                        ) {
                                            $scope.manageDataSource = true;
                                        }
                                        if (
                                            $scope.roleData.logicalRoles[i] ==
                                            "org.pentaho.security.administerSecurity"
                                        ) {
                                            $scope.adminSecurity = false;
                                        }
                                        if (
                                            $scope.roleData.logicalRoles[i] ==
                                            "org.pentaho.scheduler.manage"
                                        ) {
                                            $scope.planContent = false;
                                        }
                                    }
                                }
                            }

                            if (
                                $.inArray(
                                    "org.pentaho.platform.dataaccess.datasource.security.manage",
                                    roleNames
                                ) === -1
                            ) {
                                $scope.manageDataSource = false;
                            }

                            //$scope.$emit("mypower", $scope.manageDataSource);
                            $rootScope.$emit("welcomeMyPower", {
                                reportCreate: $scope.reportCreate,
                                manageDataSource: $scope.manageDataSource,
                                adminSecurity: $scope.adminSecurity,
                                planContent: $scope.planContent
                            });
                        })
                        .error(function(response) {
                            $scope.reportCreate = false;
                            $scope.manageDataSource = false;
                        });
                }

                $scope.showDbs = () => {
                    $scope.$emit("mypower", $scope.manageDataSource);
                };
                $scope.getDataBaseType = () => {
                    $rootScope.$emit("dataBaseType", 1);
                };
                $rootScope.$on('getDataBaseType',function(){
                  $scope.getDataBaseType();
                });
                //postMessage  接收dashboard的新建数据源
               /* $scope._timer = $scope._timer || null;
                window.addEventListener("message", dat => {
                    var data = dat.data;
                    try{
                        data = JSON.parse(data);
                        if(data.sqlAdd){
                            clearTimeout($scope._timer);
                            $scope._timer = setTimeout(function(){
                                document.querySelector(".popup").style.display = "block";
                                document.querySelector(".popup create-connect").classList.remove("popupHide");
                                $scope.getDataBaseType();
                            },300);
                        }
                    }catch(e){
                    }
                }, false);*/
                $scope.getJdbc = () => {
                    $rootScope.$emit("Jdbc", 1);
                    $rootScope.$emit("dataBaseType", 1);
                };
                //获取list内容--数据库列表
                $scope.getList = () => {
                    $rootScope.$emit("listContent", 1);
                };

                //目录点击管理数据源速度太慢，修改成和快速建模一样的逻辑
                $scope.menuQuickModule = ()=>{
                    document.querySelector('.popup').style.display="block";
                    $('.advancedSettingBox').hide();
                    document.querySelector('.popup exist-data').classList.remove('popupHide');
                    $rootScope.$broadcast("dataBaseType");
                    $rootScope.$broadcast("updata",1);
                    $scope.$emit('loading',true);//显示过渡条
                    $rootScope.globalLoading(false); //隐藏过渡条
                }

                /*查看报表等权限*/
                $scope.yhnSaiku = true; //hide
                $scope.yhnWcdf = true;
                $scope.yhnXdp = true;
                $scope.yhnXdf = true;
                $scope.yhnXwaqr = true;
                $scope.yhnPrpt = true;

                $scope.$on("settingsInfo", (d, data) => {
                    var settingLength = data.setting.length,typeToArr = [];
                    // var typeToArr = data.setting.filter(e=>/^plugin-content-type-\d+$/.test(e.name));
                    data.setting.forEach(function(e){
                        /^plugin-content-type-\d+$/.test(e.name) && typeToArr.push(e);
                    });
                    settingLength = typeToArr.length;
                    for (var i = 0; i < settingLength; i++) {
                        if (
                            // typeToArr[i].name.length == 21 &&
                            typeToArr[i].hasOwnProperty("value")
                        ) {
                            if (
                                typeToArr[i].value.split(".")[1] == "saiku"
                            ) {
                                $scope.yhnSaiku = false;
                            } else if (
                                typeToArr[i].value.split(".")[1] == "xdp"
                            ) {
                                $scope.yhnXdp = false;
                            } else if (
                                typeToArr[i].value.split(".")[1] == "wcdf" ||
                                typeToArr[i].value.split(".")[1] == "xdf"
                            ) {
                                $scope.yhnWcdf = false;
                            } else if (
                                typeToArr[i].value.split(".")[1] == "xwaqr"
                            ) {
                                $scope.yhnXwaqr = false;
                            } else if (
                                typeToArr[i].value.split(".")[1] == "prpt"
                            ) {
                                $scope.yhnPrpt = false;
                            } else {
                            }

                            if (typeToArr[i].value.split(".")[1] == "xdf") {
                                $scope.yhnXdf = false;
                            }
                        }
                    }
                    if (
                        $scope.yhnSaiku == true &&
                        $scope.yhnXdf == true &&
                        $scope.yhnXwaqr == true &&
                        $scope.yhnXdp == true
                    ) {
                        $scope.reportCreate = false;
                    }
                });
                $scope.list = $event => {
                    menuFactory.list($event);
                };
                $scope.tableList = $event => {
                    menuFactory.tableList($event);
                };
                function type(obj, tp) {
                    return Object.prototype.toString.call(obj).indexOf(tp) > -1
                        ? !0
                        : !1;
                }
                let fileCache = Object.create(null);
                $scope.fileMenu = $event => {
                    
                    $($event.target).addClass("yhnBlueBG").parent().siblings().children().removeClass("yhnBlueBG");
                    $scope.listLoadingShow = true;
                    var screenHeight = top.innerHeight - 87;
                    document.querySelector("div.tableList").style.height =
                        screenHeight + "px";
                    /*fine*/
                    menuFactory.fileMenuLoc($event);

                    let targetClass = $event.currentTarget.className;
                    let cacheVal = fileCache[targetClass];
                    //  如果缓存中有，即可使用
                    cacheVal && callback(JSON.parse(cacheVal), "ee");
                    //targetClass赋值
                    var selfHtml = targetClass;
                    if (targetClass === "wcdf") {
                        selfHtml += "|*.xdf";
                    } else if (targetClass === "prpt") {
                        selfHtml += "|*.htm|*.html";
                    }
                    let interfaceArr = {
                        recentView: "/user-settings/recent?_=" + +new Date(),
                        collection: "/user-settings/favorites?_=" + +new Date(),
                        default:
                            "/repo/files/tree?showHidden=" +
                            ($rootScope.ifhide ? true : false) +
                            "&filter=*." +
                            selfHtml +
                            "|FILES&_=" +
                            new Date().getTime()
                    };
                    let url = interfaceArr[targetClass]
                        ? interfaceArr[targetClass]
                        : interfaceArr["default"];

                    $http
                        .get(`api${url}`)
                        .success(response => {
                            $scope.listLoadingShow = false;
                            if (!response) {
                                $scope.fileList = [];
                                return "";
                            }
                            if (type(response, "Object")) {
                                if (
                                    !response.children ||
                                    !response.children.length
                                ) {
                                    $scope.fileList = [];
                                    return "";
                                }
                            }
                            if (type(response, "Array")) {
                                if (!response.length) {
                                    $scope.fileList = [];
                                    return "";
                                }
                            }
                            //   判断缓存否
                            let strResponse = JSON.stringify(response);
                            if (cacheVal) {
                                if (cacheVal != strResponse) {
                                    fileCache[targetClass] = strResponse; // 缓存
                                    callback(response);
                                }
                            } else {
                                fileCache[targetClass] = strResponse;
                                callback(response);
                            }
                        })
                        .error(fail => {
                            $scope.listLoadingShow = false;
                        });

                    function callback(asynData, ee) {
                        if (ee) console.log("缓存");
                        let paramFilter = [];
                        if (
                            targetClass == "recentView" ||
                            targetClass == "collection"
                        ) {
                            asynData.map(d => {
                                paramFilter.push({
                                    file: {
                                        path: d.fullPath,
                                        name: d.title ? d.title : "无",
                                        lastModifiedDate: menuFactory.timeFormat(
                                            d.lastUse
                                        )
                                    }
                                });
                            });
                            $scope.wordsSort =
                                targetClass == "collection"
                                    ? menuFactory.wordsSort(paramFilter)
                                    : paramFilter;
                        } else {
                            let menuReports = {};
                            menuReports.children = [];
                            asynData.children.map(a => {
                                menuReports.children.push(a);
                            });
                            $scope.filterFile = menuFactory.filterFile(
                                menuReports,
                                targetClass,
                                paramFilter
                            );
                            $scope.wordsSort = menuFactory.wordsSort(
                                paramFilter
                            );
                        }

                        $scope.fileList = [];
                        let fileListItem = [];
                        for (let m = 0; m < 27; m++) {
                            fileListItem[m] = [];
                        }
                        let dict = [
                            "A",
                            "B",
                            "C",
                            "D",
                            "E",
                            "F",
                            "G",
                            "H",
                            "I",
                            "J",
                            "K",
                            "L",
                            "M",
                            "N",
                            "O",
                            "P",
                            "Q",
                            "R",
                            "S",
                            "T",
                            "U",
                            "V",
                            "W",
                            "X",
                            "Y",
                            "Z",
                            "#"
                        ];
                        for (let n = 0; n < $scope.wordsSort.length; n++) {
                            let strChar = $scope.wordsSort[n]["file"]["name"];
                            let fileChar = pinyin
                                .getFullChars(strChar)
                                .charAt(0)
                                .toUpperCase();
                            let dictLoc;
                            for (let p = 0; p < dict.length; p++) {
                                if (dict[p] == fileChar) {
                                    dictLoc = p;
                                    break;
                                } else {
                                    dictLoc = dict.length - 1;
                                }
                            }
                            fileListItem[dictLoc].push($scope.wordsSort[n]);
                        }
                        if (targetClass != "recentView") {
                            for (let e = 0; e < fileListItem.length; e++) {
                                for (
                                    let h = 0;
                                    h < fileListItem[e].length;
                                    h++
                                ) {
                                    /*TO DO*/
                                    fileListItem[e][
                                        h
                                    ].file.lastModifiedDate = menuFactory.timeFormat(
                                        fileListItem[e][h].file.lastModifiedDate
                                    );
                                }
                                let fileObj = {
                                    key: dict[e],
                                    value: fileListItem[e]
                                };
                                if (fileObj.value.length != 0) {
                                    /*remove list have no item*/
                                    $scope.fileList.push(fileObj);
                                    /*push list that have items*/
                                }
                            }
                        } else {
                            /*所有项目全部存入数组*/
                            var allArray = [];
                            for (var e = 0; e < fileListItem.length; e++) {
                                for (
                                    var h = 0;
                                    h < fileListItem[e].length;
                                    h++
                                ) {
                                    allArray.push(fileListItem[e][h]);
                                }
                            }
                            function replaceSlash(a) {
                                a = a.split("");
                                for (var i = 0; i < a.length; i++) {
                                    if (a[i] == "-") {
                                        a[i] = "/";
                                    }
                                }
                                a = a.join("");
                                return a;
                            }
                            /*所有项目排序*/
                            allArray.sort(function(a, b) {
                                return (
                                    new Date(
                                        replaceSlash(b.file.lastModifiedDate)
                                    ) -
                                    new Date(
                                        replaceSlash(a.file.lastModifiedDate)
                                    )
                                );
                            });
                            /*时间转换*/
                            for (let e = 0; e < allArray.length; e++) {
                                allArray[
                                    e
                                ].file.lastModifiedDate = menuFactory.timeFormat(
                                    allArray[e].file.lastModifiedDate
                                );
                            }
                            /*截取前20项*/
                            if (allArray.length > 20) {
                                allArray = allArray.slice(0, 20);
                            }
                            let fileObj = {
                                key: "",
                                value: allArray
                            };
                            $scope.fileList.push(fileObj);
                        }
                        /*each click scroll back to the top*/
                        document.querySelector(".tableList").scrollTop = 0;
                        /*set the area's opacity as 0*/
                        document.querySelector(".shelter").style.display =
                            "none";
                        /*yhn end*/
                    }
                };
                const tabCreateHandle = tabHandleFactory.handle;
                $scope.reportView = ($event, e) => {
                    $rootScope.$emit("editor", e);

                    let paramData = $event;
                    let pluginName = paramData.split(".");
                    $rootScope.selfWcdf =
                        pluginName[1] === "xdf" ? true : false; //根据是否是仪表盘展示多余操作
                    $rootScope.selfSaiku =
                        pluginName[1] === "saiku" ? true : false; //根据是否是多维分析展示多余操作
                    $rootScope.selfXdp =
                        pluginName[1] === "xdp" ? true : false; //根据是否是数据门户展示多余操作
                    //判断是否是浏览目录所打开的文件
                    $rootScope.isHandleShow = true;
                    //处理tab 创建管理
                    tabCreateHandle({
                        tab: "detailReport",
                        pluginName: pluginName[1],
                        pluginPath: pluginName[0],
                        pathParam: "",
                        name: pluginName[0].split("/").pop(),
                        paramData: paramData
                    });

                    document
                        .querySelector("menu-directive")
                        .classList.add("menu-hide");
                    $(".flexline").removeClass("unfolded").addClass("folded");
                    recentFactory.handleRecentRecord(e);

                    // document
                    //   .querySelector("menu-directive")
                    //   .classList.toggle("menu-hide");
                };
                //为 newolap newadhoc newdashboard新开tab
                $scope.newReportView = type => {
                    if (
                        ["newOlap", "newAdhoc", "newDashboard","newPortal"].includes(type)
                    ) {
                        ++$rootScope.tabindex[type];
                        tabCreateHandle({
                            tab: type,
                            pluginName: $rootScope.tabindex[type],
                            pluginPath: "",
                            pathParam: "",
                            name:
                                {
                                    newOlap: "新建多维分析",
                                    newDashboard: "新建仪表盘",
                                    newAdhoc: "newAdhoc",
                                    newPortal:'新建数据门户'
                                }[type] +
                                "_" +
                                $rootScope.tabindex[type],
                            paramData:
                                {
                                    newOlap: "新建多维分析",
                                    newDashboard: "新建仪表盘",
                                    newAdhoc: "newAdhoc",
                                    newPortal:'新建数据门户'
                                }[type] +
                                "_" +
                                $rootScope.tabindex[type]
                        });
                    }else {
                        tabCreateHandle({
                            tab: type,
                            pluginName: "",
                            pluginPath: "",
                            pathParam: "",
                            name: {
                                taskPlan: "taskPlan",
                                fileManagement: "文件管理",
                                userManager: "用户和角色",
                                dataQueryManagement : "管理数据查询"
                            }[type],
                            paramData: {
                                taskPlan: "taskPlan",
                                fileManagement: "文件管理",
                                userManager: "用户和角色",
                                dataQueryManagement : "管理数据查询"
                            }[type]
                        });
                    }
                };

                $scope.newUserManger = type => {
                    console.log(type);
                    console.log($rootScope);

                }

                // let dataSourceMenu = document.querySelectorAll(
                //     ".menu>.popupMenu>a"
                // );
                // for (let a = 0; a < dataSourceMenu.length; a++) {
                //     dataSourceMenu[a].addEventListener("click", $e => {
                //         $scope.$emit("popupName", $e.currentTarget.className);
                //     });
                // }

                $(".menu>.popupMenu>a").click((e)=>{
                    let className = e.currentTarget.className;
                    //管理数据源单独处理
                    if(className === "existData"){
                        return;
                    }
                    $scope.$emit("popupName", className);
                });

            }
        ]);
}
