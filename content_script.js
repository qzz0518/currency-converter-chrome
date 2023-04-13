function createPopup() {
    const popup = document.createElement('div');
    popup.id = 'currency-converter-popup';
    popup.style.display = 'none';
    popup.style.position = 'fixed';
    popup.style.backgroundColor = '#e0f2ff';
    popup.style.border = '1px solid #ccc';
    popup.style.borderRadius = '4px';
    popup.style.padding = '10px';
    popup.style.zIndex = '9999';
    popup.innerHTML = 'Loading...';
    document.body.appendChild(popup);
}

function isCurrencyAmount(text) {
    const regex = /^\d{1,3}(?:,?\d{3})*(?:\.\d{2})?$/;
    return regex.test(text);
}

function wrapSelectionWithSpan() {
    const selection = window.getSelection();
    if (!selection.rangeCount) return;
    const range = selection.getRangeAt(0);

    if (!range.collapsed && isCurrencyAmount(selection.toString().trim())) {
        const span = document.createElement('span');
        span.className = 'currency-converter-wrapper';

        range.surroundContents(span);
        selection.removeAllRanges();
        selection.addRange(range);
        return span;
    }
}

function unwrapSpan(span) {
    const parent = span.parentNode;
    while (span.firstChild) {
        parent.insertBefore(span.firstChild, span);
    }
    parent.removeChild(span);
}

function showFloatingButton(span) {
    const button = document.createElement('button');
    button.className = 'currency-converter-button';
    button.style.position = 'absolute';
    button.style.backgroundColor = '#0074d9';
    button.style.border = 'none';
    button.style.color = '#fff';
    button.style.borderRadius = '50%';
    button.style.padding = '4px';
    button.style.width = '20px';
    button.style.height = '20px';
    button.style.cursor = 'pointer';
    button.style.zIndex = '9999';
    // button.innerHTML = '$';
    button.style.backgroundImage = 'url(data:image/jpeg;base64,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)';
    button.style.backgroundSize = 'cover';

    button.onclick = (event) => {
        event.stopPropagation();
        const parent = event.target.parentElement; // 获取父元素
        const amount = parseFloat(parent.textContent.replace(/,/g, '')); // 使用父元素
        parent.button = button; // 将button元素保存到父元素的一个属性中
        showPopup(amount, event.clientX, event.clientY);
    };

    button.onmouseup = (event) => {
        event.stopPropagation();
    };

    span.appendChild(button);
}


function processSelection() {
    wrapSelectionWithSpan();
    const spans = document.querySelectorAll('.currency-converter-wrapper');
    spans.forEach((span) => {
        if (span.childElementCount === 0) {
            showFloatingButton(span);
        }
    });
}

function removeFloatingButtons() {
    const spans = document.querySelectorAll('.currency-converter-wrapper');
    spans.forEach((span) => {
        if (span.childElementCount > 0) {
            const button = span.querySelector('.currency-converter-button');
            if (button) {
                button.remove();
                delete span.button; // 从span的属性中删除button元素
            }
        }
        unwrapSpan(span);
    });
    hidePopup();
}



createPopup();

document.addEventListener('mouseup', () => {
    setTimeout(() => {
        removeFloatingButtons();
        processSelection();
    }, 0);
});

document.addEventListener('click', (event) => {
    if (event.target.className !== 'currency-converter-button') {
        removeFloatingButtons();
    }
});
function showPopup(selectedAmount, x, y) {
    const popup = document.getElementById('currency-converter-popup');
    popup.style.left = `${x}px`;
    popup.style.top = `${y}px`;
    popup.style.display = 'block';
    popup.style.backgroundColor = '#ffffff';
    popup.style.color = '#000000';

    // Use your desired API key and base URL
    let apiURL = `https://api.exchangerate-api.com/v4/latest/USD`;

    fetch(apiURL)
        .then((response) => response.json())
        .then((data) => {
            let usdToJpy = (selectedAmount * data.rates.JPY).toFixed(2);
            let usdToCny = (selectedAmount * data.rates.CNY).toFixed(2);
            let jpyToUsd = (selectedAmount / data.rates.JPY).toFixed(2);
            let jpyToCny = (selectedAmount * (data.rates.CNY / data.rates.JPY)).toFixed(2);
            let cnyToUsd = (selectedAmount / data.rates.CNY).toFixed(2);
            let cnyToJpy = (selectedAmount * (data.rates.JPY / data.rates.CNY)).toFixed(2);

            let resultsHTML = `
        <div><span>${selectedAmount} USD</span> to JPY: ${usdToJpy}</div>
        <div><span>${selectedAmount} USD</span> to CNY: ${usdToCny}</div>
        <div><span>${selectedAmount} JPY</span> to USD: ${jpyToUsd}</div>
        <div><span>${selectedAmount} JPY</span> to CNY: ${jpyToCny}</div>
        <div><span>${selectedAmount} CNY</span> to USD: ${cnyToUsd}</div>
        <div><span>${selectedAmount} CNY</span> to JPY: ${cnyToJpy}</div>
      `;

            popup.innerHTML = resultsHTML;
        })
        .catch((error) => {
            popup.innerHTML = 'Error fetching data';
        });
}
function hidePopup() {
    const popup = document.getElementById('currency-converter-popup');
    popup.style.display = 'none';
}
