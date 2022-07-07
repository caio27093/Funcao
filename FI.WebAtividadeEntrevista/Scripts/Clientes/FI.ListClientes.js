
$(document).ready(function () {

    if (document.getElementById("gridClientes"))
        $('#gridClientes').jtable({
            title: 'Clientes',
            paging: true, //Enable paging
            pageSize: 5, //Set page size (default: 10)
            sorting: true, //Enable sorting
            defaultSorting: 'Nome ASC', //Set default sorting
            actions: {
                listAction: urlClienteList,
            },
            fields: {
                Nome: {
                    title: 'Nome',
                    width: '50%'
                },
                Email: {
                    title: 'Email',
                    width: '35%'
                },
                Alterar: {
                    title: '',
                    display: function (data) {
                        return '<button onclick="window.location.href=\'' + urlAlteracao + '/' + data.record.Id + '\'" class="btn btn-primary btn-sm">Alterar</button>';
                    }
                }
            }
        });

    //Load student list from server
    if (document.getElementById("gridClientes"))
        $('#gridClientes').jtable('load');
})




$(document).ready(function () {

    if (document.getElementById("gridBeneficiarios"))
        $('#gridBeneficiarios').jtable({
            paging: false, //Enable paging
            pageSize: 5, //Set page size (default: 10)
            sorting: false, //Enable sorting
            setOpaque: false,
            actions: {
                listAction: urlBeneficiarioList,
            },
            fields: {
                CPF: {
                    title: 'CPF',
                    width: '30%'
                },
                Nome: {
                    title: 'Nome',
                    width: '30%'
                },
                Alterar: {
                    title: '',
                    width: '40%',
                    display: function (data) {
                        return '<button class="btn btn-primary btn-sm">ALTERAR</button> <button class="btn btn-primary btn-sm">EXCLUIR</button>';
                    }
                }
            }
        });

    //Load student list from server
    if (document.getElementById("gridBeneficiarios"))
        $('#gridBeneficiarios').jtable('load');
})