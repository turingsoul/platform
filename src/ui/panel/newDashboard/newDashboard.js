import angular from "angular";
import $ from "jquery";

{
    angular.module("xdt/newDashboard", []).directive("newDashboard", () => {
        return {
            restrict: "E",
            template:"<iframe class='cde' src='/xdatainsight/content/dashboard-v3/index.html'></iframe >",
            //template:"<iframe class='cde' src='http://localhost:8080'></iframe >",
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
