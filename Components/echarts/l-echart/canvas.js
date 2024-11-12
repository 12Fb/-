"use strict";const e=require("../../../common/vendor.js"),t={};class s{constructor(){this.__events={}}on(e,t){if(!e||!t)return;const s=this.__events[e]||[];s.push(t),this.__events[e]=s}emit(e,t){if(e.constructor===Object&&(e=(t=e)&&t.type),!e)return;const s=this.__events[e];s&&s.length&&s.forEach((e=>{e.call(this,t)}))}off(e,t){const s=this.__events,i=s[e];if(i&&i.length)if(t)for(let a=0,r=i.length;a<r;a++)i[a]===t&&(i.splice(a,1),a--);else delete s[e]}}class i{constructor(){this.currentSrc=null,this.naturalHeight=0,this.naturalWidth=0,this.width=0,this.height=0,this.tagName="IMG"}set src(t){this.currentSrc=t,e.index.getImageInfo({src:t,success:e=>{this.naturalWidth=this.width=e.width,this.naturalHeight=this.height=e.height,this.onload()},fail:()=>{this.onerror()}})}get src(){return this.currentSrc}}class a{constructor(e,t,s){this.tagName="canvas",this.com=t,this.canvasId=s,this.ctx=e}set width(e){this.com.offscreenWidth=e}set height(e){this.com.offscreenHeight=e}get width(){return this.com.offscreenWidth||0}get height(){return this.com.offscreenHeight||0}getContext(e){return this.ctx}getImageData(){return new Promise(((t,s)=>{this.com.$nextTick((()=>{e.index.canvasGetImageData({x:0,y:0,width:this.com.offscreenWidth,height:this.com.offscreenHeight,canvasId:this.canvasId,success:e=>{t(e)},fail:e=>{s(e)}},this.com)}))}))}}exports.Canvas=class{constructor(e,i,a,r={}){t[i.canvasId]={ctx:e},this.canvasId=i.canvasId,this.chart=null,this.isNew=a,this.tagName="canvas",this.canvasNode=r,this.com=i,a||this._initStyle(e),this._initEvent(),this._ee=new s}getContext(e){if("2d"===e)return this.ctx}setAttribute(e,t){"aria-label"===e&&(this.com.ariaLabel=t)}setChart(e){this.chart=e}createOffscreenCanvas(t){if(!this.children){this.com.isOffscreenCanvas=!0,this.com.offscreenWidth=t.width||300,this.com.offscreenHeight=t.height||300;const s=this.com,i=this.com.offscreenCanvasId,r=e.index.createCanvasContext(i,this.com);this._initStyle(r),this.children=new a(r,s,i)}return this.children}appendChild(e){console.log("child",e)}dispatchEvent(e,t){return"object"==typeof e?this._ee.emit(e.type,e):this._ee.emit(e,t),!0}attachEvent(){}detachEvent(){}addEventListener(e,t){this._ee.on(e,t)}removeEventListener(e,t){this._ee.off(e,t)}_initCanvas(e,t){}_initStyle(t,s){if(["fillStyle","strokeStyle","fontSize","globalAlpha","opacity","textAlign","textBaseline","shadow","lineWidth","lineCap","lineJoin","lineDash","miterLimit"].forEach((e=>{Object.defineProperty(t,e,{set:s=>{"opacity"!==e?("fillStyle"!==e&&"strokeStyle"!==e||"none"!==s&&null!==s)&&t["set"+e.charAt(0).toUpperCase()+e.slice(1)](s):t.setGlobalAlpha(s)}})})),this.isNew||s||(t.uniDrawImage=t.drawImage,t.drawImage=(...e)=>{e[0]=e[0].src,t.uniDrawImage(...e)}),t.createRadialGradient||(t.createRadialGradient=function(){return t.createCircularGradient(...[...arguments].slice(-3))}),t.strokeText||(t.strokeText=(...e)=>{t.fillText(...e)}),!t.measureText||"harmonyos"==e.index.getSystemInfoSync().osName){t._measureText=t.measureText;const e=e=>{let t=0;for(let s=0;s<e.length;s++)e.charCodeAt(s)>0&&e.charCodeAt(s)<128?t++:t+=2;return t};t.measureText=(s,i)=>{var a;let r=(null==(a=null==t?void 0:t.state)?void 0:a.fontSize)||12;i&&(r=parseInt(i.match(/([\d\.]+)px/)[1])),r/=2;const n=r>=16?1.3:1;return{width:e(s)*r*n}}}}_initEvent(e){this.event={};[{wxName:"touchStart",ecName:"mousedown"},{wxName:"touchMove",ecName:"mousemove"},{wxName:"touchEnd",ecName:"mouseup"},{wxName:"touchEnd",ecName:"click"}].forEach((e=>{this.event[e.wxName]=t=>{const s=t.touches[0];this.chart.getZr().handler.dispatch(e.ecName,{zrX:"tap"===e.wxName?s.clientX:s.x,zrY:"tap"===e.wxName?s.clientY:s.y})}}))}set width(e){this.canvasNode.width=e}set height(e){this.canvasNode.height=e}get width(){return this.canvasNode.width||0}get height(){return this.canvasNode.height||0}get ctx(){return t[this.canvasId].ctx||null}set chart(e){t[this.canvasId].chart=e}get chart(){return t[this.canvasId].chart||null}},exports.dispatch=function(e,{x:t,y:s,wheelDelta:i}){this.dispatch(e,{zrX:t,zrY:s,zrDelta:i,preventDefault:()=>{},stopPropagation:()=>{}})},exports.setCanvasCreator=function(t,{canvas:s,node:a}){if(t&&!t.registerPreprocessor)return console.warn("echarts 版本不对或未传入echarts，vue3请使用esm格式");t.registerPreprocessor((e=>{e&&e.series&&(e.series.length>0?e.series.forEach((e=>{e.progressive=0})):"object"==typeof e.series&&(e.series.progressive=0))})),t.setPlatformAPI&&t.setPlatformAPI({loadImage:s.setChart?function(e,t,s){let r=null;return a&&a.createImage?(r=a.createImage(),r.onload=t.bind(r),r.onerror=s.bind(r),r.src=e,r):(r=new i,r.onload=t.bind(r),r.onerror=s.bind(r),r.src=e,r)}:null,createCanvas(){const t="createOffscreenCanvas";return e.index.canIUse(t)&&e.index[t]?e.index[t]({type:"2d"}):s}})};