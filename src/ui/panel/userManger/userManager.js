import angular from 'angular';
import $ from 'jquery';
import './userManager.css';

import './userTree/userTree';
import './userList/userList';
import './userEdit/userEdit';
import './newGroup/newGroup';

{
  angular.module('xdt/userManager',['xdt/userTree','xdt/userList','xdt/userEdit','xdt/newGroup'])
    .directive('userManager',() => {
      return {
        restrict: 'E',
        template: require("./userManager.html"),
        scope: {
          propdata: '<',
        },
        controller: [
          "$scope",
          "$state",
          "panelFactory",
          "$http",
          "$rootScope",
          "pageService",
          "taskplanProvider",
          "tabHandleFactory",
          ($scope,
            $state,
            panelFactory,
            $http,
            $rootScope,
            pageService,
            taskplanProvider,
            tabHandleFactory) => {
              // console.log($scope);
              // console.log($state)

              $scope.folder = [
                {
                  name: '根组',
                  number: 100001,
                  des: '用户管理根目录',
                  children: [
                    {
                      name: 1111,
                      number: 100002,
                      des: '子目录1',
                      children: [
                        {
                          name: "aaaa",
                          number: 100003,
                          des: '子目录11',
                          children: [
                            {
                              name: 'izqcool',
                              number: 100004,
                              des: '子目录111',
                            },
                            {
                              name: 'zuoqiang',
                              number: 100005,
                              des: '子目录1112',
                            }
                          ]
                        },
                        {
                          name: "bbb",
                          number: 100006,
                          des: '子目录2',
                        },
                        {
                          name: "ccc",
                          des: '子目录3',
                          number: 100007,
                        }
                      ]
                    },
                    {
                      name: 2222,
                      number: 100008,
                      children: [
                        {
                          name: "AAA",
                          number: 100009,
                          children: [
                            {
                              name:'AAA-1',
                              number: 100010,
                            }
                          ]
                        },
                        {
                          name: "BBB",
                          number: 100011,
                        },
                        {
                          name: "CCC",
                          number: 100012,
                        }
                      ]
                    }
                  ]
                }
              ];


              $scope.findNode = (folders,conditionNode,addNode) => {

                folders.forEach((folder,index)=>{
                  if(!folder.children) {
                    if(folder.number === conditionNode.number) {
                      console.log(folder);
                      folder.children = [addNode];
                    }
                  }else {
                    if(folder.number === conditionNode.number) {
                      folder.children.push(addNode);
                    }else {
                      // console.log(folder.children);
                      $scope.findNode(folder.children,conditionNode);
                    }
                  }
                });

                // if(folder.number === conditionNode.folder) {
                //   return true;
                // }
              }







              $scope.init = (data) => {
                // $scope.currentTree = {};
              }

              //最开始设置为更目录；
              $scope.currentTree = $scope.folder[0];
              $scope.groupInit = {};

              //设置默认的角色index,初始的时候选中第一个
              $scope.roleIndex = 0;
              $scope.allRoles = [
                {
                  name:'管理员',
                  id: 1,
                  selected: true
                },
                {
                  name:'设计用户',
                  id: 2,
                  selected: false
                },
                {
                  name:'BI分析师',
                  id: 3,
                  selected: false
                },
                {
                  name:'普通用户',
                  id: 4,
                  selected: false
                },
                {
                  name:'普通用户',
                  id: 5,
                  selected: false
                },
              ];
              $scope.clickRole = (index) => {
                $scope.roleIndex = index;
              }


              $scope.navClick = (type) => {
                $scope.navType = type;
              }

              $scope.chageRightType = (type) =>{
                $scope.rightType = type;
              }
              $scope.addNewGroup = () => {
                $scope.groupInit = {};
                $scope.chageRightType('newGroup');
                $scope.$broadcast('newGroup',{});
              }



              $scope.$on("selectTree",(event,data)=>{
                $scope.currentTree = data;
                $scope.groupInit = data;
              });

              $scope.$on("upDateTree",(event,data1,data2)=>{
                console.log(data1);
                console.log(data2);

                //编辑的时候数据会自动更新，不知道问哦什么！！！  这里子处理新增数据的逻辑
                //data1 是当前树节点的数据 ，data2是新增的数据；
                if(data1.name !== data2.name || data1.number !== data2.number  || data1.des !== data2.des ) {
                  console.log(12345);
                  // $scope.findNode($scope.folder,data1,data2);
                  // $scope.folder = $scope.folder;
                }


                
              });

              $scope.$on("upDateRightType",(event,data)=>{
                console.log(data);
                $scope.chageRightType(data)
              });

              $scope.$on("editGroup",(event,data) => {
                $scope.$broadcast('changeGroup',data);
              });

              $scope.$on("addUser",(event,data)=>{
                console.log(data);
                $scope.rightType = data;
              });



          }


              
        ]
      }
    });
}