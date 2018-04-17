<template >
 	<transition name="move">
 		<div v-show="showFlag" class="food" ref="food">
 			<div class="food-content">
 				<div class="image-header">
 					<img :src="food.image" alt="" />
 					<div class="back" @click="hide">
 						<i class="icon-arrow_lift"></i>
 					</div>	
 				</div>
 				<div class="content">
 					<h1 class="title">{{food.name}}</h1>
 					<div class="detail">
 						<span class="sell-count">月售{{food.sellCount}}份</span>
 						<span class="rating">好评率{{food.rating}}</span>
 					</div>
 					<div class="price">
 						<span class="nowPrice">￥{{food.price}}</span>
 						<span class="oldPrice" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
 					</div>
 				</div>
 				<div class="cartcontrol-wrap">
 					<buybtn :food="food"></buybtn>
 				</div>
 				<div class="buy" v-show="!food.count || food.count===0" @click="addFrist(food,$event)">加入购物车</div>
 			</div>
 		</div>
 	</transition>
  	
</template>
<script>
	
	import BScroll from 'better-scroll';
	import buybtn from '../buybtn/buybtn';
	
    export default{
    	components:{
    		buybtn
    	},
    	props:{
    		food:{
    			type:Object
    		}
    	},
    	data(){
        return{
            showFlag:false
        }
    	},
    	methods:{
    		showBox() {
    			this.showFlag = true;
    			this.$nextTick( () => {
    				if(!this.scroll){
    					this.scroll = new BScroll(this.$refs.food,{
    						click:true
    					})
    				}else{
    					this.scroll.refresh();
    				}
    			})
    		},
    		hide() {
    			this.showFlag = false;
    		}
    	}
    }
</script>
<style scoped="scoped">
  .food{
  	position:fixed;
  	left:0;
  	top:0;
  	bottom:48px;
  	z-index:30;
  	width:100%;
  	background:#fff;
  	transform:translate3d(0,0,0)
  }
  .move-enter-active,.move-leave-active{
  	
   	transition: all 0.3s linear
  }
  .move-enter,.move-leave{
  	transform:translate3d(100%,0,0)
  }
  .image-header{
  	position:relative;
  	width: 100%;
  	height:0;
  	padding-top:100%;
  	
  }
  .image-header img{
  	position:absolute;
  	top:0;
  	left:0;
  	width:100%;
  	height:100%;
  }
  .back{
  	position:absolute;
  	top:10px;
  	left:0;
  }
  .icon-arrow_lift{
  	display: block;
  	padding:18px;
  	font-size:20px;
  	color:#fff;
  }
  .content{
  	padding:18px;	
  }
  .title{
  	line-height: 14px;
  	margin-bottom:8px;
  	font-size:14px;
  	font-weight:700;
  	color: rgb(7,17,27);
  }
  .detail{
  	margin-bottom:18px;
  	line-height: 10px;
  	font-size:0;
  	height:10px;
  }
  .sell-count,.rating{
		font-size:10px;
		color:rgb(147,153,159);
		
	}
	.sell-count{
		margin-right:12px;
	}
	.rating{
		
	}
	.price{
		font-weight:700;
		line-height: 24px;
		
	}
	.nowPrice{
		margin-right:8px;
		font-size:14px;
		color:rgb(240,20,20);
	}
	.oldPrice{
		text-decoration: line-through;
		font-size:10px;
		color:rgb(147,153,159);
	}
	.cartcontrol-wrap{
		position:absolute;
		right:12px;
		bottom:12px;
	}
	.buy{
		position:absolute;
		right:18px;
		bottom:18px;
		z-index:10;
		line-height:24px;
		height:24px;
		padding:0 12px;
		box-sizing: border-box;
		font-size:10px;
		color: #fff;
		border-radius: 12px;
		background: rgb(0,160,220);
	}
</style>

