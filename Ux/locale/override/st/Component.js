Ext.define('Ux.locale.override.st.Component', {
    override : 'Ext.Component',

    requires : [
        'Ux.locale.Manager'
    ],

    enableLocale : false,
    locale       : null,
    locales      : null,

    constructor : function(config) {
        config = config || {};

        var me           = this,
            locales      = config.locales      || me.locales      || (me.getLocales && me.getLocales()) || me.config.locales,
            enableLocale = config.enableLocale || me.enableLocale || (me.getEnableLocale && me.getEnableLocale());

        if (Ext.isObject(locales) || enableLocale) {
            Ext.apply(me, {
                enableLocale : true,
                locale       : Ux.locale.Manager,
                locales      : locales
            });
        }

        me.callOverridden(arguments);

        if (me.enableLocale) {
            me.setLocale(Ux.locale.Manager.getLanguage());
        }
    },

    setLocale : function(locale) {
        var me           = this,
            locales      = me.locales || me.getInitialConfig().locales,
            html         = locales.html,
            emptyText    = locales.emptyText,
            text         = locales.text,
            title        = locales.title, 
            instructions = locales.instructions,
            label        = locales.label,
            placeholder  = locales.placeHolder,
            manager      = me.locale,
            defaultText  = '',
            defaultLabel = '',
            defaultPlaceholder = '';

        if (html) {
            if (Ext.isObject(html)) {
                defaultText = html.defaultText;
                html        = html.key;
            }

            html = manager.get(html, defaultText);

            if (Ext.isString(html)) {
                me.setHtml(html);
            }
        }

        if (text && Ext.isFunction(me.setText)) {
            if (Ext.isObject(text)) {
                defaultText = text.defaultText;
                text        = text.key;
            }

            text = manager.get(text, defaultText);

            if (Ext.isString(text)) {
                me.setText(text);
            }
        }

        if (emptyText && Ext.isFunction(me.setEmptyText)) {
            emptyText = manager.get(emptyText, defaultText);

            if (Ext.isString(emptyText)) {
                me.setEmptyText(emptyText);
            }
        }

        if (title) {
            if (Ext.isObject(title)) {
                defaultText = title.defaultText;
                title       = title.key;
            }

            title = manager.get(title, defaultText);

            if (Ext.isString(title)) {
                // set the config so that it can be taken into account if added
                // later to a specific container
                me.setConfig({title: title});

                if (Ext.isFunction(me.setTitle)) {
                    me.setTitle(title);
                }
                
                if (me.getParent() && Ext.isFunction(me.getParent().setTitle) &&
                    (Ext.navigation && Ext.navigation.View && (me.getParent() instanceof Ext.navigation.View))) {
                    me.getParent().setTitle(title);
                }

                if (me.getParent() &&
                    (Ext.tab && Ext.tab.Panel && (me.getParent() instanceof Ext.tab.Panel))) {

                    var tabBar   = tabpanel.getTabBar(),
                    items    = tabpanel.getInnerItems(),
                    index    = Ext.Array.indexOf(items, me);

                    tabBar.getComponent(index).setTitle(title);
                }
            }
        }

        if (instructions && Ext.isFunction(me.setInstructions)) {
            if (Ext.isObject(instructions)) {
                defaultInstructions = instructions.defaultText;
                instructions        = instructions.key;
            }
            instructions = manager.get(instructions, defaultInstructions);

            if (Ext.isString(instructions)) {
                me.setInstructions(instructions);
            }
        }

        if (label && Ext.isFunction(me.setLabel)) {
            if (Ext.isObject(label)) {
                defaultLabel = label.defaultLabel;
                label        = label.key;
            }

            label = manager.get(label, defaultLabel);

            if (Ext.isString(label)) {
                me.setLabel(label);
            }
        }

        if (placeholder && Ext.isFunction(me.setPlaceHolder)) {
            if (Ext.isObject(placeholder)) {
                defaultPlaceholder = label.defaultPlaceholder;
                placeholder        = placeholder.key;
            }

            placeholder = manager.get(placeholder, defaultPlaceholder);

            if (Ext.isString(placeholder)) {
                me.setPlaceHolder(placeholder);
            }
        }
    }
});
