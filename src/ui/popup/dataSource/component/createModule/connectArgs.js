/**
 * Created by Administrator on 2016/6/30.
 */
import angular from 'angular';
import '../style/public.css';
import '../style/createModule.css';
//import './service';
import {closePopup,closeAlert,tips,init1,init2} from  './public';
{
    "use strict";
    const template = require('./connectArgs.html');
    angular.module("xdt/connectArgs", ["xdt/service"])
        .directive('connectArgs', ()=> {
            return {
                restrict: 'E',
                template: template,
                link() {
                    var allInput = document.querySelectorAll(".args .argsItem input");
                    for (var i = 0; i < allInput.length; i++) {
                        allInput[i].onkeyup = function () {
                            angular.element(this).parent().find("p").addClass("warning");
                            this.classList.remove("tipsRed");
                        };
                    }
                }
            }
        })
        .factory("argFactory", ['$http','$q',($http,$q)=> {
            let service = {};
            service.preStep = ()=> {
                document.querySelector(".createModel1").classList.remove("hide");
                document.querySelector(".connectArgs").classList.add("hide");
            };
            service.test = ()=> {
                var result = true;
                var allInput = document.querySelectorAll(".args .argsItem input");
                for (var i = 0; i < allInput.length; i++) {
                    if (!allInput[i].value) {
                        result = false;
                        angular.element(allInput[i]).parent().find("p").removeClass("warning");
                        allInput[i].classList.add("tipsRed");
                    }
                }
                var reg = /[\\/:;\?\+#%&\*\|\[\]]+/;
                var obj = document.querySelector(".args-name input").value;
                if (reg.test(obj)) {
                    result = false;
                    angular.element(allInput[0]).parent().find("p").removeClass("warning");
                    allInput[0].classList.add("tipsRed");
                    return false;
                }
                return result;
            };
            service.test1 = ()=> {
                var allInput = document.querySelectorAll(".args .argsItem1 input");
                for (var i = 0; i < allInput.length; i++) {
                    if (allInput[i].value) {

                    } else {
                        angular.element(allInput[i]).parent().find("p").removeClass("warning");
                        allInput[i].classList.add("tipsRed");
                        return false;
                    }
                }
                var reg = /[\\/]+/g;
                var obj = document.querySelector(".args-name input").value;
                if (reg.test(obj)) {
                    angular.element(allInput[0]).parent().find("p").removeClass("warning");
                    allInput[0].classList.add("tipsRed");
                    return false;
                }
                return true;
            };
            service.adSetting = ()=> {
                document.querySelector(".alert-ad").classList.remove("hide");
            };
            service.XHR=(method,url,data)=>{
                let deferred = $q.defer();
                $http({
                    method: method,
                    headers:{contentType: "application/json; charset=utf-8"},
                    url: url,
                    dataType: 'json',
                    data:data
                }).success((data)=>{
                    //已经存在
                    deferred.resolve(data);
                }).error((data)=>{
                    //没有存在
                    deferred.reject(data)
                });
                return deferred.promise;
            };
            return service;
        }])
        .controller("argCtr", ['$rootScope', '$scope', 'argFactory',($rootScope, $scope, argFactory)=> {
            $scope.quoteAllFields = false;
            $scope.forcingIdentifiersToUpperCase = false;
            $scope.forcingIdentifiersToLowerCase = false;
            $scope.divLoading = false;
            var extraOptions = {};
            $scope.tr = [];
            document.querySelector(".args-name input").value = "132456";
            
            $scope.init=()=>{
                $scope.connectName="";
                $scope.host="";
                $scope.databaseName="";
                $scope.port="";
                $scope.username="";
                $scope.password="";
                $scope.id="";
                $scope.$emit("advance",1);
            };

            $scope.freshMyData = function(){
                $scope.data={
                    "id":"",
                    "quoteAllFields":$scope.quoteAllFields,
                    "forcingIdentifiersToUpperCase":$scope.forcingIdentifiersToUpperCase,
                    "forcingIdentifiersToLowerCase":$scope.forcingIdentifiersToLowerCase,
                    "usingConnectionPool":true,
                    "connectSql":"",
                    "changed":true,
                    "databaseName":$scope.databaseName,
                    "databasePort":$scope.port,
                    "hostname":$scope.host,
                    "name":$scope.connectName,
                    "password":$scope.password,
                    "username":$scope.username,
                    "attributes":{},
                    "connectionPoolingProperties":{},
                    "extraOptions":extraOptions,
                    "accessType":"NATIVE",
                    "databaseType":{"defaultDatabasePort":$rootScope.port1,"extraOptionsHelpUrl":"http://dev.mysql.com/doc/refman/5.0/en/connector-j-reference-configuration-properties.html","name":$rootScope.name1,"shortName":$rootScope.shortname1,"supportedAccessTypes":$rootScope.supportedAccessTypes}
                };
            }
            $scope.changeInput=()=>{
                $scope.data={
                    "id":"",
                    "quoteAllFields":$scope.quoteAllFields,
                    "forcingIdentifiersToUpperCase":$scope.forcingIdentifiersToUpperCase,
                    "forcingIdentifiersToLowerCase":$scope.forcingIdentifiersToLowerCase,
                    "usingConnectionPool":true,
                    "connectSql":"",
                    "changed":true,
                    "databaseName":$scope.databaseName,
                    "databasePort":$scope.port,
                    "hostname":$scope.host,
                    "name":$scope.connectName,
                    "password":$scope.password,
                    "username":$scope.username,
                    "attributes":{},
                    "connectionPoolingProperties":{},
                    "extraOptions":extraOptions,
                    "accessType":"NATIVE",
                    "databaseType":{"defaultDatabasePort":$rootScope.port1,"extraOptionsHelpUrl":"http://dev.mysql.com/doc/refman/5.0/en/connector-j-reference-configuration-properties.html","name":$rootScope.name1,"shortName":$rootScope.shortname1,"supportedAccessTypes":$rootScope.supportedAccessTypes}
                };
            };
            $scope.nextStep = ()=> {
                $scope.data={
                    "id":"",
                    "quoteAllFields":$scope.quoteAllFields,
                    "forcingIdentifiersToUpperCase":$scope.forcingIdentifiersToUpperCase,
                    "forcingIdentifiersToLowerCase":$scope.forcingIdentifiersToLowerCase,
                    "usingConnectionPool":true,
                    "connectSql":"",
                    "changed":true,
                    "databaseName":$scope.databaseName,
                    "databasePort":$scope.port,
                    "hostname":$scope.host,
                    "name":$scope.connectName,
                    "password":$scope.password,
                    "username":$scope.username,
                    "attributes":{},
                    "connectionPoolingProperties":{},
                    "extraOptions":extraOptions,
                    "accessType":"NATIVE",
                    "databaseType":{"defaultDatabasePort":$rootScope.port1,"extraOptionsHelpUrl":"http://dev.mysql.com/doc/refman/5.0/en/connector-j-reference-configuration-properties.html","name":$rootScope.name1,"shortName":$rootScope.shortname1,"supportedAccessTypes":$rootScope.supportedAccessTypes}
                };
                
                //test link
                var type = document.querySelector(".model-type").getAttribute("data-tag");
                
                //每次选择数据库就添加或者更改前缀
                extraOptions = {};
                for (var i = 0; i < $scope.tr.length; i++) {
                    extraOptions[$rootScope.shortname1+"."+$scope.tr[i].name]=$scope.tr[i].content;
                }
                $scope.data.extraOptions = extraOptions;

                if (type == "Generic database") {
                    var result1 = argFactory.test1();
                    if (result1) {
                        $scope.divLoading = true;
                        $scope.data.attributes= {"CUSTOM_URL": $scope.url, "CUSTOM_DRIVER_CLASS": $scope.qudong};
                        argFactory.XHR('put','/xdatainsight/plugin/data-access/api/connection/test',$scope.data)
                            .then((data)=> {
                                $scope.divLoading = false;
                                argFactory.XHR('get','/xdatainsight/plugin/data-access/api/connection/get?name='+$scope.connectName+'','')
                                    .then((data)=> {
                                                document.querySelector(".alert-fugai").classList.remove("hide");
                                                document.querySelector(".fugai-input .cancel").onclick = function () {
                                                    document.querySelector(".alert-fugai").classList.add("hide");
                                                };
                                                document.querySelector(".alert-fugai .fugai-box .title-cancel").onclick = function () {
                                                    document.querySelector(".alert-fugai").classList.add("hide");
                                                };
                                                document.querySelector(".fugai-input .sure").onclick = function () {
                                                    $scope.data.id=data.id;
                                                    argFactory.XHR('post','/xdatainsight/plugin/data-access/api/connection/update',$scope.data)
                                                        .then((data)=> {
                                                            //fugai success
                                                            document.querySelector(".alert-fugai").classList.add("hide");
                                                            //get moshi
                                                            argFactory.XHR('get','/xdatainsight/plugin/data-access/api/datasource/multitable/retrieveSchemas?connectionId='+$scope.connectName+'','')
                                                                .then((data)=> {
                                                                    $scope.$emit("moshi", data.Item);
                                                                    //get sheet
                                                                    argFactory.XHR('get','/xdatainsight/plugin/data-access/api/datasource/multitable/getDatabaseTables?connectionId='+$scope.connectName+'&schema='+data.Item[0]+'','')
                                                                        .then((data)=> {
                                                                            $scope.$emit("biao", data.Item);
                                                                            $scope.$emit("connectionId", $scope.connectName);
                                                                            document.querySelector(".modelQuery").classList.remove("hide");
                                                                            document.querySelector(".connectArgs").classList.add("hide");
                                                                            document.querySelector(".alert").classList.add("hide");
                                                                        }, (data)=> {
                                                                            //get sheet fail
                                                                        });
                                                                }, (data)=> {
                                                                    //get moshi fail
                                                                });
                                                        }, (data)=> {
                                                            //fugai fail
                                                        });
                                                }
                                            }, (data)=> {
                                                //link not exist  add link
                                        argFactory.XHR('post','/xdatainsight/plugin/data-access/api/connection/add',$scope.data)
                                            .then((data)=> {
                                                        //get moshi
                                                        argFactory.XHR('get','/xdatainsight/plugin/data-access/api/datasource/multitable/retrieveSchemas?connectionId='+$scope.connectName+'','')
                                                            .then((data)=> {
                                                                $scope.$emit("moshi", data.Item);
                                                                //get sheet
                                                                argFactory.XHR('get','/xdatainsight/plugin/data-access/api/datasource/multitable/getDatabaseTables?connectionId='+$scope.connectName+'&schema='+data.Item[0]+'','')
                                                                    .then((data)=> {
                                                                        $scope.$emit("biao", data.Item);
                                                                        $scope.$emit("connectionId", $scope.connectName);
                                                                        document.querySelector(".modelQuery").classList.remove("hide");
                                                                        document.querySelector(".connectArgs").classList.add("hide");
                                                                        document.querySelector(".alert").classList.add("hide");
                                                                    }, (data)=> {
                                                                        //get sheet fail
                                                                    });
                                                            }, (data)=> {
                                                                //get moshi fail
                                                            });
                                                    }, (data)=> {

                                            });
                                    });
                            }, (data)=> {
                                $scope.divLoading = false;
                                document.querySelector(".alert-close .alert-main p").innerHTML = "连接失败";
                                document.querySelector(".alert-close .imgbox").classList.add("bg2");
                                document.querySelector(".alert-close").classList.remove("hide");
                                document.querySelector(".alert-close .imgbox").classList.remove("bg1");
                            });
                    } else {
                        return false;
                    }
                }else {
                    var result = argFactory.test();
                    if (result) {
                        //测试连接
                        var postData = JSON.parse(JSON.stringify($scope.data));
                        if(!$scope.data.id){
                            delete postData.id;
                            if(type=="MySQL" || type=="Hadoop Hive" ||type=="Hadoop Hive 2"){
                                postData.connectionPoolingProperties = {validationQuery: "select 1", testOnBorrow: "true"};
                            }
                        }
                        $scope.divLoading = true;
                        argFactory.XHR('put','/xdatainsight/plugin/data-access/api/connection/test',postData)
                            .then((data)=> {
                                $scope.divLoading = false;
                                //测试参数
                                argFactory.XHR('post','/xdatainsight/plugin/data-access/api/connection/checkParams',postData)
                                    .then((data)=> {
                                        //是否存在连接
                                        argFactory.XHR('get','/xdatainsight/plugin/data-access/api/connection/get?name='+$scope.connectName+'','')
                                            .then((data)=> {
                                                //存在连接
                                                document.querySelector(".alert-fugai").classList.remove("hide");
                                                document.querySelector(".fugai-input .cancel").onclick = function () {
                                                    document.querySelector(".alert-fugai").classList.add("hide");
                                                };
                                                document.querySelector(".alert-fugai .fugai-box .title-cancel").onclick = function () {
                                                    document.querySelector(".alert-fugai").classList.add("hide");
                                                };
                                                document.querySelector(".fugai-input .sure").onclick = function () {
                                                    //覆盖连接
                                                    $scope.data.id=data.id;
                                                    argFactory.XHR('post','/xdatainsight/plugin/data-access/api/connection/update',postData)
                                                        .then((data)=> {
                                                            //覆盖成功
                                                            document.querySelector(".alert-fugai").classList.add("hide");
                                                            //获取模式
                                                            argFactory.XHR('get','/xdatainsight/plugin/data-access/api/datasource/multitable/retrieveSchemas?connectionId='+$scope.connectName+'','')
                                                                .then((data)=> {
                                                                    $scope.$emit("moshi", data.Item);
                                                                    //获取表
                                                                    argFactory.XHR('get','/xdatainsight/plugin/data-access/api/datasource/multitable/getDatabaseTables?connectionId='+$scope.connectName+'&schema='+data.Item[0]+'','')
                                                                        .then((data)=> {
                                                                            $scope.$emit("biao", data.Item);
                                                                            $scope.$emit("connectionId", $scope.connectName);
                                                                            document.querySelector(".modelQuery").classList.remove("hide");
                                                                            document.querySelector(".connectArgs").classList.add("hide");
                                                                            document.querySelector(".alert").classList.add("hide");
                                                                        }, (data)=> {
                                                                            //get sheet fail
                                                                        });
                                                                }, (data)=> {
                                                                    //get moshi fail
                                                                });
                                                        }, (data)=> {
                                                            //fugai fail
                                                        });
                                                }
                                            }, (data)=> {
                                                //link not exist  add link
                                                argFactory.XHR('post','/xdatainsight/plugin/data-access/api/connection/add',postData)
                                                    .then((data)=> {
                                                        //获取模式
                                                        argFactory.XHR('get','/xdatainsight/plugin/data-access/api/datasource/multitable/retrieveSchemas?connectionId='+$scope.connectName+'','')
                                                            .then((data)=> {
                                                                $scope.$emit("moshi", data.Item);
                                                                //获取表
                                                                argFactory.XHR('get','/xdatainsight/plugin/data-access/api/datasource/multitable/getDatabaseTables?connectionId='+$scope.connectName+'&schema='+data.Item[0]+'','')
                                                                    .then((data)=> {
                                                                        $scope.$emit("biao", data.Item);
                                                                        $scope.$emit("connectionId", $scope.connectName);
                                                                        document.querySelector(".modelQuery").classList.remove("hide");
                                                                        document.querySelector(".connectArgs").classList.add("hide");
                                                                        document.querySelector(".alert").classList.add("hide");
                                                                    }, (data)=> {
                                                                        //get sheet fail
                                                                    });
                                                            }, (data)=> {
                                                                //get moshi fail
                                                            });
                                                    }, (data)=> {

                                                    });
                                            });
                                    }, (data)=> {
                                    });
                            }, (data)=> {
                                $scope.divLoading = false;
                                document.querySelector(".alert-close .alert-main p").innerHTML = "连接数据库" + $scope.databaseName + "失败";
                                document.querySelector(".alert-close .imgbox").classList.add("bg2");
                                document.querySelector(".alert-close").classList.remove("hide");
                                document.querySelector(".alert-close .imgbox").classList.remove("bg1");
                            });
                    } else {
                        return false;
                    }
                }
            };
            $scope.preStep = ()=> {
                argFactory.preStep();
                init2();
                $scope.init();
            };
            $scope.testConn = ()=> {
                if(!$scope.data){
                    $scope.data = {};
                }
                var type = document.querySelector(".model-type").getAttribute("data-tag");

                //每次选择数据库就添加或者更改前缀
                extraOptions = {};
                for (var i = 0; i < $scope.tr.length; i++) {
                    extraOptions[$rootScope.shortname1+"."+$scope.tr[i].name]=$scope.tr[i].content;
                }
                $scope.data.extraOptions = extraOptions;

                if (type == "Generic database") {
                    var result1 = argFactory.test1();
                    if (result1) {
                        $scope.data.attributes= {"CUSTOM_URL": $scope.url, "CUSTOM_DRIVER_CLASS": $scope.qudong};
                        $scope.divLoading = true;
                        argFactory.XHR('put','/xdatainsight/plugin/data-access/api/connection/test',$scope.data)
                            .then((data)=> {
                                $scope.divLoading = false;
                                document.querySelector(".alert-close .alert-main p").innerHTML = "连接成功";
                                document.querySelector(".alert-close .imgbox").classList.add("bg1");
                                document.querySelector(".alert-close .imgbox").classList.remove("bg2");
                                document.querySelector(".alert-close").classList.remove("hide");
                            }, (data)=> {
                                $scope.divLoading = false;
                                document.querySelector(".alert-close .alert-main p").innerHTML = "连接失败";
                                document.querySelector(".alert-close .imgbox").classList.add("bg2");
                                document.querySelector(".alert-close").classList.remove("hide");
                                document.querySelector(".alert-close .imgbox").classList.remove("bg1");
                            });
                    } else {
                        return false;
                    }
                } else {
                    var result = argFactory.test();
                    if (result) {
                        var postData = JSON.parse(JSON.stringify($scope.data));
                        if(!$scope.data.id){
                            delete postData.id;
                            if(type=="MySQL" || type=="Hadoop Hive" ||type=="Hadoop Hive 2"){
                                postData.connectionPoolingProperties = {validationQuery: "select 1", testOnBorrow: "true"};
                            }
                        }
                        $scope.divLoading = true;
                        argFactory.XHR('put','/xdatainsight/plugin/data-access/api/connection/test',postData)
                            .then((data)=> {
                                $scope.divLoading = false;
                                document.querySelector(".alert-close .alert-main p").innerHTML = "成功连接到数据库" + $scope.databaseName + "";
                                document.querySelector(".alert-close .imgbox").classList.add("bg1");
                                document.querySelector(".alert-close .imgbox").classList.remove("bg2");
                                document.querySelector(".alert-close").classList.remove("hide");
                            }, (data)=> {
                                $scope.divLoading = false;
                                document.querySelector(".alert-close .alert-main p").innerHTML = "连接数据库" + $scope.databaseName + "失败";
                                document.querySelector(".alert-close .imgbox").classList.add("bg2");
                                document.querySelector(".alert-close .imgbox").classList.remove("bg1");
                                document.querySelector(".alert-close").classList.remove("hide");
                            });
                    } else {
                        return false;
                    }
                }

            };
            $scope.adSetting = ()=> {
                argFactory.adSetting();
            };
            $scope.close = ()=> {
                closePopup();
                init1();
                init2();
                $scope.init();
            };
            $scope.closeAlert = ()=> {
                closeAlert();
            };
            $scope.save = ()=> {
                extraOptions = {};
                for (var i = 0; i < $scope.tr.length; i++) {
                    extraOptions[$rootScope.shortname1+"."+$scope.tr[i].name]=$scope.tr[i].content;
                }
                $scope.data.extraOptions = extraOptions;
                closeAlert();
            };

            $scope.addArgs = ()=> {
                var all = document.querySelectorAll(".connectArgs .advanced-args table tr");
                //if (all.length < 5) {
                    var node = {"name": "", "content": ""};
                    $scope.tr.push(node);
                    //var height = document.getElementById("advancedSet").offsetHeight + 20;
                    //document.getElementById("advancedSet").style.marginTop = -height / 2 + "px";
                //}
            };
            $scope.setClass = (e)=> {
                $scope.index = e;
                var all = document.querySelectorAll(".connectArgs .advanced-args table tr");
                for (var i = 0; i < all.length; i++) {
                    if (i == e + 1) {
                        all[i].classList.add("active");
                    } else {
                        all[i].classList.remove("active");
                    }
                }
            };
            $scope.removeArgs = ()=> {
                $scope.tr.splice($scope.index, 1);
                // setTimeout(function () {
                //     var height = document.getElementById("advancedSet").offsetHeight;
                //     document.getElementById("advancedSet").style.marginTop = -height / 2 + "px";
                // }, 100)
            };
            $scope.uporlow = (e)=> {
                if (e) {
                    $scope.forcingIdentifiersToLowerCase = false;
                } else {
                    $scope.forcingIdentifiersToUpperCase = false;
                }
            };
            $scope.$on('advanceUpdate', function (event, data) {
                $scope.quoteAllFields = false;
                $scope.forcingIdentifiersToUpperCase = false;
                $scope.forcingIdentifiersToLowerCase = false;
                var extraOptions = {};
                $scope.tr = [];
            });
        }])
}

