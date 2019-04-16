Vue.component('joke-footer-2',{
	props: ['year','name'],
	template: `<footer class="muted" style="text-align:center">
		   &copy; {{ year }} {{ name }}
		   </footer>`
});
Vue.component('result-display',{
	props: ['response'],
	template: `<p>{{response}}</p>`
});