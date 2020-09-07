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
        action: '',
        rowData: {},
        currentId: '',
        isLoading: true
    }


    handleSubmit = (event) => {
      event.preventDefault()
    }

    handleRowClick = (event, rowData) => {
      this.props.history.push(`/store/${this.props.match.params.storeId}/storeType/${this.props.match.params.storeType}/PrintLabels/${rowData.id}`)
    }    

    handleChange = name => event => {
      this.setState({
        [name]: event.target.value,
      });
    };     

    componentDidMount = () => {
      this.props.onRequestStoreGoods(parseInt(this.props.storeId)).then(() => this.setState({isLoading: false})) 
    }    

  render() {
    const storeGoods = this.props.onGetStoreGoods
    console.log(storeGoods)
    return (    
			<div> 
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      />        
        <MaterialTable
          title="Search Labels"
          isLoading={this.state.isLoading}
          columns={this.state.columns}
          data={storeGoods}
          onRowClick={this.handleRowClick}
          options={{
            paging: false,
            actionsColumnIndex: -1,
            searchFieldStyle: {
              width: '50vh',
              fontSize: 25,
            }
          }}
          actions={[
            {
              icon: 'print',
              tooltip: 'Print Label',
              onClick: (event, rowData) => {
                event.stopPropagation()
                this.setState({action: 'Add', rowData: rowData, currentId: rowData.id})
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


