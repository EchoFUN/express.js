var f = function(){
    //定义测试模块
    module("resize");
    var p = NEJ.P('nej.ut'),
        e = NEJ.P('nej.e');
    //开始单元测试
    test('resize',function(){
		p._$$Resize._$allocate({
			body:e._$get('box'),
			clazz:['','top','right','bottom','left','lefttop','righttop','rightbottom','leftbottom'],
			onresize: function(_value){
			}
		});
    });
}
module('依赖模块');
test('define',function(){
    define('{pro}util/resizeTest.js',['{lib}util/resize/resize.js','{pro}log.js'],f);
});
  