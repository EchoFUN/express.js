/**
 * ------------------------------------------
 * 富文本编辑器接口实现文件
 * @version  1.0
 * @author   genify(caijf@corp.netease.com)
 * ------------------------------------------
 */
var f = function(){
    var _  = NEJ.P,
        _e = _('nej.e'),
        _h = _('nej.h');
    var __empty = /(?:<(p|div)>(?:\&nbsp\;|<br\/?>)<\/\1>|<br\/?>|\&nbsp\;|\s)+$/gi, // empty content
        __rnwln = /(?:\r\n)|\n|\r/gi,  // new line for getContent
        __rclass = /\s/gi,
        __reg_ccl = /(?:class|lang)="(mso)?[^"]*"/gi,//clear class and lang
        __reg_ccls = /(?:class|lang|style)="(mso)?[^"]*"/gi;//clear class,lang,style
        
        
    /**
     * 取节点所在的窗体对象
     * @param  {Node} _node 节点
     * @return {Window}     窗体
     */
    _h.__getWindow = function(_node){
        var _document = _h.__getDocument(_node);
        return _document.defaultView||_document.parentWindow||_document.window||_document;
    };
    /**
     * 取节点关联的文档对象
     * @param  {Node} _node 节点
     * @return {Document}   文档对象
     */
    _h.__getDocument = function(_node){
        return _node.ownerDocument||_node;
    };
    /**
     * 取选择区对象
     * @param  {Window} _window 窗体对象
     * @return {DOMSelection}   选择区对象
     */
    _h.__getSelection = function(_window){
        if (!!_window.getSelection)
            return _window.getSelection();
        var _document = _window.document;
        if (!!_document.getSelection)
            return _document.getSelection();
        if (!!_document.selection)
            return _document.selection;
        return null;
    };
    /**
     * 取选择区范围操作对象
     * @param  {Window} _window 窗体对象
     * @return {Range}          范围操作对象
     */
    _h.__getRange = function(_window){
        _window = _h.__getWindow(_window);
        var _selection = _h.__getSelection(_window);
        if (!_selection) 
            return null;
        if (!!_selection.getRangeAt)
            return _selection.getRangeAt(0);
        if (!!_selection.createRange)
            return _selection.createRange();
        return null;
    };
    /**
     * 获取选中内容的文本
     * @return {String} 文本内容
     */
    _h.__getSelectText = function(_document){
        var _range = this.__getRange(_document);
        if (!_range) return '';
        return !!document.selection?_range.text:_range.toString();
    };
    /**
     * 获取选中内容的html,并删除原来内容
     * @param {Object} _document
     */
    _h.__getSelectHtml = function(_document){
        var _range = this.__getRange(_document);
        if (!_range) return '';
        if (!!document.selection){
            var _html = _range.htmlText;
            _document.execCommand('delete',!1,null);            
            return _html||'';
        }    
        var _ntmp = _e._$create('div');
        _ntmp.appendChild(_range.cloneContents());
        _range.deleteContents();
        return _ntmp.innerHTML;
    };
    /**
     * 保存当前选择状态
     * @param  {Node} _node 节点
     * @return {Range}      范围
     */
    _h.__saveRange = function(_node){
        // do nothing
    };
    /**
     * 聚焦至选中区域
     * @param  {Node} _node 节点
     * @return {Void}
     */
    _h.__focusRange = function(_node){
        _node.focus();
    };
    /**
     * 清除选择状态
     * @param  {Node} _node 节点
     * @return {Void}
     */
    _h.__clearRange = function(_node){
        // do nothing
    };
    /**
     * 移动光标至节点的指定位置
     * @param  {Node}   _node     节点
     * @param  {Number} _position 位置，0-末尾、1-起始
     * @return {Void}
     */
    _h.__moveCursorPosition = (function(){
        var _fmap = [function(_node){return _node.childNodes.length;}
                    ,function(){return 0;}];
        return function(_node,_position){
            var _func = _fmap[_position];
            if (!_func) return;
            _h.__getSelection(
            _h.__getWindow(_node))
              .collapse(_node,_func(_node));
        };
    })();
    /**
     * 执行编辑命令
     * @param  {Node}   _document 文档对象
     * @param  {String} _command  命令名称
     * @param  {String} _value    命令值
     * @return {Void}
     */
    _h.__execCommand = function(_document,_command,_value){
        if(_command == 'inserthtml'){
            this.__insertHtml(_document,_value);
            return;
        }
        _document.execCommand(_command,!1,_value);
    };
    
    /**
     * 插入html命令处理
     * @param {Object} _document 文档对象
     * @param {Object} _html
     */
    _h.__insertHtml = function(_document,_html){
        if (!document.selection){
            _document.execCommand('inserthtml',!1,_html);
            return;
        }
        var _range = _document.selection.createRange();
        if (!!_range.pasteHTML){_range.pasteHTML(_html);return;}
        _document.execCommand('delete',!1,null);
        _document.selection.createRange().pasteHTML(_html);
    };
    
    /**
     * 内容初步过滤
     * @param {Object} _html
     */
    _h.__filterContent = function(_html){
        var _html = (_html||'').replace(__rnwln,'<br/>').replace(__empty,'');
        _html = _html.replace(__reg_ccl,'');
        _html = !_h.__filterContentPath?_html:_h.__filterContentPath(_html);
        return _html;
    };
    
};
define('{lib}patched/editor.js',
      ['{lib}base/platform.js','{lib}base/element.js'],f);