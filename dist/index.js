(()=>{"use strict";var n={607:(n,r,t)=>{var e,i=function(){return(i=Object.assign||function(n){for(var r,t=1,e=arguments.length;t<e;t++)for(var i in r=arguments[t])Object.prototype.hasOwnProperty.call(r,i)&&(n[i]=r[i]);return n}).apply(this,arguments)};!function(n){n.ArrayToTree=function(n,r,t,e,o,c){void 0===o&&(o="children"),void 0===c&&(c=1);var f=[];return function n(e,c,f,u){e.push.apply(e,f.filter((function(n){return n[t]===c})).map((function(n){return i(i({},n),{level:u})}))),e.forEach((function(e){!1===e.is_leaf&&(e[o]=[],n(e[o],e[r],f.filter((function(n){return n[t]!==c})),u+1))}))}(f,e,JSON.parse(JSON.stringify(n)),c),f},n.TreeQuery=function(n,r,t,e,i){return void 0===e&&(e=!1),void 0===i&&(i="children"),function n(o){return o.forEach((function(o){(e?String(o[t])!==r:-1===String(o[t]).indexOf(r))&&!1===o.is_leaf&&o[i]&&o[i].length&&(o[i]=n(o[i]))})),o.filter((function(n){return(e?String(n[t])===r:-1!==String(n[t]).indexOf(r))||n[i]&&n[i].length}))}(JSON.parse(JSON.stringify(n)))},n.TreeGetPath=function(n,r,t){void 0===t&&(t="children");var e=[];return function n(i,o){i.forEach((function(i){i.is_leaf?e.push(o.concat(i[r])):n(i[t],o.concat(i[r]))}))}(n,[]),e},n.TreeFindPath=function(n,r,t,e,i){void 0===e&&(e=!1),void 0===i&&(i="children");var o=[];return function n(c,f){c.forEach((function(c){(e?String(c[r])===t:String(c[r]).indexOf(t)>-1)?o.push(f.concat(c[r])):c[i]&&n(c[i],f.concat(c[r]))}))}(n,[]),o},n.TreeSinglePathFromId=function(n,r,t,e,i){void 0===i&&(i="children");var o=[];return function n(c,f){c.forEach((function(c){c[t]===e[f]&&(o.push(c[r]),!c.is_leaf&&c[i]&&n(c[i],f+1))}))}(n,0),o}}(e||(e={}))}},r={};function t(e){if(r[e])return r[e].exports;var i=r[e]={exports:{}};return n[e](i,i.exports,t),i.exports}t.d=(n,r)=>{for(var e in r)t.o(r,e)&&!t.o(n,e)&&Object.defineProperty(n,e,{enumerable:!0,get:r[e]})},t.o=(n,r)=>Object.prototype.hasOwnProperty.call(n,r),t(607)})();
//# sourceMappingURL=index.js.map