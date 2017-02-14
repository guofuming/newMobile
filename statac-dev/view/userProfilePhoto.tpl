<div class="img">
	<% if(userObj.pictures[0]){ %>
	    <img src="<%= userObj.pictures[0].picture%>" alt="">
	<% }else{ %>
		没有图片！！！
	<% } %>
</div>
<div class="info">
<%= userObj.account.age %> ●  <%= userObj.account.city %>, <%= userObj.account.country_name %>
</div>