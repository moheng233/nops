/* @refresh reload */
import messages from '@intlify/unplugin-vue-i18n/messages';
import { createApp } from 'vue';
import { createI18n } from "vue-i18n";
import { createPinia } from "pinia";
import { createRouter, createWebHistory } from 'vue-router/auto';
import App from './app.vue';
import './assets/index.css';

export const i18n = createI18n({
    locale: "zh-CN",
    messages
});

export const pinia = createPinia();

const app = createApp(App);
app.use(createRouter({
    history: createWebHistory()
}));
app.use(pinia);
app.use(i18n);

app.mount("#root");
