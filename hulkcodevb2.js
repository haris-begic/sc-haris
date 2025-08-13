if (!window.is_hulk_load_js) {
    window.is_hulk_load_js = !0,
    window.Shopify && window.Shopify.currency && window.Shopify.currency.rate ? window.hulkapps_shopify_rate = window.Shopify.currency.rate : window.hulkapps_shopify_rate = 1;
    var checkout_selectors = "input[name='checkout']:not(.hulkapps-ignore), input[value='Checkout']:not(.hulkapps-ignore), button[name='checkout']:not(.hulkapps-ignore), [href$='checkout']:not(.hulkapps-ignore), button[value='Checkout']:not(.hulkapps-ignore), input[name='goto_pp'], button[name='goto_pp'], input[name='goto_gc'], button[name='goto_gc'],.hulkapps_checkout";
    if ("product" == window.hulkapps.page_type) {
        var hulk_variants = window.hulkapps.product.variants;
        window.hulkapps.product.selected_variant = null;
        var product_price = ""
          , currency_symbol = ""
          , display_price_setting = "";
        function updateSelectedVariant() {
            var t = document.querySelector('script[type="application/json"][data-variant]')
              , e = t.textContent && JSON.parse(t.textContent);
            window.hulkapps.product.selected_variant = e.id,
            product_price = e.price,
            window.hulkapps.product.selected_variant_price = e.price,
            hulkapps_jQuery("#hulkapps_options_" + window.hulkapps.product_id).closest("form").find(":submit").addClass("hulkapps_submit_cart"),
            window.$first_add_to_cart_el && window.$first_add_to_cart_el.removeClass("hulkapps_submit_cart").addClass("hulkapps_submit_cart")
        }
        window.product_page_btn_condition = function() {
            var t = [];
            document.querySelectorAll(".single-option-selector,.swatch-element input[type='radio'],.single-option-selector__radio:checked, select[data-option='option1'], select[data-option='option1']:checked, select[data-option='option2'], select[data-option='option1']:checked, select[data-option='option3'], select[data-option='option3']:checked, select[data-index='option1'], select[data-index='option1']:checked, select[data-index='option2'], select[data-index='option1']:checked, select[data-index='option3'], select[data-index='option3']:checked, ul li div[swatch-option='option1'], input[type='radio']:checked").forEach((function(e) {
                t.push(e.value)
            }
            ));
            if (1 == (t = function(t, e) {
                for (var a = [], i = t.length, o = 0; o < i; o++) {
                    var n = t[o];
                    e(n) && a.push(n)
                }
                return a
            }(t, (function(t) {
                return t
            }
            ))).length)
                var e = t;
            else
                e = t.join(" / ");
            if (null != document.querySelector(".selected_variant span"))
                document.querySelector(".selected_variant span").textContent;
            else
                Object.keys(hulk_variants).forEach((function(t) {
                    var a = hulk_variants[t];
                    if (e = e.toString().toLowerCase(),
                    a.title.toString().toLowerCase().trim() == e.trim()) {
                        a.id;
                        window.hulkapps.product.selected_variant = a.id,
                        product_price = a.price,
                        window.hulkapps.product.selected_variant_price = product_price
                    }
                    document.querySelector('script[type="application/json"][data-variant]') && updateSelectedVariant()
                }
                ));
            null == window.hulkapps.product.selected_variant && (window.hulkapps.product.selected_variant = hulk_variants[0].id,
            product_price = window.hulkapps.product.variants[0].price,
            window.hulkapps.product.selected_variant_price = product_price)
        }
    }
    window.hulkLoadScript = function(t, e) {
        var a = document.createElement("script");
        a.type = "text/javascript",
        a.readyState ? a.onreadystatechange = function() {
            "loaded" != a.readyState && "complete" != a.readyState || (a.onreadystatechange = null,
            e())
        }
        : a.onload = function() {
            e()
        }
        ,
        a.src = t,
        document.getElementsByTagName("head")[0].appendChild(a)
    }
    ,
    window.checkAppInstalled = function(t) {
        window.hulkapps.is_product_option = !0,
        hulkLoadScript("https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/19.5.5/js/intlTelInput.min.js", (function() {
            commonJS(t),
            cartPageJS(t),
            productPageJS(t)
        }
        ))
    }
    ,
    window.commonJS = function(t) {
        var e, a, i;
        window.getCartInfo(),
        window.fetch = new Proxy(window.fetch,{
            apply(t, e, a) {
                const i = t.apply(e, a);
                return i.then((t => {
                    var e = window.hulkappsParseURL(a[0])
                      , i = !1;
                    if (["/cart/change", "/cart/clear", "/cart/update", "/cart/add"].forEach((async function(e) {
                        if (a[0] && a[0].includes(e)) {
                            i = !0,
                            window.is_on_click = !1;
                            var o = await t.clone().json();
                            a[0].includes("/cart/add") && (o = void 0),
                            window.getCartInfo(0, o)
                        }
                    }
                    )),
                    !i && e && e.query)
                        if (e.query.get("section_id") && e.query.get("section_id").includes("cart"))
                            i = !0,
                            window.getCartInfo();
                        else {
                            if (e.query.get("ref") && e.path.includes("/cart"))
                                return;
                            if (e.query.get("view") && e.query.get("view").includes("hulkapps_cart_collections"))
                                return;
                            e.query.get("view") && e.path.includes("/cart") && !e.path.includes("/cart.js") && (i = !0,
                            window.getCartInfo())
                        }
                    i || e && "/cart" === e.path && window.getCartInfo()
                }
                )).catch((t => {}
                )),
                i
            }
        }),
        e = function(t) {
            var e = !1
              , a = window.hulkappsParseURL(t._url);
            let i = ["/cart/change", "/cart/clear", "/cart/update", "/cart/add"];
            var o = !1;
            const n = setInterval((function() {
                o || (function() {
                    if (t.readyState === XMLHttpRequest.DONE) {
                        if (o = !0,
                        i.forEach((function(a) {
                            if (t._url && t._url.includes(a)) {
                                e = !0;
                                var i = t.status;
                                if (0 === i || i >= 200 && i < 400) {
                                    window.is_on_click = !1;
                                    var o = JSON.parse(t.response);
                                    t._url.includes("/cart/add") && (o = void 0),
                                    window.getCartInfo(0, o)
                                }
                            }
                        }
                        )),
                        !e && a && a.query)
                            if (a.query.get("section_id") && a.query.get("section_id").includes("cart"))
                                e = !0,
                                window.getCartInfo();
                            else {
                                if (a.query.get("ref") && a.path.includes("/cart"))
                                    return;
                                if (a.query.get("view") && a.query.get("view").includes("hulkapps_cart_collections"))
                                    return;
                                a.query.get("view") && a.path.includes("/cart") && !a.path.includes("/cart.js") && (e = !0,
                                window.getCartInfo())
                            }
                        e || a && "/cart" === a.path && window.getCartInfo()
                    }
                }(),
                o = !0),
                o && clearInterval(n)
            }
            ), 1e3)
        }
        ,
        XMLHttpRequest.callbacks ? XMLHttpRequest.callbacks.push(e) : (XMLHttpRequest.callbacks = [e],
        a = XMLHttpRequest.prototype.send,
        XMLHttpRequest.prototype.send = function() {
            if (XMLHttpRequest.callbacks)
                for (i = 0; i < XMLHttpRequest.callbacks.length; i++)
                    XMLHttpRequest.callbacks[i](this);
            a.apply(this, arguments)
        }
        ),
        function(t) {
            !function() {
                "use strict";
                Document.prototype._hulkappsAddEventListener = Document.prototype.addEventListener,
                Document.prototype._hulkappsRemoveEventListener = Document.prototype.removeEventListener,
                Document.prototype._hulkappsAddEventListener = function(t, e, a=!1) {
                    this._hulkappsAddEventListener(t, e, a),
                    this.hulkappsEventListenerList || (this.hulkappsEventListenerList = {}),
                    this.hulkappsEventListenerList[t] || (this.hulkappsEventListenerList[t] = []),
                    this.hulkappsEventListenerList[t].push({
                        type: t,
                        listener: e,
                        useCapture: a
                    })
                }
                ,
                Document.prototype._hulkappsRemoveEventListener = function(t, e, a=!1) {
                    this._hulkappsRemoveEventListener(t, e, a),
                    this.hulkappsEventListenerList || (this.hulkappsEventListenerList = {}),
                    this.hulkappsEventListenerList[t] || (this.hulkappsEventListenerList[t] = []);
                    for (let i = 0; i < this.hulkappsEventListenerList[t].length; i++)
                        if (this.hulkappsEventListenerList[t][i].listener === e && this.hulkappsEventListenerList[t][i].useCapture === a) {
                            this.hulkappsEventListenerList[t].splice(i, 1);
                            break
                        }
                    0 == this.hulkappsEventListenerList[t].length && delete this.hulkappsEventListenerList[t]
                }
                ,
                Document.prototype.hulkappsGetEventListeners = function(t) {
                    return this.hulkappsEventListenerList || (this.hulkappsEventListenerList = {}),
                    void 0 === t ? this.hulkappsEventListenerList : this.hulkappsEventListenerList[t]
                }
            }(),
            t("body").on("click", ".edit_cart_option", (function(e) {
                e.preventDefault();
                var a = t(this).data("key")
                  , i = window.hulkapps.cart
                  , o = window.hulkapps.store_id
                  , n = t(this).data("product_id")
                  , l = t(this).data("variant_id");
                t("[name^='properties']").each((function() {
                    "" == t(this).val() && t(this).attr("disabled", !0)
                }
                ));
                var s = t(this)
                  , p = window.hulkapps.money_format;
                t.ajax({
                    type: "POST",
                    url: window.hulkapps.po_url + "/api/v2/store/edit_cart_extension",
                    data: {
                        cart_data: i,
                        item_key: a,
                        store_id: o,
                        variant_id: l,
                        customer_tags: null != window.hulkapps.customer ? window.hulkapps.customer.tags.split(",") : "",
                        cart_collections: JSON.stringify(window.hulkapps.cart_collections),
                        format: p,
                        currency_rate: window.hulkapps_shopify_rate
                    },
                    cache: !1,
                    crossDomain: !0,
                    success: function(e) {
                        if ("ok" == e)
                            location.reload();
                        else {
                            window.currentEditOptionSelector = s,
                            t("body").addClass("body_fixed"),
                            t("body").find(".edit_popup").remove(),
                            t("body").append('<div class="edit_popup" style="display: none;"><form method="post" data-action="/cart/add" id="edit_cart_popup" class="edit_form" enctype="multipart/form-data"></form></div>'),
                            t("#edit_cart_popup").last().html(e),
                            t(".edit_popup").show(),
                            "undefined" != typeof jQuery && jQuery(document).off("focusin");
                            const a = document.hulkappsGetEventListeners("focusin");
                            if (a)
                                for (let t in a)
                                    document.removeEventListener("focusin", a[t].listener);
                            requireInventory(n, "hulkapps_edit_product_options"),
                            calc_options_total(n, "hulkapps_edit_product_options"),
                            conditional_rules(n, "hulkapps_edit_product_options"),
                            window.hulk_multi_qty_selector && window.hulkUpdateStockStatus(t)
                        }
                    }
                })
            }
            ))
        }(hulkapps_jQuery),
        function(t) {
            t.fn.fontselect = function(e, a) {
                var i = function(t, e) {
                    return function() {
                        return t.apply(e, arguments)
                    }
                }
                  , o = {
                    style: "font-select",
                    placeholder: "Select a font",
                    lookahead: 2,
                    api: "https://fonts.googleapis.com/css?family="
                };
                if (e.google_font)
                    for (var n = Object.keys(e.google_font), l = Math.ceil(n.length / 3), s = 0; s < n.length; s += l) {
                        var p = n.slice(s, s + l).join("|")
                          , r = o.api + p;
                        0 === t("link[href*='" + p + "']").length && t("head").append('<link href="' + r + '" rel="stylesheet" type="text/css">')
                    }
                if (e.custom_font)
                    var d = e.custom_font;
                var _ = function() {
                    function a(e, a) {
                        this.$original = t(e),
                        this.options = a,
                        this.active = !1,
                        this.setupHtml(),
                        this.getVisibleFonts(),
                        this.bindEvents(),
                        this.$original.val() && this.updateSelected()
                    }
                    return a.prototype.bindEvents = function() {
                        var e = this;
                        t(document).click((function(a) {
                            e.active && !t(a.target).parents("#fontSelect-" + e.$original[0].id).length && e.toggleDrop()
                        }
                        )),
                        t("li", this.$results).click(i(this.selectFont, this)).mouseenter(i(this.activateFont, this)).mouseleave(i(this.deactivateFont, this)),
                        t("span", this.$select).click(i(this.toggleDrop, this)),
                        this.$arrow.click(i(this.toggleDrop, this))
                    }
                    ,
                    a.prototype.toggleDrop = function(t) {
                        this.active ? (this.$element.removeClass("font-select-active"),
                        this.$drop.hide(),
                        clearInterval(this.visibleInterval)) : (this.$element.addClass("font-select-active"),
                        this.$drop.show(),
                        this.moveToSelected(),
                        this.visibleInterval = setInterval(i(this.getVisibleFonts, this), 500)),
                        this.active = !this.active
                    }
                    ,
                    a.prototype.selectFont = function() {
                        var e = t("li.active", this.$results).data("value");
                        this.$original.val(e).change(),
                        this.updateSelected(),
                        this.toggleDrop()
                    }
                    ,
                    a.prototype.moveToSelected = function() {
                        var e, a = this.$original.val();
                        e = a ? t("li[data-value='" + a + "']", this.$results) : t("li", this.$results).first(),
                        this.$results.scrollTop(e.addClass("active")[0].offsetTop)
                    }
                    ,
                    a.prototype.activateFont = function(e) {
                        t("li.active", this.$results).removeClass("active"),
                        t(e.currentTarget).addClass("active")
                    }
                    ,
                    a.prototype.deactivateFont = function(e) {
                        t(e.currentTarget).removeClass("active")
                    }
                    ,
                    a.prototype.updateSelected = function() {
                        var e = this.$original.val();
                        t("span", this.$element).text(this.toReadable(e)).css(this.toStyle(e))
                    }
                    ,
                    a.prototype.setupHtml = function() {
                        this.$original.empty().hide(),
                        this.$element = t("<div>", {
                            id: "fontSelect-" + this.$original[0].id,
                            class: this.options.style
                        }),
                        this.$arrow = t("<div><b></b></div>"),
                        this.$select = t('<a><span tabindex="0">' + this.options.placeholder + "</span></a>"),
                        this.$drop = t("<div>", {
                            class: "fs-drop"
                        }),
                        this.$results = t("<ul>", {
                            class: "fs-results"
                        }),
                        this.$original.after(this.$element.append(this.$select.append(this.$arrow)).append(this.$drop)),
                        this.$drop.append(this.$results.append(this.fontsAsHtml())).hide()
                    }
                    ,
                    a.prototype.fontsAsHtml = function() {
                        if (h = "",
                        e.google_font)
                            for (var a, i, o = n.length, l = "", s = 0; s < o; s++)
                                a = this.toReadable(n[s]),
                                i = this.toStyle(n[s]),
                                h += '<li tabindex="0" aria-label="' + n[s] + '" data-is-custom="false" data-value="' + n[s] + '" style="font-family: ' + i["font-family"] + "; font-weight: " + i["font-weight"] + '">' + a + "</li>";
                        if (e.custom_font) {
                            var p = Object.keys(d).length;
                            for (s = 0; s < p; s++) {
                                var r = Object.keys(d)[s];
                                a = this.toReadable(r),
                                i = this.toStyle(r),
                                l += '@font-face {font-family: "' + r + '";src: url(' + d[r] + ");} ",
                                h += '<li tabindex="0" aria-label="' + r + '"  data-is-custom="true"  data-value="' + r + '" style="font-family: ' + r + '">' + a + "</li>"
                            }
                            t("head").append("<style>" + l + "</style>")
                        }
                        return h
                    }
                    ,
                    a.prototype.toReadable = function(t) {
                        return t.replace(/[\+|:]/g, " ")
                    }
                    ,
                    a.prototype.toStyle = function(t) {
                        var e = t.split(":");
                        return {
                            "font-family": this.toReadable(e[0]),
                            "font-weight": e[1] || 400
                        }
                    }
                    ,
                    a.prototype.getVisibleFonts = function() {
                        if (!this.$results.is(":hidden")) {
                            this.$results.scrollTop(),
                            this.$results.height();
                            if (this.options.lookahead)
                                t("li", this.$results).first().height() * this.options.lookahead
                        }
                    }
                    ,
                    a
                }();
                return this.each((function() {
                    return a && t.extend(o, a),
                    new _(this,o)
                }
                ))
            }
        }(hulkapps_jQuery),
        window.hulkDraftOrder = function() {
            return window.is_draft_order
        }
        ,
        window.hulkappsDoActions = function(e) {
            e.discounts.discount_show_integration ? window.is_discount_code = !0 : window.is_discount_code = !1,
            e.discounts.discount_show ? t(".discount_code_box").css("display", "block") : t(".discount_code_box").css("display", "none"),
            e.discounts.plan && t(".edit_cart_option").css("display", "block"),
            "object" == typeof e.discounts && "object" == typeof e.discounts.cart && "object" == typeof e.discounts.cart.items && hulkappsShowCartDiscounts(e.discounts)
        }
        ,
        t(document).on("click", checkout_selectors, (function(e) {
            if (e.preventDefault(),
            window.hulk_inventory_arr && window.hulk_inventory_arr.length > 0) {
                var a = '<div class="hulkapps_summary inventory_validation_hulkapps">';
                return window.hulk_inventory_arr.forEach((function(t) {
                    a += t
                }
                )),
                a += "</div>",
                t(".inventory_validation_hulkapps").remove(),
                t(this).parent().after(a),
                !1
            }
            var i;
            if (t(".inventory_validation_hulkapps").remove(),
            window.is_draft_order && window.hulk_inventory_arr && window.hulk_inventory_arr.length <= 0)
                "function" != typeof hulkappsCheckout && (window.location = "/checkout"),
                "undefined" == typeof IntegrationCheckoutClick ? hulkappsCheckout(null) : (1 == (i = IntegrationCheckoutClick()).required || 0 != i.required) && hulkappsCheckout(i);
            else if ("undefined" == typeof IntegrationCheckoutClick)
                window.location = "/checkout?locale=" + Shopify.locale;
            else if (1 == (i = IntegrationCheckoutClick()).required)
                window.location = "/checkout?locale=" + Shopify.locale;
            else if (0 != i.required)
                window.location = "/checkout?locale=" + Shopify.locale;
            else if (0 == i.required)
                return !1
        }
        )),
        window.hulkappsShowCartDiscounts = function(e) {
            window.hulkapps.discounts = e;
            var a = e.cart_item_price_selectors.split(",")
              , i = e.cart_item_line_price_selectors.split(",")
              , o = e.cart_item_line_price_before_discount.split(",")
              , n = e.cart_total_price_selectors;
            e.cart.items.forEach((function(e) {
                t.each(a, (function(a, i) {
                    t(i + "[data-key='" + e.key + "']").html(e.original_price_format)
                }
                )),
                t.each(i, (function(a, i) {
                    t(i + "[data-key='" + e.key + "']").html(e.original_line_price_format)
                }
                )),
                t.each(o, (function(a, i) {
                    t(i + "[data-key='" + e.key + "']").html(e.cart_item_line_price_before_discount)
                }
                ))
            }
            ));
            var l = parseFloat(e.discount_cut_price);
            n = n.split(","),
            t.each(n, (function(a, i) {
                e.discount_code && 1 == e.discount_error ? (t(i).html(e.original_price_total),
                hulkapps_jQuery(".hulkapps_summary").remove(),
                t(".hulkapps_discount_hide").after("<span class='hulkapps_summary'>Discount code does not match</span>"),
                localStorage.removeItem("discount_code"),
                t(i).html(e.original_price_total),
                t(i).css("text-decoration", "none"),
                t(".hulkapps-summary-line-discount-code").html(""),
                t(".after_discount_price").html("")) : e.is_free_shipping ? (t(".hulkapps_summary").remove(),
                t(i).html(e.original_price_total),
                t(i).css("text-decoration", "none"),
                t(".hulkapps-summary-line-discount-code").html(""),
                t(".after_discount_price").html(""),
                t(".hulkapps_discount_hide").after("<span class='hulkapps-summary-line-discount-code'><span class='discount-tag'>" + e.discount_code + "<span class='close-tag'></span></span>Free Shipping")) : e.discount_code && l <= 0 && t(".discount_code_box").is(":visible") ? (t(i).html(e.original_price_total),
                t(".hulkapps_discount_hide").after("<span class='hulkapps_summary'>" + e.discount_code + " discount code isn’t valid for the items in your cart</span>"),
                t(".hulkapps_discount_code").val(""),
                t(i).html(e.original_price_total),
                t(i).css("text-decoration", "none"),
                t(".hulkapps-summary-line-discount-code").html(""),
                t(".after_discount_price").html(""),
                localStorage.removeItem("discount_code")) : e.discount_code && t(".discount_code_box").is(":visible") ? (t(".discount_code_box").find(".hulkapps_summary").html(""),
                t(".hulkapps-summary-line-discount-code,.after_discount_price").remove(),
                t(".hulkapps_discount_hide").after("<span class='hulkapps-summary-line-discount-code'><span class='discount-tag'>" + e.discount_code + "<span class='close-tag'></span></span><span class='hulkapps_with_discount'> -" + e.with_discount + "</span></span><span class='after_discount_price'><span class='final-total'>Total</span>" + e.final_with_discounted_price + "</span>"),
                t(i).html(e.original_price_total),
                e.original_price_total != e.final_with_discounted_price && t(i).css("text-decoration", "line-through"),
                t(".hulkapps-cart-total").remove()) : (t(i).html(e.original_price_total),
                t(i).css("text-decoration", "none"),
                t(".hulkapps-summary-line-discount-code").html(""),
                t(".after_discount_price").html(""),
                t(".discount_code_box").find(".hulkapps_summary").html(""))
            }
            ))
        }
        ,
        window.hulkappsCheckout = function(e) {
            if (window.hulk_inventory_arr && window.hulk_inventory_arr.length > 0)
                return !1;
            var a = {};
            null != e && 1 == e.shipping_status && (a = {
                price: e.shipping_price,
                title: e.shipping_method
            });
            var i = localStorage.getItem("discount_code");
            t.getJSON("/cart.js", {
                _: (new Date).getTime()
            }, (function(e) {
                e && e.item_count > 0 && (window.hulkapps.cart = e,
                new Promise(( (e, a) => {
                    t.ajax({
                        url: "/cart?view=hulkapps_cart_collections.json",
                        success: function(a) {
                            try {
                                if (a) {
                                    var i = JSON.parse(a);
                                    if (i) {
                                        var o = i.items;
                                        t.each(o, (function(t, e) {
                                            window.hulkapps.cart_collections[e.variant_id] = e.product_collections
                                        }
                                        ))
                                    }
                                }
                                e(window.hulkapps.cart_collections)
                            } catch (t) {
                                e(window.hulkapps.cart_collections)
                            }
                        },
                        error: function(t) {
                            e(window.hulkapps.cart_collections)
                        }
                    })
                }
                )).then((function(e) {
                    window.hulkapps.cart_collections = e;
                    var o = Shopify.locale;
                    const n = {
                        cart_json: window.hulkapps,
                        store_id: window.hulkapps.store_id,
                        discount_code: i,
                        cart_collections: JSON.stringify(window.hulkapps.cart_collections),
                        order_app: a,
                        customer_tags: null != window.hulkapps.customer ? window.hulkapps.customer.tags.split(",") : "",
                        draft_order_language: null != o ? o : "",
                        default_address: null != window.hulkapps.customer && null != window.hulkapps.customer.default_address ? window.hulkapps.customer.default_address : "",
                        currency_rate: window.Shopify.currency.rate
                    };
                    window.Shopify && window.Shopify.currency && window.Shopify.currency.active && (n.currency_code = window.Shopify.currency.active),
                    t.ajax({
                        type: "POST",
                        url: window.hulkapps.po_url + "/store/create_draft_order",
                        data: n,
                        crossDomain: !0,
                        success: function(t) {
                            if ("string" == typeof t) {
                                try {
                                    var e = localStorage.getItem("lb-upsell-offer-discount");
                                    e && (e = JSON.parse(e)) && e.code && (t.includes("?") ? t += `&discount=${e.code}` : t += `?discount=${e.code}`)
                                } catch (t) {}
                                window.location.href = t
                            } else
                                window.location.href = "/checkout";
                            localStorage.removeItem("discount_code")
                        }
                    })
                }
                )).catch((function(t) {
                    console.error(t)
                }
                )))
            }
            ))
        }
        ;
        var o = []
          , n = document.querySelectorAll(".single-option-selector,.swatch-element input[type='radio'],.single-option-selector__radio, select[data-option='option1'], select[data-option='option1']:checked, select[data-option='option2'], select[data-option='option1']:checked, select[data-option='option3'], select[data-option='option3']:checked, select[data-index='option1'], select[data-index='option1']:checked, select[data-index='option2'], select[data-index='option1']:checked, select[data-index='option3'], select[data-index='option3']:checked, ul li div[swatch-option='option1'], input[type='radio']");
        n.forEach((function(e) {
            e.addEventListener("change", (e => {
                o = [],
                n.forEach((function(t) {
                    var e = !!t.options && t.options[t.options.selectedIndex].selected;
                    (t.checked || e) && o.push(t.value)
                }
                )),
                o = o.join(" / "),
                Object.keys(hulk_variants).forEach((function(t) {
                    var a = hulk_variants[t];
                    if (a.options.length < 2) {
                        if (selected_variant_title = e.target.value.toString().toLowerCase(),
                        (i = a.title.toString().toLowerCase()).trim() == selected_variant_title.trim()) {
                            a.id;
                            window.hulkapps.product.selected_variant = a.id,
                            product_price = a.price,
                            window.hulkapps.product.selected_variant_price = product_price
                        }
                    } else {
                        selected_variant_title = o.toString().toLowerCase();
                        var i = a.title.toString().toLowerCase();
                        if (selected_variant_title.includes(i)) {
                            a.id;
                            window.hulkapps.product.selected_variant = a.id,
                            product_price = a.price,
                            window.hulkapps.product.selected_variant_price = product_price
                        }
                    }
                    document.querySelector('script[type="application/json"][data-variant]') && updateSelectedVariant()
                }
                )),
                window.need_varaint_change && 1 == window.need_varaint_change && window.productPageAjax(t)
            }
            ))
        }
        )),
        window.productPageAjax = function(t, e="product") {
            window.cproduct_price && (product_price = window.cproduct_price);
            var a = e;
            t.ajax({
                type: "POST",
                url: window.hulkapps.po_url + "/api/v2/store/get_all_relationships",
                data: {
                    hpage_type: a,
                    pid: window.hulkapps.product_id,
                    store_id: window.hulkapps.store_id,
                    tags: window.hulkapps.product.tags,
                    vendor: window.hulkapps.product.vendor,
                    ptype: window.hulkapps.product.type,
                    customer_tags: null != window.hulkapps.customer ? window.hulkapps.customer.tags.split(",") : "",
                    product_collections: window.hulkapps.product_collections,
                    shopify_currency_rate: window.hulkapps_shopify_rate
                },
                sync: !1,
                crossDomain: !0,
                success: function(e) {
                    if (window.$first_add_to_cart_el && window.$first_add_to_cart_el.removeAttr("disabled"),
                    "string" != t.type(e)) {
                        var i = "";
                        let vt = {};
                        if (window.store_created_date = e.created_at_date,
                        window.hulk_po_plan_id = e.plan_id,
                        window.hulk_po_plans_features = e.plans_features,
                        window.hulk_po_is_on_trial_period = e.is_on_trial_period,
                        (checkPlan("conditional_logic", "boolean") || 0 == checkPlan("conditional_logic", "boolean") && 1 == oldStore()) && null != e.condition) {
                            i += "<div id='conditional_rules' style='display:none'>";
                            t.each(e.condition, (function(a, o) {
                                var n = o.id
                                  , l = hulkapps_jQuery.parseJSON(o.conditions);
                                if ("OR" == l.apply_rule)
                                    var s = "0";
                                else
                                    s = "1";
                                i = i + "<div id='conditional_logic_" + n + "' name='conditional_logic_" + n + "' data-verify-all='" + s + "' style='display:none'>",
                                t.each(l.rules, (function(t, a) {
                                    var o = parseInt(a.option);
                                    if (e.option_id_array.indexOf(o) >= 0) {
                                        if (1 == parseInt(a.rule_type))
                                            var l = "==";
                                        else
                                            l = "!=";
                                        i += `<div name='conditional_logic_${n}' data-field-num='${o}' data-verify-all='${s}' class='step_1' data-conchildren-value='**value11**${l}${a.option_val}'>**value11**${l}${a.option_val}</div>`
                                    }
                                }
                                )),
                                i += "</div>";
                                let p = [];
                                t.each(l.actions, (function(t, a) {
                                    var i = parseInt(a.option);
                                    if (p.push(i),
                                    e.option_id_array.indexOf(i) >= 0) {
                                        if (1 == parseInt(a.action_type))
                                            var o = "show";
                                        else
                                            o = "hide";
                                        " conditional_logic_" + n + "_" + o;
                                        var l = "condition_" + o + " conditional";
                                        e.hide_show_array[i] = l
                                    }
                                }
                                )),
                                vt[n] = p
                            }
                            )),
                            i += "</div>"
                        }
                        var o = e.cart_selectors
                          , n = 0 != e.options_title.title_text.length ? e.options_title.title_text : "Choose Your Product Options:"
                          , l = ".hulkapps_option_title{";
                        l += 0 != e.options_title.title_padding.length ? "padding: " + e.options_title.title_padding + "px;" : "padding: 15px;",
                        l += 0 != e.options_title.title_font_size.length ? "font-size: " + e.options_title.title_font_size + "px;" : "font-size: 16px;",
                        l += 0 != e.options_title.title_text_align.length ? "text-align: " + e.options_title.title_text_align + ";" : "text-align: left;",
                        l += 0 != e.options_title.title_background.length ? "background-color: " + e.options_title.title_background + ";" : "background-color: #ffffff;",
                        l += 0 != e.options_title.title_border.length ? "border: 1px solid " + e.options_title.title_border + ";" : "border: 1px solid #000000;",
                        l += 0 != e.options_title.title_font_color.length ? "color: " + e.options_title.title_font_color + ";" : "color:#000000;",
                        l += 1 == parseInt(e.options_title.title_bold) ? "font-weight:bold;" : "font-weight:normal;",
                        l += 1 == parseInt(e.options_title.title_display) ? "" : "display:none;",
                        l += "border-bottom: none;",
                        l += "}";
                        e.options_container_style.enable_tooltip;
                        var s = e.options_container_style.enable_helptext
                          , p = "#hulkapps_option_list_" + e.pid + "{";
                        p += 0 != e.options_container_style.background_color.length ? "background-color: " + e.options_container_style.background_color + ";" : "background-color: #fff;",
                        p += 0 != e.options_container_style.border_color.length ? "border: 1px solid " + e.options_container_style.border_color + ";" : "border: 0 none;",
                        p += 0 != e.options_container_style.padding.length ? "padding: " + e.options_container_style.padding + "px;" : "padding: 10px;",
                        p += "}.hulkapps_option {width: 100%;display: block;transition: 0.3s all;",
                        p += 0 != e.options_container_style.spacing_between_options.length ? "padding-bottom: 0px; margin-bottom: " + e.options_container_style.spacing_between_options + "px;" : "padding-bottom: 0; margin-bottom: 6px;",
                        p += 0 != e.options_container_style.line_between_options.length ? "border-bottom: 1px solid " + e.options_container_style.line_between_options + ";" : "",
                        p += "}";
                        var r = e.options_name_style.option_name_inline
                          , d = e.display_settings.formula_option_name_inline;
                        window.change_button_text = e && e.display_settings && void 0 !== e.display_settings.change_button_text && "" !== e.display_settings.change_button_text.trim() ? e.display_settings.change_button_text : "Change",
                        window.select_button_text = e && e.display_settings && void 0 !== e.display_settings.select_button_text && "" !== e.display_settings.select_button_text.trim() ? e.display_settings.select_button_text : "Select";
                        var _ = ".hulkapps_option_name {";
                        _ += 0 != e.options_name_style.option_name_width.length ? "width: " + e.options_name_style.option_name_width + "px;" : "width: 180px;",
                        _ += 0 != e.options_name_style.option_name_font_size.length ? "font-size: " + e.options_name_style.option_name_font_size + "px;" : "font-size: 14px;",
                        _ += 0 != e.options_name_style.option_name_text_align.length ? "text-align: " + e.options_name_style.option_name_text_align + ";" : "text-align: left;",
                        _ += 0 != e.options_name_style.font_color.length ? "color: " + e.options_name_style.font_color + ";" : "color: #424242;",
                        _ = (_ += 1 == parseInt(e.options_name_style.on_title_bold) ? "font-weight: bold;" : "font-weight: normal;") + "min-width: " + e.options_name_style.option_name_width + "px;padding-right: 15px;box-sizing: border-box;-webkit-box-sizing: border-box;-moz-box-sizing: border-box;-ms-box-sizing: border-box;vertical-align: top;}";
                        e.option_values_style.ov_padding,
                        e.option_values_style.ov_width,
                        e.option_values_style.spacing_left_of_values;
                        var u = e.option_values_style.single_line
                          , c = ".hulkapps_option_value {";
                        c += "width:100%;min-width: 100%;text-align: left;vertical-align: top;}",
                        c += ".hulkapps_option .hulkapps_option_value, .pn_render .hulkapps_option_child, .et_render .hulkapps_option_child, .tb_render .hulkapps_option_child, .ta_render .hulkapps_option_child, .fu_render .hulkapps_option_child, .dd_render .hulkapps_option_child, .dd_multi_render .hulkapps_option_child, .nf_render .hulkapps_option_child, .dp_render .hulkapps_option_child, .dt_render .hulkapps_option_child{",
                        c += 0 != e.option_values_style.ov_font_size.length ? "font-size: " + e.option_values_style.ov_font_size + "px !important;" : "",
                        c += 0 != e.option_values_style.ov_font_color.length ? "color: " + e.option_values_style.ov_font_color + " !important;" : "",
                        c += null != e.option_values_style.ov_font_weight && 1 == parseInt(e.option_values_style.ov_font_weight) ? "font-weight:bold;" : "font-weight:normal;",
                        c += null != e.option_values_style.ov_text_align ? "text-align: " + e.option_values_style.ov_text_align + " !important;" : "",
                        c += "}";
                        var h = ".recommended_btn, recommended_btn a{";
                        h += null != e.recomodation_setting && null != e.recomodation_setting.recomodation_font_size ? "font-size: " + e.recomodation_setting.recomodation_font_size + "px !important;" : "",
                        h += null != e.recomodation_setting && null != e.recomodation_setting.recomodation_font_color ? "color: " + e.recomodation_setting.recomodation_font_color + " !important;" : "",
                        h += "}";
                        var v = ".hulkapps_helptext,.hulkapps_helptext a{";
                        v += null != e.option_help_text_style && null != e.option_help_text_style.option_help_text_font_size ? "font-size: " + e.option_help_text_style.option_help_text_font_size + "px !important;" : "",
                        v += null != e.option_help_text_style && null != e.option_help_text_style.option_help_text_font_color ? "color: " + e.option_help_text_style.option_help_text_font_color + "!important;" : "",
                        v += null != e.option_help_text_style && 1 == parseInt(e.option_help_text_style.on_help_text_bold) ? "font-weight: bold;" : "font-weight: normal;",
                        v += "}";
                        var m = ".hulkapps-tooltip .hulkapps-tooltip-inner,.hulkapps-tooltip .hulkapps-tooltip-inner a{";
                        m += null != e.option_tooltip_style && null != e.option_tooltip_style.option_tooltip_font_size ? "font-size: " + e.option_tooltip_style.option_tooltip_font_size + "px !important;" : "",
                        m += null != e.option_tooltip_style && null != e.option_tooltip_style.option_tooltip_font_color ? "color: " + e.option_tooltip_style.option_tooltip_font_color + "!important;" : "",
                        m += null != e.option_tooltip_style && null != e.option_tooltip_style.option_tooltip_background_color ? "background-color: " + e.option_tooltip_style.option_tooltip_background_color + "!important;" : "",
                        m += "}",
                        m += ".hulkapps-tooltip .hulkapps-tooltip-inner:after{",
                        m += null != e.option_tooltip_style && null != e.option_tooltip_style.option_tooltip_background_color ? "border-color: " + e.option_tooltip_style.option_tooltip_background_color + " transparent transparent transparent !important;" : "",
                        m += "}",
                        m += ".hulkapps-tooltip .hulkapps-tooltip-inner.swatch-tooltip p,.hulkapps-tooltip .hulkapps-tooltip-inner.multiswatch-tooltip p{",
                        m += null != e.option_tooltip_style && null != e.option_tooltip_style.option_tooltip_font_color ? "color: " + e.option_tooltip_style.option_tooltip_font_color + "!important;" : "",
                        m += "}";
                        var f = 0 != e.option_values_style.ov_font_size.length ? parseInt(e.option_values_style.ov_font_size) - 2 : 14
                          , k = ".has-float-label .floating_label{";
                        k += 0 != e.option_values_style.ov_font_size.length ? "font-size: " + e.option_values_style.ov_font_size + "px;" : "font-size: 14px;",
                        k += 0 != e.option_values_style.ov_font_color.length ? "color: " + e.option_values_style.ov_font_color + ";" : "color: #424242;",
                        k += null != parseInt(e.option_values_style.ov_font_weight) && 1 == parseInt(e.option_values_style.ov_font_weight) ? "font-weight: bold;" : "font-weight: normal;",
                        k += "}",
                        k += ".has-float-label .hulkapps_option_value input:focus-visible ~ .floating_label, .has-float-label .hulkapps_option_value textarea:focus ~ .floating_label, .has-float-label .hulkapps_option_value textarea:focus-visible ~ .floating_label, .has-float-label .hulkapps_option_value input:focus ~ .floating_label, .has-float-label .hulkapps_option_value textarea:focus-within ~ .floating_label, .has-float-label .hulkapps_option_value input:focus-within ~ .floating_label,  .has-float-label .hulkapps_option_value textarea:active ~ .floating_label, .has-float-label .hulkapps_option_value input:active ~ .floating_label,.has-float-label .hulkapps_option_value input.textbox_selected ~ .floating_label, .has-float-label .hulkapps_option_value input.numberfield_selected ~ .floating_label,.has-float-label .hulkapps_option_value input.emailbox_selected ~ .floating_label,.has-float-label .hulkapps_option_value textarea.textbox_selected ~ .floating_label, .has-float-label .hulkapps_option_value textarea.textarea_selected ~ .floating_label, .has-float-label,.hulkapps_option_value select ~ label.floating_label{",
                        k += 0 != e.option_values_style.ov_font_size.length ? "font-size: " + f + "px !important;" : "font-size: 14px;",
                        k += "}";
                        var $ = e.advanced_users.custom_js
                          , y = e.advanced_users.custom_css
                          , g = parseInt(e.swatch_settings.swatch_width)
                          , w = parseInt(e.swatch_settings.swatch_height)
                          , b = e.swatch_settings.tooltip_position
                          , x = e.swatch_settings.tooltip_contains
                          , C = parseInt(e.swatch_settings.tooltip_display)
                          , q = parseInt(e.swatch_settings.round_corners)
                          , S = parseInt(e.swatch_settings.enable_swatch_images)
                          , F = parseInt(e.swatch_settings.enable_swatch_with_text)
                          , I = (g = "" == g || g < 0 ? "width:35px;" : "width:" + g + "px;",
                        w = "" == w || w < 0 ? "height:35px;" : "height:" + w + "px;",
                        b = "top" == b ? "top" : "bottom",
                        q = 1 == q ? "-webkit-border-radius: 50%;-moz-border-radius: 50%;border-radius: 50%;" : "",
                        e.swatch_settings.swatch_selected_border)
                          , j = null != I ? "border-color: " + I + " !important" : " #000000 !important"
                          , P = 0 != e.button_option_settings.button_option_background.length ? "background-color: " + e.button_option_settings.button_option_background + ";" : "#ffffff"
                          , A = 0 != e.button_option_settings.button_option_font_color.length ? "color: " + e.button_option_settings.button_option_font_color + ";" : "#777777"
                          , L = 0 != e.button_option_settings.button_option_border_color.length ? "border-color: " + e.button_option_settings.button_option_border_color + ";" : "#777777"
                          , O = null != e.label_setting && "blocklable" == e.label_setting.lable_display || null == e.label_setting ? "" : e.label_setting.lable_display;
                        if ("floatingLabels" == O)
                            var E = "has-float-label";
                        if ("inlineLabels" == O)
                            E = "has-inline-label";
                        var T = e.premium_option_settings.update_total_text
                          , D = null == e.premium_option_settings.amount_note_display ? 1 : e.premium_option_settings.amount_note_display;
                        if (null != e.premium_option_settings.price_setting)
                            D = "price_addtional_charge" == e.premium_option_settings.price_setting || "price_total_charge" == e.premium_option_settings.price_setting ? "1" : "0";
                        var N = null == e.premium_option_settings.disabled_option_price ? 0 : e.premium_option_settings.disabled_option_price
                          , z = e.currency_symbol;
                        if (e.is_enabled_shopify_default_currency) {
                            var Q = currency_conversion(0);
                            e.currency_symbol = Q.replace(/[0-9,.\s]/g, "").trim()
                        }
                        window.is_enabled_shopify_default_currency = e.is_enabled_shopify_default_currency,
                        window.rounding_price = e.is_price_rounding,
                        currency_symbol = e.currency_symbol,
                        window.hulk_po_currency_symbol = e.currency_symbol,
                        display_price_setting = e.premium_option_settings;
                        var M = e.premium_option_settings.post_total_text
                          , B = e.premium_option_settings.total_container_background_color
                          , J = e.premium_option_settings.total_container_border_color
                          , R = e.premium_option_settings.total_container_font_color
                          , U = e.premium_option_settings.total_container_price_color
                          , H = "#option_total {";
                        H += "" !== B ? "background: none repeat scroll 0 0 " + B + ";" : "background: none repeat scroll 0 0 #fff;",
                        H += "" !== J ? "border:1px solid " + J + ";" : "border:1px solid #000000;",
                        H += "" !== R ? "color: " + R + ";" : "color: #000;",
                        H += "}#formatted_option_total {",
                        H += "" !== U ? "color: " + U + ";" : "color: #000;",
                        H += "}";
                        var V = 0 == parseInt(u) ? "0px" : "10px"
                          , X = e.popup_button_settings
                          , K = ".hulkSaveBtn { background-color: " + X.button1_background_color + "; color: " + X.button1_font_color + ";border: " + X.button1_border_width + "px solid " + X.button1_border_color + "}"
                          , Y = ".hulkCancelBtn { background-color: " + X.button2_background_color + "; color: " + X.button2_font_color + ";border: " + X.button2_border_width + "px solid " + X.button2_border_color + "} .hulkresetBtn { background-color: " + X.button2_background_color + "; color: " + X.button2_font_color + ";border: " + X.button2_border_width + "px solid " + X.button2_border_color + "} ";
                        t(".hulkSaveBtn").text(X.button1_text),
                        t(".hulkCancelBtn").text(X.button2_text);
                        var Z = null != e.image_thumbnail_parents_selector ? e.image_thumbnail_parents_selector : ""
                          , W = "";
                        null != Z && "" != Z && (image_parent_selector = Z.split(","),
                        image_parent_selector.forEach((function(t, e, a) {
                            e === a.length - 1 ? W += t + "  img" : W += t + "  img,"
                        }
                        ))),
                        window.image_parent = W;
                        var G = e.button_option_settings.button_option_selected_background
                          , tt = e.button_option_settings.button_option_selected_border_color
                          , et = e.button_option_settings.button_option_selected_font_color
                          , at = l + p + _ + c + H + ("#hulkapps_custom_options_" + e.pid + "{clear: both}#hulkapps_options_" + e.pid + "{margin:15px 0;}#hulkapps_option_list_" + e.pid + " select{width:100%;padding-top: 12px;padding-bottom: 12px}.popup_detail{position: fixed;background-color: #F7F7F7;padding: 15px;top: 50%;left: 50%;transform: translate(-50%, -50%);justify-content: space-between;z-index: 3;min-width: 300px;max-width: fit-content;overflow-y: auto;max-height: 300px;}.popup_detail a{cursor: pointer;}.popup_detail img{width: 15px;height: 15px;margin: 5px;}.popup_detail p{margin:0;}.overlay-popup{position: fixed;display: none;width: 100%;height: 100%;top: 0;left: 0;bottom: 0;background-color: rgba(0,0,0,0.5);z-index: 2;}.popup_render{margin-bottom:0!important;display:flex;align-items:center!important}.popup_render .hulkapps_option_value{min-width:auto!important}.popup_render a{margin-left: 4px;text-decoration:underline!important;transition:all .3s!important;font-weight: normal !important;}.popup_render a:hover{color:#6e6e6e}.cut-popup-icon{display:inline-flex;align-items:center}.cut-popup-icon-span{display:inline-flex}.des-detail{font-weight: normal;}#hulkapps_option_list_" + e.pid + " input[type='text']{width:100%;border-radius:0}#hulkapps_option_list_" + e.pid + " input,#hulkapps_option_list_" + e.pid + " textarea,#hulkapps_option_list_" + e.pid + " select{border:1px solid #DADADA;box-shadow: none;-webkit-appearance: none;padding:10px;min-height: 36px;}#hulkapps_option_list_" + e.pid + " .validation_error{color:#FF0808;background-color:#FFF8F7;border-style:solid;border-width:1px;border-color:#FFCBC9;border-bottom: 1px solid #ffcbc9;padding: 8px 8px ;display: inline-block;margin-top: 2px;}#hulkapps_option_list_" + e.pid + " .validation_error .hulkapps_option_value{color:#FF0808}#hulkapps_option_list_" + e.pid + " .validation_error .hulkapps_option_name{color:#FF0808}.hulkapps_option_value:first-child{display:flex;align-items: center;} .hulkapps_option_value:first-child span{display: flex;padding-right: 10px;}.hulkapps_option_value:first-child a{cursor: pointer;} .hulkapps_helptext{color: #000 !important;}.hulkapps_full_width{width:100%;display:block;}.hulkapps_check_option,.hulkapps_radio_option{display:block;margin-right:0;font-weight:normal !important;}.single_line .hulkapps_option_value .hulkapps_check_option,.single_line .hulkapps_option_value .hulkapps_radio_option{display:inline-flex;margin-right:20px;font-weight:normal; align-items: center; }#hulkapps_option_list_" + e.pid + " input[type='checkbox']{margin-right: 5px;vertical-align: baseline;min-height:auto; height: auto;display: none;-webkit-appearance: checkbox;-moz-appearance: checkbox;appearance: checkbox;}.hulkapps_check_option input[type='checkbox']{margin-right:5px;}#hulkapps_option_list_" + e.pid + " input[type='radio']{margin-right:5px;vertical-align:baseline;display: none;}i.hulkapps_tooltip_identifier{color:rgb(255, 255, 255);border-radius:12px;font-size:10px;margin-right:6px;margin-left:4px;padding:0px 4px;background:#000000}span.hulkapps_option_name_additional_info{position:relative}span.hulkapps_option_name_additional_info .hulkapps_tool_tip{display:none}span.hulkapps_option_name_additional_info:hover .hulkapps_tool_tip{content:attr(data-additional-info);padding:4px 8px;color:#fff;position:absolute;left:0;bottom:160%;z-index:20px;-moz-border-radius:5px;-webkit-border-radius:5px;border-radius:5px;display:block;background:#000000;width:150px}span.hulkapps_option_name_additional_info:hover:after{display:block}i.hulkapps_tooltip_identifier:before{content:'?';font-style:normal}#formatted_option_total{font-weight:bold;margin:0 7px}.td_render .hulkapps_option_name.full_name{float:none;width:auto}.hulkapps_option.full_width .hulkapps_option_name{width:100%;}.hulkapps_option.full_width .hulkapps_option_value{width:100%;display:block;}.hulkapps_option.full_width .hulkapps_option_name{padding-bottom:5px}.hulkapps_option:after{content:'';clear:both;display:block}.hulkapps_option_name a:link {color: grey;text-decoration: none;font-weight: normal;}.hulkapps_option_name a:hover {color: rgb(93, 156, 236);background: transparent;}.hulkapps_swatch_option .hulkapps_option_child:after{border: 1px solid #DADADA;cursor: pointer;content:'';position:absolute;top:-4px;right:-4px;bottom:-4px;left:-4px;" + q + "}.hulkapps_mswatch_option .hulkapps_option_child:after{border: 1px solid #DADADA;cursor: pointer;content:'';position:absolute;top:-4px;right:-4px;bottom:-4px;left:-4px; " + q + "}.hulkapps_radio_option .radio_selected{border: 2px solid #0090FA;background:#0090FA;color:#fff;}.radio_div{border: 2px solid #eee;padding: 8px 20px;padding: 6px 12px;}.radio_div:hover{border: 2px solid #0090FA;cursor:pointer;}.tooltip.in{opacity:1 !important;}#option_display_total_format{padding-left:5px;}.hulkapps_swatch_option .tooltip-inner{padding: 0px 5px !important;}.hulkapps_check_option,.hulkapps_radio_option{margin-right:" + V + "}.hulkapps_swatch_option,.hulkapps_mswatch_option{ margin-right:10px !important; display: inline-block;vertical-align: middle;}.hulkapps-tooltip.tooltip-left-pos .hulkapps-tooltip-inner.swatch-tooltip{left: 0 !important;right: auto !important;}.hulkapps-tooltip.tooltip-left-pos .hulkapps-tooltip-inner.swatch-tooltip:after{right: auto !important;left: 10px !important;}.hulkapps-tooltip.tooltip-right-pos .hulkapps-tooltip-inner.swatch-tooltip{right: 0 !important;left: auto !important;}.hulkapps-tooltip.tooltip-right-pos .hulkapps-tooltip-inner.swatch-tooltip:after{left: auto !important;right: 10px !important;}.hulkapps-tooltip.tooltip-center-pos .hulkapps-tooltip-inner.swatch-tooltip{left: 50% !important;transform: translateX(-50%);}.hulkapps-tooltip.tooltip-center-pos .hulkapps-tooltip-inner.swatch-tooltip:after{left: 50% !important;transform: translateX(-50%);}.hulkapps_mswatch_option .swatch_selected:after, .hulkapps_swatch_option .swatch_selected:after{" + j + "}.phone_number{padding-left: 50px !important;}#option_total{padding:3px 6px;}.hulkapps-tooltip.tooltip-left-pos .hulkapps-tooltip-inner.multiswatch-tooltip{left: 0 !important;right: auto !important;}.hulkapps-tooltip.tooltip-left-pos .hulkapps-tooltip-inner.multiswatch-tooltip:after{right: auto !important;left: 10px !important;}.hulkapps-tooltip.tooltip-right-pos .hulkapps-tooltip-inner.multiswatch-tooltip{right: 0 !important;left: auto !important;}.hulkapps-tooltip.tooltip-right-pos .hulkapps-tooltip-inner.multiswatch-tooltip:after{left: auto !important;right: 10px !important;}.hulkapps-tooltip.tooltip-center-pos .hulkapps-tooltip-inner.multiswatch-tooltip{left: 50% !important;transform: translateX(-50%);}.hulkapps-tooltip.tooltip-center-pos .hulkapps-tooltip-inner.multiswatch-tooltip:after{left: 50% !important;transform: translateX(-50%);}.hulkapps_swatch_option, .hulkapps_mswatch_option{margin-bottom: 10px !important;}.hulkapps_buton_option .hulkapps_option_child{ width: auto;min-height: 36px;padding: 15px;border: 1px solid;border-radius: 0;line-height: 1.13;font-weight: 400;display: flex;justify-content: center;align-items: center;margin-right: 0;margin-bottom: 8px;}.button_selected {color: " + et + " !important;background-color: " + G + " !important;border-color: " + tt + " !important;font-weight: 400 !important;}.hulkapps_option_set input::placeholder,.hulkapps_option_set textarea::placeholder  {color: #a9a9a9;font-size: 16px !important;font-weight: 700;font-family: sans-serif;}.conditional, .is_hulk_hide{display:none !important}.has-float-label .hulkapps_option_name{display: none !important}.has-float-label .hulkapps_option_value{display: block;width: 100%}.has-inline-label .hulkapps_option_name{display: none !important}.has-inline-label .hulkapps_option_value{display: block;width: 100%}.has-float-label .hulkapps_option_value{ position: relative;}.has-float-label .hulkapps_option_value .floating_label{position: absolute;top: 24%;left: 10px;}input:focus .floating_label { position: absolute;top: 30%;left: 10px;}.has-float-label .hulkapps_option_value textarea,.has-float-label .hulkapps_option_value input,.has-float-label .hulkapps_option_value select{ position: relative;z-index: 1;background-color: transparent;}.has-float-label .hulkapps_option_value .floating_label {position: absolute;top: 24%;left: 10px;transition: all .2s;}.has-float-label .hulkapps_option_value select ~ label.floating_label {cursor: text;opacity: 1;transition: all .2s;top: -0.5em !important;z-index: 3;line-height: 1;padding: 0 1px;left: 10px;position: absolute; z-index: 2;}.has-float-label .hulkapps_option_value input:not(:focus) ~ .floating_label,.has-float-label .hulkapps_option_value textarea:not(:focus) ~ .floating_label {opacity: 1;top: 0.3em;}.has-float-label .hulkapps_option_value input:focus ~ .floating_label,.has-float-label .hulkapps_option_value textarea:focus ~ .floating_label{top: -0.9em !important;z-index: 2;}.has-float-label .hulkapps_option_value .floating_label:after,.has-float-label .hulkapps_option_value input:focus ~ .floating_label:after,.has-float-label .hulkapps_option_value textarea:focus ~ .floating_label:after {content: '';display: block; position: absolute; background: #F7F7F7;height: 2px;top: 50%;left: -0.2em;right: -0.2em;z-index: -1;}.recommended_detail{    position: fixed;z-index: 9999;padding-top: 100px;left: 0;top: 0;width: 100%;height: 100%;background-color: rgba(0,0,0,0.4);overflow: auto;}.recomodation-title { display: flex;padding:20px;}.recomodation_option_desc{ background-color: #fefefe;margin: auto;border: 1px solid #888;max-width: 600px;width: 100%;padding: 20px}.recommended_close_link{ color: #aaaaaa;font-size: 28px;line-height: 18px;float: left;font-weight: lighter;}.recomodation_option_detail{ padding: 10px;padding: 10px;background-color: #f7f7f7;border: 1px solid #d1d1d1;padding: 20px;} #recommended_detail .hulkapps-tooltip-inner,#recommended_detail .hulkapps_option_name .hulkapps-tooltip{display:none;}#recommended_detail input[type='checkbox'],#recommended_detail input[type='radio'] {display: none;}#recommended_detail label,#recommended_detail ul {pointer-events: none;}.font_preview{padding-top: 20px;}.font_preview textarea{ font-size: 40px;}") + y + v + m + k + h + K + Y
                          , it = ($ = "<script>(function($) {$('.hulkapps_swatch_option, .hulkapps_mswatch_option').mouseover(function() {var x = $(this).find('.hulkapps-tooltip ').position();var right = $(window).width() - x.left - $(this).find('.hulkapps-tooltip ').width();if(x.left < 205){$(this).find('.hulkapps-tooltip ').addClass('tooltip-left-pos');}if(right < 160){$(this).find('.hulkapps-tooltip ').addClass('tooltip-right-pos');}});$(window).width()<=768&&$('.hulkapps-tooltip').each(function(){var t=$(this).position(),i=$(window).width()-t.left-$(this).width(),o=t.left-i;o<50&&o>-50?$(this).addClass('tooltip-center-pos'):t.left<i?$(this).addClass('tooltip-left-pos'):i<t.left&&$(this).addClass('tooltip-right-pos')});" + e.advanced_users.custom_js + "}(hulkapps_jQuery))<\/script>",
                        null != e.recomodation_setting && null != e.recomodation_setting.recomodation_text ? e.recomodation_setting.recomodation_text : "")
                          , ot = null != e.recomodation_setting && null != e.recomodation_setting.recomodation_background_color ? e.recomodation_setting.recomodation_background_color : ""
                          , nt = null != e.recomodation_setting && null != e.recomodation_setting.recomodation_font_size ? e.recomodation_setting.recomodation_font_size : ""
                          , lt = "<div id='hulkapps_options_" + e.pid + "' class='hulkapps_product_options'>";
                        lt = lt + "" + i + "<style>" + at + "</style>" + $,
                        window.hulk_inventory_text = null != e.display_settings && null != e.display_settings.inventory_text ? e.display_settings.inventory_text : "In stock",
                        window.hulk_out_of_stock_text = null != e.display_settings && null != e.display_settings.out_of_stock_text ? e.display_settings.out_of_stock_text : "Out of stock",
                        lt = (lt = lt + "<div class='hulkapps_option_title'>" + n + "</div>") + "<div id='hulkapps_option_list_" + e.pid + "' >",
                        "" !== D || 1 == parseInt(D) ? lt += "<input type='hidden' id='hulk_amount_dis' value='1'>" : lt += "<input type='hidden' id='hulk_amount_dis' value='0'>";
                        e.relationship;
                        var st = e.recomodation_options
                          , pt = "";
                        window.opt_with_otc = {},
                        window.is_hulk_required_options = !1;
                        var rt = []
                          , dt = "";
                        if (0 != e.relationship_option.length) {
                            if (e.recomodation_options.length > 0)
                                lt += "<div class='recommended_btn'><a class='recommended-link'><svg width='" + nt + "' height='" + nt + "' viewBox='0 0 9 8' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M4.06442 0.772788C4.25568 0.433466 4.74432 0.433465 4.93558 0.772787L5.81595 2.33474C5.8873 2.46132 6.0102 2.55061 6.15264 2.57935L7.91019 2.93397C8.29201 3.01101 8.443 3.47573 8.17939 3.76248L6.96594 5.08244C6.8676 5.18942 6.82066 5.33389 6.83734 5.47824L7.04319 7.25935C7.08791 7.64629 6.69259 7.9335 6.33841 7.7714L4.70808 7.02523C4.57595 6.96476 4.42405 6.96476 4.29192 7.02523L2.66159 7.7714C2.30741 7.9335 1.91209 7.64629 1.95681 7.25935L2.16266 5.47824C2.17934 5.33389 2.1324 5.18942 2.03406 5.08244L0.82061 3.76249C0.556997 3.47573 0.707994 3.01101 1.08981 2.93397L2.84736 2.57935C2.9898 2.55061 3.1127 2.46132 3.18405 2.33474L4.06442 0.772788Z' fill='" + ot + "'/></svg>" + it + "</a></div>";
                            if (lt += "<div class='hulkapps_option_set'>",
                            window.is_hulk_option_block) {
                                var _t = null;
                                ["input[name='add']", "button[name='add']", "#add-to-cart", "#AddToCartText", "#AddToCart", 'form[action$="/cart/add"] input[type="submit"]'].forEach((function(t) {
                                    var e = document.querySelectorAll(t);
                                    e.length,
                                    null === _t && e.length > 0 && (_t = e[0])
                                }
                                )),
                                _t && (window.product_form_id = _t.closest("form").getAttribute("id"))
                            }
                            var ut = window.product_form_id ? 'form="' + window.product_form_id + '"' : "";
                            t.each(e.relationship_option, (function(a, i) {
                                var o = parseInt(i[0]);
                                let n = [];
                                for (const [t,e] of Object.entries(vt))
                                    e.includes(o) && n.push(t);
                                var l = 3 == i.length || "required" == i[1] ? i[1] : "";
                                if ("true" == (3 == i.length ? i[2] : "true" == i[1] ? i[1] : "") && rt.push(parseInt(i[0])),
                                e.option_id_array.indexOf(o) >= 0) {
                                    var p = t.trim(e.option_associative_array[o].option_name)
                                      , _ = t.trim(e.option_associative_array[o].is_one_time_charge)
                                      , c = t.trim(e.option_associative_array[o].option_unique_name)
                                      , h = t.trim(e.image_color_position_class)
                                      , v = t.trim(e.image_color_shape_class)
                                      , m = t.trim(e.option_associative_array[o].is_multi_qty_popup)
                                      , f = e.option_associative_array[o].is_font_preview
                                      , k = t.trim(e.option_associative_array[o].font_preview_lable)
                                      , $ = e.option_associative_array[o].is_view_inventory;
                                    1 == $ && (window.hulk_multi_qty_selector = !0);
                                    var y = t.trim(e.option_associative_array[o].tooltip)
                                      , I = t.trim(e.option_associative_array[o].helptext)
                                      , j = t.trim(e.option_associative_array[o].id_name)
                                      , T = "" != j ? 'id="' + j + '"' : ""
                                      , D = t.trim(e.option_associative_array[o].class_name)
                                      , Q = t.trim(e.option_associative_array[o].placeholder)
                                      , M = t.trim(e.option_associative_array[o].tooltip_hyperlink)
                                      , B = t.trim(e.option_associative_array[o].helptext_hyperlink);
                                    if (y.length > 0) {
                                        var J = "<div class='hulkapps-tooltip'><span aria-describedby='tooltip_" + o + "' aria-label='" + y + "' tabindex='0' ><img src='" + window.hulkapps.po_url + "/tooltip.svg' style='width:15px;'></span><div class='hulkapps-tooltip-inner' id='tooltip_" + o + "' role='tooltip'>";
                                        if (M.length > 0)
                                            J = J + '<a href="' + M + '" target="_blank"> ' + y + "</a></div></div>";
                                        else
                                            J = J + y + "</div></div>"
                                    } else
                                        J = "";
                                    if (I.length > 0)
                                        if (B.length > 0)
                                            var R = '<span aria-label="' + I + '" tabindex="0" class="hulkapps_helptext"><a href="' + B + '" target="_blank"> ' + I + "</a></span>";
                                        else
                                            R = "<span  aria-label='" + I + "' tabindex='0'  class='hulkapps_helptext'>" + I + "</span>";
                                    else
                                        R = "";
                                    var U = e.option_associative_array[o].extra_field
                                      , H = e.option_associative_array[o].option_type
                                      , V = e.option_associative_array[o].restrict_past_date
                                      , X = e.option_associative_array[o].is_quantity_selector;
                                    if (checkPlan("switch_toggle", "boolean"))
                                        var K = e.option_associative_array[o].is_switch_toggle;
                                    else
                                        K = !1;
                                    var Y = e.option_associative_array[o].is_thumbnail_change
                                      , Z = e.option_associative_array[o].google_fonts
                                      , G = e.option_associative_array[o].google_font_with_price
                                      , tt = e.option_associative_array[o].default_selection_google_font
                                      , et = e.option_associative_array[o].default_selection_google_price
                                      , at = o
                                      , it = t.parseJSON(e.option_associative_array[o].values_json)
                                      , ot = e.hide_show_array[at] ? e.hide_show_array[at] : "";
                                    let a = ""
                                      , i = "";
                                    var nt = {};
                                    let vt = ""
                                      , se = "";
                                    n.forEach((o => {
                                        t.each(e.condition, (function(e, n) {
                                            let l = n.id;
                                            var s = hulkapps_jQuery.parseJSON(n.conditions);
                                            l == o && (t.each(s.actions, (function(t, e) {
                                                1 == parseInt(e.action_type) && ot.includes("condition_show") ? i = "show" : ot.includes("condition_hide") && (i = "hide"),
                                                i && checkPlan("enhanced_conditional_logic", "boolean") && e.action_option_value && (nt["conditional_logic_" + o + "_" + i] ? nt["conditional_logic_" + o + "_" + i].push(e.action_option_value.toString().trim()) : nt["conditional_logic_" + o + "_" + i] = [e.action_option_value.toString().trim()])
                                            }
                                            )),
                                            t.each(s.actions, (function(t, e) {
                                                return 1 == parseInt(e.action_type) && ot.includes("condition_show") ? (i = "show",
                                                a += " conditional_logic_" + o + "_" + i,
                                                !1) : ot.includes("condition_hide") ? (i = "hide",
                                                a += " conditional_logic_" + o + "_" + i,
                                                !1) : void 0
                                            }
                                            )))
                                        }
                                        ))
                                    }
                                    )),
                                    Object.keys(nt).length > 0 && (vt = a,
                                    se = ot,
                                    a = "",
                                    ot = "");
                                    var lt = ""
                                      , _t = ""
                                      , ct = "required" == l ? "required" : ""
                                      , ht = "required" == l;
                                    "required" == l && (window.is_hulk_required_options = !0);
                                    var mt = 0 == parseInt(r) ? "full_width" : ""
                                      , ft = "required" == l ? "<span class='hulkapps-required'> * </span>" : ""
                                      , kt = "1" == e.options_container_style.enable_tooltip ? J : ""
                                      , $t = "1" == s && R.length > 0 ? "<div class='hulkapps_helptext_div'>" + R + "</div>" : "";
                                    let pe = "_hin_" + c + "_hin_" + p;
                                    window.opt_with_otc[pe] = _,
                                    "multi_qty_selector" == H && (window.opt_with_otc[pe] = !0);
                                    var yt = rt.includes(o)
                                      , gt = "";
                                    if (checkPlan("image_change_based_on_multiple_option_value", "boolean") && 1 == yt && (gt = "image_change_with_multiple"),
                                    "dropdown" == H) {
                                        var wt = "";
                                        At = "<div class='hulkapps_option dd_render " + gt + " " + E + " " + a + " " + ct + " " + mt + " option_type_id_" + at + " " + ot + " " + D + "' " + T + " data-parent-id= " + at + ">",
                                        At += "<div role='textbox' aria-label='" + p + "' tabindex='0' aria-required='" + ht + "' class='hulkapps_option_name'>" + p + " " + ft + " " + kt + " " + $t + "</div>",
                                        At += "<div class='hulkapps_option_value'>",
                                        st.includes(o) && (recommended_select_html = "<select multiple='true' class='hulkapps_option_child hulkapps_option_" + at + "_visible hulkapps_full_width hulkapps_dd hulk_po_dropdown' data-parent='hulkapps_product_options' data-pid='" + e.pid + "' data-option-key='dd_" + at + "' id='" + at + "' >",
                                        wt += At + recommended_select_html),
                                        At += "<select aria-label='" + p + "' class='hulkapps_option_child hulkapps_option_" + at + "_visible hulkapps_full_width hulkapps_dd hulk_po_dropdown' data-parent='hulkapps_product_options' data-pid='" + e.pid + "' data-option-key='dd_" + at + "' id='" + at + "' >",
                                        "inlineLabels" == O && (Q = p),
                                        At += "" == Q ? "<option value='' class=" + a + ">Choose " + p + "</option>" : "<option value='' class=" + a + ">" + Q + "</option>";
                                        var bt = !1
                                          , xt = "none"
                                          , Ct = ""
                                          , qt = ""
                                          , St = "";
                                        t.each(it, (function(t, e) {
                                            var a = e[1]
                                              , i = e[9];
                                            "percentage_charge" == i && null != a && "" != a ? (a = parseFloat(product_price) / 100 / parseFloat(window.hulkapps_shopify_rate) * a / 100,
                                            a = parseFloat(a.toFixed(2)),
                                            window.need_varaint_change = !0) : "create_mulitplication_charge" == i && null != a && "" != a && (a = parseFloat(product_price) / 100 / parseFloat(window.hulkapps_shopify_rate) * a,
                                            a = parseFloat(a.toFixed(2)),
                                            window.need_varaint_change = !0);
                                            var o = null != a && "" != a ? " [ " + z + a + " ]" : ""
                                              , n = null != a && "" != a && 0 == N ? " (+" + z + a + ")" : ""
                                              , l = null != a && "" != a ? a : "0.00";
                                            if (is_enabled_shopify_default_currency && null != a && "" != a) {
                                                new_price = parseFloat(a) * parseFloat(window.hulkapps_shopify_rate),
                                                rounding_price ? new_price = Math.round(new_price) : new_price = new_price;
                                                n = null != new_price && "" != new_price && 0 == N ? " [ " + currency_conversion(new_price) + " ]" : ""
                                            }
                                            var s = e[4];
                                            1 == s && (qt = e[0].toString().trim() + o,
                                            xt = "block");
                                            var r = 1 == s ? "selected" : ""
                                              , d = "" != l ? "price-change" : ""
                                              , _ = ""
                                              , u = "";
                                            let h = "" != e[5] && null != e[5] ? e[5] : ""
                                              , v = parseInt(e[6]);
                                            var m = "";
                                            let f = "" != e[7] && null != e[7] ? e[7] : ""
                                              , k = "" != e[8] && null != e[8] ? e[8] : "";
                                            var y = "" != e[10] && null != e[10] ? e[10] : ""
                                              , g = "" != e[11] && null != e[11] && e[11]
                                              , w = ""
                                              , b = ""
                                              , x = "disabled";
                                            if (checkPlan("inventory_and_sku_management", "boolean") && ("true" == h.toString() && "true" != f.toString() && v <= 0 && ("true" == k.toString() ? (_ = "disabled",
                                            r = "") : (u = "is_hulk_hide",
                                            _ = "disabled",
                                            r = "")),
                                            "true" == h.toString() && (bt = !0),
                                            "true" == h.toString() && "true" != f.toString() && (m = v,
                                            1 == s && "" == _ && (Ct = e[0].toString().trim() + o + "_hin_" + m),
                                            1 == $ && v > -1 && (b = `_hin_${c}_hin_${p}${e[0].toString().trim()}`,
                                            w = 0 == v ? " / " + window.hulk_out_of_stock_text : " / " + v + " " + window.hulk_inventory_text)),
                                            (1 == s && v > 0 && "true" != f.toString() || 1 == s && v <= 0 && "true" == f.toString()) && (x = ""),
                                            "" != y && (St = St + "<input type='hidden' " + ut + "  name='properties[_SKU_" + p + "(" + e[0].toString().trim() + ")]' value='" + y + "' class='hulk_unique_sku' data-sku-identifier='" + e[0].toString().trim() + "' " + x + ">")),
                                            lt = "",
                                            _t = "",
                                            Object.keys(nt).length > 0)
                                                for (const t in nt)
                                                    nt.hasOwnProperty(t) && Array.isArray(nt[t]) && nt[t].includes(e[0].toString().trim()) && (lt += ` ${t} `,
                                                    _t = se);
                                            dropdown_html = "<option  class='" + d + " " + lt + " " + _t + " " + u + "' " + r + " data-hinventory='" + m + "' " + _ + " data-uid='" + b + "' data-display-val='" + e[0].toString().trim() + n + "' data-price='" + l + "' data-variant-id= '" + e[12] + "' data-shipping-weight= '" + e[13] + "'  data-conditional-value='" + e[0].toString().trim() + "' value='" + e[0].toString().trim() + o + "'>" + e[0].toString().trim() + n + w + "</option>",
                                            1 == g && (wt += dropdown_html),
                                            At += dropdown_html
                                        }
                                        ));
                                        var Ft = "";
                                        bt && (Ft = "<input type='hidden' " + ut + "  name='properties[_hin_" + c + "_hin_" + p + "]' value='" + Ct + "' class='hulk_unique_prop' data-unique_prop_name='_hin_" + c + "_hin_" + p + "'/>"),
                                        At += "</select>" + St + Ft,
                                        checkPlan("quantity_selector", "boolean") && X && (At += "<input style='display: " + xt + "' type='number' min='1' value='1' class='hulk_options_quantity hulk_po_dropdown_quantity' data-parent='hulkapps_product_options' data-pid='" + e.pid + "' id='quantity_" + at + "'/>"),
                                        At += "<input type='hidden' " + ut + "  name='properties[" + p + "]' value='" + qt + "' class='hulk_dropdown_hidden_prop'/>",
                                        "floatingLabels" == O && (At += "<label class='floating_label'>" + p + "</label>"),
                                        st.includes(o) && (wt += "</select></div></div>"),
                                        At += "</div></div>",
                                        checkPlan("image_change_based_on_option_value", "boolean") && 1 == Y && "" != W && (At += "<script>(function($) {$(document).on('change','.hulkapps_product_options #hulkapps_option_list_" + e.pid + " #" + at + "', function()  { var option_val  = $(this).find(':selected').data('conditional-value');$('" + W + "').each(function(){data_title = $(this).attr('alt');if(option_val === data_title){$(this).click();}});});;}(hulkapps_jQuery))<\/script>"),
                                        dt += wt,
                                        pt += At
                                    } else if ("dropdown_multiple" == H) {
                                        wt = "";
                                        var It = null != U && "" != U && "" != U.minimum_selection && null != U.minimum_selection ? U.minimum_selection.toString() : "0"
                                          , jt = null != U && "" != U && "" != U.maximum_selection && null != U.maximum_selection ? U.maximum_selection.toString() : "0"
                                          , Pt = "0" != It && "0" != jt && checkPlan("validation_for_min_max_option_selection", "boolean") ? '<span class="selection-text">[Choose from ' + It + " to " + jt + " values]</span>" : "0" != It && checkPlan("validation_for_min_max_option_selection", "boolean") ? '<span class="selection-text">[Choose at least ' + It + " values]</span>" : "0" != jt && checkPlan("validation_for_min_max_option_selection", "boolean") ? '<span class="selection-text">[Choose upto ' + jt + " values]</span>" : ""
                                          , At = "<div class='hulkapps_option dd_multi_render " + E + " " + a + " " + ct + " " + mt + "  option_type_id_" + at + " " + ot + " " + D + "' " + T + " data-parent-id='" + at + "'>";
                                        At += "<div aria-label='" + p + "' tabindex='0' aria-required='" + ht + " ' class='hulkapps_option_name'>" + p + " " + ft + " " + kt + " " + Pt + $t + "</div>",
                                        At += "<div class='hulkapps_option_value'>",
                                        At += "<select multiple class='hulkapps_option_child hulkapps_option_" + at + "_visible hulkapps_full_width hulkapps_dd hulk_po_dropdown_multiple' data-parent='hulkapps_product_options' data-pid='" + e.pid + "' data-option-key='dd_" + at + "' id='" + at + "' name='hulkapps_multiple_dropdown' style='background:none;' data-min='" + It + "' data-max='" + jt + "'>",
                                        st.includes(o) && (wt += At);
                                        qt = [],
                                        Ct = [];
                                        var Lt = 0;
                                        "inlineLabels" == O && (Q = p),
                                        "" != Q && (At += "<option value='' class=" + a + ">" + Q + "</option>");
                                        St = "";
                                        t.each(it, (function(t, e) {
                                            var a = ""
                                              , i = "";
                                            if (lt = "",
                                            _t = "",
                                            Object.keys(nt).length > 0)
                                                for (const t in nt)
                                                    nt.hasOwnProperty(t) && Array.isArray(nt[t]) && nt[t].includes(e[0].toString().trim()) && (lt += ` ${t} `,
                                                    _t = se);
                                            var o = e[1]
                                              , n = e[9];
                                            "percentage_charge" == n && null != o && "" != o ? (o = parseFloat(product_price) / 100 / parseFloat(window.hulkapps_shopify_rate) * o / 100,
                                            o = parseFloat(o.toFixed(2)),
                                            window.need_varaint_change = !0) : "create_mulitplication_charge" == n && null != o && "" != o && (o = parseFloat(product_price) / 100 / parseFloat(window.hulkapps_shopify_rate) * o,
                                            o = parseFloat(o.toFixed(2)),
                                            window.need_varaint_change = !0);
                                            var l = null != o && "" != o ? " [ " + z + o + " ]" : ""
                                              , s = null != o && "" != o && 0 == N ? " (+" + z + o + ")" : ""
                                              , r = null != o && "" != o ? o : "0.00";
                                            if (is_enabled_shopify_default_currency && null != o && "" != o) {
                                                new_price = parseFloat(o) * parseFloat(window.hulkapps_shopify_rate),
                                                rounding_price ? new_price = Math.round(new_price) : new_price = new_price;
                                                s = null != new_price && "" != new_price && 0 == N ? " [ " + currency_conversion(new_price) + " ]" : ""
                                            }
                                            var d = e[4];
                                            1 == d && (Lt += 1,
                                            qt.push(e[0].toString().trim() + l));
                                            var _ = 1 == d ? "selected" : ""
                                              , u = "" != r ? "price-change" : ""
                                              , h = ""
                                              , v = "";
                                            let m = "" != e[5] && null != e[5] ? e[5] : ""
                                              , f = parseInt(e[6]);
                                            var k = "";
                                            let y = "" != e[7] && null != e[7] ? e[7] : ""
                                              , g = "" != e[8] && null != e[8] ? e[8] : "";
                                            var w = "" != e[10] && null != e[10] ? e[10] : ""
                                              , b = "" != e[11] && null != e[11] && e[11]
                                              , x = "disabled";
                                            checkPlan("inventory_and_sku_management", "boolean") && ("true" == m.toString() && "true" != y.toString() && f <= 0 && ("true" == g.toString() ? (h = "disabled",
                                            _ = "",
                                            u = "",
                                            1 == d && qt.pop(e[0].toString().trim() + l)) : (v = "is_hulk_hide",
                                            h = "disabled",
                                            _ = "",
                                            u = "",
                                            1 == d && qt.pop(e[0].toString().trim() + l))),
                                            "true" == m.toString() && (bt = !0),
                                            "true" == m.toString() && "true" != y.toString() && (k = f,
                                            1 == d && "" == v && "" == h && Ct.push(e[0].toString().trim() + l + "_hin_" + k),
                                            1 == $ && f > -1 && (i = `_hin_${c}_hin_${p}${e[0].toString().trim()}`,
                                            a = 0 == f ? " / " + window.hulk_out_of_stock_text : " / " + f + " " + window.hulk_inventory_text)),
                                            (1 == d && f > 0 && "true" != y.toString() || 1 == d && f <= 0 && "true" == y.toString()) && (x = ""),
                                            "" != w && (St = St + "<input type='hidden' " + ut + "  name='properties[_SKU_" + p + "(" + e[0].toString().trim() + ")]' value='" + w + "' class='hulk_unique_sku' data-sku-identifier='" + e[0].toString().trim() + "' " + x + ">")),
                                            html_drop_multi = "<option class='" + lt + " " + _t + " " + u + " " + v + "' " + _ + " data-hinventory='" + k + "' " + h + "  data-uid='" + i + "' data-display-val='" + e[0].toString().trim() + s + "'  data-price='" + r + "' data-variant-id= '" + e[12] + "' data-shipping-weight= '" + e[13] + "' data-conditional-value='" + e[0].toString().trim() + "' value='" + e[0].toString().trim() + l + "'>" + e[0].toString().trim() + s + a + "</option>",
                                            1 == b && (wt += html_drop_multi),
                                            At += html_drop_multi
                                        }
                                        )),
                                        Lt > 0 && ("0" != It && "0" != jt && checkPlan("validation_for_min_max_option_selection", "boolean") ? (parseInt(Lt) < parseInt(It) || parseInt(Lt) > parseInt(jt)) && (At += '</select><span class="validation_error error_span">Choose from ' + It + " to " + jt + " values</span>") : "0" != It && "0" == jt && checkPlan("validation_for_min_max_option_selection", "boolean") ? parseInt(Lt) < parseInt(It) && (At += '</select><span class="validation_error error_span">Choose at least ' + It + " values</span>") : "0" == It && "0" != jt && checkPlan("validation_for_min_max_option_selection", "boolean") && parseInt(Lt) > parseInt(jt) && (At += '</select><span class="validation_error error_span">Choose upto ' + jt + " values</span>"));
                                        "floatingLabels" == O && (At += "</select><label class='floating_label'>" + p + "</label>");
                                        Ft = "";
                                        bt && (Ft = "<input type='hidden' " + ut + "  name='properties[_hin_" + c + "_hin_" + p + "]' value='" + Ct + "' class='hulk_unique_prop' data-unique_prop_name='_hin_" + c + "_hin_" + p + "' data-selection-multi='true'/>"),
                                        At += St + Ft,
                                        At += "<input class='hulkapps_option_child' type='hidden' value='" + qt.join(", ") + "' id='hulkapps_option_" + at + "_hidden' " + ut + "  name='properties[" + p + "]'></div></div>",
                                        st.includes(o) && (wt += "</select></div></div>"),
                                        dt += wt,
                                        pt += At
                                    } else if ("swatch" == H) {
                                        var Ot = 0;
                                        wt = "",
                                        At = "<div class='hulkapps_option swatch_render " + gt + " " + a + " " + ct + " " + mt + " option_type_id_" + at + " " + ot + " " + D + "' " + T + " data-parent-id='" + at + "' >";
                                        At += "<div aria-label='" + p + "' tabindex='0' aria-required='" + ht + " ' class='hulkapps_option_name'>" + p + " " + ft + " " + kt + " " + $t + "</div>",
                                        At += "<div class='hulkapps_option_value'>",
                                        st.includes(o) && (wt += At);
                                        bt = !1,
                                        Ct = "",
                                        qt = "",
                                        xt = "none";
                                        var Et = !1;
                                        t.each(it, (function(t, a) {
                                            if (lt = "",
                                            _t = "",
                                            Object.keys(nt).length > 0)
                                                for (const t in nt)
                                                    nt.hasOwnProperty(t) && Array.isArray(nt[t]) && nt[t].includes(a[0].toString().trim()) && (_t = se,
                                                    lt += ` ${t} `);
                                            var i = a[1]
                                              , o = a[9];
                                            "percentage_charge" == o && null != i && "" != i ? (i = parseFloat(product_price) / 100 / parseFloat(window.hulkapps_shopify_rate) * i / 100,
                                            i = parseFloat(i.toFixed(2)),
                                            window.need_varaint_change = !0) : "create_mulitplication_charge" == o && null != i && "" != i && (i = parseFloat(product_price) / 100 / parseFloat(window.hulkapps_shopify_rate) * i,
                                            i = parseFloat(i.toFixed(2)),
                                            window.need_varaint_change = !0);
                                            var n = "" != a[0] ? a[0] : ""
                                              , l = "" != a[2] ? a[2] : ""
                                              , s = "" != a[3] ? a[3] : ""
                                              , r = null != i && "" != i ? " [ " + z + i + " ]" : ""
                                              , d = null != i && "" != i && 0 == N ? " (+" + z + i + ")" : ""
                                              , _ = null != i && "" != i ? i : "0.00";
                                            if (is_enabled_shopify_default_currency && null != i && "" != i) {
                                                new_price = parseFloat(i) * parseFloat(window.hulkapps_shopify_rate),
                                                rounding_price ? new_price = Math.round(new_price) : new_price = new_price;
                                                d = null != new_price && "" != new_price && 0 == N ? " [ " + currency_conversion(new_price) + " ]" : ""
                                            }
                                            var u = "" != _ ? "price-change" : ""
                                              , h = a[4];
                                            1 == h && (qt = a[0].toString().trim() + r,
                                            xt = "block");
                                            var v = 1 == h ? "swatch_selected" : ""
                                              , m = 1 == h ? "checked" : ""
                                              , f = ""
                                              , k = ""
                                              , y = "";
                                            let S = "" != a[5] && null != a[5] ? a[5] : ""
                                              , I = parseInt(a[6]);
                                            var j = "";
                                            let P = "" != a[7] && null != a[7] ? a[7] : ""
                                              , A = "" != a[8] && null != a[8] ? a[8] : "";
                                            var L = "" != a[10] && null != a[10] ? a[10] : ""
                                              , O = ""
                                              , E = "disabled"
                                              , T = "" != a[11] && null != a[11] && a[11]
                                              , D = ""
                                              , Q = ""
                                              , M = "<p>" + a[0] + " <br> " + d + "</p>";
                                            if (checkPlan("inventory_and_sku_management", "boolean")) {
                                                "true" == S.toString() && "true" != P.toString() && I <= 0 && ("true" == A.toString() ? (k = "is_hulk_disabled",
                                                f = "disabled",
                                                v = " ",
                                                u = " ") : (y = "is_hulk_hide",
                                                f = "disabled",
                                                v = "",
                                                u = "")),
                                                "true" == S.toString() && (bt = !0),
                                                "true" == S.toString() && "true" != P.toString() && (j = I,
                                                1 == h && "" == y && "" == f && (Ct = a[0].toString().trim() + r + "_hin_" + j),
                                                1 == $ && I > -1 && (Q = `_hin_${c}_hin_${p}${a[0].toString().trim()}`,
                                                D = 0 == I ? " / " + window.hulk_out_of_stock_text : null != i && "" != i ? " / <p class='hulk_stock' data-uid='" + Q + "' data-hinventory='" + j + "'>" + I + " " + window.hulk_inventory_text + "</p>" : "<p class='hulk_stock' data-uid='" + Q + "' data-hinventory='" + j + "'>" + I + " " + window.hulk_inventory_text + "</p>"));
                                                M = "<p>" + a[0] + " <br> " + d + D + "</p>";
                                                (1 == h && I > 0 && "true" != P.toString() || 1 == h && I <= 0 && "true" == P.toString()) && (E = ""),
                                                "" != L && (O = "<input type='hidden' " + ut + "  name='properties[_SKU_" + p + "(" + a[0].toString().trim() + ")]' value='" + L + "' class='hulk_unique_sku' " + E + ">")
                                            }
                                            if ("image" == l)
                                                J = "background-image:url(" + s + "); background-size:cover;background-position: center center;" + q,
                                                R = "data-image='" + s + "'",
                                                s;
                                            else {
                                                try {
                                                    var B = s.split(",")
                                                } catch (t) {
                                                    B = null
                                                }
                                                if (null != B)
                                                    if (null != B[1]) {
                                                        swatch_color_dual_ton = "background: linear-gradient(to bottom, " + B[0] + " 0%, " + B[0] + " 50%, " + B[1] + " 50%, " + B[1] + " 100%); " + q;
                                                        var J = swatch_color_dual_ton
                                                          , R = "data-image=''"
                                                    } else
                                                        J = "background-color:" + B[0] + ";" + q,
                                                        R = "data-image=''"
                                            }
                                            if (null != M)
                                                if (null != s)
                                                    if ("both" == x)
                                                        var U = "<div style='text-align:center;'><div class='swatch_tooltip_title'> " + M + "</div><div class='swatch_tooltip_data' style='width:100%;padding-top:100%;display: block !important;" + J + "'></div></div>";
                                                    else
                                                        U = "image_only" == x ? "<div style='text-align:center;'><div class='swatch_tooltip_data' style='width:100%;padding-top:100%;display: block !important;" + J + "'></div></div>" : "<div style='text-align:center;'><div class='swatch_tooltip_title'> " + M + "</div></div>";
                                                else
                                                    U = "<div style='text-align:center;'><div class='swatch_tooltip_title'> " + M + "</div></div>";
                                            else
                                                U = "<div style='text-align:center;'><div class='swatch_tooltip_title'></div></div>";
                                            if (tooltip_val = "<div class='hulkapps-tooltip-inner swatch-tooltip' style='width:200px;'><div>" + U + "</div></div>",
                                            tooltip_display_html = 1 == parseInt(C) ? tooltip_val : "",
                                            swatch_with_text = 1 == parseInt(F) ? n : "",
                                            "0" == t && "" == y) {
                                                var H = 0;
                                                Et = !0
                                            } else if ("0" != t && 0 == Et) {
                                                H = 0;
                                                Et = !0
                                            } else
                                                H = -1;
                                            var V = "<label aria-label='" + a[0].toString().trim() + " " + r + "' tabindex='" + H + "' class='hulkapps_swatch_option " + y + " " + lt + " " + _t + " " + k + "' ><div class='hulkapps-tooltip " + b + "'>" + tooltip_display_html + "<div class='  '><div id='" + at + "_" + Ot + "' data-single_valid-class='swatch_render' data-val-selected-class='swatch_selected' data-radio-class='swatch_radio' data-hidden-class='hulk_swatch_hidden_prop' data-oid='" + at + "' data-option-key='rb_" + at + "_" + Ot + "' class='hulk_po_radio hulkapps_option_child " + v + " hulkapps_option_" + at + " " + u + " '  data-price='" + _ + "'  data-variant-id= '" + a[12] + "' data-shipping-weight= '" + a[13] + "' data-conditional-value='" + a[0].toString().trim() + "' data-parent='hulkapps_product_options' data-pid='" + e.pid + "' value='" + a[0].toString().trim() + "' style='" + g + w + J + "' " + b + "><input name='hulk_swatch_" + at + "' type='radio'  data-hinventory='" + j + "' " + f + " value='" + a[0].toString().trim() + r + "' class=' swatch_radio' " + m + " style='display:none;' " + R + " ></div></div></div><div style='display: inline-block;vertical-align: middle;margin-left: 10px;'>" + swatch_with_text + "</div>" + O + "</label>";
                                            1 == T && (wt += V),
                                            At += V,
                                            Ot += 1
                                        }
                                        ));
                                        Ft = "";
                                        bt && (Ft = "<input type='hidden' " + ut + "  name='properties[_hin_" + c + "_hin_" + p + "]' value='" + Ct + "' class='hulk_unique_prop' data-unique_prop_name='_hin_" + c + "_hin_" + p + "' />"),
                                        At += Ft,
                                        checkPlan("quantity_selector", "boolean") && X && (At += "<input style='display: " + xt + "'type='number' min='1' value='1' data-parent='hulkapps_product_options' data-pid='" + e.pid + "' class='hulk_options_quantity hulk_po_swatch_quantity'  id='quantity_" + at + "'/>"),
                                        At += "<input type='hidden' " + ut + "  name='properties[" + p + "]' value='" + qt + "' class='hulk_swatch_hidden_prop'/></div></div>",
                                        st.includes(o) && (wt += "</div></div>"),
                                        checkPlan("image_change_based_on_option_value", "boolean") && 1 == Y && "" != W && (At += "<script>(function($) {$('.hulkapps_product_options').on('click change', '.hulkapps_option_" + at + "', function() { var option_val  = $(this).data('conditional-value');$('" + W + "').each(function(){data_title = $(this).attr('alt');if(option_val === data_title){$(this).click();}});});;}(hulkapps_jQuery))<\/script>"),
                                        dt += wt,
                                        pt += At
                                    } else if ("color_image_dropdown" == H) {
                                        if (checkPlan("color_image_dropdown", "boolean")) {
                                            wt = "";
                                            At = "<div class='hulkapps_option ci_render dd_render " + gt + " " + a + " " + ct + " " + mt + " option_type_id_" + at + " " + ot + " " + D + "' " + T + " data-parent-id= " + at + ">",
                                            At += "<div aria-label='" + p + "' tabindex='0' aria-required='" + ht + " ' class='hulkapps_option_name' data-option-name='" + p + "'>" + p + " " + ft + " " + kt + " " + $t + "</div>",
                                            At += "<div class='hulkapps_option_value hulkapps_product_options_ul_parent'>",
                                            At += "<ul data-parent='hulkapps_product_options' data-pid='" + e.pid + "'  data-val-selected-class='dropdown_selected' class='hulkapps_option_child hulkapps_product_options_ul hulkapps_option_" + at + "_visible hulkapps_full_width hulkapps_dd ' data-option-key='dd_" + at + "' id='" + at + "' >",
                                            st.includes(o) && (wt += At);
                                            var Tt = "";
                                            Tt = "" == Q ? "<li tabindex='0' value='' class='init'>Choose " + p + "</li>" : "<li value='' tabindex='0' class='init'>" + Q + "</li>";
                                            var Dt = "";
                                            bt = !1,
                                            Ct = "",
                                            qt = "",
                                            xt = "none",
                                            Et = !1;
                                            t.each(it, (function(t, e) {
                                                var a = "image";
                                                "color" == e[2] && (a = "color");
                                                var i = e[3]
                                                  , o = e[1]
                                                  , n = e[9];
                                                "percentage_charge" == n && null != o && "" != o ? (o = parseFloat(product_price) / 100 / parseFloat(window.hulkapps_shopify_rate) * o / 100,
                                                o = parseFloat(o.toFixed(2)),
                                                window.need_varaint_change = !0) : "create_mulitplication_charge" == n && null != o && "" != o && checkPlan("multiplication_charge", !0) && (o = parseFloat(product_price) / 100 / parseFloat(window.hulkapps_shopify_rate) * o,
                                                o = parseFloat(o.toFixed(2)),
                                                window.need_varaint_change = !0);
                                                var l = null != o && "" != o ? " [ " + z + o + " ]" : ""
                                                  , s = null != o && "" != o && 0 == N ? " (+" + z + o + ")" : ""
                                                  , r = null != o && "" != o ? o : "0.00";
                                                if (is_enabled_shopify_default_currency && null != o && "" != o) {
                                                    new_price = parseFloat(o) * parseFloat(window.hulkapps_shopify_rate),
                                                    rounding_price ? new_price = Math.round(new_price) : new_price = new_price;
                                                    s = null != new_price && "" != new_price && 0 == N ? " [ " + currency_conversion(new_price) + " ]" : ""
                                                }
                                                var d = e[4]
                                                  , _ = 1 == d ? "selected" : ""
                                                  , u = 1 == d ? "dropdown_selected" : ""
                                                  , m = "" != r ? "price-change" : ""
                                                  , f = ""
                                                  , k = ""
                                                  , y = "";
                                                let g = "" != e[5] && null != e[5] ? e[5] : ""
                                                  , w = parseInt(e[6]);
                                                var b = "";
                                                let x = "" != e[7] && null != e[7] ? e[7] : ""
                                                  , C = "" != e[8] && null != e[8] ? e[8] : "";
                                                var q = "" != e[10] && null != e[10] ? e[10] : ""
                                                  , S = "" != e[11] && null != e[11] && e[11]
                                                  , F = ""
                                                  , I = "disabled"
                                                  , j = ""
                                                  , P = "";
                                                if (checkPlan("inventory_and_sku_management", "boolean") && ("true" == g.toString() && "true" != x.toString() && w <= 0 && ("true" == C.toString() ? (k = "disabled",
                                                f = "is_hulk_disabled",
                                                _ = "") : (y = "is_hulk_hide",
                                                k = "disabled",
                                                _ = "")),
                                                "true" == g.toString() && (bt = !0),
                                                "true" == g.toString() && "true" != x.toString() && (b = w,
                                                1 == d && "" == k && (Ct = e[0].toString().trim() + l + "_hin_" + b),
                                                1 == $ && w > 0 ? (P = `_hin_${c}_hin_${p}${e[0].toString().trim()}`,
                                                j = 0 == w ? " / " + window.hulk_out_of_stock_text : " / " + w + " " + window.hulk_inventory_text) : 1 == $ && w < 0 && (P = `_hin_${c}_hin_${p}${e[0].toString().trim()}`,
                                                j = " / " + window.hulk_out_of_stock_text)),
                                                (1 == d && w > 0 && "true" != x.toString() || 1 == d && w <= 0 && "true" == x.toString()) && (I = ""),
                                                "" != q && (F = "<input type='hidden' " + ut + " name='properties[_SKU_" + p + "(" + e[0].toString().trim() + ")]' value='" + q + "' class='hulk_unique_sku' " + I + ">")),
                                                lt = "",
                                                _t = "",
                                                Object.keys(nt).length > 0)
                                                    for (const t in nt)
                                                        nt.hasOwnProperty(t) && Array.isArray(nt[t]) && nt[t].includes(e[0].toString().trim()) && (lt += ` ${t} `,
                                                        _t = se);
                                                if ("0" == t && "" == y) {
                                                    var A = 0;
                                                    Et = !0
                                                } else if ("0" != t && 0 == Et) {
                                                    A = 0;
                                                    Et = !0
                                                } else
                                                    A = -1;
                                                1 == d && (qt = e[0].toString().trim() + l,
                                                xt = "block",
                                                Tt = "<li aria-label='" + e[0].toString().trim() + "' tabindex='" + A + "' value='' class='init'><span class='dropdown-text'>" + e[0].toString().trim() + s + "</span>",
                                                Tt = "image" == a ? Tt + "<span class='dropdown_img " + v + "'><img class='' src=" + i + "></span></li>" : Tt + "<span class='dropdown_color " + v + "' style='background-color: " + i + "'></span></li>"),
                                                li_html = "<li aria-label='" + e[0].toString().trim() + l + "' tabindex='" + A + "'  class='dropdown_swatch " + h + " " + f + " " + m + " " + lt + " " + _t + " " + y + " " + u + "' " + _ + " data-hinventory='" + b + "' data-uid='" + P + "' data-display-val='" + e[0].toString().trim() + s + "' " + k + " data-price='" + r + "'  data-variant-id= '" + e[12] + "' data-shipping-weight= '" + e[13] + "' data-conditional-value='" + e[0].toString().trim() + "' data-value='" + e[0].toString().trim() + l + "' value='" + e[0].toString().trim() + l + "'><span class='dropdown-text'>" + e[0].toString().trim() + s + j + "</span>",
                                                li_html = "image" == a ? li_html + "<span class='dropdown_img " + v + "'><img class='' src=" + i + "></span>" + F + "</li>" : li_html + "<span class='dropdown_color " + v + "' style='background-color: " + i + "'></span>" + F + "</li>",
                                                Dt += li_html,
                                                1 == S && (wt += li_html)
                                            }
                                            )),
                                            At = At + Tt + Dt;
                                            Ft = "";
                                            bt && (Ft = "<input type='hidden' " + ut + "  name='properties[_hin_" + c + "_hin_" + p + "]' value='" + Ct + "' class='hulk_unique_prop' data-unique_prop_name='_hin_" + c + "_hin_" + p + "'/>"),
                                            At += "<input class='hulk_opt_prop' " + ut + "   type='hidden' name='properties[" + p + "]'  value='" + qt + "'/></ul>",
                                            st.includes(o) && (wt += "</ul></div></div>"),
                                            checkPlan("quantity_selector", "boolean") && X && (At += "<input style='display: " + xt + "' type='number' min='1' value='1' class='hulk_options_quantity' id='quantity_" + at + "'/>"),
                                            dt += wt,
                                            pt += At += Ft + "</div></div>"
                                        }
                                    } else if ("button" == H) {
                                        if (checkPlan("button_option", "boolean")) {
                                            var Nt = 0;
                                            wt = "",
                                            At = "<div class='hulkapps_option button_render " + gt + " " + a + " " + ct + " " + mt + " option_type_id_" + at + " " + ot + " " + D + "' " + T + " data-parent-id='" + at + "' >";
                                            At += "<div aria-label='" + p + "' tabindex='0' aria-required='" + ht + " ' class='hulkapps_option_name'>" + p + " " + ft + " " + kt + " " + $t + "</div>",
                                            At += "<div class='hulkapps_option_value'>",
                                            st.includes(o) && (wt += At);
                                            bt = !1,
                                            Ct = "",
                                            qt = "",
                                            xt = "none",
                                            Et = !1;
                                            t.each(it, (function(t, a) {
                                                if (lt = "",
                                                _t = "",
                                                Object.keys(nt).length > 0)
                                                    for (const t in nt)
                                                        nt.hasOwnProperty(t) && Array.isArray(nt[t]) && nt[t].includes(a[0].toString().trim()) && (lt += ` ${t} `,
                                                        _t = se);
                                                var i = a[1]
                                                  , o = a[9];
                                                "percentage_charge" == o && null != i && "" != i ? (i = parseFloat(product_price) / 100 / parseFloat(window.hulkapps_shopify_rate) * i / 100,
                                                i = parseFloat(i.toFixed(2)),
                                                window.need_varaint_change = !0) : "create_mulitplication_charge" == o && null != i && "" != i && (i = parseFloat(product_price) / 100 / parseFloat(window.hulkapps_shopify_rate) * i,
                                                i = parseFloat(i.toFixed(2)),
                                                window.need_varaint_change = !0);
                                                "" != a[0] && a[0];
                                                var n = "" != a[2] ? a[2] : ""
                                                  , l = null != i && "" != i ? " [ " + z + i + " ]" : ""
                                                  , s = null != i && "" != i && 0 == N ? " (+" + z + i + ")" : ""
                                                  , r = null != i && "" != i ? i : "0.00";
                                                if (is_enabled_shopify_default_currency && null != i && "" != i) {
                                                    new_price = parseFloat(i) * parseFloat(window.hulkapps_shopify_rate),
                                                    rounding_price ? new_price = Math.round(new_price) : new_price = new_price;
                                                    s = null != new_price && "" != new_price && 0 == N ? " [ " + currency_conversion(new_price) + " ]" : ""
                                                }
                                                var d = "" != r ? "price-change" : ""
                                                  , _ = a[4];
                                                1 == _ && (qt = a[0].toString().trim() + l,
                                                xt = "block");
                                                var u = 1 == _ ? "button_selected" : ""
                                                  , h = 1 == _ ? "checked" : ""
                                                  , v = ""
                                                  , m = ""
                                                  , f = "";
                                                let k = "" != a[5] && null != a[5] ? a[5] : ""
                                                  , y = parseInt(a[6]);
                                                var g = "";
                                                let w = "" != a[7] && null != a[7] ? a[7] : ""
                                                  , b = "" != a[8] && null != a[8] ? a[8] : "";
                                                var x = "" != a[10] && null != a[10] ? a[10] : ""
                                                  , q = "" != a[11] && null != a[11] && a[11]
                                                  , S = ""
                                                  , F = "disabled"
                                                  , I = ""
                                                  , j = "";
                                                checkPlan("inventory_and_sku_management", "boolean") && ("true" == k.toString() && "true" != w.toString() && y <= 0 && ("true" == b.toString() ? (v = "is_hulk_disabled",
                                                m = "disabled",
                                                d = "",
                                                u = "") : (f = "is_hulk_hide",
                                                m = "disabled",
                                                d = "",
                                                u = "")),
                                                "true" == k.toString() && (bt = !0),
                                                "true" == k.toString() && "true" != w.toString() && (g = y,
                                                1 == _ && "" == f && "" == m && (Ct = a[0].toString().trim() + l + "_hin_" + g),
                                                1 == $ && y > -1 && (j = `_hin_${c}_hin_${p}${a[0].toString().trim()}`,
                                                I = 0 == y ? " / " + window.hulk_out_of_stock_text : null != i && "" != i ? " / <p class='hulk_stock' data-uid='" + j + "' data-hinventory='" + g + "'>" + y + " " + window.hulk_inventory_text + "</p>" : "<p class='hulk_stock' data-uid='" + j + "' data-hinventory='" + g + "'>" + y + " " + window.hulk_inventory_text + "</p>")),
                                                (1 == _ && y > 0 && "true" != w.toString() || 1 == _ && y <= 0 && "true" == w.toString()) && (F = ""),
                                                "" != x && (S = "<input type='hidden' " + ut + "  name='properties[_SKU_" + p + "(" + a[0].toString().trim() + ")]' value='" + x + "' class='hulk_unique_sku'" + F + " />"));
                                                var O = a[0] + " <br> " + s + I;
                                                if (titlee = null != O ? "<div style='text-align:center;'><div class='button_tooltip_title'> " + O + "</div></div>" : "<div style='text-align:center;'><div class='button_tooltip_title'></div></div>",
                                                tooltip_val = "<div class='hulkapps-tooltip-inner button-tooltip'>" + O + "</div>",
                                                tooltip_display_html = 1 == parseInt(C) ? tooltip_val : "",
                                                "0" == t && "" == f) {
                                                    var E = 0;
                                                    Et = !0
                                                } else if ("0" != t && 0 == Et) {
                                                    E = 0;
                                                    Et = !0
                                                } else
                                                    E = -1;
                                                html_btn = "<label aria-label='" + a[0].toString().trim() + " " + l + "'  tabindex='" + E + "' class='hulkapps_buton_option " + f + " " + v + "'><div class='hulkapps-tooltip'>" + tooltip_display_html + "<div class='" + lt + " " + _t + " '><div id='" + at + "_" + Nt + "' data-option-key='rb_" + at + "_" + Nt + "' class='hulkapps_option_child " + u + " hulkapps_option_" + at + " " + d + " hulk_po_radio'  data-hidden-class='hulk_button_hidden_prop'  data-single_valid-class='button_render' data-val-selected-class='button_selected' data-radio-class='button_radio' data-oid='" + at + "' data-pid='" + e.pid + "' data-parent='hulkapps_product_options' data-price='" + r + "'  data-variant-id='" + a[12] + "' data-shipping-weight= '" + a[13] + "' data-conditional-value='" + a[0].toString().trim() + "' value='" + a[0].toString().trim() + "' style='" + P + A + L + "'><input name='hulk_button_" + at + "' type='radio' " + m + " data-hinventory='" + g + "' value='" + a[0].toString().trim() + l + "' class=' button_radio' " + h + " style='display:none;'><span>" + n + "</span></div></div></div>" + S + "</label>",
                                                1 == q && (wt += html_btn),
                                                At += html_btn,
                                                Nt += 1
                                            }
                                            ));
                                            Ft = "";
                                            bt && (Ft = "<input type='hidden' " + ut + "  name='properties[_hin_" + c + "_hin_" + p + "]' value='" + Ct + "' class='hulk_unique_prop' data-unique_prop_name='_hin_" + c + "_hin_" + p + "'/>"),
                                            At += Ft,
                                            checkPlan("quantity_selector", "boolean") && X && (At += "<input style='display: " + xt + "' type='number' min='1' value='1' class='hulk_options_quantity hulk_po_button_quantity' data-parent='hulkapps_product_options' data-pid='" + e.pid + "' id='quantity_" + at + "'/>"),
                                            At += "<input type='hidden' " + ut + "  name='properties[" + p + "]' value='" + qt + "' class='hulk_button_hidden_prop'/></div></div>",
                                            st.includes(o) && (wt += "</div></div>"),
                                            checkPlan("image_change_based_on_option_value", "boolean") && 1 == Y && "" != W && (At += "<script>(function($) {$('.hulkapps_product_options .hulkapps_option_" + at + "').on('click change', function() { var option_val  = $(this).data('conditional-value');$('" + W + "').each(function(){data_title = $(this).attr('alt');if(option_val === data_title){$(this).click();}});});;}(hulkapps_jQuery))<\/script>"),
                                            dt += wt,
                                            pt += At
                                        }
                                    } else if ("swatch_multiple" == H) {
                                        if (checkPlan("multiple_swatch_select_option", "boolean") || 0 == checkPlan("multiple_swatch_select_option", "boolean") && 1 == oldStore()) {
                                            wt = "",
                                            It = null != U && null != U.minimum_selection && "" != U && "" != U.minimum_selection ? U.minimum_selection.toString() : "0",
                                            jt = null != U && null != U.maximum_selection && "" != U && "" != U.maximum_selection ? U.maximum_selection.toString() : "0",
                                            Ot = 0,
                                            Pt = "0" != It && "0" != jt && checkPlan("validation_for_min_max_option_selection", "boolean") ? '<span aria-label="Choose from ' + It + " to " + jt + ' values" tabindex="0" class="selection-text">[Choose from ' + It + " to " + jt + " values]</span>" : "0" != It && checkPlan("validation_for_min_max_option_selection", "boolean") ? '<span aria-label="Choose at least ' + It + ' values" tabindex="0" class="selection-text">[Choose at least ' + It + " values]</span>" : "0" != jt && checkPlan("validation_for_min_max_option_selection", "boolean") ? '<span aria-label="Choose upto ' + jt + ' values" tabindex="0" class="selection-text">[Choose upto ' + jt + " values]</span>" : "",
                                            At = "<div class='hulkapps_option multiswatch_render " + a + " " + ct + " " + mt + " option_type_id_" + at + " " + ot + " " + D + "' " + T + " data-parent-id='" + at + "' data-min='" + It + "' data-max='" + jt + "'>";
                                            At += "<div aria-label='" + p + "' tabindex='0' aria-required='" + ht + " ' class='hulkapps_option_name'><div>" + p + " " + ft + " " + kt + " </div> " + Pt + " " + $t + "</div>",
                                            At += "<div class='hulkapps_option_value'>",
                                            st.includes(o) && (wt += At);
                                            qt = [],
                                            Lt = 0,
                                            Ct = [],
                                            Et = !1;
                                            t.each(it, (function(t, a) {
                                                if (lt = "",
                                                _t = "",
                                                Object.keys(nt).length > 0)
                                                    for (const t in nt)
                                                        nt.hasOwnProperty(t) && Array.isArray(nt[t]) && nt[t].includes(a[0].toString().trim()) && (lt += ` ${t} `,
                                                        _t = se);
                                                var i = a[1]
                                                  , o = a[9];
                                                "percentage_charge" == o && null != i && "" != i ? (i = parseFloat(product_price) / 100 / parseFloat(window.hulkapps_shopify_rate) * i / 100,
                                                i = parseFloat(i.toFixed(2)),
                                                window.need_varaint_change = !0) : "create_mulitplication_charge" == o && null != i && "" != i && (i = parseFloat(product_price) / 100 / parseFloat(window.hulkapps_shopify_rate) * i,
                                                i = parseFloat(i.toFixed(2)),
                                                window.need_varaint_change = !0);
                                                var n = "" != a[0] ? a[0] : ""
                                                  , l = "" != a[2] ? a[2] : ""
                                                  , s = "" != a[3] ? a[3] : ""
                                                  , r = null != i && "" != i ? " [ " + z + i + " ]" : ""
                                                  , d = null != i && "" != i && 0 == N ? " (+" + z + i + ")" : ""
                                                  , _ = null != i && "" != i ? i : "0.00";
                                                if (is_enabled_shopify_default_currency && null != i && "" != i) {
                                                    new_price = parseFloat(i) * parseFloat(window.hulkapps_shopify_rate),
                                                    rounding_price ? new_price = Math.round(new_price) : new_price = new_price;
                                                    d = null != new_price && "" != new_price && 0 == N ? " [ " + currency_conversion(new_price) + " ]" : ""
                                                }
                                                var u = "" != _ ? "price-change" : ""
                                                  , h = a[4];
                                                1 == h && (Lt += 1,
                                                qt.push(a[0].toString().trim() + r));
                                                var v = 1 == h ? "swatch_selected" : ""
                                                  , m = 1 == h ? "checked" : ""
                                                  , f = ""
                                                  , k = ""
                                                  , y = "";
                                                let S = "" != a[5] && null != a[5] ? a[5] : ""
                                                  , I = parseInt(a[6]);
                                                var j = "";
                                                let P = "" != a[7] && null != a[7] ? a[7] : ""
                                                  , A = "" != a[8] && null != a[8] ? a[8] : "";
                                                var L = "" != a[10] && null != a[10] ? a[10] : ""
                                                  , O = "" != a[11] && null != a[11] && a[11]
                                                  , E = ""
                                                  , T = "disabled"
                                                  , D = ""
                                                  , Q = "";
                                                checkPlan("inventory_and_sku_management", "boolean") && ("true" == S.toString() && "true" != P.toString() && I <= 0 && ("true" == A.toString() ? (k = "disabled",
                                                f = "is_hulk_disabled",
                                                u = "",
                                                v = "",
                                                qt.pop(a[0].toString().trim() + r)) : (y = "is_hulk_hide",
                                                k = "disabled",
                                                u = "",
                                                v = "",
                                                qt.pop(a[0].toString().trim() + r))),
                                                "true" == S.toString() && (bt = !0),
                                                "true" == S.toString() && "true" != P.toString() && (j = I,
                                                1 == h && "" == y && "" == k && Ct.push(a[0].toString().trim() + r + "_hin_" + j),
                                                1 == $ && I > -1 && (Q = `_hin_${c}_hin_${p}${a[0].toString().trim()}`,
                                                D = 0 == I ? " / " + window.hulk_out_of_stock_text : null != i && "" != i ? " / <p class='hulk_stock' data-uid='" + Q + "' data-hinventory='" + j + "'>" + I + " " + window.hulk_inventory_text + "</p>" : "<p class='hulk_stock' data-uid='" + Q + "' data-hinventory='" + j + "'>" + I + " " + window.hulk_inventory_text + "</p>")),
                                                (1 == h && I > 0 && "true" != P.toString() || 1 == h && I <= 0 && "true" == P.toString()) && (T = ""),
                                                "" != L && (E = "<input type='hidden' " + ut + "  name='properties[_SKU_" + p + "(" + a[0].toString().trim() + ")]' value='" + L + "' class='hulk_unique_sku' " + T + "/>"));
                                                var M = "<p>" + a[0] + " <br> " + d + D + "</p>";
                                                if ("image" == l)
                                                    J = "background-image:url(" + s + ");background-size:cover;background-position: center center;" + q,
                                                    R = "data-image='" + s + "'",
                                                    s;
                                                else {
                                                    try {
                                                        var B = s.split(",")
                                                    } catch (t) {
                                                        B = null
                                                    }
                                                    if (null != B)
                                                        if (null != B[1]) {
                                                            swatch_color_dual_ton = "background: linear-gradient(to bottom, " + B[0] + " 0%, " + B[0] + " 50%, " + B[1] + " 50%, " + B[1] + " 100%); " + q;
                                                            var J = swatch_color_dual_ton
                                                              , R = "data-image=''"
                                                        } else
                                                            J = "background-color:" + B[0] + ";" + q,
                                                            R = "data-image=''"
                                                }
                                                if (null != M)
                                                    if ("" != s)
                                                        if ("both" == x)
                                                            var U = "<div style='text-align:center;'><div class='multiswatch_tooltip_title'> " + M + "</div><div class='multiswatch_tooltip_data' style='width:100%;padding-top:100%;display: block !important;" + J + "'></div></div>";
                                                        else
                                                            U = "image_only" == x ? "<div style='text-align:center;'><div class='multiswatch_tooltip_data' style='width:100%;padding-top:100%;display: block !important;" + J + "'></div></div>" : "<div style='text-align:center;'><div class='multiswatch_tooltip_title'> " + M + "</div></div>";
                                                    else
                                                        U = "<div style='text-align:center;'><div class='multiswatch_tooltip_title'> " + M + "</div></div>";
                                                else
                                                    U = "<div style='text-align:center;'><div class='swatch_tooltip_title'></div></div>";
                                                if (tooltip_val = "<div class='hulkapps-tooltip-inner multiswatch-tooltip' style='width:200px;'><div>" + U + "</div></div>",
                                                tooltip_display_html = 1 == parseInt(C) ? tooltip_val : "",
                                                swatch_with_text = 1 == parseInt(F) ? n : "",
                                                "0" == t && "" == y) {
                                                    var H = 0;
                                                    Et = !0
                                                } else if ("0" != t && 0 == Et) {
                                                    H = 0;
                                                    Et = !0
                                                } else
                                                    H = -1;
                                                html_swatchmulti = "<label aria-label='" + a[0].toString().trim() + " " + r + "' tabindex='" + H + "' class='hulkapps_mswatch_option " + lt + " " + _t + " " + y + " " + f + "'><div class='hulkapps-tooltip " + b + "'>" + tooltip_display_html + "<div class=''><div id='" + at + "_" + Ot + "' data-option-key='rb_" + at + "_" + Ot + "' data-oid='" + at + "' data-min='" + It + "' data-single_valid-class='multiswatch_render' data-max='" + jt + "' data-parent='hulkapps_product_options' data-pid='" + e.pid + "' class='hulk_po_checkbox hulkapps_option_child  " + v + " hulkapps_option_" + at + " " + u + "'  data-price=" + _ + "  data-variant-id= '" + a[12] + "'  data-shipping-weight= '" + a[13] + "' data-conditional-value='" + a[0].toString().trim() + "' value='" + a[0].toString().trim() + "' style='" + g + w + J + "' " + b + "><input type='checkbox'  data-conditional-value='" + a[0].toString().trim() + "' data-price=" + _ + "  data-variant-id= '" + a[12] + "' data-shipping-weight= '" + a[13] + "' data-hinventory='" + j + "' " + k + " id='" + at + "' value='" + a[0].toString().trim() + r + "' class='hulk_po_swatch_multiple_checkbox swatch_checkbox hulkapps_option_child hulkapps_option_" + at + "_visible " + u + " ' " + m + " style='display:none !important;' " + R + " ></div></div></div><div style='display: inline-block;vertical-align: middle;margin-left: 10px;'>" + swatch_with_text + "</div>" + E + "</label>",
                                                1 == O && (wt += html_swatchmulti),
                                                At += html_swatchmulti,
                                                Ot += 1
                                            }
                                            )),
                                            1 == S && (At += "var swatch_image_url = " + t(this).find(".swatch_radio").attr("data-image") + "if (" + swatch_image_url + " != ''){$('.hulkapps_swatch_image_change img').attr('src'," + swatch_image_url + ");$('.hulkapps_swatch_image_change img').attr('srcset'," + swatch_image_url + ");$('.hulkapps_swatch_image_change img').attr('data-srcset'," + swatch_image_url + ");}"),
                                            Lt > 0 && ("0" != It && "0" != jt && checkPlan("validation_for_min_max_option_selection", "boolean") ? (parseInt(Lt) < parseInt(It) || parseInt(Lt) > parseInt(jt)) && (At += '<span class="validation_error error_span">Choose from ' + It + " to " + jt + " values</span>") : "0" != It && "0" == jt && checkPlan("validation_for_min_max_option_selection", "boolean") ? parseInt(Lt) < parseInt(It) && (At += '<span class="validation_error error_span">Choose at least ' + It + " values</span>") : "0" == It && "0" != jt && checkPlan("validation_for_min_max_option_selection", "boolean") && parseInt(Lt) > parseInt(jt) && (At += '<span class="validation_error error_span">Choose upto ' + jt + " values</span>"));
                                            Ft = "";
                                            bt && (Ft = "<input type='hidden' " + ut + "  name='properties[_hin_" + c + "_hin_" + p + "]'  value='" + Ct + "' class='hulk_unique_prop' data-unique_prop_name='_hin_" + c + "_hin_" + p + "' data-selection-multi='true'/>"),
                                            At += Ft,
                                            st.includes(o) && (wt += "</div></div>"),
                                            At += "<input class='hulkapps_option_child' value='" + qt.join(", ") + "' type='hidden' id='hulkapps_option_" + at + "_hidden' " + ut + "    name='properties[" + p + "]'></div></div>",
                                            dt += wt,
                                            pt += At
                                        }
                                    } else if ("checkbox" == H) {
                                        wt = "",
                                        It = null != U && "" != U && null != U.minimum_selection && "" != U.minimum_selection ? U.minimum_selection.toString() : "0",
                                        jt = null != U && "" != U && null != U.maximum_selection && "" != U.maximum_selection ? U.maximum_selection.toString() : "0";
                                        var zt = 1 == parseInt(u) ? "single_line" : "";
                                        Pt = "0" != It && "0" != jt && checkPlan("validation_for_min_max_option_selection", "boolean") ? '<span aria-label="Choose from ' + It + " to " + jt + ' values" tabindex="0" class="selection-text">[Choose from ' + It + " to " + jt + " values]</span>" : "0" != It && checkPlan("validation_for_min_max_option_selection", "boolean", e.plan_id, e.plans_features) ? '<span aria-label="Choose at least ' + It + ' values" tabindex="0"  class="selection-text">[Choose at least ' + It + " values]</span>" : "0" != jt && checkPlan("validation_for_min_max_option_selection", "boolean") ? '<span aria-label="Choose upto ' + jt + ' values" tabindex="0" class="selection-text">[Choose upto ' + jt + " values]</span>" : "",
                                        At = "<div class='hulkapps_option cb_render " + a + " " + ct + " " + mt + " " + zt + " option_type_id_" + at + " " + ot + " " + D + "' " + T + " data-parent-id='" + at + "' data-min='" + It + "' data-max='" + jt + "'>";
                                        At += "<div aria-label='" + p + "' tabindex='0' aria-required='" + ht + " ' class='hulkapps_option_name'><div>" + p + " " + ft + " " + kt + "  </div>" + Pt + " " + $t + "</div>",
                                        At += "<div class='hulkapps_option_value hulkapps_product_page_options'>",
                                        st.includes(o) && (wt += At);
                                        qt = [],
                                        Lt = 0,
                                        Ct = [],
                                        Et = !1;
                                        t.each(it, (function(t, a) {
                                            if (lt = "",
                                            _t = "",
                                            Object.keys(nt).length > 0)
                                                for (const t in nt)
                                                    nt.hasOwnProperty(t) && Array.isArray(nt[t]) && nt[t].includes(a[0].toString().trim()) && (lt += ` ${t} `,
                                                    _t = se);
                                            var i = a[1]
                                              , o = a[9];
                                            "percentage_charge" == o && null != i && "" != i ? (i = parseFloat(product_price) / 100 / parseFloat(window.hulkapps_shopify_rate) * i / 100,
                                            i = parseFloat(i.toFixed(2)),
                                            window.need_varaint_change = !0) : "create_mulitplication_charge" == o && null != i && "" != i && (i = parseFloat(product_price) / 100 / parseFloat(window.hulkapps_shopify_rate) * i,
                                            i = parseFloat(i.toFixed(2)),
                                            window.need_varaint_change = !0);
                                            var n = null != i && "" != i ? " [ " + z + i + " ]" : ""
                                              , l = null != i && "" != i && 0 == N ? " (+" + z + i + ")" : ""
                                              , s = null != i && "" != i ? i : "0.00";
                                            if (is_enabled_shopify_default_currency && null != i && "" != i) {
                                                new_price = parseFloat(i) * parseFloat(window.hulkapps_shopify_rate),
                                                rounding_price ? new_price = Math.round(new_price) : new_price = new_price;
                                                l = null != new_price && "" != new_price && 0 == N ? " [ " + currency_conversion(new_price) + " ]" : ""
                                            }
                                            var r = a[4];
                                            1 == r && (Lt += 1,
                                            qt.push(a[0].toString().trim() + n));
                                            var d = 1 == r ? "checked" : ""
                                              , _ = "" != s ? "price-change" : ""
                                              , u = ""
                                              , h = ""
                                              , v = "";
                                            let m = "" != a[5] && null != a[5] ? a[5] : ""
                                              , f = parseInt(a[6]);
                                            var k = "";
                                            let y = "" != a[7] && null != a[7] ? a[7] : ""
                                              , g = "" != a[8] && null != a[8] ? a[8] : "";
                                            var w = "" != a[10] && null != a[10] ? a[10] : ""
                                              , b = "" != a[11] && null != a[11] && a[11]
                                              , x = ""
                                              , C = "disabled"
                                              , q = ""
                                              , S = "";
                                            if (checkPlan("inventory_and_sku_management", "boolean") && ("true" == m.toString() && "true" != y.toString() && f <= 0 && ("true" == g.toString() ? (u = "disabled",
                                            v = "is_hulk_disabled",
                                            d = "",
                                            _ = "",
                                            1 == r && qt.pop(a[0].toString().trim() + n)) : (h = "is_hulk_hide",
                                            d = "",
                                            _ = "",
                                            1 == r && qt.pop(a[0].toString().trim() + n))),
                                            "true" == m.toString() && (bt = !0),
                                            "true" == m.toString() && "true" != y.toString() && (k = f,
                                            1 == r && "" == h && "" == u && Ct.push(a[0].toString().trim() + n + "_hin_" + k),
                                            1 == $ && f > -1 && (S = `_hin_${c}_hin_${p}${a[0].toString().trim()}`,
                                            q = 0 == f ? " / " + window.hulk_out_of_stock_text : " /&nbsp;  <p class='hulk_stock' style='margin: 0;' data-uid='" + S + "' data-hinventory='" + k + "'>" + f + " " + window.hulk_inventory_text + "</p>")),
                                            (1 == r && f > 0 && "true" != y.toString() || 1 == r && f <= 0 && "true" == y.toString()) && (C = ""),
                                            "" != w && (x = "<input type='hidden' " + ut + "  name='properties[_SKU_" + p + "(" + a[0].toString().trim() + ")]' value='" + w + "' class='hulk_unique_sku' " + C + "/>")),
                                            "0" == t && "" == h) {
                                                var F = 0;
                                                Et = !0
                                            } else if ("0" != t && 0 == Et) {
                                                F = 0;
                                                Et = !0
                                            } else
                                                F = -1;
                                            html_checkbox = "<label  aria-label='" + a[0].toString().trim() + " " + n + "' tabindex='" + F + "' class='hulkapps_check_option " + v + " " + lt + " " + _t + " " + h + "'><input type='checkbox' " + d + " data-option-key='cbm_" + at + "' data-hinventory='" + k + "' " + u + " data-parent='hulkapps_product_options' data-pid='" + e.pid + "' data-single_valid-class='cb_render' data-min='" + It + "' data-max='" + jt + "' data-oid='" + at + "' id='" + at + "' class='  hulk_po_checkbox hulkapps_option_child hulkapps_option_" + at + "_visible hulkapps_product_option_" + at + "_visible " + _ + "' data-price='" + s + " '  data-variant-id= '" + a[12] + "' data-shipping-weight= '" + a[13] + "' data-shipping-weight= '" + a[13] + "'  data-conditional-value='" + a[0].toString().trim() + "' value='" + a[0].toString().trim() + n + '\'><div class=\'hulkapps-custom-check\'><svg xmlns="http://www.w3.org/2000/svg" width="9" height="7" viewBox="0 0 9 7" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M2.46989 6.79557L0.219933 4.69527C-0.073311 4.42153 -0.073311 3.97907 0.219933 3.70533C0.513177 3.43159 0.987167 3.43159 1.28041 3.70533L2.95738 5.27075L7.68078 0.244745C7.95078 -0.049296 8.42402 -0.0829008 8.73751 0.168435C9.0525 0.42047 9.08925 0.861532 8.81926 1.15487L3.56936 6.75566C3.43362 6.90408 3.23712 6.99229 3.02863 6.99999C2.80138 7.00069 2.61013 6.92718 2.46989 6.79557Z" fill="white" style="&#10;"/></svg></div>' + a[0].toString().trim() + l + q + x + " </label>",
                                            1 == b && (wt += html_checkbox),
                                            At += html_checkbox
                                        }
                                        )),
                                        Lt > 0 && ("0" != It && "0" != jt && checkPlan("validation_for_min_max_option_selection", "boolean") ? (parseInt(Lt) < parseInt(It) || parseInt(Lt) > parseInt(jt)) && (At += '</select><span class="validation_error error_span">Choose from ' + It + " to " + jt + " values</span>") : "0" != It && "0" == jt && checkPlan("validation_for_min_max_option_selection", "boolean") ? parseInt(Lt) < parseInt(It) && (At += '</select><span class="validation_error error_span">Choose at least ' + It + " values</span>") : "0" == It && "0" != jt && checkPlan("validation_for_min_max_option_selection", "boolean") && parseInt(Lt) > parseInt(jt) && (At += '</select><span class="validation_error error_span">Choose upto ' + jt + " values</span>"));
                                        Ft = "";
                                        bt && (Ft = "<input type='hidden' " + ut + "  name='properties[_hin_" + c + "_hin_" + p + "]' value='" + Ct + "' class='hulk_unique_prop' data-unique_prop_name='_hin_" + c + "_hin_" + p + "' data-selection-multi='true'/>"),
                                        At += Ft,
                                        At += "<input class='hulkapps_option_child' value='" + qt.join(", ") + "' type='hidden' id='hulkapps_option_" + at + "_hidden' " + ut + "  name='properties[" + p + "]'></div></div>",
                                        st.includes(o) && (wt += "</div></div>"),
                                        dt += wt,
                                        pt += At
                                    } else if ("textbox" == H) {
                                        var Qt = ""
                                          , Mt = null != U && checkPlan("character_limit", "boolean") && "" != U.character_limit && null != U.character_limit ? "[Maximum " + U.character_limit + " character]" : "";
                                        At = "<div class='hulkapps_option tb_render " + E + " " + a + " " + ct + " " + mt + " option_type_id_" + at + " " + ot + " " + D + "' " + T + " data-parent-id='" + at + "'>";
                                        At += "<div aria-label='" + p + "' tabindex='0' aria-required='" + ht + " ' class='hulkapps_option_name'><div>" + p + " " + ft + " " + kt + " </div> " + Mt + " " + $t + "</div>",
                                        "inlineLabels" == O && (Q = p),
                                        "floatingLabels" == O && (Q = ""),
                                        At += "<div class='hulkapps_option_value'>",
                                        t.each(it, (function(t, a) {
                                            var i = a[1]
                                              , o = a[9];
                                            "percentage_charge" == o && null != i && "" != i ? (i = parseFloat(product_price) / 100 / parseFloat(window.hulkapps_shopify_rate) * i / 100,
                                            i = parseFloat(i.toFixed(2)),
                                            window.need_varaint_change = !0) : "create_mulitplication_charge" == o && null != i && "" != i ? (i = parseFloat(product_price) / 100 / parseFloat(window.hulkapps_shopify_rate) * i,
                                            i = parseFloat(i.toFixed(2)),
                                            window.need_varaint_change = !0) : "character_charge" == o && null != i && "" != i && (i = parseFloat(i));
                                            var n = null != i && "" != i ? i : "0.00"
                                              , l = ""
                                              , s = "" != n ? "price-change" : "";
                                            null != U && checkPlan("character_limit", "boolean") && "" != U.character_limit && null != U.character_limit && (l = "maxlength=" + U.character_limit),
                                            At += "<input type='text' data-is-charge='" + o + "' data-single_valid-class='tb_render' data-val-selected-class='textbox_selected'  data-option-key='tb_" + at + "' id='" + at + "' placeholder='" + Q + "' data-parent='hulkapps_product_options' data-pid='" + e.pid + "' class='hulkapps_option_child hulk_po_other_options hulkapps_full_width hulkapps_option_" + at + " " + s + "' data-main-price='" + n + "' data-price='" + n + "'  data-variant-id= '" + a[12] + "' data-shipping-weight= '" + a[13] + "' " + l + "><input type='hidden' " + ut + "  name='properties[" + p + "]' class='tb_property_val other_options_prop_val'>",
                                            "floatingLabels" == O && (At += "<label class='floating_label'>" + p + "</label>"),
                                            null != U && checkPlan("character_limit", "boolean") && "" != U.character_limit && null != U.character_limit && (At += "<input type='hidden' value='" + U.character_limit + "' class='character_count'><div id='char_count_" + at + "'>" + U.character_limit + " " + e.display_settings.charcter_count_message + "</div>"),
                                            null != U && checkPlan("character_limit", "boolean") && "" != U.character_limit && null != U.character_limit && (Qt += "<script>(function($) {$(document).on('input', '.hulkapps_product_options .hulkapps_option_" + at + "', function() { check_character_limit(" + U.character_limit + ",'" + at + "','" + e.display_settings.charcter_count_message + "','hulkapps_product_options');});}(hulkapps_jQuery))<\/script>")
                                        }
                                        )),
                                        pt += At = At + Qt + "</div></div>"
                                    } else if ("textarea" == H) {
                                        Qt = "",
                                        Mt = null != U && checkPlan("character_limit", "boolean") && "" != U.character_limit && null != U.character_limit ? "[Maximum " + U.character_limit + " character]" : "",
                                        At = "<div class='hulkapps_option ta_render " + E + " " + a + " " + ct + " " + mt + " option_type_id_" + at + " " + ot + " " + D + "' " + T + " data-parent-id='" + at + "'>";
                                        At += "<div aria-label='" + p + "' tabindex='0' aria-required='" + ht + " ' class='hulkapps_option_name'><div>" + p + " " + ft + " " + kt + " </div> " + Mt + " " + $t + "</div>",
                                        "inlineLabels" == O && (Q = p),
                                        "floatingLabels" == O && (Q = ""),
                                        At += "<div class='hulkapps_option_value'>",
                                        t.each(it, (function(t, a) {
                                            var i = a[1]
                                              , o = a[9];
                                            "percentage_charge" == o && null != i && "" != i ? (i = parseFloat(product_price) / 100 / parseFloat(window.hulkapps_shopify_rate) * i / 100,
                                            i = parseFloat(i.toFixed(2)),
                                            window.need_varaint_change = !0) : "create_mulitplication_charge" == o && null != i && "" != i ? (i = parseFloat(product_price) / 100 / parseFloat(window.hulkapps_shopify_rate) * i,
                                            i = parseFloat(i.toFixed(2)),
                                            window.need_varaint_change = !0) : "character_charge" == o && null != i && "" != i && (i = parseFloat(i));
                                            var n = null != i && "" != i ? i : "0.00"
                                              , l = ""
                                              , s = "" != n ? "price-change" : "";
                                            null != U && checkPlan("character_limit", "boolean") && "" != U.character_limit && null != U.character_limit && (l = "maxlength=" + U.character_limit),
                                            At += "<textarea placeholder='" + Q + "' data-is-charge='" + o + "' data-main-price='" + n + "' data-single_valid-class='ta_render' data-val-selected-class='textbox_selected' data-option-key='ta_" + at + "' id='" + at + "' data-pid='" + e.pid + "' data-parent='hulkapps_product_options' class='hulk_po_other_options hulkapps_option_child hulkapps_full_width hulkapps_option_" + at + " " + s + "' data-price='" + n + "'  data-variant-id= '" + a[12] + "' data-shipping-weight= '" + a[13] + "' " + l + "></textarea>",
                                            "floatingLabels" == O && (At += "<label class='floating_label'>" + p + "</label>"),
                                            At += "<input type='hidden' " + ut + "  name='properties[" + p + "]' class='ta_property_val other_options_prop_val'>",
                                            null != U && checkPlan("character_limit", "boolean") && "" != U.character_limit && null != U.character_limit && (At += "<input type='hidden' value='" + U.character_limit + "' class='character_count'><div id='char_count_" + at + "'>" + U.character_limit + " " + e.display_settings.charcter_count_message + "</div>"),
                                            null != U && checkPlan("character_limit", "boolean") && "" != U.character_limit && null != U.character_limit && (Qt += "<script>(function($) {$(document).on('input', '.hulkapps_product_options .hulkapps_option_" + at + "', function() { check_character_limit(" + U.character_limit + ",'" + at + "','" + e.display_settings.charcter_count_message + "','hulkapps_product_options');});}(hulkapps_jQuery))<\/script>")
                                        }
                                        )),
                                        pt += At = At + Qt + "</div></div>"
                                    } else if ("radiobutton" == H) {
                                        var Bt = 0;
                                        zt = 1 == parseInt(u) ? "single_line" : "",
                                        wt = "";
                                        if (At = "<div class='hulkapps_option rb_render " + gt + "  " + a + " " + ct + " " + mt + " " + zt + "  option_type_id_" + at + " " + ot + " " + D + "' " + T + " data-parent-id='" + at + "' >",
                                        At += "<div aria-label='" + p + "' tabindex='0' aria-required='" + ht + " ' class='hulkapps_option_name'>" + p + " " + ft + " " + kt + " " + $t + "</div>",
                                        At += "<div class='hulkapps_option_value'>",
                                        K) {
                                            At += "<div class='switches-container'>";
                                            var Jt = e.switch_style.values_location;
                                            values_location_css = "" + ("inside" == Jt ? "width: auto;" : "width: 7rem; height: 3rem;"),
                                            css = `.switches-container { border-radius: ${e.switch_style.container_border_radius}px; background: ${e.switch_style.background_color}; border-color: ${e.switch_style.border_color}; ${values_location_css}}.switch { border-radius: ${e.switch_style.toggle_border_radius}px;}.switch div, .switch_radio_div{ color: ${e.switch_style.button_color} !important; }`,
                                            At += "<style> " + css + " </style>",
                                            switch_toggle_html = `<div class='switch-wrapper'><div class='switch' ${"outside" == Jt ? 'style="display: block;"' : ""} >`
                                        }
                                        st.includes(o) && (wt += At);
                                        Ct = "",
                                        qt = "",
                                        xt = "none",
                                        Et = !1;
                                        t.each(it, (function(t, a) {
                                            if (lt = "",
                                            _t = "",
                                            Object.keys(nt).length > 0)
                                                for (const t in nt)
                                                    nt.hasOwnProperty(t) && Array.isArray(nt[t]) && nt[t].includes(a[0].toString().trim()) && (lt += ` ${t} `,
                                                    _t = se);
                                            var i = a[1]
                                              , o = a[9];
                                            "percentage_charge" == o && null != i && "" != i ? (i = parseFloat(product_price) / 100 / parseFloat(window.hulkapps_shopify_rate) * i / 100,
                                            i = parseFloat(i.toFixed(2)),
                                            window.need_varaint_change = !0) : "create_mulitplication_charge" == o && null != i && "" != i && (i = parseFloat(product_price) / 100 / parseFloat(window.hulkapps_shopify_rate) * i,
                                            i = parseFloat(i.toFixed(2)),
                                            window.need_varaint_change = !0);
                                            var n = null != i && "" != i ? " [ " + z + i + " ]" : ""
                                              , l = null != i && "" != i && 0 == N ? " (+" + z + i + ")" : ""
                                              , s = null != i && "" != i ? i : "0.00";
                                            if (is_enabled_shopify_default_currency && null != i && "" != i) {
                                                new_price = parseFloat(i) * parseFloat(window.hulkapps_shopify_rate),
                                                rounding_price ? new_price = Math.round(new_price) : new_price = new_price;
                                                l = null != new_price && "" != new_price && 0 == N ? " [ " + currency_conversion(new_price) + " ]" : ""
                                            }
                                            var r = a[4];
                                            1 == r && (qt = a[0].toString().trim() + n,
                                            xt = "block");
                                            var d = 1 == r ? "radio_selected" : ""
                                              , _ = 1 == r ? "checked" : ""
                                              , u = "" != s ? "price-change" : ""
                                              , h = ""
                                              , v = ""
                                              , m = "";
                                            let f = "" != a[5] && null != a[5] ? a[5] : ""
                                              , k = parseInt(a[6]);
                                            var y = "";
                                            let g = "" != a[7] && null != a[7] ? a[7] : ""
                                              , w = "" != a[8] && null != a[8] ? a[8] : "";
                                            var b = "" != a[10] && null != a[10] ? a[10] : ""
                                              , x = "" != a[11] && null != a[11] && a[11]
                                              , C = ""
                                              , q = "disabled"
                                              , S = ""
                                              , F = "";
                                            if (checkPlan("inventory_and_sku_management", "boolean") && ("true" == f.toString() && "true" != g.toString() && k <= 0 && ("true" == w.toString() ? (h = "disabled",
                                            v = "is_hulk_disabled",
                                            d = "",
                                            _ = "",
                                            u = "") : (m = "is_hulk_hide",
                                            h = "disabled",
                                            d = "",
                                            _ = "",
                                            u = "")),
                                            "true" == f.toString() && (bt = !0),
                                            "true" == f.toString() && "true" != g.toString() && (y = k,
                                            1 == r && "" == h && (xt = "block",
                                            Ct = a[0].toString().trim() + n + "_hin_" + y),
                                            1 == $ && k > -1 && (F = `_hin_${c}_hin_${p}${a[0].toString().trim()}`,
                                            S = 0 == k ? " / " + window.hulk_out_of_stock_text : " / " + k + " " + window.hulk_inventory_text)),
                                            (1 == r && k > 0 && "true" != g.toString() || 1 == r && k <= 0 && "true" == g.toString()) && (q = ""),
                                            "" != b && (C = "<input type='hidden'  " + ut + "  name='properties[_SKU_" + p + "(" + a[0].toString().trim() + ")]' value='" + b + "' class='hulk_unique_sku' " + q + ">")),
                                            "0" == t && "" == m) {
                                                var I = 0;
                                                Et = !0
                                            } else if ("0" != t && 0 == Et) {
                                                I = 0;
                                                Et = !0
                                            } else
                                                I = -1;
                                            K ? (switch_div_css = "text-align: right; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;",
                                            switch_div_left_css = switch_div_css + "margin-left: -100px; max-width: 110px; min-width: 100px;",
                                            switch_div_right_css = switch_div_css + "margin-right: -100px; max-width: 150px; padding-left: 50px;",
                                            switch_left_css = `${"outside" == Jt ? switch_div_left_css : ""}`,
                                            switch_right_css = `${"outside" == Jt ? switch_div_right_css : ""}`,
                                            switch_css = `${0 == t ? switch_left_css : switch_right_css}`,
                                            switch_toggle_html += "inside" == Jt ? `${0 === t ? `<div class="switch_radio_div_inside">${a[0].toString().trim()} ${"with_price" == e.switch_style.inside_display_value ? `<span>${l}</span>` : ""}</div>` : ""} ${1 === t ? `<div class="switch_radio_div_inside">${a[0].toString().trim()} ${"with_price" == e.switch_style.inside_display_value ? `<span>${l}</span>` : ""}</div></div></div>` : ""}` : "</div>",
                                            div_title = `${a[0].toString().trim()} ${"with_price" == e.switch_style.outside_display_value || "outside" == Jt ? l : ""} ${S}`,
                                            div_content = `${a[0].toString().trim()} ${"with_price" == e.switch_style.outside_display_value || "outside" == Jt ? `<span>${l}</span>` : ""} ${S}`,
                                            html_radio = "<input name='hulk_radio_" + at + "' data-val-selected-class='radio_selected'  data-oid='" + at + "' data-pid='" + e.pid + "' data-parent='hulkapps_product_options' id='" + at + "_" + Bt + "' data-option-key='rb_" + at + "_" + Bt + "'  data-hinventory='" + y + "' type='radio' " + _ + " " + h + " class='switch_input hulkapps_option_child hulk_po_radiobutton hulkapps_option_" + at + " " + u + " ' data-price='" + s + "'  data-variant-id= '" + a[12] + "' data-shipping-weight= '" + a[13] + "' data-conditional-value='" + a[0].toString().trim() + "' value='" + a[0].toString().trim() + n + "'><label aria-label='" + a[0].toString().trim() + " " + n + "' for='" + at + "_" + Bt + "' aria-required='true' tabindex='" + I + "' class='hulkapps_radio_option " + lt + "  " + m + " " + v + " " + _t + "'><div style='" + switch_css + "' title='" + div_title + "' id='radio_div_" + at + "_" + Bt + "' class='radio_div switch_radio_div " + ("inside" == Jt ? "switch_radio_div_inside " : "") + d + "' data-uid='" + F + "' data-display-val='" + a[0].toString().trim() + l + "' data-hinventory='" + y + "'>" + div_content + "</div>" + C + "</label> " + (1 === t ? switch_toggle_html : ""),
                                            "inside" == Jt && "with_price" == e.switch_style.inside_display_value && "without_price" == e.switch_style.outside_display_value && (html_radio += "<script>var newElement = hulkapps_jQuery('#radio_div_" + at + "_" + Bt + "');var switchContainer = newElement.closest('.switches-container')[0];if (switchContainer) {var switchContainerHeight = switchContainer.offsetHeight + 20;hulkapps_jQuery(switchContainer).css('min-height', switchContainerHeight + 'px');}<\/script>")) : html_radio = "<label aria-label='" + a[0].toString().trim() + " " + n + "' aria-required='true' tabindex='" + I + "' class='hulkapps_radio_option " + lt + "  " + m + " " + v + " " + _t + "'><input name='hulk_radio_" + at + "' data-val-selected-class='radio_selected'  data-oid='" + at + "' data-pid='" + e.pid + "' data-parent='hulkapps_product_options' id='" + at + "_" + Bt + "' data-option-key='rb_" + at + "_" + Bt + "'  data-hinventory='" + y + "' type='radio' " + _ + " " + h + " class='hulkapps_option_child hulk_po_radiobutton hulkapps_option_" + at + " " + u + " ' data-price='" + s + "'  data-variant-id= '" + a[12] + "' data-shipping-weight= '" + a[13] + "' data-conditional-value='" + a[0].toString().trim() + "' value='" + a[0].toString().trim() + n + "'><div class='radio_div " + d + "' for='" + at + "_" + Bt + "' data-uid='" + F + "' data-display-val='" + a[0].toString().trim() + l + "' data-hinventory='" + y + "'>" + a[0].toString().trim() + l + S + "</div>" + C + "</label>",
                                            1 == x && (wt += html_radio),
                                            At += html_radio,
                                            Bt += 1
                                        }
                                        ));
                                        Ft = "";
                                        bt && (Ft = "<input type='hidden' " + ut + "  name='properties[_hin_" + c + "_hin_" + p + "]' value='" + Ct + "' class='hulk_unique_prop' data-unique_prop_name='_hin_" + c + "_hin_" + p + "'/>"),
                                        At += Ft,
                                        K && (At += "</div>"),
                                        checkPlan("quantity_selector", "boolean") && X && (At += "<input style='display: " + xt + "' type='number'  min='1' value='1' class='hulk_options_quantity hulk_po_radiobutton_quanity' data-parent='hulkapps_product_options' data-pid='" + e.pid + "' id='quantity_" + at + "'/>"),
                                        At += "<input type='hidden' " + ut + "  name='properties[" + p + "]' value='" + qt + "' class='hulk_radiobutton_hidden_prop'/></div></div>",
                                        st.includes(o) && (wt += "</div></div>"),
                                        dt += wt,
                                        checkPlan("image_change_based_on_option_value", "boolean") && 1 == Y && "" != W && (At += "<script>(function($) {$('.hulkapps_product_options .hulkapps_option_" + at + "').change(function() { var option_val  = $(this).data('conditional-value');$('" + W + "').each(function(){data_title = $(this).attr('alt');if(option_val === data_title){$(this).click();}});});;}(hulkapps_jQuery))<\/script>"),
                                        pt += At
                                    } else if ("file_upload" == H)
                                        At = "<div class='hulkapps_option fu_render " + a + " " + ct + " " + mt + " option_type_id_" + at + " " + ot + " " + D + "' " + T + "  data-parent-id='" + at + "'>",
                                        At += "<div aria-label='" + p + "' tabindex='0' aria-required='" + ht + " ' class='hulkapps_option_name'>" + p + " " + ft + " " + kt + " " + $t + "</div>",
                                        At += "<div class='hulkapps_option_value'><div class='file-upload' tabindex='0' aria-label='Choose File'> <div class='file-select'> <div class='file-select-name noFile' >No file chosen...</div><div class='file-select-button' id='fileName' >Choose File</div><input type='file' multiple data-option-key='fu_" + at + "' id='" + at + "' class='hulkapps_option_child hulkapps_full_width hulk_file_upload hulkapps_option_" + at + "' " + ut + "  name='properties[" + p + "]'> </div></div><script>(function($) {$('.hulkapps_product_options #" + at + "').change(function (){ conditional_rules(" + e.pid + ",'hulkapps_product_options');validate_single_option('option_type_id_" + at + "','fu_render','hulkapps_product_options');})}(hulkapps_jQuery))<\/script></div></div>",
                                        pt += At;
                                    else if ("email" == H) {
                                        Qt = "";
                                        At = "<div class='hulkapps_option et_render " + E + " " + a + " " + ct + " " + mt + " option_type_id_" + at + " " + ot + " " + D + "' " + T + " data-parent-id='" + at + "'>",
                                        At += "<div aria-label='" + p + "' tabindex='0' aria-required='" + ht + " ' class='hulkapps_option_name'>" + p + " " + ft + " " + kt + " " + $t + " </div>",
                                        "inlineLabels" == O && (Q = p),
                                        "floatingLabels" == O && (Q = ""),
                                        At += "<div class='hulkapps_option_value'>",
                                        t.each(it, (function(t, a) {
                                            var i = a[1]
                                              , o = a[9];
                                            "percentage_charge" == o && null != i && "" != i ? (i = parseFloat(product_price) / 100 / parseFloat(window.hulkapps_shopify_rate) * i / 100,
                                            i = parseFloat(i.toFixed(2)),
                                            window.need_varaint_change = !0) : "create_mulitplication_charge" == o && null != i && "" != i && (i = parseFloat(product_price) / 100 / parseFloat(window.hulkapps_shopify_rate) * i,
                                            i = parseFloat(i.toFixed(2)),
                                            window.need_varaint_change = !0);
                                            var n = null != i && "" != i ? i : "0.00"
                                              , l = (a[4],
                                            "" != n ? "price-change" : "");
                                            At += "<input type='email' placeholder='" + Q + "' data-option-key='et_" + at + "' data-parent='hulkapps_product_options' data-pid='" + e.pid + "' data-val-selected-class='emailbox_selected' data-single_valid-class='et_render' id='" + at + "' class='hulk_po_other_options hulkapps_option_child hulkapps_full_width hulkapps_option_" + at + " " + l + "' data-price='" + n + "'  data-variant-id= '" + a[12] + "' data-shipping-weight= '" + a[13] + "'><input type='hidden' " + ut + "  name='properties[" + p + "]' class='et_property_val other_options_prop_val'>",
                                            "floatingLabels" == O && (At += "<label class='floating_label'>" + p + "</label>")
                                        }
                                        )),
                                        pt += At = At + Qt + "</div></div>"
                                    } else if ("date_picker" == H) {
                                        if (checkPlan("date_field_option", "boolean") || 0 == checkPlan("date_field_option", "boolean") && 1 == oldStore()) {
                                            Qt = "",
                                            It = null != U && "" != U && "" != U.minimum_selection && null != U.minimum_selection ? U.minimum_selection.toString() : "",
                                            jt = null != U && "" != U && "" != U.maximum_selection && null != U.maximum_selection ? U.maximum_selection.toString() : "";
                                            var Rt = null != It ? It : ""
                                              , Ut = null != jt ? jt : "";
                                            if (1 == V) {
                                                var Ht = new Date
                                                  , Vt = Ht.getFullYear()
                                                  , Xt = String(Ht.getMonth() + 1).padStart(2, "0")
                                                  , Kt = String(Ht.getDate()).padStart(2, "0");
                                                Rt = Vt + "-" + Xt + "-" + Kt
                                            }
                                            At = "<div class='hulkapps_option dp_render " + a + " " + ct + " " + mt + " option_type_id_" + at + " " + ot + " " + D + "' " + T + " data-parent-id='" + at + "'>",
                                            At += "<div aria-label='" + p + "' tabindex='0' aria-required='" + ht + " ' class='hulkapps_option_name'>" + p + " " + ft + " " + kt + "   " + $t + "</div>",
                                            At += "<div class='hulkapps_option_value'>",
                                            t.each(it, (function(t, a) {
                                                var i = a[1]
                                                  , o = a[9];
                                                "percentage_charge" == o && null != i && "" != i ? (i = parseFloat(product_price) / 100 / parseFloat(window.hulkapps_shopify_rate) * i / 100,
                                                i = parseFloat(i.toFixed(2)),
                                                window.need_varaint_change = !0) : "create_mulitplication_charge" == o && null != i && "" != i && (i = parseFloat(product_price) / 100 / parseFloat(window.hulkapps_shopify_rate) * i,
                                                i = parseFloat(i.toFixed(2)),
                                                window.need_varaint_change = !0);
                                                var n = null != i && "" != i ? i : "0.00"
                                                  , l = (a[4],
                                                "" != n ? "price-change" : "");
                                                At += "<input type='date' min='" + Rt + "' max='" + Ut + "' tabindex='0' data-parent='hulkapps_product_options' data-pid='" + e.pid + "' data-single_valid-class='dp_render'  data-val-selected-class='datepicker_selected'  data-option-key='dp_" + at + "' id='" + at + "' name='input' placeholder='mm/dd/yyyy' class='hulk_po_other_options hulkapps_option_child hulkapps_full_width hulkapps_option_" + at + " " + l + "' data-price='" + n + "'  data-variant-id= '" + a[12] + "' data-shipping-weight= '" + a[13] + "'><input type='hidden' " + ut + "  name='properties[" + p + "]' class='dp_property_val other_options_prop_val'>"
                                            }
                                            )),
                                            pt += At += "</div></div>"
                                        }
                                    } else if ("time_picker" == H) {
                                        if (checkPlan("time_picker", "boolean")) {
                                            Qt = "",
                                            It = null != U && "" != U && "" != U.minimum_selection && null != U.minimum_selection ? U.minimum_selection.toString() : "",
                                            jt = null != U && "" != U && "" != U.maximum_selection && null != U.maximum_selection ? U.maximum_selection.toString() : "",
                                            Pt = It && jt && checkPlan("validation_for_min_max_option_selection", "boolean") ? '<span class="selection-text">[Select time between ' + It + " to " + jt + " ]</span>" : It && checkPlan("validation_for_min_max_option_selection", "boolean") ? '<span class="selection-text">[Select a time from ' + It + "]</span>" : jt && checkPlan("validation_for_min_max_option_selection", "boolean") ? '<span class="selection-text">[Select a time earlier than ' + jt + "]</span>" : "";
                                            var Yt = null != It ? It : ""
                                              , Zt = null != jt ? jt : "";
                                            At = "<div class='hulkapps_option dt_render " + a + " " + ct + " " + mt + " option_type_id_" + at + " " + ot + " " + D + "' " + T + " data-parent-id='" + at + "'>",
                                            At += "<div aria-label='" + p + "' tabindex='0' aria-required='" + ht + " ' class='hulkapps_option_name'>" + p + " " + ft + " " + kt + " " + Pt + " " + $t + "</div>",
                                            At += "<div class='hulkapps_option_value'>",
                                            t.each(it, (function(t, a) {
                                                var i = a[1]
                                                  , o = a[9];
                                                "percentage_charge" == o && null != i && "" != i ? (i = parseFloat(product_price) / 100 / parseFloat(window.hulkapps_shopify_rate) * i / 100,
                                                i = parseFloat(i.toFixed(2)),
                                                window.need_varaint_change = !0) : "create_mulitplication_charge" == o && null != i && "" != i && (i = parseFloat(product_price) / 100 / parseFloat(window.hulkapps_shopify_rate) * i,
                                                i = parseFloat(i.toFixed(2)),
                                                window.need_varaint_change = !0);
                                                var n = null != i && "" != i ? i : "0.00"
                                                  , l = (a[4],
                                                "" != n ? "price-change" : "");
                                                At += "<input type='time' min='" + Yt + "' max='" + Zt + "' data-parent='hulkapps_product_options' data-pid='" + e.pid + "' data-single_valid-class='dt_render'  data-val-selected-class='datetimepicker_selected'  data-option-key='dt_" + at + "' id='" + at + "' name='input' placeholder='mm/dd/yyyy' class='hulkapps_option_child hulkapps_full_width hulkapps_option_" + at + " " + l + "' data-price='" + n + "'  data-variant-id= '" + a[12] + "' data-shipping-weight= '" + a[13] + "'><input type='hidden' " + ut + "  name='properties[" + p + "]' class='dp_property_val other_options_prop_val'>"
                                            }
                                            )),
                                            pt += At += "</div></div>"
                                        }
                                    } else if ("color_picker" == H) {
                                        if (checkPlan("color_picker_option", "boolean")) {
                                            Qt = "";
                                            At = "<div class='hulkapps_option cp_render " + a + " " + ct + " " + mt + " option_type_id_" + at + " " + ot + " " + D + "' " + T + " data-parent-id='" + at + "'>",
                                            At += "<div aria-label='" + p + "' tabindex='0' aria-required='" + ht + " ' class='hulkapps_option_name'>" + p + " " + ft + " " + kt + " " + $t + "</div>",
                                            At += "<div class='hulkapps_option_value'>",
                                            t.each(it, (function(t, a) {
                                                var i = a[1]
                                                  , o = a[9];
                                                "percentage_charge" == o && null != i && "" != i ? (i = parseFloat(product_price) / 100 / parseFloat(window.hulkapps_shopify_rate) * i / 100,
                                                i = parseFloat(i.toFixed(2)),
                                                window.need_varaint_change = !0) : "create_mulitplication_charge" == o && null != i && "" != i && (i = parseFloat(product_price) / 100 / parseFloat(window.hulkapps_shopify_rate) * i,
                                                i = parseFloat(i.toFixed(2)),
                                                window.need_varaint_change = !0);
                                                var n = null != i && "" != i ? i : "0.00"
                                                  , l = "" != n ? "price-change" : "";
                                                At += "<input type='color' data-parent='hulkapps_product_options' data-pid='" + e.pid + "' data-val-selected-class='colorpicker_selected' data-single_valid-class='cp_render'  data-option-key='cp_" + at + "' id='" + at + "' name='input' style='padding: 0;width: 100px;' class='hulk_po_other_options hulkapps_option_child  hulkapps_option_" + at + " " + l + "' data-price='" + n + "'  data-variant-id= '" + a[12] + "' data-shipping-weight= '" + a[13] + "'><input type='hidden'" + ut + "   name='properties[" + p + "]' class='cp_property_val other_options_prop_val'>"
                                            }
                                            )),
                                            pt += At += "</div></div>"
                                        }
                                    } else if ("number_field" == H) {
                                        Qt = "";
                                        null != U && checkPlan("character_limit", "boolean", e.plan_id, e.plans_features) && "" != U.character_limit && U.character_limit,
                                        Mt = null != U && checkPlan("character_limit", "boolean") && "" != U.character_limit && null != U.character_limit ? "[Maximum " + U.character_limit + " character]" : "",
                                        At = "<div class='hulkapps_option nf_render " + E + " " + a + " " + ct + " " + mt + " option_type_id_" + at + " " + ot + " " + D + "' " + T + " data-parent-id='" + at + "'>";
                                        At += "<div aria-label='" + p + "' tabindex='0' aria-required='" + ht + " ' class='hulkapps_option_name'><div>" + p + " " + ft + " " + kt + " </div> " + Mt + " " + $t + "</div>",
                                        "inlineLabels" == O && (Q = p),
                                        "floatingLabels" == O && (Q = ""),
                                        At += "<div class='hulkapps_option_value'>",
                                        t.each(it, (function(t, a) {
                                            var i = a[1]
                                              , o = a[9];
                                            "percentage_charge" == o && null != i && "" != i ? (i = parseFloat(product_price) / 100 / parseFloat(window.hulkapps_shopify_rate) * i / 100,
                                            i = parseFloat(i.toFixed(2)),
                                            window.need_varaint_change = !0) : "create_mulitplication_charge" == o && null != i && "" != i ? (i = parseFloat(product_price) / 100 / parseFloat(window.hulkapps_shopify_rate) * i,
                                            i = parseFloat(i.toFixed(2)),
                                            window.need_varaint_change = !0) : "character_charge" == o && null != i && "" != i && (i = parseFloat(i));
                                            var n = null != i && "" != i ? i : "0.00"
                                              , l = ""
                                              , s = ""
                                              , r = "" != n ? "price-change" : "";
                                            null != U && checkPlan("character_limit", "boolean") && "" != U.character_limit && null != U.character_limit && (l = "maxlength=" + U.character_limit,
                                            s = "onKeyPress='if(this.value.length==" + U.character_limit + ") return false;'"),
                                            At += "<input type='number' data-is-charge='" + o + "' " + s + " pattern='d*' min=0 step='any' data-parent='hulkapps_product_options' data-pid='" + e.pid + "' data-val-selected-class='numberfield_selected' data-single_valid-class='nf_render' data-option-key='nf_" + at + "' id='" + at + "' placeholder='" + Q + "'  class='hulk_po_other_options hulkapps_option_child hulkapps_full_width hulkapps_option_" + at + " " + r + "' data-main-price='" + n + "' data-price='" + n + "' " + l + "  data-variant-id= '" + a[12] + "' data-shipping-weight= '" + a[13] + "'><input type='hidden' " + ut + "  name='properties[" + p + "]' class='nf_property_val other_options_prop_val'>",
                                            "floatingLabels" == O && (At += "<label class='floating_label'>" + p + "</label>"),
                                            null != U && checkPlan("character_limit", "boolean") && "" != U.character_limit && null != U.character_limit && (At += "<input type='hidden' value='" + U.character_limit + "' class='character_count'><div id='char_count_" + at + "'>" + U.character_limit + " " + e.display_settings.charcter_count_message + "</div>"),
                                            null != U && checkPlan("character_limit", "boolean") && "" != U.character_limit && null != U.character_limit && (Qt += "<script>(function($) {$(document).on('input', '.hulkapps_product_options .hulkapps_option_" + at + "', function() { if(this.value.length > Number($(this).attr('maxlength'))){val=this.value.slice(0, $(this).attr('maxlength'));$(this).val(val);}check_character_limit(" + U.character_limit + ",'" + at + "','" + e.display_settings.charcter_count_message + "','hulkapps_product_options');});}(hulkapps_jQuery))<\/script>")
                                        }
                                        )),
                                        pt += At = At + Qt + "</div></div>"
                                    } else if ("phone_number" == H) {
                                        Qt = "",
                                        At = "<div class='hulkapps_option pn_render " + a + " " + ct + " " + mt + " option_type_id_" + at + " " + ot + " " + D + "' " + T + " data-parent-id='" + at + "'>";
                                        At += "<div aria-label='" + p + "' tabindex='0' aria-required='" + ht + " ' class='hulkapps_option_name'>" + p + " " + ft + " " + kt + " " + $t + "</div>",
                                        At += "<div class='hulkapps_option_value'>",
                                        t.each(it, (function(t, a) {
                                            var i = a[1]
                                              , o = a[9];
                                            "percentage_charge" == o && null != i && "" != i ? (i = parseFloat(product_price) / 100 / parseFloat(window.hulkapps_shopify_rate) * i / 100,
                                            i = parseFloat(i.toFixed(2)),
                                            window.need_varaint_change = !0) : "create_mulitplication_charge" == o && null != i && "" != i && (i = parseFloat(product_price) / 100 / parseFloat(window.hulkapps_shopify_rate) * i,
                                            i = parseFloat(i.toFixed(2)),
                                            window.need_varaint_change = !0);
                                            var n = null != i && "" != i ? i : "0.00";
                                            At += "<input type='textbox' data-option-key='tb_" + at + "' id='" + at + "' class='phone_number phone_number" + at + " hulkapps_option_child hulkapps_full_width hulkapps_option_" + at + " " + ("" != n ? "price-change" : "") + "' data-price='" + n + "'  data-variant-id= '" + a[12] + "' data-shipping-weight= '" + a[13] + "' ><input type='hidden' " + ut + "  name='properties[" + p + "]' class='tb_property_val '><span id='valid-msg' class='hide'>✓ Valid</span><span id='error-msg' class='hide' tabindex='0' aria-label='Invalid number'>Invalid number</span>",
                                            Qt += "<script>(function($) {$(document).ready(function(){$('.hulkapps_product_options .phone_number" + at + "').keypress(function (e) {if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {return false;}});var telInput = $('.hulkapps_product_options').find('.phone_number" + at + "');var errorMsg = $('.hulkapps_product_options').find('.phone_number" + at + "').closest('.hulkapps_option_value').find('#error-msg');var validMsg = $('.hulkapps_product_options').find('.phone_number" + at + "').closest('.hulkapps_option_value').find('#valid-msg');var iti = window.intlTelInput(telInput.get(0), {initialCountry: 'auto',geoIpLookup: function(callback) {var countryCode = '" + e.country + "';callback(countryCode);},customPlaceholder: function(selectedCountryPlaceholder, selectedCountryData) {return 'e.g. ' + selectedCountryPlaceholder;}, utilsScript: 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/19.5.5/js/utils.min.js'});var reset = function() {telInput.removeClass('error');errorMsg.innerHTML = '';errorMsg.addClass('hide');validMsg.addClass('hide');};telInput.blur(function() {reset();if ($.trim($('.phone_number" + at + "').val())) {if(iti.isValidNumber()){validMsg.removeClass('hide');$('.hulkapps_product_options').find('.phone_number" + at + "').parents('.hulkapps_option_value').find('#error-msg').css('cssText', 'display: none !important');telInput.val(iti.getNumber(intlTelInputUtils.numberFormat.E164));var tb_val = $('.hulkapps_product_options').find('.phone_number" + at + "').val();var price = $(this).data('price');if(price != '0.00'){var res = tb_val + ' [ " + z + "' + price + ' ]';}else{var res = tb_val}$(this).parents('.hulkapps_option_value').find('.tb_property_val').val(res);$(this).addClass('textbox_selected');} else {telInput.addClass('error');$('.hulkapps_product_options').find('.phone_number" + at + "').parents('.hulkapps_option_value').find('#error-msg').css('cssText', 'display: block !important');$(this).parents('.hulkapps_option_value').find('.tb_property_val').val(res);$(this).removeClass('textbox_selected');}}else{$('.hulkapps_product_options').find('.phone_number').parents('.hulkapps_option_value').find('#error-msg').css('cssText', 'display: none !important');$(this).parents('.hulkapps_option_value').find('.tb_property_val').val(res);$(this).removeClass('textbox_selected');}conditional_rules(" + e.pid + ",'hulkapps_product_options');if($('#hulk_amount_dis').val() == '1'){calc_options_total(" + e.pid + ",'hulkapps_product_options');}validate_single_option('option_type_id_" + at + "', 'pn_render','hulkapps_product_options');});});}(hulkapps_jQuery))<\/script>"
                                        }
                                        )),
                                        pt += At = At + Qt + "</div></div>"
                                    } else if ("hidden" == H)
                                        checkPlan("hidden_field_option", "boolean") && (t.each(it, (function(t, e) {
                                            var i = e[0];
                                            At = "<input type='hidden' " + ut + "  name='properties[" + p + "]' class='hf_property_val   hulkapps_option_" + at + " " + a + " " + ot + "' value='" + i + "'>"
                                        }
                                        )),
                                        pt += At);
                                    else if ("popup" == H)
                                        checkPlan("popup_option", "boolean") && (At = "<div class='hulkapps_option popup_render " + a + " " + ct + " " + mt + " option_type_id_" + at + " " + ot + " " + D + "' " + T + " data-parent-id='" + at + "'>",
                                        At += "<div class='hulkapps_option_name' style='display: none !important;'>" + p + " " + ft + " " + kt + " " + $t + "</div>",
                                        At += "<div class='hulkapps_option_value'>",
                                        t.each(it, (function(t, e) {
                                            var a = e[0]
                                              , i = null != e[3] ? e[3] : "";
                                            At += "" != i ? "<div  class='cut-popup-icon'><span class='cut-popup-icon-span'><img src='" + i + "' style='width: 24px;'></span><a  tabindex='0' aria-label='" + a + "' style='cursor: pointer;' data-id='" + at + "' data-option-key='popup_" + at + "' id='" + at + "' class='hulkapps_option_child hulkapps_full_width popup_open_link hulkapps_option_" + at + "'>" + a + "</a></div>" : "<div style='display: flex; align-items: center;'><a  tabindex='0' aria-label='" + a + "'  style='cursor: pointer;' data-id='" + at + "' data-option-key='popup_" + at + "' id='" + at + "' class='hulkapps_option_child hulkapps_full_width popup_open_link hulkapps_option_" + at + "'>" + a + "</a></div>",
                                            At += "<div class='popup_detail'  id='popupdetailsdesing_" + at + "' style='display: none'><div><div class='des-title'></div><div tabindex='0' aria-label='" + e[2] + "'class='des-detail' style='padding: 10px;'>" + e[2] + "</div></div><a class='popup_close_link' tabindex='0' aria-label='close popup' data-id='" + at + "'><img src='" + window.hulkapps.po_url + "/images/close.png' alt='close-icon'></a></div><div class='overlay-popup'></div>"
                                        }
                                        )),
                                        pt += At += "</div></div>");
                                    else if ("information" == H)
                                        At = "<div class='hulkapps_option information_render " + a + " " + ct + " " + mt + " option_type_id_" + at + " " + ot + " " + D + "' " + T + " data-parent-id='" + at + "'>",
                                        At += "<div class='hulkapps_option_value'>",
                                        t.each(it, (function(t, e) {
                                            e[0];
                                            At += "<div>" + e[2] + "</div>"
                                        }
                                        )),
                                        pt += At += "</div></div>";
                                    else if ("google_font" == H) {
                                        if (checkPlan("google_font_option", "boolean")) {
                                            Qt = "";
                                            if (At = "<div class='hulkapps_option gf_render " + a + " " + ct + " " + mt + " option_type_id_" + at + " " + ot + " " + D + "' " + T + " data-parent-id='" + at + "'>",
                                            At += "<div aria-label='" + p + "' tabindex='0' aria-required='" + ht + " ' class='hulkapps_option_name'>" + p + " " + ft + " " + kt + " " + $t + " </div>",
                                            At += "<div class='hulkapps_option_value'>",
                                            te = "",
                                            option_charge_type = et.option_charge_type,
                                            et = et.price,
                                            "percentage_charge" == option_charge_type && null != et && "" != et && checkPlan("percentage_charge", "boolean") ? (et = parseFloat(product_price) / 100 / parseFloat(window.hulkapps_shopify_rate) * et / 100,
                                            window.need_varaint_change = !0,
                                            et = parseFloat(et.toFixed(2))) : "multiplication_charge" == option_charge_type && null != et && "" != et && (et = parseFloat(product_price) / 100 / parseFloat(window.hulkapps_shopify_rate) * et,
                                            et = parseFloat(et.toFixed(2)),
                                            window.need_varaint_change = !0),
                                            null != et && "" != et)
                                                var Wt = "price-change"
                                                  , Gt = "googlefont_selected"
                                                  , te = " [ " + z + et + " ]";
                                            else {
                                                et = "0.00";
                                                Wt = "price-change"
                                            }
                                            At += "<input type='text' tabindex='0' data-option-key='gf_" + at + "' id='" + at + "' value='" + tt + "' class='hulkapps_option_child hulkapps_full_width hulkapps_option_" + at + " " + Wt + " " + Gt + " ' data-price='" + et + "'>",
                                            At += "" == te ? "<input type='hidden' " + ut + "  name='properties[" + p + "]' class='gf_property_val'>" : "<input type='hidden' " + ut + " name='properties[" + p + "]' class='gf_property_val' value='" + tt + " " + te + "'>",
                                            At += "</div>",
                                            1 == f && (At += "<div class='font_preview " + mt + " font_preview_" + at + " " + D + "' " + T + " data-parent-id='" + at + "'><div aria-label='preview your font' tabindex='0' aria-required='false' class='hulkapps_option_name'>" + k + "</div><div class='hulkapps_option_value'><textarea placeholder='" + Q + "'  class='hulkapps_full_width' >" + Q + "</textarea></div></div>");
                                            var ee = JSON.stringify(G)
                                              , ae = JSON.stringify(Z);
                                            Qt += "<script>(function($) {var google_font_with_price_format = " + ee + ";var google_fonts_data = " + ae + ";$('.hulkapps_option_" + at + "').fontselect(google_fonts_data).change(function(){var font = $(this).val().replace('/+/g', ' ');font = font.split(':')[0];var option_charge_type = google_font_with_price_format[font]['option_charge_type'];var price=google_font_with_price_format[font]['price'];var variant_id=google_font_with_price_format[font]['variant_id']; var shipping_weight=google_font_with_price_format[font]['shipping_weight'];if(option_charge_type == 'percentage_charge' && price != null && price != ''){price = (((parseFloat(product_price)/100)/parseFloat(window.hulkapps_shopify_rate))*price)/100;price = parseFloat(price.toFixed(2));}if(option_charge_type == 'create_mulitplication_charge' && price != null && price != ''){price = (((parseFloat(product_price)/100)/parseFloat(window.hulkapps_shopify_rate))*price);price = parseFloat(price.toFixed(2));}if(price == null){price = '0.00'};$('.hulkapps_option_" + at + "').attr('data-variant-id',variant_id);$('.hulkapps_option_" + at + "').attr('data-shipping-weight',shipping_weight);$('.hulkapps_option_" + at + "').attr('data-price',price)});$(document).on('change','.hulkapps_product_options .hulkapps_option_" + at + "',function() {var price = $(this).attr('data-price');var gf_val = $(this).val();$('.font_preview_" + at + " textarea').css('font-family', gf_val);if (gf_val != '') {if(price != '0.00'){var res = gf_val + ' [ " + z + "' + price + ' ]';}else{var res = gf_val}$(this).parent().find('.gf_property_val').val(res);$(this).addClass('googlefont_selected');}else{ $(this).parent().find('.gf_property_val').val('');$(this).removeClass('googlefont_selected');}conditional_rules(" + e.pid + ",'hulkapps_product_options');if($('#hulk_amount_dis').val() == '1'){calc_options_total(" + e.pid + ",'hulkapps_product_options');}validate_single_option('option_type_id_" + at + "', 'gf_render','hulkapps_product_options');});}(hulkapps_jQuery))<\/script>",
                                            pt += At = At + Qt + "</div>"
                                        }
                                    } else if ("formula_based_options" == H) {
                                        if (checkPlan("formula_based_options", "boolean")) {
                                            At = "<div class='hulkapps_option fm_render required " + ct + " " + a + "  " + (1 == d ? "" : "full_width") + " option_type_id_" + at + " " + ot + " " + D + "' " + T + " data-parent-id= " + at + " ><div class='hulkapps_option_name'  aria-label='" + p + "' tabindex='0' >" + p + " " + ft + " " + kt + " " + $t + "</div><div class='hulkapps_option_value fm_option_val' data-parent='hulkapps_product_options' data-pid='" + e.pid + "'>";
                                            qt = "";
                                            var ie = !1;
                                            t.each(it, (function(t, e) {
                                                if (a = "",
                                                e[4])
                                                    var a = "<div class='hulkapps-tooltip'><span aria-describedby='tooltip_" + o + "' aria-label='" + e[4] + "' tabindex='0' ><img src='" + window.hulkapps.po_url + "/tooltip.svg' style='width:15px;'></span><div class='hulkapps-tooltip-inner' id='tooltip_" + o + "' role='tooltip'>" + e[4] + "</div></div>";
                                                if ("plus" == e[3])
                                                    var i = "+";
                                                else if ("minus" == e[3])
                                                    i = "-";
                                                else if ("divide" == e[3])
                                                    i = "/";
                                                else if ("multiple" == e[3])
                                                    i = "*";
                                                var n = "";
                                                "default_value" == e[0] ? (is_enabled_shopify_default_currency && null != e[2] && "" != e[2] && (new_price = parseFloat(e[2]) * parseFloat(window.hulkapps_shopify_rate),
                                                rounding_price ? e[2] = Math.round(new_price) : e[2] = new_price.toFixed(2)),
                                                n = "<div class='hulk-form-field'><div class='hulkapps_option_name' tabindex='0' aria-label='" + e[1] + "' >" + e[1] + "</div><div class='hulkapps_option_value'><input type='number'   value='" + parseFloat(e[2]) + "' data-oid='" + at + "' class='po_changed_formula' data-arithmatic='" + i + "' readonly data-name='" + e[1] + "' min='" + e[5] + "' max='" + e[6] + "'>" + a + "</div></div>") : (ie = !0,
                                                n = "<div class='hulk-form-field'><div class='hulkapps_option_name' tabindex='0' aria-label='" + e[1] + "'>" + e[1] + "</div><div class='hulkapps_option_value'><input type='number'  data-oid='" + at + "'  data-arithmatic='" + i + "' class='po_changed_formula hulkapps_option_child' data-name='" + e[1] + "'  min='" + e[5] + "' max='" + e[6] + "' >" + a + "</div></div>"),
                                                At += n
                                            }
                                            )),
                                            At += "<input type='hidden' " + ut + "   name='properties[" + p + "]'  class='hulk_formula_hidden_prop hulkapps_option_child'/>",
                                            pt += At += `<script>(function($) {if(${ie} != true){$('.option_type_id_${at}').find('.po_changed_formula').change();}}(hulkapps_jQuery))<\/script></div></div>`
                                        }
                                    } else if ("short_text_group" == H) {
                                        if (checkPlan("short_text_group", "boolean")) {
                                            Qt = "";
                                            At = "<div class='hulkapps_option stg_render " + a + " " + ct + " " + mt + " option_type_id_" + at + " " + ot + " " + D + "' " + T + " data-parent-id='" + at + "'>",
                                            At += "<div aria-label='" + p + "' tabindex='0' aria-required='" + ht + " ' class='hulkapps_option_name'>" + p + " " + ft + " " + kt + " " + $t + " </div>",
                                            At += "<div class='hulkapps_option_value'>",
                                            t.each(it, (function(t, a) {
                                                var i = a[0]
                                                  , o = a[1]
                                                  , n = a[9];
                                                "percentage_charge" == n && null != o && "" != o ? (o = parseFloat(product_price) / 100 / parseFloat(window.hulkapps_shopify_rate) * o / 100,
                                                o = parseFloat(o.toFixed(2)),
                                                window.need_varaint_change = !0) : "create_mulitplication_charge" == n && null != o && "" != o && (o = parseFloat(product_price) / 100 / parseFloat(window.hulkapps_shopify_rate) * o,
                                                o = parseFloat(o.toFixed(2)),
                                                window.need_varaint_change = !0);
                                                var l = null != o && "" != o ? o : "0.00";
                                                if (lt = "",
                                                _t = "",
                                                Object.keys(nt).length > 0)
                                                    for (const t in nt)
                                                        nt.hasOwnProperty(t) && Array.isArray(nt[t]) && nt[t].includes(a[0].toString().trim()) && (lt += ` ${t} `,
                                                        _t = se);
                                                At = "none" != i ? (At += "<div class='hulkapps_short_option_value " + lt + " " + _t + "' ><div class='hulkapps_option_name' tabindex='0' aria-label='" + a[0] + "'>" + a[0] + " </div>") + "<input type='text' placeholder='" + Q + "' data-option-key='stg_" + at + "' id='" + at + "' class='hulkapps_option_child hulkapps_full_width hulkapps_option_" + at + " " + Wt + "' data-price='" + l + "'  data-variant-id= '" + a[12] + "' data-shipping-weight= '" + a[13] + "' data-pid='" + e.pid + "'  data-oid='" + at + "' data-parent='hulkapps_product_options' data-key-name='" + i + "' data-single_valid-class='stg_render' data-val-selected-class='stg_selected'></div>" : At + "<input type='hidden' placeholder='" + Q + "' data-option-key='stg_" + at + "' id='" + at + "' class='hulkapps_option_child stg_hidden stg_hidden_" + at + " hulkapps_full_width hulkapps_option_" + at + " " + Wt + "' data-price='" + l + "'  data-variant-id= '" + a[12] + "' data-currency-symbol='" + z + "' data-pid='" + e.pid + "' data-shipping-weight= '" + a[13] + "'  data-oid='" + at + "' data-parent='hulkapps_product_options' data-single_valid-class='stg_render' data-val-selected-class='stg_selected'>"
                                            }
                                            )),
                                            At = At + "<input type='hidden' " + ut + "  name='properties[" + p + "]' class='stg_property_val'>",
                                            pt += At += "</div></div>"
                                        }
                                    } else if ("multi_qty_selector" == H && (window.hulk_multi_qty_selector = !0,
                                    checkPlan("multi_qty_selector", "boolean"))) {
                                        var oe = ""
                                          , ne = ""
                                          , le = "";
                                        It = null != U && "" != U && null != U.minimum_selection && "" != U.minimum_selection ? U.minimum_selection.toString() : "0",
                                        jt = null != U && "" != U && null != U.maximum_selection && "" != U.maximum_selection ? U.maximum_selection.toString() : "0",
                                        Pt = "0" != It && "0" != jt && checkPlan("validation_for_min_max_option_selection", "boolean") ? '<span aria-label="Choose from ' + It + " to " + jt + ' values" tabindex="0" class="selection-text">[Choose from ' + It + " to " + jt + " values]</span>" : "0" != It && checkPlan("validation_for_min_max_option_selection", "boolean", e.plan_id, e.plans_features) ? '<span aria-label="Choose at least ' + It + ' values" tabindex="0"  class="selection-text">[Choose at least ' + It + " values]</span>" : "0" != jt && checkPlan("validation_for_min_max_option_selection", "boolean") ? '<span aria-label="Choose upto ' + jt + ' values" tabindex="0" class="selection-text">[Choose upto ' + jt + " values]</span>" : "";
                                        if ("true" == m)
                                            oe = '<div class="hulk-custom-values-display prop_display_' + at + ' "  data-option-id="' + at + '"><p><span class="hulkselectedValue"></span><a href="javascript:void(0);" id="hulkModalBtn" class="hulkModalBtn hulkModalBtnSelect" data-prop-class="hulkapps_option_' + at + '_hidden" data-update-div-class="prop_display_' + at + '"  data-render-class="option_type_id_' + at + '" >' + select_button_text + "</a></p></div>",
                                            ne = "is_hulk_hide",
                                            le = "hulk_quantity_popup",
                                            mt = "";
                                        At = "<div class='hulkapps_option mq_render " + le + " " + a + " " + ct + " " + mt + " " + zt + " option_type_id_" + at + " " + ot + " " + D + "' " + T + " data-parent-id='" + at + "'" + (checkPlan("validation_for_min_max_option_selection", "boolean") ? " data-min='" + It + "' data-max='" + jt + "'" : "") + ">";
                                        At += "<div aria-label='" + p + "' tabindex='0' aria-required='" + ht + " ' class='hulkapps_option_name'><div>" + p + " " + ft + " " + kt + "  </div> " + Pt + " " + $t + "</div>",
                                        At += "<div class='hulkapps_option_value hulkapps_product_page_options " + ne + "'><div class='hulk_multi_qty_main'>";
                                        qt = [],
                                        Lt = 0,
                                        Ct = [],
                                        Et = !1;
                                        t.each(it, (function(t, a) {
                                            if (lt = "",
                                            _t = "",
                                            Object.keys(nt).length > 0)
                                                for (const t in nt)
                                                    nt.hasOwnProperty(t) && Array.isArray(nt[t]) && nt[t].includes(a[0].toString().trim()) && (lt += ` ${t} `,
                                                    _t = se);
                                            var i = a[1]
                                              , o = a[9];
                                            "percentage_charge" == o && null != i && "" != i ? (i = parseFloat(product_price) / 100 / parseFloat(window.hulkapps_shopify_rate) * i / 100,
                                            i = parseFloat(i.toFixed(2)),
                                            window.need_varaint_change = !0) : "create_mulitplication_charge" == o && null != i && "" != i && (i = parseFloat(product_price) / 100 / parseFloat(window.hulkapps_shopify_rate) * i,
                                            i = parseFloat(i.toFixed(2)),
                                            window.need_varaint_change = !0);
                                            var n = null != i && "" != i ? " [ " + z + i + " ]" : ""
                                              , l = null != i && "" != i && 0 == N ? " (+" + z + i + ")" : ""
                                              , s = null != i && "" != i ? i : "0.00";
                                            if (is_enabled_shopify_default_currency && null != i && "" != i) {
                                                new_price = parseFloat(i) * parseFloat(window.hulkapps_shopify_rate),
                                                rounding_price ? new_price = Math.round(new_price) : new_price = new_price;
                                                l = null != new_price && "" != new_price && 0 == N ? " [ " + currency_conversion(new_price) + " ]" : ""
                                            }
                                            var r = a[4];
                                            1 == r && (Lt += 1,
                                            qt.push(a[0].toString().trim() + n));
                                            var d = "" != s ? "price-change" : "";
                                            let _ = "" != a[5] && null != a[5] ? a[5] : ""
                                              , u = parseInt(a[6]);
                                            var h = "";
                                            let v = "" != a[7] && null != a[7] ? a[7] : "";
                                            "" != a[8] && null != a[8] && a[8];
                                            var f = "" != a[10] && null != a[10] ? a[10] : ""
                                              , k = ("" != a[11] && null != a[11] && a[11],
                                            "")
                                              , $ = "disabled";
                                            if ("true" == _.toString() && (bt = !0),
                                            "true" == _.toString() && "true" != v.toString() && (h = u,
                                            1 == r && Ct.push(a[0].toString().trim() + n + "_hin_" + h)),
                                            (1 == r && u > 0 && "true" != v.toString() || 1 == r && u <= 0 && "true" == v.toString()) && ($ = ""),
                                            "" != f && (k = "<input type='hidden' " + ut + "  name='properties[_SKU_" + p + "(" + a[0].toString().trim() + ")]' value='" + f + "' class='hulk_unique_sku' " + $ + "/>"),
                                            "0" == t) {
                                                Et = !0
                                            } else if ("0" != t && 0 == Et) {
                                                Et = !0
                                            } else
                                                ;if ("true" == _.toString() && "true" != v.toString() && u <= 0)
                                                ;
                                            else {
                                                if (html_checkbox = "<div class='muti-qty-div hulk_quantity_info' ><div class='hulk_swatch_Image is_hulk_hide '><img src='" + a[3] + "'></div>",
                                                "true" == m && (html_checkbox += "<div class='hulk_merge_qty'>"),
                                                html_checkbox += "<div class='hulk_quantity_left'><h5 class='qty-val hulk_size' data-qty-val='" + a[0].toString().trim() + n + "'>" + a[0].toString().trim() + l + k + "</h5></div><div class='hulk_swatch_desciption is_hulk_hide '><p class='hulk-limited-height'>" + a[12] + "</p><a href='javascript:void(0);' class='hulk-content-display'>See more</a></div><div class='hulk_quantity_div'><div class='hulk_quantity_right'>",
                                                h > 0 && "true" != v.toString()) {
                                                    let t = `_hin_${c}_hin_${p}${a[0].toString().trim()}`;
                                                    html_checkbox += "<div class='hulk_stock' data-uid='" + t + "' data-hinventory='" + h + "'> " + h + " " + window.hulk_inventory_text + " </div>"
                                                } else
                                                    html_checkbox += "<div class='hulk_stock' > " + window.hulk_inventory_text + " </div>";
                                                html_checkbox += "</div><div class='quantity_selector'><button type='button' data-htype='decrement' class='hulk_quantity_button multi-qty-option  hulkapps_option_child hulkapps_option_" + at + "_visible hulkapps_product_option_" + at + "_visible " + d + " ' >-</button><input  data-min='" + It + "' data-max='" + jt + "' step='1' data-htype='number_input' type='number' class='hulk_quantity_amount multi-qty-option' data-qval='0' id='multy_options_quantity'  data-hinventory='" + h + "'  data-parent='hulkapps_product_options' data-pid='" + e.pid + "' data-single_valid-class='mq_render' data-min='" + It + "' data-max='" + jt + "' data-oid='" + at + "' id='" + at + "' value='0' data-price='" + s + " '  data-shipping-weight= '" + a[14] + "' data-conditional-value='" + a[0].toString().trim() + "' data-value='" + a[0].toString().trim() + n + "' ></input><button type='button' data-htype='increment' class='hulk_quantity_button multi-qty-option  hulkapps_option_child hulkapps_option_" + at + "_visible hulkapps_product_option_" + at + "_visible " + d + " '>+</button></div></div>",
                                                "true" == m && (html_checkbox += "</div>"),
                                                html_checkbox += "</div>",
                                                At += html_checkbox
                                            }
                                        }
                                        )),
                                        "required" != ct || 0 == It && 0 == jt || ("0" != It && "0" != jt && checkPlan("validation_for_min_max_option_selection", "boolean") ? (parseInt(Lt) < parseInt(It) || parseInt(Lt) > parseInt(jt)) && (At += '</select><span class="validation_error error_span">Choose from ' + It + " to " + jt + " values</span>") : "0" != It && "0" == jt && checkPlan("validation_for_min_max_option_selection", "boolean") ? parseInt(Lt) < parseInt(It) && (At += '</select><span class="validation_error error_span">Choose at least ' + It + " values</span>") : "0" == It && "0" != jt && checkPlan("validation_for_min_max_option_selection", "boolean") && parseInt(Lt) > parseInt(jt) && (At += '</select><span class="validation_error error_span">Choose upto ' + jt + " values</span>"));
                                        Ft = "";
                                        At += Ft = "<input type='hidden' " + ut + "  name='properties[_hin_" + c + "_hin_" + p + "]' value='" + Ct + "' class='hulk_unique_prop hulk_mqty_session'  data-unique_prop_name='_hin_" + c + "_hin_" + p + "' data-selection-multi='true'/>",
                                        At += "<input class='hulkapps_option_child hulk_mutli_qty' value='" + qt.join(", ") + "' type='hidden' id='hulkapps_option_" + at + "_hidden' " + ut + "  name='properties[" + p + "]'></div>",
                                        At += "</div>",
                                        At += oe,
                                        pt += At += "</div>"
                                    }
                                }
                            }
                            ));
                            var ct = "<div class=''  id='recommended_detail' style='display: none'><div class='recommended_detail'><div class='recomodation_option_desc'><div class='recomodation-title'><span class='hulkapp_close close recommended_close_link' tabindex='0' aria-label='close recommended popup' >x</span></div><div tabindex='0' class='recomodation_option_detail' style='padding: 10px;'>" + dt + "</div></div></div><div class='overlay-popup'></div></div>";
                            "" !== pt && (lt = lt + pt + ("<input type='hidden' name='currency_symbol' value='" + z + "'>")),
                            t("body").append(ct),
                            lt += "</div>",
                            1 != parseInt(D) && "" != D || (lt += "<div id='option_total' style='display: none;'><input type='hidden' id='raw_option_total' value='0'><div id='option_display_total_format' tabindex='0'>" + T + "<span id='formatted_option_total'>" + e.currency_symbol + "<span id='calculated_option_total'>0.00</span></span>" + M + "</div></div>"),
                            lt += "<div id='error_text'></div>",
                            lt += "</div></div>"
                        }
                        if (0 == t("#hulkapps_custom_options_" + window.hulkapps.product_id).length && "is_collection_page" != a) {
                            let e = 0;
                            o.split(",").forEach((function(a) {
                                e += t(a).length,
                                null == window.hulk_add_to_cart_ele && e && (window.hulk_add_to_cart_ele = t(a).first())
                            }
                            ));
                            var ht = window.hulk_add_to_cart_ele;
                            ht.parent().is("div") && (ht = ht.parent()),
                            ht.before('<div id="hulkapps_custom_options_' + window.hulkapps.product_id + '"></div><div class="product-hulkapps-discount-code-html"></div>')
                        }
                        "is_collection_page" == a ? (lt = `<div class="col_hulkapp_popupOverlay hulk_po_${window.hulkapps.product_id}"><div class="col_hulkapp_popupBox"><div class="col_hulkapp_mainHead"><p class="col_hulkapp_popup-heading">Choose options</p><span class="col_hulkapp_close close">×</span></div><div class="col_hulkapp_mainContent">${lt}</div><div class="co_hulkapp_popup-footer">\n                               <button class="col_hulkapp_close btn btn--secondary button hulkapps_btn_cancel" type="button">Cancel</button>\n                               <button class=" btn btn--primary button hulkapps_btn_save co_options_save" data-quantity="1" data-product_id='${window.hulkapps.product_id}'>Save changes</button>\n                             </div></div></div>`,
                        t(`.hulkapps-po-main_parent_${window.hulkapps.product_id}`).find(".col_hulkapp_popupOverlay").remove(),
                        t(`.hulkapps-po-main_parent_${window.hulkapps.product_id}`).append(lt),
                        window.is_on_click = !0,
                        t(".col_hulkapp_popupOverlay").appendTo("body")) : t("#hulkapps_custom_options_" + window.hulkapps.product_id).html(lt),
                        requireInventory(window.hulkapps.product_id, "hulkapps_product_options"),
                        keybordAccess(),
                        window.dynamic_checkout_button_integration = e.display_settings.dynamic_checkout_button_integration,
                        "demo-bhavya.myshopify.com" != Shopify.shop && "amish-baskets.myshopify.com" != Shopify.shop && "fws-rushking.myshopify.com" != Shopify.shop || (window.is_checkout_api = e.display_settings.is_checkout_api),
                        window.is_product_page_doscount_code = e.display_settings.dynamic_checkout_discount_code,
                        window.ignore_min_max_validation = e.display_settings.ignore_min_max_validation,
                        conditional_rules(window.hulkapps.product_id, "hulkapps_product_options"),
                        t("#hulkapps_options_" + window.hulkapps.product_id).closest("form").find(":submit").addClass("hulkapps_submit_cart"),
                        window.$first_add_to_cart_el && window.$first_add_to_cart_el.removeClass("hulkapps_submit_cart").addClass("hulkapps_submit_cart"),
                        "" == t("#hulkapps_option_list_" + window.hulkapps.product_id + " .hulkapps_option_set").html() && t("#hulkapps_options_" + window.hulkapps.product_id).css("display", "none"),
                        window.hulk_multi_qty_selector && window.hulkUpdateStockStatus(t)
                    } else
                        "is_collection_page" == a && (window.hulk_options_not_available_text || (window.hulk_options_not_available_text = "Options not available"),
                        t(`.hulkapps-po-main_form_${window.hulkapps.product_id}`).append(`<div class='hulk_options_not_available'><p>${window.hulk_options_not_available_text}</p></div>`))
                },
                error: function(t, e) {
                    window.$first_add_to_cart_el && window.$first_add_to_cart_el.removeAttr("disabled")
                }
            })
        }
        ,
        window.hulkappsStart = function(t) {
            window.$first_add_to_cart_el = null;
            var e = 0;
            if (["input[name='add']", "button[name='add']", "#add-to-cart", "#AddToCartText", "#AddToCart", 'form[action$="/cart/add"] :input[type="submit"], .hulkapps_submit_cart'].forEach((function(a) {
                e += t(a).length,
                null == window.$first_add_to_cart_el && e && (window.$first_add_to_cart_el = t(a).first())
            }
            )),
            window.$first_add_to_cart_el && (window.$first_add_to_cart_el.attr("disabled", !0),
            setTimeout((function() {
                window.$first_add_to_cart_el.removeAttr("disabled")
            }
            ), 2500)),
            "product" == window.hulkapps.page_type && window.hulkapps.product_id && window.hulkapps.store_id) {
                product_page_btn_condition(),
                document.addEventListener("change", (function(t) {
                    t.target.matches(".single-option-selector,.swatch-element input[type='radio'],.single-option-selector__radio, select[data-option='option1'], select[data-option='option1']:checked, select[data-option='option2'], select[data-option='option1']:checked, select[data-option='option3'], select[data-option='option3']:checked, select[data-index='option1'], select[data-index='option1']:checked, select[data-index='option2'], select[data-index='option1']:checked, select[data-index='option3'], select[data-index='option3']:checked, ul li div[swatch-option='option1'], input[type='radio']") && function(t) {
                        var e = [];
                        document.querySelectorAll(".single-option-selector,.swatch-element input[type='radio'],.single-option-selector__radio, select[data-option='option1'], select[data-option='option1']:checked, select[data-option='option2'], select[data-option='option1']:checked, select[data-option='option3'], select[data-option='option3']:checked, select[data-index='option1'], select[data-index='option1']:checked, select[data-index='option2'], select[data-index='option1']:checked, select[data-index='option3'], select[data-index='option3']:checked, ul li div[swatch-option='option1'], input[type='radio']").forEach((function(t) {
                            var a = !!t.options && t.options[t.options.selectedIndex].selected;
                            (t.checked || a) && e.push(t.value)
                        }
                        )),
                        e = e.join(" / "),
                        Object.keys(hulk_variants).forEach((function(a) {
                            var i = hulk_variants[a];
                            if (i.options.length < 2)
                                selected_variant_title = t.target.value.toString().toLowerCase(),
                                (o = i.title.toString().toLowerCase()).trim() == selected_variant_title.trim() && (i.id,
                                window.hulkapps.product.selected_variant = i.id,
                                product_price = i.price,
                                window.hulkapps.product.selected_variant_price = product_price);
                            else {
                                selected_variant_title = e.toString().toLowerCase();
                                var o = i.title.toString().toLowerCase();
                                selected_variant_title.includes(o) && (i.id,
                                window.hulkapps.product.selected_variant = i.id,
                                product_price = i.price,
                                window.hulkapps.product.selected_variant_price = product_price)
                            }
                            document.querySelector('script[type="application/json"][data-variant]') && updateSelectedVariant()
                        }
                        )),
                        setTimeout((function() {
                            calc_options_total(window.hulkapps.product_id, "hulkapps_product_options")
                        }
                        ), 800)
                    }(t)
                }
                )),
                productPageAjax(t)
            }
            t("body").on("change", 'input[name="updates[]"]', (function(e) {
                t('[name="update"]').click()
            }
            )),
            window.hulkUpdateStockStatus = function(t) {
                let e = {};
                new Promise(( (a, i) => {
                    t.getJSON("/cart.js", {
                        _: (new Date).getTime()
                    }, (function(i) {
                        i && i.item_count > 0 && i.items.forEach((function(a) {
                            var i = a.quantity;
                            null != a.properties && a.properties != {} && t.each(a.properties, (function(a, o) {
                                if (a.startsWith("_hin") && o)
                                    if (1 != window.opt_with_otc[a] && "true" != window.opt_with_otc[a] || (i = 1),
                                    o.includes(",")) {
                                        o.split(",").forEach((function(o) {
                                            let n = o.split("_hin_")[0];
                                            var l = t.trim(o.split("_hin_")[1].split("|")[1]);
                                            l.includes(")") && (l = parseInt(l.split(")"))),
                                            l <= 0 && (l = 1),
                                            n = a + t.trim(n.split("[")[0]),
                                            e[n] ? e[n] = e[n] + i * l : e[n] = i * l
                                        }
                                        ))
                                    } else {
                                        var n = t.trim(o.split("_hin_")[1].split("|")[1]);
                                        n.includes(")") && (n = parseInt(n.split(")"))),
                                        n <= 0 && (n = 1);
                                        let l = a + t.trim(o.split("_hin_")[0].split("[")[0]);
                                        e[l] ? e[l] = e[l] + i * n : e[l] = i * n
                                    }
                            }
                            ))
                        }
                        )),
                        a(e)
                    }
                    ))
                }
                )).then((function(e) {
                    for (const a in e)
                        if (e.hasOwnProperty(a)) {
                            let i = t(`[data-uid='${a}']`);
                            if (i.length > 0) {
                                let t = parseInt(i.attr("data-hinventory")) - parseInt(e[a]);
                                if (i.hasClass("hulk_stock"))
                                    t > 0 ? i.hasClass("dropdown_swatch") ? i.find(".dropdown-text").text(`${t} ${window.hulk_inventory_text}`) : i.text(`${t} ${window.hulk_inventory_text}`) : i.hasClass("dropdown_swatch") ? i.find(".dropdown-text").text(`${window.hulk_out_of_stock_text}`) : i.text(`${window.hulk_out_of_stock_text}`);
                                else {
                                    let e = i.attr("data-display-val") + " / ";
                                    t > 0 ? i.hasClass("dropdown_swatch") ? i.find(".dropdown-text").text(`${e} ${t} ${window.hulk_inventory_text}`) : i.text(`${e} ${t} ${window.hulk_inventory_text}`) : i.hasClass("dropdown_swatch") ? i.find(".dropdown-text").text(`${e} ${window.hulk_out_of_stock_text}`) : i.text(`${e} ${window.hulk_out_of_stock_text}`)
                                }
                            }
                        }
                }
                ))
            }
        }
        ,
        window.hulkappsParseURL = function(t) {
            if (t) {
                var e = RegExp("^(([^:/?#]+):)?(//([^/?#]*))?([^?#]*)(\\?([^#]*))?(#(.*))?")
                  , a = t.match(e)
                  , i = a[7];
                return i && (i = new URLSearchParams(i)),
                {
                    scheme: a[2],
                    authority: a[4],
                    path: a[5],
                    query: i,
                    fragment: a[9]
                }
            }
        }
        ,
        hulkappsStart(t),
        window.dispatchEvent(new CustomEvent("HulkEvents",{
            detail: {
                app: "Product Options",
                status: "CommonJS Loaded"
            }
        }))
    }
    ,
    window.getCartInfo = function(t=0, e="", a=hulkapps_jQuery) {
        if (0 != t) {
            var i = t.key;
            let e = t.properties;
            if (e) {
                var o = "";
                Object.keys(e).forEach((function(t) {
                    if (e[t].includes("uploads")) {
                        var a = e[t].split("/")
                          , i = a[a.length - 1];
                        o += '<div class="product-option"><dt>' + t + ': </dt><dd>  <a href="' + e[t] + '" class="link" target="_blank">' + i + "</a></dd></div>"
                    } else
                        t.startsWith("_hin") || t.startsWith("_SKU") || (o += '<div class="product-option"><dt>' + t + ': </dt><dd class="hpo-price">' + e[t] + "</dd></div>")
                }
                )),
                window.currentEditOptionSelector.parents(window.cart_lineitem_parents_selectors).find(window.cart_item_properties_selectors).html(o)
            } else
                window.currentEditOptionSelector.parents(window.cart_lineitem_parents_selectors).find(window.cart_item_properties_selectors).html("")
        }
        new Promise((function(t, i) {
            e ? t(e) : a.getJSON("/cart.js", {
                _: (new Date).getTime()
            }, (function(e) {
                t(e)
            }
            ))
        }
        )).then((function(t) {
            if (t && t.item_count > 0) {
                var e = localStorage.getItem("discount_code");
                window.hulkapps.cart = t,
                new Promise(( (t, e) => {
                    a.ajax({
                        url: "/cart?view=hulkapps_cart_collections.json",
                        success: function(e) {
                            try {
                                if (e) {
                                    var i = JSON.parse(e);
                                    if (i) {
                                        var o = i.items;
                                        a.each(o, (function(t, e) {
                                            window.hulkapps.cart_collections[e.variant_id] = e.product_collections
                                        }
                                        ))
                                    }
                                }
                                t(window.hulkapps.cart_collections)
                            } catch (e) {
                                t(window.hulkapps.cart_collections)
                            }
                        },
                        error: function(e) {
                            t(window.hulkapps.cart_collections)
                        }
                    })
                }
                )).then((function(o) {
                    window.hulkapps.cart_collections = o;
                    let n = Object.assign({}, window.hulkapps);
                    if (delete n.product,
                    "" != e) {
                        a(".hulkapps_discount_code").val(e);
                        var l = {
                            cart_data: n,
                            store_id: window.hulkapps.store_id,
                            discount_code: e,
                            cart_collections: JSON.stringify(window.hulkapps.cart_collections),
                            customer_tags: null != window.hulkapps.customer ? window.hulkapps.customer.tags.split(",") : "",
                            currency_rate: window.hulkapps_shopify_rate
                        }
                    } else
                        l = {
                            cart_data: n,
                            store_id: window.hulkapps.store_id,
                            cart_collections: JSON.stringify(window.hulkapps.cart_collections),
                            customer_tags: null != window.hulkapps.customer ? window.hulkapps.customer.tags.split(",") : "",
                            currency_rate: window.hulkapps_shopify_rate
                        };
                    var s = 0;
                    t.items.forEach((function(t) {
                        null != t.properties && t.properties != {} && s++
                    }
                    )),
                    s > 1 ? a(checkout_selectors).attr("disabled", !0) : a(checkout_selectors).attr("disabled", !1),
                    a(checkout_selectors).attr("disabled", !0),
                    a.ajax({
                        type: "POST",
                        url: window.hulkapps.po_url + "/store/get_cart_details",
                        data: l,
                        crossDomain: !0,
                        success: function(t) {
                            if (a(checkout_selectors).attr("disabled", !1),
                            a.isEmptyObject(t))
                                window.is_draft_order = !1;
                            else {
                                var e = t.discounts.cart_item_price_selectors;
                                window.hulk_po_currency_symbol = t.discounts.currency_symbol;
                                var o = t.discounts.cart_item_line_price_selectors
                                  , n = t.discounts.cart_item_line_price_before_discount;
                                window.cart_lineitem_parents_selectors = t.discounts.cart_lineitem_parents_selectors.split(",")[0],
                                window.cart_item_properties_selectors = t.discounts.cart_item_properties_selectors.split(",")[0],
                                t.discounts.cart.items.forEach((function(t, l) {
                                    setTimeout((function() {
                                        i && t.key == i && (e = e.split(","),
                                        a.each(e, (function(e, a) {
                                            window.currentEditOptionSelector.parents(window.cart_lineitem_parents_selectors).find(a).html(t.original_price_format)
                                        }
                                        )),
                                        o = o.split(","),
                                        a.each(o, (function(e, a) {
                                            window.currentEditOptionSelector.parents(window.cart_lineitem_parents_selectors).find(a).html(t.original_line_price_format)
                                        }
                                        )),
                                        n = n.split(","),
                                        a.each(n, (function(e, a) {
                                            window.currentEditOptionSelector.parents(window.cart_lineitem_parents_selectors).find(a).html(t.cart_item_line_price_before_discount)
                                        }
                                        )))
                                    }
                                    ), 500)
                                }
                                )),
                                hulkappsDoActions(t),
                                window.hulk_inventory_arr = t.discounts.inventory_arr,
                                t.discounts.is_draft_order ? window.is_draft_order = !0 : window.is_draft_order = !1,
                                t.discounts.inventory_arr && t.discounts.inventory_arr.length <= 0 && a(".inventory_validation_hulkapps").remove(),
                                t.discounts.is_enabled_shopify_default_currency && 1 == t.discounts.is_enabled_shopify_default_currency && a(".hpo-price").each((function() {
                                    let t = a(this).text();
                                    pricesArray = t.split(","),
                                    pricesArray.forEach(( (t, e) => {
                                        let a = t.match(/\[\s*[^\d]*([\d,.]+)\s*\]/);
                                        if (a) {
                                            let i = parseFloat(a[1].replace(",", "")) * parseFloat(window.hulkapps_shopify_rate);
                                            pricesArray[e] = t.replace(a[0], `[ ${currency_conversion(i)} ]`)
                                        }
                                    }
                                    )),
                                    t = pricesArray.join(","),
                                    a(this).text(t)
                                }
                                ))
                            }
                        },
                        error: function(t, e) {
                            a(checkout_selectors).attr("disabled", !1)
                        }
                    })
                }
                )).catch((function(t) {
                    console.error(t)
                }
                ))
            }
        }
        )).catch((function(t) {}
        ))
    }
    ,
    window.cartPageJS = function(t) {
        t(document).on("keypress", ".hulkapps_discount_code", (function(e) {
            13 == e.which && t(".hulkapps_discount_button").click()
        }
        )),
        t(document).on("click", ".hulkapps_discount_button", (function(e) {
            e.preventDefault();
            var a = t(this).parents(".discount_code_box").find(".hulkapps_discount_code").val();
            "" == (a = t.trim(a)) ? t(".hulkapps_discount_code").addClass("discount_error") : (localStorage.setItem("discount_code", a),
            t(".hulkapps_discount_code").removeClass("discount_error")),
            window.getCartInfo()
        }
        )),
        t(document).on("click", ".close-tag", (function(t) {
            localStorage.removeItem("discount_code"),
            window.getCartInfo()
        }
        )),
        t(document).on("click", ".hulkapp_save", (function(e) {
            e.preventDefault();
            var a = parseInt(t(this).parents(".hulkapp_popupBox").find(".hulkapp_mainContent").find(".h_index").val()) + 1
              , i = t(this).attr("data-quantity")
              , o = t(this).parents(".hulkapp_popupBox").find(".hulkapp_mainContent").find(".h_variant_id").val()
              , n = {};
            new Promise(( (e, a) => {
                e(validate_options(t(this).data("product_id"), "hulkapps_edit_product_options", t(this).attr("data-quantity")))
            }
            )).then((function(e) {
                if (e)
                    if (t(checkout_selectors).attr("disabled", !0),
                    isFilePresent = !1,
                    t("#edit_cart_popup [name^='properties']").each((function(e, a) {
                        var i;
                        "" == t(this).val() && t(this).remove(),
                        "radio" == this.type ? this.checked && (i = this.name.replace("properties[", "").replace("]", ""),
                        t.trim(this.value).length > 0 && (n[i] = this.value)) : "file" == this.type ? (isFilePresent = !0,
                        i = this.name.replace("properties[", "").replace("]", ""),
                        t.trim(this.value).length > 0 && (n[i] = this.value)) : (i = this.name.replace("properties[", "").replace("]", ""),
                        t.trim(this.value).length > 0 && (n[i] = this.value))
                    }
                    )),
                    t.isEmptyObject(n))
                        "" != t(".upload_cls").val() ? t(".upload_h_cls").remove() : t(".upload_cls").remove(),
                        t("#edit_cart_popup .conditional").each((function(e, a) {
                            t(this).find('.hulkapps_option_value input[type="hidden"]').val("")
                        }
                        )),
                        t("[name^='properties']").each((function(e, a) {
                            "" == t(this).val() && t(this).remove()
                        }
                        )),
                        t.ajax({
                            type: "POST",
                            url: "/cart/change.js",
                            data: {
                                quantity: 0,
                                line: a
                            },
                            dataType: "json",
                            success: function(e) {
                                "" != t(".upload_cls").val() ? t(".upload_h_cls").remove() : t(".upload_cls").remove(),
                                t("#edit_cart_popup .conditional").each((function(e, a) {
                                    t(this).find('.hulkapps_option_value input[type="hidden"]').val("")
                                }
                                )),
                                t("[name^='properties']").each((function(e, a) {
                                    "" == t(this).val() && t(this).remove()
                                }
                                )),
                                t.ajax({
                                    type: "POST",
                                    url: "/cart/add.js",
                                    data: {
                                        quantity: i,
                                        id: o
                                    },
                                    dataType: "json",
                                    success: function(e) {
                                        window.currentEditOptionSelector.data("key", e.key),
                                        window.getCartInfo(e),
                                        t(".hulkapp_close").click(),
                                        "wine-delight.myshopify.com" == Shopify.shop && location.reload()
                                    }
                                })
                            }
                        });
                    else {
                        var l = new FormData(t("#edit_cart_popup")[0]);
                        l.append("quantity", i),
                        l.append("line", a),
                        "" != t(".upload_cls").val() ? t(".upload_h_cls").remove() : t(".upload_cls").remove(),
                        t("#edit_cart_popup .conditional").each((function(e, a) {
                            t(this).find('.hulkapps_option_value input[type="hidden"]').val("")
                        }
                        )),
                        t("[name^='properties']").each((function(e, a) {
                            "" == t(this).val() && t(this).remove()
                        }
                        )),
                        isFilePresent ? t.ajax({
                            type: "POST",
                            url: "/cart/change.js",
                            data: {
                                quantity: 0,
                                line: a
                            },
                            dataType: "json",
                            success: function(e) {
                                "" != t(".upload_cls").val() ? t(".upload_h_cls").remove() : t(".upload_cls").remove(),
                                t("#edit_cart_popup .conditional").each((function(e, a) {
                                    t(this).find('.hulkapps_option_value input[type="hidden"]').val("")
                                }
                                )),
                                t("[name^='properties']").each((function(e, a) {
                                    "" == t(this).val() && t(this).remove()
                                }
                                )),
                                t.ajax({
                                    type: "POST",
                                    url: "/cart/add.js",
                                    data: l,
                                    dataType: "json",
                                    contentType: !1,
                                    processData: !1,
                                    success: function(e) {
                                        window.currentEditOptionSelector.data("key", e.key),
                                        window.getCartInfo(e),
                                        t(".hulkapp_close").click()
                                    }
                                })
                            }
                        }) : t.ajax({
                            type: "POST",
                            url: "/cart/change.js",
                            data: l,
                            dataType: "json",
                            contentType: !1,
                            processData: !1,
                            success: function(e) {
                                e = e.items[a - 1],
                                window.currentEditOptionSelector.data("key", e.key),
                                window.getCartInfo(e),
                                t(".hulkapp_close").click()
                            }
                        })
                    }
            }
            )).catch((function(t) {
                console.log(t)
            }
            ))
        }
        )),
        t(document).on("click touchstart", ".hulkapp_close", (function(e) {
            t(".edit_popup").hide(),
            t("body").removeClass("body_fixed")
        }
        )),
        t(document).on("click touchstart", ".col_hulkapp_close", (function(e) {
            t(`.hulk_po_${window.hulkapps.product_id}`).hide(),
            t("body").removeClass("body_fixed")
        }
        )),
        t(document).on("click touchstart", ".co_options_save", (function(e) {
            e.preventDefault();
            var a = t(this);
            new Promise(( (t, e) => {
                t(validate_options(window.hulkapps.product_id, "hulkapps_product_options"))
            }
            )).then((function(e) {
                if (e) {
                    var i = a.parent(".co_hulkapp_popup-footer").parent(".col_hulkapp_popupBox").find(".col_hulkapp_mainContent").find('input[name^="properties"][value!=""]');
                    t(`.hulkapps-po-main_form_${window.hulkapps.product_id}`).find(`.hulkapps_po_properties_${window.hulkapps.product_id}`).remove(),
                    t(`.hulkapps-po-main_form_${window.hulkapps.product_id}`).append(`<div class="hulkapps_po_properties_${window.hulkapps.product_id}" style="display: none;"></div>`),
                    i.each((function() {
                        "" != t(this).val() && t(`.hulkapps_po_properties_${window.hulkapps.product_id}`).append(t(this).clone())
                    }
                    )),
                    t(`.hulk_po_${window.hulkapps.product_id}`).hide(),
                    t("body").removeClass("body_fixed"),
                    hulk_flag = 1
                }
            }
            )).catch((function(t) {}
            ))
        }
        )),
        t(document).on("keyup", ".hulkapps_discount_code", (function(e) {
            "" != t.trim(t(this).val()) ? (t(".hulkapps_product_discount_button").removeAttr("disabled"),
            t(".hulkapps_product_discount_button").removeClass("hulkapps_product_discount_disabled_button")) : (t(".hulkapps_product_discount_button").attr("disabled", "disabled"),
            t(".hulkapps_product_discount_button").addClass("hulkapps_product_discount_disabled_button"))
        }
        ))
    }
    ,
    window.productPageJS = function($) {
        function resolveInventory(t, e, a="") {
            var i = {}
              , o = !1;
            return 0 == e && (o = !0),
            new Promise(( (t, e) => {
                $.getJSON("/cart.js", {
                    _: (new Date).getTime()
                }, (function(e) {
                    e && e.item_count > 0 && e.items.forEach((function(t) {
                        var e = t.quantity;
                        null != t.properties && t.properties != {} && $.each(t.properties, (function(t, a) {
                            if (t.startsWith("_hin") && a)
                                if (1 != window.opt_with_otc[t] && "true" != window.opt_with_otc[t] || (e = 1),
                                a.includes(",")) {
                                    a.split(",").forEach((function(a) {
                                        let o = a.split("_hin_")[0];
                                        var n = $.trim(a.split("_hin_")[1].split("|")[1]);
                                        n.includes(")") && (n = parseInt(n.split(")"))),
                                        n <= 0 && (n = 1),
                                        o = t + $.trim(o.split("[")[0]),
                                        i[o] ? i[o] = i[o] + e * n : i[o] = e * n
                                    }
                                    ))
                                } else {
                                    var o = $.trim(a.split("_hin_")[1].split("|")[1]);
                                    o.includes(")") && (o = parseInt(o.split(")"))),
                                    o <= 0 && (o = 1);
                                    let n = t + $.trim(a.split("_hin_")[0].split("[")[0]);
                                    i[n] ? i[n] = i[n] + e * o : i[n] = e * o
                                }
                        }
                        ))
                    }
                    )),
                    t(i)
                }
                ))
            }
            )).then((function(i) {
                return $("." + t).find(".inventory_error").remove(),
                $("." + t).find(".hulk_unique_prop").each((function() {
                    var t = $(this).data("selection-multi")
                      , n = $(this).attr("data-inventory-record");
                    if (n && (n = n.split(",")),
                    null != t && 1 == t) {
                        var l = $(this)
                          , s = $(this).val().split(", ")
                          , p = e;
                        $.each(s, (function(t, s) {
                            if ("" != s) {
                                var r = s.split("_hin_")[1];
                                r = parseInt(r);
                                var d = 1;
                                if ($("input[name=quantity]").val() && (d = parseInt($("input[name=quantity]").val())),
                                1 == window.opt_with_otc[l.data("unique_prop_name")] || "true" == window.opt_with_otc[l.data("unique_prop_name")])
                                    var _ = 1;
                                else if ("" != a)
                                    _ = parseInt(a);
                                else
                                    _ = d;
                                var u = 1;
                                n && (_ = 1,
                                $.each(n, (function(t, e) {
                                    (e = e.split("_hin_"))[0] == s.split("_hin_")[0] && (u = parseInt(e[1]))
                                }
                                ))),
                                u <= 0 && (u = 1),
                                _ *= u;
                                let t = s.split("_hin_")[0];
                                if (t = l.attr("data-unique_prop_name") + $.trim(t.split("[")[0]),
                                i[t]) {
                                    var c = i[t];
                                    _ += parseInt(c)
                                }
                                if (c)
                                    var h = parseInt(r) - parseInt(c);
                                else
                                    h = parseInt(r);
                                let v = $(".hulkapps_edit_product_options").find(`[data-uid='${t}']`);
                                if (v.length > 0) {
                                    let t = v.attr("data-used_hinventory");
                                    r += parseInt(t)
                                }
                                r < _ ? (p = !1,
                                $(l).parents(".hulkapps_option").addClass("validation_error"),
                                h > 0 ? $(l).parents(".hulkapps_option").append(`<p class="inventory_error" tabindex="0" aria-label="Only ${h} inventory available for this ${s.split("_hin_")[0]} option. </p>">Only ${h} inventory available for this ${s.split("_hin_")[0]} option. </p>`) : $(l).parents(".hulkapps_option").append(`<p class="inventory_error" tabindex="0" aria-label="Not enough items in the inventory for ${s.split("_hin_")[0]}.">Not enough items in the inventory for ${s.split("_hin_")[0]}. </p>`),
                                o = !0,
                                e = !1) : p && ($(l).parents(".hulkapps_option").removeClass("validation_error"),
                                $(l).parents(".hulkapps_option").find(".inventory_error").remove(),
                                o = !1,
                                e = !0)
                            }
                        }
                        ))
                    } else if ("" != $(this).val()) {
                        var r = $(this).val().split("_hin_")[1];
                        r = parseInt(r);
                        var d = 1;
                        if ($("input[name=quantity]").val() && (d = parseInt($("input[name=quantity]").val())),
                        1 == window.opt_with_otc[$(this).data("unique_prop_name")] || "true" == window.opt_with_otc[$(this).data("unique_prop_name")])
                            var _ = 1;
                        else if ("" != a)
                            _ = parseInt(a);
                        else
                            _ = d;
                        var u = 1;
                        $(this).parents(".hulkapps_option_value").find(".hulk_options_quantity").length > 0 && (u = parseInt($(this).parents(".hulkapps_option_value").find(".hulk_options_quantity").val())) <= 0 && (u = 1),
                        _ *= u;
                        let t = $(this).val().split("_hin_")[0];
                        if (t = $(this).attr("data-unique_prop_name") + $.trim(t.split("[")[0]),
                        i[t] && "" == a) {
                            var c = i[t];
                            _ += parseInt(c)
                        }
                        if (c)
                            var h = parseInt(r) - parseInt(c);
                        else
                            h = parseInt(r);
                        r < _ ? ($(this).parents(".hulkapps_option").addClass("validation_error"),
                        $(this).parents(".hulkapps_option").find(".inventory_error").remove(),
                        h > 0 ? $(this).parents(".hulkapps_option").append(`<p class="inventory_error" tabindex="0" aria-label="Only ${h} inventory available for this ${$(this).val().split("_hin_")[0]} option.">Only ${h} inventory available for this ${$(this).val().split("_hin_")[0]} option. </p>`) : $(this).parents(".hulkapps_option").append(`<p class="inventory_error" tabindex="0" aria-label="Not enough items in the inventory for ${$(this).val().split("_hin_")[0]}">Not enough items in the inventory for ${$(this).val().split("_hin_")[0]}. </p>`),
                        o = !0,
                        e = !1) : 0 == e ? o = !0 : ($(this).parents(".hulkapps_option").find(".inventory_error").remove(),
                        $(this).parents(".hulkapps_option").removeClass("validation_error"),
                        e = !0,
                        o = !1)
                    }
                }
                )),
                1 != o && e
            }
            )).catch((function(t) {
                return !0
            }
            ))
        }
        $(document).on("click", ".hulkModalBtnSelect", (function(t) {
            var e = $(this).attr("data-render-class")
              , a = $(this).attr("data-update-div-class")
              , i = $(this).attr("data-prop-class")
              , o = $(`.${e}`).html();
            if ($("body").find("#hulk_form_modal").remove(),
            $("body").prepend('<div id="hulk_form_modal" class="hulk_form_modal" data-option-id="multi_qty" style="display:none"><div class="hulk-modal-content"><div class="hulk-modal-header"><h6></h6><span class="close hulkcloseBtn">×</span></div><div class="hulk-modal-body"></div><div class="hulk-modal-footer"><button class="hulkresetBtn">Reset</button><button class="hulkcloseBtn hulkCancelBtn">Cancel</button><button class="hulkSaveBtn">Continue</button></div></div></div>'),
            $(".hulk_form_modal").show(),
            $(".muti-qty-div").length > 0) {
                $(".hulk_form_modal").find(".hulk-modal-body").html(o),
                $("#hulk_form_modal > div > div.hulk-modal-body > p.inventory_error").remove(),
                $(".hulk_form_modal").find(".hulk-modal-body").find(".hulkapps_option_value").removeClass("is_hulk_hide"),
                $(".hulk_form_modal").find(".hulk-modal-body").find(".hulkapps_option_value").find(".hulk_swatch_Image").removeClass("is_hulk_hide"),
                $(".hulk_form_modal").find(".hulk-modal-body").find(".hulk_swatch_desciption").removeClass("is_hulk_hide");
                var n = $(".hulk_form_modal").find(".hulk-modal-body").find(".hulkapps_option_name").attr("aria-label").trim()
                  , l = $(this).attr("data-selected-val");
                if (l && l.length > 0) {
                    var s = l.split(",");
                    $.each(s, (function(t, e) {
                        var a = e.trim().split("|");
                        if (2 === a.length) {
                            var i = a[0].trim()
                              , o = a[1].trim()
                              , n = $(".hulk_form_modal").find('.hulk_quantity_amount[data-value="' + i + '"]');
                            n.length > 0 && (n.attr("data-qval", o),
                            n.val(o))
                        }
                    }
                    ))
                } else
                    $(".hulk_quantity_amount").each((function(t, e) {
                        $(this).attr("data-qval", 0),
                        $(this).val(0)
                    }
                    ));
                $(`#${i}`).val(l),
                $(".hulk_form_modal").find(".hulk-modal-header").find("h6").text(n),
                $(".hulk_form_modal").find(".hulk-modal-body").find(".hulkapps_option_name").hide(),
                $(".hulkSaveBtn").attr("data-get-class", i),
                $(".hulkSaveBtn").attr("data-prop-class", a),
                $(".hulk_form_modal").find(".hulk-modal-body").find(".hulk-custom-values-display").hide(),
                $(".hulk_swatch_desciption").each((function() {
                    var t = $(this)
                      , e = t.find("p")
                      , a = t.find(".hulk-content-display");
                    e.prop("scrollHeight") > e.innerHeight() && a.show()
                }
                ))
            } else
                $(".hulk_form_modal").find(".hulk-modal-body").html("<p style='text-align: center;'>All products are out of stock</p>"),
                $(".hulkresetBtn,.hulkCancelBtn,.hulkSaveBtn").hide(),
                $(".hulk_form_modal .hulk-modal-header").css("border-bottom", "none"),
                $(".hulk_form_modal .hulk-modal-header").css("display", "block"),
                $(".hulk_form_modal .hulk-modal-body").css("padding", "0px")
        }
        )),
        $(document).on("click", ".hulkresetBtn", (function(t) {
            var e = $(".hulk_quantity_amount");
            e.attr("data-qval", 0),
            e.text(0),
            $(".hulk_unique_prop").val(""),
            $(".hulk_mutli_qty").val(""),
            $(".hulk_multi_qty_main").find(".hulk_unique_prop").removeClass("mqty_selected"),
            $(".hulk_multi_qty_main").find(".hulk_unique_prop").attr("data-price", 0)
        }
        )),
        $(document).on("click", ".hulkcloseBtn", (function(t) {
            $(".hulk_form_modal").hide(),
            $(".hulk_form_modal").find(".hulk-modal-body").html(""),
            $(".hulk_form_modal").find(".hulk-modal-header").find("h6").text("")
        }
        )),
        $(document).on("click", ".hulk-content-display", (function(t) {
            $(this).parent(".hulk_swatch_desciption").find("p").toggleClass("hulk-limited-height");
            var e = $(this).parent(".hulk_swatch_desciption").find("p").hasClass("hulk-limited-height") ? "See more" : "See less";
            $(this).parent(".hulk_swatch_desciption").find("a").text(e)
        }
        )),
        $(document).on("click", ".hulkSaveBtn", (function(t) {
            $(".hulk_form_modal").hide();
            var e = $(this).attr("data-get-class")
              , a = $(`#${e}`).val()
              , i = a.split(",")
              , o = "";
            i.length > 0 && i.forEach((function(t) {
                t = t.trim(),
                o += `<span>${t}</span>`
            }
            ));
            var n = $(`#${e}`).parent(".hulk_multi_qty_main").find(".hulk_unique_prop").val()
              , l = $(`#${e}`).parent(".hulk_multi_qty_main").find(".hulk_unique_prop").attr("data-inventory-record")
              , s = $(`#${e}`).parent(".hulk_multi_qty_main").find(".hulk_unique_prop").attr("data-price")
              , p = $(this).attr("data-prop-class");
            $(`.${p}`).find(".hulkselectedValue").html(o),
            n.length > 0 ? $(`.${p}`).find("a").text(window.change_button_text) : $(`.${p}`).find("a").text(window.select_button_text),
            $(`.${p}`).find("a").attr("data-selected-val", a),
            $(".hulk_form_modal").find(".hulk-modal-body").html(""),
            $(`#${e}`).val(a),
            $(`#${e}`).parent(".hulk_multi_qty_main").find(".hulk_unique_prop").val(n),
            $(`#${e}`).parent(".hulk_multi_qty_main").find(".hulk_unique_prop").attr("data-inventory-record", l),
            parseFloat(s) > 0 ? ($(`#${e}`).parent(".hulk_multi_qty_main").find(".hulk_unique_prop").addClass("mqty_selected"),
            $(`#${e}`).parent(".hulk_multi_qty_main").find(".hulk_unique_prop").attr("data-price", s)) : ($(`#${e}`).parent(".hulk_multi_qty_main").find(".hulk_unique_prop").removeClass("mqty_selected"),
            $(`#${e}`).parent(".hulk_multi_qty_main").find(".hulk_unique_prop").attr("data-price", s)),
            $(".hulk_quantity_popup").find("p.inventory_error").css("display", "none"),
            $(".hulk_quantity_popup").removeClass("validation_error"),
            "1" == $("#hulk_amount_dis").val() && calc_options_total(parseInt(window.hulkapps.product_id), "hulkapps_product_options"),
            conditional_rules(parseInt(window.hulkapps.product_id), "hulkapps_product_options")
        }
        )),
        $(document).on("click", ".popup_open_link", (function(t) {
            var e = $(this).attr("data-id");
            $("#popupdetailsdesing_" + e).css("display", "flex"),
            $(".overlay-popup").css("display", "block")
        }
        )),
        $(document).on("click", ".popup_close_link", (function(t) {
            var e = $(this).attr("data-id");
            $("#popupdetailsdesing_" + e).css("display", "none"),
            $(".overlay-popup").css("display", "none")
        }
        )),
        $(document).on("click", ".recommended-link", (function(t) {
            $("#recommended_detail select,#recommended_detail input[type='radio'],#recommended_detail input[type='checkbox'],.dropdown_swatch").prop("disabled", !0),
            $("#recommended_detail").css("display", "flex"),
            $(".overlay-popup").css("display", "block"),
            $("#recommended_detail .switches-container").length > 0 && $(".overlay-popup").css("z-index", "-1")
        }
        )),
        $(document).on("click", ".recommended_close_link", (function(t) {
            $("#recommended_detail").css("display", "none"),
            $(".overlay-popup").css("display", "none"),
            $("#recommended_detail .switches-container").length > 0 && $(".overlay-popup").css("z-index", "")
        }
        )),
        window.conditional_rules = function(prod_id, hulkapps_parents="") {
            var hulkapps_parents = hulkapps_parents;
            if ("" == hulkapps_parents && (hulkapps_parents = "hulkapps_product_options"),
            window.dynamic_checkout_button_integration && "hulkapps_product_options" == hulkapps_parents) {
                var i, total = 0, is_variant_id_present = !1, format = window.hulkapps.money_format;
                for (checked_variant = $("." + hulkapps_parents + " #hulkapps_option_list_" + window.hulkapps.product_id + ":visible .price-change:checked, ." + hulkapps_parents + " #hulkapps_option_list_" + window.hulkapps.product_id + ":visible .price-change:selected, ." + hulkapps_parents + " .hulkapps_swatch_option .swatch_selected,." + hulkapps_parents + " .textarea_selected,." + hulkapps_parents + " .textbox_selected,." + hulkapps_parents + " .emailbox_selected,." + hulkapps_parents + " .datepicker_selected,." + hulkapps_parents + " .numberfield_selected,." + hulkapps_parents + " .colorpicker_selected,." + hulkapps_parents + " .button_selected,." + hulkapps_parents + " .googlefont_selected, ." + hulkapps_parents + " .ci_render .hulkapps_option_value .hulkapps_option_child .dropdown_selected, ." + hulkapps_parents + " .formula_selected,." + hulkapps_parents + " .stg_selected, ." + hulkapps_parents + " .mqty_selected"),
                i = 0; i < checked_variant.length; i++)
                    if (!$(checked_variant[i]).parents(".hulkapps_option").hasClass("conditional")) {
                        total = Number($(checked_variant[i]).attr("data-price")) + Number(total);
                        var checkedVariantId = $(checked_variant[i]).attr("data-variant-id");
                        null != checkedVariantId && "null" !== checkedVariantId && (is_variant_id_present = !0)
                    }
                function wrapShopifyPaymentButton() {
                    var t = !1
                      , e = document.querySelector("shopify-accelerated-checkout")
                      , a = "";
                    if (e)
                        try {
                            const t = e.getAttribute("recommended");
                            a = t && JSON.parse(t).name || ""
                        } catch (t) {
                            a = ""
                        }
                    const i = setInterval((function() {
                        $(".shopify-payment-button").length > 0 && ($(".shopify-payment-button").html().includes("ShopifyPay-button") || $(".shopify-payment-button").html().includes("Checkout-button") || $(".shopify-payment-button").html().includes("payment-button")) ? ($(".hulk_buy_now_handle").length <= 0 ? ($(".shopify-payment-button").html().includes("ShopifyPay-button") || "shop_pay" == a ? $(".shopify-payment-button").wrap("<a class='hulk-buy_now hulk_buy_now_handle' data-testid='ShopifyPay-button'></div>") : $(".shopify-payment-button").html().includes("payment-button") ? $(".shopify-payment-button").wrap("<a class='hulk-buy_now hulk_buy_now_handle' data-testid='payment-button'></div>") : $(".shopify-payment-button").wrap("<a class='hulk-buy_now hulk_buy_now_handle' data-testid='Checkout-button'></div>"),
                        $(".shopify-payment-button").css({
                            "pointer-events": "none"
                        })) : ($(".hulk_buy_now_handle").addClass("hulk-buy_now"),
                        $(".shopify-payment-button").css({
                            "pointer-events": "none"
                        })),
                        t = !0) : t = !0,
                        t && clearInterval(i)
                    }
                    ), 1e3);
                    $(".shopify-payment-button").length > 0 && ($(".shopify-payment-button").html().includes("ShopifyPay-button") || $(".shopify-payment-button").html().includes("Checkout-button") || $(".shopify-payment-button").html().includes("payment-button")) && ($(".hulk_buy_now_handle").length <= 0 ? ($(".shopify-payment-button").html().includes("ShopifyPay-button") || "shop_pay" == a ? $(".shopify-payment-button").wrap("<a class='hulk-buy_now hulk_buy_now_handle' data-testid='ShopifyPay-button'></div>") : $(".shopify-payment-button").html().includes("payment-button") ? $(".shopify-payment-button").wrap("<a class='hulk-buy_now hulk_buy_now_handle' data-testid='payment-button'></div>") : $(".shopify-payment-button").wrap("<a class='hulk-buy_now hulk_buy_now_handle' data-testid='Checkout-button'></div>"),
                    $(".shopify-payment-button").css({
                        "pointer-events": "none"
                    })) : ($(".hulk_buy_now_handle").addClass("hulk-buy_now"),
                    $(".shopify-payment-button").css({
                        "pointer-events": "none"
                    })))
                }
                total > 0 || total <= 0 && (is_variant_id_present || window.is_hulk_required_options || $(".file-upload.hulk-active").length > 0) ? wrapShopifyPaymentButton() : ($(".shopify-payment-button").unwrap(".hulk_buy_now_handle"),
                $(".hulk_buy_now_handle").removeClass("hulk-buy_now"),
                $(".shopify-payment-button").css({
                    "pointer-events": "inherit"
                }))
            }
            pass = !1,
            verify_all = Array(),
            verify_any = Array(),
            verified_condition = Array(),
            pass_array = Array(),
            $("." + hulkapps_parents).find(".condition_hide").removeClass("conditional"),
            $("." + hulkapps_parents).find(".condition_show").addClass("conditional"),
            $("." + hulkapps_parents + "  #conditional_rules").children().each((function() {
                pass_array = Array(),
                pass = !1;
                var conditional_count = $(this).children().length;
                $(this).children().each((function() {
                    pass = !1;
                    var condition_rule = $(this).data("conchildren-value"), field_value;
                    if (1 == $("." + hulkapps_parents).find(".option_type_id_" + $(this).attr("data-field-num")).hasClass("dd_multi_render")) {
                        var aa = condition_rule;
                        aa.indexOf("!=") >= 0 && (pass = !0);
                        var count = $("." + hulkapps_parents).find(".hulkapps_option_" + $(this).attr("data-field-num") + "_visible:visible :selected").length
                          , ct = 1
                          , selected_array = Array();
                        $("." + hulkapps_parents).find(".hulkapps_option_" + $(this).attr("data-field-num") + "_visible:visible :selected").length > 0 ? $("." + hulkapps_parents).find(".hulkapps_option_" + $(this).attr("data-field-num") + "_visible:visible :selected").each((function() {
                            var condition_rule = aa;
                            if (field_value = $(this).data("conditional-value"),
                            condition_rule = condition_rule.replace("**value11**", field_value),
                            condition_rule.indexOf("==") >= 0) {
                                var condition_rule = condition_rule.split("==");
                                condition_rule[0] == condition_rule[1] ? pass = !0 : pass = !1
                            } else {
                                var condition_rule = condition_rule.split("!=");
                                condition_rule[0] != condition_rule[1] ? pass = !0 : pass = !1
                            }
                            if (selected_array.push(pass),
                            ct == count && count > 1) {
                                var result = selected_array.join(" || ");
                                result = eval(result),
                                pass_array.push(result)
                            } else
                                1 == count && pass_array.push(pass);
                            ct += 1
                        }
                        )) : pass_array.push(!1)
                    } else if (1 == $(".option_type_id_" + $(this).attr("data-field-num")).hasClass("cb_render")) {
                        var aa = condition_rule;
                        aa.indexOf("!=") >= 0 && (pass = !0);
                        var ctt = 1
                          , checked_array = Array()
                          , countt = $("." + hulkapps_parents).find(".hulkapps_option_" + $(this).attr("data-field-num") + "_visible:checked").length;
                        $("." + hulkapps_parents).find(".hulkapps_option_" + $(this).attr("data-field-num") + "_visible:checked").each((function() {
                            var condition_rule = aa;
                            if (field_value = $(this).data("conditional-value"),
                            condition_rule = condition_rule.replace("**value11**", field_value),
                            condition_rule.indexOf("==") >= 0) {
                                var condition_rule = condition_rule.split("==");
                                condition_rule[0] == condition_rule[1] ? pass = !0 : pass = !1
                            } else {
                                var condition_rule = condition_rule.split("!=");
                                condition_rule[0] != condition_rule[1] ? pass = !0 : pass = !1
                            }
                            if (checked_array.push(pass),
                            ctt == countt && countt > 1) {
                                var result = checked_array.join(" || ");
                                result = eval(result),
                                pass_array.push(result)
                            } else
                                1 == countt && pass_array.push(pass);
                            ctt += 1
                        }
                        ))
                    } else if (1 == $("." + hulkapps_parents).find("#hulkapps_option_list_" + prod_id + " .option_type_id_" + $(this).attr("data-field-num")).hasClass("multiswatch_render")) {
                        var aa = condition_rule;
                        aa.indexOf("!=") >= 0 && (pass = !0);
                        var ctt = 1
                          , checked_array = Array()
                          , countt = $("." + hulkapps_parents).find("#hulkapps_option_list_" + prod_id + " .hulkapps_option_" + $(this).attr("data-field-num") + "_visible:checked").length;
                        $("." + hulkapps_parents).find("#hulkapps_option_list_" + prod_id + " .hulkapps_option_" + $(this).attr("data-field-num") + "_visible:checked").each((function() {
                            var condition_rule = aa;
                            if (field_value = $(this).data("conditional-value"),
                            condition_rule = condition_rule.replace("**value11**", field_value),
                            condition_rule.indexOf("==") >= 0) {
                                var condition_rule = condition_rule.split("==");
                                condition_rule[0] == condition_rule[1] ? pass = !0 : pass = !1
                            } else {
                                var condition_rule = condition_rule.split("!=");
                                condition_rule[0] != condition_rule[1] ? pass = !0 : pass = !1
                            }
                            if (checked_array.push(pass),
                            ctt == countt && countt > 1) {
                                var result = checked_array.join(" || ");
                                result = eval(result),
                                pass_array.push(result)
                            } else
                                1 == countt && pass_array.push(pass);
                            ctt += 1
                        }
                        ))
                    } else {
                        if (pass = !1,
                        1 == $("." + hulkapps_parents).find(".option_type_id_" + $(this).attr("data-field-num")).hasClass("ci_render"))
                            field_value = $("." + hulkapps_parents).find("#" + $(this).attr("data-field-num")).find(".dropdown_selected").attr("data-conditional-value");
                        else if (1 == $("." + hulkapps_parents).find(".option_type_id_" + $(this).attr("data-field-num")).hasClass("dd_render"))
                            field_value = $("." + hulkapps_parents).find("#" + $(this).attr("data-field-num") + " option:selected").attr("data-conditional-value");
                        else if (1 == $("." + hulkapps_parents).find(".option_type_id_" + $(this).attr("data-field-num")).hasClass("rb_render"))
                            field_value = $("." + hulkapps_parents).find(".hulkapps_option_" + $(this).attr("data-field-num") + ":checked").data("conditional-value");
                        else if (1 == $("." + hulkapps_parents).find(".option_type_id_" + $(this).attr("data-field-num")).hasClass("swatch_render"))
                            field_value = $("." + hulkapps_parents).find(".hulkapps_option_" + $(this).attr("data-field-num") + ".swatch_selected").data("conditional-value");
                        else if (1 == $("." + hulkapps_parents).find(".option_type_id_" + $(this).attr("data-field-num")).hasClass("button_render"))
                            field_value = $("." + hulkapps_parents).find(".hulkapps_option_" + $(this).attr("data-field-num") + ".button_selected").data("conditional-value");
                        else if (1 == $("." + hulkapps_parents).find(".option_type_id_" + $(this).attr("data-field-num")).hasClass("dp_render")) {
                            if (field_value = $("." + hulkapps_parents).find(".hulkapps_option_" + $(this).attr("data-field-num") + ".datepicker_selected").val(),
                            null != field_value) {
                                var splitedValues = field_value.split("-");
                                field_value = splitedValues[1] + "/" + splitedValues[2] + "/" + splitedValues[0]
                            }
                        } else
                            field_value = 1 == $("." + hulkapps_parents).find(".option_type_id_" + $(this).attr("data-field-num")).hasClass("dt_render") ? $("." + hulkapps_parents).find(".hulkapps_option_" + $(this).attr("data-field-num") + ".datetimepicker_selected").val() : $("." + hulkapps_parents).find("#" + $(this).attr("data-field-num")).val();
                        if (condition_rule = condition_rule.replace("**value11**", field_value),
                        condition_rule.indexOf("==") >= 0) {
                            var condition_rule = condition_rule.split("==");
                            condition_rule[0] == condition_rule[1] ? pass = !0 : pass = !1
                        } else {
                            var condition_rule = condition_rule.split("!=");
                            condition_rule[0] != condition_rule[1] ? pass = !0 : pass = !1
                        }
                        pass_array.push(pass)
                    }
                }
                ));
                var type_rule = $(this).attr("data-verify-all")
                  , condition_id = $(this).attr("name");
                if ("0" == type_rule)
                    var res = pass_array.join(" || ");
                else if (pass_array.length == conditional_count)
                    var res = pass_array.join(" && ");
                if (res = eval(res),
                res) {
                    var updated_is = !0;
                    $("." + hulkapps_parents).find("." + condition_id + "_show").removeClass("conditional"),
                    $("." + hulkapps_parents).find("." + condition_id + "_show .formula_selected").removeAttr("disabled"),
                    $("." + hulkapps_parents).find("." + condition_id + "_hide").addClass("conditional"),
                    $("." + hulkapps_parents).find(".conditional").removeClass("validation_error")
                }
            }
            )),
            $("." + hulkapps_parents + " #conditional_rules").children().each((function() {
                var t = $(this).attr("name")
                  , e = $("." + hulkapps_parents).find("." + t + "_hide.conditional")
                  , a = $("." + hulkapps_parents).find("." + t + "_show.conditional");
                e.each((function() {
                    var t = $(this).hasClass("price-change")
                      , e = $(this);
                    t ? $(this).parent(".hulkapps_option_child").each((function() {
                        "UL" == $(this).prop("tagName") ? $(this).children(".dropdown_selected").data("value") == e.data("value") && conditional_change($(this), hulkapps_parents, prod_id) : "SELECT" == $(this).prop("tagName") ? $(this).val() == e.val() && conditional_change($(this), hulkapps_parents, prod_id) : $(this).val().includes(e.val()) && conditional_change($(this), hulkapps_parents, prod_id)
                    }
                    )) : $(this).find(".hulkapps_option_child").each((function() {
                        conditional_change($(this), hulkapps_parents, prod_id)
                    }
                    ))
                }
                )),
                a.each((function() {
                    var t = $(this).hasClass("price-change")
                      , e = $(this);
                    t ? $(this).parent(".hulkapps_option_child").each((function() {
                        "UL" == $(this).prop("tagName") ? $(this).children(".dropdown_selected").data("value") == e.data("value") && conditional_change($(this), hulkapps_parents, prod_id) : "SELECT" == $(this).prop("tagName") ? $(this).val() == e.val() && conditional_change($(this), hulkapps_parents, prod_id) : $(this).val().includes(e.val()) && conditional_change($(this), hulkapps_parents, prod_id)
                    }
                    )) : $(this).find(".hulkapps_option_child").each((function() {
                        conditional_change($(this), hulkapps_parents, prod_id)
                    }
                    ))
                }
                ))
            }
            )),
            $("option.condition_hide").each((function() {
                $(this).hasClass("conditional") ? $(this).prop("disabled", !0) : $(this).removeAttr("disabled")
            }
            )),
            $("option.condition_show").each((function() {
                $(this).hasClass("conditional") ? $(this).prop("disabled", !0) : $(this).removeAttr("disabled")
            }
            )),
            calc_options_total(prod_id, hulkapps_parents),
            calc_options_total(prod_id, hulkapps_parents)
        }
        ,
        window.conditional_change = function(t, e, a) {
            if ("select-one" == t.prop("type"))
                t.val() && (t.val("").change(),
                t.parent().find(".hulk_unique_sku").prop("disabled", "true"),
                t.parent().removeClass("selected"));
            else if ("select-multiple" == t.prop("type"))
                t.val() && (t.parent().find(".hulk_unique_sku").prop("disabled", "true"),
                t.val(""),
                t.parent(".hulkapps_option_value").find("input[type=hidden]").val(""),
                t.parent().removeClass("selected"));
            else if ("radio" == t.prop("type"))
                t.prop("checked") && (t.parents(".hulkapps_option_value").find(".hulk_radiobutton_hidden_prop").val(""),
                t.parents(".hulkapps_option_value").find(".hulk_unique_prop").val(""),
                t.prop("checked", !1),
                t.parent().find(".radio_selected").removeClass("radio_selected"),
                t.parent("label").find(".hulk_unique_sku").prop("disabled", "true"),
                t.change());
            else if ("file" == t.prop("type"))
                t.val(""),
                t.parent(".hulkapps_option_value").find(".upload_h_cls").val("");
            else if ("text" == t.prop("type") && t.parents(".hulkapps_option").hasClass("gf_render"))
                t.val() && (t.parents(".hulkapps_option_value").find(".gf_property_val").val(""),
                t.parents(".hulkapps_option_value").find("#valid-msg").remove());
            else if ("hidden" == t.prop("type") && t.parents(".hulkapps_option").hasClass("fm_render"))
                t.parents(".hulkapps_option").hasClass("conditional") ? t.attr("disabled", "disabled") : t.removeAttr("disabled");
            else if ("textarea" == t.prop("type") || "number" == t.prop("type") || "text" == t.prop("type") || "hidden" == t.prop("type") || "file" == t.prop("type") || "email" == t.prop("type"))
                t.val() && (t.val("").change(),
                t.parents(".hulkapps_option_value").find(".tb_property_val").val(""),
                t.parents(".hulkapps_option_value").find("#valid-msg").remove());
            else if ("color" == t.prop("type") || "color_picker" == t.prop("type"))
                t.val() && (t.parents(".hulkapps_option_value").find(".cp_property_val").val(""),
                t.parents(".hulkapps_option_value").find("#valid-msg").remove());
            else if ("date" == t.prop("type") || "date_picker" == t.prop("type"))
                t.val() && (t.val("").change(),
                t.parents(".hulkapps_option_value").find(".dp_property_val").val(""),
                t.parents(".hulkapps_option_value").find("#valid-msg").remove());
            else if ("time" == t.prop("type") || "date_picker" == t.prop("type"))
                t.val() && (t.val("").change(),
                t.parents(".hulkapps_option_value").find(".dp_property_val").val(""),
                t.parents(".hulkapps_option_value").find("#valid-msg").remove());
            else if ("checkbox" == t.prop("type"))
                t.prop("checked") && (t.prop("checked", !1).change(),
                t.parent().removeClass("swatch_selected"));
            else if ("DIV" == t.prop("tagName")) {
                if (t.find(".swatch_radio").prop("checked") && (t.find(".swatch_radio").prop("checked", !1),
                t.find(".swatch_radio").removeAttr("checked"),
                t.parents(".hulkapps_option_value").find(".hulk_swatch_hidden_prop").val(""),
                t.parents(".hulkapps_option_value").find(".hulk_unique_prop").val(""),
                t.removeClass("swatch_selected"),
                t.parents("label").find(".hulk_unique_sku").prop("disabled", "true"),
                conditional_rules(a, e)),
                t.find(".button_radio").prop("checked") && (t.parents(".hulkapps_option_value").find(".hulk_button_hidden_prop").val(""),
                t.parents(".hulkapps_option_value").find(".hulk_unique_prop").val(""),
                t.find(".button_radio").removeAttr("checked"),
                t.removeClass("button_selected"),
                t.parents("label").find(".hulk_unique_sku").prop("disabled", "true")),
                t.find(".swatch_checkbox").prop("checked")) {
                    t.find(".swatch_checkbox").prop("checked", !1),
                    conditional_rules(a, e);
                    var i = t.parent().parent().parent().parent(".hulkapps_option_value")
                      , o = [];
                    i.find("input[type=checkbox]:checked").each((function() {
                        o.push($(this).val())
                    }
                    )),
                    i.find("input[type=hidden]").not(".hulk_unique_sku").val(o.join(",")),
                    t.removeClass("swatch_selected"),
                    t.parents("label").find(".hulk_unique_sku").prop("disabled", "true")
                }
            } else if ("UL" == t.prop("tagName")) {
                if (t.find(".hulk_unique_sku").prop("disabled", "true"),
                t.find(".dropdown_selected").length > 0) {
                    var n = t.parents(".ci_render").find(".hulkapps_option_name").attr("data-option-name");
                    t.find(".init").html("").html("Choose " + n),
                    t.find(".dropdown_selected").removeClass("dropdown_selected"),
                    t.parent(".hulkapps_option_value").find(".hulk_opt_prop").val(""),
                    t.parent(".hulkapps_option_value").find(".hulk_unique_prop").val(""),
                    t.find(".hulk_unique_sku").prop("disabled", "false"),
                    conditional_rules(t.attr("data-pid"), t.attr("data-parent"))
                }
            } else if ("LABEL" == t.prop("tagName")) {
                if (t.find(".swatch_radio").prop("checked") && (t.find(".swatch_radio").prop("checked", !1).change(),
                t.find(".swatch_radio").removeAttr("checked"),
                t.removeClass("swatch_selected"),
                t.parents("label").find(".hulk_unique_sku").prop("disabled", "true")),
                t.find(".button_radio").prop("checked") && (t.find(".button_radio").prop("checked", !1).change(),
                t.find(".button_radio").removeAttr("checked"),
                t.removeClass("button_selected"),
                t.parents("label").find(".hulk_unique_sku").prop("disabled", "true")),
                t.find(".swatch_checkbox").prop("checked")) {
                    t.find(".swatch_checkbox").prop("checked", !1);
                    i = t.parent(".hulkapps_option_value"),
                    o = [];
                    i.find("input[type=checkbox]:checked").each((function() {
                        o.push($(this).val())
                    }
                    )),
                    i.find("input[type=hidden]").val(o.join(",")),
                    t.removeClass("swatch_selected")
                }
            } else
                "button" == t.prop("type") && t.parent().find(".hulk_quantity_amount").attr("data-qval") && (t.parent().find(".hulk_quantity_amount").attr("data-qval", "0"),
                t.parent().find(".hulk_quantity_amount").text("0"),
                t.parents(".muti-qty-div").parent(".hulk_multi_qty_main").find(".hulk_unique_prop").removeClass("mqty_selected"),
                t.parents(".muti-qty-div").parent(".hulk_multi_qty_main").find(".hulk_unique_prop").val(""),
                t.parents(".muti-qty-div").parent(".hulk_multi_qty_main").find(".hulk_unique_prop").removeAttr("data-inventory-record"),
                t.parents(".muti-qty-div").parent(".hulk_multi_qty_main").find(".hulk_unique_prop").removeAttr("data-price"),
                t.parents(".muti-qty-div").parent(".hulk_multi_qty_main").find(".hulk_mutli_qty").val(""),
                t.parents(".muti-qty-div").parent(".hulk_multi_qty_main").parents(".mq_render").find(".inventory_error").remove(),
                t.parents(".muti-qty-div").parent(".hulk_multi_qty_main").parents(".mq_render").removeClass("validation_error"))
        }
        ,
        window.calc_options_total = function(t, e="") {
            if (price_setting = display_price_setting.price_setting,
            "price_addtional_charge" == price_setting || "price_total_charge" == price_setting || "price_append" == price_setting || "price_addtional_charge_beside_price" == price_setting || 1 == display_price_setting.amount_note_display && null == price_setting) {
                var a;
                "" == (e = e) && (e = "hulkapps_product_options");
                var i = 0;
                window.hulkapps.money_format;
                for (checked_variant = $("." + e + " #hulkapps_option_list_" + t + ":visible .price-change:checked, ." + e + " #hulkapps_option_list_" + t + ":visible .price-change:selected, ." + e + " .hulkapps_swatch_option .swatch_selected,." + e + " .textarea_selected,." + e + " .textbox_selected,." + e + " .emailbox_selected,." + e + " .datepicker_selected,." + e + " .numberfield_selected,." + e + " .colorpicker_selected,." + e + " .button_selected,." + e + " .googlefont_selected, ." + e + " .datetimepicker_selected,." + e + " .ci_render .hulkapps_option_value .hulkapps_option_child .dropdown_selected, ." + e + " .formula_selected,." + e + " .stg_selected, ." + e + " .mqty_selected"),
                a = 0; a < checked_variant.length; a++)
                    if (!$(checked_variant[a]).parents(".hulkapps_option").hasClass("conditional")) {
                        var o = 1;
                        if ($(checked_variant[a]).parents(".hulkapps_option_value").find(".hulk_options_quantity").length > 0)
                            o = parseInt($(checked_variant[a]).parents(".hulkapps_option").find(".hulk_options_quantity").val());
                        i = Number($(checked_variant[a]).attr("data-price") * o) + Number(i)
                    }
                try {
                    $("body").trigger("hulkOptionsTotalCalculated", [i])
                } catch (t) {}
                if (window.is_enabled_shopify_default_currency && (formula_total = 0,
                $(`.${e} .formula_selected`).length > 0 && (formula_total = Number($(`.${e} .formula_selected`).attr("data-price") * o)),
                i = Number(i) - formula_total,
                i = Number(i) * Number(window.hulkapps_shopify_rate),
                i = Number(i) + formula_total,
                i = window.rounding_price ? Math.round(i) : i.toFixed(2)),
                "price_total_charge" == price_setting && (i = (i = Number(product_price / 100) + Number(i)).toFixed(2)),
                "price_append" == price_setting) {
                    if (n = display_price_setting.price_class,
                    i = currency_conversion(Number(product_price / 100) + Number(i)),
                    n.length > 0) {
                        n.split(",").forEach((t => {
                            t = $.trim(t),
                            $("#" + t).length > 0 ? $("#" + t).html("<span class='money'>" + i + "</span>") : $("." + t).length > 0 && $("." + t).html("<span class='money'>" + i + "</span>")
                        }
                        ))
                    }
                    i = 0
                }
                if ("price_addtional_charge_beside_price" == price_setting) {
                    if (i > 0) {
                        i = currency_conversion(Number(i));
                        var n = display_price_setting.price_class
                          , l = "1" == display_price_setting.price_display_brackets ? "" : "("
                          , s = "1" == display_price_setting.price_plus_sign ? "" : "+"
                          , p = "1" == display_price_setting.price_display_brackets ? "" : ")"
                          , r = ".hulk_price_addtional_charge_beside_price{";
                        r += null != display_price_setting.addition_price_font_color ? "color: " + display_price_setting.addition_price_font_color + ";" : "",
                        r += null != display_price_setting.addition_price_font_size ? "font-size: " + display_price_setting.addition_price_font_size + "px;" : "";
                        var d = "<style>" + (r += "}") + "</style>";
                        if ($("." + e).append(d),
                        n.length > 0) {
                            n.split(",").forEach((t => {
                                t = $.trim(t),
                                $("#" + t).length > 0 ? $("#" + t).html("<span class='money hulk_price_addtional_charge_beside_price'>" + l + s + i + p + "</span>") : $("." + t).length > 0 && $("." + t).html("<span class='money hulk_price_addtional_charge_beside_price'>" + l + s + i + p + "</span>")
                            }
                            ))
                        }
                    } else {
                        if ((n = display_price_setting.price_class).length > 0) {
                            n.split(",").forEach((t => {
                                t = $.trim(t),
                                $("#" + t).html(""),
                                $("." + t).html("")
                            }
                            ))
                        }
                    }
                    i = 0
                }
                $("." + e + " #raw_option_total").val(i);
                var _ = i;
                window.is_enabled_shopify_default_currency ? (i = currency_conversion(Number(i)),
                $("." + e + " #formatted_option_total").html(i)) : $("." + e + " #calculated_option_total").html(Number(i).toFixed(2)),
                $("." + e + " #option_display_total_format").attr("aria-label", $("." + e + " #option_display_total_format").text()),
                _ > 0 ? $("." + e + " #option_total").slideDown() : $("." + e + " #option_total").slideUp()
            }
        }
        ,
        window.currency_conversion = function(t) {
            let e = window.hulkapps.money_format;
            if (e.includes("{{ amount }}") || e.includes("{{amount}}"))
                return t = t.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
                e.includes("{{ amount }}") ? e.replace("{{ amount }}", t) : e.replace("{{amount}}", t);
            if (e.includes("{{ amount_no_decimals }}") || e.includes("{{amount_no_decimals}}"))
                return t = Math.round(Number(t)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
                e.includes("{{ amount_no_decimals }}") ? e.replace("{{ amount_no_decimals }}", t) : e.replace("{{amount_no_decimals}}", t);
            if (e.includes("{{ amount_with_comma_separator }}") || e.includes("{{amount_with_comma_separator}}")) {
                if ((t = t.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")).includes(".")) {
                    let e = (t = t.replace(/\B(?=(\d{3})+(?!\d))/g, ".")).lastIndexOf(".");
                    t = t.slice(0, e) + t.slice(e).replace(".", ",")
                } else
                    t = t.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                return e.includes("{{ amount_with_comma_separator }}") ? e.replace("{{ amount_with_comma_separator }}", t) : e.replace("{{amount_with_comma_separator}}", t)
            }
            return e.includes("{{ amount_no_decimals_with_comma_separator }}") || e.includes("{{amount_no_decimals_with_comma_separator}}") ? (t = Math.round(Number(t)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."),
            e.includes("{{ amount_no_decimals_with_comma_separator }}") ? e.replace("{{ amount_no_decimals_with_comma_separator }}", t) : e.replace("{{amount_no_decimals_with_comma_separator}}", t)) : e.includes("{{ amount_with_apostrophe_separator }}") || e.includes("{{amount_with_apostrophe_separator}}") ? (t = t.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, "'"),
            e.includes("{{ amount_with_apostrophe_separator }}") ? e.replace("{{ amount_with_apostrophe_separator }}", t) : e.replace("{{amount_with_apostrophe_separator}}", t)) : t
        }
        ,
        window.checkPlan = function(t, e) {
            var a = !0
              , i = window.hulk_po_plan_id
              , o = window.hulk_po_plans_features
              , n = window.hulk_po_is_on_trial_period;
            return t && e && o && i && o[i] ? ("string" == $.type(o) && (o = JSON.parse(o)),
            0 == o[i][t] && "boolean" == e && (a = !1),
            1 == n && 1 == o[i][t] && (a = !0)) : a = !1,
            a
        }
        ,
        window.oldStore = function() {
            var t = !1;
            return Date.parse(window.store_created_date) < Date.parse("08/27/2023") && (t = !0),
            t
        }
        ,
        window.is_on_click = !1,
        $(document).on("click", ".hulkappsGetOptions", (function(t) {
            window.hulkapps.product_id = $(this).attr("data-product-id"),
            window.is_on_click && $(`.hulk_po_${window.hulkapps.product_id}`).length > 0 ? $(`.hulk_po_${window.hulkapps.product_id}`).show() : (window.hulkapps.store_id && (window.hulkapps.product = {},
            $(this).attr("data-product-tags") && (window.hulkapps.product.tags = $(this).attr("data-product-tags").split(",")),
            window.hulkapps.product.vendor = $(this).attr("data-product-vendor"),
            window.hulkapps.product.type = $(this).attr("data-product-type"),
            window.hulkapps.product_collections = $(this).attr("data-product-collections"),
            window.cproduct_price = $(this).attr("data-product-price"),
            productPageAjax($, "is_collection_page")),
            $(`.hulk_po_${window.hulkapps.product_id}`).hide())
        }
        )),
        window.check_character_limit = function(t, e, a, i="") {
            "" == (i = i) && (i = "hulkapps_product_options");
            var o = t - $.trim($("." + i + " .hulkapps_option_value .hulkapps_option_" + e).val()).length;
            $("." + i + " #char_count_" + e).html(o + " " + a)
        }
        ,
        window.requireInventory = async function(t, e) {
            $("." + e).find("#hulkapps_option_list_" + t + ":visible .dd_render.required:visible,.dd_multi_render.required:visible,.swatch_render.required:visible,.cb_render.required:visible,.multiswatch_render.required:visible,.ci_render.required:visible,.rb_render.required:visible,.button_render.required:visible").each((function() {
                if ($(this).hasClass("ci_render"))
                    $(this).find("li[value !='']").length == $(this).find("li[value !=''].is_hulk_disabled").length && ($(this).removeClass("required"),
                    $(this).find(".hulkapps-required").remove());
                else if (!$(this).hasClass("dd_render") && !$(this).hasClass("dd_multi_render") || $(this).hasClass("ci_render")) {
                    if ($(this).hasClass("multiswatch_render")) {
                        $(this).find(".hulkapps_mswatch_option").length == $(this).find(".hulkapps_mswatch_option input[type='checkbox']:disabled").length && ($(this).removeClass("required"),
                        $(this).find(".hulkapps-required").remove())
                    } else if ($(this).hasClass("swatch_render")) {
                        $(this).find(".hulkapps_swatch_option").length == $(this).find(".hulkapps_swatch_option input[type='radio']:disabled").length && ($(this).removeClass("required"),
                        $(this).find(".hulkapps-required").remove())
                    } else if ($(this).hasClass("rb_render")) {
                        $(this).find(".hulkapps_radio_option").length == $(this).find(".hulkapps_radio_option input[type='radio']:disabled").length && ($(this).removeClass("required"),
                        $(this).find(".hulkapps-required").remove())
                    } else if ($(this).hasClass("cb_render")) {
                        $(this).find(".hulkapps_check_option").length == $(this).find(".hulkapps_check_option input[type='checkbox']:disabled").length && ($(this).removeClass("required"),
                        $(this).find(".hulkapps-required").remove())
                    } else if ($(this).hasClass("button_render")) {
                        $(this).find(".hulkapps_buton_option").length == $(this).find(".hulkapps_buton_option input[type='radio']:disabled").length && ($(this).removeClass("required"),
                        $(this).find(".hulkapps-required").remove())
                    }
                } else {
                    $(this).find("option[value !='']").length == $(this).find("option[value !='']:disabled").length && ($(this).removeClass("required"),
                    $(this).find(".hulkapps-required").remove())
                }
            }
            ))
        }
        ,
        window.validate_options = async function(t, e, a="") {
            "" != (e = e) && null != e || (e = "hulkapps_product_options");
            var i = !0;
            $("." + e + " #error_text").html("");
            var o, n = $("." + e).find("#hulkapps_option_list_" + t + ":visible .required:visible");
            for (o = 0; o < n.length; o++)
                $(n[o]).hasClass("ci_render") && $(n[o]).find(".hulk_opt_prop").length && !$(n[o]).find(".hulk_opt_prop").val() || $(n[o]).hasClass("dd_render") && $(n[o]).find(".hulk_dropdown_hidden_prop").length && !$(n[o]).find(".hulk_dropdown_hidden_prop").val() ? ($(n[o]).addClass("validation_error"),
                i = !1) : 1 != hulkapps_jQuery(n[o]).find("select[name^='properties']").length || hulkapps_jQuery(n[o]).find("select[name^='properties']").val() ? hulkapps_jQuery(n[o]).find(".hulkapps_option_value").find("input[name^='properties']").length >= 1 && !hulkapps_jQuery(n[o]).find(".hulkapps_option_value").find("input[name^='properties']:not(.hulk_unique_prop)").val() ? (hulkapps_jQuery(n[o]).addClass("validation_error"),
                i = !1) : $(n[o]).find(".hulkapps_radio_option").length && !$(n[o]).find(".hulk_radiobutton_hidden_prop").val() || $(n[o]).find(".hulkapps_buton_option").length && !$(n[o]).find(".hulk_button_hidden_prop").val() || $(n[o]).find(".hulkapps_swatch_option").length && !$(n[o]).find(".hulk_swatch_hidden_prop").val() ? ($(n[o]).addClass("validation_error"),
                i = !1) : $(n[o]).find(".hulkapps_short_option_value").length ? $(n[o]).find("input[type='text']").each((function() {
                    "" != $.trim($(this).val()) || $(this).parents(".hulkapps_short_option_value").hasClass("conditional") || ($(n[o]).addClass("validation_error"),
                    i = !1)
                }
                )) : $(n[o]).find("input[type='text']").length > 1 ? $(n[o]).find("input[type='text']").each((function() {
                    "" == $.trim($(this).val()) && ($(n[o]).addClass("validation_error"),
                    i = !1)
                }
                )) : $(n[o]).find("input[type='text']").length && !$(n[o]).find("input[name^='properties']").val() || $(n[o]).find("input[type='email']").length && !$(n[o]).find("input[name^='properties']").val() || $(n[o]).find("input[type='color']").length && !$(n[o]).find("input[name^='properties']").val() || $(n[o]).find(".hulkapps_check_option").length && !$(n[o]).find("input[name^='properties']:not(.hulk_unique_sku)").val() || $(n[o]).find("input[type='file']").length && !$(n[o]).find("input[name^='properties']").val() || $(n[o]).hasClass("cb_render") && $(n[o]).find("input[type='checkbox']:checked").length && !$(n[o]).find("input[name^='properties']:not(.hulk_unique_sku,.hulk_unique_prop)").length || $(n[o]).hasClass("multiswatch_render") && $(n[o]).find("input[type='checkbox']:checked").length && !$(n[o]).find("input[name^='properties']:not(.hulk_unique_sku, .hulk_unique_prop)").length || $(n[o]).find("textarea").length && !$(n[o]).find("input[name^='properties']").val() || $(n[o]).find("select[multiple]").length >= 1 && !$(n[o]).find("input[name^='properties']:not(.hulk_unique_sku)").val() ? ($(n[o]).addClass("validation_error"),
                i = !1) : !$(n[o]).find("input[type='number']:not(.hulk_options_quantity)").length || $(n[o]).find("input[name^='properties']").val() || $(n[o]).hasClass("mq_render") ? $(n[o]).hasClass("dp_render") && $(n[o]).find("input[type='date']").length && !$(n[o]).find("input[name^='properties']").val() || $(n[o]).hasClass("dt_render") && $(n[o]).find("input[type='time']").length && !$(n[o]).find("input[name^='properties']").val() ? ($(n[o]).addClass("validation_error"),
                i = !1) : hulkapps_jQuery(n[o]).find(".hulkapps_option_value").find("input[name^='properties']").length >= 1 && !hulkapps_jQuery(n[o]).find(".hulkapps_option_value").find("input[name^='properties']:not(.hulk_unique_prop)").val() ? (hulkapps_jQuery(n[o]).addClass("validation_error"),
                i = !1) : ($(n[o]).removeClass("validation_error"),
                $(n[o]).find(".validation_error.error_span").remove(),
                $(n[o]).removeAttr("aria-label tabindex")) : ($(n[o]).addClass("validation_error"),
                i = !1) : (hulkapps_jQuery(n[o]).addClass("validation_error"),
                i = !1);
            return $("." + e).find("#hulkapps_option_list_" + t + " .cb_render:visible").each((function() {
                var t = parseInt($(this).attr("data-min"))
                  , e = parseInt($(this).attr("data-max"))
                  , a = $(this).find("input[type='checkbox']:checked").length
                  , o = '<span class="validation_error error_span" tabindex="0" >';
                $(this).hasClass("required") && 0 == a && $(this).append(o),
                checkPlan("validation_for_min_max_option_selection", "boolean") && (0 != t && 0 != e ? a < t ? ($(this).removeClass("validation_error").find(".error_span").remove(),
                $(this).append(`${o} Choose from ${t} to ${e} values</span>`),
                $(this).find(".validation_error").attr("aria-label", `Choose from ${t} to ${e} values`),
                0 == a && $(this).hasClass("required") ? $(this).addClass("validation_error") : 0 == a && $(this).removeClass("validation_error").find(".error_span").remove()) : a > e ? ($(this).removeClass("validation_error").find(".error_span").remove(),
                $(this).append(`${o} Choose from ${t} to ${e} values</span>`),
                $(this).find(".validation_error").attr("aria-label", `Choose from ${t} to ${e} values`)) : $(this).removeClass("validation_error").find(".error_span").remove() : 0 != t ? a < t ? ($(this).removeClass("validation_error").find(".error_span").remove(),
                $(this).append(`${o} Choose at least  ${t} values</span>`),
                $(this).find(".validation_error").attr("aria-label", `Choose at least  ${t} values`)) : $(this).removeClass("validation_error").find(".error_span").remove() : 0 != e && (e >= a ? e == a ? $(this).removeClass("validation_error").find(".error_span").remove() : ($(this).removeClass("validation_error").find(".error_span").remove(),
                $(this).append(`${o} Choose upto ${e} values</span>`),
                $(this).find(".validation_error").attr("aria-label", `Choose upto ${e} values`)) : $(this).removeClass("validation_error").find(".error_span").remove())),
                $(this).find(".error_span").length > 0 ? ($(this).addClass("validation_error"),
                i = !1) : ($(this).removeClass("validation_error"),
                $(this).removeAttr("aria-label tabindex"),
                i = !0),
                $(this).hasClass("required") || 0 != a || ($(this).removeClass("validation_error"),
                $(this).removeAttr("aria-label tabindex"),
                $(this).find(".validation_error.error_span").remove(),
                i = !0)
            }
            )),
            $("." + e).find("#hulkapps_option_list_" + t + " .multiswatch_render:visible").each((function() {
                var t = parseInt($(this).attr("data-min"))
                  , e = parseInt($(this).attr("data-max"))
                  , a = $(this).find("input[type='checkbox']:checked").length
                  , o = '<span class="validation_error error_span" tabindex="0" >';
                $(this).hasClass("required") && 0 == a && $(this).append(o),
                checkPlan("validation_for_min_max_option_selection", "boolean") && (0 != t && 0 != e ? a < t ? ($(this).removeClass("validation_error").find(".error_span").remove(),
                $(this).append(`${o} Choose from ${t} to ${e} values</span>`),
                $(this).find(".validation_error").attr("aria-label", `Choose from ${t} to ${e} values`),
                0 == a && $(this).hasClass("required") ? $(this).addClass("validation_error") : 0 == a && $(this).removeClass("validation_error").find(".error_span").remove()) : a > e ? ($(this).removeClass("validation_error").find(".error_span").remove(),
                $(this).append(`${o} Choose from ${t} to ${e} values</span>`),
                $(this).find(".validation_error").attr("aria-label", `Choose from ${t} to ${e} values`)) : $(this).removeClass("validation_error").find(".error_span").remove() : 0 != t ? a < t ? ($(this).removeClass("validation_error").find(".error_span").remove(),
                $(this).append(`${o} Choose at least  ${t} values</span>`),
                $(this).find(".validation_error").attr("aria-label", `Choose at least  ${t} values`)) : $(this).removeClass("validation_error").find(".error_span").remove() : 0 != e && (e >= a ? e == a ? $(this).removeClass("validation_error").find(".error_span").remove() : ($(this).removeClass("validation_error").find(".error_span").remove(),
                $(this).append(`${o} Choose upto ${e} values</span>`),
                $(this).find(".validation_error").attr("aria-label", `Choose upto ${e} values`)) : $(this).removeClass("validation_error").find(".error_span").remove())),
                $(this).find(".error_span").length > 0 ? ($(this).addClass("validation_error"),
                i = !1) : ($(this).removeClass("validation_error"),
                $(this).removeAttr("aria-label tabindex")),
                $(this).hasClass("required") || 0 != a || ($(this).removeClass("validation_error"),
                $(this).removeAttr("aria-label tabindex"),
                $(this).find(".validation_error.error_span").remove(),
                i = !0)
            }
            )),
            $("#hulkapps_option_list_" + t + " .dd_multi_render:visible").each((function() {
                var t = parseInt($(this).find(".hulk_po_dropdown_multiple").attr("data-min"))
                  , e = parseInt($(this).find(".hulk_po_dropdown_multiple").attr("data-max"))
                  , a = $(this).find("select[multiple] option:selected").length
                  , o = '<span class="validation_error error_span" tabindex="0" >';
                !$(this).hasClass("required") || 0 != a && 0 != $(this).find("input[name^='properties']:not(.hulk_unique_sku)").val() || $(this).append(o),
                checkPlan("validation_for_min_max_option_selection", "boolean") && (0 != t && 0 != e ? a < t ? ($(this).removeClass("validation_error").find(".error_span").remove(),
                $(this).append(`${o} Choose from ${t} to ${e} values</span>`),
                $(this).find(".validation_error").attr("aria-label", `Choose from ${t} to ${e} values`),
                0 == a && $(this).hasClass("required") ? $(this).addClass("validation_error") : 0 == a && $(this).removeClass("validation_error").find(".error_span").remove()) : a > e ? ($(this).removeClass("validation_error").find(".error_span").remove(),
                $(this).append(`${o} Choose from ${t} to ${e} values</span>`),
                $(this).find(".validation_error").attr("aria-label", `Choose from ${t} to ${e} values`)) : $(this).removeClass("validation_error").find(".error_span").remove() : 0 != t ? a < t ? ($(this).removeClass("validation_error").find(".error_span").remove(),
                $(this).append(`${o} Choose at least  ${t} values</span>`),
                $(this).find(".validation_error").attr("aria-label", `Choose at least  ${t} values`)) : $(this).removeClass("validation_error").find(".error_span").remove() : 0 != e && (e >= a ? e == a ? $(this).removeClass("validation_error").find(".error_span").remove() : ($(this).removeClass("validation_error").find(".error_span").remove(),
                $(this).append(`${o} Choose upto ${e} values</span>`),
                $(this).find(".validation_error").attr("aria-label", `Choose upto ${e} values`)) : $(this).removeClass("validation_error").find(".error_span").remove())),
                $(this).find(".error_span").length > 0 ? ($(this).addClass("validation_error"),
                i = !1) : ($(this).removeClass("validation_error"),
                $(this).removeAttr("aria-label tabindex")),
                $(this).hasClass("required") || 0 != a || ($(this).removeClass("validation_error"),
                $(this).removeAttr("aria-label tabindex"),
                $(this).find(".validation_error.error_span").remove(),
                i = !0)
            }
            )),
            $("." + e).find("#hulkapps_option_list_" + t + " .et_render.required:visible").each((function() {
                if ($(this).find("input[type='email']").length && (!$(this).find("input[name^='properties']").val() && $(this).hasClass("required") || "" != $(this).find("input[type='email']").val())) {
                    var t = $(this).find("input[type='email']").val();
                    /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,5}|[0-9]{1,3})(\]?)$/.test(t) ? ($(this).removeClass("validation_error"),
                    $(this).removeAttr("aria-label tabindex"),
                    $(this).find(".error_span").remove()) : ($(this).addClass("validation_error"),
                    "" != $(this).find("input[type='email']").val() && !$(this).find(".error_span").length > 0 && ($(this).find("input[type='email']").after('<span class="validation_error error_span" tabindex="0" aria-label="Invalid email format">Invalid email format</span>'),
                    $(this).attr("aria-label", "Invalid email format")),
                    i = !1)
                }
            }
            )),
            $("." + e).find("#hulkapps_option_list_" + t + " .pn_render.required:visible").each((function() {
                $(this).find("input[type='textbox']").length && !$(this).find("input[name^='properties']").val() && $(this).hasClass("required") || $(this).find(".phone_number").hasClass("error") ? ($(this).addClass("validation_error"),
                i = !1) : ($(this).removeClass("validation_error"),
                $(this).removeAttr("aria-label tabindex"))
            }
            )),
            $("." + e).find("#hulkapps_option_list_" + t + " .dp_render:visible").each((function() {
                $(this).find(".error_span").length > 0 ? ($(this).addClass("validation_error"),
                i = !1) : ($(this).removeClass("validation_error"),
                $(this).removeAttr("aria-label tabindex"))
            }
            )),
            $("." + e).find("#hulkapps_option_list_" + t + " .dt_render:visible").each((function() {
                $(this).find(".error_span").length > 0 ? ($(this).addClass("validation_error"),
                i = !1) : ($(this).removeClass("validation_error"),
                $(this).removeAttr("aria-label tabindex"))
            }
            )),
            $("." + e).find("#hulkapps_option_list_" + t + " .dp_render.required:visible").each((function() {
                $(this).find("input[type='date']").length && !$(this).find("input[name^='properties']").val() && $(this).hasClass("required") || $(this).find(".error_span").length > 0 ? ($(this).addClass("validation_error"),
                i = !1) : ($(this).removeClass("validation_error"),
                $(this).removeAttr("aria-label tabindex"))
            }
            )),
            $("." + e).find("#hulkapps_option_list_" + t + " .dt_render.required:visible").each((function() {
                $(this).find("input[type='time']").length && !$(this).find("input[name^='properties']").val() && $(this).hasClass("required") || $(this).find(".error_span").length > 0 ? ($(this).addClass("validation_error"),
                i = !1) : ($(this).removeClass("validation_error"),
                $(this).removeAttr("aria-label tabindex"))
            }
            )),
            $("." + e).find(".fm_option_val").length > 0 && (i = !$("." + e).find(".fm_option_val").hasClass("validation_error")),
            $("." + e).find("#hulkapps_option_list_" + t + " .mq_render:visible").each((function() {
                var t = parseInt($(this).attr("data-min"))
                  , e = parseInt($(this).attr("data-max"))
                  , a = Math.max(t, e)
                  , o = 0
                  , n = $(this).find(".hulkapps_option_name").attr("aria-label")
                  , l = document.querySelector(`input[name*="properties[${n}]"]`)
                  , s = '<span class="validation_error error_span" tabindex="0" >'
                  , p = $(this).find(".hulk_multi_qty_main .muti-qty-div").length;
                l && "" !== l.value.trim() && (o = l.value.split(",").length),
                $(this).hasClass("required") && 0 == o && $(this).append(s),
                checkPlan("validation_for_min_max_option_selection", "boolean") && (p >= a && !window.ignore_min_max_validation || p >= a && window.ignore_min_max_validation || p <= a && !window.ignore_min_max_validation) && (0 != t && 0 != e ? o < t ? ($(this).removeClass("validation_error").find(".error_span").remove(),
                $(this).append(`${s} Choose from ${t} to ${e} values</span>`),
                $(this).find(".validation_error").attr("aria-label", `Choose from ${t} to ${e} values`),
                0 == o && $(this).hasClass("required") ? $(this).addClass("validation_error") : 0 == o && $(this).removeClass("validation_error").find(".error_span").remove()) : o > e ? ($(this).removeClass("validation_error").find(".error_span").remove(),
                $(this).append(`${s} Choose from ${t} to ${e} values</span>`),
                $(this).find(".validation_error").attr("aria-label", `Choose from ${t} to ${e} values`)) : $(this).removeClass("validation_error").find(".error_span").remove() : 0 != t ? o < t ? ($(this).removeClass("validation_error").find(".error_span").remove(),
                $(this).append(`${s} Choose at least  ${t} values</span>`),
                $(this).find(".validation_error").attr("aria-label", `Choose at least  ${t} values`)) : $(this).removeClass("validation_error").find(".error_span").remove() : 0 != e && (e >= o ? e == o ? $(this).removeClass("validation_error").find(".error_span").remove() : ($(this).removeClass("validation_error").find(".error_span").remove(),
                $(this).append(`${s} Choose upto ${e} values</span>`),
                $(this).find(".validation_error").attr("aria-label", `Choose upto ${e} values`)) : $(this).removeClass("validation_error").find(".error_span").remove()),
                $(this).find(".error_span").length > 0 ? ($(this).addClass("validation_error"),
                i = !1) : ($(this).removeClass("validation_error"),
                $(this).removeAttr("aria-label tabindex"))),
                $(this).hasClass("required") || 0 != o || ($(this).removeClass("validation_error"),
                $(this).removeAttr("aria-label tabindex"),
                $(this).find(".validation_error.error_span").remove(),
                i = !0)
            }
            )),
            i = await resolveInventory(e, i, a),
            $("." + e).find(".hulkapps_option:visible").each((function() {
                if ($(this).hasClass("validation_error")) {
                    i = !1;
                    var t = $(this).find(".hulkapps_option_name").attr("aria-label");
                    null == $(this).attr("aria-label") && $(this).attr({
                        "aria-label": `${t} is required`,
                        tabindex: 0
                    }),
                    $(".validation_error:first").focus()
                }
            }
            )),
            0 == i && $(".inventory_error,.validation_error").first().focus(),
            i
        }
        ,
        window.validate_single_option = function(t, e, a="") {
            if ("" == (a = a) && (a = "hulkapps_product_options"),
            "dd_render" == e)
                1 == $("." + a).find("." + t).find("select[name^='properties']").length && !$("." + a).find("." + t).find("select[name^='properties']:not(.hulk_unique_sku)").val() && $("." + a).find("." + t).hasClass("required") ? $("." + a).find("." + t).addClass("validation_error") : ($("." + a).find("." + t).removeAttr("aria-label tabindex"),
                $("." + a).find("." + t).removeClass("validation_error"));
            else if ("ci_render" == e)
                1 == $("." + a).find("." + t).find("input[name^='properties']").length && !$("." + a).find("." + t).find("input[name^='properties']:not(.hulk_unique_sku)").val() && $("." + a).find("." + t).hasClass("required") ? $("." + a).find("." + t).addClass("validation_error") : ($("." + a).find("." + t).removeAttr("aria-label tabindex"),
                $("." + a).find("." + t).removeClass("validation_error"));
            else if ("dd_multi_render" == e)
                $("." + a).find("." + t).find("select[multiple]").length && !$("." + a).find("." + t).find("input[name^='properties']:not(.hulk_unique_sku)").val() && $("." + a).find("." + t).hasClass("required") ? $("." + a).find("." + t).addClass("validation_error") : ($("." + a).find("." + t).removeAttr("aria-label tabindex"),
                $("." + a).find("." + t).removeClass("validation_error"));
            else if ("swatch_render" == e)
                $("." + a).find("." + t).removeClass("validation_error"),
                $("." + a).find("." + t).removeAttr("aria-label tabindex");
            else if ("multiswatch_render" == e)
                $("." + a).find("." + t).find(".hulkapps_swatch_option").length && !$("." + a).find("." + t).find("input[name^='properties']:not(.hulk_unique_sku)").val() && $("." + a).find("." + t).hasClass("required") ? $("." + a).find("." + t).addClass("validation_error") : ($("." + a).find("." + t).removeClass("validation_error"),
                $("." + a).find("." + t).removeAttr("aria-label tabindex"));
            else if ("button_render" == e)
                $("." + a).find("." + t).find(".hulkapps_buton_option").length && !$("." + a).find("." + t).find("input[name^='properties']:not(.hulk_unique_sku,.hulk_unique_prop)").val() && $("." + a).find("." + t).hasClass("required") ? $("." + a).find("." + t).addClass("validation_error") : ($("." + a).find("." + t).removeAttr("aria-label tabindex"),
                $("." + a).find("." + t).removeClass("validation_error"),
                $("." + a).find("." + t).removeAttr("aria-label tabindex"));
            else if ("cp_render" == e)
                $("." + a).find("." + t).find("input[type='text']").length && !$("." + a).find("." + t).find("input[name^='properties']").val() && $("." + a).find("." + t).hasClass("required") ? $("." + a).find("." + t).addClass("validation_error") : ($("." + a).find("." + t).removeClass("validation_error"),
                $("." + a).find("." + t).removeAttr("aria-label tabindex"));
            else if ("cb_render" == e)
                $("." + a).find("." + t).find(".hulkapps_check_option").length && !$("." + a).find("." + t).find("input[name^='properties']:not(.hulk_unique_sku,.hulk_unique_prop)").val() && $("." + a).find("." + t).hasClass("required") ? $("." + a).find("." + t).addClass("validation_error") : ($("." + a).find("." + t).removeClass("validation_error"),
                $("." + a).find("." + t).removeAttr("aria-label tabindex"));
            else if ("tb_render" == e)
                $("." + a).find("." + t).find("input[type='text']").length && !$("." + a).find("." + t).find("input[name^='properties']").val() && $("." + a).find("." + t).hasClass("required") ? $("." + a).find("." + t).addClass("validation_error") : ($("." + a).find("." + t).removeClass("validation_error"),
                $("." + a).find("." + t).removeAttr("aria-label tabindex"));
            else if ("dt_render" == e)
                $("." + a).find("." + t).find("input[type='time']").length && !$("." + a).find("." + t).find("input[name^='properties']").val() && $("." + a).find("." + t).hasClass("required") ? $("." + a).find("." + t).addClass("validation_error") : ($("." + a).find("." + t).removeClass("validation_error"),
                $("." + a).find("." + t).removeAttr("aria-label tabindex"));
            else if ("stg_render" == e)
                $("." + a).find("." + t).removeClass("validation_error"),
                $("." + a).find("." + t).removeAttr("aria-label tabindex"),
                $("." + a).find("." + t).hasClass("required") && $("." + a).find("." + t).find("input[type='text']").each((function() {
                    "" != $(this).val() || $(this).parents(".hulkapps_short_option_value").hasClass("conditional") || $("." + a).find("." + t).addClass("validation_error")
                }
                ));
            else if ("gf_render" == e)
                $("." + a).find("." + t).find("input[type='text']").length && !$("." + a).find("." + t).find("input[type='text']").val() && $("." + a).find("." + t).hasClass("required") ? $("." + a).find("." + t).addClass("validation_error") : ($("." + a).find("." + t).removeClass("validation_error"),
                $("." + a).find("." + t).removeAttr("aria-label tabindex"));
            else if ("nf_render" == e)
                $("." + a).find("." + t).find("input[type='number']").length && !$("." + a).find("." + t).find("input[name^='properties']").val() && $("." + a).find("." + t).hasClass("required") ? $("." + a).find("." + t).addClass("validation_error") : ($("." + a).find("." + t).removeClass("validation_error"),
                $("." + a).find("." + t).removeAttr("aria-label tabindex"));
            else if ("dp_render" == e)
                if ($("." + a).find("." + t).find("input[type='date']").length && $("." + a).find("." + t).find("input[name^='properties']").val()) {
                    var i = $("." + a).find("." + t).find("input[type='date']").val();
                    if (i.includes("-")) {
                        var o = i.split("-");
                        i = o[1] + "/" + o[2] + "/" + o[0]
                    }
                    var n = i.match(/^(\d{1,2})(\/|-)(\d{1,2})(\/|-)(\d{4})$/);
                    if (null == n)
                        $("." + a).find("." + t).addClass("validation_error"),
                        $("." + a).find("." + t).find(".validation_error").remove(),
                        $("." + a).find("." + t).find("input[type='date']").after('<span class="validation_error error_span">Enter valid date format mm/dd/yyyy</span>');
                    else if (dtMonth = n[1],
                    dtDay = n[3],
                    dtYear = n[5],
                    dtMonth < 1 || dtMonth > 12)
                        $("." + a).find("." + t).addClass("validation_error"),
                        $("." + a).find("." + t).find(".validation_error").remove(),
                        $("." + a).find("." + t).find("input[type='date']").after('<span class="validation_error error_span">Enter valid date format mm/dd/yyyy</span>');
                    else if (dtDay < 1 || dtDay > 31)
                        $("." + a).find("." + t).addClass("validation_error"),
                        $("." + a).find("." + t).find(".validation_error").remove(),
                        $("." + a).find("." + t).find("input[type='date']").after('<span class="validation_error error_span">Enter valid date format mm/dd/yyyy</span>');
                    else if (4 != dtMonth && 6 != dtMonth && 9 != dtMonth && 11 != dtMonth || 31 != dtDay)
                        if (2 == dtMonth) {
                            var l = dtYear % 4 == 0 && (dtYear % 100 != 0 || dtYear % 400 == 0);
                            dtDay > 29 || 29 == dtDay && !l ? ($("." + a).find("." + t).addClass("validation_error"),
                            $("." + a).find("." + t).find(".validation_error").remove(),
                            $("." + a).find("." + t).find("input[type='date']").after('<span class="validation_error error_span">Enter valid date format mm/dd/yyyy</span>')) : ($("." + a).find("." + t).removeClass("validation_error"),
                            $("." + a).find("." + t).find(".validation_error").remove(),
                            $("." + a).find("." + t).removeAttr("aria-label tabindex"))
                        } else
                            "/" !== n[2] || "/" !== n[4] ? ($("." + a).find("." + t).addClass("validation_error"),
                            $("." + a).find("." + t).find(".validation_error").remove(),
                            $("." + a).find("." + t).find("input[type='date']").after('<span class="validation_error error_span" tabindex="0" aria-labe="Enter valid date format mm/dd/yyyy">Enter valid date format mm/dd/yyyy</span>')) : ($("." + a).find("." + t).removeClass("validation_error"),
                            $("." + a).find("." + t).find(".validation_error").remove(),
                            $("." + a).find("." + t).removeAttr("aria-label tabindex"));
                    else
                        $("." + a).find("." + t).addClass("validation_error"),
                        $("." + a).find("." + t).find(".validation_error").remove(),
                        $("." + a).find("." + t).find("input[type='date']").after('<span class="validation_error error_span">Enter valid date format mm/dd/yyyy</span>')
                } else
                    $("." + a).find("." + t).find("input[type='date']").length && !$("." + a).find("." + t).find("input[name^='properties']").val() && $("." + a).find("." + t).hasClass("required") ? $("." + a).find("." + t).addClass("validation_error") : ($("." + a).find("." + t).removeClass("validation_error"),
                    $("." + a).find("." + t).removeAttr("aria-label tabindex"));
            else if ("ta_render" == e)
                $("." + a).find("." + t).find("textarea").length && !$("." + a).find("." + t).find("input[name^='properties']").val() && $("." + a).find("." + t).hasClass("required") ? $("." + a).find("." + t).addClass("validation_error") : ($("." + a).find("." + t).removeClass("validation_error"),
                $("." + a).find("." + t).removeAttr("aria-label tabindex"));
            else if ("rb_render" == e)
                $("." + a).find("." + t).removeClass("validation_error"),
                $("." + a).find("." + t).removeAttr("aria-label tabindex");
            else if ("fu_render" == e)
                $("." + a).find("." + t).find("input[type='file']").length && !$("." + a).find("." + t).find("input[name^='properties']").val() && $("." + a).find("." + t).hasClass("required") ? $("." + a).find("." + t).addClass("validation_error") : ($("." + a).find("." + t).removeClass("validation_error"),
                $("." + a).find("." + t).removeAttr("aria-label tabindex"));
            else if ("pn_render" == e)
                $("." + a).find("." + t).find("input[type='textbox']").length && !$("." + a).find("." + t).find("input[name^='properties']").val() && $("." + a).find("." + t).hasClass("required") || $("." + a).find("." + t).find(".phone_number").hasClass("error") ? ($("." + a).find("." + t).addClass("validation_error"),
                good = !1) : ($("." + a).find("." + t).removeClass("validation_error"),
                $("." + a).find("." + t).removeAttr("aria-label tabindex"));
            else if ("et_render" == e)
                if ($("." + a).find("." + t).find("input[type='email']").length && ($("." + a).find("." + t).find("input[name^='properties']").val() && $("." + a).find("." + t).hasClass("required") || "" != $("." + a).find("." + t).find("input[type='email']").val().length)) {
                    var s = $("." + a).find("." + t).find("input[type='email']").val();
                    /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,5}|[0-9]{1,3})(\]?)$/.test(s) ? ($("." + a).find("." + t).removeClass("validation_error"),
                    $("." + a).find("." + t).find(".error_span").remove(),
                    $("." + a).find("." + t).removeAttr("aria-label tabindex")) : ($("." + a).find("." + t).addClass("validation_error"),
                    !$("." + a).find("." + t).find(".error_span").length > 0 && ($("." + a).find("." + t).attr("aria-label", "Invalid email format"),
                    $("." + a).find("." + t).find("input[type='email']").after('<span class="validation_error error_span" tabindex="0" aria-label="Invalid email format">Invalid email format</span>')))
                } else
                    $("." + a).find("." + t).removeClass("validation_error"),
                    $("." + a).find("." + t).find(".error_span").remove(),
                    $("." + a).find("." + t).removeAttr("aria-label tabindex")
        }
        ,
        $(document).on("change", ".hulk_file_upload", (function() {
            var t = $(this).val()
              , e = $(this)[0].files;
            /^\s*$/.test(t) ? ($(this).parents(".file-upload").removeClass("hulk-active"),
            $(this).parents(".file-upload").find(".noFile").text("No file chosen...")) : ($(this).parents(".file-upload").addClass("hulk-active"),
            conditional_rules(window.hulkapps.product_id, "hulkapps_product_options"),
            e.length > 1 ? $(this).parents(".file-upload").find(".noFile").text(`${e.length} Files selected`) : $(this).parents(".file-upload").find(".noFile").text(t.replace("C:\\fakepath\\", "")))
        }
        ));
        var allOptions = "";
        function changeImage(t) {
            t = $(t);
            var e = [];
            if ($(".image_change_with_multiple").each((function() {
                var t = $(this).find(".hulkapps_option_child:first")
                  , a = t.attr("data-val-selected-class");
                if ("radio" == $(t).prop("type"))
                    1 == (i = $(this).find(`.${a}`)).length && (o = $.trim(i.parents(".hulkapps_radio_option").find(".hulkapps_option_child").attr("data-conditional-value"))) && e.push(o);
                else if ("select-one" == $(t).prop("type")) {
                    (o = $.trim($(t).find(":selected").data("conditional-value"))) && e.push(o)
                } else {
                    var i, o;
                    if (1 == (i = $(this).find(`.${a}`)).length)
                        (o = $.trim(i.attr("data-conditional-value"))) && e.push(o)
                }
            }
            )),
            e.length > 0) {
                e = e.join(" ").toLowerCase();
                $(window.image_parent).each((function() {
                    $.trim($(this).attr("alt")).toLowerCase().replaceAll("_", " ") == e && $(this).click()
                }
                ))
            }
        }
        $(document).on("click", "ul.hulkapps_product_options_ul .init", (function() {
            $(this).parent(".hulkapps_option_child").children("li:not(.init)").toggleClass("hulk-flex")
        }
        )),
        $(document).on("click", "ul.hulkapps_product_options_ul li:not(.init)", (function() {
            var t = $(this).parent("ul").attr("data-parent")
              , e = $(this).parent("ul").attr("data-pid")
              , a = $(this).attr("data-uid")
              , i = $(this).attr("data-display-val")
              , o = $(this).attr("data-hinventory");
            $(this).parents(".hulkapps_option_value").find(".hulk_options_quantity").show(),
            $(this).parents(".ci_render").find(".inventory_error").html(""),
            $(this).parents(".ci_render").find(".hulk_unique_sku").prop("disabled", !0);
            var n = $(this).closest("ul").attr("id");
            (allOptions = $("#" + n).children("li:not(.init)")).removeClass("dropdown_selected"),
            $(this).addClass("dropdown_selected"),
            $(this).closest("ul").children(".init").html($(this).html()),
            $(this).closest("ul").children("li:not(.init)").toggleClass("hulk-flex"),
            $(this).closest("ul").children(".init").attr("data-uid", a),
            $(this).closest("ul").children(".init").attr("data-display-val", i),
            $(this).closest("ul").children(".init").attr("data-hinventory", o);
            var l = "";
            $(this).parents(".hulkapps_option_value").find(".hulk_options_quantity").val() && (l = ` | ${$(this).parents(".hulkapps_option_value").find(".hulk_options_quantity").val()}`),
            $(this).parents(".hulkapps_option_value").find(".hulk_unique_prop").length > 0 && ("" != $(this).data("hinventory") ? $(this).parents(".hulkapps_option_value").find(".hulk_unique_prop").val($(this).attr("data-value") + "_hin_" + $(this).data("hinventory") + l) : $(this).parents(".hulkapps_option_value").find(".hulk_unique_prop").val("")),
            $(this).parents(".hulkapps_option_value").find(".hulk_opt_prop").val($(this).attr("data-value") + l),
            $(this).find(".hulk_unique_sku").prop("disabled", !1),
            conditional_rules(parseInt(e), t),
            "1" == $("#hulk_amount_dis").val() && calc_options_total(parseInt(e), t),
            validate_single_option("option_type_id_" + n, "ci_render", t),
            changeImage(this)
        }
        )),
        $(document).on("click", ".hulkapps_product_options_ul_parent .hulk_options_quantity", (function() {
            $(this).parents(".hulkapps_option_value").find(".hulk_opt_prop").val($(this).parents(".hulkapps_option_value").find("li.dropdown_selected").attr("data-value") + " | " + $(this).val()),
            $(this).parents(".hulkapps_option_value").find(".hulk_unique_prop") && $(this).parents(".hulkapps_option_value").find(".hulk_unique_prop").length > 0 && $(this).parents(".hulkapps_option_value").find("li.dropdown_selected").data("hinventory") && $(this).parents(".hulkapps_option_value").find(".hulk_unique_prop").val($(this).parents(".hulkapps_option_value").find("li.dropdown_selected").attr("data-value") + "_hin_" + $(this).parents(".hulkapps_option_value").find("li.dropdown_selected").data("hinventory") + " | " + $(this).val()),
            "1" == $("#hulk_amount_dis").val() && calc_options_total(parseInt(window.hulkapps.product_id), "hulkapps_product_options")
        }
        )),
        $(document).on("click keyup", ".multi-qty-option", (function(t) {
            $(this).parents(".muti-qty-div").parents(".hulkapps_option_value").parent(".mq_render").removeClass("validation_error"),
            $(this).parents(".muti-qty-div").parents(".hulkapps_option_value").parent(".mq_render").find(".inventory_error").remove();
            var e = []
              , a = []
              , i = []
              , o = $(this).parent(".quantity_selector").find(".hulk_quantity_amount").attr("data-parent")
              , n = $(this).parent(".quantity_selector").find(".hulk_quantity_amount").attr("data-pid")
              , l = 0
              , s = $(this).parent(".quantity_selector").find(".hulk_quantity_amount").attr("data-qval")
              , p = '<span class="validation_error error_span" tabindex="0" >'
              , r = $(this).parents(".muti-qty-div").parents(".hulkapps_option_value").parent(".mq_render");
            if ("number_input" == $(this).data("htype")) {
                s = $(this).val();
                $(this).text(s),
                $(this).attr("data-qval", s)
            } else
                "increment" == $(this).data("htype") ? (s++,
                $(this).parent(".quantity_selector").find(".hulk_quantity_amount").val(s),
                $(this).parent(".quantity_selector").find(".hulk_quantity_amount").attr("data-qval", s)) : s > 0 && (s--,
                $(this).parent(".quantity_selector").find(".hulk_quantity_amount").val(s),
                $(this).parent(".quantity_selector").find(".hulk_quantity_amount").attr("data-qval", s));
            if (0 != $(".hulk_quantity_popup").length) {
                var d = parseInt($(this).siblings(".hulk_quantity_amount").attr("data-min"))
                  , _ = parseInt($(this).siblings(".hulk_quantity_amount").attr("data-max"));
                r = $(this).parents(".muti-qty-div").parent(".hulk_multi_qty_main")
            } else
                d = parseInt($(this).parents(".mq_render").attr("data-min")),
                _ = parseInt($(this).parents(".mq_render").attr("data-max")),
                r = $(this).parents(".muti-qty-div").parents(".hulkapps_option_value").parent(".mq_render");
            var u = 0;
            !window.ignore_min_max_validation && checkPlan("validation_for_min_max_option_selection", "boolean") ? ($(this).parents(".muti-qty-div").parents(".hulkapps_option_value").find(".hulk_quantity_amount").each((function() {
                parseInt($(this).attr("data-qval")) > 0 && u++
            }
            )),
            0 != d && 0 != _ ? u < d ? (r.removeClass("validation_error").find(".error_span").remove(),
            r.append(`${p} Choose from ${d} to ${_} values</span>`),
            r.find(".validation_error").attr("aria-label", `Choose from ${d} to ${_} values`),
            0 == u && r.removeClass("validation_error").find(".error_span").remove()) : u > _ ? (r.removeClass("validation_error").find(".error_span").remove(),
            r.append(`${p} Choose from ${d} to ${_} values</span>`),
            r.find(".validation_error").attr("aria-label", `Choose from ${d} to ${_} values`),
            u != _ && r.removeClass("validation_error").find(".error_span").remove(),
            s--,
            "number_input" == $(this).data("htype") ? ($(this).val(0),
            $(this).attr("data-qval", 0)) : ($(this).parent(".quantity_selector").find(".hulk_quantity_amount").val(s),
            $(this).parent(".quantity_selector").find(".hulk_quantity_amount").attr("data-qval", s))) : r.removeClass("validation_error").find(".error_span").remove() : 0 != d ? u < d ? (r.removeClass("validation_error").find(".error_span").remove(),
            r.append(`${p} Choose at least  ${d} values</span>`),
            r.find(".validation_error").attr("aria-label", `Choose at least  ${d} values`)) : r.removeClass("validation_error").find(".error_span").remove() : 0 != _ && (_ >= u ? _ == u ? r.removeClass("validation_error").find(".error_span").remove() : (r.removeClass("validation_error").find(".error_span").remove(),
            r.append(`${p} Choose upto ${_} values</span>`),
            r.find(".validation_error").attr("aria-label", `Choose upto ${_} values`)) : (r.removeClass("validation_error").find(".error_span").remove(),
            s--,
            "number_input" == $(this).data("htype") ? ($(this).val(0),
            $(this).attr("data-qval", 0)) : ($(this).parent(".quantity_selector").find(".hulk_quantity_amount").val(s),
            $(this).parent(".quantity_selector").find(".hulk_quantity_amount").attr("data-qval", s))))) : r.removeClass("validation_error").find(".error_span").remove(),
            $(this).parents(".muti-qty-div").parents(".hulkapps_option_value").find(".hulk_quantity_amount").each((function(t) {
                if (parseInt($(this).attr("data-qval")) > 0) {
                    $(this).parents(".hulk_quantity_div").parent(".muti-qty-div").find(".hulk_quantity_left").find(".hulk_unique_sku").removeAttr("disabled");
                    var o, n;
                    $(this).attr("id");
                    o = ` | ${$(this).attr("data-qval")}`,
                    n = $(this).attr("data-qval");
                    var s = $(this).attr("data-hinventory");
                    l += parseFloat($(this).attr("data-price")) * parseInt(n);
                    var p = $(this).attr("data-value");
                    s && e.push(`${p}_hin_${s}${o}`),
                    a.push(`${p}${o}`),
                    i.push(`${p}_hin_${n}`)
                } else
                    $(this).parents(".muti-qty-div").find(".hulk_quantity_left").find(".hulk_unique_sku").attr("disabled", !0)
            }
            )),
            $(this).parents(".muti-qty-div").parent(".hulk_multi_qty_main").find(".hulk_unique_prop").val(e.join(" , ")),
            a.length > 0 ? ($(this).parents(".muti-qty-div").parent(".hulk_multi_qty_main").find(".hulk_unique_prop").addClass("mqty_selected"),
            $(this).parents(".muti-qty-div").parent(".hulk_multi_qty_main").find(".hulk_unique_prop").attr("data-inventory-record", i),
            $(this).parents(".muti-qty-div").parent(".hulk_multi_qty_main").find(".hulk_unique_prop").attr("data-price", l)) : ($(this).parents(".muti-qty-div").parent(".hulk_multi_qty_main").find(".hulk_unique_prop").removeClass("mqty_selected"),
            $(this).parents(".muti-qty-div").parent(".hulk_multi_qty_main").find(".hulk_unique_prop").attr("data-price", "")),
            $(this).parents(".muti-qty-div").parent(".hulk_multi_qty_main").find(".hulk_mutli_qty").val(a.join(" , ")),
            calc_options_total(parseInt(n), o),
            conditional_rules(parseInt(n), o)
        }
        )),
        $(document).on("change", ".hulk_po_dropdown", (function() {
            var t = $(this).attr("id")
              , e = $(this).attr("data-parent")
              , a = $(this).attr("data-pid");
            $(this).val() ? $(this).parent(".hulkapps_option_value").find(".hulk_options_quantity").show() : $(this).parent(".hulkapps_option_value").find(".hulk_options_quantity").hide(),
            $(this).parents(".dd_render").find(".hulk_unique_sku").prop("disabled", !0),
            $(this).parents(".dd_render").find(".inventory_error").html("");
            var i = "";
            $(this).parent(".hulkapps_option_value").find(".hulk_options_quantity").val() && (i = ` | ${$(this).parent(".hulkapps_option_value").find(".hulk_options_quantity").val()}`),
            $(this).parent(".hulkapps_option_value").find(".hulk_unique_prop") && $(this).parent(".hulkapps_option_value").find(".hulk_unique_prop").length > 0 && ($(this).val() && $(this).children("option:selected").data("hinventory") ? $(this).parent(".hulkapps_option_value").find(".hulk_unique_prop").val(`${$(this).val()}_hin_${$(this).children("option:selected").data("hinventory")}${i}`) : $(this).parent(".hulkapps_option_value").find(".hulk_unique_prop").val("")),
            $(this).val() ? $(this).parent(".hulkapps_option_value").find(".hulk_dropdown_hidden_prop").val($(this).val() + i) : $(this).parent(".hulkapps_option_value").find(".hulk_dropdown_hidden_prop").val("");
            var o = $(this).find("option:selected").data("conditional-value");
            o && $(this).parents(".dd_render").find(`[data-sku-identifier='${o}']`).removeAttr("disabled"),
            conditional_rules(parseInt(a), e),
            "1" == $("#hulk_amount_dis").val() && calc_options_total(parseInt(a), e),
            validate_single_option(`option_type_id_${t}`, "dd_render", e),
            changeImage(this)
        }
        )),
        $(document).on("change", ".hulk_po_dropdown_quantity", (function() {
            var t = $(this).attr("data-parent")
              , e = $(this).attr("data-pid");
            $(this).parent(".hulkapps_option_value").find(".hulk_dropdown_hidden_prop").val(`${$(this).parent(".hulkapps_option_value").find(".hulkapps_option_child").val()} | ${$(this).val()}`),
            $(this).parent(".hulkapps_option_value").find(".hulk_unique_prop") && $(this).parent(".hulkapps_option_value").find(".hulk_unique_prop").length > 0 && ($(this).parent(".hulkapps_option_value").find(".hulkapps_option_child").children("option:selected").data("hinventory") ? $(this).parent(".hulkapps_option_value").find(".hulk_unique_prop").val(`${$(this).parent(".hulkapps_option_value").find(".hulkapps_option_child").val()}_hin_${$(this).parent(".hulkapps_option_value").find(".hulkapps_option_child").children("option:selected").data("hinventory")} | ${$(this).val()}`) : $(this).parent(".hulkapps_option_value").find(".hulk_unique_prop").val("")),
            "1" == $("#hulk_amount_dis").val() && calc_options_total(parseInt(e), t)
        }
        )),
        $(document).on("change", ".hulk_po_dropdown_multiple", (function() {
            var t = $(this).attr("id")
              , e = parseInt($(this).attr("data-min"))
              , a = parseInt($(this).attr("data-max"))
              , i = '<span class="validation_error error_span" tabindex="0">'
              , o = $(this).attr("data-parent")
              , n = $(this).attr("data-pid");
            $(this).parents(".dd_multi_render").find(".hulk_unique_sku").prop("disabled", !0),
            $(this).parents(".dd_multi_render").find(".inventory_error").html(""),
            0 != e && 0 != a && checkPlan("validation_for_min_max_option_selection", "boolean") ? $(this).find("option:selected").length < e ? ($(this).parents(".hulkapps_option").removeClass("validation_error").find(".error_span").remove(),
            $(this).after(`${i} Choose from ${e} to ${a} values</span>`),
            $(this).parents(".hulkapps_option").find(".validation_error").attr("aria-label", `Choose from ${e} to ${a} values`),
            0 == $(this).find("option:selected").length && $(this).parents(".hulkapps_option").removeClass("validation_error").find(".error_span").remove()) : $(this).find("option:selected").length > a ? ($(this).find("option:selected:last").prop("selected", !1),
            $(this).parents(".hulkapps_option").removeClass("validation_error").find(".error_span").remove(),
            $(this).after(`${i} Choose from ${e} to ${a} values</span>`),
            $(this).parents(".hulkapps_option").find(".validation_error").attr("aria-label", `Choose from ${e} to ${a} values`),
            $(this).find("option:selected").length == a && $(this).parents(".hulkapps_option").removeClass("validation_error").find(".error_span").remove()) : $(this).parents(".hulkapps_option").removeClass("validation_error").find(".error_span").remove() : checkPlan("validation_for_min_max_option_selection", "boolean") ? $(this).find("option:selected").length < e ? ($(this).parents(".hulkapps_option").removeClass("validation_error").find(".error_span").remove(),
            $(this).after(`${i} Choose at least  ${e} values</span>`),
            $(this).parents(".hulkapps_option").find(".validation_error").attr("aria-label", `Choose at least  ${e} values`)) : $(this).parents(".hulkapps_option").removeClass("validation_error").find(".error_span").remove() : checkPlan("validation_for_min_max_option_selection", "boolean") ? a >= $(this).find("option:selected").length ? a == $(this).find("option:selected").length ? $(this).parents(".hulkapps_option").removeClass("validation_error").find(".error_span").remove() : ($(this).parents(".hulkapps_option").removeClass("validation_error").find(".error_span").remove(),
            $(this).after(`${i} Choose upto ${a} values</span>`),
            $(this).parents(".hulkapps_option").find(".validation_error").attr("aria-label", `Choose upto ${a} values`)) : ($(this).parents(".hulkapps_option").removeClass("validation_error").find(".error_span").remove(),
            $(this).find("option:selected:last").prop("selected", !1)) : $(this).parents(".hulkapps_option").removeClass("validation_error");
            var l = $.map($(`.${o}`).find(`.hulkapps_option_${t}_visible:not([disabled])  :selected`), (function(t, e) {
                return $(t).val()
            }
            ));
            $(`.${o}`).find(`#hulkapps_option_${t}_hidden`).val(l.join(", "));
            var s = $.map($(`.${o}`).find(`.hulkapps_option_${t}_visible:not([disabled]) :selected`), (function(t, e) {
                if ("" != $(t).data("hinventory"))
                    return $(t).val() + "_hin_" + $(t).data("hinventory")
            }
            ));
            $(this).parent(".hulkapps_option_value").find(".hulk_unique_prop").length > 0 && $(this).parent(".hulkapps_option_value").find(".hulk_unique_prop").val(s.join(", ")),
            $(`.${o}`).find(`.hulkapps_option_${t}_visible:not([disabled]) :selected`).each((function(t) {
                var e = $(this).data("conditional-value");
                e && $(this).parents(".dd_multi_render").find(`[data-sku-identifier='${e}']`).removeAttr("disabled")
            }
            )),
            conditional_rules(parseInt(n), o),
            "1" == $("#hulk_amount_dis").val() && calc_options_total(parseInt(n), o),
            validate_single_option(`option_type_id_${t}`, "dd_multi_render", o)
        }
        )),
        $(document).on("click", ".hulk_po_radio", (function() {
            var t = $(this).attr("data-oid")
              , e = $(this).attr("data-parent")
              , a = $(this).attr("data-pid")
              , i = $(this).attr("data-radio-class")
              , o = $(this).attr("data-single_valid-class")
              , n = $(this).attr("data-val-selected-class")
              , l = $(this).attr("data-hidden-class");
            $(this).parents(`.${o}`).find(".hulk_unique_sku").prop("disabled", !0),
            $(this).parents(".hulkapps_option_value").find(".hulk_options_quantity").show(),
            "swatch_render" == o && $(this).parents(".hulkapps_option_value").find(".hulk_options_quantity").val("1");
            var s = "";
            $(this).parents(".hulkapps_option_value").find(".hulk_options_quantity").val() && (s = ` | ${$(this).parents(".hulkapps_option_value").find(".hulk_options_quantity").val()}`),
            $(this).parents(".hulkapps_option_value").find(".hulk_unique_prop") && $(this).parents(".hulkapps_option_value").find(".hulk_unique_prop").length > 0 && ($(this).find(`.${i}`).data("hinventory") ? $(this).parents(".hulkapps_option_value").find(".hulk_unique_prop").val(`${$(this).find(`.${i}`).val()}_hin_ ${$(this).find(`.${i}`).data("hinventory")}${s}`) : $(this).parents(".hulkapps_option_value").find(".hulk_unique_prop").val("")),
            $(this).find(`.${i}`).prop("checked", !0),
            $(this).parents(`.${o}`).find(`.${n}`).removeClass(n),
            $(this).parents(".hulkapps_option_value").find(`.${l}`).val(`${$(this).find(`.${i}`).val()}${s}`),
            $(this).parents(`.${o}`).find(".inventory_error").html(""),
            $(this).addClass(n),
            $(this).parents("label").find(".hulk_unique_sku").prop("disabled", !1),
            conditional_rules(parseInt(a), e),
            "1" == $("#hulk_amount_dis").val() && calc_options_total(parseInt(a), e),
            validate_single_option(`option_type_id_${t}`, o, e),
            changeImage(this)
        }
        )),
        $(document).on("change", ".hulk_po_swatch_quantity", (function() {
            var t = $(this).attr("data-parent")
              , e = $(this).attr("data-pid");
            $(this).parent(".hulkapps_option_value").find(".hulk_swatch_hidden_prop").val(`${$(this).parents(".hulkapps_option_value").find(".swatch_radio:checked").val()} | ${$(this).val()}`),
            $(this).parents(".hulkapps_option_value").find(".hulk_unique_prop") && $(this).parents(".hulkapps_option_value").find(".hulk_unique_prop").length > 0 && $(this).parent(".hulkapps_option_value").find(".swatch_radio:checked").data("hinventory") ? $(this).parents(".hulkapps_option_value").find(".hulk_unique_prop").val(`${$(this).parent(".hulkapps_option_value").find(".swatch_radio:checked").val()}_hin_${$(this).parent(".hulkapps_option_value").find(".swatch_radio:checked").data("hinventory")} | ${$(this).val()}`) : $(this).parents(".hulkapps_option_value").find(".hulk_unique_prop").val(""),
            "1" == $("#hulk_amount_dis").val() && calc_options_total(parseInt(e), t)
        }
        )),
        $(document).on("change", ".hulk_po_button_quantity", (function() {
            var t = $(this).attr("data-parent")
              , e = $(this).attr("data-pid");
            $(this).parents(".hulkapps_option_value").find(".hulk_button_hidden_prop").val(`${$(this).parents(".hulkapps_option_value").find(".button_selected").find(".button_radio").val()} | ${$(this).val()}`),
            $(this).parents(".hulkapps_option_value").find(".hulk_unique_prop") && $(this).parents(".hulkapps_option_value").find(".hulk_unique_prop").length > 0 && $(this).parent(".hulkapps_option_value").find(".button_selected").find(".button_radio").data("hinventory") && $(this).parents(".hulkapps_option_value").find(".hulk_unique_prop").val(`${$(this).parents(".hulkapps_option_value").find(".button_selected").find(".button_radio").val()}_hin_${$(this).parent(".hulkapps_option_value").find(".button_selected").find(".button_radio").data("hinventory")} | ${$(this).val()}`),
            "1" == $("#hulk_amount_dis").val() && calc_options_total(parseInt(e), t)
        }
        )),
        window.keybordAccess = function() {
            document.querySelectorAll(".hulkapps_buton_option,.hulkapps_check_option,.hulkapps_radio_option,.hulkapps_swatch_option,.hulkapps_mswatch_option,ul.hulkapps_product_options_ul .init,ul.hulkapps_product_options_ul li:not(.init),.hulk_po_other_options,.font-select span,.fs-results li,.hulk_file_upload,.popup_open_link,.file-upload,.popup_close_link").forEach((t => {
                t.addEventListener("keydown", (e => {
                    "Enter" !== e.key && " " !== e.key || (t.classList.contains("file-upload") ? t.querySelector(".hulk_file_upload").click() : t.click())
                }
                ))
            }
            ));
            var t = document.getElementsByClassName("hulkapps_option_value")
              , e = 0
              , a = 0;
            document.addEventListener("keydown", (function(i) {
                var o = i.keyCode;
                if (37 === o || 38 === o)
                    a = a > 0 ? a - 1 : 0;
                else {
                    if (39 !== o && 40 !== o)
                        return;
                    var n = document.activeElement.closest(".hulkapps_option_value");
                    n || (n = t[e]);
                    var l = n.querySelectorAll("label, li").length - 1;
                    a === l ? n && (Array.prototype.indexOf.call(t, n) === e || (e = e < t.length - 1 ? e + 1 : 0),
                    a = 0) : a = a < l ? a + 1 : l
                }
                var s = document.activeElement.closest(".hulkapps_option_value");
                s && (e = Array.prototype.indexOf.call(t, s));
                var p = t[e].querySelectorAll("label, li")[a];
                null != p && (p.focus(),
                i.preventDefault())
            }
            ))
        }
        ,
        $(document).on("click", ".hulk_po_checkbox", (function() {
            var t = $(this).attr("data-oid")
              , e = $(this).attr("data-single_valid-class")
              , a = parseInt($(this).attr("data-min"))
              , i = parseInt($(this).attr("data-max"))
              , o = '<span class="validation_error error_span" tabindex="0" >'
              , n = $(this).attr("data-parent")
              , l = $(this).attr("data-pid");
            $(this).parents(`.${e}`).find(".hulk_unique_sku").prop("disabled", !0),
            "multiswatch_render" == e ? $(this).addClass("swatch_selected") : $(this).parents(".cb_render").find(".inventory_error").html(""),
            0 != a && 0 != i && checkPlan("validation_for_min_max_option_selection", "boolean") ? $(`.hulkapps_option_${t}_visible:checkbox:checked`).length < a ? ($(this).parents(".hulkapps_option").removeClass("validation_error").find(".error_span").remove(),
            $(this).parents(".hulkapps_option").append(`${o} Choose from ${a} to ${i} values</span>`),
            $(this).parents(".hulkapps_option").find(".validation_error").attr("aria-label", `Choose from ${a} to ${i} values`),
            0 == $(`.hulkapps_option_${t}_visible:checkbox:checked`).length && $(this).parents(".hulkapps_option").removeClass("validation_error").find(".error_span").remove()) : $(`.${n}`).find(`.hulkapps_option_${t}_visible:checkbox:checked`).length > i ? ($(this).parents(".hulkapps_option").removeClass("validation_error").find(".error_span").remove(),
            $(this).parents(".hulkapps_option").append(`${o} Choose from ${a} to ${i} values</span>`),
            $(this).parents(".hulkapps_option").find(".validation_error").attr("aria-label", `Choose from ${a} to ${i} values`),
            $(`.${n}`).find(`.hulkapps_option_${t}_visible:checkbox:checked`).length != i && $(this).parents(".hulkapps_option").removeClass("validation_error").find(".error_span").remove(),
            "multiswatch_render" == e ? $(this).find(":checkbox").prop("checked", !1) : this.checked = !1) : $(this).parents(".hulkapps_option").removeClass("validation_error").find(".error_span").remove() : 0 != a && checkPlan("validation_for_min_max_option_selection", "boolean") ? $(`.${n}`).find(`.hulkapps_option_${t}_visible:checkbox:checked`).length < a ? ($(this).parents(".hulkapps_option").removeClass("validation_error").find(".error_span").remove(),
            $(this).parents(".hulkapps_option").append(`${o} Choose at least  ${a} values</span>`),
            $(this).parents(".hulkapps_option").find(".validation_error").attr("aria-label", `Choose at least  ${a} values`)) : $(this).parents(".hulkapps_option").removeClass("validation_error").find(".error_span").remove() : 0 != i && checkPlan("validation_for_min_max_option_selection", "boolean") && (i >= $(`.${n}`).find(`.hulkapps_option_${t}_visible:checkbox:checked`).length ? i == $(`.${n}`).find(`.hulkapps_option_${t}_visible:checkbox:checked`).length ? $(this).parents(".hulkapps_option").removeClass("validation_error").find(".error_span").remove() : ($(this).parents(".hulkapps_option").removeClass("validation_error").find(".error_span").remove(),
            $(this).parents(".hulkapps_option").append(`${o} Choose upto ${i} values</span>`),
            $(this).parents(".hulkapps_option").find(".validation_error").attr("aria-label", `Choose upto ${i} values`)) : ($(this).parents(".hulkapps_option").removeClass("validation_error").find(".error_span").remove(),
            "multiswatch_render" == e ? $(this).find(":checkbox").prop("checked", !1) : this.checked = !1)),
            conditional_rules(parseInt(l), n);
            var s = $.map($(`.${n}`).find(`.hulkapps_option_${t}_visible:not([disabled]):checked`), (function(t, e) {
                return $(t).val()
            }
            ));
            $(`.${n}`).find(`.hulkapps_option_${t}_visible:not([disabled]):checked`).each((function(t) {
                $(this).parents("label").find(".hulk_unique_sku").removeAttr("disabled")
            }
            )),
            $(`.${n}`).find(`#hulkapps_option_${t}_hidden`).val(s.join(",  "));
            var p = $.map($(`.${n}`).find(`.hulkapps_option_${t}_visible:not([disabled]):checked`), (function(t, e) {
                if ("" != $(t).data("hinventory"))
                    return $(t).val() + "_hin_" + $(t).data("hinventory")
            }
            ));
            $(this).parents(".hulkapps_option_value").find(".hulk_unique_prop").length > 0 && ($(this).parents(".hulkapps_option_value").find(".hulk_unique_prop").val(p.join(", ")),
            "multiswatch_render" == e && $(this).parents(".hulkapps_option_value").find(".swatch_checkbox:disabled").parent(".hulkapps_option_child").removeClass("swatch_selected")),
            "1" == $("#hulk_amount_dis").val() && calc_options_total(parseInt(l), n),
            validate_single_option(`option_type_id_${t}`, e, n)
        }
        )),
        $(document).on("change", ".hulk_po_swatch_multiple_checkbox", (function(t) {
            $(this).is(":checked") ? $(this).parent().addClass("swatch_selected") : $(this).parent().removeClass("swatch_selected"),
            $(this).parents(".multiswatch_render").find(".inventory_error").html("")
        }
        )),
        $(document).on("change click", ".hulk_po_radiobutton", (function() {
            var t = $(this).attr("data-oid")
              , e = $(this).attr("id")
              , a = $(this).attr("data-parent")
              , i = $(this).attr("data-pid");
            if ($(this).is(":checked")) {
                $(this).parents(".hulkapps_option_value").find(".hulk_options_quantity").show(),
                $(this).parents(".rb_render").find(".hulk_unique_sku").prop("disabled", !0);
                var o = "";
                $(this).parents(".hulkapps_option_value").find(".hulk_options_quantity").val() && (o = ` | ${$(this).parents(".hulkapps_option_value").find(".hulk_options_quantity").val()}`),
                $(this).parents(".hulkapps_option_value").find(".hulk_unique_prop") && $(this).parents(".hulkapps_option_value").find(".hulk_unique_prop").length > 0 && ($(this).data("hinventory") ? $(this).parents(".hulkapps_option_value").find(".hulk_unique_prop").val(`${$(this).val()}_hin_${$(this).data("hinventory")}${o}`) : $(this).parents(".hulkapps_option_value").find(".hulk_unique_prop").val("")),
                $(this).parents(".hulkapps_option_value").find(".hulk_radiobutton_hidden_prop").val($(this).val() + o),
                "switches-container" == $(this).parent().attr("class") || $(this).parent(".hulkapps_option_value").find(".switches-container").length > 1 ? ($(this).siblings().find(".radio_selected").removeClass("radio_selected"),
                $(`#radio_div_${e}`).addClass("radio_selected")) : ($(this).parent().siblings().find(".radio_div").removeClass("radio_selected"),
                $(this).parent().find(".radio_div").addClass("radio_selected")),
                $(this).parents("label").find(".hulk_unique_sku").prop("disabled", !1),
                changeImage(this)
            }
            conditional_rules(parseInt(i), a),
            "1" == $("#hulk_amount_dis").val() && calc_options_total(parseInt(i), a),
            validate_single_option(`option_type_id_${t}`, "rb_render", a)
        }
        )),
        $(document).on("change", ".hulk_po_radiobutton_quanity", (function() {
            var t = $(this).attr("data-parent")
              , e = $(this).attr("data-pid")
              , a = !1;
            $(this).parent(".hulkapps_option_value").find(".switches-container").length > 0 && (a = !0),
            a ? (rid = $(this).parent(".hulkapps_option_value").find(".radio_selected").attr("id").split("radio_div_")[1],
            $(this).parent(".hulkapps_option_value").find(".hulk_radiobutton_hidden_prop").val(`${$(`#${rid}`).val()} | ${$(this).val()}`)) : $(this).parent(".hulkapps_option_value").find(".hulk_radiobutton_hidden_prop").val(`${$(this).parent(".hulkapps_option_value").find(".radio_selected").parent(".hulkapps_radio_option").find(".hulkapps_option_child").val()} | ${$(this).val()}`),
            $(this).parent(".hulkapps_option_value").find(".hulk_unique_prop") && $(this).parent(".hulkapps_option_value").find(".hulk_unique_prop").length > 0 && $(this).parent(".hulkapps_option_value").find(".radio_selected").parent(".hulkapps_radio_option").find(".hulkapps_option_child").data("hinventory") && $(this).parent(".hulkapps_option_value").find(".hulk_unique_prop").val(`${$(this).parent(".hulkapps_option_value").find(".radio_selected").parent(".hulkapps_radio_option").find(".hulkapps_option_child").val()}_hin_${$(this).parent(".hulkapps_option_value").find(".radio_selected").parent(".hulkapps_radio_option").find(".hulkapps_option_child").data("hinventory")} | ${$(this).val()}`),
            "1" == $("#hulk_amount_dis").val() && calc_options_total(parseInt(e), t)
        }
        )),
        $(document).on("change input", ".hulk_po_other_options", (function() {
            var t = $(this).attr("id")
              , e = $(this).attr("data-parent")
              , a = $(this).attr("data-pid")
              , i = $(this).attr("data-single_valid-class")
              , o = $(this).attr("data-val-selected-class")
              , n = $(this).attr("data-is-charge")
              , l = $(this).data("price");
            if ("character_charge" == n) {
                $(this).attr("data-is-charge");
                var s = $(this).attr("data-main-price")
                  , p = $.trim($(this).val()).replace(/\s+/g, "").length;
                l = parseFloat(s) * p,
                $(this).attr("data-price", l)
            }
            var r = $(this).val();
            if ("" != r) {
                if ("0.00" != l)
                    var d = `${r} [ ${window.hulk_po_currency_symbol}${l} ]`;
                else
                    d = r;
                $(this).parent().find(".other_options_prop_val").val(d),
                $(this).addClass(o)
            } else
                $(this).parent().find(".other_options_prop_val").val(""),
                $(this).removeClass(o);
            conditional_rules(parseInt(a), e),
            "1" == $("#hulk_amount_dis").val() && calc_options_total(parseInt(a), e),
            validate_single_option(`option_type_id_${t}`, i, e)
        }
        )),
        $(document).on("change", ".po_changed_formula", (function() {
            var po_final_price = ""
              , final_prop = ""
              , hulk_parent_div = $(this).parents(".fm_option_val").attr("data-parent")
              , hulk_pid = $(this).parents(".fm_option_val").attr("data-pid")
              , min_selection = 0
              , max_selection = 0
              , opt_name = $(this).attr("data-name");
            $(this).attr("min") && (min_selection = parseInt($(this).attr("min"))),
            $(this).attr("max") && (max_selection = parseInt($(this).attr("max")));
            var is_validated = !0;
            $(this).parent(".hulkapps_option_value").find(".error_span").remove(),
            0 != min_selection && 0 != max_selection ? parseFloat($(this).val()) < min_selection || parseFloat($(this).val()) > max_selection ? ($(this).parent(".hulkapps_option_value").append(`<span class='validation_error error_span' tabindex='0' aria-label='Choose values from ${min_selection} - ${max_selection} for option ${opt_name}'>  Choose values from ${min_selection} - ${max_selection}. </span>`),
            is_validated = !1) : ($(this).parent(".hulkapps_option_value").find(".error_span").remove(),
            is_validated = !0) : 0 != min_selection ? parseFloat($(this).val()) < min_selection ? ($(this).parent(".hulkapps_option_value").append(`<span class='validation_error error_span' tabindex='0' aria-label=' Choose values higher than  ${min_selection} for option ${opt_name}'>  Choose values higher than  ${min_selection}. </span>`),
            is_validated = !1) : ($(this).parent(".hulkapps_option_value").find(".error_span").remove(),
            is_validated = !0) : 0 != max_selection && (parseFloat($(this).val()) > max_selection ? ($(this).parent(".hulkapps_option_value").append(`<span class='validation_error error_span' tabindex='0' aria-label='Choose values up to ${max_selection} for option ${opt_name}'> Choose values up to ${max_selection}. </span>`),
            is_validated = !1) : ($(this).parent(".hulkapps_option_value").find(".error_span").remove(),
            is_validated = !0));
            var error_span_length = $(this).parents(".fm_option_val").find(".error_span").length;
            is_validated && 0 == error_span_length ? ($(this).parents(".fm_option_val").find(".po_changed_formula").each((function() {
                po_final_price += parseFloat($(this).val()) + $(this).attr("data-arithmatic"),
                final_prop += `${$(this).attr("data-name")}:${$(this).val()} | `
            }
            )),
            po_final_price = po_final_price.slice(0, -1),
            final_prop = final_prop.slice(0, -1),
            po_final_price = eval(po_final_price).toFixed(2),
            $(this).parents(".fm_option_val").removeClass("validation_error"),
            $(this).parents(".fm_render").find(".error_span").remove(),
            isNaN(po_final_price) ? (parseFloat($(this).val()) <= 0 && $(this).val(""),
            $(this).parents(".fm_option_val").find(".hulk_formula_hidden_prop").removeClass("formula_selected"),
            $(this).parents(".fm_option_val").find(".hulk_formula_hidden_prop").val(""),
            $(this).parents(".fm_option_val").find(".hulk_formula_hidden_prop").attr("data-price", ""),
            calc_options_total(parseInt(hulk_pid), hulk_parent_div)) : po_final_price <= 0 || "Infinity" == po_final_price || parseFloat($(this).val()) <= 0 ? (parseFloat($(this).val()) <= 0 && $(this).val(""),
            $(this).parents(".fm_option_val").addClass("validation_error"),
            $(this).parents(".fm_render").append("<span class='validation_error error_span' tabindex='0' aria-label='Please change your value(s)'> Please change your value(s). </span>"),
            $(this).parents(".fm_option_val").find(".hulk_formula_hidden_prop").removeClass("formula_selected"),
            $(this).parents(".fm_option_val").find(".hulk_formula_hidden_prop").val(""),
            $(this).parents(".fm_option_val").find(".hulk_formula_hidden_prop").attr("data-price", ""),
            calc_options_total(parseInt(hulk_pid), hulk_parent_div)) : ($(this).parents(".fm_option_val").find(".hulk_formula_hidden_prop").val(`${final_prop}[${po_final_price}]`),
            $(this).parents(".fm_option_val").find(".hulk_formula_hidden_prop").attr("data-price", po_final_price),
            $(this).parents(".fm_option_val").find(".hulk_formula_hidden_prop").addClass("formula_selected"),
            calc_options_total(parseInt(hulk_pid), hulk_parent_div))) : (parseFloat($(this).val()) <= 0 && $(this).val(""),
            $(this).parents(".fm_option_val").find(".hulk_formula_hidden_prop").removeClass("formula_selected"),
            $(this).parents(".fm_option_val").find(".hulk_formula_hidden_prop").val(""),
            $(this).parents(".fm_option_val").find(".hulk_formula_hidden_prop").attr("data-price", ""),
            calc_options_total(parseInt(hulk_pid), hulk_parent_div)),
            conditional_rules(parseInt(hulk_pid), hulk_parent_div)
        }
        )),
        $(document).on("change", '.stg_render input[type="text"]', (function() {
            opt_val = $(this).parents(".stg_render").find("input[type='text']").map((function() {
                if ("" != $(this).val())
                    return $(this).attr("data-key-name") + " : " + $(this).val()
            }
            )).get().join(" | ");
            var t = $(this).parents(".stg_render").find(".stg_hidden").attr("data-pid")
              , e = $(this).parents(".stg_render").find(".stg_hidden").attr("data-oid")
              , a = $(this).attr("data-parent")
              , i = $(this).attr("data-single_valid-class")
              , o = $(this).attr("data-val-selected-class");
            if ("" != opt_val)
                if (opt_price = $(this).parents(".stg_render").find(".stg_hidden").data("price"),
                opt_currency = window.hulk_po_currency_symbol,
                "0:00" != opt_price) {
                    var n = opt_val + " [ " + opt_currency + " " + opt_price + " ]";
                    $(this).parents(".stg_render").find(".stg_property_val").val(n),
                    $(this).parents(".stg_render").find(".stg_hidden").addClass(o)
                } else {
                    n = opt_val;
                    $(this).parents(".stg_render").find(".stg_property_val").val(n),
                    $(this).parents(".stg_render").find(".stg_hidden").addClass(o)
                }
            else
                $(this).parents(".stg_render").find(".stg_property_val").val(""),
                $(this).parents(".stg_render").find(".stg_hidden").removeClass(o);
            conditional_rules(parseInt(t), a),
            "1" == $("#hulk_amount_dis").val() && calc_options_total(parseInt(t), a),
            validate_single_option(`option_type_id_${e}`, i, a)
        }
        )),
        hulkapps_jQuery(document).on("blur", ".hulkapps_option_value [type='time']", (function(t) {
            var e = $(this).attr("id")
              , a = $(this).attr("data-parent")
              , i = $(this).attr("data-pid")
              , o = $(this).attr("data-single_valid-class")
              , n = $(this).attr("data-val-selected-class")
              , l = $(this).data("price")
              , s = hulkapps_jQuery(this).val()
              , p = hulkapps_jQuery(this).attr("min")
              , r = hulkapps_jQuery(this).attr("max")
              , d = new Date("1970-01-01T" + s + ":00");
            if ("" != p)
                var _ = new Date("1970-01-01T" + p + ":00");
            if ("" != r)
                var u = new Date("1970-01-01T" + r + ":00");
            if ("" != s)
                if (d < _ || d > u) {
                    hulkapps_jQuery(this).val("");
                    var c = "";
                    $(this).parent().find(".other_options_prop_val").val(""),
                    $(this).removeClass(n),
                    c = _ && u ? "Please select a time between " + _.toLocaleTimeString([], {
                        timeStyle: "short"
                    }) + " and " + u.toLocaleTimeString([], {
                        timeStyle: "short"
                    }) + "." : _ ? "Please select a time from " + _.toLocaleTimeString([], {
                        timeStyle: "short"
                    }) + "." : "Please select a time earlier than " + u.toLocaleTimeString([], {
                        timeStyle: "short"
                    }) + ".",
                    hulkapps_jQuery(this).parent(".hulkapps_option_value").append("<span class='validation_error error_span' tabindex='0' aria-label='" + c + "'>" + c + "</span>");
                    var h = hulkapps_jQuery(this);
                    setTimeout((function() {
                        h.parent(".hulkapps_option_value").find(".validation_error").remove()
                    }
                    ), 3e3)
                } else {
                    if ("0.00" != l)
                        var v = `${s} [ ${window.hulk_po_currency_symbol}${l} ]`;
                    else
                        v = s;
                    $(this).parent().find(".other_options_prop_val").val(v),
                    $(this).addClass(n)
                }
            else
                $(this).parent().find(".other_options_prop_val").val(""),
                $(this).removeClass(n);
            conditional_rules(parseInt(i), a),
            "1" == $("#hulk_amount_dis").val() && calc_options_total(parseInt(i), a),
            validate_single_option(`option_type_id_${e}`, o, a)
        }
        )),
        hulkapps_jQuery(document).on("blur", ".hulkapps_option_value [type='date']", (function(t) {
            var e = $(this).attr("id")
              , a = $(this).attr("data-parent")
              , i = $(this).attr("data-pid")
              , o = $(this).attr("data-single_valid-class")
              , n = $(this).attr("data-val-selected-class")
              , l = $(this).data("price")
              , s = hulkapps_jQuery(this).val()
              , p = hulkapps_jQuery(this).attr("min")
              , r = hulkapps_jQuery(this).attr("max")
              , d = new Date(s);
            if ("" != p) {
                var _ = new Date(p).toISOString().split("T")[0];
                _ = new Date(_)
            }
            if ("" != r) {
                var u = new Date(r).toISOString().split("T")[0];
                u = new Date(r)
            }
            if ("" != s)
                if (d < _ || d > u) {
                    hulkapps_jQuery(this).val("");
                    var c = "";
                    $(this).parent().find(".other_options_prop_val").val(""),
                    $(this).removeClass(n),
                    c = _ && u ? "Please select a date between " + _.toISOString().split("T")[0] + " and " + u.toISOString().split("T")[0] + "." : _ ? "Please select a time from " + _.toISOString().split("T")[0] + "." : "Please select a time earlier than " + u.toISOString().split("T")[0] + ".",
                    hulkapps_jQuery(this).parent(".hulkapps_option_value").append("<span class='validation_error error_span' tabindex='0' aria-label='" + c + "'>" + c + "</span>");
                    var h = hulkapps_jQuery(this);
                    setTimeout((function() {
                        h.parent(".hulkapps_option_value").find(".validation_error").remove()
                    }
                    ), 3e3)
                } else {
                    if ("0.00" != l)
                        var v = `${s} [ ${window.hulk_po_currency_symbol}${l} ]`;
                    else
                        v = s;
                    $(this).parent().find(".other_options_prop_val").val(v),
                    $(this).addClass(n)
                }
            else
                $(this).parent().find(".other_options_prop_val").val(""),
                $(this).removeClass(n);
            conditional_rules(parseInt(i), a),
            "1" == $("#hulk_amount_dis").val() && calc_options_total(parseInt(i), a),
            validate_single_option(`option_type_id_${e}`, o, a)
        }
        )),
        $(document).on("click", ".hulkapps_product_discount_button", (function(t) {
            $(".hulkapps_product_discount_button").attr("disabled", "disabled"),
            $(".hulkapps_product_discount_button").addClass("hulkapps_product_discount_disabled_button"),
            new Promise(( (t, e) => {
                t(validate_options(window.hulkapps.product_id, "hulkapps_product_options"))
            }
            )).then((function(t) {
                if (t) {
                    var e = Shopify.locale
                      , a = {};
                    a[window.hulkapps.product.selected_variant] = window.hulkapps.product_collection,
                    $.ajax({
                        type: "POST",
                        url: window.hulkapps.po_url + "/store/get_cart_details",
                        data: {
                            cart_data: window.hulk_cjson,
                            store_id: window.hulkapps.store_id,
                            cart_collections: JSON.stringify(a),
                            customer_tags: null != window.hulkapps.customer ? window.hulkapps.customer.tags.split(",") : "",
                            draft_order_language: null != e ? e : "",
                            discount_code: $("input[name=checkout_discount]").val()
                        },
                        crossDomain: !0,
                        success: function(t) {
                            var e = t.discounts
                              , a = parseFloat(e.discount_cut_price);
                            e.discount_code && 1 == e.discount_error ? (hulkapps_jQuery(".hulkapps_summary_product").remove(),
                            $(".discount_code_box_product .hulkapps_discount_hide").after("<span class='hulkapps_summary_product'>Discount code does not match</span>"),
                            $(".hulkapps-summary-product-line-discount-code").html(""),
                            $(".product_after_discount_price").html("")) : e.is_free_shipping ? ($(".hulkapps_summary_product").remove(),
                            $(".hulkapps-summary-product-line-discount-code").html(""),
                            $(".product_after_discount_price").html(""),
                            $(".discount_code_box_product .hulkapps_discount_hide").after("<span class='hulkapps-summary-product-line-discount-code'><span class='discount-tag'>" + e.discount_code + "<span class='product-close-tag close-tag'></span></span>Free Shipping")) : e.discount_code && a <= 0 ? ($(".discount_code_box_product .hulkapps_discount_hide").after("<span class='hulkapps_summary_product'>" + e.discount_code + " discount code isn’t valid for the items in your cart</span>"),
                            $(".hulkapps_discount_code").val(""),
                            $(".hulkapps-summary-product-line-discount-code").html(""),
                            $(".product_after_discount_price").html("")) : e.discount_code ? ($(".discount_code_box_product").find(".hulkapps_summary_product").html(""),
                            $(".hulkapps-summary-product-line-discount-code,.product_after_discount_price").remove(),
                            $(".discount_code_box_product .hulkapps_discount_hide").after("<span class='hulkapps-summary-product-line-discount-code'><span class='discount-tag'>" + e.discount_code + "<span class='product-close-tag close-tag'></span></span><span class='hulkapps_with_discount'> -" + e.with_discount + "</span></span><span class='product_after_discount_price'><span class='final-total'>Total</span>" + e.final_with_discounted_price + "</span>"),
                            $(".hulkapps-cart-total").remove()) : ($(".hulkapps-summary-product-line-discount-code").html(""),
                            $(".product_after_discount_price").html(""),
                            $(".discount_code_box_product").find(".hulkapps_summary_product").html("")),
                            $(".hulkapps_product_discount_button").removeAttr("disabled"),
                            $(".hulkapps_product_discount_button").removeClass("hulkapps_product_discount_disabled_button")
                        }
                    })
                }
            }
            )).catch((function(t) {}
            ))
        }
        )),
        $(document).on("click", ".hulkapps_product_discount_modal .modal_close_btn", (function(t) {
            $(".hulkapps_product_discount_modal").hide()
        }
        ));
        var hulk_flag = 0;
        $(document).on("click", ".hulk-buy_now,#hulkapps_buy_now_continue", (function(t) {
            var e = $(this)
              , a = $(this).attr("data-hulk-btn-type");
            t.cancelBubble = !0,
            t.stopPropagation(),
            t.preventDefault(),
            t.stopImmediatePropagation(),
            new Promise(( (t, e) => {
                t(validate_options(window.hulkapps.product_id, "hulkapps_product_options"))
            }
            )).then((function(t) {
                if (t) {
                    var i, o = "hulkapps_product_options", n = 0, l = !1, s = (window.hulkapps.money_format,
                    $("." + o + " #hulkapps_option_list_" + window.hulkapps.product_id + ":visible .price-change:checked, ." + o + " #hulkapps_option_list_" + window.hulkapps.product_id + ":visible .price-change:selected, ." + o + " .hulkapps_swatch_option .swatch_selected,." + o + " .textarea_selected,." + o + " .textbox_selected,." + o + " .emailbox_selected,." + o + " .datepicker_selected,." + o + " .numberfield_selected,." + o + " .colorpicker_selected,." + o + " .button_selected,." + o + " .googlefont_selected, ." + o + " .ci_render .hulkapps_option_value .hulkapps_option_child .dropdown_selected, ." + o + " .formula_selected,." + o + " .stg_selected,." + o + " .stg_selected, ." + o + " .mqty_selected"));
                    for (i = 0; i < s.length; i++)
                        if (!$(s[i]).parents(".hulkapps_option").hasClass("conditional")) {
                            n = Number($(s[i]).attr("data-price")) + Number(n);
                            var p = $(s[i]).attr("data-variant-id");
                            null != p && "null" !== p && (l = !0)
                        }
                    if (!(n > 0 || n <= 0 && (l || $(".file-upload.hulk-active").length > 0)) || 0 != hulk_flag || "Checkout-button" != e.attr("data-testid") && "ShopifyPay-button" != e.attr("data-testid") && "payment-button" != e.attr("data-testid"))
                        $(".shopify-payment-button__button, .shopify-payment-button__more-options").first().trigger("click");
                    else {
                        if ($(".shopify-payment-button").css({
                            "pointer-events": "none"
                        }),
                        !window.is_checkout_api && window.is_product_page_doscount_code && "hulkapps_buy_now_continue" != a && $(".product-hulkapps-discount-code-html").length > 0) {
                            var r = ""
                              , d = document.querySelector("shopify-accelerated-checkout")
                              , _ = "";
                            if (d)
                                try {
                                    const t = d.getAttribute("recommended");
                                    _ = t && JSON.parse(t).name || ""
                                } catch (t) {
                                    _ = ""
                                }
                            r = $(".shopify-payment-button").html().includes("ShopifyPay-button") || "shop_pay" == _ ? "ShopifyPay-button" : $(".shopify-payment-button").html().includes("payment-button") ? "payment-button" : "Checkout-button",
                            $(".product-hulkapps-discount-code-html").html('<div class="hulkapps_product_discount_modal"><div class="product_discount_modal_wrapper"><span class="modal_close_btn"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_2361_7248)"><path d="M1.23998 24.0001C0.923838 24.0001 0.607699 23.8798 0.367506 23.6378C-0.114689 23.1556 -0.114689 22.3739 0.367506 21.8917L21.8975 0.361646C22.3797 -0.120549 23.1615 -0.120549 23.6437 0.361646C24.1259 0.843841 24.1259 1.6256 23.6437 2.1081L2.11396 23.6378C1.87195 23.8783 1.55582 24.0001 1.23998 24.0001Z" fill="#AAAAAA"/><path d="M22.7715 24.0001C22.4554 24.0001 22.1395 23.8798 21.899 23.6378L0.367506 2.1081C-0.114689 1.6256 -0.114689 0.843841 0.367506 0.361646C0.849701 -0.120549 1.63146 -0.120549 2.11396 0.361646L23.6437 21.8917C24.1259 22.3739 24.1259 23.1556 23.6437 23.6378C23.4017 23.8783 23.0858 24.0001 22.7715 24.0001Z" fill="#AAAAAA"/></g><defs><clipPath id="clip0_2361_7248"><rect width="24" height="24" fill="white"/></clipPath></defs></svg></span><div class="product_discount_modal_body"><div id="hulkapps_discount_code"><div class="discount_code_box_product"><div class="hulkapps_discount_hide"><input placeholder="Discount code" class="hulkapps_discount_code" autocomplete="off" aria-required="true" size="30" type="text" name="checkout_discount"><button type="button" class="btn btn--primary btn-primary button hulkapps_product_discount_button hulkapps_product_discount_disabled_button" disabled >Apply</button></div></div></div><p class="hulkapps_discount_notetxt"><b>Note:</b> Proceed with Checkout button if no discount code available.</p></div><div class="product_discount_modal_footer"><button id="" class="btn btn-secondary button button--secondary modal_close_btn" type="button"  >Cancel</button><button id="hulkapps_buy_now_continue" class="btn btn--secondary btn-primary button button--primary" type="button" data-testid="' + r + '" data-hulk-btn-type="hulkapps_buy_now_continue">Checkout</button></div></div></div>')
                        }
                        var u = {}
                          , c = e.attr("data-testid")
                          , h = !1
                          , v = [];
                        $("[name^='properties']").each((function() {
                            var t;
                            "" == $(this).val() && $(this).remove(),
                            "radio" == this.type ? this.checked && (t = this.name.replace("properties[", "").replace("]", ""),
                            $.trim(this.value).length > 0 && (u[t] = this.value)) : "file" == this.type ? (t = this.name.replace("properties[", "").replace("]", ""),
                            $.trim(this.value).length > 0 && (u[t] = this.value,
                            h = !0,
                            v.push(t))) : (t = this.name.replace("properties[", "").replace("]", ""),
                            $.trim(this.value).length > 0 && (u[t] = this.value))
                        }
                        )),
                        new Promise(( (t, e) => {
                            if (h && v.length > 0) {
                                var a = null
                                  , i = null;
                                if (["input[name='add']", "button[name='add']", "#add-to-cart", "#AddToCartText", "#AddToCart", 'form[action$="/cart/add"] input[type="submit"]'].forEach((function(t) {
                                    var e = document.querySelectorAll(t);
                                    e.length,
                                    null === a && e.length > 0 && (a = e[0])
                                }
                                )),
                                a)
                                    i = a.closest("form").getAttribute("id");
                                if (i) {
                                    var o = new FormData($(`#${i}`)[0]);
                                    $.ajax({
                                        type: "POST",
                                        url: "/cart/add.js",
                                        data: o,
                                        dataType: "json",
                                        contentType: !1,
                                        processData: !1,
                                        success: function(e) {
                                            v.length > 0 ? (v.forEach((function(t) {
                                                u[t] = e.properties[t]
                                            }
                                            )),
                                            t(u)) : t(u);
                                            let a = e.key;
                                            $.ajax({
                                                type: "POST",
                                                url: "/cart/change.js",
                                                data: {
                                                    quantity: 0,
                                                    id: a
                                                },
                                                dataType: "json",
                                                success: function(t) {},
                                                error: function(t, e, a) {}
                                            })
                                        }
                                    })
                                } else
                                    t(u)
                            } else
                                t(u)
                        }
                        )).then((function(t) {
                            var e = Shopify.locale
                              , i = {};
                            i[window.hulkapps.product.selected_variant] = window.hulkapps.product_collection,
                            window.hulk_cjson = {};
                            let o = [];
                            var n = window.hulkapps.product.price;
                            window.hulkapps.product.selected_variant_price && (n = window.hulkapps.product.selected_variant_price);
                            var l = 1;
                            if ($("input[name=quantity]").val() && (l = parseInt($("input[name=quantity]").val())),
                            o.push({
                                product_id: window.hulkapps.product.id,
                                price: n,
                                line_price: n * l,
                                tags: window.hulkapps.product.tags,
                                variant_id: window.hulkapps.product.selected_variant,
                                quantity: l,
                                vendor: window.hulkapps.product.vendor,
                                product_type: window.hulkapps.product.type,
                                properties: t,
                                title: window.hulkapps.product.title
                            }),
                            hulk_cjson.cart = {
                                items: o,
                                original_total_price: window.hulkapps.product.price * l,
                                item_count: l,
                                discounted_price: window.hulkapps.product.price * l
                            },
                            hulk_cjson.money_format = window.hulkapps.money_format,
                            !window.is_product_page_doscount_code || window.is_product_page_doscount_code && "hulkapps_buy_now_continue" == a || window.is_checkout_api) {
                                const t = {
                                    cart_json: hulk_cjson,
                                    store_id: window.hulkapps.store_id,
                                    cart_collections: JSON.stringify(i),
                                    customer_tags: null != window.hulkapps.customer ? window.hulkapps.customer.tags.split(",") : "",
                                    draft_order_language: null != e ? e : "",
                                    discount_code: $(".discount_code_box_product .hulkapps_discount_code").val(),
                                    hulk_btn_type: c,
                                    default_address: null != window.hulkapps.customer && null != window.hulkapps.customer.default_address ? window.hulkapps.customer.default_address : "",
                                    currency_rate: window.hulkapps_shopify_rate
                                };
                                window.Shopify && window.Shopify.currency && window.Shopify.currency.active && (t.currency_code = window.Shopify.currency.active),
                                $.ajax({
                                    type: "POST",
                                    url: window.hulkapps.po_url + "/store/create_draft_order",
                                    data: t,
                                    crossDomain: !0,
                                    success: function(t) {
                                        window.location.href = "string" == typeof t ? t : "ShopifyPay-button" == c ? "/checkout?payment=shop_pay" : "/checkout",
                                        localStorage.removeItem("discount_code")
                                    }
                                })
                            }
                        }
                        )).catch((function(t) {
                            console.log("error", t)
                        }
                        ))
                    }
                }
            }
            )).catch((function(t) {}
            ))
        }
        ));
        var hulk_flag = 0;
        $(document).on("click", ".hulkapps_submit_cart", (function(t) {
            0 == hulk_flag && (t.preventDefault(),
            new Promise(( (t, e) => {
                t(validate_options(window.hulkapps.product_id, "hulkapps_product_options"))
            }
            )).then((function(t) {
                t && ($("[name^='properties']").each((function() {
                    ("" == $(this).val() || $(this).hasClass("hf_property_val") && $(this).hasClass("conditional")) && $(this).attr("disabled", !0)
                }
                )),
                hulk_flag = 1,
                $(".hulkapps_submit_cart").click(),
                1 == hulk_flag && ($("[name^='properties']").each((function() {
                    ("" == $(this).val() || $(this).hasClass("hf_property_val") && $(this).hasClass("conditional")) && $(this).attr("disabled", !1)
                }
                )),
                window.hulk_multi_qty_selector && setTimeout((function() {
                    window.hulkUpdateStockStatus($)
                }
                ), 700),
                hulk_flag = 0))
            }
            )).catch((function(t) {
                hulk_flag = 1,
                $(".hulkapps_submit_cart").click(),
                1 == hulk_flag && ($("[name^='properties']").each((function() {
                    ("" == $(this).val() || $(this).hasClass("hf_property_val") && $(this).hasClass("conditional")) && $(this).attr("disabled", !1)
                }
                )),
                hulk_flag = 0)
            }
            )))
        }
        ))
    }
    ,
    void 0 !== window.hulkapps && ("undefined" == typeof jQuery || 3 == parseInt(jQuery.fn.jquery) && parseFloat(jQuery.fn.jquery.replace(/^1\./, "")) < 2.1 ? hulkLoadScript("//ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js", (function() {
        hulkapps_jQuery = jQuery.noConflict(!0),
        checkAppInstalled(hulkapps_jQuery)
    }
    )) : (hulkapps_jQuery = jQuery,
    checkAppInstalled(hulkapps_jQuery)))
}
