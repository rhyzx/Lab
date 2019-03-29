redo-ifchange $2.depc
ruby -e "puts ARGF.first.gsub(/\.(h|c)\b/, '.o')" $2.depc > $3
