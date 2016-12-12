#!/usr/bin/env node

var http = require('http')
var memdb = require('memdb')
var hypercore = require('hypercore')
var swarm = require('hyperdiscovery')
var hyperdriveHttp = require('hyperdrive-http')

var core = hypercore(memdb())
var feed = core.createFeed(process.argv[2])
var onrequest = hyperdriveHttp(feed)
var server = http.createServer()

swarm(feed)
server.listen(8000)
server.on('request', onrequest)

console.log('Visit http://localhost:8000 to see feed/metadata')
