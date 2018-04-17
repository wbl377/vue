<template>
	<div>
		<div class="goodsMain">
			<div class="menu-wrapper" ref="menuWrapper">
				<ul>
					<li v-for="(item,index) in goods" class="menu-item" :class="{'current':currentIndex === index}" @click="selectMenu(index,$event)">
						<span class="text "> 
							<span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>
							{{ item.name }} </span>
					</li>
				</ul>
			</div>
			<div class="foods-wrapper" ref="foodsWrapper">
				<ul>
					<li v-for="item in goods" class="food-list food-list-hook">
						<h1 class="goodTitle">{{ item.name }}</h1>
						<ul>
							<li @click="seleFood(food,$event)" v-for="food in item.foods" class="food-item"> 
								<div class="foodIcon">
									<img width="57" height="57" :src="food.icon" />
								</div>
								<div class="foodContent">
									<h2 class="foodName">{{ food.name }}</h2>
									<p class="desc">{{ food.description }}</p>
									<div class="extra">
										<span class="count">销售{{food.sellCount}}份</span><span >好评率{{food.rating}}%</span>	
									</div>
									<div class="price">
											<span class="nowPrice">￥{{food.price}}</span><span class="oldPrice" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
									</div>
									<div class="cartcontrolWeap">
										<buybtn :food="food" @cart-add="cartAdd"></buybtn>
									</div>
								</div>
							</li>
						</ul>
					</li>
				</ul>
			</div>
		
			<shopcart ref="shopcart" :select-foods="selectFoods" :delivery="seller.deliveryPrice" :min-price="seller.minPrice"></shopcart>
		
		</div>
		<food :food="selectedFood" ref="food"></food>
	</div>
</template>

<script>
	import BScroll from 'better-scroll';
	import shopcart from './shopcart/shopcart';
	import buybtn from './buybtn/buybtn';
	import food from './food/food';
	
	
	const ERR_OK = 0;
	
	export default{
		components:{
			shopcart,
			buybtn,
			food
		},
		props:{
			seller:{
				type:Object
			}
		},
		data () {
			return{
				goods:[],
				listHeight:[],
				scrollY:0,
				selectedFood:{}
			}
		},
		created () {
			this.classMap = ['decrease','discount','special','invoice','guarantee'];
			
			this.$http.get('/api/goods').then((response) => {
	  			response = response.body;
	  			if(response.errno === ERR_OK){
	  				this.goods = response.data;
	  				//console.log(this.goods)	
	  				this.$nextTick(() => {
	  					this._initScroll();
	  					this._calculateHeight();
	  				})
	  				
	  			}
		  	})
		},
		computed:{
			currentIndex(){
				for(let i=0;i<this.listHeight.length;i++){
					let height1 = this.listHeight[i];
					let height2 = this.listHeight[i + 1];
					if(!height2 || (this.scrollY >= height1 && this.scrollY < height2 )){
						return i;
					}
				}
			},
			selectFoods(){
				let foods = [];
				this.goods.forEach((good) => {
					good.foods.forEach( (food) => {
						if(food.count){
							foods.push(food)
						}
					})
				})
				return foods;
			}
		},
		methods:{
			selectMenu(index,event){
				/*if(!event._constructed){
					return
				}*/
				let foodList = this.$refs.foodsWrapper.querySelectorAll(".food-list-hook"); 
				let el = foodList[index];
				this.foodsScroll.scrollToElement(el,500)
			},
			seleFood(food){
				this.selectedFood = food;
				this.$refs.food.showBox();
				
			},
			_initScroll(){
				this.menuScroll = new BScroll(this.$refs.menuWrapper,{
					click:true
				});
				this.foodsScroll = new BScroll(this.$refs.foodsWrapper,{
					click:true,
					probeType:3
				});
				
				this.foodsScroll.on('scroll',(pos) => {
					this.scrollY = Math.abs(Math.round(pos.y));
				})
			},
			_calculateHeight(){
				let foodList = this.$refs.foodsWrapper.querySelectorAll(".food-list-hook");
				
				let height = 0;
				this.listHeight.push(height);
				for(let i=0; i<foodList.length; i++){
					let item = foodList[i];
					height += item.clientHeight;
					this.listHeight.push(height)
				}
				//console.log(this.listHeight)
			},
			cartAdd(target){
				this._drop(target)
			},
			_drop(target){
				//体验优化，异步执行下落动画
				this.$nextTick(() => {
					this.$refs.shopcart.drop(target)
				})
				
			}
		}
	}
</script>

<style scoped="scoped">
	.goodsMain{
		display: flex;
		position:absolute;
		top:175px;
		width:100%;
		bottom:46px;
		overflow: hidden;	
	}
	.menu-wrapper{
		flex:0 0 80px;
		width:80px;
		background: #F3F5F7;
	}
	.menu-item{
		display: table;
		font-size:12px;
		height:54px;
		width:56px;
		line-height: 14px;	
		padding:0 12px;
	}
	.menu-item.current{
		position:relative;
		margin-top:-1px;
		z-index:10;
		background:#fff;
		font-weight:700;
	}
	.menu-item.current .text{
		border:0;
	}
	.menu-item .icon{
		display:inline-block;
		width:12px;
		height:12px;
		margin-right:4px;
		vertical-align: top;
		background-repeat:no-repeat;
	}
	.icon.decrease{
		background: url(decrease_3@2x.png) no-repeat;
		background-size:12px 12px;
		-webkit-background-size:12px 12px;
	}
	.icon.discount{
		background:url(discount_3@2x.png) no-repeat;
		background-size:12px 12px;
		-webkit-background-size:12px 12px;
	}
	.icon.guarantee{
		background:url(guarantee_3@2x.png) no-repeat;
		background-size:12px 12px;
		-webkit-background-size:12px 12px;
	}
	.icon.invoice{
		background:url(invoice_3@2x.png) no-repeat;
		background-size:12px 12px;
		-webkit-background-size:12px 12px;
	}
	.icon.special{
		background:url(special_3@2x.png) no-repeat;
		background-size:12px 12px;
		-webkit-background-size:12px 12px;
	}
	.menu-item .text{
		display: table-cell;
		font-size:12px;
		width:56px;
		vertical-align: middle;
		border-bottom:1px solid rgba(7,17,77,0.1)
	}
	.foods-wrapper{
		flex:1;	
	}
	.goodTitle{
		padding-left:14px;
		height:26px;
		line-height: 26px;
		border-left:2px solid #d9ddel;
		font-size:12px;
		color:rgb(147,153,159);
		background: #f3f5f7;
	}
	.food-item{
		display:flex;
		margin:18px;
		padding-bottom:18px;
		border-bottom: 1px solid rgba(7,17,27,0.1);
		position:relative;
	}
	.food-item:last-child{
		border:0;
		margin-bottom:0;
	}
	.foodIcon{
		flex:0 0 57px;
	}
	.foodContent{
		padding-left:10px;
	}
	.foodName{
		margin:2px 0 8px 0;
		height:14px;
		line-height: 14px;
		font-size:14px ;
		color:rgb(7,17,27);
	}
	.desc{
		margin-bottom:8px;
		font-size:10px;
		line-height: 12px;
		color:rgb(147,153,159);
	}
	.extra{
		line-height:10px;
		font-size:10px;	
	}
	.count{
		margin-right:12px;
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
	.cartcontrolWeap{
		position:absolute;
		right:0;
		bottom:12px;
	}
</style>