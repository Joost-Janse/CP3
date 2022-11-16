
import './App.css';
import React from 'react'

// "https://www.dnd5eapi.co/api/spells/"

class Spell extends React.Component {
  constructor(props) {
        super(props);
        this.getSpells();
        this.state = {
          count: "",
          results: [],
          desc: ""
        };
        
        this.handleChange = this.handleChange.bind(this);
       
      }
      
      getSpells() {
        var url = "https://www.dnd5eapi.co/api/spells/";
        fetch(url)
          .then((data) => {
            return (data.json());
          })
          .then((spelllist) => {
            this.state.count = spelllist.count;
            this.state.results = spelllist.results;
            console.log(this.state);
          });
      }
      
      handleChange(event) {
        var lookupSpell = "";
        var spellName = document.getElementById("searchBox").value;
        for (var i = 0; i < this.state.count; ++i) {
          if (spellName.toLowerCase() === this.state.results[i].name.toLowerCase()) {
            lookupSpell = this.state.results[i];
            break;
          }
        }
        console.log(lookupSpell);
        var url = "https://www.dnd5eapi.co/api/spells/" + lookupSpell.index;
        fetch(url)
          .then((data) => {
            return (data.json());
          })
          .then((spelllist) => {
            this.setState(
              {desc: spelllist.desc}, 
              () => {console.log(this.state);},
              );
          });
        
      }
      
      render() {
        return(
          <>
            <h1 class="name">D&D SPELL LOOKUP</h1>
            <input id="searchBox" type="text"/>
            <input type="submit" onClick={this.handleChange} value="Submit" />
            <div class="page">
              <div class="words">{this.state.desc}</div>
            </div>
            <a href="https://github.com/Joost-Janse/lab3.git">GitHub link</a>
          </>
        );
      }
}

export default function App() {
  return (
        <div className="App">
            <Spell/>
        </div>
    );
}