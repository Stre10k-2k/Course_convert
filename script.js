const fromSelect = document.getElementById("fromselect");
const toSelect = document.getElementById("toselect");
const convertBtn = document.getElementById("convertbtn");
const valueInput = document.getElementById("input");
const result = document.getElementById("result");
const url = `https://open.er-api.com/v6/latest/USD`;

async function addOptions() {
    try {
        const res = await fetch(url);
        const data = await res.json();
        const codes = Object.keys(data.rates).sort();
        
        if(!data){
            alert(`There's an Error: ${error}`);
            return;
        }

        for (const c of codes){
            fromSelect.add(new Option(c, c));
            toSelect.add(new Option(c, c));
        }

    } catch (error) {
        alert(`There's an Error: ${error}`);
    }
}
addOptions();

convertBtn.onclick = async function() {
    
    const summ = parseFloat(valueInput.value) || 1;
    const fromValue = fromSelect.value;
    const toValue = toSelect.value;
    const convertUrl = `https://open.er-api.com/v6/latest/${encodeURIComponent(fromValue)}`;
    
    if(toValue === "#" || fromValue === "#"){
        result.textContent = `Choose currency`;
        return
    }

    const res = await fetch(convertUrl);
    const data = await res.json();

    if(toValue === fromValue){
        result.textContent = `You Choose the same currency`;
        return
    }

    try {
        
        const res = await fetch(convertUrl);
        const data = await res.json();

        const converting = (summ * data.rates[toValue]);

        result.textContent = `${valueInput.value} ${fromValue} = ${converting.toFixed(3)} ${toValue}`;
        valueInput.value = 1;

    } catch (error) {
        alert(`There's an Error: ${error}`);
    }
}