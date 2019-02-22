import angular from 'angular';
import './userList.css';

{
  var userList = angular.module('xdt/userList',[]);

  userList.controller('userList',function ($scope) {
    console.log($scope);
    $scope.users = [
      {
        userName: 'admin',
        name: 'admin',
        role: '管理员',
        email: '532223417@qq.com',
        time: '201801.01~2020.01.01',
        status: '正常',
        operate: '不知道呢'
      },
      {
        userName: 'admin1',
        name: 'admin1',
        role: '管理员1',
        email: '532223417@qq.com',
        time: '201801.01~2020.01.01',
        status: '正常1',
        operate: '不知道呢1'
      }
    ];
    $scope.addUser = (type) => {
      $scope.$emit("addUser",type);
    }


  }).directive('userList',()=>{
    return {
      restrict: 'E',
      template: require("./userList.html")
    }
  });
}
