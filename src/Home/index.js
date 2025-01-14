import { useState } from "react";
import { Alert, FlatList, Text, TextInput, TouchableOpacity, View } from "react-native";

import { styles } from "./style";
import { Alunos } from "../components/Alunos";

export function Home(){
    const [alunos, setAlunos ] = useState([]);
    const [nomeAluno,setNomeAluno] = useState('');

    function handleAlunoAdd() {
        
        if (alunos.includes(nomeAluno)) {
            return Alert.alert("Participante existe", "Já existe um participante na lista com esse nome.");
          }
      
          setAlunos(prevState => [...prevState,nomeAluno]);
          setNomeAluno('');
    }

    function handleAlunoRemove(name) {
        Alert.alert("Remover",`Remover o aluno(a) ${name}?`,[
            {
                text: 'Sim',
                onPress: () => setAlunos(prevState => prevState.filter(participant => participant !== name))
            },
            {
                text: 'Não',
                style:'cancel'
            }
        ])
    }

    return(
        <View style={styles.container}>
            <Text style={styles.title}>
                RioOn
            </Text>
            <Text style={styles.text}>
                Lista de Alunos
            </Text>

            <View style={styles.form}>
                <TextInput 
                    style={styles.input}
                    placeholder="Adicione o item"
                    placeholderTextColor="#6B6B6B"
                    // onChangeText={texto => console.log(texto)}
                    // onChangeText={texto => setNomeAluno(texto)}
                    onChangeText={setNomeAluno}
                    value={nomeAluno}
                />

                <TouchableOpacity style={styles.button} onPress={handleAlunoAdd} >
                    <Text style={styles.buttonText}>
                        +
                    </Text>
                </TouchableOpacity>
            </View>
            <FlatList 
                data={alunos}
                keyExtractor={(item) => item}
                renderItem={({ item })=> (
                    <Alunos 
                        key={item}
                        name={item}
                        onRemove={() => handleAlunoRemove(item)}
                    />
                )}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={() => (
                    <Text style={styles.listEmptyText}>
                        Ninguém na lista de alunos
                    </Text>
                )}
            />
        </View>
    )
}