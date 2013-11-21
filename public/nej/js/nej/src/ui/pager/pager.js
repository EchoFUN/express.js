/*
 * ------------------------------------------
 * 分页器控件封装实现文件
 * @version  1.0
 * @author   genify(caijf@corp.netease.com)
 * ------------------------------------------
 */
var f = function(){
    // variable declaration
    var _  = NEJ.P,
        _o = NEJ.O,
        _r = NEJ.R,
        _e = _('nej.e'),
        _u = _('nej.u'),
        _t = _('nej.ut'),
        _p = _('nej.ui'),
        _proPager;
    if (!!_p._$$Pager) return;
    // ui css text
    var _seed_css = _e._$pushCSSText('\
        .#<uispace>{font-size:12px;line-height:160%;}\
        .#<uispace> a{margin:0 2px;padding:2px 8px;color:#333;border:1px solid #aaa;text-decoration:none;}\
        .#<uispace> .js-disabled{cursor:default;}\
        .#<uispace> .js-selected{background:#bbb;}');
    var _seed_page = _e._$addHtmlTemplate('\
        {trim}\
        {if !defined("noprv")||!noprv}\
        <a href="#" class="zbtn zprv ${\'js-p-\'|seed}">上一页</a>\
        {/if}\
        {list 1..number as x}\
        <a href="#" class="zpgi zpg${x} ${\'js-i-\'|seed}"></a>\
        {/list}\
        {if !defined("nonxt")||!nonxt}\
        <a href="#" class="zbtn znxt ${\'js-n-\'|seed}">下一页</a>\
        {/if}\
        {/trim}');
    // ui html code
    var _seed_html;
    /**
     * 分页器控件封装<br />
     * 页面结构举例
     * [code type="html"]
     *   <div id="pagerCnt">page</div>
     *   <div id="pagerCnt2">page</div>
     * [/code]
     * 脚本举例
     * [code]
     *   var p = NEJ.P('nej.ui'),
     *       v = NEJ.P('nej.v'),
     *       t = NEJ.P('nej.ut'),
     *       e = NEJ.P('nej.e');
     *   // 默认第一页
     *   var _setIndex = 1;
     *   // 页面更改的回调方法
     *   var _onchangeHandle = function(_obj){
     *       var _index = _obj.index;
     *   };
     *   // 实例化一个pager对象，总共10页
     *   var _pager = p._$$Pager._$allocate({
     *       parent:'pagerCnt',
     *       onchange: _onchangeHandle,
     *       total: 10,
     *       index:_setIndex
     *   });
     *   // 从第2页翻到第10页
     *   for(var i = 2 ; i < 11 ; i++){
     *       _setIndex = i;
     *       _pager._$setIndex(_setIndex);
     *   }
     *   // 绑定一个翻页器,视觉上翻页器会联动，但最后触发一次翻页器的回调,避免重复触发
     *   _pager._$bind('pagerCnt2');
     * [/code]
     * @class   {nej.ui._$$Pager} 分页器控件封装
     * @uses    {nej.ut._$$Page}
     * @extends {nej.ui._$$Abstract}
     * @param   {Object} 可选配置参数，已处理参数列表如下
     * @config  {Number} index 当前页码
     * @config  {Number} total 总页码数
     * 
     * [hr]
     * 
     * @event  {onchange} 页码切换事件，输入{last:3,index:1,total:12}
     * @param  {Object} 页码状态对象
     * @config {Number} last  上一次的页码
     * @config {Number} index 当前要切换的页面
     * @config {Number} total  总页面数
     * 
     */
    _p._$$Pager = NEJ.C();
    _proPager = _p._$$Pager._$extend(_p._$$AbstractPager);
    /**
     * 控件重置
     * @protected
     * @method {__reset}
     * @param  {Object} 可选配置参数
     * @return {Void}
     */
    _proPager.__reset = function(_options){
        this.__supReset(_options);
        this.__page = _t._$$Page._$allocate(this.__popt);
    };
    /**
     * 初始化外观信息
     * @protected
     * @method {__initXGui}
     * @return {Void}
     */
    _proPager.__initXGui = function(){
        this.__seed_css  = _seed_css;
        this.__seed_html = _seed_html;
    };
    /**
     * 初始化节点
     * @protected
     * @method {__initNode}
     * @return {Void}
     */
    _proPager.__initNode = function(){
        this.__supInitNode();
        var _seed = _e._$getHtmlTemplateSeed();
        this.__popt.list =  _e._$getByClassName
                           (this.__body,'js-i-'+_seed);
        this.__popt.pbtn = (_e._$getByClassName
                           (this.__body,'js-p-'+_seed)||_r)[0];
        this.__popt.nbtn = (_e._$getByClassName
                           (this.__body,'js-n-'+_seed)||_r)[0];
    };
    /**
     * 动态构建控件节点模板
     * @protected
     * @method {__initNodeTemplate}
     * @return {Void}
     */
    _proPager.__initNodeTemplate = function(){
        _seed_html = _e._$addNodeTemplate(
                     '<div class="'+this.__seed_css+'">'
                     +this.__doGenPageListXhtml({number:9})+
                     '</div>');
        this.__seed_html = _seed_html;
    };
    /**
     * 生成页码列表html代码
     * @protected
     * @method {__doGenPageListXhtml}
     * @param  {Object} 页码列表信息
     * @return {String} 页码列表html代码
     */
    _proPager.__doGenPageListXhtml = function(_data){
        return _e._$getHtmlTemplate(_seed_page,_data);
    };
};
define('{lib}ui/pager/pager.js',
      ['{lib}ui/pager/pager.base.js'
      ,'{lib}util/page/page.js'],f);