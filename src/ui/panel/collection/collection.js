import angular from 'angular';
import $ from 'jquery';
import reportList from '../controller'
import {tips} from '../../popup/dataSource/component/createModule/public';


{

    angular.module('xdt/collection', [])
      .directive('collection', ()=> {
        return {
          restrict: 'E'
        }
      })
      .controller('collectionCont',['$scope', '$http', '$state', '$rootScope', 'commonFactory', 'tabHandleFactory','recentFactory',
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
            document.querySelector('.navbar .collection1').style.backgroundPositionX = '0px';
            document.querySelector('.navbar .collection1').style.backgroundPositionY = '-231px';
            let pathParam = {
                pathWindow: "collection",
                pathName: "收藏"
            };
            $scope.$emit('fileWindowPath', pathParam);
            
            let favoritesUrl = '/xdatainsight/plugin/xdt/api/user-settings/favorites';
            $scope.$emit('loading',true);
            commonFactory.XHR('get',favoritesUrl,'')
                .then((data)=>{
                  $scope.$emit('loading',false);
                    $scope.dataReports = data;
                    if(!data) {
                      return '';
                    }
                    reportList(data, $scope.pluginConfig, "favorites", $state, $rootScope, $scope, tabHandleFactory, recentFactory);
                },(data)=>{

                });

            $scope.favorites = (data,e) =>{
                recentFactory.deleteXhr(data,'/xdatainsight/plugin/xdt/api/user-settings/favorites/delete').then(()=>{
                    e.parentNode.removeChild(e);
                    tips("取消收藏");
                });
                /*commonFactory.XHR('get',favoritesUrl,'')
                    .then((data)=>{
                            for (var i = 0; i < data.length; i++){
                                if (data[i].title === title){
                                    data.splice(i,1);
                                }
                            }
                            $rootScope.collection = data;
                            commonFactory.XHR('post',favoritesUrl,data)
                                .then((data)=>{
                                    e.parentNode.removeChild(e);
                                    tips("取消收藏");
                                },(data)=>{

                                });
                        },(data)=>{

                        })*/
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