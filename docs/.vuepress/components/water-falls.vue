<template>
	<div class="masonry" ref="wrapper" @click="setCount" :class="countSty">
		<div v-for="index in num" class="item">
			<div :class="className(index)"></div>
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			num: 12,
			countSty: 'c5',
		}
	},
	mounted() {
		this.setCount()
	},
	methods: {
		className(index) {
			const ext = ['small', 'medium', 'large']
			return (
				'item__content item__content--' + ext[Math.floor(Math.random() * 3)]
			)
		},
		setCount() {
			let wrapperWidth = this.$refs.wrapper.offsetWidth
			// console.log(wrapperWidth)
			if (wrapperWidth > 750) {
				this.countSty = 'c5'
			} else if (wrapperWidth > 650) {
				this.countSty = 'c4'
			} else if (wrapperWidth > 500) {
				this.countSty = 'c3'
			} else if (wrapperWidth > 300) {
				this.countSty = 'c2'
			} else if (wrapperWidth > 100) {
				this.countSty = 'c1'
			}
		},
	},
}
</script>
<style lang="less" scoped>
@import url('https://fonts.googleapis.com/css?family=PT+Mono');
@bg: #4f000b;
@itemBg1: #720026;
@itemBg2: #ce4257;
@itemBg3: #ffc093;
@itemBg4: #ff7f51;
@counterBg: #222;
.setColorAndHover(@baseColor) {
	color: @baseColor;
	&:hover {
		background: lighten(@baseColor, 8%);
	}
}

.masonry {
	width: 100%;
	// height: 500px;
	overflow-y: auto;
	overflow-x: hidden;
	background: @bg;
	font-family: 'PT Mono', monospace;
	column-count: 1;
	column-gap: 0;
	counter-reset: item-counter;
	resize: horizontal;

	// @media screen and (min-width: 400px) {
	//   column-count: 2;
	// }

	// @media screen and (min-width: 600px) {
	//   column-count: 3;
	// }

	// @media screen and (min-width: 800px) {
	//   column-count: 4;
	// }

	// @media screen and (min-width: 1100px) {
	//   column-count: 5;
	// }
	&.c5 {
		column-count: 5;
	}
	&.c4 {
		column-count: 4;
	}
	&.c3 {
		column-count: 3;
	}
	&.c2 {
		column-count: 2;
	}
	&.c1 {
		column-count: 1;
	}
}

.item {
	box-sizing: border-box;
	break-inside: avoid;
	padding: 10px;
	counter-increment: item-counter;

	&__content {
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 220px;
		font-size: 40px;
		color: darken(@bg, 5%);
		background: currentColor;
		box-sizing: border-box;
		.setColorAndHover(@itemBg1);

		&:before {
			position: absolute;
			top: 0;
			left: 0;
			font-size: 13px;
			width: 2em;
			height: 2em;
			line-height: 2em;
			text-align: center;
			font-weight: bold;
			background-color: @counterBg;
			content: counter(item-counter);
		}

		&:after {
			color: darken(@bg, 10%);
			content: 'ಠ‿ಠ';
		}

		&--small {
			.setColorAndHover(@itemBg2);
			height: 100px;

			&:after {
				content: '♥◡♥';
			}
		}

		&--medium {
			.setColorAndHover(@itemBg3);
			height: 175px;

			&:after {
				content: '◔ᴗ◔';
			}
		}

		&--large {
			.setColorAndHover(@itemBg4);
			height: 230px;

			&:after {
				content: 'ಠ_๏';
			}
		}
	}
}
</style>
