[![Gem Version](https://badge.fury.io/rb/timepiece.svg)](http://badge.fury.io/rb/timepiece)

# Timepiece

Timepiece is a Rails plugin providing a simple digital clock, accurate to your server's time and maintained by jQuery.

## Installation

1. Add Timepiece to your application's Gemfile

  ```ruby
  gem 'timepiece'
  ```

2. Require timepiece.js in app/assets/javascripts/application.js

  ```javascript
  //= require timepiece
  ```

Note: If you're using Turbolinks with your Rails project, you should also install jquery-turbolinks to ensure functionality is maintained between page loads.

## Usage

* Add a functional clock to your views

  ```erb
  <%= timepiece %>
  ```

* Pass a timezone paramater (Defaults to 'UTC')

  ```erb
  <%= timepiece('London') %>
  ```

* Show a 12 hour clock by specifying its `type:` explicitly

  ```erb
  <%= timepiece('London', type: '12') %>
  ```

### 12 Hour Clock Options

By default the 12 hour clock displays time without any leading character, in the format '1:23pm'. You can add either a zero, as present on the 24 hour clock, or a leading space character the size of a numerical digit - useful for keeping your clocks aligned. To achieve this, set the Timepiece's `lead:`

* To add a leading zero to hour values less than ten

  ```erb
  <%= timepiece('London', type: '12', lead: '0') %>
  ```

  or
  
  ```erb
  <%= timepiece('London', type: '12', lead: 'zero') %>
  ```

* To add a space character

  ```erb
  <%= timepiece('London', type: '12', lead: '_') %>
  ```

  or

  ```erb
  <%= timepiece('London', type: '12', lead: 'space') %>
  ```

You can apply your own styles to any part of the Timepiece clock. For instance, you can capitalize the AM/PM abbreviation by targeting the span with class 'timepiece-abbr'. By default, the abbreviations are displayed without punctuation. To add punctuation, you can specify it with the `abbr_sep:` option.

* Add punctuation to am/pm abbreviation

  ```erb
  <%= timepiece('London', type: '12', abbr_sep: '.') %>
  ```

## Timer

It is now also possible to make use of a basic timer. To start a count from `Time.now`, simply include `timer` in your Rails projects.

* The helper also takes a time object as a parameter, for example:

  ```erb
  <%= timer(User.first.created_at) %>
  ```
