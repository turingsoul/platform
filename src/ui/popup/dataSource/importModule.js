/**
 * Created by Administrator on 2016/5/10.
 */

import angular from 'angular';
import $ from 'jquery';

{
    "use strict";
    const template = require('./../pages/importModule.html');
    angular.module("xdt/dataSource")
        .directive('importData',()=>{
            return {
                restrict: 'E',
                template: template,
                link() {

                }
            }
        })
        //.controller("importController",($rootScope,$scope)=>{
        //    //$rootScope.$on('duowei', function(event,data) {
        //    //    $rootScope.$broadcast("duoweiUpdate",data);
        //    //});
        //})
}
