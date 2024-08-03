<template>
	<div class="page">
		<div class="nav">
			<span>指令列表</span>
		</div>
		<a-typography-paragraph v-model:content="editableStr" editable copyable>
		</a-typography-paragraph>
	</div>
</template>
<script setup name="Command">
import { ref } from 'vue';
let editableStr = ref("Hide Copy tooltips.")
</script>
<style lang="scss" scoped>
.page {
	padding: 0 10px;

	.nav {
		margin: 0 0 10px 0;
	}
}
</style>