import angular from 'angular';

{
    "use strict";
    const template = require('./../pages/helpCenter.html');
    angular.module("xdt/administration")
        .directive('helpCenter',()=>{
            return {
                restrict: 'E',
                template: template,
                link() {

                }
            }
        })
}