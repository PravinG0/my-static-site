let roiChartInstance = null;

function animateValue(id, start, end, duration) {
    var range = end - start;
    var current = start;
    var increment = range / (duration / 20);
    var obj = document.getElementById(id);

    var timer = setInterval(function() {
        current += increment;
        obj.innerText = "Expected Return: ₹" + Math.round(current).toLocaleString();
        if (current >= end) {
            clearInterval(timer);
            obj.innerText = "Expected Return: ₹" + Math.round(end).toLocaleString();
        }
    }, 20);
}

function calculateROI() {
    var investment = parseFloat(document.getElementById('investment').value);
    var years = parseFloat(document.getElementById('years').value);
    var months = parseFloat(document.getElementById('months').value);

    var service = document.getElementById('service').value;
    var serviceROI = getServiceROI(service);

    if (!investment || !serviceROI) {
        document.getElementById('roi-result').innerHTML = 'Please fill in all fields.';
        return;
    }

    var totalMonths = (years * 12) + months;

    var totalROI = serviceROI * totalMonths;
    var expectedReturn = investment + (investment * totalROI / 100);
    var netProfit = expectedReturn - investment;

    animateValue('roi-result', investment, expectedReturn, 1500);

    setTimeout(function() {
        drawPieChart(investment, netProfit);
    }, 1600);
}

function getServiceROI(service) {
    const serviceROIPercentage = {
        'data_analytics': 20,
        'digital_marketing': 15,
        'iot': 25,
        'web_dev': 30,
        'cloud_services': 50,
        'custom_software': 35,
        'ui_ux': 40,
        'erp_crm': 10
    };

    return serviceROIPercentage[service] || 0;
}

function drawPieChart(investment, profit) {
    const ctx = document.getElementById('roiChart').getContext('2d');

    if (roiChartInstance) {
        roiChartInstance.destroy();
    }

    roiChartInstance = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Investment', 'Profit'],
            datasets: [{
                data: [investment, profit],
                backgroundColor: ['#4CAF50', '#FFC107'],
                hoverOffset: 10
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

document.addEventListener("DOMContentLoaded", function() {
    drawPieChart(100000, 50000);
});


// Initialize the chart when the popup opens
document.addEventListener("DOMContentLoaded", function() {
    // Ensure chart is drawn when popup opens
    var popup = document.getElementById('your-popup-id'); // Replace with your popup ID or class

    if (popup) {
        // When the popup is opened, draw the chart
        popup.addEventListener('show', function() {
            drawPieChart(100000, 50000); // Example with default values (you can customize)
        });
    }

    // Initialize chart with default values (Investment: ₹100000, Profit: ₹50000)
    drawPieChart(100000, 50000); // Default to ₹100000 investment and ₹50000 profit (for 50% ROI)
});