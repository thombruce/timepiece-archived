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

* By default, Timepiece shows a 24 hour digital clock. You can show a 12 hour clock by specifying it explicitly.

  ```erb
  <%= timepiece('London', '12') %>
  ```

* Timepiece will automatically generate a digital clock and keep it updated.