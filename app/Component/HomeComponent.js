'use client';

import React, { useEffect, useState } from "react";
import { ImageList, ImageListItem, ImageListItemBar, IconButton, Box, Paper, Grid2, Typography, Toolbar, Breadcrumbs, Link} from "@mui/material";
import StarBorderIcon from "@mui/icons-material/StarBorder";

import SearchBar from "../LayoutComponent/searchbar";
// import dynamic from 'next/dynamic';
// const SearchBar = dynamic(() => import('../LayoutComponent/searchbar'), {
//   ssr: false
//   }) 

function srcset(image, width, height, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${width * cols}&h=${height * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${width * cols}&h=${
      height * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}




export default function HomeComponent() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiKey = process.env.NEXT_PUBLIC_NYT_API_KEY;
        if (!apiKey) {
          throw new Error("API key is missing. Please set the NEXT_PUBLIC_NYT_API_KEY environment variable.");
        }
        const response = await fetch(`https://api.nytimes.com/svc/topstories/v2/politics.json?api-key=${apiKey}`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }

        const jsonNews = await response.json();
        setNews(jsonNews.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Box sx={{ maxWidth: '100%', justifyContent: 'center', mt: 5 }}>
      {/* <Box>
      <SearchBar/>
      </Box> */}
      <Grid2 container spacing={2} justifyContent="center" sx={{mt:5}}>
        <Grid2 item xs={12}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 2}}>
            Top Stories Politics
          </Typography>
          <Paper elevation={3}>
            <ImageList
              sx={{
                width: { xs: '100%', md: 1200 }, // Adjust width based on screen size
                height: 'auto', // Allow the height to adjust automatically
                margin: '0 auto', // Center the list horizontally
              }}npm i material-ui-search-bar
              cols={3} // Set default columns
              rowHeight={200} // Fixed row height
              gap={10} // Gap between images
            >
              {news.map((item, index) => (
                <ImageListItem
                  key={index}
                  cols={1}
                  rows={1}
                  sx={{
                    '@media (max-width: 900px)': { cols: 2 }, // Change to 2 columns on small screens
                    '@media (max-width: 600px)': { cols: 1 }, // Change to 1 column on extra-small screens
                  }}
                >
                  <img
                    {...srcset(item.multimedia?.[0]?.url || '', 250, 200, 1, 1)}
                    alt={item.title}
                    loading="lazy"
                  />
                  <ImageListItemBar
                    title={item.title}
                    subtitle={<span>by: {item.byline}</span>}
                    actionIcon={
                      <IconButton
                        sx={{ color: "white" }}
                        aria-label={`star ${item.title}`}
                      >
                        <StarBorderIcon />
                      </IconButton>
                    }
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </Paper>
        </Grid2>
      </Grid2>
    </Box>
  );
}
