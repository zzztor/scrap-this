module.exports = {
    serialize: serialize,
    getArguments: getArguments
}

function getArguments( index ){
    let args = [];
    process.argv.forEach(function (val, index, array) {
        args.push(val);
    });
    if (index >= 0) return args[index];
    return args;
}

function serialize(config){
    const keys = Object.keys(config)
    for (let j = 0, keys_length = keys.length; j < keys_length; j++) {
        const key = keys[j];
        const field = config[key];
        if (field.exec) field.exec = getFunctionBody(field.exec);
    }
    return config;
}

function getFunctionBody( _function ){
    const fn_as_string = _function.toString();
    return fn_as_string.substring(fn_as_string.indexOf("{") + 1, fn_as_string.lastIndexOf("}")).trim();
}