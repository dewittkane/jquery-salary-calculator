$(document).ready(function(){

    $('#submitBtn').on('click', submitInfo);
    //click listener for submit button
    $('#empInfo').on('click', '.deleteMe', deleteRow);
    //click listener for delete buttons that are generated
    
    let employeeArray = [];
    //empty employee array to generate to

    function submitInfo() {
        if($("#firstName").val() && $("#lastName").val() && $("#idNum").val() && $("#jobTitle").val() && $("#annualSalary").val()) {
        // checks that all fields have data, if so...

            let employee = {
                firstName: $("#firstName").val(),
                lastName: $("#lastName").val(),
                idNum: $("#idNum").val(),
                jobTitle: $("#jobTitle").val(),
                annualSalary: $("#annualSalary").val()
            };
            //declares object with input values

            employeeArray.push(employee);
            //pushes new employee to backend "database"
            console.log(employeeArray);
            

            populateTable();
            //resets the table with updated array and updates total

            $("#firstName").val('');
            $("#lastName").val('');
            $("#idNum").val('');
            $("#jobTitle").val('');
            $("#annualSalary").val('');
            //resets input fields
            
        } else {
            alert('Please fill all fields!');
            //lets user know all fields must be filled

            return false;
            //stops the function

        };
    };


    function populateTable(){
        $('#empInfo').empty();
        //emptys the table

        for (let employee of employeeArray) {
            $('#empInfo').append(`<tr>
            <td>${employee.firstName}</td>
            <td>${employee.lastName}</td>
            <td class="id">${employee.idNum}</td>
            <td>${employee.jobTitle}</td>
            <td>${employee.annualSalary}</td>
            <td><button class="deleteMe">Delete</button></td>
            </tr>`)
            //loops to append new row for each emp in array
        };

        calculateMonthlyTotal();
        //calculates the total anytime the table is repopulated
    };

    function calculateMonthlyTotal() {
        let annualTotal = 0;
        for (let employee of employeeArray) {
            annualTotal += Number(employee.annualSalary);
        };
        //loops to sum all annual salaries in array

        let monthlyTotal = parseInt(annualTotal / 12)
        //declares monthly total ,rounded, for clarity

        $('#monthlyExp').empty();        
        $('#monthlyExp').append(`$ ${monthlyTotal}`);
        //resets text to the monthly total

        if (monthlyTotal>20000 && !$('#monthlyExp').hasClass('expenseThreshold')) {
            $('#monthlyExp').addClass('expenseThreshold');
        } else if (monthlyTotal<=20000 && $('#monthlyExp').hasClass('expenseThreshold')) {
            $('#monthlyExp').removeClass('expenseThreshold');
        }
        //checks if value is above 20000 and applies styling as warning
    };

    function deleteRow() {
        //console.log('in delete row!');
        let id = $(this).parent().parent().children('.id').text();
        console.log(id);
        //declares new variable with id of the row to be deleted
        
        for (let i = 0; i < employeeArray.length; i++ ) {
            if(id === employeeArray[i].idNum) {
                employeeArray.splice(i, 1)
            };
        };
        console.log(employeeArray);
        
        //loops through array to match id number and deletes that entry if it matches

        populateTable();
        //repopulates table now that array is changed
        
    }
});