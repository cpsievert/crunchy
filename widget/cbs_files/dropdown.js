define(["jquery","version!fly/components/base"],function(e){var t="ontouchstart"in window||window.navigator.maxTouchPoints?!0:!1,i=e.mobile?"vclick":"click";e.widget("fly.dropdown",e.fly.base,{options:{classSelected:"selected",event:"click",selectorTrigger:'[data-item="trigger"]'},$element:null,$trigger:null,enterTimeout:null,leaveTimeout:null,_create:function(){var e=this.options,n={};this._setup(),t&&(e.event="click"),this.$element=this.$element,this.$trigger=this.$element.find(e.selectorTrigger).first(),"click"===e.event?(n[i]="_handleClick",this._on(this.$trigger,n)):"hover"===e.event&&this._on(this.$element,{mouseenter:"_handleMouseEnter",mouseleave:"_handleMouseLeave"})},_handleClick:function(e){e.preventDefault(),this.toggle()},_handleMouseEnter:function(e){var t=this;clearTimeout(this.leaveTimeout),this.enterTimeout=setTimeout(function(){t.show()},50)},_handleMouseLeave:function(e){var t=this;clearTimeout(this.enterTimeout),this.leaveTimeout=setTimeout(function(){t.hide()},150)},_handleDocClick:function(t){var i=e(t.target);0===this.$element.has(i).length&&e.contains(document.documentElement,i[0])&&this.hide()},show:function(){var e=this,t=this.options,n={};this.$element.addClass(t.classSelected),setTimeout(function(){n[i]="_handleDocClick",e._on(e.$document,n)},1),this._trigger("shown",null,{$element:this.$element,$trigger:this.$trigger})},hide:function(){var e=this.options;this.$element.removeClass(e.classSelected),this._off(this.$document,i),this._trigger("hidden",null,{$element:this.$element,$trigger:this.$trigger})},toggle:function(){var e=this.options,t=this.$element.hasClass(e.classSelected);this[t?"hide":"show"]()}})});