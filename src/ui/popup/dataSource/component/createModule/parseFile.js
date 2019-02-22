/**
 * Created by Administrator on 2016/6/27.
 */
import angular from 'angular';
import $ from 'jquery';
import '../style/public.css';
import '../style/createModule.css';
import {closePopup,fileInit,init1,tips,loading,closeLoading} from  './public';

{
    "use strict";
    const template = require('./parseFile.html');
    angular.module("xdt/parseFile",[])
        .filter('tankreplace', function() {
            return function(input) {
                if(input<10){
                    return "00"+input;
                }else if(input<100){
                    return "0"+input;
                }else if (input<1000){
                    return input;
                }
            };
        })
        .directive('parseFile',()=>{
            return {
                restrict: 'E',
                template: template,
                link() {
                    var e=document.querySelector(".file-source button");
                    e.onclick=function(){
                        document.querySelector(".file-hide").classList.remove("hide");
                        document.querySelector(".file-path1").innerHTML="请选择小于10MB的文件";
                        document.querySelector("#upload").value="";
                    };
                    document.querySelector(".file-hide .cancel").onclick=function(){
                        document.querySelector(".file-hide").classList.add("hide");
                    };
                    document.querySelector(".file-hide .title-cancel").onclick=function(){
                        document.querySelector(".file-hide").classList.add("hide");
                    };
                    var file=document.querySelector("#upload");
                    file.onchange=function(){
                        var val=file.value;
                        document.querySelector(".file-path1").innerHTML=val;
                    }
                }
            }
        })
        .factory("fileFactory",['$http','$q',($http,$q)=>{
            let service={};
            service.nextStep=(fileName,isFirstRowHeader,encoding,delimiter,enclosure,isExcel)=>{
                let deferred = $q.defer();
                $http({
                    method: 'get',
                    headers:{Accept: "application/json"},
                    url: "/xdatainsight/plugin/data-access/api/datasource/csv/stageFile?fileName="+fileName+"&isFirstRowHeader="+isFirstRowHeader+"&encoding="+encoding+"&delimiter="+delimiter+"&enclosure="+enclosure+"&isExcel="+isExcel+"",
                    dataType: 'json'
                }).success((data)=>{
                    deferred.resolve(data);
                    document.querySelector(".parseFile").classList.add("hide");
                    document.querySelector(".modelSetting").classList.remove("hide");
                }).error((data)=>{
                    deferred.reject(data);
                });
                return deferred.promise;
            };
            service.preStep=()=>{
                document.querySelector(".createModel1").classList.remove("hide");
                document.querySelector(".parseFile").classList.add("hide");
            };
            service.upLoadFile=()=>{
                let deferred = $q.defer();
                //file size
                var data = new FormData(document.querySelector("#form1"));
                /*遍历发送的数据，揪出文件，并判断大小*/
                if(document.querySelector("#upload").files[0].size > 10000000){
                    tips("上传文件大小不得超过10MB");
                    return;
                }
                $http({
                    method: 'post',
                    headers: {"Content-Type": undefined},
                    url: "/xdatainsightUploadService?file_name=&mark_temporary=true&unzip=true",
                    eventHandlers: {
                        progress: function(c) {
                        }
                    },
                    uploadEventHandlers: {
                        progress: function(e) {
                            var bili=parseInt((e.loaded / e.total)*100);
                        }
                    },
                    data: data,
                    processData: false,
                    contentType: "multipart/form-data",
                    cache: false
                }).success((data)=>{
                    deferred.resolve(data);
                    document.querySelector(".file-hide").classList.add("hide");
                    document.querySelector(".file-path").innerHTML=document.querySelector(".file-path1").innerHTML;
                }).error((data)=>{
                    deferred.reject(data);
                });
                return deferred.promise;
            };
            service.fileView=(fileName,isFirstRowHeader,encoding,isExcel)=>{
                let deferred = $q.defer();
                $http({
                    method: 'get',
                    headers:{Accept: "application/json"},
                    url: "/xdatainsight/plugin/data-access/api/datasource/csv/getPreviewRows?fileName="+fileName+"&isFirstRowHeader="+isFirstRowHeader+"&rows=10&encoding="+encoding+"&isExcel="+isExcel+"",
                    dataType: 'json'
                }).success((data)=>{
                    deferred.resolve(data);
                }).error((data)=>{
                    deferred.reject(data);
                });
                return deferred.promise;
            };
            return service;
        }])
        .controller("fileCtr",['$scope','fileFactory','$http',($scope,fileFactory,$http)=>{
            $scope.fen=",";
            $scope.shibie="0";
            $scope.titleVal=true;
            $scope.divLoading = false;

            $scope.upload=()=>{
                var obj_file = document.getElementById("upload");
                if(obj_file.value==""){
                    tips("请先选择上传文件");
                    return;
                }
                var myFormData = new FormData(document.querySelector("#form1"));

                /*遍历发送的数据，揪出文件，并判断大小*/
                if(document.querySelector("#upload").files[0].size > 10000000){
                    tips("上传文件大小不得超过10MB");
                    return;
                }
                $scope.divLoading = true;
                // loading();
                fileFactory.upLoadFile()
                    .then((data)=>{
                        $scope.fileName=data;
                        //file encode
                        $scope.encode(data);
                        $scope.divLoading = false;
                        // closeLoading();
                    },(data)=>{
                        // closeLoading();
                        $scope.divLoading = false;
                    });
                //文件大小
                //var maxsize = 2*1024*1024;//2M
                //var errMsg = "上传的附件文件不能超过2M！！！";
                //var tipMsg = "您的浏览器暂不支持计算上传文件的大小，确保上传文件不要超过2M，建议使用IE、FireFox、Chrome浏览器。";
                //var  browserCfg = {};
                //var ua = window.navigator.userAgent;
                //if (ua.indexOf("MSIE")>=1){
                //    browserCfg.ie = true;
                //}else if(ua.indexOf("Firefox")>=1){
                //    browserCfg.firefox = true;
                //}else if(ua.indexOf("Chrome")>=1){
                //    browserCfg.chrome = true;
                //}
                //checkfile();
                //function checkfile(){
                //    var obj_file = document.getElementById("upload");
                //    if(obj_file.value==""){
                //        tips("请先选择上传文件");
                //        return;
                //    }
                //    fileFactory.upLoadFile()
                //        .then((data)=>{
                //            $scope.fileName=data;
                //            //file encode
                //            $scope.encode(data);
                //        },(data)=>{
                //
                //        });
                //    try{
                //        var filesize = 0;
                //        if(browserCfg.firefox || browserCfg.chrome ){
                //            filesize = obj_file.files[0].size;
                //        }else if(browserCfg.ie){
                //            var obj_img = document.getElementById('tempimg');
                //            obj_img.dynsrc=obj_file.value;
                //            filesize = obj_img.fileSize;
                //        }else{
                //            tips(tipMsg);
                //            return;
                //        }
                //        if(filesize==-1){
                //            tips(tipMsg);
                //            return;
                //        }else if(filesize>maxsize){
                //            tips(errMsg);
                //            return;
                //        }else{
                //            fileFactory.upLoadFile()
                //                .then((data)=>{
                //                    $scope.fileName=data;
                //                    //file encode
                //                    $scope.encode(data);
                //                },(data)=>{
                //
                //                });
                //        }
                //    }catch(e){
                //        tips(e);
                //    }
                //}
            };
            $scope.fenge=(e,m)=>{
                $scope.fengeList=[];
                for(var i=0;i<$scope.datalist.length;i++){
                    var f=$scope.datalist[i].split(e);
                    for(var j=0;j<f.length;j++){
                        if(m==0){
                            f[j]=f[j].replace("","");
                        }
                        if(m==1){
                            f[j]=f[j].replace(/\'/g,"");
                        }
                        if(m==2){
                            f[j]=f[j].replace(/\"/g,"");
                        }
                    }
                    $scope.fengeList.push(f);
                }
                $scope.$emit("datalist",$scope.fengeList);
            };
            $scope.encode=(e)=>{
                var type=document.querySelector(".model-type").getAttribute("data-tag");
                if(type=="excel"){
                    $scope.isExcel=true;
                }else{
                    $scope.isExcel=false;
                }
                $http({
                    method: 'get',
                    headers:{contentType: "application/json; charset=utf-8"},
                    url:"/xdatainsight/plugin/data-access/api/datasource/csv/getEncoding?fileName="+e+"&isExcel="+$scope.isExcel+"",
                    dataType: 'json'
                }).success((data)=>{
                    $scope.encoding=data;
                    if($scope.isExcel){
                        $scope.encoding = "utf-8";
                    }
                    $scope.title($scope.titleVal);
                    //file view
                    fileFactory.fileView($scope.fileName,$scope.isFirstRowHeader,$scope.encoding,$scope.isExcel)
                        .then((data)=>{
                            $scope.datalist=data.Item;
                            $scope.fenge($scope.fen,$scope.shibie);
                        },(data)=>{

                        });
                }).error((data)=>{
                });
            };
            $scope.changeEncode=(e)=>{
                fileFactory.fileView($scope.fileName,$scope.isFirstRowHeader,e,$scope.isExcel)
                    .then((data)=>{
                        $scope.datalist=data.Item;
                        $scope.fenge($scope.fen,$scope.shibie);
                    },(data)=>{

                    });
            };
            $scope.title=(e)=>{
                if(e){
                    $scope.isFirstRowHeader=true;
                    document.querySelector(".data-list tr").classList.add("hide");
                    $(".data-list .n0").addClass("test");
                }else{
                    $scope.isFirstRowHeader=false;
                    document.querySelector(".data-list tr").classList.remove("hide");
                    $(".data-list .n0").removeClass("test");
                }
            };
            $scope.nextStep=()=>{
                if($scope.shibie=="0"){
                    $scope.shi="null";
                }
                if($scope.shibie=="1"){
                    $scope.shi="\'";
                }
                if($scope.shibie=="2"){
                    $scope.shi="\"";
                }
                if($scope.fileName){
                    fileFactory.nextStep($scope.fileName,$scope.isFirstRowHeader,$scope.encoding,$scope.fen,$scope.shi,$scope.isExcel)
                        .then((data)=>{
                            $scope.$emit("setlist",data.columns);
                            $scope.$emit("completeData",data);
                        },(data)=>{

                        });
                }
            };
            $scope.preStep=()=>{
                fileFactory.preStep();
                fileInit();
                //init1();
                $scope.list=[];
                $scope.fileName="";
                $scope.encoding="";
                $scope.fen=",";
                $scope.shibie="0";
                $scope.titleVal=true;
                $scope.tou=[];
            };
            $scope.close=()=>{
                closePopup();
                fileInit();
                init1();
                $scope.list=[];
                $scope.fileName="";
                $scope.encoding="";
                $scope.fen=",";
                $scope.shibie="0";
                $scope.titleVal=true;
                $scope.tou=[];
            };
            $scope.separator=($event)=>{
                function other(){
                    document.querySelector(".sepOther").setAttribute("disabled","disabled");
                    $scope.otherVal="";
                }
                var fen;
                var val=$event.target.value;
                switch (val){
                    case "0":
                        fen=",";
                        other();
                        break;
                    case "1":
                        fen=";";
                        other();
                        break;
                    case "2":
                        fen="\t";
                        other();
                        break;
                    case "3":
                        fen=" ";
                        other();
                        break;
                    case "4":
                        document.querySelector(".sepOther").removeAttribute("disabled");
                        break;
                }
                $scope.fen=fen;
                if(document.querySelector(".file-path").innerHTML.length>0){
                    $scope.fenge($scope.fen,$scope.shibie);
                }
            };
            $scope.identifier=($event)=>{
                var val=$event.target.value;
                var shibie;
                switch (val){
                    case "0":
                        shibie="0";
                        break;
                    case "1":
                        shibie="1";
                        break;
                    case "2":
                        shibie="2";
                        break;
                }
                $scope.shibie=shibie;
                if(document.querySelector(".file-path").innerHTML.length>0){
                    $scope.fenge($scope.fen,$scope.shibie);
                }
            };
            $scope.other=()=>{
                document.querySelector(".file-separator").setAttribute("data",$scope.otherVal);
                var shibie=document.querySelector(".file-identifier").getAttribute("data");
                if(document.querySelector(".file-path").innerHTML.length>0){
                    $scope.fenge($scope.otherVal,shibie);
                }
            };
            $scope.$on("datalistUpdate", function(event,data) {
                $scope.list=data[0];
                $scope.tou=$scope.list[0];
                setTimeout(function(){
                    if($scope.titleVal){
                        $(".data-list .n0").addClass("test")
                    }else{
                        $(".data-list .n0").removeClass("test")
                    }
                },200)
            });
            $scope.$on("closeUpdate", function(event,data) {
                $scope.list=[];
                $scope.fileName="";
                $scope.encoding="";
                $scope.fen=",";
                $scope.shibie="0";
                $scope.titleVal=true;
                $scope.tou=[];
            });

        }])
}