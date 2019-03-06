(function (doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            if(clientWidth>=800){
                clientWidth=800;
            }else if(clientWidth<=320){
                clientWidth=320;
            }
            docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
            console.log(docEl.style.fontSize);
        };

    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);

