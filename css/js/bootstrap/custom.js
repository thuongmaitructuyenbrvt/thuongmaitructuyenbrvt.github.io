$(document).ready(function(){'use strict';if($(".featured-slider").length){$(".featured-slider").owlCarousel({autoPlay:3000,items:2,pagination:false,itemsMobile:[768,1],itemsDesktop:[1199,2],itemsDesktopSmall:[979,1]});}
if($(".full-news-slider").length){$(".full-news-slider").owlCarousel({navigation:true,slideSpeed:300,paginationSpeed:400,pagination:false,singleItem:true});}
if($(".side-featured-slider").length){$(".side-featured-slider").owlCarousel({navigation:true,pagination:false,slideSpeed:300,paginationSpeed:400,singleItem:true});}
if($(".cp-megamenu").length){var stickyNavTop=$('.cp-megamenu').offset().top;var stickyNav=function(){var scrollTop=$(window).scrollTop();if(scrollTop>stickyNavTop){$('.cp-megamenu').addClass('sticky');}else{$('.cp-megamenu').removeClass('sticky');}};stickyNav();$(window).scroll(function(){stickyNav();});}
if($(".gallery").length){$("area[data-rel^='prettyPhoto']").prettyPhoto();$(".gallery:first a[data-rel^='prettyPhoto']").prettyPhoto({animation_speed:'normal',theme:'facebook',slideshow:3000,autoplay_slideshow:false});$(".gallery:gt(0) a[data-rel^='prettyPhoto']").prettyPhoto({animation_speed:'fast',slideshow:10000,hideflash:true});}
if($("form.material").length){$('form.material').materialForm();}
if($("#cp-list-news-slider").length){$("#cp-list-news-slider").owlCarousel({navigation:true,slideSpeed:300,paginationSpeed:400,singleItem:true,pagination:false,});}
if($("#cp-cat-slider").length){$("#cp-cat-slider").owlCarousel({navigation:true,slideSpeed:300,paginationSpeed:400,singleItem:true,pagination:false,});}
var sync1=$("#sync1");var sync2=$("#sync2");sync1.owlCarousel({singleItem:true,slideSpeed:1000,navigation:true,pagination:false,afterAction:syncPosition,responsiveRefreshRate:200,});sync2.owlCarousel({items:3,itemsDesktop:[1199,10],itemsDesktopSmall:[979,10],itemsTablet:[768,8],itemsMobile:[479,4],pagination:false,responsiveRefreshRate:100,afterInit:function(el){el.find(".owl-item").eq(0).addClass("synced");}});function syncPosition(el){var current=this.currentItem;$("#sync2").find(".owl-item").removeClass("synced").eq(current).addClass("synced")
if($("#sync2").data("owlCarousel")!==undefined){center(current)}}
$("#sync2").on("click",".owl-item",function(e){e.preventDefault();var number=$(this).data("owlItem");sync1.trigger("owl.goTo",number);});function center(number){var sync2visible=sync2.data("owlCarousel").owl.visibleItems;var num=number;var found=false;for(var i in sync2visible){if(num===sync2visible[i]){var found=true;}}
if(found===false){if(num>sync2visible[sync2visible.length-1]){sync2.trigger("owl.goTo",num-sync2visible.length+2)}else{if(num-1===-1){num=0;}
sync2.trigger("owl.goTo",num);}}else if(num===sync2visible[sync2visible.length-1]){sync2.trigger("owl.goTo",sync2visible[1])}else if(num===sync2visible[0]){sync2.trigger("owl.goTo",num-1)}}
var w=new Waves();w.displayEffect();});