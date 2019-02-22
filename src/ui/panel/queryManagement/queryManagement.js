import angular from "angular";
import $ from "jquery";
import "./queryManagement.css";
import { tips } from "../../popup/dataSource/component/createModule/public";
import CodeMirror from '../../../lib/js/codemirror.js';
import "../../style/codemirror.css";

{
  angular.module("xdt/queryManagement", []).directive("queryManagement", () => {
    return {
      restrict: "E",
      template: require("./queryManagement.html"),
      // scope:{
      //   propdata:'<',
      // },
      controller: [
        "$scope",
        "$state",
        "panelFactory",
        "$http",
        "$rootScope",
        "pageService",
        "taskplanProvider",
        "tabHandleFactory",
        (
          $scope,
          $state,
          panelFactory,
          $http,
          $rootScope,
          pageService,
          taskplanProvider,
          tabHandleFactory
        ) => {
          $('.popup').hide();
          var codeMirror = null;
          init();
          
          //点击添加创建新的查询
          //get 获取数据查询列表，获取指定文件夹下，文件名
          //get 点击某个查询，获取文件，解析xml文件，读取关键字，填入
          //get 获取数据连接列表
          //增加参数，填入sql中
          //保存或预览，
            //检验内容
            //生成URL
            //新建/编辑一个xdq文件
        

          $scope.addQuery =()=>{
            let newfile = {
              file: {
                name : 'new',
                id : ''
              }
            };
            $scope.queryList.push(newfile)
          }

          $scope.deleteQuery =(id, key)=>{
            if(id === ""){
              //删除新建的Query
              $scope.queryList.splice(key,1);
            }else{
              //删除已有的Query
              $.ajax({
                type: 'put',
                contentType: 'application/json; charset=utf-8',
                url: 'api/repo/files/deletepermanent',
                dataType: 'json',
                data: id,
                success: getList()
              });
            }
          }

          $scope.getQuery = (id, name)=>{
            if(id=== ""){
              //新建的query
              getConnection();
              //新建一个条目
              $scope.currentQuery = {
                queryName : '',
                dataConnection : '',
                cache : "false",
                paramList : [],
                sql : '',
                api : '',
              };
              codeMirror.setValue($scope.currentQuery.sql);
            }else{
              //已有的query
              getConnection();
              getQuery(name);
            }
          }

          $scope.addParam =()=>{
            let newParam = {
              '@attributes':{
                name:'',
                default:'',
                type:''
              }
            };
            $scope.currentQuery.paramList.push(newParam);
          }

          $scope.deleteParam = (key)=>{
            delete $scope.currentQuery.paramList.splice(key,1);
          }

          $scope.insertParam =(param)=>{
            let str;
            str = "${" + param.name + "}";
            //插入内容
            codeMirror.replaceSelection(str);
            //获取焦点
            codeMirror.focus();
          }


          $scope.save = ()=>{
            //拼接Data
            let dataCon = getDataCon();

            //验证，校验
  
            $.ajax({
              type: 'put',
              contentType: 'application/json; charset=utf-8',
              url: 'api/repo/files/public/dataaccess/xdq'+new Date().getTime()+'.xdq',
              dataType: 'json',
              data : dataCon,//'<?xml version="1.0" encoding="UTF-8"?><CDADescriptor><DataSources><Connection id="query1" type="sql.jndi"><Jndi>conntomart</Jndi></Connection></DataSources><DataAccess access="public" connection="query1" id="query1" type="sql"><Cache duration="3600" enabled="true"/><Columns/><Parameters><Parameter default="" name="year" type="String"/><Parameter default="" name="month" type="String"/></Parameters><Query>select * from fact_sales where sale_id=${year}limit 10 </Query></DataAccess></CDADescriptor>',
              success: getList()
            });
          }

          //初始化页面
          function init(){
            //初始化编辑器
            codeMirror = CodeMirror.fromTextArea(document.getElementById('sqlTextArea'), { //script_once_code为你的textarea的ID号
              lineNumbers: true,//是否显示行号
              mode:"shell",　//默认脚本编码
              lineWrapping:true, //是否强制换行,
            });
            //获取数据查询列表
            getList();

          }
          
          //获取查询列表
          function getList(){
            $http({
              method: 'get',
              headers: {Accept: "application/json"},
              url: "api/repo/files/tree?showHidden=&filter=*.xdq|*.txt|FILES&_="+new Date().getTime(),
              dataType: ''
            }).success((data)=> {
              $scope.queryList = data.children[0].children[0].children
            }).error((data)=> {
            });
          }

          //String to XML 
          function stringToXml(source){ 
            var xmlDoc = null; 
            if (window.ActiveXObject) { 
            var ARR_ACTIVEX = 
            ["MSXML4.DOMDocument","MSXML3.DOMDocument","MSXML2.DOMDocument","MSXML.DOMDocument","Microsoft.XmlDom"]; 
            var XmlDomflag = false; 
            for (var i = 0;i < ARR_ACTIVEX.length && !XmlDomflag ;i++) { 
            try { 
            var objXML = new ActiveXObject(ARR_ACTIVEX[i]); 
            xmlDoc = objXML; 
            XmlDomflag = true; 
            } catch (e) { 
            } 
            } 
            if (xmlDoc) { 
            xmlDoc.async = false; 
            xmlDoc.loadXML(source); 
            } 
            }else{ 
            var parser=new DOMParser(); 
            var xmlDoc=parser.parseFromString(source,"text/xml"); 
            } 
            return xmlDoc; 
          } 

          //XML to JSON
          function xmlToJson(xml) {
            // Create the return object
            var obj = {};
            if (xml.nodeType == 1) { // element
                // do attributes
                if (xml.attributes.length > 0) {
                obj["@attributes"] = {};
                    for (var j = 0; j < xml.attributes.length; j++) {
                        var attribute = xml.attributes.item(j);
                        obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
                    }
                }
            } else if (xml.nodeType == 3) { // text
                obj = xml.nodeValue;
            }

            // do children
            if (xml.hasChildNodes()) {
                for(var i = 0; i < xml.childNodes.length; i++) {
                    var item = xml.childNodes.item(i);
                    var nodeName = item.nodeName;
                    if (typeof(obj[nodeName]) == "undefined") {
                        obj[nodeName] = xmlToJson(item);
                    } else {
                        if (typeof(obj[nodeName].length) == "undefined") {
                            var old = obj[nodeName];
                            obj[nodeName] = [];
                            obj[nodeName].push(old);
                        }
                        obj[nodeName].push(xmlToJson(item));
                    }
                }
            }
            return obj;
          }; 

          //获取数据库连接
          function getConnection(){
            $.ajax({
              type: 'get',
              contentType: 'application/json; charset=utf-8',
              url: 'plugin/xdf/api/connection/list',
              dataType: 'json',
              success: (data)=>{
                $scope.connectionList = data.databaseConnections;
              }
            });
          }

          //获取指定查询
          function getQuery(name){
            $.ajax({
              type: 'get',
              contentType: 'application/json; charset=utf-8',
              url: 'api/repos/:public:dataaccess:'+name+'/content',
              dataType: '',
              success: (data)=>{
                var xmlObj = stringToXml(data);
                var jsonObj = xmlToJson(xmlObj);

                $scope.currentQuery = {
                  queryName : jsonObj.CDADescriptor.DataAccess['@attributes'].id,
                  dataConnection : jsonObj.CDADescriptor.DataAccess['@attributes'].connection,
                  cache : jsonObj.CDADescriptor.DataAccess.Cache['@attributes'].enabled,
                  paramList : jsonObj.CDADescriptor.DataAccess.Parameters.Parameter,//list
                  sql : jsonObj.CDADescriptor.DataAccess.Query['#text'],
                  api : '',
                }

                if($scope.currentQuery.cache === "true"){
                  if(!$("#onoffswitch").is(':checked')){
                    $("#onoffswitch").click();
                  }
                }

                codeMirror.setValue($scope.currentQuery.sql);
              }
            });
          }

          function getDataCon(){
            let paramList = "";
            for(let item of $scope.currentQuery.paramList){
              paramList += "<Parameter default='"+item['@attributes'].default+"' name='"+item['@attributes'].name+"' type='"+item['@attributes'].type+"'/>";
            }
            let content = "<?xml version='1.0' encoding='UTF-8'?>"+
              "<CDADescriptor>"+
                "<DataSources>"+
                  "<Connection id='query1' type='sql.jndi'>"+
                    "<Jndi>conntomart</Jndi>"+
                  "</Connection>"+
                "</DataSources>"+
                "<DataAccess access='public' connection='"+$scope.currentQuery.dataConnection+"' id='"+$scope.currentQuery.queryName+"' type='sql'>"+
                  "<Cache duration='3600' enabled='"+$scope.currentQuery.cache+"'/>"+
                  "<Columns/>"+
                  "<Parameters>"+paramList+"</Parameters>"+
                  "<Query>"+$scope.currentQuery.sql+"</Query>"+
                "</DataAccess>"+
              "</CDADescriptor>";
            return content;
          }
        }
      ]
    };
  });
}
