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
        $('#notes-customers').append(
              '<tr>',
              '<td> '+ designer.ID_DESIGNER + '</td>',
              '<td>' + designer.NAME_DESIGNER + '</td>',
              '<td>' + designer.CITY + '</td>',
              '</tr>')
    }
}

function showCustomer(customer) {


    console.log("Show customer");
    if (customer !== null) {
        $('#notes-customers').append(
              '<tr>',
              '<td> '+ customer.ID_CUSTOMER + '</td>',
              '<td>' + customer.NAME_CUSTOMER + '</td>',
              '<td>' + customer.CITY + '</td>',
              '</tr>')
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
var gData;
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

        
        google.charts.load('current', {'packages':['corechart', 'bar']});
        google.charts.setOnLoadCallback(function() { drawChart(data); });

        function drawChart(gData) {

        var customerUnder25 = gData.customers.filter(customer=>
            customer.CUSTOMER_AGE>18 && customer.CUSTOMER_AGE<25
        );
        var customerUnder35 = gData.customers.filter(customer=>customer.CUSTOMER_AGE>25 && customer.CUSTOMER_AGE<35
        );
        var customerUnder55 = gData.customers.filter(customer=>
            customer.CUSTOMER_AGE>35 && customer.CUSTOMER_AGE<55
        );
        console.log(customerUnder25);
        console.log(customerUnder35);
        console.log(customerUnder55);
        var under25Budget = customerUnder25.reduce((total,next)=>total+next.BUDGET,0)/ customerUnder25.length;
        var under35Budget = customerUnder35.reduce((total,next)=>total+next.BUDGET,0)/ customerUnder35.length;
        var under55Budget = customerUnder55.reduce((total,next)=>total+next.BUDGET,0)/ customerUnder55.length;
        
        console.log(under25Budget);
        console.log(under35Budget);
        console.log(under55Budget);

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
            ['Usuarios',    gData.customers.length],
            ['Diseñadores',    gData.designers.length]
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
            ["18-25", under25Budget, "gold"],
            ["26-35", under35Budget, "silver"],
            ["35-55", under55Budget, "bronze"]
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
            ['Diseñadores', 'Coste medio de diseños'],
            ["Diseñador 1", 350],
            ["Diseñador 2", 290],
            ["Diseñador 3", 176],
          ]);
          for(var i=0; i<gData.designers.length ;i++){
              console.log(gData.designers[i]);
              dataDesigners.addRow([gData.designers[i].NAME_DESIGNER,gData.designers[i].avg_value]);
          }
  
          var optionsDesigners = {
            width: 400,
            height: 200,
            chart: {
                title: 'Diseñadores - Coste medio de diseños'},
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

    });
    console.log(gData);
    
//ToDo obtener datos de la base de datos y mostrar en estadísticas
    
    

})