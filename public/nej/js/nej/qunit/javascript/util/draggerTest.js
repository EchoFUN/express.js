var f = function(){
    //定义测试模块
    module("dragger");
	var _  = NEJ.P,
	    _p = _('nej.ut'),
		_e = _('nej.e');
	
    //开始单元测试
    test('dragger',function(){
        stop();
		var _box = _e._$get('box');
		var _dg = _p._$$Dragger._$allocate({body:_box,
		  overflow:false,
		  direction:0,
		  onchange:function(_event){
		  	ok(true,'设置位置');
		  },
		  ondragend:function(_event){
		  	ok(true,'当前位置top:'+_event.top+'left:'+_event.left);
		  	start();
		  }
		})
    });
    
}
module('依赖模块');
test('define',function(){
    define('{pro}draggerTest.js',['{lib}util/dragger/dragger.js','{pro}log.js'],f);
});