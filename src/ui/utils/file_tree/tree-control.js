import $ from 'jquery';
import { setInterval, setTimeout, clearTimeout } from 'timers';

{
    'use strict';
    const angular = require('angular');
    const $ = require('jquery');
    angular.module( 'treeControl', [])
        .constant('treeConfig', {
            templateUrl: null
        })
        .directive( 'treecontrol', ['$compile', function( $compile ) {
            function classIfDefined(cssClass, addClassProperty) {
                if (cssClass) {
                    if (addClassProperty)
                        return 'class="' + cssClass + '"';
                    else
                        return cssClass;
                }
                else
                    return "";
            }
            function ensureDefault(obj, prop, value) {
                if (!obj.hasOwnProperty(prop))
                    obj[prop] = value;
            }
            return {
                restrict: 'EA',
                require: "treecontrol",
                transclude: true,
                scope: {
                    treeModel: "=",
                    selectedNode: "=?",
                    selectedNodes: "=?",
                    expandedNodes: "=?",
                    onSelection: "&",
                    onNodeToggle: "&",
                    orderBy: "@",
                    reverseOrder: "@",
                    filterExpression: "=?",
                    filterComparator: "=?"
                },
                controller: ['$scope', '$rootScope','$templateCache', '$interpolate', 'treeConfig', '$http', function( $scope,$rootScope,$templateCache, $interpolate, treeConfig, $http) {
                    function defaultIsLeaf(node) {
                        return !node[$scope.options.nodeChildren] || node[$scope.options.nodeChildren].length === 0;
                    }

                    function shallowCopy(src, dst) {
                        if (angular.isArray(src)) {
                            dst = dst || [];
                            for ( var i = 0; i < src.length; i++) {
                                dst[i] = src[i];
                            }
                        } else if (angular.isObject(src)) {
                            dst = dst || {};

                            for (var key in src) {
                                if (hasOwnProperty.call(src, key) && !(key.charAt(0) === '$' && key.charAt(1) === '$')) {
                                    dst[key] = src[key];
                                }
                            }
                        }

                        return dst || src;
                    }
                    function defaultEquality(a, b) {
                        if (a === undefined || b === undefined)
                            return false;
                        a = shallowCopy(a);
                        a[$scope.options.nodeChildren] = [];
                        b = shallowCopy(b);
                        b[$scope.options.nodeChildren] = [];
                        return angular.equals(a, b);
                    }

                    function defaultIsSelectable() {
                        return true;
                    }

                    $scope.options = $scope.options || {};
                    ensureDefault($scope.options, "multiSelection", false);
                    ensureDefault($scope.options, "nodeChildren", "children");
                    ensureDefault($scope.options, "dirSelectable", "true");
                    ensureDefault($scope.options, "injectClasses", {});
                    ensureDefault($scope.options.injectClasses, "ul", "");
                    ensureDefault($scope.options.injectClasses, "li", "");
                    ensureDefault($scope.options.injectClasses, "liSelected", "");
                    ensureDefault($scope.options.injectClasses, "iExpanded", "");
                    ensureDefault($scope.options.injectClasses, "iCollapsed", "");
                    ensureDefault($scope.options.injectClasses, "iLeaf", "");
                    ensureDefault($scope.options.injectClasses, "label", "");
                    ensureDefault($scope.options.injectClasses, "labelSelected", "");
                    ensureDefault($scope.options, "equality", defaultEquality);
                    ensureDefault($scope.options, "isLeaf", defaultIsLeaf);
                    ensureDefault($scope.options, "allowDeselect", true);
                    ensureDefault($scope.options, "isSelectable", defaultIsSelectable);
                    $scope.selectedNodes = $scope.selectedNodes || [];
                    $scope.expandedNodes = $scope.expandedNodes || [];
                    $scope.expandedNodesMap = {};
                    for (var i=0; i < $scope.expandedNodes.length; i++) {
                        $scope.expandedNodesMap[""+i] = $scope.expandedNodes[i];
                    }
                    $scope.parentScopeOfTree = $scope.$parent;
                    function isSelectedNode(node) {
                        if (!$scope.options.multiSelection && ($scope.options.equality(node, $scope.selectedNode)))
                            return true;
                        else if ($scope.options.multiSelection && $scope.selectedNodes) {
                            for (var i = 0; (i < $scope.selectedNodes.length); i++) {
                                if ($scope.options.equality(node, $scope.selectedNodes[i])) {
                                    return true;
                                }
                            }
                            return false;
                        }
                    }

                    $rootScope.$on("jumpToFile",(d, data)=>{
                        let openFolder = [];//需要打开的路径
                        let rootParent = [];//最外成文件的ID集合

                        let findParentsNode = function(id, parent){
                            let nodes = parent.children;
                            for(let i = 0; i < nodes.length; i++){
                                if(nodes[i].file.id === id){
                                    openFolder.push(nodes[i]);
                                    if(rootParent.indexOf(id) > -1){   
                                        //右侧fileList打开
                                        var folderArr = [];
                                        if(openFolder[0].children){
                                            openFolder[0].children.map((d)=>{
                                                d.file.fileChecked = false;
                                                if(d.file.folder == "false"){
                                                    folderArr.push(d);
                                                }
                                            })
                                        }
                                        var folderObj={
                                            folderList: folderArr,
                                            folderTitle:openFolder[0].file.name
                                        }
                                        folderObj = folderObj ? folderObj :{};
                                        $scope.$emit('folderParam', folderObj);
                                        //左侧fileTree定位
                                        openFolder = openFolder.reverse();
                                        for(let i = 1 ; i < openFolder.length +1; i++){
                                            $scope.expandedNodes = openFolder.slice(0,i);
                                            if (!$scope.$$phase && !$scope.$root.$$phase) {
                                                $scope.$apply();
                                            }
                                        }
                                        openFolder = openFolder.reverse();
                                        $(".bg").removeClass("bg");
                                        $("[value='"+openFolder[0].file.path+"']").addClass("bg");
                                    }else{
                                        findParentsNode(parent.file.id, $scope.treeModel);
                                    }
                                }
                                if(nodes[i].children){
                                    findParentsNode(id, nodes[i]);
                                }
                            }
                        }

                        let checkTreeModel = null;
                        let toDo = function(){
                            checkTreeModel = setTimeout(function(){
                                if($scope.treeModel){
                                    clearTimeout(checkTreeModel);
                                    rootParent = $scope.treeModel.children.map(function(item){
                                        return item.file.id;
                                    });
                                    findParentsNode(data.id, $scope.treeModel);
                                }else{
                                    toDo();
                                }
                            }, 200);
                        }
                        toDo();
                    });

                    $scope.headClass = function(node) {
                        var liSelectionClass = classIfDefined($scope.options.injectClasses.liSelected, false);
                        var injectSelectionClass = "";
                        if (liSelectionClass && isSelectedNode(node))
                            injectSelectionClass = " " + liSelectionClass;
                        //if ($scope.options.isLeaf(node))
                            //return "tree-leaf" + injectSelectionClass;
                        if ($scope.expandedNodesMap[this.$id])
                            return "tree-expanded" + injectSelectionClass;
                        else
                            return "tree-collapsed" + injectSelectionClass;
                    };

                    $scope.iBranchClass = function() {
                        if ($scope.expandedNodesMap[this.$id])
                            return classIfDefined($scope.options.injectClasses.iExpanded);
                        else
                            return classIfDefined($scope.options.injectClasses.iCollapsed);
                    };

                    $rootScope.$on("shutAllNodes",()=>{
                        $scope.expandedNodes=[];
                    });
                    
                    $scope.nodeExpanded = function() {
                        return !!$scope.expandedNodesMap[this.$id];
                    };

                    $scope.tempEvent = null;
                    $scope.tempNode = null;

                    $scope.openOperateMenu = function(node,$event){
                        //散发信号，利用ymx方法实现跳转定位并查询，分两种情况回收站没有path要单独处理

                        if(node.file.path){
                            var yhnpath = node.file.path;
                            var yhnpathArr = yhnpath.split("/");
                            var yhnfinalPath = "";
                            for(let i = 1; i< yhnpathArr.length; i++){
                                yhnfinalPath = yhnfinalPath + "/" + yhnpathArr[i];
                            }

                            setTimeout(function() {
                                document.querySelector(".file-name[value='"+yhnfinalPath+"']").click();
                            }, 0);
                        }else{

                        }

                        setTimeout(function(){
                            let operateMenu = document.querySelector(".operate-menu");
                            // $rootScope.$apply();
                            operateMenu.style.display = "block";
                            operateMenu.style.left = $event.clientX+20+"px";
                            /*弹出属性框的差异化处理*/
                            if($event.clientY>=700){
                                operateMenu.style.top = $event.clientY-85+"px";
                            }else{
                                operateMenu.style.top = $event.clientY-35+"px";
                            }

                            var operateParam = {
                                home:["新建文件夹","上传","下载","属性"],
                                public:["新建文件夹","上传","下载","属性"],
                                favorites:["清空收藏夹"],
                                trash:["清空回收站"]
                            };
                            var operateClass = {
                                home:["newFolder","upload","download","propertyFolder"],
                                public:["newFolder","upload","download","propertyFolder"],
                                favorites:["clearOutCollection"],
                                trash:["clearOutTrash"]
                            };
                            let operateMenuParam = operateParam[node.file.name] ? operateParam[node.file.name]:["新建文件夹","重命名","删除","上传","下载","属性"];
                            let operateMenuClass = operateClass[node.file.name] ? operateClass[node.file.name]:["newFolder","rename","delete","upload","download","propertyFolder"];


                            let operateObj = {
                                nodeFireFox:$event,
                                // nodeProperty:$event.target.parentNode.childNodes,
                                nodeProperty: $event.target.parentNode.childNodes[0].childNodes,
                                nodeFolder:node,
                                operateMenuClass:operateMenuClass,
                                operateMenuParam:operateMenuParam
                            }
                            // $rootScope.currentSelectedNode = $event;
                            $scope.$emit('operateName', operateObj);
                            $event.stopPropagation();
                        },0);

                    };
                    $scope.$on("displayUpdateNow",function(e,data){
                        var node  = data;
                        //散发信号，利用ymx方法实现跳转定位并查询，分两种情况回收站没有path要单独处理
                        if(node.file.path){
                            var yhnpath = node.file.path;
                            var yhnpathArr = yhnpath.split("/");
                            var yhnfinalPath = "";
                            for(let i = 1; i< yhnpathArr.length; i++){
                                yhnfinalPath = yhnfinalPath + "/" + yhnpathArr[i];
                            }
                            setTimeout(function() {
                                document.querySelector(".file-name[value='"+yhnfinalPath+"']").click();
                            }, 0);
                        }else{
                        }
                    });

                    /*发送回收站加锁标签*/
                    $scope.selectNodeHead = function(e,node,tag){
                        if(tag == 1){
                            e = e.target;
                        }else if(tag == 0){
                            e = $(e.target).prev().children()[0];
                        }else if(tag == 3){
                            e = e;
                        }
                        $scope.tempEvent = e;
                        $scope.tempNode = node;
                        $scope.$emit("checkIfHaveFile");
                        if(!$(e).hasClass("fileTreeCheckbox")){
                            /*文件管理排序标签复原*/
                            $(".filePanel .fileTitle a.up").css("border-bottom","5px solid #FFF");
                            $(".filePanel .fileTitle a.down").css("border-top","5px solid #FFF");
                            // if(tag == 1){
                            //     var transcludedScope = this;
                            //     $scope.tempThis = this;
                            // }else if(tag == 0){
                            //     var transcludedScope = $scope.tempThis;
                            // }
                                var transcludedScope = this;
                            $(".bg").removeClass("bg");
                            if(e){
                                if (e.className === "file-name"){
                                    e.classList.add("bg");
                                }else {
                                    $(e).parents(".file-name").addClass("bg");
                                }
                            }else{
                                $(e).parents(".file-name").addClass("bg");
                            }
                            if(node.file.title=="收藏夹"){
                                $rootScope.followTag=true;
                                $rootScope.followTagTitle="取消收藏";
                            }else{
                                $rootScope.followTag=false;
                                $rootScope.followTagTitle="删除";
                            }
                            if(node.file.title=="回收站"){

                                /*将回收站信号设为true,控制批量删除顶栏的*/
                                $rootScope.ifRecycleBin = true;
                                /*弹出过渡动画*/
                                document.querySelector('.filePanel .trash-loading').style.display = 'block';
                                /*初次点击无缓存，即发送请求，有缓存读取缓存数据*/
                                if (!!$rootScope.dataCache.trashData){
                                    //transcludedScope.node.children负责存储数据，此处为读取缓存数据
                                    transcludedScope.node.children = $rootScope.dataCache.trashData;
                                    //处理数据并显示
                                    getThisFile("trashBin");
                                }
                                //无缓存数据，触发请求
                                $http({
                                    method: 'get',
                                    headers:{Accept: "application/json"},
                                    url: "/xdatainsight/api/repo/files/deleted?_=" + +new Date(),
                                    dataType: ''
                                }).success((data)=>{
                                    var arr = [];
                                    if(data){
                                        for (let i = 0; i < data.repositoryFileDto.length; i++) {
                                            // if (data.repositoryFileDto[i].folder == 'false') {
                                                arr.push({file: data.repositoryFileDto[i]});
                                            // }
                                        };
                                        transcludedScope.node.children = arr;
                                        $rootScope.dataCache.trashData = arr;
                                        getThisFile("trashBin");
                                    }else{
                                        transcludedScope.node.children = arr;
                                        $rootScope.dataCache.trashData = arr;
                                        getThisFile("trashBin");
                                    }
                                    document.querySelector('.filePanel .trash-loading').style.display = 'none';
                                }).error((data)=>{
                                    document.querySelector('.filePanel .trash-loading').style.display = 'none';
                                });
                            }else{
                                /*将回收站信号设为false*/
                                $rootScope.ifRecycleBin = false;
                                getThisFile("normal");
                            }

                            /*释放信号，检测是否有文件选中*/


                            /*reset right ul height*/
                            // document.querySelector(".filePanel .filesList").style.height = (top.innerHeight-100)+"px";
                            /*set ul height end*/
                            document.querySelector(".operate-menu").style.display = "none";
                            function getThisFile(purposeType) {
                                if($scope.expandedNodesMap){
                                    var expanding = ($scope.expandedNodesMap[transcludedScope.$id] === undefined);
                                }
                                $scope.expandedNodesMap[transcludedScope.$id] = (expanding ? transcludedScope.node : undefined);
                                if (expanding){
                                    //显示结果列表
                                    // document.querySelector('.filesList ul').style.display="block";
                                    var folderArr = [];
                                    $scope.expandedNodes.push(transcludedScope.node);
                                    if(transcludedScope.node.children){
                                        transcludedScope.node.children.map((d)=>{
                                            d.file.fileChecked = false;
                                            if(purposeType != "trashBin"){
                                                if(d.file.folder=="false"){
                                                    folderArr.push(d);
                                                }
                                            }else{
                                                folderArr.push(d);
                                            }

                                        })
                                        var folderObj={
                                            folderList:folderArr,
                                            folderTitle:node.file.name
                                        }
                                        folderObj = folderObj ? folderObj:{};
                                        /*发送信息进行展示*/
                                        $scope.$emit('folderParam', folderObj);
                                    }
                                }else {

                                    /*收缩的时候也显示*/
                                    var folderArr = [];
                                    // $scope.expandedNodes.push(transcludedScope.node);
                                    if(transcludedScope.node.children){
                                        transcludedScope.node.children.map((d)=>{
                                            d.file.fileChecked = false;
                                            if(purposeType != "trashBin"){
                                                if(d.file.folder=="false"){
                                                    folderArr.push(d);
                                                }
                                            }else{
                                                folderArr.push(d);
                                            }

                                        })
                                        var folderObj={
                                            folderList:folderArr,
                                            folderTitle:node.file.name
                                        }
                                        folderObj = folderObj ? folderObj:{};
                                        $scope.$emit('folderParam', folderObj);
                                    }

                                    /*原有*/
                                    var index;
                                    for (var i=0; (i < $scope.expandedNodes.length) && !index; i++) {
                                        if ($scope.options.equality($scope.expandedNodes[i], transcludedScope.node)) {
                                            index = i;
                                        }
                                    }
                                    if (index !== undefined)
                                        $scope.expandedNodes.splice(index, 1);
                                }
                                if($scope.expandedNodesMap[transcludedScope.$id]){
                                    if(!$scope.expandedNodesMap[transcludedScope.$id].children){
                                        // document.querySelector('.filesList ul').style.display="none";
                                    }
                                }else{
                                    // document.querySelector('.filesList ul').style.display="none";
                                }
                                if ($scope.onNodeToggle) {
                                    var parentNode = (transcludedScope.$parent.node === transcludedScope.synteticRoot)?null:transcludedScope.$parent.node;
                                    $scope.onNodeToggle({node: transcludedScope.node, $parentNode: parentNode,
                                        $index: transcludedScope.$index, $first: transcludedScope.$first, $middle: transcludedScope.$middle,
                                        $last: transcludedScope.$last, $odd: transcludedScope.$odd, $even: transcludedScope.$even, expanded: expanding});
                                }
                            }
                        }
                    };

                    $scope.selectNodeLabel = function( selectedNode){
                        var transcludedScope = this;
                        if(!$scope.options.isLeaf(selectedNode) && (!$scope.options.dirSelectable || !$scope.options.isSelectable(selectedNode))) {
                            this.selectNodeHead();
                        }
                        else if($scope.options.isLeaf(selectedNode) && (!$scope.options.isSelectable(selectedNode))) {
                            return;
                        }else {
                            var selected = false;
                            if ($scope.options.multiSelection) {
                                var pos = -1;
                                for (var i=0; i < $scope.selectedNodes.length; i++) {
                                    if($scope.options.equality(selectedNode, $scope.selectedNodes[i])) {
                                        pos = i;
                                        break;
                                    }
                                }
                                if (pos === -1) {
                                    $scope.selectedNodes.push(selectedNode);
                                    selected = true;
                                } else {
                                    $scope.selectedNodes.splice(pos, 1);
                                }
                            } else {
                                if (!$scope.options.equality(selectedNode, $scope.selectedNode)) {
                                    $scope.selectedNode = selectedNode;
                                    selected = true;
                                }
                                else {
                                    if ($scope.options.allowDeselect) {
                                        $scope.selectedNode = undefined;
                                    } else {
                                        $scope.selectedNode = selectedNode;
                                        selected = true;
                                    }
                                }
                            }
                            if ($scope.onSelection) {
                                var parentNode = (transcludedScope.$parent.node === transcludedScope.synteticRoot)?null:transcludedScope.$parent.node;
                                $scope.onSelection({node: selectedNode, selected: selected, $parentNode: parentNode,
                                  $index: transcludedScope.$index, $first: transcludedScope.$first, $middle: transcludedScope.$middle,
                                  $last: transcludedScope.$last, $odd: transcludedScope.$odd, $even: transcludedScope.$even});
                            }
                        }
                    };

                    $scope.selectedClass = function() {
                        var isThisNodeSelected = isSelectedNode(this.node);
                        var labelSelectionClass = classIfDefined($scope.options.injectClasses.labelSelected, false);
                        var injectSelectionClass = "";
                        if (labelSelectionClass && isThisNodeSelected)
                            injectSelectionClass = " " + labelSelectionClass;

                        return isThisNodeSelected ? "tree-selected" + injectSelectionClass : "";
                    };

                    $scope.unselectableClass = function() {
                        var isThisNodeUnselectable = !$scope.options.isSelectable(this.node);
                        var labelUnselectableClass = classIfDefined($scope.options.injectClasses.labelUnselectable, false);
                        return isThisNodeUnselectable ? "tree-unselectable " + labelUnselectableClass : "";
                    };


                    //tree template
                    $scope.isReverse = function() {
                        return !($scope.reverseOrder === 'false' || $scope.reverseOrder === 'False' || $scope.reverseOrder === '' || $scope.reverseOrder === false);
                    };

                    $scope.orderByFunc = function() {
                      return "'" + $scope.orderBy + "'";
                    };
                    $scope.CurrentNode = null;
                    /*treeData*/
                    $scope.oneSingleFileClick = function(e,node){
                        e.stopPropagation();
                        $rootScope.publicTreeArray = [];
                        if(node.file.checked){

                            $scope.givePowerToAll(node);
                            /*对选中的文件进行数组化*/
                            $scope.getAllCheckedData();
                        }else{

                            $scope.cancelPowerToAll(node);
                            /*这里还应该将选中的上级以及所有上级取消掉*/
                            $scope.cancelAllFather($rootScope.dataCache.treedata,node);
                            /*对选中的文件进行数组化*/
                            $scope.getAllCheckedData();
                        }
                        $scope.$emit("treeChooseState",$rootScope.publicTreeArray)
                    }
                    /*取消所有上级的选中状态*/
                    $scope.cancelAllFather = function(a,b){
                            if(a.file){
                                if(a.file.id == b.file.id){
                                    return;
                                }else{
                                    $scope.findDearFather(a,b);
                                    $scope.cancelAllFather(a,$scope.CurrentNode);
                                }
                            }else{
                                $scope.findDearFather(a,b);
                                $scope.cancelAllFather(a,$scope.CurrentNode);
                            }


                    }
                    /*在树里面找到该节点的直接上级*/
                    $scope.findDearFather = function(fatherNode,target){
                        /*第一种 直接查出*/
                        if(fatherNode.file.id == target.file.id){
                            return fatherNode;
                        }
                        var findIndex = false;
                        if(fatherNode.hasOwnProperty("children")){
                            for(var i=0;i<fatherNode.children.length;i++){
                                if(fatherNode.children[i].file.id == target.file.id){
                                    findIndex = true;
                                    fatherNode.file.checked = false;
                                    $scope.CurrentNode = fatherNode;
                                    return;
                                }
                            }
                            if(findIndex == false){
                                for(var i=0;i<fatherNode.children.length;i++){
                                    $scope.findDearFather(fatherNode.children[i],target);
                                }
                            }else{
                                return fatherNode;
                            }

                        }
                    }



                    $scope.getAllCheckedData = function(){
                        $scope.runAllCheckData($rootScope.dataCache.treedata);
                    }

                    $scope.runAllCheckData = function(node){


                            if(node.file.hasOwnProperty("checked")){
                                /*第一种 直接查出*/
                                if(node.file.checked == true && node.file.folder == "true" && node.file.name != "public" && node.file.title != "home" && node.file.title != "回收站" ){
                                    $rootScope.publicTreeArray.push(node);
                                }else{
                                    if(node.hasOwnProperty("children")){
                                        for(var i=0;i<node.children.length;i++){
                                            $scope.runAllCheckData(node.children[i]);
                                        }
                                    }
                                }
                            }else{
                                if(node.hasOwnProperty("children")){
                                    for(var i=0;i<node.children.length;i++){
                                        $scope.runAllCheckData(node.children[i]);
                                    }
                                }
                            }

                    }
                    $scope.givePowerToAll = function(node){
                        if(node.children){
                            for(var i=0;i<node.children.length;i++){
                                if(node.children[i].hasOwnProperty("children")){
                                    node.children[i].file.checked = true;
                                    $scope.givePowerToAll(node.children[i]);
                                }else{
                                    node.children[i].file.checked = true;
                                }
                            }
                        }
                    }
                    $scope.cancelPowerToAll = function(node){
                        if(node.children){
                            for(var i=0;i<node.children.length;i++){
                                if(node.children[i].hasOwnProperty("children")){
                                    node.children[i].file.checked = false;
                                    $scope.cancelPowerToAll(node.children[i]);
                                }else{
                                    node.children[i].file.checked = false;
                                }
                            }
                        }
                    }

                    /*控制批量删除目录checkbox显示与隐藏*/
                    $scope.ifMultiFolder = false;

                    /*接受取消删除信号*/
                    $scope.$on("cancelMultiFolder",function(){
                        $scope.cancelMultiFolder();
                        document.querySelector("#outerShelter").style.display = "none";
                    })
                    /*接受批量删除信号*/
                    $scope.$on("accepetMultiFolder",function(){
                        $scope.showMultiFolder();
                        document.querySelector("#outerShelter").style.display = "none";
                    })

                    // $scope.damn = function(){
                    //     alert("suck");
                    // }

                    $scope.knowifMultiFolder = function(node){
                        if($scope.ifMultiFolder&&node.file.name!="trash"){
                            return true;
                        }else{
                            return false;
                        }
                    }

                    /*显示批量删除*/
                    $scope.showMultiFolder = function(){
                        $scope.ifMultiFolder = true;
                    }
                    /*隐藏批量删除*/
                    $scope.cancelMultiFolder = function(){
                        $scope.ifMultiFolder = false;
                    }

                    var templateOptions = {
                        orderBy: $scope.orderBy ? " | orderBy:orderByFunc():isReverse()" : '',
                        ulClass: classIfDefined($scope.options.injectClasses.ul, true),
                        nodeChildren:  $scope.options.nodeChildren,
                        liClass: classIfDefined($scope.options.injectClasses.li, true),
                        iLeafClass: classIfDefined($scope.options.injectClasses.iLeaf, false),
                        labelClass: classIfDefined($scope.options.injectClasses.label, false)
                    };

                    var template;
                    var templateUrl = $scope.options.templateUrl || treeConfig.templateUrl;

                    if(templateUrl) {
                        template = $templateCache.get(templateUrl);
                    }
                    if(!template) {
                        /*todo1
                        * filter:filterExpression:filterComparator
                        * */
                        template =
                            '<ul>'+
                            '<li ng-repeat="node in node.{{options.nodeChildren}} | filter:filterExpression:filterComparator {{options.orderBy}}" class="file-name-li" ng-class="headClass(node)"' +
                            'set-node-to-data>'+
                            '<div class="file-name" ng-value="node.file.path">'+
                            '<div class="tree-set-container" ng-click="selectNodeHead($event,node,1)" ng-value="node.file.path">' +
                            '<input class="fileTreeCheckbox" type="checkbox" ng-show = "knowifMultiFolder(node);" ng-click = "oneSingleFileClick($event,node);" ng-checked = "node.file.checked" ng-model = "node.file.checked">'+
                            '<i class="tree-leaf-head"></i>' +
                            '<i class="tree-branch-head"></i>' +
                            '<div class="tree-label" ng-class="[selectedClass(), unselectableClass()]"  tree-transclude></div>' +
                            '</div>' +
                            '<i class="display tree-set-icon" ng-click="openOperateMenu(node,$event,$parent)"></i>' +
                            '</div>' +
                            '<treeitem ng-if="nodeExpanded()"></treeitem>'+
                            '</li>' +
                            '</ul>';

                    }
                    this.template = $compile($interpolate(template)({options: templateOptions}));
                }],
                compile: function(element, attrs, childTranscludeFn) {
                    return function ( scope, element, attrs, treemodelCntr ) {
                        scope.$watch("treeModel", function updateNodeOnRootScope(newValue) {
                            if (angular.isArray(newValue)) {

                                if (angular.isDefined(scope.node) && angular.equals(scope.node[scope.options.nodeChildren], newValue))
                                    return;
                                scope.node = {};
                                scope.synteticRoot = scope.node;

                                scope.node[scope.options.nodeChildren] = newValue;
                                // scope.node[scope.options.nodeChildren] = [];
                            }
                            else {

                                if (angular.equals(scope.node, newValue))
                                    return;
                                scope.node = newValue;
                                // scope.node = [];
                            }
                        });

                        scope.$watchCollection('expandedNodes', function(newValue, oldValue) {
                            var notFoundIds = 0;
                            var newExpandedNodesMap = {};
                            var $liElements = element.find('li');
                            var existingScopes = [];
                            angular.forEach($liElements, function(liElement) {
                                var $liElement = angular.element(liElement);
                                var liScope = {
                                    $id: $liElement.data('scope-id'),
                                    node: $liElement.data('node')
                                };
                                existingScopes.push(liScope);
                            });
                            angular.forEach(newValue, function(newExNode) {
                                var found = false;
                                for (var i=0; (i < existingScopes.length) && !found; i++) {
                                    var existingScope = existingScopes[i];
                                    if (scope.options.equality(newExNode, existingScope.node)) {
                                        newExpandedNodesMap[existingScope.$id] = existingScope.node;
                                        found = true;
                                    }
                                }
                                if (!found)
                                    newExpandedNodesMap[notFoundIds++] = newExNode;
                            });
                            scope.expandedNodesMap = newExpandedNodesMap;
                        });

                        treemodelCntr.template( scope, function(clone) {
                            element.html('').append( clone );
                        });
                        scope.$treeTransclude = childTranscludeFn;
                    };
                }
            };
        }])
        .directive("setNodeToData", ['$parse', function($parse) {
            return {
                restrict: 'A',
                link: function($scope, $element, $attrs) {               
                    if($scope.node.file&&$scope.node.file.folder=="false"){
                        angular.element($element).remove();
                    }else{
                        $element.data('node', $scope.node);
                        $element.data('scope-id', $scope.$id);
                    }                                        
                }
            };
        }])
        .directive("treeitem", function() {
            return {
                restrict: 'E',
                require: "?^treecontrol",
                
                link: function( scope, element, attrs, treemodelCntr) {
                    if(!treemodelCntr) return false;
                    scope.$watch('node',function(){
                        treemodelCntr.template(scope, function(clone) {
                            element.html('').append(clone);
                        });
                    },true);
                    treemodelCntr.template(scope, function(clone) {
                        element.html('').append(clone);
                    });
                }
            };
        })
        .directive("treeTransclude", function() {
            return {
                link: function(scope, element, attrs, controller) {
                    if (!scope.options.isLeaf(scope.node)) {
                        angular.forEach(scope.expandedNodesMap, function (node, id) {
                            if (scope.options.equality(node, scope.node)) {
                                scope.expandedNodesMap[scope.$id] = scope.node;
                                scope.expandedNodesMap[id] = undefined;
                            }
                        });
                    }
                    if (!scope.options.multiSelection && scope.options.equality(scope.node, scope.selectedNode)) {
                        scope.selectedNode = scope.node;
                    } else if (scope.options.multiSelection){
                        var newSelectedNodes = [];
                        for (var i = 0; (i < scope.selectedNodes.length); i++) {
                            if (scope.options.equality(scope.node, scope.selectedNodes[i])) {
                                newSelectedNodes.push(scope.node);
                            }
                        }
                        scope.selectedNodes = newSelectedNodes;
                    }

                    // create a scope for the transclusion, whos parent is the parent of the tree control
                    scope.transcludeScope = scope.parentScopeOfTree.$new();
                    scope.transcludeScope.node = scope.node;
                    scope.transcludeScope.$parentNode = (scope.$parent.node === scope.synteticRoot)?null:scope.$parent.node;
                    scope.transcludeScope.$index = scope.$index;
                    scope.transcludeScope.$first = scope.$first;
                    scope.transcludeScope.$middle = scope.$middle;
                    scope.transcludeScope.$last = scope.$last;
                    scope.transcludeScope.$odd = scope.$odd;
                    scope.transcludeScope.$even = scope.$even;
                    scope.$on('$destroy', function() {
                        scope.transcludeScope.$destroy();
                    });

                    scope.$treeTransclude(scope.transcludeScope, function(clone) {
                        element.empty();
                        element.append(clone);
                    });
                }
            };
        })
        .factory("treeFactory",function(){
            let treeService = {};
            treeService.operateMenu = function(node,$event){
                let operateMenu = document.querySelector(".operate-menu");
                operateMenu.style.display = "block";
                operateMenu.style.left = $event.clientX-20+"px";
                operateMenu.style.top = $event.clientY+18+"px";
                var operateParam = {
                    home:["新建文件夹","上传","下载","属性"],
                    public:["新建文件夹","上传","下载","属性"],
                    favorites:["清空收藏夹"],
                    trash:["清空回收站"]
                };
                operateParam[node.file.name] ? operateParam[node.file.name]:["新建文件夹","重命名","上传","下载","属性"];
                
                let operateMenuParam = operateParam[node.file.name];
            }
            return treeService;
        })
}
