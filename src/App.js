import React, { Component } from 'react';
import MapBox from "./components/MapBox/index"
import SelectBoroughs from "./components/SelectBoroughs/index"; 
import SelectNeighborhoods from "./components/SelectNeighborhoods/index";
import BoroughChart from "./components/BoroughChart/index";
import './App.css';
import axios from "axios"

const ALLBOROUGHS = "All Boroughs" 


class App extends Component { 
  state = {
    boroughs: [],
    sel_borough: "",
    sel_neighborhood: "",
    sites: [],
    filteredSites: [] 
  }

  componentDidMount() {
    this.setState(
      {
        sel_borough: ALLBOROUGHS,
      },
      () => { 
        this.fetchSites()
      });
    this.fetchBoroughs();
  } 

  fetchBoroughs = async () => {
    try {
      const res = await axios.get(
        'https://data.cityofnewyork.us/resource/rvih-nhyn.json?$group=borough_name&$select=borough_name'
      );
      let dropdownBorough = res.data.map((x) => x.borough_name)
      let dropdown = [ALLBOROUGHS,...dropdownBorough] 
      this.setState({
        boroughs: dropdown
      });
    } catch (error) {
      console.log(error)
    }
  } 

  fetchSites = async () => { 
    let options = {}
    if (this.state.sel_borough !== ALLBOROUGHS) {
      options = { 
        params: {
          borough_name: this.state.sel_borough 
        }
      }
    }
    const res = await axios.get('https://data.cityofnewyork.us/resource/rvih-nhyn.json',options)

    this.setState({
      sites: res.data
    })
  }


  handleInputChange = (event) => {
    this.setState(
      {
        sel_borough: event.target.value 
      },
      () => {
        this.fetchSites()
      })
  }

  handleNtaChange = (event) => { 
    let sel_neighborhood = event.target.value;
    let filteredPlaces = this.state.sites.filter(ele => {
      return ele.nta === sel_neighborhood
    })
    this.setState(
      {
        sel_neighborhood: event.target.value,
        filteredSites: filteredPlaces
      })
  }



  render() {

    return (
      <>

        <nav className="nav-wrapper">
          <p className="center projectTitle p-0 text-white">Privately Owned Public Spaces</p>
        </nav>
      <div className="container-fluid"> 
      <div className="row mt-2 mb-0"> 
      <div className="col-md-3">

      <a className="aboutBtn mt-2 waves-effect waves-light btn btn-block modal-trigger #3f88c5 text-white" href="#modal1">About the Project</a>

      <div id="modal1" className="modal">
        <div className="modal-content pb-0 mb-0"> 
          <p>Privately owned public spaces, also known by the acronym POPS, are outdoor and indoor spaces provided for public enjoyment by private owners in exchange for bonus floor area or waivers, an incentive first introduced into New York City’s zoning regulations in 1961. This database contains detailed information about each privately owned public space in New York City.</p>
          <div className="modal-footer mb-0 pb-0">
          <a href="#!" className="aboutCloseBtn modal-close waves-effect waves-green btn text-white #3f88c5">Close</a>
        </div>
        </div> 
      </div> 

      <div className="searchCard">
      <h6>&nbsp;<b>Choose a Borough</b></h6> 
        <SelectBoroughs results={this.state.boroughs} handleInputChange={this.handleInputChange} /> 
        <h6>&nbsp;<b>Choose a Neighborhood</b></h6> 
        {
          this.state.sel_borough
          && <SelectNeighborhoods results={this.state.sites} handleNtaChange={this.handleNtaChange} /> 
        }
        </div>

        <BoroughChart results={this.state.filteredSites.length > 0 ? this.state.filteredSites : this.state.sites}/> 

        </div> 
          <div className="col-md-9 mb-0 pb-0">
              <div className="card mb-0 pb-0"> 
                <MapBox results={this.state.filteredSites.length > 0 ? this.state.filteredSites : this.state.sites}  /> 
              </div>
            </div> 
        </div>
        <div className="row justify-content-end mt-0 pt-0">
          <p className="mr-4">Data Source: <a target="_blank" rel="noopener noreferrer" aria-label="NYC open data" href="https://data.cityofnewyork.us/City-Government/Privately-Owned-Public-Spaces-POPS-/rvih-nhyn">NYC OpenData  </a></p>
        </div>

       </div> 
      </>
    )
  }
}

export default App;
