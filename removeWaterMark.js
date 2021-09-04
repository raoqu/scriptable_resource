function getallBgimages() {
    var url, B = [], A = document.getElementsByTagName('*');
    var node = null;
    A = B.slice.call(A, 0, A.length);
    while (A.length) {
        node = A.shift();
        url = document.deepCss(node, 'background-image');
        if (url) url = /url\(['"]?([^")]+)/.exec(url) || [];
        url = url[1];
        if (url && B.indexOf(url) == -1) B[B.length] = { node: node, value: url };
    }
    return B;
}

function removeWaterMark(imgPattern) {
    for (var i = 0; i < 10000; i++) clearInterval(i);
    var list = getallBgimages();
    while (list.length) {
        var item = list.shift();
        if (item.value && item.value.includes(imgPattern) $(item.node).attr('style', 'background-image:url("") !important');
    }
}

document.deepCss = function (who, css) {
    if (!who || !who.style) return '';
    var sty = css.replace(/\-([a-z])/g, function (a, b) {
        return b.toUpperCase();
    });
    if (who.currentStyle) {
        return who.style[sty] || who.currentStyle[sty] || '';
    }
    var dv = document.defaultView || window;
    return who.style[sty] ||
        dv.getComputedStyle(who, "").getPropertyValue(css) || '';
}

Array.prototype.indexOf = Array.prototype.indexOf ||
    function (what, index) {
        index = index || 0;
        var L = this.length;
        while (index < L) {
            if (this[index] === what) return index;
            ++index;
        }
        return -1;
    }

removeWaterMark('data:image');