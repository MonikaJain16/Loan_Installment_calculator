   
document.getElementById('btnCal').addEventListener('click',loadimg);
document.getElementById('btnReset').addEventListener('click',resetFields);
   

function loadimg(e){
    const amnt=document.getElementById('amount');
    const int=document.getElementById('interest');
    const yrs=document.getElementById('years');
    if(amnt.value!=''&&int.value!=''&&yrs.value!=''){
        document.getElementById('results').style.display='none';
        document.getElementById('loading').style.display='block';
        setTimeout(calculateResults,2000);
    }
    else{
        document.getElementById('results').style.display='none';
        showError('Please enter all the values');
    }
    e.preventDefault();
}


//function  to reset fields
function resetFields(){
    document.getElementById('results').style.display='none';
    document.getElementById('amount').value='';
    document.getElementById('interest').value='';
    document.getElementById('years').value='';
}


//Function to Calculate Results
function calculateResults(e){
    const amnt=document.getElementById('amount');
    const int=document.getElementById('interest');
    const yrs=document.getElementById('years');
    const monthlypay=document.getElementById('monthly-payment');
    const totalpay=document.getElementById('total-payment');
    const totalint=document.getElementById('total-interest');

    const principal=parseFloat(amnt.value);
    const calInt=parseFloat(int.value)/100/12;
    const calPayment=parseFloat(yrs.value)*12;

    //Computing Monthly Payment
    const x=Math.pow(1+calInt,calPayment);
    const monthly=(principal*x*calInt)/(x-1);
    
    if(isFinite(monthly)){
        document.getElementById('loading').style.display='none';
        monthlypay.value=monthly.toFixed(2);
        totalpay.value=(monthly*calPayment).toFixed(2);
        totalint.value=((monthly*calPayment)-principal).toFixed(2);
        document.getElementById('results').style.display='block';
    }
    else{
        document.getElementById('loading').style.display='none';
        document.getElementById('results').style.display='none';
        showError('Please check the values');
    }   
}


//Function to show Error
function showError(error){    
    //creating a div
    const errorDiv=document.createElement('div');
    errorDiv.className='alert alert-danger';

    //getting elements
    const card=document.querySelector('.card');
    const heading=document.querySelector('.heading');

    //creating text node and appending to div
    errorDiv.appendChild(document.createTextNode(error));

    //Insert error above heading
    card.insertBefore(errorDiv,heading);

    //Clear error after 5 seconds
    setTimeout(clearError,5000);
}


//function to clear error
function clearError(){
    document.querySelector('.alert').remove();
}