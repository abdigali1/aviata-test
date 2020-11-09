<template>
	<button class="" @click="handleClick()">{{ label }}</button>
</template>

<script>
export default {
  name: 'Button',
  props:{
    label:{ default: "" }
  },
  data() {
    return {
    }
  },
  methods: {
    handleClick(e){
      this.$emit('click', true)
    }
  }

}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/_typography";
@import "@/assets/styles/_colors";

button {
  background: $bg-primary-button-color;
  border-radius: 4px;
  padding: 7px 12.5px;
  border: none;

  @include textMixin($w: bold, $fs: 18px, $lh: 25px, $c: $text-white);
}
</style>