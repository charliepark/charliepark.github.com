<h2 class="post_title">Archives</h2>
<ul>
	{% for post in site.posts %}
	<li class="archive_list">
		<time style="color:#666;font-size:11px;" datetime='{{post.date | date: "%Y-%m-%d"}}'>{{post.date | date: "%m/%d/%y"}}</time> <a class="archive_list_article_link" href='{{post.url}}'>{{post.title}}</a>
		<p class="summary">{{post.summary}}
		<ul class="tag_list">
			{% for tag in post.tags %}
			<li class="inline archive_list"><a class="tag_list_link" href="/tag/{{ tag }}">{{ tag }}</a></li>
			{% endfor %}
		</ul>
	</li>
	{% endfor %}
</ul>
<div style="display:none">
<h2 class="post_title">Tags</h2>
<ul>
{% for tag in site.tags %}
	<li><a href="/tag/{{ tag[0] }}">{{ tag[0] }}</a></li>
{% endfor %}
</ul>
</div>