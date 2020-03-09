//添加事件绑定
function addEvent(el, type, fn){
	if(el.addEventListener){
		el.addEventListener(type, fn, false);
	}else if(el.addachEvent){
		el.addachEvent('on' + type, function(){
			fn.call(el);
		})
	}else{
		el['on' + type] = fn;
	}
}

//删除事件绑定
function removeEvent(el, type, fn){
	if(el.addEventListener){
		el.removeEventListener(type, fn, false);
	}else if(el.addachEvent){
		el.detachEvent('on' + tyoe, fn);
	}else{
		el['on' + type] = null;
	}
}

//获取页面坐标包含滚动距离
function pagePos(e){
	var sLeft = getScrollOffSet().left,
		sTop = getScrollOffSet().top,
		cLeft = document.documentElement.clientLeft || 0, // clientLeft文档偏移距离 没有取0
		cTop = document.documentElement.clientTop || 0;
		
	return {
		x: e.clientX + sLeft - cLeft,
		y: e.clientY + sTop - cTop
	}
}

//获取滚动条距离
function getScrollOffSet(){
	if(window.pageXOffset || window.pageXOffset === 0 || window.pageYOffset === 0){
		return {
			left: window.pageXOffset,
			top: window.pageYOffset
		}
	}else{
		return {
			left: document.body.scrollLeft + document.documentElement.scrollLeft,
			top: document.body.scrollTop + document.documentElement.scrollTop
		}
	}
}

//获取元素样式
function getStyles(el, prop){
	if(window.getComputedStyle){
		return prop ? window.getComputedStyle(el, null)[prop] : window.getComputedStyle(el, null);
	}else{
		return prop? el.currentStyle[prop] : el.currentStyle;
	}
}