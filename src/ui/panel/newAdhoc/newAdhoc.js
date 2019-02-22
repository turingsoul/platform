import angular from 'angular';
import $ from 'jquery';




{

    angular.module('xdt/newAdhoc', [])
      .directive('newAdhoc', ()=> {
        return {
          restrict: 'E',
          template: "<iframe class='waqr' src='/xdatainsight/api/repos/xwaqr/editor'></iframe >",
          scope:{
            propdata:'<',
          },
          controller: ['$scope','pageFactory',($scope,pageFactory) =>{
            let pathParam = {
                pathWindow : "adhoc",
                pathName : "新建即席查询"
            };
            pageFactory.getWindowHeight();
            $scope.$emit('fileWindowPath', pathParam);
            document.querySelector('menu-directive').classList.add('menu-hide');
            $(".flexline").removeClass("unfolded").addClass("folded");
            }]  
        }
      })
}