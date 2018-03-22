// define vue instance for the news of bitcoins
var bitcoin = new Vue({
    el: "#root",
    data: {
        bitcoinNews: [],
        historicalInfo: []
    },
});

//Call news API using axios and the method GET
axios.get("https://min-api.cryptocompare.com/data/news/providers")
    .then(function (response) {
    bitcoin.bitcoinNews = (response.data) //in case everyyhing is okay put the data in this array
})
.catch(function (error) {
  alert(error); //in case an error occured alert the error
});

// define vue instance for the prices
var bitcoinPrice = new Vue({
    el: ".bitcoinsPrices",
    data: {
        livePrice : []
    },
    // Fetches prices when the component is created.
    created(){
      axios.get("https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH&tsyms=USD,EUR")
      .then(function (response) {
            bitcoinPrice.livePrice = (response.data) //in case everyyhing is okay put the data in this array
        })
        .catch(function (error) {
        alert(error); //in case an error occured alert the error
      });
    }
});
// update prices every 1 minute
    setInterval(function () {
        axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH&tsyms=USD,EUR')
            .then(function(response){
            bitcoinPrice.livePrice = (response.data)
            });
        },60000);

//Chart
        axios.get("https://min-api.cryptocompare.com/data/histominute?fsym=XMR&tsym=GBP&limit=10")
        .then(function (response) {
            bitcoin.historicalInfo = (response.data) //in case everyyhing is okay put the data in this array
        })
        .catch(function (error) {
          alert(error); //in case an error occured alert the error
        });

        // create chart to display historical information
        var ctx = document.getElementById('myChart').getContext('2d');
        var chart = new Chart(ctx, {
            // The type of chart we want to create
            type: 'line',

            // The data for our dataset
            data: {
                labels: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                datasets: [{
                    label: "Bitcoin prices",
                    backgroundColor: '#ffc107',
                    borderColor: '#000',
                    data: [0, 10, 5, 2, 20, 30, 45],
                }]
            },

            // Configuration options go here
            options: {}
        });
