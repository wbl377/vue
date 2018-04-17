<template>
	<div class="header">
		<div class="content-wrap">
			<div class="avatar">
				<img :src="seller.avatar" width="64" hieght="64" />
			</div>
			<div class="content">
				<div class="title">
					<span class="brand"></span>
					<span class="name">{{ seller.name }}</span>
				</div>
				<div class="description">{{ seller.description }}/{{ seller.deliveryTime }}分钟送达</div>
				<div v-if="seller.supports" class="supports" >
					<span class="icon" :class="classMap[seller.supports[0].type]"></span>
					<i class="text" >{{ seller.supports[0].description }}</i>
				</div>
			</div>
			<div v-if="seller.supports" class="support-count" @click="showDetail">
				<span class="count">{{ seller.supports.length }}个</span>
				<span class="icon-keyboard_arrow_right"></span>
			</div>
		</div>
		<div class="bulletin-wrap" @click="showDetail">
			<span class="bull-title"></span><span class="bull-text">{{ seller.bulletin }}</span>
			<i class="icon-right icon-keyboard_arrow_right" ></i>
		</div>
		<div class="background">
			<img :src="seller.avatar" width="100%" height="100%" />
		</div>
		<transition name="fade">
			<div class="detail" v-show="detailShow" >
				<div class="detail-wrapper clearfix">
					<div class="detail-main">
						<h1 class="name">{{ seller.name }}</h1>
						<div class="star-wrap">
							<star :size="48" :score="seller.score"></star>
						</div>
						<div class="title">
							<div class="line"></div>
							<div class="text">优惠信息</div>
							<div class="line"></div>
						</div>
						<ul v-if="seller.supports" class="support">
							<li class="support_item" v-for="(item,index) in seller.supports">
								<span class="iconSpan" :class="classMap[seller.supports[index].type]"></span>
								<span class="text">{{ seller.supports[index].description }}</span>
							</li>
						</ul>
						<div class="title">
							<div class="line"></div>
							<div class="text">商家公告</div>
							<div class="line"></div>
						</div>
						<div class="bulletin">
							<p class="contentText">{{ seller.bulletin }}</p>
						</div>
					</div>
				</div>
				<div class="detail-close">
					<i class="icon-close" @click="hideDetail"></i>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
 
 import Star from '../star/star';
	
export default {
  props:{
	seller:{
		type:Object
	}
  },
  components:{
  	Star
  },
  data(){
  	return{
  		detailShow:false
  	}
  },
  methods:{
  	showDetail() {
  		this.detailShow = true;
  	},
  	hideDetail:function(){
  		this.detailShow = false;
  	}
  },
  created(){
  	this.classMap = ['decrease','discount','special','invoice','guarantee']
  }
  
}
</script>

<style scoped="scoped">
	.header{
		color:#fff;
		font-weight:200;
		position:relative;
		overflow: hidden;
		background:rgba(7,17,27,0.5);
	}
	.content-wrap{
		padding:24px 12px 18px 24px;
		font-size:0;
		position:relative;
	}
	.avatar{
		display:inline-block;
		margin-right:16px;
		vertical-align: top;
	}
	.avatar img{
		border-radius:2px;
	}
	.content{
		display:inline-block;
		font-size:14px;
	}
	.content .title{
		margin:2px 0 8px 0;
	}
	.content .brand{
		display:inline-block;
		width:30px;
		height:18px;
		background: url(brand@2x.png) no-repeat;
		background-size:cover;
		-webkit-background-size:cover;
		vertical-align: top;
	}
	.content .brand img{
		width:100%;
		height:100%;
	}
	.content .name{
		font-size:16px;
		margin-left:6px;
		line-height:18px;
		font-weight:bold;
		
	}
	.description{
		font-size:12px;
		line-height:12px;
		color:#fff;
		font-weight:200;
		margin-bottom:10px;
	}
	.supports .icon{
		display:inline-block;
		width:12px;
		height:12px;
		margin-right:4px;
		vertical-align: top;
		background-repeat:no-repeat;
	}
	.icon.decrease{
		background: url(decrease_1@2x.png) no-repeat;
		background-size:12px 12px;
		-webkit-background-size:12px 12px;
	}
	.icon.discount{
		background:url(discount_1@2x.png) no-repeat;
		background-size:12px 12px;
		-webkit-background-size:12px 12px;
	}
	.icon.guarantee{
		background:url(guarantee_1@2x.png) no-repeat;
		background-size:12px 12px;
		-webkit-background-size:12px 12px;
	}
	.icon.invoice{
		background:url(invoice_1@2x.png) no-repeat;
		background-size:12px 12px;
		-webkit-background-size:12px 12px;
	}
	.icon.special{
		background:url(special_1@2x.png) no-repeat;
		background-size:12px 12px;
		-webkit-background-size:12px 12px;
	}
	.supports .text{
		font-size:10px;
		line-height:12px;
		vertical-align: top;
	}
	.support-count{
		position:absolute;
		right:12px;
		height:20px;
		background:#474747;
		bottom:18px;
		padding: 0 8px;
		line-height:20px;
		border-radius:14px;
		text-align:center;
	}
	.support-count .count{
		font-size:10px;
	}
	.support-count .icon-keyboard_arrow_right{
		font-size:10px;
	}
	
	.bulletin-wrap{
		height:28px;
		line-height:28px;
		padding:0 22px 0 12px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		position:relative;
	}
	.bull-title{
		display: inline-block;
		width:22px;
		height:12px;
		background:url(bulletin@2x.png) no-repeat;
		background-size:cover;
		-webkit-background-size:cover;
		vertical-align: top;
		margin-top:8px;
	}
	.bull-text{
		font-size:10px;
		margin:0 4px;
		vertical-align: top;
	}
	.icon-right{
		position:absolute;
		font-size:10px;
		right:12px;
		top:8px;
	}
	.background{
		position:absolute;
		top:0;
		left:0;
		width:100%;
		height:100%;
		z-index: -1;
		filter: blur(10px);	
	}
	.detail{
		position:fixed;
		top:0;
		left:0;
		z-index:100;
		width:100%;
		height: 100%;
		overflow: auto;
		transition: all 0.5s;
		backdrop-filter:blur(10px);
		background:rgba(7,17,27,0.8);	
	}
	.detail.fade-transition{
		opacity:1;
		background:rgba(7,17,27,0.8)
	}
	.detail.fade-enter,.detail.fade-leave{
		opacity:0;
		background:rgba(7,17,27,0)
	}
	.detail-wrapper{
		min-height:100%;	
		width:100%;
	}
	.detail-main{
		padding-top:64px;
		padding-bottom:64px;
	}
	.detail-main .name{
		line-height:16px;
		font-weight:700;
		text-align: center;
		font-size: 16px;
	}
	.detail-close{
		position:relative;
		width:32px;
		height: 32px;
		margin:-64px auto 0 auto;
		font-size:32px;
		clear: both;
	}
	.star-wrap{
		text-align:center;
		margin-top:18px;
		padding:2px 0;
	}
	.detail-main .title{
		width:80%;
		margin:28px auto 24px auto;
		display:flex;
	}
	.detail-main .title .line{
		flex:1;
		position:relative;
		top:-6px;
		border-bottom:1px solid rgba(255,255,255,0.2);
	}
	.detail-main .title .text{
		padding:0 12px;
		font-size: 14px;
		font-weight:700;
	}
	.support{
		width:80%;
		margin:0 auto;	
	}
	.support_item{
		padding: 0 12px;
		margin-bottom:12px;
		font-size:0;	
	}
	.support_item:last-child{
		margin-bottom:0;
	}
	.iconSpan{
		display:inline-block;
		width:16px;
		height:16px;
		vertical-align: top;
		margin-right:6px;
		background-size: 16px 16px;
		background-repeat:no-repeat;
	}
	
	.iconSpan.decrease{
		background: url(decrease_2@2x.png) no-repeat;
		background-size:16px 16px;
		-webkit-background-size:16px 16px;
	}
	.iconSpan.discount{
		background:url(discount_2@2x.png) no-repeat;
		background-size:16px 16px;
		-webkit-background-size:16px 16px;
	}
	.iconSpan.guarantee{
		background:url(guarantee_2@2x.png) no-repeat;
		background-size:16px 16px;
		-webkit-background-size:16px 16px;
	}
	.iconSpan.invoice{
		background:url(invoice_2@2x.png) no-repeat;
		background-size:16px 16px;
		-webkit-background-size:16px 16px;
	}
	.iconSpan.special{
		background:url(special_2@2x.png) no-repeat;
		background-size:16px 16px;
		-webkit-background-size:16px 16px;
	}
	.support_item .text{
		font-size:12px;
		line-height: 16px;	
	}
	.bulletin{
		width:80%;
		margin:0 auto;
		font-size:;
	}
	.bulletin .contentText{
		padding:0 12px;
		line-height:24px;
		font-size:12px;
	}
</style>