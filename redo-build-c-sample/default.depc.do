redo-ifchange $2.dep
ruby -e "puts ARGF.first.gsub(/^.*:/, '')" $2.dep > $3
