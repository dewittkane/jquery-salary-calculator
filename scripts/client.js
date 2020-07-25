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
            //resets the table with updated array

            calculateMonthlyTotal();
            //recalculates and appends monthly total

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
            <td>${employee.idNum}</td>
            <td>${employee.jobTitle}</td>
            <td>${employee.annualSalary}</td>
            <td><button class="deleteMe">Delete</button></td>
            </tr>`)
            //loops to append new row for each emp in array
        };
    };

    function calculateMonthlyTotal() {
        let annualTotal = 0;
        for (let employee of employeeArray) {
            annualTotal += Number(employee.annualSalary);
        };
        //loops to sum all annual salaries in array

        $('#monthlyExp').empty();        
        $('#monthlyExp').append(parseInt(annualTotal / 12));
        //resets text to the monthly total
    };

    function deleteRow() {
        console.log('in delete row!');
        $(this).parent().parent().remove()
        //this will back up two steps from the button to delete the entire <tr>
    }
});