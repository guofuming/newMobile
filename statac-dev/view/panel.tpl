<div id="panel">
    <div class="panel_left">
        <div class="head">
            <dl>
                <dt class="portrait"><label><img url="<%= userInfo.photo.picture %>" alt=""></label></dt>
                <dd><%= userInfo.account.username %></dd>
            </dl>
        </div>
        <div class="panel_list">
            <ul>
            <% $.each(panelList,function(i){%>
                <% var selected = panelList[i].url == seajs.data.vars.curModule ? 'selected' : ''; %>
                <li class="<%= selected %> <%= panelList[i].class %>" url='<%= panelList[i].url %>'><i></i><%= panelList[i].text %></li>
            <%})%>
            </ul>
        </div>
    </div>
    <div class="panel_cover"></div>
</div>