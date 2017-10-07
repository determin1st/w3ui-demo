'use strict'

#######
$ 'document' .ready ->
    ###
    return if not w3ui
    ###
    M = w3ui.PROXY { # model {{{
        init: -> # {{{
            # initialize navigation store
            a = @nav
            @sav.forEach (save, level) !->
                save[''] = w3ui.CLONE a.slice level + 1
            # done
            true
        # }}}
        ###
        # interface navigation {{{
        nav: [
            {id: 'wa'}
            {id: 'view'}
            {id: 'menu'}
            {id: ''}
            {id: ''}
        ]
        sav: [{} {} {} {}]
        # }}}
        # user session {{{
        authorized: true
        # }}}
    }, {
        set: (obj, k, v, prx) -> # {{{
            # check
            return true if typeof k != 'string'
            # set model data
            a = parseInt k
            if isNaN a
                obj[k] = v
                return true
            # set navigation
            # prepare
            k = a
            a = obj.nav
            b = obj.sav
            c = a[k]
            d = if k < b.length
                then b[k]
                else null
            # no change
            return true if c.id == v == ''
            # reset
            v = '' if c.id == v
            # backup/restore
            if d
                # save current navigation
                d[c.id] = a.slice k + 1
                # remove higher levels
                a.splice k + 1
                # add higher levels from save
                a = a ++ w3ui.CLONE d[v]
            # change
            c.id = v
            true
        # }}}
        get: (obj, p, prx) -> # {{{
            # check
            return null if typeof p != 'string'
            # get navigation object
            k = parseInt p
            return obj.nav[k].id if not isNaN k
            # return as is
            return obj[p] if p of obj
            return null
        # }}}
    }
    # }}}
    V = # {{{
        skel: w3ui.PROXY { # interface skeleton {{{
            cfg: # {{{
                # common props
                id: 'skel'          # DOM node identifier
                node: w3ui '#skel'  # DOM node object
                root: w3ui 'html'   # DOM root
                parent: null        # backlink
                context: null       # primary context (for adjacent node)
                data: {}            # data storage
                level: 0            # node level in skeleton tree
                nav: null           # navigation for the level
                namespace: ''       # event namespace
                render: true        # render flag-function
                refresh: ->
                    # update document width/height css variable
                    a = @cfg.root.box.innerWidth
                    b = @cfg.root.box.innerHeight
                    @cfg.root.style.vWidth  = a
                    @cfg.root.style.vHeight = b
                    true
            # }}}
            wa:
                cfg: # {{{
                    fontSizeMax: 0
                    init: -> # {{{
                        # collect DOM nodes
                        # buttons
                        for own a,b of @header.buttons
                            b.node = w3ui '#header .'+a+' .button'
                        # title
                        @header.title.node = w3ui '#header .title'
                        # inititalize font size
                        a = parseInt @cfg.node.style.fSizeMax
                        @cfg.fontSizeMax = a if not isNaN a
                        true
                    # }}}
                    resize: -> # {{{
                        # let's calculate base font size
                        # determine maximal value
                        a = @cfg.fontSizeMax
                        b = @header.title
                        b = b.node.textMeasureFont b.text
                        b = a if b > a
                        # update css variable
                        @cfg.node.style.fSize0 = b+'px'
                        # fit button captions
                        for own a,b of @header.buttons
                            # reset
                            if not b.list
                                b.index = -1
                                continue
                            # determine index
                            b.index = b.list.reduce (a, text, index) ->
                                # measure string
                                c = b.node.textMeasure text
                                # check if it fits and length of the string
                                # is greater than previous
                                if (c.width < b.node.box.innerWidth) and
                                   (a < 0 or b.list[a].length < text.length)
                                    # new index
                                    return index
                                # previous index
                                return a
                            , -1
                        # done
                        true
                    # }}}
                    refresh: -> # {{{
                        # set button captions
                        for own a,b of @header.buttons
                            # check
                            if not b.list
                                b.node.addClass 'disabled'
                                b.node.html ''
                                continue
                            # set
                            b.node.removeClass 'disabled'
                            b.node.html if b.index < 0
                                then b.icon
                                else b.list[b.index]
                        # done
                        true
                    # }}}
                    show: # {{{
                        {
                            duration: 0
                            tween:
                                opacity: 0
                                visibility: 'visible'
                        }
                        {
                            duration: 0.4
                            tween:
                                opacity: 1
                                ease: Power1.easeOut
                        }
                    # }}}
                    attach: # {{{
                        click:
                            {
                                el: '#header .b1 .button'
                                id: 'mode'
                            }
                            {
                                el: '#header .b2 .button'
                                id: 'config'
                            }
                    # }}}
                # }}}
                view: # {{{
                    cfg: # {{{
                        render: true
                        init: -> # {{{
                            # initialize header
                            p = @cfg.parent
                            a = @cfg.nav.id
                            b = p.header.buttons
                            c = if a
                                then @[a]
                                else null
                            # navigation
                            b.b1.list = if a != 'menu'
                                then @menu.title
                                else null
                            # config
                            b.b2.list = if c and c.config
                                then @config.title
                                else null
                            # title
                            b = p.header
                            b.title.text = if c and c.title
                                then c.title.0
                                else ''
                            # done
                            true
                        # }}}
                        finit: -> # {{{
                            # set style
                            a = @cfg.nav.id
                            b = @cfg.node
                            if not b.hasClass a
                                b.removeClass!
                                b.addClass a
                            # done
                            true
                        # }}}
                    # }}}
                    menu: # {{{
                        cfg:
                            render: true
                            init: -> # {{{
                                # prepare
                                if not @cfg.data.menu
                                    @cfg.data.menu = @cfg.node.find '.box'
                                    @cfg.data.time = @cfg.show.1.duration
                                # initialize model
                                while (a = @cfg.nav.current) == undefined
                                    @cfg.nav.current = 0
                                while not (b = @cfg.nav.currentItem)
                                    @cfg.nav.currentItem = @data.map -> 0
                                # set pre-show style
                                c = @cfg.data.menu
                                c.eq a .addClass 'active'
                                # done
                                true
                            # }}}
                            refresh: -> # {{{
                                # prepare
                                data = @cfg.data
                                data.menu.addClass 'attached'
                                if not data.box
                                    # nodes
                                    data.box = data.menu.eq @cfg.nav.current
                                    data.btn = data.box.find '.button'
                                    # numbers
                                    for a from 0 to data.btn.length - 1
                                        data.btn[a].dataset.num = a
                                    # style
                                    a = @cfg.nav.currentItem[@cfg.nav.current]
                                    data.btn.eq a .addClass 'active'
                                # initialize slide effect
                                # {{{
                                if not data.slide
                                    # prepare data
                                    # determine indexes
                                    a = @cfg.nav.current or 0
                                    b = data.menu.length - 1
                                    c =
                                        if a > 0 then a - 1 else b # left
                                        if a < b then a + 1 else 0 # right
                                    a =
                                        [a, c.0]
                                        [a, c.1]
                                    # get boxes
                                    a = a.map (side) -> side.map (index) ->
                                        data.menu.eq index
                                    # transition parameters
                                    c =
                                        ['0%' '100%' '-100%' '0%']
                                        ['0%' '-100%' '100%' '0%']
                                    # create effect
                                    data.slide = a.map (a, index) ->
                                        # create timeline
                                        b = new TimelineLite {
                                            paused: true
                                            data:
                                                complete: !->
                                                    # cleanup inline styles
                                                    data.menu.prop 'style', ''
                                                    # invalidate current data
                                                    delete data.slide
                                        }
                                        # prepare
                                        # step 0
                                        # initital state
                                        b.set a.0, {
                                            transformOrigin: '0% 50%'
                                            x: c[index].0
                                            zIndex: 1
                                        }
                                        b.set a.1, {
                                            transformOrigin: '0% 50%'
                                            x: c[index].2
                                            zIndex: 2
                                        }
                                        b.set a, {
                                            visibility: 'visible'
                                        }
                                        # step 1
                                        # move transition
                                        b.addLabel 's1'
                                        b.to a.0, data.time, {
                                            x: c[index].1
                                        }, 's1'
                                        b.to a.1, data.time, {
                                            x: c[index].3
                                        }, 's1'
                                        # finish
                                        b.set a.0, {className: '-=active'}
                                        b.set a.1, {className: '+=active'}
                                        # done
                                        b
                                # }}}
                                # initialize menu drag/swipe effect
                                # {{{
                                if not data.drag
                                    # get both slide effects
                                    a = V.skel.console.cfg.data.slide
                                    b = data.slide
                                    # create timelines
                                    c =
                                        new TimelineLite {paused: true, ease: Power3.easeInOut}
                                        new TimelineLite {paused: true, ease: Power3.easeInOut}
                                    # define startup routine
                                    d = !~>
                                        a = 'drag'
                                        b = not @cfg.node.hasClass a
                                        @cfg.node.toggleClass a, b
                                    # define complete routine
                                    e = (index) ~> !~>
                                        @cfg.node.removeClass 'drag'
                                        a[index].data.complete!
                                        b[index].data.complete!
                                        delete data.box
                                        delete data.drag
                                    # add tweens
                                    c.0.add d
                                    c.0.add a.0.play!, 0
                                    c.0.add b.0.play!, 0
                                    c.0.add e 0
                                    c.1.add d
                                    c.1.add a.1.play!, 0
                                    c.1.add b.1.play!, 0
                                    c.1.add e 1
                                    # done
                                    data.drag = c
                                # }}}
                                # done
                                true
                            # }}}
                            show: # {{{
                                {
                                    duration: 0
                                    tween:
                                        visibility: 'visible'
                                        scale: 0
                                }
                                {
                                    duration: 0.6
                                    tween:
                                        scale: 1
                                        ease: Back.easeOut
                                }
                            # }}}
                            hide: # {{{
                                {
                                    duration: 0.6
                                    tween:
                                        scale: 0
                                        ease: Back.easeIn
                                }
                                ...
                            # }}}
                            attach: # {{{
                                click:
                                    el: '.button'
                                pointerover:
                                    el: '.button'
                                pointerdown:
                                    el: ''
                                pointermove:
                                    el: ''
                                pointerup:
                                    el: ''
                                keydown:
                                    keys: ['ArrowUp' 'ArrowDown']
                            # }}}
                        title:
                            'Главное меню'
                            'Меню'
                        data:
                            # {{{
                            {
                                id: 'card'
                                name: 'Картотека'
                                list:
                                    {
                                        id: 'address'
                                        name: 'Адреса'
                                    }
                                    {
                                        id: 'counterparty'
                                        name: 'Контрагенты'
                                    }
                            }
                            {
                                id: 'income'
                                name: 'Входящие'
                                list:
                                    {
                                        id: 'accrual'
                                        name: 'Начисления'
                                    }
                                    {
                                        id: 'payment'
                                        name: 'Оплата'
                                    }
                                    {
                                        id: 'storno'
                                        name: 'Сторно'
                                    }
                            }
                            {
                                id: 'outcome'
                                name: 'Исходящие'
                                list:
                                    {
                                        id: 'calc'
                                        name: 'Расчеты'
                                    }
                                    {
                                        id: 'document'
                                        name: 'Отчеты'
                                    }
                            }
                            # }}}
                    # }}}
                    address: # {{{
                        cfg:
                            refresh: -> true
                        title:
                            'Картотека адресов'
                            'Адрес'
                        tabs: [
                            {
                                id: 'a0'
                                name: 'квартира'
                            }
                            {
                                id: 'a1'
                                name: 'дом'
                            }
                            {
                                id: 'a2'
                                name: 'улица'
                            }
                            {
                                id: 'a3'
                                name: 'район'
                            }
                            {
                                id: 'a4'
                                name: 'город'
                            }
                        ]
                    # }}}
                    config: # {{{
                        title:
                            'Настройки'
                            'Настр'
                    # }}}
                # }}}
                header: # {{{
                    cfg:
                        refresh: ->
                            @title.node.html @title.text
                            true
                    title:
                        node: null
                        text: ''
                    buttons:
                        b1:
                            node: null      # w3ui node
                            icon: ''        # svg icon
                            index: -1       # list index
                            list: null      # captions list
                        b2:
                            node: null
                            icon: ''
                            index: -1
                            list: null
                # }}}
                console: # {{{
                    cfg: # {{{
                        data: {}
                        render: true
                        attach: true
                        init: ->
                            # modify show tween
                            @cfg.show.1.tween.className = @cfg.nav.id
                            true
                        resize: ->
                            # invalidate data
                            for own a of @cfg.data
                                delete @cfg.data[a]
                            # refresh
                            @cfg.refresh.apply @
                        refresh: ->
                            # delegate
                            a = @cfg.nav.id
                            return @[a].refresh.apply @, [@cfg.data] if @[a].refresh
                            # done
                            true
                        show: # {{{
                            {
                                duration: 0
                                tween:
                                    visibility: 'visible'
                            }
                            {
                                duration: 0.4
                                tween:
                                    className: ''
                                    ease: Power3.easeOut
                            }
                        # }}}
                        hide: # {{{
                            {
                                duration: 0.4
                                tween:
                                    className: ''
                                    ease: Power3.easeIn
                            }
                            ...
                        # }}}
                    # }}}
                    menu:
                        attach: # {{{
                            pointerover:
                                {
                                    el: '.button.left'
                                    id: 'left'
                                }
                                {
                                    el: '.button.right'
                                    id: 'right'
                                }
                            pointerout:
                                {
                                    el: '.button.left'
                                    id: 'left'
                                }
                                {
                                    el: '.button.right'
                                    id: 'right'
                                }
                            click:
                                {
                                    el: '.button.left'
                                    id: 'left'
                                    delayed: true
                                }
                                {
                                    el: '.button.right'
                                    id: 'right'
                                    delayed: true
                                }
                            keydown:
                                keys: ['ArrowLeft' 'ArrowRight']
                                delayed: true
                        # }}}
                        render: -> # {{{
                            # prepare data
                            a = @data
                            b = @cfg.nav.current or 0
                            c = a.length - 1
                            d = a.map (item) ->
                                {
                                    id: item.id
                                    name: item.name
                                }
                            # done
                            return
                                list: d
                                current: a[b].name
                                prev: if b
                                    then a[b - 1].name
                                    else a[* - 1].name
                                next: if b == c
                                    then a.0.name
                                    else a[b + 1].name
                        # }}}
                        refresh: (data) -> # {{{
                            # initialize data
                            if not data.node
                                data.node = @cfg.node.find '.carousel'
                                data.time = @cfg.show.1.duration
                            if not data.box
                                data.box = data.node.find '.item'
                                data.btn = data.node.find '.button'
                            # initialize hover effect
                            # {{{
                            if not data.hover
                                # prepare
                                a = data.box
                                b = data.btn
                                # for left and right nodes
                                data.hover = [1, 3].map (index) ->
                                    # create timeline
                                    c = new TimelineLite {
                                        paused: true
                                        ease: Power2.easeOut
                                    }
                                    # unhover all at start
                                    c.add let a = a, b = b
                                        !->
                                            a.removeClass 'hover'
                                            b.removeClass 'hover'
                                    # hover
                                    c.to [a[index], b[index], a.2, b.2], data.time, {
                                        className: '+=hover'
                                    }
                                    # done
                                    c
                            # }}}
                            # initialize unhover effect
                            # {{{
                            if not data.unhover
                                # create timeline
                                a = new TimelineLite {
                                    paused: true
                                    ease: Power2.easeIn
                                }
                                a.to [data.box, data.btn], data.time, {
                                    className: '-=hover'
                                }
                                data.unhover = a
                            # }}}
                            # initialize slide effect
                            # {{{
                            if not data.slide
                                # prepare
                                main = @cfg.context
                                # determine current
                                a = main.cfg.nav.current or 0
                                b = main.data.length - 1
                                # determine new
                                c =
                                    # from left
                                    if a > 1
                                        then a - 2
                                        else a - 1 + b
                                    # from right
                                    if a + 2 <= b
                                        then a + 2
                                        else a + 1 - b
                                # set captions
                                data.btn.eq 0 .text main.data[c.0].name
                                data.btn.eq 4 .text main.data[c.1].name
                                # clone elements
                                a = data.box.eq 0
                                b = data.box.eq 4
                                a =
                                    a.clone!
                                    b.clone!
                                b =
                                    a.0.find '.button'
                                    a.1.find '.button'
                                # merge container and button
                                a =
                                    [a.0, b.0]
                                    [a.1, b.1]
                                # create effects
                                data.slide = a.map (box, index) ->
                                    # create timeline
                                    a = new TimelineMax {
                                        paused: true
                                        data:
                                            complete: !->
                                                # cleanup inline styles
                                                data.box.prop 'style', ''
                                                data.btn.prop 'style', ''
                                                # add and remove
                                                if index
                                                    # +right -left
                                                    data.node.append box.0
                                                    data.box.eq 0 .remove!
                                                else
                                                    # -right +left
                                                    data.node.prepend box.0
                                                    data.box.eq 4 .remove!
                                                # invalidate current data
                                                delete data.box
                                                delete data.hover
                                                delete data.slide
                                    }
                                    # define transition classes
                                    if index
                                        b =
                                            ['+=hidden' '-=active' '+=active' '-=hidden']
                                            ['+=hidden' 'button left' 'button center' '-=hidden']
                                    else
                                        b =
                                            ['-=hidden' '+=active' '-=active' '+=hidden']
                                            ['-=hidden' 'button center' 'button right' '+=hidden']
                                    # add tweens
                                    # container
                                    a.to data.box[index + 0], data.time, {
                                        className: b.0.0
                                    }, 0
                                    a.to data.box[index + 1], data.time, {
                                        className: b.0.1
                                    }, 0
                                    a.to data.box[index + 2], data.time, {
                                        className: b.0.2
                                    }, 0
                                    a.to data.box[index + 3], data.time, {
                                        className: b.0.3
                                    }, 0
                                    # button
                                    a.to data.btn[index + 0], data.time, {
                                        className: b.1.0
                                    }, 0
                                    a.to data.btn[index + 1], data.time, {
                                        className: b.1.1
                                    }, 0
                                    a.to data.btn[index + 2], data.time, {
                                        className: b.1.2
                                    }, 0
                                    a.to data.btn[index + 3], data.time, {
                                        className: b.1.3
                                    }, 0
                                    # done
                                    a
                            # }}}
                            # done
                            true
                        # }}}
                # }}}
        }, {
            get: (obj, id, prx) -> # {{{
                # check root
                return obj if not id
                # check root child
                return obj[id] if obj[id] and obj[id].cfg
                # check this node is a leaf
                return null if not obj.cfg
                # search in branch
                # initiate stack
                a = [obj]
                # iterate
                while a.length
                    # extact node
                    b = a.pop!
                    # check sub-branches
                    for own k,v of b when k != 'cfg' and v and v.cfg
                        # found
                        return v[id] if v[id] and v[id].cfg
                        # add to stack
                        a.push v
                # not found
                return null
            # }}}
        }
        # }}}
        ###
        init: (id = '', parent = null, level = 0, namespace = '', templ) -> # {{{
            # get node
            if not (a = @skel[id]) or not b = a.cfg
                console.log 'getting of "'+id+'" failed'
                return false
            # prepare data
            id = b.id if not id
            namespace += id.charAt 0 .toUpperCase! + id.slice 1
            if not templ
                templ = $ 'template'
                templ = $ templ.0.content
            # initialize
            b.id        = id
            b.parent    = parent
            b.root      = parent.cfg.root if parent
            b.level     = level
            b.nav       = M.nav[level]
            b.namespace = namespace
            b.render    = w3ui.PARTIAL a, @render if b.render
            b.attach    = w3ui.PARTIAL a, @attach, b.attach if b.attach
            b.template  = templ
            b.data      = {}
            # recurse to children
            for own b,c of a when b != 'cfg' and c and c.cfg
                return false if not @init b, a, level + 1, namespace, templ
            # complete
            true
        # }}}
        walk: (id, direction, func, onComplete) -> # {{{
            # prepare
            # get start node
            return false if not a = @skel[id]
            # create walk array
            walk = []
            b = [a]
            while b.length
                # add step
                walk.push b
                # collect children from last step
                b = b.map (node) ->
                    # collect
                    c = []
                    for a,b of node when a != 'cfg' and b and b.cfg
                        c.push b
                    # done
                    c
                # merge
                b = b.reduce (a, b) -> return a ++ b
                , []
            # now we have two-dimensional walk array,
            # lets flatten it
            walk = walk.reduce (a, b) -> a ++ b
            , []
            # check direction
            walk.reverse! if not direction
            # walk
            # external function
            if typeof func != 'string'
                return walk.every (node) -> func.apply node
            # walk
            # internal functions
            if onComplete
                # create thread
                a = []
                for b in walk when b.cfg[func]
                    # create chain unit
                    a.push let node = b
                        -> node.cfg[func].apply node
                    # waiter
                    a.push let node = b
                        -> !node.cfg[func].busy
                # append final procedure
                a.push onComplete
                # execute
                w3ui.THREAD a
                # done
                return true
            # internal, no thread
            walk.every (node) -> if node.cfg[func]
                then node.cfg[func].apply node
                else true
        # }}}
        render: (id = @cfg.nav.id) -> # {{{
            # initialize
            if not @cfg.node
                @cfg.node = w3ui '#'+@cfg.id
            # check
            return false if not @cfg.node
            return true  if not id
            # determine node type and select data
            a = @cfg.parent
            if not a or a.cfg.nav.id == @cfg.id
                # primary
                b = id
                c = @[b]
            else
                # adjacent
                b = ''
                # get context of the primary node
                return true if not a = a[a.cfg.nav.id][id]
                # save context
                @cfg.context = a
                # generate data
                c = @[id].render.apply a
            # determine template id
            a = @
            while a.cfg.parent and a.cfg.level
                id = a.cfg.id + '-' + id
                a  = a.cfg.parent
            # select template
            a = @cfg.template.find '#t-'+id
            if not a or not a.length
                # no template
                return true
            a = a.0.innerHTML
            # construct HTML
            a = Mustache.render a, c
            # inject
            @cfg.node.html a
            # initialize child
            c.cfg.node = w3ui '#'+b if b
            # done
            true
        # }}}
        attach: (event) -> # {{{
            # check
            return true if not @cfg.node
            if event == true
                # adjacent event source
                # extract
                if not (a = @cfg.nav.id) or not (b = @[a])
                    return true
                # get event data
                event = b.attach
            # assemble event listeners
            x = /^key.+/
            e = []
            for own a,b of event
                b = [b] if not Array.isArray b
                for d in b
                    # get node
                    c = if d.el
                        then document.querySelectorAll '#'+@cfg.id+' '+d.el
                        else if d.el == ''
                            then [@cfg.node.0]
                            else [document]
                    # determine if default action prevented
                    d.preventDefault = not x.test a
                    # create event handler
                    # combined with custom data
                    d = w3ui.PARTIAL @, P.event, d
                    # add
                    e.push [c, a, d]
            # check
            return true if not e.length
            # prepare detach procedure
            @cfg.detach = ->
                for [a, b, c] in e
                    a.forEach (a) !->
                        a.removeEventListener b, c
                # done
                delete @detach
                true
            # prepare data storage
            @cfg.detach.data = {}
            # attach
            for [a, b, c] in e
                a.forEach (a) !->
                    a.addEventListener b, c
            # done
            true
        # }}}
        color: w3ui.PROXY { # {{{
            ###
            source: null
            Hue: ''
            Saturation: ''
            colors: null
            gradient: {}
            ###
            init: -> # {{{
                # get source
                a = if @source
                    then @source
                    else $ "html"
                # check
                return false if not a or a.length == 0
                # save
                @source = a
                # get styles
                a = window.getComputedStyle a.0
                # get color parameters
                @Hue = a.getPropertyValue '--col-h' .trim!
                @Saturation = a.getPropertyValue '--col-s' .trim!
                # determine colors
                @colors = {}
                for b from 0 to 99
                    # opaque
                    c = '--col'+b
                    @colors[c] = b if a.getPropertyValue c
                    # transparent
                    c = c+'a'
                    @colors[c] = -b if a.getPropertyValue c
                # determine gradients
                for b from 0 to 99
                    # continual numeration
                    break if not c = a.getPropertyValue '--gr'+b
                    @gradient['gr'+b] = c.trim!
                # select color
                @select @Hue
            # }}}
            select: (Hue, Saturation = @Saturation) -> # {{{
                # check
                if not Hue or not Saturation or not @source
                    return false
                # change
                @Hue = Hue
                @Saturation = Saturation
                # get style
                a = window.getComputedStyle @source.0
                # set style
                # install colors
                for b,c of @colors when d = a.getPropertyValue b
                    if c >= 0
                        # opaque
                        e = 'hsla('+Hue+', '+Saturation+'%, '+c+'%, 1)'
                        @source.0.style.setProperty b, e if e != d.trim!
                    else
                        # transparent
                        c = -c
                        e = 'hsla('+Hue+', '+Saturation+'%, '+c+'%, 0)'
                        @source.0.style.setProperty b, e if e != d.trim!
                # install gradients
                for b of @gradient
                    @source.0.style.setProperty '--'+b, @[b]
                # ok
                true
            # }}}
        }, {
            get: (obj, p, prx) -> # color by Hue {{{
                if typeof p != 'string'
                    # incorrect selector
                    a = null
                else if obj[p]
                    # determined, return as is
                    a = obj[p]
                else if parseInt p
                    # opaque
                    a = 'hsla('+obj.Hue+','+obj.Saturation+'%,'+p+'%,1)'
                else if 'a' == p.charAt 0
                    # transparent
                    p = p.slice 1
                    a = 'hsla('+obj.Hue+','+obj.Saturation+'%,'+p+'%,0)'
                else if obj.gradient[p]
                    # gradient
                    a = obj.gradient[p]
                    # determine its color
                    a = a.replace /(--col(\d{2})([a]?))/g, (all, p1, p2, p3, pos, str) ->
                        # prepare
                        a = if p3 then p3+p2 else p2
                        # recurse
                        a = 'transparent' if not a = prx[a]
                        # done
                        return a
                else
                    # unknown
                    a = ''
                # finish
                return a
            # }}}
        }
        # }}}
        svg: w3ui.PROXY { # {{{
            data: null
            ###
            init: -> # {{{
                # prepare
                @data = {}
                # get template
                if not (a = $ '#t-svg') or a.length == 0
                    return false
                # get nodes
                a = $ a.0.content .find 'div'
                # get contents
                for b from 0 to a.length - 1
                    # store
                    @data[a[b].id] = a[b].innerHTML
                # done
                true
            # }}}
        }, {
            get: (obj, p, prx) -> # {{{
                # check
                if typeof p == 'string'
                    return obj[p] if obj[p]
                    return obj.data[p] if obj.data[p]
                # nothing
                return ''
            # }}}
        }
        # }}}
    # }}}
    P = # {{{
        init: -> # {{{
            # initialize
            if not M.init! or not V.init!
                console.log 'init() failed'
                return false
            # construct
            P.construct!
            # attach global resize handler
            $ window .on 'resize', !-> P.resize!
            # done
            true
        # }}}
        construct: (id = '') !-> # {{{
            # get root of construction
            return if not node = V.skel[id]
            # local lock
            busy = false
            # start thread
            w3ui.THREAD [
                ->
                    # wait
                    return false if P.construct.busy
                    # lock global
                    P.construct.busy = true
                    # detach events
                    if not V.walk id, false, 'detach'
                        console.log 'detach failed'
                        delete P.construct.busy
                        return null
                    # hide
                    # create main timeline
                    a = new TimelineLite {
                        paused: true
                        onComplete: -> busy := false
                    }
                    V.walk id, false, ->
                        # check node
                        return true if not node = @cfg.node
                        # create effect timeline
                        b = new TimelineLite {paused: true}
                        # add tweens
                        @cfg.hide and @cfg.hide.forEach (c) ->
                            b.to node, c.duration, c.tween
                        # add final tween
                        b.set node, {visibility: 'hidden'}
                        # insert at the beginning of the main
                        # play to remove paused state
                        a.add b.play!, 0
                        # done
                        true
                    # lock
                    busy := true
                    # start animation
                    a.play!
                    # continue
                    true
                ->
                    # wait
                    not busy
                ->
                    # cleanup
                    V.walk id, false, ->
                        # remove link
                        if @cfg.node and (a = @cfg.level) and @cfg.id != M[a - 1]
                            @cfg.node = null
                        # done
                        true
                    # render new content
                    a = ['render' 'init' 'resize'].every (f) ->
                        V.walk id, true, f
                    # check the result
                    if not a
                        console.log 'render sequence failed'
                        delete P.construct.busy
                        return null
                    # before new elements are shown,
                    # they should be at a hidden state
                    V.walk id, true, ->
                        # check node
                        return true if not node = @cfg.node
                        # hide
                        node.style.visibility = 'hidden'
                        true
                    # show
                    # create main timeline
                    a = new TimelineLite {
                        paused: true
                        onComplete: -> busy := false
                    }
                    # add first label
                    b = 'lev'+node.cfg.level
                    a.addLabel b, 0
                    # nest effects
                    V.walk id, true, ->
                        # check node
                        return true if not node = @cfg.node
                        # create effect timeline
                        tl = new TimelineLite {
                            paused: true
                        }
                        # add tweens
                        @cfg.show and @cfg.show.forEach (a) ->
                            tl.to node, a.duration, a.tween
                        # add final tween
                        tl.set node, {visibility: 'visible'}
                        # check label
                        if b != 'lev'+@cfg.level
                            # we dont check if it's already exist because
                            # the walk sequence is aligned properly
                            # change
                            b := 'lev'+@cfg.level
                            # append new label to the end
                            a.addLabel b
                        # insert timeline
                        # play it to remove paused state
                        a.add tl.play!, b
                        # done
                        true
                    # lock
                    busy := true
                    # start animation
                    a.play!
                    # continue
                    true
                ->
                    # wait
                    not busy
                ->
                    # refresh
                    if not V.walk id, true, 'refresh'
                        console.log 'refresh failed'
                        delete P.construct.busy
                        return null
                    # finish
                    V.walk id, false, 'finit'
                    # attach event handlers
                    if not V.walk id, true, 'attach'
                        console.log 'attach failed'
                    # unlock
                    delete P.construct.busy
                    true
            ]
        # }}}
        update: (id = M.0) !-> # {{{
            # update view
            ['refresh' 'detach' 'attach'].every (f) ->
                V.walk id, true, f
            # unlock events
            delete P.event.busy
        # }}}
        ###
        resize: !-> # {{{
            # prepare
            me = @resize
            # activate debounce protection (delay)
            if me.timer
                # reset timer
                window.clearTimeout me.timer
                # set timer
                f = w3ui.PARTIAL @, me
                me.timer = window.setTimeout f, 250
            # resize
            else if not V.walk '', true, 'resize'
                console.log 'resize failed'
        # }}}
        event: (data, event) -> # {{{
            # prepare
            me = P.event
            if data.preventDefault
                # we are self-sufficient,
                # always prevent default action!
                event.preventDefault!
            # check
            if not @cfg.detach or me.busy and not data.delayed
                return true
            # delay event
            if me.busy
                # dont bubble
                event.stopPropagation!
                # check waiter started
                a = !!me.delayed
                # create delayed routine
                me.delayed = w3ui.PARTIAL @, me, data, event
                return false if a
                # speed up animations
                if typeof me.busy == 'object'
                    me.busy.timeScale 2
                # start waiter
                w3ui.THREAD [
                    ->
                        # wait
                        return false if me.busy
                        # process delayed event
                        me.delayed!
                        delete me.delayed
                        # finish
                        true
                ]
                return false
            # prepare data
            cfg = @cfg
            nav = @cfg.nav
            event.data = data
            data = cfg.detach.data
            # process event
            me.busy = P.react.apply @, [event, data, cfg, nav]
            true
        # }}}
        react: (event, data, cfg, nav) -> # {{{
            switch cfg.id
            | 'menu' =>
                # {{{
                # define menu change routine
                # {{{
                not data.change and data.change = (active) !~>
                    # determine menu index
                    a = nav.current or 0
                    b = @data.length - 1
                    if active
                        a = if a > 0 then a - 1 else b
                    else
                        a = if a < b then a + 1 else 0
                    # change
                    nav.current = a
                # }}}
                # react
                switch event.type
                | 'pointerdown' =>
                    # drag start
                    # {{{
                    # check pointer position
                    a = document.elementFromPoint event.pageX, event.pageY
                    break if a.className == 'button'
                    # prepare
                    event.stopPropagation!
                    # set drag parameters
                    data.swipe = event.pointerType != 'mouse'
                    data.size = 0.5 * cfg.node.box.innerWidth
                    data.x = event.pageX
                    data.active = false
                    data.drag = V.skel.menu.cfg.data.drag
                    # }}}
                | 'pointermove' =>
                    # drag
                    # {{{
                    # check if started
                    break if not data.drag
                    # prepare
                    event.stopPropagation!
                    # determine drag distance
                    # and active timeline
                    if (a = event.pageX - data.x) < 0
                        b = [0 1]
                    else
                        b = [1 0]
                    # check
                    if (a = Math.abs a) < 0.1
                        # cancel drag
                        break if not data.swipe
                        # cancel swipe
                        delete data.drag
                        break
                    # select timelines
                    c = b.map (index) -> data.drag[index]
                    # determine position
                    a = a / data.size
                    a = 0.99 if a > 0.99
                    # swipe!
                    if data.swipe
                        # change model
                        data.change b.0
                        # play effect
                        delete data.drag
                        c.1.add P.update
                        return c.1.play!
                    # drag!
                    # check active
                    d = not data.active or data.active.0 != b.0
                    e = d or (Math.abs a - c.1.progress!) > 0.001
                    # animate
                    if d
                        c.0.pause! if not c.0.paused!
                        c.0.progress 0
                    if e
                        c.1.pause! if not c.1.paused!
                        c.1.progress a
                    # save active
                    data.active = b
                    # }}}
                | 'pointerup' =>
                    # drag stop
                    # {{{
                    # check
                    break if not data.drag or data.swipe
                    # prepare
                    event.stopPropagation!
                    # check active
                    if not (a = data.active)
                        delete data.drag
                        break
                    # determine current state
                    b = data.drag[a.1].progress!
                    # check
                    if b < 0.35
                        # return to initial state
                        data.drag[a.1].reverse!
                        delete data.drag
                        break
                    # change model
                    data.change a.0
                    # play to the end and update
                    a = data.drag[a.1]
                    a.add P.update
                    return a.play!
                    # }}}
                | 'pointerover' =>
                    # hover
                    # {{{
                    # get node number
                    break if (a = event.target.dataset.num) == undefined
                    # prepare
                    event.stopPropagation!
                    # change model
                    nav.currentItem[nav.current] = a
                    # set focus
                    b = cfg.data.btn
                    b.removeClass 'active'
                    b.eq a .addClass 'active'
                    true
                    # }}}
                | 'keydown' =>
                    # focus / navigate
                    # {{{
                    # check
                    a = event.data.keys.indexOf event.key
                    break if a < 0
                    # prepare
                    event.preventDefault!
                    event.stopImmediatePropagation!
                    # determine next index
                    b = nav.currentItem[nav.current]
                    c = cfg.data.btn
                    if a
                        # next
                        a = if b < c.length - 1
                            then b + 1
                            else 0
                    else
                        # previous
                        a = if b > 0
                            then b - 1
                            else c.length - 1
                    # change model
                    nav.currentItem[nav.current] = a
                    # set focus
                    c.removeClass 'active'
                    c.eq a .addClass 'active'
                    # }}}
                | 'click' =>
                    # navigate
                    # {{{
                    # prepare
                    event.stopPropagation!
                    # change model
                    #M.2 = event.target.className
                    # construct
                    #P.construct 'view'
                    # }}}
                # }}}
            | 'console' =>
                switch nav.id
                | 'menu' =>
                    # {{{
                    # define model change routine
                    not data.change and data.change = (id) ->
                        # {{{
                        # prepare
                        # determine current
                        c = cfg.level + 1
                        a = M.nav[c].current or 0
                        # determine new current
                        b = cfg.context.data.length - 1
                        if id
                            b = if a < b
                                then a + 1
                                else 0
                        else
                            b = if a > 0
                                then a - 1
                                else b
                        # change
                        M.nav[c].current = b
                        # construct effect
                        a = V.skel.console.cfg.data.hover
                        b = V.skel.menu.cfg.data.drag[id]
                        c =
                            a.0.progress! > 0.0001
                            a.1.progress! > 0.0001
                        # unhover first
                        if c.0 or c.1
                            d = b
                            b = new TimelineLite {
                                paused: true
                                ease: Power3.easeInOut
                            }
                            b.add a.0.reverse!.timeScale 2, 0 if c.0
                            b.add a.1.reverse!.timeScale 2, 0 if c.1
                            b.add d.play 0
                        # add update routine and play
                        b.add P.update
                        return b.play!
                        # }}}
                    # react
                    switch event.type
                    | 'pointerover' =>
                        # hover
                        # {{{
                        # prepare
                        event.stopPropagation!
                        a = V.skel.console.cfg.data.hover
                        b = if event.data.id == 'left'
                            then 0
                            else 1
                        # play
                        a[b].play!
                        # }}}
                    | 'pointerout' =>
                        # unhover
                        # {{{
                        # prepare
                        event.stopPropagation!
                        a = V.skel.console.cfg.data.hover
                        b = if event.data.id == 'left'
                            then 0
                            else 1
                        # play
                        a[b].reverse!
                        # }}}
                    | 'click' =>
                        # slide carousel
                        # {{{
                        event.stopPropagation!
                        a = if event.data.id == 'left'
                            then 0
                            else 1
                        return data.change a
                        # }}}
                    | 'keydown' =>
                        # keyboard
                        # {{{
                        # check
                        a = event.data.keys.indexOf event.key
                        break if a < 0
                        # change
                        event.preventDefault!
                        event.stopImmediatePropagation!
                        return data.change a
                        # }}}
                    # }}}
            # done
            false
        # }}}
    # }}}
    ###
    P.init! if M and V and P
#######

