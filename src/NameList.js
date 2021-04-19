import React, { useState, useEffect } from 'react';
const fetch = require("node-fetch")

class randomUser{
    constructor(firstName, lastName, email, phone, thumbnail, gender){
        this.firstName = firstName
        this.lastName = lastName
        this.email = email
        this.phone = phone
        this.thumbnail = thumbnail
        this.gender = gender
    }
}

let userArray = []

const NameList = () => {

    const [user, setUser] = useState([])

    useEffect(() => {
        const retrieveData = async () => {
            const response = await fetch('https://randomuser.me/api/?results=10&nat=us')
            const data = await response.json()
            for (let u = 0; u<10; u++){
            userArray.push(
                new randomUser(
                data.results[u].name.first, 
                data.results[u].name.last, 
                data.results[u].email, 
                data.results[u].phone, 
                data.results[u].picture.thumbnail,
                data.results[u].gender))}
            console.log( userArray )
            setUser(userArray)
        }
        if(userArray.length !== 10){
        retrieveData()}
      });

    const [lastSorted, setLastSorted] = useState('descending')

    const nameSort = () => {
        if(lastSorted === 'descending'){
        userArray.sort((a, b) => (a.lastName > b.lastName) ? 1 : -1)
        setLastSorted('ascending')
        //Forces react to re-render
        setUser([...userArray])
        }
        else if(lastSorted === 'ascending'){
        userArray.sort((a, b) => (a.lastName < b.lastName) ? 1 : -1)
        setLastSorted('descending')
        //Forces react to re-render
        setUser([...userArray])
        }
    }

   const [lastGenderFiltered, setLastGenderFiltered] = useState('female')

    const filterByGender = () => {
    if (lastGenderFiltered === 'female'){  
        setUser(userArray.filter(user => user.gender === 'male'))
        setLastGenderFiltered('male')
    }
    else if (lastGenderFiltered === 'male') {
        setUser(userArray.filter(user => user.gender === 'female'))
        setLastGenderFiltered('female')
    }
}
    

    return (
        <div className="NameList">
            <div className="userTableDiv">
                <table>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>E-Mail</th>
                        <th>Phone</th>
                        <th>Picture</th>
                    </tr>
                    {user.map((user) => (
                    <tr>                        
                        <th>{user.firstName}</th>
                        <th>{user.lastName}</th>
                        <th>{user.email}</th>
                        <th>{user.phone}</th>
                        <th><img src={user.thumbnail} alt="user thumbnail"></img></th>
                    </tr>

                    ))}
                </table>
            </div>
            <button onClick = {nameSort}> Arrange Table by Surname (ascending/descending)</button>
            <button onClick = {filterByGender} > Filter Table By Gender (male/female)</button>
        </div>
     );
}
 
export default NameList;