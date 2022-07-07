
$(document).ready(function () {
    $('#formCadastroBeneficiario').submit(function (e) {
        e.preventDefault();
        $.ajax({
            url: urlPost,
            method: "POST",
            data: {
                "NOME": $(this).find("#NomeBeneficiario").val(),
                "CPF": $(this).find("#CPFBeneficiario").val()
            },
            error:
                function (r) {
                    if (r.status == 400)
                        ModalDialog("Ocorreu um erro", r.responseJSON);
                    else if (r.status == 500)
                        ModalDialog("Ocorreu um erro", "Ocorreu um erro interno no servidor.");
                },
            success:
                function (r) {
                    ModalDialog("Sucesso!", r)
                    $("#formCadastroBeneficiario")[0].reset();
                }
        });
    })

})


function ModalBeneficiario() {

    var texto = '<div id="Beneficiario" class="modal fade">                                                                                                                     ' +
        '        <div class="modal-dialog">                                                                                                                                     ' +
        '            <div class="modal-content">                                                                                                                                ' +
        '                <div class="modal-header">                                                                                                                             ' +
        '                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>                                                             ' +
        '                    <h4 class="modal-title">' + 'Beneficiários' + '</h4>                                                                                               ' +
        '                </div>                                                                                                                                                 ' +
        '                <div class="modal-body">                                                                                                                               ' +
        '                 <form  id="formCadastroBeneficiario" method="post">' +//action="/Cliente/SalvaBeneficiario"
        '                    <p>                                                                                                                                                ' +
        '                       <div class="row"  style="display:flex; align-items:end;">                                                                                       ' +
        '                           <div class="col-md-4">                                                                                                                      ' +
        '                               <div class="form-group">                                                                                                                ' +
        '                                   <label for="CPFBeneficiario">CPF:</label>                                                                                                       ' +
        '                                   <input required="required" type="text" class="form-control" id="CPFBeneficiario" name="CPF" placeholder="Ex.: 010.011.111-00" maxlength="14">   ' +
        '                               </div>                                                                                                                                  ' +
        '                           </div >                                                                                                                                     ' +
        '                           <div class="col-md-6">                                                                                                                      ' +
        '                               <div class="form-group">                                                                                                                ' +
        '                                   <label for="Nome">Nome:</label>                                                                                                     ' +
        '                                   <input required="required" type="text" class="form-control" id="NomeBeneficiario" name="NomeBeneficiario" placeholder="Ex.: João" maxlength="50">           ' +
        '                               </div>                                                                                                                                  ' +
        '                           </div >                                                                                                                                     ' +
        '                           <div class="col-md-2">                                                                                                                      ' +
        '                               <div class="form-group">                                                                                                                ' +
        '                                   <button type="submit" class="btn btn-sm btn-success" style="height:33px; width:68px">Incluir</button>                               ' +
        '                               </div>                                                                                                                                  ' +
        '                           </div>                                                                                                                                      ' +
        '                       </div >                                                                                                                                         ' +
        '                   </form>' +
        '</br>' +
        '                       <div class="row">                                                                                                                               ' +
        '                           <div class="col-md-12">                                                                                                                     ' +
        '                               <div class="form-group">                                                                                                                ' +
        '                                   <table id="gridBeneficiarios" class="table"></table>                                                                                                                          ' +
        '                               </div>                                                                                                                                  ' +
        '                           </div>                                                                                                                                      ' +
        '                       </div >   ' +
        '                    </p>                                                                                                                                               ' +

        '                </div>                                                                                                                                                 ' +
        '                <div class="modal-footer">                                                                                                                             ' +
        '                    <button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>                                                                 ' +
        '                                                                                                                                                                       ' +
        '                </div>                                                                                                                                                 ' +
        '            </div><!-- /.modal-content -->                                                                                                                             ' +
        '  </div><!-- /.modal-dialog -->                                                                                                                                        ' +
        '</div> <!-- /.modal -->                                                                                                                                                ';

    $('body').append(texto);
}

function AbrirModalBeneficiario() {
    $('#Beneficiario').modal('show');
}


function ModalDialog(titulo, texto) {
    var random = Math.random().toString().replace('.', '');
    var texto = '<div id="' + random + '" class="modal fade">                                                               ' +
        '        <div class="modal-dialog">                                                                                 ' +
        '            <div class="modal-content">                                                                            ' +
        '                <div class="modal-header">                                                                         ' +
        '                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>         ' +
        '                    <h4 class="modal-title">' + titulo + '</h4>                                                    ' +
        '                </div>                                                                                             ' +
        '                <div class="modal-body">                                                                           ' +
        '                    <p>' + texto + '</p>                                                                           ' +
        '                </div>                                                                                             ' +
        '                <div class="modal-footer">                                                                         ' +
        '                    <button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>             ' +
        '                                                                                                                   ' +
        '                </div>                                                                                             ' +
        '            </div><!-- /.modal-content -->                                                                         ' +
        '  </div><!-- /.modal-dialog -->                                                                                    ' +
        '</div> <!-- /.modal -->                                                                                        ';

    $('body').append(texto);
    $('#' + random).modal('show');
}
