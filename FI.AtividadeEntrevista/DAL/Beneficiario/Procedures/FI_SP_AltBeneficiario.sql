CREATE PROC FI_SP_AltBeneficiario
    @NOME			VARCHAR (50)	,
	@CPF			VARCHAR (14)	,
	@IdCliente		BIGINT			,
	@Id				BIGINT
AS
BEGIN

    IF (SELECT COUNT(CPF) FROM BENEFICIARIOS WHERE CPF=@CPF AND IDCLIENTE=@IDCLIENTE) = 0
        BEGIN
			UPDATE BENEFICIARIOS 
				SET 
					NOME			= @NOME, 
					CPF				= @CPF,
					IDCLIENTE		= @IdCliente
				WHERE Id = @Id
		END
	ELSE
		BEGIN
            SELECT 0
		END
END