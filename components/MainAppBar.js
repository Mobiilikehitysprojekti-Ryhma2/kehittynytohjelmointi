import React from 'react'
import { Appbar } from 'react-native-paper'
import { getHeaderTitle } from '@react-navigation/elements'


export default function MainAppBar(props) {


    const removeAllMarkers = () => {
        props.setMarkers([])
        props.setDistance(0)
    }

    const toggleModal = () => {
        props.setModalVisible(prevState => !prevState)  
    }

    //console.log(props.navigation)
    return (
        <Appbar.Header>
            {props.back ? null : <Appbar.Action icon={'map-marker-remove-outline'} onPress={removeAllMarkers} />}
            {props.back ? null : <Appbar.Action icon={'cog'} onPress={toggleModal} />}
                
        </Appbar.Header>



    )
}