/**
 * Created by Administrator on 2016/5/10.
 */
import angular from 'angular';
//import './component/createModule/createModel';
//import './component/createModule/parseFile';
//import './component/createModule/modelSetting';
//import './component/createModule/modelQuery';
//import './component/createModule/sheetRelation';
//import './component/createModule/connectArgs';

{
    "use strict";
    const template = require('./../pages/createModule.html');
    angular.module("xdt/dataSource")
    //angular.module("xdt/dataSource",["xdt/createModel","xdt/parseFile","xdt/modelSetting","xdt/modelQuery","xdt/sheetRelation","xdt/connectArgs"])
        .directive('createModule',()=>{
            return {
                restrict: 'E',
                template: template,
                link() {

                }
            }
        })
        .controller("moduleController",['$scope',($scope)=>{
            $scope.$on('sourceName', function(event,data) {
                var args=[];
                args.push(data);
                $scope.$broadcast("sourceNameUpdate",args);
            });
            $scope.$on('moshi', function(event,data) {
                var args=[];
                args.push(data);
                $scope.$broadcast("moshiUpdate",args);
            });
            $scope.$on('biao', function(event,data) {
                var args=[];
                args.push(data);
                $scope.$broadcast("biaoUpdate",args);
            });
            $scope.$on('sheet1', function(event,data) {
                var args=[];
                args.push(data);
                $scope.$broadcast("sheet1Update",args);
            });
            $scope.$on('sheet2', function(event,data) {
                var args=[];
                args.push(data);
                $scope.$broadcast("sheet2Update",args);
            });
            $scope.$on('ziduan1', function(event,data) {
                var args=[];
                args.push(data);
                $scope.$broadcast("ziduan1Update",args);
            });
            $scope.$on('ziduan2', function(event,data) {
                var args=[];
                args.push(data);
                $scope.$broadcast("ziduan2Update",args);
            });
            $scope.$on('connectionId', function(event,data) {
                var args=[];
                args.push(data);
                $scope.$broadcast("connectionIdUpdate",args);
            });
            $scope.$on('setlist', function(event,data) {
                var args=[];
                args.push(data);
                $scope.$broadcast("setlistUpdate",args);
            });
            $scope.$on('datalist', function(event,data) {
                var args=[];
                args.push(data);
                $scope.$broadcast("datalistUpdate",args);
            });
            $scope.$on('close', function(event,data) {
                var args=[];
                args.push(data);
                $scope.$broadcast("closeUpdate",args);
            });
            $scope.$on('completeData', function(event,data) {
                var args=[];
                args.push(data);
                $scope.$broadcast("completeDataUpdate",args);
            });
            $scope.$on('advance', function(event,data) {
                var args=[];
                args.push(data);
                $scope.$broadcast("advanceUpdate",args);
            });
        }])
}