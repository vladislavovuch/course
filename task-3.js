
export default function filterTable(tbody, filters) {
   // let inputs = document.querySelectorAll("th input");
    // console.log(inputs);
    // console.log(inputs[0].attributes['data-field'].nodeValue); // значення в атрибуті data-field
    // console.dir(tableBody);
    for (let i = 0, j = 0; i < tbody.children.length; i++) {
        // альбом
        // if (!filters.hasOwnProperty("album") && !filters.hasOwnProperty("performer") && !filters.hasOwnProperty("genre") && !filters.hasOwnProperty("year"))
        //     fl = 0;
        let curStr = tbody.children[i];
        let fl = 0;
        if (filters.hasOwnProperty("album")) {           
            if (!subStr(curStr.children[1].innerText, filters.album)) {
                curStr.classList.add("d-none");
                fl = 1;
            }
        }
        // виконавець
        if (filters.hasOwnProperty("performer")) {
            if (!subStr(curStr.children[2].innerText, filters.performer)) {
                curStr.classList.add("d-none");
                fl = 1;
            }
        }
        // жанр
        if (filters.hasOwnProperty("genre")) {
            if (!subStr(curStr.children[3].innerText, filters.genre)) {
                curStr.classList.add("d-none");
                fl = 1;
            }
        }
        // рік
        console.dir(curStr);
        if (filters.hasOwnProperty("year")) {
            if (!subStr(curStr.children[4].innerText, filters.year)) {
                curStr.classList.add("d-none");
                fl = 1;
            }
        }

        if (!fl) {
            curStr.classList.remove("d-none");
            if (j % 2 !== 0) {
                curStr.classList.add("table-row-even");
            }
            else {
                curStr.classList.remove("table-row-even");
            }
            j++;
            // змінюємо номер по порядку
            curStr.children[0].innerText = j;
        }
      
    }
}

function subStr(str,value) {
    if (str.indexOf(value) === -1) {
        return false;
    }
    return true;
}
