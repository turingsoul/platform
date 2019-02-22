
import angular from 'angular';
import '../style/public.css';
import '../style/createModule.css';
import {closePopup,fileInit,init1,tips} from  './public';
{
    "use strict";
    const template = require('./modelSetting.html');
    angular.module("xdt/modelSetting",[])
        .directive('modelSetting',()=>{
            return {
                restrict: 'E',
                template: template,
                link() {
                    function selet(){
                        var seletAll=document.querySelector(".seletAll");
                        var all=document.querySelectorAll(".modelSetting td input[type=checkbox]");
                        seletAll.onclick=function(){
                            if (this.checked){
                                for(var i=0;i<all.length;i++){
                                    angular.element(all[i]).attr("checked",true);
                                }
                            }else{
                                for(var i=0;i<all.length;i++){
                                    angular.element(all[i]).attr("checked",false);
                                }
                            }
                        };
                        for(var i=0;i<all.length;i++){
                            all[i].onclick=function(){
                                if(this.checked){
                                    angular.element(this).attr("checked",true);
                                }else{
                                    angular.element(this).attr("checked",false);
                                }
                                var checked=document.querySelectorAll(".modelSetting td input[checked=checked]");
                                if(checked.length==all.length){
                                    angular.element(seletAll).attr("checked",true);
                                }else{
                                    angular.element(seletAll).attr("checked",false);
                                }
                            }
                        }
                    }
                }
            }
        })
        .factory("settingFactory",['$http','$q',($http,$q)=>{
            let service={};
            service.complete=(data)=>{
                let deferred = $q.defer();
                $http({
                    method: 'post',
                    headers:{"Content-Type": "application/json;charset=UTF-8"},
                    url: "/xdatainsight/plugin/data-access/api/datasource/csv/generateDomain",
                    dataType: 'json',
                    data:data
                }).success((data)=>{
                    deferred.resolve("成功");
                }).error((data)=>{
                    deferred.reject("失败")
                });
                return deferred.promise;
            };
            service.preStep=()=>{
                document.querySelector(".modelSetting").classList.add("hide");
                document.querySelector(".parseFile").classList.remove("hide");
            };
            return service;
        }])
        .controller("settingCtr",['$scope','$rootScope','settingFactory','$http',($scope,$rootScope,settingFactory,$http)=>{
            $scope.modelSettingLoadingShow = false;
            $scope.complete=()=>{
                $scope.modelSettingLoadingShow= true;
                var all=document.querySelectorAll(".tableBox input[type=checkbox]");
                var alltr=document.querySelectorAll(".tableBox tr");
                var allTitle=document.querySelectorAll(".setlistTitle");
                var allType=document.querySelectorAll(".setlistType");
                var allStrings=document.querySelectorAll(".setlistStrings");
                var allLength=document.querySelectorAll(".setlistLength");
                var allPrecision=document.querySelectorAll(".setlistPrecision");
                for(var i=1;i<all.length;i++){
                    if(all[i].checked){
                        $scope.completeData.columns[i-1].dataType=allType[i-1].value;
                        $scope.completeData.columns[i-1].title=allTitle[i-1].value;
                        $scope.completeData.columns[i-1].length=allLength[i-1].value;
                        $scope.completeData.columns[i-1].format=allStrings[i-1].value;
                        $scope.completeData.columns[i-1].precision=allPrecision[i-1].value;
                    }else{
                        $scope.completeData.columns[i-1].include = false;
                        $scope.completeData.columns[i-1].ignore = true;
                        //delete $scope.completeData.columns[i-1];
                    }
                }
                for(var j=0;j<$scope.completeData.columns.length;j++){
                    if($scope.completeData.columns[j]){
                        delete $scope.completeData.columns[j].formatStringsDisabled;
                    } 
                }

                $scope.completeData.columns =  $scope.completeData.columns.filter(function(n){ return n});
                var data={
                    "datasourceName": $scope.sourceName,
                    "datasourceType":"CSV",
                    "csvModelInfo":$scope.completeData,
                    "query": "",
                    "connectionName": ""
                };
                data.csvModelInfo.stageTableName=$scope.sourceName;
                data.csvModelInfo.datasourceName=$scope.sourceName;
                data.csvModelInfo.fileInfo.filename=data.csvModelInfo.fileInfo.tmpFilename;
                data.csvModelInfo.validated=true;
                delete data.csvModelInfo.fileInfo.contents;
                delete data.csvModelInfo.transformStats;

                settingFactory.complete(data)
                    .then((data)=>{
                        $scope.close();
                        $scope.$emit("advance",1);
                        $rootScope.$emit('updata',$scope.sourceName);
                        $rootScope.$emit('updata1',{name : $scope.sourceName, editable: true});
                        $scope.modelSettingLoadingShow = false;
                    },(data)=>{
                        tips("创建失败！");
                        $scope.modelSettingLoadingShow = false;
                    });
            };
            $scope.preStep=()=>{
                settingFactory.preStep();
                $scope.setlist=[];
            };
            $scope.close=()=>{
                closePopup();
                fileInit();
                init1();
                $scope.$emit("datalist",[]);
                $scope.$emit("close","1");
            };
            $scope.$on('setlistUpdate', function(event,data) {
                $scope.setlist=data[0];
                setTimeout(function(){
                    var seletAll=document.querySelector(".seletAll");
                    var all=document.querySelectorAll(".modelSetting td input[type=checkbox]");
                    angular.element(seletAll).attr("checked",true);
                    seletAll.onclick=function(){
                        if (this.checked){
                            for(var i=0;i<all.length;i++){
                                angular.element(all[i]).attr("checked",true);
                            }
                        }else{
                            for(var i=0;i<all.length;i++){
                                angular.element(all[i]).attr("checked",false);
                            }
                        }
                    };
                    for(var i=0;i<all.length;i++){
                        angular.element(all[i]).attr("checked",true);
                        all[i].onclick=function(){
                            if(this.checked){
                                angular.element(this).attr("checked",true);
                            }else{
                                angular.element(this).attr("checked",false);
                            }
                            var checked=document.querySelectorAll(".modelSetting td input[checked=checked]");
                            if(checked.length==all.length){
                                angular.element(seletAll).attr("checked",true);
                            }else{
                                angular.element(seletAll).attr("checked",false);
                            }
                        }
                    }
                },100)
            });
            $scope.$on('completeDataUpdate', function(event,data) {
                $scope.completeData=data[0];
            });
            $scope.$on("sourceNameUpdate", function(event,data) {
                $scope.sourceName=data[0];
            });
        }])
}



