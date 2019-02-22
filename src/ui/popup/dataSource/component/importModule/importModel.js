/**
 * Created by Administrator on 2016/7/4.
 */
import angular from 'angular';
import '../style/public.css'
import '../style/importModule.css'
import {tips} from  '../createModule/public.js';
{
    "use strict";
    const template = require('./importModel.html');
    angular.module("xdt/importModel",[])
        .directive('importModel',()=>{
            return {
                restrict: 'E',
                template: template,
                link(){
                    document.querySelector(".import-type select").onchange=function(){
                        var val=this.value;
                        if(val=="0"){
                            document.querySelector(".typeOne").classList.remove("hide");
                            document.querySelector(".typeTwo").classList.add("hide");
                        }else if(val=="1"){
                            document.querySelector(".typeOne").classList.add("hide");
                            document.querySelector(".typeTwo").classList.remove("hide");
                        }
                    };
                    var file=document.querySelector("#upload2");
                    file.onchange=function(){
                        var val=file.value;
                        document.querySelector(".file-path2").innerHTML=val;
                        var d1=val.split("\\");
                        var d2=d1[d1.length-1].split(".");
                        document.querySelector(".catalogName").setAttribute("value",d2[0]);
                    };
                    var file1=document.querySelector("#upload3");
                    file1.onchange=function(){
                        var val1=file1.value;
                        document.querySelector(".file-path3").innerHTML=val1;
                    }
                }
            }
        })
        .factory('importFactory', ['$http','$q',function($http,$q){
            let service={};
            service.callItunes=(url)=>{
                let deferred = $q.defer();
                $http({
                    method: 'get',
                    headers:{contentType: "application/json; charset=utf-8"},
                    url: url,
                    dataType: 'json',
                    data: ''
                }).success((data)=>{
                    deferred.resolve(data);
                }).error(()=>{
                    deferred.reject('There was an error')
                });
                return deferred.promise;
            };
            service.complete=()=>{
                let deferred = $q.defer();
                var data = new FormData(document.querySelector("#form2"));
                data.append("file", document.querySelector("#upload2").files[0]);
                $http({
                    method: 'post',
                    headers:{"Content-Type": undefined},
                    url: "/xdatainsight/plugin/data-access/api/mondrian/postAnalysis",
                    data: data,
                    processData: false,
                    contentType: "multipart/form-data",
                    cache: false
                }).success((data)=>{
                    deferred.resolve(data);
                }).error((data)=>{
                    deferred.reject(data);
                });
                return deferred.promise;
            };
            service.complete1=()=>{
                let deferred = $q.defer();
                var data = new FormData(document.querySelector("#form3"));
                $http({
                    method: 'post',
                    headers:{"Content-Type": undefined},
                    url: "/xdatainsight/plugin/data-access/api/metadata/postimport",
                    data: data,
                    processData: false,
                    contentType: "multipart/form-data",
                    cache: false
                }).success((data)=>{
                    deferred.resolve(data);
                }).error((data)=>{
                    deferred.reject(data);
                });
                return deferred.promise;
            };
            return service;
        }])
        .controller("importController",['$rootScope','$scope','importFactory',($rootScope,$scope,importFactory)=>{
            $scope.close=()=>{
                document.querySelector('.source-list').style.display = 'block';
                document.querySelector(".connectData .title-name").innerHTML="导入数据集";
                document.querySelector('import-data').classList.add('popupHide');
                // if(document.querySelector("exist-data").classList.value=="popupHide"){
                if(document.querySelector("exist-data").classList.contains('popupHide')){
                    document.querySelector('.popup').style.display="none";
                }
                // document.querySelector('.popup').style.display="none";
                document.querySelector(".file-path2").innerHTML="上传多维数据集xml文件";
                document.querySelector(".file-path3").innerHTML="上传业务数据集xmi文件";
                document.querySelector(".import-type select").value="0";
                document.querySelector(".typeOne").classList.remove("hide");
                document.querySelector(".typeTwo").classList.add("hide");
                document.querySelector("#upload2").value="";
                document.querySelector("#upload3").value="";
                $scope.edit=false;
            };
            $rootScope.$on("listContent",function(){
               //传递回jdbc列表内容
              $scope.Datasource = '';
              $scope.overwrite = '';
               importFactory.callItunes("/xdatainsight/plugin/data-access/api/connection/list"+"?t="+Date.parse(new Date()))
               .then((data)=>{
                   $scope.jdbc = data;
               },(data)=>{
               });
            })
            $scope.edit=false;

            $rootScope.$on('editUpdate', function(event,data) {
                $scope.edit=true;
                $scope.catalogName=data[0];
                $scope.origCatalogName=data[0];
                $scope.Datasource = data[1];
                $scope.overwrite = data[2];
                
            });
            $scope.complete=()=>{
                if($scope.edit){
                    importFactory.complete()
                    .then((data)=>{
                        $scope.close();
                        $scope.edit=false;
                        $scope.Datasource = "";
                    },(data)=>{

                    });
                }else{
                    if(document.querySelector(".import-type select").value=="0"){
                        if(document.querySelector("#upload2").value.length>0&&$scope.Datasource){
                            // if(document.querySelector("exist-data").classList.value=="popupHide"){
                            if(document.querySelector("exist-data").classList.contains('popupHide')){
                                $scope.overwrite=false;
                            }else{
                                $scope.overwrite=true;
                            }
                            importFactory.complete()
                                .then((data)=>{
                                    tips("导入成功");
                                    $scope.close();
                                    $scope.edit=false;
                                    $rootScope.$emit('updata1',{name : "1", editable: false});
                                },(data)=>{
    
                                });
                        }else{
                            tips("请上传xml文件或者选择一个数据源");
                        }
                    }else{
                        if(document.querySelector("#upload3").value.length>0&&$scope.domainId){
                            importFactory.complete1()
                                .then((data)=>{
                                    tips("导入成功");
                                    $scope.close();
                                },(data)=>{
    
                                });
                        }else{
                            tips("请上传xmi文件或者设置一个ID");
                        }
                    }
                };
                

            }
        }])
}