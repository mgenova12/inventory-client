import React from "react";
import MaterialTable from 'material-table';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import { getStoreGoods } from '../../../actions/getStoreGoods.action';

class PrintLabelsTable extends React.Component {
    state = {
        columns: [
          { title: 'ID', field: 'id' },
          { title: 'Barcode', field: 'barcode' },
          { title: 'Name', field: 'product' },
        ],
        data: [],
        action: '',
        rowData: {},
        currentId: ''
    }

    getRows = (storeGoods) => {
      const flattenObject = (obj) => {
       if(obj.product.prepped){
       	const flattened = {}
        Object.keys(obj).forEach((key) => {
          if (typeof obj[key] === 'object' && obj[key] !== null) {
            flattened[key] = obj[key].name
            obj[key].barcode ? flattened['barcode'] = obj[key].barcode : flattened[key] = ''
          } else {
            flattened[key] = obj[key]
          }
        })
        const data = [...this.state.data];
        data.push(flattened);
        this.setState({ ...this.state, data });
       }
      }       
      storeGoods.forEach(storeGood => {  
        flattenObject(storeGood)       
      })
    }

    handleSubmit = (event) => {
      event.preventDefault()

    }

    handleChange = name => event => {
      this.setState({
        [name]: event.target.value,
      });
    };     

    componentDidMount = () => {
      this.props.onRequestStoreGoods(parseInt(this.props.storeId)).then(() => this.getRows(this.props.onGetStoreGoods))
    }    

  render() {
    return (    
			<div> 
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      />        
        <MaterialTable
          title="Search Labels"
          columns={this.state.columns}
          data={this.state.data}
          options={{
            paging: false,
            actionsColumnIndex: -1,
            searchFieldStyle: {
              width: '100vh',
              fontSize: 35,
              marginRight: '50vh'
            }
          }}
          actions={[
            {
              icon: 'print',
              tooltip: 'Print Label',
              onClick: (event, rowData) => {
                event.stopPropagation()
                this.setState({action: 'Add', rowData: rowData, currentId: rowData.id})
                this.props.history.push(`/store/${this.props.match.params.storeId}/storeType/${this.props.match.params.storeType}/PrintLabels/${rowData.id}`)
              }
            },           
          ]}          
        />
			</div>
    );
  }
}

const mapStateToProps = state => ({
  onGetStoreGoods: state.storeGoodsReducer.storeGoods,

});

const mapActionsToProps = {
  onRequestStoreGoods: getStoreGoods,
};


export default connect(mapStateToProps, mapActionsToProps)(withRouter(PrintLabelsTable));


