var hacktl = function() {
    var tag = /{%([^%]|(%[^}]))*%}/;
    return {
        //TODO: Arreglar de una forma limpia la manera en como se le pasan las variables
        expand : function ( template, $p ) {
            var result = [];
            var $g = {};

            //TODO: delete _item ( for _index )
            var _eval = function( _template, true_if, _item, _index, _indexed ) {
                
                var $i = _indexed;
                //console.log( sprintf("_eval: %s, %s", _template, true_if) );
                var $l = {};
                var do_eval = function(s){
                    //console.log("do_eval: " + s);
                    return eval(s);
                };

                var swork = _template;
                var res = tag.exec(swork);
                while (res != null) {

                    if (true_if)
                        result.push( swork.substring(0, res.index) );

                    var tag_kind = swork.substr( res.index+2 ,1);

                    if ( tag_kind == "%" ) {
                        // closing tag
                        return swork.substring(res.index + res[0].length);
                    }

                    if (!true_if) {
                        swork = swork.substring(res.index + res[0].length);
                        res = tag.exec(swork);
                        continue;
                    }

                    if ( tag_kind == "=" ) {
                        var evl = String(do_eval( swork.substr( res.index+3, res[0].length-5 ) ));
                        result.push(evl);
                        swork = swork.substring(res.index + res[0].length);
                        res = tag.exec(swork);
                    }
                    else if ( tag_kind == "?" ) {
                        var evl = Boolean( do_eval( swork.substr( res.index+3, res[0].length-5 ) ) );
                        swork = _eval( swork.substring(res.index + res[0].length), evl, _item, _index, _indexed);
                        res = tag.exec(swork);
                    }
                    else if ( tag_kind == "~" ) {
                        var evl = do_eval( swork.substr( res.index+3, res[0].length-5 ) );
                        var currswork = swork;
                        for (var item in evl) {
                            swork = _eval( currswork.substring(res.index + res[0].length), evl, item, item, evl[item] );
                        }
                        res = tag.exec(swork);
                    }
                    else {
                        swork = swork.substring(res.index + res[0].length);
                        res = tag.exec(swork);
                    }

                }

                result.push(swork);
            };

            _eval(template, true, null);

            // join
            return result.join("");
        }
    };
}();
