[![Gem Version](https://badge.fury.io/rb/timepiece.svg)](http://badge.fury.io/rb/timepiece)

## Timepiece

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

## Usage

* Add a functional clock to your views

  ```erb
  <%= timepiece %>
  ```

* Pass a timezone paramater (Defaults to 'UTC')

  ```erb
  <%= timepiece('London') %>
  ```

* Show a 12 hour clock by specifying it explicitly

  ```erb
  <%= timepiece('London', '12') %>
  ```

By default the 12 hour clock displays time without any leading character, in the format '1:23pm'. You can add either a zero, as present on the 24 hour clock, or a leading space character the size of a numerical digit - useful for keeping your clocks aligned.

* To add a leading zero to hour values less than ten

  ```erb
  <%= timepiece('London', '12', '0') %>
  ```

  or
  
  ```erb
  <%= timepiece('London', '12', 'zero') %>
  ```

* To add a space character

  ```erb
  <%= timepiece('London', '12', '_') %>
  ```

  or

  ```erb
  <%= timepiece('London', '12', 'space') %>
  ```