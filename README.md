## Timepiece

Timepiece is a Rails plugin providing a simple digital clock, accurate to your server's time and maintained by jQuery.

## Installation

1. Add Timepiece to your application's Gemfile

  ```ruby
  gem 'timepiece'
  ```

2. Require timpiece in app/assets/javascripts/application.js

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

* Timepiece will automatically generate a digital clock and keep it updated.