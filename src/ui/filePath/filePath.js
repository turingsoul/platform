/**
 * Created by Administrator on 2016/4/18.
 */
import angular from 'angular';
import '../style/filePath.css';
import {rightArrow,leftArrow} from './pathService';


{
    "use strict";
        angular.module('xdt/filePath', [])
            .directive('filePath',()=>{
                const template = require('./filePath.html');
                return{
                    restrict: 'E',
                    template:template                    
                }
            })
            .controller('pathController',['$rootScope','$scope','$state','pathService',($rootScope,$scope,$state,pathService)=>{
                $scope.fileName = [];
                $scope.folderPath = [];   
                let pathParam = [],
                    closeParam = false,
                    filePathParam = false,
                    labelNameList = [],
                    pluginPathParam = [];
                $scope.$on('detailPath',(d,data)=>{
                  $scope.fileName = [];
                    $rootScope.title = ($rootScope.projectArr && $rootScope.projectArr.length > 0) ? $rootScope.projectArr.filter(e=>e.active)[0].name : data.pathName;
                  if ($rootScope.title && $rootScope.title.length > 0) {
                    document.title = $rootScope.title + " - xDataInsight";
                  } else {
                    document.title = "xDataInsight";
                  }
                  //document.getElementsByTagName("title")[0].innerHTML = $rootScope.title + " - xDataInsight";
                  let haveParam = false;
                  document.querySelector('.pathParam').style.display="inline-block";
                  for(let h = 0;h<pluginPathParam.length;h++){
                      if(pluginPathParam[h]==data.pluginPath||pluginPathParam[h]==data.pathName){
                         haveParam = true;
                         break;
                      }
                  }
                  if(!data.pluginPath&&!haveParam){
                    $scope.fileName.push(data.pathName);
                    $scope.folderPath.push(data.pathName);
                    pluginPathParam.push(data.pathName);
                  }else if(data.pluginPath&&!haveParam){
                      pluginPathParam.push(data.pluginPath);                     
                      var nameParam = data.pluginPath.substr(data.pluginPath.lastIndexOf('/')+1,data.pluginPath.length);
                      $scope.fileName.push(nameParam);
                      $scope.folderPath.push(data.pluginPath.substr(0,data.pluginPath.lastIndexOf('/')));                                  
                  }
                  if(!filePathParam){
                    $scope.folderPathShow =  $scope.folderPath[$scope.folderPath.length-1];
                  }
                  if(data.pathName){
                      $scope.folderPathShow=data.pathName;
                  }
                  let nodeList = document.querySelectorAll(".pathLabel");
                  if(!haveParam){                     
                    for(let n = 0;n < nodeList.length;n++){ 
                      nodeList[n].style.backgroundColor = "#F3F3F3";
                      nodeList[n].style.borderBottom = "1px solid #ddd";
                    }
                    let fileNameParam = $scope.fileName[$scope.fileName.length-1];
                    pathService.slipLabel(fileNameParam,$scope,pluginPathParam,labelNameList);
                  }  
                  if(haveParam && closeParam == false){                                             
                      let nodeList = document.querySelectorAll(".pathLabel");                                                
                      pluginPathParam.map((w,f) =>{
                         if(w == data.pathName || w == data.pluginPath){
                            for(let n = 0;n<nodeList.length;n++){
                              nodeList[n].style.backgroundColor = "rgb(243,243,243)";
                                nodeList[n].style.borderBottom = "1px solid #ddd";
                            }                             
                              nodeList[f].style.backgroundColor = "rgb(255,255,255)";
                             nodeList[f].style.borderBottom = "1px solid white";
                          }
                      })                      
                  }
                  pathParam.push(data); 
                  closeParam = false;  
                  filePathParam = false;                 
                }); 
                $scope.closePanel = (label,$event)=>{
                    closeParam = true;
                    let nodeList = document.querySelectorAll(".pathLabel");
                    if($scope.fileName.length!=0){
                        $scope.fileName.map((a,j)=>{
                            if(a==label){
                                let coordinates = ($scope.fileName[j+1]) ? j+1 : j-1;
                                //if(nodeList[j].style.backgroundColor == "rgb(255, 255, 255)"||nodeList[j].style.backgroundColor==""){
                                    pathParam.map((d,i) =>{
                                        if(d.pluginPath == ($scope.folderPath[coordinates]+'/'+$scope.fileName[coordinates])){
                                            nodeList[coordinates].style.backgroundColor = "none";
                                            nodeList[coordinates].style.backgroundColor = "rgb(255,255,255)";
                                            $state.go('detailReport', {pluginName:d.pluginName,pluginPath:d.pluginPath});
                                        }else if(d.pathName==($scope.fileName[coordinates])&&coordinates>-1){
                                            nodeList[coordinates].style.backgroundColor = "none";
                                            nodeList[coordinates].style.backgroundColor = "rgb(255,255,255)";
                                            $state.go(d.pathWindow);
                                        }else if($scope.fileName.length==1){
                                            document.querySelector('#xdt-view').style.display="none";
                                            document.querySelector('.pathParam').style.display="none";
                                            $state.go('blank',{pluginName:"",pluginPath:""});
                                        }
                                    })
                                //}
                                $scope.folderPath.splice(j,1);
                                $scope.fileName.splice(j,1);
                                pluginPathParam.splice(j,1);
                            }
                        })
                    }
                };
                $scope.switchLabel = (name,$event)=>{
                  filePathParam = true;
                  //look through file tabs
                  for(let i=0; i<$scope.fileName.length;i++){
                      if($scope.fileName[i]==name){
                        if($scope.folderPath[i]==$scope.fileName[i]){
                            pathParam.map(d=>{
                              if(d.pathName==name){
                                let nodeList = document.querySelectorAll(".pathLabel");
                                for(let n = 0;n<nodeList.length;n++){
                                  nodeList[n].style.backgroundColor = "#F3F3F3";
                                    nodeList[n].style.borderBottom = "1px solid #ddd";
                                }                                                                 
                                ($event.target.parentNode).style.backgroundColor = "rgb(255,255,255)";
                                  ($event.target.parentNode).style.borderBottom = "1px solid white";

                                //control
                                $state.go(d.pathWindow);
                                $scope.folderPathShow = $scope.folderPath[i];                                                            
                              }
                          })                             
                        }else if($scope.folderPath[i]!=$scope.fileName[i]){
                            pathParam.map(d=>{
                                if(d.pluginPath==$scope.folderPath[i]+'/'+$scope.fileName[i]){
                                  let nodeList = document.querySelectorAll(".pathLabel");
                                  for(let n = 0;n<nodeList.length;n++){
                                    nodeList[n].style.backgroundColor = "#F3F3F3";
                                      nodeList[n].style.borderBottom = "1px solid #ddd";
                                  }
                                  ($event.target.parentNode).style.backgroundColor="rgb(255,255,255)";
                                  ($event.target.parentNode).style.borderBottom = "1px solid white";
                                  //control content switch
                                  $state.go('detailReport',{pluginName:d.pluginName,pluginPath:d.pluginPath});
                                  $scope.folderPathShow = $scope.folderPath[i];
                                    $rootScope.d={
                                        pluginName:d.pluginName,
                                        pluginPath:d.pluginPath,
                                        pathParam:d.pluginName+".edit"
                                    }
                                }
                          })
                        }
                    }                    
                  }                 
                };

                let slipArrow = document.querySelectorAll('.labelName>.slipArrow');
                let slipArrowObj = {
                    pluginPathParam:pluginPathParam,
                    fileName:$scope.fileName,
                    folderPath:$scope.folderPath,
                    labelNameList:labelNameList
                };
                slipArrow[0].addEventListener("click",()=>{
                  leftArrow(slipArrowObj);
                },false);

                slipArrow[1].addEventListener("click",()=>{
                  // rightArrow(slipArrowObj);
                  let labelNameLength = slipArrowObj.labelNameList.length;  
                  
                // if(!slipArrowObj.labelNameList[labelNameLength-1].pluginPath){
                //   slipArrowObj.fileName.push(slipArrowObj.labelNameList.pathName);
                //   slipArrowObj.folderPath.push(slipArrowObj.labelNameList.pathName);
                //   slipArrowObj.pluginPathParam.push(slipArrowObj.labelNameList.pathName);
                //   slipArrowObj.labelNameList.pop();

                // }else if(slipArrowObj.labelNameList[labelNameLength-1].pluginPath){

                //   slipArrowObj.pluginPathParam.push(slipArrowObj.labelNameList.pluginPath);                     
                //   var nameParam = (slipArrowObj.labelNameList.pluginPath).substr(slipArrowObj.labelNameList.pluginPath.lastIndexOf('/')+1,slipArrowObj.labelNameList.pluginPath.length);
                //   slipArrowObj.fileName.push(nameParam);
                //   slipArrowObj.folderPath.push((slipArrowObj.labelNameList.pluginPath).substr(0,slipArrowObj.labelNameList.pluginPath.lastIndexOf('/')));                                  
                //   slipArrowObj.labelNameList.pop();

                // }
                },false);

            }])
            .factory('pathService',()=>{
                let service = {};                
                service.slipLabel = (fileNameParam,$scope,pluginPathParam,labelNameList)=>{
                  let fileNameWidth = 0;
                  for(let i = 0;i<fileNameParam.length;i++){
                       let reg = /[\u4E00-\u9FA5\uF900-\uFA2D]/;
                       if(reg.test(i)){
                         fileNameWidth += i*14;
                       }else{
                         fileNameWidth += i*7;
                       }
                  } 
                  fileNameWidth += 61; 
                 
                  let nodeArray = document.querySelectorAll(".labelName .pathLabel");
                  let labelNameWidth = document.querySelector(".labelName>span:nth-child(2)").scrollWidth;

                  for(let n = 0;n < nodeArray.length;n++){
                    labelNameWidth -= nodeArray[n].scrollWidth;
                  }   
                  let restLabelWidth = labelNameWidth;

                  if(restLabelWidth<fileNameWidth){
                    let labelSize = 0;
                    for(let w = 0;w<$scope.fileName.length;w++){

                        labelNameList.push($scope.fileName[w]);
                        $scope.fileName.splice(w,1);
                        $scope.folderPath.splice(w,1);
                        pluginPathParam.splice(w,1); 
                        if($scope.fileName[w]){
                            for(let m = 0;m<$scope.fileName[w].length;m++){
                                let reg = /[\u4E00-\u9FA5\uF900-\uFA2D]/;
                                if(reg.test(m)){
                                    labelSize += m*14;
                                }else{
                                    labelSize += m*7;
                                }
                            }
                        }
                        labelSize += 61;
                        if(restLabelWidth-fileNameWidth+labelSize>=0){                         
                            break;                        
                        }else{
                          
                        }
                    }                                           
                  }
                }  
                            
                return service;
            })
}