//manages the get all the notes calls 
function loadData(callback) {

    console.log("downloading data...");

    var dataAux;

    $.ajax({
        method: "GET",
        url: "http://127.0.0.1:8080/data/"
    }).done(function (data) {
        dataAux = data;
        callback(data);
    })

}
// manages the add new notes button
function createCampaign(campaign, callback) {
    console.log("add campaign")
    $.ajax({
        method: "POST",
        url: 'http://localhost:8080/marketing/',
        data: JSON.stringify(campaign),
        processData: false,
        headers: {
            "Content-Type": "application/json"
        }


    }).done(function (note) {
        console.log("note created" + JSON.stringify(note));
        callback(note);
    })

}

function createCustomer(customer, callback) {
    console.log("add customer")
    $.ajax({
        method: "POST",
        url: 'http://localhost:8080/customer/',
        data: JSON.stringify(customer),
        processData: false,
        headers: {
            "Content-Type": "application/json"
        }


    }).done(function (note) {
        console.log("note created" + JSON.stringify(note));
        callback(note);
    })

}

function createdDesigner(designer, callback) {
    console.log("add designer")
    $.ajax({
        method: "POST",
        url: 'http://localhost:8080/designer/',
        data: JSON.stringify(designer),
        processData: false,
        headers: {
            "Content-Type": "application/json"
        }


    }).done(function (note) {
        console.log("note created" + JSON.stringify(note));
        callback(note);
    })

}
// appends the notes to the html document
function showDesigner(designer) {


    console.log("Show designer");
    if (designer !== null) {
        $('#notes').append(
            '<div class="designer" id="designer-' + designer.ID_DESIGNER + '">' +
            '<p class="name">' + designer.NAME_DESIGNER + '</p>' +
            '<p class="nDesigns">' + designer.NUMBER_OF_DESIGNS + '</p>' +
            '<p class="city">' + designer.CITY + '</p>' +
            ' </div>')
    }
}

function showCustomer(customer) {


    console.log("Show customer");
    if (customer !== null) {
        $('#notes').append(
            '<div class="customer" id="customer-' + customer.ID_CUSTOMER + '">' +
            '<p class="name">' + customer.NAME_CUSTOMER + '</p>' +
            '<p class="city">' + customer.CITY + '</p>' +
            ' </div>')
    }
}

function showDesign(design) {


    console.log("Show design");
    if (design !== null) {
        $('#notes').append(
            '<div class="design" id="design-' + design.ID_DESIGN + '">' +
            '<p class="designer">' + design.NAME_DESIGNER + '</p>' +

            '<p class="value">' + design.VALUE + '</p>' +
            '<p class="description">' + design.DESCRIPTION + '</p>' +
            ' </div>')
    }
}

function showOrder(order) {


    console.log("Show order");
    console.log(order);
    if (order !== null) {
        $('#notes').append(
            '<div class="order" id="order-' + order.ID_ORDER + '">' +
            '<p class="customer">' + order.NAME_CUSTOMER + '</p>' +


            '<p class="designer">' + order.NAME_DESIGNER + '</p>' +
            '<p class="description">' + order.DESCRIPTION + '</p>' +


            '<p class="value">' + order.VALUE + '</p>' +
            ' </div>')
    }
}

//manages the edition of the notes
function editNote(note) {
    console.log("Edit Note");
    $.ajax({
        method: "PUT",
        url: 'http://localhost:8080/notes/' + note.id,
        data: JSON.stringify(note),
        processData: false,
        headers: {
            "Content-Type": "application/json"
        }
    })

}

//manages the removal of the notes
function deleteNote(id) {
    console.log("deleteNote");
    $.ajax({
        method: "DELETE",
        url: 'http://localhost:8080/notes/' + id,


    }).done(function () {
        console.log("note deleted");

    })
}


$(document).ready(function () {
    var addDialog = document.getElementsByClassName("addDialog");

    loadData((data)=> {
        console.log("Callback");
        console.log(data.designers);
        console.log(data.customers);
        console.log(data.orders);
        console.log(data.designs);

       
        console.log(data.designers.length);
        for (var i = 0; i < data.designers.length; i++) {
            showDesigner(data.designers[i]);
        }
        for (var i = 0; i < data.customers.length; i++) {
            showCustomer(data.customers[i]);
        }
        for (var i = 0; i < data.designs.length; i++) {
            showDesign(data.designs[i]);
        }
        for (var i = 0; i < data.orders.length; i++) {
            showOrder(data.orders[i]);
        }
        
    });
    
//ToDo obtener datos de la base de datos y mostrar en estadísticas
    google.charts.load('current', {'packages':['corechart', 'bar']});
      google.charts.setOnLoadCallback(drawChart);

      function drawChart() {

        //Graficas Numero de clientes y Ganancias/Gastos
        var data = google.visualization.arrayToDataTable([
          ['Año', 'Ganancias', 'Gastos'],
          ['2013',  1000,      400],
          ['2014',  1170,      460],
          ['2015',  660,       1120],
          ['2016',  1030,      540]
        ]);

        var data2 = google.visualization.arrayToDataTable([
            ['Clientes', 'Tipos'],
            ['Usuarios',     21],
            ['Diseñadores',    7]
          ]);

        var options = {
          title: 'Rendimiento de la empresa',
          hAxis: {title: 'Año',  titleTextStyle: {color: '#333'}},
          vAxis: {minValue: 0}
        };

        var options2 = {
            title: 'Clientes'
          };

        var chart = new google.visualization.AreaChart(document.getElementById('chart_div'));

        var chart2 = new google.visualization.PieChart(document.getElementById('piechart'));

        chart.draw(data, options);

        chart2.draw(data2, options2);


        //Grafica Edad-Presupuesto
        var dataAgeBudget = google.visualization.arrayToDataTable([
            ["Edad", "Presupuesto", { role: "style" } ],
            ["18-25", 300, "gold"],
            ["26-35", 400, "silver"],
            ["35-55", 450, "bronze"]
        ]);
    
        var viewAgeBudget = new google.visualization.DataView(dataAgeBudget);
        viewAgeBudget.setColumns([0, 1,
                           { calc: "stringify",
                             sourceColumn: 1,
                             type: "string",
                             role: "annotation" },
                           2]);
    
        var optionsAgeBudget = {
            title: "Relación Edad-Presupuesto",
            width: 425,
            height: 270,
            bar: {groupWidth: "95%"},
            legend: { position: "none" },
        };

        var chartAgeBudget = new google.visualization.ColumnChart(document.getElementById("age-budget"));
        chartAgeBudget.draw(viewAgeBudget, optionsAgeBudget);


        //Grafica Diseñadores-Estilos de diseño
        var dataDesigners = new google.visualization.arrayToDataTable([
            ['Diseñadores', 'Nº de estilos'],
            ["Diseñador 1", 2],
            ["Diseñador 2", 7],
            ["Diseñador 3", 5],
          ]);
  
          var optionsDesigners = {
            width: 400,
            height: 200,
            chart: {
                title: 'Diseñadores - Nº de estilos'},
              axes: {
                x: {
                  0: { side: 'bot', label: 'Diseñadores'} // Top x-axis.
                }
              },
            legend: { position: 'none' },
            bar: { groupWidth: "90%" }
          };

          var chartDesigners = new google.charts.Bar(document.getElementById('designers-styles'));
          chartDesigners.draw(dataDesigners, google.charts.Bar.convertOptions(optionsDesigners));
    }
    

})