
interface valor {
  parametro: boolean;
}

export const ModalBien: React.FC<valor> = ({ parametro }) => {


return(
<div>

{parametro && 
<div id="myModal" className="modal fade">
	<div className="modal-dialog modal-confirm">
		<div className="modal-content">
			<div className="modal-header">
				<div className="icon-box">
					<i className="material-icons">&#xE876;</i>
				</div>				
				<h4 className="modal-title w-100">Muy Bien</h4>	
			</div>
			<div className="modal-body">
				<p className="text-center">El miembro fue guardado exitosamente</p>
			</div>
			<div className="modal-footer">
				<button className="btn btn-success btn-block" data-dismiss="modal">OK</button>
			</div>
		</div>
	</div>
</div>  
}

{!parametro &&
<div id="myModal" className="modal fade">
	<div className="modal-dialog modal-confirm">
		<div className="modal-content">
			<div className="modal-header">
				<div className="icon-box">
					<i className="material-icons">&#xE5CD;</i>
				</div>				
				<h4 className="modal-title w-100">Error</h4>	
			</div>
			<div className="modal-body">
				<p className="text-center">Hubo un Error al guardar los datos , contacte con el programador</p>
			</div>
			<div className="modal-footer">
				<button className="btn btn-danger btn-block" data-dismiss="modal">OK</button>
			</div>
		</div>
	</div>
</div>     
}


</div>

)
}