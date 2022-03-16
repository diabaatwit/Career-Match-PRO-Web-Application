import React, { Component } from 'react'
import '../css/header.css'
import { GrSearch } from 'react-icons/gr'

class Header extends Component {
    render() {
        return (
            <header>
                <div class="inner">
                    <div class="logo">
                        <div>
                            <a href="/">
                                <h1 className='title'>
                                    <GrSearch size={26}/>&nbsp;
                                    Remote Job Search
                                </h1>
                            </a>
                        </div>
                    </div>                    
                </div>
            </header>
        )

    }
}

export default Header;