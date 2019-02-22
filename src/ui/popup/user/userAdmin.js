/**
 * Created by Administrator on 2016/5/12.
 */
import angular from 'angular';
import '../style/userAdmin.css'
{
    "use strict";
    const template = require('./../pages/userAdmin.html');
    angular.module("xdt/administration",["xdt/modifyPassword"])
        .filter('nameFilter', function() {
            return function(input) {
                if(input.substring(input.lastIndexOf("."),input.length)=="saiku"){
                    return input;
                }else{
                    return null;
                }
            };
        })
        .filter("hideExtension",
            function () {
                return function (filename) {
                    let arr = filename.split(".");
                    if(arr.length > 1){
                        return filename.replace("."+ arr[arr.length-1], "");
                    }else{
                        return filename;
                    }
                }
        })
        .filter("getExtension",
            function () {
                return function (filename) {
                    let arr = filename.split(".");
                    let _name = arr[arr.length-1];
                    _name == 'xdf' && (_name = 'wcdf');
                    return _name; 
                }
        })
        .directive('userAdmin',()=>{
            return {
                restrict: 'E',
                template: template,
                link() {

                }
            }
        })
        .controller("userAdminCtr",['$rootScope','$scope','$http',($rootScope,$scope,$http)=>{
            $scope.fileListLoading = false;
            //$scope.fileType=['所有文件','多维分析','即席查询','仪表盘','定制报表'];
            $scope.fileType=['所有文件','多维分析','仪表盘','定制报表'];
            $scope.filetype='所有文件';
            $scope.viewFile=true;
            $scope.myPath="/";
            $scope.setFilePath = $rootScope.homeIndex;
            $scope.showViewFile=()=>{
                document.querySelector('.userAdmin').style.display = 'none';
                $scope.viewFile=false;
                $scope.getFile();
            };
            $scope.close=()=>{
                document.querySelector('.popup user-admin').classList.add('popupHide');
                document.querySelector('.popup').style.display="none";
            };
            $scope.closeAlert=()=>{
                document.querySelector('.userAdmin').style.display = 'block';
                $scope.viewFile=true;
                $scope.fileList = [];
                //$scope.myPath="/";
                //$scope.fileList=$scope.file.children;
                //$scope.setFileName="";
            };
            $scope.filePath=()=>{
                if($scope.setFileName){
                    $scope.closeAlert();
                    $scope.setFilePath=$scope.myPath+"/"+$scope.setFileName;
                }
            };
            //homePage
          $scope.$on('userAdmin', (data)=>{
              $scope.userHome();
              $scope.getRoles();
          });
            $scope.userHome = () => {
                $http({
                    method: 'get',
                    headers:{Accept: "application/json"},
                    url: "/xdatainsight/api/user-settings/home-path",
                    dataType: ''
                }).success((data)=>{
                    if(data["home-path"]){
                        $scope.setFilePath=data["home-path"];
                    }
                }).error((data)=>{
                    $scope.setFilePath="获取主页地址失败，请稍后再试";
                });
              };
            //获取文件数据
            $scope.getFile = () => {
                $scope.fileListLoading = true;
                $http({
                    method: 'get',
                    headers:{Accept: "application/json"},
                    url: "/xdatainsight/api/repo/files/tree?showHidden="+($rootScope.ifhide?true:false)+"&filter=*|FILES&_="+new Date().getTime(),
                    dataType: ''
                }).success((data)=>{
                    $scope.file=data;
                    $scope.fileList=data.children;
                    $rootScope.myFileTree=data.children;
                    $scope.fileListLoading = false;
                }).error((data)=>{
                    $scope.fileListLoading = false;
                });
            };
            //上一级
            $scope.upLocation=()=>{
                $scope.setFileName="";
                $scope.myPath=$scope.myPath.substring(0,$scope.myPath.lastIndexOf("\/"));
                if($scope.myPath==''){
                    $scope.myPath='/';
                }
                search($scope.file);
            };
            function search(e){
                if(e.file.path==$scope.myPath){
                    $scope.fileList=e.children;
                    return false;
                }else if(e.children){
                    for(var n in e.children){
                        search(e.children[n]);
                    }
                }
            }

            //点击文件夹
            $scope.folderList=(e)=>{
                if(e.children){
                    $scope.myPath=e.file.path;
                    $scope.fileList=e.children;
                    $scope.setFileName="";
                }else{
                    $scope.setFileName=e.file.name;
                }
            };
            $scope.folderShow=(x)=>{
                $scope.type = $scope.type ? $scope.type : ["saiku","wcdf","prpt","html","htm","xdf","xdp"];
                //如果是文件夹类型
                if(x.children){
                    return true;
                }
                //文件类型的
                if($scope.type.indexOf(x.file.name.substring(x.file.name.lastIndexOf(".")+1,x.file.name.length)) > -1){
                    return true;
                }else{
                    return false;
                }
            };
            //改变文件类型
            $scope.changeType=(e)=>{
                switch (e){
                    case '所有文件':$scope.type=["saiku","wcdf","prpt","html","htm","xdf"];break;
                    case '多维分析':$scope.type="saiku";break;
                    //case '即席查询':$scope.type="xwaqr";break;
                    case '仪表盘':$scope.type=["wcdf","xdf"];break;
                    case '数据门户':$scope.type=["xdp"];break;
                    case '定制报表':$scope.type=["prpt","html","htm"];break;
                }
            };
            //获取权限
            $scope.getRoles = () => {
                $http({
                    method: 'get',
                    headers:{Accept: "application/json"},
                    url: "/xdatainsight/plugin/xdt/api/userroledao/logicalRoleMap",
                    dataType: ''
                }).success((data)=>{
                    $scope.roleData=data.assignments;
                    $scope.localizedRoleNames=data.localizedRoleNames;
                    $scope.arr=[];
                    if($scope.roleData instanceof Array){
                        for(var i = 0; i < $scope.roleData.length; i++){
                            if(typeof $scope.roleData[i].logicalRoles === "string"){
                                $scope.arr.push($scope.roleData[i].logicalRoles);
                            }else if(typeof $scope.roleData[i].logicalRoles === "object"){
                                for(var j=0;j<$scope.roleData[i].logicalRoles.length;j++){
                                    if($scope.arr.indexOf($scope.roleData[i].logicalRoles[j])==-1){
                                        $scope.arr.push($scope.roleData[i].logicalRoles[j]);
                                    }
                                }
                            }
                        }
                    }else{
                        if(typeof $scope.roleData.logicalRoles === "string"){
                            $scope.arr.push($scope.roleData.logicalRoles);
                        }else if(typeof $scope.roleData.logicalRoles === "object"){
                            for(var i=0;i<$scope.roleData.logicalRoles.length;i++){
                                if($scope.arr.indexOf($scope.roleData.logicalRoles[i])==-1){
                                    $scope.arr.push($scope.roleData.logicalRoles[i]);
                                }
                            }
                        }
                    }
                }).error((data)=>{
                });
            };
            $scope.checkRole=(x)=>{
                return $scope.arr.indexOf(x) == -1 ? false : true;
            };
            //监听文件隐藏
            $scope.$watch("ifhide",function(newStr,oldStr){
                $rootScope.ifhide = newStr;
                $http({
                    method:"post",
                    url: "/xdatainsight/api/user-settings/MANTLE_SHOW_HIDDEN_FILES",
                    data: $rootScope.ifhide
                }).success((data)=>{
                    localStorage.setItem("userSetting",JSON.stringify({"ifhide" : data}));
                }).error((data)=>{
                });
            })
            //文件隐藏
            hideFile("get");
            function hideFile(x,d){
                $http({
                    method: x,
                    url: "/xdatainsight/api/user-settings/MANTLE_SHOW_HIDDEN_FILES",
                    data: d
                }).success((data)=>{
                    $rootScope.ifhide=data;
                    // $rootScope.$emit("yhnIfhide");
                    localStorage.setItem("userSetting",JSON.stringify({"ifhide" : data}));
                }).error((data)=>{
                });
            }
            //主页
            function homePage(x){
                var data = {"home-path": x};
                $http({
                    method: 'post',
                    headers: {Accept: "application/json"},
                    url: "/xdatainsight/api/user-settings/home-path",
                    dataType: 'json',
                    data: data
                }).success((data)=> {
                    $rootScope.homeIndex = data;
                    //fly($event);
                }).error((data)=> {
                });
            }
            //确定
            $scope.sure=()=>{
                hideFile("post",$scope.ifhide);
                homePage($scope.setFilePath);
                $scope.close();
            }
        }])
}