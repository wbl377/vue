<template>
	<div class="shopcart">
		<div class="content" @click="toggleList">
			<div class="content-left">
				<div class="logo-wrapper">
					<div class="logo" :class="{'highlight':totalCount>0}">
						<span class="icon-shopping_cart" :class="{'highlight':totalCount>0}"></span>
					</div>
					<div class="num" v-show="totalCount>0">{{totalCount}}</div>
				</div>
				<div class="price" :class="{'highlight':totalPrice>0}">￥{{totalPrice}}元</div>
				<div class="desc">另需配送费{{deliveryPrice}}元</div>
			</div>
			<div class="content-right">
				<div class="pay" :class="payClass" @click.stop="pay">
					{{payDesc}}
				</div>
			</div>
		</div>
		<div class="ball-container">
  				<div v-for="ball in balls">
  					<transition name="drop" @before-enter="beforeDrop" @enter="enterDrop" @after-enter="afterDrop">
	  					<div class="ball" v-show="ball.show">
							<div class="inner inner-hook"></div>
						</div>
					</transition>
  				</div>
		</div>
		<transition name="fold">
			<div class="shopcart-list" v-show="listShow">
				<div class="list-header">
					<h1 class="title">购物车</h1>
					<span class="empty" @click="empty">清空</span>
				</div>
				<div class="list-content" ref="listContent">
					<ul>
						<li class="food" v-for="food in selectFoods">
							<span class="name">{{food.name}}</span>
							<div class="priceCar">
								<span>￥{{food.price*food.count}}</span>
							</div>
							<div class="cartcontrol-wrap">
								<buybtn :food="food"></buybtn>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</transition>
		
		
		<transition name="mask">
			<div class="list-mask" v-show="listShow" @click="hideList"></div>
		</transition>
	</div>
	
	
</template>
<script>
	import BScroll from 'better-scroll';
	import buybtn from '../buybtn/buybtn';
	
	export default{
		components:{
			buybtn
		},
		props:{
			selectFoods:{
				type:Array,
				default(){
					return [];
				}
			},
			deliveryPrice:{
				type:Number,
				default:0
			},
			minPrice:{
				type:Number,
				default:0
			}
		},
		data (){
			return{
				fold:true,
				balls: [ //代表5个小球
					{
						show:false
					},
					{
						show:false
					},
					{
						show:false
					},
					{
						show:false
					},
					{
						show:false
					}
				],
				dropBalls:[]  //正在运行的小球
			}
		},
		computed:{
			totalPrice(){
				let total = 0;
				this.selectFoods.forEach((food) => {
					total += food.price * food.count
				})
				return total;
			},
			totalCount(){
				let count = 0;
				this.selectFoods.forEach((food) => {
					count += food.count
				})
				return count;
			},
			payDesc(){
				if(this.totalPrice === 0 ){
					return `￥${this.minPrice}元起送`;
				}else if(this.totalPrice < this.minPrice){
					let diff = this.minPrice - this.totalPrice
					return `还差￥${diff}元起送`;
				}else{
					return '去结算';
				}
			},
			payClass(){
				if(this.totalPrice < this.minPrice){
					return 'not-enough'
				}else{
					return 'enough'
				}
			},
			listShow(){
				if(!this.totalCount){
					this.fold = true;
					return false
				}
				let show = !this.fold;
				if(show){
					this.$nextTick( () => {
						if(!this.scroll){
							this.scroll = new BScroll(this.$refs.listContent,{
								click:true
							})
						}else{
							this.scroll.refresh();
						}
						
					})
				}
				return show;
			}
		},
		methods:{
			pay(){ //去结算
				if(this.totalPrice < this.minPrice){
					return;
				}
				window.alert(`支付${this.totalPrice}元`)
			},
			drop(el){
				//触发一次事件就会将所有小球进行遍历
				
				for(let i=0;i<this.balls.length;i++){
					let ball = this.balls[i];
					if(!ball.show){ //将false的小球放到dropBalls
						ball.show = true;
						ball.el = el; //设置小球的el属性为一个dom对象
						this.dropBalls.push(ball);
						return;
					}
				}
			},
			toggleList(){
				if(!this.totalCount){
					return;
				}
				this.fold = !this.fold;
			},
			beforeDrop(el){ //这个方法的执行是因为这是一个vue的监听事件
				let count = this.balls.length;
				while(count--){
					let ball = this.balls[count];
					//console.log(el)
					if(ball.show){
						//console.log(el)
						let rect = ball.el.getBoundingClientRect(); //获取小球的相对于视口的位移(小球高度)
						let x = rect.left - 32;
						let y = -(window.innerHeight - rect.top - 22); //负数,因为是从左上角往下的的方向
						//console.log(x,y);
						el.style.display = ''; //清空display
						el.style.webkitTransform = `translate3d(0,${y}px,0)`;
						el.style.transform = `translate3d(0,${y}px,0)`;
						//console.log(el.style.transform);
						//处理内层动画
						let inner = el.getElementsByClassName('inner-hook')[0]; //使用inner-hook类来单纯被js操作
						inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
						inner.style.transform = `translate3d(${x}px,0,0)`;
					}
				}
			},
			enterDrop(el,done){
			 	/* esLint-disable no-unused-vars */
			 	let rf = el.offsetHeight; //触发重绘html
			 	this.$nextTick( () => { //让动画效果异步执行,提高性能
			 		el.style.webkitTransform = 'translate3d(0,0,0)';
					el.style.transform = 'translate3d(0,0,0)';
					
					let inner = el.getElementsByClassName('inner-hook')[0]; //使用inner-hook类来单纯被js操作
					inner.style.webkitTransform = 'translate3d(0,0,0)';
					inner.style.transform = 'translate3d(0,0,0)';
					
					el.addEventListener('transitionend',done) //Vue为了知道过渡的完成，必须设置相应的事件监听器。
			 	})
			},
			afterDrop(el){ //完成一次动画就删除一个dropBalls的小球
				let ball = this.dropBalls.shift();
				if(ball){
					ball.show = false;
					el.style.display ='none'; //隐藏小球
				}
			},
			empty(){
				this.selectFoods.forEach( (food) =>{
					food.count = 0
				})
			},
			hideList(){
				this.fold = true;
			}
		}
	}
</script>
<style scoped="scoped">
	.shopcart{
		position:fixed;
		left:0;
		bottom:0;
		z-index: 50;
		width:100%;
		height:48px;
	}
	.content{
		display:flex;
		background:#141d27;
		font-size:0;
	}	
	.content-left{
		flex:1;
	}
	.logo-wrapper{
		display:inline-block;
		position:relative;
		top:-10px;
		margin:0 12px;
		padding:6px;
		width:56px;
		height:56px;
		box-sizing: border-box;
		vertical-align: top;
		border-radius: 50%;
		background: #141d27;
	}
	.logo{
		width:100%;
		height:100%;
		border-radius: 50%;
		background: #2b343c;
		text-align:center;
	}
	.logo.highlight{
		background: rgb(0,160,220);
	}
	.icon-shopping_cart{
		font-size:26px;
		color:#80858a;
		line-height:44px;	
	}
	.icon-shopping_cart.highlight{
		color:#fff;
	}
	.num{
		position:absolute;
		top:0;
		right:0;
		width: 24px;
		height:16px;
		line-height:16px;
		text-align: center;
		border-radius: 16px;
		font-size:9px;
		font-weight:700;
		color:#fff;
		background:rgb(240,20,20);
		box-shadow: 0 4px 8px 0 rgba(0,0,0,0.4);
	}
	.price{
		display:inline-block;
		vertical-align: top;
		line-height:24px;
		margin-top:12px;
		box-sizing: border-box;
		padding-right:12px;
		border-right:1px solid rgba(255,255,255,0.1);
		font-size:16px;
		font-weight:700px;
		color:rgba(255,255,255,0.4);
	}
	.price.highlight{
		color:#fff;
	}
	.desc{
		display:inline-block;
		vertical-align: top;
		line-height:24px;
		margin:12px 0 0 12px;
		font-size:10px;
		color:rgba(255,255,255,0.4);
	}
	.content-right{
		flex:0 0 105px;
		width:105px;	
	}
	.content-right .pay{
		font-size:12px;
		height:48px;
		line-height: 48px;
		color:rgba(255,255,255,0.4);
		text-align: center;
		font-weight:700;
		background:#2b333b;
	}
	.content-right .pay.not-enough{
		background:#2b333b;
	}
	.content-right .pay.enough{
		background: #00b43c;
		color:#fff;
	}
	
	.ball-container{
		
	}
	.ball{
		position:fixed;
		left:32px;
		bottom:22px;
		z-index:200;
		transition:all 0.5s cubic-bezier(0.49,-0.29,0.75,0.41);
	}
	.ball.drop-transition{
		
	}
	.inner{
		width:16px;
		height:16px;
		border-radius: 50%;
		background:rgb(0,160,220);
		transition:all 0.5s linear;
	}
	
	.shopcart-list{
		position:absolute;
		top:0;
		left:0;
		z-index:-1;
		width:100%;	
		transition:all 0.5s;
		transform:translate3d(0,-100%,0);	
	}
	
	.fold-enter,.fold-leave{
		transition:all 0.5s;
		transform:translate3d(0,0,0);
	}
	.list-header{
		height:40px;
		line-height: 40px;
		padding:0 10px;
		background: #f3f5f7;
		border-bottom:1px solid rgba(7,17,27,0.1);	
	}
	.list-header .title{
		float: left;
		font-size:14px;
		color:rgb(7,17,27);
			
	}
	.list-header .empty{
		float: right;
		font-size:12px;
		color:rgb(0.160,220);	
	}
	.list-content{
		padding:0 18px;
		max-height:217px;
		background:#fff;
		overflow: hidden;	
	}
	.list-content .food{
		position:relative;
		padding:12px 0;
		box-sizing: border-box;
		border-bottom:1px solid rgba();
	}
	.list-content .food .name{
		line-height: 24px;
		font-size:14px;
		color:rgb(1,17,27);	
	}
	.list-content .food .priceCar{
		position:absolute;
		right:90px;
		bottom:12px;
		line-height:24px;
		font-weight:700;
		font-size:14px;
		color:rgb(240,20,20);	
	}
	.cartcontrol-wrap{
		position:absolute;
		right:0;
		bottom:6px;
	}
	.list-mask{
		position: fixed;
		left:0;
		top:0;
		width:100%;
		height:100%;
		z-index:-40;
		transition: all 0.5s;
		backdrop-filter:blur(10px);
		opacity:1;
		background:rgba(7,17,27,0.6);
	}
	.list-mask.mask-transition{
		opacity:1;
		background:rgba(7,17,27,0.6);
	}
	.mask.enter,.mask-leave{
		opacity:0;
		background:rgba(7,17,27,0);
	}
</style>