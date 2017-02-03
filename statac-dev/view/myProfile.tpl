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

                    <div class="asdas">
                        
                        fixed经典布局 - JSFiddlep
                        <p></p>
Test your JavaScript, CSS, HTML or CoffeeScript online with JSFiddle code editor.
                        <p></p>
                        <p></p>
                        <p></p>
jsfiddle.net/jikeytang...  - 百度快照 - 评价 - 翻译此页
怎么在鼠标离开触发区域时让:hover的效果延迟消失_fire..._百度贴吧

38条回复 - 发帖时间: 2014年12月11日
css3: transition 轮回眼的鸣人 乐享网络 13 /*侧栏鼠标经过弹出*/#content_right{position: fixed}.cr-content >.cr-title...
tieba.baidu.com/p/3461...  - 百度快照
                        <p></p>
                        <p></p>
                        <p></p>
【全面解析Bootstrap中transition、affix的使用方法】-真格学网-...
                        <p></p>
2016年6月2日 - 这篇文章主要为大家详细解析了Bootstrap中transition、affix的使用方法,感兴趣...原因:行内样式设置的relative会覆盖class中设置的fixed样式6、总结1)...
www.zgxue.com/itbc/art...  - <p></p>
                        <p></p>
2014年12月23日 - CSS clip 属性<p></p>
                        <p></p>
2014年12月23日 - CSS clip 属性<p></p>
                        <p></p>
2014年12月23日 - CSS clip 属性百度快照 - 评价
                        <p></p>
为您推荐：scrollspybootstrap 隐藏jquery 回到顶部bootstrap affix
Css clip+transition制作裁剪动画_百度经验
                        <p></p>

                        <p></p>
                        <p></p>
                        <p></p>
                        <p></p>
                        <p></p>
2014年12月23日 - CSS clip 属性<p></p>
                        <p></p>
2014年12月23日 - CSS clip 属性<p></p>
                        <p></p>
2014年12月23日 - CSS clip 属性<p></p>
                        <p></p>
2014年12月23日 - CSS clip 属性定义和用法clip 属性剪裁绝对定位元素。写法clip: rect (top, right, bottom, left);,CSS3 transition 过渡CSS3 过渡是元素从一种样式逐渐改变为另...
                        <p></p>
                        <p></p>
jingyan.baidu.com/arti...  - 百度快照

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