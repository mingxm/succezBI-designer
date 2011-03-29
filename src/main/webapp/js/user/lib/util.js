/**
 * 类似java中的hashmap的类，key必须为字符串，如果是数字，key中的 1和"1"被认为是相等的
  引用该类的时候，不能同时引用自定义创建的Object原形方法。这样会导致for(var key in object)
  这样遍历的时候将会把自定义的Object的原型方法加入。
  * @class
*/
function Map(content, sep, equal) {
	this.elements = {};
	this.len = 0;
	this.separator = sep ? sep : ";";
	this.equal = equal ? equal : "=";
	this.merge(content);
}

Map.prototype = new Object;

Map.prototype.merge = function(str) {
	var s = str;
	if (s == null || s.length == 0) {
		return;
	}

	var sep = this.separator;
	if (sep == "\r\n") {
		sep = "\n";
	}
	else if (sep == null || sep.length == 0) {
		sep = ";";
	}
	var equal = this.equal;
	var i1 = 0;
	var i2 = s.indexOf(equal, i1);
	while (i2 != -1) {
		while (i1 < i2 && (s.charAt(i1) == sep || s.charAt(i1) == '\r'))
			i1++;// 支持:a=1\r\n\r\nb=2\r\n
		var key = s.substring(i1, i2);
		var value;
		i1 = i2 + equal.length;
		if (i1 < s.length && s.charAt(i1) == '"') {
			var func = new extractQuotedStr(s, "\"", i1);
			value = func.getValue();
			i1 = func.getEndIndex() + sep.length;
		}
		else {
			i2 = s.indexOf(sep, i1);
			if (i2 == -1) {
				i2 = s.length;
			}
			value = s.substring(i1, sep == '\n' && s.charAt(i2 - 1) == '\r' ? i2 - 1 : i2);
			i1 = i2 + sep.length;
		}
		i2 = s.indexOf(equal, i1);
		this.setValue(key, value);
	}
}

/**向map中加入一个key与value的对应，如果value = undefined 则value=null;
  key和value都允许为空，如果map中已经存在了key对应的value则替换原来的value
  并返回旧的value*/
Map.prototype.put = function(key, value) {
	if (isUndefined(value))
		value = null;
	var v = this.elements[key];
	this.elements[key] = value;
	if (isUndefined(v)) { // 是undefined,说明map里面不存在key
		this.len++;
		return value;
	}
	else {
		return v;
	}
}
Map.prototype.push = Map.prototype.put;

/**修改key的名字*/
Map.prototype.renameKey = function(oldKey, newKey) {
	if (this.containsKey(oldKey)) {
		var oldValue = this.removeValue(oldKey);
		if (!this.containsKey(newKey)) { // //如果新的key已经存在,则不覆盖
			this.setValue(newKey, oldValue);
		}
	}
}

Map.prototype.containsKey = function(key) {
	// 使用in运算符的效率
	// 10000个属性查找10000次用时15毫秒
	// 10000个属性查找100000次用时172毫秒
	// 100000个属性查找10000次用时15毫秒
	// 100000个属性查找100000次用时172毫秒
	// return !isUndefined(this.elements[key]);此方法无法正确判断,因为如果加入的数据为put("abc",null),则调用containsKey("abc")返回false
	return key in this.elements;
}

/**
 * 将map中的key与value复制到自己中
 * */
Map.prototype.putMap = function(map) {
	for (var key in map.elements) {
		this.put(key, map.elements[key]);
	}
}

/**
 * 将map中的key和value复制到自己的Map中，忽略key的大小写，以map中的key覆盖当前Map中的key
 * @param {} map
 */
Map.prototype.putMapIgnoreCase = function(map) {
	var keys = this.keySet();
	for (var key in map.elements) {
		/**
		 * 存在相同的key就直接覆盖，如果不存在，那么就查找是否有忽略大小写key相同的项，查找到后删除
		 */
		if(this.contains(key)){
			this.put(key, map.elements[key]);
		}else{
			var idx = keys.indexOfIgnoreCase(key);
			if(idx > -1){
				this.remove(keys[idx]);
			}
			this.put(key, map.elements[key]);
		}
		
	}
}

/**删除一个元素，并且返回这个元素的值*/
Map.prototype.remove = function(_key) {
	var value = this.elements[_key];
	if (isUndefined(value))
		return null;
	delete this.elements[_key];
	this.len--;
	return value;
}

/**返回map中的元素个数*/
Map.prototype.size = function() {
	return this.len;
}
Map.prototype.length = Map.prototype.size;

/**获得一个key对应的值，并返回，如果key不存在，返回null*/
Map.prototype.get = function(_key) {
	var i = 0;
	var value = null;
	if (isNumber(_key)) {
		for (var key in this.elements) {
			if (i++ == _key) {
				value = this.elements[key];
				break;
			}
		}
	}
	else
		value = this.elements[_key];
	return isUndefined(value) ? null : value;
}

/**判断key是否在map中存在*/
Map.prototype.contains = function(_key) {
	var value = this.elements[_key];
	return !isUndefined(value);
}

/**清除map中的所有类容*/
Map.prototype.clear = function() {
	for (var key in this.elements) {
		delete this.elements[key];
	}
	this.len = 0;
}

/**清除map中的所有的key的数组*/
Map.prototype.keySet = function() {
	var keys = new Array();
	for (var key in this.elements) {
		if (!isUndefined(key))
			keys.push(key);
	}
	return keys;
}
Map.prototype.valueSet = function() {
	var rs = new Array();
	for (var key in this.elements) {
		if (isUndefined(key))
			continue;
		var s = this.elements[key];
		rs.push(s);
	}
	return rs;
}

Map.prototype.export2str2 = function(isKey, sep) {
	var arr = new Array();
	for (var key in this.elements) {
		if (isUndefined(key))
			continue;
		if (isKey) {
			arr.push(key);
		}
		else {
			arr.push(this.elements[key]);
		}
	}
	return arr.join(sep ? sep : ";");
}

/**将所有的key和其对应的value导出到返回的字符串中
  key1=value1+separator+key2=value2.....*/
Map.prototype.export2str = function(separator) {
	var arr = new Array();
	var value = "";
	var equal = "=";
	for (var key in this.elements) {
		value = key;
		value += equal;
		var s = this.elements[key];
		if (s == null) {
			s = "";
		}
		if (isString(s) && ((s.indexOf(separator) != -1) || (s.indexOf(equal) != -1) || (s.indexOf("\"") != -1))) {
			s = quotedStr(s, "\"");
		}
		value += s;
		arr.push(value);
	}
	return arr.join(separator ? separator : ";");
}

/**将所有的key和其对应的value导出到返回的字符串中
  key1=value1+separator+key2=value2.....*/
Map.prototype.clone = function() {
	var map = new Map();

	map.len = this.len;
	map.separator = this.separator;
	map.equal = this.equal;

	map.elements = {};
	for (var key in this.elements) {
		map.elements[key] = this.elements[key];
	}
	return map;
}

/**将自己的类容变成一个uri的参数串，用utf-8编码*/
Map.prototype.export2uri = function() {
	return this.toString2(null, "&", true);
}

Map.prototype.toString2 = function(equal, separator, encode) {
	var rs = [];
	var value = "";
	if (!equal)
		equal = "=";
	if (!separator)
		separator = ";";
	var length = this.size();
	var cc;
	for (var key in this.elements) {
		value = key;
		value += equal;
		cc = this.elements[key];
		if (cc == undefined || cc == null)
			cc = "";
		value += (!encode ? cc : encodeURIComponent(cc));
		rs.push(value);
	}
	return rs.join(separator);
}

/**返回[[name, value]]数组形式*/
Map.prototype.toArray = function(encode) {
	encode = typeof(encode) == "boolean" ? encode : true;
	var rs = [];
	var s;
	for (var key in this.elements) {
		s = this.elements[key];
		if (!s)
			s = "";
		rs.push([key, !encode ? s : encodeURIComponent(s)]);
	}
	return rs;
}

Map.prototype.getValue = function(key, def) {
	var v = this.get(key);
	return v == null ? def : v;
}

/**获取一个整形值。*/
Map.prototype.getInt = function(key, def) {
	var s = this.getValue(key);
	return s ? parseInt(s) : (def != null ? def : 0);
}

/**获取一个整形值。*/
Map.prototype.getFloat = function(key, def) {
	var s = this.getValue(key);
	return s ? parseFloat(s) : (def != null ? def : 0);
}

/**获得布尔值*/
Map.prototype.getBool = function(key, def) {
	var s = this.getValue(key);
	return parseBool(s, def);
}

Map.prototype.dispose = function() {
}
/**设置此串在此对象中对应的值*/
Map.prototype.setValue = function(key, value) {
	this.put(key, value);
}

/**删除此对象中的key和其对应的值，并返回对应的值，如果没有则返回def*/
Map.prototype.removeValue = function(key, def) {
	var v = this.remove(key);
	if (v == null) {
		return def;
	}
	else {
		return v;
	}
}

/**返回elements*/
Map.prototype.listEntry = function() {
	return this.elements;
}

Map.prototype.toString = function() {
	return this.export2str(this.separator);
}

StringMap = Map;

function isUndefined(a) {
	return ((a == undefined) && (typeof(a) == "undefined"));
}

var _biInPrototype = false;

function _extendClass(fConstr, fSuperConstr, sName) {
	if (typeof(fSuperConstr) == "string") {
		var ooo = window[fSuperConstr];
		if (!ooo) {// 父类可能还没有初始化，此时需要设置延迟继承。
			return;// 延迟继承有子类在自己的构造方法中写入_extendClass_runtime来实现
		}
		fSuperConstr = ooo;
	}
	_biInPrototype = true;
	if (fConstr._superClass == fSuperConstr)
		return;
	fConstr._superClass == fSuperConstr;
	var p = fConstr.prototype = new fSuperConstr;
	_biInPrototype = false;
	if (sName) {
		p._className = sName;
	}
	p.constructor = fConstr;
	return p;
}