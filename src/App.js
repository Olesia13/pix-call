import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class App extends Component {
	constructor( props ) {
		super( props );
		this.state = {
			searchText: '',
			apiUrl: 'https://pixabay.com/api',
			apiKey: '10090698-b2e1e317b8bdd324c2fd30b81',
			images: [],
		};

	}
	onTextChange = ( e ) => {
		this.setState( { searchText: e.target.value } );
	}
	onClick = () => {
		console.log( this.state.searchText, this.state.images )
		axios
			.get( `${ this.state.apiUrl}/?key=${ this.state.apiKey}&q=${ this.state.searchText }&image_type=photo` )
			.then( res => {
				this.setState( { images: res.data.hits } );
				console.log( this.state.images )
			} )
			.catch( err => console.log( err ) );

	}
	getImage() {
		if ( this.state.images.length === 0 ) {
			return null;
		}

		return this
			.state
			.images
			.map( image => {
				return ( <li key={image.id}>
					<img src={image.largeImageURL} alt="#"/></li> )
			} )
	}
	render() {

		return ( <div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo"/>
				<h1 className="App-title">Welcome to React</h1>
			</header>
			<p className="App-intro">
				To get started, edit
				<code>src/App.js</code>
				and save to reload.
			</p>
			<TextField id="keywrd" type="text" onChange={this.onTextChange}/>
			<Button variant="contained" color="primary" onClick={this.onClick}>Search</Button>
			<ul>{this.getImage()}</ul>
		</div> );
	}
}

export default App;
