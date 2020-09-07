import React from "react";
import MaterialTable from 'material-table';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import { getStoreGoods } from '../../../actions/getStoreGoods.action';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

class PrintLabelsTable extends React.Component {
    state = {
        columns: [
          { title: 'ID', field: 'id' },
          { title: 'Name', field: 'product' },
        ],
        action: '',
        rowData: {},
        currentId: '',
        isLoading: true,
        prepped: true,
        value: 0
    }


    handleSubmit = (event) => {
      event.preventDefault()
    }

    handleRowClick = (event, rowData) => {
      this.props.history.push(`/store/${this.props.match.params.storeId}/storeType/${this.props.match.params.storeType}/PrintLabels/${rowData.id}`)
    }    

    handleChange = (value) => {
      this.setState({
        prepped: !this.state.prepped,
        value: value,
      })
    }

    componentDidMount = () => {
      this.props.onRequestStoreGoods(parseInt(this.props.storeId)).then(() => this.setState({isLoading: false})) 
    }

  render() {

    const storeGoods = this.props.onGetStoreGoods.filter((storeGood) => {
      if (this.state.prepped) {
        return storeGood.prepped
      } else {
        return !storeGood.prepped
      }
    })

    return (
			<div> 
          <AppBar position="static" color="default">
            <Tabs
              value={this.state.value}
              indicatorColor="primary"
              textColor="primary"
              variant="scrollable"
              scrollButtons="auto"
              aria-label="scrollable auto tabs example"
            >
              <Tab 
                onClick={() => this.handleChange(0)} 
                label='Prepped' 
                style={{outlineStyle:'none'}} />
              <Tab 
                onClick={() => this.handleChange(1)} 
                label='Non Prepped' 
                style={{outlineStyle:'none'}} />                
            ))}        

            </Tabs>         
          </AppBar>

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


