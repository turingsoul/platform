import angular from "angular";
import $ from "jquery";
import "./file_management.css";
import { tips } from "../../popup/dataSource/component/createModule/public";

{
  angular.module("xdt/fileManagement", []).directive("fileManagement", () => {
    return {
      restrict: "E",
      template: require("./file_management.html"),
      // scope:{
      //   propdata:'<',
      // },
      controller: [
        "$scope",
        "$state",
        "panelFactory",
        "$http",
        "$rootScope",
        "pageService",
        "taskplanProvider",
        "tabHandleFactory",
        (
          $scope,
          $state,
          panelFactory,
          $http,
          $rootScope,
          pageService,
          taskplanProvider,
          tabHandleFactory
        ) => {
            /*显示文件管理过渡框*/
            // $('.modulePop').css({
            //     display: 'block',
            //     background: 'rgba(0, 0, 0, 0.02)'
            // });
          /*默认不选中全选状态*/
          $scope.all = false;
          $scope.filePanelLoading = false;
          $scope.pageLoading = true;

          /*点击全选checkbox，切换全选效果*/
          $scope.checkAll = function(folderNode) {
            if ($scope.all) {
              for (var i = 0; i < folderNode.folderList.length; i++) {
                folderNode.folderList[i].file.fileChecked = true;
              }
            } else {
              for (var i = 0; i < folderNode.folderList.length; i++) {
                folderNode.folderList[i].file.fileChecked = false;
              }
            }
            $scope.singleCheck(folderNode);
          };
          /*是否显示回收站功能菜单*/
          $rootScope.ifRecycleBin = false;

          /*接受检测文件是否选中信号*/
          $scope.$on("checkIfHaveFile", function() {
            //添加容错处理
            if ($scope.folderNode) {
              $scope.folderNode.folderList = [];
              $scope.singleCheck($scope.folderNode);
            }
          });

          /*有无选中标记控制功能菜单弹出*/

          $scope.ifCheckOnefile = false;
          $scope.currentBaseMent = null;
          /*单击单个checkbox*/
          $scope.singleCheck = function(folderNode) {
            $scope.currentBaseMent = folderNode;
            var tag = false;
            for (var i = 0; i < folderNode.folderList.length; i++) {
              if (folderNode.folderList[i].file.fileChecked == true) {
                tag = true;
              }
            }
            if (tag == true) {
              $scope.ifCheckOnefile = true;
            } else {
              $scope.ifCheckOnefile = false;
            }
          };
          /*关闭批量复制框*/
          $scope.closeMultiCopy = function() {
            $(".copyTo").addClass("hide");
          };
          /*关闭批量移动框*/
          $scope.closeMultiMove = function() {
            $(".moveTo").addClass("hide");
          };
          $scope.fileBothLength = 1;
          $scope.fileDealLength = 1;
          /*发送批量删除复制请求*/
          $scope.sendMultiCopy = function(folderNode) {
            var chooseArray = [];
            for (var i = 0; i < folderNode.folderList.length; i++) {
              if (folderNode.folderList[i].file.fileChecked == true) {
                  chooseArray.push(folderNode.folderList[i]);
              }
            }
            /*判断有无选中路径*/
            if ($(".targetPath").text() != "") {
              $("file-management .copyTo").addClass("hide");
              $("file-management .durationTipCopy").removeClass("hide");
              $scope.fileBothLength = chooseArray.length;
              $scope.fileDealLength = chooseArray.length;
              $scope.copySingleFile(chooseArray);
            }
          };
          /*发送批量移动复制请求*/
          $scope.sendMultiMove = function(folderNode) {
            var chooseArray = [];
            for (var i = 0; i < folderNode.folderList.length; i++) {
              if (folderNode.folderList[i].file.fileChecked == true) {
                chooseArray.push(folderNode.folderList[i]);
              }
            }
            /*判断有无选中路径*/
            if ($(".moveTo .targetPath").text() != "") {
              $("file-management .moveTo").addClass("hide");
              $("file-management .durationTipMove").removeClass("hide");
              $scope.fileBothLength = chooseArray.length;
              $scope.fileDealLength = chooseArray.length;
              $scope.moveSingleFile(chooseArray);
            }
          };

          /*复制目标路径*/
          $scope.targetPath = "wtf";
          /*批量还原*/
          $scope.recoverMultiFile = function(folderNode) {
            var chooseArray = [];
            for (var i = 0; i < folderNode.folderList.length; i++) {
              if (folderNode.folderList[i].file.fileChecked == true) {
                chooseArray.push(folderNode.folderList[i]);
              }
            }
            /*删除操作*/
            $(".alert .alert-box .title-name").text("确认还原");
            $("file-management .alert-main p").text("确定要还原选中文件吗？");
            $("file-management .filePanel .alert").removeClass("hide");
            $scope.sure = function() {
              $("file-management .filePanel .alert").addClass("hide");
              $("file-management .durationRecover").removeClass("hide");
              $scope.fileBothLength = chooseArray.length;
              $scope.fileDealLength = chooseArray.length;
              $(".alert .alert-box .title-name").text("确认删除");
              // $scope.deleteSingleFile(chooseArray);
              $scope.recoverSingleFile(chooseArray);
            };
          };

          $scope.multiRecoverSingFile = function(chooseArray) {
            /*先检测有没有folder，有folder直接全部刷新*/
            var folderFlag = false;
            for (var i = 0; i < chooseArray.length; i++) {
              if (chooseArray[i].file.folder == "true") {
                folderFlag = true;
              }
            }
            if (folderFlag == true) {
              setTimeout(function() {
                $scope.$broadcast("freshMyFileTree");
              }, 0);
            } else {
              for (var i = 0; i < chooseArray.length; i++) {
                $scope.$broadcast("restoreDeletedNode", chooseArray[i]);
              }
            }
          };

          /*批量彻底删除*/
          $scope.permanentFile = function(folderNode) {
            var chooseArray = [];
            for (var i = 0; i < folderNode.folderList.length; i++) {
              if (folderNode.folderList[i].file.fileChecked == true) {
                chooseArray.push(folderNode.folderList[i]);
              }
            }
            /*删除操作*/
            $("file-management .alert-main p").text("确定彻底删除选中文件吗？");
            $("file-management .filePanel .alert").removeClass("hide");
            $scope.sure = function() {
              $("file-management .durationPermanent").removeClass("hide");
              $scope.fileBothLength = chooseArray.length;
              $scope.fileDealLength = chooseArray.length;
              // $scope.deleteSingleFile(chooseArray);
              // $scope.recoverSingleFile(chooseArray);
              $scope.permenantSingleFile(chooseArray);
            };
          };


          /*彻底删除*/
          $scope.cancelKey = false;
          $scope.permenantSingleFile = function(chooseArray) {
            $scope.error = false;
            if ($scope.cancelKey) {
              tips("已取消");
              return;
            } else {
              $scope.currentDelFile =
                chooseArray[$scope.fileDealLength - 1].file.name;
              panelFactory
                .delete(
                  chooseArray[$scope.fileDealLength - 1].file.id,
                  "/xdatainsight/api/repo/files/deletepermanent"
                )
                .then(
                  data => {
                    /*删除成功一条，应该将这条从模型中删除*/
                    for (
                      var i = 0;
                      i < $scope.currentBaseMent.folderList.length;
                      i++
                    ) {
                      if (
                        $scope.currentBaseMent.folderList[i].file.id ==
                        chooseArray[$scope.fileDealLength - 1].file.id
                      ) {
                        $scope.currentBaseMent.folderList.splice(i, 1);
                      }
                    }
                    /*删除成功之后还要删除缓存*/
                    $scope.$broadcast(
                      "deleteFileFromCacheTrash",
                      chooseArray[$scope.fileDealLength - 1].file.id
                    );

                    $scope.singleCheck($scope.currentBaseMent);

                    $("file-management .filePanel .alert").addClass("hide");
                    $scope.fileDealLength--;
                    if ($scope.fileDealLength != 0) {
                      $scope.permenantSingleFile(chooseArray);
                    } else {
                      // $("file-management .durationTip").addClass("hide");
                      $scope.$broadcast("freshMyFileTree");
                    }
                  },
                  data => {
                    $scope.error = true;
                    $scope.errorPath ="你没有权限删除" + $scope.currentDelFile + "文件/目录，或文件/目录已不存在，请联系管理员";
                  }
                );
            }
          };

          /*递归还原*/
          /*取消控制*/
          $scope.cancelKey = false;
          $scope.recoverSingleFile = function(chooseArray) {
            $scope.error = false;
            if ($scope.cancelKey) {
              tips("已取消");
              return;
            } else {
              $scope.currentDelFile =
                chooseArray[$scope.fileDealLength - 1].file.name;
              panelFactory
                .delete(
                  chooseArray[$scope.fileDealLength - 1].file.id,
                  "/xdatainsight/api/repo/files/restore"
                )
                .then(
                  data => {
                    /*还原成功一条，应该将这条从模型中删除*/
                    for (
                      var i = 0;
                      i < $scope.currentBaseMent.folderList.length;
                      i++
                    ) {
                      if (
                        $scope.currentBaseMent.folderList[i].file.id ==
                        chooseArray[$scope.fileDealLength - 1].file.id
                      ) {
                        $scope.currentBaseMent.folderList.splice(i, 1);
                      }
                    }
                    $scope.singleCheck($scope.currentBaseMent);

                    $("file-management .filePanel .alert").addClass("hide");
                    $scope.fileDealLength--;
                    if ($scope.fileDealLength != 0) {
                      $scope.recoverSingleFile(chooseArray);
                    } else {
                      // $("file-management .durationTip").addClass("hide");
                      /*批量操作缓存还原*/
                      $scope.multiRecoverSingFile(chooseArray);
                    }
                  },
                  data => {
                    $scope.error = true;
                    $scope.errorPath = "你没有权限还原" + $scope.currentDelFile + "文件，或文件已存在，请联系管理员";
                  }
                );
            }
          };
          $scope.menuFresh = function() {
            $scope.pageLoading = true;
            $scope.$broadcast("menuFresh");
          };

          $scope.cancelFileMulti = function() {
            $rootScope.ifMultiFolder = false;
            $scope.$broadcast("cancelMultiFolder");
          };

          /*发送批量删除信号*/
          $scope.showMultiFolder = function() {
            $rootScope.ifMultiFolder = true;
            $scope.$broadcast("accepetMultiFolder");
          };

          $rootScope.ifMultiFolder = false;

          /*点击显示shelter*/
          $scope.showOuterShelter = function(e) {
            document.querySelector("#outerShelter").style.display = "block";

          };

          /*点击空白处隐藏*/
          $scope.closeOuterShelter = function(e) {
            var element = $(e.target);
            var flag = element.hasClass("closeme");
            if (flag) {
              document.querySelector("#outerShelter").style.display = "none";
            }
          };

          $rootScope.$on("myMenuFreshed", function(d, data) {
            $rootScope.myFileTree = data;
          });

          /*批量复制*/
          $scope.multiCopy = function(folderNode) {
            $(".copyTo").removeClass("hide");
            $(".targetPath").empty();
            $("#positionChoose").empty();

            function Tree(data, el) {
              this.app = function(par, tag) {
                return par.appendChild(document.createElement(tag));
              };
              this.create($("#" + el)[0], data);
            }

            Tree.fn = Tree.prototype = {
              create: function(par, group) {
                var host = this,
                  length = group.length;
                for (var i = 0; i < length; i++) {
                  if (group[i].file.name != "trash") {
                    if (group[i].file.folder == "false") continue;
                    var dl = this.app(par, "DL"),
                      dt = this.app(dl, "DT"),
                      dd = this.app(dl, "DD");
                    dt.innerHTML =
                      '<a href="javascript:void(0)">' +
                      group[i].file.title +
                      "</a>";
                    dt.path = group[i].file.path;
                    dt.group = group[i].children;
                    dt.className += "node-close";
                    dt.onclick = function() {
                      $scope.planPath = this.path;
                      $(".targetPath").text(this.path);
                      if (document.querySelector(".copyTo .active")) {
                        document
                          .querySelector(".copyTo .active")
                          .classList.remove("active");
                      }
                      if (!this.group) {
                        if(this.className != "node-open"){
                            this.className = "node-open active";
                        }else{
                            this.className = "node-close active";
                        }

                        return;
                      }
                      var dd = this.nextSibling;
                      if (!dd.hasChildNodes()) {

                        if(dd.style.display == "block"){
                          dd.style.display = "";
                          this.className = "node-close active";
                        }else if(dd.style.display == "") {
                          var tag = this.group.some(function(ele,i,arr){
                              if(ele.hasOwnProperty("children")){
                                return true;
                              }
                              if(ele.file.folder == "true"){
                                  return true;
                              }
                              return false;
                          })
                            if(tag){
                                host.create(dd, this.group);
                                dd.style.display = "";
                                this.className = "node-open active";
                            }else{
                                dd.style.display = "block";
                                this.className = "node-open active";
                            }

                        }
                      } else {
                        var set =
                          dd.style.display == "none"
                            ? ["", "node-open active"]
                            : ["none", "node-close active"];
                        dd.style.display = set[0];
                        this.className = set[1];
                      }
                    };
                  }
                }
              }
            };

            if ($rootScope.myFileTree) {
              var et = new Tree($rootScope.myFileTree, "positionChoose");
            }
          };
          /*批量移动*/
          $scope.multiMove = function(folderNode) {
            $(".moveTo").removeClass("hide");
            $(".targetPath").empty();
            $("#positionChoose2").empty();

            function Tree(data, el) {
              this.app = function(par, tag) {
                return par.appendChild(document.createElement(tag));
              };
              this.create($("#" + el)[0], data);
            }
            Tree.fn = Tree.prototype = {
              create: function(par, group) {
                var host = this,
                  length = group.length;
                for (var i = 0; i < length; i++) {
                  if (group[i].file.name != "trash") {
                    if (group[i].file.folder == "false") continue;
                    var dl = this.app(par, "DL"),
                      dt = this.app(dl, "DT"),
                      dd = this.app(dl, "DD");
                    dt.innerHTML =
                      '<a href="javascript:void(0)">' +
                      group[i].file.title +
                      "</a>";
                    dt.path = group[i].file.path;
                    dt.group = group[i].children;
                    dt.className += "node-close";
                    dt.onclick = function() {
                      $scope.planPath = this.path;
                      $(".targetPath").text(this.path);
                      if (document.querySelector(".moveTo .active")) {
                        document
                          .querySelector(".moveTo .active")
                          .classList.remove("active");
                      }
                      if (!this.group) {
                          if(this.className != "node-open"){
                              this.className = "node-open active";
                          }else{
                              this.className = "node-close active";
                          }
                          return;
                      }
                      var dd = this.nextSibling;
                      if (!dd.hasChildNodes()) {
                          if(dd.style.display == "block"){
                              dd.style.display = "";
                              this.className = "node-close active";
                          }else if(dd.style.display == "") {
                              var tag = this.group.some(function(ele,i,arr){
                                  if(ele.hasOwnProperty("children")){
                                      return true;
                                  }
                                  if(ele.file.folder == "true"){
                                      return true;
                                  }
                                  return false;
                              })
                              if(tag){
                                  host.create(dd, this.group);
                                  dd.style.display = "";
                                  this.className = "node-open active";
                              }else{
                                  dd.style.display = "block";
                                  this.className = "node-open active";
                              }

                          }
                      } else {
                        var set =
                          dd.style.display == "none"
                            ? ["", "node-open active"]
                            : ["none", "node-close active"];
                        dd.style.display = set[0];
                        this.className = set[1];
                      }
                    };
                  }
                }
              }
            };

            if ($rootScope.myFileTree) {
              var et = new Tree($rootScope.myFileTree, "positionChoose2");
            }
          };
          $scope.error = false;
          /*批量复制*/
          $scope.copySingleFile = function(chooseArray) {
            $scope.error = false;
            if ($scope.cancelKey) {
              tips("已取消");
              $(".durationTipCopy").addClass("hide");
              return;
            } else {
              $scope.currentDelFile =
                chooseArray[$scope.fileDealLength - 1].file.name;
              panelFactory
                .copyTo(
                  chooseArray[$scope.fileDealLength - 1].file.id,
                  "/xdatainsight/api/repo/files/" +
                    encodeURI(
                      $(".copyTo .targetPath")
                        .text()
                        .split("/")
                        .join(":")
                    )
                      .split(":")
                      .join("%3A") +
                    "/children?mode=2"
                )
                .then(
                  data => {
                    /*for(var i=0;i<$scope.currentBaseMent.folderList.length;i++){
                                      if($scope.currentBaseMent.folderList[i].file.id == chooseArray[$scope.fileDealLength-1].file.id){
                                          $scope.currentBaseMent.folderList.splice(i,1);
                                      }
                                  }*/
                    /*$scope.singleCheck($scope.currentBaseMent);*/
                    $("file-management .filePanel .alert").addClass("hide");
                    $scope.fileDealLength--;
                    if ($scope.fileDealLength != 0) {
                      $scope.copySingleFile(chooseArray);
                    } else {
                      // $("file-management .durationTip").addClass("hide");
                      $scope.$broadcast("freshMyFileTree");
                    }
                  },
                  data => {
                    $scope.error = true;
                    $scope.errorPath =
                      "你没有权限写入到" +
                      $(".copyTo .targetPath").text() +
                      "目录,请联系管理员";
                  }
                );
            }
          };
          /*批量移动*/
          $scope.moveSingleFile = function(chooseArray) {
            $scope.error = false;
            if ($scope.cancelKey) {
              tips("已取消");
              $(".durationTipMove").addClass("hide");
              return;
            } else {
              $scope.currentDelFile =
                chooseArray[$scope.fileDealLength - 1].file.name;
              panelFactory
                .moveTo(
                  chooseArray[$scope.fileDealLength - 1].file.id,
                  "/xdatainsight/api/repo/files/" +
                    encodeURI(
                      $(".moveTo .targetPath")
                        .text()
                        .split("/")
                        .join(":")
                    )
                      .split(":")
                      .join("%3A") +
                    "/move"
                )
                .then(
                  data => {
                    for (
                      var i = 0;
                      i < $scope.currentBaseMent.folderList.length;
                      i++
                    ) {
                      if (
                        $scope.currentBaseMent.folderList[i].file.id ==
                        chooseArray[$scope.fileDealLength - 1].file.id
                      ) {
                        $scope.currentBaseMent.folderList.splice(i, 1);
                      }
                    }
                    $scope.singleCheck($scope.currentBaseMent);

                    $("file-management .filePanel .alert").addClass("hide");
                    $scope.fileDealLength--;
                    if ($scope.fileDealLength != 0) {
                      $scope.moveSingleFile(chooseArray);
                    } else {
                      // $("file-management .durationTip").addClass("hide");
                      $scope.$broadcast("freshMyFileTree");
                    }
                  },
                  data => {
                    $scope.error = true;
                    $scope.errorPath =
                      "你没有权限写入到" +
                      $(".moveTo .targetPath").text() +
                      "目录,请联系管理员";
                  }
                );
            }
          };
          /*批量删除*/
          $scope.multiDelete = function(folderNode) {
            var chooseArray = [];
            for (var i = 0; i < folderNode.folderList.length; i++) {
              if (folderNode.folderList[i].file.fileChecked == true) {
                chooseArray.push(folderNode.folderList[i]);
              }
            }
            /*删除操作*/
            $("file-management .alert-main p").text(
              "确定要删除选中的" + chooseArray.length + "个文件吗？"
            );
            $("file-management .filePanel .alert").removeClass("hide");
            $scope.sure = function() {
              $("file-management .durationTip").removeClass("hide");
              $scope.fileBothLength = chooseArray.length;
              $scope.fileDealLength = chooseArray.length;
              $scope.deleteSingleFile(chooseArray);
            };
          };
          /*取消批量删除*/
          $scope.cancelMultiDelete = function() {
            $scope.cancelKey = true;
            $("file-management .durationTip").addClass("hide");
            $("file-management .durationTipCopy").addClass("hide");
            $("file-management .durationTipMove").addClass("hide");
            $("file-management .durationFileMulti").addClass("hide");
            $("file-management .durationRecover").addClass("hide");
            $("file-management .durationPermanent").addClass("hide");
            $scope.fileBothLength = 1;
            $scope.fileDealLength = 1;
            setTimeout(function() {
              $scope.cancelKey = false;
            }, 1000);
          };
          $rootScope.publicTreeArray1 = [];
          /*文件数状态切换*/
          $scope.$on("treeChooseState", function(e, data) {
            $rootScope.publicTreeArray1 = data;
          });
          /*目录批量删除  点击删除按钮*/
          $scope.decideDeleteFileMulti = function() {
            /*删除操作*/
            $("file-management .alert-main p").text(
              "确定要删除选中的" +
                $rootScope.publicTreeArray1.length +
                "个目录吗？"
            );
            $("file-management .filePanel .alert").removeClass("hide");
            $scope.sure = function() {
              $("file-management .durationFileMulti").removeClass("hide");
              $("file-management .filePanel .alert").addClass("hide");
              $scope.fileBothLength = $rootScope.publicTreeArray1.length;
              $scope.fileDealLength = $rootScope.publicTreeArray1.length;
              $scope.deleteSingleFileMulti($rootScope.publicTreeArray1);
            };
          };
          /*取消控制*/
          $scope.cancelKey = false;
          $scope.deleteSingleFile = function(chooseArray) {
            $scope.error = false;
            if ($scope.cancelKey) {
              tips("已取消");
              return;
            } else {
              $scope.currentDelFile =
                chooseArray[$scope.fileDealLength - 1].file.name;
              panelFactory
                .delete(
                  chooseArray[$scope.fileDealLength - 1].file.id,
                  "/xdatainsight/api/repo/files/delete"
                )
                .then(
                  data => {
                    /*每次成功删除一条的同时，从缓存中删除一条*/
                    $scope.$broadcast(
                      "deleteFileFromCache",
                      chooseArray[$scope.fileDealLength - 1].file.id
                    );
                    /*删除成功一条，应该将这条从模型中删除*/
                    for (
                      var i = 0;
                      i < $scope.currentBaseMent.folderList.length;
                      i++
                    ) {
                      if (
                        $scope.currentBaseMent.folderList[i].file.id ==
                        chooseArray[$scope.fileDealLength - 1].file.id
                      ) {
                        $scope.currentBaseMent.folderList.splice(i, 1);
                      }
                    }
                    $scope.singleCheck($scope.currentBaseMent);
                    $("file-management .filePanel .alert").addClass("hide");
                    $scope.fileDealLength--;
                    if ($scope.fileDealLength != 0) {
                      $scope.deleteSingleFile(chooseArray);
                    } else {
                    }
                  },
                  data => {
                    $("file-management .filePanel .alert").addClass("hide");
                    $scope.error = true;
                    $scope.errorPath = "你没有权限删除" + $scope.currentDelFile + "文件，或文件已不存在，请联系管理员";
                  }
                );
            }
          };
          /*批量删除目录*/
          $scope.deleteSingleFileMulti = function(chooseArray) {
            $scope.error = false;
            if ($scope.cancelKey) {
              tips("已取消");
              return;
            } else {
              $scope.currentDelFile =
                chooseArray[$scope.fileDealLength - 1].file.name;

              panelFactory
                .delete(
                  chooseArray[$scope.fileDealLength - 1].file.id,
                  "/xdatainsight/api/repo/files/delete"
                )
                .then(
                  data => {
                    /*删除缓存*/
                    $scope.$broadcast(
                      "deleteFileFromCache",
                      chooseArray[$scope.fileDealLength - 1].file.id
                    );

                    /*删除成功一条，应该将这条从模型中删除*/
                    /* for(var i=0;i<$rootScope.publicTreeArray1.length;i++){
                                  if($rootScope.publicTreeArray1[i].file.id == chooseArray[$scope.fileDealLength-1].file.id){
                                      $rootScope.$emit("multiFileUpdate",$rootScope.publicTreeArray1[i].file.id);
                                      $rootScope.publicTreeArray1.splice(i,1);
                                  }
                              }*/
                    /*将删除的节点从总的模型中删除*/
                    // $rootScope.dataCache.treedata = [];
                    /*$scope.singleCheck($scope.currentBaseMent);*/
                    /*释放信号去删除模型中的该文件*/

                    $("file-management .filePanel .alert").addClass("hide");
                    $scope.fileDealLength--;
                    if ($scope.fileDealLength != 0) {
                      $scope.deleteSingleFileMulti(chooseArray);
                    } else {
                      // $("file-management .durationTip").addClass("hide");
                      /*删除完成，刷新目录列表*/
                      $rootScope.publicTreeArray1 = [];
                      // $scope.$broadcast("freshMyFileTree");
                    }
                  },
                  data => {
                    $("file-management .filePanel .alert").addClass("hide");
                    $scope.error = true;
                    $scope.errorPath = "你没有权限删除" + $scope.currentDelFile + "目录，或目录已不存在，请联系管理员";
                  }
                );
            }
          };

          /*关闭还原*/
          $scope.closeMultiRecover = function() {
            $("file-management .durationRecover").addClass("hide");
            $scope.fileBothLength = 1;
            $scope.fileDealLength = 1;
          };
          /*关闭永久删除框*/
          $scope.closePermanentDelete = function() {
            $("file-management .durationPermanent").addClass("hide");
            $scope.fileBothLength = 1;
            $scope.fileDealLength = 1;
          };
          /*关闭批量删除框*/
          $scope.closeMultiDelete = function() {
            $("file-management .durationTip").addClass("hide");
            $scope.fileBothLength = 1;
            $scope.fileDealLength = 1;
          };
          /*关闭批量复制框*/
          $scope.closeMyMultiCopy = function() {
            $("file-management .durationTipCopy").addClass("hide");
            $scope.fileBothLength = 1;
            $scope.fileDealLength = 1;
          };
          /*关闭批量复制框*/
          $scope.closeMyMultiMove = function() {
            $("file-management .durationTipMove").addClass("hide");
            $scope.fileBothLength = 1;
            $scope.fileDealLength = 1;
          };
          /*关闭批量目录删除框*/
          $scope.closeMultiFileDelete = function() {
            $("file-management .durationFileMulti").addClass("hide");
            $scope.fileBothLength = 1;
            $scope.fileDealLength = 1;
          };
          /*文件管理排序*/
          $scope.fileSort = function(event, type) {
            if(!$scope.folderNode || !$scope.folderNode.folderList) return false;
            var thisElement;
            var selfElement = $(event.target);
            thisElement = selfElement;
            //重新赋值
            if(selfElement[0].tagName==='A'){
              thisElement = selfElement.parent();
            }
            //判断点击的内部元素
            if(selfElement[0].tagName === 'A' && !selfElement.hasClass('name')){
              thisElement.attr("data-pointer", selfElement.attr("data-pointer"));
            }
            
            var fileIndex = thisElement.attr("data-pointer");
            /*所有复原*/
            $(".filePanel .fileTitle a.up").css(
              "border-bottom",
              "5px solid #fff"
            );
            $(".filePanel .fileTitle a.down").css(
              "border-top",
              "5px solid #fff"
            );
            $(".filePanel .fileTitle span").attr("data-pointer", 0);

            if (fileIndex == 0 || !fileIndex) {
              /*未排序的，排序，我们规定七上八下*/
              thisElement.attr("data-pointer", 7);
              thisElement.find("a.up").css("border-bottom", "5px solid #000");
              thisElement.find("a.down").css("border-top", "5px solid #fff");

              $scope.folderNode.folderList.sort(function(a, b) {
                if (type == "文件名称") {
                  return a.file.name.localeCompare(b.file.name, "zh");
                } else if (type == "文件类型") {
                  return a.file.fileType.localeCompare(b.file.fileType, "zh");
                } else if (type == "修改日期") {
                  return a.file.lastModifiedDate - b.file.lastModifiedDate;
                } else {
                }
              });
            } else if (fileIndex == 7) {
              thisElement.attr("data-pointer", 8);
              thisElement.find("a.up").css("border-bottom", "5px solid #fff");
              thisElement.find("a.down").css("border-top", "5px solid #000");

              $scope.folderNode.folderList.sort(function(a, b) {
                if (type == "文件名称") {
                  return b.file.name.localeCompare(a.file.name, "zh");
                } else if (type == "文件类型") {
                  return b.file.fileType.localeCompare(a.file.fileType, "zh");
                } else if (type == "修改日期") {
                  return b.file.lastModifiedDate - a.file.lastModifiedDate;
                } else {
                }
              });
            } else if (fileIndex == 8) {
              thisElement.attr("data-pointer", 7);
              thisElement.find("a.up").css("border-bottom", "5px solid #000");
              thisElement.find("a.down").css("border-top", "5px solid #fff");

              $scope.folderNode.folderList.sort(function(a, b) {
                if (type == "文件名称") {
                  return a.file.name.localeCompare(b.file.name, "zh");
                } else if (type == "文件类型") {
                  return a.file.fileType.localeCompare(b.file.fileType, "zh");
                } else if (type == "修改日期") {
                  return a.file.lastModifiedDate - b.file.lastModifiedDate;
                } else {
                }
              });
            }
          };

          let pathParam = {
            pathWindow: "fileManagement",
            pathName: "文件管理"
          };
          $scope.$emit("fileWindowPath", pathParam);
          document.querySelector("menu-directive").classList.add("menu-hide");
          $(".flexline").removeClass("unfolded").addClass("folded");
          $scope.$on("folderParam", (d, data) => {
            $scope.filePanelLoading = true;
            $scope.trash = data.folderTitle == "trash" ? true : false;
            let chineseName = [
              "多维分析",
              "仪表盘",
              "即席查询",
              "文件",
              "即席查询",
              "文件夹",
              "仪表盘",
              "数据门户"
            ];
            let EnglishName = [
              "saiku",
              "wcdf",
              "adhoc",
              "file",
              "xwaqr",
              undefined,
              "xdf",
              "xdp"
            ];
            let classIcons = [
              "olapIcon",
              "wcdfIcon",
              "adhocIcon",
              "fileIcon",
              "fileIcon",
              "folderIcon",
              "wcdfIcon",
              "xdpIcon"
            ];
            for (let i = 0; i < data.folderList.length; i++) {
              if (data.folderList[i].file.deletedDate) {
                data.folderList[i].file.lastModifiedDate =
                  data.folderList[i].file.deletedDate;
              }
              let lastDate = new Date(
                parseInt(data.folderList[i].file.lastModifiedDate)
              );
              let Y = lastDate.getFullYear() + "-";
              let M =
                (lastDate.getMonth() + 1 < 10
                  ? "0" + (lastDate.getMonth() + 1)
                  : lastDate.getMonth() + 1) + "-";
              let D =
                (lastDate.getDate() < 10 ? "0" : "") + lastDate.getDate() + " ";
              let h =
                (lastDate.getHours() < 10 ? "0" : "") +
                lastDate.getHours() +
                ":";
              let m =
                (lastDate.getMinutes() < 10 ? "0" : "") + lastDate.getMinutes();
              data.folderList[i].file.modifiedDate = Y + M + D + h + m;

              let selfNameArr = data.folderList[i].file.name.split(".");
              let dataName =
                selfNameArr[
                  selfNameArr.length > 1 ? selfNameArr.length - 1 : 1
                ];
              //find you
              $scope.$parent.pluginConfig.map(d => {
                if (d.name == "." + dataName) {
                  //cmdMap generated
                  data.folderList[i].file.cmdMap = d.cmdMap;
                  $scope.$on("canSchedule", (d, schedule) => {
                    data.folderList[i].file.schedule =
                      schedule && d.cmdMap.SCHEDULE_NEW;
                  });
                }
              });
              EnglishName.map((f, g) => {
                if (dataName == f) {
                  data.folderList[i].file.fileType = chineseName[g];
                  data.folderList[i].file.classIcons = classIcons[g];
                }
                if(/jpg|png|gif|bmp|jpeg/i.test(dataName)){
                  data.folderList[i].file.classIcons = 'imgIcon'
                }
              });
              if (!data.folderList[i].file.fileType ) {
                data.folderList[i].file.classIcons || (data.folderList[i].file.classIcons = classIcons[3]);
                data.folderList[i].file.fileType =
                  dataName + " " + chineseName[3];
              }
            }
            //文件过多时，loading会卡煮，临时处理，能缓解一些，建议文件做分页展示
            setTimeout(()=>{
                $scope.folderNode = data;
                $scope.filePanelLoading = false;
                if (!$scope.$$phase && !$scope.$root.$$phase) {
                    $scope.$digest();
                }
            },500);
          });
          $scope.$on("fileTreeLoaded",function(result){
            $scope.pageLoading = false;
          });
          $scope.reportOpen = function(node){
            $rootScope.$emit("editor", node);
            panelFactory.reportOpen(node, $state);
          }
          $scope.editFile = param => {
            let pluginName1 = param.file.path.split("."),pluginName=[];
            let len = pluginName1.length,
                ppa = pluginName1.splice(len - 1,1);
            pluginName.push(pluginName1.join('.'),ppa[0]);
            tabHandleFactory.handle({
              tab: "operateEdit",
              pluginName: pluginName[1],
              pluginPath: pluginName[0],
              pathParam: param.file.cmdMap.EDIT,
              name: "编辑_" + pluginName[0].split("/").pop(),
              paramData: pluginName[0] + "." + pluginName[1]
            });
          };
          $scope.downloadFile = node => {
            panelFactory.downloadFile(node);
          };
          $scope.newWindowOpen = node => {
            panelFactory.newWindowOpen(node);
          };
          $scope.removePopup = () => {
            document.querySelector('.addMask').style.display = 'none';
            $scope.renamePopup = 0;
            $("file-management .popup").hide();
          };
          $scope.renameFile = (node, $event) => {
            document.querySelector('.addMask').style.display = 'block';
            $("file-management .popup").show();
            $("file-management .popup #loading-center").hide();
            $scope.renamePopup = 1;
            $scope.nodeFile = node.file;
            $scope.nodeTarget = $event;
            $scope.nodeParam = $event.target.attributes["fileName"].value;
            let fileFirstName = $event.target.attributes["fileName"].value;
            $scope.fileOldName = fileFirstName;
            $scope.fileSuffix = node.file.name.substring(
              node.file.name.lastIndexOf(".") + 1,
              node.file.name.length
            );
          };
          function showErrorMsg(message){
            let $error = $("file-management .renamePopup .renameTips");
            $error.text(message).removeClass("hiddenTips");
          }
          function hideErrorMsg(){
            let $error = $("file-management .renamePopup .renameTips");
            $error.text('').addClass("hiddenTips");
          }

          $scope.renameInputKeyup = ()=>{
            hideErrorMsg();
          }

          $scope.renameRequest = fileParam => {
            let fileFirstName = $scope.nodeParam;
            let newName = $("input.renameInput").val();
            newName = $.trim(newName);

            if(newName === ''){
                showErrorMsg('名字不能为空');
                return;
            }

            if(/[\\/:;\?\+#%&\*\|\[\]]+/.test(newName)){
                showErrorMsg('名字不能包含下列字符：\\/:;?+#%&*|[]');
                return;
            }

            let fileSuffixesName = fileFirstName.substr(
              fileFirstName.lastIndexOf(".") + 1,
              fileFirstName.length
            );
            panelFactory.renameRequest(fileParam, $scope.nodeFile.path).then(
              data => {
                //更名成功之后，重新拉文件

                //隐藏遮照
                document.querySelector('.addMask').style.display = 'none';

                var fileOldPath = $scope.nodeFile.path.substr(
                  0,
                  $scope.nodeFile.path.lastIndexOf("/")
                );
                //获取新名称
                var newName = fileParam;
                /*将标签同步*/
                $scope.nodeTarget.target.attributes[
                  "filename"
                ].value = fileParam;
                //尝试通过原型更改文件名字
                $scope.nodeFile.title = newName;
                //获取原有name
                var oldName = $scope.nodeFile.name;
                var oldNameArr = oldName.split('.');
                $scope.nodeFile.name = newName+"."+oldNameArr[oldNameArr.length - 1];


                $scope.nodeFile.path =
                  fileOldPath + "/" + fileParam + "." + $scope.fileSuffix;
                $scope.removePopup();
              },
              data => {
                $("file-management .renamePopup .renameTips").removeClass("hiddenTips");
              }
            );
          };

          $scope.openProperty = node => {
            $scope.$broadcast("lv", node);
          };

          //lv
          //red focus
          // var tagRed = false;
          $scope.borderRed = ($event, e, type) => {
            if (isNaN(e) || !e) {
              $event.target.style.borderColor = "red";
              // tagRed = true;
            } else {
              $event.target.style.borderColor = "#d8d8d8";
              type && ($scope[type] = e);
              // tagRed = false;
            }
          };
          //show del
          $scope.hideDel = () => {
            $(".alert .alert-box .title-name").text("确认删除");
            $("file-management .filePanel .alert").addClass("hide");
          };
          //delete file
          $scope.delete = (fileId, $event, name) => {
            $("file-management .alert-main p").text(
              "确定要永久删除" + name + "文件吗？"
            );
            $("file-management .filePanel .alert").removeClass("hide");
            $scope.fileId = fileId;
            $scope.sure = function() {
              panelFactory
                .delete($scope.fileId, "/xdatainsight/api/repo/files/deletepermanent")
                .then(
                  data => {
                    $("file-management .filePanel .alert").addClass("hide");
                    //$scope.$emit("ceshi", 1);
                    $($event.target.parentNode.parentNode).remove();
                    $scope.$emit("freshMyFileTree");
                    tips("删除成功");
                  },
                  data => {
                    tips("你没有权限删除该文件，或文件已不存在，请联系管理员");
                  }
                );
            };
          };

          $scope.deleteFile = (fileId, $event, name, tag, node) => {
            if ($rootScope.followTag) {
              $("file-management .alert-main p").text(
                "确定要取消对" + name + "的收藏吗？"
              );
              $("file-management .filePanel .alert").removeClass("hide");
              $scope.sure = function() {
                panelFactory.getFavorites("", "get").then(
                  data => {
                    var data1 = data;
                    for (var i = 0; i < data1.length; i += 1) {
                      if (
                        data1[i].fullPath.slice(
                          data1[i].fullPath.lastIndexOf("/") + 1
                        ) == name
                      ) {
                        data1.splice(i, 1);
                      }
                    }
                    panelFactory.getFavorites(data1, "post").then(
                      data => {
                        //$scope.$emit("ceshi", 1);
                        $($event.target.parentNode.parentNode).remove();
                        $("file-management .filePanel .alert").addClass("hide");

                        tips("取消关注成功！");
                      },
                      data => {
                        tips("请稍后重试！");
                      }
                    );
                  },
                  data => {
                    tips("请稍后重试！");
                  }
                );
              };
            } else {
              //点击删除目录文件
              if (tag == "file") {
                $("file-management .alert-main p").text(
                  "确定要将" + name + "文件移动到回收站吗？"
                );
                $("file-management .filePanel .alert").removeClass("hide");
                $scope.fileId = fileId;
                $scope.sure = function() {

                  panelFactory
                    .delete($scope.fileId, "/xdatainsight/api/repo/files/delete")
                    .then(
                      data => {
                        $("file-management .filePanel .alert").addClass("hide");
                        $($event.target).parents('.file-li').remove();
                        $scope.$broadcast("deleteFileFromCache", $scope.fileId);
                        tips("删除成功");

                        //刪除文件成功，更新目录
                      },
                      data => {
                        tips("你没有权限删除该文件，或文件已不存在，请联系管理员");
                      }
                    );
                };
              } else if (tag == "folder") {
                $("file-management .alert-main p").text(
                  "确定要删除" + name + "文件夹吗？"
                );
                $("file-management .filePanel .alert").removeClass("hide");
                $scope.fileId = fileId;
                $scope.sure = function() {
                  panelFactory
                    .delete($scope.fileId, "/xdatainsight/api/repo/files/delete")
                    .then(
                      data => {
                        $scope.$broadcast("deleteFileFromCache", $scope.fileId);
                        $("file-management .filePanel .alert").addClass("hide");
                        /*$(
                          $rootScope.currentSelectedNode.target.parentNode
                            .parentNode
                        ).remove();*/
                        // $event.target.parentNode.parentNode.style.display = "none";
                        tips("删除成功");
                        //刪除文件成功，更新目录
                      },
                      data => {
                        tips("你没有权限删除该目录，或文件已不存在，请联系管理员");
                      }
                    );
                };
              }
            }
          };
          //restore
          $scope.restore = (fileId, node, $event) => {
            panelFactory.restore(fileId).then(
              data => {
                //恢复文件之后，重新拉去文件列表
                // $scope.$emit("freshMyFileTree");
                // $scope.$broadcast("freshMyFileTree");
                /*将文件重新拉回缓存中*/
                //首先删除回收站文件多余的属性
                $scope.$broadcast("restoreDeletedNode", node);

                $($event.target.parentNode.parentNode).remove();
              },
              data => {
                tips("无法访问目标目录，或目标目录已存在同名文件");
              }
            );
          };

          $scope.isInWhiteList = function(fileName){
            var suffix = '';
            var reg = /\.([^\.]+)$/;

            if(reg.test(fileName)){
                suffix = fileName.match(reg)[1];
            }

            if(suffix && ($rootScope.typeWhiteList.indexOf(suffix) > -1 || /jpg|png|gif|bmp|jpeg/i.test(suffix))){
                return true;
            }

            return false;
          }

          $scope.color = x => {
            // var arr = [
            //   "saiku",
            //   "wcdf",
            //   "adhoc",
            //   "prpt",
            //   "xwaqr",
            //   "xdf"
            // ];
            // var item = x.substring(x.lastIndexOf(".") + 1, x.length);

            // if($rootScope.typeWhiteList.indexOf(item) > -1){
            //     return "fileName blue";
            // }else{
            //     return "fileName"; 
            // }
            return $scope.isInWhiteList(x) ? "fileName blue" : "fileName";
          };
          //判断类型
          function judgeType(data){
            return Object.prototype.toString.call(data).slice(8,-1)
          }
          //判断后缀名
          $scope.Suffix = (x,tt) => {
            var arr = ["wcdf", "waqr", "saiku", "prpt", "xwaqr", "xdf",'xdp'];
            var item = x.substring(x.lastIndexOf(".") + 1, x.length);
            var assignments = $rootScope._roleManage && $rootScope._roleManage.assignments,
                _assignment,
                isShow = false,
                isShowEdit = false,
                _assignmentObj = {logicalRoles:[],logicalRoles1:{}};
            if(judgeType(assignments) === 'Object'){
              if(judgeType(assignments.logicalRoles) === 'String'){
                _assignment = {
                  logicalRoles:[assignments.logicalRoles]
                }
              }else{
                _assignment = assignments
              }
            }
            if(judgeType(assignments) === 'Array'){
              assignments.forEach(function(e,i){
                judgeType(e.logicalRoles) === 'Array' ? 
                e.logicalRoles.forEach(function(item,ii){
                  _assignmentObj.logicalRoles1[item] = '';
                }) : (_assignmentObj.logicalRoles1[e.logicalRoles] = '')
              });
              for(var key in _assignmentObj.logicalRoles1){
                _assignmentObj.logicalRoles.push(key);
              }
              _assignment = _assignmentObj;
            }
            _assignment && _assignment.logicalRoles.forEach(function(e,i){
              e === 'org.pentaho.scheduler.manage' && (isShow = true);
              e === 'org.pentaho.repository.create' && (isShowEdit = true);
            });
            if(!isShow && tt === 'filePlan'){
              return isShow;
            }
            if(!isShowEdit && tt === 'edit'){
              return isShowEdit;
            }

            if(arr.indexOf(item) > -1 && $rootScope.typeWhiteList.indexOf(item) > -1){
                return true;
            }else{
                return false;
            }

            /*if (arr.indexOf(item) == "-1") {
              return false;
            } else {
              return true;
            }*/
          };
          $("file-management .datePicker").datepicker({
            dateFormat: "yy-mm-dd"
          });
          $scope.myType = "onlyone";
          $scope.radio = true;
          $scope.changeRaido = x => {
            if (x) {
              $("file-management .sendMail .emailInfo").removeClass("hide");
              $scope.emailTag = true;
            } else {
              $("file-management .sendMail .emailInfo").addClass("hide");
              $scope.emailTag = false;
            }
          };
          $scope.changeOpt = x => {
            /*switch (x) {
                    case "onlyone":
                    case "week":
                        tagRed = false;
                        break;
                    case "second":
                    case "minutes":
                    case "hour":
                    case "day":
                    case "month":
                    case "year":
                        tagRed = true;
                        break;
                }*/
            /*var container = document.querySelectorAll("file-management .mychoosedContent>div");
                for (var i = 0; i < container.length; i++) {
                    container[i].style.display = "none";
                }
                document.querySelector("file-management .mychoosedContent>." + x + "").style.display = "block";*/
            $scope._taskplan = x;
            //初始值
            switch (x) {
              case "onlyone":
                break;
              case "second":
                $scope.mySecond = 30;
                break;
              case "minutes":
                $scope.myMinutes = 1;
                break;
              case "hour":
                $scope.myHours = 1;
                break;
              case "day":
                $scope.myDay = 1;
                break;
              case "week":
                break;
              case "month":
                $scope.myMonth = 1;
                break;
              case "year":
                $scope.myYear = 1;
                break;
              case "taskplan":
                break;
            }
          };
          $scope.hours = [
            "01",
            "02",
            "03",
            "04",
            "05",
            "06",
            "07",
            "08",
            "09",
            "10",
            "11",
            "12"
          ];
          $scope.minutes = [
            "00",
            "01",
            "02",
            "03",
            "04",
            "05",
            "06",
            "07",
            "08",
            "09",
            "10",
            "11",
            "12",
            "13",
            "14",
            "15",
            "16",
            "17",
            "18",
            "19",
            "20",
            "21",
            "22",
            "23",
            "24",
            "25",
            "26",
            "27",
            "28",
            "29",
            "30",
            "31",
            "32",
            "33",
            "34",
            "35",
            "36",
            "37",
            "38",
            "39",
            "40",
            "41",
            "42",
            "43",
            "44",
            "45",
            "46",
            "47",
            "48",
            "49",
            "50",
            "51",
            "52",
            "53",
            "54",
            "55",
            "56",
            "57",
            "58",
            "59"
          ];
          $scope.closePlan = () => {
            $("file-management .taskPlan").addClass("popuphide");
          };
          //文件
          function file() {
            panelFactory.fileTree().then(
              data => {
                //$scope.myFileTree=data.children;
                $("file-management #myFileTree3").html("");
                var et = new Tree2(data.children, "myFileTree3");
              },
              data => {}
            );
          }
          function Tree2(data, el) {
            this.app = function(par, tag) {
              return par.appendChild(document.createElement(tag));
            };
            this.create($("file-management #" + el)[0], data);
          }
          Tree2.fn = Tree2.prototype = {
            create: function(par, group) {
              var host = this,
                length = group.length;
              for (var i = 0; i < length; i++) {
                if (group[i].file.folder == "false") continue;
                var dl = this.app(par, "DL"),
                  dt = this.app(dl, "DT"),
                  dd = this.app(dl, "DD");
                dt.innerHTML =
                  '<a href="javascript:void(0)">' +
                  group[i].file.title +
                  "</a>";
                dt.path = group[i].file.path;
                dt.group = group[i].children;
                dt.className += "node-close";
                dt.onclick = function() {
                  $scope.planPath = this.path;
                  $(".planPath").text(this.path);
                  if (document.querySelector(".myFileTree .active")) {
                    document
                      .querySelector(".myFileTree .active")
                      .classList.remove("active");
                  }
                  if (!this.group) {
                      if(this.className != "node-open"){
                          this.className = "node-open active";
                      }else{
                          this.className = "node-close active";
                      }
                      return;
                  }
                  var dd = this.nextSibling;
                  if (!dd.hasChildNodes()) {
                      if(dd.style.display == "block"){
                          dd.style.display = "";
                          this.className = "node-close active";
                      }else if(dd.style.display == "") {
                          var tag = this.group.some(function(ele,i,arr){
                              if(ele.hasOwnProperty("children")){
                                  return true;
                              }
                              if(ele.file.folder == "true"){
                                  return true;
                              }
                              return false;
                          })
                          if(tag){
                              host.create(dd, this.group);
                              dd.style.display = "";
                              this.className = "node-open active";
                          }else{
                              dd.style.display = "block";
                              this.className = "node-open active";
                          }

                      }
                  } else {
                    var set =
                      dd.style.display == "none"
                        ? ["", "node-open active"]
                        : ["none", "node-close active"];
                    dd.style.display = set[0];
                    this.className = set[1];
                  }
                };
              }
            }
          };
          //新建计划
          //day
          $scope.oneday = () => {
            $scope.dayable = false;
            $scope.myDay = $scope.myDay || 1;
            // tagRed = true;
          };
          $scope.everyworkday = () => {
            $scope.dayable = true;
            $scope.myDay = "";
            // tagRed = false;
          };
          //month
          $scope.onemonth = () => {
            $scope.monthable = false;
            $scope.myMonth = $scope.myMonth || 1;
            // tagRed = true;
          };
          $scope.everymonth = () => {
            $scope.monthable = true;
            $scope.myMonth = "";
            // tagRed = false;
          };
          //year
          $scope.oneyear = () => {
            $scope.yearable = false;
            $scope.myYear = $scope.myYear || 1;
            // tagRed = true;
          };
          $scope.everyear = () => {
            $scope.yearable = true;
            $scope.myYear = "";
            // tagRed = false;
          };
          $scope.newPlan = files => {
            document.querySelector('.addMask').style.display = 'block';
            file();
            $scope._taskplan = "onlyone";
            $scope.planFile = files;
            $scope.planName = files.name;
            $("file-management .fixedBox").removeClass("hide");
            $("file-management .editPlan").removeClass("hide");
            var currentDate = new Date();
            var currentTime = currentDate.getTime();
            taskplanProvider
              .callItunes(
                "/xdatainsight/api/scheduler/blockout/hasblockouts?ts=" + currentTime
              )
              .then(
                data => {
                  $scope.hasblockouts = data;
                },
                data => {}
              );
          };
          $scope.showPlan = () => {
            if (!$scope.planPath) {
              tips("选择一个路径");
              return;
            }
            $scope.myType = "onlyone";
            var date = new Date();

            function getHour(e) {
              var data;
              if (e > 9) {
                if (e > 12) {
                  data = "0" + (e - 12);
                } else {
                  data = e;
                }
              } else {
                data = "0" + e;
              }
              return data.toString();
            }
            function zero(e) {
              var data;
              if (e > 9) {
                data = e;
              } else {
                data = "0" + e;
              }
              return data.toString();
            }
            $scope.myHour = getHour(date.getHours());
            $scope.myMinute = zero(date.getMinutes());
            $scope.myHalf = date.getHours() > 12 ? "PM" : "AM";
            $scope.myStartDate =
              zero(date.getFullYear()) +
              "-" +
              zero(date.getMonth() + 1) +
              "-" +
              zero(date.getDate());
            if ($scope.hasblockouts == "false") {
              $("file-management .planBox").addClass("hide");
              $("file-management .mytaskPlan").removeClass("hide");
              /*var container = document.querySelectorAll(".mychoosedContent>div");
                    for (var i = 0; i < container.length; i++) {
                        container[i].style.display = "none";
                    }
                    document.querySelector("file-management .mychoosedContent>.onlyone").style.display = "block";*/
              // $('.mychoosedContent>div').hide();
              // $('file-management .mychoosedContent>.onlyone').show();
              $scope._taskplan = "onlyone";
            }
          };
          $scope.email = () => {
            /*if (tagRed) {
                    return;
                }*/
            document.querySelector('.ifEmail input').checked = true;
            panelFactory.isAuthenticated().then(
              data => {
                if (data) {
                  $("file-management .mytaskPlan").addClass("hide");
                  $("file-management .sendMail").removeClass("hide");
                }
              },
              data => {
                tips("删除失败，请稍后再试！");
              }
            );
          };
          $scope.checkout = () => {
            $scope.changeRaido(false);
            var startTime =
              $("#" + $scope.myType).val() +
              "T" +
              ($scope.myHalf == "PM"
                ? parseInt($scope.myHour) + 12
                : $scope.myHour) +
              ":" +
              $scope.myMinute +
              ":00.000+08:00";
            var endTime = $("#" + $scope.myType + "end").val()
              ? $("#" + $scope.myType + "end").val() + "T23:59:59.000+08:00"
              : null;
            var data;
            switch ($scope.myType) {
              case "onlyone":
                data = {
                  simpleJobTrigger: {
                    endTime: null,
                    repeatCount: 0,
                    repeatInterval: 0,
                    startTime: startTime,
                    uiPassParam: "RUN_ONCE"
                  }
                };
                break;
              case "second":
                data = {
                  simpleJobTrigger: {
                    endTime: endTime,
                    repeatCount: -1,
                    repeatInterval: $scope.mySecond,
                    startTime: startTime,
                    uiPassParam: "SECONDS"
                  }
                };
                break;
              case "minutes":
                data = {
                  simpleJobTrigger: {
                    endTime: endTime,
                    repeatCount: -1,
                    repeatInterval: $scope.myMinutes * 60,
                    startTime: startTime,
                    uiPassParam: "MINUTES"
                  }
                };
                break;
              case "hour":
                data = {
                  simpleJobTrigger: {
                    endTime: endTime,
                    repeatCount: -1,
                    repeatInterval: $scope.myHours * 3600,
                    startTime: startTime,
                    uiPassParam: "HOURS"
                  }
                };
                break;
              case "day":
                if ($scope.myDay) {
                  data = {
                    simpleJobTrigger: {
                      endTime: endTime,
                      repeatCount: -1,
                      repeatInterval: $scope.myDay * 3600 * 24,
                      startTime: startTime,
                      uiPassParam: "DAILY"
                    }
                  };
                } else {
                  data = {
                    complexJobTrigger: {
                      daysOfWeek: ["1", "2", "3", "4", "5"],
                      endTime: endTime,
                      startTime: startTime,
                      uiPassParam: "DAILY"
                    }
                  };
                }
                break;
              case "week":
                var obj = document.getElementsByName("myChecked");
                var daysOfWeek = [];
                for (var n in obj) {
                  if (obj[n].checked) {
                    daysOfWeek.push(obj[n].value);
                  }
                }
                data = {
                  complexJobTrigger: {
                    daysOfWeek: daysOfWeek,
                    endTime: endTime,
                    startTime: startTime,
                    uiPassParam: "WEEKLY"
                  }
                };
                break;
              case "month":
                if ($scope.myMonth) {
                  data = {
                    complexJobTrigger: {
                      daysOfMonth: [$scope.myMonth],
                      endTime: endTime,
                      startTime: startTime,
                      uiPassParam: "MONTHLY"
                    }
                  };
                } else {
                  data = {
                    complexJobTrigger: {
                      daysOfWeek: [$(".daysOfWeek").val()],
                      endTime: endTime,
                      startTime: startTime,
                      uiPassParam: "MONTHLY",
                      weeksOfMonth: [$(".weeksOfMonth").val()]
                    }
                  };
                }
                break;
              case "year":
                if ($scope.myYear) {
                  data = {
                    complexJobTrigger: {
                      daysOfMonth: [$scope.myYear],
                      endTime: endTime,
                      monthsOfYear: [$(".monthsOfYear").val()],
                      startTime: startTime,
                      uiPassParam: "YEARLY"
                    }
                  };
                } else {
                  data = {
                    complexJobTrigger: {
                      daysOfWeek: [$(".daysOfWeek1").val()],
                      endTime: endTime,
                      monthsOfYear: [$(".monthsOfYear1").val()],
                      startTime: startTime,
                      uiPassParam: "YEARLY",
                      weeksOfMonth: [$(".weeksOfMonth1").val()]
                    }
                  };
                }
                break;
              case "taskplan":
                break;
            }
            data.inputFile = $scope.planFile.path;
            data.jobName = $scope.planName;
            if ($scope.emailTag) {
              data.jobParameters = [
                {
                  name: "_SCH_EMAIL_TO",
                  stringValue: $scope.emails,
                  type: "string"
                },
                { name: "_SCH_EMAIL_CC", stringValue: "", type: "string" },
                { name: "_SCH_EMAIL_BCC", stringValue: "", type: "string" },
                {
                  name: "_SCH_EMAIL_SUBJECT",
                  stringValue: $scope.emailsTitle || "",
                  type: "string"
                },
                {
                  name: "_SCH_EMAIL_MESSAGE",
                  stringValue: $scope.emailMsn || "",
                  type: "string"
                },
                {
                  name: "_SCH_EMAIL_ATTACHMENT_NAME",
                  stringValue: $scope.emailFileName || "",
                  type: "string"
                }
              ];
            } else {
              data.jobParameters = [];
            }
            data.outputFile = $scope.planPath;
            panelFactory.postJob(data).then(
              data => {
                document.querySelector(".sendMail").classList.add("hide");
                document.querySelector(".checkout").classList.remove("hide");
              },
              data => {}
            );
          };
          //关闭
          $scope.close = () => {
            $scope.changeRaido(false);
            document.querySelector('.addMask').style.display = 'none';
            $("file-management .fixedBox").addClass("hide");
            $("file-management .planBox").addClass("hide");
          };
          //上一步
          $scope.preStep = (preStep, thisStep) => {
            if(preStep === 'mytaskPlan') {
              $scope.changeRaido(false);
            }

            $("file-management ." + preStep + "").removeClass("hide");
            $("file-management ." + thisStep + "").addClass("hide");
          };
          //looklist
          $scope.lookList = () => {
            document.querySelector('.addMask').style.display = 'none';
            $("file-management .sendMail").addClass("hide");
            $("file-management .checkout").removeClass("hide");
            $("file-management .fixedBox").addClass("hide");
            $("file-management .planBox").addClass("hide");
            // $state.go('taskPlan');
            let type = "taskPlan";
            tabHandleFactory.handle({
              tab: type,
              pluginName: "",
              pluginPath: "",
              pathParam: "",
              name: { taskPlan: "taskPlan", fileManagement: "文件管理" }[type],
              paramData: { taskPlan: "taskPlan", fileManagement: "文件管理" }[
                type
              ]
            });
          };
        }
      ]
    };
  });
}
