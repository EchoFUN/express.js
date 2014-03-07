/**
 * 模型以及服务类 by wanghe
 */
(function(w,$,brush){
    var ajax = function (url,data,success,error) {
        $.ajax({
            type:'post',
            url:url,
            data:data,
            success:success,
            error:error||function () {},
            dataType:'json'
        });
    }

    w.sgService = {

    }

    w.model ={};

    /**
     * 分组-面板
     * @constructor
     */
    w.model.Group  = function (x,y,w,h) {
        /**
         * 主键
         * @type {string}
         */
        this.id = "";
        this.title = "面板";
        this.hdbg = "#3c6eba";
        this.x =x;
        this.y =y;

        this.body = brush.rect(this.x, this.y+30, w,h);

        this.hd = brush.rect(this.x, this.y,w, 30);

        this.hd.attr({
            'cursor': 'move'
        });

        this.title = brush.text(this.x+6, this.y + 20,"分组");


        $(this.title.node).on('contextmenu', groupTitleContextMenu);

        this.title.attr({
            fill: '#efefef'
        })

        this.body.attr({
            strokeWidth: 1
        });

        this.group = brush.g(this.body, this.hd,this.title);


        this.setHdBg("#3C6EBA"); //头部背景色
        this.setBg("#efefef"); //背景色
        this.setBorderColor("#3C6EBA"); //边框色

        this.group.drag();

        //this.saveOrUpdate();
    }

    w.model.Group.prototype = {
        /**
         * 更新或者新增操作
         */
        saveOrUpdate: function () {
            ajax("http://sg.sankuai.com/panel/update.ajax",this.getValues(),function () {
               $("#prompt").html("面板更新成功").fadeIn();
            });
        },
        /**
         * 获取面板的样式属性
         * @return {string}
         */
        getStyles: function () {
            return "{" +
                    "hdbg:"+this.hdbg+"," +
                    "bg:"+this.bg+"," +
                    "borderColor:"+this.boderColor+
                "}";
        },
        /**
         * 获取面板的属性值
         * @return {{}}
         */
        getValues: function () {
            return {
                id:this.id ,
                panelType:"category",
                panelStyle:this.getStyles()
            }
        },
        setBg: function (color) {
            this.bg = color;
            this.body.attr({
                fill: this.bg
            });
        },
        setBorderColor: function (color) {
            this.boderColor = color;
            this.body.attr({
                stroke: this.boderColor
            });
        },
        setHdBg: function (color) {
            this.hdbg = color;
            this.hd.attr({
                fill: this.hdbg
            });
        }
    }


})(window,jQuery,brush);
