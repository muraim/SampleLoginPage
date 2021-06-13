const e = React.createElement;

class DisplayUser extends React.Component {
    constructor(props) {
    super(props);
  }
    
  render() {
      return (<h1>Successful Login!</h1>)
  }

}
const domContainer = document.querySelector('#user_info_container');
ReactDOM.render(e(DisplayUser), domContainer);