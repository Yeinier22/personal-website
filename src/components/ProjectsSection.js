import React from "react";
import FullScreenSection from "./FullScreenSection";
import { Box, Heading } from "@chakra-ui/react";
import Card from "./Card";

const projects = [
  {
    title: "Flight Finder",
    description:
      "Full-featured flight search engine using the Amadeus API. Users can search, filter, and compare flight options in real time with a modern responsive UI. ",
    getImageSrc: () => require("../images/flight.jpg"),
    web: "https://flightfinder2025.netlify.app/",
  },
  {
    title: "Movie Explorer",
    description:
      "A React-based application that consumes The Movie Database (TMDb) API to display trending movies dynamically. It features a real-time search bar with instant suggestions as you type, and implements infinite scroll to automatically load more movies as the user scrolls down.",
    getImageSrc: () => require("../images/movie.jpg"),
    web: "https://movies-yeinier.netlify.app/",
  },
  {
    title: "Little Lemon Restaurant Website",
    description:
      "A responsive React-based restaurant website featuring a reservation system with realistic availability simulation. Users can select the date, time, and number of guests, and the app determines table availability dynamically, mimicking a real API response. The interface adapts to both desktop and mobile views, and includes sections for the weekly specials, testimonials, and general information.",
    getImageSrc: () => require("../images/restaurant.jpg"),
    web: "https://little-lemmon-yeinier.netlify.app/",
  },
  {
    title: "Taskify - Coming Soon",
    description:
      /*"A task-tracking app built with React and Firebase. Users can register, log in, and manage their personal task list with full CRUD operations. The app includes protected routes, mobile-friendly design, and real-time state updates.",*/
      "This project is currently under development. It will include user authentication, protected routes, and full CRUD functionality using Firebase.",
    getImageSrc: () => require("../images/login.jpg"),
  },
];

const ProjectsSection = () => {
  return (
    <FullScreenSection
      backgroundColor="#14532d"
      isDarkBackground
      p={8}
      alignItems="flex-start"
      spacing={8}
    >
      <Heading as="h1" id="projects-section">
        Featured Projects
      </Heading>
      <Box
        display="grid"
        gridTemplateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
        gap={8}
        width="100%"
      >
        {projects.map((project) => (
          <Card
            key={project.title}
            title={project.title}
            web={project.web}
            description={project.description}
            imageSrc={project.getImageSrc()}
          />
        ))}
      </Box>
    </FullScreenSection>
  );
};

export default ProjectsSection;
