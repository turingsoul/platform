///**
// * Created by Administrator on 2016/5/10.
// */
//import angular from 'angular';
//import $ from 'jquery';
//import "../../../ui/style/taskPlan.css";
//import "../../../ui/style/jquery-ui.min.css";
//import "../../../ui/style/jquery-ui.theme.min.css";
//import "../../../lib/js/jquery-ui.min.js";
//
//{
//    "use strict";
//    const template = require('./../pages/taskPlan.html');
//    angular.module("popup/taskplan",[])
//        .directive('taskPlan',()=>{
//            return {
//                restrict: 'E',
//                template: template,
//                link() {
//
//                }
//            }
//        })
//        .provider("taskplanProvider", function () {
//            this.$get = ($http, $q)=> {
//                return {
//                    callItunes(_finalUrl){
//                        let deferred = $q.defer();
//                        $http({
//                            method: 'get',
//                            headers: {contentType: "application/json; charset=utf-8"},
//                            url: _finalUrl,
//                            dataType: 'json',
//                            data: ''
//                        }).success((data)=> {
//                            deferred.resolve(data);
//                        }).error(()=> {
//                            deferred.reject('There was an error')
//                        })
//                        return deferred.promise;
//                    }
//                }
//            }
//        })
//        .controller("taskplanController", function ($scope, $http, taskplanProvider) {
//
//        }
//}