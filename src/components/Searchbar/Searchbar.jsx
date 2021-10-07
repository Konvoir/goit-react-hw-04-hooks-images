import { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import s from "./Searchbar.module.css"

export const Searchbar = (props) => {
    const [query, setQuery] = useState("");

    const  handleInputChange = e => { setQuery(e.target.value) }

    const handleSubmit = e => {
        e.preventDefault();
        if (query.trim() === "") {
            toast.error('Enter the name of your picture theme');
            return;
        }
        props.onSubmit(query, 1);
        setQuery("");
    };
    
 return (
            <header className={s.Searchbar}>
                <form className={s.SearchForm}
                    onSubmit={handleSubmit} >
                    
                    <button type="submit" className={s.SearchFormButton}>
                        <span className={s.SearchFormButtonLabel}>Search</span>
                    </button>

                    <input
                        className={s.SearchFormInput}
                        type="text"
                        name="query"
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                        value={query}
                        onChange={handleInputChange}
                    />
                </form>
            </header>

        );


    }
Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};










// import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import s from "./Searchbar.module.css"

// export class Searchbar extends Component {
//     state = {
//         query: "",
//     }

//     handleInputChange = e => {
//         this.setState({ query: e.target.value })
//     }

//     handleSubmit = e => {
//         e.preventDefault()
//         if (this.state.query.trim() === "") { return; }
//         this.props.onSubmit(this.state.query)
//         this.setState({query: ""})
//     }

//     render() {
//         return (
//             <header className={s.Searchbar}>
//                 <form className={s.SearchForm}
//                     onSubmit={this.handleSubmit}
//                 >
                    
//                     <button type="submit" className={s.SearchFormButton}>
//                         <span className={s.SearchFormButtonLabel}>Search</span>
//                     </button>

//                     <input
//                         className={s.SearchFormInput}
//                         type="text"
//                         name="query"
//                         autoComplete="off"
//                         autoFocus
//                         placeholder="Search images and photos"
//                         value={this.state.query}
//                         onChange={this.handleInputChange}
//                     />
//                 </form>
//             </header>

//         );  
//     }
// };

