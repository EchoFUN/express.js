var f = function(){
    //定义测试模块
    module("ui-mask");
    
    var _  = NEJ.P,
        _e = _('nej.e'),
        _p = _('nej.ui');
        
    //开始单元测试
    test('mask',function(){
        var _mask = _p._$$Mask._$allocate({
            parent:document.body,
            content:'<div style="width:100px;height:100px;margin:0 auto;margin-top:150px;">搞一点盖层的内容</div>'
        });
		_mask._$hide();
		_mask._$show();
    });
}
module('依赖模块');
test('define',function(){
    define('{pro}maskTest.js',['{lib}ui/mask/mask.js','{pro}log.js'],f);
});