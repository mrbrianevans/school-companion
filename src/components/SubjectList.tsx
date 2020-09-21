import React, {Dispatch} from "react";
import {Grid} from "@material-ui/core";
import Subject, {ISubject} from "./Subject";

const SubjectList: React.FC<{ subjects:ISubject[], setter: Dispatch<any> }> = (props) => {
    const deleteSubject = (index: number) => {
        props.setter(props.subjects.filter((subj: ISubject, ind:number)=>{return ind !== index}))
    }
    const editSubject = (index:number, newSubject: ISubject) => {
        const newSubjects = props.subjects
        newSubjects[index] = newSubject
        props.setter(newSubjects)
        console.log("Just saved "+JSON.stringify(newSubjects))
    }
    return (
        <Grid spacing={1} container>
            {props.subjects.map((subject, index) => (
                <Subject subject={subject} key={index} index={index}
                         deleter={()=>{deleteSubject(index)}}
                         editor={(alteredSubject:ISubject)=>{editSubject(index, alteredSubject)}}
                />
                ))}
        </Grid>
    )
}

export default SubjectList
