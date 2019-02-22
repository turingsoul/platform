import angular from 'angular';
import './newGroup.css';

{
  var userList = angular.module('xdt/newGroup',[]);

  userList.controller('newGroup',function ($scope,$rootScope) {
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
    $scope.defaultValue = $scope.$parent.groupInit;
    $scope.current = $scope.$parent.currentTree;
  

    $scope.$on("changeGroup",(event,data) => {
      $scope.defaultValue = data;
      $scope.current = data;
    });

    $scope.$on("newGroup",(event,data) => {
      $scope.defaultValue = data;
      $scope.current = data;
  });


    $scope.save = () => {
      console.log($scope.current);
      console.log($scope.defaultValue);
      $scope.$emit("upDateTree",$scope.current,$scope.defaultValue);


    };
    

  }).directive('newGroup',()=>{
    return {
      restrict: 'E',
      template: require("./newGroup.html")
    }
  });
}
