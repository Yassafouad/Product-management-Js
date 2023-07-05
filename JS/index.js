let title = document.getElementById('title')
let price = document.getElementById('price')
let taxes = document.getElementById('taxes')
let ads = document.getElementById('ads')
let discount = document.getElementById('discount')
let total = document.getElementById('total')
let count = document.getElementById('count')
let category = document.getElementById('category')
let subment = document.getElementById('subment')

let mood = 'create';
let tmp;

function getTotal() {
    if (
        price.value != '') {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background = 'green';
    } else {
        total.innerHTML = '';
        total.style.background = 'rgba(251, 0, 0, 0.616)';


    }

}
let datapro;
if (localStorage.product != null) {
    datapro = JSON.parse(localStorage.product)

} else {
    datapro = [];
}

subment.onclick = function() {
    let newpro = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(),
    }
    if (title.value != '' && price.value != '' && category.value != '' && newpro.count < 101) {
        if (mood === 'create') {
            if (newpro.count > 1) {
                for (let i = 0; i < newpro.count; i++) {
                    datapro.push(newpro);

                }
            } else {
                datapro.push(newpro);

            }
        } else {
            datapro[tmp] = newpro;
            mood = 'create';
            subment.innerHTML = 'CREATE';
            count.style.display = 'block';
        }
        cleardata()

    }

    localStorage.setItem('product', JSON.stringify(datapro))

    showdata()
}

function cleardata() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
    total.style.background = 'rgba(251, 0, 0, 0.616)';


}

function showdata() {
    getTotal()
    let tabel = '';

    for (let i = 0; i < datapro.length; i++) {
        tabel += `
        <tr>
    <td> ${i+1} </td>
    <td> ${datapro[i].title} </td>
    <td> ${datapro[i].price}</td>
    <td>${datapro[i].taxes}</td>
    <td>${datapro[i].ads}</td>
    <td>${datapro[i].discount}</td>
    <td>${datapro[i].total}</td>
    <td>${datapro[i].category}</td>
    <td><button onclick ="updatedata (${i})" id="update">update</button></td>
    <td><button onclick ="deletedata (${i})" id="delete">delete</button></td>
</tr>
`
    }
    document.getElementById('tbody').innerHTML = tabel;
    let btndelete = document.getElementById('deleteAll');
    if (datapro.length > 0) {
        btndelete.innerHTML = `<button onclick = "deleteAll()" >DELETE ALL</button>`

    } else {
        btndelete.innerHTML = '';
    }
}
showdata()

function deletedata(i) {
    datapro.splice(i, 1);
    localStorage.product = JSON.stringify(datapro);
    showdata()

}

function deleteAll() {
    localStorage.clear()
    datapro.splice(0);
    showdata()
}

function updatedata(i) {
    title.value = datapro[i].title;
    price.value = datapro[i].price;
    taxes.value = datapro[i].taxes;
    ads.value = datapro[i].ads;
    discount.value = datapro[i].discount;
    getTotal()
    count.style.display = 'none';
    category.value = datapro[i].category;
    subment.innerHTML = 'UPDATE';
    mood = 'UPDATE';
    tmp = i;
    scroll({
        top: 0,
        behavior: "smooth"
    })
}

let searchmood = 'title';

function getsearchmood(id) {
    let search = document.getElementById('search');
    if (id == 'searchtitle') {
        searchmood = 'title';
        search.placeholder = 'SEARCH BY TITLE';
    } else {
        searchmood = 'category';
        search.placeholder = 'SEARCH BY CATEGORY';

    }
    search.focus()
    search.value = '';
    showdata()

}

function searchdata(value) {
    let tabel = '';
    if (searchmood = 'title') {

        for (let i = 0; i < datapro.length; i++) {
            if (datapro[i].title.includes(value.toLowerCase())) {
                tabel += `
                <tr>
            <td> ${i} </td>
            <td> ${datapro[i].title} </td>
            <td> ${datapro[i].price}</td>
            <td>${datapro[i].taxes}</td>
            <td>${datapro[i].ads}</td>
            <td>${datapro[i].discount}</td>
            <td>${datapro[i].total}</td>
            <td>${datapro[i].category}</td>
            <td><button onclick ="updatedata (${i})" id="update">update</button></td>
            <td><button onclick ="deletedata (${i})" id="delete">delete</button></td>
        </tr>
        `;
            } else {
                for (let i = 0; i < datapro.length; i++) {
                    if (datapro[i].category.includes(value.toLowerCase())) {
                        tabel += `
                        <tr>
                    <td> ${i} </td>
                    <td> ${datapro[i].title} </td>
                    <td> ${datapro[i].price}</td>
                    <td>${datapro[i].taxes}</td>
                    <td>${datapro[i].ads}</td>
                    <td>${datapro[i].discount}</td>
                    <td>${datapro[i].total}</td>
                    <td>${datapro[i].category}</td>
                    <td><button onclick ="updatedata (${i})" id="update">update</button></td>
                    <td><button onclick ="deletedata (${i})" id="delete">delete</button></td>
                </tr>
                `;
                    } else {

                    }
                }

            }
        }
    }
    document.getElementById('tbody').innerHTML = tabel;
}