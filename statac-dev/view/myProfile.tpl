<div id="myProfile" class="g-doc">
    <div class="g-hd">
        <div class="left more"></div>
        <div class="f-toe center"> My Profile </div>
    </div>
    <div class="g-bd">
        <div class="info_box">
            <div class="portrait">
                <label><img class="" src="" url="<%=photo.picture%>"></label>
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

        <div class="tab_wrapper">
            <div class="tab_title">
                <ul class="f-flex">
                    <li class="f-flex-auto photo selected"><div> Photos </div></li>
                    <li class="f-flex-auto about"><div> About </div></li>
                    <li class="f-flex-auto details"><div> Details </div></li>
                </ul>
            </div>
            <div class="tab_content_box">
                <div class="selected tab_content tab_content_photo">
                    <div class="notice_photo">Manage private photo access<span>1</span>
                        <div class="arrow"></div>
                    </div>
                    <div type="public_album" class="album_box public_album">
                        <h3><span class="title">Public</span>
                            <% if(pictures.length){%>
                                (<%= pictures.length %> photo)
                            <%}%>
                        </h3>
                        <dl class="f-cb">
                            <dt></dt>
                            <% for(var i = 0; i< pictures.length; i++){%>
                                <dd><img url="<%= pictures[i].icon%>" ></dd>
                            <%}%>
                            <div class="more">
                                >
                            </div>
                        </dl>
                    </div>
                    <div type="private_album" class="album_box private_album">
                        <h3><span class="title">Private</span>
                        <% if(private_pictures.length){%>
                            (<%= private_pictures.length %> photo)
                        <%}%>
                        </h3>
                        <dl class="f-cb">
                            <dt></dt>
                            <% for(var i = 0; i< private_pictures.length; i++){%>
                                <dd><img url="<%= private_pictures[i].icon%>" ></dd>
                            <%}%>
                            <div class="more">
                                >
                            </div>
                        </dl>
                    </div>
                </div>
                <div class="tab_content tab_content_about">
                    <ul>
                        <li>
                            <div class="title"><b> Headline </b><span url="editHeadline" class="edit"></span></div>
                                <p>test test test</p>
                        </li>
                        <li>
                            <div class="title"><b> About me </b><span url="editAboutme" class="edit"></span></div>
                                <p class="aboutMeText">
                                    fdfjdsklklf dfkljsfjklds fdjskjfkjlds fdjslkfdjsklfdlkst
                                </p>
                        </li>
                        <li>
                            <div class="title"><b> About my match </b><span url="editAboutMyMatch" class="edit"></span></div>
                                <p class="aboutMeMatchText">
                                    fdsjfdsjkf fjdslkfjkds fdjsfjsdkl jfdslkj fjdklfjdslk fds jfdskljf
                                </p>
                        </li>
                        <li>
                            <div class="title"><b> Living with </b><span url="editAboutLivingWith" class="edit"></span></div>
                                <p><span>Please ask me</span></p>
                        </li>
                        <li>
                            <div class="title"><b> I've been positive for </b><span url="editAboutPositiveFor" class="edit"></span></div>
                                <p><span>Please ask me</span></p>
                        </li>
                        <li>
                            <div class="title"><b> My experiences with my condition </b><span url="editAboutLearnedFromExperience" class="edit"></span></div>
                                <p><span>Please ask me</span></p>
                        </li>
                        <li>
                            <div class="title"><b> My first date idea </b><span class="edit" url="editAboutMyFirstDateIdea"></span></div>
                                <p><span>Describe your first date ideas here.</span></p>
                        </li>
                        <li>
                            <div class="title"><b> Relationship status </b><span class="edit" url="editAboutRelationshipStatus"></span></div>
                                <p><span>Please ask me</span></p>
                        </li>
                        <li>
                            <div class="title"><b> Looking for </b><span class="edit" url="editAboutLookfor"></span></div>
                            <p>Men, ages 18 - 99, for Friendship, Dating, Long-term / Serious relationship, Marriage, Casual / Intimate, Riding buddy</p>
                        </li>
                    </ul>
                </div>
                <div class=" tab_content tab_content_details">
                    <ul>
                        <li><label class="title"> Worth </label><span class="edit" url="myProfileWorth"></span></li>
                        <li><label> Annual income </label><span>Please ask me</span></li>
                    </ul>
                    <ul>
                        <li><label class="title"> Appearance </label><span class="edit" url="myProfileBasic"></span></li>
                        <li><label> Height </label><span>Please ask me</span></li>

                        <li><label> Eye color </label><span>Please ask me</span></li>
                        <li><label> Hair color </label><span>Please ask me</span></li>
                        <li><label> Body type </label><span>Please ask me</span></li>
                    </ul>
                    <ul>
                        <li><label class="title"> Lifestyle </label><span class="edit" url="myProfileLifeStyle"></span></li>
                        <li><label> Occupation </label><span>Please ask me</span></li>
                        <li><label> Smoking </label><span>Please ask me</span></li>
                        <li><label> Drinking </label><span>Please ask me</span></li>
                        <li><label> Have children </label><span>Please ask me</span></li>
                        <li><label> Want children </label><span>Please ask me</span></li>
                        <li><label> Have pets </label><span>Please ask me</span></li>
                    </ul>
                    <ul>
                        <li><label class="title"> Background </label><span class="edit" url="myProfilePersonalInfo"></span></li>
                        <li><label> Education </label><span>Please ask me</span></li>
                        <li><label> Ethnicity </label><span>East Indian</span></li>
                        <li><label> Languages </label><span>Please ask me</span></li>
                        <li><label> Political beliefs </label><span>Please ask me</span></li>
                        <li><label> Religion </label><span>Please ask me</span></li>
                    </ul>
                    <div class="match_title"> About my match</div>
                    <ul>
                        <li><label class="title"> Worth </label><span class="edit" url="myMatchWorth"></span></li>
                        <li><label> Annual income </label><span>No preference</span></li>
                    </ul>
                    <ul>
                        <li><label class="title"> Appearance </label><span class="edit" url="myMatchBasic"></span></li>
                        <li>
                            <label> Height </label>
                            <span>
                                No preference
                            </span>
                        </li>

                        <li><label> Eye color </label><span>No preference</span></li>
                        <li><label> Hair color </label><span>No preference</span></li>
                        <li><label> Body type </label><span>No preference</span></li>
                    </ul>
                    <ul>
                        <li><label class="title"> Lifestyle </label><span class="edit" url="myMatchLifeStyle"></span></li>
                        <li><label> Occupation </label><span>No preference</span></li>
                        <li><label> Smoking </label><span>No preference</span></li>
                        <li><label> Drinking </label><span>No preference</span></li>
                        <li><label> Have children </label><span>No preference</span></li>
                        <li><label> Want children </label><span>No preference</span></li>
                       <li><label> Have pets </label><span>No preference</span></li>
                    </ul>
                    <ul>
                        <li><label class="title"> Background </label><span class="edit" url="myMatchPersonalInfo"></span></li>
                        <li><label> Education </label><span>No preference</span></li>
                        <li><label> Ethnicity </label><span>No preference</span></li>
                        <li><label> Languages </label><span>No preference</span></li>
                        <li><label> Political beliefs </label><span>No preference</span></li>
                        <li><label> Religion </label><span>No preference</span></li>
                    </ul>
                </div>
            </div>

        </div>
    </div>
</div>