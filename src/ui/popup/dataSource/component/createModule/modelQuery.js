/**
 * Created by Administrator on 2016/6/30.
 */

import angular from "angular";
import "../style/public.css";
import "../style/createModule.css";
import "./service";
import { closePopup, tips, complete, init1, init2, init3 } from "./public";
{
    ("use strict");
    const template = require("./modelQuery.html");
    angular
        .module("xdt/modelQuery", ["xdt/service"])
        .directive("modelQuery", () => {
            return {
                restrict: "E",
                template: template,
                link() {
                    var type = document.querySelector(".setType select");
                    type.onchange = function() {
                        var val = this.value;
                        if (val == "0") {
                            document
                                .querySelector(".sheet-body")
                                .classList.remove("hide");
                            document
                                .querySelector(".SQL-body")
                                .classList.add("hide");
                            document
                                .querySelector(".queryNext")
                                .classList.remove("hide");
                            document
                                .querySelector(".queryComplete")
                                .classList.add("hide");
                        } else if (val == "1") {
                            document
                                .querySelector(".SQL-body")
                                .classList.remove("hide");
                            document
                                .querySelector(".sheet-body")
                                .classList.add("hide");
                            document
                                .querySelector(".queryNext")
                                .classList.add("hide");
                            document
                                .querySelector(".queryComplete")
                                .classList.remove("hide");
                        } else {
                            return;
                        }
                    };
                }
            };
        })
        .factory("queryFactory", [
            "$http",
            $http => {
                let service = {};
                service.nextStep = () => {};
                service.preStep = () => {
                    if (
                        document.querySelector(".model-connect select").value ==
                        "0"
                    ) {
                        document
                            .querySelector(".modelQuery")
                            .classList.add("hide");
                        document
                            .querySelector(".connectArgs")
                            .classList.remove("hide");
                    } else {
                        document
                            .querySelector(".modelQuery")
                            .classList.add("hide");
                        document
                            .querySelector(".createModel1")
                            .classList.remove("hide");
                    }
                };
                service.addSheet = () => {
                    var leftOption = document.querySelectorAll(
                        ".lSheet option"
                    );
                    for (var i = 0; i < leftOption.length; i++) {
                        if (leftOption[i].selected) {
                            var rightOption = document.querySelector(".rSheet");
                            var factOption = document.querySelector(
                                ".factSheet"
                            );
                            var e = angular.element(leftOption[i]).clone();
                            angular.element(leftOption[i]).remove();
                            var child1 = e.clone();
                            var child2 = e.clone();
                          
                            
                            angular.element(rightOption).append(child1);
                            angular.element(factOption).append(child2);
                        }
                    }

                    if (
                        document.querySelectorAll(".rSheet option").length > 0
                    ) {
                      //fuck dom
                      var rightOption = document.querySelector(".rSheet");
                      var factSheet = document.querySelector(".factSheet");
                      var rightOptionItems = document.querySelectorAll(".rSheet option");
                      var rightFactItems = document.querySelectorAll(".factSheet option");
                      var newOptionItems = [];
                      var newFactItems = [];
                      for(var i=0;i<rightOptionItems.length;i++) {
                        newOptionItems.push(rightOptionItems[i]);
                        newFactItems.push(rightFactItems[i+1]);
                        angular.element(rightOptionItems[i]).remove();
                        angular.element(rightFactItems[i+1]).remove();
                      }
                      newOptionItems.sort(function (a,b) {
                          return a.textContent > b.textContent ? 1:-1;
                      });

                      newFactItems.sort(function (a,b) {
                        return a.textContent > b.textContent ? 1:-1;
                      });
                      angular.element(rightOption).append(newOptionItems);
                      angular.element(factSheet).append(newFactItems);


                        document
                            .querySelector(".sheet-right .warning-info")
                            .classList.add("warning");
                    } else {
                        document
                            .querySelector(".sheet-right .warning-info")
                            .classList.remove("warning");
                    }
                    if (
                        document.querySelectorAll(".rSheet option").length == 1
                    ) {
                        document
                            .querySelector(".queryNext")
                            .classList.add("hide");
                        document
                            .querySelector(".queryComplete")
                            .classList.remove("hide");
                    } else {
                        document
                            .querySelector(".queryNext")
                            .classList.remove("hide");
                        document
                            .querySelector(".queryComplete")
                            .classList.add("hide");
                    }
                };
                service.removeSheet = () => {
                    var rightOption = document.querySelectorAll(
                        ".rSheet option"
                    );
                    for (var i = 0; i < rightOption.length; i++) {
                        if (rightOption[i].selected) {
                            var leftOption = document.querySelector(".lSheet");
                            var factOption = document.querySelectorAll(
                                ".factSheet option"
                            );
                            var val = rightOption[i].value;
                            leftOption.appendChild(rightOption[i]);
                            for (var j = 0; j < factOption.length; j++) {
                                if (factOption[j].value == val) {
                                    factOption[j].remove();
                                }
                            }
                        }
                    }
                    if (
                        document.querySelectorAll(".rSheet option").length > 0
                    ) {
                      var leftSheet = document.querySelector(".lSheet");
                      var leftOptionItems = document.querySelectorAll(".lSheet option");
                      var newOptionItems = [];
                      for(var i=0;i<leftOptionItems.length;i++) {
                        newOptionItems.push(leftOptionItems[i]);
                        angular.element(leftOptionItems[i]).remove();
                      }
                      newOptionItems.sort(function (a,b) {
                        return a.textContent > b.textContent ? 1:-1;
                      });
                      angular.element(leftSheet).append(newOptionItems);


                        document
                            .querySelector(".sheet-right .warning-info")
                            .classList.add("warning");
                    } else {
                        document
                            .querySelector(".sheet-right .warning-info")
                            .classList.remove("warning");
                    }
                    if (
                        document.querySelectorAll(".rSheet option").length == 1
                    ) {
                        document
                            .querySelector(".queryNext")
                            .classList.add("hide");
                        document
                            .querySelector(".queryComplete")
                            .classList.remove("hide");
                    } else {
                        document
                            .querySelector(".queryNext")
                            .classList.remove("hide");
                        document
                            .querySelector(".queryComplete")
                            .classList.add("hide");
                    }
                };
                service.toArgs = () => {
                    document.querySelector(".modelQuery").classList.add("hide");
                    document
                        .querySelector(".connectArgs")
                        .classList.remove("hide");
                };

                return service;
            }
        ])
        .controller("queryCtr", [
            "$scope",
            "$rootScope",
            "queryFactory",
            "myService",
            ($scope, $rootScope, queryFactory, myService) => {
                $scope.divLoading = false;
                $scope.nextStep = () => {
                    if (
                        document.querySelectorAll(".rSheet option").length > 1
                    ) {
                        var result = [];
                        var result1 = [];
                        for (
                            var i = 0;
                            i <
                            document.querySelectorAll(".rSheet option").length;
                            i++
                        ) {
                            result.push(
                                document.querySelectorAll(".rSheet option")[i]
                                    .value
                            );
                        }
                        var ziduan1;
                        if (document.querySelector(".factSheet").value == 0) {
                            $scope.$emit("sheet1", result);
                            ziduan1 = document.querySelectorAll(
                                ".rSheet option"
                            )[0].value;
                        } else {
                            result1.push(
                                document.querySelector(".factSheet").value
                            );
                            $scope.$emit("sheet1", result1);
                            ziduan1 = document.querySelector(".factSheet")
                                .value;
                        }
                        $scope.$emit("sheet2", result);
                        //get moren ziduan 2
                        var ziduan2 = document.querySelectorAll(
                            ".rSheet option"
                        )[0].value;
                        //请求之前清空数据
                        $scope.ziduan2 = [];
                        $scope.$emit("ziduan2", []);
                        $scope.ziduan1 = [];
                        $scope.$emit("ziduan1", []);
                        myService
                            .getZiduan($scope.connectionIdUpdate, ziduan2,'sheet-field-right')
                            .then(
                                data => {
                                    $scope.ziduan2 = data.Item;
                                    $scope.$emit("ziduan2", data.Item);
                                },
                                data => {
                                    $scope.ziduan2 = [];
                                    $scope.$emit("ziduan2", []);
                                }
                            );
                        //get moren ziduan 1
                        myService
                            .getZiduan($scope.connectionIdUpdate, ziduan1,'sheet-field-left')
                            .then(
                                data => {
                                    $scope.ziduan1 = data.Item;
                                    $scope.$emit("ziduan1", data.Item);
                                },
                                data => {
                                    $scope.ziduan1 = [];
                                    $scope.$emit("ziduan1", []);
                                }
                            );
                        document
                            .querySelector(".modelQuery")
                            .classList.add("hide");
                        document
                            .querySelector(".sheetRelation")
                            .classList.remove("hide");
                    } else {
                        document
                            .querySelector(".sheet-right .warning-info")
                            .classList.remove("warning");
                    }
                };
                $scope.preStep = () => {
                    queryFactory.preStep();
                    init3();
                    $scope.$emit("biao", []);
                };
                $scope.addSheet = () => {
                    queryFactory.addSheet();
                };
                $scope.removeSheet = () => {
                    queryFactory.removeSheet();
                };
                $scope.modelChange = e => {
                    $scope.$emit("biao", []);
                    myService.getSheet($scope.connectionIdUpdate, e).then(
                        data => {
                            $scope.$emit("biao", data.Item);
                        },
                        data => {}
                    );
                };
                $scope.toArgs = () => {
                    queryFactory.toArgs();
                };
                $scope.close = () => {
                    closePopup();
                    init1();
                    init2();
                    init3();
                    $scope.$emit("biao", []);
                    $scope.$emit("advance", 1);
                };
                $scope.complete = () => {
                    if (document.querySelector(".setType select").value == 0) {
                        $scope.divLoading = true;
                        myService
                            .complete(
                                $scope.sourceName,
                                $scope.connectionIdUpdate
                            )
                            .then(
                                data => {
                                    $scope.divLoading = false;
                                    complete();
                                    closePopup();
                                    $scope.$emit("advance", 1);
                                    $rootScope.$emit(
                                        "updata",
                                        $scope.sourceName
                                    );
                                    $rootScope.$emit("updata1", {
                                        name: $scope.sourceName,
                                        editable: true
                                    });
                                },
                                data => {
                                    $scope.divLoading = false;
                                    complete();
                                    closePopup();
                                    $scope.$emit("advance", 1);
                                    tips("无法读取元数据，请联系管理员！");
                                }
                            );
                    } else {
                        var sql = document.querySelector(".SQL-body textarea")
                            .value;
                        $scope.divLoading = true;
                        myService
                            .sql(
                                $scope.sourceName,
                                $scope.connectionIdUpdate,
                                sql
                            )
                            .then(
                                data => {
                                    $scope.divLoading = false;
                                    complete();
                                    closePopup();
                                    $scope.$emit("advance", 1);
                                },
                                data => {
                                    $scope.divLoading = false;
                                    tips("请检查你的sql语句");
                                }
                            );
                    }
                };
                $scope.$on("moshiUpdate", function(event, data) {
                    $scope.moshi = data[0];
                    $scope.moren = data[0][0];
                });
                $scope.$on("biaoUpdate", function(event, data) {
                    $scope.biao = data[0];
                });
                $scope.$on("connectionIdUpdate", function(event, data) {
                    $scope.connectionIdUpdate = data[0];
                });
                $scope.$on("sourceNameUpdate", function(event, data) {
                    $scope.sourceName = data[0];
                });
            }
        ])
        .filter("replaceAndCut", function() {
            return function(value) {
                return value.substr(value.indexOf(".") + 1).replace(/`/g, "");
            };
        })
        .filter("replaceFh", function() {
            return function(value) {
                return value.replace(/`/g, "");
            };
        });
}
