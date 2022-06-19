import React, { useEffect, useState } from "react"
import { Box, Stack, Button, TextField, Typography } from "@mui/material"

import { exerciseOptions, fetchData } from "../utils/fetchData"

import HorizontalScrollbar from "./HorizontalScrollbar"

const SearchExercises = ({ bodyPart, setBodyPart, setExercises }) => {
  const [search, setSearch] = useState("")
  const [bodyParts, setBodyParts] = useState([])

  useEffect(() => {
    const fetchExercisesData = async () => {
      const bodyPartsData = await fetchData(
        "https://exercisedb.p.rapidapi.com/exercises/bodyPartList",
        exerciseOptions
      )
      setBodyParts(["all", ...bodyPartsData])
    }

    fetchExercisesData()
  }, [])

  const handleSearch = async () => {
    if (search) {
      const exerciseData = await fetchData(
        "https://exercisedb.p.rapidapi.com/exercises",
        exerciseOptions
      )
      const searchedExercises = exerciseData.filter(
        (exercise) =>
          exercise.name.toLowerCase.includes(search) ||
          exercise.target.toLowerCase.includes(search) ||
          exercise.equipment.toLowerCase.includes(search) ||
          exercise.bodyPart.toLowerCase.includes(search)
      )
      setSearch("")
      setExercises(searchedExercises)
    }
  }

  return (
    <Stack alignItems="center" mt="37px" justifyContent="center" p="20px">
      <Typography
        fontWeight={700}
        sx={{
          fontSize: { lg: "44px", xs: "30px" },
        }}
        mb="50px"
        textAlign="center"
      >
        Awesome Exercises you <br />
        Should Know
      </Typography>
      <Box position="relative" mb="72px">
        <TextField
          height="76px"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value.toLowerCase())
          }}
          type="text"
          sx={{
            input: { fontWeight: "700", border: "none", borderRadius: "4px" },
            width: { lg: "800", xs: "350px" },
            backgroundColor: "#fff",
            borderRadius: "40px",
          }}
        />
        <Button
          onClick={handleSearch}
          classname="search-btn"
          sx={{
            bgcolor: "#FF2625",
            color: "#FFF",
            textTransform: "none",
            width: { lg: "175px", xs: "12px" },
            fontsize: { lg: "20px", xs: "12px" },
            height: "56px",
            positon: "absolute",
            right: "0",
          }}
        >
          Search
        </Button>
      </Box>
      <Box sx={{ position: "relative", width: "100%", p: "20px" }}>
        <HorizontalScrollbar
          data={bodyParts}
          bodyPart={bodyPart}
          setBodyPart={setBodyPart}
        />
      </Box>
    </Stack>
  )
}

export default SearchExercises
