/* @refresh reload */
import messages from '@intlify/unplugin-vue-i18n/messages';
import PrimeVue from "primevue/config";
import 'primevue/resources/themes/lara-light-blue/theme.css';
import { createApp } from 'vue';
import { createI18n } from "vue-i18n";
import { createRouter, createWebHistory } from 'vue-router/auto';
import App from './app.vue';
import './assets/styles.scss';

const i18n = createI18n({
    locale: "zh",
    messages
});

const app = createApp(App);
app.use(createRouter({
    history: createWebHistory()
}));
app.use(i18n);
app.use(PrimeVue, {
    ripple: true
});

app.mount("#root");