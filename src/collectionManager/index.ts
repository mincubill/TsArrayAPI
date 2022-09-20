import { Friend } from "model/friend";
import { Person } from "model/person";
import { json } from "stream/consumers";
import personJson from '../collections/person.json'

export class ArrayApi{

    GetPersonsCount(): number {
        return personJson.length
    }

    FilterByAgeOverThirty(): Person[]  {
        let persons: Person[] = personJson.filter(person => person.age > 30)
        return persons;
    }

    GetPersonNamesWithAgeOverThirty(): string[] {
        let personsNames: string[] = personJson.filter(person => person.age > 30)
        .map(person => {
            return person.name
        })
        return personsNames;
    }

    GetPersonsWithoutFriends(): Person[] {
        let persons: Person[] = personJson.filter(person => person.friends.length <= 0)
        return persons;
    }

    GetPersonById(id: number): Person | undefined{
        let person = personJson.find(person => person.id === id)
        return person
    }

    PersonExists(name: string): boolean {
        return personJson.some(person => person.name === name)
    }

    GetAllFriends(): Friend[] {
        let friends: Friend[] = personJson.map(person => person.friends).flat()
        return friends
    }

    GetAllFriendsName(): string[] {
        let friends: Friend[]  = personJson.filter(person => person.friends.flat())
        let names: string[] = friends.map(friends => friends.name)
        return names
    }

    //Cual es el usuario con estado desactivado con más amigos.
    GetDisabledUserWithMostFriends(): Person | undefined {
        let disabledPersons: Person[] = personJson.filter(person => !person.isActive)
        let mostFriends: number = disabledPersons.sort(person => person.friends.length).reverse().map(person => person.friends.length)[0]
        let person: Person | undefined = disabledPersons.find(person => person.friends.length == mostFriends)
        return person
    }

    //Contar la cantidad de amigos totales que existen entre los usuarios con estado activo.
    GetTotalFriendsFromActiveUsers(): number {
        let activePersons: Person[] = personJson.filter(person => person.isActive)
        let friends: Friend[] = activePersons.map(person => person.friends).flat()
        return friends.length
    }

    //Cual es el promedio de edad entre los usuarios
    GetPersonAgeAverage(): number {
        let ages: number[] = personJson.map(person => person.age);
        let totalAgeSum = ages.reduce((acc, val) => acc + val )
        let average = totalAgeSum / ages.length
        return average;
    }

    //Cual es el usuario más viejo con estado activo que tiene menos amigos
    GetOldestWithLessFriends(): Person {
        let personByAgeDescending = personJson.sort( (a, b) => b.age - a.age )
        console.log( personByAgeDescending )
        let personsByAgeAndLessFriends = personByAgeDescending.sort(person => person.friends.length)
        let oldestPersonWithLessFriends = personsByAgeAndLessFriends[0]
        return oldestPersonWithLessFriends
    }

    //Cual persona tiene el nombre más largo 
    GetPersonWithTheLongestName(): Person {
        return personJson.sort(person => person.name.length).reverse()[0]
    }

    //Cual persona tiene el nombre más corto de todos 
    GetPersonWithShortestName(): Person {
        return personJson.sort(person => person.name.length)[0]
    }

    //Cual amigo tiene el nombre más largo y el más corto de todos

    //Cual amigo tiene el nombre más corto de todos

    //Cual usuario tiene la numeración más alta en su dirección

    //que usuario tiene el codigo postal menor

}