<template>
  <div class="second-try__container">
    <div class="second-try">
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
.second-try {
  &__container {
  }
}
</style>
