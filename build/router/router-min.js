YUI.add("router",function(e,t){function c(){c.superclass.constructor.apply(this,arguments)}var n=e.HistoryHash,r=e.QueryString,i=e.Array,s=e.Lang,o=e.Object,u=e.config.win,a=[],f=[],l="ready";e.Router=e.extend(c,e.Base,{_regexPathParam:/([:*])([\w\-]+)?/g,_regexUrlQuery:/\?([^#]*).*$/,_regexUrlOrigin:/^(?:[^\/#?:]+:\/\/|\/\/)[^\/]*/,initializer:function(t){var n=this;n._html5=n.get("html5"),n._params={},n._routes=[],n._url=n._getURL(),n._setRoutes(t&&t.routes?t.routes:n.get("routes")),n._html5?(n._history=new e.HistoryHTML5({force:!0}),n._historyEvents=e.after("history:change",n._afterHistoryChange,n)):n._historyEvents=e.on("hashchange",n._afterHistoryChange,u,n),n.publish(l,{defaultFn:n._defReadyFn,fireOnce:!0,preventable:!1}),n.once("initializedChange",function(){e.once("load",function(){setTimeout(function(){n.fire(l,{dispatched:!!n._dispatched})},20)})}),a.push(this)},destructor:function(){var e=i.indexOf(a,this);e>-1&&a.splice(e,1),this._historyEvents&&this._historyEvents.detach()},dispatch:function(){return this.once(l,function(){this._ready=!0,this.upgrade()||this._dispatch(this._getPath(),this._getURL())}),this},getPath:function(){return this._getPath()},hasRoute:function(e){var t;return this._hasSameOrigin(e)?(this._html5||(e=this._upgradeURL(e)),t=this.removeQuery(this.removeRoot(e)),!!this.match(t).length):!1},match:function(e){return i.filter(this._routes,function(t){return e.search(t.regex)>-1})},param:function(e,t){return this._params[e]=t,this},removeRoot:function(e){var t=this.get("root");return e=e.replace(this._regexUrlOrigin,""),t&&e.indexOf(t)===0&&(e=e.substring(t.length)),e.charAt(0)==="/"?e:"/"+e},removeQuery:function(e){return e.replace(/\?.*$/,"")},replace:function(e){return this._queue(e,!0)},route:function(e,t){t=i.flatten(i(arguments,1,!0));var n=[];return this._routes.push({callbacks:t,keys:n,path:e,regex:this._getRegex(e,n),callback:t[0]}),this},save:function(e){return this._queue(e)},upgrade:function(){if(!this._html5)return!1;var e=this._getHashPath();return e?(this.once(l,function(){this.replace(e)}),!0):!1},_decode:function(e){return decodeURIComponent(e.replace(/\+/g," "))},_dequeue:function(){var t=this,n;return YUI.Env.windowLoaded?(n=f.shift(),n?n():this):(e.once("load",function(){t._dequeue()}),this)},_dispatch:function(t,n,r){var o=this,u=o._decode,a=o.match(t),f=[],l,c,h,p;return o._dispatching=o._dispatched=!0,!a||!a.length?(o._dispatching=!1,o):(h=o._getRequest(t,n,r),p=o._getResponse(h),h.next=function(n){var r,d,v;if(n)n==="route"?(f=[],h.next()):e.error(n);else if(r=f.shift())typeof r=="string"&&(d=r,r=o[d],r||e.error("Router: Callback not found: "+d,null,"router")),h.pendingCallbacks=f.length,r.call(o,h,p,h.next);else if(v=a.shift())f=v.callbacks.concat(),l=i.map(v.regex.exec(t)||[],function(e){return e&&u(e)||""}),c=!0,l.length===v.keys.length+1?(l=l.slice(1),h.params=i.hash(v.keys,l),c=i.every(v.keys,function(e,t){var n=o._params[e],r=l[t];return n&&r&&typeof r=="string"?(r=typeof n=="function"?n.call(o,r,e):n.exec(r),r!==!1&&s.isValue(r)?(h.params[e]=r,!0):!1):!0})):h.params=l.concat(),h.pendingRoutes=a.length,c?h.next():h.next("route")},h.next(),o._dispatching=!1,o._dequeue())},_getHashPath:function(e){return e||(e=n.getHash()),e&&e.charAt(0)==="/"?this._joinURL(e):""},_getOrigin:function(){var t=e.getLocation();return t.origin||t.protocol+"//"+t.host},_getParams:function(){return e.merge(this._params)},_getPath:function(){var t=!this._html5&&this._getHashPath()||e.getLocation().pathname;return this.removeQuery(this.removeRoot(t))},_getPathRoot:function(){var t="/",n=e.getLocation().pathname,r;return n.charAt(n.length-1)===t?n:(r=n.split(t),r.pop(),r.join(t)+t)},_getQuery:function(){var t=e.getLocation(),r,i;return this._html5?t.search.substring(1):(r=n.getHash(),i=r.match(this._regexUrlQuery),r&&i?i[1]:t.search.substring(1))},_getRegex:function(e,t){return e instanceof RegExp?e:e==="*"?/.*/:(e=e.replace(this._regexPathParam,function(e,n,r){return r?(t.push(r),n==="*"?"(.*?)":"([^/#?]*)"):n==="*"?".*":e}),new RegExp("^"+e+"$"))},_getRequest:function(e,t,n){return{path:e,query:this._parseQuery(this._getQuery()),url:t,src:n}},_getResponse:function(e){var t=function(){return e.next.apply(this,arguments)};return t.req=e,t},_getRoutes:function(){return this._routes.concat()},_getURL:function(){var t=e.getLocation().toString();return this._html5||(t=this._upgradeURL(t)),t},_hasSameOrigin:function(t){var n=(t&&t.match(this._regexUrlOrigin)||[])[0];return n&&n.indexOf("//")===0&&(n=e.getLocation().protocol+n),!n||n===this._getOrigin()},_joinURL:function(e){var t=this.get("root");return e=this.removeRoot(e),e.charAt(0)==="/"&&(e=e.substring(1)),t&&t.charAt(t.length-1)==="/"?t+e:t+"/"+e},_normalizePath:function(e){var t="..",n="/",r,i,s,o,u,a;if(!e||e===n)return n;o=e.split(n),a=[];for(r=0,i=o.length;r<i;++r)u=o[r],u===t?a.pop():u&&a.push(u);return s=n+a.join(n),s!==n&&e.charAt(e.length-1)===n&&(s+=n),s},_parseQuery:r&&r.parse?r.parse:function(e){var t=this._decode,n=e.split("&"),r=0,i=n.length,s={},o;for(;r<i;++r)o=n[r].split("="),o[0]&&(s[t(o[0])]=t(o[1]||""));return s},_queue:function(){var t=arguments,n=this;return f.push(function(){return n._html5?e.UA.ios&&e.UA.ios<5?n._save.apply(n,t):setTimeout(function(){n._save.apply(n,t)},1):(n._dispatching=!0,n._save.apply(n,t)),n}),this._dispatching?this:this._dequeue()},_resolvePath:function(t){return t?(t.charAt(0)!=="/"&&(t=this._getPathRoot()+t),this._normalizePath(t)):e.getLocation().pathname},_resolveURL:function(t){var n=t&&t.match(this._regexURL),r,i,s,o,u;return n?(r=n[1],i=n[2],s=n[3],o=n[4],r?(r.indexOf("//")===0&&(r=e.getLocation().protocol+r),r+(i||"/")+(s||"")+(o||"")):(u=this._getOrigin()+this._resolvePath(i),i||s?u+(s||"")+(o||""):(s=this._getQuery(),u+(s?"?"+s:"")+(o||"")))):e.getLocation().toString()},_save:function(t,r){var i=typeof t=="string",s,o,u;if(i&&!this._hasSameOrigin(t))return e.error("Security error: The new URL must be of the same origin as the current URL."),this;i&&(t=this
._joinURL(t)),this._ready=!0;if(this._html5)this._history[r?"replace":"add"](null,{url:t});else{s=e.getLocation().pathname,o=this.get("root"),u=n.getHash(),i||(t=u);if(o===s||o===this._getPathRoot())t=this.removeRoot(t);t===u?e.Router.dispatch():n[r?"replaceHash":"setHash"](t)}return this},_setParams:function(t){return this._params={},o.each(t,function(e,t){this.param(t,e)},this),e.merge(this._params)},_setRoutes:function(e){return this._routes=[],i.each(e,function(e){var t=e.callbacks||e.callback;this.route(e.path,t)},this),this._routes.concat()},_upgradeURL:function(t){if(!this._hasSameOrigin(t))return t;var n=(t.match(/#(.*)$/)||[])[1]||"",r=e.HistoryHash.hashPrefix,i;r&&n.indexOf(r)===0&&(n=n.replace(r,""));if(n){i=this._getHashPath(n);if(i)return this._resolveURL(i)}return t},_afterHistoryChange:function(e){var t=this,n=e.src,r=t._url,i=t._getURL();t._url=i;if(n==="popstate"&&(!t._ready||r.replace(/#.*$/,"")===i.replace(/#.*$/,"")))return;t._dispatch(t._getPath(),i,n)},_defReadyFn:function(e){this._ready=!0}},{NAME:"router",ATTRS:{html5:{valueFn:function(){return e.Router.html5},writeOnce:"initOnly"},params:{value:{},getter:"_getParams",setter:"_setParams"},root:{value:""},routes:{value:[],getter:"_getRoutes",setter:"_setRoutes"}},html5:e.HistoryBase.html5&&(!e.UA.android||e.UA.android>=3),_instances:a,dispatch:function(){var e,t,n;for(e=0,t=a.length;e<t;e+=1)n=a[e],n&&n._dispatch(n._getPath(),n._getURL())}}),e.Controller=e.Router},"@VERSION@",{optional:["querystring-parse"],requires:["array-extras","base-build","history"]});
