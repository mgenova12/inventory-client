import React from "react";


class CombindedOrderTable extends React.Component {

  render() {
    return (    
	    	<div className="table-responsive">
					<table className="table">
						<tr>
						<td className='column'>
						    <table>
						        <thead>
						            <tr>
						                <td>column 1 header 1</td>
						            </tr>
						        </thead>
						        <tbody>
						            <tr>
						                <td>column 1 row 1</td>
						            </tr>
						            <tr>
						                <td>column 1 row 2</td>
						            </tr>
						        </tbody>
						    </table>
						</td>

						<td className='column'>
						    <table>
						        <thead>
						            <tr>
						                <td>column 2 header 1</td>
						            </tr>
						        </thead>
						        <tbody>
						            <tr>
						                <td>column 2 row 1</td>
						            </tr>
						            <tr>
						                <td>column 2 row 2</td>
						            </tr>
						        </tbody>
						    </table>
						</td>

						<td className='column'>
						    <table>
						        <thead>
						            <tr>
						                <td>column 2 header 1</td>
						            </tr>
						        </thead>
						        <tbody>
						            <tr>
						                <td>column 2 row 1</td>
						            </tr>
						            <tr>
						                <td>column 2 row 2</td>
						            </tr>
						        </tbody>
						    </table>
						</td>	

						</tr>
					</table>
				</div>
    );
  }
}

export default CombindedOrderTable;
