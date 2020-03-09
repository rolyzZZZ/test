//建立映射关系
//页面元素和数据对象的映射关系
function deepClone(obj){
	var result = Array.isArray(obj) ? [] : {};
	for(var i in obj){
		if(obj.hasOwnProperty(i)){
			if(typeof(obj[i]) === 'object' && obj[i] !== null){
				result[i] = deepClone(obj[i]);
			}else{
				result[i] = obj[i];
			}
		}
	}
	return result;
}
// 匹配模板里的值
function analysisTemplate(html){
	return html.match(/{{[a-zA-Z_]+[a-zA-Z0-9_]*}}/g);
}
// 去掉模板符号
function dropBorder(text){
	return text.substring(2, text.length - 2);
}
function render(el, originTemplate, templates, data){
	var result = originTemplate;
	for(let i = 0; i < templates.length; i++){
		var tempValue = data[dropBorder(templates[i])];
		if(tempValue !== undefined){
			result = result.replace(templates[i], tempValue);
		}
	}
	el.innerHTML = result;
}
function proxyObj(obj, newObj){
	var self = this;
	for(let i in obj){
		if(i instanceof Object){
			proxyObj(obj[i], newObj[i]);
		}else{
			Object.defineProperty(obj, i, {
				get: function(){
					console.log('调用get方法');
					return newObj[i]
				},
				set: function(val){
					console.log('调用set方法');
					newObj[i] = val;
					render(self.el, self.originTemplate, self.templates, self.data);
				}
			});
		}
		
	}
}


function MyMVVM(id, data){
	this.id = id;
	this.data = data;
	this.el = document.getElementById(this.id);
	this.originTemplate = this.el.innerHTML;
	this.templates = analysisTemplate(this.el.innerHTML);
	this.newObj = deepClone(this.data);
	proxyObj.call(this, this.data, this.newObj);
	render(this.el, this.originTemplate, this.templates, this.data)
}

// es6写法
// var proxy = new Proxy(obj, {
// 	get: function(obj, x,){
// 		console.log('===')
// 		// return obj.x  // or
// 		return Reflect.get(obj, 'x');
// 	}
// })
// console.log(proxy.x);


