

import angular from 'angular';
import $ from 'jquery';
import { tips } from '../../../popup/dataSource/component/createModule/public'
{
    'use strict';
	angular.module("xdt/operateFolder",[])
	.directive('renameFolder',()=>{  
        return{
            restrict:'E',
            template:require('./rename-folder.html'),         
            controller:['$scope','panelFactory',($scope,panelFactory)=>{     
                $scope.showRenameErrormsg = (message)=>{
                    let $errMessge = $('.renamePopup .renameTips');
                    $errMessge.text(message).removeClass('hiddenTips');
                }

                $scope.hideRenameErrormsg = ()=>{
                    let $errMessge = $('.renamePopup .renameTips');
                    $errMessge.text('').addClass('hiddenTips');
                }

                $scope.renameFolderRequest=(fileParam)=>{ 
                    let fileFirstName =$scope.nodeProperty[3].innerText;
                    let newName = $("input.renameInput").val();
                    let reg = /[\\/:;\?\+#%&\*\|\[\]]+/;
                    newName = $.trim(newName);
                    if(newName === ''){
                        $scope.showRenameErrormsg('名字不能为空');
                        return;
                    }
                    if(reg.test(newName)){
                        $scope.showRenameErrormsg('名称不能包含下列字符：\\/:;?+#%&*|[]');
                        return;
                    }
                   let nodeFolderObj = $scope.nodeFolder.file.path;

                   panelFactory.renameRequest(fileParam,nodeFolderObj)
                    .then((data)=>{
                        $scope.nodeFolder.file.name = fileParam;
                        $scope.nodeFolder.file.title = fileParam;
                        $scope.nodeFolder.file.path = nodeFolderObj.substring(0,nodeFolderObj.lastIndexOf("\/"))+'/'+fileParam;
                        $scope.nodeProperty[3].innerText = fileParam;
                        $scope.folderOperateClose();
                        document.querySelector(".operate-menu").style.display = "none";
                        $scope.$emit("freshMyFileTree");
                    }, (data)=>{
                        $scope.showRenameErrormsg('你没有权限重命名该文件，或目标名称已存在');
                    });
                }
            }]
        }
    })
    .directive('uploadFolder',()=>{

        return{
            restrict:'E',
            template: require('./upload-folder.html'), 
            link(){
                //let pathParam = document.querySelector("#uploadFile");
                //pathParam.onchange=()=>{
                //    document.querySelector(".filePathParam").innerHTML=pathParam.value;
                //}
            },        
            controller:['$scope','$rootScope','$http','operateFactory',($scope,$rootScope,$http,operateFactory)=>{
                $scope.init=()=>{
                    $scope.overwriteFile="true";
                    $scope.overwriteAclPermissions="true";
                    $scope.retainOwnership="true";
                    $scope.fileName="true";
                    document.querySelector(".filePathParam").innerHTML="";
                    $("input[name='fileNameOverride']").attr("value","");
                    $(".fileOperate #uploadFile").val("");
                };
                $scope.init();
                $scope.changeVal=(e)=>{
                    document.querySelector(".filePathParam").innerHTML=e;
                    var fileName=e.substring(e.lastIndexOf("\\")+1,e.length);
                    $("input[name='fileNameOverride']").attr("value",fileName);
                };
                function addIntoTreeData(node,data,parent){
                        if(node.hasOwnProperty("file")){
                            if(node.file.path == data.file.path){
                                parent && parent.map(function(item,ind){
                                    if(item.file.path === data.file.path){
                                        item.children = data.children;
                                    }
                                })
                            }else{
                                if(node.hasOwnProperty("children")){
                                    $.each(node.children,function(index,value){
                                            addIntoTreeData(value,data,node.children);
                                    })
                                    // for(var o of node.children){
                                    //     addIntoTreeData(o,data,node.children);
                                    // }
                                }
                            }

                        }else{
                            if(node.hasOwnProperty("children")){
                                $.each(node.children,function(index,value){
                                    addIntoTreeData(value,data,node.children);
                                })
                                // for(var o of node.children){
                                //     addIntoTreeData(o,data,node.children);
                                // }
                            }
                        }
                }

                //恢复我消失的文件上传功能
                $rootScope.$on("freshUpdateFile",function(d,data){
                    /*将返回来的data插入$scope.datatree*/
                    addIntoTreeData($scope.treedata,data);
                    addIntoTreeData($rootScope.dataCache.treeData,data);
                });

                $scope.uploadFolderRequest=()=>{
                    if($("input[name='fileNameOverride']").attr("value").length>0){
                        var data = new FormData(/*document.querySelector("#flieForm")*/);
                        data.append('importDir',$('#importDir').val());
                        data.append('overwriteFile',$('#overwriteFile').val());
                        data.append('overwriteAclPermissions',$('#overwriteAclPermissions').val());
                        data.append('applyAclPermission',$('#applyAclPermission').val());
                        data.append('retainOwnership',$('#retainOwnership').val());
                        data.append('logLevel',$('#logLevel').val());
                        data.append('charSet',$('#charSet').val());
                        data.append('fileNameOverride',$('#fileNameOverride').val());
                        data.append('fileUpload',$('#uploadFile')[0].files[0]);
                        $.ajax({
                          type:'post',
                          url:'/xdatainsight/api/repo/files/import',
                          data: data,
                          processData: false,
                          contentType: false,
                          cache: false
                        }).then(data=>{
                          $scope.$broadcast("deliverPathName",$scope.nodeFolder.file.path)


                          $scope.folderOperateClose();
                          if(data === "INVALID_MIME_TYPE"){
                              tips("不支持文件类型");
                          }else{
                              tips("上传成功！");
                          }
                        },(e)=>{
                          console.log(e,'请求失败');
                        });
                        /*$http({
                            method: 'post',
                            headers:{"Content-Type": 'multipart/form-data'},
                            url: "/xdatainsight/api/repo/files/import",
                            data: data,
                            processData: false,
                            // contentType: false,
                            cache: false
                        }).success((data)=>{
                            $scope.$broadcast("deliverPathName",$scope.nodeFolder.file.path)


                            $scope.folderOperateClose();
                            if(data === "INVALID_MIME_TYPE"){
                                tips("不支持文件类型");
                            }else{
                                tips("上传成功！");
                            }
                        }).error(e=>console.log(e,'asdas'));*/
                    }else{
                        tips("请选择上传的文件");
                    }

                }                                            
            }]
        }
    })
    .directive('newFolder',()=>{
        return{
            restrict:'E',
            template: require('./new-folder.html'),          
            controller:['$scope','operateFactory',($scope,operateFactory)=>{
                $scope.showNewErrormsg = (message)=>{
                    let $errMessge = $('.newFolderPopup .newNameTips');
                    $errMessge.text(message).removeClass('hiddenTips');
                }

                $scope.hideNewErrormsg = ()=>{
                    let $errMessge = $('.newFolderPopup .newNameTips');
                    $errMessge.text('').addClass('hiddenTips');
                }

                $scope.newFolderRequest = ()=>{
                    let newFolderName = $(".newFolderPopup .newNameInput").val();
                    let reg = /[\\/:;\?\+#%&\*\|\[\]]+/;
                    newFolderName = $.trim(newFolderName);
                    if(newFolderName === ''){
                        $scope.showNewErrormsg('名字不能为空');
                        return;
                    }
                    if(reg.test(newFolderName)){
                        $scope.showNewErrormsg('名称不能包含下列字符：\\/:;?+#%&*|[]');
                        return;
                    }
                    let newFolderPath = $scope.nodeFolder.file.path + '/'+ newFolderName;
                    let dataPath = encodeURI(newFolderPath.replace( /:/g, "\t").replace( /\//g, ":" ));
                    let newUrl = '/xdatainsight/api/repo/files/'+dataPath+'/createDir';
                    operateFactory.operateRequest(newUrl,'put')
                    .then((data)=>{
                        $scope.folderOperateClose();                    
                        operateFactory.folderDataHandle($scope.treedata,$scope.nodeFolder,newFolderName);
                        /*获取最新的文件*/
                        $scope.$emit("freshMyFileTree");
                    }, (data)=>{
                        // $scope.folderOperateObj.newFolderPopup = 0;
                        // document.querySelector('.popup').style.display = "none";
                        $scope.showNewErrormsg('你没有权限创建目录或目录已存在');
                        // $('.newFolderPopup .newNameTips').removeClass("hiddenTips");
                        // tips("你没有权限创建目录或目录已存在");
                    }) 
                }
            }]
        }
    })
    .directive('clearoutCollection',()=>{
        return{
            restrict:'E',
            template: require('./clearOut-collection.html'),
            controller:['$scope','operateFactory','folderFactory',($scope,operateFactory,folderFactory)=>{               
                $scope.clearoutCollectionRequest=()=>{                                       
                    $scope.folderOperateClose();
                    operateFactory.operateRequest('/xdatainsight/plugin/xdt/api/user-settings/favorites','post')
                    .then((data)=>{
                        let ifClear = 1;
                        folderFactory.nodeOperateGet(ifClear);  
                        $scope.otherdata.children.map((d,i)=>{
                            if(d.file.name=="favorites"){                                                                                        
                               $(document.querySelector('.filesList>ul')).remove();
                               d.children = [];
                            }
                        })
                        $scope.folderOperateClose();
                    },(data)=>{

                    })
                }
            }]
        }
    })
    .directive('clearoutTrash',()=>{
        return{
            restrict:'E',
            template: require('./clear-trash.html'),
            controller: ['$scope','$http',($scope,$http) => {
              $scope.clearoutTrash=()=>{
                  $scope.folderOperateClose();
                  let trashFiles = $scope.nodeFolder.children;
                  let trashFilesId = [];
                  if(trashFiles){
                      for(let i = 0;i<trashFiles.length;i++){
                         trashFilesId.push(trashFiles[i].file.id); 
                      }
                  }
                  let data = trashFilesId.join(",");
                  $.ajax({
                    type: 'put',
                    contentType: 'application/json; charset=utf-8',
                    url: '/xdatainsight/api/repo/files/deletepermanent',
                    dataType: 'text',
                    data: data
                  }).then((data1)=>{
                    $scope.otherdata.children.map((d,i)=>{
                          if(d.file.name=="trash"){
                              //清空回收站内容
                              $(".filesList>ul>li").remove();
                             d.children = [];
                          }
                      })
                      //清空回收站之后，重新拉取数据
                      $scope.$emit("freshMyFileTree");
                  },(e)=>{
                    console.log(e);
                  });
                  /*$http({
                    method: 'PUT',
                    headers:{contentType: "application/json; charset=utf-8"},
                    url: '/xdatainsight/api/repo/files/deletepermanent',
                    dataType: 'text',
                    data: data
                  }).then((data1)=>{
                    $scope.otherdata.children.map((d,i)=>{
                          if(d.file.name=="trash"){
                              //清空回收站内容
                              $(".filesList>ul>li").remove();
                             d.children = [];
                          }
                      })
                      //清空回收站之后，重新拉取数据
                      $scope.$emit("freshMyFileTree");
                  },(e)=>{
                    console.log(e);
                  });*/
              }                
          }]
        }
    })
    .directive('propertyFolder',()=>{
        return{
            restrict:'E',
            template:require('./property-folder.html'),
            link(){
                $(".selectProperty li").click(function () {
                    $(this).addClass("active").siblings().removeClass("active");
                    $(".item").hide();
                    $(".item"+$(this).index()).show();
                });
            },
            controller: ['$scope','operateFactory',($scope,operateFactory) => {

              //设置权限
              $scope.getPermissions = (data)=>{
                  $scope.allDisabled = false;
                  if (data.permissions.length === 1){
                      if (data.permissions === "4"){
                          $scope.allAble = true;
                          $scope.writeAble = true;
                          $scope.deleteAble = true;
                          $scope.deleteDisabled = true;
                          $scope.writeDisabled = true;
                      } else {
                          $scope.allAble = false;
                          $scope.writeAble = false;
                          $scope.deleteAble = false;
                          $scope.deleteDisabled = false;
                          $scope.writeDisabled = false;
                      }
                  } else {
                      if (data.permissions.length === 2){
                          $scope.allAble = false;
                          $scope.deleteAble = false;
                          $scope.deleteDisabled = false;
                          $scope.writeAble = true;
                          $scope.writeDisabled = false;
                      }
                      if (data.permissions.length === 3){
                          $scope.allAble = false;
                          $scope.deleteAble = true;
                          $scope.deleteDisabled = false;
                          $scope.writeAble = true;
                          $scope.writeDisabled = true;
                      }
                  }
                  if ($scope.canDelete === "false" || $scope.inherit ===true){
                      $scope.allDisabled = true;
                      $scope.deleteDisabled = true;
                      $scope.writeDisabled = true;
                  }
              };
              //获取角色权限
              $scope.getUserName = (name)=>{
                  $scope.selectName = name;
                  $scope.canDelete = $scope.selectName.modifiable;
                  $scope.ableName = name.recipient;
                  for (var i = 0; i < $scope.shareData.aces.length; i++){
                      if ($scope.shareData.aces[i].recipient == name.recipient){
                          $scope.modified = $scope.shareData.aces[i];
                      }
                  }
                  $scope.getPermissions($scope.selectName);
              };
              //角色列表
              $scope.roleBox = () =>{
                  if ($scope.inherit){
                      tips("继承目录权限，不可编辑");
                      return false;
                  }
                  operateFactory.operateRequest('/xdatainsight/api/userrolelist/permission-users','get')
                      .then((data)=>{
                          $scope.usersName = $scope.filterRole(data.users);
                      },(data)=>{

                      })
                  operateFactory.operateRequest('/xdatainsight/api/userrolelist/permission-roles','get')
                      .then((data)=>{
                          $scope.rolesName = $scope.filterRole(data.roles);
                      },(data)=>{

                      })
                  document.querySelector(".roleBox").style.display = "block";
              };
              //过滤角色
              $scope.filterRole = (e) =>{
                  for (var i = 0; i < $scope.shareData.aces.length; i++){
                      if (e.indexOf($scope.shareData.aces[i].recipient)>=0){
                          e.splice(e.indexOf($scope.shareData.aces[i].recipient),1);
                      }
                  }
                  return e;
              };
              //关闭角色列表
              $scope.closeRoleBox = () =>{
                  document.querySelector(".roleBox").style.display = "none";
              };
              //权限选择
              //isSelfDisabled 自己是否不可用
              $scope.changeCheckbox = (isSelfDisabled) =>{
                  if(isSelfDisabled === true){
                      return;
                  }
                  if ($scope.allAble){
                      $scope.deleteDisabled = true;
                      $scope.deleteAble = true;
                      $scope.writeDisabled = true;
                      $scope.writeAble = true;
                      $scope.modified.permissions = "4";
                  } else {
                      if ($scope.deleteAble){
                          $scope.deleteDisabled = false;
                          $scope.writeAble = true;
                          $scope.writeDisabled = true;
                          $scope.modified.permissions = ["0", "1", "2"];
                      } else {
                          $scope.writeDisabled = false;
                          if ($scope.writeAble){
                              $scope.modified.permissions = ["0", "1"];
                          }else {
                              $scope.modified.permissions = "0";
                          }
                      }
                  }
              };
              //添加成员
              $scope.addRole = () =>{
                  var Option1=document.querySelectorAll(".propertyUser option");
                  var Option2=document.querySelectorAll(".propertyRole option");
                  add(Option1,0);
                  add(Option2,1);
                  function add(e,num) {
                      for(var i=0;i<e.length;i++){
                          if(e[i].selected){
                              var add = {
                                  modifiable:"true",
                                  permissions:"0",
                                  recipient:e[i].value,
                                  recipientType:num
                              };
                              $scope.shareData.aces.push(add);
                              angular.element(e[i]).remove();
                          }
                      }
                  };
                  $scope.closeRoleBox();
              };
              //移除成员
              $scope.removeRole = () =>{
                  if ($scope.canDelete === "true" && $scope.inherit !== true){
                      var options = document.querySelectorAll(".item1 option");
                      for (var i = 0; i<options.length; i ++){
                          if (options[i].selected){
                              $scope.shareData.aces.splice(i,1);
                          }
                      }
                  }else{
                    tips("继承目录权限，不可编辑");
                  }
              };
              //修改继承
              $scope.changeInhert = (e) =>{
                  if ($scope.position.length>0){
                      if (e){
                         $scope.shareData.entriesInheriting = "true";
                          operateFactory.operateRequest('/xdatainsight/api/repo/files/'+$scope.position+'/acl?random='+ $.now(),'get')
                              .then((data)=>{
                                  $scope.allDisabled = true;
                                  $scope.deleteDisabled = true;
                                  $scope.writeDisabled = true;
                                  $scope.shareData.aces = data.aces;
                                  
                                  $scope.getUserName(data.aces[0]);
                              },(data)=>{

                              })
                      } else {
                          //entriesInheriting和inhert不同步，引起继承修改不生效问题
                          $scope.shareData.entriesInheriting = 'false';
                          $scope.getUserName($scope.selectName);
                      }
                  } else {
                      $scope.inherit = false;
                      tips("不能从文件夹继承权限 Not Found");
                  }

              };
              //完成
              $scope.propertyComplete = () =>{
                  var stringKeyStringValueDto ={stringKeyStringValueDto : [{key: "_PERM_HIDDEN", value: (!!$scope.fileHiden).toString()}]};

                  operateFactory.operateRequest('/xdatainsight/api/repo/files/'+$scope.nodeFolder.file.path+'/metadata','put',stringKeyStringValueDto)
                        .then((data)=>{
                            $scope.nodeFolder.file.hidden =  (!!$scope.fileHiden).toString();
                            $scope.folderOperateClose();
                        },(data)=>{

                        });

                  operateFactory.operateRequest('/xdatainsight/api/repo/files/'+$scope.nodeFolder.file.path+'/acl?random='+$.now(),'put',$scope.shareData)
                        .then((data)=>{
                            tips("修改成功");
                            $scope.folderOperateClose();
                        },(data)=>{
                            if($scope.nodeFolder.file.folder == "true"){
                                tips("你没有权限修改目录属性，请联系管理员");
                            }else{
                                tips("你没有权限修改文件属性，请联系管理员");
                            }
                        });
              }
          }]
        }
    })
    .factory('operateFactory',['$http','$q',($http,$q)=>{
        let service = {};
        service.operateRequest = (operateUrl,ajaxMode,data)=>{            
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
        };
        service.loopDataTree = (nodes,nodeFolder,newFolderName)=>{
           /* for(let i=0;i<nodes.length;i++){
                let node = nodes[i];

                if(node.file.path == nodeFolder){
                    let path = nodeFolder+'/'+newFolderName;                 
                    if(node.children){   
                        node.children.push({
                            file:{
                                name:newFolderName,
                                title:newFolderName,
                                path:path,
                                folder:"true"
                            }
                        });                                            
                    }else{
                        node.children=[];
                        node.children.push({
                            file:{
                                name:newFolderName,
                                title:newFolderName,
                                path:path,
                                folder:"true"
                            }
                        });
                    }
                    break;
                }
                if(node.children && node.children.length>0){
                    service.loopDataTree(node.children,nodeFolder,newFolderName);
                }
            }     */
        }
        service.folderDataHandle = (treedata,nodeFolder,newFolderName)=>{           
            let nodes = treedata.children;
            service.loopDataTree(nodes,nodeFolder.file.path,newFolderName);                             
        }
        service.switchProperty =()=>{
            document.querySelector('.setProperty').style.display = "block";
            document.querySelector('.userInfo').style.display = "none";
            document.querySelector('.shareInfo').style.display = "none";
        }
        return service;         
    }])    
}