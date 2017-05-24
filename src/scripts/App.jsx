/**
 * Created by smanoharan on 22/05/2017.
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Items from './components/Items.jsx';

export default class App extends Component {

    constructor(){
        super();

        this.state = {
            searchVal: null,
            maxCount: 20,
        }
    }

    onClick(){
        return () => {
            this.setState({
                maxCount: this.refs.select ? Number(this.refs.select.value) : 20,
                searchVal: this.refs.search.value || null,
            });
        };
    }

    onChange(){
        return () => {
            this.setState({
                maxCount: this.refs.select ? Number(this.refs.select.value) : 20,
            });
        };
    }

    render() {
        return (
            <div>
                <center><h1><font type="Arial"> Flickr Application </font></h1></center>
                    <div className="form-inline">
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <input ref="search" type="text" placeholder="Search Flickr"  className="form-control" />
                        &nbsp;&nbsp;
                        <select ref="select" className="form-control" defaultValue="20">
                            <option value="20">20</option>
                        </select>
                        &nbsp;&nbsp;
                        <button type="submit" href="javascript:void(0)" onClick={ this.onClick()  } className="btn btn-primary">Search</button>

                    </div>
                    <br/>
                <Items searchKey={this.state.searchVal} maxCount={ this.state.maxCount }></Items>
            </div>
        );
    }
}
