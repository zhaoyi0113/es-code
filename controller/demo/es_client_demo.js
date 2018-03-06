const elasticsearch = require('elasticsearch');
const client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace'
});

client.ping({
  requestTimeout: 300,
}, function (error) {
  if (error) {
    console.error('elasticsearch cluster is down!');
  } else {
    console.log('All is well');
  }
});

client.cat.indices({h: ['index']}, (err, res) => {
	console.log('get indices ', err, res);
});

client.search({index: 'career_dev', body: {query: {'match_all':{}}}}, (err, res) => {
	console.log('query data ', res);
});

client.count({index:'career_dev'}, (err, res) => {
	console.log('index count ', res);
});
