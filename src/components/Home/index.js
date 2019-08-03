import React from "react";
import HomeList from './HomeList'
import HomeNav from './HomeNav'

class Home extends React.Component {


  render() {
    return (    
	    <div> 
	    	<HomeNav/>
	    	<HomeList/>
		</div>
    );
  }
}

export default Home;
