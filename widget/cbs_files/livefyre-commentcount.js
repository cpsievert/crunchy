define(["jquery","fly/utils/string-vars-1.0","version!fly/managers/debug","version!fly/components/base","version!fly/components/livefyre-commentcount"],function(e,n,t){var m=t.init("livefyre");m.log("starting livefyre-commentcount widget");e.support.touch?"vclick":"click";e.widget("cbsnews.livefyreCommentcount",e.fly.livefyreCommentcount,{options:{format:"fullText",minimum:0,pageType:"FrontDoor"},_create:function(){var n=this;this._setup(),require(["livefyre-commentcount"],function(){LF.CommentCount({replacer:e.proxy(n.replace,n)}),m.log("calling livefyre for comment counts")})},formats:{fullText:function(e,n){e.html(n+" <span>Comment"+(1===n?"</span>":"s</span>"))},fullTextNotZero:function(e,n){parseInt(n)>0&&this.fullText(e,n)},fullTextWithoutZero:function(e,n){parseInt(n)>0?e.html(n+' <span class="comment-text">Comment'+(1===n?"</span>":"s</span>")):e.html('<span class="comment-text">Comment</span>')},metaLabel:function(e,n){e.html('<div class="meta-label comment-count"><span class="feature">'+n+'</span> <span class="sub">Comments</span></div>')},metaLabelNotZero:function(e,n){parseInt(n)>0&&this.metaLabel(e,n)},numberComments:function(e,n){e.html('<span class="sub comment-icon">'+n+'</span><span class="feature">Comments</span>')},numberCommentsNotZero:function(e,n,t){parseInt(n)>t.minimum&&this.numberComments(e,n)},numberCommentsNotZeroAlt:function(e,n,t){commentType="",channel="",pageType=location.pathname,commentsText="Comments",parseInt(n)>10&&(pageType.length>=1&&(pageType.indexOf("news")>=0?(commentType="",channel="Post-REM Block|"):pageType.indexOf("media")>=0?(commentType="",channel="Media Post-REM Block|"):pageType.indexOf("feature")>=0?(commentType="Highlights-",channel="Deep Story-Page-Center Column|"):1==pageType.length?(commentType="Enterprise Journalism|",channel="Front Door|",commentsText=""):(pageType=pageType.split("/"),commentType="Enterprise Journalism|",channel=pageType[pageType.length-2].toUpperCase()+"|",commentsText="")),e.html('<span class="sub comment-icon" data-click-tracking="genericClickCbsNews" data-omniture-track-data=\'{"clickProperty": "'+channel+commentType+"Asset|Comment Count-"+t.minimum+"\"}'>"+n+'</span><span class="feature" data-click-tracking="genericClickCbsNews" data-omniture-track-data=\'{"clickProperty": "'+channel+commentType+"Asset|Comment Count-"+t.minimum+"\"}'>"+commentsText+"</span>"))},NumberOnlyNotZero:function(e,n){parseInt(n)>0&&e.html(n)}},replace:function(n,t){var o=this.options,a=e(n),s=a.data("lf-format")||o.format;a.data("lf-minimum")&&(o.minimum=a.data("lf-minimum")),e.isFunction(this.formats[s])&&this.formats[s](a,t,o),m.log("set comment count: ",s,a)}})});