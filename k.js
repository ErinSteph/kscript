function loadK(){

  var d, db, h, namespace, $, $$, version;

  d = document;
  db = document.body;
  h = document.getElementsByTagName('head')[0];

  namespace = "kScript";
  version = 0.0;

  $ = function(s, p){
    if(!p || p == null){
      p = db;
    }
    return p.querySelector(s);
  };

  $$ = function(s, p){
    if(!p || p == null){
      p = db;
    }
    return p.querySelectorAll(s);
  };

  $.getVal = function(k, v){
    if(typeof(Storage) !=="undefined"){
      if(v == null){
        if(localStorage.getItem(namespace + "." + k) != null){
          return localStorage.getItem(namespace  + "." + k);
        }else{
          return 'undefined';
        }
      }else{
        if(localStorage.getItem(namespace + "." + k) != null){
          return localStorage.getItem(namespace + "." + k);
        }else{
          return v;
        }
      }
    }else{
      return 'storage unavailable';
    }
  };

  $.setVal = function(k, v){
    if(typeof(Storage) !=="undefined"){
      if(v == null){
        return 'undefined';
      }else{
        return localStorage.setItem(namespace  + "." + k, v);
      }
    }else{
      return 'storage unavailable';
    }
  };

  $.delVal = function(k){
    return localStorage.removeItem(namespace + "." + k);
  };

  $.elm = function(t, a, s){
    var e = d.createElement(t);
    if(a){
      for (key in a){
        e.setAttribute(key, a[key]);
      }
    }
    if(s){
      s.appendChild(e);
    }
    return e;
  };

  $.clone = function(e, s){
    if(s == null){
      return e.cloneNode(true);
    }else{
      return e.cloneNode(false);
    }
  };

  $.htm = function(s, v){
    if(v == null){
      return s.innerHTML;
    }else{
      s.innerHTML = v;
    }
    return s;
  };

  $.each = function(a, c, e){
    for(var i = 0; i < a.length; i++){
      c(a[i], i);
      if(i == (a.length)-1){
        if(e && e != null){
          return e(a[i], i);
        }else{
          return a;
        }
      }
    }
  };

  $.xhr = function(t, u, i, c, p){
    if(i != null){
      if(t == 'POST'){
        var xd = new FormData();
        for (key in i){
          xd.append(key, i[key]);
        }
      }else{
        xd = '?';
        for (key in i){
          xd += key + '=' + i[key] + '&';
        }
        xd = xd.substring(0, (xd.length-1));
        u += xd;
      }
    }
    var x = new XMLHttpRequest();
    x.open(t, u);
    if(p != null){
      for (key in p){
        x.setRequestHeader(key, p[key]);
      }
    }
    x.onreadystatechange = function(){
      if (x.readyState == 4) {
        return c(x);
      }
    }
    if(t == 'POST' && i != null){
      x.send(xd);
    }else{
      x.send();
    }
  };

  $.JSON = function(s){
    if(typeof s == 'string'){
      return JSON.parse(s);
    }else{
      return JSON.stringify(s);
    }
  };

  $.time = function(t, c, l){
    if(c == false){
      return clearInterval(t);
    }else{
      if(l == true){
        return setInterval(function(){
          c();
        },t);
      }else{
        return setTimeout(function(){
          c();
        },t);
      }
    }
  };

  $.val = function(s, v){
    if(!v || v == null){
      return s.value;
    }else{
      s.value = v;
    }
    return s;
  };

  $.event = function(t, i, s){
    if (i == null) {
      i = {};
    }
    if (s == null) {
      s = d;
    }
    return s.dispatchEvent(new CustomEvent(t, i));
  };

  $.att = function(s, a, v) {
    if (!v || v == null || v == false) {
      if (v == false) {
        return s.removeAttribute(a);
      } else {
        return s.getAttribute(a);
      }
    } else {
      s.setAttribute(a, v);
      return s;
    }
  };

  $.destroy = function(s) {
    return s.parentNode.removeChild(s);
  };

  $.css = function(s){
    var e = d.createElement('style');
    e.type = 'text/css';
    if (e.styleSheet){
      e.styleSheet.cssText = s;
    } else {
      e.appendChild(d.createTextNode(s));
    }
    h.appendChild(e);
    return e;
  };

  $.onCursor = function(myField, myValue){
    if (document.selection) {
      myField.focus();
      sel = document.selection.createRange();
      sel.text = myValue;
    }else if(myField.selectionStart || myField.selectionStart == '0'){
      var startPos = myField.selectionStart;
      var endPos = myField.selectionEnd;
      myField.value = myField.value.substring(0, startPos)
      + myValue
      + myField.value.substring(endPos, myField.value.length);
    }else{
      myField.value += myValue;
    }
  };

  $.after = function(e, s){
    s.parentNode.insertBefore(e, s.nextSibling);
    return e;
  };

  $.before = function(e, s){
    s.parentNode.insertBefore(e, s);
    return e;
  };

  $.getSelected = function(){
    var text = "";
    if (window.getSelection) {
      text = window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
      text = document.selection.createRange().text;
    }
    return text;
  };

  $.parLines = function(s){
    s = s.replace(/<\/p>/g, " ");
    return s;
  };

  $.stripTags = function(inputtags, allowedtags){
    allowedtags = (((allowedtags || '') + '')
    .toLowerCase()
    .match(/<[a-z][a-z0-9]*>/g) || [])
    .join('');
  var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi,
    commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;
  return inputtags.replace(commentsAndPhpTags, '')
    .replace(tags, function($0, $1) {
      return allowedtags.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : '';
    });
  };

  $.stripMore = function(s){
    s = s.replace(/&gt;/g, ">");
    s = s.replace(/&lt;/g, "<");
    s = s.replace(/&nbsp;/g, " ");
    return s;
  };

  $.anchorJump = function(h){
    var url = location.href;
    location.href = "#"+h;
    history.replaceState(null,null,url);
  };

  $.elmJump = function(s){
    window.scrollTo(0, s.offsetTop);
  };

  /*---------------------------------*/




  /*---------------------------------*/

}
loadK();
