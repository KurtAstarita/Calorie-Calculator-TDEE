document.getElementById("calculate-calories").addEventListener("click", function() {
    function sanitizeInput(input) {
        return DOMPurify.sanitize(input);
    }

    var ageInput = sanitizeInput(document.getElementById("age").value);
    var heightInput = sanitizeInput(document.getElementById("height").value);
    var weightInput = sanitizeInput(document.getElementById("weight").value);
    // New: Get and sanitize body fat input
    var bodyFatInput = sanitizeInput(document.getElementById("bodyFat").value);

    var age = parseFloat(ageInput);
    var gender = document.getElementById("gender").value;
    var height = parseFloat(heightInput);
    var heightUnit = document.getElementById("height-unit").value;
    var weight = parseFloat(weightInput);
    var weightUnit = document.getElementById("weight-unit").value;
    var activity = parseFloat(document.getElementById("activity").value);
    var goal = document.getElementById("goal").value;
    // New: Parse body fat percentage
    var bodyFat = parseFloat(bodyFatInput);

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

    // New: Validate body fat percentage if provided
    if (!isNaN(bodyFat) && (bodyFat < 5 || bodyFat > 60)) { // General reasonable range for body fat %
        document.getElementById("calorie-result").textContent = "Please enter a realistic body fat percentage (e.g., between 5% and 60%).";
        return;
    }

    // Convert units if necessary
    if (heightUnit === "inches") {
        height = height * 2.54; // inches to cm
    }
    if (weightUnit === "lbs") {
        weight = weight / 2.205; // lbs to kg
    }

    // Calculate BMR
    if (!isNaN(bodyFat)) {
        // Katch-McArdle Formula (more accurate with body fat %)
        // Convert body fat percentage to decimal
        var leanBodyMass = weight * (1 - (bodyFat / 100));
        bmr = 370 + (21.6 * leanBodyMass);
    } else if (gender === "male") {
        // Mifflin-St Jeor Equation (for males)
        bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
        // Mifflin-St Jeor Equation (for females)
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

    document.getElementById("calorie-result").textContent = "Estimated BMR: " + bmr.toFixed(0) + " calories. Estimated TDEE: " + tdee.toFixed(0) + " calories. Recommended daily calories: " + adjustedCalories.toFixed(0) + " calories.";
});
