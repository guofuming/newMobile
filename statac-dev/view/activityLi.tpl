<% for (var i in arr) { %>
    <li activityId="<%=arr[i].activity_id%>" class="libox" activity_type="<%=arr[i].activity_type%>" >  
        <div class="userInfo">     
            <div class='icon'>
                <label uid=<%=arr[i].usr_id%> username=<%=arr[i].username%>>
                    <img class="imglazyload" src="<%=arr[i].picture.icon%>" url="1" />
                </label>
            </div>
            <div class='updateInfo'>
                <p class='name' uid=<%=arr[i].usr_id%> username=<%=arr[i].username%>> <span><%=arr[i].username%></span> <span class='right'><!-- <%=arr[i].timestamp%> --></span> </p>
                <p class='des'> <%=arr[i].activity_title%> </p> 
            </div>
        </div>
        <% if (parseInt(arr[i].activity_type) == 2 || parseInt(arr[i].activity_type) == 21 || parseInt(arr[i].activity_type) == 32) {%>
            <div class='photo'>
                <% for (var x in arr[i].new_images) {%>
                <div class='photoLi'>            
                    <div class="photoList">
                        <img class="imglazyloadA disable_sys_menu" url="" src="<%= arr[i].new_images[x].picture %>" />
                        <p class="photoTitle"><%= arr[i].new_images[x].about %></p>
                    </div> 
                    <% if (typeof(detail) !== 'undefined') { %>
                          <div class='detailDes'><%= $.trim(arr[i].activity_desc) %></div>
                    <% } %>
                    <div class="handle">
                        <ul>
                            <li class="comment"><div class='commentDiv'> <span class="ico_comment"></span> <span class="num_comment"><%= parseInt(arr[i].comment_cnt) == 0 ? '' : arr[i].comment_cnt %></span> </div></li>
                            <li class="like"><div class='likeDiv'> <span class="<%= arr[i].liked ? 'ico_like' : 'ico_like_no' %>"></span> <span><%= parseInt(arr[i].like_cnt) == 0 ? '' : arr[i].like_cnt %> </span> </div></li>
                        </ul>
                    </div>
                    <% if(arr[i].liker_info.length > 0) {%>
                      <ul class="likerInfo">
                      <li class="likeIcon"></li>
                          <% for (var y in arr[i].liker_info) {%>
                          <li aid='<%= arr[i].liker_info[y].usr_id %>' name='<%= arr[i].liker_info[y].username %>' class='<%= arr[i].liker_info[y].usr_id %>' ><img src="<%= arr[i].liker_info[y].icon %>"> </li>
                          <% } %>  
                      </ul>
                    <%} else {%>
                      <ul class="likerInfo empty">
                        <li class="likeIcon"></li>
                      </ul>
                    <% } %>
                   <ul class="commentList">
                    <% if(arr[i].comments.length > 0) { %>
                    
                        <% for (var j in arr[i].comments) { %>
                        <li>
                           <label uid="<%= arr[i].comments[j].user_basic_profile.usr_id %>" username="<%= arr[i].comments[j].user_basic_profile.username %>">
                              <img class="imglazyload" src="" url="">
                           </label>
                           <div class="info">
                               <div class="name">   
                                  <span class="hyperlink"><%= arr[i].comments[j].user_basic_profile.username%></span>
                                  <span class='right'><%= arr[i].comments[j].date.split(' ')[0]%></span>
                               </div>
                               <div class="clear"></div>
                               <div class="words"><%= arr[i].comments[j].text%></div>                 
                           </div>
                        </li> 
                        <% } %>
                        <% if(parseInt(arr[i].comment_cnt) > 2 && typeof(detail) == 'undefined') { %>
                        <li class="viewAll">
                            <%= lang.activity_viewAllComments %>
                        </li>
                        <% } %>
                    
                    <% } %>
                    </ul>
                </div>
                <% } %>
            </div>
        <% } else { %>
            <div class='text'>
                 <div class='detailDes'><%= typeof(detail) !== 'undefined' ? $.trim(arr[i].activity_desc) : arr[i].activity_desc %></div>
                 <div class="handle">
                      <ul>
                          <li class="comment"><div class='commentDiv'> <span class="ico_comment"></span><span  class="num_comment"><%= (arr[i].comment_cnt == 0 ) ? '' : arr[i].comment_cnt %></span></div></li>
                          <li class="like"><div class="likeDiv"> <span class="<%= arr[i].liked ? 'ico_like' : 'ico_like_no' %>"></span> <span> <%= (arr[i].like_cnt == 0) ? '' : arr[i].like_cnt %> </span> </div></li>
                      </ul>
                  </div>
                  <% if(arr[i].liker_info.length > 0) {%>
                      <ul class="likerInfo">
                      <li class="likeIcon"></li>
                          <% for (var y in arr[i].liker_info) {%>
                          <li aid='<%= arr[i].liker_info[y].usr_id %>' name='<%= arr[i].liker_info[y].username %>' class='<%= arr[i].liker_info[y].usr_id %>' ><img src="<%= arr[i].liker_info[y].icon %>"> </li>
                          <% } %>  
                      </ul>
                  <%} else {%>
                      <ul class="likerInfo empty">
                        <li class="likeIcon"></li>
                      </ul>
                  <% } %>
                  
                 <ul class="commentList">
                  <% if(arr[i].comments.length > 0) { %>              
                      <% for (var j in arr[i].comments) { %>
                      <li>
                      
                         <label uid="<%= arr[i].comments[j].user_basic_profile.usr_id %>" username="<%= arr[i].comments[j].user_basic_profile.username %>">
                            <img class="imglazyload" src="" url="">
                         </label>
                         
                         <div class="info">
                             <div class="name">   
                                <span class="hyperlink"><%= arr[i].comments[j].user_basic_profile.username%></span>
                                <span class='right'><%= arr[i].comments[j].date.split(' ')[0]%></span>
                             </div>
                             <div class="clear"></div>
                             <div class="words"><%= arr[i].comments[j].text%></div>                 
                         </div>
                      </li> 
                      <% } %>
                      <% if(parseInt(arr[i].comment_cnt) > 2 && typeof(detail) == 'undefined') { %>
                      <li class="viewAll">
                          <%= lang.activity_viewAllComments %>
                      </li>
                      <% } %>
                  
                  <% } %>
                  </ul>
            </div>
        <% } %>
        
    </li>
<% } %>

