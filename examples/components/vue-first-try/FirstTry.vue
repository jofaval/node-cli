<template>
  <div class="first-try__container">
    <div class="first-try">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
export default {
  data() {
    return {
      foo: "bar",
    };
  },
  components: {},
};
</script>

<style lang="scss" scoped>
.first-try {
  &__container {
  }
}
</style>
