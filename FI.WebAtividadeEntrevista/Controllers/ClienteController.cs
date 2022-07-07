using FI.AtividadeEntrevista.BLL;
using WebAtividadeEntrevista.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using FI.AtividadeEntrevista.DML;
using System.Web.UI;

namespace WebAtividadeEntrevista.Controllers
{
    public class ClienteController : Controller
    {
        static List<BnfModel> beneficiarios = new List<BnfModel> ( );
        public ActionResult Index ( )
        {
            return View ( );
        }


        public ActionResult Incluir ( )
        {
            return View ( );
        }

        public ActionResult IncluirBeneficiario ( )
        {
            return View ( );
        }

        /*[HttpPost]
        public string SalvaBeneficiario(BnfModel model)
        {

            return "ok";
        }*/

        public bool VerificarExistenciaCPFBeneficiario ( string CPF )
        {
            return beneficiarios.Any ( l => l.CPF == CPF );
        }


        [HttpPost]
        public JsonResult Incluir ( ClienteModel model )
        {


            BoCliente bo = new BoCliente ( );
            BoBeneficiario be = new BoBeneficiario ( );

            if (model.CEP == null && !string.IsNullOrEmpty ( model.CPF ))
            {

                if (!bo.ValidacaoCPF ( model.CPF ))
                {
                    Response.StatusCode = 400;
                    return Json ( "Favor informar um CPF válido." );
                }

                if (VerificarExistenciaCPFBeneficiario ( model.CPF ))
                {
                    Response.StatusCode = 400;
                    return Json ( "CPF ja utilizado para um beneficiario desta lista." );
                }


                beneficiarios.Add ( new BnfModel ( ) { CPF = model.CPF, Nome = model.Nome } );
                return Json ( "Beneficiario cadastrado com sucesso" );
            }
            else
            {

                if (!this.ModelState.IsValid)
                {
                    List<string> erros = (from item in ModelState.Values
                                          from error in item.Errors
                                          select error.ErrorMessage).ToList ( );

                    Response.StatusCode = 400;
                    return Json ( string.Join ( Environment.NewLine, erros ) );
                }
                else
                {
                    if (!bo.ValidacaoCPF ( model.CPF ))
                    {
                        Response.StatusCode = 400;
                        return Json ( "Favor informar um CPF válido." );
                    }

                    if (bo.VerificarExistencia ( model.CPF ))
                    {
                        Response.StatusCode = 400;
                        return Json ( "CPF informado já cadastrado." );
                    }


                    model.Id = bo.Incluir ( new Cliente ( )
                    {
                        CEP = model.CEP,
                        Cidade = model.Cidade,
                        Email = model.Email,
                        Estado = model.Estado,
                        Logradouro = model.Logradouro,
                        Nacionalidade = model.Nacionalidade,
                        Nome = model.Nome,
                        Sobrenome = model.Sobrenome,
                        Telefone = model.Telefone,
                        CPF = model.CPF
                    } );

                    if (beneficiarios.Count >= 1)
                    {

                        foreach (var item in beneficiarios)
                        {
                            be.Incluir ( new Beneficiario ( )
                            {
                                IdCliente = model.Id,
                                Nome = item.Nome,
                                CPF = item.CPF

                            } );
                        }
                    }

                    //beneficiarios = new List<BnfModel> ( );
                    return Json ( "Cadastro efetuado com sucesso" );

                }
            }


        }

        [HttpPost]
        public JsonResult Alterar ( ClienteModel model )
        {
            BoCliente bo = new BoCliente ( );

            if (!this.ModelState.IsValid)
            {
                List<string> erros = (from item in ModelState.Values
                                      from error in item.Errors
                                      select error.ErrorMessage).ToList ( );

                Response.StatusCode = 400;
                return Json ( string.Join ( Environment.NewLine, erros ) );
            }
            else
            {
                if (!bo.ValidacaoCPF ( model.CPF ))
                {
                    Response.StatusCode = 400;
                    return Json ( "Favor informar um CPF válido." );
                }

                if (bo.VerificarExistencia ( model.CPF ))
                {
                    Cliente cliente = bo.Consultar ( model.Id );

                    if (cliente.CPF != model.CPF)
                    {
                        Response.StatusCode = 400;
                        return Json ( "CPF informado já cadastrado." );
                    }
                }

                bo.Alterar ( new Cliente ( )
                {
                    Id = model.Id,
                    CEP = model.CEP,
                    Cidade = model.Cidade,
                    Email = model.Email,
                    Estado = model.Estado,
                    Logradouro = model.Logradouro,
                    Nacionalidade = model.Nacionalidade,
                    Nome = model.Nome,
                    Sobrenome = model.Sobrenome,
                    Telefone = model.Telefone,
                    CPF = model.CPF
                } );

                return Json ( "Cadastro alterado com sucesso" );
            }
        }

        [HttpGet]
        public ActionResult Alterar ( long id )
        {
            BoCliente bo = new BoCliente ( );
            Cliente cliente = bo.Consultar ( id );
            Models.ClienteModel model = null;

            if (cliente != null)
            {
                model = new ClienteModel ( )
                {
                    Id = cliente.Id,
                    CEP = cliente.CEP,
                    Cidade = cliente.Cidade,
                    Email = cliente.Email,
                    Estado = cliente.Estado,
                    Logradouro = cliente.Logradouro,
                    Nacionalidade = cliente.Nacionalidade,
                    Nome = cliente.Nome,
                    Sobrenome = cliente.Sobrenome,
                    Telefone = cliente.Telefone,
                    CPF = cliente.CPF
                };


            }

            return View ( model );
        }



        [HttpPost]
        public JsonResult ClienteList ( int jtStartIndex = 0, int jtPageSize = 0, string jtSorting = null )
        {
            try
            {
                int qtd = 0;
                string campo = string.Empty;
                string crescente = string.Empty;
                string[] array = jtSorting.Split ( ' ' );

                if (array.Length > 0)
                    campo = array[0];

                if (array.Length > 1)
                    crescente = array[1];

                List<Cliente> clientes = new BoCliente ( ).Pesquisa ( jtStartIndex, jtPageSize, campo, crescente.Equals ( "ASC", StringComparison.InvariantCultureIgnoreCase ), out qtd );

                //Return result to jTable
                return Json ( new { Result = "OK", Records = clientes, TotalRecordCount = qtd } );
            }
            catch (Exception ex)
            {
                return Json ( new { Result = "ERROR", Message = ex.Message } );
            }
        }



        [HttpPost]
        public JsonResult BeneficiarioList ( int jtStartIndex = 0, int jtPageSize = 0, string jtSorting = null )
        {
            try
            {
                int qtd = beneficiarios.Count;

                //Return result to jTable
                return Json ( new { Result = "OK", Records = beneficiarios, TotalRecordCount = qtd } );
            }
            catch (Exception ex)
            {
                return Json ( new { Result = "ERROR", Message = ex.Message } );
            }
        }



    }
}