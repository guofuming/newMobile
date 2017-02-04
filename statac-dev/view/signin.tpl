<div id="signin" class="g-doc">
    <div class="g-hd">
        <div class="left back"></div>
        <div class="f-toe center">Log In</div>
        <!-- <div class="right"> r </div> -->
    </div>
    <div class="g-bd">
        <input class="u-input" placeholder="Username or email" type="text" name="username">
        <input class="u-input" placeholder="Password" type="password" name="password">
        <div class="f-cb f-dn validation">
            <input maxlength="3" placeholder="Verify Code" class="u-input" type="number" name="validaNum">
            <div class="img_box loading">
                <img src="<%= seajs.data.vars.resources%>img/max_loading.gif" alt="">
            </div>
        </div>
        <div class="forgot">
            <span> Forgot password? </span>
        </div>
        <button class="u-btn btn_loading">Log In</button>
    </div>
</div>