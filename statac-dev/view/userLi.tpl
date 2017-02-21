<% for (var i in arr) {%>
<li uid=<%=arr[i].usr_id%> username=<%=arr[i].username%> flirttype=<%= arr[i].flirttype%>>

<% if (typeof(arr[i].checked) !== 'undefined' && parseInt(arr[i].checked) == 0) { %>
    <span class='matchRed'></span>
<% } %>
<% if (typeof(is_un_see) !== 'undefined' && parseInt(is_un_see) == 1) { %>
    <span class='matchRed'></span>
<% } %>
    <label>
        <% if( parseInt(arr[i].hide_profile) != 1) { %>
            <% if(arr[i].picture.picture){ %>
                <img class="imglazyload" src = "" url="<%= arr[i].picture.picture %>" />
            <% } %>
        <% if(parseInt(arr[i].numberofpictures) > 1) { %>
            <span class="bbg"></span>
            <span> <%=arr[i].numberofpictures%> </span>
        <% } %>
        <% } else {%>
            <% if(arr[i].picture.picture){ %>
                <img class="imglazyload" src = "" url="<%= arr[i].picture.picture %>" />
            <% } %>
        <% } %>
    </label>
    <div class="info">
        <div class="name">
            <span class="hyperlink">
            <%=arr[i].username%>
            </span>
            <% if(arr[i].income_verify) {%>
            <!-- <span class="diamondOn"></span> -->
            <% } %>
            <% if(!arr[i].isGuest) {%>
            <span class="gold"></span>
            <% } %>
            <% if(arr[i].event_date) {%>
            <span class="date"> <%= arr[i].event_date %> </span>
            <% } %>
            <span class="time"><%=arr[i].meet_time%></span>
        </div>
        <div class="clear"></div>
        <% if( parseInt(arr[i].hide_profile) != 1) { %>
            <div class="city">
            <% var location = []; [arr[i].city, arr[i].state].map(function(val){
            if(val) location.push(val);
            }); %>
            <%=arr[i].age%> ● <%= $.trim(location.join(', ')).length == 0 ? arr[i].country :  location.join(', ')%></div>
            <% if( arr[i].disability != null) { %>
            <div class="city">Living with: Please ask me</div>
            <% } %>
            <!--<div class="words"><%=arr[i].headline%></div>-->
            <% if( arr[i].m_type != null && arr[i].m_type != '') { %>
            <div class="city">Living with: Please ask me</div>
            <% } %>
        
        <% } else { %>
            <div class="city">Living with: Please ask me</div>
        <% } %>
    </div>
</li>
<% }%>
