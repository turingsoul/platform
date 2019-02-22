import angular from 'angular';
import $ from 'jquery';
import './userTree.css';

{
  angular.module('xdt/userTree',[])
    .directive('userTree',() => {
    return {
      restrict: 'ACE',
      template: require("./userTree.html"),
      // scope: {
      //   propdata: '',
      // },
      scope: false,
      link: function (scope,ele,attr) {
        // $('.parent-list').click(function (e) {
        //   console.log(e);
        // });

      },
      controller: [
        "$scope",
        "$state",
        "$http",
        "$rootScope",
        ($scope,
          $state,
          $http,
          $rootScope
          ) => {
            //加载时标记是否展开状态
            $scope.init();
            $scope.init = () => {
              // console.log($scope.folder);
              var addStatusData = $scope.folder.map(function (ele) {
                return {
                  ...ele,
                  isOpen:false
                }
              });

              $scope.folder = addStatusData;

            },


            $scope.checkEvent = (ele) => {
               if(Array.from(ele.classList).includes('ut-list-parent') || Array.from(ele.classList).includes('ut-list')) {
                 ele.classList.add('isSelected');
               }else {
                 $scope.checkEvent(ele.parentNode);
               }
            },



            $scope.clickTree = (item,e) => {

              // 标记选中组状态
              e.stopPropagation();
              $('.ut-list-parent').removeClass('isSelected');
              // $('.ut-list-parent .icon').removeClass('isSelected');
              $('.ut-list').removeClass('isSelected');


              $scope.checkEvent( e.srcElement);

              //是否打开状态
              if(item.children) {
                item.isOpen = !item.isOpen;
              }


  console.log($scope.folder);
  // $scope.folder.push({
  //     name: 'tetstttt',
  //     number: 43343434,
  //     des: 'dasdasdas'
  //   });
              

              
              

              $scope.$emit("upDateRightType",'userList');
              $scope.$emit("selectTree",item);
              // e.stopPropagation();
              // console.log(e);
              // console.log(e.target);
            }

            $scope.clickEdit = (item,e) => {
              e.stopPropagation();
              $('.ut-list-parent').removeClass('isSelected');
              // $('.ut-list-parent .icon').removeClass('isSelected');
              $('.ut-list').removeClass('isSelected');


              $scope.checkEvent( e.srcElement);
              $scope.$emit("upDateRightType",'editGroup');
              $scope.$emit("selectTree",item);
              $scope.$emit("editGroup",item);

            }



        }
      ]
    }
  });
}