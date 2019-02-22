/**
 * Created by Administrator on 2016/6/30.
 */
import $ from 'jquery';
import angular from 'angular';
import '../style/public.css';
import '../style/createModule.css';
import './service';
import {closePopup,tips,complete} from  './public';
{
    "use strict";
    const template = require('./sheetRelation.html');
    angular.module("xdt/sheetRelation",["xdt/service"])
        .directive('sheetRelation',()=>{
            return {
                restrict: 'E',
                template: template,
                link() {

                }
            }
        })
        .factory("relationFactory",['$http','$q',($http,$q)=>{
            let service={};
            var biao=[];
            var link=[];
            service.preStep=()=>{
                document.querySelector(".modelQuery").classList.remove("hide");
                document.querySelector(".sheetRelation").classList.add("hide");
                biao=[];
                link=[];
                var all=document.querySelectorAll(".relation-tips select option");
                for(var i=0;i<all.length;i++){
                    all[i].style.display = "none";
                }
            };
            service.createLink=()=>{
                var sheet1=document.querySelector(".relation-left .sheet-name select").value;
                var sheet2=document.querySelector(".relation-right .sheet-name select").value;
                var ziduan1=document.querySelector(".relation-left .sheet-field select").value;
                var ziduan2=document.querySelector(".relation-right .sheet-field select").value;
                //相同表
                if(sheet1==sheet2){
                    tips("不允许自连接，请选择不同的表并建立连接关系");
                }else{
                    var result=exist();
                    if(result){
                        if(ziduan1&&ziduan2){
                            biao.push([sheet1,sheet2]);
                            link.push([sheet1+"."+ziduan1+"- INNER JOIN -"+sheet2+"."+ziduan2]);
                            return link;
                        }else{
                            tips("请选择两个相关联字段")
                        }
                    }
                }
                function exist(){
                        for(var i=0;i<biao.length;i++){
                            if(biao[i][0]==sheet1&&biao[i][1]==sheet2){
                                tips("连接已存在");
                                return false;
                            }
                            if(biao[i][0]==sheet2&&biao[i][1]==sheet1){
                                tips("连接已存在");
                                return false;
                            }
                        }
                    return true;
                }
                return link;
            };

            service.deleteLink=()=>{
                var e=document.querySelector(".relation-tips select").value;
                if(e){
                    var e=document.querySelector(".relation-tips select").value;
                    var left = e.split("- INNER JOIN -")[0];
                    var right = e.split("- INNER JOIN -")[1];

                    var leftArr = left.split(".");
                    var leftLabel = leftArr[leftArr.length-1];
                    var leftSheet = left.substring(0, left.length - leftLabel.length -1);

                    var rightArr = right.split(".");
                    var rightLabel = rightArr[rightArr.length-1];
                    var rightSheet = right.substring(0, right.length - rightLabel.length -1);

                    for(var j=0;j<biao.length;j++){
                        if(biao[j][0]==leftSheet&&biao[j][1]==rightSheet){
                            biao.splice(j, 1);
                        }
                    }
                    for(var i=0;i<link.length;i++){
                        if(link[i][0]==[e]){
                            link.splice(i, 1);
                        }
                    }
                }else{
                    tips("选择一个连接");
                }
                return link;
            };
            return service;
        }])
        .controller("relationCtr",['$rootScope','$scope','relationFactory','myService',($rootScope,$scope,relationFactory,myService)=>{
            $scope.divLoading = false;
            $scope.complete=()=>{
                    $scope.divLoading = true;
                    let result = myService.complete($scope.sourceName,$scope.connectionIdUpdate);
                    if(result && result.then){
                        result.then((data)=>{
                            $scope.divLoading = false;
                            relationFactory.preStep();
                            complete();
                            closePopup();
                            $scope.$emit("advance",1);
                            $scope.$emit("biao",[]);//清空
                            $rootScope.$emit('updata',$scope.sourceName);
                            /*最后这一行是出现问题的原因*/
                           $rootScope.$emit('updata1',{name : $scope.sourceName, editable: true});
                            $scope.linkList = [];
                        },(data)=>{
                            $scope.divLoading = false;
                            relationFactory.preStep();
                            complete();
                            closePopup();
                            $scope.$emit("advance",1);
                            $scope.$emit("biao",[]);
                            tips("无法读取元数据，请联系管理员！");
                        });
                    }else{
                        $scope.divLoading = false;
                    }
            };
            $scope.preStep=()=>{
                relationFactory.preStep();
            };
            $scope.close=()=>{
                relationFactory.preStep();
                closePopup();
                complete();
                $scope.$emit("biao",[]);
                $scope.$emit("advance",1);
            };
            $scope.changeLeft=(e)=>{
                myService.getZiduan($scope.connectionIdUpdate,e,'sheet-field-left')
                    .then((data)=>{

                      data.Item.sort(function(a,b) {
                        return a > b ? 1: -1;
                      });
                        $scope.ziduan1=data.Item;
                        setTimeout(function(){
                            document.querySelectorAll(".relation-left .sheet-field option")[0].setAttribute("selected","selected");
                        },100)
                    }, (data)=>{
                        $scope.ziduan1=[];
                    });
            };
            $scope.changeRight=(e)=>{
                myService.getZiduan($scope.connectionIdUpdate,e,'sheet-field-right')
                    .then((data)=>{
                        data.Item.sort(function(a,b) {
                          return a > b ? 1: -1;
                        });
                        $scope.ziduan2=data.Item;
                        setTimeout(function(){
                            document.querySelectorAll(".relation-right .sheet-field option")[0].setAttribute("selected","selected");
                        },100)
                    }, (data)=>{
                        $scope.ziduan2=[];
                    });
            };
            $scope.createLink=()=>{
                $scope.linkList=relationFactory.createLink();
            };
            $scope.deleteLink=()=>{
                $scope.linkList=relationFactory.deleteLink();
            };
            $scope.$on("sheet1Update", function(event,data){
                $scope.sheet1=data[0];
                $scope.moren1=data[0][0];
            });
            $scope.$on("sheet2Update", function(event,data){
                $scope.sheet2=data[0];
                $scope.moren2=data[0][0];
            });
            $scope.$on("ziduan1Update", function(event,data){
                data[0].sort(function(a,b) {
                  return a > b ? 1: -1;
                });

                $scope.ziduan1=data[0];
                setTimeout(function(){
                    if(document.querySelectorAll(".relation-left .sheet-field option")[0]){
                        document.querySelectorAll(".relation-left .sheet-field option")[0].setAttribute("selected","selected");
                    }
                },100);
            });
            $scope.$on("ziduan2Update", function(event,data){
                $scope.ziduan2=data[0];
                data[0].sort(function(a,b) {
                  return a > b ? 1: -1;
                });
                setTimeout(function(){
                    if(document.querySelectorAll(".relation-right .sheet-field option")[0]){
                        document.querySelectorAll(".relation-right .sheet-field option")[0].setAttribute("selected","selected");
                    }
                },100);
            });
            $scope.$on("connectionIdUpdate", function(event,data){
                $scope.connectionIdUpdate=data[0];
            });
            $scope.$on("sourceNameUpdate", function(event,data) {
                $scope.sourceName=data[0];
            });
        }])
}