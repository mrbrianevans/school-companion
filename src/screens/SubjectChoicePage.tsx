import {Button, Container, Grid, TextField, Typography} from "@material-ui/core";
import Block from "../components/Block";
import {Add, DeleteForever, Edit, Note, NoteAdd} from "@material-ui/icons";
import SubjectList from "../components/SubjectList";
import Home from "@material-ui/icons/Home";
import React, {useEffect, useState} from "react";
import {ISubject} from "../components/Subject";
import IconButton from "@material-ui/core/IconButton";

export const SubjectChoicePage: React.FC = () => {
    const emptySubject = {subjectName: "", description: ""}
    const [subjects, setSubjects] = useState(JSON.parse(localStorage.getItem("subjects") || "[]"))
    const [newSubject, setNewSubject] = useState(emptySubject)
    const applyPreset = (preset: ISubject[]) => {
        setSubjects([])
        localStorage.setItem("subjects", JSON.stringify(subjects))
        setSubjects(preset)
        localStorage.setItem("subjects", JSON.stringify(subjects))
    }
    useEffect(() => {
            console.log("Setting localStorage.subjects to " + JSON.stringify(subjects))
            localStorage.setItem("subjects", JSON.stringify(subjects))
        }
        , [subjects] //save to localStorage whenever textBoxValueChanges
    )
    const handleSubjectAdd = () => {
        console.log("Adding " + JSON.stringify(newSubject) + " to subjects list...")
        setSubjects((prevState: ISubject[]) => [...prevState, newSubject])
        setNewSubject(emptySubject)
    }
    const deleteAll = () => {
        setSubjects([])
    }
    const gcseEbacc:ISubject[] = [
            {subjectName:"Mathematics", description:"Higher tier maths"},
            {subjectName:"English", description:"Literature"},
            {subjectName:"Science", description:"Triple science including Biology, Phsyics and Chemistry"},
            {subjectName:"Social Science", description:"History or Geography"},
            {subjectName:"MFL", description:"Modern Foreign Language such as Spanish, German, French or Italian"},
        ]
    const gcseExtended:ISubject[] = [
            {subjectName:"Mathematics", description:"Higher tier maths"},
            {subjectName:"English", description:"Literature"},
            {subjectName:"Science", description:"Triple science including Biology, Phsyics and Chemistry"},
            {subjectName:"Social Science", description:"History or Geography"},
            {subjectName:"MFL", description:"Modern Foreign Language such as Spanish, German, French or Italian"},
            {subjectName:"Photography", description:"Art & Design BTEC"},
            {subjectName:"Construction", description:"Pearson First in Construction"},
            {subjectName:"Business", description:"Level 2 BTEC"},
        ]
    const aLevelMedicine:ISubject[] = [
            {subjectName:"Mathematics", description:"A Level Mathematics - Edexcel"},
            {subjectName:"Biology", description:"AQA"},
            {subjectName:"Chemistry", description:"AQA"}
        ]
    return (
        <Container style={{marginTop: 15}}>
            <Grid container spacing={8} direction={"row"} justify={"flex-start"}
                  alignItems={"flex-end"}>
                <Block width={"half"}>
                    <Typography variant={"h6"}>Add new subject</Typography>
                    <TextField label={"Subject name"}
                               onChange={event => {
                                   setNewSubject({...newSubject, subjectName: event.target.value})
                               }}
                               onKeyPress={event => {
                                   event.key === "Enter" && handleSubjectAdd()
                               }}
                               variant={"filled"} color={"primary"}
                               value={newSubject.subjectName} fullWidth
                    />
                    <TextField label={"Subject description"}
                               onChange={event => {
                                   setNewSubject({...newSubject, description: event.target.value})
                               }}
                               onKeyPress={event => {
                                   event.key === "Enter" && handleSubjectAdd()
                               }}
                               variant={"filled"} color={"primary"} multiline rows={5}
                               value={newSubject.description} fullWidth
                    />
                    <IconButton onClick={handleSubjectAdd} disabled={!newSubject.subjectName}
                         color={"primary"}><Add/></IconButton>
                </Block>

                <Block width={"half"}>
                    <Typography variant={"h6"}>Utilties</Typography>
                    <Button color={"default"} variant={"contained"}
                            startIcon={<Edit/>}>Edit</Button>
                    <Button color={"secondary"} variant={"contained"}
                            startIcon={<DeleteForever/>} onClick={deleteAll}>Delete all</Button>
                </Block>
                <Block width={"half"}>
                    <Typography variant={"h6"}>Presets</Typography>
                    <Button color={"default"} variant={"contained"}
                            startIcon={<NoteAdd/>} onClick={()=> {

                        applyPreset(gcseEbacc)
                    }}>GSCE ebacc</Button>
                    <Button color={"default"} variant={"contained"}
                            startIcon={<Note/>} onClick={()=>setSubjects(gcseExtended)}>GCSE extended</Button>
                    <Button color={"default"} variant={"contained"}
                            startIcon={<Note/>} onClick={()=>setSubjects(aLevelMedicine)}>A Level medicine</Button>
                </Block>

                <SubjectList subjects={subjects} setter={setSubjects}/>

                <Block width={"half"}>
                    <Typography variant={"h2"}>Home</Typography>
                    <Button variant={"contained"} startIcon={<Home/>}
                            color={"primary"} onClick={()=>{window.location.reload()}}>Home</Button>
                </Block>

                <Block>
                    <Typography variant={"h6"}>Saved state:</Typography>
                    <Typography>{JSON.stringify(subjects || "[Empty]")}</Typography>
                </Block>

            </Grid>
        </Container>
    )
}

