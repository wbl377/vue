<template>
  <div id="app">
	
    <header-div :seller="seller"></header-div>
    <div class="tab">
    	<div class="tab-item">
    		 <router-link to="/goods">商品</router-link>
    	</div>
    	
    	<div class="tab-item">
    		<router-link to="/ratings">评论</router-link>
    	</div>
    	
    	<div class="tab-item">
    		<router-link to="/seller">商家</router-link>
    	</div>
    	
    </div>
    	<router-view :seller="seller"></router-view>
    
    <!--<v-content></v-content>-->
    
  </div>
</template>

<script>
	
	import headerDiv from "./components/header/header"
	import content from "./components/content/content"
	
	export default {
		components:{
			headerDiv,
			"v-content":content
		},
	  name: 'app',
	  data (){
	  	return{
	  		seller:{}
	  	}
	  },
	  created(){
	  	this.$http.get('/api/seller').then((response) => {
	  		
	  		response = response.body;
	  		if(response.errno === 0){
	  			this.seller = response.data;
	  			//console.log(this.seller)
	  		}
	  	})
	  }
	}
</script>
 
<style >
	#app .tab{
		display:flex;
		width:100%;
		height:40px;
		line-height:40px;
		border-bottom:1px solid #999;
	}
	.tab-item{
		flex:1;
		text-align:center;	
	}
	.tab-item a{
		display:block;
		font-size:14px;
		color:#333
	}
	.tab-item a.active{
		color:red;
	}
</style>
