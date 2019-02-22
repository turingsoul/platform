///**
// * Created by Administrator on 2016/5/10.
// */
import angular from 'angular';
import './component/createConnect/connectData';
import './component/createModule/createModel';
import './component/importModule/importModel';
import './component/existData/existData';
{
    "use strict";
    const template = require('../pages/createConnect.html');
    angular.module("xdt/dataSource",["xdt/connectData","xdt/createModel","xdt/importModel","xdt/existData"])
        .directive('createConnect',()=>{
            return {
                restrict: 'E',
                template: template,
                link() {

                }
            }
        })
}
