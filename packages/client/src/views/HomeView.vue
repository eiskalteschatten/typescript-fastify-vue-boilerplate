<script setup lang="ts">
import MainLayout from '@/layouts/MainLayout.vue';
import { useAccountStore } from '@/stores/account';

// TODO: move this to a toolbar or somewhere that makes sense
async function logout() {
  const accountStore = useAccountStore();
  await accountStore.logout();
}

</script>

<template>
  <MainLayout>
    Homepage

    <button @click="logout">Log out</button>
  </MainLayout>
</template>
