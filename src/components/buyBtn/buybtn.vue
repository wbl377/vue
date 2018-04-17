<template>
	<div class="cartcontrol">
		<transition name="move">
			<div class="cart-decrease " v-show="food.count > 0" @click="decCart">
				<span class="inner icon-remove_circle_outline"></span>
			</div>
  		</transition>
  		
		<div class="cart-count" v-show="food.count > 0">{{food.count}}</div>
		<div class="cart-add icon-add_circle" @click="addCart"></div>
	</div>
</template>
<script >
	import Vue from 'vue';
	export default{
		props:{
			food:{
				type:Object
			}
		},
		data(){
			return{
				
			}
		},
		created(){
			//console.log(this.food)
		},
		methods:{
			addCart(){
				if(!this.food.count){
					Vue.set(this.food,'count',1)
					//this.food.count = 1
				}else{
					this.food.count++
				}
				
				this.$emit('cart-add',event.target)
			},
			decCart(){
				if(this.food.count){
					this.food.count--
				}
			}
		}
	}
</script>
<style>
	.cartcontrol{
		font-size:0;
	}
	.cart-decrease{
		padding:6px;
		display:inline-block;
		transition:all 0.3s linear;	
	}
	.cart-decrease.move-transition{
		opacity:1;
		transform:translate3d(0,0,0);	
	}
	.cart-decrease.move-enter,.cart-decrease.move-leave{
		opacity:0;
		transform: translate3d(24px,0,0);
	}
	.cart-decrease.move-enter .inner,.cart-decrease.move-leave .inner{
		transform:rotate(180deg)
	}
	.inner{
		font-size:24px;
		line-height:24px;
		color:rgb(0,160,220);
		display:inline-block;
		transition: all 0.3s linear;	
		transform:rotate(0)
	}
	.cart-count{
		display:inline-block;
		color:rgb(147,153,159);	
		vertical-align: top;
		width:12px;
		padding-top:6px;
		line-height:24px;
		text-align: center;
		font-size:10px;
	}
	.cart-add{
		padding:6px;
		font-size:24px;
		line-height:24px;
		display:inline-block;
		color:rgb(0,160,220);		
	}
</style>