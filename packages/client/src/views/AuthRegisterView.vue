<script setup lang="ts">
import { ref } from 'vue';

import AuthLayout from '@/layouts/AuthLayout.vue';
import { useAccountStore } from '@/stores/account';

const accountStore = useAccountStore();
const firstName = ref();
const lastName = ref();
const email = ref();
const password = ref();

async function register() {
  await accountStore.register({
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value,
    password: password.value,
  });
}
</script>

<template>
  <AuthLayout>
    <form class="vstack gap-3 register" @submit.prevent>
      <div>
        <h3>Register</h3>
      </div>

      <div v-if="accountStore.accountError" class="alert alert-danger">
        {{ accountStore.accountError }}
      </div>

      <div>
        <label for="firstName" class="form-label">First Name</label>
        <input type="text" class="form-control" id="firstName" v-model.trim="firstName">
      </div>

      <div>
        <label for="lastName" class="form-label">Last Name</label>
        <input type="text" class="form-control" id="lastName" v-model.trim="lastName">
      </div>

      <div>
        <label for="emailAddress" class="form-label">Email Address</label>
        <input type="email" class="form-control" id="emailAddress" v-model.trim="email">
      </div>

      <div>
        <label for="password" class="form-label">Password</label>
        <input type="password" class="form-control" id="password" v-model="password">
      </div>

      <div class="my-3 text-center">
        <button class="btn btn-primary" @click="register">Register</button>
      </div>

      <div class="text-center">
        <RouterLink :to="{ name: 'Login' }">Login</RouterLink>
      </div>
    </form>
  </AuthLayout>
</template>

<styles scoped lang="scss">
  .register {
    min-width: 300px;
  }
</styles>
