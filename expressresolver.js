
const resolve = require('did-resolver')
const uportResolver = require('uport-did-resolver')
const muportResolver = require('muport-did-resolver')
const ethrResolver = require('ethr-did-resolver')
const ethResolver = require('eth-did-resolver')

const express = require('express')
const app = express()

const UportLite = require('uport-lite')
const config = require('./configuration')

let networks = {}
networks[config.id] = { 'registry': config.registry, 'rpcUrl': config.rpcUrl }
const uportLiteRegistry = new UportLite({ networks: networks, ipfsGw: config.ipfsGw })
console.log('Configured custom uport registry: ' + networks[config.id])

// Register resolvers
uportResolver(uportLiteRegistry)
muportResolver()
ethrResolver()
ethResolver()

app.get('/1.0/identifiers/*', function (req, res) {

  const url = req.url
  const regex = /\/1.0\/identifiers\/(did:.*)/
  const did = regex.exec(url)[1]

  console.log(did)

  resolve(did).then((doc) => {
    res.send(doc)
  })

})

var server = app.listen(8081, function () {
  console.log("Resolver app listening on port 8081...")
})

// Example DIDs
// did:muport:Qmbrpc3gKtapsL5k6nZuzYvoMQZwMup5qWvss1q4XuaRJd
// did:eth:0x3b0BC51Ab9De1e5B7B6E34E5b960285805C41736
// did:ethr:0x3b0BC51Ab9De1e5B7B6E34E5b960285805C41736
// did:uport:2omWsSGspY7zhxaG6uHyoGtcYxoGeeohQXz
