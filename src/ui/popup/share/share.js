import angular from 'angular';
import $ from 'jquery';
import * as _ from 'lodash';
import '../style/share.css'
import { copyToClipboard } from '@/ui/utils/index'

const template = require('./../pages/share.html');

angular
.module('xdt/share',[])
.directive('share',()=>{
    return {
        restrict: 'E',
        replace:true,
        template: template,
        link() {
        }
    }
})
.controller( 'shareCtr', ['$rootScope', '$scope', '$http', 'popupFactory',( $rootScope, $scope, $http, popupFactory )=>{
    $("#xdt-share-create-term").datepicker({dateFormat: "yy-mm-dd"})
      .on('change',function() {
        const date = document.getElementById("xdt-share-create-term").value;
        $scope.popup.create.term = date;
    });
    /**
     * 初始化默认值
     */
    $scope.init = ()=>{
      /**
       * 设置默认时间;
       * @param {Number} num 距离当前时间的天数
       * @param {String} linkStr 连接字符串的格式
       * @return {String}
       */
        function getDefaultDate(num,linkStr) {
          const nowDate = new Date();
          const defaultTime = nowDate.getTime() + num*24*60*60*1000;
          const defaultDate = new Date(defaultTime);
          const year = defaultDate.getFullYear();
          let month = defaultDate.getMonth()+1;
          if(month < 10) {
            month = '0' + month;
          }
          const day = defaultDate.getDate();
          return `${year}${linkStr}${month}${linkStr}${day}`;
        }

        let popup = {
            create:{
                show:false,
                term: getDefaultDate(1,'-'),
                private:false,
                password:''
            },
            share:{
                show:false,
                term:'',
                name:'',
                link:''
            },
            confirm:{
                show:false
            },
            success: {
              show: false
            },
            error: {
              show : false,
              message: ''
            }
        };
        $scope.popup = popup;
        $scope.snapId = '';
    }

    $scope.init();


    $scope.$on('XDT_SHARE',(event,data)=>{
        if(!data){
            return;
        }

        let snap = data.snap;

        if(snap === true){
            let { name, link, snapId ,term} = data;
            $scope.popup.share.show = true;
            $scope.popup.share.term = term;
            $scope.popup.share.name = name || '';
            $scope.popup.share.link = link || '';
            $scope.snapId = snapId;
        }else{
            $scope.popup.create.show = true;
        }
        popupFactory.popupName('share');
    });

    //创建分享
    $scope.createShare = ()=> {
      const filePath = $rootScope.d.path;
      let iframeDashboard = null;
      const pathSegment = encodeURI(filePath.replace(/\//g, ":"));


      const iframeArray = Array.from( document.querySelectorAll('iframe'));
      iframeArray.forEach((ele)=>{
          if(_.includes(ele.src,pathSegment)) {
              iframeDashboard = ele.contentWindow.Dashboard;
          }

      });

      const initDsh = iframeDashboard.util.initDsh();
      const saveData = JSON.stringify(initDsh);
      const term = $scope.popup.create.term;
      //创建快照的url;
      let createUrl = `/xdatainsight/api/repo/files/snapshoot?filePath=${filePath}&expiryDate=${term}`;

      if($scope.popup.create.private && $scope.popup.create.password !== "") {
        const code = $scope.popup.create.password;
        createUrl = `/xdatainsight/api/repo/files/snapshoot?filePath=${filePath}&expiryDate=${term}&code=${code}`;
      }


      $http({
        method: "put",
        headers: {Accept: "application/json"},
        url: createUrl,
        dataType: "json",
        data: saveData
      }).then(function (data) {
        $scope.popup.create.show = false;
        const name = $rootScope.d.name;
        const path = $rootScope.d.path;
        // 获取快照的url
        const getUrl = `/xdatainsight/api/repo/files/snapshoot?filePath=${path}`;

        $http({
          method: "get",
          headers: {Accept: "application/json"},
          url: getUrl,
        }).then(function (res) {
          const id = res.data.id;
          const expiryDate = res.data.expiryDate;
          $scope.snapId = id;
          const snapshotPath = res.data.path;
          const origin = window.location.origin;
          const link = `${origin}/xdatainsight/content/dashboard-v3/index.html#path=${snapshotPath}&type=3`;

          $scope.popup.share.show = true;
          $scope.popup.share.term = expiryDate;
          $scope.popup.share.name = name || '';
          $scope.popup.share.link = link || '';
        },function (err) {
          $scope.popup.create.show = false;
          $scope.showError("获取快照信息失败！");
        });

      },function (err) {
        $scope.popup.create.show = false;
        $scope.showError("创建快照失败！");
      });
    };
    //关闭分享弹框
    $scope.close = function(){
        $('#xdt-share').addClass('popupHide');
        $('.popup').hide();
        $scope.init();
    };

    //关闭取消分享二次确认弹框
    $scope.closeConfirm = ()=>{
        $scope.popup.confirm.show = false;
        $scope.popup.share.show = true;
    }

    //弹出取消分享二次确认框
    $scope.showConfirm = ()=>{
        $scope.popup.share.show = false;
        $scope.popup.confirm.show = true;
    }

    //取消分享
    $scope.cancelShare = ()=>{
      const snapId = $scope.snapId;
      const deledteUrl = `api/repo/files/snapshoot?snapshootId=${snapId}`;
      $http({
        method: "delete",
        headers: {Accept: "application/json"},
        url: deledteUrl,
        data: ""
      }).then(function (res) {
        $scope.popup.confirm.show = false;
        $scope.popup.share.show = false;
        $scope.showError("取消成功，你可以重新创建快照！");
      }, function (err) {
        $scope.popup.confirm.show = false;
        $scope.popup.share.show = false;
        $scope.showError("取消分享失败！");
      });
    }

    //展示错误提示：
    $scope.showError = (mes) => {
      $scope.popup.error.show = true;
      $scope.popup.error.message = mes;
    }

    //取消提示
    // $scope.closeError = ()=>{
    //   $scope.popup.error.show = false;
    //   $scope.popup.error.message = '';
    //   $scope.init();
    // }

    //复制地址
    $scope.copyLink = ()=>{
        let ele = $('#xdt-share-link')[0];
        copyToClipboard(ele);
        alert('已复制成功！');
    }

}]);