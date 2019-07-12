//This is where we prep our work by store variable and pre-determined data. This section below will be crucial for when we actually start coding and incorpating all the code together.

'use strict';

const Store = [
  {id:cuid(), name:"apple", checked: false},
  {id:cuid(), name:"oranges", checked: false},
  {id:cuid(), name:"milk", checked: true},
  {id:cuid(), name:"bread", checked: false},
];

/************************************************************************************** */
//This code below is for all the buttons and input nesscessary for the program to work. Based on the description of what each function is, should be pretty straight forward to understand so far.

function generateItemElement(item){
  return `
    <li data-item-id="${item.id}">
      <span class="shopping-item js-shopping-item ${item.checked ? "shopping-item__checked" : ''}">${item.name}</span>
      <div class="shopping-item-controls">
        <button class="shopping-item-toggle js-item-toggle">
            <span class="button-label">check</span>
        </button>
        <button class="shopping-item-delete js-item-delete">
            <span class="button-label">delete</span>
        </button>
      </div>
    </li>`;
}


function generateShoppingItemsString(shoppingList){
  console.log("Generating shopping list element");
  const items = shoppingList.map((item) => generateItemElement(item));
  return items.join("");
}


function renderShoppingList(){
  // render the shopping list in the DOM
  console.log('`renderShoppingList` ran');
  const shoppingListItemsString = generateShoppingItemsString(Store);
  // insert that HTML into the DOM
  $('.js-shopping-list').html(shoppingListItemsString);

}
/***************************************************** */
function addNewItemSubmit(itemName){
  //console.log('`addNewItemSubmit` ran')
  // we need to pass in a parameter so that our function knows what to reference.

  console.log(`Adding "${itemName}" to shopping list`);
  Store.push({id: cuid(), name: itemName, checked: false});
}


function handleNewItemSubmit() {
  $('#js-shopping-list-form').submit(function(event) {
    event.preventDefault();
    console.log('`handleNewItemSubmit` ran');
    const newItemName = $('.js-shopping-list-entry').val();
    $('.js-shopping-list-entry').val('');
    addNewItemSubmit(newItemName);

    renderShoppingList();
  });
}
/****************************************************** */




function toggleCheckedForListItem(itemId) {
  console.log("Toggling checked property for item with id " + itemId);
  const item = Store.find(item => item.id === itemId);
  item.checked = !item.checked;
}


function getItemIdFromElement(item) {
  return $(item)
    .closest('li')
    .data('item-id');
}

function handleItemCheckClicked() {
  $('.js-shopping-list').on('click', `.js-item-toggle`, event => {
    console.log('`handleItemCheckClicked` ran');
    const id = getItemIdFromElement(event.currentTarget);
    console.log('current target', event.currentTarget);
    toggleCheckedForListItem(id);
    renderShoppingList();
  });
}


/********************************************************** */
function deleteListItem(itemId) {
  console.log(`Deleting item with id ${itemId} from shopping list`);

  const itemIndex = Store.findIndex(item => item.id === itemId);
  Store.splice(itemIndex,1);
}


function removeItemFromListClicked(){
//console.log('`removeItemFromList` ran')
$('.js-shopping-list').on('click','.js-item-delete', event => {

  const itemIndex = getItemIdFromElement(event.currentTarget);
   
   deleteListItem(itemIndex);

   renderShoppingList();
  });
}


// function checkOffItemListWhenClicked(){
// console.log('`checkOffItemListWhenClicked` ran')
// }

/************************************************************************************** */
//Finnally we envoke all our commands here. All the code below should be enough to get the program to execute. we should not have to code anymore information that what is already listed below.

function handleListCommands(){
renderShoppingList();
handleNewItemSubmit();
removeItemFromListClicked();
handleItemCheckClicked();

//checkOffItemListWhenClicked();

}

$(handleListCommands);

