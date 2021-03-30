const startInput = document.getElementById("start");
const endInput = document.getElementById("end");
const currencyInput = document.getElementById("currency");
let start;
let end;
let currency = currencyInput.value;

const baseUrl = "http://api.coindesk.com/v1/bpi/historical/close.json";

startInput.onchange = (event) => {
  start = event.target.value;
  getHistorialData();
};

endInput.addEventListener("change", (event) => {
  end = event.target.value;
  getHistorialData();
});

currencyInput.onchange = (event) => {
  currency = event.target.value;
  bitcoinPriceTracker();
};

function getHistorialData() {
  if (!end || !start) {
    return;
  }
  const startDate = new Date(start);
  const endDate = new Date(end);

  if (endDate < startDate) {
    return `Go Home You're Drunk`;
  }

  axios
    .get(`${baseUrl}?start=${start}&end=${end}&currency=${currency}`)
    .then((axiosResponse2) => {
      const labels = Object.keys(axiosResponse2.data.bpi);
      const data = Object.values(axiosResponse2.data.bpi);
      drawChart(labels, data);
    });
}

function bitcoinPriceTracker() {
  axios.get(`${baseUrl}?currency=${currency}`).then((axiosResponse) => {
    console.log("axiosResponse:", axiosResponse.data);
    const labels = Object.keys(axiosResponse.data.bpi);
    const data = Object.values(axiosResponse.data.bpi);
    drawChart(labels, data);
  });
}

function drawChart(labels, data) {
  var ctx = document.getElementById("myChart").getContext("2d");
  var myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels,
      //  labels: ["An Egg", "Blue", "Yellow", "Green", "Purple", "Orange"],
      datasets: [
        {
          label: "# of Votes",
          data,
          //   data: [12, 19, 3, 5, 2, 3],
        },
      ],
    },
  });
}

bitcoinPriceTracker();

// if one input is not defined, we shouldnt make the call

// COMMENTING OUT FOR CLEANING OF OUR CODE
// axios.get(baseUrl).then((axiosResponse) => {
//   console.log("axiosResponse:", axiosResponse.data);
//   const labels = Object.keys(axiosResponse.data.bpi);
//   const data = Object.values(axiosResponse.data.bpi);
//   drawChart(labels, data);
// });

// function getCurrencyData() {
//   axios.get(`${baseUrl}?currency=${currency}`).then((axiosResponse3) => {
//     const labels = Object.keys(axiosResponse3.data.bpi);
//     const data = Object.values(axiosResponse3.data.bpi);
//     drawChart(labels, data);
//   });
// }
