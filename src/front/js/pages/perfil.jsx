import React, { useContext } from "react";
import Card from 'react-bootstrap/Card';
import { useParams } from "react-router-dom";
import {Context} from '../store/appContext'



export const Perfil = () => {
    const {store, actions} = useContext(Context);

    return (
        
        <Card className =' my-4 container d-flex justify-content-center' style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title>{store.user.email}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{store.user.name}</Card.Subtitle>
                <Card.Text>
                    {store.user.username}
                </Card.Text>
                <Card.Link href="#">Card Link</Card.Link>
                <Card.Link href="#">Another Link</Card.Link>
            </Card.Body>
        </Card>
    );
    
}