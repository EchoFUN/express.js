var tpl = 'Posts: <% for(var i = 0; i < post.length; i++) {%><a href="#"><%= post[i].expert %></a><% } %>';

var reg = /<%=([^%>]+?)?%>/g;

debugger;