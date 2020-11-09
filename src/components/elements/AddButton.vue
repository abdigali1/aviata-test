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
  background: $bg-secondary-button-color;
  border-radius: 2px;
  padding: 3px 12px;
  border: none;

  @include textMixin($w: 600, $fs: 12px, $lh: 16px, $c: $text-blue);
}
</style>