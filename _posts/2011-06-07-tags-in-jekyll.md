---
layout: post
tags:
- jekyll
- code
summary: A quick overview of adding tags to a Jekyll-powered blog.
---

<div class="update_box">
<p><strong>Update:</strong> This won't work if you're using Github pages to serve up your blog, as <a href="https://github.com/mojombo/jekyll/issues/325">Github disables plugins.</a> You can still generate the site locally, commit it to your repo, and Github will serve it up. (That's what I'm doing here.)</p>
</div>

When I decided to convert my blog over to Jekyll, I was pretty excited about it. It seemed to offer the right balance between power and simplicity.

I realized pretty soon, though, that one of the main features I wanted to implement -- tagging -- isn't well-supported in Jekyll.

I figured out how to get it working, though, and wanted to share what I came up with.

## The Problem

I shouldn't say that Jekyll doesn't support tagging. It does. In the sense that you can add tags to a post.

But one of the necessary pages on a blog with tags is the tag archive page, where the blog automatically collects all posts tagged with "rails" or "experiments" or "recipes" or whatever.

For some reason, Jekyll doesn't automatically produce those pages.

## The Process

I looked at a number of different blogs, and at the source code for a number of different Jekyll-powered blogs. I also poked around at Stack Overflow and Google Groups. They were useful in that they pointed me in the right direction. But all assumed more familiarity with Jekyll than I have, or they had some other issue that prevented my "getting it".

Eventually, I figured out how to make it work, mainly by abusing some "Categories in Jekyll" code that others had put online. My approach ended up being almost identical to some code I found at <http://brizzled.clapper.org/id/105/index.html>. In fact, I might have inadvertently lifted his code wholesale.

But nowhere in my escapades of ignorance did I find anyone who had written up an explanation of exactly what to do, where. So here you go.

## The Solution

Jekyll recognizes tags out of the box. In your post's <abbr>YAML</abbr> frontmatter, add tags like this:

    tags:
    - jekyll
    - code

That sets up the post to have tags. To get the tags pulled onto a page, create two files:

    _layouts/tag_index.html

and

    _plugins/_tag_gen.rb

You probably already have a layouts directory, but you might need to add the plugins one. The tag_index.html file is necessary for the tag_gen.rb script to actually run.

In the tag_index file, put this:

    ---
    layout: default
    ---
    <h2 class="post_title">{{page.title}}</h2>
    <ul>
      {.% for post in site.posts %}
      {.% for tag in post.tags %}
      {.% if tag == page.tag %}
      <li class="archive_list">
        <time style="color:#666;font-size:11px;" datetime='{{post.date | date: "%Y-%m-%d"}}'>{{post.date | date: "%m/%d/%y"}}</time> <a class="archive_list_article_link" href='{{post.url}}'>{{post.title}}</a>
        <p class="summary">{{post.summary}}
        <ul class="tag_list">
          {% for tag in post.tags %}
          <li class="inline archive_list"><a class="tag_list_link" href="/tag/{{ tag }}">{{ tag }}</a></li>
          {% endfor %}
        </ul>
      </li>
      {.% endif %}
      {.% endfor %}
      {.% endfor %}
    </ul>

*Note: In some of the lines up there, it has a "\{.%" ... get rid of that period between the curly bracket and the percent sign.*

**What that does:** When this page is created (more on that in a sec), it'll have a specific tag assigned to it. That is, multiple pages will be created, each with their own official tag. This goes through every post in the site, and if the post has a tag that matches the tag for the page that's being generated, the post is then listed, along with its publication date and summary. Obviously, if your posts don't include a summary, you can leave that line off. Or, if there's some other bit of metadata you want to include, you can add it into the layout.

In the tag_gen file. put this:

    module Jekyll
      class TagIndex < Page
        def initialize(site, base, dir, tag)
          @site = site
          @base = base
          @dir = dir
          @name = 'index.html'
          self.process(@name)
          self.read_yaml(File.join(base, '_layouts'), 'tag_index.html')
          self.data['tag'] = tag
          tag_title_prefix = site.config['tag_title_prefix'] || 'Posts Tagged &ldquo;'
          tag_title_suffix = site.config['tag_title_suffix'] || '&rdquo;'
          self.data['title'] = "#{tag_title_prefix}#{tag}#{tag_title_suffix}"
        end
      end
      class TagGenerator < Generator
        safe true
        def generate(site)
          if site.layouts.key? 'tag_index'
            dir = site.config['tag_dir'] || 'tag'
            site.tags.keys.each do |tag|
              write_tag_index(site, File.join(dir, tag), tag)
            end
          end
        end
        def write_tag_index(site, dir, tag)
          index = TagIndex.new(site, site.source, dir, tag)
          index.render(site.layouts, site.site_payload)
          index.write(site.dest)
          site.pages << index
        end
      end
  	end

**What that does:** Essentially, it creates a directory (folder) for each tag in your blog, and creates an index.html file in it. In that index.html file, it plugs in that template we just set up a few minutes ago. For the page title, it'll combine the variables "tag_title_prefix" and "tag_title_suffix", flanking the tag itself.

## That's It

I'm still learning a lot about Jekyll, and the liquid templating system. But I thought this might be useful to some of you who are considering Jekyll, but for whom tags are a deal-breaker. My entire site is at <http://github.com/charliepark/charliepark.github.com>, so if you want to see how I'm using it (or any tweaks I've made since posting this), you can check them out there.