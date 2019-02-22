import angular from "angular";
import $ from "jquery";

{
    angular.module("xdt/newPortal", []).directive("newPortal", () => {
        return {
            restrict: "E",
             template:"<iframe src='/xdatainsight/content/data-portal/index.html'></iframe >",
             //template:"<iframe src='http://localhost:3000'></iframe >",
            scope: {
                propdata: "<"
            },
            controller: [
                "$http",
                "$scope",
                "pageFactory",
                ($http, $scope, pageFactory) => {
                    let pathParam = {
                        pathWindow: "dashboard",
                        pathName: "新建仪表盘"
                    };
                    pageFactory.getWindowHeight();
                    $scope.$emit("fileWindowPath", pathParam);
                    document
                        .querySelector("menu-directive")
                        .classList.add("menu-hide");
                    $(".flexline").removeClass("unfolded").addClass("folded");
                }
            ]
        };
    });
}
