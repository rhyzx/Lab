import http from 'http'

http.get('http://localhost:8000', (res) => {
  res.setEncoding('utf8')
  res.on('data', (chunk) => {
    console.log(`chunk: ${chunk}`)
  });
  res.on('end', () => {
    console.log('bye')
  })
})
