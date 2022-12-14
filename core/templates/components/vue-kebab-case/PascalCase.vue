<template>
  <div class="kebab-case__container">
    <div class="kebab-case">
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
.kebab-case {
  &__container {
  }
}
</style>
