## Timepiece

Timepiece is a Rails plugin providing a simple digital clock, accurate to your server's time and maintained by jQuery.

## Installation

1. Add Timepiece to your application's Gemfile

	gem 'timepiece'

2. Require timpiece in app/assets/javascripts/application.js

	//= require timepiece

## Usage

* Add a functional clock to your views

	<%= timepiece %>

* Pass a timezone paramater (Defaults to 'UTC')

	<%= timepiece('London') %>

* Timepiece will automatically generate a digital clock and keep it updated.