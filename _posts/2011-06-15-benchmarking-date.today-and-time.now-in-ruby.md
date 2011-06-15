---
layout: post
title: Benchmarking Date.today and Time.now in Ruby
summary: Time.now is much faster than Date.today.
tags:
- ruby
- code
---

There are often times when I can handle a programming issue in one of two (or more) ways. Dealing with Time / Date objects is one of those situations.

For example, if you want to know what day today is, you can either fetch Date.today.day or Time.now.day.

In my head, Date is a much simpler concept than Time. After all, Time deals with things like milliseconds and Epochs and things like that, where Date ... well, I woke up this morning, and it was today's date. And when I get up tomorrow, it'll be tomorrow's date. "Date" seems much more tangible.

I was curious, though, to know if there was a difference in how quickly Ruby could process the two. So I ran a test.

### The First Test

I was in a Rails app, so I fired up script/console, and added the following code:

    require 'benchmark'

    Benchmark.ms { 1000.times { puts Time.now } }

    Benchmark.ms { 1000.times { puts Date.today } }

### The Results

What I found was really interesting.

I ran the test a couple of times, and the average processing time for Time.now was 104 ms. The average processing time for Date.today was 251 ms.

That means it took Date.today about two and a half times as long to get processed than Time.now.

### The Second Test

I was curious to see if those results would hold if I ran a more complicated test. So I made the processing a tiny bit trickier:

    def month_name_t(month = Time.now.month)
      Date::MONTHNAMES[month]
    end
    Benchmark.ms { 1000.times { month_name_t } }

    def month_name_d(month = Date.today.month)
      Date::MONTHNAMES[month]
    end
    Benchmark.ms { 1000.times { month_name_d } }

### More Results

This time around, the difference was even more pronounced.

On average, month_name_t (Time.now) took 2 ms. And month_name_d (Date.today) took 80 ms.

So when we made the function just a bit more complex, it increased the processing time dramatically: **Date.today took 40 times as long to process as Time.now.**

### The Conclusion

**When you're processing Times and Dates in your app, and you don't *need* to use the Date object for some reason, use Time.**