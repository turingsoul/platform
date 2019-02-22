/**
 * Created by Administrator on 2016/6/10.
 */
    import angular from 'angular';
    import $ from 'jquery';
    import './tree-control';
    import './treeControl.css';
    import './folderPopup/operatePopup';
    import './folderPopup/operateFolder.css';

{
'use strict';
    angular.module("xdt/folder", ["treeControl","xdt/operateFolder"])
        .controller('ExternalTemplate',['$rootScope','$scope','folderFactory','recentFactory',($rootScope,$scope,folderFactory,recentFactory)=>{
          /*document.querySelector('.modulePop').style.display="block";
          document.querySelector('.modulePop').style.background="rgba(0, 0, 0, 0.02)";*/
          if (!!$rootScope.dataCache.treedata) {
              $scope.filesMenu = $rootScope.dataCache.treedata;
              yhnControlfolder();
          }
          /*接口更新treedata的信号*/
          $scope.$on("deleteFileFromCache",function(e,data){
                /*在缓存里面找出来并删了它*/
                var deleteObj = $scope.deleteFromTreeData($scope.treedata,data);
                $scope.deleteFromTreeData($rootScope.dataCache.treedata,data);
                //同时删除最近浏览和收藏
                var _deleteObj = $.extend(true,{},deleteObj[0].file);
                _deleteObj.fullPath = _deleteObj.path;
                recentFactory.deleteXhr(_deleteObj,'/xdatainsight/plugin/xdt/api/user-settings/recent/delete');
                recentFactory.deleteXhr(_deleteObj,'/xdatainsight/plugin/xdt/api/user-settings/favorites/delete');
          })
          /*接口更新treedata的信号*/
          $scope.$on("deleteFileFromCacheTrash",function(e,data){
              /*在缓存里面找出来并删了它*/
              $scope.deleteFromTreeData($rootScope.dataCache.treedata,data);
              $scope.deleteFromTreeData($scope.otherdata,data);
          })
          /*接受单个恢复node的信号*/
          $scope.$on("restoreDeletedNode",function(d,data){
              /*合成新path*/
              var newFile ={file: Object.assign({},data.file)};
              newFile.file.path = newFile.file.originalParentFolderPath + '/' + newFile.file.title;
              var folder = newFile.file.folder;
              
              /*尝试将data还原进缓存,分为两种情况，一种是file，一种是folder*/
              /*如果是文件*/
              if(folder == "false"){
                  /*还原文件*/
                  $scope.addIntoTreeData($scope.treedata, newFile);
                  jump = false;

              }else if(folder == "true"){
                  /*还原文件夹，直接散发信号，整体刷新*/
                  $scope.$broadcast("freshMyFileTree");
              }
          })
          /*将文件添加到缓存中*/
          var jump = false;
          $scope.addIntoTreeData = function(node, target){
              var originPath = target.file.originalParentFolderPath;
              if(jump)return '';
              if(node.hasOwnProperty("file")){
                  if(node.file.path == originPath && (node.file.folder == 'true')){
                      if(node.children){
                          node.children.push(target);
                          jump = true;
                          return '';
                      }
                  }else{
                      if(node.hasOwnProperty("children")){
                        for(var o in node.children){
                          $scope.addIntoTreeData(node.children[o], target);
                        }
                      }
                  }
              }else{
                  if(node.hasOwnProperty("children")){
                      for(var o in node.children){
                        $scope.addIntoTreeData(node.children[o], target);
                      }
                  }
              }
          }


          $scope.deleteFromTreeData = function(node,id,parent){
            var deleteObj;
            function deleteFromTreeData(node,id,parent){
                if(node.hasOwnProperty("file")){
                    if(node.file.id == id){
                        parent && parent.forEach(function(item,ind){
                            if(item.file.id === id){
                                deleteObj = parent.splice(ind,1);
                            }
                        })
                    }else{
                        if(node.hasOwnProperty("children")){
                            for(var o in node.children){
                                deleteFromTreeData(node.children[o],id,node.children);
                            }
                        }
                    }
                }else{
                    if(node.hasOwnProperty("children")){
                      for(var o in node.children){
                        deleteFromTreeData(node.children[o],id,node.children);
                      }
                    }
                }
            }
            deleteFromTreeData(node,id,parent);
            return deleteObj;
          }

          function yhnControlfolder(){
              $scope.treedata={};
              $scope.otherdata = {};
              $scope.treedata.children = [];
              $scope.otherdata.children = [];
              let dataTree = $scope.filesMenu;
              for(let s = 0;s< dataTree.children.length;s++){
                  if(dataTree.children[s].file.name!="trash"&&dataTree.children[s].file.name!="favorites"){
                      $scope.treedata.children.push(dataTree.children[s]);
                  }else{
                      $scope.otherdata.children.push(dataTree.children[s]);
                  }
              }
              $rootScope.ceshi=$scope.treedata.children;
              $scope.$watch(folderFactory.nodeOperatePut,(newValue)=>{
                  if (newValue == 1) {
                      $scope.dataReports.map(a=>{
                          if(a.name=="favorites"){
                              a.value = {};
                          }
                      })
                  }
              }, true);
          }
          $scope.$on("freshMyFileTree",function(d,data){
              /*显示过渡动画*/
              getFileTree();
          })

          /*接受上传文件的信号*/
          $rootScope.$on("freshUpdateFile",function(d,data){
                /*将返回来的data插入$scope.datatree*/
              $scope.addIntoTreeData($scope.treedata,data);
              $scope.addIntoTreeData($rootScope.dataCache.treedata,data);
              /*触发点击事件*/
              $scope.$broadcast("displayUpdateNow",data);

          })

          function getFileTree(){
                if (!$scope.$$phase && !$scope.$root.$$phase) {
                    $scope.$digest();
                }
                folderFactory.getInfoAjax("/xdatainsight/api/repo/files/tree?showHidden="+($rootScope.ifhide?true:false)+"&filter=*|FILES&_="+new Date().getTime(),"get")
                    .then((data)=>{
                        $scope.$emit('fileTreeLoaded',true);
                        if (!$scope.$$phase && !$scope.$root.$$phase) {
                            $scope.$digest();
                        }
                        // $('.modulePop').css({
                        //     display: 'none',
                        //     background: 'rgba(0, 0, 0, 0.02)'
                        // });
                        /*过度动画小时*/
                      //let collectObj = {
                      //    file: {
                      //        aclNode: 'false',
                      //        fileSize: '0',
                      //        folder: 'true',
                      //        hidden: 'false',
                      //        locked: 'false',
                      //        name: 'favorites',
                      //        ownerType: '-1',
                      //        title: '收藏夹',
                      //        versioned: 'false'
                      //    },
                      //    children: []
                      //};
                      // 回收站
                      let trashObj = {
                          file: {
                              aclNode: 'false',
                              fileSize: '0',
                              folder: 'true',
                              hidden: 'false',
                              locked: 'false',
                              name: 'trash',
                              ownerType: '-1',
                              title: '回收站',
                              versioned: 'false'
                          },
                          children: []
                      };
                      data.children.push(trashObj);
                      $scope.filesMenu = data;

                      $rootScope.myFileTree = data.children;
                      $rootScope.$broadcast("myMenuFreshed",data.children);
                      $rootScope.dataCache.treedata = data;
                      yhnControlfolder();
                      document.querySelector('.popup').style.display="none";
                      document.querySelector('.modulePop').style.display="none";

                      $rootScope.$emit("fileTreeReady");
                    }, (data)=>{
                        $scope.$emit('fileTreeLoaded',false);
                        if (!$scope.$$phase && !$scope.$root.$$phase) {
                            $scope.$digest();
                        }
                        document.querySelector('.popup').style.display="none";
                        document.querySelector('.modulePop').style.display="none";
                    });
                    function yhnControlfolder(){
                        $scope.treedata={};
                        $scope.otherdata = {};
                        $scope.treedata.children = [];
                        $scope.otherdata.children = [];
                        let dataTree = $scope.filesMenu;
                        for(let s = 0;s< dataTree.children.length;s++){
                            if(dataTree.children[s].file.name!="trash"&&dataTree.children[s].file.name!="favorites"){
                                $scope.treedata.children.push(dataTree.children[s]);
                            }else{
                                $scope.otherdata.children.push(dataTree.children[s]);
                            }
                        }
                        $rootScope.ceshi=$scope.treedata.children;
                        $scope.$watch(folderFactory.nodeOperatePut,(newValue)=>{
                            if (newValue == 1) {
                                $scope.dataReports.map(a=>{
                                    if(a.name=="favorites"){
                                        a.value = {};
                                    }
                                })
                            }
                        }, true);

                    }
          };
          getFileTree();
        }])
        .directive('fileTree',['$rootScope','$http',($rootScope,$http)=>{
            return{
                restrict:'E',
                template:require('./file.html'),
                controller:['$scope','panelFactory','folderFactory',
                    ($scope,panelFactory,folderFactory)=>{
                    $scope.$on("menuFresh",function(){
                        $scope.menuFresh();
                        document.querySelector("#outerShelter").style.display = "none";
                    })
                    $scope.menuFresh = function(){
                        document.querySelector('.modulePop').style.display="block";
                        document.querySelector('.modulePop').style.background="rgba(0, 0, 0, 0.02)";
                        if($scope.folderNode){
                            $scope.folderNode.folderList = [];
                        }
                        $scope.$emit("freshMyFileTree");
                    }
                    $scope.$on('operateName',(d,data)=>{
                        $scope.operateList = [];
                        for(let i = 0;i<data.operateMenuParam.length;i++){
                            let dataObj={
                                operateMenuParam:data.operateMenuParam[i],
                                operateMenuClass:data.operateMenuClass[i]
                            }
                            $scope.operateList.push(dataObj);
                        }
                        $scope.$apply();
                        $scope.nodeFolder = data.nodeFolder;
                        $scope.nodeProperty = data.nodeProperty;
                        if(data && data.nodeFolder && data.nodeFolder.file && data.nodeFolder.file.path){
                            $scope.position = data.nodeFolder.file.path.substring(0,data.nodeFolder.file.path.lastIndexOf("\/"));
                        }else{
                            $scope.position = '';
                        }
                        /*if (data.nodeFolder.file.hidden === "true"){
                            $scope.fileHiden = true;
                        } else {
                            $scope.fileHiden = false;
                        }*/
                        if ($scope.nodeFolder.file.ownerType === "-1"){
                            $scope.nodeFolder.file.ownerType = "目录";
                        }
                    });
                    $scope.$on('lv',(d,data)=>{
                        $scope.nodeFolder = data;
                        document.querySelector('.popup').style.display="block";
                        $('.advancedSettingBox').hide();
                        document.querySelector('.propertyPopup').style.display="block";
                        $scope.position = data.file.path.substring(0,data.file.path.lastIndexOf("\/"));
                        if (data.file.hidden === "true"){
                            $scope.fileHiden = true;
                        } else {
                            $scope.fileHiden = false;
                        }
                        if ($scope.nodeFolder.file.ownerType === "-1"){
                            $scope.nodeFolder.file.ownerType = "目录";
                        }
                        $scope.readAble = true;
                        let path = $scope.nodeFolder.file.path;
                        folderFactory.getInfoAjax('/xdatainsight/api/repo/files/'+path+'/acl?random='+ $.now(),'get')
                            .then((data)=>{
                                if (data.entriesInheriting == "true"){
                                    $scope.inherit = true;
                                } else {
                                    $scope.inherit = false;
                                }
                                $scope.shareData = data;
                                $scope.getUserName(data.aces[0]);
                            },(data)=>{

                            })
                    });

                    /*接受信号，准备接受上传文件*/
                    $scope.$on("deliverPathName",function(d,data){
                        var path = data.split("/").join(":");
                        $http.get("/xdatainsight/api/repo/files/"+path+"/tree?showHidden="+($rootScope.ifhide?true:false)+"&_="+new Date().getTime())
                            .success(function(response2){
                                $rootScope.$broadcast("freshUpdateFile",response2);
                            })
                            .error(function (response2) {
                                console.log("暂无数据");
                            })
                    })


                    $scope.folderOperateMeans=($event,node)=>{

                        $scope.folderOperateObj = {};
                        $('.advancedSettingBox').hide();
                        document.querySelector('.popup').style.display="block";      
                        $('.advancedSettingBox').hide();                  
                        let nodeOperateMeans = {
                            newFolder(){ 
                                $scope.folderOperateObj.newFolderPopup = 1;
                            },
                            upload(){
                                document.querySelector(".uploadPopup").style.display = "block";
                            },
                            download(){
                                panelFactory.downloadFile($scope.nodeFolder);
                                document.querySelector('.popup').style.display="none";
                            },
                            delete(){
                                $scope.deleteFile($scope.nodeFolder.file.id,$event,$scope.nodeFolder.file.name,"folder");
                                document.querySelector('.popup').style.display="none";
                            },
                            propertyFolder(){                                
                                document.querySelector('.propertyPopup').style.display="block";
                                $scope.readAble = true;
                                let path = $scope.nodeFolder.file.path;
                                folderFactory.getInfoAjax('/xdatainsight/api/repo/files/'+path+'/acl?random='+ $.now(),'get')
                                    .then((data)=>{
                                        if (data.entriesInheriting == "true"){
                                            $scope.inherit = true;
                                        } else {
                                            $scope.inherit = false;
                                        }
                                        $scope.shareData = data;
                                        $scope.getUserName(data.aces[0]);
                                    },(data)=>{

                                    })
                            },
                            clearOutCollection(){
                               $scope.folderOperateObj.favoritePopup = 1;
                            },
                            clearOutTrash(){
                               $scope.folderOperateObj.trashPopup = 1; 
                                
                            },
                            rename(args){                               
                                $scope.folderOperateObj.renameFolderPopup = 1;
                                $scope.fileOldName = $scope.nodeProperty[3].innerText;
                            },
                            noneNode(){
                            }
                        };
                       node.operateMenuClass ? nodeOperateMeans[node.operateMenuClass](node):nodeOperateMeans[noneNode](node);
                    };
                    $scope.folderOperateClose = ()=>{
                        document.querySelector('.popup').style.display="none"; 
                        document.querySelector(".operate-menu").style.display = "none";
                        document.querySelector(".uploadPopup").style.display = "none";
                        document.querySelector('.propertyPopup').style.display="none";
                        if($scope.folderOperateObj){
                            $scope.folderOperateObj.renameFolderPopup = 0;
                            $scope.folderOperateObj.newFolderPopup = 0;
                            $scope.folderOperateObj.favoritePopup = 0;
                            $scope.folderOperateObj.trashPopup = 0;
                            $scope.folderOperateObj.propertyFolderPopup = 0;
                        }
                        // document.querySelector('.setProperty').style.display = "none";
                        // document.querySelector('.userInfo').style.display = "block";
                        // document.querySelector('.shareInfo').style.display = "none";
                        document.querySelectorAll(".selectProperty li")[0].classList.add("active");
                        document.querySelectorAll(".selectProperty li")[1].classList.remove("active");
                        document.querySelector(".propertyBody .item0").style.display = "block";
                        document.querySelector(".propertyBody .item1").style.display = "none";
                        $scope.init();
                    }    
                }]              
            }           
        }])
        .factory('folderFactory',['$http','$q',($http,$q)=>{
            let folderParam = {};
            let folderNode = 0;
            folderParam.nodeOperateGet = (args)=>{
                folderNode = args;
            }
            folderParam.nodeOperatePut = ()=>{
                return folderNode;
            } 
            folderParam.getInfoAjax = (operateUrl,ajaxMode,data)=>{
                let deferred = $q.defer();
                $http({
                  method: ajaxMode,
                  headers:{contentType: "application/json; charset=utf-8"},
                  url: operateUrl,
                  dataType: 'json',
                  data: data
                }).success((data)=>{
                  deferred.resolve(data);
                }).error(()=>{
                  deferred.reject('There was an error');
                })
                return deferred.promise;  
            }          
            return folderParam;
        }])                   
}

