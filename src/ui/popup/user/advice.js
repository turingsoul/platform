import angular from 'angular';

{
    "use strict";
    const template = require('./../pages/userAdvice.html');
    angular.module("xdt/administration")
        .directive('userAdvice',()=>{
            return {
                restrict: 'E',
                template: template,
                link() {

                }
            }
        })
}