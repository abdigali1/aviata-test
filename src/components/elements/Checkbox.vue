<template>
  <label class="container">
    <input type="checkbox" :value="passedValue" v-model="checked">
    <span class="checkmark"></span>
    <p class="label" v-text="label"></p>
  </label>
</template>

<script>
export default {
  name: 'Checkbox',
  props: ['label', 'value', 'passedValue'],
  data() {
    return {
      
    } 
  },
  computed: {
    checked: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/_typography";
@import "@/assets/styles/_colors";

.container {
  position: relative;
  padding-left: 24px;
  cursor: pointer;
  user-select: none;
  display: flex;
  align-items: center;
  height: 32px;
}

.container input {
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
  height: 0;
  width: 0;
}

.checkmark {
  position: absolute;
  top: 50%; margin-top: -6px;
  left: 0;
  height: 12px;
  width: 12px;
  background: #ffffff;
  border: 1px solid #b9b9b9;
  box-sizing: border-box;
  border-radius: 2px;
}

.container:hover input ~ .checkmark {
  background-color: rgba(255, 255, 255, 0.6);
}

.container input:checked ~ .checkmark {
  background-color: #55bb06;
  border: 1px solid #55bb06;
}

.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

.container input:checked ~ .checkmark:after {
  display: block;
}

.container .checkmark:after {
  top: 1px;
  left: 1px;
  width: 7.95px;
  height: 100%;
  background-image: url('../../assets/icons/accept.svg');
  background-repeat: no-repeat;
  background-size: 100%;
}

.label {
  @include textMixin($w: 400, $fs: 12px, $lh: 16px, $c: $text-black);
}

@media (max-width: 480px) {
  
}

</style>