const fieldText = document.querySelector('.field');
const submit = document.getElementById('submit');
const copy = document.getElementById('copy');
const clear = document.getElementById('clear');
const copied = document.querySelector('.copied');
const selector = document.querySelector('.select');

function copiedNoActive() {
    copied.classList.remove('active');
}

function wrap(string, symbol1, symbol2) {
    return symbol1 + string + symbol2;
}

submit.addEventListener('click', function() {
    let selectedEmoji = selector.options[selector.selectedIndex].value;
    let text = fieldText.value.split('\n');
    let result;
    for (let i = 0; i < text.length; i++) {
        if ((i >= 2) && (i % 2 == 0))  {
           text[i] = wrap(text[i], selectedEmoji + "[", "]")
        }
        else if (i >= 3){
            text[i] = wrap(text[i], "(", ")") + '\n\n';        
        }
        result += text[i];
    }
    console.log(result);

    const regex = /,(?=,)|,(?=[\[(])|(?<=[\[(]),/g;
    let symbolBeforeLine;
    if (selectedEmoji !== "") {
        symbolBeforeLine = /.(?=(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])\[)/g;
    }
    else {
        symbolBeforeLine = /.(?=\[)/;
    }
    
    let final = result.replace(regex, "");
    let symbol = final.match(symbolBeforeLine) + '\n\n';
    result = final.replace(symbolBeforeLine, symbol);
    result = result.substring(9);
    fieldText.value = result;
});

copy.addEventListener('click', function() {
    fieldText.select();
    fieldText.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(fieldText.value);
    fieldText.selectionStart = fieldText.selectionEnd = -1;
    copied.classList.add('active');
    setTimeout(copiedNoActive, 1000);
});

clear.addEventListener('click', function() {
    fieldText.value = "";
});