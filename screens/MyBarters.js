import * as React from 'react';
import {View,Text,TouchableOpacity,FlatList} from 'react-native';
import firebase from 'firebase';
import db from '../config';
import {ListItem,Card,Icon} from 'react-native-elements';

export default class MyBarter extends React.Component{
     constructor(){
         super();
         this.state={
            userId:firebase.auth().currentUser.email,
            allBarters:[]
         }
         this.requestRef = null
     }
     getAllBarters=()=>{
         this.requestRef = db.collection('MyBarters').where('DonorId','==',this.state.userId).onSnapshot((snapshot)=>{
             var allBarters = snapshot.docs.map(document=>document.data());
             this.setState({
                 allBarters:allBarters
             })
         })
     }

     keyExtractor = (item,index)=> index.toString();
     renderItem=({item,i})=>(
        <ListItem
        key={i}
        title={item.BookName}
        subtitle={'Requested By' + item.RequestedBy +'NotificationStatus'+item.RequestStatus}
        leftElement={<Icon name="Item" type="font-awesome" color="494949"/>}
        rightElement={<TouchableOpacity>
            <Text>Send Book</Text>
        </TouchableOpacity>}
        bottomDivider
        />
     )
     componentDidMount=()=>{
        this.getAllBarters();
    }
    componentWillUnmount(){
        this.requestRef();
    }
     render(){
         return(
             <View>
                 <View>
                     {
                         this.state.allBarters.length === 0?(
                             <View style={{marginTop:200,justifyContent:'center',
                             alignItems:'center'
                             }}>
                                 <Text>List Of All Barters</Text>
                             </View>
                         ):(
            <FlatList
            keyExtractor={this.keyExtractor}
            data={this.state.allBarters}
            renderItem={this.renderItem}
            
            />
                           )
                     }
            </View>
             </View>
         )
     }
}