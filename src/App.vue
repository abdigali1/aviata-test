<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
@import "@/assets/styles/reset";
@import "@/assets/styles/_colors";
@import "@/assets/styles/_typography";

body {
  background-color: $bg-color;
  font-family: 'Open Sans';
  color: $text-black;
}
</style>
