<div id="myProfile" class="g-doc">
    <div class="g-hd">
        <div class="left more"></div>
        <div class="f-toe center"> My Profile </div>
    </div>
    <div class="g-bd-1">
        <div class="info_box">
            <div class="portrait">
                <img class="" src=<%=photo.picture%>>
            </div>
            <div class="info_right">
                <div class="name">
                    <%= account.username%> 
                </div>
                <div class="text">
                    <span><%= account.age%> </span> <span>● </span>
                    <span><%= share.formGender(account.gender)%></span><br>
                    <span><%= account.city%>,<%= account.state_name%></span>
                </div>
                <div class="u-btn upgrade">
                    Upgrade
                </div>
            </div>
        </div>

        <!--  -->

        <div class="tab_wrapper">
            <div class="tab_title">
                <ul class="f-flex">
                    <li class="f-flex-auto photo selected"><div> Photos </div></li>
                    <li class="f-flex-auto about"><div> About </div></li>
                    <li class="f-flex-auto details"><div> Details </div></li>
                </ul>
            </div>
            <div class="tab_content_box">
                <div class=" selected tab_content">
                    <div class="album_box public_album">
                        <h3><span class="title">Public</span>
                            <% if(pictures.length){%>
                                (<%= pictures.length %> photo)
                            <%}%>
                        </h3>
                        <dl class="f-cb">
                            <dt></dt>
                            <% for(var i = 0; i< pictures.length; i++){%>
                                <dd><img src="<%= pictures[i].icon%>" ></dd>
                            <%}%>
                            <div class="more">
                                >
                            </div>
                        </dl>
                    </div>
                    <div class="album_box private_album">
                        <!-- <h3><span class="title">Private</span>
                        <% if(private_pictures.length){%>
                            (<%= private_pictures.length %> photo)
                        <%}%>
                        </h3>
                        <dl class="f-cb">
                            <dt></dt>
                            <% for(var i = 0; i< private_pictures.length; i++){%>
                                <dd><img src="<%= private_pictures[i].icon%>" ></dd>
                            <%}%>
                            <div class="more">
                                >
                            </div>
                        </dl> -->
                    </div>
                </div>
                <div class="tab_content">
                    2222
                </div>
                <div class="tab_content">
                    333
                </div>
            </div>

        </div>
    </div>
</div>