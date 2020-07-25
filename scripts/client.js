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

            let newEmployee = {
                firstName: $("#firstName").val(),
                lastName: $("#lastName").val(),
                idNum: $("#idNum").val(),
                jobTitle: $("#jobTitle").val(),
                annualSalary: $("#annualSalary").val()
            };
            //declares object with input values

            for (let employee of employeeArray) {
                if(employee.idNum === newEmployee.idNum) {
                    alert('User ID already exists.  Please enter a unique ID number.');
                    return false;
                }
            }
            //ensures database has all unique ID numbers, this will prevent issues with accidentally deleting multiple rows

            employeeArray.push(newEmployee);
            console.log(employeeArray);
            //pushes new employee to backend "database"
            
            populateTable();
            //resets the table with updated array and updates total

            $("#firstName").val('');
            $("#lastName").val('');
            $("#idNum").val('');
            $("#jobTitle").val('');
            $("#annualSalary").val('');
            //resets input fields
            
        } else {
            alert('Please fill in all fields!');
            //lets user know all fields must be filled

            return false;
            //stops the function

        };
    };


    function populateTable(){
        $('#empInfo').empty();
        //emptys the table
        if (employeeArray.length === 0) {
            $('#empInfo').append(`
            <tr><td colspan="6" id="emptyDB">Your database is empty</td></tr>`)
            //if the array is empty, adds placeholder info
            } else {
            for (let employee of employeeArray) {
                    $('#empInfo').append(`<tr>
                    <td>${employee.firstName}</td>
                    <td>${employee.lastName}</td>
                    <td class="id">#${employee.idNum}</td>
                    <td class="jobTitle">${employee.jobTitle}</td>
                    <td>$${employee.annualSalary}</td>
                    <td><svg width="1.2em" height="1.2em" viewBox="0 0 16 16" type="button" class="bi bi-trash deleteMe" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                  </svg></td>
                    </tr>`)
                    //loops to append new row for each employee in array
                };
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

        if (monthlyTotal>20000 && !$('#total').hasClass('expenseThreshold')) {
            $('#total').addClass('expenseThreshold');
        } else if (monthlyTotal<=20000 && $('#total').hasClass('expenseThreshold')) {
            $('#total').removeClass('expenseThreshold');
        }
        //checks if value is above 20000 and applies styling as warning
    };

    function deleteRow() {
        //console.log('in delete row!');
        let id = $(this).parent().parent().children('.id').text();
        console.log('id to be deleted is:' + id);
        //declares new variable with id of the row to be deleted
        
        for (let i = 0; i < employeeArray.length; i++ ) {
            if(id === `#${employeeArray[i].idNum}`) {

                let r = confirm(`Are you sure you want to delete ${employeeArray[i].firstName} ${employeeArray[i].lastName} from the database?`)
                if (r) {
                    employeeArray.splice(i, 1)
                };
                //added confirmation for deletion
            };
        };
        console.log(employeeArray);
        //loops through array to match id number and deletes that entry if it matches
        
        populateTable();
        //repopulates table now that array has changed
    };
});