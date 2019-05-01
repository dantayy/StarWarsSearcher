Vue.component('joke-footer-2',{
	props: ['year','name'],
	template: `<footer class="muted">
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
    template: `<div class="embed-responsive embed-responsive-16by9">
  <iframe class="embed-responsive-item" v-bind:src="url" allow="autoplay; encrypted-media" allowfullscreen></iframe>
</div>`
});