"use strict";


let formEl = document.forms.purchase_form;

let listContainer = document.querySelector("#purchase-list");

console.log(formEl);

// total variable needs to be handled in two occasions
// while submitting forms and clicking delete icons
// its better to handle it globally
let totalContainer = document.querySelector("#purchase-total");
let total = document.querySelector("#purchase-total #total-amount");
let totalAmount = 0;
let productObj_arr = new Array();


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

    createProductList(productName,productAmount);


   // total amount calculation

   totalContainer.classList.remove("d-none")
   calculateTotal();

   // creating Obj array to handle sort

   let obj = { product : `${productName}`,
               amount : `${productAmount}`};
 
    productObj_arr.push(obj);

   // reset form inputs

   formEl.reset();
  }

// show delete icon on mouse over on list

showDeleteIcon();

// clicking deleteIcon

clickDeleteIcon();

})




let alertMsg = (alertEl) =>{

    alertEl.classList.toggle("d-none");
    
    setTimeout(()=>{
        alertEl.classList.toggle("d-none");
    },1500)
};


// create list element

let createProductList = (product_Name, product_Amount)=> {
    let list_div = document.createElement("div");
    list_div.setAttribute("id","list-item");
 
    let ul_Element = document.createElement("ul");
 
    let li_Element_1 = document.createElement("li");
 
    let li_Element_2 = li_Element_1.cloneNode();
    li_Element_2.setAttribute("class","amount_list");
 
 
    li_Element_1.innerText = product_Name;
    li_Element_2.innerText = product_Amount;
 
    ul_Element.append(li_Element_1,li_Element_2);
 
    // create delete icon
    let delete_icon = document.createElement("i");
     delete_icon.className = `fa-solid fa-trash`;
    delete_icon.setAttribute("id","del_icon");
    delete_icon.style.display = "none";
   
 
    list_div.append(ul_Element,delete_icon);
 
    // append created list element to container
    listContainer.append(list_div);
}


// total Calculation

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


// delete Icon show

let showDeleteIcon = ()=> {
    let listItems = document.querySelectorAll("#list-item");

    let del_icon_List = document.querySelectorAll("#del_icon");
    
    listItems.forEach((item,currentIndex)=>{
    
        item.addEventListener("mouseover",()=>{
            console.log("INCOMING")
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
        
    });
}


// click delete icon
let clickDeleteIcon = ()=>{

 let delIcons_List = document.querySelectorAll("#del_icon");
 delIcons_List.forEach((del_Element,index)=>{
    del_Element.addEventListener("click",()=>{
      
        console.log("clicked");
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
                    
                    // deleted element obj should be removed 
                    // from product array - its handled in sort
                    console.log("index : "+index);
                    console.log(productObj_arr);
                    productObj_arr.splice(index,1);
                    console.log(productObj_arr);
                    calculateTotal();
                }
            }
           
        }
        
    })
});
}



// handling sort action

let sort_icon = document.querySelector("#purchase_head #sort_icon");

sort_icon.addEventListener("click",()=>{
    console.log(productObj_arr);

    for(let i=0; i <= productObj_arr.length-1; i++)
    {
        for(let j=i+1; j <= productObj_arr.length-1; j++)
        {
            if(Number(productObj_arr[i].amount) < Number(productObj_arr[j].amount))
            {
                // swap based on high order
                let temp = productObj_arr[i];
                productObj_arr[i] = productObj_arr[j];
                productObj_arr[j] = temp;
            }
        }
    }

    // remove all child in the list container
    let listItems = listContainer.querySelectorAll("#purchase-list > div");

    console.log(listItems);
    listItems.forEach((item)=>{
        listContainer.removeChild(item);
    });

    console.log(productObj_arr);
    productObj_arr.forEach((obj)=>{
        let divEl = document.createElement("div");
        divEl.setAttribute("id","list-item");

        divEl.innerHTML = `<ul>
                            <li>${obj.product}</li>
                            <li class="amount_list">${obj.amount}</li>
                           </ul>
                            <i class="fa-solid fa-trash" id="del_icon" style="display: none"></li>`;
    
        listContainer.appendChild(divEl);

        showDeleteIcon();
        clickDeleteIcon();
        
    })
    console.log(listItems);
})

