import React, {useEffect, useState} from "react";
import {Typography} from "@material-ui/core";
import Block from "./Block";
import {Close, Edit, Save} from "@material-ui/icons";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";

interface ISubject{
    subjectName: string,
    description?: string,
}
interface SubjectProps{
    subject: ISubject,
    deleter: ()=>void,
    editor: (alteredSubject:ISubject)=>void,
    index: number
}
const Subject: React.FC<SubjectProps> = (props) => {
    const [subject, changeSubject] = useState(props.subject)
    const [tempSubject, updateTempSubject] = useState(props.subject)
    const [isEditing, setIsEditing] = useState(false)
    useEffect(()=>{
        props.editor(subject)
        console.log("Saved subject")
    }, [subject, props])
    useEffect(()=>{
        changeSubject(tempSubject)
    }, [isEditing, tempSubject])
    return (
        <Block width={"full"}>
            <div style={{flexDirection: "row", display: "flex", justifyContent: "space-between"}}>
                <div style={{width: "85%"}}>
                    <div>
                        {isEditing?
                        <TextField defaultValue={subject.subjectName}
                                   fullWidth
                                       onChange={(changeEvent)=>{
                                           let newValue = changeEvent.currentTarget.value
                                           updateTempSubject((prevState) => (
                                           {...prevState, subjectName:newValue}))
                                       }}
                                   label={"Name"} variant={"outlined"} style={{marginBottom: 10}}
                        />:
                        <Typography variant={"h5"}>{props.index+1}. {subject.subjectName}</Typography>
                    }
                    </div>
                    <div>
                        {isEditing?
                            <TextField defaultValue={subject?.description}
                                       fullWidth
                                       onChange={(changeEvent)=>{
                                           let newValue = changeEvent.currentTarget.value
                                           updateTempSubject((prevState) => (
                                           {...prevState, description:newValue}))
                                       }}
                                       multiline rows={5} label={"Description"} variant={"outlined"}
                            />:
                            <Typography variant={"body1"}>
                                {subject.description}
                            </Typography>
                    }
                    </div>
                </div>

                <div style={{justifySelf: "right"}}>
                    <IconButton color={"default"}
                         onClick={()=>{
                            setIsEditing(prevState => !prevState)
                        }}

                    >
                        {isEditing?<Save/>:<Edit/>}
                    </IconButton>
                    <IconButton color={"secondary"} onClick={props.deleter}>
                        <Close/>
                    </IconButton>
                </div>
            </div>
        </Block>
    )
}

export default Subject
export type {SubjectProps, ISubject};
