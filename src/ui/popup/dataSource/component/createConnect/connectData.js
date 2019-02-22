import $ from 'jquery';
import angular from 'angular';
import '../style/public.css';
import '../style/createConnect.css';
//import '../createModule/service.js';
import {tips} from  '../createModule/public';
{
    "use strict";
    const template = require('./connectData.html');
    angular.module("xdt/connectData",["xdt/service"])
        .directive('connectData',()=>{
            return {
                restrict: 'E',
                template: template,
                link() {
                    $('.connectData').on('keyup','.args1 .argsItem1 input,.args1 .argsItem2 input',function(){
                        angular.element(this).parent().find("p").addClass("warning");
                        this.classList.remove("tipsRed");
                    });
                }
            }
        })
        .factory("connectFactory",['$http','$q',($http,$q)=>{
            let service={};
            service.test=()=>{
                var result = true;
                var allInput=document.querySelectorAll(".args1 .argsItem1 input");
                for(var i=0;i<allInput.length;i++){
                    if(!allInput[i].value){
                        result = false;
                        angular.element(allInput[i]).parent().find("p").removeClass("warning");
                        allInput[i].classList.add("tipsRed");
                    }
                }
                var reg = /[\\/:;\?\+#%&\*\|\[\]]+/;
                var obj = document.querySelector(".args-name1 input").value;
                if(reg.test(obj)){
                    angular.element(allInput[0]).parent().find("p").removeClass("warning");
                    allInput[0].classList.add("tipsRed");
                    return false;
                }
                return result;
            };
            service.test1=()=>{
                var result = true;
                var allInput=document.querySelectorAll(".args1 .argsItem2 input");
                for(var i=0;i<allInput.length;i++){
                    if(!allInput[i].value){
                        result = false;
                        angular.element(allInput[i]).parent().find("p").removeClass("warning");
                        allInput[i].classList.add("tipsRed");
                    }
                }
                var reg = /[\\/:;\?\+#%&\*\|\[\]]+/;
                var obj = document.querySelector(".args-name1 input").value;
                if(reg.test(obj)){
                    angular.element(allInput[0]).parent().find("p").removeClass("warning");
                    allInput[0].classList.add("tipsRed");
                    return false;
                }
                return result;
            };
            service.resetValue = () => {
                  var allInput=document.querySelectorAll(".args1 .argsItem2 input");
                  for(var i=0;i<allInput.length;i++){
                    allInput[i].value = '';
                  }
                  document.querySelector(".args1 .database-username input").value = '';
                  document.querySelector(".args1 .database-password input").value = '';

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
        .controller("connectController",['$rootScope','$scope','$http','connectFactory',($rootScope,$scope,$http,connectFactory)=>{
            $scope.quoteAllFields=false;//为数据库对象加上定界符
            $scope.forcingIdentifiersToUpperCase=false;//强制使用大写
            $scope.forcingIdentifiersToLowerCase=false;//强制使用小写
            $scope.divLoading = false;
            var extraOptions={};
            $scope.changeInput=()=>{
                    $scope.data={
                        "id":$scope.id,
                        "quoteAllFields":$scope.quoteAllFields,//为数据库对象加上定界符
                        "forcingIdentifiersToUpperCase":$scope.forcingIdentifiersToUpperCase,//强制使用大写
                        "forcingIdentifiersToLowerCase":$scope.forcingIdentifiersToLowerCase,//强制使用小写
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
                        "connectionPoolingProperties":$scope.connectionPoolingProperties,
                        "extraOptions":extraOptions,
                        "accessType":"NATIVE",
                        "databaseType":{"defaultDatabasePort":$scope.port1,"extraOptionsHelpUrl":"http://dev.mysql.com/doc/refman/5.0/en/connector-j-reference-configuration-properties.html","name":$scope.name1,"shortName":$scope.shortname1,"supportedAccessTypes":$scope.supportedAccessTypes}
                    };
            };
            $scope.tr=[];
            //新建数据源连接
            $scope.$on("yhnCreateLink",function(d,data){
                //重置大小写
                $scope.forcingIdentifiersToUpperCase = false;
                $scope.forcingIdentifiersToLowerCase = false;
                //重置定界符
                $scope.quoteAllFields = false;
                //重置清空高级参数
                $scope.tr=[];//置空
                //清空表格所有数据
                $scope.connectName = "";//清空连接名称
                $scope.host = "";//清空主机名IP
                $scope.databaseName = "";//清空数据库名
                $scope.port = "";//清空端口号
                $scope.username = "";//清空用户名
                $scope.password = "";//清空密码
                if(document.querySelector(".main-left li.blueBG")){
                    document.querySelector(".main-left li.blueBG").classList.remove("blueBG");//清空数据库类型
                }
                if (!$scope.$$phase && !$scope.$root.$$phase) {
                    $scope.$apply();
                }
            })
            //高级设置监听Start
            $scope.$on("names",function(d,data){
                //获取数据库类型
                $rootScope.currentDataBaseType = data.databaseType.shortName;
                //获取大小写
                $scope.forcingIdentifiersToUpperCase = data.forcingIdentifiersToUpperCase;
                $scope.forcingIdentifiersToLowerCase = data.forcingIdentifiersToLowerCase;
                //获取定界符
                $scope.quoteAllFields = data.quoteAllFields;
                //设置连接池
                $scope.connectionPoolingProperties = data.connectionPoolingProperties;
                //设置高级参数
                $scope.tr=[];//置空
                //获取所有key值
                var keys = Object.keys(data.extraOptions);
                for(var i=0;i<keys.length;i++){
                    var temp = {};
                    var l = keys[i].split(".")[0].length;
                    temp.name = keys[i].substring(l+1);
                    temp.content = data.extraOptions[keys[i]];
                    $scope.tr.push(temp);
                }
                extraOptions = {};
                for(var i=0;i<$scope.tr.length;i++){
                    extraOptions[$rootScope.currentDataBaseType+"."+$scope.tr[i].name]=$scope.tr[i].content;
                }

            })
            //高级设置监听End

            $rootScope.$on('namesUpdate', function(event,data) {
                $scope.connectName=data.name;
                $scope.host=data.hostname;
                $scope.databaseName=data.databaseName;
                $scope.port=data.databasePort;
                $scope.username=data.username;
                $scope.password="";
                $scope.port1=data.databaseType.defaultDatabasePort;
                $scope.name1=data.databaseType.name;
                $scope.shortname1=data.databaseType.shortName;
                $scope.id=data.id;
                //$scope.supportedAccessTypes=$rootScope.typeList[i].supportedAccessTypes;
                //document.querySelector(".connectData .main-left select").value=data.databaseType.name;
                $scope.url= (data.attributes && data.attributes.CUSTOM_URL) ? data.attributes.CUSTOM_URL : "";
                $scope.qudong = (data.attributes && data.attributes.CUSTOM_DRIVER_CLASS) ? data.attributes.CUSTOM_DRIVER_CLASS : "";
         
                var dataTypeList = document.querySelectorAll(".connectData .main-left .myOption li");
                for(var i=0;i<dataTypeList.length;i++){
                    if(dataTypeList[i].innerHTML == data.databaseType.name){
                        dataTypeList[i].classList.add("blueBG");
                        
                        if(data.databaseType.name =="Generic database"){
                            $scope.visible=true;
                        }else{
                            $scope.visible=false;
                        }
                        return;
                    }
                }
                $scope.changeInput();
            });
            //$scope.databaseName="dw_market";
            //$scope.port="5029";
            //$scope.host="192.168.0.170";
            //$scope.name="666";
            //$scope.password="app";
            //$scope.username="app";
            $scope.init=()=>{
                $scope.visible=false;
                var allInput=document.querySelectorAll(".args1 .argsItem1 input");
                for(var j=0;j<allInput.length;j++){
                    $(allInput[j]).next('p').addClass('warning');
                    $(allInput[j]).removeClass('tipsRed');
                }
                connectFactory.resetValue();
                $scope.connectName="";
                $scope.host="";
                $scope.databaseName="";
                $scope.port="";
                $scope.username="";
                $scope.password="";
                $scope.port1="";
                $scope.name1="";
                $scope.shortname1="";
                $scope.id="";
                $scope.connectionPoolingProperties={};
                /*document.querySelector(".main-left select").value="";*/
                if(document.querySelector(".main-left li.blueBG")){
                    document.querySelector(".main-left li.blueBG").classList.remove("blueBG");
                }

            };
            $scope.close=()=>{
                document.querySelector('.connectData').style.display = 'block';
                document.querySelector(".connectData .title-name").innerHTML="新建数据源连接";
                document.querySelector('.popup create-connect').classList.add('popupHide');
                if($("exist-data").attr("class")=="popupHide"){
                    document.querySelector('.popup').style.display="none";
                }
                $scope.init();
            };
            $scope.advanceSet=()=>{
              document.querySelector('.hide-mask').style.display = 'block';

                document.querySelector('.hide-box').classList.remove('hide');
                /*alert*/
                document.querySelector('.advanced-set').classList.remove('hide');
                document.querySelector('.alert-box ').classList.add('hide');
            };
            //测试连接
            $scope.test=()=>{
                // document.querySelector('.hide-mask').style.display = 'block';
                // var type=document.querySelector(".main-left li.blueBG").innerHTML;
                var type= $(".main-left li.blueBG").text();
                //添加$scope.data
                $scope.data={
                    "id":$scope.id,
                    "quoteAllFields":$scope.quoteAllFields,//为数据库对象加上定界符
                    "forcingIdentifiersToUpperCase":$scope.forcingIdentifiersToUpperCase,//强制使用大写
                    "forcingIdentifiersToLowerCase":$scope.forcingIdentifiersToLowerCase,//为数据库对象加上定界符
                    "usingConnectionPool":$scope.name1 != 'Odps',
                    "connectSql":"",
                    "changed":true,
                    "databaseName":$scope.databaseName,
                    "databasePort":$scope.port,
                    "hostname":$scope.host,
                    "name":$scope.connectName,
                    "password":$scope.password,
                    "username":$scope.username,
                    "attributes":{},
                    "connectionPoolingProperties":$scope.connectionPoolingProperties,
                    "extraOptions":extraOptions,
                    "accessType":"NATIVE",
                    "databaseType":{"defaultDatabasePort":$scope.port1,"extraOptionsHelpUrl":"http://dev.mysql.com/doc/refman/5.0/en/connector-j-reference-configuration-properties.html","name":$scope.name1,"shortName":$scope.shortname1,"supportedAccessTypes":$scope.supportedAccessTypes}
                };
                if(type.length>0){
                    if(type=="Generic database"){
                        var result1=connectFactory.test1();
                        if(result1){
                            $scope.data.attributes= {"CUSTOM_URL": $scope.url, "CUSTOM_DRIVER_CLASS": $scope.qudong};
                            $scope.divLoading = true;
                            connectFactory.XHR('put','/xdatainsight/plugin/data-access/api/connection/test',$scope.data)
                                .then((data)=>{
                                    document.querySelector('.hide-mask').style.display = 'block';
                                    $scope.divLoading = false;
                                    document.querySelector(".alert-box .alert-main p").innerHTML="成功连接到数据库！";
                                    document.querySelector(".alert-img").classList.add("bg1");
                                    document.querySelector(".alert-img").classList.remove("bg2");
                                    document.querySelector('.hide-box').classList.remove('hide');
                                    document.querySelector('.alert-box').classList.remove('hide');
                                },(data)=>{
                                    document.querySelector('.hide-mask').style.display = 'block';
                                    $scope.divLoading = false;
                                    document.querySelector(".alert-box .alert-main p").innerHTML="连接数据库失败！";
                                    document.querySelector(".alert-img").classList.add("bg2");
                                    document.querySelector(".alert-img").classList.remove("bg1");
                                    document.querySelector('.hide-box').classList.remove('hide');
                                    document.querySelector('.alert-box').classList.remove('hide');
                                });
                        }else{
                            return false;
                        }
                    }else{
                        var result=connectFactory.test();
                        if(result){
                            var postData = JSON.parse(JSON.stringify($scope.data));
                            if(!$scope.data.id){
                                delete postData.id;
                                if(type=="MySQL" || type=="Hadoop Hive" ||type=="Hadoop Hive 2"){
                                    postData.connectionPoolingProperties = {validationQuery: "select 1", testOnBorrow: "true"};
                                }
                            }
                            $scope.divLoading = true;
                            connectFactory.XHR('put','/xdatainsight/plugin/data-access/api/connection/test',postData).then((data)=>{
                                    $scope.divLoading = false;
                                    document.querySelector('.hide-mask').style.display = 'block';
                                    document.querySelector(".alert-box .alert-main p").innerHTML="成功连接到数据库"+$scope.databaseName+"";
                                    document.querySelector(".alert-img").classList.add("bg1");
                                    document.querySelector(".alert-img").classList.remove("bg2");
                                    document.querySelector('.hide-box').classList.remove('hide');
                                    document.querySelector('.alert-box').classList.remove('hide');
                                    document.querySelector('.advanced-set').classList.add('hide');
                                },(data)=>{
                                    $scope.divLoading = false;
                                    document.querySelector('.hide-mask').style.display = 'block';
                                    document.querySelector(".alert-box .alert-main p").innerHTML="连接数据库"+$scope.databaseName+"失败";
                                    document.querySelector(".alert-img").classList.add("bg2");
                                    document.querySelector(".alert-img").classList.remove("bg1");
                                    document.querySelector('.hide-box').classList.remove('hide');
                                    document.querySelector('.alert-box').classList.remove('hide');
                                    document.querySelector('.advanced-set').classList.add('hide');
                                });
                        }else{
                            return false;
                        }
                    }
                }else{
                    tips("选择一个数据库类型！");
                }
            };
            $scope.closeAlert=()=>{
                document.querySelector('.hide-mask').style.display = 'none';
                document.querySelector('.hide-box').classList.add('hide');
                document.querySelector('.advanced-set').classList.add('hide');
            };
            //现有数据源编辑完成
            $scope.complete=()=>{
                var type=$(".main-left li.blueBG").text();
                if(type.length>0){
                    if(type=="Generic database"){
                        var result1=connectFactory.test1();
                        if(result1){
                            //添加$scope.data
                            $scope.data={
                                "id":$scope.id,
                                "quoteAllFields":$scope.quoteAllFields,//为数据库对象加上定界符
                                "forcingIdentifiersToUpperCase":$scope.forcingIdentifiersToUpperCase,//强制使用大写
                                "forcingIdentifiersToLowerCase":$scope.forcingIdentifiersToLowerCase,//为数据库对象加上定界符
                                "usingConnectionPool":$scope.name1 != 'Odps',
                                "connectSql":"",
                                "changed":true,
                                "databaseName":$scope.databaseName,
                                "databasePort":$scope.port,
                                "hostname":$scope.host,
                                "name":$scope.connectName,
                                "password":$scope.password,
                                "username":$scope.username,
                                "attributes":{"CUSTOM_URL": $scope.url, "CUSTOM_DRIVER_CLASS": $scope.qudong},
                                "connectionPoolingProperties":$scope.connectionPoolingProperties,
                                "extraOptions":extraOptions,
                                "accessType":"NATIVE",
                                "databaseType":{"defaultDatabasePort":$scope.port1,"extraOptionsHelpUrl":"http://dev.mysql.com/doc/refman/5.0/en/connector-j-reference-configuration-properties.html","name":$scope.name1,"shortName":$scope.shortname1,"supportedAccessTypes":$scope.supportedAccessTypes}
                            };
                            connectFactory.XHR('put','/xdatainsight/plugin/data-access/api/connection/test',$scope.data)
                                .then((data)=>{
                                    connectFactory.XHR('get','/xdatainsight/plugin/data-access/api/connection/get?name='+$scope.connectName+'','')
                                        .then((data)=>{
                                            document.querySelector('.hide-mask').style.display = 'block';
                                            document.querySelector(".alert-fugai1").classList.remove("hide");
                                            document.querySelector(".fugai-input1 .cancel").onclick=function(){
                                                document.querySelector(".alert-fugai1").classList.add("hide");
                                                document.querySelector('.hide-mask').style.display = 'none';
                                            };
                                            document.querySelector(".alert-fugai1 .fugai-box .title-cancel").onclick = function () {
                                                document.querySelector(".alert-fugai1").classList.add("hide");
                                                document.querySelector('.hide-mask').style.display = 'none';
                                            };
                                            document.querySelector(".fugai-input1 .sure").onclick=function(){
                                                document.querySelector('.hide-mask').style.display = 'none';
                                                $scope.data.id=data.id;
                                                connectFactory.XHR('post','/xdatainsight/plugin/data-access/api/connection/update',$scope.data)
                                                    .then((data)=>{
                                                        tips("覆盖成功");
                                                        document.querySelector(".alert-fugai1").classList.add("hide");
                                                        document.querySelector('.popup create-connect').classList.add('popupHide');
                                                        document.querySelector('.popup').style.display="none";
                                                        $scope.init();
                                                    },(data)=>{
                                                        tips("覆盖失败");
                                                        document.querySelector('.popup create-connect').classList.add('popupHide');
                                                        document.querySelector('.popup').style.display="none";
                                                        $scope.init();
                                                    });
                                            }
                                        },(data)=>{
                                            //连接不存在，添加连接
                                            connectFactory.XHR('post','/xdatainsight/plugin/data-access/api/connection/add',$scope.data)
                                                .then((data)=>{
                                                    tips("新建成功");
                                                    document.querySelector('.popup create-connect').classList.add('popupHide');
                                                    document.querySelector('.popup').style.display="none";
                                                    $scope.init();
                                                },(data)=>{
                                                    tips("新建失败");
                                                    document.querySelector('.popup create-connect').classList.add('popupHide');
                                                    document.querySelector('.popup').style.display="none";
                                                    $scope.init();
                                                });
                                        });
                                },(data)=>{
                                    document.querySelector('.hide-mask').style.display = 'block';
                                    document.querySelector(".alert-box .alert-main p").innerHTML="连接失败！";
                                    document.querySelector(".alert-img").classList.add("bg2");
                                    document.querySelector(".alert-img").classList.remove("bg1");
                                    document.querySelector('.hide-box').classList.remove('hide');
                                    document.querySelector('.alert-box').classList.remove('hide');
                                });
                        }else{
                            return false;
                        }
                    }else{
                        var result=connectFactory.test();
                        if(result){
                            //添加$scope.data
                            $scope.data={
                                "id":$scope.id,
                                "quoteAllFields":$scope.quoteAllFields,//为数据库对象加上定界符
                                "forcingIdentifiersToUpperCase":$scope.forcingIdentifiersToUpperCase,//强制使用大写
                                "forcingIdentifiersToLowerCase":$scope.forcingIdentifiersToLowerCase,//为数据库对象加上定界符
                                "usingConnectionPool":$scope.name1 != 'Odps',
                                "connectSql":"",
                                "changed":true,
                                "databaseName":$scope.databaseName,
                                "databasePort":$scope.port,
                                "hostname":$scope.host,
                                "name":$scope.connectName,
                                "password":$scope.password,
                                "username":$scope.username,
                                "attributes":{},
                                "connectionPoolingProperties":$scope.connectionPoolingProperties,
                                "extraOptions":extraOptions,
                                "accessType":"NATIVE",
                                "databaseType":{"defaultDatabasePort":$scope.port1,"extraOptionsHelpUrl":"http://dev.mysql.com/doc/refman/5.0/en/connector-j-reference-configuration-properties.html","name":$scope.name1,"shortName":$scope.shortname1,"supportedAccessTypes":$scope.supportedAccessTypes}
                            };
                            //测试连接
                            var postData = JSON.parse(JSON.stringify($scope.data));
                            if(!$scope.data.id){
                                delete postData.id;
                                if(type=="MySQL" || type=="Hadoop Hive" ||type=="Hadoop Hive 2"){
                                    postData.connectionPoolingProperties = {validationQuery: "select 1", testOnBorrow: "true"};
                                }
                            }
                            connectFactory.XHR('put','/xdatainsight/plugin/data-access/api/connection/test',postData)
                                .then((data)=>{
                                    //测试参数
                                    connectFactory.XHR('post','/xdatainsight/plugin/data-access/api/connection/checkParams',postData)
                                        .then((data)=>{
                                            if($("exist-data").attr("class")=="popupHide"){
                                                connectFactory.XHR('get','/xdatainsight/plugin/data-access/api/connection/get?name='+$scope.connectName+'','')
                                                    .then((data)=>{
                                                        //获取返回的数据库类型
                                                        $rootScope.currentDataBaseType = data.databaseType.shortName;
                                                        document.querySelector(".alert-fugai1").classList.remove("hide");
                                                        document.querySelector(".fugai-input1 .cancel").onclick=function(){
                                                            document.querySelector(".alert-fugai1").classList.add("hide");
                                                        };
                                                        document.querySelector(".alert-fugai1 .fugai-box .title-cancel").onclick = function () {
                                                            document.querySelector(".alert-fugai1").classList.add("hide");
                                                        };
                                                        document.querySelector(".fugai-input1 .sure").onclick=function(){
                                                            //覆盖连接
                                                            $scope.data.id=data.id;
                                                            connectFactory.XHR('post','/xdatainsight/plugin/data-access/api/connection/update',postData)
                                                                .then((data)=>{
                                                                    //覆盖成功！
                                                                    tips("覆盖成功");
                                                                    document.querySelector(".alert-fugai1").classList.add("hide");
                                                                    document.querySelector('.popup create-connect').classList.add('popupHide');
                                                                    if(document.querySelector("exist-data").classList.value=="popupHide"){
                                                                        document.querySelector('.popup').style.display="none";
                                                                    }
                                                                    $scope.init();
                                                                },(data)=>{
                                                                    //覆盖失败！
                                                                    tips("覆盖失败");
                                                                    document.querySelector('.popup create-connect').classList.add('popupHide');
                                                                    if(document.querySelector("exist-data").classList.value=="popupHide"){
                                                                        document.querySelector('.popup').style.display="none";
                                                                    }
                                                                    $scope.init();
                                                                });
                                                        }
                                                    },(data)=>{
                                                        //连接不存在，添加连接
                                                        connectFactory.XHR('post','/xdatainsight/plugin/data-access/api/connection/add',postData)
                                                            .then((data)=>{
                                                                tips("新建成功");
                                                                document.querySelector('.popup create-connect').classList.add('popupHide');
                                                                document.querySelector('.popup').style.display="none";
                                                                $scope.init();
                                                            },(data)=>{
                                                                tips("新建失败");
                                                                document.querySelector('.popup create-connect').classList.add('popupHide');
                                                                document.querySelector('.popup').style.display="none";
                                                                $scope.init();
                                                            });
                                                    });
                                            }else{
                                                connectFactory.XHR('post','/xdatainsight/plugin/data-access/api/connection/update',postData)
                                                    .then((data)=>{
                                                        tips("更新成功！");
                                                        document.querySelector('.popup create-connect').classList.add('popupHide');
                                                        $rootScope.$emit("updata",1);
                                                    },(data)=>{

                                                    });
                                            }
                                        },(data)=>{
                                        });
                                },(data)=>{
                                    document.querySelector(".alert-box .alert-main p").innerHTML="连接数据库"+$scope.databaseName+"失败";
                                    document.querySelector(".alert-img").classList.add("bg2");
                                    document.querySelector(".alert-img").classList.remove("bg1");
                                    document.querySelector('.hide-box').classList.remove('hide');
                                    document.querySelector('.alert-box').classList.remove('hide');
                                    document.querySelector('.hide-mask').style.display = 'block';
                                });
                        }else{
                            return false;
                        }
                    }
                }else{
                    tips("选择一个数据库类型！");
                }
            };
            $scope.save=()=>{
                extraOptions = {};
                for(var i=0;i<$scope.tr.length;i++){
                    extraOptions[$rootScope.currentDataBaseType+"."+$scope.tr[i].name]=$scope.tr[i].content;
                }
                document.querySelector('.hide-mask').style.display = 'none';
                document.querySelector('.hide-box').classList.add('hide');
                document.querySelector('.advanced-set').classList.add('hide');
            };
            $scope.addArgs=()=>{
                var all=document.querySelectorAll(".connectData .advanced-set table tr");
                //取消参数个数的限制最多4个
                //if(all.length<5){
                    var node={"name":"","content":""};
                    $scope.tr.push(node);
                    //var height=document.getElementById("advanced-set").offsetHeight+20;
                    //document.getElementById("advanced-set").style.marginTop="-214px";
                //}
            };
            $scope.removeArgs=()=>{
                $scope.tr.splice($scope.index,1);
                setTimeout(function(){
                    //var height=document.getElementById("advanced-set").offsetHeight;
                   // document.getElementById("advanced-set").style.marginTop=-height/2+"px";
                },100)
            };
            $scope.setClass=(e,name)=>{
                $scope.indexName = name;
                $scope.index=e;
                var all=document.querySelectorAll(".connectData .advanced-set table tr");
                for(var i=0;i<all.length;i++){
                    if(i==e+1){
                        all[i].classList.add("active");
                    }else{
                        all[i].classList.remove("active");
                    }
                }
            };

            $scope.uporlow=(e)=>{
                if(e){
                    $scope.forcingIdentifiersToLowerCase=false;//强制使用小写
                }else{
                    $scope.forcingIdentifiersToUpperCase=false;//强制使用大写
                }
            };
            $rootScope.$on("dataBaseType",function(){
                connectFactory.XHR('get','/xdatainsight/plugin/data-access/api/dialect/getDatabaseTypes',"")
                    .then((data)=>{
                        $rootScope.typeList=data.dbTypes;
                    },(data)=>{

                    });
            })
            $scope.setType=(e,target)=>{

                var type=e;
                /*给选中li设置样式*/
                var liLength = document.querySelectorAll(".myOption li").length;
                for(var i =0; i<liLength;i++){
                    document.querySelectorAll(".myOption li")[i].classList.remove("blueBG");
                }
                target.target.classList.add("blueBG");

                if(type=="Generic database"){
                    $scope.visible=true;
                }else{
                    $scope.visible=false;
                }
                for(var i=0;i<$rootScope.typeList.length;i++){
                    if($rootScope.typeList[i].name==type){
                        $scope.port=$rootScope.typeList[i].defaultDatabasePort;
                        $scope.port1=$rootScope.typeList[i].defaultDatabasePort;
                        $scope.name1=$rootScope.typeList[i].name;
                        $scope.shortname1=$rootScope.typeList[i].shortName;
                        $scope.supportedAccessTypes=$rootScope.typeList[i].supportedAccessTypes;
                    }
                }
                    $scope.data={
                        "id":$scope.id,
                        "quoteAllFields":$scope.quoteAllFields,//为数据库对象加上定界符
                        "forcingIdentifiersToUpperCase":$scope.forcingIdentifiersToUpperCase,//强制使用大写
                        "forcingIdentifiersToLowerCase":$scope.forcingIdentifiersToLowerCase,//强制使用小写
                        "usingConnectionPool":$scope.name1 != 'Odps',
                        "connectSql":"",
                        "changed":true,
                        "databaseName":$scope.databaseName,
                        "databasePort":$scope.port,
                        "hostname":$scope.host,
                        "name":$scope.connectName,
                        "password":$scope.password,
                        "username":$scope.username,
                        "attributes":{},
                        "connectionPoolingProperties":$scope.connectionPoolingProperties,
                        "extraOptions":extraOptions,
                        "accessType":"NATIVE",
                        "databaseType":{"defaultDatabasePort":$scope.port1,"extraOptionsHelpUrl":"http://dev.mysql.com/doc/refman/5.0/en/connector-j-reference-configuration-properties.html","name":$scope.name1,"shortName":$scope.shortname1,"supportedAccessTypes":$scope.supportedAccessTypes}
                    };
                $rootScope.currentDataBaseType = $scope.shortname1;
                //每次选择数据库就添加或者更改前缀
                extraOptions = {};
                for(var i=0;i<$scope.tr.length;i++){
                    extraOptions[$scope.shortname1+"."+$scope.tr[i].name]=$scope.tr[i].content;
                }
            };
        }])
}
