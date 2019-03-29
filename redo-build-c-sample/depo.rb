#!/usr/bin/env ruby
puts ARGF.first.gsub(/\.(h|c)\b/, '.o')
