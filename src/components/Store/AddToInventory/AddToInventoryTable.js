import React from "react";
import MaterialTable from 'material-table';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import Modal from '@material-ui/core/Modal'
import { getStoreGoods } from '../../../actions/getStoreGoods.action';
import { updateAmountInStock } from '../../../actions/updateAmountInStock.action';

import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
import AddCircle from '@material-ui/icons/AddCircle';
import RemoveCircle from '@material-ui/icons/RemoveCircle';
import Button from '@material-ui/core/Button';


class AddToInventoryTable extends React.Component {
    state = {
      rowData: [],
      openModal: false,
      action: '',
      amount: 0,
    }

    handleChange = name => event => {
      this.setState({
        [name]: event.target.value,
      });
    };     

    increase = () => {
      this.setState(prevState => {
         return {amount: prevState.amount + 1}
      })
    };

    decrease = () => {
      this.setState(prevState => {
        if (prevState.amount > 0) {
         return {amount: prevState.amount - 1}
        }
      })
    };    

    handleClose = () => {
      this.setState({openModal: false})
    };

    handleSubmit = (event) => {
      event.preventDefault()
      if (this.state.action === 'Add'){        
        let amount = this.state.amount
        this.props.onUpdateAmountInStock(this.state.rowData.id, amount)
        this.setState({openModal: false, amount: 0})        
      } else {
        let amount = -Math.abs(this.state.amount)
        this.props.onUpdateAmountInStock(this.state.rowData.id, amount)
        this.setState({openModal: false, amount: 0 })
        }
    }


    componentDidMount = () => {
      this.props.onRequestStoreGoods(parseInt(this.props.storeId))     
    }    


  render() {
      let storeGoods = this.props.onGetStoreGoods
    return (    
      <div> 
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      /> 

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',          
        }}
        open={this.state.openModal}
        onClose={this.handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={this.state.openModal}>
          <div style={{
            backgroundColor: '#fff',
            border: '2px solid #000',
            boxShadow: '5px',
            padding: '60px',            
          }}>
          <h2 align='center'>{this.state.action} Inventory</h2>
          <form onSubmit={this.handleSubmit}>
            <div style={{
              display: 'flex',
            }}> 
            <AddCircle 
              onClick={this.increase}
              style={{
                flex: 1,
                width: 80,
                height: 80,
              }} 
            />
            <TextField
                style={{flex: 1}}
                required
                type="number"
                label="Amount"
                value={this.state.amount}
                onChange={this.handleChange('amount')}
                name="name"
                placeholder="Amount"
                fullWidth
                margin="normal"
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
              />  
            <RemoveCircle 
              onClick={this.decrease}
              style={{
                flex: 1,
                width: 80,
                height: 80,
              }}
            />
            </div>
            <div align='center' style={{marginTop: '15px'}}> 
               <Button  type='submit' variant="contained" color="primary">
                    Update Amount In Stock
               </Button>            
            </div>
            </form>
          </div>
        </Fade>
      </Modal>


        <MaterialTable
          title="Add To Inventory"
          columns={
            [
              { title: 'ID', field: 'id' },
              { title: 'Name', field: 'product' },
              { title: 'Amount In Stock', field: 'amountInStock' },
            ]           
          }
          data={storeGoods}
          options={{
            paging: false,
            actionsColumnIndex: -1
          }}  
          actions={[
            {
              icon: 'add',
              tooltip: 'Add',
              onClick: (event, rowData) => {
                event.stopPropagation()
                this.setState({openModal: true, action: 'Add', rowData: rowData})                
              }
            }, 
            {
              icon: 'remove',
              tooltip: 'Remove',
              onClick: (event, rowData) => {
                event.stopPropagation()
                this.setState({openModal: true, action: 'Remove', rowData: rowData})                
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
  onUpdateAmountInStock: updateAmountInStock,
};


export default connect(mapStateToProps, mapActionsToProps)(withRouter(AddToInventoryTable));


