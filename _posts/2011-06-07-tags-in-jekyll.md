---
layout: post
tags:
- jekyll
- code
summary: A quick overview of adding tags to a Jekyll-powered blog.
---

When I decided to convert my blog over to Jekyll, I was pretty excited about it. It seemed to offer the right balance between power and simplicity.

I realized pretty soon, though, that one of the main features I wanted to implement -- tagging -- isn't well-supported in Jekyll.

I figured out how to get it working, though, and wanted to share what I came up with.

## The Problem

I shouldn't say that Jekyll doesn't support tagging. It does. In the sense that you can add tags to a post.

But one of the necessary pages on a blog with tags is the tag archive page, where the blog automatically collects all posts tagged with "rails" or "experiments" or "recipes" or whatever.

For some reason, Jekyll doesn't automatically produce those pages.

## The Process

I looked at a number of different blogs, and at the source code for a number of different Jekyll-powered blogs. I also poked around at Stack Overflow and Google Groups. They were useful in that they pointed me in the right direction. But all assumed more familiarity with Jekyll than I have, or they had some other issue that prevented my "getting it".

Eventually, I figured out how to make it work, mainly by abusing some "Categories in Jekyll" code that others had put online. My approach ended up being almost identical to some code -- http://brizzled.clapper.org/id/105/index.html

## The Solution

