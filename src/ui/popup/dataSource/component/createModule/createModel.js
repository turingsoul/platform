/**
 * Created by Administrator on 2016/6/27.
 */
import $ from "jquery";
import angular from "angular";
import "./modelQuery";
import "./connectArgs";
import "./modelSetting";
import "./parseFile";
import "./sheetRelation";
import "./service";
import "../style/public.css";
import "../style/createModule.css";
import { closePopup, tips, init1 } from "./public";

{
    ("use strict");
    const template = require("./createModel.html");

    
    function showNameErrorMsg(message){
        let $error = $(".model-name .errorMsg");
        $error.text(message);
        $(".model-name").addClass("tipsRed")
        
    }
    function hideNameErrorMsg(){
        let $error = $(".model-name .errorMsg");
        $error.text('');
        $(".model-name").removeClass("tipsRed")
    }

    function validName(){
        let value = $(".model-name input").val();
        let reg = /[\\/:;\?\+#%&\*\|\[\]]+/;
        value = $.trim(value);
        if(value === ''){
            showNameErrorMsg('名称不能为空');
            return false;
        }
        if(reg.test(value)){
            showNameErrorMsg('名称不能包含下列字符：\\/:;?+#%&*|[]');
            return false;
        }
        return true;
    }

    angular
        .module("xdt/createModel", [
            "xdt/modelQuery",
            "xdt/modelSetting",
            "xdt/parseFile",
            "xdt/sheetRelation",
            "xdt/connectArgs",
            "xdt/service"
        ])
        .directive("createModel", () => {
            return {
                restrict: "E",
                template: template,
                link() {
                    document.querySelector(".model-name input").onkeyup = function() {
                        //keyup不校验，点下一步统一校验
                        // let result = validName();
                        // if(result){
                            hideNameErrorMsg();
                            // document.querySelector(".model-name").classList.remove("tipsRed");
                        // }
                    };

                    var datatype = document.querySelector(
                        ".model-connect select"
                    );
                    var modeltype1 = document.querySelector(".model-type");
                    var modeltype2 = document.querySelector(".modelExist");
                    // change database type  change navbar
                    datatype.onchange = function() {
                        var val = this.value;
                        if (val == "0") {
                            modeltype1.classList.remove("hide");
                            modeltype2.classList.add("hide");
                        } else if (val == "1") {
                            modeltype2.classList.remove("hide");
                            modeltype1.classList.add("hide");
                        } else {
                            return;
                        }
                    };
                }
            };
        })
        .factory("modelFactory", [
            "$http",
            "$q",
            "$rootScope",
            ($http, $q, $rootScope) => {
                let service = {};
                //select database type
                service.setType = $event => {
                    var ele = document.querySelectorAll(".model-type li");
                    for (var i = 0; i < ele.length; i++) {
                        ele[i].classList.remove("active");
                    }
                    $event.target.classList.add("active");
                    var dataRole = angular.element($event.target).attr("data-role");
                    document.querySelector(".model-type").setAttribute("data-tag", dataRole);
                    return dataRole;
                };
                //next step
                service.nextStep = () => {
                    var tag = document.querySelector(".model-type");
                    if (angular.element(tag).attr("data-tag").length > 0) {
                        var type = document.querySelector(".model-type").getAttribute("data-tag");
                        if (
                            type == "MySQL" ||
                            type == "Oracle" ||
                            type == "MS SQL Server" ||
                            type == "H2" ||
                            type == "IBM DB2" ||
                            type == "spark" ||
                            type == "Generic database" ||
                            type == "Hadoop Hive 2"
                        ) {
                            document.querySelector(".createModel").classList.add("hide");
                            document.querySelector(".connectArgs").classList.remove("hide");
                        }
                        if (type == "csv" || type == "txt" || type == "excel") {
                            document.querySelector(".createModel").classList.add("hide");
                            document.querySelector(".parseFile").classList.remove("hide");
                        }
                        if (type == "csv") {
                            $(".data-list").css({ height: "279px" });
                            $(".excel-hide").removeClass("hide");
                            document.querySelector(".file-hide label input").setAttribute("accept", ".csv");
                            document.querySelector(".file-option").classList.remove("no-utf");
                        }
                        if (type == "txt") {
                            $(".data-list").css({ height: "279px" });
                            $(".excel-hide").removeClass("hide");
                            document.querySelector(".file-hide label input").setAttribute("accept", ".txt");
                            document.querySelector(".file-option").classList.remove("no-utf");
                        }
                        if (type == "excel") {
                            $(".excel-hide").addClass("hide");
                            $(".data-list").css({ height: "397px" });
                            document.querySelector(".file-hide label input").setAttribute("accept", ".xlsx,.xls");
                            document.querySelector(".file-option").classList.add("no-utf");
                        }
                        if (type == "Generic database") {
                            document.querySelector(".div1").classList.add("hide");
                            document.querySelector(".div2").classList.remove("hide");
                        } else {
                            document.querySelector(".div1").classList.remove("hide");
                            document.querySelector(".div2").classList.add("hide");
                        }
                        if (!type) {
                            type = "MySQL";
                        }
                        var len = $rootScope.typeList ? $rootScope.typeList.length : 0;
                        for (var i = 0; i < len; i++) {
                            if ($rootScope.typeList[i].name == type) {
                                $rootScope.port1 = $rootScope.typeList[i].defaultDatabasePort;
                                $rootScope.name1 = $rootScope.typeList[i].name;
                                $rootScope.shortname1 = $rootScope.typeList[i].shortName;
                                $rootScope.supportedAccessTypes = $rootScope.typeList[i].supportedAccessTypes;
                            }
                        }
                    } else {
                        tips("请选择一个类型数据库");
                    }
                };
                //existed list
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
                return service;
            }
        ])
        .controller("modelCtr", [
            "$rootScope",
            "$scope",
            "modelFactory",
            "myService",
            'listDatabase',
            ($rootScope, $scope, modelFactory, myService,listDatabase) => {
                //myService.getList()
                //    .then((data)=>{
                //        $scope.typeList=data.dbTypes;
                //    },(data)=>{
                //
                //    });
                $rootScope.$broadcast("dataBaseType");
                $scope.setType = $event => {
                    var type = modelFactory.setType($event);
                };
                $scope.$on("getJdbc", (d, data) => {
                    modelFactory
                        .callItunes(
                            "/xdatainsight/plugin/data-access/api/connection/list" +
                                "?t=" +
                                Date.parse(new Date())
                        )
                        .then(
                            data => {
                              function compare(obj1,obj2){
                                    var val1 = obj1.name;
                                    var val2 = obj2.name;
                                    if (val1 > val2) {
                                      return 1;
                                    } else if (val1 < val2) {
                                      return -1;
                                    } else {
                                      return 0;
                                    }
                                  }

                                 // data.databaseConnections.sort(compare);

                                $scope.jdbc = data;
                            },
                            data => {}
                        );
                    myService.getDataTypeFormatMapping().then(data => {
                        $rootScope.dataTypeFormatMapping = data;
                    });
                });
                var type = document.querySelector(".model-type").getAttribute("data-tag");

                //校验名称是否重复
                $scope.vaildNameRepeat = (name)=>{
                    return new Promise(function(resolve, reject){
                        listDatabase
                        .callItunes("/xdatainsight/plugin/xdf/api/metadata/list?t=" + Date.parse(new Date()))
                        .then(
                            data => {
                                let names;
                                if(!data){
                                    data = [];
                                }
                                names = data.map(item=>item.name.replace(/\.xmi/,''));
                                //名字不存在于已创建的数据集
                                if(names.indexOf(name) === -1){
                                    resolve();
                                }else{
                                    showNameErrorMsg('名称重复');
                                    reject();
                                }
                            },
                            error => {
                                tips("数据集名字查询失败");
                                reject(error);
                            }
                        );
                    });
                }
                $scope.nextStep = () => {
                    var modelName = document.querySelector(".myInput").value;
                    let result = validName();

                    //名字校验不通过
                    if(result !== true){
                        // document.querySelector(".model-name").classList.add("tipsRed");
                        return;
                    }

                    if (document.querySelector(".model-connect select").value == "0") {
                        $scope.$emit("sourceName", $scope.sourceName);
                        $scope.vaildNameRepeat(modelName).then(()=>{
                            modelFactory.nextStep();
                        });
                    } else if(document.querySelector(".modelExist select").value.length > 0){
                        $scope.vaildNameRepeat(modelName).then(()=>{
                            $scope.$emit("sourceName", $scope.sourceName);
                            var e = document.querySelector(".modelExist select").value;
                            $scope.$emit("biao", []);
                            myService.getMoshi(e).then(
                                data => {
                                    $scope.$emit("moshi", data.Item);
                                    //get sheet
                                    myService
                                        .getSheet(e, data.Item[0])
                                        .then(
                                            data => {
                                                $scope.$emit("biao",data.Item);
                                                $scope.$emit("connectionId",e);
                                                document.querySelector(".modelQuery").classList.remove("hide");
                                                document.querySelector(".createModel1").classList.add("hide");
                                                document.querySelector(".alert").classList.add("hide");
                                                //重置事实表
                                                document.querySelector(".factSheet").innerHTML ='<option value="0">未选择</option>';
                                            },
                                            data => {
                                                //get sheet fail
                                            }
                                        );
                                },
                                data => {
                                    //get moshi fail
                                }
                            );
                        });
                    }
                };
                $scope.close = () => {
                    closePopup();
                    init1();
                };
            }
        ]);
}
