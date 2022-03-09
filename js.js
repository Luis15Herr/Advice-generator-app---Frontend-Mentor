const { reactive, createApp, ref, computed, watch, onMounted } = Vue;

Vue.createApp({
  data() {
    return {
      message: "Hello Vue!",
    };
  },
  setup() {
    let advice = ref({});
    let loading = ref(Boolean);
    loading.value = true;

    function randomAdvice() {
      loading.value = true;
      setTimeout(function () {
        fetch("https://api.adviceslip.com/advice")
          .then((data) => data.json())
          .then((response) => {
            loading.value = false;
            return (advice.value = response.slip);
          });
      }, 1000);
    }

    onMounted(() => randomAdvice());

    return { advice, randomAdvice, loading };
  },
}).mount("#app");