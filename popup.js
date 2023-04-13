document.getElementById('convert-button').addEventListener('click', function () {
    let amount = parseFloat(document.getElementById('input-amount').value.trim().replace(/,/g, ''));

    if (!isNaN(amount)) {
        document.getElementById('results').innerHTML = 'Loading...';

        // Use your desired API key and base URL
        let apiURL = `https://api.exchangerate-api.com/v4/latest/USD`;

        fetch(apiURL)
            .then((response) => response.json())
            .then((data) => {
                let usdToJpy = (amount * data.rates.JPY).toFixed(2);
                let usdToCny = (amount * data.rates.CNY).toFixed(2);
                let jpyToUsd = (amount / data.rates.JPY).toFixed(2);
                let jpyToCny = (amount * (data.rates.CNY / data.rates.JPY)).toFixed(2);
                let cnyToUsd = (amount / data.rates.CNY).toFixed(2);
                let cnyToJpy = (amount * (data.rates.JPY / data.rates.CNY)).toFixed(2);

                let resultsHTML = `
          <div class="conversion"><span>${amount} USD</span> to JPY: ${usdToJpy}</div>
          <div class="conversion"><span>${amount} USD</span> to CNY: ${usdToCny}</div>
          <div class="conversion"><span>${amount} JPY</span> to USD: ${jpyToUsd}</div>
          <div class="conversion"><span>${amount} JPY</span> to CNY: ${jpyToCny}</div>
          <div class="conversion"><span>${amount} CNY</span> to USD: ${cnyToUsd}</div>
          <div class="conversion"><span>${amount} CNY</span> to JPY: ${cnyToJpy}</div>
        `;

                document.getElementById('results').innerHTML = resultsHTML;
            })
            .catch((error) => {
                document.getElementById('results').innerHTML = 'Error fetching data';
            });
    } else {
        document.getElementById('results').innerHTML = 'Please enter a valid amount';
    }
});
