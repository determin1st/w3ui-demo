// Generated by LiveScript 1.5.0
'use strict';
$('document').ready(function(){
  var M, V, P;
  if (!w3ui) {
    return;
  }
  M = w3ui.PROXY({
    init: function(){
      var a;
      a = this.nav;
      this.sav.forEach(function(save, level){
        save[''] = w3ui.CLONE(a.slice(level + 1));
      });
      return true;
    },
    nav: [
      {
        id: 'wa'
      }, {
        id: 'view'
      }, {
        id: 'menu'
      }, {
        id: ''
      }, {
        id: ''
      }
    ],
    sav: [{}, {}, {}, {}],
    authorized: true
  }, {
    set: function(obj, k, v, prx){
      var a, b, c, d;
      if (typeof k !== 'string') {
        return true;
      }
      a = parseInt(k);
      if (isNaN(a)) {
        obj[k] = v;
        return true;
      }
      k = a;
      a = obj.nav;
      b = obj.sav;
      c = a[k];
      d = k < b.length ? b[k] : null;
      if (c.id === v && v === '') {
        return true;
      }
      if (c.id === v) {
        v = '';
      }
      if (d) {
        d[c.id] = a.slice(k + 1);
        a.splice(k + 1);
        a = a.concat(w3ui.CLONE(d[v]));
      }
      c.id = v;
      return true;
    },
    get: function(obj, p, prx){
      var k;
      if (typeof p !== 'string') {
        return null;
      }
      k = parseInt(p);
      if (!isNaN(k)) {
        return obj.nav[k].id;
      }
      if (p in obj) {
        return obj[p];
      }
      return null;
    }
  });
  V = {
    skel: w3ui.PROXY({
      cfg: {
        id: 'skel',
        node: w3ui('#skel'),
        root: w3ui('html'),
        parent: null,
        context: null,
        data: {},
        level: 0,
        nav: null,
        namespace: '',
        render: true,
        refresh: function(){
          var a, b;
          a = this.cfg.root.box.innerWidth;
          b = this.cfg.root.box.innerHeight;
          this.cfg.root.style.vWidth = a;
          this.cfg.root.style.vHeight = b;
          return true;
        }
      },
      wa: {
        cfg: {
          fontSizeMax: 0,
          init: function(){
            var a, ref$, b, own$ = {}.hasOwnProperty;
            for (a in ref$ = this.header.buttons) if (own$.call(ref$, a)) {
              b = ref$[a];
              b.node = w3ui('#header .' + a + ' .button');
            }
            this.header.title.node = w3ui('#header .title');
            a = parseInt(this.cfg.node.style.fSizeMax);
            if (!isNaN(a)) {
              this.cfg.fontSizeMax = a;
            }
            return true;
          },
          resize: function(){
            var a, b, ref$, own$ = {}.hasOwnProperty;
            a = this.cfg.fontSizeMax;
            b = this.header.title;
            b = b.node.textMeasureFont(b.text);
            if (b > a) {
              b = a;
            }
            this.cfg.node.style.fSize0 = b + 'px';
            for (a in ref$ = this.header.buttons) if (own$.call(ref$, a)) {
              b = ref$[a];
              if (!b.list) {
                b.index = -1;
                continue;
              }
              b.index = b.list.reduce(fn$, -1);
            }
            return true;
            function fn$(a, text, index){
              var c;
              c = b.node.textMeasure(text);
              if (c.width < b.node.box.innerWidth && (a < 0 || b.list[a].length < text.length)) {
                return index;
              }
              return a;
            }
          },
          refresh: function(){
            var a, ref$, b, own$ = {}.hasOwnProperty;
            for (a in ref$ = this.header.buttons) if (own$.call(ref$, a)) {
              b = ref$[a];
              if (!b.list) {
                b.node.addClass('disabled');
                b.node.html('');
                continue;
              }
              b.node.removeClass('disabled');
              b.node.html(b.index < 0
                ? b.icon
                : b.list[b.index]);
            }
            return true;
          },
          show: [
            {
              duration: 0,
              tween: {
                opacity: 0,
                visibility: 'visible'
              }
            }, {
              duration: 0.4,
              tween: {
                opacity: 1,
                ease: Power1.easeOut
              }
            }
          ],
          attach: {
            click: [
              {
                el: '#header .b1 .button',
                id: 'mode'
              }, {
                el: '#header .b2 .button',
                id: 'config'
              }
            ]
          }
        },
        view: {
          cfg: {
            render: true,
            init: function(){
              var p, a, b, c;
              p = this.cfg.parent;
              a = this.cfg.nav.id;
              b = p.header.buttons;
              c = a ? this[a] : null;
              b.b1.list = a !== 'menu' ? this.menu.title : null;
              b.b2.list = c && c.config ? this.config.title : null;
              b = p.header;
              b.title.text = c && c.title ? c.title[0] : '';
              return true;
            },
            finit: function(){
              var a, b;
              a = this.cfg.nav.id;
              b = this.cfg.node;
              if (!b.hasClass(a)) {
                b.removeClass();
                b.addClass(a);
              }
              return true;
            }
          },
          menu: {
            cfg: {
              render: true,
              init: function(){
                var a;
                if (!this.cfg.data.box) {
                  this.cfg.data.box = this.cfg.node.find('.box');
                  this.cfg.data.time = this.cfg.show[1].duration;
                }
                a = this.cfg.nav.current || 0;
                this.cfg.data.box.eq(a).addClass('active');
                return true;
              },
              refresh: function(){
                var data, a, b, c;
                data = this.cfg.data;
                if (!data.box.hasClass('attached')) {
                  data.box.addClass('attached');
                }
                if (!data.slide) {
                  a = this.cfg.nav.current || 0;
                  b = data.box.length - 1;
                  c = [a > 0 ? a - 1 : b, a < b ? a + 1 : 0];
                  a = [[a, c[0]], [a, c[1]]];
                  a = a.map(function(side){
                    return side.map(function(index){
                      return data.box.eq(index);
                    });
                  });
                  c = [['0%', '100%', '-100%', '0%'], ['0%', '-100%', '100%', '0%']];
                  data.slide = a.map(function(a, index){
                    var b;
                    b = new TimelineLite({
                      paused: true,
                      data: {
                        complete: function(){
                          data.box.prop('style', '');
                          delete data.slide;
                        }
                      }
                    });
                    b.set(a[0], {
                      transformOrigin: '0% 50%',
                      x: c[index][0],
                      zIndex: 1
                    });
                    b.set(a[1], {
                      transformOrigin: '0% 50%',
                      x: c[index][2],
                      zIndex: 2
                    });
                    b.set(a, {
                      visibility: 'visible'
                    });
                    b.addLabel('s1');
                    b.to(a[0], data.time, {
                      x: c[index][1]
                    }, 's1');
                    b.to(a[1], data.time, {
                      x: c[index][3]
                    }, 's1');
                    b.set(a[0], {
                      className: '-=active'
                    });
                    b.set(a[1], {
                      className: '+=active'
                    });
                    return b;
                  });
                }
                return true;
              },
              show: [
                {
                  duration: 0,
                  tween: {
                    visibility: 'visible',
                    scale: 0
                  }
                }, {
                  duration: 0.6,
                  tween: {
                    scale: 1,
                    ease: Back.easeOut
                  }
                }
              ],
              hide: [{
                duration: 0.6,
                tween: {
                  scale: 0,
                  ease: Back.easeIn
                }
              }],
              attach: {
                click: {
                  el: '.button',
                  id: 'nav'
                },
                pointerdown: {
                  el: ''
                },
                pointermove: {
                  el: ''
                },
                pointerup: {
                  el: ''
                }
              }
            },
            title: ['Главное меню', 'Меню'],
            data: [
              {
                id: 'card',
                name: 'Картотека',
                list: [
                  {
                    id: 'address',
                    name: 'Адреса'
                  }, {
                    id: 'counterparty',
                    name: 'Контрагенты'
                  }
                ]
              }, {
                id: 'income',
                name: 'Входящие',
                list: [
                  {
                    id: 'accrual',
                    name: 'Начисления'
                  }, {
                    id: 'payment',
                    name: 'Оплата'
                  }, {
                    id: 'storno',
                    name: 'Сторно'
                  }
                ]
              }, {
                id: 'outcome',
                name: 'Исходящие',
                list: [
                  {
                    id: 'calc',
                    name: 'Расчеты'
                  }, {
                    id: 'document',
                    name: 'Отчеты'
                  }
                ]
              }
            ]
          },
          address: {
            cfg: {
              refresh: function(){
                return true;
              }
            },
            title: ['Картотека адресов', 'Адрес'],
            tabs: [
              {
                id: 'a0',
                name: 'квартира'
              }, {
                id: 'a1',
                name: 'дом'
              }, {
                id: 'a2',
                name: 'улица'
              }, {
                id: 'a3',
                name: 'район'
              }, {
                id: 'a4',
                name: 'город'
              }
            ]
          },
          config: {
            title: ['Настройки', 'Настр']
          }
        },
        header: {
          cfg: {
            refresh: function(){
              this.title.node.html(this.title.text);
              return true;
            }
          },
          title: {
            node: null,
            text: ''
          },
          buttons: {
            b1: {
              node: null,
              icon: '',
              index: -1,
              list: null
            },
            b2: {
              node: null,
              icon: '',
              index: -1,
              list: null
            }
          }
        },
        console: {
          cfg: {
            render: true,
            attach: true,
            init: function(){
              this.cfg.show[1].tween.className = this.cfg.nav.id;
              return true;
            },
            resize: function(){
              this.cfg.data = {};
              return this.cfg.refresh.apply(this);
            },
            refresh: function(){
              var a;
              a = this.cfg.nav.id;
              if (this[a].refresh) {
                return this[a].refresh.apply(this, [this.cfg.data]);
              }
              return true;
            },
            show: [
              {
                duration: 0,
                tween: {
                  visibility: 'visible'
                }
              }, {
                duration: 0.4,
                tween: {
                  className: '',
                  ease: Power3.easeOut
                }
              }
            ],
            hide: [{
              duration: 0.4,
              tween: {
                className: '',
                ease: Power3.easeIn
              }
            }]
          },
          menu: {
            attach: {
              pointerover: [
                {
                  el: '.button.left',
                  id: 'left'
                }, {
                  el: '.button.right',
                  id: 'right'
                }
              ],
              pointerout: [
                {
                  el: '.button.left',
                  id: 'left'
                }, {
                  el: '.button.right',
                  id: 'right'
                }
              ],
              click: [
                {
                  el: '.button.left',
                  id: 'left',
                  delayed: true
                }, {
                  el: '.button.right',
                  id: 'right',
                  delayed: true
                }
              ],
              keydown: {
                keys: ['ArrowLeft', 'ArrowRight'],
                delayed: true
              }
            },
            render: function(){
              var a, b, c, d;
              a = this.data;
              b = this.cfg.nav.current || 0;
              c = a.length - 1;
              d = a.map(function(item){
                return {
                  id: item.id,
                  name: item.name
                };
              });
              return {
                list: d,
                current: a[b].name,
                prev: b
                  ? a[b - 1].name
                  : a[a.length - 1].name,
                next: b === c
                  ? a[0].name
                  : a[b + 1].name
              };
            },
            refresh: function(data){
              var a, b, main, c;
              if (!data.node) {
                data.node = this.cfg.node.find('.carousel');
                data.time = this.cfg.show[1].duration;
              }
              if (!data.box) {
                data.box = data.node.find('.item');
                data.btn = data.node.find('.button');
              }
              if (!data.hover) {
                a = data.box;
                b = data.btn;
                data.hover = [1, 3].map(function(index){
                  var c;
                  c = new TimelineLite({
                    paused: true,
                    data: a.eq(index)
                  });
                  c.to([a[index], b[index], a[2], b[2]], data.time, {
                    className: '+=hover'
                  });
                  return c;
                });
              }
              if (!data.unhover) {
                a = new TimelineLite({
                  paused: true
                });
                a.to([data.box, data.btn], data.time / 2, {
                  className: '-=hover'
                });
                data.unhover = a;
              }
              if (!data.slide) {
                main = this.cfg.context;
                a = main.cfg.nav.current || 0;
                b = main.data.length - 1;
                c = [
                  a > 1
                    ? a - 2
                    : a - 1 + b, a + 2 <= b
                    ? a + 2
                    : a + 1 - b
                ];
                data.btn.eq(0).text(main.data[c[0]].name);
                data.btn.eq(4).text(main.data[c[1]].name);
                a = data.box.eq(0);
                b = data.box.eq(4);
                a = [a.clone(), b.clone()];
                b = [a[0].find('.button'), a[1].find('.button')];
                a = [[a[0], b[0]], [a[1], b[1]]];
                data.slide = a.map(function(box, index){
                  var a, b;
                  a = new TimelineMax({
                    paused: true,
                    data: {
                      complete: function(){
                        data.box.prop('style', '');
                        data.btn.prop('style', '');
                        if (index) {
                          data.node.append(box[0]);
                          data.box.eq(0).remove();
                        } else {
                          data.node.prepend(box[0]);
                          data.box.eq(4).remove();
                        }
                        delete data.box;
                        delete data.hover;
                        delete data.unhover;
                        delete data.slide;
                      }
                    }
                  });
                  if (index) {
                    b = [['+=hidden', '-=active', '+=active', '-=hidden'], ['+=hidden', 'button left', 'button center', '-=hidden']];
                  } else {
                    b = [['-=hidden', '+=active', '-=active', '+=hidden'], ['-=hidden', 'button center', 'button right', '+=hidden']];
                  }
                  a.to(data.box[index + 0], data.time, {
                    className: b[0][0]
                  }, 0);
                  a.to(data.box[index + 1], data.time, {
                    className: b[0][1]
                  }, 0);
                  a.to(data.box[index + 2], data.time, {
                    className: b[0][2]
                  }, 0);
                  a.to(data.box[index + 3], data.time, {
                    className: b[0][3]
                  }, 0);
                  a.to(data.btn[index + 0], data.time, {
                    className: b[1][0]
                  }, 0);
                  a.to(data.btn[index + 1], data.time, {
                    className: b[1][1]
                  }, 0);
                  a.to(data.btn[index + 2], data.time, {
                    className: b[1][2]
                  }, 0);
                  a.to(data.btn[index + 3], data.time, {
                    className: b[1][3]
                  }, 0);
                  return a;
                });
              }
              return true;
            }
          }
        }
      }
    }, {
      get: function(obj, id, prx){
        var a, b, k, v, own$ = {}.hasOwnProperty;
        if (!id) {
          return obj;
        }
        if (obj[id] && obj[id].cfg) {
          return obj[id];
        }
        if (!obj.cfg) {
          return null;
        }
        a = [obj];
        while (a.length) {
          b = a.pop();
          for (k in b) if (own$.call(b, k)) {
            v = b[k];
            if (k !== 'cfg' && v && v.cfg) {
              if (v[id] && v[id].cfg) {
                return v[id];
              }
              a.push(v);
            }
          }
        }
        return null;
      }
    }),
    init: function(id, parent, level, namespace, templ){
      var a, b, c, own$ = {}.hasOwnProperty;
      id == null && (id = '');
      parent == null && (parent = null);
      level == null && (level = 0);
      namespace == null && (namespace = '');
      if (!(a = this.skel[id]) || !(b = a.cfg)) {
        console.log('getting of "' + id + '" failed');
        return false;
      }
      if (!id) {
        id = b.id;
      }
      namespace += id.charAt(0).toUpperCase() + id.slice(1);
      if (!templ) {
        templ = $('template');
        templ = $(templ[0].content);
      }
      b.id = id;
      b.parent = parent;
      if (parent) {
        b.root = parent.cfg.root;
      }
      b.level = level;
      b.nav = M.nav[level];
      b.namespace = namespace;
      if (b.render) {
        b.render = w3ui.PARTIAL(a, this.render);
      }
      if (b.attach) {
        b.attach = w3ui.PARTIAL(a, this.attach, b.attach);
      }
      b.template = templ;
      b.data = {};
      for (b in a) if (own$.call(a, b)) {
        c = a[b];
        if (b !== 'cfg' && c && c.cfg) {
          if (!this.init(b, a, level + 1, namespace, templ)) {
            return false;
          }
        }
      }
      return true;
    },
    walk: function(id, direction, func, onComplete){
      var a, walk, b, i$, len$;
      if (!(a = this.skel[id])) {
        return false;
      }
      walk = [];
      b = [a];
      while (b.length) {
        walk.push(b);
        b = b.map(fn$);
        b = b.reduce(fn1$, []);
      }
      walk = walk.reduce(function(a, b){
        return a.concat(b);
      }, []);
      if (!direction) {
        walk.reverse();
      }
      if (typeof func !== 'string') {
        return walk.every(function(node){
          return func.apply(node);
        });
      }
      if (onComplete) {
        a = [];
        for (i$ = 0, len$ = walk.length; i$ < len$; ++i$) {
          b = walk[i$];
          if (b.cfg[func]) {
            a.push((fn2$.call(this, b)));
            a.push((fn3$.call(this, b)));
          }
        }
        a.push(onComplete);
        w3ui.THREAD(a);
        return true;
      }
      return walk.every(function(node){
        if (node.cfg[func]) {
          return node.cfg[func].apply(node);
        } else {
          return true;
        }
      });
      function fn$(node){
        var c, a, b;
        c = [];
        for (a in node) {
          b = node[a];
          if (a !== 'cfg' && b && b.cfg) {
            c.push(b);
          }
        }
        return c;
      }
      function fn1$(a, b){
        return a.concat(b);
      }
      function fn2$(node){
        return function(){
          return node.cfg[func].apply(node);
        };
      }
      function fn3$(node){
        return function(){
          return !node.cfg[func].busy;
        };
      }
    },
    render: function(id){
      var a, b, c;
      id == null && (id = this.cfg.nav.id);
      if (!this.cfg.node) {
        this.cfg.node = w3ui('#' + this.cfg.id);
      }
      if (!this.cfg.node) {
        return false;
      }
      if (!id) {
        return true;
      }
      a = this.cfg.parent;
      if (!a || a.cfg.nav.id === this.cfg.id) {
        b = id;
        c = this[b];
      } else {
        b = '';
        if (!(a = a[a.cfg.nav.id][id])) {
          return true;
        }
        this.cfg.context = a;
        c = this[id].render.apply(a);
      }
      a = this;
      while (a.cfg.parent && a.cfg.level) {
        id = a.cfg.id + '-' + id;
        a = a.cfg.parent;
      }
      a = this.cfg.template.find('#t-' + id);
      if (!a || !a.length) {
        return true;
      }
      a = a[0].innerHTML;
      a = Mustache.render(a, c);
      this.cfg.node.html(a);
      if (b) {
        c.cfg.node = w3ui('#' + b);
      }
      return true;
    },
    attach: function(event){
      var a, b, x, e, i$, len$, d, c, ref$, own$ = {}.hasOwnProperty;
      if (!this.cfg.node) {
        return true;
      }
      if (event === true) {
        if (!(a = this.cfg.nav.id) || !(b = this[a])) {
          return true;
        }
        event = b.attach;
      }
      x = /^key.+/;
      e = [];
      for (a in event) if (own$.call(event, a)) {
        b = event[a];
        if (!Array.isArray(b)) {
          b = [b];
        }
        for (i$ = 0, len$ = b.length; i$ < len$; ++i$) {
          d = b[i$];
          c = d.el
            ? document.querySelectorAll('#' + this.cfg.id + ' ' + d.el)
            : d.el === ''
              ? [this.cfg.node[0]]
              : [document];
          d.preventDefault = !x.test(a);
          d = w3ui.PARTIAL(this, P.event, d);
          e.push([c, a, d]);
        }
      }
      if (!e.length) {
        return true;
      }
      this.cfg.detach = function(){
        var i$, ref$, len$, ref1$, a, b, c;
        for (i$ = 0, len$ = (ref$ = e).length; i$ < len$; ++i$) {
          ref1$ = ref$[i$], a = ref1$[0], b = ref1$[1], c = ref1$[2];
          a.forEach(fn$);
        }
        delete this.detach;
        return true;
        function fn$(a){
          a.removeEventListener(b, c);
        }
      };
      this.cfg.detach.data = {};
      for (i$ = 0, len$ = e.length; i$ < len$; ++i$) {
        ref$ = e[i$], a = ref$[0], b = ref$[1], c = ref$[2];
        a.forEach(fn$);
      }
      return true;
      function fn$(a){
        a.addEventListener(b, c);
      }
    },
    color: w3ui.PROXY({
      source: null,
      Hue: '',
      Saturation: '',
      colors: null,
      gradient: {},
      init: function(){
        var a, i$, b, c;
        a = this.source
          ? this.source
          : $("html");
        if (!a || a.length === 0) {
          return false;
        }
        this.source = a;
        a = window.getComputedStyle(a[0]);
        this.Hue = a.getPropertyValue('--col-h').trim();
        this.Saturation = a.getPropertyValue('--col-s').trim();
        this.colors = {};
        for (i$ = 0; i$ <= 99; ++i$) {
          b = i$;
          c = '--col' + b;
          if (a.getPropertyValue(c)) {
            this.colors[c] = b;
          }
          c = c + 'a';
          if (a.getPropertyValue(c)) {
            this.colors[c] = -b;
          }
        }
        for (i$ = 0; i$ <= 99; ++i$) {
          b = i$;
          if (!(c = a.getPropertyValue('--gr' + b))) {
            break;
          }
          this.gradient['gr' + b] = c.trim();
        }
        return this.select(this.Hue);
      },
      select: function(Hue, Saturation){
        var a, b, ref$, c, d, e;
        Saturation == null && (Saturation = this.Saturation);
        if (!Hue || !Saturation || !this.source) {
          return false;
        }
        this.Hue = Hue;
        this.Saturation = Saturation;
        a = window.getComputedStyle(this.source[0]);
        for (b in ref$ = this.colors) {
          c = ref$[b];
          if (d = a.getPropertyValue(b)) {
            if (c >= 0) {
              e = 'hsla(' + Hue + ', ' + Saturation + '%, ' + c + '%, 1)';
              if (e !== d.trim()) {
                this.source[0].style.setProperty(b, e);
              }
            } else {
              c = -c;
              e = 'hsla(' + Hue + ', ' + Saturation + '%, ' + c + '%, 0)';
              if (e !== d.trim()) {
                this.source[0].style.setProperty(b, e);
              }
            }
          }
        }
        for (b in this.gradient) {
          this.source[0].style.setProperty('--' + b, this[b]);
        }
        return true;
      }
    }, {
      get: function(obj, p, prx){
        var a;
        if (typeof p !== 'string') {
          a = null;
        } else if (obj[p]) {
          a = obj[p];
        } else if (parseInt(p)) {
          a = 'hsla(' + obj.Hue + ',' + obj.Saturation + '%,' + p + '%,1)';
        } else if ('a' === p.charAt(0)) {
          p = p.slice(1);
          a = 'hsla(' + obj.Hue + ',' + obj.Saturation + '%,' + p + '%,0)';
        } else if (obj.gradient[p]) {
          a = obj.gradient[p];
          a = a.replace(/(--col(\d{2})([a]?))/g, function(all, p1, p2, p3, pos, str){
            var a;
            a = p3 ? p3 + p2 : p2;
            if (!(a = prx[a])) {
              a = 'transparent';
            }
            return a;
          });
        } else {
          a = '';
        }
        return a;
      }
    }),
    svg: w3ui.PROXY({
      data: null,
      init: function(){
        var a, i$, to$, b;
        this.data = {};
        if (!(a = $('#t-svg')) || a.length === 0) {
          return false;
        }
        a = $(a[0].content).find('div');
        for (i$ = 0, to$ = a.length - 1; i$ <= to$; ++i$) {
          b = i$;
          this.data[a[b].id] = a[b].innerHTML;
        }
        return true;
      }
    }, {
      get: function(obj, p, prx){
        if (typeof p === 'string') {
          if (obj[p]) {
            return obj[p];
          }
          if (obj.data[p]) {
            return obj.data[p];
          }
        }
        return '';
      }
    })
  };
  P = {
    init: function(){
      if (!M.init() || !V.init()) {
        console.log('init() failed');
        return false;
      }
      P.construct();
      $(window).on('resize', function(){
        P.resize();
      });
      return true;
    },
    construct: function(id){
      var node, busy;
      id == null && (id = '');
      if (!(node = V.skel[id])) {
        return;
      }
      busy = false;
      w3ui.THREAD([
        function(){
          var a;
          if (P.construct.busy) {
            return false;
          }
          P.construct.busy = true;
          if (!V.walk(id, false, 'detach')) {
            console.log('detach failed');
            delete P.construct.busy;
            return null;
          }
          a = new TimelineLite({
            paused: true,
            onComplete: function(){
              return busy = false;
            }
          });
          V.walk(id, false, function(){
            var node, b;
            if (!(node = this.cfg.node)) {
              return true;
            }
            b = new TimelineLite({
              paused: true
            });
            this.cfg.hide && this.cfg.hide.forEach(function(c){
              return b.to(node, c.duration, c.tween);
            });
            b.set(node, {
              visibility: 'hidden'
            });
            a.add(b.play(), 0);
            return true;
          });
          busy = true;
          a.play();
          return true;
        }, function(){
          return !busy;
        }, function(){
          var a, b;
          V.walk(id, false, function(){
            var a;
            if (this.cfg.node && (a = this.cfg.level) && this.cfg.id !== M[a - 1]) {
              this.cfg.node = null;
            }
            return true;
          });
          a = ['render', 'init', 'resize'].every(function(f){
            return V.walk(id, true, f);
          });
          if (!a) {
            console.log('render sequence failed');
            delete P.construct.busy;
            return null;
          }
          V.walk(id, true, function(){
            var node;
            if (!(node = this.cfg.node)) {
              return true;
            }
            node.style.visibility = 'hidden';
            return true;
          });
          a = new TimelineLite({
            paused: true,
            onComplete: function(){
              return busy = false;
            }
          });
          b = 'lev' + node.cfg.level;
          a.addLabel(b, 0);
          V.walk(id, true, function(){
            var node, tl;
            if (!(node = this.cfg.node)) {
              return true;
            }
            tl = new TimelineLite({
              paused: true
            });
            this.cfg.show && this.cfg.show.forEach(function(a){
              return tl.to(node, a.duration, a.tween);
            });
            tl.set(node, {
              visibility: 'visible'
            });
            if (b !== 'lev' + this.cfg.level) {
              b = 'lev' + this.cfg.level;
              a.addLabel(b);
            }
            a.add(tl.play(), b);
            return true;
          });
          busy = true;
          a.play();
          return true;
        }, function(){
          return !busy;
        }, function(){
          if (!V.walk(id, true, 'refresh')) {
            console.log('refresh failed');
            delete P.construct.busy;
            return null;
          }
          V.walk(id, false, 'finit');
          if (!V.walk(id, true, 'attach')) {
            console.log('attach failed');
          }
          delete P.construct.busy;
          return true;
        }
      ]);
    },
    update: function(id){
      id == null && (id = M[0]);
      ['refresh', 'detach', 'attach'].every(function(f){
        return V.walk(id, true, f);
      });
      delete P.event.busy;
    },
    resize: function(){
      var me, f;
      me = this.resize;
      if (me.timer) {
        window.clearTimeout(me.timer);
        f = w3ui.PARTIAL(this, me);
        me.timer = window.setTimeout(f, 250);
      } else if (!V.walk('', true, 'resize')) {
        console.log('resize failed');
      }
    },
    event: function(data, event){
      var me, a, cfg, nav;
      me = P.event;
      if (data.preventDefault && event.cancelable) {
        event.preventDefault();
      }
      if (!this.cfg.detach || me.busy && !data.delayed) {
        return true;
      }
      if (me.busy) {
        event.stopPropagation();
        a = !!me.delayed;
        me.delayed = w3ui.PARTIAL(this, me, data, event);
        if (a) {
          return false;
        }
        if (typeof me.busy === 'object') {
          me.busy.timeScale(2);
        }
        w3ui.THREAD([function(){
          if (me.busy) {
            return false;
          }
          me.delayed();
          delete me.delayed;
          return true;
        }]);
        return false;
      }
      cfg = this.cfg;
      nav = this.cfg.nav;
      event.data = data;
      data = cfg.detach.data;
      me.busy = P.react.apply(this, [event, data, cfg, nav]);
      return true;
    },
    react: function(event, data, cfg, nav){
      var a, b, c, d;
      switch (cfg.id) {
      case 'menu':
        switch (event.type) {
        case 'pointerdown':
          a = document.elementFromPoint(event.pageX, event.pageY);
          if (a.className === 'button') {
            break;
          }
          event.stopPropagation();
          cfg.node.addClass('drag');
          a = cfg.node.box.innerWidth;
          data.dragSize = a * 0.5;
          data.dragX = event.pageX;
          a = V.skel.console.cfg.data.slide;
          b = V.skel.menu.cfg.data.slide;
          c = [
            new TimelineLite({
              paused: true,
              ease: Power3.easeIn
            }), new TimelineLite({
              paused: true,
              ease: Power3.easeIn
            })
          ];
          d = function(index){
            return function(){
              a[index].data.complete();
              b[index].data.complete();
              P.update();
            };
          };
          c[0].add(a[0].play(), 0);
          c[0].add(b[0].play(), 0);
          c[0].add(d(0));
          c[1].add(a[1].play(), 0);
          c[1].add(b[1].play(), 0);
          c[1].add(d(1));
          data.drag = c;
          break;
        case 'pointermove':
          if (!data.drag) {
            break;
          }
          event.stopPropagation();
          a = event.pageX - data.dragX;
          b = a < 0
            ? [0, 1]
            : [1, 0];
          a = Math.abs(a);
          if (a < 0.0001) {
            break;
          }
          b = b.map(function(index){
            return data.drag[index];
          });
          a = a / data.dragSize;
          if (a > 0.99) {
            a = 0.99;
          }
          if (b[0].progress() > 0.0001) {
            b[0].progress(0);
          }
          b[1].progress(a);
          break;
        case 'pointerup':
          if (!data.drag) {
            break;
          }
          event.stopPropagation();
          cfg.node.removeClass('drag');
          a = [data.drag[0].progress(), data.drag[1].progress()];
          b = [a[0] > 0.35, a[1] > 0.35];
          if (!b[0] && !b[1]) {
            if (a[0] > 0.0001) {
              data.drag[0].reverse();
            }
            if (a[1] > 0.0001) {
              data.drag[1].reverse();
            }
            delete data.drag;
            break;
          }
          a = nav.current || 0;
          c = this.data.length - 1;
          if (b[0]) {
            b = a > 0 ? a - 1 : c;
            c = 0;
          } else {
            b = a < c ? a + 1 : 0;
            c = 1;
          }
          nav.current = b;
          return data.drag[c].play();
        case 'click':
          event.stopPropagation();
        }
        break;
      case 'console':
        switch (nav.id) {
        case 'menu':
          !data.change && (data.change = function(id){
            var c, a, b;
            c = cfg.level + 1;
            a = M.nav[c].current || 0;
            b = cfg.context.data.length - 1;
            if (id) {
              b = a < b ? a + 1 : 0;
            } else {
              b = a > 0 ? a - 1 : b;
            }
            M.nav[c].current = b;
            a = V.skel.console.cfg.data;
            b = V.skel.menu.cfg.data;
            c = new TimelineLite({
              paused: true,
              ease: Power2.easeInOut
            });
            if (a.box.hasClass('hover')) {
              c.add(a.unhover.play());
            }
            c.addLabel('a');
            c.add(a.slide[id].play(), 'a');
            c.add(b.slide[id].play(), 'a');
            c.add(function(){
              a.slide[id].data.complete();
              b.slide[id].data.complete();
              P.update();
            });
            return c.play();
          });
          switch (event.type) {
          case 'pointerover':
            event.stopPropagation();
            a = event.data.id === 'left' ? 0 : 1;
            a = V.skel.console.cfg.data.hover[a];
            a.play();
            break;
          case 'pointerout':
            event.stopPropagation();
            a = event.data.id === 'left' ? 0 : 1;
            a = V.skel.console.cfg.data.hover[a];
            a.reverse();
            break;
          case 'click':
            event.stopPropagation();
            a = event.data.id === 'left' ? 0 : 1;
            return data.change(a);
          case 'keydown':
            a = event.data.keys.indexOf(event.key);
            if (a < 0) {
              break;
            }
            event.preventDefault();
            event.stopImmediatePropagation();
            return data.change(a);
          }
        }
      }
      return false;
    }
  };
  if (M && V && P) {
    return P.init();
  }
});