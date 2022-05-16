import * as React from 'react';
import { View, TouchableOpacity, TextInput, StyleSheet, Text } from 'react-native';

export default class HomeScreen extends React.Component{
   
   
    getWord=(word)=>{
        var searchKeyWord = word.toLowerCase();
        var url = 'https://rupinwhitehatjr.github.io/dictionary/%22'+searchKeyWord+'%22.json'

        return fetch(url)
        .then((data)=>{
            if (data.staus === 200)
            {
                return data.json()
            }
            else {
                return null
            }
        })

        .then((response)=>{
            var responseObjecct = response

            if(responseObjecct){

                var wordData = responseObjecct.definitions[0]
                var definition = wordData.description
                var lexicalCategory = wordData.wordtype

                this.setState({
                    "word" : this.state.text,
                    "definition" : definition,
                    "lexicalCategory" : lexicalCategory
                })
            }

            else{
                this.setState({
                    "word" : this.state.text,
                    "definition" : "Not"
                })
            }
        })
    }

    render (){
        return (
            <View>
            <Text>
                word : {""}
            </Text>
            <Text style = {{fontSize:18}}>
                {this.state.word}
            </Text>
            <Text>
                Type : {""} 

            </Text>
            <Text>
                {this.state.lexicalCategory}
            </Text>
            <Text>
                Definition : {""}
            </Text>

            <Text>
                {this.state.definition}
            </Text>

            <TextInput style = {styles.imput} onChangeText = {text =>{
                this.setState ({
                    text:text,
                    isSearchPressed : false,
                    word : 'loading...',
                    lexicalCategory : '',
                    examples : [],
                    definition : ""

                })
            }}
            value = {this.state.text}
            ></TextInput>
            <TouchableOpacity style = {styles.searchButton}
            onPress = {()=>{
                this.setState({isSearchPressed:true});
                this.getWord(this.state.text)
            }}></TouchableOpacity>
            </View>
        )
    }
} 

const styles = StyleSheet.create ({
    imput :{
        backgroundColor : 'black',
        

},
    searchButton : {
        backgroundColor : 'pink'
    }
})