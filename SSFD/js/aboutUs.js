$(document).ready(function(){
    $("#second").addClass('list-color');
    $("#demo2").addClass('hidden');
    $("#demo3").addClass('hidden');

    $("#second").click(function(){
        $("#second").addClass('list-color');
        $("#third").removeClass('list-color');
        $("#fourth").removeClass('list-color');
        //隐藏其他
        $("#demo2").addClass('hidden');
        $("#demo3").addClass('hidden');
        //显示①
        $("#demo1").removeClass('hidden');
    });

    $("#third").click(function(){
        $("#second").removeClass('list-color');
        $("#third").addClass('list-color');
        $("#fourth").removeClass('list-color');
        //隐藏其他
        $("#demo1").addClass('hidden');
        $("#demo3").addClass('hidden');
        //显示②
        $("#demo2").removeClass('hidden');
    });

    $("#fourth").click(function(){
        $("#second").removeClass('list-color');
        $("#third").removeClass('list-color');
        $("#fourth").addClass('list-color');
        //隐藏其他
        $("#demo1").addClass('hidden');
        $("#demo2").addClass('hidden');
        //显示③
        $("#demo3").removeClass('hidden');
    });

});

