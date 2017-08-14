import Vue from 'vue';
import App from './App.vue';
import backManager from './back_manager.vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import VueCookies from 'vue-cookies';
import VueSession from 'vue-session';
import contentList from 'components/content_list/content_list.vue';
import home from 'components/admin_home/admin_home.vue';
import adminArticle from 'components/admin_article/admin_article.vue';
import adminWords from 'components/admin_words/admin_words.vue';
import adminComment from 'components/admin_comment/admin_comment.vue';
import adminEssay from 'components/admin_essay/admin_essay.vue';
import adminUser from 'components/admin_user/admin_user.vue';
import submitArticle from 'components/submit_article/submit_article.vue';
import submitEssay from 'components/submit_essay/submit_essay.vue';
import specific from 'components/specific/specific.vue';
import search from 'components/search_result/search_result.vue';
import labelSearch from 'components/label_search/label_search.vue';
import essay from 'components/essay/essay.vue';
import words from 'components/words/words.vue';

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(VueCookies);
Vue.use(VueSession);

let router = '';
let currentHash = window.location.hash;
if (currentHash.indexOf('admin') <= -1) {
    router = new VueRouter({
        routes: [
            { path: '', component: contentList },
            { path: '/article/:id', component: contentList },
            { path: '/essay', component: essay },
            { path: '/words', component: words },
            { path: '/specific_content/:id', component: specific },
            { path: '/search/', component: search },
            { path: '/label/search/', component: labelSearch }
        ],
        linkActiveClass: 'active'
    });
    new Vue({
        router,
        render: h => h(App)
    }).$mount('#app');
} else {
    router = new VueRouter({
        routes: [
            { path: '/admin/home', component: home },
            { path: '/admin/article', component: adminArticle },
            { path: '/admin/words', component: adminWords },
            { path: '/admin/comment', component: adminComment },
            { path: '/admin/essay', component: adminEssay },
            { path: '/admin/user', component: adminUser },
            { path: '/admin/release/article', component: submitArticle },
            { path: '/admin/release/essay', component: submitEssay }
        ],
        linkActiveClass: 'active'
    });
    new Vue({
        router,
        render: h => h(backManager)
    }).$mount('#back-manager');
}