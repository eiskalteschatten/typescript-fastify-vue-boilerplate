<script setup lang="ts">
import { ref } from 'vue';

import AuthLayout from '@/layouts/AuthLayout.vue';
import { useAccountStore } from '@/stores/account';

const accountStore = useAccountStore();
const email = ref();
const password = ref();

async function login() {
  await accountStore.login({
    email: email.value,
    password: password.value,
  });
}
</script>

<template>
  <AuthLayout>
    <form class="vstack gap-3 login" @submit.prevent>
      <div>
        <h3>Login</h3>
      </div>

      <div v-if="accountStore.accountError" class="alert alert-danger">
        {{ accountStore.accountError }}
      </div>

      <div>
        <label for="emailAddress" class="form-label">Email Address</label>
        <input type="email" class="form-control" id="emailAddress" placeholder="name@example.com" v-model.trim="email">
      </div>

      <div>
        <label for="password" class="form-label">Password</label>
        <input type="password" class="form-control" id="password" v-model="password">
      </div>

      <div class="my-3 text-center">
        <button class="btn btn-primary" @click="login">Log In</button>
      </div>

      <div class="text-center">
        <RouterLink :to="{ name: 'Register' }">Register</RouterLink>
      </div>
    </form>
  </AuthLayout>
</template>

<styles scoped lang="scss">
  .login {
    min-width: 300px;
  }
</styles>
