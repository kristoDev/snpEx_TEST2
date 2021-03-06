import React, { Component } from 'react';
import { Text } from 'react-native';
import firebase from 'firebase';
import { Button, Card, CardSection, Input } from './common';
//import { emit } from 'cluster';


class LoginForm extends Component {
    state = { email: '', password: '', error: '' };

    onButtonPress() {
        const { email, password } = this.state;
        firebase.auth().signInWithEmailAndPassword(email, password)
            .catch(() => {
                firebase.auth().createUserWithEmailAndPassword(email, password)
                    .catch(() => {
                       this.setState({ error: 'Sorry you fucked up' }); 
                    });
            });
    }

    render() {
        return (
            <Card>
                <CardSection>
                    <Input 
                    placeholder='user@example.com'
                    label='Email'
                    value={this.state.email}
                    onChangeText={email => this.setState({ email })}
                    /> 
                </CardSection>

                <CardSection>
                    <Input 
                    secureTextEntry
                    placeholder='password'
                    label='Password'
                    value={this.state.password}
                    onChangeText={password => this.setState({ password })}
                    /> 
                </CardSection>

                <Text style={styles.errorTextStyle}>
                    {this.state.error}
                </Text>

                <CardSection>
                    <Button onPress={this.onButtonPress.bind(this)}>
                        LOGIN
                    </Button>
                </CardSection>
            </Card>
        );
    }
}

const styles = {

    errorTextStyle: {
        fontSize: 28,
        color: 'red',
        alignItems: 'center'   
    }
};

export default LoginForm;
