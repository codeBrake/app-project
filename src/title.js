import React, {Component} from 'react';
import axios from 'axios';


class Update extends Component {
    constructor() {
        super()
        this.state = {
            title: '',
            edit: false,
            name: ''
        }
        this.handleTitleChange = this.handleTitleChange.bind(this)
        this.updateName = this.updateName.bind(this)
    }

    componentDidMount() {
        axios.get('/api/favorites/name').then(response => {
           console.log(response)
            this.setState({
                name: response.data
            })
        })
    }

    handleTitleChange(e) {
        this.setState({name: e.target.value})
    }

    toggleEdit = () => {
        this.setState({edit: !this.state.edit})
    }
    updateName(name) {
        axios.put(`/api/favorites`, {name}).then(results => {
            console.log(results)
            this.setState({
              name: results.data
            })
        })
    }
        
    render() {
        
        return (
            <div>
                {
                    this.state.edit ?
                    (
                        <div>
                            <input className="input-name" value={this.props.name} type='text' onChange={this.handleTitleChange}/>
                            <button className="sub-cancel"onClick={() => {
                                this.updateName(this.state.name)
                                this.toggleEdit()
                                
                                }}>Submit</button>
                            <button className="sub-cancel" onClick={this.toggleEdit}>Cancel</button>

                        </div>
                    ) :
                    (
                        <div>
                            <h1 className="user-name">{this.state.name}</h1>
                            <button className="edit-me" onClick={this.toggleEdit}>Edit</button>
                        </div>

                    )
                }
            </div>
        )
    }
}

export default Update