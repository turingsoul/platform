/**
 * Created by Administrator on 2016/7/11.
 */
import {tips} from  './public';
import $ from 'jquery';
{
    "use strict";
    angular.module("xdt/service", [])
        .factory("myService",['$http','$q',($http,$q)=>{
            let service={};
            //database list
            service.getList=()=>{
                let deferred = $q.defer();
                $http({
                    method: 'get',
                    headers:{Accept: "application/json"},
                    url: "/xdatainsight/plugin/data-access/api/dialect/getDatabaseTypes",
                    dataType: 'json'
                }).success((data)=>{
                    //已经存在
                    deferred.resolve(data);
                }).error((data)=>{
                    //没有存在
                    deferred.reject(data);
                });
                return deferred.promise;
            };
            //get dataType format mapping
            service.getDataTypeFormatMapping = ()=>{
                let deferred = $q.defer();
                $http({
                    method : 'get',
                    headers: {Accept:'application/json'},
                    url:'/xdatainsight/plugin/data-access/api/datasource/csv/getDataTypeFormatMapping',
                    dataType :'json'
                }).success((data)=>{
                    deferred.resolve(data);
                }).error((data)=>{
                    deferred.reject(data);
                });
                return deferred.promise;
            };
            //test link
            service.connTest=(arg1,arg2,arg3,arg4,arg5,arg6,arg7,arg8,arg9,arg10,arg11,arg12,arg13,arg14)=>{
                var url="/xdatainsight/plugin/data-access/api/connection/test";
                let deferred = $q.defer();
                var data={
                    "quoteAllFields":arg7,
                    "forcingIdentifiersToUpperCase":arg8,
                    "forcingIdentifiersToLowerCase":arg9,
                    "usingConnectionPool":true,
                    "connectSql":"",
                    "databaseName":arg1,
                    "databasePort":arg2,
                    "hostname":arg3,
                    "name":arg4,
                    "password":arg5,
                    "username":arg6,
                    "attributes":{},
                    "connectionPoolingProperties":{},
                    "extraOptions":arg10,
                    "accessType":"NATIVE",
                    "databaseType":{"defaultDatabasePort":arg14,"extraOptionsHelpUrl":"http://dev.mysql.com/doc/refman/5.0/en/connector-j-reference-configuration-properties.html","name":arg11,"shortName":arg12,"supportedAccessTypes":arg13}
                };

                $http({
                    method: 'put',
                    headers:{contentType: "application/json; charset=utf-8"},
                    url: url,
                    dataType: 'json',
                    data: data
                }).success((data)=>{
                    deferred.resolve("连接成功");
                }).error((data)=>{
                    deferred.reject("连接失败");
                });
                return deferred.promise;
            };
            service.connTest1=(arg1,arg2,arg3,arg4,arg5,arg6,arg7,arg8,arg9)=>{
                var url="/xdatainsight/plugin/data-access/api/connection/test";
                let deferred = $q.defer();
                var data = {
                    "quoteAllFields":arg6,
                    "forcingIdentifiersToUpperCase":arg7,
                    "forcingIdentifiersToLowerCase":arg8,
                    "usingConnectionPool": true,
                    "connectSql": "",
                    "name": arg1,
                    "password": arg4,
                    "username": arg5,
                    "attributes": {
                        "CUSTOM_URL": arg2,
                        "CUSTOM_DRIVER_CLASS": arg3
                    },
                    "connectionPoolingProperties": {},
                    "extraOptions": arg9,
                    "accessType": "NATIVE",
                    "databaseType": {
                        "defaultDatabasePort": -1,
                        "name": "Generic database",
                        "shortName": "GENERIC",
                        "supportedAccessTypes": ["NATIVE", "ODBC", "JNDI"]
                    }
                };
                $http({
                    method: 'put',
                    headers:{contentType: "application/json; charset=utf-8"},
                    url: url,
                    dataType: 'json',
                    data: data
                }).success((data)=>{
                    deferred.resolve("连接成功");
                }).error((data)=>{
                    deferred.reject("连接失败");
                });
                return deferred.promise;
            };
            //if exist link
            service.existConn=(e)=>{
                let deferred = $q.defer();
                $http({
                    method: 'get',
                    headers:{Accept: "application/json"},
                    url: "/xdatainsight/plugin/data-access/api/connection/get?name="+e+"",
                    dataType: 'json'
                }).success((data)=>{
                    //已经存在
                    deferred.resolve(data);
                }).error((data)=>{
                    //没有存在
                    deferred.reject("没有存在")
                });
                return deferred.promise;
            };
            //fugai link
            service.resetConn=(arg1,arg2,arg3,arg4,arg5,arg6,arg7,arg8,arg9,arg10,arg11,arg12,arg13,arg14,arg15)=>{
                let deferred = $q.defer();
                var data={
                    "id":arg15,
                    //"quoteAllFields":arg7,
                    //"forcingIdentifiersToUpperCase":arg8,
                    //"forcingIdentifiersToLowerCase":arg9,
                    "usingConnectionPool":true,
                    "connectSql":"",
                    "changed":true,
                    "databaseName":arg1,
                    "databasePort":arg2,
                    "hostname":arg3,
                    "name":arg4,
                    "password":arg5,
                    "username":arg6,
                    "attributes":{},
                    "connectionPoolingProperties":{},
                    "extraOptions":arg10,
                    "accessType":"NATIVE",
                    "databaseType":{"defaultDatabasePort":arg14,"extraOptionsHelpUrl":"http://dev.mysql.com/doc/refman/5.0/en/connector-j-reference-configuration-properties.html","name":arg11,"shortName":arg12,"supportedAccessTypes":arg13}
                };
                $http({
                    method: 'post',
                    headers:{Accept: "application/json"},
                    url: "/xdatainsight/plugin/data-access/api/connection/update",
                    dataType: 'json',
                    data: data
                }).success((data)=>{
                    deferred.resolve("覆盖成功");
                }).error((data)=>{
                    deferred.reject("覆盖失败");
                });
                return deferred.promise;
            };
            service.resetConn1=(arg1,arg2,arg3,arg4,arg5,arg6,arg7,arg8,arg9)=>{
                let deferred = $q.defer();
                var data = {
                    "quoteAllFields":arg6,
                    "forcingIdentifiersToUpperCase":arg7,
                    "forcingIdentifiersToLowerCase":arg8,
                    "usingConnectionPool": true,
                    "connectSql": "",
                    "name": arg1,
                    "password": arg4,
                    "username": arg5,
                    "attributes": {
                        "CUSTOM_URL": arg2,
                        "CUSTOM_DRIVER_CLASS": arg3
                    },
                    "connectionPoolingProperties": {},
                    "extraOptions": arg9,
                    "accessType": "NATIVE",
                    "databaseType": {
                        "defaultDatabasePort": -1,
                        "name": "Generic database",
                        "shortName": "GENERIC",
                        "supportedAccessTypes": ["NATIVE", "ODBC", "JNDI"]
                    }
                };
                $http({
                    method: 'post',
                    headers:{Accept: "application/json"},
                    url: "/xdatainsight/plugin/data-access/api/connection/update",
                    dataType: 'json',
                    data: data
                }).success((data)=>{
                    deferred.resolve("覆盖成功");
                }).error((data)=>{
                    deferred.reject("覆盖失败");
                });
                return deferred.promise;
            };
            //get moshi
            service.getMoshi=(connectionId)=>{
                let deferred = $q.defer();
                connectionId = encodeURI(connectionId);
                $http({
                    method: 'get',
                    headers:{Accept: "application/json"},
                    url:"/xdatainsight/plugin/data-access/api/datasource/multitable/retrieveSchemas?connectionId="+connectionId+"",
                    dataType: 'json'
                }).success((data)=>{
                    deferred.resolve(data);
                }).error((data)=>{
                    deferred.reject(data)
                });
                return deferred.promise;
            };
            //get sheet
            service.getSheet=(connectionId,moshi)=>{
                let deferred = $q.defer();
                connectionId = encodeURI(connectionId);
                $http({
                    method: 'get',
                    headers:{Accept: "application/json"},
                    url:"/xdatainsight/plugin/data-access/api/datasource/multitable/getDatabaseTables?connectionId="+connectionId+"&schema="+moshi+"",
                    dataType: 'json'
                }).success((data)=>{

                  data.Item.sort(function(a,b) {
                      var value1 = a.substr(a.indexOf(".") + 1).replace(/`/g, "");
                      var value2 = b.substr(b.indexOf(".") + 1).replace(/`/g, "");
                      return value1 > value2 ? 1: -1;
                  });



                    deferred.resolve(data);
                }).error((data)=>{
                    deferred.reject(data);
                });
                return deferred.promise;
            };
            //add link
            service.addConn=(arg1,arg2,arg3,arg4,arg5,arg6,arg7,arg8,arg9,arg10,arg11,arg12,arg13,arg14)=>{
                let deferred = $q.defer();
                var url="/xdatainsight/plugin/data-access/api/connection/add";
                var data={
                    "quoteAllFields":arg7,
                    "forcingIdentifiersToUpperCase":arg8,
                    "forcingIdentifiersToLowerCase":arg9,
                    "usingConnectionPool":true,
                    "connectSql":"",
                    "databaseName":arg1,
                    "databasePort":arg2,
                    "hostname":arg3,
                    "name":arg4,
                    "password":arg5,
                    "username":arg6,
                    "attributes":{},
                    "connectionPoolingProperties":{},
                    "extraOptions":arg10,
                    "accessType":"NATIVE",
                    "databaseType":{"defaultDatabasePort":arg14,"extraOptionsHelpUrl":"http://dev.mysql.com/doc/refman/5.0/en/connector-j-reference-configuration-properties.html","name":arg11,"shortName":arg12,"supportedAccessTypes":arg13}
                };
                $http({
                    method: 'post',
                    headers:{contentType: "application/json; charset=utf-8"},
                    url: url,
                    dataType: 'json',
                    data: data
                }).success((data)=>{
                    deferred.resolve(data);
                }).error((data)=>{
                    deferred.reject(data)
                });
                return deferred.promise;
            };
            service.addConn1=(arg1,arg2,arg3,arg4,arg5,arg6,arg7,arg8,arg9)=>{
                let deferred = $q.defer();
                var url="/xdatainsight/plugin/data-access/api/connection/add";
                var data={
                    "quoteAllFields":arg6,
                    "forcingIdentifiersToUpperCase":arg7,
                    "forcingIdentifiersToLowerCase":arg8,
                    "usingConnectionPool":true,
                    "connectSql":"",
                    "name":arg1,
                    "password":arg4,
                    "username":arg5,
                    "attributes":{
                        "CUSTOM_URL":arg2,
                        "CUSTOM_DRIVER_CLASS":arg3
                    },
                    "connectionPoolingProperties":{},
                    "extraOptions":arg9,
                    "accessType":"NATIVE",
                    "databaseType":{"name":"Generic database","shortName":"GENERIC","supportedAccessTypes":["NATIVE","ODBC","JNDI"],"extraOptionsHelpUrl":null,"defaultDatabasePort":-1}
                };
                $http({
                    method: 'post',
                    headers:{contentType: "application/json; charset=utf-8"},
                    url: url,
                    dataType: 'json',
                    data: data
                }).success((data)=>{
                    deferred.resolve(data);
                }).error((data)=>{
                    deferred.reject(data)
                });
                return deferred.promise;
            };
            //check parm
            service.check=(arg1,arg2,arg3,arg4,arg5,arg6,arg7,arg8,arg9,arg10)=>{
                let deferred = $q.defer();
                var url="/xdatainsight/plugin/data-access/api/connection/checkParams";
                var data={
                    "quoteAllFields":arg7,
                    "forcingIdentifiersToUpperCase":arg8,
                    "forcingIdentifiersToLowerCase":arg9,
                    "usingConnectionPool":true,
                    "connectSql":"",
                    "databaseName":arg1,
                    "databasePort":arg2,
                    "hostname":arg3,
                    "name":arg4,
                    "password":arg5,
                    "username":arg6,
                    "attributes":{},
                    "connectionPoolingProperties":{},
                    "extraOptions":arg10,
                    "accessType":"NATIVE",
                    "databaseType":{"defaultDatabasePort":3306,"extraOptionsHelpUrl":"http://dev.mysql.com/doc/refman/5.0/en/connector-j-reference-configuration-properties.html","name":"MySQL","shortName":"MYSQL","supportedAccessTypes":["NATIVE","ODBC","JNDI"]}
                };
                $http({
                    method: 'post',
                    headers:{contentType: "application/json; charset=utf-8"},
                    url: url,
                    dataType: 'json',
                    data: data
                }).success((data)=>{
                    deferred.resolve(data);
                }).error((data)=>{
                    deferred.reject(data)
                });
                return deferred.promise;
            };
            service.check1=(arg1,arg2,arg3,arg4,arg5,arg6,arg7,arg8,arg9)=>{
                let deferred = $q.defer();
                var url="/xdatainsight/plugin/data-access/api/connection/checkParams";
                var data={
                    "quoteAllFields":arg6,
                    "forcingIdentifiersToUpperCase":arg7,
                    "forcingIdentifiersToLowerCase":arg8,
                    "usingConnectionPool":true,
                    "connectSql":"",
                    "name":arg1,
                    "password":arg4,
                    "username":arg5,
                    "attributes":{
                        "CUSTOM_URL":arg2,
                        "CUSTOM_DRIVER_CLASS":arg3
                    },
                    "connectionPoolingProperties":{},
                    "extraOptions":arg9,
                    "accessType":"NATIVE",
                    "databaseType":{"name":"Generic database","shortName":"GENERIC","supportedAccessTypes":["NATIVE","ODBC","JNDI"],"extraOptionsHelpUrl":null,"defaultDatabasePort":-1}
                };
                $http({
                    method: 'post',
                    headers:{contentType: "application/json; charset=utf-8"},
                    url: url,
                    dataType: 'json',
                    data: data
                }).success((data)=>{
                    deferred.resolve(data);
                }).error((data)=>{
                    deferred.reject(data)
                });
                return deferred.promise;
            };
            //get ziduan
            service.getZiduan=(connectionId,e,className)=>{
                $('.' + className +' .sheet-field-imgIcon').remove();
                className && $('.' + className).append('<div class="sheet-field-imgIcon">')
                let deferred = $q.defer();
                $http({
                    method: 'get',
                    headers:{Accept: "application/json"},
                    url:"/xdatainsight/plugin/data-access/api/datasource/multitable/getTableFields?connectionId="+connectionId+"&table="+e+"",
                    dataType: 'json'
                }).success((data)=>{
                    $('.' + className +' .sheet-field-imgIcon').remove();
                    deferred.resolve(data);
                }).error((data)=>{
                    $('.' + className +' .sheet-field-imgIcon').remove();
                    tips('无法读取元数据，请联系管理员');
                    deferred.reject(data);
                });
                return deferred.promise;
            };

            //commplete
            service.complete=(sourceName,connectionId)=>{
                var numRight=document.querySelectorAll(".sheet-right .rSheet option");
                // var numLeft=document.querySelectorAll(".relation-left .sheet-name option");
                var factNum=document.querySelectorAll(".relation-tips option");
                var factVal;
                var selectedTables=[];
                var joinRelationship=[];
                var data;
                var doOlap;
                //get fact sheet
                if(document.querySelector(".sheet-two .factSheet").value==0){
                    factVal=null;
                }else{
                    factVal=document.querySelector(".sheet-two .factSheet").value;
                }
                //get selected sheet
                for(var i=0;i<numRight.length;i++){
                    selectedTables.push(numRight[i].value);
                }
                //get link connection
                for(var j=0;j<factNum.length;j++){
                    var e=factNum[j].value;
                    var left = e.split("- INNER JOIN -")[0];
                    var right = e.split("- INNER JOIN -")[1];

                    var leftArr = left.split(".");
                    var leftLabel = leftArr[leftArr.length-1];
                    var leftSheet = left.substring(0, left.length - leftLabel.length -1);

                    var rightArr = right.split(".");
                    var rightLabel = rightArr[rightArr.length-1];
                    var rightSheet = right.substring(0, right.length - rightLabel.length -1);

                    var ele={
                        "leftKeyField": {
                            "field": leftLabel,
                            "parentTable": leftSheet
                        },
                        "rightKeyField": {
                            "field": rightLabel,
                            "parentTable": rightSheet
                        }
                    };
                    joinRelationship.push(ele);
                }
                if(document.querySelector(".sheet-two .factSheet").value==0){
                    doOlap=false;
                }else{
                    doOlap=true;
                }
                if(factNum.length>0){
                    data={
                        "datasourceName": sourceName,
                        "factTable": factVal,
                        "joinRelationship": joinRelationship,
                        "selectedTables": selectedTables,
                        "doOlap": doOlap,
                        "connectionId":connectionId
                    };
                }else{
                    data={
                        "datasourceName": sourceName,
                        "factTable": factVal,
                        "joinRelationship": null,
                        "selectedTables": selectedTables,
                        "doOlap": doOlap,
                        "connectionId":connectionId
                    };
                }
                if(factNum.length>=numRight.length-1){
                    let deferred = $q.defer();
                    $http({
                        method: 'post',
                        headers:{"Content-Type": "application/json;charset=UTF-8"},
                        url:"/xdatainsight/plugin/data-access/api/datasource/multitable/serializeJoins",
                        dataType: 'json',
                        data: data
                    }).success((rep)=>{
                        deferred.resolve(rep);

                        //通知仪表盘创建了新的数据集
                        $("iframe.cde:visible").each(function() {
                            try {
                                let data = {
                                    type: "DATASET_ADDED",
                                    data: {
                                        name:data.datasourceName
                                    }
                                };
                                data = JSON.stringify(data);
                                this.contentWindow.postMessage( data, "*" );
                            } catch (error) {
                                console.log(error);
                            }
                        });
                    }).error((error)=>{
                        deferred.reject(error);
                    });
                    return deferred.promise;
                }else{
                    tips("请为所有表创建连接关系");
                }
            };
            //sql
            service.sql=(datasourceName,connectionName,sql)=>{
                let deferred = $q.defer();
                var data={
                    "datasourceName": datasourceName,
                    "datasourceType": "SQL",
                    "query": sql,
                    "connectionName": connectionName
                };
                $http({
                    method: 'post',
                    headers:{"Content-Type": "application/json"},
                    url:"/xdatainsight/plugin/data-access/api/datasource/querySource/generateQueryDomain",
                    dataType: 'json',
                    data:data
                }).success((data)=>{
                    deferred.resolve(data);
                }).error((data)=>{
                    deferred.reject(data);
                });
                return deferred.promise;
            };
            //updata
            service.updata=(arg1,arg2,arg3,arg4,arg5,arg6,arg7,arg8,arg9,arg10,arg11,arg12,arg13,arg14)=>{
                let deferred = $q.defer();
                var url="/xdatainsight/plugin/data-access/api/connection/update";
                var data={
                    "quoteAllFields":arg7,
                    "forcingIdentifiersToUpperCase":arg8,
                    "forcingIdentifiersToLowerCase":arg9,
                    "usingConnectionPool":true,
                    "connectSql":"",
                    "databaseName":arg1,
                    "databasePort":arg2,
                    "hostname":arg3,
                    "name":arg4,
                    "password":arg5,
                    "username":arg6,
                    "attributes":{},
                    "connectionPoolingProperties":{},
                    "extraOptions":arg10,
                    "accessType":"NATIVE",
                    "databaseType":{"defaultDatabasePort":arg14,"extraOptionsHelpUrl":"http://dev.mysql.com/doc/refman/5.0/en/connector-j-reference-configuration-properties.html","name":arg11,"shortName":arg12,"supportedAccessTypes":arg13}
                };
                $http({
                    method: 'post',
                    headers:{contentType: "application/json; charset=utf-8"},
                    url: url,
                    dataType: 'json',
                    data: data
                }).success((data)=>{
                    deferred.resolve(data);
                }).error((data)=>{
                    deferred.reject(data)
                });
                return deferred.promise;
            };
            return service;
        }])
}