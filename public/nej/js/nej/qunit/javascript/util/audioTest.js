var f = function(){
    //定义测试模块
    module("audio");
    
    var _  = NEJ.P,
        _e = _('nej.e'),
        _v = _('nej.v'),
        _p = _('nej.ut');
    
    test('audio',function(){
		var _mda = _p._$$MediaAudio._$allocate({
			preload:false,
			url:'http://127.0.0.1:8000/nej-baseline/res/test.mp3',
			onstatechange:function(_event){
			}
		});
		_mda = _p._$$MediaAudio._$recycle(_mda);
		_mda = _p._$$MediaAudio._$allocate({
            preload:false,
            url:'http://127.0.0.1:8000/nej-baseline/res/test.mp3',
            onstatechange:function(_event){
            }
        });
		_mda = _p._$$MediaAudio._$recycle(_mda);
        _mda = _p._$$MediaAudio._$allocate({
            preload:false,
            url:'http://127.0.0.1:8000/nej-baseline/res/test.mp3',
            onstatechange:function(_event){
            }
        });
		_mda._$play();
    });
}
module('依赖模块');
test('define',function(){
    define('{pro}audioTest.js',
    ['{lib}util/media/audio.js','{pro}log.js'],f);
});
  