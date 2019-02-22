/**
 * Created by Administrator on 2016/5/10.
 */
import angular from 'angular';
import $ from 'jquery';
{
    "use strict";
    const template = require('./../pages/existData.html');
    angular.module("xdt/dataSource")
        .directive('existData',()=>{
            return {
                restrict: 'E',
                template: template,
                link() {
                }
            }
        })
    .controller("exCtr",['$rootScope','$scope',($rootScope,$scope)=>{
        $rootScope.$on('names', function(event,data) {
            $rootScope.$broadcast("namesUpdate",data);
        });
        $rootScope.$on('edit', function(event,data) {
            $rootScope.$broadcast("editUpdate",data);
        });
        $rootScope.$on('updata', function(event,data) {
            var args=[];
            args.push(data);
            $rootScope.$broadcast("updataUpdate",args);
        });
        $rootScope.$on('updata1', function(event,data) {
            var args=[];
            args.push(data.name);
            $rootScope.$broadcast("updataUpdate1",{args: args, editable: data.editable});
        });
        $rootScope.$on('editContent', function(event,data) {
            $rootScope.$broadcast("editContentUpdate",data);
        });
        $rootScope.$on('editContent1', function(event,data) {
            $rootScope.$broadcast("editContent1Update",data);
        });
        $rootScope.$on('liName', function(event,data) {
            $rootScope.$broadcast("liNameUpdate",data);
        });
    }])
}