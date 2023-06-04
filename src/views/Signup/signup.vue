<script setup lang="ts"></script>

<template>
  <div class="flex min-h-full flex-1">
    <div
      class="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24"
    >
      <div class="mx-auto w-full max-w-sm lg:w-96">
        <div>
          <img
            class="h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2
            class="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900"
          >
            Create an account
          </h2>
          <p class="mt-2 text-sm leading-6 text-gray-500">
            Create an account to start creating your own chat bots
          </p>
        </div>

        <div class="mt-10">
          <div>
            <form class="space-y-6">
              <div>
                <label
                  for="email"
                  class="block text-sm font-medium leading-6 text-gray-900"
                  >Email address</label
                >
                <div class="mt-2">
                  <input
                    v-model="user.email"
                    id="email"
                    name="email"
                    type="email"
                    autocomplete="email"
                    required=""
                    class="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium leading-6 text-gray-900"
                  >First Name</label
                >
                <div class="mt-2">
                  <input
                    v-model="user.firstName"
                    type="text"
                    required=""
                    class="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium leading-6 text-gray-900"
                  >Last Name</label
                >
                <div class="mt-2">
                  <input
                    v-model="user.lastName"
                    type="text"
                    required=""
                    class="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label
                  for="password"
                  class="block text-sm font-medium leading-6 text-gray-900"
                  >Password</label
                >
                <div class="mt-2">
                  <input
                    v-model="user.password"
                    id="password"
                    name="password"
                    type="password"
                    autocomplete="current-password"
                    required=""
                    class="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <button
                  v-on:click="signup()"
                  type="button"
                  class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="relative hidden w-0 flex-1 lg:block">
      <img
        class="absolute inset-0 h-full w-full object-cover"
        src="https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
        alt=""
      />
    </div>
  </div>
</template>

<script lang="ts">
import supDawkApiClient from "@/utils/httpClients/supdawkApiClient";
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      user: {
        email: "",
        firstName: "",
        lastName: "",
        password: "",
      },
    };
  },
  methods: {
    ...mapActions(["loginUsernameEmail"]),
    async signup() {
      const { user } = this;
      const { email, password } = user;

      await supDawkApiClient.post(`/api/v1/authentication/signup`, user);

      this.loginUsernameEmail({
        email,
        password,
      }).then(() => {
        this.$router.push({ name: "dashboard" });
      });
    },
  },
};
</script>
