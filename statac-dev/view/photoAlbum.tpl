<div id="photoAlbum" class="g-doc">
    <div class="g-hd">
        <div class="left back"></div>
        <div class="f-toe center">
            <%= title %>
        </div>
    </div>
    <div class="g-bd">
        <div class="data_list_box">
            <dl class="data_list">
                <dt>
                    
                </dt>
                <% $.each(arr,function(i){%>
                <dd>
                    <img src="" url="<%= arr[i].picture %>">
                </dd>
                <%})%>
            </dl>
        </div>
    </div>
</div>