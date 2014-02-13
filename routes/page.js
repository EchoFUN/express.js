exports.mock = function(req, resp) {
   var ret = {
      'code' : 0
   };

   resp.end(JSON.stringify(ret));
};
