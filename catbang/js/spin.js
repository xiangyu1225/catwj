(function(e,t){if(typeof module=="object"&&module.exports)module.exports=t();else if(typeof define=="function"&&define.amd)define(t);else e.Spinner=t()})(this,function(){"use strict";var e=["webkit","Moz","ms","O"],t={},i,o;function n(e,t){var i=document.createElement(e||"div"),o;for(o in t)i[o]=t[o];return i}function r(e){for(var t=1,i=arguments.length;t<i;t++){e.appendChild(arguments[t])}return e}function s(e,n,r,s){var a=["opacity",n,~~(e*100),r,s].join("-"),l=.01+r/s*100,c=Math.max(1-(1-e)/n*(100-l),e),f=i.substring(0,i.indexOf("Animation")).toLowerCase(),d=f&&"-"+f+"-"||"";if(!t[a]){o.insertRule("@"+d+"keyframes "+a+"{"+"0%{opacity:"+c+"}"+l+"%{opacity:"+e+"}"+(l+.01)+"%{opacity:1}"+(l+n)%100+"%{opacity:"+e+"}"+"100%{opacity:"+c+"}"+"}",o.cssRules.length);t[a]=1}return a}function a(t,i){var o=t.style,n,r;i=i.charAt(0).toUpperCase()+i.slice(1);if(o[i]!==undefined)return i;for(r=0;r<e.length;r++){n=e[r]+i;if(o[n]!==undefined)return n}}function l(e,t){for(var i in t){e.style[a(e,i)||i]=t[i]}return e}function c(e){for(var t=1;t<arguments.length;t++){var i=arguments[t];for(var o in i){if(e[o]===undefined)e[o]=i[o]}}return e}function f(e,t){return typeof e=="string"?e:e[t%e.length]}var d={lines:12,length:7,width:5,radius:10,scale:1,corners:1,color:"#000",opacity:1/4,rotate:0,direction:1,speed:1,trail:100,fps:20,zIndex:2e9,className:"spinner",top:"50%",left:"50%",shadow:false,hwaccel:false,position:"absolute"};function u(e){this.opts=c(e||{},u.defaults,d)}u.defaults={};c(u.prototype,{spin:function(e){this.stop();var t=this,o=t.opts,r=t.el=n(null,{className:o.className});l(r,{position:o.position,width:0,zIndex:o.zIndex,left:o.left,top:o.top});if(e){e.insertBefore(r,e.firstChild||null)}r.setAttribute("role","progressbar");t.lines(r,t.opts);if(!i){var s=0,a=(o.lines-1)*(1-o.direction)/2,c,f=o.fps,d=f/o.speed,u=(1-o.opacity)/(d*o.trail/100),p=d/o.lines;(function h(){s++;for(var e=0;e<o.lines;e++){c=Math.max(1-(s+(o.lines-e)*p)%d*u,o.opacity);t.opacity(r,e*o.direction+a,c,o)}t.timeout=t.el&&setTimeout(h,~~(1e3/f))})()}return t},stop:function(){var e=this.el;if(e){clearTimeout(this.timeout);if(e.parentNode)e.parentNode.removeChild(e);this.el=undefined}return this},lines:function(e,t){var o=0,a=(t.lines-1)*(1-t.direction)/2,c;function d(e,i){return l(n(),{position:"absolute",width:t.scale*(t.length+t.width)+"px",height:t.scale*t.width+"px",background:e,boxShadow:i,transformOrigin:"left",transform:"rotate("+~~(360/t.lines*o+t.rotate)+"deg) translate("+t.scale*t.radius+"px"+",0)",borderRadius:(t.corners*t.scale*t.width>>1)+"px"})}for(;o<t.lines;o++){c=l(n(),{position:"absolute",top:1+~(t.scale*t.width/2)+"px",transform:t.hwaccel?"translate3d(0,0,0)":"",opacity:t.opacity,animation:i&&s(t.opacity,t.trail,a+o*t.direction,t.lines)+" "+1/t.speed+"s linear infinite"});if(t.shadow)r(c,d("#000","0 0 4px #000"),{top:"2px"});r(e,r(c,d(f(t.color,o),"")))}return e},opacity:function(e,t,i){if(t<e.childNodes.length)e.childNodes[t].style.opacity=i}});function p(){function e(e,t){return n("<"+e+' xmlns="urn:schemas-microsoft.com:vml" class="spin-vml">',t)}o.addRule(".spin-vml","behavior:url(#default#VML)");u.prototype.lines=function(t,i){var o=i.scale*(i.length+i.width),n=i.scale*2*o;function s(){return l(e("group",{coordsize:n+" "+n,coordorigin:-o+" "+-o}),{width:n,height:n})}var a=-(i.width+i.length)*i.scale*2+"px",c=l(s(),{position:"absolute",top:a,left:a}),d;function u(t,n,a){r(c,r(l(s(),{rotation:360/i.lines*t+"deg",left:~~n}),r(l(e("roundrect",{arcsize:i.corners}),{width:o,height:i.scale*i.width,left:i.scale*i.radius,top:-i.scale*i.width>>1,filter:a}),e("fill",{color:f(i.color,t),opacity:i.opacity}),e("stroke",{opacity:0}))))}if(i.shadow)for(d=1;d<=i.lines;d++){u(d,-2,"progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)")}for(d=1;d<=i.lines;d++)u(d);return r(t,c)};u.prototype.opacity=function(e,t,i,o){var n=e.firstChild;o=o.shadow&&o.lines||0;if(n&&t+o<n.childNodes.length){n=n.childNodes[t+o];n=n&&n.firstChild;n=n&&n.firstChild;if(n)n.opacity=i}}}if(typeof document!=="undefined"){o=function(){var e=n("style",{type:"text/css"});r(document.getElementsByTagName("head")[0],e);return e.sheet||e.styleSheet}();var h=l(n("group"),{behavior:"url(#default#VML)"});if(!a(h,"transform")&&h.adj)p();else i=a(h,"animation")}return u});

$.fn.spin = function (t) {
    this.each(function () {
        var e = $(this), i = e.data();
        if (i.spinner) {
            i.spinner.stop();
            delete i.spinner
        }
        if (t !== false) {
            i.spinner = new Spinner($.extend({color: e.css("color")}, t)).spin(this)
        }
    });
    return this
};

$(window).ready(function(){
    $(".spin-loading").spin({
        lines: 12,
        length: 7,
        width: 4,
        radius: 10,
        corners: 1,
        rotate: 0,
        trail: 60,
        speed: 1,
        shadow: false
    });
})