import angular from 'angular';

{
    "use strict";
    const template = require('./../pages/userAbout.html');
    angular.module("xdt/administration")
        .directive('userAbout',()=>{
            return {
                restrict: 'E',
                template: template,
                link() {

                }
            }
        })
}