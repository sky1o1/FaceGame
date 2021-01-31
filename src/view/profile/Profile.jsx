import React from 'react';
import {useSelector} from 'react-redux';
import { Card, CardContent } from '@material-ui/core';

function Profile(){
const profile = useSelector(state => state.profile)
    return(
        <Card>
            <CardContent>
                <h1>Username: {profile.username} </h1>
                <h1>Email: {profile.email} </h1>
                <h1>Points: 20</h1>
            </CardContent>
        </Card>
    )
}

export default Profile;