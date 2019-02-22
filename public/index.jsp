<!DOCTYPE html>
<html>
<%@ page contentType="text/html;charset=utf-8"%>
<head lang="zh">
    <!--<base href="/">-->
    <base href="/xdatainsight/discover">
    <!--testing-->
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta http-equiv="cache-control" content="max-age=0" />
    <meta http-equiv="cache-control" content="no-cache,must-revalidate" />
    <meta http-equiv="expires" content="0" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>xDataInsight</title>
</head>
<body ng-app="xdt">
    <div id="myshelter"></div>
    <div id='xdt-global-loading' class="xdt-global-loading__wrap" style="display: block;">
        <div class='xdt-global-loading'>
            <div class='xdt-global-loading__square'></div>
            <div class='xdt-global-loading__square'></div>
            <div class='xdt-global-loading__square'></div>
            <div class='xdt-global-loading__square'></div>
            <div class='xdt-global-loading__square'></div>
            <div class='xdt-global-loading__square'></div>
            <div class='xdt-global-loading__square'></div>
        </div>
    </div>
    <!--welcome page-->
    <xdt-home ng-controller="pageController"></xdt-home>
</body>
</html>