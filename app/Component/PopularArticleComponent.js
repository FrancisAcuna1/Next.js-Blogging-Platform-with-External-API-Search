'use client'
import React, { useState, useEffect } from 'react';
import { Grid2, Box, Skeleton, Card, CardActions, CardContent, CardMedia, Button, InputBase, Typography, FormControl, InputLabel, Select, MenuItem, Tooltip, Toolbar, IconButton } from '@mui/material';
// import { styled, alpha } from '@mui/system';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    width: '100%',
    maxWidth: '500px', // Set a max width to prevent it from stretching too far
    margin: '0 auto',  // Center the search bar
    border: `2px solid ${theme.palette.common.black}`, // Add black border
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', // Add a slight shadow for a fancy look
    padding: theme.spacing(0), // Add padding inside the search bar
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.black, // Set icon color to black
    // marginTop: '-0.4rem'
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)})`, // Add space for search icon
      transition: theme.transitions.create('width'),
      borderRadius: theme.shape.borderRadius,
      borderColor: theme.palette.common.black,
      [theme.breakpoints.up('sm')]: {
        width: '30ch', // Set the default width to 30ch
        '&:focus': {
          width: '40ch', // On focus, extend the width for a better UX
        },
      },
    },
  }));


export default function PopularArticleComponent() {
    const [popular, setPopular] = useState([]);
    const [loading, setLoading] = useState(true); // Set initial loading state to true
    const [error, setError] = useState(null);
    // const [period, setPeriod] = useState(["1"]); 
    const [searchTerm, setSearchTerm] = useState('');

    // const periodcateg = ["1", "7", "30"]   // Period
 

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true); // Start loading
                setError(null); // Reset previous errors
                const apiKey = process.env.NEXT_PUBLIC_NYT_API_KEY; // Access the environment variable
                if (!apiKey) {
                    throw new Error('API key is missing. Please set the NEXT_PUBLIC_NYT_API_KEY environment variable.');
                }
                const response = await fetch(`https://api.nytimes.com/svc/search/v2/articlesearch.json?begin_date=19800101&end_date=20240831&facet=true&facet_filter=false&page=1&api-key=${apiKey}`, {
                    method: "GET",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    },
                });

                

                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.statusText}`);
                }

                const jsonNews = await response.json();
                setPopular(jsonNews.response.docs);
                console.log(jsonNews.response.docs);  // based on the actual API response structure
            } catch (error) {
                console.error("Error fetching data:", error);
                setError(error);
            } finally {
                setLoading(false); // Set loading to false regardless of success or failure
            }
        };

        fetchData();
    }, []);

    const handlePeriodChange = (event) => {
        setPeriod(event.target.value); // Update the selected category
    };

    // if (error) return <p>Error loading data: {error.message}</p>;

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    
    const filteredUnits = popular.filter((item) => {
        const headline = item.headline?.main || '';
        const byline = item.byline?.original || '';
        const pubDate = item.pub_date || '';
        const keywords = item.keywords?.[0]?.value || ''; // Adjust based on actual structure
        const abstract = item.abstract || '';
    
        return (
            headline.toLowerCase().includes(searchTerm.toLowerCase()) ||
            byline.toLowerCase().includes(searchTerm.toLowerCase()) ||
            pubDate.toLowerCase().includes(searchTerm.toLowerCase()) ||
            keywords.toLowerCase().includes(searchTerm.toLowerCase()) ||
            abstract.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });
    
    // // setSearchTerm(filteredUnits)

    const searchitem = filteredUnits.slice();

    return (
        <Box sx={{ maxWidth: 1900, justifyContent: 'center', margin: 'center', mt: 5 }}>
            <Grid2 container sx={{justifyContent: 'space-between'}}>
                <Grid2 item>
                    <Typography variant='h4' sx={{mt:5, mb: 4 }}>
                        Popular Articles
                    </Typography>
                </Grid2>
                <Grid2 item>
                    <Toolbar sx={{ minWidth: 'auto' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 5, mb:4}}>
                            <Search onChange={handleSearchChange} value={searchTerm}>
                                <SearchIconWrapper>
                                    <SearchIcon fontSize='small' />
                                </SearchIconWrapper>
                                <StyledInputBase
                                    placeholder="Search…"
                                    inputProps={{ 'aria-label': 'search' }}
                                    value={searchTerm}
                                />
                            </Search>
                        </Box>
                    </Toolbar>
                </Grid2>
            </Grid2>
            <Grid2 container spacing={2}>
                {loading
                    ? Array.from(new Array(6)).map((_, index) => ( // Display 6 skeleton loaders
                        <Grid2 item xs={12} sm={6} md={4} key={index}>
                            <Card sx={{ maxWidth: 345 }}>
                                <Skeleton variant="rectangular" height={140} />
                                <CardContent>
                                    <Skeleton width="80%" />
                                    <Skeleton width="60%" />
                                    <Skeleton width="40%" />
                                </CardContent>
                                <CardActions>
                                    <Skeleton width={100} height={30} />
                                    <Skeleton width={100} height={30} />
                                </CardActions>
                            </Card>
                        </Grid2>
                    ))
                    : searchitem.map((item) => (
                        <Grid2 item xs={12} sm={6} md={4} key={item.url}>
                            <Card sx={{ maxWidth: 345, boxShadow: 5, borderRadius: '8px' }}>
                                {item.multimedia && item.multimedia.length > 0 && item.multimedia[0]['media-metadata'] && (
                                    <CardMedia
                                        sx={{ height: 140 }}
                                        image={item.multimedia[0]['media-metadata'][0].url} // Use the URL of the first image
                                        title={item.multimedia[0].caption || 'Image'}
                                    />
                                )}
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {item.headline.main}
                                    </Typography>
                                    <Typography gutterBottom variant="body2" color="text.primary">
                                        Author: {item.byline.original || 'Unknown'}
                                        
                                    </Typography>
                                    <Typography gutterBottom variant="body2" color="text.primary">
                                        {item.keywords.value}
                                    </Typography>
                                    <Typography gutterBottom variant="body2" color="text.primary" >
                                        Published Date: {item.pub_date}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{mt:2}}>
                                        {item.abstract}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" href={item.web_url} target="_blank" rel="noopener noreferrer">View Article</Button>
                                    <Button size="small">Learn More</Button>
                                </CardActions>
                            </Card>
                        </Grid2>
                    ))}
                
            </Grid2>
        </Box>
    );
}