import {Container, Grid} from "@material-ui/core";
import SubjectList from "../components/SubjectList";
import React, {useEffect, useState} from "react";

export const SubjectListPage: React.FC = () => {
    const [subjects, setSubjects] = useState(JSON.parse(localStorage.getItem("subjects") || "[]"))
    useEffect(() => {
            console.log("Setting localStorage.subjects to " + JSON.stringify(subjects))
            localStorage.setItem("subjects", JSON.stringify(subjects))
        }
        , [subjects] //save to localStorage whenever subjects change
    )
    return (
        <Container style={{marginTop: 15}}>
            <Grid container spacing={8} direction={"row"} justify={"flex-start"}
                  alignItems={"flex-end"}>
                <SubjectList subjects={subjects} setter={setSubjects}/>
            </Grid>
        </Container>
    )
}

