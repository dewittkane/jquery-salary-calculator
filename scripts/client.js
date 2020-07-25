$(document).ready(function(){

    $('#submitBtn').on('click', submitInfo);
    // click listener for submit button
    
    let employeesArray = [];
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

            employeesArray.push(employee);
            //pushes new employee to backend "database"

            populateTable();
            
        } else {
            alert('Please fill all fields!');
            //lets user know all fields must be filled
            return false;
            //stops the function
        };
    };







});