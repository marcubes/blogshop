function formatNumber(a) {
    for (var a = a.toFixed(2) + "", b = a.split("."), c = b[0], d = /(\d+)(\d{3})/; d.test(c);) c = c.replace(d, "$1,$2");
    return c
}

function cart(a, b) {
    function c(a) {
        if (null != a) {
            var b = "<br>" + a;
            return b
        }
        return b = ""
    }
    this.totalItems = 0, this.totalPrice = 0, this.totalWeight = 0, this.totalShip = 0, this.totalOrder = 0, this.items = new Array, this.userEmail = a, this.ItemColumns = ["Image", "Name", "Price", "Quantity", "Weight", "Total", "Supprimer"], this.initialize = function() {
        if (readCookie("simpleCart"))
            for (data = readCookie("simpleCart").split("&"), this.totalItems = 1 * data[0], this.totalPrice = 1 * data[1], this.totalWeight = 1 * data[2], x = 3; x < data.length; x++) {
                for (newItem = new item, itemData = data[x].split(","), i = 0, i = 0; i < itemData.length; i++) pair = itemData[i].split("="), newItem.addValue(pair[0], pair[1], pair[2]);
                if (!(newItem.getValue("name") && newItem.getValue("price") && newItem.getValue("weight") && newItem.getValue("quantity"))) return alert("item must have price, name, and quantity!"), !1;
                this.items[x - 3] = newItem
            } else this.totalItems = 0, this.totalPrice = 0, this.totalWeight = 0;
        this.setUpEvents(), this.updateCookie(), this.updatePageElements()
    }, this.checkOutEvent = function() {
        return simpleCart.checkOut(), !1
    }, this.emptyEvent = function() {
        return simpleCart.empty(), !1
    }, this.setUpEvents = function() {
        var b, a = 0,
            c = getElementsByClassName("simpleCart_total");
        for (a = 0, c = getElementsByClassName("simpleCart_checkout"), a = 0; a < c.length; a++) b = c[a], b.addEventListener ? b.addEventListener("click", this.checkOutEvent, !1) : b.attachEvent && b.attachEvent("onclick", this.checkOutEvent);
        for (a = 0, c = getElementsByClassName("simpleCart_empty"), a = 0; a < c.length; a++) b = c[a], b.addEventListener ? b.addEventListener("click", this.emptyEvent, !1) : b.attachEvent && b.attachEvent("onclick", this.emptyEvent)
    }, this.add = function() {
        newItem = new item;
        var a = 0;
        for (a = 0; a < arguments.length; a++) temp = arguments[a], data = temp.split("="), newItem.addValue(data[0], data[1]);
        var b = document.getElementById("option_one");
        if (b) {
            var c = document.getElementById("option_one_html").innerHTML,
                d = document.getElementById("option_one").value;
            newItem.addValue("type", c + " : " + d)
        }
        var e = document.getElementById("option_two");
        if (e) {
            var f = document.getElementById("option_two_html").innerHTML,
                g = document.getElementById("option_two").value;
            newItem.addValue("color", f + " : " + g)
        }
        if (!newItem.getValue("name") || !newItem.getValue("price") || !newItem.getValue("weight")) return alert("Item must have name, weight and price to be added to the cart!"), !1;
        for (showNotif(), isnew = !0, newItem.getValue("quantity") || newItem.addValue("quantity", 1), this.totalItems = this.totalItems + newItem.getValue("quantity"), a = 0, a = 0; a < this.items.length; a++) tempItem = this.items[a], tempItem.equalTo(newItem) && (tempItem.addValue("quantity", parseInt(tempItem.getValue("quantity")) + parseInt(newItem.getValue("quantity"))), this.totalPrice = this.totalPrice + parseFloat(tempItem.getValue("price")), this.totalWeight = this.totalWeight + parseFloat(tempItem.getValue("weight")), isnew = !1);
        isnew && (this.items[this.items.length] = newItem, this.totalPrice = this.totalPrice + parseFloat(newItem.getValue("price")), this.totalWeight = this.totalWeight + parseFloat(newItem.getValue("weight"))), this.updateCookie(), this.updatePageElements()
    }, this.addItem = function(a) {
        var b = 0;
        for (b = 0; b < this.items.length; b++) {
            var c = this.items[b];
            if (c.equalTo(a)) return c.addValue("quantity", parseInt(a.getValue("quantity")) + parseInt(c.getValue("quantity"))), this.totalItems = this.totalItems + parseInt(a.getValue("quantity")), this.totalPrice = this.totalPrice + parseInt(a.getValue("quantity")) * parseFloat(a.getValue("price")), void(this.totalWeight = this.totalWeight + parseInt(a.getValue("quantity")) * parseFloat(a.getValue("weight")))
        }
        this.items[this.items.length] = a, this.totalItems = this.totalItems + parseInt(a.getValue("quantity")), this.totalPrice = this.totalPrice + parseInt(a.getValue("quantity")) * parseFloat(a.getValue("price")), this.totalWeight = this.totalWeight + parseInt(a.getValue("quantity")) * parseFloat(a.getValue("weight"))
    }, this.updateCookie = function() {
        for (cookieString = String(this.totalItems) + "&" + String(this.totalPrice) + "&" + String(this.totalWeight), x = 0, x = 0; x < this.items.length; x++) tempItem = this.items[x], cookieString = cookieString + "&" + tempItem.cookieString();
        createCookie("simpleCart", cookieString, 30)
    }, this.empty = function() {
        return this.items = new Array, this.totalItems = 0, this.totalPrice = 0, this.totalWeight = 0, this.updateCookie(), this.updatePageElements(), !1
    }, this.deleteItem = function(a) {
        found = !1;
        var b = new Array;
        for (x = 0; x < this.items.length; x++) tempItem = this.items[x], tempItem.equalTo(a) && (found = !0, this.totalItems = this.totalItems - parseFloat(tempItem.getValue("quantity")), this.totalPrice = this.totalPrice - parseFloat(tempItem.getValue("price")), this.totalWeight = this.totalWeight - parseFloat(tempItem.getValue("weight"))), found ? x < this.items.length - 1 && (b[x] = this.items[x + 1]) : b[x] = this.items[x];
        return this.items = b, this.updateCookie(), this.updatePageElements(), !1
    }, this.options = function() {
        var a = 0;
        for (a = 0; a < this.items.length; a++) {
            var b = this.items[a];
            if (b.optionList()) return !0
        }
        return !1
    }, this.updatePageElements = function() {
        var b, a = 0,
            d = getElementsByClassName("simpleCart_total");
        for (a = 0; a < d.length; a++) b = d[a], b.innerHTML = this.returnTotalPrice();
        var e = $("[name='smanagerongkir']").val();
        for (this.totalShip = e, a = 0, d = getElementsByClassName("simpleCart_shipping"), a = 0; a < d.length; a++) b = d[a], b.innerHTML = this.returnTotalShip();
        for (0 == this.totalPrice ? this.totalOrder = 0 : this.totalOrder = parseInt(this.totalPrice) + parseInt(this.totalShip), a = 0, d = getElementsByClassName("simpleCart_orders"), a = 0; a < d.length; a++) b = d[a], b.innerHTML = this.returnTotalOrder();
        for (a = 0, d = getElementsByClassName("simpleCart_quantity"), a = 0; a < d.length; a++) b = d[a], b.innerHTML = String(this.totalItems);
        for (d = getElementsByClassName("fortotalPrice"), a = 0; a < d.length; a++) b = d[a], b.innerHTML = String(this.returnTotalHarga());
        for (d = getElementsByClassName("simpleCart_weight"), a = 0; a < d.length; a++) b = d[a], b.innerHTML = String(this.returnTotalWeight());
        for (d = getElementsByClassName("simpleCart_items"), a = 0; a < d.length; a++) {
            cartTable = d[a], newRow = document.createElement("div");
            for (var a = 0, f = 0; cartTable.childNodes[0];) cartTable.removeChild(cartTable.childNodes[0]);
            for (a = 0; a < this.ItemColumns.length; a++)("Options" != this.ItemColumns[a] || this.options()) && (tempCell = document.createElement("div"), tempCell.innerHTML = this.ItemColumns[a], tempCell.className = "item" + this.ItemColumns[a], newRow.appendChild(tempCell));
            for (newRow.className = "cartHeaders", cartTable.appendChild(newRow), a = 0, a = 0; a < this.items.length; a++) {
                for (tempItem = this.items[a], newRow = document.createElement("div"), f = 0, f = 0; f < this.ItemColumns.length; f++) tempCell = document.createElement("div"), tempCell.className = "item" + this.ItemColumns[f], "Image" == this.ItemColumns[f] && tempItem.getValue("image") && (tempCell.innerHTML = '<img src="' + tempItem.getValue("image") + '" />'), "Name" == this.ItemColumns[f] ? tempCell.innerHTML = "<b>" + tempItem.getValue("name") + "</b>" + c(tempItem.getValue("type")) + c(tempItem.getValue("color")) : "Price" == this.ItemColumns[f] ? tempCell.innerHTML = this.returnFormattedPrice(tempItem.getValue("price")) : "Options" == this.ItemColumns[f] && this.options() ? tempCell.innerHTML = tempItem.optionList() : "Quantity" == this.ItemColumns[f] ? tempCell.innerHTML = '<input type="number" onblur="simpleCart.updateQuantity(' + tempItem.functionString() + ",'new_quantity=' + this.value);cekHarga();return false;\"value=\"" + tempItem.getValue("quantity") + '" />' : "Weight" == this.ItemColumns[f] ? tempCell.innerHTML = this.returnFormattedWeight(tempItem.getValue("weight")) + " g" : "Total" == this.ItemColumns[f] ? tempCell.innerHTML = this.returnFormattedPrice(tempItem.getValue("quantity") * tempItem.getValue("price")) : "Supprimer" == this.ItemColumns[f] && (tempCell.innerHTML = '<a class="removeButton" onclick="simpleCart.updateQuantity(' + tempItem.functionString() + ",'new_quantity=0');cekHarga();return false;\">Supprimer</a>"), newRow.appendChild(tempCell);
                newRow.className = "itemContainer", cartTable.appendChild(newRow)
            }
            newRow = document.createElement("div"), tempCell = document.createElement("div"), tempCell.innerHTML = String(this.totalItems), tempCell.className = "totalItems", newRow.appendChild(tempCell), tempCell = document.createElement("div"), tempCell.innerHTML = this.returnTotalPrice(), tempCell.className = "totalPrice", newRow.appendChild(tempCell), tempCell = document.createElement("div"), tempCell.innerHTML = this.returnTotalWeight(), tempCell.className = "totalWeight", newRow.appendChild(tempCell), newRow.className = "totalRow", cartTable.appendChild(newRow)
        }
        for (d = getElementsByClassName("simpleCart_table"), a = 0; a < d.length; a++) {
            cartTable = d[a];
            for (var a = 0, f = 0; cartTable.childNodes[0];) cartTable.removeChild(cartTable.childNodes[0]);
            for (newRow = document.createElement("tr"), a = 0; a < 6; a++)("Options" != this.ItemColumns[a] || this.options()) && (tempCell = document.createElement("th"), tempCell.innerHTML = this.ItemColumns[a], tempCell.className = "item" + this.ItemColumns[a], newRow.appendChild(tempCell));
            for (newRow.className = "thead", cartTable.appendChild(newRow), a = 0, a = 0; a < this.items.length; a++) {
                for (tempItem = this.items[a], newRow = document.createElement("tr"), f = 0, f = 0; f < 6; f++) tempCell = document.createElement("td"), tempCell.className = "item" + this.ItemColumns[f], "Image" == this.ItemColumns[f] && tempItem.getValue("image") && (tempCell.innerHTML = '<img src="' + tempItem.getValue("image") + '" />'), "Name" == this.ItemColumns[f] ? tempCell.innerHTML = "<b>" + tempItem.getValue("name") + "</b>" + c(tempItem.getValue("type")) + c(tempItem.getValue("color")) : "Price" == this.ItemColumns[f] ? tempCell.innerHTML = this.returnFormattedPrice(tempItem.getValue("price")) : "Quantity" == this.ItemColumns[f] ? tempCell.innerHTML = tempItem.getValue("quantity") : "Weight" == this.ItemColumns[f] ? tempCell.innerHTML = this.returnFormattedWeight(tempItem.getValue("weight")) + " g" : "Total" == this.ItemColumns[f] && (tempCell.innerHTML = this.returnFormattedPrice(tempItem.getValue("quantity") * tempItem.getValue("price"))), newRow.appendChild(tempCell);
                newRow.className = "cartHeaders", cartTable.appendChild(newRow)
            }
        }
        return !1
    }, this.returnTotalHarga = function() {
        return this.totalPrice
    }, this.returnTotalPrice = function() {
        return this.returnFormattedPrice(this.totalPrice)
    }, this.returnTotalWeight = function() {
        return this.returnFormattedWeight(this.totalWeight)
    }, this.returnTotalShip = function() {
        return this.returnFormattedPrice(this.totalShip)
    }, this.returnTotalOrder = function() {
        return this.returnFormattedPrice(this.totalOrder)
    }, this.returnFormattedPrice = function(a) {
        return temp = Math.round(100 * a), change = String(temp % 100), 0 == change.length ? change = "00" : 1 == change.length && (change = "0" + change), temp = formatNumber(temp / 100), b + temp + "." + change
    }, this.returnFormattedWeight = function(a) {
        var b = new Number(a + "").toFixed(parseInt(2)),
            c = parseFloat(b);
        return c
    }, this.updateQuantity = function() {
        for (newItem = new item, x = 0, x = 0; x < arguments.length; x++)
            if (temp = arguments[x], data = temp.split("="), "new_quantity" == data[0]) var a = data[1];
            else newItem.addValue(data[0], data[1]);
        return a < 1 ? void this.deleteItem(newItem) : (newQuan = a - newItem.getValue("quantity"), newItem.addValue("quantity", newQuan), this.addItem(newItem), this.updateCookie(), this.updatePageElements(), !1)
    }, this.checkOut = function() {
        if (0 == this.totalItems) return alert("Your cart is empty!"), !1;
        var e, a = "scrollbars,location,resizable,status",
            c = 0,
            f = "https://www.paypal.com/cgi-bin/webscr?cmd=_cart&upload=1&business=" + this.userEmail + "&currency_code=USD&lc=US";
        for (e = 0, e = 0; e < this.items.length; e++) tempItem = this.items[e], c = e + 1, f = f + "&item_name_" + c + "=" + tempItem.getValue("name") + "&item_number_" + c + "=" + c + "&quantity_" + c + "=" + tempItem.getValue("quantity") + "&amount_" + c + "=" + this.returnFormattedPrice(tempItem.getValue("price")) + "&no_shipping_" + c + "=0&no_note_" + c + "=1", tempItem.optionList() && (f = f + "&on0_" + c + "=Options&os0_" + c + "=" + tempItem.optionList());
        return window.open(f, "paypal", a), !1
    }
}

function item() {
    this.names = new Array, this.values = new Array, this.addValue = function(a, b) {
        if (this.names.length != this.values.length) return alert("name and value array lengths do not match for this item!"), !1;
        found = !1;
        var c = 0;
        for (c = 0; c < this.names.length; c++)
            if (this.names[c] == a) return void(this.values[c] = b);
        found || (this.names[this.names.length] = a, this.values[this.values.length] = b)
    }, this.getValue = function(a) {
        var b = 0;
        for (b = 0; b < this.names.length; b++)
            if (a == this.names[b]) return this.values[b];
        return null
    }, this.equalTo = function(a) {
        if (this.getSize() != a.getSize()) return !1;
        var b = 0;
        for (b = 0; b < this.names.length; b++)
            if ("quantity" != this.names[b] && a.getValue(this.names[b]) != this.values[b]) return !1;
        return !0
    }, this.getSize = function() {
        return this.names.length
    }, this.cookieString = function() {
        returnString = "";
        var a = 0;
        for (returnString = this.names[a] + "=" + this.values[a], a = 1, a = 1; a < this.names.length; a++) returnString = returnString + "," + this.names[a] + "=" + this.values[a];
        return returnString
    }, this.functionString = function() {
        returnString = "'";
        var a = 0;
        for (returnString = "'" + this.names[a] + "=" + this.values[a], a = 1, a = 1; a < this.names.length; a++) returnString = returnString + "','" + this.names[a] + "=" + this.values[a];
        return returnString += "'", returnString
    }, this.optionList = function() {
        if (returnString = "", this.getSize() < 4) return null;
        var a = 0;
        for (a = 0; a < this.names.length; a++) "quantity" != this.names[a] && "price" != this.names[a] && "weight" != this.names[a] && "name" != this.names[a] && "image" != this.names[a] && (returnString = returnString + this.names[a] + ":" + this.values[a] + ", ");
        for (;
            "," == returnString.charAt(returnString.length - 1) || " " == returnString.charAt(returnString.length - 1) || ":" == returnString.charAt(returnString.length);) returnString = returnString.substring(0, returnString.length - 1);
        return returnString
    }
}

function createCookie(a, b, c) {
    if (c) {
        var d = new Date;
        d.setTime(d.getTime() + 24 * c * 60 * 60 * 1e3);
        var e = "; expires=" + d.toGMTString()
    } else var e = "";
    document.cookie = a + "=" + b + e + "; path=/"
}

function readCookie(a) {
    for (var b = a + "=", c = document.cookie.split(";"), d = 0; d < c.length; d++) {
        for (var e = c[d];
            " " == e.charAt(0);) e = e.substring(1, e.length);
        if (0 == e.indexOf(b)) return e.substring(b.length, e.length)
    }
    return null
}

function eraseCookie(a) {
    createCookie(a, "", -1)
}

function createCart() {
    simpleCart.initialize()
}
var getElementsByClassName = function(a, b, c) {
        return (getElementsByClassName = document.getElementsByClassName ? function(a, b, c) {
            c = c || document;
            for (var g, d = c.getElementsByClassName(a), e = b ? new RegExp("\\b" + b + "\\b", "i") : null, f = [], h = 0, i = d.length; h < i; h += 1) g = d[h], e && !e.test(g.nodeName) || f.push(g);
            return f
        } : document.evaluate ? function(a, b, c) {
            b = b || "*", c = c || document;
            for (var i, j, d = a.split(" "), e = "", f = "http://www.w3.org/1999/xhtml", g = document.documentElement.namespaceURI === f ? f : null, h = [], k = 0, l = d.length; k < l; k += 1) e += "[contains(concat(' ', @class, ' '), ' " + d[k] + " ')]";
            try {
                i = document.evaluate(".//" + b + e, c, g, 0, null)
            } catch (a) {
                i = document.evaluate(".//" + b + e, c, null, 0, null)
            }
            for (; j = i.iterateNext();) h.push(j);
            return h
        } : function(a, b, c) {
            b = b || "*", c = c || document;
            for (var g, i, d = a.split(" "), e = [], f = "*" === b && c.all ? c.all : c.getElementsByTagName(b), h = [], j = 0, k = d.length; j < k; j += 1) e.push(new RegExp("(^|\\s)" + d[j] + "(\\s|" + matauang + ")"));
            for (var l = 0, m = f.length; l < m; l += 1) {
                g = f[l], i = !1;
                for (var n = 0, o = e.length; n < o && (i = e[n].test(g.className), i); n += 1);
                i && h.push(g)
            }
            return h
        })(a, b, c)
    },
    ElementCheckInterval = setInterval("simpleCart.updatePageElements()", 1e4);
window.onload = createCart;
