"use strict";


let formEl = document.forms.purchase_form;

let listContainer = document.querySelector("#purchase-list");

console.log(formEl);

// total variable needs to be handled by two occasions
// while submitting forms and clicking delete icons
// its better to handle it globally
let totalContainer = document.querySelector("#purchase-total");
let total = document.querySelector("#purchase-total #total-amount");
let totalAmount = 0;


formEl.addEventListener("submit",(event)=>{

    event.preventDefault();  

    let productName = formEl.elements.product.value;

    let productAmount = formEl.elements.amount.value; 

    // alert invalid inputs
    if(productName.trim() == "" || productAmount == "")
    {
        event.preventDefault();

        if(productName.trim() == "")
        {
            let alertProduct = document.getElementById("alert_product");
            alertMsg(alertProduct);
        }
        else{
            let alertAmount = document.getElementById("alert_amount");
            alertMsg(alertAmount);
        }

    }
    else
    {

    // creating product list 

   let list_div = document.createElement("div");
   list_div.setAttribute("id","list-item");

   let ul_Element = document.createElement("ul");

   let li_Element_1 = document.createElement("li");

   let li_Element_2 = li_Element_1.cloneNode();
   li_Element_2.setAttribute("class","amount_list");


   li_Element_1.innerText = productName;
   li_Element_2.innerText = productAmount;

   ul_Element.append(li_Element_1,li_Element_2);

   // create delete icon
   let delete_icon = document.createElement("i");
    delete_icon.className = `fa-solid fa-trash`;
   delete_icon.setAttribute("id","del_icon");
   delete_icon.style.display = "none";
  

   list_div.append(ul_Element,delete_icon);

   // append created list element to container
   listContainer.append(list_div);


   // total amount calculation

   totalContainer.classList.remove("d-none")
   calculateTotal();

   // reset form inputs
   formEl.reset();
  }

// show delete icon on mouse over on list

let listItems = document.querySelectorAll("#list-item");

let del_icon_List = document.querySelectorAll("#del_icon");

listItems.forEach((item,currentIndex)=>{

    item.addEventListener("mouseover",()=>{
       
        let icon = item.querySelector("#del_icon");
        
        // having some issues with classList add
        // so inline-style handled 
        icon.style.display = "block";

        del_icon_List.forEach((delEl,index)=>{
            if(currentIndex != index)
            {
                delEl.style.display = "none";
            }
        })

        // disable icon when mouse leave from container
        listContainer.addEventListener("mouseleave",()=>{
            del_icon_List.forEach((delEl)=>{
                delEl.style.display = "none";
            }) 
        })


    })


    // mouseleave for each list added
    // but it doesn't work as icon disabled

    // item.addEventListener("mouseleave",()=>{
    //     console.log("mouseout");
    //     let icon = item.querySelector("#del_icon")
        
    //     icon.style.display = "none";
    // })
    
});

// show delete icon on mouse over on list

// let del_icon_List = document.querySelectorAll("#del_icon");

// del_icon_List.forEach((iconElement) =>{

//     iconElement.addEventListener("mouseover",() =>{
//         console.log(iconElement)
//         iconElement.style.display = "block";
//     })
// });




// clicking deleteIcon

let delIcons_List = document.querySelectorAll("#del_icon");
console.log(delIcons_List);
delIcons_List.forEach((del_Element,index)=>{
    del_Element.addEventListener("click",()=>{
      
        
        if(delIcons_List[index] == del_Element)
        {
            let currentListItem = del_Element.parentElement;
            if(listContainer.contains(currentListItem))
            {
                let confirmation = confirm(`Do you want to delete the product ${del_Element.previousElementSibling.firstElementChild.innerText} ?`);
                console.log("confirmation : "+confirmation);
                if(confirmation)
                {

                    console.log(currentListItem);
        
                    // remove specific list item from container
        
                    if(listContainer.contains(currentListItem)) // check the child exists in the container
                    {
                        listContainer.removeChild(currentListItem);
                    }
                    
                    calculateTotal();
                }
            }
           

        }
        
    })
})

})


let calculateTotal = ()=>{
    
    let alllistAmount = document.querySelectorAll(".amount_list");

    console.log(alllistAmount);
    alllistAmount.forEach((amt)=>{
        console.log(amt.innerText);
        totalAmount+=parseInt(amt.innerText);
    });


    // if all list deleted using del icon
    // total should be disabled

    if(totalAmount == 0)
    {
        totalContainer.classList.add("d-none");       
    }

    // total displayed

    total.innerText = totalAmount;

    // to avoid adding previously stored value 
    // totalAmount set to 0

    totalAmount = 0;

};



let alertMsg = (alertEl) =>{

    alertEl.classList.toggle("d-none");
    
    setTimeout(()=>{
        alertEl.classList.toggle("d-none");
    },1500)
};