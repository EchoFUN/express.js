function getFirstChild(e) {
   var t;
   for (var n = 0, r = e.childNodes.length; n < r; n++) {
      if (e.childNodes[n].nodeType == 1) {
         t = e.childNods[n];
         break;
      }
   }
   return t;
}
