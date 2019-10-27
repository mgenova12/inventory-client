import React from "react";
import MaterialTable from 'material-table';
import { connect } from 'react-redux'
import { getStoreGoods } from '../../../actions/getStoreGoods.action';
import { updateAmountInStock } from '../../../actions/updateAmountInStock.action';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
import AddCircle from '@material-ui/icons/AddCircle';
import RemoveCircle from '@material-ui/icons/RemoveCircle';
import Button from '@material-ui/core/Button';

class AddToInventoryTable extends React.Component {
    state = {
        columns: [
          { title: 'ID', field: 'id' },
          { title: 'Barcode', field: 'barcode' },
          { title: 'Name', field: 'product' },
          { title: 'Amount In Stock', field: 'amountInStock' },
        ],
        data: [],
        openModal: false,
        amount: 0,
        action: '',
        rowData: {},
        currentId: ''
    }

    getRows = (storeGoods) => {
      const flattenObject = (obj) => {
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
        storeGoods.forEach(storeGood => {  
          flattenObject(storeGood)       
        })
    }

    handleClose = () => {
      this.setState({openModal: false})
    };

    handleSubmit = (event) => {
      event.preventDefault()
      if (this.state.action === 'Add'){        
        let amount = this.state.amount
        let listCopy = [...this.state.data]
        listCopy.filter((item) => { 
          if (item.id === this.state.currentId) {
           item.amountInStock = parseInt(item.amountInStock) + parseInt(amount);
          }
          return item;
        })
        this.props.onUpdateAmountInStock(this.state.rowData.id, amount)
        this.setState({openModal: false, amount: 0, data: listCopy})        
      } else {
        let amount = -Math.abs(this.state.amount)
        let listCopy = [...this.state.data]
        listCopy.filter((item) => { 
          if (item.id === this.state.currentId) {
           item.amountInStock = parseInt(item.amountInStock) + parseInt(amount);
          }
          return item;
        })
        this.props.onUpdateAmountInStock(this.state.rowData.id, amount)
        this.setState({openModal: false, amount: 0, data: listCopy})
      }

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
              icon: 'add',
              tooltip: 'Add To Inventory',
              onClick: (event, rowData) => {
                event.stopPropagation()
                this.setState({openModal: true, action: 'Add', rowData: rowData, currentId: rowData.id})
              }
            },
            {
              icon: 'remove',
              tooltip: 'Remove from Inventory',
              onClick: (event, rowData) => {
                event.stopPropagation()
                this.setState({openModal: true, action: 'Remove', rowData: rowData, currentId: rowData.id})
              }
            }            
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


export default connect(mapStateToProps, mapActionsToProps)(AddToInventoryTable);


