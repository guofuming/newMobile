<div id="slideImg">
    <ul>
    	<% $.each(arr,function(i){%>
        	<li imgId='<%= arr[i].item_id%>'><img src="" url='<%= arr[i].picture%>' alt="">
        	</li>
        <%})%>
    </ul>
    <div class="number"></div>
</div>