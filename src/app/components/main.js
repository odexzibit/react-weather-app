import React from 'react';
import ReactDOM from "react-dom";
import ReactCssTransitionGroup from 'react-addons-css-transition-group';

import City from "./city";
import Current from "./current";
import AddCity from "./addCity";

class MainComponent extends React.Component {
  constructor(){
    super();
    this.state = {
      city: "",
      current: {
        icon: "",
        temperature: null,
        humidity: null,
        city: "",
        country: "",
        temperature: null
      },
      blocks: []
    };
    this.addBlock = this.addBlock.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.clearList = this.clearList.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.addValue = this.addValue.bind(this);
  }

  componentWillMount(){
    if (localStorage.getItem('cities')){
      this.updateBlock(JSON.parse(localStorage.getItem('cities')));
      this.state.blocks = JSON.parse(localStorage.getItem('cities'));
    }
    this.addValue();
  }

  componentDidMount(){
    setInterval(() => {
      this.updateBlock(this.state.blocks);
      this.addValue();
    }, 300000);
  }

  addValue(){
    window.navigator.geolocation.getCurrentPosition((position) => {
      let lat =  position.coords.latitude;
      let lng = position.coords.longitude;
      // console.log(`lat: ${lat}, lng: ${lng}`);
      fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&APPID=d68cfe899f52c4c1cb4328792bbc47e0`)
      .then(response => response.json())
      .then(parsed => ({
        temperature: Math.round(parsed.main.temp - 273),
        humidity: parsed.main.humidity,
        icon: parsed.weather[0].icon,
        country: parsed.sys.country.toLowerCase(),
        city: parsed.name
      }))
      .then(current => {
        this.setState({
          current: current
      })
      localStorage.setItem('current', JSON.stringify(current));
    });
  })
  }

  handleChange(e){
    this.setState({
      city: e.target.value
    })
  }

  addBlock(event){
    event.preventDefault();
    let city = this.state.city;
    let exists = this.state.blocks.some((block) => block.city === city.charAt(0).toUpperCase() + city.slice(1));
    if (!exists){
      fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=d68cfe899f52c4c1cb4328792bbc47e0`)
        .then(response => response.json())
        .then(parsed => ({
          temperature: Math.round(parsed.main.temp - 273),
          humidity: parsed.main.humidity,
          icon: parsed.weather[0].icon,
          country: parsed.sys.country.toLowerCase(),
          city: city.charAt(0).toUpperCase() + city.slice(1),
          id: parsed.id
        }))
        .then(weather => {
          let {temperature, humidity, country, icon, city, id} = weather;
          const newBlocks = [...this.state.blocks, weather];
            this.setState({
              blocks: newBlocks
            })
          localStorage.setItem('cities', JSON.stringify(newBlocks));
      })
    }
  }

  updateBlock(arr){
      arr.map((i, index) => {
        let city = i.city;
        fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=d68cfe899f52c4c1cb4328792bbc47e0`)
          .then(response => response.json())
          .then(parsed => ({
            temperature: Math.round(parsed.main.temp - 273),
            humidity: parsed.main.humidity,
            country: parsed.sys.country.toLowerCase(),
            icon: parsed.weather[0].icon
          }))
          .then(weather => {
            let {temperature, humidity, icon} = weather;
            arr[index].temperature = temperature;
            arr[index].humidity = humidity;
            arr[index].icon = icon;
          })
      });
      this.setState({
        blocks: arr
      })
      localStorage.setItem('cities', JSON.stringify(arr));
  }

  clearList(){
    this.setState({
      blocks : []
    })
    localStorage.setItem('cities', []);
  }

  handleDelete(item){
    const blocks = this.state.blocks.filter((val, index) => val.id !== item);
    console.log(item)
    this.setState({
      blocks: blocks
    })
    localStorage.setItem('cities', JSON.stringify(blocks));
  }

  render(){
    let blocks2 = this.state.blocks.map(item => (
        <City
          key={item.id}
          icon={item.icon}
          city={item.city}
          temperature={item.temperature}
          humidity={item.humidity}
          country={item.country}
          handleDelete={() => this.handleDelete(item.id)}
        />
      )
    );
    let button;
    if (this.state.blocks.length > 1){
      button = <button onClick={this.clearList} id="clear">Clear list</button>;
    }
    let current = this.state.current;
    return(
      <div>
        <AddCity  handleChange={this.handleChange} addBlock={this.addBlock} />
        <ReactCssTransitionGroup transitionName="fade" transitionEnter={true} transitionLeave={true} transitionLeaveTimeout={500} transitionAppear={true}>
        <Current
          icon={current.icon}
          temperature={current.temperature}
          humidity={current.humidity}
          city={current.city}
          country={current.country}
          temperature ={current.temperature}
          currentCity={current.city}
        />
        {blocks2}
        </ReactCssTransitionGroup>
        {button}
      </div>
    );
  }
}

export default MainComponent
