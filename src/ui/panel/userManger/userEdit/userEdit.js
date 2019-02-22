import angular from 'angular';
import './userEdit.css';

{
  var userList = angular.module('xdt/userEdit',[]);

  userList.controller('userEdit',function ($scope) {
    $scope.roles  = [
      {
        name: '管理员',
        selected: true
      },
      {
        name: 'BI分析师',
        selected: false
      },
      {
        name: '设计用户',
        selected: false
      },
      {
        name: '普通用户',
        selected: false
      }
    ];
  }).directive('userEdit',()=>{
    return {
      restrict: 'E',
      template: require("./userEdit.html")
    }
  });
}
