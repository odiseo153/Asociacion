
interface valor {
  parametro: string;
  titulo:string;
}

export const ModalBien: React.FC<valor> = ({ parametro,titulo }) => {


return(
<div>

<div id="myModal" className="modal fade">
	<div className="modal-dialog modal-confirm">
		<div className="modal-content">
			<div className="modal-header">			
				<h4 className="modal-title w-100">{titulo}</h4>	
			</div>
			<div className="modal-body">
				<p className="text-center">{parametro}</p>
			</div>
			<div className="modal-footer">
				<button className="btn btn-danger btn-block" data-dismiss="modal">OK</button>
			</div>
		</div>
	</div>
</div>     



</div>

)
}