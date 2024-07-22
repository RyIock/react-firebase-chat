import React, { Component } from 'react';
import Chatlist from './Chatlist';
import Userinfo from './Userinfo';


class List extends Component {
    state = {  } 
    render() { 
        return (
            <div className="basis-60 sm:flex flex-none flex-col h-full hidden">
                <Userinfo/>
                <Chatlist/>
            </div>
        );
    }
}
 
export default List;