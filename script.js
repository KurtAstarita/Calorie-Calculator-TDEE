// script.js
document.getElementById("calculate-calories").addEventListener("click", function() {
    // Function to sanitize input (mainly to trim whitespace)
    function sanitizeInput(input) {
        return input.trim();
    }

    var age = parseFloat(sanitizeInput(document.getElementById("age").value));
    var gender = document.getElementById("gender").value;
    var height = parseFloat(sanitizeInput(document.getElementById("height").value));
    var heightUnit = document.getElementById("height-unit").value;
    var weight = parseFloat(sanitizeInput(document.getElementById("weight").value));
    var weightUnit = document.getElementById("weight-unit").value;
    var activity = parseFloat(document.getElementById("activity").value);
    var goal = document.getElementById("goal").value;
    var bmr;
    var tdee;
    var adjustedCalories;

    // Input Validation
    if (isNaN(age) || isNaN(height) || isNaN(weight) || isNaN(activity)) {
        document.getElementById("calorie-result").textContent = "Please enter valid numbers.";
        return;
    }

    if (age <= 0 || height <= 0 || weight <= 0) {
        document.getElementById("calorie-result").textContent = "Age, height, and weight must be greater than zero.";
        return;
    }

    // Convert units if necessary
    if (heightUnit === "inches") {
        height = height * 2.54; // inches to cm
    }
    if (weightUnit === "lbs") {
        weight = weight / 2.205; // lbs to kg
    }

    if (gender === "male") {
        bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
        bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    tdee = bmr * activity;

    if (goal === "lose") {
        adjustedCalories = tdee - 500; // 500 calorie deficit
    } else if (goal === "gain") {
        adjustedCalories = tdee + 250; // 250 calorie surplus
    } else {
        adjustedCalories = tdee;
    }

    document.getElementById("calorie-result").textContent = "Estimated TDEE: " + tdee.toFixed(0) + " calories. Recommended daily calories: " + adjustedCalories.toFixed(0) + " calories.";
});
