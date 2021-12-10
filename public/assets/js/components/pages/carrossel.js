const items = document.querySelector("#items");

// items.addEventListener("wheel", event => {
//
//         if(event.deltaY > 0) {
//             items.scrollBy(400, 0)
//         } else {
//             items.scrollBy(-400, 0)
//         }
//     })

var carrossel = 1;

var count = parseInt(items.dataset.count);

var n = 1;

setInterval(() => {
    chenge();
}, 5000)

function chenge() {
    if (n === 1) {
        ++carrossel;
        items.scrollBy(400, 0);
        if (count === carrossel) {
            n = -1;
        }
    } else if (n === -1) {
        --carrossel;
        items.scrollBy(-400, 0);
        if (carrossel === 1) {
            n = 1;
        }
    }
}