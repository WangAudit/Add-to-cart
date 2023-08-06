import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import {getDatabase, ref, push, onValue, remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://realtime-database-49986-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")

const inputField = document.getElementById("input-field")
const addBtn = document.getElementById("add-button")
const shoppingList = document.getElementById("shopping-list")

addBtn.addEventListener("click", function() {
    let inputValue = inputField.value

    push(shoppingListInDB, inputValue)

    clearInput()
})

onValue(shoppingListInDB, function(snapshot){

    if (snapshot.exists()) {
        let itemsArraay = Object.entries(snapshot.val())
        clearShoppingList()
    
        for (let i = 0; i < itemsArraay.length; i++) {
            let currentItem = itemsArraay[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]

            addShoppingList(currentItem)
        }
    } else {
        shoppingList.innerHTML = "No items here... yet"
    }
    
    
})

function clearInput() {
    inputField.value = ""
}

function clearShoppingList() {
    shoppingList.innerHTML = ""
}

function addShoppingList(product) {
    // shoppingList.innerHTML += `<li>${product}</li>`
    let itemID = product[0]
    let itemValue = product[1]

    let newEl = document.createElement("li")
    newEl.textContent = itemValue

    newEl.addEventListener("click", function() {
        let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`)
        remove(exactLocationOfItemInDB)
    })
    
    shoppingList.append(newEl)
}
