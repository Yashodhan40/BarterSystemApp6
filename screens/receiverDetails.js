import * as React from 'react';
import {View,Text,TouchableOpacity} from 'react-native';
import firebase from 'firebase';
import db from '../config';
import {Card,Icon,ListItem} from 'react-native-elements';


export default class receiver extends React.Component{
    constructor(props){
        super(props);
        this.state={
            userId:firebase.auth().currentUser.email,
            receiverId:this.props.navigation.getParam('details')['userId'],
            requestId:this.props.navigation.getParam('details')['userId'],
            Name:this.props.navigation.getParam('details')['Item'],
            Reason:this.props.navigation.getParam('details')['Reason'],
            UserName:'',
            UserAdd:'',
            UserPhone:'',
            receiverDocId:'',
            
        }
    }
    getUserDetails=()=>{
        db.collection('Users').where('EmailId','==',this.state.receiverId).get().then(snapshot=>{
            snapshot.forEach(doc=>{
                var data = doc.data();
                this.setState({
                    UserName:data.firstName,
                    UserAdd:data.Address,
                    UserPhone:data.Contact
                })
            })
        })
        db.collection('RequestedItem').where('request_id','==',this.state.requestId).get()
        .then(snapshot=>{
            snapshot.forEach(doc=>{
                this.setState({
                    receiverDocId:doc.id
                })
            })
        })
    }

    updateStatus=()=>{
        db.collection("AllBarters").add({
            'Name':this.state.Name,
            'RequestedId':this.state.requestId,
            'requestBy':this.state.UserName,
            'DonorId':this.state.userId,
            'RequestStatus':'Donor Interested'
        })
    }

    componentDidMount=()=>{
        this.getUserDetails();
    }

    render(){
        return(
            <View>
                <View>{
                this.state.userId !== this.state.receiverId ?(
                    
                        <TouchableOpacity onPress={()=>{
                            this.updateStatus(),
                            this.props.navigation.navigate('MyBarters')
                        }}>
                            <Text>I Want To Exchange</Text>
                        </TouchableOpacity>
                    
                ):null
                      }
                </View>
            </View>
        )
    }
}