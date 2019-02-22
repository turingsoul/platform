/**
 * Created by Administrator on 2016/7/4.
 */
import angular from "angular";
import $ from "jquery";
import "../style/public.css";
import "../style/existData.css";
import { tips, loading, closeLoading } from "../createModule/public.js";
{
    ("use strict");
    const template = require("./existData.html");
    angular
        .module("xdt/existData", [])
        .directive("sourceList", () => {
            return {
                restrict: "E",
                template: template,
                link() {
                    document.body.ondrop = function(event) {
                        if (event && event.preventDefault) {
                            event.preventDefault();
                        } else {
                            window.event.returnValue = false; //注意加window
                        }
                        event.stopPropagation();
                    };
                }
            };
        })
        .factory("listDatabase", [
            "$http",
            "$q",
            function($http, $q) {
                let service = {};
                service.callItunes = url => {
                    let deferred = $q.defer();
                    $http({
                        method: "get",
                        headers: {
                            contentType: "application/json; charset=utf-8"
                        },
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
                };
                //del jdbc
                service.delJdbc = e => {
                    let deferred = $q.defer();
                    $http({
                        method: "delete",
                        headers: { Accept: "application/json" },
                        url:
                            "/xdatainsight/plugin/data-access/api/connection/deletebyname?name=" +
                            e +
                            "",
                        dataType: "json"
                    })
                        .success(data => {
                            //删除成功
                            deferred.resolve(data);
                        })
                        .error(data => {
                            //删除失败
                            deferred.reject(data);
                        });
                    return deferred.promise;
                };
                //del xiangdao
                service.delxd = e => {
                    let deferred = $q.defer();
                    $http({
                        method: "POST",
                        headers: { Accept: "application/json" },
                        url:
                            "/xdatainsight/plugin/data-access/api/datasource/dsw/" +
                            e +
                            "/remove",
                        dataType: "json"
                    })
                        .success(data => {
                            //删除成功
                            deferred.resolve(data);
                        })
                        .error(data => {
                            //删除失败
                            deferred.reject(data);
                        });
                    return deferred.promise;
                };
                //del duowei
                service.deldw = e => {
                    let deferred = $q.defer();
                    $http({
                        method: "POST",
                        headers: { Accept: "application/json" },
                        url:
                            "/xdatainsight/plugin/data-access/api/datasource/analysis/" +
                            e +
                            "/remove",
                        dataType: "json"
                    })
                        .success(data => {
                            //删除成功
                            deferred.resolve(data);
                        })
                        .error(data => {
                            //删除失败
                            deferred.reject(data);
                        });
                    return deferred.promise;
                };
                //del guanxi
                service.delgx = e => {
                    let deferred = $q.defer();
                    $http({
                        method: "POST",
                        headers: { Accept: "application/json" },
                        url:
                            "/xdatainsight/plugin/data-access/api/datasource/metadata/" +
                            e +
                            "/remove",
                        dataType: "json"
                    })
                        .success(data => {
                            //删除成功
                            deferred.resolve(data);
                        })
                        .error(data => {
                            //删除失败
                            deferred.reject(data);
                        });
                    return deferred.promise;
                };
                //export xiangdao
                service.exportXd = e => {
                    let deferred = $q.defer();
                    $http({
                        method: "GET",
                        headers: { Accept: "application/json" },
                        url:
                            "/xdatainsight/plugin/data-access/api/datasource/dsw/" +
                            e +
                            "/download",
                        dataType: "json"
                    })
                        .success(data => {
                            //删除成功
                            deferred.resolve(data);
                        })
                        .error(data => {
                            //删除失败
                            deferred.reject(data);
                        });
                    return deferred.promise;
                };
                //export duowei
                service.exportDw = e => {
                    let deferred = $q.defer();
                    $http({
                        method: "GET",
                        headers: { Accept: "application/json" },
                        url:
                            "/xdatainsight/plugin/data-access/api/datasource/analysis/" +
                            e +
                            "/download",
                        dataType: "json"
                    })
                        .success(data => {
                            deferred.resolve(data);
                        })
                        .error(data => {
                            deferred.reject(data);
                        });
                    return deferred.promise;
                };
                //export guanxi
                service.exportGx = e => {
                    let deferred = $q.defer();
                    $http({
                        method: "GET",
                        headers: { Accept: "application/json" },
                        url:
                            "/xdatainsight/plugin/data-access/api/datasource/metadata/" +
                            e +
                            "/download",
                        dataType: "json"
                    })
                        .success(data => {
                            deferred.resolve(data);
                        })
                        .error(data => {
                            deferred.reject(data);
                        });
                    return deferred.promise;
                };
                //获取数据源信息
                service.getDwInfo = e => {
                    let deferred = $q.defer();
                    $http({
                        method: "GET",
                        headers: { Accept: "text/plain" },
                        url:
                            "/xdatainsight/plugin/data-access/api/datasource/" +
                            e +
                            "/getAnalysisDatasourceInfo"
                    })
                        .success(data => {
                            //获取返回的数据库类型
                            deferred.resolve(data);
                        })
                        .error(data => {
                            deferred.reject(data);
                        });
                    return deferred.promise;
                };

                service.getDbInfo = e => {
                    let deferred = $q.defer();
                    $http({
                        method: "GET",
                        headers: { Accept: "application/json" },
                        url:
                            "/xdatainsight/plugin/data-access/api/connection/get?name=" +
                            e +
                            "&ts=1478507282646" +
                            "?t=" +
                            Date.parse(new Date()),
                        dataType: "json"
                    })
                        .success(data => {
                            //获取返回的数据库类型
                            deferred.resolve(data);
                        })
                        .error(data => {
                            deferred.reject(data);
                        });
                    return deferred.promise;
                };
                service.saveData = (data, e, m) => {
                    let deferred = $q.defer();
                    $http({
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        url:
                            "/xdatainsight/plugin/data-access/api/datasource/modeler/saveDomain?dswId=" +
                            encodeURI(e) +
                            "",
                        //dataType: 'json',
                        data: data
                    })
                        .success(data => {
                            deferred.resolve(data);
                        })
                        .error(data => {
                            deferred.reject(data);
                        });
                    return deferred.promise;
                };
                return service;
            }
        ])
        .controller("sourceController", [
            "$rootScope",
            "$scope",
            "$http",
            "listDatabase",
            ($rootScope, $scope, $http, listDatabase) => {
                $scope.loading = (statu) => {
                    $("#datasourceLoading")[statu?"show":"hide"]();
                };

                $scope.loading(false);

                $scope.close = () => {
                    $(".popup exist-data").addClass("popupHide");
                    $(".popup").hide();
                };
                // 给选中行列添加类标记
                $scope.selectThis = (
                    $event,
                    name,
                    type,
                    hostname,
                    databaseName,
                    databasePort,
                    username,
                    password,
                    shortname
                ) => {
                    $scope.name = name;
                    $scope.type = type;
                    $scope.hostname = hostname;
                    $scope.databaseName = databaseName;
                    $scope.databasePort = databasePort;
                    $scope.username = username;
                    $scope.password = password;
                    $scope.shortname = shortname;
                    $(".table-main tr").removeClass("active");
                    $($event.target)
                        .parent()
                        .addClass("active");
                };

                //弹出
                $scope.alert = () => {
                    if ($scope.name) {
                        $(".alert-del").removeClass("hide");
                    }
                };
                $scope.closeAlert = () => {
                    $(".source-list .alert-del").addClass("hide");
                };
                $scope.closeAlert1 = () => {
                    angular.element(
                            document.querySelectorAll(
                                ".source-list input[type = 'radio']"
                            )[0]
                        )
                        .attr("checked", true);
                    $(".source-list .hide-box").addClass("hide");
                    $(".source-list .fengebox").removeClass("hide");
                    $(".source-list").css({
                        background: "#fff",
                        border: "1px solid #ccc",
                        // "box-shadow": "1px 1px 3px #ccc"
                    });
                    $(".popup exist-data").addClass("popupHide");
                    $(".popup").hide();
                };
                //删除
                $scope.del = () => {
                    if ($scope.type == "JDBC") {
                        $scope.loading(true);
                        $(".alert-del").addClass("hide");
                        listDatabase.delJdbc($scope.name).then(
                            data => {
                                $scope.name = "";
                                tips("删除成功！");
                                jdbc().then(()=>{
                                    $scope.loading(false);
                                },()=>{
                                    $scope.loading(false);
                                });
                            },
                            data => {
                                tips("删除失败！");
                                $scope.loading(false);
                            }
                        );
                    }
                    if ($scope.type == "XiangDao") {
                        $scope.loading(true);
                        $(".alert-del").addClass("hide");
                        listDatabase.delxd($scope.name).then(
                            data => {
                                $scope.name = "";
                                tips("删除成功！");
                                xiangdao().then(()=>{
                                    $scope.loading(false);
                                },()=>{
                                    $scope.loading(false);
                                });
                            },
                            data => {
                                tips("删除失败！");
                                $scope.loading(false);
                            }
                        );
                    }
                    if ($scope.type == "DuoWei") {
                        $scope.loading(true);
                        $(".alert-del").addClass("hide");
                        listDatabase.deldw($scope.name).then(
                            data => {
                                $scope.name = "";
                                tips("删除成功！");
                                duowei().then(()=>{
                                    $scope.loading(false);
                                },()=>{
                                    $scope.loading(false);
                                });
                            },
                            data => {
                                tips("删除失败！");
                                $scope.loading(false);
                            }
                        );
                    }
                    if ($scope.type == "GuanXi") {
                        $scope.loading(true);
                        $(".alert-del").addClass("hide");
                        listDatabase.delgx($scope.name).then(
                            data => {
                                $scope.name = "";
                                tips("删除成功！");
                                guanxi().then(()=>{
                                    $scope.loading(false);
                                },()=>{
                                    $scope.loading(false);
                                });
                            },
                            data => {
                                tips("删除失败！");
                                $scope.loading(false);
                            }
                        );
                    }
                };
                //导出
                $scope.export = () => {
                    if ($scope.type == "JDBC") {
                        tips("无法导出JDBC数据源");
                    }
                    if ($scope.type == "XiangDao") {
                        listDatabase.exportXd($scope.name).then(
                            data => {
                                window.open(
                                    "/xdatainsight/plugin/data-access/api/datasource/dsw/" +
                                        $scope.name +
                                        "/download"
                                );
                            },
                            data => {}
                        );
                    }
                    if ($scope.type == "DuoWei") {
                        listDatabase.exportDw($scope.name).then(
                            data => {
                                window.open(
                                    "/xdatainsight/plugin/data-access/api/datasource/analysis/" +
                                        $scope.name +
                                        "/download"
                                );
                            },
                            data => {}
                        );
                    }
                    if ($scope.type == "GuanXi") {
                        listDatabase.exportGx($scope.name).then(
                            data => {
                                window.open(
                                    "/xdatainsight/plugin/data-access/api/datasource/metadata/" +
                                        $scope.name +
                                        "/download"
                                );
                            },
                            data => {}
                        );
                    }
                };
                //编辑
                $rootScope.$on("_sqlEdit", function(d, sqlName) {
                    $scope.edit({ sqlName: sqlName });
                });
                //编辑
                $scope.edit = _data => {
                    if ($scope.type == "JDBC" || (_data && _data.sqlName)) {
                        listDatabase
                            .getDbInfo(encodeURI((_data && _data.sqlName) || $scope.name))
                            .then(
                                data => {
                                    $("create-connect").removeClass(
                                        "popupHide"
                                    );
                                    $(".connectData .title-name").html(
                                        "编辑数据源连接"
                                    );
                                    $rootScope.$broadcast("names", data);
                                    $rootScope.$emit("names", data);
                                    $rootScope.globalLoading(false);
                                },
                                data => {}
                            );
                    }
                    if ($scope.type == "XiangDao") {
                        // $(".mainItemBody-tab")
                        //     .removeClass("active")
                        //     .eq(0)
                        //     .addClass("active");
                        $(".agileBox").removeClass("hide");
                        $(".alert-del").addClass("hide");
                        loading();
                        listDatabase.callItunes(
                                "/xdatainsight/plugin/data-access/api/datasource/modeler/loadDomain?dswId=" +
                                    encodeURI($scope.name) +
                                    "&_=" +
                                    +new Date()
                            )
                            .then(
                                data => {
                                    $rootScope.$emit("editContent", data);
                                    listDatabase
                                        .callItunes(
                                            "/xdatainsight/plugin/data-access/api/datasource/modeler/loadTables?dswId=" +
                                                encodeURI($scope.name) +
                                                "&_=" +
                                                +new Date()
                                        )
                                        .then(
                                            data => {
                                                $(".mainItemBody-tab").click();
                                                $rootScope.$emit(
                                                    "editContent1",
                                                    data
                                                );
                                            },
                                            data => {
                                                closeLoading();
                                                $(".agileBox").removeClass(
                                                    "hide"
                                                );
                                            }
                                        );
                                },
                                data => {
                                    closeLoading();
                                }
                            );
                        $rootScope.$emit("liName", $scope.name);
                    }
                    if ($scope.type == "GuanXi") {
                        tips(
                            "该模型由开发工具创建，只能通过相应工具更改，无法在web端编辑！"
                        );
                    }
                    if ($scope.type == "DuoWei") {
                        document.querySelector('.source-list').style.display = 'none';
                        // document.querySelector('.importModel').style.display = 'block';
                        listDatabase.getDwInfo(encodeURI($scope.name)).then(
                            data => {
                                $("import-data").removeClass("popupHide");
                                $("importModel").removeClass("hide");
                                $(".importModel .title-name").html(
                                    "编辑数据集"
                                );
                                var dataSource = data.split(";");
                                for (var i = 0; i < dataSource.length; i++) {
                                    if (
                                        dataSource[i].split("=")[0] ===
                                        "DataSource"
                                    ) {
                                        dataSource = dataSource[i].split(
                                            "="
                                        )[1];
                                        break;
                                    }
                                }

                                var data = [$scope.name, dataSource, true];
                                $(".importModel .file-path2").html(data[0]);
                                $(".importModel .catalogName").val(data[0]);
                                $rootScope.$emit("editUpdate", data);
                            },
                            data => {}
                        );
                    }
                };
                $scope.$on("editXdUp", function(event, data) {});
                $rootScope.$on("xhdata", function(event, data) {
                    listDatabase
                        .callItunes(
                            "/xdatainsight/plugin/data-access/api/datasource/modeler/autoPopulate?dswId=" +
                                $scope.name +
                                ""
                        )
                        .then(
                            data => {
                                $rootScope.$emit("editContent", data);
                            },
                            data => {}
                        );
                });
                $scope.successNum = 0;
                
                $rootScope.$on("updataUpdate", function(event, data) {
                    $scope.loading(true);
                    $scope.successNum = 0;
                    $scope.searchName = data;

                    $scope.$watch('successNum',(n,o)=>{
                        if(n===4 && n!==o){
                            $scope.loading(false);
                            $scope.$emit("showExistData", 1);
                        }
                    });
                    duowei();
                    xiangdao();
                    guanxi();
                    jdbc();
                });
                $rootScope.$on("updataUpdate1", function(event, data) {
                    if (data.editable) {
                        $(".popup").show();
                        $("exist-data").removeClass("popupHide");
                        $(".source-list .hide-box").removeClass("hide");
                        $(".source-list .fengebox").addClass("hide");
                        $(".source-list").css({
                            background: "transparent",
                            border: "none",
                            boxShadow: "none"
                        });
                    }
                });
                $scope.save = () => {
                    $(".source-list .fengebox").removeClass("hide");
                    $(".source-list").css({
                        background: "#fff",
                        border: "1px solid #ccc",
                        // "box-shadow": "1px 1px 3px #ccc"
                    });
                    $(".source-list .hide-box").addClass("hide");

                    if ($( ".source-list .hide-box input[type=radio]:checked").val() == 1) {
                        $(".agileBox").removeClass("hide");
                        listDatabase
                            .callItunes( "/xdatainsight/plugin/data-access/api/datasource/modeler/loadDomain?dswId=" + encodeURI($scope.searchName) + ".xmi" )
                            .then(
                                data => {
                                    $rootScope.$emit("editContent", data);
                                    listDatabase
                                        .callItunes( "/xdatainsight/plugin/data-access/api/datasource/modeler/loadTables?dswId=" + encodeURI($scope.searchName) + ".xmi" )
                                        .then(
                                            data => {
                                                $rootScope.$emit(
                                                    "editContent1",
                                                    data
                                                );
                                            },
                                            data => {}
                                        );
                                },
                                data => {}
                            );
                    } else {
                        $scope.close();
                    }
                };
                $scope.$on("mypowerUpdata", (d, data) => {
                    if (data) {
                        duowei();
                        xiangdao();
                        guanxi();
                        jdbc();
                    }
                });

                //多维
                function duowei() {
                    $scope.duowei = [];
                    return listDatabase
                        .callItunes("/xdatainsight/plugin/data-access/api/datasource/analysis/ids?t=" +Date.parse(new Date()))
                        .then(
                            data => {
                                data.Item = data.Item.sort(function(a,b){
                                    return a.localeCompare(b);
                                });
                                let specialArr = [],
                                    numArr = [],
                                    letterArr = [],
                                    chinaArr = [];
                                numArr = data.Item.filter(e => /\d/.test(e.slice(0, 1)));
                                letterArr = data.Item.filter(e =>
                                    /[a-zA-Z]/.test(e.slice(0, 1))
                                );
                                chinaArr = data.Item.filter(e => e.charCodeAt() >= 20000);
                                specialArr = data.Item.filter(
                                    e =>
                                        !/\d|[a-zA-Z]/.test(e.slice(0, 1)) &&
                                        e.charCodeAt() < 20000
                                );
                                data.Item = [...specialArr, ...numArr, ...letterArr, ...chinaArr];
                                $scope.duowei = data;
                                $scope.successNum += 1;
                            },
                            data => {
                                $scope.successNum += 1;
                            }
                        );
                }
                //向导
                function xiangdao() {
                    $scope.xiangdao = [];
                    return listDatabase
                        .callItunes("/xdatainsight/plugin/data-access/api/datasource/dsw/ids?t=" +Date.parse(new Date()))
                        .then(
                            data => {
                                data.Item = data.Item.sort(function(a,b){
                                    return a.localeCompare(b);
                                });
                                let specialArr = [],
                                    numArr = [],
                                    letterArr = [],
                                    chinaArr = [];
                                numArr = data.Item.filter(e => /\d/.test(e.slice(0, 1)));
                                letterArr = data.Item.filter(e =>
                                    /[a-zA-Z]/.test(e.slice(0, 1))
                                );
                                chinaArr = data.Item.filter(e => e.charCodeAt() >= 20000);
                                specialArr = data.Item.filter(
                                    e =>
                                        !/\d|[a-zA-Z]/.test(e.slice(0, 1)) &&
                                        e.charCodeAt() < 20000
                                );
                                data.Item = [...specialArr, ...numArr, ...letterArr, ...chinaArr];
                                $scope.xiangdao = data;
                                $scope.successNum += 1;
                            },
                            data => {
                                $scope.successNum += 1;
                            }
                        );
                }
                //关系
                function guanxi() {
                    $scope.guanxi = [];
                    return listDatabase
                        .callItunes("/xdatainsight/plugin/data-access/api/datasource/metadata/ids?t=" +Date.parse(new Date()))
                        .then(
                            data => {
                                data.Item = data.Item.sort(function(a,b){
                                    return a.localeCompare(b);
                                });
                                let specialArr = [],
                                    numArr = [],
                                    letterArr = [],
                                    chinaArr = [];
                                numArr = data.Item.filter(e => /\d/.test(e.slice(0, 1)));
                                letterArr = data.Item.filter(e =>
                                    /[a-zA-Z]/.test(e.slice(0, 1))
                                );
                                chinaArr = data.Item.filter(e => e.charCodeAt() >= 20000);
                                specialArr = data.Item.filter(
                                    e =>
                                        !/\d|[a-zA-Z]/.test(e.slice(0, 1)) &&
                                        e.charCodeAt() < 20000
                                );
                                data.Item = [...specialArr, ...numArr, ...letterArr, ...chinaArr];
                                $scope.guanxi = data;
                                $scope.successNum += 1;
                            },
                            data => {
                                $scope.successNum += 1;
                            }
                        );
                }
                //JDBC
                function jdbc() {
                    $scope.jdbc = [];
                    return listDatabase
                        .callItunes("/xdatainsight/plugin/data-access/api/connection/list?t=" +Date.parse(new Date()))
                        .then(
                            data => {
                                data.databaseConnections = data.databaseConnections.sort(function(a,b){
                                    return a.name.localeCompare(b.name);
                                });
                                let specialArr = [],
                                    numArr = [],
                                    letterArr = [],
                                    chinaArr = [];
                                numArr = data.databaseConnections.filter(e => /\d/.test(e.name.slice(0, 1)));
                                letterArr = data.databaseConnections.filter(e =>
                                    /[a-zA-Z]/.test(e.name.slice(0, 1))
                                );
                                chinaArr = data.databaseConnections.filter(e => e.name.charCodeAt() >= 20000);
                                specialArr = data.databaseConnections.filter(
                                    e =>
                                        !/\d|[a-zA-Z]/.test(e.name.slice(0, 1)) &&
                                        e.name.charCodeAt() < 20000
                                );
                                data.databaseConnections = [...specialArr, ...numArr, ...letterArr, ...chinaArr];
                                $scope.jdbc = data;
                                $scope.successNum += 1;
                            },
                            data => {
                                $scope.successNum += 1;
                            }
                        );
                }
            }
        ])
        .controller("agileController", [
            "$rootScope",
            "$scope",
            "$http",
            "listDatabase",
            ($rootScope, $scope, $http, listDatabase) => {
                //切换标签
                $scope.switchTab = type => {
                    $(".mainItemBody-tab")
                        .removeClass("active")
                        .eq(type)
                        .addClass("active");
                    $("#mainItemBody" + type)
                        .show()
                        .siblings()
                        .hide();

                    if (type === 1) {
                        //暂不实现该功能，当右侧为业务数据集时，移除该自动填充按钮
                        $(".agileBoxMain .agileEdit").hide();
                    } else {
                        $(".agileBoxMain .agileEdit").show();
                    }
                };

                // $scope.geshihua = [
                //     "NONE",
                //     "#.#",
                //     // "#",
                //     "#,##0.###",
                //     "###,###,###.#",
                //     "#,###",
                //     "$ #,###;($ #,###)",
                //     "#,###.00;(#,###.00)",
                //     "#,###;(#,###)"
                // ];

                $scope.geshihua = [
                    "NONE",
                    "#,###;(#,###)",
                    "#,###.00;(#,###.00)",
                    "$ #,###;($ #,###)",
                    "$ #,###.00;($ #,###.00)",
                    "#,#%;(#,#%)"
                ];
                $scope.drag = false;
                $scope.key = false;
                $scope.factTable = [];

                var eventor = null;
                //错误信息
                var errorArray = {
                    errorType0: "名称不能为空",
                    errorType1: "重复的",
                    errorType2: "缺失来源列",
                    errorType3: "维度至少需要一个层级",
                    errorType4: "层级至少需要一个级别",
                    errorType5: "分析模型至少需要一个维度",
                    errorType6: "分析模型至少需要一个度量值",
                    errorType7: "业务模型至少需要一个分组",
                    errorType8: "分组至少需要一个字段",
                    errsub: "儿子错误"
                };
                //错误信息列表
                $scope.errlist = [];
                function Tree(data, el, num) {
                    //负责新建元素到制定dom上（外层的容器）
                    this.app = function(ele, tag, className) {
                        var div = document.createElement(tag);
                        div.className = className;
                        ele.appendChild(div);
                        return div;
                    };
                    this.num = num;

                    this.create(document.getElementById(el), data, this.num);
                }
                Tree.fn = Tree.prototype = {
                    create: function(par, group, num) {
                        var host = this,
                            length = group.length;
                        for (var i = 0; i < length; i++) {
                            if (!group[i].name){
                                group[i].name = group[i].propertyDetail.localeStringMap.en_US;
                            }
                            var errorIcon = "";
                            var icon;
                            if (!group[i].error) {
                                group[i].error = {
                                    errorType0: false,
                                    errorType1: false,
                                    errorType2: false,
                                    errsub: false
                                };
                            }
                            for (var k in errorArray) {
                                if (group[i].error[k]) {
                                    errorIcon = " error ";
                                }
                            }
                            var dl = this.app(par, "DL", "parent"),
                                dt = this.app(dl, "DT", "close " + errorIcon),
                                dd = this.app(dl, "DD", "dd");
                            var tag =
                                group[i].children ||
                                (group[i].olapDimension &&
                                    group[i].olapDimension.hierarchies) ||
                                group[i].hierarchyLevels ||
                                group[i].propertyList;
                            var icon1 = this.app(dt, "i", "parentArrow");
                            var errorlogo = this.app(dt, "i", "errorlogo");
                            icon1.ondrop = function(event) {
                                if (event && event.preventDefault) {
                                    event.preventDefault();
                                } else {
                                    window.event.returnValue = false; //注意加window
                                }
                            };
                            if (tag && tag.length > 0) {
                                icon1.style.display = "block";
                            } else {
                                icon1.style.display = "none";
                            }
                            if (group[i].logicalColumn) {
                                icon = this.app(
                                    dt,
                                    "i",
                                    "parentIcon parentIconM"
                                );
                            } else {
                                icon = this.app(
                                    dt,
                                    "i",
                                    "parentIcon parentIcon" + num
                                );
                            }
                            icon.ondrop = function(event) {
                                if (event && event.preventDefault) {
                                    event.preventDefault();
                                } else {
                                    window.event.returnValue = false; //注意加window
                                }
                            };
                            var parentSpan = this.app(
                                dt,
                                "span",
                                "parentTitle"
                            );
                            parentSpan.ondrop = function(event) {
                                if (event && event.preventDefault) {
                                    event.preventDefault();
                                } else {
                                    window.event.returnValue = false; //注意加window
                                }
                            };
                            if (tag) {
                                var icon2 = this.app(dt, "i", "addItem");

                                icon2.i = i;
                                icon2.onclick = function(event) {
                                    $rootScope.yhnParentData = group[this.i];
                                    if (group[this.i].name === "度量值") {
                                        $scope.fullData =
                                            group[this.i].children;
                                        $scope.type = 4;
                                        $scope.titleDes = "添加度量值";
                                        $scope.contentDes = "输入度量值名称";
                                        $scope.singleHeight = 276;
                                    } else {
                                        if (group[this.i].children) {
                                            $scope.fullData =
                                                group[this.i].children;
                                            $scope.type = 3;
                                            $scope.titleDes = "添加维度";
                                            $scope.singleHeight = 276;
                                            $scope.contentDes = "输入维度名称";
                                        } else if (
                                            group[this.i].olapDimension &&
                                            group[this.i].olapDimension
                                                .hierarchies
                                        ) {
                                            $scope.fullData =
                                                group[
                                                    this.i
                                                ].olapDimension.hierarchies;
                                            $scope.type = 2;
                                            $scope.titleDes = "添加层级";
                                            $scope.singleHeight = 276;
                                            $scope.contentDes = "输入层级名称";
                                        } else if (
                                            group[this.i].hierarchyLevels
                                        ) {
                                            $scope.fullData =
                                                group[this.i].hierarchyLevels;
                                            $scope.type = 1;
                                            $scope.titleDes = "添加级别";
                                            $scope.singleHeight = 276;
                                            $scope.contentDes = "输入级别名称";
                                        } else if (group[this.i].propertyList) {
                                            $scope.fullData =
                                                group[this.i].propertyList;
                                            $scope.type = 5;
                                            $scope.titleDes = "添加成员属性";
                                            $scope.singleHeight = 276;
                                            $scope.contentDes =
                                                "输入成员属性名称";
                                        }
                                    }

                                    if (
                                        !$scope.$$phase &&
                                        !$scope.$root.$$phase
                                    ) {
                                        $scope.$apply();
                                    }
                                    eventor = event;
                                    $scope.test = group[this.i];
                                    $(".agileBox .newBuildBox").removeClass(
                                        "hide"
                                    );
                                    event.stopPropagation();
                                };
                            }

                            parentSpan.innerHTML =
                                group[i].name ||
                                (group[i].propertyDetail &&
                                    group[i].propertyDetail.localeStringMap
                                        .en_US) ||
                                "";
                            dt.group = tag;
                            dt.data = group[i];
                            dt.parentData = group;
                            dt.i = i;
                            dt.className += "node-close";
                            dt.onclick = function(event) {
                                event.preventDefault();
                                eventor = event;
                                if (event.isTrusted) {
                                    $scope.drag = false;
                                }
                                $(".hover").removeClass("hover");
                                var hover = " hover";
                                var error;
                                if (
                                    event.target.className.indexOf("error") >
                                        0 ||
                                    event.target.parentNode.className.indexOf(
                                        "error"
                                    ) > 0
                                ) {
                                    error = " error";
                                } else {
                                    error = "";
                                }
                                $(this).addClass(hover);
                                $scope.property(
                                    this.data,
                                    this.parentData,
                                    event
                                );
                                if (!this.group) {
                                    return;
                                }
                                $(".myFileTree .open").removeClass("open");
                                var dd = this.nextSibling;
                                if (!dd.hasChildNodes()) {
                                    this.num = num;
                                    this.num++;
                                    host.create(dd, this.group, this.num);
                                    if (this.group.length > 0) {
                                        let hasError = childrenHasError(
                                            this.group
                                        );
                                        if (hasError) {
                                            error = " error";
                                        }
                                        // if (!hasError) {
                                        //     error = "";
                                        // } else {
                                        //     error = " error";
                                        // }
                                    }
                                    this.className =
                                        "node-open open" + hover + error;
                                    dd.style.display = "block";
                                } else {
                                    var set =
                                        dd.style.display == "none"
                                            ? ["", "node-open open"]
                                            : ["none", "node-close close"];
                                    dd.style.display = set[0];
                                    this.className = set[1] + error + hover;
                                    if (dd.style.display == "none") {
                                        dd.innerHTML = "";
                                    }
                                }
                            };
                            dt.ondragend = function(event) {
                                if (!$scope.key) {
                                    return;
                                }
                                event.target.parentNode.outerHTML = "";
                                for (
                                    var i = 0, len = this.parentData.length;
                                    i < len;
                                    i++
                                ) {
                                    if (
                                        this.parentData[i].name ==
                                        event.target.innerText
                                    ) {
                                        this.parentData.splice(i, 1);
                                        break;
                                    }
                                }
                            };
                            dt.ondragover = function(event) {
                                $(".add").removeClass("add");
                                $(this).addClass("add");
                                if (event && event.preventDefault) {
                                    event.preventDefault();
                                } else {
                                    window.event.returnValue = false; //注意加window
                                }
                            };
                            dt.ondragleave = function() {
                                $(this).removeClass("add");
                                if (event && event.preventDefault) {
                                    event.preventDefault();
                                } else {
                                    window.event.returnValue = false; //注意加window
                                }
                            };
                            dt.ondrop = function(event) {
                                $scope.getFactTable();
                                $(this).removeClass("add");
                                if (event && event.preventDefault) {
                                    event.preventDefault();

                                    var data =
                                        /*event.dataTransfer.getData("Text")*/ window.dataSourceText;
                                    var level =
                                        /*event.dataTransfer.getData("level")*/ window.dataSourceLevel;
                                    // var dragData = event.dataTransfer.getData("dragData");
                                } else {
                                    window.event.returnValue = false; //注意加window
                                    var data =
                                        /*event.dataTransfer.getData("Text")*/ window.dataSourceText;
                                    var level =
                                        /*event.dataTransfer.getData("level")*/ window.dataSourceLevel;
                                    // var dragData = event.dataTransfer.getData("dragData");
                                }
                                if (data && data.length > 0)
                                    var datas = JSON.parse(data);

                                var test;
                                if (group[this.i].children) {
                                    if ($(this)[0].innerText != "度量值") {
                                        if (data && data.length > 0) {
                                            test = {
                                                error: {},
                                                name: datas.name,
                                                olapDimension: {
                                                    hierarchies: [
                                                        {
                                                            havingAll: true,
                                                            hierarchyLevels: [
                                                                {
                                                                    annotations: [],
                                                                    havingUniqueMembers: false,
                                                                    levelType: null,
                                                                    name:
                                                                        datas.name,
                                                                    referenceColumn:
                                                                        datas.name,
                                                                    referenceOrdinalColumn:
                                                                        "",
                                                                    propertyList: [],
                                                                    sourceTable:
                                                                        datas.sourceTable,
                                                                    error: {}
                                                                }
                                                            ],
                                                            name: datas.name,
                                                            sourceTable:
                                                                datas.sourceTable,
                                                            error: {}
                                                        }
                                                    ],
                                                    sourceName: datas.name,
                                                    timeDimension: false,
                                                    type: "StandardDimension"
                                                }
                                            };
                                        } else if (level.length > 0) {
                                            test = JSON.parse(level);
                                        }
                                        group[this.i].children.push(test);
                                    } else {
                                        if (data && data.length > 0) {
                                            if (
                                                $scope.factTable.indexOf(
                                                    datas.sourceTable
                                                ) != 0
                                            ) {
                                                warnning("必须来自事实表");
                                                return;
                                            }
                                            test = {
                                                name: datas.name,
                                                logicalColumn: {
                                                    aggregationType:
                                                        datas.dataType ==
                                                        "NUMERIC"
                                                            ? "SUM"
                                                            : "",
                                                    formatString: "NONE",
                                                    column: datas.name,
                                                    type: datas.dataType
                                                },
                                                error: {}
                                            };
                                            group[this.i].children.push(test);
                                        } else if (level.length > 0) {
                                            var levelData = JSON.parse(level);
                                            if (
                                                $scope.factTable.indexOf(
                                                    levelData.name
                                                ) == -1
                                            ) {
                                                warnning("必须是事实表");
                                                return;
                                            }
                                            var datalist =
                                                levelData.olapDimension
                                                    .hierarchies[0]
                                                    .hierarchyLevels;
                                            for (
                                                var n = 0,
                                                    len = datalist.length;
                                                n < len;
                                                n++
                                            ) {
                                                test = {
                                                    name: datalist[n].name,
                                                    logicalColumn: {
                                                        aggregationType:
                                                            datalist[n]
                                                                .levelType ==
                                                            "NUMERIC"
                                                                ? "SUM"
                                                                : "",
                                                        formatString: "NONE",
                                                        column:
                                                            datalist[n].name,
                                                        type:
                                                            datalist[n]
                                                                .levelType
                                                    },
                                                    error: {}
                                                };
                                                group[this.i].children.push(
                                                    test
                                                );
                                            }
                                            //setTimeout(function(){
                                            //    oc(event,test);
                                            //error(event);
                                            //},200);
                                            //return;
                                        }
                                    }
                                } else if (
                                    group[this.i].olapDimension &&
                                    group[this.i].olapDimension.hierarchies
                                ) {
                                    if (data && data.length > 0) {
                                        test = {
                                            havingAll: true,
                                            hierarchyLevels: [
                                                {
                                                    annotations: [],
                                                    havingUniqueMembers: false,
                                                    levelType: null,
                                                    name: datas.name,
                                                    referenceColumn: datas.name,
                                                    referenceOrdinalColumn: "",
                                                    propertyList: [],
                                                    sourceTable:
                                                        datas.sourceTable,
                                                    error: {}
                                                }
                                            ],
                                            name: datas.name,
                                            sourceTable: datas.sourceTable,
                                            error: {}
                                        };
                                    } else {
                                        warnning("这不是一个有效操作！");
                                        return;
                                    }
                                    group[
                                        this.i
                                    ].olapDimension.hierarchies.push(test);
                                } else if (group[this.i].hierarchyLevels) {
                                    if (data && data.length > 0) {
                                        if (
                                            group[this.i].sourceTable.length >
                                                0 &&
                                            group[this.i].sourceTable !==
                                                datas.sourceTable
                                        ) {
                                            warnning(
                                                "层级中的所有级别必须来自同一张表！"
                                            );
                                            return;
                                        }
                                        test = {
                                            annotations: [],
                                            havingUniqueMembers: false,
                                            levelType: null,
                                            name: datas.name,
                                            referenceColumn: datas.name,
                                            referenceOrdinalColumn: "",
                                            propertyList: [],
                                            sourceTable: datas.sourceTable,
                                            error: {}
                                        };
                                    } else {
                                        warnning("这不是一个有效操作！");
                                        return;
                                    }
                                    group[this.i].hierarchyLevels.push(test);
                                } else if (group[this.i].propertyList) {
                                    //var arr1 =[];
                                    //var arr = $scope.getAreaTable(group[this.i].sourceTable);
                                    //for (var i = 0 ,len = arr.length; i < len; i++){
                                    //    arr1.push(arr[i].name);
                                    //}
                                    if (data && data.length > 0) {
                                        if (
                                            group[this.i].sourceTable !==
                                            datas.sourceTable
                                        ) {
                                            warnning(
                                                "层级中的所有级别必须来自同一张表！"
                                            );
                                            return;
                                        }
                                        test = {
                                            propertyDescribe: {
                                                localeStringMap: { en_US: "" },
                                                locales: ["en_US"]
                                            },
                                            propertyDetail: {
                                                localeStringMap: {
                                                    en_US: datas.name
                                                },
                                                locales: ["en_US"]
                                            },
                                            propertySource: datas.name,
                                            error: {},
                                            name: datas.name
                                        };
                                    } else {
                                        warnning("这不是一个有效操作！");
                                        return;
                                    }
                                    group[this.i].propertyList.push(test);
                                } else if (
                                    group[this.i].propertyDescribe ||
                                    group[this.i].logicalColumn
                                ) {
                                    warnning("这不是一个有效的操作！");
                                    return;
                                }
                                $scope.group = group[this.i];
                                var eventor;
                                if (
                                    event.target.className.indexOf("node") >= 0
                                ) {
                                    eventor = event.target;
                                } else {
                                    eventor = event.target.parentNode;
                                }
                                setTimeout(function() {
                                    oc(event, test);
                                    error(event);
                                    if ($scope.group.children) {
                                        eventor.data.error.errorType5 = false;
                                        eventor.data.error.errorType6 = false;
                                        firstParent(eventor);
                                    }
                                    if ($scope.group.olapDimension) {
                                        eventor.data.error.errorType3 = false;
                                        firstParent(eventor);
                                        firstParent(
                                            eventor.parentNode.parentNode
                                                .previousSibling
                                        );
                                    }
                                    if ($scope.group.hierarchyLevels) {
                                        eventor.data.error.errorType4 = false;
                                        firstParent(eventor);
                                        firstParent(
                                            eventor.parentNode.parentNode
                                                .previousSibling
                                        );
                                        firstParent(
                                            eventor.parentNode.parentNode
                                                .parentNode.parentNode
                                                .previousSibling
                                        );
                                    }
                                    if ($scope.group.propertyList) {
                                        firstParent(eventor);
                                        firstParent(
                                            eventor.parentNode.parentNode
                                                .previousSibling
                                        );
                                        firstParent(
                                            eventor.parentNode.parentNode
                                                .parentNode.parentNode
                                                .previousSibling
                                        );
                                        firstParent(
                                            eventor.parentNode.parentNode
                                                .parentNode.parentNode
                                                .parentNode.parentNode
                                                .previousSibling
                                        );
                                    }
                                    eventor.childNodes[0].style.display =
                                        "block";
                                    $scope.init();
                                    if (
                                        !$scope.$$phase &&
                                        !$scope.$root.$$phase
                                    ) {
                                        $scope.$apply();
                                    }
                                }, 200);
                            };
                        }
                    }
                };
                function Tree1(data, el) {
                    this.app = function(ele, tag, className) {
                        var div = document.createElement(tag);
                        div.className = className;
                        ele.appendChild(div);
                        return div;
                    };
                    this.create(document.getElementById(el), data);
                }
                Tree1.fn = Tree1.prototype = {
                    create: function(par, group) {
                        var host = this,
                            length = group.length;
                        for (var i = 0; i < length; i++) {
                            var div = this.app(par, "div", "mainItemBody1"),
                                divTitle = this.app(div, "div", "parent open"),
                                ul = this.app(div, "ul", "children");
                            this.app(divTitle, "i", "parentArrow");
                            if (group[i].tableName == $scope.st) {
                                this.app(
                                    divTitle,
                                    "i",
                                    "parentIcon parentIconFact"
                                );
                            } else {
                                this.app(divTitle, "i", "parentIcon");
                            }
                            var parentSpan = this.app(
                                divTitle,
                                "span",
                                "parentTitle"
                            );
                            parentSpan.innerHTML = group[i].tableName;
                            if (!group[i].sqlPhysicalColumns) continue;
                            divTitle.group = group[i].sqlPhysicalColumns;
                            for (var j = 0; j < divTitle.group.length; j++) {
                                var li = this.app(ul, "li", "");
                                var liIcon = this.app(li, "i", "liIcon");
                                var liSpan = this.app(li, "span", "liSpan");
                                liSpan.innerHTML = divTitle.group[j].name;
                                li.dataType = divTitle.group[j].dataType;
                                li.ondragstart = function(event) {
                                    //bingo1
                                    var data = {
                                        name: event.target.innerText,
                                        sourceTable:
                                            event.target.parentNode
                                                .previousSibling.innerText,
                                        dataType: this.dataType
                                    };
                                    event.stopPropagation();

                                    window.dataSourceText = JSON.stringify(
                                        data
                                    );
                                    if (
                                        navigator.userAgent.indexOf("Firefox")
                                    ) {
                                        event.dataTransfer.setData(
                                            "Text",
                                            JSON.stringify(data)
                                        );
                                    }
                                    // event.dataTransfer.setData("Text",JSON.stringify(data));
                                };
                                li.setAttribute("draggable", "true");
                            }
                            divTitle.onclick = function() {
                                var dd = this.nextSibling;
                                var set =
                                    dd.style.display == "none"
                                        ? ["", "parent open"]
                                        : ["none", "parent close"];
                                dd.style.display = set[0];
                                this.className = set[1];
                            };
                            divTitle.setAttribute("draggable", "true");
                            divTitle.ondragstart = function(event) {
                                window.dataSourceText = undefined;
                                var title = event.target.innerText;
                                var ul = event.target.nextSibling.childNodes;

                                if ($("#mainItemBody0").is(":visible")) {
                                    var divTitleData = {
                                        name: title,
                                        olapDimension: {
                                            hierarchies: [
                                                {
                                                    havingAll: true,
                                                    hierarchyLevels: [],
                                                    name: title,
                                                    sourceTable: title
                                                }
                                            ],
                                            sourceName: title,
                                            timeDimension: false,
                                            type: "StandardDimension"
                                        }
                                    };
                                    for (var i = 0; i < ul.length; i++) {
                                        var li = {
                                            annotations: [],
                                            havingUniqueMembers: false,
                                            levelType: ul[i].dataType,
                                            name: ul[i].innerText,
                                            referenceColumn: ul[i].innerText,
                                            referenceOrdinalColumn: "",
                                            sourceTable: title,
                                            propertyList: []
                                        };
                                        divTitleData.olapDimension.hierarchies[0].hierarchyLevels.push(
                                            li
                                        );
                                    }
                                } else {
                                    var divTitleData = {
                                        id: title,
                                        name: title,
                                        columns: []
                                    };
                                    for (var i = 0; i < ul.length; i++) {
                                        var li = {
                                            aggTypes: [
                                                "MAXIMUM",
                                                "COUNT_DISTINCT",
                                                "NONE",
                                                "SUM",
                                                "MINIMUM",
                                                "COUNT"
                                            ],
                                            defaultAggType: "NONE",
                                            fieldType: "DIMENSION",
                                            formatMask: "NONE",
                                            horizontalAlignment: "LEFT",
                                            id: ul[i].innerText,
                                            selectedAggType: "",
                                            name: ul[i].innerText,
                                            sourceTable: title,
                                            sourceColumn: ul[i].innerText,
                                            type: ul[i].dataType
                                        };
                                        divTitleData.columns.push(li);
                                    }
                                }

                                window.dataSourceLevel = JSON.stringify(
                                    divTitleData
                                );
                                if (
                                    navigator.userAgent.indexOf("Firefox") > 0
                                ) {
                                    event.dataTransfer.setData(
                                        "level",
                                        JSON.stringify(divTitleData)
                                    );
                                }
                                // event.dataTransfer.setData("level",JSON.stringify(divTitleData));
                                event.stopPropagation();
                            };
                        }
                    }
                };
                function Tree2(data, el, num) {
                    this.num = num;
                    this.app = function(ele, tag, className) {
                        var div = document.createElement(tag);
                        div.className = className;
                        ele.appendChild(div);
                        return div;
                    };
                    this.create(document.getElementById(el), data, this.num);
                }
                /**
                 * 判断子节点是否包含错误
                 * @param {Array} nodes 子节点
                 */
                function childrenHasError(nodes) {
                    let result = false;
                    if (nodes && nodes.length) {
                        let len = nodes.length;
                        for (let i = 0; i < len; i++) {
                            let item = nodes[i];
                            let errors = item.error || {};
                            let columns = item.columns || [];
                            for (let key in errors) {
                                if (errors[key] === true) {
                                    return true;
                                }
                            }
                            if (columns && columns.length) {
                                if (childrenHasError(columns) === true) {
                                    return true;
                                }
                            }
                        }
                    }
                    return result;
                }
                Tree2.fn = Tree2.prototype = {
                    create: function(par, group, num) {
                        var host = this,
                            length = group.length;
                        for (var i = 0; i < length; i++) {
                            if (!group[i].name)
                                group[i].name =
                                    group[
                                        i
                                    ].propertyDetail.localeStringMap.en_US;
                            var errorIcon = "";
                            var icon;
                            if (!group[i].error) {
                                group[i].error = {
                                    errorType0: false,
                                    errorType1: false,
                                    errorType2: false,
                                    errsub: false
                                };
                            }
                            for (var k in errorArray) {
                                if (group[i].error[k]) {
                                    errorIcon = " error ";
                                }
                            }
                            //创建根节点，搭架子
                            var dl = this.app(par, "DL", "parent"),
                                dt = this.app(dl, "DT", "close " + errorIcon),
                                dd = this.app(dl, "DD", "dd");
                            var tag =
                                group[i].children ||
                                group[i].columns ||
                                group[i].olapDimension;
                            var icon1 = this.app(dt, "i", "parentArrow");
                            var errorlogo = this.app(dt, "i", "errorlogo");
                            icon1.ondrop = function(event) {
                                if (event && event.preventDefault) {
                                    event.preventDefault();
                                } else {
                                    window.event.returnValue = false; //注意加window
                                }
                            };
                            if (tag && tag.length > 0) {
                                icon1.style.display = "block";
                            } else {
                                icon1.style.display = "none";
                            }
                            if (num == 3) {
                                icon = this.app(
                                    dt,
                                    "i",
                                    "parentIcon parentIcon_" + group[i].type
                                );
                            } else {
                                icon = this.app(
                                    dt,
                                    "i",
                                    "parentIcon parentIcon" + num
                                );
                            }

                            icon.ondrop = function(event) {
                                if (event && event.preventDefault) {
                                    event.preventDefault();
                                } else {
                                    window.event.returnValue = false; //注意加window
                                }
                            };
                            var parentSpan = this.app(
                                dt,
                                "span",
                                "parentTitle"
                            );
                            parentSpan.ondrop = function(event) {
                                if (event && event.preventDefault) {
                                    event.preventDefault();
                                } else {
                                    window.event.returnValue = false; //注意加window
                                }
                            };

                            if (tag) {
                                var icon2 = this.app(dt, "i", "addItem");

                                icon2.i = i;
                                icon2.onclick = function(event) {
                                    $rootScope.yhnParentData = group[this.i];
                                    if (group[this.i].children) {
                                        $scope.fullData =
                                            group[this.i].children;

                                        $scope.type = 6;
                                        $scope.titleDes = "添加分组";
                                        $scope.singleHeight = 276;
                                        $scope.contentDes = "输入分组名称";
                                    } else if (group[this.i].columns) {
                                        $scope.fullData = group[this.i].columns;
                                        $scope.ChooseCategory =
                                            group[this.i].name;
                                        $scope.sourceColumnChoosed = null;
                                        $scope.type = 7;
                                        $scope.titleDes = "添加字段";
                                        $scope.singleHeight = 400;
                                        $scope.contentDes = "输入字段名称";
                                        let cat = {};
                                        $scope.SourceColumn1.forEach(el => {
                                            if (!cat[el.tb]) {
                                                cat[el.tb] = {
                                                    name: el.tb,
                                                    cat: []
                                                };
                                            }

                                            cat[el.tb].cat.push(el);
                                        });
                                        $scope.sourceColumnCat = cat;
                                    }
                                    if (
                                        !$scope.$$phase &&
                                        !$scope.$root.$$phase
                                    ) {
                                        $scope.$apply();
                                    }
                                    eventor = event;
                                    $scope.test = group[this.i];
                                    $(".agileBox .newBuildBox").removeClass("hide");
                                    event.stopPropagation();
                                };
                            }

                            parentSpan.innerHTML =
                                group[i].name ||
                                (group[i].propertyDetail &&
                                    group[i].propertyDetail.localeStringMap
                                        .en_US) ||
                                "";
                            dt.group = tag;
                            dt.data = group[i];
                            dt.parentData = group;
                            dt.i = i;
                            dt.className += "node-close";
                            dt.onclick = function(event) {
                                event.preventDefault();
                                eventor = event;
                                if (event.isTrusted) {
                                    $scope.drag = false;
                                }
                                $(".hover").removeClass("hover");
                                var hover = " hover";
                                var error;
                                if (
                                    event.target.className.indexOf("error") >
                                        0 ||
                                    event.target.parentNode.className.indexOf(
                                        "error"
                                    ) > 0
                                ) {
                                    error = " error";
                                } else {
                                    error = "";
                                }
                                $(this).addClass(hover);
                                $scope.property(
                                    this.data,
                                    this.parentData,
                                    event
                                );
                                if (!this.group) {
                                    return;
                                }
                                $(".myFileTree .open").removeClass("open");
                                var dd = this.nextSibling;
                                if (!dd.hasChildNodes()) {
                                    this.num = num;
                                    this.num++;
                                    host.create(dd, this.group, this.num);
                                    if (this.group.length > 0) {
                                        let hasError = childrenHasError(
                                            this.group
                                        );
                                        if (hasError) {
                                            error = " error";
                                        }
                                        // if (!hasError) {
                                        //     error = "";
                                        // } else {
                                        //     error = " error";
                                        // }
                                    }
                                    this.className =
                                        "node-open open" + hover + error;
                                    dd.style.display = "block";
                                } else {
                                    var set =
                                        dd.style.display == "none"
                                            ? ["", "node-open open"]
                                            : ["none", "node-close close"];
                                    dd.style.display = set[0];
                                    this.className = set[1] + error + hover;
                                    if (dd.style.display == "none") {
                                        dd.innerHTML = "";
                                    }
                                }
                            };
                            dt.ondragend = function(event) {
                                if (!$scope.key) {
                                    return;
                                }
                                event.target.parentNode.outerHTML = "";
                                for (
                                    var i = 0, len = this.parentData.length;
                                    i < len;
                                    i++
                                ) {
                                    if (
                                        this.parentData[i].name ==
                                        event.target.innerText
                                    ) {
                                        this.parentData.splice(i, 1);
                                        break;
                                    }
                                }
                            };
                            dt.ondragover = function(event) {
                                $(".add").removeClass("add");
                                $(this).addClass("add");
                                if (event && event.preventDefault) {
                                    event.preventDefault();
                                } else {
                                    window.event.returnValue = false; //注意加window
                                }
                            };
                            dt.ondragleave = function() {
                                $(this).removeClass("add");
                                if (event && event.preventDefault) {
                                    event.preventDefault();
                                } else {
                                    window.event.returnValue = false; //注意加window
                                }
                            };
                            dt.ondrop = function(event) {
                                $scope.getFactTable();
                                $(this).removeClass("add");
                                if (event && event.preventDefault) {
                                    event.preventDefault();

                                    var data =
                                        /*event.dataTransfer.getData("Text")*/ window.dataSourceText;
                                    var level =
                                        /*event.dataTransfer.getData("level")*/ window.dataSourceLevel;
                                } else {
                                    window.event.returnValue = false; //注意加window
                                    var data =
                                        /*event.dataTransfer.getData("Text")*/ window.dataSourceText;
                                    var level =
                                        /*event.dataTransfer.getData("level")*/ window.dataSourceLevel;
                                }
                                if (data && data.length > 0)
                                    var datas = JSON.parse(data);
                                var test;
                                if (group[this.i].children) {
                                    if (group[this.i].name == "所有分组") {
                                        if (data && data.length > 0) {
                                            test = {
                                                id: datas.name,
                                                name: datas.name,
                                                columns: [
                                                    {
                                                        aggTypes: [
                                                            "MAXIMUM",
                                                            "COUNT_DISTINCT",
                                                            "NONE",
                                                            "SUM",
                                                            "MINIMUM",
                                                            "COUNT"
                                                        ],
                                                        defaultAggType: "NONE",
                                                        fieldType: "DIMENSION",
                                                        formatMask: "NONE",
                                                        horizontalAlignment:
                                                            "LEFT",
                                                        id: datas.name,
                                                        selectedAggType: "",
                                                        name: datas.name,
                                                        sourceColumn: datas.name,
                                                        sourceTable:datas.sourceTable,
                                                        type: datas.dataType
                                                    }
                                                ]
                                            };
                                        } else if (level.length > 0) {
                                            test = JSON.parse(level);
                                        }
                                        group[this.i].children.push(test);
                                        group[this.i].error.errorType7 = false;
                                    }
                                } else if (
                                    group[this.i].olapDimension &&
                                    group[this.i].olapDimension.hierarchies
                                ) {
                                    if (data && data.length > 0) {
                                        test = {
                                            havingAll: true,
                                            hierarchyLevels: [
                                                {
                                                    annotations: [],
                                                    havingUniqueMembers: false,
                                                    levelType: null,
                                                    name: datas.name,
                                                    referenceColumn: datas.name,
                                                    referenceOrdinalColumn: "",
                                                    propertyList: [],
                                                    sourceTable: datas.sourceTable,
                                                    error: {}
                                                }
                                            ],
                                            name: datas.name,
                                            sourceTable: datas.sourceTable,
                                            error: {}
                                        };
                                    } else {
                                        warnning("这不是一个有效操作！");
                                        return;
                                    }
                                    group[
                                        this.i
                                    ].olapDimension.hierarchies.push(test);
                                } else if (group[this.i].hierarchyLevels) {
                                    if (data && data.length > 0) {
                                        if (
                                            group[this.i].sourceTable.length >
                                                0 &&
                                            group[this.i].sourceTable !==
                                                datas.sourceTable
                                        ) {
                                            warnning(
                                                "层级中的所有级别必须来自同一张表！"
                                            );
                                            return;
                                        }
                                        test = {
                                            annotations: [],
                                            havingUniqueMembers: false,
                                            levelType: null,
                                            name: datas.name,
                                            referenceColumn: datas.name,
                                            referenceOrdinalColumn: "",
                                            propertyList: [],
                                            sourceTable: datas.sourceTable,
                                            error: {}
                                        };
                                    } else {
                                        warnning("这不是一个有效操作！");
                                        return;
                                    }
                                    group[this.i].hierarchyLevels.push(test);
                                } else if (group[this.i].propertyList) {
                                    if (data && data.length > 0) {
                                        if (
                                            group[this.i].sourceTable !==
                                            datas.sourceTable
                                        ) {
                                            warnning(
                                                "层级中的所有级别必须来自同一张表！"
                                            );
                                            return;
                                        }
                                        test = {
                                            propertyDescribe: {
                                                localeStringMap: { en_US: "" },
                                                locales: ["en_US"]
                                            },
                                            propertyDetail: {
                                                localeStringMap: {
                                                    en_US: datas.name
                                                },
                                                locales: ["en_US"]
                                            },
                                            propertySource: datas.name,
                                            error: {},
                                            name: datas.name
                                        };
                                    } else {
                                        warnning("这不是一个有效操作！");
                                        return;
                                    }
                                    group[this.i].propertyList.push(test);
                                } else if (
                                    group[this.i].propertyDescribe ||
                                    group[this.i].logicalColumn ||
                                    group[this.i].aggTypes
                                ) {
                                    warnning("这不是一个有效的操作！");
                                    return;
                                } else if (group[this.i].columns) {
                                    if (data && data.length > 0) {
                                        // if(group[this.i].name !== datas.sourceTable){
                                        //     warnning('层级中的所有级别必须来自同一张表！');
                                        //     return;
                                        // }
                                        test = {
                                            aggTypes: [
                                                "MAXIMUM",
                                                "COUNT_DISTINCT",
                                                "NONE",
                                                "SUM",
                                                "MINIMUM",
                                                "COUNT",
                                                "NONE"
                                            ],
                                            defaultAggType: "NONE",
                                            fieldType: "DIMENSION",
                                            formatMask: "NONE",
                                            horizontalAlignment: "LEFT",
                                            id: datas.name,
                                            selectedAggType: "",
                                            name: datas.name,
                                            sourceTable: datas.sourceTable,
                                            sourceColumn: datas.name,
                                            category: group[this.i].name
                                                .split(" ")
                                                .join("_"),
                                            type: datas.dataType,
                                            error: {}
                                        };
                                    } else {
                                        warnning("这不是一个有效操作！");
                                        return;
                                    }
                                    group[this.i].columns.push(test);
                                }
                                $scope.group = group[this.i];
                                var eventor;
                                if (
                                    event.target.className.indexOf("node") >= 0
                                ) {
                                    eventor = event.target;
                                } else {
                                    eventor = event.target.parentNode;
                                }
                                setTimeout(function() {
                                    oc(event, test);
                                    error(event);
                                    if ($scope.group.children) {
                                        eventor.data.error.errorType5 = false;
                                        eventor.data.error.errorType6 = false;
                                        firstParent(eventor);
                                    }
                                    if ($scope.group.olapDimension) {
                                        eventor.data.error.errorType3 = false;
                                        firstParent(eventor);
                                        firstParent(
                                            eventor.parentNode.parentNode
                                                .previousSibling
                                        );
                                    }
                                    if ($scope.group.hierarchyLevels) {
                                        eventor.data.error.errorType4 = false;
                                        firstParent(eventor);
                                        firstParent(
                                            eventor.parentNode.parentNode
                                                .previousSibling
                                        );
                                        firstParent(
                                            eventor.parentNode.parentNode
                                                .parentNode.parentNode
                                                .previousSibling
                                        );
                                    }
                                    if ($scope.group.propertyList) {
                                        firstParent(eventor);
                                        firstParent(
                                            eventor.parentNode.parentNode
                                                .previousSibling
                                        );
                                        firstParent(
                                            eventor.parentNode.parentNode
                                                .parentNode.parentNode
                                                .previousSibling
                                        );
                                        firstParent(
                                            eventor.parentNode.parentNode
                                                .parentNode.parentNode
                                                .parentNode.parentNode
                                                .previousSibling
                                        );
                                    }
                                    if ($scope.group.columns) {
                                        eventor.data.error.errorType8 = false;
                                        firstParent(eventor);
                                        firstParent(
                                            eventor.parentNode.parentNode
                                                .previousSibling
                                        );
                                        firstParent(
                                            eventor.parentNode.parentNode
                                                .parentNode.parentNode
                                                .previousSibling
                                        );
                                    }
                                    eventor.childNodes[0].style.display =
                                        "block";
                                    $scope.init();
                                    if (
                                        !$scope.$$phase &&
                                        !$scope.$root.$$phase
                                    ) {
                                        $scope.$apply();
                                    }
                                }, 200);
                            };
                        }
                    }
                };
                function myBrowser() {
                    var userAgent = navigator.userAgent;
                    var isOpera = userAgent.indexOf("Opera") > -1;
                    if (isOpera) {
                        return "Opera";
                    }
                    if (userAgent.indexOf("Firefox") > -1) {
                        return "FF";
                    }
                    if (userAgent.indexOf("Chrome") > -1) {
                        return "Chrome";
                    }
                    if (userAgent.indexOf("Safari") > -1) {
                        return "Safari";
                    }
                    if (
                        userAgent.indexOf("compatible") > -1 &&
                        userAgent.indexOf("MSIE") > -1 &&
                        !isOpera
                    ) {
                        return "IE";
                    }
                }

                //警告信息
                function warnning(e) {
                    $(".agileBox .alert-warning").removeClass("hide");
                    $(".agileBox .alert-warning .alert-main p").html(e);
                }

                //获取事实表
                $scope.getFactTable = () => {
                    $scope.factTable = [];
                    var leftColumLen = $scope.leftColum.length;
                    for (var i = 0; i < leftColumLen; i++) {
                        if (
                            $scope.data.analysisModel &&
                            $scope.leftColum[i].tableName ==
                                $scope.data.analysisModel.logicalTable
                                    .sourceTable
                        ) {
                            $scope.factTable.push(
                                $scope.leftColum[i].tableName
                            );

                            var sqlLen =
                                $scope.leftColum[i].sqlPhysicalColumns.length;

                            for (var j = 0; j < sqlLen; j++) {
                                $scope.factTable.push(
                                    $scope.leftColum[i].sqlPhysicalColumns[j]
                                        .name
                                );
                            }
                            break;
                        }
                    }
                };

                //获取当前表
                $scope.getNowTable = (tableName, dataName) => {
                    for (
                        var i = 0, len = $scope.leftColum.length;
                        i < len;
                        i++
                    ) {
                        if ($scope.leftColum[i].tableName == tableName) {
                            $scope.getTable = [];
                            $scope.getTable.push($scope.leftColum[i].tableName);
                            for (
                                var j = 0,
                                    len =
                                        $scope.leftColum[i].sqlPhysicalColumns
                                            .length;
                                j < len;
                                j++
                            ) {
                                $scope.getTable.push(
                                    $scope.leftColum[i].sqlPhysicalColumns[j]
                                        .name
                                );
                            }
                            break;
                        }
                    }
                    return $scope.getTable.indexOf(dataName) == -1
                        ? false
                        : true;
                };

                //获取部分表
                $scope.getAreaTable = e => {
                    for (
                        var i = 0, len = $scope.leftColum.length;
                        i < len;
                        i++
                    ) {
                        if ($scope.leftColum[i].tableName == e) {
                            var arr = [];
                            for (
                                var j = 0,
                                    jlen =
                                        $scope.leftColum[i].sqlPhysicalColumns
                                            .length;
                                j < jlen;
                                j++
                            ) {
                                var data = {
                                    tb: $scope.leftColum[i].tableName,
                                    name:
                                        $scope.leftColum[i].sqlPhysicalColumns[
                                            j
                                        ].name
                                };
                                arr.push(data);
                            }
                            return arr;
                        }
                    }
                };

                //获取部分表1
                $scope.getAreaTable1 = e => {
                    for (
                        var i = 0, len = $scope.leftColum.length;
                        i < len;
                        i++
                    ) {
                        for (
                            var j = 0,
                                lenj =
                                    $scope.leftColum[i].sqlPhysicalColumns
                                        .length;
                            j < lenj;
                            j++
                        ) {
                            if (
                                $scope.leftColum[i].sqlPhysicalColumns[j]
                                    .name == e
                            ) {
                                return $scope.leftColum[i].sqlPhysicalColumns;
                            }
                        }
                    }
                };

                //判断类型
                $scope.ifType = e => {
                    var m =
                        (e.logicalColumn && e.logicalColumn.hierarchies) ||
                        e.referenceColumn ||
                        e.propertySource ||
                        false;
                    if (m) return m.length > 0 ? true : false;
                    return false;
                };

                //获取错误信息
                $scope.errInfo = data => {
                    $scope.errorInfos = "";
                    $scope.errorShow = false;
                    $scope.errlist = [];
                    for (var k in errorArray) {
                        if (data.error[k]) {
                            if (k == "errsub") continue;
                            $scope.errorShow = true;
                            if (k == "errorType1") {
                                $scope.errlist.push(
                                    errorArray[k] + $scope.nameExp
                                );
                            } else {
                                $scope.errlist.push(errorArray[k]);
                            }
                        }
                    }
                };

                //修改名字
                $scope.changeName = e => {
                    $scope.errorShow = false;
                    $scope.test.name = e;
                    $(".hover")
                        .find("span")
                        .text(e);
                    switch ($scope.whichTypes($scope.test)) {
                        case "维度":
                        case "度量值":
                            return;
                            break;
                        case "维度值":
                            $scope.test.olapDimension.sourceName = e;
                            break;
                        case "层级":
                        case "级别":
                            break;
                        case "属性":
                            $scope.test.propertyDetail.localeStringMap.en_US = e;
                            break;
                        case "度量":
                            break;
                    } //
                    $scope.judge($scope.whichTypes($scope.test));
                };

                function firstParentSingle(e) {
                    var arr =
                        e.data.children ||
                        (e.data.olapDimension &&
                            e.data.olapDimension.hierarchies) ||
                        e.data.hierarchyLevels ||
                        e.data.propertyList ||
                        e.data.columns ||
                        e.data.aggTypes;
                    if (!e.data.error) {
                        return false;
                    }
                    e.className = e.className.replace(/error/g, "");
                    e.data.error.errsub = false;
                    //子集错误
                    for (
                        var num = 0, numlen = arr.length;
                        num < numlen;
                        num++
                    ) {
                        for (var k in arr[num].error) {
                            if (arr[num].error[k]) {
                                e.data.error.errsub = true;
                                break;
                            }
                            var columns = arr[num].columns;
                            if (columns && columns.length) {
                                columns.forEach(item => {
                                    let errors = item.error || {};
                                    for (let key in errors) {
                                        if (errors[key]) {
                                            arr[num].error.errsub = true;
                                            e.data.error.errsub = true;
                                        }
                                    }
                                });
                            }
                        }
                    }
                    //本体错误
                    for (var j in e.data.error) {
                        if (e.data.error[j]) {
                            e.className += " error ";
                            break;
                        }
                    }
                }

                //父级错误
                function firstParent(e) {
                    var arr =
                        e.data.children ||
                        (e.data.olapDimension &&
                            e.data.olapDimension.hierarchies) ||
                        e.data.hierarchyLevels ||
                        e.data.propertyList ||
                        e.data.columns ||
                        e.data.aggTypes;
                    if (!e.data.error) {
                        return false;
                    }
                    e.className = e.className.replace(/error/g, "");
                    e.data.error.errsub = false;
                    //子集错误
                    for (
                        var num = 0, numlen = arr.length;
                        num < numlen;
                        num++
                    ) {
                        for (var k in arr[num].error) {
                            if (arr[num].error[k]) {
                                e.data.error.errsub = true;
                                break;
                            }
                            var columns = arr[num].columns;
                            if (columns && columns.length) {
                                columns.forEach(item => {
                                    let errors = item.error || {};
                                    for (let key in errors) {
                                        if (errors[key]) {
                                            arr[num].error.errsub = true;
                                            e.data.error.errsub = true;
                                        }
                                    }
                                });
                            }
                        }
                    }
                    //本体错误
                    for (var j in e.data.error) {
                        if (e.data.error[j]) {
                            e.className += " error ";
                            break;
                        }
                    }
                }

                //判断错误
                $scope.judge = e => {
                    var current;
                    var currentp;
                    var currentpp;
                    var currentppp;
                    var currentpppp;
                    var currentChild;
                    var arr;
                    var errObj = {};
                    if ($scope.event.target.className.indexOf("hover") > 0) {
                        arr =
                            $scope.event.target.parentNode.parentNode
                                .childNodes;
                        current = $scope.event.target;
                        currentp =
                            $scope.event.target.parentNode.parentNode
                                .previousSibling;
                        currentpp =
                            $scope.event.target.parentNode.parentNode.parentNode
                                .parentNode.previousSibling;
                        currentppp =
                            $scope.event.target.parentNode.parentNode.parentNode
                                .parentNode.parentNode.parentNode
                                .previousSibling;
                        currentpppp =
                            $scope.event.target.parentNode.parentNode.parentNode
                                .parentNode.parentNode.parentNode.parentNode
                                .parentNode.previousSibling;
                        // currentChild = $scope.event.target.nextSibling && $scope.event.target.nextSibling.childNodes[0].childNodes[0];
                    } else {
                        arr =
                            $scope.event.target.parentNode.parentNode.parentNode
                                .childNodes;
                        current = $scope.event.target.parentNode;
                        currentp =
                            $scope.event.target.parentNode.parentNode.parentNode
                                .previousSibling;
                        currentpp =
                            $scope.event.target.parentNode.parentNode.parentNode
                                .parentNode.parentNode.previousSibling;
                        currentppp =
                            $scope.event.target.parentNode.parentNode.parentNode
                                .parentNode.parentNode.parentNode.parentNode
                                .previousSibling;
                        currentpppp =
                            $scope.event.target.parentNode.parentNode.parentNode
                                .parentNode.parentNode.parentNode.parentNode
                                .parentNode.parentNode.previousSibling;
                        // currentChild = $scope.event.target.parentNode.nextSibling && $scope.event.target.parentNode.nextSibling.childNodes[0].childNodes[0];
                    }
                    for (
                        var j = 0, jlen = $scope.parentData.length;
                        j < jlen;
                        j++
                    ) {
                        if (errObj[$scope.parentData[j].name] !== undefined) {
                            errObj[$scope.parentData[j].name]++;
                        } else {
                            errObj[$scope.parentData[j].name] = 1;
                        }
                    }

                    //本体
                    if ($scope.test.name.length <= 0) {
                        current.className += " error ";
                        $scope.test.error.errorType0 = true;
                        switch (e) {
                            case "维度值":
                            case "度量":
                                currentp.className += " error ";
                                currentp.data.error.errsub = true;
                                break;
                            case "层级":
                                currentp.className += " error ";
                                currentp.data.error.errsub = true;
                                currentpp.className += " error ";
                                currentpp.data.error.errsub = true;
                                break;
                            case "级别":
                                currentp.className += " error ";
                                currentp.data.error.errsub = true;
                                currentpp.className += " error ";
                                currentpp.data.error.errsub = true;
                                currentppp.className += " error ";
                                currentppp.data.error.errsub = true;
                                break;
                            case "属性":
                                currentp.className += " error ";
                                currentp.data.error.errsub = true;
                                currentpp.className += " error ";
                                currentpp.data.error.errsub = true;
                                currentppp.className += " error ";
                                currentppp.data.error.errsub = true;
                                currentpppp.className += " error ";
                                currentpppp.data.error.errsub = true;
                                break;
                            case "分组":
                                currentp.className += " error ";
                                currentp.data.error.errsub = true;
                                currentpp.className += " error ";
                                currentpp.data.error.errsub = true;
                                break;
                            case "字段":
                                currentp.className += " error ";
                                currentp.data.error.errsub = true;
                                currentpp.className += " error ";
                                currentpp.data.error.errsub = true;
                                // currentppp.className += ' error ';
                                // currentppp.data.error.errsub = true;
                                break;
                        }
                    } else {
                        $scope.test.error.errorType0 = false;
                    }

                    //同级
                    for (
                        var m = 0, mlen = $scope.parentData.length;
                        m < mlen;
                        m++
                    ) {
                        if (errObj[$scope.parentData[m].name] > 1) {
                            arr[m].firstChild.className += " error ";
                            $scope.parentData[m].error.errorType1 = true;
                        } else {
                            $scope.parentData[m].error.errorType1 = false;
                            if ($scope.parentData[m].name.length > 0) {
                                let className = arr[m].firstChild.className;
                                arr[m].firstChild.className = className.replace(
                                    /error/g,
                                    ""
                                );
                                for (var n in $scope.parentData[m].error) {
                                    if ($scope.parentData[m].error[n]) {
                                        arr[m].firstChild.className +=
                                            " error ";
                                        break;
                                    }
                                }
                            }
                        }
                    }
                    function replaceError(obj) {
                        if (!obj) {
                            return;
                        }
                        let data = obj.data || {};
                        let errors = data.error || {};

                        for(let key in errors){
                            if(errors[key]){
                                return;
                            }
                        }

                        obj.className = obj.className.replace(/error/g, "");
                    }
                    switch (e) {
                        case "维度值":
                        case "度量":
                            firstParent(currentp);
                            [currentp].map(function(e) {
                                replaceError(e);
                            });
                            break;
                        case "层级":
                            firstParent(currentp);
                            firstParent(currentpp);
                            [currentp, currentpp].map(function(e) {
                                replaceError(e);
                            });
                        case "级别":
                            firstParent(currentp);
                            firstParent(currentpp);
                            firstParent(current);
                            firstParent(currentppp);
                            if (
                                current.data.propertyList &&
                                current.data.propertyList.length == 0
                            ) {
                                //没孩子  该取消取消
                                [current, currentp, currentpp, currentppp].map(
                                    function(e) {
                                        replaceError(e);
                                    }
                                );
                            } else {
                                //有孩子  分孩子有病   孩子没病
                                //首先要遍历是否有孩子有病
                                var Sickflag = 0; //假设没病
                                for (
                                    var i = 0;
                                    i < current.data.propertyList &&
                                    current.data.propertyList.length;
                                    i++
                                ) {
                                    var tempValues = Object.values(
                                        current.data.propertyList[i].error
                                    );
                                    if (tempValues.indexOf(true) > -1) {
                                        Sickflag = 1;
                                    }
                                }
                                if (Sickflag == 0) {
                                    //没病
                                    [
                                        current,
                                        currentp,
                                        currentpp,
                                        currentppp
                                    ].map(function(e) {
                                        replaceError(e);
                                    });
                                }

                                //孩子有病   我不动
                                //孩子没病   我要动   没法判断
                            }

                            break;
                        case "属性":
                            firstParent(currentp);
                            firstParent(currentpp);
                            firstParent(currentppp);
                            firstParent(currentpppp);

                            if (currentp.data.error.errorType2 == true) {
                                replaceError(current);
                            } else {
                                [
                                    current,
                                    currentp,
                                    currentpp,
                                    currentppp,
                                    currentpppp
                                ].map(function(e) {
                                    replaceError(e);
                                });
                            }

                            break;
                        case "分组":
                            firstParent(currentp);
                            firstParent(currentpp);
                            [currentp, currentpp].map(function(e) {
                                replaceError(e);
                            });
                            break;
                        case "字段":
                            {
                                var isSuccess = true;
                                for (var aa in errObj) {
                                    errObj[aa] > 1 && (isSuccess = false);
                                }
                                if (isSuccess) {
                                    firstParent(currentp);
                                    replaceError(currentp);
                                    firstParent(currentpp);
                                    replaceError(currentpp);
                                } else {
                                    $(currentp).addClass("error");
                                    $(currentpp).addClass("error");
                                }
                                $(current).hasClass("error") ||
                                    firstParent(current);
                                $(current).hasClass("error") ||
                                    replaceError(current);
                                /*[current, currentp, currentpp].map(function(e) {
                                    replaceError(e);
                                });*/
                            }
                            break;
                    }
                    /*错误显示*/
                    $scope.errInfo($scope.test);
                };

                //修改聚合
                $scope.changeJh = e => {
                    if ($scope.test.logicalColumn) {
                        $scope.test.logicalColumn.aggregationType = e;
                    }
                };

                //修改格式化
                $scope.changeGsh = e => {
                    if ($scope.test.logicalColumn) {
                        $scope.test.logicalColumn.formatString = e;
                    }
                    if ($scope.test.formatMask) {
                        $scope.test.formatMask = e;
                    }
                };

                //修改来源列
                $scope.changeSc = m => {
                    if (!m) return;
                    var e = m.name;

                    $scope.test.error.errorType2 = false;
                    switch ($scope.whichTypes($scope.test)) {
                        case "级别":
                            $scope.test.referenceColumn = e;
                            if (
                                $scope.event.target.className.indexOf(
                                    "hover"
                                ) >= 0
                            ) {
                                $scope.event.target.parentNode.parentNode.previousSibling.data.sourceTable =
                                    m.tb;
                            } else {
                                $scope.event.target.parentNode.parentNode.parentNode.previousSibling.data.sourceTable =
                                    m.tb;
                            }
                            $scope.test.sourceTable = m.tb;
                            break;
                        case "属性":
                            $scope.test.propertySource = e;
                            break;
                        case "度量":
                            $scope.test.logicalColumn.column = e;
                            for (
                                var i = 0, len = $scope.leftColum.length;
                                i < len;
                                i++
                            ) {
                                if (
                                    $scope.leftColum[i].tableName == $scope.st
                                ) {
                                    for (
                                        var j = 0,
                                            tlen =
                                                $scope.leftColum[i]
                                                    .sqlPhysicalColumns.length;
                                        j < tlen;
                                        j++
                                    ) {
                                        if (
                                            $scope.leftColum[i]
                                                .sqlPhysicalColumns[j].name == e
                                        ) {
                                            if (
                                                $scope.leftColum[i]
                                                    .sqlPhysicalColumns[j]
                                                    .dataType == "NUMERIC"
                                            ) {
                                                $scope.juhe = [
                                                    "SUM",
                                                    "AVERAGE",
                                                    "MINIMUM",
                                                    "MAXIMUM",
                                                    "COUNT",
                                                    "COUNT_DISTINCT"
                                                ];
                                            } else {
                                                $scope.juhe = [
                                                    "COUNT",
                                                    "COUNT_DISTINCT"
                                                ];
                                            }
                                            $scope.test.logicalColumn.aggregationType =
                                                $scope.juhe[0];
                                            $scope.juheVal = $scope.juhe[0];
                                            break;
                                        }
                                    }
                                }
                            }
                            break;
                    }
                    $scope.judge($scope.whichTypes($scope.test));
                };

                //修改唯一成员
                $scope.changeHum = e => {
                    if (typeof $scope.test.havingUniqueMembers != undefined) {
                        $scope.test.havingUniqueMembers = e;
                    }
                };

                //修改排序列
                $scope.changePx = e => {
                    $scope.test.referenceOrdinalColumn = e;
                };

                $scope.checkRepeat = () => {
                    var event;
                    var errObj = {};
                    var cacheParent;

                    // if(eventor.target.className.indexOf("hover") == '-1'){
                    //     event = eventor.target.parentNode;
                    // } else {
                    event = $scope.mytarget;
                    // }
                    // for(var i = 0,len = $scope.parentData.length; i < len; i++){
                    //     if($scope.parentData[i] == $scope.test){
                    //         $scope.parentData.splice(i,1);
                    //         break;
                    //     }
                    // }
                    if ($rootScope.yhnParentData.columns) {
                        var tempScope = $rootScope.yhnParentData.columns;
                    } else {
                        var tempScope = $rootScope.yhnParentData.children;
                    }

                    if(!tempScope){
                        return;
                    }
                    
                    for (var j = 0, jlen = tempScope.length; j < jlen; j++) {
                        if (errObj[tempScope[j].name]) {
                            errObj[tempScope[j].name]++;
                        } else {
                            errObj[tempScope[j].name] = 1;
                        }
                    }
                    cacheParent = event;

                    for (var m = 0, mlen = tempScope.length; m < mlen; m++) {
                        if (errObj[tempScope[m].name] > 1) {
                            cacheParent.childNodes[m].firstChild.className +=
                                " error ";
                            tempScope[m].error.errorType1 = true;
                            //父级同步报错
                            if ($scope.type == 7) {
                                cacheParent.parentNode.firstChild.className +=
                                    " error ";
                                cacheParent.parentNode.parentNode.previousSibling.className +=
                                    " error ";
                                // tempScope[m].error.errorType1 = true;
                            }
                            // $scope.mytarget.previousSibling.data.error.errorType7 = false;
                            // firstParentSingle(eventor.target.parentNode);
                        } else {
                            if ($scope.type == 7 || $scope.type == 6) {
                                tempScope[m].error.errorType1 = false;
                                if (
                                    tempScope[m].name.length > 0 &&
                                    cacheParent.childNodes[m]
                                ) {
                                    cacheParent.childNodes[
                                        m
                                    ].firstChild.className = cacheParent.childNodes[
                                        m
                                    ].firstChild.className.replace(
                                        /error/g,
                                        ""
                                    );
                                    for (var n in tempScope[m].error) {
                                        if (tempScope[m].error[n]) {
                                            cacheParent.childNodes[
                                                m
                                            ].firstChild.className += " error ";
                                            break;
                                        }
                                    }
                                }
                            }
                        }
                    }
                };

                //修改描述
                $scope.changeTxt = e => {
                    $scope.test.propertyDescribe.localeStringMap.en_US = e;
                };

                //关闭敏捷窗口
                $scope.closeAgile = () => {
                    $(".agileBox").addClass("hide");
                    $("#mainItemBody0,#mainItemBody1").empty();
                    $(".popup exist-data").addClass("popupHide");
                    $(".popup").hide();
                };

                //关闭弹窗
                $scope.closeAlert = () => {
                    $(".agileBox .alert-del").addClass("hide");
                };

                //清空模型和默认填充弹窗
                $scope.deleteM = e => {
                    if ($("#mainItemBody1").is(":hidden")) {
                        if (e == 0) {
                            $scope.title = "清除模型";
                            $scope.content = "您想要清除模型吗?";
                            $scope.add = 0;
                        } else {
                            $scope.title = "自动填充数据集";
                            $scope.content =
                                "你想要使用默认维度和度量来填充模型吗?";
                            $scope.add = 2;
                        }
                    } else {
                        if (e == 0) {
                            $scope.title = "清除模型";
                            $scope.content = "您想要清除模型吗?";
                            $scope.add = 0;
                        } else {
                            $scope.title = "自动填充数据集";
                            $scope.content =
                                "你想要使用默认维度和度量来填充模型吗?";
                            $scope.add = 3;
                        }
                    }

                    $(".deleteModel").removeClass("hide");
                };

                //类型
                $scope.whichTypes = e => {
                    if (e.children) return e.name;
                    if (e.olapDimension) return "维度值";
                    if (e.hierarchyLevels) return "层级";
                    if (e.propertyList) return "级别";
                    if (e.propertyDescribe) return "属性";
                    if (e.logicalColumn) return "度量";
                    //业务数据集部分
                    if (e.columns) return "分组";
                    if (e.fieldType) return "字段";
                    return false;
                };

                //删除选项
                $scope.deleteSelection = () => {
                    if ($(".mainItemCenter .hover").length <= 0) return;
                    if (
                        $scope.test.name === "维度" ||
                        $scope.test.name === "度量值" ||
                        $scope.test.name == "所有分组"
                    ) {
                        tips("不能删除" + $scope.test.name);
                        return;
                    }

                    var event;
                    var errObj = {};
                    var cacheParent;

                    if (eventor.target.className.indexOf("hover") == "-1") {
                        event = eventor.target.parentNode;
                    } else {
                        event = eventor.target;
                    }
                    for (
                        var i = 0, len = $scope.parentData.length;
                        i < len;
                        i++
                    ) {
                        if ($scope.parentData[i] == $scope.test) {
                            $scope.parentData.splice(i, 1);
                            break;
                        }
                    }
                    for (
                        var j = 0, jlen = $scope.parentData.length;
                        j < jlen;
                        j++
                    ) {
                        if (errObj[$scope.parentData[j].name]) {
                            errObj[$scope.parentData[j].name]++;
                        } else {
                            errObj[$scope.parentData[j].name] = 1;
                        }
                    }
                    cacheParent = event.parentNode.parentNode;
                    event.parentNode.outerHTML = "";
                    for (
                        var m = 0, mlen = $scope.parentData.length;
                        m < mlen;
                        m++
                    ) {
                        if (errObj[$scope.parentData[m].name] > 1) {
                            cacheParent.childNodes[m].firstChild.className +=
                                " error ";
                            $scope.parentData[m].error.errorType1 = true;
                        } else {
                            $scope.parentData[m].error.errorType1 = false;
                            if ($scope.parentData[m].name.length > 0) {
                                let elem = cacheParent.childNodes[m].firstChild;
                                let childrenErrorType1 = false;
                                let children = $scope.parentData[m].columns;
                                let className = elem.className;
                                if (children && children.length) {
                                    children.forEach(item => {
                                        if (item.error && item.error.errorType1 === true) {
                                            childrenErrorType1 = true;
                                        }
                                    });
                                }

                                elem.className = className.replace(
                                    /error/g,
                                    ""
                                );

                                //子节点重名，父节点仍然保持error样式
                                if (childrenErrorType1) {
                                    elem.className += " error ";
                                }
                                for (var n in $scope.parentData[m].error) {
                                    if ($scope.parentData[m].error[n]) {
                                        elem.className += " error ";
                                        break;
                                    }
                                }
                            }
                        }
                    }
                    switch ($scope.whichTypes($scope.test)) {
                        case "维度值":
                            if ($scope.parentData.length == 0) {
                                cacheParent.previousSibling.data.error.errorType5 = true;
                                cacheParent.previousSibling.data.error.errsub = false;
                                cacheParent.previousSibling.firstChild.style.display =
                                    "none";
                            }
                            firstParent(cacheParent.previousSibling);
                            break;
                        case "层级":
                            if ($scope.parentData.length == 0) {
                                cacheParent.previousSibling.data.error.errorType3 = true;
                                cacheParent.previousSibling.data.error.errsub = false;
                                cacheParent.previousSibling.firstChild.style.display =
                                    "none";
                            }
                            firstParent(cacheParent.previousSibling);
                            firstParent(
                                cacheParent.parentNode.parentNode
                                    .previousSibling
                            );
                            break;
                        case "级别":
                            if ($scope.parentData.length == 0) {
                                cacheParent.previousSibling.data.sourceTable =
                                    "";
                                cacheParent.previousSibling.data.error.errorType4 = true;
                                cacheParent.previousSibling.data.error.errsub = false;
                                cacheParent.previousSibling.firstChild.style.display =
                                    "none";
                            }
                            firstParent(cacheParent.previousSibling);
                            firstParent(
                                cacheParent.parentNode.parentNode
                                    .previousSibling
                            );
                            firstParent(
                                cacheParent.parentNode.parentNode.parentNode
                                    .parentNode.previousSibling
                            );
                            break;
                        case "属性":
                            if ($scope.parentData.length == 0) {
                                cacheParent.previousSibling.firstChild.style.display =
                                    "none";
                            }
                            firstParent(cacheParent.previousSibling);
                            firstParent(
                                cacheParent.parentNode.parentNode
                                    .previousSibling
                            );
                            firstParent(
                                cacheParent.parentNode.parentNode.parentNode
                                    .parentNode.previousSibling
                            );
                            firstParent(
                                cacheParent.parentNode.parentNode.parentNode
                                    .parentNode.parentNode.parentNode
                                    .previousSibling
                            );
                            break;
                        case "度量":
                            if ($scope.parentData.length == 0) {
                                cacheParent.previousSibling.data.error.errorType6 = true;
                                cacheParent.previousSibling.data.error.errsub = false;
                                cacheParent.previousSibling.firstChild.style.display =
                                    "none";
                            }
                            firstParent(cacheParent.previousSibling);
                            break;
                        case "分组":
                            if ($scope.parentData.length == 0) {
                                // cacheParent.previousSibling.data.sourceTable = "";
                                cacheParent.previousSibling.data.error.errorType7 = true;
                                cacheParent.previousSibling.data.error.errsub = false;
                                cacheParent.previousSibling.firstChild.style.display =
                                    "none";
                            }
                            firstParent(cacheParent.previousSibling);
                            break;
                        case "字段":
                            if ($scope.parentData.length == 0) {
                                cacheParent.previousSibling.data.error.errorType8 = true;
                                cacheParent.previousSibling.data.error.errsub = false;
                                cacheParent.previousSibling.firstChild.style.display =
                                    "none";
                            }
                            firstParent(cacheParent.previousSibling);
                            firstParent(
                                cacheParent.parentNode.parentNode
                                    .previousSibling
                            );
                            firstParent(
                                cacheParent.parentNode.parentNode.parentNode
                                    .parentNode.previousSibling
                            );

                            break;
                    }
                    $scope.init();
                };

                //属性面板初始化
                $scope.init = () => {
                    $scope.sourceShow = false;
                    $scope.nameShow = false;
                    $scope.uniqueShow = false;
                    $scope.juheShow = false;
                    $scope.paixuShow = false;
                    $scope.geshihuaShow = false;
                    $scope.des = false;
                    $scope.errorShow = false;
                    $scope.metaGroupShow = false;
                    $scope.isNumberLize = false;
                    $scope.numberLizeValue = "";
                    $scope.labelType = "";
                    $scope.metaLabelShow = false;
                    $scope.add = null;
                };

                //清空模型
                $scope.clearModel = () => {
                    if ($("#mainItemBody1").is(":hidden")) {
                        if ($scope.add == 0) {
                            $("#mainItemBody0").empty();
                            $scope.data.analysisModel.olapDimensionUsages = [];
                            $scope.data.analysisModel.olapMeasures = [];
                            $scope.datas[0].children =
                                $scope.data.analysisModel.olapDimensionUsages;
                            $scope.datas[1].children =
                                $scope.data.analysisModel.olapMeasures;
                            $scope.datas[0].error = {
                                errorType0: false,
                                errorType1: false,
                                errorType2: false,
                                errorType3: false,
                                errorType4: false,
                                errorType5: true,
                                errorType6: false,
                                errsub: false
                            };
                            $scope.datas[1].error = {
                                errorType0: false,
                                errorType1: false,
                                errorType2: false,
                                errorType3: false,
                                errorType4: false,
                                errorType5: false,
                                errorType6: true,
                                errsub: false
                            };
                            var et = new Tree($scope.datas, "mainItemBody0", 1);
                        } else if ($scope.add == 2) {
                            $rootScope.$emit("xhdata", 1);
                        } else if ($scope.add == 3) {
                            $rootScope.$emit("xhdata", 1);
                        }
                    } else {
                        if ($scope.add == 0) {
                            $("#mainItemBody1").empty();
                            $scope.data.metadataModel.categories = [];
                            var et = new Tree2(
                                [
                                    {
                                        name: "所有分组",
                                        children:
                                            $scope.data.metadataModel
                                                .categories,
                                        error: {
                                            errorType0: false,
                                            errorType1: false,
                                            errorType2: false,
                                            errorType3: false,
                                            errorType4: false,
                                            errorType5: false,
                                            errorType6: false,
                                            errorType7: true,
                                            errorType8: false,
                                            errsub: false
                                        }
                                    }
                                ],
                                "mainItemBody1",
                                1
                            );
                        } else if ($scope.add == 2) {
                            //业务数据集自动填充先不做
                            // $("#mainItemBody1").empty();
                            // $rootScope.$emit("xhdata", 1);
                        } else if ($scope.add == 3) {
                            //业务数据集自动填充先不做
                            // $("#mainItemBody1").empty();
                            // $rootScope.$emit("xhdata", 1);
                        }
                    }

                    $scope.closeAlert();
                    $scope.init();
                };

                $scope.onNewNameInputKeyup = (e) => {
                    var data = $scope.newBuildName;
                    if(!data || data.length <= 0){
                        $(".newBuildName input").css({
                            "border-color": "#ff4242"
                        });
                        $(".newBuildName .errorTips").text("名称不能为空");
                    }else{
                        $(".newBuildName input").css({ "border-color": "#ccc" });
                        $(".newBuildName .errorTips").text("");
                    }
                }

                //添加项目
                $scope.addBuildItem = () => {
                    $scope.mytarget = eventor.target.parentNode.nextSibling;

                    var data = $scope.newBuildName;
                    if (!data || data.length <= 0) {
                        $(".newBuildName input").css({
                            "border-color": "#ff4242"
                        });
                        $(".newBuildName .errorTips").text("名称不能为空");
                        return;
                    }
                    $scope.drag = true;
                    var test;
                    if ($scope.type == 3) {
                        test = {
                            name: data,
                            olapDimension: {
                                hierarchies: [],
                                sourceName: data,
                                timeDimension: false,
                                type: "StandardDimension"
                            },
                            error: {
                                errorType0: false,
                                errorType1: false,
                                errorType2: false,
                                errorType3: true,
                                errorType4: false,
                                errsub: false
                            }
                        };
                    } else if ($scope.type == 2) {
                        test = {
                            havingAll: true,
                            hierarchyLevels: [],
                            name: data,
                            sourceTable: "",
                            error: {
                                errorType0: false,
                                errorType1: false,
                                errorType2: false,
                                errorType3: false,
                                errorType4: true,
                                errsub: false
                            }
                        };
                    } else if ($scope.type == 1) {
                        test = {
                            annotations: [],
                            havingUniqueMembers: false,
                            levelType: null,
                            name: data,
                            referenceColumn: "",
                            referenceOrdinalColumn: "",
                            propertyList: [],
                            sourceTable: "",
                            error: {
                                errorType0: false,
                                errorType1: false,
                                errorType2: true,
                                errorType3: false,
                                errorType4: false,
                                errsub: false
                            }
                        };
                    } else if ($scope.type == 4) {
                        test = {
                            error: {
                                errorType0: false,
                                errorType1: false,
                                errorType2: true,
                                errorType3: false,
                                errorType4: false,
                                errsub: false
                            },
                            name: data,
                            logicalColumn: {
                                // ANALYTICS-2109
                                // childProperties: {
                                //     aggregation: ""
                                // },
                                formatString: "",
                                column: ""
                            }
                        };
                    } else if ($scope.type == 5) {
                        test = {
                            propertyDescribe: {
                                localeStringMap: { en_US: "" },
                                locales: ["en_US"]
                            },
                            propertyDetail: {
                                localeStringMap: { en_US: data },
                                locales: ["en_US"]
                            },
                            propertySource: "",
                            error: {
                                errorType0: false,
                                errorType1: false,
                                errorType2: true,
                                errorType3: false,
                                errorType4: false,
                                errsub: false
                            },
                            name: data
                        };
                    } else if ($scope.type == 6) {
                        test = {
                            columns: [],
                            name: data,
                            id: data,
                            error: {
                                errorType0: false,
                                errorType1: false,
                                errorType2: false,
                                errorType3: false,
                                errorType4: false,
                                errorType5: false,
                                errorType6: false,
                                errorType7: false,
                                errorType8: true,
                                errsub: false
                            }
                        };
                    } else if ($scope.type == 7) {
                        if ($scope.sourceColumnChoosed == undefined) {
                            $(".addedChooseList select").css({
                                "border-color": "#ff4242"
                            });
                            $(".addedChooseList .errorTips1").text(
                                "来源列不能为空"
                            );
                            return;
                        }

                        test = {
                            aggTypes: [
                                "AVERAGE",
                                "MAXIMUM",
                                "COUNT_DISTINCT",
                                "NONE",
                                "SUM",
                                "MINIMUM",
                                "COUNT",
                                "NONE"
                            ],
                            defaultAggType: "NONE",
                            error: {
                                errorType0: false,
                                errorType1: false,
                                errorType2: false,
                                errorType3: false,
                                errorType4: false,
                                errorType5: false,
                                errorType6: false,
                                errorType7: false,
                                errorType8: false,
                                errsub: false
                            },
                            fieldType: "DIMENSION",
                            formatMask: "NONE",
                            horizontalAlignment: "LEFT",
                            id: data,
                            name: data,
                            selectedAggType: "NONE",
                            category: $scope.ChooseCategory.split(" ").join(
                                "_"
                            ),
                            sourceColumn: $scope.choosedColumn,
                            sourceTable: $scope.choosedTable,
                            type: $scope.choosedColumnType
                        };
                    }

                    $scope.fullData.push(test);

                    $(".agileBox .newBuildBox").addClass("hide");
                    oc1(eventor);
                    //本级错误

                    error(eventor);

                    function errParent(e){
                        let $dt = $(e.target).parent();
                        let $parentDt = $dt.closest("dd").prev("dt");

                        while($parentDt.length){
                            $dt = $dt.add($parentDt);
                            $parentDt = $parentDt.closest("dd").prev("dt");
                        }

                        for(let i=$dt.length;i>0;i--){
                            let item = $dt.get(i-1);
                            firstParentSingle(item);
                        }
                    }

                    //父级错误
                    if ($scope.type == 4) {
                        //度量
                        eventor.target.parentNode.data.error.errorType6 = false;
                        firstParentSingle(eventor.target.parentNode);
                        firstParentSingle(eventor.target.parentNode.parentNode.parentNode.previousSibling);
                    }
                    if ($scope.type == 3) {
                        //添加维度第二层   都不做动作
                        eventor.target.parentNode.data.error.errorType5 = false;
                        errParent(eventor);
                    }
                    if ($scope.type == 2) {
                        //添加维度第三层
                        eventor.target.parentNode.data.error.errorType3 = false;
                        errParent(eventor);
                    }
                    if ($scope.type == 1) {
                        eventor.target.parentNode.data.error.errorType4 = false;
                        errParent(eventor);
                    }
                    if ($scope.type == 5) {
                        //添加属性
                        firstParentSingle(eventor.target.parentNode);
                        firstParentSingle(eventor.target.parentNode.parentNode.parentNode.previousSibling);
                        var tempPP =  eventor.target.parentNode.parentNode.parentNode;
                        firstParentSingle(tempPP.parentNode.parentNode.previousSibling);
                        firstParentSingle(tempPP.parentNode.parentNode.parentNode.parentNode.previousSibling);
                    }
                    if ($scope.type == 6) {
                        //添加分组
                        eventor.target.parentNode.data.error.errorType7 = false;
                        firstParentSingle(eventor.target.parentNode);
                        // eventor.target.parentNode.className = eventor.target.parentNode.className.replace(/error/g,'');
                    }
                    if ($scope.type == 7) {
                        //添加字段
                        eventor.target.parentNode.data.error.errorType8 = false;
                        firstParent(eventor.target.parentNode);
                        firstParent(eventor.target.parentNode.parentNode.parentNode.previousSibling);
                        var pData = eventor.target.parentNode.data;
                        var pErrors = pData.error || {};
                        var nodeHasError = false;

                        for (var key in pErrors) {
                            if (pErrors[key]) {
                                nodeHasError = true;
                                break;
                            }
                        }
                        if (!nodeHasError) {
                            eventor.target.parentNode.className = eventor.target.parentNode.className.replace(
                                /error/g,
                                ""
                            );
                        }
                    }
                    $scope.newBuildName = "";
                    eventor.target.parentNode.childNodes[0].style.display = "block";

                    $scope.init();
                    setTimeout(() => {
                        $scope.checkRepeat();
                    }, 0);

                    // $scope.$apply();
                };

                //取消添加
                $scope.cancelAdd = () => {
                    $(".agileBox .newBuildBox").addClass("hide");
                    $(".newBuildName input").css({ "border-color": "#ccc" });
                    $(".newBuildName .errorTips").text("");
                    $(".addedChooseList select").css({
                        "border-color": "#ccc"
                    });
                    $(".addedChooseList .errorTips1").text("");
                    $scope.newBuildName = "";
                    $scope.sourceColumnChoosed = undefined;
                };

                //上移动项目
                $scope.moveUp = () => {
                    if (
                        $scope.test.name == "度量值" ||
                        $scope.test.name == "维度"
                    )
                        return;
                    var pNode = $scope.parentData;

                    for (var i = 0, len = pNode.length; i < len; i++) {
                        if (pNode[i].name == $scope.test.name) {
                            if (i <= 0) return;
                            var move = $scope.parentData.slice(i, i + 1);
                            $scope.parentData.splice(i, 1);
                            $scope.parentData.splice(i - 1, 0, move[0]);
                            $scope.drag = true;
                            if (
                                $scope.event.target.parentNode.className.indexOf(
                                    "hover"
                                ) >= 0
                            ) {
                                setTimeout(function() {
                                    $scope.event.target.parentNode.parentNode.parentNode.previousSibling.click();
                                });
                            } else {
                                setTimeout(function() {
                                    $scope.event.target.parentNode.parentNode.previousSibling.click();
                                });
                            }
                            setTimeout(function() {
                                $scope.event.target.click();
                            });
                            setTimeout(function() {
                                $scope.event.target.nextSibling.childNodes[
                                    i - 1
                                ].childNodes[0].click();
                            });
                            break;
                        }
                    }
                };

                //下移动项目
                $scope.moveDown = () => {
                    if (
                        $scope.test.name == "度量值" ||
                        $scope.test.name == "维度"
                    )
                        return;
                    var pNode = $scope.parentData;
                    for (var i = 0, len = pNode.length; i < len; i++) {
                        if (pNode[i].name == $scope.test.name) {
                            if (i >= len - 1) return;
                            var move = $scope.parentData.slice(i, i + 1);
                            $scope.parentData.splice(i, 1);
                            $scope.parentData.splice(i + 1, 0, move[0]);
                            $scope.drag = true;
                            if (
                                $scope.event.target.parentNode.className.indexOf(
                                    "hover"
                                ) >= 0
                            ) {
                                setTimeout(function() {
                                    $scope.event.target.parentNode.parentNode.parentNode.previousSibling.click();
                                });
                            } else {
                                setTimeout(function() {
                                    $scope.event.target.parentNode.parentNode.previousSibling.click();
                                });
                            }
                            setTimeout(function() {
                                $scope.event.target.click();
                            });
                            setTimeout(function() {
                                $scope.event.target.nextSibling.childNodes[
                                    i + 1
                                ].childNodes[0].click();
                            });
                            break;
                        }
                    }
                };

                function oc(event, test) {
                    //ANALYTICS-2221
                    // if ( event.target.parentNode.className.indexOf("hover") >= 0 ) {
                        if ( event.target.parentNode.className.indexOf( "close" ) >= 0 ) {
                            event.target.parentNode.click();
                        } else {
                            event.target.parentNode.click();
                            event.target.parentNode.click();
                        }
                    // } else {
                        if (event.target.className.indexOf("close") >= 0) {
                            event.target.click();
                        } else {
                            event.target.click();
                            event.target.click();
                        }
                    // }
                }
                function oc1(event) {
                    if ( event.target.parentNode.className.indexOf("close") >= 0 ) {
                        setTimeout(function() {
                            event.target.parentNode.click();
                        }, 0);
                    } else {
                        setTimeout(function() {
                            event.target.parentNode.click();
                            event.target.parentNode.click();
                        }, 0);
                    }
                }

                //本级错误
                function error(event) {
                    if (event.target.className.indexOf("hover") > 0) {
                        $scope.arr = event.target.nextSibling.childNodes;
                    } else {
                        $scope.arr =
                            event.target.parentNode.nextSibling.childNodes;
                    }
                    var arr1 = [];
                    for (var i = 0; i < $scope.arr.length; i++) {
                        if (arr1.indexOf($scope.arr[i].innerText) >= 0) {
                            if (
                                $scope.arr[i].childNodes[0].className.indexOf(
                                    "error"
                                ) == "-1"
                            )
                                $scope.arr[i].childNodes[0].className +=
                                    " error";
                            if (
                                $scope.arr[
                                    arr1.indexOf($scope.arr[i].innerText)
                                ].childNodes[0].className.indexOf("error") ==
                                "-1"
                            )
                                $scope.arr[
                                    arr1.indexOf($scope.arr[i].innerText)
                                ].childNodes[0].className += " error";
                            if ($scope.test.children) {
                                $scope.test.children[i].error.errorType1 = true;
                                $scope.test.children[
                                    arr1.indexOf($scope.arr[i].innerText)
                                ].error.errorType1 = true;
                            } else if (
                                $scope.test.olapDimension &&
                                $scope.test.olapDimension.hierarchies
                            ) {
                                $scope.test.olapDimension.hierarchies[
                                    i
                                ].error.errorType1 = true;
                                $scope.test.olapDimension.hierarchies[
                                    arr1.indexOf($scope.arr[i].innerText)
                                ].error.errorType1 = true;
                            } else if ($scope.test.hierarchyLevels) {
                                $scope.test.hierarchyLevels[
                                    i
                                ].error.errorType1 = true;
                                $scope.test.hierarchyLevels[
                                    arr1.indexOf($scope.arr[i].innerText)
                                ].error.errorType1 = true;
                            } else if ($scope.test.propertyList) {
                                $scope.test.propertyList[
                                    i
                                ].error.errorType1 = true;
                                $scope.test.propertyList[
                                    arr1.indexOf($scope.arr[i].innerText)
                                ].error.errorType1 = true;
                            } else if ($scope.test.columns) {
                                $scope.test.columns[i].error.errorType1 = true;
                                $scope.test.columns[
                                    arr1.indexOf($scope.arr[i].innerText)
                                ].error.errorType1 = true;
                            }
                        }
                        arr1.push($scope.arr[i].innerText);
                    }
                }
                //获取属性
                $scope.property = (data, pdata, event) => {
                    $scope.init();
                    if (!$scope.$$phase && !$scope.$root.$$phase) {
                        $scope.$digest();
                    }
                    $scope.parentData = pdata;
                    $scope.event = event;
                    $scope.test = data;
                    $scope.columnName =
                        data.name ||
                        (data.propertyDescribe &&
                            data.propertyDetail.localeStringMap.en_US) ||
                        "";
                    $scope.SourceColumnVal = ""; //每次清空
                    switch ($scope.whichTypes($scope.test)) {
                        case "维度":
                        case "度量值":
                            break;
                        case "维度值":
                            $scope.nameShow = true;
                            $scope.nameExp = "维度名";
                            break;
                        case "层级":
                            $scope.nameShow = true;
                            $scope.nameExp = "层级名";
                            break;
                        case "级别":
                            $scope.nameExp = "级别名";
                            if (event.target.className.indexOf("hover") >= 0) {
                                if (
                                    event.target.parentNode.previousSibling ==
                                        null &&
                                    event.target.parentNode.nextSibling == null
                                ) {
                                    $scope.tag = true;
                                } else {
                                    $scope.tag = false;
                                }
                            } else {
                                if (
                                    event.target.parentNode.parentNode
                                        .previousSibling == null &&
                                    event.target.parentNode.parentNode
                                        .nextSibling == null
                                ) {
                                    $scope.tag = true;
                                } else {
                                    $scope.tag = false;
                                }
                            }
                            if (
                                data.referenceColumn.length > 0 &&
                                ((data.propertyList &&
                                    data.propertyList.length > 0) ||
                                    !$scope.tag)
                            ) {
                                if (
                                    data.sourceTable &&
                                    data.sourceTable.length > 0
                                ) {
                                    $scope.SourceColumn = $scope.getAreaTable(
                                        data.sourceTable
                                    );
                                } else {
                                    if (
                                        event.target.className.indexOf(
                                            "hover"
                                        ) >= 0
                                    ) {
                                        if (
                                            $scope.event.target.parentNode
                                                .parentNode.previousSibling.data
                                                .sourceTable &&
                                            $scope.event.target.parentNode
                                                .parentNode.previousSibling.data
                                                .sourceTable.length > 0
                                        ) {
                                            //$scope.areaTag = true;
                                            $scope.SourceColumn = $scope.getAreaTable(
                                                $scope.event.target.parentNode
                                                    .parentNode.previousSibling
                                                    .data.sourceTable
                                            );
                                        } else {
                                            $scope.SourceColumn =
                                                $scope.SourceColumn1;
                                            //$scope.areaTag = false;
                                        }
                                    } else {
                                        if (
                                            $scope.event.target.parentNode
                                                .parentNode.parentNode
                                                .previousSibling.data
                                                .sourceTable &&
                                            $scope.event.target.parentNode
                                                .parentNode.parentNode
                                                .previousSibling.data
                                                .sourceTable.length > 0
                                        ) {
                                            //$scope.areaTag = true;
                                            $scope.SourceColumn = $scope.getAreaTable(
                                                $scope.event.target.parentNode
                                                    .parentNode.parentNode
                                                    .previousSibling.data
                                                    .sourceTable
                                            );
                                        } else {
                                            $scope.SourceColumn =
                                                $scope.SourceColumn1;
                                            //$scope.areaTag = false;
                                        }
                                    }
                                }
                            } else {
                                if (data.referenceColumn.length <= 0) {
                                    if (
                                        (data.propertyList &&
                                            data.propertyList.length > 0) ||
                                        !$scope.tag
                                    ) {
                                        if (
                                            event.target.className.indexOf(
                                                "hover"
                                            ) >= 0
                                        ) {
                                            if (
                                                $scope.event.target.parentNode
                                                    .parentNode.previousSibling
                                                    .data.sourceTable &&
                                                $scope.event.target.parentNode
                                                    .parentNode.previousSibling
                                                    .data.sourceTable.length > 0
                                            ) {
                                                //$scope.areaTag = true;
                                                $scope.SourceColumn = $scope.getAreaTable(
                                                    $scope.event.target
                                                        .parentNode.parentNode
                                                        .previousSibling.data
                                                        .sourceTable
                                                );
                                            } else {
                                                //$scope.areaTag = false;
                                                $scope.SourceColumn =
                                                    $scope.SourceColumn1;
                                            }
                                        } else {
                                            if (
                                                $scope.event.target.parentNode
                                                    .parentNode.parentNode
                                                    .previousSibling.data
                                                    .sourceTable &&
                                                $scope.event.target.parentNode
                                                    .parentNode.parentNode
                                                    .previousSibling.data
                                                    .sourceTable.length > 0
                                            ) {
                                                //$scope.areaTag = true;
                                                $scope.SourceColumn = $scope.getAreaTable(
                                                    $scope.event.target
                                                        .parentNode.parentNode
                                                        .parentNode
                                                        .previousSibling.data
                                                        .sourceTable
                                                );
                                            } else {
                                                //$scope.areaTag = false;
                                                $scope.SourceColumn =
                                                    $scope.SourceColumn1;
                                            }
                                        }
                                    } else {
                                        //$scope.areaTag = false;
                                        $scope.SourceColumn =
                                            $scope.SourceColumn1;
                                    }
                                } else {
                                    //$scope.areaTag = false;
                                    $scope.SourceColumn = $scope.SourceColumn1;
                                }
                            }
                            $scope.havingUniqueMembers =
                                data.havingUniqueMembers;
                            for (
                                var m = 0, mlen = $scope.SourceColumn.length;
                                m < mlen;
                                m++
                            ) {
                                if (
                                    $scope.SourceColumn[m].name ==
                                        data.referenceColumn &&
                                    $scope.SourceColumn[m].tb ==
                                        data.sourceTable
                                ) {
                                    $scope.SourceColumnVal =
                                        $scope.SourceColumn[m];
                                    break;
                                }
                            }
                            //$scope.SourceColumnVal = data.referenceColumn;
                            $scope.paixuVal = data.referenceOrdinalColumn
                                ? data.referenceOrdinalColumn
                                : "";
                            $scope.sourceShow = true;
                            $scope.nameShow = true;
                            $scope.uniqueShow = true;
                            $scope.paixuShow = true;
                            break;
                        case "属性":
                            $scope.nameExp = "属性名";
                            $scope.sourceShow = true;
                            $scope.nameShow = true;
                            $scope.des = true;
                            $scope.propertyDes =
                                data.propertyDescribe.localeStringMap.en_US;
                            if (event.target.className.indexOf("hover") >= 0) {
                                if (
                                    $scope.event.target.parentNode.parentNode
                                        .previousSibling.data.sourceTable &&
                                    $scope.event.target.parentNode.parentNode
                                        .previousSibling.data.sourceTable
                                        .length > 0
                                ) {
                                    $scope.SourceColumn = $scope.getAreaTable(
                                        $scope.event.target.parentNode
                                            .parentNode.previousSibling.data
                                            .sourceTable
                                    );
                                } else {
                                    $scope.SourceColumn = $scope.SourceColumn1;
                                }
                            } else {
                                if (
                                    $scope.event.target.parentNode.parentNode
                                        .parentNode.previousSibling.data
                                        .sourceTable &&
                                    $scope.event.target.parentNode.parentNode
                                        .parentNode.previousSibling.data
                                        .sourceTable.length > 0
                                ) {
                                    $scope.SourceColumn = $scope.getAreaTable(
                                        $scope.event.target.parentNode
                                            .parentNode.parentNode
                                            .previousSibling.data.sourceTable
                                    );
                                } else {
                                    $scope.SourceColumn = $scope.SourceColumn1;
                                }
                            }
                            if (
                                data.propertySource &&
                                data.propertySource.length > 0
                            ) {
                                var t =
                                    data.propertySource[0].toUpperCase() +
                                    data.propertySource
                                        .substring(1)
                                        .replace(/_/g, " ");
                                for (
                                    var m = 0,
                                        mlen = $scope.SourceColumn.length;
                                    m < mlen;
                                    m++
                                ) {
                                    if ($scope.SourceColumn[m].name == t) {
                                        $scope.SourceColumnVal =
                                            $scope.SourceColumn[m];
                                        break;
                                    }
                                }
                            } else {
                                $scope.SourceColumnVal = "";
                            }
                            break;
                        case "度量":
                            //ANALYTICS-2041
                            if (data.logicalColumn.formatString === "#") {
                                data.logicalColumn.formatString = "NONE";
                            }
                            $scope.nameExp = "显示名";
                            $scope.sourceShow = true;
                            $scope.nameShow = true;
                            $scope.juheShow = true;
                            $scope.geshihuaShow = true;
                            $scope.geshihuaVal =
                                data.logicalColumn.formatString || "NONE";
                            for (
                                let i = 0, len = $scope.leftColum.length;
                                i < len;
                                i++
                            ) {
                                if (
                                    $scope.leftColum[i].tableName ==
                                    $scope.data.analysisModel.logicalTable
                                        .sourceTable
                                ) {
                                    //$scope.SourceColumn = $scope.leftColum[i].sqlPhysicalColumns;
                                    $scope.SourceColumn = [];
                                    for (
                                        var j = 0,
                                            jlen =
                                                $scope.leftColum[i]
                                                    .sqlPhysicalColumns.length;
                                        j < jlen;
                                        j++
                                    ) {
                                        var d = {
                                            tb: $scope.leftColum[i].tableName,
                                            name:
                                                $scope.leftColum[i]
                                                    .sqlPhysicalColumns[j].name
                                        };
                                        $scope.SourceColumn.push(d);
                                    }
                                    //$scope.SourceColumnVal = data.logicalColumn.column;
                                    //$scope.SourceColumnVal = v;
                                    for (
                                        var m = 0,
                                            mlen = $scope.SourceColumn.length;
                                        m < mlen;
                                        m++
                                    ) {
                                        if (
                                            $scope.SourceColumn[m].name ==
                                            data.logicalColumn.column
                                        ) {
                                            $scope.SourceColumnVal =
                                                $scope.SourceColumn[m];
                                            break;
                                        }
                                    }
                                    break;
                                }
                            }
                            if (
                                data.logicalColumn.column &&
                                data.logicalColumn.column.length > 0
                            ) {
                                if (data.logicalColumn.type == "NUMERIC") {
                                    $scope.juhe = [
                                        "SUM",
                                        "AVERAGE",
                                        "MINIMUM",
                                        "MAXIMUM",
                                        "COUNT",
                                        "COUNT_DISTINCT"
                                    ];
                                } else {
                                    $scope.juhe = ["COUNT", "COUNT_DISTINCT"];
                                }
                            } else {
                                $scope.juhe = [];
                            }
                            $scope.juheVal =
                                data.logicalColumn.aggregationType ||
                                $scope.juhe[0];
                            break;
                        case "分组":
                            $scope.metaGroupShow = true;
                            $scope.nameExp = "分组名";
                            break;
                        case "字段":
                            $scope.nameExp = "字段名";
                            $scope.isNumberLize = data.type == "NUMERIC";
                            $scope.labelType = data.type;
                            $scope.id = data.id;
                            $scope.numberLizeValue =
                                data.formatMask === "#"
                                    ? "NONE"
                                    : data.formatMask;
                            $scope.metaLabelShow = true;
                            $scope.sourceColumn =
                                data.sourceTable +
                                "#" +
                                data.sourceColumn +
                                "#" +
                                data.type;
                            let cat = {};
                            $scope.SourceColumn1.forEach(el => {
                                if (!cat[el.tb]) {
                                    cat[el.tb] = { name: el.tb, cat: [] };
                                }

                                cat[el.tb].cat.push(el);
                            });
                            $scope.sourceColumnCat = cat;
                            break;
                    }
                    $scope.errInfo(data);
                    if (!$scope.drag && myBrowser() !== "IE") {
                        if (!$scope.$$phase && !$scope.$root.$$phase) {
                            $scope.$apply();
                        }
                    }
                };
                $scope.sourceColumn = "";
                //遍历scope.data  找到id  并给Soucecolumn赋值
                $scope.changeSourceColumn = (id, data) => {
                    if ($scope.test.type == "NUMERIC") {
                        $scope.numberLizeValue = "NONE";
                    }
                    if (data.split("#")[2] == "NUMERIC") {
                        $scope.numberLizeValue = "NONE";
                    }
                    $scope.labelType = data.split("#")[2];
                    $scope.isNumberLize = data.split("#")[2] == "NUMERIC";
                    $scope.test.error.errorType2 = false;
                    $scope.test.formatMask = $scope.numberLizeValue;
                    let categories = $scope.data.metadataModel.categories;
                    //获取category的长度
                    let categoryLength = categories.length;
                    for (let i = 0; i < categoryLength; i++) {
                        for (let j = 0; j < categories[i].columns.length; j++) {
                            if (id == categories[i].columns[j].id) {
                                categories[i].columns[j].type = data.split(
                                    "#"
                                )[2];
                                categories[i].columns[
                                    j
                                ].sourceColumn = data.split("#")[1];
                                categories[i].columns[
                                    j
                                ].sourceTable = data.split("#")[0];
                            }
                        }
                    }
                    $scope.judge($scope.whichTypes($scope.test));
                };

                //业务数据集手动添加字段
                $scope.changeSourceColumnChoosed = (id, data, type) => {
                    $(".addedChooseList select").css({
                        "border-color": "#ccc"
                    });
                    $(".addedChooseList .errorTips1").text("");
                    $scope.choosedColumnId = id;
                    $scope.choosedColumnData = data;
                    $scope.choosedTable = $scope.choosedColumnData.split(
                        "#"
                    )[0];
                    $scope.choosedColumn = $scope.choosedColumnData.split(
                        "#"
                    )[1];
                    $scope.choosedColumnType = $scope.choosedColumnData.split(
                        "#"
                    )[2];
                };

                //除掉中途添加的无用字段error
                $scope.kickError = d => {
                    for (let i in d) {
                        if (Object.hasOwnProperty.call(d, i)) {
                            delete d.error;
                            if (typeof d[i] == "object") {
                                $scope.kickError(d[i]);
                            }
                        }
                    }
                };

                //保存数据
                $scope.saveData = () => {
                    if ($(".mainItemCenter .error").length > 0) {
                        tips("无法保存出现错误的模型！");
                        return;
                    }
                    $rootScope.globalLoading(true);
                    //这里需要对$scope.data中的error进行提出
                    $scope.kickError($scope.data);
                    listDatabase
                        .saveData($scope.data, $scope.saveName, $scope.datas)
                        .then(
                            data => {
                                $rootScope.globalLoading(false);
                                tips("保存成功！");
                                $scope.closeAgile();
                                $(".popup exist-data").addClass("popupHide");
                                $(".popup").hide();

                                //通知dashbord业务数据集已经更新
                                $("iframe.cde:visible").each(function() {
                                    try {
                                        let data = {
                                            type: "DATASET_UPDATED",
                                            data: {
                                                name: $scope.saveName
                                            }
                                        };
                                        data = JSON.stringify(data);
                                        this.contentWindow.postMessage( data, "*" );
                                    } catch (error) {
                                        console.log(error);
                                    }
                                });
                            },
                            data => {
                                $rootScope.globalLoading(false);
                                tips("保存失败！");
                                $scope.closeAgile();
                                $(".popup exist-data").addClass("popupHide");
                                $(".popup").hide();
                            }
                        );
                };

                $rootScope.$on("editContentUpdate", function(event, data) {
                    closeLoading();

                    $scope.init();
                    $scope.Tab1normal = true;
                    if (data.analysisModel) {
                        $scope.st = data.analysisModel.logicalTable.sourceTable;
                    }else{
                        $scope.st = "";
                    }

                    $scope.data = data;

                    if (data.analysisModel != null) {
                        $scope.datas = [
                            {
                                children:
                                    data.analysisModel.olapDimensionUsages,
                                name: "维度"
                            },
                            {
                                children: data.analysisModel.olapMeasures,
                                name: "度量值"
                            }
                        ];
                        $("#mainItemBody0").empty();
                        new Tree($scope.datas, "mainItemBody0", 1);
                        $scope.switchTab(0);
                    } else {
                        $scope.Tab1normal = false;
                        $scope.switchTab(1);
                    }

                    //业务数据集暂时先不做自动填充
                    if ($scope.add !== 2 && $scope.add !== 3) {
                        $("#mainItemBody1").empty();
                        new Tree2(
                            [
                                {
                                    name: "所有分组",
                                    children: data.metadataModel.categories
                                }
                            ],
                            "mainItemBody1",
                            1
                        );
                    }
                });
                $rootScope.$on("editContent1Update", function(event, data) {
                    $("#mainItemBody").empty();
                    new Tree1(data[0].sqlPhysicalTables, "mainItemBody");
                    $scope.leftColum = data[0].sqlPhysicalTables;
                    $scope.SourceColumn1 = [];
                    $scope.SourceColumn = [];

                    for (
                        var i = 0, len = $scope.leftColum.length;
                        i < len;
                        i++
                    ) {
                        for (
                            var j = 0,
                                jlen =
                                    $scope.leftColum[i].sqlPhysicalColumns
                                        .length;
                            j < jlen;
                            j++
                        ) {
                            var data = {
                                tb: $scope.leftColum[i].tableName,
                                name:
                                    $scope.leftColum[i].sqlPhysicalColumns[j]
                                        .name,
                                type:
                                    $scope.leftColum[i].sqlPhysicalColumns[j]
                                        .dataType
                            };
                            $scope.SourceColumn1.push(data);
                        }
                    }
                });
                $rootScope.$on("liNameUpdate", function(event, data) {
                    $scope.saveName = data;
                });
                $rootScope.$on("updataUpdate1", function(event, data) {
                    $scope.saveName = data.args + ".xmi";
                });
            }
        ]);
}
