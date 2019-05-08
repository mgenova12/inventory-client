import React from "react";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

class Notifications extends React.Component {
  
  constructor(props) {
    super(props);
    this.successNotification = this.successNotification.bind(this);
    this.notificationDOMRef = React.createRef();
  }

  successNotification(title, message, type) {
    this.notificationDOMRef.current.addNotification({
      title: title,
      message: message,
      type: type,
      insert: "top",
      container: "top-right",
      animationIn: ["animated", "fadeIn"],
      animationOut: ["animated", "fadeOut"],
      dismiss: { duration: 2000 },
      dismissable: { click: true }
    });
  }

  componentDidMount = () => {
	this.successNotification('Saved!', 'Product has been saved!', 'success')
  }
	render() {

	    return (
			<div> 
				<ReactNotification ref={this.notificationDOMRef} />
			</div>  
	    )
	}

}

export default Notifications
