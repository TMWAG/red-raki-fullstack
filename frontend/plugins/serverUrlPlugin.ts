export default defineNuxtPlugin((nuxtApp) => {
  return {
    provide: {
      backendUrl: () => {
        if (process.server) {
          return useRuntimeConfig().public.container;
        } else {
          return useRuntimeConfig().public.apiUrl;
        };
      },
    },
  };
});