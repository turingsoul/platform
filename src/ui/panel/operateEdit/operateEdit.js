import angular from 'angular';
import $ from 'jquery';




{

    angular.module('xdt/operateEdit', [])
      .directive('operateEdit', ()=> {
        return {
          restrict: 'E',
          template: "<iframe class='fileEdit' ng-src={{selfSrc}}></iframe>",
          scope:{
            propdata:'<',
            selfSrc: '@'
          },
          controller: ['$scope', '$stateParams', '$state', 'pageFactory',($scope, $stateParams, $state, pageFactory)=> {
            pageFactory.getWindowHeight();
            //重新设置$stateParams  避免传过来的为空
            $stateParams = $scope.propdata;
            $scope.$emit('fileWindowPath', $stateParams);
            var dataFilePath = $stateParams.pluginPath + '.' + $stateParams.pluginName;
            let dataPath = encodeURI((dataFilePath).replace(/:/g, "\t").replace(/\//g, ":"));
            let dataUrl = $stateParams.pathParam ? $stateParams.pathParam : "generatedContent";

            if(/\.wcdf$/.test(dataPath)){
              $scope.selfSrc = `/xdatainsight/dashboard/index.html#path=${dataPath.replace(/\.wcdf$/,'')}` ;
            }/*else if(/\.xdf$/.test(dataPath)){
              $scope.selfSrc = `dashboard-v3/index.html#path=${dataPath.replace(/\.xdf$/,'').replace(/:/g,'/')}&type=2`;
            }*/
            else if(/\.xdp$/.test(dataPath)){
              //$scope.selfSrc = `http://localhost:3000/#/designer#path=${dataPath.replace(/\.xdp$/,'').replace(/:/g,'/')}`;
              $scope.selfSrc = `/xdatainsight/content/data-portal/index.html#designer#path=${dataPath.replace(/\.xdp$/,'').replace(/:/g,'/')}`;
            } else {
              $scope.selfSrc = "/xdatainsight/api/repos/" + dataPath + "/" + dataUrl;
            }            
        }] 
        }
      })
}