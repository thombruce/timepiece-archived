$:.push File.expand_path("../lib", __FILE__)

# Maintain your gem's version:
require "timepiece/version"

# Describe your gem and declare its dependencies:
Gem::Specification.new do |s|
  s.name        = "timepiece"
  s.version     = Timepiece::VERSION
  s.authors     = ["Thom Bruce"]
  s.email       = ["thom@thombruce.com"]
  s.homepage    = "http://thombruce.com/"
  s.summary     = "Provides a digital clock for Rails applications."
  s.description = "Timepiece provides an accurate digital clock to your Rails applications, refreshed by a jQuery script."

  s.files = Dir["{app,config,db,lib}/**/*", "MIT-LICENSE", "Rakefile", "README.rdoc"]
  s.test_files = Dir["test/**/*"]

  s.add_dependency "rails", "~> 4.0.9"
  s.add_dependency "jquery-rails"

  s.add_development_dependency "sqlite3"
end
