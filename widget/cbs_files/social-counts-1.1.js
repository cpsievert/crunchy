define(["jquery","version!fly/managers/debug","version!fly/utils/string-helper","version!fly/utils/string-vars","version!fly/utils/object-helper","version!fly/components/social-links","version!fly/libs/base64"],function(e,t,o,n,l){var s=(e.support.touch?"vclick":"click",t.init("socialCounts"));e.widget("fly.socialCounts",e.fly.socialLinks,{options:{url:null,articleId:null,facebookKey:null,showZeros:!1,countType:"human",containerClass:"social-count",containerTemplate:"<span></span>",labelClass:".social-label",loadingClass:"loading",loadedClass:"loaded",googleButtonType:"small",showTotal:!1,totalContainerSelector:".social-count-total",location:null,timeout:1e3,liveFyreHash:null,liveFyreNetworkName:null,liveFyreSiteId:null},selectorId:"counts",total:0,countTotals:0,services:{facebook:"https://api.facebook.com/restserver.php?v=1.0&method=links.getStats&format=json&urls={url}",linkedin:"http://www.linkedin.com/countserv/count/share?url={url}",delicious:"http://feeds.delicious.com/v2/json/urlinfo/data?url={url}",pinterest:"http://api.pinterest.com/v1/urls/count.json?url={url}",livefyre:"https://{liveFyreNetworkName}.bootstrap.fyre.co/api/v1.1/public/comments/ncomments/{liveFyreHash}.json"},responseKeys:{facebook:"total_count",reddit:"score",linkedin:null,delicious:"total_posts",stumbleupon:"views",pinterest:null,googleplus:null,livefyre:"livefyre"},responseObj:{facebook:function(e){return e[0]},delicious:function(e){return e[0]},reddit:function(e){return e.children.length>0?e.children[0]:null},livefyre:function(e){var t=0;if("ok"==e.status)for(var o in e.data){var n=e.data[o];for(var l in n)"livefyre"in n[l]&&(t+=n[l].livefyre)}return{livefyre:t}}},requestDataType:{facebook:"json",livefyre:"json"},requestData:{},_create:function(){var e=this.options;this._setup(),this._super("_create"),this.url=e.url||window.location.href,this.$links=this.$element.find("[data-"+this.selectorId+"]"),this._generateLiveFyreHash(),this._setupRequests()},_setupRequests:function(){if(this.$links.length<=0)return s.log("Error: No links found in element.",this.$element),!1;var t,n=this,l=this.$links.length;this.$links.each(function(i,a){var r=e(a),u=r.data(n.popupId).toLowerCase(),c=n._getService(u),d="_load"+o.capitalize(u),h=0;n._loader("add",r),c?(n.load(u,c),t="socialcountsloaded"):e.isFunction(n[d])?n[d]():(s.log("Error: No service or custom function found for "+u,n.$element),n._loader("remove",r)),n.$element.on(t,function(e,t){h=t.count||0,n.total+=h,n._setTotal(l)})})},load:function(t,o){if(t.length<=0||o.length<=0)return s.log("Error: Service url or name not defined"),!1;var n=this,i=this.responseKeys[t]||"count",a=this.requestDataType[t]||"jsonp",r=this.requestData[t]||{};s.log("Requesting: "+t+"("+o+")"),e.ajax({dataType:a,url:o,data:r,timeout:n.options.timeout}).done(function(o,s,a){o=e.isFunction(n.responseObj[t])?n.responseObj[t](o):o;var r=l.deepFind(o,i)||{};n.setContent(t,r)}).fail(function(e,l,i){s.log("Error: "+t+"("+o+") response failed",e,l),n.setContent(t,{})})},_getService:function(e){var t=this.services[e],o=this._getServiceData();return t=n.compile(t,o,["urlencode"])},_getServiceData:function(){var t=this.options;return e.extend({url:this.url,googleplusKey:t.googleplusKey,facebookKey:t.facebookKey,liveFyreHash:this.liveFyreHash,liveFyreNetworkName:t.liveFyreNetworkName},t.data)},_loadGoogleplus:function(){var e=this.options,t='<div class="g-plusone" data-size="'+e.googleButtonType+'" data-href="'+this.url+'" data-count="true" data-callback="handleGooglePlusCallback"></div>',o=this._getLinkEl("googleplus"),n=this;o.html(t),window.handleGooglePlusCallback=function(e){"on"==e.state?"plusone":"rmvplusone"},require(["https://apis.google.com/js/plusone.js"],function(){window.handleGooglePlusCallback=function(e){var t="on"==e.state?"plusone":"rmvplusone";n._trigger(null,{button:"googleplus",type:t})}.bind(this),n._setupLoadEvent({el:o,name:"googleplus"})})},_generateLiveFyreHash:function(){var e=this.options.liveFyreSiteId,t=this.options.articleId;e&&t&&(this.liveFyreHash=window.btoa(e+":"+t))},setContent:function(t,o){var n,l,s=this.options,i="."+s.containerClass,a=0;return n=this._getLinkEl(t),l=n.find(i),l.length||(l=e(s.containerTemplate).addClass(s.containerClass+" "+s.containerClass+"-"+t).insertAfter(n).before(" ")),s.showZeros&&"object"==typeof o&&(o="0"),"object"!=typeof o&&(a=parseInt(o,10),"human"===s.countType&&(o=this._getNormalizedCount(a)),l.text(o),this._pluralize(t,o),n.addClass(s.loadedClass)),this._loader("remove",n),this._setupLoadEvent({el:n,name:t,count:a,type:"countSet"}),!0},_setTotal:function(e){var t=this.options,o=this.$element.find(t.totalContainerSelector),n="human"===t.countType?this._getNormalizedCount(this.total):this.total;return this.countTotals++,o.length<0?(s.log("Error: total container not found. Selector: "+t.totalContainerSelector),!1):(o.text(n),void(this.countTotals===e&&(this._setupLoadEvent({el:this.$element,type:"totalSet"}),this.$element.addClass(t.loadedClass))))},_setupLoadEvent:function(t){t=t||{};var o=this.options.location;o&&e.extend(t,{location:o}),this._trigger("loaded",null,t)},_getLinkEl:function(t){var o,n=this;return this.$links.filter(function(l){var s=e(this),i=s.attr("data-"+n.popupId).toLowerCase();return o=i===t?e(this):!1})},_getNormalizedCount:function(e){return e>=1e9?e=(e/1e9).toFixed(2)+"B":e>=1e6?e=(e/1e6).toFixed(2)+"M":e>=1e3&&(e=(e/1e3).toFixed(1)+"K"),e},_pluralize:function(e,t){var o=1===t?"one":"other",n=this._getLinkEl(e).find(this.options.labelClass),l=n.data("format-"+o);s.log("Pluralize:",[o,l]),l&&n.text(l)},_loader:function(e,t){var o=this.options;t=t||this.$element,"add"===e?t.addClass(o.loadingClass):t.removeClass(o.loadingClass)}})});