Vue.component('joke-footer-2',{
	props: ['year','name'],
	template: `<footer class="muted" style="text-align:center">
		   &copy; {{ year }} {{ name }}
		   </footer>`
});
Vue.component('result-display',{
	props: ['response'],
	template: `<ul>
        <li v-for="item in response">
            {{ item }}
        </li>
    </ul>`
});
Vue.component('result-video',{
    props: ['url'],
    template: `<iframe width="640" height="480" v-bind:src="url"></iframe>`
});