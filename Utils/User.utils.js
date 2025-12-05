function findPerson(Name,Persons){
    let i;
    for (i=0;i<Persons.length;i++)
    {
        if(Name == Persons[i].Name)  
        {
            return(Persons[i])
        }
    }
    console.log("person not found ERROR :/")
    return
}

export default {findPerson}