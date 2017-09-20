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
        level: 0,
        nav: null,
        namespace: '',
        render: true
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
            click: [['#header .b1 .button', 'mode'], ['#header .b2 .button', 'config']]
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
            }
          },
          menu: {
            cfg: {
              render: true,
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
                click: [['.button', 'nav']]
              }
            },
            title: ['Главное меню', 'Меню'],
            current: function(){
              var a;
              a = this.cfg.nav.current ? this.cfg.nav.current : 0;
              return this.data[a].list;
            },
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
                    name: 'Документы'
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
            show: [
              {
                duration: 0,
                tween: {
                  visibility: 'visible'
                }
              }, {
                duration: 0.4,
                tween: {
                  className: 'menu',
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
              mouseover: [['.carousel .button.left', 'left'], ['.carousel .button.right', 'right']],
              mouseout: [['.carousel .button.left', 'left'], ['.carousel .button.right', 'right']],
              click: [['.carousel .button.left', 'left'], ['.carousel .button.right', 'right']]
            },
            render: function(){
              var a, b, c, d;
              a = this.data;
              b = this.cfg.nav.current ? this.cfg.nav.current : 0;
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
    attach: function(events){
      var a, b, e, i$, len$, d, c, ref$, own$ = {}.hasOwnProperty;
      if (!this.cfg.node) {
        return true;
      }
      if (events === true) {
        if (!(a = this.cfg.nav.id) || !(b = this[a])) {
          return true;
        }
        events = b.attach;
      }
      e = [];
      for (a in events) if (own$.call(events, a)) {
        b = events[a];
        a = a + '.' + this.cfg.namespace;
        for (i$ = 0, len$ = b.length; i$ < len$; ++i$) {
          d = b[i$];
          c = $('#' + this.cfg.id + ' ' + d[0]);
          d = d[1];
          if (!c || !c.length) {
            continue;
          }
          e.push([a, c, d]);
        }
      }
      if (!e.length) {
        return true;
      }
      d = w3ui.PARTIAL(this, P.event);
      for (i$ = 0, len$ = e.length; i$ < len$; ++i$) {
        ref$ = e[i$], a = ref$[0], b = ref$[1], c = ref$[2];
        b.on(a, null, c, d);
      }
      this.cfg.detach = function(){
        var i$, ref$, len$, ref1$, a, b, c;
        for (i$ = 0, len$ = (ref$ = e).length; i$ < len$; ++i$) {
          ref1$ = ref$[i$], a = ref1$[0], b = ref1$[1], c = ref1$[2];
          b.off(a);
        }
        delete this.detach;
        return true;
      };
      return true;
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
    update: function(id){
      id == null && (id = '');
      V.walk(id, true, function(){
        if (this.cfg.node && this.cfg.attach && this.cfg.attach.data) {
          delete this.cfg.attach.data;
        }
        return true;
      });
      return ['resize', 'refresh'].every(function(f){
        return V.walk(id, true, f);
      });
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
          a = ['render', 'init', 'resize', 'refresh'].every(function(f){
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
          if (!V.walk(id, true, 'attach')) {
            console.log('attach failed');
          }
          delete P.construct.busy;
          return true;
        }
      ]);
    },
    resize: function(){
      var me, f;
      me = this.resize;
      if (me.timer) {
        window.clearTimeout(me.timer);
        f = w3ui.PARTIAL(this, me);
        me.timer = window.setTimeout(f, 250);
        return;
      }
      this.update();
    },
    event: function(event){
      var me, a, data, duration, b, c, d;
      if (!this.cfg) {
        return false;
      }
      me = this.cfg.attach;
      if (!me.data) {
        me.data = {};
      }
      a = this.cfg.nav.id;
      if (!me.data[a]) {
        me.data[a] = {};
      }
      data = me.data[a];
      switch (this.cfg.id) {
      case 'menu':
        true;
        break;
      case 'console':
        switch (this.cfg.nav.id) {
        case 'menu':
          duration = 0.4;
          if (!data.list) {
            data.list = this.cfg.node.find('.data .item');
          }
          if (!data.node) {
            data.node = this.cfg.node.find('.carousel');
          }
          if (!data.hover) {
            a = data.node.find('.item');
            b = data.node.find('.button');
            c = [0, 2].map(function(index){
              var c, d;
              c = new TimelineLite({
                paused: true,
                data: a.eq(index)
              });
              c.to([a[index], b[index]], duration, {
                className: '+=active'
              }, 0);
              d = {
                className: '-=active'
              };
              if (index === 0) {
                d.borderLeft = 0;
              }
              if (index === 2) {
                d.borderRight = 0;
              }
              c.to([a[1], b[1]], duration, d, 0);
              return c;
            });
            data.hover = c;
          }
          switch (event.type) {
          case 'mouseover':
            a = event.data === 'left' ? 0 : 1;
            data.hover[a].play();
            break;
          case 'mouseout':
            a = event.data === 'left' ? 0 : 1;
            data.hover[a].reverse();
            break;
          case 'click':
            this.cfg.detach();
            a = M.nav[this.cfg.level + 1].current;
            if (!a) {
              a = 0;
            }
            b = data.list.length;
            c = [['item', 'button left'], ['item active', 'button center active'], ['item', 'button right']];
            if (event.data === 'left') {
              b = a > 1
                ? a - 2
                : a - 2 + b;
              a = data.list.eq(b).clone();
              data.node.prepend(a);
              c.push(['item hidden', 'button hidden']);
            } else {
              debugger;
              b = a < b ? a + 2 : 2;
              true;
            }
            a = data.node.find('.item');
            b = data.node.find('.button');
            d = new TimelineMax({
              paused: true,
              onComplete: function(){
                var d;
                d = event.data === 'left' ? 3 : 0;
                a.eq(d).remove();
              }
            });
            c.forEach(function(item, index){
              d.to(a[index], duration, {
                className: item[0]
              }, 0);
              d.to(b[index], duration, {
                className: item[1]
              }, 0);
            });
            d.play();
          }
        }
      }
      return true;
    }
  };
  if (M && V && P) {
    return P.init();
  }
});