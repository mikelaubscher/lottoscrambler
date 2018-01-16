// run() called when the page is loaded
function run() {
    let rows = document.querySelector('input');
    let table = document.querySelector('table');
    rows.focus();
    rows.addEventListener('keyup', function(event) {
        if (event.defaultPrevented) {
            return; // do nothing if event already processed
        } else if (event.key === 'Enter') {
            table.innerHTML = '';
            table.setAttribute('style', 'display:none;');
            generateRows(rows.value);
            rows.value = '';
        }
    });
}

// generateRows() takes the number of rows requested, generates them and displays them below
function generateRows(rows) {
    let numbers = [];
    let table = document.querySelector('table');
    for (i = 0; i < 52; i++) {
        numbers[i] = i + 1;
    }
    let shuffledNumbers = shuffleArray(numbers.slice(0));
    while (rows > 0) {
        let row = [];
        for (i = 0; i < 6; i++) {
            if (shuffledNumbers.length === 0) {
                shuffledNumbers = shuffleArray(numbers.slice(0));
            }
            row.push(shuffledNumbers.pop());
        }
        row.sort(function(a, b) {
            return a - b;
        });
        let newTR = document.createElement('tr');
        for (i = 0; i < row.length; i++) {
            let newTD = document.createElement('td');
            newTD.innerHTML = row[i];
            newTR.appendChild(newTD);
        }
        table.appendChild(newTR);
        rows--;
    }
    table.removeAttribute('style', 'display:none;');
};

// shuffleArray() randomises an ordered array of all available lotto numbers and returns it
function shuffleArray(array) {
    let currentIndex = array.length, tempValue, randomIndex;

    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        tempValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = tempValue;
    }

    return array;
};

// in case document is already rendered
if (document.readyState != 'loading') run();
// modern browsers
else if (document.addEventListener) 
    document.addEventListener('DOMContentLoaded', run());
// IE <= 8
else document.attachEvent('onReadyStateChange', function() {
    if (document.readyState == 'complete') run();
});
