import React from "react";
import { connect } from 'react-redux'
import { getLocations } from '../../../actions/getLocations.action';
import { updateLocationRowOrder } from '../../../actions/updateLocationRowOrder.action';
import { deleteLocation } from '../../../actions/deleteLocation.action';
import Reorder from '@material-ui/icons/Reorder';
import Delete from '@material-ui/icons/Delete';

class LocationsTable extends React.Component {
	state = {
		locations:[]
	}

  onDragStart = (e, index) => {
    this.draggedItem = this.props.onGetLocations[index];
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", e.target.parentNode);
    e.dataTransfer.setDragImage(e.target.parentNode, 20, 20);
  };

  onDragOver = index => {
    const draggedOverItem = this.props.onGetLocations[index];
    // if the item is dragged over itself, ignore
    if (this.draggedItem === draggedOverItem) {
      return;
    }
    // filter out the currently dragged item
    let locations = this.props.onGetLocations.filter(item => item !== this.draggedItem);
    // add the dragged item after the dragged over item
    locations.splice(index, 0, this.draggedItem);

    this.setState({ locations });
  };

  onDragEnd = () => {
    this.draggedIdx = null;
    const locationIds = this.state.locations.map(item => parseInt(item.id))
    this.props.onUpdateLocationRowOrder(locationIds)
  };  

  handleDelete = (id) => {
		 if (window.confirm('Are you sure you wish to delete this item?')) {
			this.props.onDeleteLocation(id)
		 }
  }

	componentDidMount = () => {
		this.props.onRequestLocations(this.props.storeId)
	}	

  render() {
    return (    

    	<div className="table-responsive">
			  <table className="table table-striped">
			    <thead>
			      <tr>
			        <th>Drag</th>
			        <th>Name</th>
			        <th>Delete</th>
			      </tr>
			    </thead>

			    <tbody>
				    { this.props.onGetLocations.map((location, idx) => (  
					    <tr key={location.id} onDragOver={() => this.onDragOver(idx)}>
					    	<td
				    		location={location}
				    		draggable
				        onDragStart={e => this.onDragStart(e,idx)}
				        onDragEnd={this.onDragEnd}
					    	><Reorder style={{cursor:'move'}}/></td>
					    	<td>{location.name}</td>
					    	<td><Delete style={{cursor:'pointer'}} onClick={ () => this.handleDelete(location.id)}/></td>
							</tr>
				    ))
				    }
			    </tbody>

			  </table>
		  </div>
    );
  }
}

const mapStateToProps = state => ({
  onGetLocations: state.locationReducer.locations,
});

const mapActionsToProps = {
  onRequestLocations: getLocations,
  onUpdateLocationRowOrder: updateLocationRowOrder,
  onDeleteLocation: deleteLocation
};


export default connect(mapStateToProps, mapActionsToProps)(LocationsTable);
