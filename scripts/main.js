/*
    Name:  Alex Park
    Assignment:  Assignment 2
    Date:  Feb. 22. 2015
    
    Page Description: This javascript file contains the functions that are used in index.html file. 
    Files:  index.html - The main page that has the pizza order system.
            designsheet.css - The main design for this application.
*/

// arrays for contatining customer info inputs, 4 different pizza size, 9 toppings
var customerInfo = new Array(6);
var size = new Array(4);
var toppings = new Array(9);

// for pizza size and toppings the customer selected
var selectedToppings = new Array();
var selectedSize;

// arrays containing div box that has an error mesage.
var errors = new Array(6);
var formatErrors = new Array(3);

// arrays containing table cells that shows the invoice and the bill
var customerField = new Array(6);
var billField = new Array(10);

// object that has the display name, pizza price, and topping price of each pizza size
var prices = {"small": ['Small', '8.99', '0.85'], "medium": ['Medium', '10.99', '0.95'],
            "large": ['Large', '12.99', '1.00'], "xlarge": ['Extra-Large', '14.99', '1.10']};
        
// to contain estamated price of each field.  
var hst = 0.13;
var pizzaAmount, toppingAmount, hstAmount, totalAmount;

// when the submit is clicked, it sets global variables and check all required input is submited and the format is right. 
function validate()
{
    // boolean to tell if all input is right or not. 
    var isValid = true;
    
    customerInfo = document.querySelectorAll("input[type=text]");
    size = document.forms["form1"]["size"];
    toppings = document.querySelectorAll("input[type=checkbox]");
    errors = document.querySelectorAll(".errorMsg");
    formatErrors = document.querySelectorAll(".formatError");
    
    // check if there is empty field in customer information section
    for(var i = 0; i < customerInfo.length; ++i)
    {
        if(customerInfo[i].value==="")
        {          
            errors[i].style.display = "inline";
            isValid = false;
        }
        else
        {
            errors[i].style.display = "none";
        }
    }
    
    // check if the postal code is in right format.
    if(!(/^[A-z][0-9][A-z]\s?[0-9][A-z][0-9]$/.test(customerInfo[4].value)))
    {
        formatErrors[0].style.display = "inline";
        isValid = false;
    }
    else
    {
        formatErrors[0].style.display = "none";
    }
    
    // check if the phone number is in right format.
    if(!(/^\d{3}-?\d{3}-?\d{4}$/.test(customerInfo[5].value)))
    {
        formatErrors[1].style.display = "inline";
        isValid = false;
    }
    else
    {
        formatErrors[1].style.display = "none";
    }
    
    // check if the radio button for the size is selected or not
    for(var i = 0; i < size.length; ++i)
    {
        
        if(size[i].checked)
        {
            selectedSize = size[i].id;
            formatErrors[2].style.display = "none";
            break;
        }
        
        if(i===3)
        {
            formatErrors[2].style.display = "block";
            isValid = false;
        }
    }
    
    // call other functions to procceed the order if all required inputs are provided and in the format. 
    if(isValid)
    {
        calculate(selectedSize);
        submit(selectedSize);
        showHide();
    }  
}

// display the invoice and the bill to customer
function submit(id)
{   
    customerField = document.querySelectorAll("#customerOut tr td");
    billField = document.querySelectorAll("#billOut tr td");
    
    customerField[0].innerHTML = customerInfo[0].value;
    customerField[1].innerHTML = customerInfo[1].value;
    customerField[3].innerHTML = customerInfo[2].value;
    customerField[3].innerHTML += ", " + customerInfo[3].value;
    customerField[4].innerHTML += customerInfo[5].value;
    customerField[5].innerHTML = customerInfo[4].value;
    
    billField[0].innerHTML += prices[id][0];
    billField[1].innerHTML += pizzaAmount;
    for (var i = 0; i < selectedToppings.length; ++i)
    {
        if(i===0)
        {
            billField[4].innerHTML += selectedToppings[i];
        }
        else
        {
            billField[4].innerHTML += ", " + selectedToppings[i];
        }
    }
    billField[5].innerHTML += toppingAmount.toFixed(2);
    billField[7].innerHTML += hstAmount.toFixed(2);
    billField[9].innerHTML += totalAmount.toFixed(2);
}

// calculate the total price depends on the selected pizza size.
function calculate(id)
{   
    for(var i = 0; i < toppings.length; ++i)
    {
        if(toppings[i].checked)
        {
            selectedToppings.push(toppings[i].value);
        }
    }
    
    pizzaAmount = parseFloat(prices[id][1]);
    toppingAmount = parseFloat((prices[id][2]) * selectedToppings.length);
    hstAmount = ( pizzaAmount + toppingAmount ) * hst;
    totalAmount = pizzaAmount + toppingAmount + hstAmount;
}

// swith the display from ordering form to invoice or the other way.
function showHide()
{   
    // assigning the invoice div box
    var invoice = document.getElementById("invoice");
    // getting external css of 'invoice'
    var style = getComputedStyle(invoice, null);
    // assigning the order form, which is the default display
    var form = document.forms["form1"];

    if (style.display === "none")
    {
        invoice.style.display = "block";
        form.style.display = "none";
    }
    else
    {
        invoice.style.display = "none";
        form.style.display = "block";
    }
}

// when the clear is clicked, confirm and reset the form so that user can start again
function clearForm()
{
    console.log("clear is called");
    if(confirm("Do you want to clear the form and start again?"))
    {
        document.forms["form1"].reset();
    }
}

// when another order is clicked, reset the form and invoice page, empty the selectedTopping array, and call showHide() 
function anotherOrder()
{
    document.forms["form1"].reset();
    
    for(var i = 0; i <= selectedToppings.length; ++i)
    {
        selectedToppings.pop();
    }
    
    for(var i = 0; i < customerField.length; ++i)
    {
        if(i===4)
        {
            customerField[i].innerHTML = "<span class='bold'>Phone: </span>";
        }
        else
        {
            customerField[i].innerHTML = null;
        }
    }
    
    billField[0].innerHTML = "<span class='bold'>Size: </span>";
    billField[1].innerHTML = "$";
    billField[4].innerHTML = "";
    billField[5].innerHTML = "$";
    billField[7].innerHTML = "$";
    billField[9].innerHTML = "$";
    
    showHide();
}