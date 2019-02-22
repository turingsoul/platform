import angular from 'angular';
import $ from 'jquery';




{

    angular.module('xdt/newOlap', [])
      .directive('newOlap', ()=> {
        return {
          restrict: 'E',
          template: "<iframe class='saiku' src='/xdatainsight/content/saiku-ui/index.html?biplugin5=true'></iframe >",
          scope:{
            propdata:'<',
          },
          controller: ['$scope','pageFactory',($scope,pageFactory)=>{
            let pathParam = {
                pathWindow : "olap",
                pathName : "新建多维分析"
            };
            pageFactory.getWindowHeight();
            $scope.$emit('fileWindowPath', pathParam);
            document.querySelector('menu-directive').classList.add('menu-hide'); 
            $(".flexline").removeClass("unfolded").addClass("folded");                           
            }]
        }
      })
}