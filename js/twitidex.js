﻿function processUrl(a){var b=a.hash.slice(1);if(b.indexOf("search=")>=0){var c=b.split("=");$("#searchTextBox").val(c[1]);search()}}function showProgressIndicator(){kendo.ui.progress($("html"),true)}function hideProgressIndicator(){kendo.ui.progress($("html"),false)}function initialiseTweetList(){localTweetsDataSource=new kendo.data.DataSource([]);$("#twitterList").kendoListView({dataSource:localTweetsDataSource,template:$("#tweetTemplate").html(),dataBound:function(){if(twttr.widgets!=null){twttr.widgets.load()}}})}function initialiseHashtagList(){hashtagsDataSource=new kendo.data.DataSource([]);$("#hashtagsList").kendoListView({dataSource:hashtagsDataSource,template:$("#hashtagsTemplate").html()})}function initialiseUsersList(){usersDataSource=new kendo.data.DataSource([]);$("#usersList").kendoListView({dataSource:usersDataSource,template:$("#usersTemplate").html()})}function initialiseUrlsList(){urlsDataSource=new kendo.data.DataSource([]);$("#urlsList").kendoListView({dataSource:urlsDataSource,template:$("#urlsTemplate").html()})}function searchAction(){window.location="#search="+$("#searchTextBox").val()}function search(){$("#noResults").text("");var a=$("#searchTextBox").val();if(a!=""){var b={q:a,rpp:10,include_entities:true,result_type:"mixed"};ajaxGet("http://search.twitter.com/search.json",b,function(b){if(b.results.length>0){refreshData(b.results)}else{$("#noResults").html("No results for <b>"+a+"</b>.");refreshData([])}})}}function ajaxGet(a,b,c){showProgressIndicator();$.ajax(a,{type:"GET",data:b,dataType:"jsonp",contentType:"application/json",cache:false,error:function(a,b,c){hideProgressIndicator();alert("error: "+c)},success:function(a){hideProgressIndicator();c(a)}})}function refreshData(a){replaceDataSource(localTweetsDataSource,a);refreshDataSource(localTweetsDataSource,hashtagsDataSource,function(a){return a.entities.hashtags},function(a){return a.text});refreshDataSource(localTweetsDataSource,urlsDataSource,function(a){return a.entities.urls},function(a){return a.url});refreshDataSource(localTweetsDataSource,usersDataSource,function(a){return a.entities.user_mentions},function(a){return a.screen_name})}function refreshDataSource(a,b,c,d){var e=$.map(a._data,function(a){if(a.entities!=null){return $.makeArray(c(a))}else{return[]}});replaceDataSource(b,e,d)}function replaceDataSource(a,b,c){a._data.splice(0,a._data.length);$.each(b,function(b,d){if(c==null||$.inArray(c(d),$.map(a._data,c))==-1){a._data.push(d)}})}var tweetDataParameters;var localTweetsDataSource;var hashtagsDataSource;var urlsDataSource;var usersDataSource;$(window).bind("hashchange",function(){processUrl(window.location)});$(document).ready(function(){initialiseHashtagList();initialiseUsersList();initialiseUrlsList();initialiseTweetList();processUrl(window.location)})