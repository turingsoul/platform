import angular from 'angular';
import $ from 'jquery';
import reportList from '../controller'
import {tips} from '../../popup/dataSource/component/createModule/public';


{

    angular.module('xdt/recentReview', [])
      .directive('recentReview', ()=> {
        return {
          restrict: 'E'
        }
      })
      .controller('recentReviewCont', ['$scope', '$http', '$state', '$rootScope', 'commonFactory', 'tabHandleFactory','recentFactory',
                                        ($scope, $http, $state, $rootScope, commonFactory, tabHandleFactory, recentFactory)=> {

            //计算设置wrap padding，使节点居中显示
            function setReportPadding(){
                let itemW = 330;
                let totalW = $(window).width();
                let rowNum = Math.floor(totalW/itemW);
                let padding = (totalW - itemW*rowNum)/2 + 'px';
                $('.reportReview').css('padding','0 '+padding);
            }
            setReportPadding();
            $(window).off('resize.REPORT_REVIEW').on('resize.REPORT_REVIEW',()=>{
                setReportPadding();
            });

            document.getElementsByTagName("menu-directive")[0].className = "menu-hide";
            $(".flexline").removeClass("unfolded").addClass("folded");
            document.getElementsByClassName("userList")[0].className = "userList user-hide";
            document.querySelector('.lastest').style.backgroundPositionX = '0px';
            document.querySelector('.lastest').style.backgroundPositionY = '-190px';
            let timeNum = 0;
            let pathParam = {
                pathWindow: "recentReview",
                pathName: "最近浏览"
            };
            $scope.$emit('fileWindowPath', pathParam);
            let recentUrl = '/xdatainsight/plugin/xdt/api/user-settings/recent';
            $scope.$emit('loading',true);
            commonFactory.XHR('get',recentUrl,'')
                .then((data)=>{
                  $scope.$emit('loading',false);
                    $scope.dataReports = data;
                    if(!data) {
                      return '';
                    }
                    reportList(data, $scope.pluginConfig,'recent',$state,$rootScope,$scope,tabHandleFactory, recentFactory);
                },(data)=>{
                    $scope.$emit('loading',false);
                });
            $scope.recent = (data,e) =>{
                recentFactory.deleteXhr(data,'/xdatainsight/plugin/xdt/api/user-settings/recent/delete').then(()=>{
                    e.parentNode.removeChild(e);
                    tips("取消成功");
                });
                /*commonFactory.XHR('get',recentUrl,'')
                    .then((data)=>{
                        for (var i = 0; i < data.length; i++){
                            if (data[i].title === title){
                                data.splice(i,1);
                            }
                        }
                        commonFactory.XHR('post',recentUrl,data)
                            .then((data)=>{
                                e.parentNode.removeChild(e);
                                tips("取消成功");
                            },(data)=>{

                            });
                    },(data)=>{

                    })*/
                // recentFactory.deleteXhr
            }
        }])
      .factory("commonFactory",['$http','$q',($http,$q)=>{
        let service={};
        service.XHR=(method,url,data)=>{
            let deferred = $q.defer();
            $http({
                method: method,
                headers:{contentType: "application/json; charset=utf-8"},
                url: url + '?_=' + +new Date(),
                dataType: 'json',
                cache:false,
                data:data
            }).success((data)=>{
                deferred.resolve(data);
            }).error((data)=>{
                deferred.reject(data)
            });
            return deferred.promise;
        };
        return service;
    }])
}