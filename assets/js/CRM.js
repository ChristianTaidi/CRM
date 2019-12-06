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

    var marketing = document.getElementById('marketing');

    var dialogClient = document.getElementById('clientDialog');

    var dialogStats = document.getElementById('statsDisplay');

    var btn = document.getElementById("addNote");

    var clientBtn = document.getElementById("addClient");

    var saveCustomer = document.getElementById("edit");

    var statsBtn = document.getElementById("stats");

    var closeMarketing = document.getElementById("close-marketing");

    var saveMarketing = document.getElementById("save-marketing");

    var edit = document.getElementById("edit");

    var delet = document.getElementById("delete");


    $(document).on('click', '.note', function () {

        console.log("clicked note");
        dialogEdit.style.display = "block";
        var inputElem = $("#descriptionInputEdit");
        var inputDate = $("#date");
        
        inputElem.val($(this).children('#description').text())
        
        console.log($(this).children('#date').text());
        
        inputDate.val($(this).children('#date').text());
        var id = $(this).attr('id').split('-')[1];

        edit.onclick = function () {

            var descriptionField = inputElem.val();
            console.log(descriptionField);
            var date = inputDate.val();

            var descriptionInfo = descriptionField;

            console.log(id);
            console.log(descriptionInfo);
            console.log(date);

            inputElem.val("");

            var note = {
                id: id,
                description: descriptionInfo,
                date: date,
            }

            editNote(note);
            if (date != "") {
                $('#note-' + id).html('<p id="description">' + descriptionInfo + '</p>' + '<p id="date">' + date + '</p>');
                dialogEdit.style.display = "none";
            } else {
                $('#note-' + id).html('<p id="description">' + descriptionInfo + '</p>' + '<p  > No date Available</p>');
                dialogEdit.style.display = "none";
            }
        }
        delet.onclick = function (note) {
            deleteNote(id);
            $('#note-' + id).remove();

            console.log($('#notes > div').length);
            if ($('#notes > div').length < 1) {
                $('#notes').append('<h3 id="emptyNotes">No Current Notes</h3>')
            }

            dialogEdit.style.display = "none";
        }

        $('#closeEdit').click(function () {
            dialogEdit.style.display = "none";
        })


    })

    btn.onclick = function () {
        marketing.style.display = "block";
    }

    statsBtn.onclick = function () {
        console.log("Stats display")
        dialogStats.style.display = "block";
    }

    clientBtn.onclick = function () {
        dialogClient.style.display = "block";
    }

    saveCustomer.onclick = function () {

        var name = $("#nameClient").val();
        var country = $("#countryClient").val();
        var city = $("#cityClient").val();
        console.log(name)
        console.log(country)
        console.log(city)
        var type = $("input:radio[name=user]:checked").val();
        console.log(type)


        var customer = {
            name: name,
            type: type,
            city: city,
            country: country
        }
        createCustomer(customer, function (createdCustomer) {
            showNote(createdCustomer);
        })

        dialogClient.style.display = "none";
    }


    closeMarketing.onclick = function () {

        marketing.style.display = "none";

    }

    saveMarketing.onclick = function () {

        var user = $("input:radio[name=user]:checked").val()
        var campaign = $("input:radio[name=type]:checked").val()
        console.log(user)
        console.log(campaign)
        var descriptionField = $("#campaignDescription").val();
        console.log(descriptionField)
        var dateStart = $("#dateStart").val();
        var dateEnd = $("#dateEnd").val();
        console.log(dateStart);
        console.log(dateEnd);

        //ToDo send to the node server http://localhost:8080/marketing the data

        var campaign = {
            user: user,
            campaign: campaign,
            description: descriptionField,
            dateStart: dateStart,
            dateEnd: dateEnd
        }
        createCampaign(campaign, function (createdCampaign) {
            showNote(createdCampaign);
        })

        marketing.style.display = "none";
    }


    window.onclick = function (event) {
        if (event.target == marketing) {
            marketing.style.display = "none";
        }
        if (event.target == dialogClient) {
            dialogClient.style.display = "none";
        }
        if(event.target == dialogStats){
            dialogStats.style.display = "none";
        }
    }


    
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